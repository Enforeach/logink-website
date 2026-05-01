import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { SITE } from '@/lib/constants'

const BASE = SITE.url.replace(/\/$/, '')

type Freq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

function entry(
  idPath: string,
  enPath: string,
  priority: number,
  changeFreq: Freq,
  lastModified: Date = new Date(),
): MetadataRoute.Sitemap {
  const idUrl = `${BASE}${idPath}`
  const enUrl = `${BASE}${enPath}`
  const alternates = {
    languages: {
      'id': idUrl,
      'en': enUrl,
      'x-default': idUrl,
    },
  }
  return [
    { url: idUrl, lastModified, changeFrequency: changeFreq, priority, alternates },
    { url: enUrl, lastModified, changeFrequency: changeFreq, priority: priority * 0.9, alternates },
  ]
}

// Static page pairs [idPath, enPath, priority, changeFreq]
const STATIC_PAIRS: [string, string, number, Freq][] = [
  ['/', '/en', 1.0, 'weekly'],
  ['/about', '/en/about', 0.6, 'monthly'],
  ['/contact', '/en/contact', 0.6, 'monthly'],
  ['/portfolio', '/en/portfolio', 0.75, 'weekly'],
  ['/blog', '/en/blog', 0.9, 'daily'],
  ['/privacy', '/en/privacy', 0.3, 'yearly'],
  ['/terms', '/en/terms', 0.3, 'yearly'],
  // Services overview
  ['/layanan', '/en/services', 0.85, 'monthly'],
  // Individual service pages
  ['/layanan/jasa-seo-profesional', '/en/services/seo-content-marketing', 0.9, 'monthly'],
  ['/layanan/sosial-media-manajemen', '/en/services/social-media-management', 0.9, 'monthly'],
  ['/layanan/paid-ads', '/en/services/paid-advertising', 0.9, 'monthly'],
  ['/layanan/website-development', '/en/services/website-landing-page', 0.9, 'monthly'],
  ['/layanan/kreatif', '/en/services/creative-services', 0.9, 'monthly'],
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const staticEntries = STATIC_PAIRS.flatMap(([id, en, priority, freq]) =>
    entry(id, en, priority, freq)
  )

  const blogEntries: MetadataRoute.Sitemap = posts.flatMap(post => {
    const idUrl = `${BASE}/blog/${post.slug}`
    const enUrl = post.slugEn ? `${BASE}/en/blog/${post.slugEn}` : null
    const alternates = enUrl
      ? { languages: { 'id': idUrl, 'en': enUrl, 'x-default': idUrl } }
      : { languages: { 'id': idUrl, 'x-default': idUrl } }
    const entries: MetadataRoute.Sitemap = [
      { url: idUrl, lastModified: post.updatedAt, changeFrequency: 'weekly', priority: 0.7, alternates },
    ]
    if (enUrl) {
      entries.push({ url: enUrl, lastModified: post.updatedAt, changeFrequency: 'weekly', priority: 0.65, alternates })
    }
    return entries
  })

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.flatMap(cs => {
    const idUrl = `${BASE}/portfolio/${cs.slug}`
    const enUrl = cs.slugEn ? `${BASE}/en/portfolio/${cs.slugEn}` : null
    const alternates = enUrl
      ? { languages: { 'id': idUrl, 'en': enUrl, 'x-default': idUrl } }
      : { languages: { 'id': idUrl, 'x-default': idUrl } }
    const entries: MetadataRoute.Sitemap = [
      { url: idUrl, lastModified: cs.updatedAt, changeFrequency: 'monthly', priority: 0.7, alternates },
    ]
    if (enUrl) {
      entries.push({ url: enUrl, lastModified: cs.updatedAt, changeFrequency: 'monthly', priority: 0.65, alternates })
    }
    return entries
  })

  return [...staticEntries, ...blogEntries, ...caseStudyEntries]
}
