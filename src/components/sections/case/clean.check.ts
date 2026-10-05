// Runnable check for the case presentation guards: pnpm exec tsx src/components/sections/case/clean.check.ts
import assert from 'node:assert/strict'
import { caseTitle, clean, contradicts, fmtMetric, months, type CaseLike } from './clean'

assert.equal(fmtMetric('3,080%', 'id', true), '+3.080%')
assert.equal(fmtMetric('3,080%', 'en', true), '+3,080%')
assert.equal(fmtMetric(' 28.5%', 'id'), '28,5%')
assert.equal(fmtMetric('\t+560.5%', 'en'), '+560.5%')
assert.equal(fmtMetric('3.080,%', 'id'), null) // mangled → hidden, never rendered
assert.equal(clean('impresi +3.080,% naik', 'id'), 'impresi +3.080% naik')
assert.equal(clean('konten berarti [Klien] tidak', 'id'), 'konten berarti klien tidak')
assert.equal(clean('establishing [Adventure Tourism Sites] as', 'en', 'Adventure Tourism Sites'), 'establishing Adventure Tourism Sites as')
assert.equal(clean('Duomark rebuilt the site', 'en'), '')
assert.equal(clean('Pariwisata Industri (Client): Traffic', 'id'), 'Pariwisata Industri: Traffic')
assert.equal(months('5 Month', 'id'), '5 bulan')

const base: CaseLike = {
  slug: 'franchise-hub-case-studies', slugEn: null, title: '', titleId: 'Franchise Hub: +253% Traffic Organik dalam 3 Bulan',
  titleEn: 'Franchise Hub: +253% Unbranded Traffic Growth in 3 Months', subtitleId: null, subtitleEn: null,
  seoTitleId: null, seoTitleEn: null, seoDescId: null, seoDescEn: null, clientName: 'Franchise Expo Indonesia',
  durationLabel: '5 Month', industry: 'Other', metrics: [{ metricLabel: 'Organic Clicks', afterValue: '20.4K' }],
  blocks: [{ blockType: 'HERO', isVisible: true, data: { headingId: 'Menaikan Revenue  di Indonesia', headingEn: 'From Event Brochure', metrics: [{ value: '11.1%' }] } }],
}
assert.ok(contradicts(base.titleId!, base))
assert.equal(caseTitle(base, 'id'), 'Menaikan Revenue di Indonesia')
assert.equal(caseTitle(base, 'en'), 'From Event Brochure')
const ok = { ...base, titleId: 'Pameran: +11.1% Klik dalam 5 Bulan' }
assert.equal(caseTitle(ok, 'id'), 'Pameran: +11.1% Klik dalam 5 Bulan')
console.log('ok: case presentation guards')
