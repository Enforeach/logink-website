import { BlogListPage, generateBlogListMetadata } from '@/components/public/blog/BlogListPage'

export const revalidate = 3600
export const metadata = generateBlogListMetadata('en')

export default function Page() {
  return <BlogListPage locale="en" />
}
