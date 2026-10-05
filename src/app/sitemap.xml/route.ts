// Sitemap from the registry + CMS (BUILD §1.11): 15 registry pairs, published posts and cases, and the
// blog categories with >= CATEGORY_MIN_POSTS posts in that locale. lastmod is the registry `updated` or
// the CMS updatedAt, never the build time. hreflang only where both sides exist.
import { getBlogList, getSitemapEntries } from '@/payload/queries'
import { CATEGORIES, CATEGORY_MIN_POSTS, SITE_URL, STATIC_PAIRS } from '@/lib/services'

export const revalidate = 3600

type Alts = { id: string; en: string } | null
type Entry = { loc: string; lastmod: string; freq: string; priority: number; alts: Alts }

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const abs = (p: string) => `${SITE_URL}${p === '/' ? '' : p}`
const day = (d: Date | string | null | undefined) => (d ? new Date(d).toISOString().slice(0, 10) : null)
const latest = (ds: (Date | null | undefined)[]) => day(ds.filter(Boolean).sort((a, b) => +b! - +a!)[0])

function url({ loc, lastmod, freq, priority, alts }: Entry) {
  const links = alts
    ? `    <xhtml:link rel="alternate" hreflang="id" href="${esc(alts.id)}" />\n` +
      `    <xhtml:link rel="alternate" hreflang="en" href="${esc(alts.en)}" />\n` +
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(alts.id)}" />\n`
    : ''
  return `  <url>\n    <loc>${esc(loc)}</loc>\n${links}    <lastmod>${lastmod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`
}

// Both sides of a pair (or one side when the other is null); EN priority is 90% of ID.
function pair(id: string | null, en: string | null, lastmod: string, freq: string, priority: number): Entry[] {
  const alts = id && en ? { id: abs(id), en: abs(en) } : null
  return [
    ...(id ? [{ loc: abs(id), lastmod, freq, priority, alts }] : []),
    ...(en ? [{ loc: abs(en), lastmod, freq, priority: Math.round(priority * 90) / 100, alts }] : []),
  ]
}

export async function GET() {
  const { posts, caseStudies } = await getSitemapEntries()
  const cats = await Promise.all(
    Object.keys(CATEGORIES).map(async (slug) => {
      const [id, en] = await Promise.all([getBlogList('id', slug), getBlogList('en', slug)])
      return { slug, id: id.posts, en: en.posts }
    }),
  )

  const entries: Entry[] = [
    ...STATIC_PAIRS().flatMap(([id, en, priority, freq, updated]) => pair(id, en, updated, freq, priority)),
    ...posts.flatMap((p) => pair(`/blog/${p.slug}`, p.slugEn ? `/en/blog/${p.slugEn}` : null, day(p.updatedAt)!, 'weekly', 0.7)),
    ...caseStudies.flatMap((c) => pair(`/portfolio/${c.slug}`, c.slugEn ? `/en/portfolio/${c.slugEn}` : null, day(c.updatedAt)!, 'monthly', 0.7)),
    ...cats.flatMap((c) => {
      const idOk = c.id.length >= CATEGORY_MIN_POSTS
      const enOk = c.en.length >= CATEGORY_MIN_POSTS
      const lastmod = latest([...c.id, ...c.en].map((p) => p.updatedAt))
      return lastmod ? pair(idOk ? `/blog/category/${c.slug}` : null, enOk ? `/en/blog/category/${c.slug}` : null, lastmod, 'weekly', 0.5) : []
    }),
  ].filter((e) => e.lastmod)

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    entries.map(url).join('') +
    '</urlset>'

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
