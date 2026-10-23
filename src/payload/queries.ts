import 'server-only'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import { marked } from 'marked'
import { getPayloadClient } from './client'

/**
 * Payload data-access layer. Every function returns the SAME shape the public
 * components already consumed from Prisma, so the frontend renders unchanged.
 * Bilingual data stays as paired *Id/*En fields; media relations are flattened
 * to URL strings; lexical bodies are converted to HTML.
 */

type Locale = 'id' | 'en'
type AnyDoc = Record<string, any>

// ─── primitives ───
const toDate = (v: unknown): Date | null => (v ? new Date(v as string) : null)

const mediaUrl = (v: unknown): string | null => {
  if (!v) return null
  if (typeof v === 'object' && v !== null && 'url' in (v as AnyDoc)) return (v as AnyDoc).url ?? null
  return null
}

const richToHtml = (v: unknown): string => {
  if (!v || typeof v !== 'object') return ''
  try {
    return convertLexicalToHTML({ data: v as any }) || ''
  } catch {
    return ''
  }
}

// Markdown → HTML (synchronous; no async marked extensions in use).
const mdToHtml = (v: unknown): string => {
  if (typeof v !== 'string' || !v.trim()) return ''
  try {
    return (marked.parse(v, { async: false }) as string) || ''
  } catch {
    return ''
  }
}

// Resolve a post body to HTML, honoring the per-post format switch
// (Markdown source vs the rich-text editor).
const bodyToHtml = (doc: AnyDoc, lang: 'id' | 'en'): string =>
  doc.bodyFormat === 'markdown'
    ? mdToHtml(lang === 'id' ? doc.bodyMarkdownId : doc.bodyMarkdownEn)
    : richToHtml(lang === 'id' ? doc.bodyId : doc.bodyEn)

const relId = (v: unknown): string | null => {
  if (v == null) return null
  if (typeof v === 'object') return String((v as AnyDoc).id ?? '')
  return String(v)
}

// ─── mappers ───
function mapAuthor(a: unknown): { name: string; image: string | null } {
  if (!a || typeof a !== 'object') return { name: '', image: null }
  const d = a as AnyDoc
  return { name: d.name ?? '', image: mediaUrl(d.avatar) }
}

function mapCategory(c: unknown): { nameId: string; nameEn: string | null; slug: string } | null {
  if (!c || typeof c !== 'object') return null
  const d = c as AnyDoc
  return { nameId: d.nameId ?? '', nameEn: d.nameEn ?? null, slug: d.slug ?? '' }
}

function mapTags(tags: unknown): { tag: { id: string; name: string; slug: string } }[] {
  if (!Array.isArray(tags)) return []
  return tags
    .filter((t) => t && typeof t === 'object')
    .map((t: AnyDoc) => ({ tag: { id: String(t.id), name: t.name ?? '', slug: t.slug ?? '' } }))
}

export function mapPost(doc: AnyDoc, opts: { withBody?: boolean } = {}) {
  return {
    id: String(doc.id),
    titleId: doc.titleId ?? '',
    titleEn: doc.titleEn ?? null,
    slug: doc.slug ?? '',
    slugEn: doc.slugEn ?? null,
    excerptId: doc.excerptId ?? null,
    excerptEn: doc.excerptEn ?? null,
    // always present so the type is `string`/`string | null`; only convert lexical when the body is actually needed
    bodyId: opts.withBody ? bodyToHtml(doc, 'id') : '',
    bodyEn: opts.withBody ? (bodyToHtml(doc, 'en') || null) : null,
    featuredImage: mediaUrl(doc.featuredImage),
    featuredImageAlt: doc.featuredImageAlt ?? null,
    metaTitle: doc.metaTitle ?? null,
    metaDescription: doc.metaDescription ?? null,
    metaTitleEn: doc.metaTitleEn ?? null,
    metaDescriptionEn: doc.metaDescriptionEn ?? null,
    ogImage: mediaUrl(doc.ogImage),
    focusKeyword: doc.focusKeyword ?? null,
    readingTime: doc.readingTime ?? null,
    wordCount: doc.wordCount ?? null,
    status: doc.status ?? 'DRAFT',
    publishedAt: toDate(doc.publishedAt),
    createdAt: toDate(doc.createdAt),
    updatedAt: toDate(doc.updatedAt),
    author: mapAuthor(doc.author),
    category: mapCategory(doc.category),
    tags: mapTags(doc.tags),
  }
}

