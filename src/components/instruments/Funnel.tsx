// E4 · Campaign funnel: Tayangan → Klik → Chat WhatsApp → Pesanan as relative bars (no absolute numbers),
// platform text chips, ending in a green <span> pill. Bars scale in once. Used on: Paid Ads hero/steps.
import type { Locale } from '@/lib/services'
import { FUNNEL } from '@/content/instruments'
import { MockFrame, v, type MockGround } from './MockFrame'

export function Funnel({ locale: l, ground = 'malam-dalam', className }: { locale: Locale; ground?: MockGround; className?: string }) {
  return (
    <MockFrame locale={l} ground={ground} className={className}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="m-cap">{FUNNEL.title[l]}</span>
        <span className="flex gap-2">{FUNNEL.chips.map((c) => <span key={c} className="m-chip">{c}</span>)}</span>
      </div>
      <ol className="m-bars grid gap-3">
        {FUNNEL.steps.map((s, i) => (
          <li key={s.k.en} className="grid grid-cols-[minmax(0,8em)_minmax(0,1fr)] items-center gap-3">
            <span className="m-s">{s.k[l]}</span>
            <span className="trk"><i className="lk-bar" style={v({ '--v': s.v, '--i': i })} /></span>
          </li>
        ))}
      </ol>
      <span className="m-btn m-pill m-wa justify-self-end">{FUNNEL.pill[l]}</span>
    </MockFrame>
  )
}
