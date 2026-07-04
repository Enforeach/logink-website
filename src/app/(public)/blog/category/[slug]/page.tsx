import { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'
import { BlogListRow, type RowPost } from '@/components/public/blog/BlogListRow'
import { BlogSidebarCta } from '@/components/public/blog/BlogSidebarCta'
import { Reveal } from '@/components/public/blog/Reveal'
import { prisma } from '@/lib/prisma'

export const revalidate = 3600

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({ select: { slug: true } })
  return categories.map(c => ({ slug: c.slug }))
}

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return buildMetadata({
    title: `Blog Category: ${slug}`,
    description: `Articles about ${slug} from Logink Digital Marketing Agency.`,
    path: `/blog/category/${slug}`,
  })
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params
  let category = null
  let posts: RowPost[] = []
  try {
    category = await prisma.category.findUnique({ where: { slug } })
    if (category) {
      posts = await prisma.post.findMany({
        where: { status: 'PUBLISHED', categoryId: category.id },
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
    }
  } catch {}

  return (
    <>
      <section className="pt-32 pb-12 px-6 mesh-gradient">
        <div className="max-w-7xl mx-auto">
          <Link href="/blog" className="text-sm font-medium text-brand-crimson hover:text-brand-magenta transition-colors mb-5 inline-block">← All Articles</Link>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)]">
            {category?.nameId || slug}
          </h1>
        </div>
      </section>
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-12 items-start">
              <div className="divide-y divide-[var(--border-default)] -mt-7">
                {posts.map((p, i) => (
                  <Reveal key={p.id} delay={Math.min(i * 0.06, 0.3)}>
                    <BlogListRow post={p} />
                  </Reveal>
                ))}
              </div>
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <BlogSidebarCta locale="id" />
                </div>
              </aside>
            </div>
          ) : (
            <p className="text-center text-[var(--text-secondary)] py-20">No articles in this category yet.</p>
          )}
        </div>
      </section>
    </>
  )
}
