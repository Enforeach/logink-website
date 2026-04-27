import { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'
import { BlogCard } from '@/components/public/BlogCard'
import { prisma } from '@/lib/prisma'

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return buildMetadata({
    title: `Blog Category: ${slug}`,
    description: `English articles about ${slug} from Logink Digital Marketing Agency.`,
    path: `/en/blog/category/${slug}`,
  })
}

export default async function EnBlogCategoryPage({ params }: Props) {
  const { slug } = await params
  let category = null
  let posts: any[] = []
  try {
    category = await prisma.category.findUnique({ where: { slug } })
    if (category) {
      posts = await prisma.post.findMany({
        where: {
          status: 'PUBLISHED',
          categoryId: category.id,
          titleEn: { not: null },
          bodyEn: { not: null },
        },
        orderBy: { publishedAt: 'desc' },
        take: 12,
        select: {
          id: true, title: true, titleEn: true, slug: true, slugEn: true,
          excerpt: true, excerptEn: true, featuredImage: true,
          publishedAt: true, readingTime: true,
          author: { select: { name: true, image: true } },
          category: { select: { nameId: true, nameEn: true, slug: true } },
        },
      })
    }
  } catch {}

  return (
    <>
      <section className="pt-32 pb-16 px-4 mesh-gradient text-center">
        <Link href="/en/blog" className="text-sm text-brand-violet hover:text-brand-pink transition-colors mb-6 inline-block">← All Articles</Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-4">
          {category?.nameEn || category?.nameId || slug}
        </h1>
      </section>
      <section className="py-20 px-4 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((p: any) => <BlogCard key={p.id} post={p} locale="en" />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[var(--text-secondary)]">No English articles in this category yet.</p>
              <Link href={`/blog/category/${slug}`} className="text-sm text-brand-violet mt-3 inline-block hover:opacity-80">
                View in Bahasa Indonesia →
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
