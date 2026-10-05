// 04 Proses (owner 2026-10-04, benchmarked on the live 'Proses Kami' timeline): centred header, then the owner's five
// steps in three labelled groups so the reader sees the opportunity and the plan come BEFORE the contract:
// before you sign (1-3) · your decision (4, highlighted) · after approval (5). Five columns on desktop, stacked on
// phones; the ghost numbers are decoration (each <ol start> carries the real order). Also on the SEO service page
// (owner 2026-10-04: 'use like the homepage'), on that page's ground.
import type { Locale } from '@/lib/services'
import type { Ground } from '@/styles/tailwind.tokens'
import { SplitHeading } from '@/motion/primitives'
import { Section } from '@/components/ds/Section'
import { Dateline } from '@/components/ds/Dateline'
import { Icon } from '@/components/ds/Icon'
import { PROCESS } from '@/content/home'

export function Process({ locale: l, ground = 'kertas' }: { locale: Locale; ground?: Ground }) {
  let n = 0
  return (
    <Section hour="0645" ground={ground} id="proses" labelledBy="proses-h">
      <div className="wrap grid gap-10 lg:gap-12">
        <div className="mx-auto grid max-w-lead justify-items-center gap-4 text-center">
          <Dateline locale={l} label={PROCESS.label[l]} />
          <SplitHeading text={PROCESS.h2[l]} id="proses-h" accent={2} />
          <p className="t-lead">{PROCESS.lead[l]}</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-3">
          {PROCESS.groups.map((g, gi) => {
            const start = n + 1
            return (
              <div key={g.label.en} className={`grid grid-rows-[auto_1fr] gap-3 ${g.steps.length > 1 ? 'lg:col-span-3' : ''}`}>
                <p className={gi === 0 ? 'proc-phase proc-phase--key' : 'proc-phase'}>{g.label[l]}</p>
                <ol start={start} className={`grid gap-3 ${g.steps.length > 1 ? 'lg:grid-cols-3' : ''}`}>
                  {g.steps.map((s) => {
                    const i = n++
                    return (
                      <li key={s.t.en} className={`card grid content-start gap-2 p-4 lg:p-5 ${s.sign ? 'proc-sign' : ''}`} data-reveal="lift"
                        style={{ transitionDelay: `${i * 70}ms` }}>
                        <span className="flex items-center justify-between gap-3" aria-hidden="true">
                          <span className="proc-num grad-text">{String(i + 1).padStart(2, '0')}</span>
                          {s.sign ? <span className="proc-check"><Icon name="check" size={18} /></span> : null}
                        </span>
                        <h3 className="t-h3">{s.t[l]}</h3>
                        <p className="t-small text-ink-2">{s.d[l]}</p>
                      </li>
                    )
                  })}
                </ol>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
