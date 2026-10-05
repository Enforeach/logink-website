import { LegalPage, legalMeta } from '@/components/sections/legal/LegalPage'

export const metadata = legalMeta('disclaimer', 'en')

export default function Page() {
  return <LegalPage doc="disclaimer" locale="en" />
}
