import { LegalPage, legalMeta } from '@/components/sections/legal/LegalPage'

export const metadata = legalMeta('terms', 'id')

export default function Page() {
  return <LegalPage doc="terms" locale="id" />
}
