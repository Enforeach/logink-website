import { BlogIndex, blogMeta } from '@/components/sections/blog/BlogIndex'
import { loadCms } from '@/cms/load'

export const revalidate = 3600
export async function generateMetadata() {
  await loadCms()
  return blogMeta('en')
}

export default async function Page() {
  await loadCms()
  return <BlogIndex locale="en" />
}
