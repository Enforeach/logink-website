import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPostBySlug, getRelatedPosts, getActiveCtas } from '@/payload/queries'
import { getPayloadClient } from '@/payload/client'
import { buildMetadata } from '@/lib/seo'
import { formatDate } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { TableOfContents } from './TableOfContents'
import { AuthorBio } from './AuthorBio'
import { BlogListRow } from './BlogListRow'
import { BlogSidebarCta } from './BlogSidebarCta'
import { Reveal } from './Reveal'
import { CtaRenderer } from '@/components/public/cta/CtaRenderer'

const ReadingProgress = dynamic(() => import('./ReadingProgress').then(m => ({ default: m.ReadingProgress })))
const ShareBar = dynamic(() => import('./ShareBar').then(m => ({ default: m.ShareBar })))
import { filterCtasForPost, extractHeadings, injectHeadingIds } from '@/lib/cta'
import { resolvePostContent } from '@/lib/i18n/content'
import { type Locale, t, localePath } from '@/lib/i18n'
import { SITE } from '@/lib/constants'

// ponytail: mapped post drops category id; one depth-0 read recovers it for CTA/related targeting
async function getPostCategoryId(postId: string): Promise<string | null> {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'posts', where: { id: { equals: postId } }, depth: 0, limit: 1 })
    const cat = (res.docs[0] as { category?: unknown } | undefined)?.category
    return cat != null ? String(cat) : null
  } catch { return null }
}

