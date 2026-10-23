import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getBlogList } from '@/payload/queries'
import { buildMetadata } from '@/lib/seo'
import { formatDate } from '@/lib/utils'
import { BlogEmptyState } from './BlogEmptyState'
import { BlogListRow, type RowPost } from './BlogListRow'
import { BlogSidebarCta } from './BlogSidebarCta'
import { Reveal } from './Reveal'
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
    title: locale === 'en' ? 'Digital Marketing Blog & Insights' : 'Blog & Insight Digital Marketing',
    description,
    path: localePath('/blog', locale),
  })
}

export async function BlogListPage({ locale }: { locale: Locale }) {
  let posts: RowPost[] = []
  try {
    const result = await getBlogList(locale)
    posts = result.posts
  } catch { posts = [] }

  const featured = posts[0]
  const rest = posts.slice(1)
  const featuredTitle = featured ? ((locale === 'en' && featured.titleEn) ? featured.titleEn : featured.titleId) : ''
  const featuredExcerpt = featured ? ((locale === 'en' && featured.excerptEn) ? featured.excerptEn : featured.excerptId) : ''
  const featuredSlug = featured ? ((locale === 'en' && featured.slugEn) ? featured.slugEn : featured.slug) : ''
  const featuredCategory = featured ? ((locale === 'en' && featured.category?.nameEn) ? featured.category.nameEn : featured.category?.nameId) : null

  return (
    <>
      {/* F-pattern sweep 1 - page header + featured post (text left, image right) */}
      <section className="pt-32 pb-14 px-6 mesh-gradient">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-4">{t(locale, 'blog.headline').split('&')[0].trim()}</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4 max-w-3xl">
            {locale === 'en' ? (
              <>Digital Marketing Blog & <span className="gradient-text">Insights</span></>
            ) : (
              <>Blog & Insight <span className="gradient-text">Digital Marketing</span></>
            )}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-xl">{t(locale, 'blog.subtext')}</p>

          {featured && (
            <Reveal className="mt-12">
              <Link
                href={localePath(`/blog/${featuredSlug}`, locale)}
                className="group grid md:grid-cols-2 gap-8 items-center rounded-3xl border border-[var(--border-default)] bg-white p-6 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson/40"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-brand-peach md:order-2">
                  {featured.featuredImage ? (
                    <Image
                      src={featured.featuredImage}
                      alt={featuredTitle}
                      fill
                      priority
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-brand opacity-20" aria-hidden />
                  )}
                </div>
                <div className="md:order-1">
                  {featured.category && (
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-brand-crimson/10 text-brand-crimson mb-4">
                      {featuredCategory}
                    </span>
                  )}
                  <h2 className="font-display text-2xl md:text-4xl font-bold tracking-[-0.02em] leading-[1.1] text-[var(--text-primary)] transition-colors group-hover:text-brand-crimson">
                    {featuredTitle}
                  </h2>
                  {featuredExcerpt && (
                    <p className="text-[var(--text-secondary)] leading-relaxed line-clamp-3 mt-4">{featuredExcerpt}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--text-muted)] mt-6">
                    <span className="inline-flex items-center gap-2 font-medium text-[var(--text-secondary)]">
                      {featured.author?.image ? (
                        <Image src={featured.author.image} alt={featured.author.name} width={22} height={22} className="rounded-full object-cover" />
                      ) : (
                        <span className="h-[22px] w-[22px] rounded-full gradient-bg inline-flex items-center justify-center text-[9px] font-bold text-white">
                          {featured.author?.name?.[0]}
                        </span>
                      )}
                      {featured.author?.name}
                    </span>
                    {featured.publishedAt && <span>{formatDate(featured.publishedAt)}</span>}
                    {!!featured.readingTime && <span>{featured.readingTime} min</span>}
                  </div>
                </div>
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      {/* F-pattern sweep 2 - category filter pills */}
      <nav aria-label={locale === 'en' ? 'Blog categories' : 'Kategori blog'} className="py-5 px-6 bg-[var(--bg-surface)] border-y border-[var(--border-default)]">
        <ul className="max-w-7xl mx-auto flex flex-wrap gap-2 list-none p-0 m-0">
          <li>
            <Link
              href={localePath('/blog', locale)}
              className="inline-flex px-4 py-2 rounded-full text-sm font-semibold gradient-bg text-white shadow-cta"
            >
              {t(locale, 'blog.allCategories')}
            </Link>
          </li>
          {CATEGORIES.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={localePath(`/blog/category/${cat.slug}`, locale)}
                className="inline-flex px-4 py-2 rounded-full text-sm font-medium border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-white transition-all"
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* F-pattern vertical stem - list rows + sticky CRO rail */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-12 items-start">
              <div className="divide-y divide-[var(--border-default)] -mt-7">
                {rest.map((post, i) => (
                  <Reveal key={post.id} delay={Math.min(i * 0.06, 0.3)}>
                    <BlogListRow post={post} locale={locale} />
                  </Reveal>
                ))}
              </div>
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <BlogSidebarCta locale={locale} />
                </div>
              </aside>
            </div>
          ) : (
            <BlogEmptyState locale={locale} />
          )}
        </div>
      </section>
    </>
  )
}
