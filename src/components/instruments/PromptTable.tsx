// E6 · Prompt tracking: prompt · engine · mentioned? · cited URL · position (ranges, each prompt run 3×), mono
// cells. Mentioned rows get a one-time jingga light (lk-lit, per cell). Under 640px rows reflow into labelled blocks: a mock
// is inert, so it must never rely on sideways scrolling. Used on: home Bab III, AI page.
import { Fragment } from 'react'
import type { Locale } from '@/lib/services'
import { PROMPTS } from '@/content/instruments'
import { MockFrame, v, type MockGround } from './MockFrame'

export function PromptTable({ locale: l, ground = 'putih', className }: { locale: Locale; ground?: MockGround; className?: string }) {
  const h = PROMPTS.head[l]
  return (
    <MockFrame locale={l} ground={ground} className={className}>
      <table className="m-tbl">
        <caption className="m-cap">{PROMPTS.caption[l]}</caption>
        <thead><tr>{h.map((c) => <th key={c} scope="col" className="m-cap">{c}</th>)}</tr></thead>
        <tbody>
          {PROMPTS.rows.map((r, i) => {
            // the one-time jingga light sits on each cell: Chrome gives a <tr>'s absolute ::before a column slot
            const lit = r.hit ? 'lk-lit ' : ''
            return (
              <tr key={r.q} style={v({ '--i': i })}>
                <td className={`${lit}text-ink`}>{r.q}</td>
                <td className={lit || undefined} data-label={h[1]}>{r.e}</td>
                <td className={lit + (r.hit ? 'm-hl' : 'text-ink-2')} data-label={h[2]}>{(r.hit ? PROMPTS.yes : PROMPTS.no)[l]}</td>
                <td className={lit || undefined} data-label={h[3]}>{r.url.split('/').map((s, j) => <Fragment key={j}>{j ? <>/<wbr /></> : null}{s}</Fragment>)}</td>
                <td className={`${lit}tabular-nums`} data-label={h[4]}>{r.pos}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </MockFrame>
  )
}
