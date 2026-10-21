import { LegalPage, legalMeta } from '@/components/sections/legal/LegalPage'
import { loadCms } from '@/cms/load'

export async function generateMetadata() {
  await loadCms()
  return legalMeta('privacy', 'en')
}

export default async function Page() {
  await loadCms()
  return <LegalPage doc="privacy" locale="en" />
}
