// The CMS content store (docs/cms/PLAN.md principles 1-2). Content modules wrap each export:
//   export const HERO = live('home-page', 'hero', { ...default })
//   export default liveDoc('service-pages', 'seo', 'content', content)
// and stay importable as before. Reads go through a proxy to the value merged for the CURRENT REQUEST: the snapshot
// lives in a React `cache()` scope, so a draft preview can never leak into another visitor's render. Before
// `loadCms()` ran (or outside a request: scripts, next.config) the proxy returns the default.
import { cache } from 'react'
import { merge, type Locale } from './merge'

/** Raw docs per locale, as read from Payload (JSON). */
export type Snapshot = {
  globals: Record<string, Partial<Record<Locale, Record<string, unknown> | null>>>
  docs: Record<string, Record<string, Partial<Record<Locale, Record<string, unknown> | null>>>> // collection → doc key → locale
  draft: boolean
}
type Post = (v: never) => unknown
export type Entry = ({ kind: 'global'; slug: string; key?: undefined } | { kind: 'doc'; slug: string; key: string }) & { field: string; def: unknown; post?: Post }

export const registry: Entry[] = []
const scope = cache((): { snap: Snapshot | null; memo: Map<Entry, unknown> } => ({ snap: null, memo: new Map() }))

/** The request's snapshot (null before loadCms or outside a request). */
export const currentSnapshot = () => scope().snap
export const setSnapshot = (snap: Snapshot) => {
  const s = scope()
  s.snap = snap
  s.memo.clear()
}

/** The CMS node an entry reads, per locale. */
export function nodes(snap: Snapshot | null, e: Entry): [unknown, unknown] {
  if (!snap) return [undefined, undefined]
  const src = e.kind === 'global' ? snap.globals[e.slug] : snap.docs[e.slug]?.[e.key]
  return [src?.id?.[e.field], src?.en?.[e.field]]
}

function resolve(e: Entry): unknown {
  const s = scope()
  if (!s.snap) return e.def
  if (!s.memo.has(e)) {
    const [a, b] = nodes(s.snap, e)
    const v = merge(e.def, a, b)
    s.memo.set(e, e.post ? e.post(v as never) : v)
  }
  return s.memo.get(e)
}

const DEFS = new WeakMap<object, unknown>()
/** The TypeScript default behind a live export (the schema and the seeder are built from defaults, never the CMS). */
export const defaultOf = <T>(v: T): T => (typeof v === 'object' && v !== null && DEFS.has(v) ? (DEFS.get(v) as T) : v)

function proxy<T extends object>(e: Entry): T {
  const cur = () => resolve(e) as object
  const p = new Proxy(e.def as T, {
    get: (_t, p) => Reflect.get(cur(), p),
    has: (_t, p) => Reflect.has(cur(), p),
    ownKeys: () => Reflect.ownKeys(cur()),
    getOwnPropertyDescriptor: (_t, p) => Reflect.getOwnPropertyDescriptor(cur(), p),
  })
  DEFS.set(p, e.def)
  return p
}

/** A content export backed by a CMS global field. `post` adjusts the merged value (e.g. withSeo). */
export function live<T extends object>(slug: string, field: string, def: T, post?: (v: T) => T): T {
  const e: Entry = { kind: 'global', slug, field, def, post: post as Post }
  registry.push(e)
  return proxy<T>(e)
}

/** A content export backed by one field of a keyed collection document (service-pages, legal-pages). */
export function liveDoc<T extends object>(slug: string, key: string, field: string, def: T, post?: (v: T) => T): T {
  const e: Entry = { kind: 'doc', slug, key, field, def, post: post as Post }
  registry.push(e)
  return proxy<T>(e)
}

/** Raw (unmerged) CMS value for one locale, e.g. the SEO `meta` group. */
export function rawField(ref: { slug: string; key?: string }, field: string, l: Locale): Record<string, unknown> | undefined {
  const snap = scope().snap
  if (!snap) return undefined
  const src = ref.key ? snap.docs[ref.slug]?.[ref.key] : snap.globals[ref.slug]
  const v = src?.[l]?.[field]
  return v && typeof v === 'object' ? (v as Record<string, unknown>) : undefined
}

type L = Record<Locale, string>
const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v : undefined)
/** The SEO tab (plugin-seo `meta`) over a registry entry's title/desc: <title>, description, OG and llms.txt follow it. */
export function withSeo<T extends { title: L; desc: L }>(v: T, ref: { slug: string; key?: string }): T {
  const m = (l: Locale) => rawField(ref, 'meta', l)
  const pick = (k: 'title' | 'description', d: L): L => ({ id: str(m('id')?.[k]) ?? d.id, en: str(m('en')?.[k]) ?? d.en })
  return { ...v, title: pick('title', v.title), desc: pick('description', v.desc) }
}
