// The admin Preview button (src/cms/define.ts): a logged-in editor gets Next draft mode, so loadCms() reads the
// latest drafts for that browser only. ?exit=1 turns it off again (the banner in the root layouts links here).
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayloadClient } from '@/payload/client'

// same-site paths only (no //host or /\host open redirects)
const safe = (p: string | null | undefined) => (p && p.startsWith('/') && !p.startsWith('//') && !p.includes('\\') ? p : '/')

export async function GET(req: Request) {
  const url = new URL(req.url)
  const dm = await draftMode()
  if (url.searchParams.has('exit')) {
    const ref = req.headers.get('referer')
    dm.disable()
    redirect(safe(url.searchParams.get('path') ?? (ref && new URL(ref).origin === url.origin ? new URL(ref).pathname : '/')))
  }
  const { user } = await (await getPayloadClient()).auth({ headers: req.headers })
  if (!user) return new Response('Log in to the CMS first to preview drafts.', { status: 401 })
  dm.enable()
  redirect(safe(url.searchParams.get('path')))
}
