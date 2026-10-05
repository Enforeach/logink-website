import { BlogIndex, blogMeta } from '@/components/sections/blog/BlogIndex'

export const revalidate = 3600
export const metadata = blogMeta('id')

export default function Page() {
  return <BlogIndex locale="id" />
}
