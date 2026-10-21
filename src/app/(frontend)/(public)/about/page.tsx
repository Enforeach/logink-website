import { staticMeta } from '@/lib/meta'
import { AboutPage } from '@/components/sections/about/AboutPage'
import { loadCms } from '@/cms/load'

export const revalidate = 3600
export async function generateMetadata() {
  await loadCms()
  return staticMeta('about', 'id')
}
export default async function Page() { await loadCms(); return <AboutPage locale="id" /> }
