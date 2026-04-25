import { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'
import { BlogCard } from '@/components/public/BlogCard'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = buildMetadata({
  title: 'Digital Marketing Blog',
  description: 'Tips, strategies, and insights on SEO, Social Media, Paid Advertising, and digital marketing.',
  path: '/blog',
})

export const revalidate = 3600

const CATEGORIES = [
  { slug: 'seo', name: 'SEO' },
  { slug: 'social-media', name: 'Social Media' },
  { slug: 'paid-ads', name: 'Paid Ads' },
  { slug: 'branding', name: 'Branding' },
  { slug: 'web-dev', name: 'Web Development' },
]

export default async function BlogPage() {
  let posts: any[] = []
  try {
    posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      take: 12,
      include: {
        author: { select: { name: true, image: true } },
        category: { select: { nameId: true, nameEn: true, slug: true } },
      },
    })
  } catch { posts = [] }

  return (
    <>
      <section className="pt-32 pb-16 px-4 mesh-gradient text-center">
        <span className="inline-block px-4 py-1.5 rounded-full border border-brand-violet/20 bg-brand-violet/5 text-brand-violet text-sm font-medium mb-6">Blog</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] mb-4">
          Digital Marketing{' '}
          <span className="gradient-text">Insights</span>
        </h1>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto">Tips, strategies, and insights from the Logink team.</p>
      </section>

      {/* Category filter */}
      <section className="py-8 px-4 bg-[var(--bg-surface)] border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-center">
          <Link href="/blog" className="px-4 py-2 rounded-xl text-sm font-medium gradient-bg text-white">All</Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog/category/${cat.slug}`}
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
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Articles coming soon</h3>
              <p className="text-[var(--text-secondary)]">Our team is preparing quality content for you.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
