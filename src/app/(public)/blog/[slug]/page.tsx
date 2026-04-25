import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { buildMetadata } from '@/lib/seo'
import { formatDate } from '@/lib/utils'
import { CTASection } from '@/components/public/CTASection'

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
  const post = await getPost(slug)
  if (!post) notFound()

  const bodyContent = post.bodyId ? (() => {
    try { return JSON.parse(post.bodyId) } catch { return null }
  })() : null

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 px-4 mesh-gradient">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
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
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              {post.author.image ? (
                <Image src={post.author.image} alt={post.author.name} width={28} height={28} className="rounded-full" />
              ) : (
                <div className="h-7 w-7 rounded-full gradient-bg flex items-center justify-center text-[10px] font-bold text-white">
                  {post.author.name[0]}
                </div>
              )}
              <span>{post.author.name}</span>
            </div>
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
            {post.readingTime && <span>{post.readingTime} min read</span>}
          </div>
        </div>
      </section>

      {/* Featured image */}
      {post.featuredImage && (
        <div className="max-w-3xl mx-auto px-4 -mt-4 mb-12">
          <div className="aspect-[16/9] relative rounded-2xl overflow-hidden">
            <Image src={post.featuredImage} alt={post.titleId} fill className="object-cover" priority />
          </div>
        </div>
      )}

      {/* Article body */}
      <section className="pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          {post.excerptId && (
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 font-medium border-l-4 border-brand-violet pl-6">
              {post.excerptId}
            </p>
          )}
          {!bodyContent && (
            <p className="text-[var(--text-secondary)]">Article content is not yet available.</p>
          )}
          {bodyContent && (
            <div className="tiptap prose max-w-none" dangerouslySetInnerHTML={{ __html: typeof bodyContent === 'string' ? bodyContent : JSON.stringify(bodyContent) }} />
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-[var(--border-default)] flex flex-wrap gap-2">
              {post.tags.map(({ tag }) => (
                <span key={tag.id} className="px-3 py-1 rounded-full text-xs border border-[var(--border-default)] text-[var(--text-muted)]">
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection title={`Need help with ${post.category?.nameEn || post.category?.nameId || 'digital marketing'}?`} subtitle="The Logink team is ready for a free consultation." />
    </>
  )
}
