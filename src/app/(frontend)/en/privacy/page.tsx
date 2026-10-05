import { LegalPage, legalMeta } from '@/components/sections/legal/LegalPage'

export const metadata = legalMeta('privacy', 'en')

export default function Page() {
  return <LegalPage doc="privacy" locale="en" />
}
