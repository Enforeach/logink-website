import { prisma } from '@/lib/prisma'
import { SITE } from '@/lib/constants'

const BASE = SITE.url.replace(/\/$/, '')

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

type Freq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

function urlEntry(
  url: string,
  lastmod: string,
  changefreq: Freq,
  priority: number,
  alts?: { id: string; en: string }
): string {
  const altLinks = alts
    ? `    <xhtml:link rel="alternate" hreflang="id" href="${esc(alts.id)}" />\n` +
      `    <xhtml:link rel="alternate" hreflang="en" href="${esc(alts.en)}" />\n` +
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(alts.id)}" />\n`
    : ''
  return (
    `  <url>\n` +
    `    <loc>${esc(url)}</loc>\n` +
    altLinks +
    `    <lastmod>${lastmod}</lastmod>\n` +
    `    <changefreq>${changefreq}</changefreq>\n` +
    `    <priority>${priority}</priority>\n` +
    `  </url>\n`
  )
}

const STATIC_PAIRS: [string, string, number, Freq][] = [
  ['/', '/en', 1.0, 'weekly'],
  ['/about', '/en/about', 0.6, 'monthly'],
  ['/contact', '/en/contact', 0.6, 'monthly'],
  ['/portfolio', '/en/portfolio', 0.75, 'weekly'],
  ['/blog', '/en/blog', 0.9, 'daily'],
  ['/privacy', '/en/privacy', 0.3, 'yearly'],
  ['/terms', '/en/terms', 0.3, 'yearly'],
  ['/layanan', '/en/services', 0.85, 'monthly'],
  ['/layanan/jasa-seo-profesional', '/en/services/seo-content-marketing', 0.9, 'monthly'],
  ['/layanan/sosial-media-manajemen', '/en/services/social-media-management', 0.9, 'monthly'],
  ['/layanan/paid-ads', '/en/services/paid-advertising', 0.9, 'monthly'],
  ['/layanan/website-development', '/en/services/website-landing-page', 0.9, 'monthly'],
  ['/layanan/kreatif', '/en/services/creative-services', 0.9, 'monthly'],
]

export async function GET() {
  const now = new Date().toISOString()

  const [posts, caseStudies] = await Promise.all([
    prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, slugEn: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.caseStudy.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, slugEn: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    }),
  ])

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'

  for (const [idPath, enPath, priority, freq] of STATIC_PAIRS) {
    const idUrl = `${BASE}${idPath}`
    const enUrl = `${BASE}${enPath}`
    const alts = { id: idUrl, en: enUrl }
    xml += urlEntry(idUrl, now, freq, priority, alts)
    xml += urlEntry(enUrl, now, freq, Math.round(priority * 90) / 100, alts)
  }

  for (const post of posts) {
    const idUrl = `${BASE}/blog/${post.slug}`
    const enUrl = post.slugEn ? `${BASE}/en/blog/${post.slugEn}` : null
    const alts = enUrl ? { id: idUrl, en: enUrl } : undefined
    xml += urlEntry(idUrl, post.updatedAt.toISOString(), 'weekly', 0.7, alts)
    if (enUrl) xml += urlEntry(enUrl, post.updatedAt.toISOString(), 'weekly', 0.65, alts)
  }

  for (const cs of caseStudies) {
    const idUrl = `${BASE}/portfolio/${cs.slug}`
    const enUrl = cs.slugEn ? `${BASE}/en/portfolio/${cs.slugEn}` : null
    const alts = enUrl ? { id: idUrl, en: enUrl } : undefined
    xml += urlEntry(idUrl, cs.updatedAt.toISOString(), 'monthly', 0.7, alts)
    if (enUrl) xml += urlEntry(enUrl, cs.updatedAt.toISOString(), 'monthly', 0.65, alts)
  }

  xml += '</urlset>'

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
