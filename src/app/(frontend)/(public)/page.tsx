import { staticMeta } from '@/lib/meta'
import { HomePage } from '@/components/sections/home/HomePage'
import { loadCms } from '@/cms/load'

export async function generateMetadata() {
  await loadCms()
  return staticMeta('home', 'id')
}
export const revalidate = 3600 // ClientLogos reads Payload (BUILD §3.5)
export default async function Page() { await loadCms(); return <HomePage locale="id" /> }