function mapPricingTier(t: AnyDoc) {
  const features = Array.isArray(t.features) ? t.features : []
  return {
    id: String(t.id ?? ''),
    tierName: t.tierName ?? '',
    priceLabel: t.priceLabel ?? '',
    priceValue: t.priceValue ?? null,
    features,
    isPopular: !!t.isPopular,
    sortOrder: t.sortOrder ?? 0,
  }
}

export function mapService(doc: AnyDoc) {
  const tiers = Array.isArray(doc.pricingTiers) ? doc.pricingTiers.map(mapPricingTier) : []
  tiers.sort((a, b) => a.sortOrder - b.sortOrder)
  const addOns = (Array.isArray(doc.addOns) ? doc.addOns : [])
    .filter((a: AnyDoc) => a.isActive !== false)
    .map((a: AnyDoc) => ({
      id: String(a.id ?? ''),
      name: a.name ?? '',
      description: a.description ?? null,
      priceLabel: a.priceLabel ?? null,
      isActive: a.isActive !== false,
    }))
  return {
    id: String(doc.id),
    name: doc.name ?? '',
    slug: doc.slug ?? '',
    descriptionId: doc.descriptionId ?? '',
    descriptionEn: doc.descriptionEn ?? null,
    shortDescId: doc.shortDescId ?? null,
    shortDescEn: doc.shortDescEn ?? null,
    icon: doc.icon ?? null,
    color: doc.color ?? '#A855F7',
    funnelPosition: doc.funnelPosition ?? null,
    sortOrder: doc.sortOrder ?? 0,
    seoSchema: doc.seoSchema ?? null,
    metaTitle: doc.metaTitle ?? null,
    metaDescription: doc.metaDescription ?? null,
    isActive: doc.isActive !== false,
    pricingTiers: tiers,
    addOns,
  }
}

const briefService = (s: unknown) => {
  if (!s || typeof s !== 'object') return null
  const d = s as AnyDoc
  return { id: String(d.id), name: d.name ?? '', slug: d.slug ?? '', color: d.color ?? null, icon: d.icon ?? null }
}

function mapTestimonial(t: unknown) {
  if (!t || typeof t !== 'object') return null
  const d = t as AnyDoc
  return {
    id: String(d.id),
    clientName: d.clientName ?? '',
    clientTitle: d.clientTitle ?? '',
    clientPhoto: mediaUrl(d.clientPhoto),
    quote: d.quote ?? '',
    companyName: d.companyName ?? '',
    isHighlighted: !!d.isHighlighted,
  }
}

