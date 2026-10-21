// loadCms() (docs/cms/PLAN.md principle 2): every route entry awaits it before rendering, so the live() proxies
// in src/content and the registry serve CMS values for this request. Published docs come from Next's data cache
// (tag 'cms', expired by the afterChange hook in define.ts), so a page render costs one cache read per doc, not a
// DB round trip. Draft mode (the admin Preview button) reads the latest drafts, uncached, for that browser only.
import 'server-only'
import { cache } from 'react'
import { draftMode } from 'next/headers'
import { unstable_cache } from 'next/cache'
import type { Payload } from 'payload'
import { getPayloadClient } from '@/payload/client'
import { CMS_GLOBALS, CMS_KEYED } from './docs'
import { setSnapshot, type Snapshot } from './store'
import type { Locale } from './merge'

const LOCALES: Locale[] = ['id', 'en']
type Doc = Record<string, unknown>

async function read(payload: Payload, kind: 'global' | 'keyed', slug: string, locale: Locale, draft: boolean): Promise<Doc | Record<string, Doc>> {
  const q = { locale, fallbackLocale: false as const, draft, depth: 1, overrideAccess: true }
  if (kind === 'global') return (await payload.findGlobal({ slug: slug as never, ...q })) as Doc
  const { docs } = await payload.find({ collection: slug as never, ...q, pagination: false, limit: 0 })
  return Object.fromEntries((docs as Doc[]).map((d) => [String(d.key), d]))
}

const published = unstable_cache(
  async (kind: 'global' | 'keyed', slug: string, locale: Locale) => read(await getPayloadClient(), kind, slug, locale, false),
  ['cms-doc-v1'],
  { tags: ['cms'] },
)

/** Fill the store for this request. Throws when the DB is unreachable: Next then keeps serving the last good page. */
export const loadCms = cache(async (): Promise<void> => {
  const draft = (await draftMode()).isEnabled
  const payload = draft ? await getPayloadClient() : null
  const get = (kind: 'global' | 'keyed', slug: string, l: Locale) => (payload ? read(payload, kind, slug, l, true) : published(kind, slug, l))

  const snap: Snapshot = { globals: {}, docs: {}, draft }
  await Promise.all([
    ...CMS_GLOBALS.flatMap((slug) => LOCALES.map(async (l) => {
      ;(snap.globals[slug] ??= {})[l] = (await get('global', slug, l)) as Doc
    })),
    ...CMS_KEYED.flatMap((slug) => LOCALES.map(async (l) => {
      const byKey = (await get('keyed', slug, l)) as Record<string, Doc>
      for (const [key, doc] of Object.entries(byKey)) ((snap.docs[slug] ??= {})[key] ??= {})[l] = doc
    })),
  ])
  setSnapshot(snap)
})
