// Payload fields generated from the TypeScript defaults (docs/cms/PLAN.md "Shape mapping"), so the CMS shape and
// src/cms/merge.ts can never disagree. A doc spec passes the default(s) plus per-path overrides for labels, help
// text, selects and fields that stay in code:
//   fieldsFrom([HERO], { 'lines.wide': { label: 'Full width' }, 'filmLabels': { skip: true } })
// Paths use the TypeScript keys with array levels collapsed: 'tiers.features', 'pricing.tiers.name'.
// Several defaults (e.g. the 7 service pages) are unioned: one schema, each doc reads only its own keys.
import type { Field } from 'payload'
import { isL } from './merge'
import { defaultOf } from './store'

export type Ov = {
  label?: string
  description?: string
  /** stays in code: no CMS field, merge keeps the default */
  skip?: boolean
  /** text ↔ textarea, or a select (options default to the values the defaults use), or an image */
  type?: 'text' | 'textarea' | 'select' | 'checkbox' | 'number' | 'upload'
  options?: (string | { label: string; value: string })[]
  readOnly?: boolean
  /** shorter table name when Payload reports "Exceeded max identifier length" */
  dbName?: string
  /** anything else, merged last */
  extra?: Record<string, unknown>
}
export type Overrides = Record<string, Ov>

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v) && !(v instanceof RegExp)
const present = (xs: unknown[]) => xs.filter((x) => x !== undefined && x !== null)

const WORDS: Record<string, string> = {
  h1: 'H1 (main heading)', h2: 'H2', wa: 'WhatsApp message', faq: 'FAQ', cta: 'Button', url: 'URL', href: 'Link',
  q: 'Question', a: 'Answer', rowKey: 'Internal ID', og: 'Share image key', alt: 'Alt text', ctaLabel: 'Button label',
}
/** 'filmLabels' → 'Film labels' */
export const humanize = (k: string) => WORDS[k] ?? k.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase().replace(/^./, (c) => c.toUpperCase())

const long = (xs: unknown[]) => xs.some((x) => typeof x === 'string' && (x.length > 90 || x.includes('\n')))

function leaf(name: string, xs: unknown[], ov: Ov): Field | null {
  const t = ov.type ?? (typeof xs[0] === 'number' ? 'number' : typeof xs[0] === 'boolean' ? 'checkbox' : long(xs) ? 'textarea' : 'text')
  if (t === 'select') {
    const options = ov.options ?? [...new Set(xs.filter((x): x is string => typeof x === 'string'))]
    return { name, type: 'select', options: options as never }
  }
  if (t === 'upload') return { name, type: 'upload', relationTo: 'media' }
  return { name, type: t } as Field
}

function build(name: string, samples: unknown[], path: string, ovs: Overrides, inLoc: boolean): Field | null {
  const ov = ovs[path] ?? {}
  if (ov.skip) return null
  const xs = present(samples.map(defaultOf))
  if (!xs.length && !ov.type) return null
  let f: Field | null
  let loc = false
  if (xs.length && xs.every(isL)) {
    // a localized value: build from both halves, then localize the field (children inherit it)
    f = build(name, xs.flatMap((x) => [x.id, x.en]), path, { ...ovs, [path]: { ...ov, label: undefined, description: undefined, extra: undefined } }, true)
    loc = !inLoc
  } else if (xs.length && xs.every(Array.isArray)) {
    const els = present(xs.flat())
    let fields: Field[]
    if (els.length && els.every((e) => typeof e === 'string' || typeof e === 'number')) {
      fields = [leaf('text', els, ovs[`${path}.text`] ?? {})!]
    } else if (els.length && els.every(Array.isArray)) {
      const inner = present(els.flat())
      fields = [{ name: 'cells', type: 'array', fields: [leaf('text', inner, {})!], admin: { initCollapsed: true } }]
    } else {
      // object rows (strings mixed in = rows that only fill `text`, e.g. a stat given as a source key)
      fields = objectFields(els.map((e) => (typeof e === 'string' ? { text: e } : e)), path, ovs, inLoc)
    }
    f = {
      name, type: 'array', fields,
      admin: { initCollapsed: true, components: { RowLabel: '/cms/admin/RowLabel#RowLabel' } },
      ...(ov.dbName && { dbName: ov.dbName }),
    } as Field
  } else if (xs.length && xs.every(isObj)) {
    f = { name, type: 'group', fields: objectFields(xs, path, ovs, inLoc) } as Field
  } else {
    f = leaf(name, xs, ov)
  }
  if (!f) return null
  const admin = { ...('admin' in f ? f.admin : {}), ...(ov.description && { description: ov.description }), ...(ov.readOnly && { readOnly: true }) }
  return {
    ...f,
    label: ov.label ?? humanize(name),
    ...(loc && { localized: true }),
    ...(Object.keys(admin).length && { admin }),
    ...ov.extra,
  } as Field
}

function objectFields(rows: unknown[], path: string, ovs: Overrides, inLoc: boolean): Field[] {
  const keys = [...new Set(rows.filter(isObj).flatMap((r) => Object.keys(r)))]
  return keys
    .filter((k) => !rows.some((r) => isObj(r) && (typeof r[k] === 'function' || r[k] instanceof RegExp)))
    .map((k) => {
      const name = k === 'id' ? 'rowKey' : k
      const f = build(name, rows.map((r) => (isObj(r) ? r[k] : undefined)), path ? `${path}.${k}` : k, ovs, inLoc)
      if (f && k === 'id') {
        return { ...f, admin: { description: 'Internal ID used for links and tracking. Keep it for existing rows; lowercase-with-dashes for new ones.', ...('admin' in f ? f.admin : {}) } } as Field
      }
      return f
    })
    .filter((f): f is Field => f !== null)
}

/** Fields for one default value (or the union of several). `rootLocalized`: the defaults are `{ id, en }` documents
 *  (service pages, legal pages); their halves are unioned and the caller localizes the tab. */
export function fieldsFrom(defs: unknown[], ovs: Overrides = {}, rootLocalized = false): Field[] {
  const rows = defs.map(defaultOf).flatMap((d) => (rootLocalized && isL(d) ? [d.id, d.en] : [d]))
  return objectFields(rows, '', ovs, rootLocalized)
}