export function mapCaseStudy(doc: AnyDoc) {
  const metrics = (Array.isArray(doc.metrics) ? doc.metrics : [])
    .map((m: AnyDoc) => ({
      id: String(m.id ?? ''),
      metricLabel: m.metricLabel ?? '',
      beforeValue: m.beforeValue ?? '',
      afterValue: m.afterValue ?? '',
      sortOrder: m.sortOrder ?? 0,
    }))
    .sort((a: AnyDoc, b: AnyDoc) => a.sortOrder - b.sortOrder)
  const blocks = (Array.isArray(doc.blocks) ? doc.blocks : [])
    .map((b: AnyDoc) => ({
      id: String(b.id ?? ''),
      blockType: b.blockType,
      sortOrder: b.sortOrder ?? 0,
      isVisible: b.isVisible !== false,
      data: b.data ?? {},
    }))
    .sort((a: AnyDoc, b: AnyDoc) => a.sortOrder - b.sortOrder)
  const caseStudyServices = (Array.isArray(doc.caseStudyServices) ? doc.caseStudyServices : [])
    .map((s: unknown) => ({ service: briefService(s) }))
    .filter((x: AnyDoc) => x.service)
  const ind = doc.industryRel && typeof doc.industryRel === 'object' ? (doc.industryRel as AnyDoc) : null
  return {
    id: String(doc.id),
    title: doc.title ?? '',
    industry: doc.industry ?? '',
    challenge: doc.challenge ?? '',
    strategy: doc.strategy ?? '',
    results: doc.results ?? '',
    thumbnail: mediaUrl(doc.thumbnail),
    titleId: doc.titleId ?? null,
    titleEn: doc.titleEn ?? null,
    subtitleId: doc.subtitleId ?? null,
    subtitleEn: doc.subtitleEn ?? null,
    summaryId: doc.summaryId ?? null,
    summaryEn: doc.summaryEn ?? null,
    slug: doc.slug ?? '',
    slugEn: doc.slugEn ?? null,
    seoTitleId: doc.seoTitleId ?? null,
    seoTitleEn: doc.seoTitleEn ?? null,
    seoDescId: doc.seoDescId ?? null,
    seoDescEn: doc.seoDescEn ?? null,
    ogImage: mediaUrl(doc.ogImage),
    featuredImage: mediaUrl(doc.featuredImage),
    durationLabel: doc.durationLabel ?? null,
    clientWebsite: doc.clientWebsite ?? null,
    featured: !!doc.featured,
    status: doc.status ?? 'DRAFT',
    publishedAt: toDate(doc.publishedAt),
    createdAt: toDate(doc.createdAt),
    updatedAt: toDate(doc.updatedAt),
    clientName: doc.clientName ?? '',
    clientLogo: mediaUrl(doc.clientLogo),
    service: briefService(doc.service),
    industryRel: ind
      ? { nameId: ind.nameId ?? '', nameEn: ind.nameEn ?? null, slug: ind.slug ?? '', accentColor: ind.accentColor ?? null }
      : null,
    metrics,
    testimonial: mapTestimonial(doc.testimonial),
    blocks,
    caseStudyServices,
  }
}

export function mapCta(doc: AnyDoc) {
  const ids = (v: unknown): string[] =>
    Array.isArray(v) ? v.map(relId).filter((x): x is string => !!x) : []
  return {
    id: String(doc.id),
    templateType: doc.templateType,
    heading: doc.heading ?? null,
    subheading: doc.subheading ?? null,
    buttonText: doc.buttonText ?? null,
    buttonUrl: doc.buttonUrl ?? '',
    secondaryButtonText: doc.secondaryButtonText ?? null,
    secondaryButtonUrl: doc.secondaryButtonUrl ?? null,
    backgroundImage: mediaUrl(doc.backgroundImage),
    backgroundColor: doc.backgroundColor ?? null,
    textColor: doc.textColor ?? null,
    cssClass: doc.cssClass ?? null,
    gaEventCategory: doc.gaEventCategory ?? null,
    gaEventLabel: doc.gaEventLabel ?? null,
    dataAttributes: doc.dataAttributes ?? null,
    placement: doc.placement,
    paragraphIndex: doc.paragraphIndex ?? null,
    targetingType: doc.targetingType ?? 'ALL_POSTS',
    targetPostIds: ids(doc.targetPosts),
    targetTagIds: ids(doc.targetTags),
    targetCategoryIds: ids(doc.targetCategories),
    isActive: doc.isActive !== false,
    startDate: toDate(doc.startDate),
    endDate: toDate(doc.endDate),
    showOnMobile: doc.showOnMobile !== false,
    showOnDesktop: doc.showOnDesktop !== false,
    dismissible: doc.dismissible !== false,
    dismissDuration: doc.dismissDuration ?? 7,
    displayTrigger: doc.displayTrigger ?? null,
    displayDelay: doc.displayDelay ?? null,
    scrollDepthThreshold: doc.scrollDepthThreshold ?? null,
    countdownLabel: doc.countdownLabel ?? null,
    imagePosition: doc.imagePosition ?? null,
    emoji: doc.emoji ?? null,
    sponsoredLabel: !!doc.sponsoredLabel,
    impressionCount: doc.impressionCount ?? 0,
    clickCount: doc.clickCount ?? 0,
  }
}

