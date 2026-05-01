import { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { buildMetadata } from '@/lib/seo'
import { BlogCard } from '@/components/public/BlogCard'
import { BlogEmptyState } from './BlogEmptyState'
import { type Locale, t, localePath } from '@/lib/i18n'

const CATEGORIES = [
  { slug: 'seo', name: 'SEO' },
  { slug: 'social-media', name: 'Social Media' },
  { slug: 'paid-ads', name: 'Paid Ads' },
  { slug: 'branding', name: 'Branding' },
  { slug: 'web-dev', name: 'Web Development' },
]

export function generateBlogListMetadata(locale: Locale): Metadata {
  const description = locale === 'en'
    ? 'Latest digital marketing tips, guides, and insights from the Logink team. Learn actionable strategies for SEO, Social Media, Paid Ads, and content marketing.'
    : 'Tips, panduan, dan insight digital marketing terbaru dari tim Logink. Pelajari strategi SEO, Social Media, Paid Ads, dan konten yang bisa langsung diterapkan.'
  return buildMetadata({
    title: locale === 'en' ? 'Digital Marketing Blog & Insights' : 'Blog Digital Marketing',
    description,
    path: localePath('/blog', locale),
  })
}

export async function BlogListPage({ locale }: { locale: Locale }) {
  let posts: any[] = []
  try {
    const where: any = { status: 'PUBLISHED' }
    if (locale === 'en') {
      where.titleEn = { not: null }
      where.bodyEn = { not: null }
    }
    posts = await prisma.post.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      take: 12,
      select: {
        id: true, titleId: true, titleEn: true, slug: true, slugEn: true,
        excerptId: true, excerptEn: true, featuredImage: true,
        publishedAt: true, readingTime: true, status: true, createdAt: true,
        author: { select: { name: true, image: true } },
        category: { select: { nameId: true, nameEn: true, slug: true } },
      },
    })
  } catch { posts = [] }

  return (
    <>
      <section className="pt-32 pb-16 px-4 mesh-gradient text-center">
        <span className="inline-block px-4 py-1.5 rounded-full border border-brand-violet/20 bg-brand-violet/5 text-brand-violet text-sm font-medium mb-6">
          {t(locale, 'blog.headline').split('&')[0].trim()}
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] mb-4">
          {locale === 'en' ? (
            <>Digital Marketing <span className="gradient-text">Insights</span></>
          ) : (
            <>Blog & <span className="gradient-text">Insight</span></>
          )}
        </h1>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto">{t(locale, 'blog.subtext')}</p>
      </section>

      {/* Category filter */}
      <section className="py-8 px-4 bg-[var(--bg-surface)] border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-center">
          <Link
            href={localePath('/blog', locale)}
            className="px-4 py-2 rounded-xl text-sm font-medium gradient-bg text-white"
          >
            {t(locale, 'blog.allCategories')}
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={localePath(`/blog/category/${cat.slug}`, locale)}
              className="px-4 py-2 rounded-xl text-sm font-medium border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-brand-violet/50 transition-all"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-20 px-4 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any) => (
                <BlogCard key={post.id} post={post} locale={locale} />
              ))}
            </div>
          ) : (
            <BlogEmptyState locale={locale} />
          )}
        </div>
      </section>
    </>
  )
}
