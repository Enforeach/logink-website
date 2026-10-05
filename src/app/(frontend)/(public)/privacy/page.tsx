import { LegalPage, legalMeta } from '@/components/sections/legal/LegalPage'

export const metadata = legalMeta('privacy', 'id')

export default function Page() {
  return <LegalPage doc="privacy" locale="id" />
}
