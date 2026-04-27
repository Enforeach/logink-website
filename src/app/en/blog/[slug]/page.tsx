import { BlogDetailPage, generateBlogDetailMetadata } from '@/components/public/blog/BlogDetailPage'

export const revalidate = 300

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  return generateBlogDetailMetadata(slug, 'en')
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <BlogDetailPage slug={slug} locale="en" />
}
