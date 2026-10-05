import Link from 'next/link'
import { STAGES, liveServices, servicesInStage, svcHref, type Locale, type StageKey, type SvcKey } from '@/lib/services'
import { STAGE_ORDER } from '@/styles/tailwind.tokens'
import { SHORT, T } from './strings'
import { cn } from '@/lib/utils'

/**
 * strip: 4 real in-page anchors (#ditemukan …), each a key-light rule + "07.00 Ditemukan" + the services whose primary stage it is.
 * loop: "Posisi di loop": the active stage lit, other stages list their services as name links.
 */
export function StageStrip({ locale: l, variant, active, svc: self }: { locale: Locale; variant: 'strip' | 'loop'; active?: StageKey; svc?: SvcKey }) {
  if (variant === 'strip')
    return (
      <ol className="grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-4">
        {STAGE_ORDER.map((st) => (
          <li key={st} data-stage={st}>
            <a href={`#${STAGES[st].anchor}`} className="group block rounded-[var(--r-card)] bg-surface-alt p-4 transition-colors hover:bg-surface">
              <span className="t-dateline block text-ink">{STAGES[st].name[l]}</span>
              <span className="t-small block text-ink-2 group-hover:text-ink">
                {liveServices().filter((s) => s.stage === st).map((s) => SHORT[s.key][l]).join(' · ')}
              </span>
            </a>
          </li>
        ))}
      </ol>
    )
  return (
    <div>
      <p className="t-dateline text-ink-2">{T.loop[l]}</p>
      <ol className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STAGE_ORDER.map((st) => {
          const on = st === active
          const others = servicesInStage(st).filter((s) => s.key !== self)
          return (
            <li key={st} data-stage={st} aria-current={on ? 'step' : undefined}
              className={cn('rounded-[var(--r-card)] p-4', on ? 'bg-surface shadow-[var(--shadow-md)]' : 'bg-surface-alt')}>
              <span className={cn('t-dateline block', on ? 'text-ink' : 'text-ink-2')}>{STAGES[st].name[l]}</span>
              {others.length ? (
                <ul className="t-small mt-1 space-y-1">
                  {others.map((s) => (
                    <li key={s.key}><Link href={svcHref(s.key, l)} className="underline-offset-4 hover:underline">{s.name[l]}</Link></li>
                  ))}
                </ul>
              ) : null}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
