// 'Cara kami mengukur' / 'How we measure': the honest proof slot when there is no approved case. Real, citable
// text (not a mock) + the sample ReportFrame. Used on: home Bab I empty state, service Bukti empty state,
// portfolio, about.
import type { Locale } from '@/lib/services'
import { MEASURE } from '@/content/instruments'
import { ReportFrame } from './ReportFrame'
import type { MockGround } from './MockFrame'

export function MeasureBlock({ locale: l, headingLevel = 3, ground, id }: { locale: Locale; headingLevel?: 2 | 3; ground?: MockGround; id?: string }) {
  const H = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <div className="grid gap-4">
      <H id={id} className={headingLevel === 2 ? 't-h2' : 't-h3'}>{MEASURE.heading[l]}</H>
      <p className="t-body">{MEASURE.text[l]}</p>
      <ReportFrame locale={l} ground={ground} />
    </div>
  )
}