export async function generateBlogDetailMetadata(slug: string, locale: Locale): Promise<Metadata> {
  const post = await getPostBySlug(slug, locale)
  if (!post) return {}

  const resolved = resolvePostContent(post, locale)

  const siteUrl = SITE.url
  const idPath = `/blog/${post.slug}`
  const enPath = post.slugEn ? `/en/blog/${post.slugEn}` : null

  return {
    ...buildMetadata({
      title: resolved.metaTitle || resolved.title,
      description: resolved.metaDescription || resolved.excerpt || '',
      path: localePath(`/blog/${slug}`, locale),
      ogImage: post.ogImage || post.featuredImage || undefined,
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
  const [post, allCtas] = await Promise.all([getPostBySlug(slug, locale), getActiveCtas()])
  if (!post) notFound()

  const resolved = resolvePostContent(post, locale)

  const categoryId = await getPostCategoryId(post.id)
  const tagIds = post.tags.map(pt => pt.tag.id)
  const tagNames = post.tags.map(pt => pt.tag.name)
  const matchedCtas = filterCtasForPost(allCtas, post.id, tagIds, categoryId)

  const rawHtml = resolved.body || ''
  const htmlWithIds = injectHeadingIds(rawHtml)
  const headings = extractHeadings(rawHtml)

  const aboveFold = matchedCtas.filter(c => c.placement === 'ABOVE_FOLD')
  const afterToc = matchedCtas.filter(c => c.placement === 'AFTER_TOC')
  const sidebarCtas = matchedCtas.filter(c => c.placement === 'SIDEBAR')
  const belowArticle = matchedCtas.filter(c => c.placement === 'BELOW_ARTICLE')
  const stickyBottom = matchedCtas.filter(c => c.placement === 'STICKY_BOTTOM')

  const related = await getRelatedPosts(post.id, categoryId, locale)

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

      {/* F-pattern sweep 1 — category · title · meta row */}
      <section className="pt-32 pb-10 px-6 mesh-gradient">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6" aria-label="Breadcrumb">
            <Link href={localePath('/', locale)} className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
            <span>/</span>
            <Link href={localePath('/blog', locale)} className="hover:text-[var(--text-primary)] transition-colors">{t(locale, 'nav.blog')}</Link>
            {post.category && (
              <>
                <span>/</span>
                <Link href={localePath(`/blog/category/${post.category.slug}`, locale)} className="hover:text-[var(--text-primary)] transition-colors">
                  {categoryName}
                </Link>
              </>
            )}
          </nav>

          {post.category && (
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-brand-crimson/10 text-brand-crimson mb-4">
              {categoryName}
            </span>
          )}

          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.08] text-[var(--text-primary)] mb-6 max-w-4xl">
            {resolved.title}
          </h1>

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
            {!!post.readingTime && <span>{post.readingTime} {t(locale, 'common.readingTime')}</span>}
            {!!post.wordCount && <span>{post.wordCount.toLocaleString()} words</span>}
          </div>

          {/* F-pattern sweep 2 — hook line + share row under a hairline */}
          <div className="mt-8 pt-6 border-t border-[var(--border-default)]">
            {resolved.excerpt && (
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-3xl">{resolved.excerpt}</p>
            )}
            <div className="mt-5">
              <ShareBar title={resolved.title} url={articleUrl} tags={tagNames} />
            </div>
          </div>
        </div>
      </section>

      {/* Fallback banner for EN posts without translation */}
      {resolved.isFallback && (
        <div className="max-w-6xl mx-auto px-6 mt-6">
          <div className="flex items-start gap-3 rounded-xl border-l-4 border-brand-purple bg-brand-purple/5 px-4 py-3">
            <span className="text-brand-purple mt-0.5 shrink-0">ℹ</span>
            <div className="text-sm">
              <span className="text-[var(--text-secondary)]">{t(locale, 'blog.fallbackBanner')} </span>
              {resolved.alternateSlug && (
                <Link href={`/blog/${resolved.alternateSlug}`} className="text-brand-purple hover:text-brand-magenta underline underline-offset-2">
                  {t(locale, 'blog.viewOriginal')}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Featured image */}
      {post.featuredImage && (
        <div className="max-w-6xl mx-auto px-6 mt-8 mb-10">
          <div className="aspect-[16/9] relative rounded-2xl overflow-hidden border border-[var(--border-default)]">
            <Image src={post.featuredImage} alt={post.featuredImageAlt || resolved.title} fill className="object-cover" priority />
          </div>
        </div>
      )}

      {/* Above-fold CTAs */}
      {aboveFold.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mb-8 space-y-4">
          {aboveFold.map(cta => <CtaRenderer key={cta.id} widget={cta} />)}
        </div>
      )}

      {/* F-pattern stem — body left (max-w-[65ch]) + sticky right rail */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-12 items-start">
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
                <div
                  className="tiptap max-w-[65ch] leading-[1.75] [&_h2]:font-display [&_h2]:text-[1.75rem] [&_h2]:font-bold [&_h2]:tracking-[-0.02em] [&_h2]:leading-[1.15] [&_h2]:scroll-mt-28 [&_h3]:font-display [&_h3]:font-semibold [&_h3]:tracking-[-0.01em] [&_h3]:scroll-mt-28 [&>p:first-of-type]:text-lg [&>p:first-of-type]:text-[var(--text-secondary)] [&_a]:text-brand-purple [&_a:hover]:text-brand-magenta [&_strong]:font-semibold [&_strong]:text-[var(--text-primary)]"
                  dangerouslySetInnerHTML={{ __html: htmlWithIds }}
                />
              ) : (
                <p className="text-[var(--text-secondary)]">Article content is not yet available.</p>
              )}
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
                {sidebarCtas.length === 0 && <BlogSidebarCta locale={locale} />}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {belowArticle.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mb-12 space-y-4">
          {belowArticle.map(cta => <CtaRenderer key={cta.id} widget={cta} />)}
        </div>
      )}

      {/* Related articles — compact horizontal rows, same F rhythm */}
      {related.length > 0 && (
        <section className="py-16 md:py-24 px-6 bg-[var(--bg-surface)] border-t border-[var(--border-default)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-[-0.02em] text-[var(--text-primary)] mb-4">{t(locale, 'blog.relatedArticles')}</h2>
            <div className="divide-y divide-[var(--border-default)]">
              {related.map((rel, i) => (
                <Reveal key={rel.id} delay={Math.min(i * 0.08, 0.24)}>
                  <BlogListRow post={rel} locale={locale} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {stickyBottom.map(cta => <CtaRenderer key={cta.id} widget={cta} />)}
    </>
  )
}
