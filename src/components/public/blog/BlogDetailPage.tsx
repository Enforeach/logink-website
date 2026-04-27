import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { buildMetadata } from '@/lib/seo'
import { formatDate } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { TableOfContents } from './TableOfContents'
import { AuthorBio } from './AuthorBio'
import { CtaRenderer } from '@/components/public/cta/CtaRenderer'

const ReadingProgress = dynamic(() => import('./ReadingProgress').then(m => ({ default: m.ReadingProgress })), { ssr: false })
const ShareBar = dynamic(() => import('./ShareBar').then(m => ({ default: m.ShareBar })), { ssr: false })
import { filterCtasForPost, extractHeadings, injectHeadingIds, type CtaWidgetRow } from '@/lib/cta'
import { resolvePostContent } from '@/lib/i18n/content'
import { type Locale, t, localePath } from '@/lib/i18n'
import { SITE } from '@/lib/constants'

async function getPost(slug: string, locale: Locale) {
  try {
    // For EN: try slugEn first, then fall back to regular slug
    if (locale === 'en') {
      const bySlugEn = await prisma.post.findFirst({
        where: { slugEn: slug, status: 'PUBLISHED' },
        include: {
          author: { select: { name: true, image: true } },
          category: { select: { nameId: true, nameEn: true, slug: true } },
          tags: { include: { tag: true } },
        },
      })
      if (bySlugEn) return bySlugEn

      // Fallback: find by regular slug (will show ID content with fallback banner)
      return await prisma.post.findUnique({
        where: { slug, status: 'PUBLISHED' },
        include: {
          author: { select: { name: true, image: true } },
          category: { select: { nameId: true, nameEn: true, slug: true } },
          tags: { include: { tag: true } },
        },
      })
    }

    return await prisma.post.findUnique({
      where: { slug, status: 'PUBLISHED' },
      include: {
        author: { select: { name: true, image: true } },
        category: { select: { nameId: true, nameEn: true, slug: true } },
        tags: { include: { tag: true } },
      },
    })
  } catch { return null }
}

async function getRelated(postId: string, categoryId: string | null, locale: Locale, limit = 3) {
  if (!categoryId) return []
  try {
    const where: any = { status: 'PUBLISHED', categoryId, id: { not: postId } }
    if (locale === 'en') {
      where.titleEn = { not: null }
      where.bodyEn = { not: null }
    }
    return await prisma.post.findMany({
      where,
      select: { id: true, titleId: true, titleEn: true, slug: true, slugEn: true, featuredImage: true, publishedAt: true, readingTime: true, excerptId: true, excerptEn: true },
      orderBy: { publishedAt: 'desc' },
      take: limit,
    })
  } catch { return [] }
}

async function getActiveCtas(): Promise<CtaWidgetRow[]> {
  try {
    const now = new Date()
    const rows = await prisma.ctaWidget.findMany({
      where: {
        isActive: true,
        OR: [{ startDate: null }, { startDate: { lte: now } }],
        AND: [{ OR: [{ endDate: null }, { endDate: { gte: now } }] }],
      },
    })
    return rows.map(r => ({
      ...r,
      templateType: r.templateType as string,
      placement: r.placement as string,
      targetingType: r.targetingType as string,
      scrollDepthThreshold: r.scrollDepthThreshold ? Number(r.scrollDepthThreshold) : null,
    })) as CtaWidgetRow[]
  } catch { return [] }
}

export async function generateBlogDetailMetadata(slug: string, locale: Locale): Promise<Metadata> {
  const post = await getPost(slug, locale)
  if (!post) return {}

  const resolved = resolvePostContent({
    ...post,
    slugEn: (post as any).slugEn ?? null,
    metaTitleEn: (post as any).metaTitleEn ?? null,
    metaDescriptionEn: (post as any).metaDescriptionEn ?? null,
  }, locale)

  const siteUrl = SITE.url
  const idPath = `/blog/${post.slug}`
  const enPath = (post as any).slugEn ? `/en/blog/${(post as any).slugEn}` : null

  return {
    ...buildMetadata({
      title: resolved.metaTitle || resolved.title,
      description: resolved.metaDescription || resolved.excerpt || '',
      path: localePath(`/blog/${slug}`, locale),
      ogImage: (post as any).ogImage || post.featuredImage || undefined,
      type: 'article',
    }),
    alternates: {
      canonical: `${siteUrl}${localePath(`/blog/${slug}`, locale)}`,
      languages: {
        'id': `${siteUrl}${idPath}`,
        ...(enPath ? { 'en': `${siteUrl}${enPath}` } : {}),
        'x-default': `${siteUrl}${idPath}`,
      },
    },
  }
}

