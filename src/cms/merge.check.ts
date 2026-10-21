// Self-check for src/cms/merge.ts: pnpm exec tsx src/cms/merge.check.ts
import assert from 'node:assert/strict'
import { fmt, isL, merge, split, type Trace } from './merge'

// L detection
assert.equal(isL({ id: 'a', en: 'b' }), true)
assert.equal(isL({ id: 'entry', name: 'Entry' }), false)

// leaf-localized content (pattern A): split per locale, merge back = identity
const HERO = {
  kicker: { id: 'Agensi', en: 'Agency' },
  lines: [{ text: { id: 'Ditemukan.', en: 'Found.' } }, { text: { id: 'Dikutip AI.', en: 'Cited by AI.' }, wide: true }],
  filmLabels: { id: { pause: 'Jeda', play: 'Putar' }, en: { pause: 'Pause', play: 'Play' } },
}
const a = split(HERO, 'id')
const b = split(HERO, 'en')
assert.deepEqual(a, { kicker: 'Agensi', lines: [{ text: 'Ditemukan.' }, { text: 'Dikutip AI.', wide: true }], filmLabels: { pause: 'Jeda', play: 'Putar' } })
const t: Trace = { cms: 0, fallback: [] }
assert.deepEqual(merge(HERO, a, b, t), { ...HERO, lines: [{ text: HERO.lines[0].text, wide: undefined }, HERO.lines[1]] })
assert.deepEqual(t.fallback, [])

// CMS edits win; empty CMS values fall back to the default
const edited = merge(HERO, { ...(a as object), kicker: 'Agensi baru', lines: [] }, { ...(b as object), kicker: '' })
assert.deepEqual(edited.kicker, { id: 'Agensi baru', en: 'Agency' })
assert.deepEqual(edited.lines, HERO.lines) // no rows in the CMS: the default list

// editors can add rows; a new row has no default text
const more = merge(HERO, { lines: [{ text: 'X' }, { text: 'Y' }, { text: 'Z', wide: false }] }, { lines: [{ text: 'x' }, { text: 'y' }, { text: 'z' }] })
assert.equal(more.lines.length, 3)
assert.deepEqual(more.lines[2], { text: { id: 'Z', en: 'z' }, wide: false })

// root-localized content (pattern B) with row ids and string lists
const SVC = {
  id: { tiers: [{ id: 'entry', name: 'Entry', features: ['A', 'B'] }], note: 'Catatan' },
  en: { tiers: [{ id: 'entry', name: 'Entry', features: ['A', 'B'] }], note: 'Note' },
}
const sid = split(SVC, 'id') as { tiers: { rowKey: string; features: { text: string }[] }[] }
assert.equal(sid.tiers[0].rowKey, 'entry')
assert.deepEqual(sid.tiers[0].features, [{ text: 'A' }, { text: 'B' }])
// a doc read back from Payload carries its own row ids: they never replace the content id
const back = { tiers: [{ id: 'payload-row-id', rowKey: 'entry', name: 'Entry Plus', features: [{ id: 'r1', text: 'A' }, { id: 'r2', text: 'B2' }] }], note: 'Catatan' }
const m = merge(SVC, back, split(SVC, 'en'))
assert.equal(m.id.tiers[0].id, 'entry')
assert.equal(m.id.tiers[0].name, 'Entry Plus')
assert.deepEqual(m.id.tiers[0].features, ['A', 'B2'])
assert.equal(m.en.note, 'Note')

// no CMS doc at all: the default, and every leaf reported as a fallback
const t2: Trace = { cms: 0, fallback: [] }
assert.deepEqual(merge(SVC, undefined, undefined, t2), SVC)
assert.ok(t2.fallback.length > 0 && t2.cms === 0)

// table rows (string[][]) are { cells } rows; a null default never takes a CMS object
const TBL = { id: { rows: [['a', 'b']], compare: null as null | object }, en: { rows: [['a', 'b']], compare: null as null | object } }
assert.deepEqual(split(TBL, 'id'), { rows: [{ cells: [{ text: 'a' }, { text: 'b' }] }], compare: null })
const tm = merge(TBL, { rows: [{ id: 'x', cells: [{ text: 'A' }, { text: '' }] }], compare: { caption: null, rows: [] } }, undefined)
assert.deepEqual(tm.id, { rows: [['A', 'b']], compare: null })

assert.equal(fmt('{n} menit · {x}', { n: 5 }), '5 menit · {x}')

console.log('merge.check ok')
