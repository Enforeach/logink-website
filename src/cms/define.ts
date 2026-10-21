// Builders for the CMS page documents (docs/cms/PLAN.md "Documents", principle 6). A spec lists its tabs, each tab
// built from TypeScript defaults with src/cms/fields.ts; the builder adds what every page doc shares: drafts +
// Publish, version history, the Preview button, revalidation, edit-only access, and the SEO tab (plugin-seo, added
// in payload.config.ts) seeded from the registry title/description.
import type { CollectionConfig, Field, GlobalConfig, Tab } from 'payload'
import { isAuthenticated } from '@/payload/access'
import { defaultOf, registry } from './store'
import { fieldsFrom, type Overrides } from './fields'

type L = { id: string; en: string }
export type TabSpec = {
  /** named tab: its data is doc[name], read by live(slug, name, default). Unnamed: `fields` sit at the top level. */
  name?: string
  label: string
  description?: string
  /** the TypeScript default(s); several = one schema for all (service pages). Omitted on a named tab: the defaults
   *  registered with live()/liveDoc() for (slug, name), so the module defining them must be imported by the spec. */
  defs?: unknown[]
  /** the defaults are { id, en } documents: the whole tab is per language */
  rootLocalized?: boolean
  ov?: Overrides
  /** hand-written fields instead of generated ones */
  fields?: Field[]
}
/** What the seeder writes into the SEO tab, and what the site shows when it is empty. */
export type SeoDefaults = { title: L; desc: L }

function defsOf(slug: string, t: TabSpec): unknown[] {
  if (t.defs) return t.defs
  const d = registry.filter((e) => e.slug === slug && e.field === t.name).map((e) => e.def)
  if (!d.length) throw new Error(`CMS ${slug}: no live() default registered for tab "${t.name}" (import its content module, or pass defs)`)
  return d
}

export const tab = (slug: string, t: TabSpec): Tab => ({
  ...(t.name && { name: t.name }),
  label: t.label,
  ...(t.description && { admin: { description: t.description } }),
  ...(t.rootLocalized && { localized: true }),
  fields: t.fields ?? fieldsFrom(defsOf(slug, t), t.ov, t.rootLocalized),
}) as Tab

/** Page basics every page shares, read from the registry (src/lib/services.ts): H1 and the WhatsApp prefill. */
export const pageTab = (def: object, more: Overrides = {}, pick = ['h1', 'wa']): TabSpec => ({
  name: 'basics',
  label: 'Page',
  description: 'The main heading and the WhatsApp message this page opens. Title and description are in the SEO tab.',
  defs: [Object.fromEntries(Object.entries(defaultOf(def)).filter(([k]) => pick.includes(k)))],
  ov: { wa: { description: 'Pre-filled text when a visitor taps WhatsApp on this page.' }, ...more },
})

// Lazy next/cache: Payload's CLI loads this config outside Next.
async function revalidateSite() {
  try {
    const { revalidatePath, revalidateTag } = await import('next/cache')
    revalidateTag('cms', { expire: 0 })
    revalidatePath('/', 'layout')
    revalidatePath('/en', 'layout')
  } catch {
    // outside a request (seed, CLI)
  }
}
const afterChange = ({ doc }: { doc: { _status?: string } }) => {
  if (doc._status !== 'draft') void revalidateSite()
  return doc
}

const versions = { drafts: true, max: 30 } as const
const preview = (path: (locale: 'id' | 'en', doc: Record<string, unknown>) => string | null) =>
  (doc: Record<string, unknown>, { locale }: { locale?: string }) => {
    const p = path(locale === 'en' ? 'en' : 'id', doc)
    return p ? `/api/cms-preview?path=${encodeURIComponent(p)}` : null
  }

/** The registry title/description of a page or service: what the SEO tab is seeded with. */
export const seoOf = (def: { title: L; desc: L }): SeoDefaults => {
  const d = defaultOf(def)
  return { title: d.title, desc: d.desc }
}

export function pageGlobal(o: {
  slug: string; label: string; group: string; description: string
  path: L | null; seo?: SeoDefaults; tabs: TabSpec[]; extraFields?: Field[]
}): GlobalConfig {
  return {
    slug: o.slug,
    label: o.label,
    admin: { group: o.group, description: o.description, ...(o.path && { preview: preview((l) => o.path![l]) }) },
    access: { read: isAuthenticated, update: isAuthenticated },
    versions,
    hooks: { afterChange: [afterChange] },
    custom: { seo: o.seo, path: o.path },
    fields: [{ type: 'tabs', tabs: o.tabs.map((t) => tab(o.slug, t)) }, ...(o.extraFields ?? [])],
  }
}

/** One document per key (service pages, legal pages): editable, never created or deleted from the admin. */
export function keyedCollection(o: {
  slug: string; singular: string; plural: string; group: string; description: string
  keys: { key: string; title: string; path: L; seo?: SeoDefaults }[]; tabs: TabSpec[]
}): CollectionConfig {
  const byKey = Object.fromEntries(o.keys.map((k) => [k.key, k]))
  return {
    slug: o.slug,
    labels: { singular: o.singular, plural: o.plural },
    admin: {
      group: o.group, description: o.description, useAsTitle: 'title', defaultColumns: ['title', 'updatedAt', '_status'],
      preview: preview((l, doc) => byKey[doc.key as string]?.path[l] ?? null),
    },
    access: { read: isAuthenticated, create: () => false, delete: () => false, update: isAuthenticated },
    versions,
    hooks: { afterChange: [afterChange] },
    custom: { keys: o.keys },
    fields: [
      { name: 'title', type: 'text', required: true, admin: { readOnly: true, position: 'sidebar', description: 'The page this document edits.' } },
      { name: 'key', type: 'select', required: true, unique: true, options: o.keys.map((k) => ({ label: k.title, value: k.key })), admin: { readOnly: true, position: 'sidebar' } },
      { type: 'tabs', tabs: o.tabs.map((t) => tab(o.slug, t)) },
    ],
  }
}
