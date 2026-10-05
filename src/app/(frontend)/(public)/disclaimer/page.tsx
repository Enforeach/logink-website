import { LegalPage, legalMeta } from '@/components/sections/legal/LegalPage'

export const metadata = legalMeta('disclaimer', 'id')

export default function Page() {
  return <LegalPage doc="disclaimer" locale="id" />
}
