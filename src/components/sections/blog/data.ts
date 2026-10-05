// Blog data helpers: locale picks, URLs, reading time and the per-locale category counts.
// Reads only (Payload local API); src/payload/queries.ts is unchanged.
import { getBlogList, getPostBySlug } from '@/payload/queries'
import { getPayloadClient } from '@/payload/client'
import { CATEGORIES, CATEGORY_MIN_POSTS, type Locale, type SvcKey } from '@/lib/services'

export type ListPost = Awaited<ReturnType<typeof getBlogList>>['posts'][number]
export type FullPost = NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>
type Cat = { nameId: string; nameEn: string | null; slug: string }

export const BLOG_PATH = { id: '/blog', en: '/en/blog' } as const
export const postHref = (p: { slug: string; slugEn: string | null }, l: Locale) => (l === 'en' ? `/en/blog/${p.slugEn ?? p.slug}` : `/blog/${p.slug}`)
export const catHref = (slug: string, l: Locale) => `${BLOG_PATH[l]}/category/${slug}`
export const postTitle = (p: { titleId: string; titleEn: string | null }, l: Locale) => (l === 'en' ? p.titleEn || p.titleId : p.titleId)
// EN never falls back to ID text (no mixed languages): a missing EN excerpt shows nothing.
export const postExcerpt = (p: { excerptId: string | null; excerptEn: string | null }, l: Locale) => (l === 'en' ? p.excerptEn : p.excerptId) || null
export const catName = (c: Cat, l: Locale) => (l === 'en' ? c.nameEn || c.nameId : c.nameId)
export const iso = (d: Date | null) => (d ? d.toISOString() : '')
export const catSvc = (slug?: string | null): SvcKey | null => (slug && CATEGORIES[slug]?.svc) || null

const words = (s: string) => s.replace(/<[^>]+>/g, ' ').replace(/[#*_`>[\]()|-]/g, ' ').split(/\s+/).filter(Boolean).length
export const minutesOf = (text: string) => Math.max(1, Math.ceil(words(text) / 200))

/**
 * Reading minutes + category id per post, from one depth-0 read (the mapped list carries neither:
 * CMS readingTime/wordCount are empty on every post today).
 * ponytail: word count from raw Markdown or the Lexical JSON's text nodes; precise enough for "N menit baca".
 */
export async function postFacts(ids: string[], l: Locale): Promise<Record<string, { minutes: number | null; categoryId: string | null }>> {
  if (!ids.length) return {}
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'posts', where: { id: { in: ids } }, depth: 0, limit: ids.length })
    return Object.fromEntries(
      res.docs.map((d) => {
        const doc = d as unknown as Record<string, unknown>
        const md = (l === 'en' ? doc.bodyMarkdownEn : doc.bodyMarkdownId) as string | undefined
        const rich = l === 'en' ? doc.bodyEn : doc.bodyId
        const text = doc.bodyFormat === 'markdown' ? md ?? '' : [...JSON.stringify(rich ?? '').matchAll(/"text":"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]).join(' ')
        return [String(doc.id), { minutes: text.trim() ? minutesOf(text) : null, categoryId: doc.category != null ? String(doc.category) : null }]
      }),
    )
  } catch {
    return {}
  }
}

/** Posts per category slug in this locale (from the latest list, max 12 posts). */
export const catCounts = (posts: ListPost[]) =>
  posts.reduce<Record<string, number>>((acc, p) => (p.category ? { ...acc, [p.category.slug]: (acc[p.category.slug] ?? 0) + 1 } : acc), {})

/** Indexable = at least CATEGORY_MIN_POSTS posts in the locale (else noindex,follow and no sitemap entry). */
export async function indexable(slug: string, l: Locale) {
  const { posts } = await getBlogList(l, slug)
  return posts.length >= CATEGORY_MIN_POSTS
}

/** The service a list of posts leans on most (rail): dominant category, else SEO. */
export function dominantSvc(posts: ListPost[]): SvcKey {
  const counts = catCounts(posts)
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).find(([slug]) => catSvc(slug))
  return (top && catSvc(top[0])) || 'seo'
}
