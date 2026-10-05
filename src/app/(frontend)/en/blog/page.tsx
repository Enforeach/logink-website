import { BlogIndex, blogMeta } from '@/components/sections/blog/BlogIndex'

export const revalidate = 3600
export const metadata = blogMeta('en')

export default function Page() {
  return <BlogIndex locale="en" />
}
