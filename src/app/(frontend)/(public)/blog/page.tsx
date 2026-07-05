import { BlogListPage, generateBlogListMetadata } from '@/components/public/blog/BlogListPage'

export const revalidate = 3600
export const metadata = generateBlogListMetadata('id')

export default function Page() {
  return <BlogListPage locale="id" />
}
