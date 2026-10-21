import { ContactPage, contactMeta } from '@/components/sections/contact/ContactPage'
import { loadCms } from '@/cms/load'

// Static: ?layanan / ?service are read by the form island (useSearchParams inside <Suspense>).
export async function generateMetadata() {
  await loadCms()
  return contactMeta('id')
}

export default async function Page() {
  await loadCms()
  return <ContactPage locale="id" />
}
