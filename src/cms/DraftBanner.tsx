// Visible only in draft mode (after the admin Preview button), so an editor never mistakes drafts for the live site.
import { draftMode } from 'next/headers'

export async function DraftBanner() {
  if (!(await draftMode()).isEnabled) return null
  return (
    // a full navigation on purpose: the route handler clears the draft cookie and redirects
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/api/cms-preview?exit=1"
      style={{ position: 'fixed', left: 16, bottom: 16, zIndex: 2147483647, padding: '10px 16px', borderRadius: 999, background: '#1d1d1f', color: '#fff', font: '600 14px/1.2 system-ui, sans-serif', textDecoration: 'none', boxShadow: '0 6px 24px rgba(0,0,0,.25)' }}
    >
      Preview: showing unpublished drafts · Exit
    </a>
  )
}
