// Registry gate G3: `pnpm check:registry` (tsx src/lib/services.check.ts).
// Prints `ok: 7 services, 8 pages, 15 pairs, 27 redirects`. The negative tests at the bottom
// break one rule at a time and assert that check() throws, so a gutted check fails too.
import assert from 'node:assert/strict'
import og from '../content/og.json'
import * as R from './services'
import type { Locale, StageKey } from './services'

type Reg = typeof R
const LOC: Locale[] = ['id', 'en']
const BANNED = /Harga tertulis di setiap|Written prices for every|Laporan GA4 setiap bulan/

function check(r: Reg) {
  const { SERVICES, PAGES, STAGES, REDIRECTS, STATIC_PAIRS, FACT_STRIP, CATEGORIES, PRICE_FACT } = r
  const all = [...SERVICES, ...PAGES]
  const get = (k: string) => SERVICES.find((s) => s.key === k)! // r.svc() is bound to the real data

  for (const x of all) for (const l of LOC) {
    assert.ok(x.title[l].length <= 60, `title > 60: ${x.title[l]} (${x.title[l].length})`)
    assert.ok(x.h1[l].trim() && x.wa[l].trim(), `empty h1/wa: ${x.path[l]}`)
    const n = x.desc[l].length
    assert.ok(n >= 120 && n <= 160, `desc ${n} chars: ${x.path[l]}`)
    assert.ok((og as string[]).includes(x.og[l]), `og key not in og.json: ${x.og[l]}`)
  }
  for (const s of SERVICES) assert.ok(s.h1.id.startsWith('Jasa '), `ID service H1 must lead with "Jasa": ${s.h1.id}`)

  // "Mulai Rp 1 Juta" always says "ditagih tahunan"; banned strings appear nowhere (CRITIC M4)
  const strings = JSON.stringify([SERVICES, PAGES, FACT_STRIP, r.ENTITY, r.SOURCES, r.CATEGORIES, r.AI_BASELINE])
  for (const m of strings.matchAll(/Rp 1 (·|Juta)[^"]*/g)) assert.ok(m[0].includes('ditagih tahunan'), `Rp 1 Juta without "ditagih tahunan": ${m[0]}`)
  assert.ok(!BANNED.test(strings), `banned claim: ${strings.match(BANNED)?.[0]}`)

  // price facts: every FACT_STRIP entry has a source; the price fact matches the registry; null price => quote
  for (const f of FACT_STRIP) assert.ok(f.source.trim() && f.id.trim() && f.en.trim(), `FACT_STRIP entry without source: ${f.id}`)
  for (const k of PRICE_FACT.priced) assert.ok(get(k).price !== null, `price fact names ${k}, which has no price`)
  for (const k of PRICE_FACT.quoted) {
    assert.equal(get(k).price, null, `price fact says ${k} is quote-only`)
    for (const l of LOC) assert.match(get(k).quote?.[l] ?? '', /24 (jam|hours)/, `${k} quote must mention 24 hours`)
  }
  for (const s of SERVICES) if (s.price === null) assert.ok(s.quote?.id && s.quote?.en, `price null without quote: ${s.key}`)

  // paths unique; pairs round-trip
  const paths = all.flatMap((x) => LOC.map((l) => x.path[l]))
  assert.equal(new Set(paths).size, paths.length, 'duplicate path')
  for (const [id, en] of STATIC_PAIRS()) { assert.equal(r.alternateOf(id), en); assert.equal(r.alternateOf(en), id) }

  // redirects: unique sources, no source is a live page, every destination is live, no chains
  const live = new Set(STATIC_PAIRS().flatMap(([id, en]) => [id, en]))
  const sources = REDIRECTS.map((x) => x.source)
  assert.equal(new Set(sources).size, sources.length, 'duplicate redirect source')
  for (const x of REDIRECTS) {
    assert.ok(!live.has(x.source), `redirect shadows a live page: ${x.source}`)
    assert.ok(live.has(x.destination), `redirect to a non-live URL: ${x.source} -> ${x.destination}`)
    assert.ok(!sources.includes(x.destination), `redirect chain: ${x.source} -> ${x.destination}`)
  }
  for (const must of ['/index', '/en/index', '/pricing', '/services/local-seo', '/layanan/seo-content-marketing', '/en/layanan/local-seo'])
    assert.ok(sources.includes(must), `missing redirect ${must}`)
  assert.ok(!sources.includes('/layanan/local-seo') && !sources.includes('/en/services/local-seo'), 'local-seo must not redirect')

  // AI page: live pair in the sitemap and menus, or the #ai-search fallback
  if (r.AI_PAGE_LIVE) {
    assert.ok(live.has('/layanan/jasa-seo-ai') && live.has('/en/services/ai-search-optimization'), 'AI pair missing while live')
    assert.equal(r.svcHref('ai', 'id'), '/layanan/jasa-seo-ai')
    for (const l of LOC) assert.match(r.svc('ai').h1[l], /GEO & AEO/, 'AI H1 must name GEO & AEO')
  } else {
    assert.equal(r.svcHref('ai', 'id'), '/layanan/jasa-seo-profesional#ai-search')
    assert.ok(!live.has('/layanan/jasa-seo-ai'), 'AI page in sitemap before it ships')
  }
  for (const s of SERVICES) {
    const c = r.crossLinks(s.key)
    assert.ok(!c.includes(s.key) && c.length >= 2, `crossLinks(${s.key})`)
    if (s.key !== 'ai') assert.equal(c.at(-1), 'ai')
  }
  for (const st of Object.keys(STAGES) as StageKey[]) assert.ok(r.servicesInStage(st).length >= 1, `empty stage ${st}`)
  for (const c of Object.values(CATEGORIES)) assert.ok(SERVICES.some((s) => s.key === c.svc))
  assert.equal(r.waLink('Halo & ya?'), 'https://wa.me/628139453933?text=Halo%20%26%20ya%3F')
  assert.equal(r.hhmm('07.00'), '0700')
  assert.equal(r.page('hub').path.en, '/en/services')
  assert.equal(r.SOURCES.find((x) => x.k === 'apjii-ai')?.src, 'APJII via Kompas')
}

check(R)

// Negative tests: each broken registry must make check() throw.
const svcWith = (k: string, patch: object) => R.SERVICES.map((s) => (s.key === k ? { ...s, ...patch } : s))
const broken: [string, Partial<Reg>][] = [
  ['banned FACT_STRIP string', { FACT_STRIP: [...R.FACT_STRIP, { id: 'Laporan GA4 setiap bulan', en: 'GA4 report every month', source: 'x' }] }],
  ['fact without source', { FACT_STRIP: [{ ...R.FACT_STRIP[0], source: '' }] }],
  ['priced service lost its price', { SERVICES: svcWith('ads', { price: null, quote: R.svc('social').quote }) as Reg['SERVICES'] }],
  ['null price without quote', { SERVICES: svcWith('social', { quote: undefined }) as Reg['SERVICES'] }],
  ['og key missing', { SERVICES: svcWith('seo', { og: { id: 'id-nope', en: 'en-seo' } }) as Reg['SERVICES'] }],
  ['redirect chain', { REDIRECTS: [...R.REDIRECTS, { source: '/layanan', destination: '/index', permanent: true }] }],
]
for (const [name, patch] of broken) assert.throws(() => check({ ...R, ...patch }), `negative test passed but should fail: ${name}`)

console.log(`ok: ${R.SERVICES.length} services, ${R.PAGES.length} pages, ${R.STATIC_PAIRS().length} pairs, ${R.REDIRECTS.length} redirects`)
