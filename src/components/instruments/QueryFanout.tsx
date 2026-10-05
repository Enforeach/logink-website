// E7 · Query fan-out: one question splitting into four sub-queries, each ending on its source. Drawn as a
// tree (the rail draws in once), which holds at every width. Used on: home Bab III (Home may wrap it in
// <details> on phones), AI page.
import type { Locale } from '@/lib/services'
import { AI_QUESTION, FANOUT } from '@/content/instruments'
import { Icon } from '@/components/ds/Icon'
import { MockFrame, v, type MockGround } from './MockFrame'

export function QueryFanout({ locale: l, ground = 'putih', className }: { locale: Locale; ground?: MockGround; className?: string }) {
  return (
    <MockFrame locale={l} ground={ground} className={className}>
      <span className="m-cap">{FANOUT.title[l]}</span>
      <p className="m-box bg-surface-alt font-650">{AI_QUESTION}</p>
      <ul className="m-fan">
        {FANOUT.subs.map((s, i) => (
          <li key={s.q} className="m-rise" style={v({ '--i': i })}>
            <span className="m-chip m-mono m-ink">{s.q}</span>
            <Icon name="arrow-right" size={14} className="text-ink-2" />
            <span className="m-s m-hl">{s.src[l]}</span>
          </li>
        ))}
      </ul>
    </MockFrame>
  )
}
