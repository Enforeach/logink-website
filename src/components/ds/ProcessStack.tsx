import type { CSSProperties } from 'react'
import type { Ground } from '@/styles/tailwind.tokens'
import type { Locale } from '@/lib/services'
import { Section } from './Section'
import { Dateline } from './Dateline'

/** Sticky stacking process cards (CSS, every device; the desktop scale is motion.css §17). */
export function ProcessStack({ locale: l, heading, steps, hour, ground, id = 'proses' }: {
  locale: Locale; heading: string; steps: { when: string; title: string; text: string }[]; hour?: string; ground?: Ground; id?: string
}) {
  return (
    <Section hour={hour} ground={ground ?? (hour ? undefined : 'kertas')} id={id} labelledBy={`${id}-h`}>
      <div className="wrap">
        {hour ? <Dateline locale={l} hour={hour} /> : null}
        <h2 id={`${id}-h`} className="t-h2 mt-6">{heading}</h2>
        <ol className="lk-stack mt-10" style={{ '--n': steps.length } as CSSProperties}>
          {steps.map((s, i) => (
            <li key={s.title} style={{ '--i': i } as CSSProperties}>
              <article className="lk-stack__card grid gap-3 border border-hair bg-surface-alt p-6 sm:grid-cols-[12rem_1fr] lg:p-10">
                <p className="t-dateline text-key-ink">{s.when}</p>
                <div>
                  <h3 className="t-h3">{s.title}</h3>
                  <p className="t-body mt-2">{s.text}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
