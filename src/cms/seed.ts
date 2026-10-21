// The seeder (docs/cms/PLAN.md): writes the TypeScript defaults into the CMS so editors start from the live text.
// Idempotent and edit-safe: a field is written only while it is blank in the CMS (force = rewrite everything).
// Schema-directed: shared (non-localized) array rows keep their ids between the id and en saves, so the English
// save fills the same rows instead of replacing them and dropping their Indonesian text.
import type { Field, Payload } from 'payload'
import { cmsCollections, cmsGlobals } from './docs'
import { registry, type Entry } from './store'
import { split, type Locale } from './merge'
import type { SeoDefaults } from './define'

type Obj = Record<string, unknown>
const isObj = (v: unknown): v is Obj => typeof v === 'object' && v !== null && !Array.isArray(v)
const META = new Set(['id', 'createdAt', 'updatedAt', 'globalType', '_status', 'title', 'key'])

/** null, '', [], or an object of blanks: never edited. */
export const blank = (v: unknown): boolean =>
  v === null || v === undefined || v === '' || (Array.isArray(v) ? v.length === 0 : isObj(v) && Object.entries(v).every(([k, x]) => META.has(k) || blank(x)))

function keepRows(fields: Field[], data: Obj, saved: Obj, inLoc: boolean) {
  for (const f of fields) {
    if (f.type === 'tabs') {
      for (const t of f.tabs) {
        if ('name' in t && t.name) {
          const d = data[t.name], s = saved[t.name]
          if (isObj(d) && isObj(s)) keepRows(t.fields, d, s, inLoc || Boolean(t.localized))
        } else keepRows(t.fields, data, saved, inLoc)
      }
    } else if (f.type === 'row' || f.type === 'collapsible') keepRows(f.fields, data, saved, inLoc)
    else if ('name' in f && f.name) {
      const loc = inLoc || Boolean('localized' in f && f.localized)
      const d = data[f.name], s = saved[f.name]
      if (f.type === 'group' && isObj(d) && isObj(s)) keepRows(f.fields, d, s, loc)
      if (f.type === 'array' && Array.isArray(d) && Array.isArray(s)) {
        d.forEach((row, i) => {
          if (!isObj(row) || !isObj(s[i])) return
          if (!loc && s[i].id) row.id = s[i].id
          keepRows(f.fields, row, s[i] as Obj, loc)
        })
      }
    }
  }
}

/** The data to write for one locale: every registered field that is blank (or all, with force), plus the SEO tab. */
function dataFor(entries: Entry[], current: Obj, l: Locale, seo: SeoDefaults | undefined, force: boolean): Obj {
  const out: Obj = {}
  for (const e of entries) if (force || blank(current[e.field])) out[e.field] = split(e.def, l)
  const meta = current.meta as Obj | undefined
  if (seo && (force || blank(meta?.title) && blank(meta?.description))) out.meta = { ...(meta ?? {}), title: seo.title[l], description: seo.desc[l] }
  return out
}

export async function seed(payload: Payload, { force = false, only }: { force?: boolean; only?: string } = {}) {
  const log: string[] = []
  const ctx = { overrideAccess: true, depth: 0, fallbackLocale: false as const }

  for (const g of cmsGlobals) {
    if (only && g.slug !== only) continue
    const entries = registry.filter((e) => e.kind === 'global' && e.slug === g.slug)
    const seo = g.custom?.seo as SeoDefaults | undefined
    const cur = (await payload.findGlobal({ slug: g.slug as never, locale: 'id', draft: true, ...ctx })) as Obj
    const id = dataFor(entries, cur, 'id', seo, force)
    if (!Object.keys(id).length) { log.push(`${g.slug}: up to date`); continue }
    const saved = (await payload.updateGlobal({ slug: g.slug as never, locale: 'id', data: { ...id, _status: 'published' } as never, ...ctx })) as Obj
    const en = dataFor(entries.filter((e) => e.field in id), {}, 'en', id.meta ? seo : undefined, true)
    keepRows(payload.config.globals.find((x) => x.slug === g.slug)!.fields, en, saved, false)
    await payload.updateGlobal({ slug: g.slug as never, locale: 'en', data: { ...en, _status: 'published' } as never, ...ctx })
    log.push(`${g.slug}: seeded ${Object.keys(id).join(', ')}`)
  }

  for (const c of cmsCollections) {
    if (only && c.slug !== only) continue
    for (const k of c.custom?.keys as { key: string; title: string; seo?: SeoDefaults }[]) {
      const entries = registry.filter((e) => e.kind === 'doc' && e.slug === c.slug && e.key === k.key)
      const found = await payload.find({ collection: c.slug as never, where: { key: { equals: k.key } }, locale: 'id', draft: true, limit: 1, ...ctx })
      const cur = (found.docs[0] ?? {}) as Obj
      const id = dataFor(entries, cur, 'id', k.seo, force || !found.docs[0])
      if (!Object.keys(id).length) { log.push(`${c.slug}/${k.key}: up to date`); continue }
      const data = { ...id, title: k.title, key: k.key, _status: 'published' } as never
      const saved = (found.docs[0]
        ? await payload.update({ collection: c.slug as never, id: cur.id as string, locale: 'id', data, ...ctx })
        : await payload.create({ collection: c.slug as never, locale: 'id', data, ...ctx })) as Obj
      const en = dataFor(entries.filter((e) => e.field in id), {}, 'en', id.meta ? k.seo : undefined, true)
      keepRows(payload.config.collections.find((x) => x.slug === c.slug)!.fields, en, saved, false)
      await payload.update({ collection: c.slug as never, id: saved.id as string, locale: 'en', data: { ...en, _status: 'published' } as never, ...ctx })
      log.push(`${c.slug}/${k.key}: seeded ${Object.keys(id).join(', ')}`)
    }
  }
  return log
}
