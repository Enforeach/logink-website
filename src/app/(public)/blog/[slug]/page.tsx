import { BlogDetailPage, generateBlogDetailMetadata } from '@/components/public/blog/BlogDetailPage'
import { prisma } from '@/lib/prisma'

export const revalidate = 300

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true },
  })
  return posts.map(p => ({ slug: p.slug }))
}

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  return generateBlogDetailMetadata(slug, 'id')
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <BlogDetailPage slug={slug} locale="id" />
}
