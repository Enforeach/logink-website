// E6 · Share of voice in AI answers: Kedai Contoh vs Brand A/B/C. Values are text; bars scale in once (scaleX).
// Used on: home Bab III, AI page.
import type { Locale } from '@/lib/services'
import { SOV } from '@/content/instruments'
import { MockFrame, v, type MockGround } from './MockFrame'

export function SovBars({ locale: l, ground = 'putih', className }: { locale: Locale; ground?: MockGround; className?: string }) {
  const max = Math.max(...SOV.rows.map(([, n]) => n))
  return (
    <MockFrame locale={l} ground={ground} className={className}>
      <span className="m-cap">{SOV.title[l]}</span>
      <ol className="m-bars grid gap-3">
        {SOV.rows.map(([name, n], i) => (
          <li key={name} className="grid grid-cols-[minmax(0,7.5em)_minmax(0,1fr)_3em] items-center gap-3">
            <span className={i === 0 ? 'm-s m-hl font-650' : 'm-s'}>{name}</span>
            <span className="trk"><i className={i === 0 ? 'lk-bar' : 'lk-bar m-mute'} style={v({ '--v': n / max, '--i': i })} /></span>
            <span className="m-s text-right tabular-nums">{n}%</span>
          </li>
        ))}
      </ol>
      <span className="m-xs text-ink-2">{SOV.note[l]}</span>
    </MockFrame>
  )
}
