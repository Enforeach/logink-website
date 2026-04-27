import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { buildMetadata } from '@/lib/seo'
import { formatDate } from '@/lib/utils'
import { ReadingProgress } from '@/components/public/blog/ReadingProgress'
import { TableOfContents } from '@/components/public/blog/TableOfContents'
import { ShareBar } from '@/components/public/blog/ShareBar'
import { AuthorBio } from '@/components/public/blog/AuthorBio'
import { CtaRenderer } from '@/components/public/cta/CtaRenderer'
import { filterCtasForPost, extractHeadings, injectHeadingIds, type CtaWidgetRow } from '@/lib/cta'

interface Props { params: Promise<{ slug: string }> }

async function getPost(slug: string) {
  try {
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

async function getRelated(postId: string, categoryId: string | null, limit = 3) {
  if (!categoryId) return []
  try {
    return await prisma.post.findMany({
      where: { status: 'PUBLISHED', categoryId, id: { not: postId } },
      select: {
        id: true, titleId: true, slug: true, featuredImage: true,
        publishedAt: true, readingTime: true, excerptId: true,
      },
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return buildMetadata({
    title: post.metaTitle || post.titleId,
    description: post.metaDescription || post.excerptId || '',
    path: `/blog/${slug}`,
    ogImage: post.ogImage || post.featuredImage || undefined,
    type: 'article',
  })
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const [post, allCtas] = await Promise.all([getPost(slug), getActiveCtas()])
  if (!post) notFound()

  const tagIds = post.tags.map(t => t.tag.id)
  const tagNames = post.tags.map(t => t.tag.name)
  const matchedCtas = filterCtasForPost(allCtas, post.id, tagIds, post.categoryId)

  const rawHtml = post.bodyId || ''
  const htmlWithIds = injectHeadingIds(rawHtml)
  const headings = extractHeadings(rawHtml)

  const aboveFold = matchedCtas.filter(c => c.placement === 'ABOVE_FOLD')
  const afterToc = matchedCtas.filter(c => c.placement === 'AFTER_TOC')
  const sidebarCtas = matchedCtas.filter(c => c.placement === 'SIDEBAR')
  const belowArticle = matchedCtas.filter(c => c.placement === 'BELOW_ARTICLE')
  const stickyBottom = matchedCtas.filter(c => c.placement === 'STICKY_BOTTOM')

  const related = await getRelated(post.id, post.categoryId)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://logink.id'
  const articleUrl = `${siteUrl}/blog/${slug}`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.titleId,
    description: post.metaDescription || post.excerptId || '',
    url: articleUrl,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt?.toISOString(),
    author: { '@type': 'Person', name: post.author.name },
    publisher: { '@type': 'Organization', name: 'Logink', url: siteUrl },
    ...(post.featuredImage && { image: post.featuredImage }),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
      ...(post.category
        ? [{ '@type': 'ListItem', position: 3, name: post.category.nameId, item: `${siteUrl}/blog/category/${post.category.slug}` }]
        : []),
      { '@type': 'ListItem', position: post.category ? 4 : 3, name: post.titleId, item: articleUrl },
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
            <Link href="/" className="hover:text-[var(--text-primary)]">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[var(--text-primary)]">Blog</Link>
            {post.category && (
              <>
                <span>/</span>
                <Link href={`/blog/category/${post.category.slug}`} className="hover:text-[var(--text-primary)]">
                  {post.category.nameId}
                </Link>
              </>
            )}
          </nav>

          {post.category && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-brand-violet/10 text-brand-violet border border-brand-violet/20 mb-4">
              {post.category.nameId}
            </span>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] mb-6 leading-tight">
            {post.titleId}
          </h1>

          {post.excerptId && (
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
              {post.excerptId}
            </p>
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
            {post.readingTime && <span>{post.readingTime} min read</span>}
            {post.wordCount && <span>{post.wordCount.toLocaleString()} words</span>}
          </div>
        </div>
      </section>

      {/* Featured image */}
      {post.featuredImage && (
        <div className="max-w-5xl mx-auto px-4 -mt-4 mb-8">
          <div className="aspect-[16/9] relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={post.featuredImage}
              alt={(post as any).featuredImageAlt || post.titleId}
              fill
              className="object-cover"
              priority
            />
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

            {/* Article */}
            <article>
              {/* TOC on mobile */}
              {headings.length > 0 && (
                <div className="lg:hidden mb-8 p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)]">
                  <TableOfContents headings={headings} />
                </div>
              )}

              {/* After-TOC CTAs on mobile */}
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

              <ShareBar title={post.titleId} url={articleUrl} tags={tagNames} />
              <AuthorBio name={post.author.name} image={post.author.image} />
            </article>

            {/* Sidebar */}
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

      {/* Below-article CTAs */}
      {belowArticle.length > 0 && (
        <div className="max-w-3xl mx-auto px-4 mb-12 space-y-4">
          {belowArticle.map(cta => <CtaRenderer key={cta.id} widget={cta} />)}
        </div>
      )}

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-16 px-4 bg-[var(--bg-subtle)]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(rel => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="group block rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden hover:border-[var(--border-hover)] transition-all"
                >
                  {rel.featuredImage && (
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <Image
                        src={rel.featuredImage}
                        alt={rel.titleId}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-semibold text-[var(--text-primary)] leading-snug mb-2 group-hover:text-brand-violet transition-colors line-clamp-2">
                      {rel.titleId}
                    </h3>
                    {rel.excerptId && (
                      <p className="text-sm text-[var(--text-muted)] line-clamp-2">{rel.excerptId}</p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mt-3">
                      {rel.publishedAt && <span>{formatDate(rel.publishedAt)}</span>}
                      {rel.readingTime && <span>{rel.readingTime} min read</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky-bottom CTAs */}
      {stickyBottom.map(cta => <CtaRenderer key={cta.id} widget={cta} />)}
    </>
  )
}
