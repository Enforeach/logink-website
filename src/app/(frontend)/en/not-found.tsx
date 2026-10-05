import { PageShell } from '@/components/ds/chrome/PageShell'
import { NotFoundPage } from '@/components/sections/notfound/NotFoundPage'
import { WA_PATTERNS } from '@/lib/services'

// notFound() inside the EN root: the Subuh 404 inside the chrome, in the locale's language (BUILD §3.9).
export default function NotFound() {
  return (
    <PageShell locale="en" alt={{ id: null, en: null }} wa={WA_PATTERNS.generic.en} sky="light">
      <NotFoundPage locale="en" />
    </PageShell>
  )
}
