import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { SITE } from '@/lib/constants'

const BASE = SITE.url.replace(/\/$/, '')

const STATIC_PAGES = [
  { path: '/', priority: 1.0, changeFreq: 'weekly' as const },
  { path: '/blog', priority: 0.9, changeFreq: 'daily' as const },
  { path: '/services', priority: 0.8, changeFreq: 'monthly' as const },
  { path: '/portfolio', priority: 0.7, changeFreq: 'monthly' as const },
  { path: '/about', priority: 0.6, changeFreq: 'monthly' as const },
  { path: '/contact', priority: 0.6, changeFreq: 'monthly' as const },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true, slugEn: true, updatedAt: true },
    orderBy: { updatedAt: 'desc' },
  })

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.flatMap(({ path, priority, changeFreq }) => {
    const idEntry = {
      url: `${BASE}${path}`,
      lastModified: new Date(),
      changeFrequency: changeFreq,
      priority,
    }
    const enEntry = {
      url: `${BASE}/en${path === '/' ? '' : path}`,
      lastModified: new Date(),
      changeFrequency: changeFreq,
      priority: priority * 0.9,
    }
    return [idEntry, enEntry]
  })

  const blogEntries: MetadataRoute.Sitemap = posts.flatMap(post => {
    const entries: MetadataRoute.Sitemap = [
      {
        url: `${BASE}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.7,
      },
    ]
    if (post.slugEn) {
      entries.push({
        url: `${BASE}/en/blog/${post.slugEn}`,
        lastModified: post.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.65,
      })
    }
    return entries
  })

  return [...staticEntries, ...blogEntries]
}
