import { PageShell } from '@/components/ds/chrome/PageShell'
import { NotFoundPage } from '@/components/sections/notfound/NotFoundPage'
import { WA_PATTERNS } from '@/lib/services'
import { loadCms } from '@/cms/load'

// notFound() inside the ID root: the Subuh 404 inside the chrome, in the locale's language (BUILD §3.9).
export default async function NotFound() {
  await loadCms()
  return (
    <PageShell locale="id" alt={{ id: null, en: null }} wa={WA_PATTERNS.generic.id} sky="light">
      <NotFoundPage locale="id" />
    </PageShell>
  )
}
