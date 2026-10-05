import { ContactPage, contactMeta } from '@/components/sections/contact/ContactPage'

// Static: ?layanan / ?service are read by the form island (useSearchParams inside <Suspense>).
export const metadata = contactMeta('id')

export default function Page() {
  return <ContactPage locale="id" />
}