// ─── query functions (mirror the old inline Prisma reads) ───
// An EN post is "translated" if it has an English title and an English body in
// either format (rich text OR markdown).
const enPublished = (extra: AnyDoc = {}) => ({
  and: [
    { status: { equals: 'PUBLISHED' } },
    { titleEn: { exists: true } },
    { or: [{ bodyEn: { exists: true } }, { bodyMarkdownEn: { exists: true } }] },
    ...(extra.and ?? []),
  ],
})

export async function getHomeData(_locale: Locale) {
  const payload = await getPayloadClient()
  const [services, cs] = await Promise.all([
    payload.find({ collection: 'services', where: { isActive: { equals: true } }, sort: 'sortOrder', depth: 2, limit: 100 }),
    payload.find({ collection: 'case-studies', where: { status: { equals: 'PUBLISHED' } }, sort: '-publishedAt', limit: 1, depth: 2 }),
  ])
  return {
    services: services.docs.map(mapService),
    featuredCaseStudy: cs.docs[0] ? mapCaseStudy(cs.docs[0]) : null,
  }
}

export async function getServicesList() {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'services', where: { isActive: { equals: true } }, sort: 'sortOrder', depth: 2, limit: 100 })
  return res.docs.map(mapService)
}

export async function getServiceBySlug(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, depth: 2, limit: 1 })
  return res.docs[0] ? mapService(res.docs[0]) : null
}

export async function getContactServices() {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'services', where: { isActive: { equals: true } }, sort: 'sortOrder', depth: 0, limit: 100 })
  return res.docs.map((s: AnyDoc) => ({ id: String(s.id), name: s.name ?? '', slug: s.slug ?? '' }))
}

export async function getBlogList(locale: Locale, categorySlug?: string) {
  const payload = await getPayloadClient()
  let categoryClause: AnyDoc | null = null
  if (categorySlug) {
    const cat = await payload.find({ collection: 'categories', where: { slug: { equals: categorySlug } }, limit: 1, depth: 0 })
    if (!cat.docs[0]) return { posts: [], category: null }
    categoryClause = { category: { equals: cat.docs[0].id } }
  }
  const base: AnyDoc =
    locale === 'en' ? enPublished() : { status: { equals: 'PUBLISHED' } }
  const where = categoryClause ? { and: [base, categoryClause] } : base
  const res = await payload.find({ collection: 'posts', where, sort: '-publishedAt', limit: 12, depth: 2 })
  return { posts: res.docs.map((d) => mapPost(d)), category: null }
}

export async function getCategoryBySlug(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'categories', where: { slug: { equals: slug } }, limit: 1, depth: 0 })
  return res.docs[0] ? mapCategory(res.docs[0]) : null
}

export async function getPostBySlug(slug: string, locale: Locale) {
  const payload = await getPayloadClient()
  if (locale === 'en') {
    const byEn = await payload.find({ collection: 'posts', where: { and: [{ slugEn: { equals: slug } }, { status: { equals: 'PUBLISHED' } }] }, depth: 2, limit: 1 })
    if (byEn.docs[0]) return mapPost(byEn.docs[0], { withBody: true })
  }
  const res = await payload.find({ collection: 'posts', where: { and: [{ slug: { equals: slug } }, { status: { equals: 'PUBLISHED' } }] }, depth: 2, limit: 1 })
  return res.docs[0] ? mapPost(res.docs[0], { withBody: true }) : null
}

