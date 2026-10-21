// CMS ↔ TypeScript content mapping (docs/cms/PLAN.md "Shape mapping"). Pure functions, no Payload or Next imports,
// so scripts and tests can use them. The TypeScript default is the shape authority:
//   merge(def, a, b)  the CMS values laid over the default: `a` = the doc read with locale 'id', `b` = locale 'en'
//   split(def, l)     the default as Payload data for one locale (the seeder's input)
// Rules: an `{ id, en }` object is a localized value; arrays come from the CMS when it has rows; a content field
// named `id` is stored as `rowKey` (Payload reserves `id` on array rows); string arrays are `{ text }` rows, nested
// arrays (table rows) `{ cells }` rows; an empty CMS value (null, undefined, '') falls back to the default, and a
// default of null/undefined only takes a CMS primitive (no template to map an object onto).

export type Locale = 'id' | 'en'
type Obj = Record<string, unknown>

const isObj = (v: unknown): v is Obj => typeof v === 'object' && v !== null && !Array.isArray(v) && !(v instanceof RegExp)
/** `{ id, en }` and nothing else: a localized value (its halves may be strings, objects or arrays). */
export const isL = (v: unknown): v is { id: unknown; en: unknown } => {
  if (!isObj(v)) return false
  const k = Object.keys(v)
  return k.length === 2 && 'id' in v && 'en' in v
}
const empty = (v: unknown) => v === null || v === undefined || v === ''
const cells = (r: unknown) => (isObj(r) ? r.cells : r)
/** Payload adds these to array rows and blocks; they are not content. */
const INTERNAL = new Set(['id', 'blockName', 'blockType', '_order', '_parentID', '_locale'])

/** Union of the keys of every default row, so optional row fields (badge, points…) are still read from the CMS. */
function rowShape(rows: unknown[]): Obj | null {
  const objs = rows.filter(isObj)
  if (!objs.length) return null
  const shape: Obj = {}
  for (const r of objs) for (const [k, v] of Object.entries(r)) if (!(k in shape)) shape[k] = blank(v)
  return shape
}
/** The default with its leaf values removed: the template for rows the editor added beyond the defaults. */
function blank(v: unknown): unknown {
  if (isL(v)) return { id: blank(v.id), en: blank(v.en) }
  if (Array.isArray(v)) return []
  if (isObj(v)) return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)]))
  return undefined
}

export type Trace = { cms: number; fallback: string[] }

/** CMS values over the default. `a`/`b` are the same node read with locale id / en. */
export function merge<T>(def: T, a: unknown, b: unknown, trace?: Trace, path = ''): T {
  if (isL(def)) {
    // localized value: each half from its own locale
    return { id: merge(def.id, a, a, trace, `${path}.id`), en: merge(def.en, b, b, trace, `${path}.en`) } as T
  }
  if (Array.isArray(def)) {
    const rows = Array.isArray(a) ? a : []
    if (!rows.length) {
      if (trace) trace.fallback.push(path || '(root)')
      return def
    }
    const other = Array.isArray(b) ? b : []
    const shape = rowShape(def)
    return rows.map((row, i) => {
      const d = def[i] !== undefined ? (shape && isObj(def[i]) ? { ...shape, ...(def[i] as Obj) } : def[i]) : shape ?? def[0]
      if (Array.isArray(d)) return merge(d, cells(row), cells(other[i]), trace, `${path}[${i}]`)
      if (typeof d === 'string' || d === undefined) {
        // string list: { text } rows
        const v = isObj(row) ? row.text : row
        if (!empty(v)) { if (trace) trace.cms++; return v }
        if (trace && d !== undefined) trace.fallback.push(`${path}[${i}]`)
        return d
      }
      return merge(d, row, other[i], trace, `${path}[${i}]`)
    }) as T
  }
  if (isObj(def)) {
    const ao = isObj(a) ? a : undefined
    const bo = isObj(b) ? b : undefined
    const out: Obj = {}
    for (const [k, v] of Object.entries(def)) {
      if (k === 'id' && !isL(def)) {
        // content row key, stored as rowKey
        const rk = ao?.rowKey
        out.id = empty(rk) ? v : rk
        if (!empty(rk) && trace) trace.cms++
        continue
      }
      out[k] = merge(v, ao?.[k], bo?.[k], trace, `${path}.${k}`)
    }
    return out as T
  }
  // primitive leaf (or undefined: an optional field only some rows have)
  if (!empty(a) && typeof a !== 'object') {
    if (trace) trace.cms++
    return a as T
  }
  if (trace && def !== undefined && def !== null) trace.fallback.push(path)
  return def
}

/** The default as Payload data for one locale. Inverse of merge (for the seeder). */
export function split(def: unknown, l: Locale): unknown {
  if (isL(def)) return split1(def[l])
  if (Array.isArray(def)) return def.map((r) => (typeof r === 'string' ? { text: r } : Array.isArray(r) ? { cells: split(r, l) } : split(r, l)))
  if (isObj(def)) {
    const out: Obj = {}
    for (const [k, v] of Object.entries(def)) {
      if (v === undefined || typeof v === 'function' || v instanceof RegExp) continue
      out[k === 'id' ? 'rowKey' : k] = split(v, l)
    }
    return out
  }
  return def
}
/** Inside a root-localized value every leaf is plain. */
function split1(v: unknown): unknown {
  if (Array.isArray(v)) return v.map((r) => (typeof r === 'string' ? { text: r } : Array.isArray(r) ? { cells: split1(r) } : split1(r)))
  if (isObj(v)) {
    const out: Obj = {}
    for (const [k, x] of Object.entries(v)) {
      if (x === undefined || typeof x === 'function' || x instanceof RegExp) continue
      out[k === 'id' ? 'rowKey' : k] = split1(x)
    }
    return out
  }
  return v
}

/** Drop Payload's own keys from a doc read back, for comparisons. */
export function strip(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(strip)
  if (isObj(v)) return Object.fromEntries(Object.entries(v).filter(([k]) => !INTERNAL.has(k)).map(([k, x]) => [k, strip(x)]))
  return v
}

/** Editable text templates: fmt('{n} min read', { n: 5 }) → '5 min read'. Unknown placeholders stay visible. */
export const fmt = (t: string, v: Record<string, string | number>) => t.replace(/\{(\w+)\}/g, (m, k: string) => (k in v ? String(v[k]) : m))
