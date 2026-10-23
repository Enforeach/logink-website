import { BlogDetailPage, generateBlogDetailMetadata } from '@/components/public/blog/BlogDetailPage'
import { getPayloadClient } from '@/payload/client'

export const revalidate = 300

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const posts = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'PUBLISHED' } },
    limit: 1000,
    depth: 0,
  })
  return posts.docs.map(p => ({ slug: p.slug as string }))
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