export async function BlogDetailPage({ slug, locale }: { slug: string; locale: Locale }) {
  const [post, allCtas] = await Promise.all([getPost(slug, locale), getActiveCtas()])
  if (!post) notFound()

  const resolved = resolvePostContent({
    ...post,
    slugEn: (post as any).slugEn ?? null,
    metaTitleEn: (post as any).metaTitleEn ?? null,
    metaDescriptionEn: (post as any).metaDescriptionEn ?? null,
  }, locale)

  const tagIds = post.tags.map((t: any) => t.tag.id)
  const tagNames = post.tags.map((t: any) => t.tag.name)
  const matchedCtas = filterCtasForPost(allCtas, post.id, tagIds, post.categoryId)

  const rawHtml = resolved.body || ''
  const htmlWithIds = injectHeadingIds(rawHtml)
  const headings = extractHeadings(rawHtml)

  const aboveFold = matchedCtas.filter(c => c.placement === 'ABOVE_FOLD')
  const afterToc = matchedCtas.filter(c => c.placement === 'AFTER_TOC')
  const sidebarCtas = matchedCtas.filter(c => c.placement === 'SIDEBAR')
  const belowArticle = matchedCtas.filter(c => c.placement === 'BELOW_ARTICLE')
  const stickyBottom = matchedCtas.filter(c => c.placement === 'STICKY_BOTTOM')

  const related = await getRelated(post.id, post.categoryId, locale)

  const siteUrl = SITE.url
  const articleUrl = `${siteUrl}${localePath(`/blog/${slug}`, locale)}`
  const categoryName = (locale === 'en' && post.category?.nameEn) ? post.category.nameEn : post.category?.nameId

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: resolved.title,
    description: resolved.metaDescription || resolved.excerpt || '',
    url: articleUrl,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt?.toISOString(),
    author: { '@type': 'Person', name: post.author.name },
    publisher: { '@type': 'Organization', name: 'Logink', url: siteUrl },
    ...(post.featuredImage && { image: post.featuredImage }),
    inLanguage: locale,
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: t(locale, 'nav.blog'), item: `${siteUrl}${localePath('/blog', locale)}` },
      ...(post.category ? [{ '@type': 'ListItem', position: 3, name: categoryName, item: `${siteUrl}${localePath(`/blog/category/${post.category.slug}`, locale)}` }] : []),
      { '@type': 'ListItem', position: post.category ? 4 : 3, name: resolved.title, item: articleUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ReadingProgress />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 mesh-gradient">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6" aria-label="Breadcrumb">
            <Link href={localePath('/', locale)} className="hover:text-[var(--text-primary)]">Home</Link>
            <span>/</span>
            <Link href={localePath('/blog', locale)} className="hover:text-[var(--text-primary)]">{t(locale, 'nav.blog')}</Link>
            {post.category && (
              <>
                <span>/</span>
                <Link href={localePath(`/blog/category/${post.category.slug}`, locale)} className="hover:text-[var(--text-primary)]">
                  {categoryName}
                </Link>
              </>
            )}
          </nav>

          {post.category && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-brand-violet/10 text-brand-violet border border-brand-violet/20 mb-4">
              {categoryName}
            </span>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] mb-6 leading-tight">
            {resolved.title}
          </h1>

          {resolved.excerpt && (
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">{resolved.excerpt}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              {post.author.image ? (
                <Image src={post.author.image} alt={post.author.name} width={28} height={28} className="rounded-full object-cover" />
              ) : (
                <div className="h-7 w-7 rounded-full gradient-bg flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                  {post.author.name[0]}
                </div>
              )}
              <span className="font-medium text-[var(--text-secondary)]">{post.author.name}</span>
            </div>
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
            {post.readingTime && <span>{post.readingTime} {t(locale, 'common.readingTime')}</span>}
            {post.wordCount && <span>{post.wordCount.toLocaleString()} words</span>}
          </div>
        </div>
      </section>

      {/* Fallback banner for EN posts without translation */}
      {resolved.isFallback && (
        <div className="max-w-3xl mx-auto px-4 mt-4">
          <div className="flex items-start gap-3 rounded-xl border-l-4 border-blue-500 bg-blue-500/5 px-4 py-3">
            <span className="text-blue-400 mt-0.5 shrink-0">ℹ</span>
            <div className="text-sm">
              <span className="text-[var(--text-secondary)]">{t(locale, 'blog.fallbackBanner')} </span>
              {resolved.alternateSlug && (
                <Link href={`/blog/${resolved.alternateSlug}`} className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
                  {t(locale, 'blog.viewOriginal')}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Featured image */}
      {post.featuredImage && (
        <div className="max-w-5xl mx-auto px-4 -mt-4 mb-8">
          <div className="aspect-[16/9] relative rounded-2xl overflow-hidden shadow-lg">
            <Image src={post.featuredImage} alt={(post as any).featuredImageAlt || resolved.title} fill className="object-cover" priority />
          </div>
        </div>
      )}

      {/* Above-fold CTAs */}
      {aboveFold.length > 0 && (
        <div className="max-w-3xl mx-auto px-4 mb-8 space-y-4">
          {aboveFold.map(cta => <CtaRenderer key={cta.id} widget={cta} />)}
        </div>
      )}

      {/* Main content grid */}
      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
            <article>
              {headings.length > 0 && (
                <div className="lg:hidden mb-8 p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)]">
                  <TableOfContents headings={headings} />
                </div>
              )}
              {afterToc.length > 0 && (
                <div className="lg:hidden mb-6 space-y-4">
                  {afterToc.map(cta => <CtaRenderer key={cta.id} widget={cta} />)}
                </div>
              )}
              {htmlWithIds ? (
                <div className="tiptap prose max-w-none" dangerouslySetInnerHTML={{ __html: htmlWithIds }} />
              ) : (
                <p className="text-[var(--text-secondary)]">Article content is not yet available.</p>
              )}
              <ShareBar title={resolved.title} url={articleUrl} tags={tagNames} />
              <AuthorBio name={post.author.name} image={post.author.image} />
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {headings.length > 0 && (
                  <div className="p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)]">
                    <TableOfContents headings={headings} />
                  </div>
                )}
                {afterToc.length > 0 && (
                  <div className="space-y-4">
                    {afterToc.map(cta => <CtaRenderer key={cta.id} widget={cta} />)}
                  </div>
                )}
                {sidebarCtas.map(cta => <CtaRenderer key={cta.id} widget={cta} />)}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {belowArticle.length > 0 && (
        <div className="max-w-3xl mx-auto px-4 mb-12 space-y-4">
          {belowArticle.map(cta => <CtaRenderer key={cta.id} widget={cta} />)}
        </div>
      )}

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-16 px-4 bg-[var(--bg-subtle)]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">{t(locale, 'blog.relatedArticles')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rel: any) => {
                const relTitle = (locale === 'en' && rel.titleEn) ? rel.titleEn : rel.titleId
                const relExcerpt = (locale === 'en' && rel.excerptEn) ? rel.excerptEn : rel.excerptId
                const relSlug = (locale === 'en' && rel.slugEn) ? rel.slugEn : rel.slug
                return (
                  <Link key={rel.id} href={localePath(`/blog/${relSlug}`, locale)} className="group block rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden hover:border-[var(--border-hover)] transition-all">
                    {rel.featuredImage && (
                      <div className="aspect-[16/9] relative overflow-hidden">
                        <Image src={rel.featuredImage} alt={relTitle} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="font-semibold text-[var(--text-primary)] leading-snug mb-2 group-hover:text-brand-violet transition-colors line-clamp-2">{relTitle}</h3>
                      {relExcerpt && <p className="text-sm text-[var(--text-muted)] line-clamp-2">{relExcerpt}</p>}
                      <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mt-3">
                        {rel.publishedAt && <span>{formatDate(rel.publishedAt)}</span>}
                        {rel.readingTime && <span>{rel.readingTime} {t(locale, 'common.readingTime')}</span>}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {stickyBottom.map(cta => <CtaRenderer key={cta.id} widget={cta} />)}
    </>
  )
}