export async function getRelatedPosts(postId: string, categoryId: string | null, locale: Locale) {
  if (!categoryId) return []
  const payload = await getPayloadClient()
  const base: AnyDoc[] = [{ status: { equals: 'PUBLISHED' } }, { category: { equals: categoryId } }, { id: { not_equals: postId } }]
  if (locale === 'en') base.push({ titleEn: { exists: true } }, { or: [{ bodyEn: { exists: true } }, { bodyMarkdownEn: { exists: true } }] })
  const res = await payload.find({ collection: 'posts', where: { and: base }, sort: '-publishedAt', limit: 3, depth: 2 })
  return res.docs.map((d) => mapPost(d))
}

export async function getActiveCtas() {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'cta-widgets', where: { isActive: { equals: true } }, limit: 200, depth: 0 })
  return res.docs.map(mapCta)
}

export async function getPortfolioList() {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'case-studies', where: { status: { equals: 'PUBLISHED' } }, sort: '-publishedAt', depth: 2, limit: 100 })
  return res.docs.map(mapCaseStudy)
}

export async function getCaseStudyBySlug(slug: string, locale: Locale) {
  const payload = await getPayloadClient()
  const or: AnyDoc[] = locale === 'en' ? [{ slugEn: { equals: slug } }, { slug: { equals: slug } }] : [{ slug: { equals: slug } }]
  const res = await payload.find({ collection: 'case-studies', where: { and: [{ or }, { status: { equals: 'PUBLISHED' } }] }, depth: 2, limit: 1 })
  return res.docs[0] ? mapCaseStudy(res.docs[0]) : null
}

export async function getRelatedCaseStudies(current: { id: string; industry: string; serviceId: string | null; industryId: string | null }) {
  const payload = await getPayloadClient()
  const or: AnyDoc[] = [{ industry: { equals: current.industry } }]
  if (current.serviceId) or.push({ service: { equals: current.serviceId } })
  if (current.industryId) or.push({ industryRel: { equals: current.industryId } })
  const res = await payload.find({
    collection: 'case-studies',
    where: { and: [{ status: { equals: 'PUBLISHED' } }, { id: { not_equals: current.id } }, { or }] },
    limit: 3,
    depth: 2,
  })
  return res.docs.map(mapCaseStudy)
}

export async function getAllActiveServicesBrief() {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'services', where: { isActive: { equals: true } }, depth: 0, limit: 100 })
  return res.docs.map((s: AnyDoc) => ({ id: String(s.id), name: s.name ?? '', slug: s.slug ?? '', color: s.color ?? null, icon: s.icon ?? null }))
}

export async function getClientLogos() {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'client-logos',
    where: { isActive: { equals: true } },
    sort: 'sortOrder',
    depth: 2,
    limit: 100,
  })
  return res.docs
    .map((d: AnyDoc) => {
      const logo = d.logo && typeof d.logo === 'object' ? (d.logo as AnyDoc) : null
      return {
        id: String(d.id),
        name: d.name ?? '',
        url: d.url ?? null,
        logo: mediaUrl(d.logo),
        width: logo?.width ?? 160,
        height: logo?.height ?? 48,
      }
    })
    .filter((l) => !!l.logo)
}

export async function getSitemapEntries() {
  const payload = await getPayloadClient()
  const [posts, cases] = await Promise.all([
    payload.find({ collection: 'posts', where: { status: { equals: 'PUBLISHED' } }, sort: '-updatedAt', limit: 1000, depth: 0 }),
    payload.find({ collection: 'case-studies', where: { status: { equals: 'PUBLISHED' } }, sort: '-updatedAt', limit: 1000, depth: 0 }),
  ])
  return {
    posts: posts.docs.map((d: AnyDoc) => ({ slug: d.slug, slugEn: d.slugEn ?? null, updatedAt: toDate(d.updatedAt) })),
    caseStudies: cases.docs.map((d: AnyDoc) => ({ slug: d.slug, slugEn: d.slugEn ?? null, updatedAt: toDate(d.updatedAt) })),
  }
}
