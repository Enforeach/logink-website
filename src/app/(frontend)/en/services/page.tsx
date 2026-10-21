import { staticMeta } from '@/lib/meta'
import { HubPage } from '@/components/sections/hub/HubPage'
import { loadCms } from '@/cms/load'

export async function generateMetadata() {
  await loadCms()
  return staticMeta('hub', 'en')
}
export default async function Page() { await loadCms(); return <HubPage locale="en" /> }
