import Image from 'next/image'
import type { CtaWidgetRow } from '@/lib/cta'
import type { Locale } from '@/lib/services'
import { fmtDate } from '@/components/ds/strings'
import { CtaTrack } from './CtaTrack'
import { CtaCountdown } from './CtaCountdown'
import { cn } from '@/lib/utils'

const UI = {
  close: { id: 'Tutup', en: 'Close' },
  ends: { id: 'Berakhir', en: 'Ends' },
  sponsored: { id: 'Sponsor', en: 'Sponsored' },
}
const DISMISSIBLE = new Set(['HERO_BANNER', 'SERVICE_CARD', 'SPLIT_VISUAL', 'FLOATING_NOTIFICATION', 'COUNTER_URGENCY'])

/**
 * One CMS CTA widget, server-rendered (all 8 templates; BUILD §3.9 post). Tokens only: the CMS
 * backgroundColor/textColor hex fields are not applied (DESIGN §3.2). FLOATING_NOTIFICATION renders inline
 * (no hidden-until-trigger popup: its text must exist without JS). COUNTER_URGENCY counts down only to a
 * real endDate (the old 7-day fallback invented urgency). The "No commitment · 48hr delivery" line is gone.
 */
export function CtaRenderer({ widget: w, locale: l }: { widget: CtaWidgetRow; locale: Locale }) {
  const t = w.templateType
  if (t === 'CUSTOM_IMAGE' && !w.backgroundImage) return null
  const label = w.buttonText || w.heading || w.buttonUrl
  const data = Object.fromEntries(
    Object.entries((w.dataAttributes ?? {}) as Record<string, unknown>).filter(([k]) => /^data-[\w-]+$/.test(k)).map(([k, v]) => [k, String(v)]),
  )
  const emoji = w.emoji ? <span aria-hidden="true" className="mr-2">{w.emoji}</span> : null
  const primary = (cls = 'btn btn-ink btn-sm') => (
    <a href={w.buttonUrl} data-cta-primary="" className={cls}>{label}</a>
  )
  const secondary = w.secondaryButtonUrl && w.secondaryButtonText
    ? <a href={w.secondaryButtonUrl} className="btn btn-ghost btn-sm">{w.secondaryButtonText}</a> : null
  const sponsored = w.sponsoredLabel ? <p className="t-dateline mb-2 text-ink-2">{UI.sponsored[l]}</p> : null
  const text = (
    <>
      {sponsored}
      {w.heading ? <p className="t-h3 pr-10">{emoji}{w.heading}</p> : null}
      {w.subheading ? <p className="t-small mt-2 text-ink-2">{w.subheading}</p> : null}
    </>
  )

  let body: React.ReactNode
  let shell = ''
  let ground: string | undefined
  switch (t) {
    case 'MINIMAL_STRIP':
      shell = 'flex flex-wrap items-center justify-between gap-4 border-y border-line py-4 pr-12'
      body = (<><p className="font-650">{emoji}{w.heading}</p>{primary()}</>)
      break
    case 'HERO_BANNER':
      ground = 'malam'
      shell = 'p-6 sm:p-8'
      body = (<>{text}<div className="mt-5 flex flex-wrap gap-3">{primary('btn btn-ink')}{secondary}</div></>)
      break
    case 'CUSTOM_IMAGE':
      shell = 'border border-line'
      body = (
        <a href={w.buttonUrl} data-cta-primary="" className="block">
          <span className="relative block aspect-[16/5] w-full overflow-hidden rounded">
            <Image src={w.backgroundImage!} alt={label} fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
          </span>
          <span className="t-small block p-3 font-650 underline underline-offset-2">{sponsored ? `${UI.sponsored[l]} · ` : ''}{label}</span>
        </a>
      )
      break
    case 'SPLIT_VISUAL':
      ground = 'putih'
      shell = cn('grid border border-line sm:grid-cols-[200px_1fr]', w.imagePosition === 'right' && 'sm:grid-cols-[1fr_200px]')
      body = (
        <>
          {w.backgroundImage ? (
            <span className={cn('relative block min-h-[150px]', w.imagePosition === 'right' && 'sm:order-2')}>
              <Image src={w.backgroundImage} alt="" fill sizes="200px" className="object-cover" />
            </span>
          ) : null}
          <div className={cn('p-6', !w.backgroundImage && 'sm:col-span-2')}>{text}<div className="mt-4 flex flex-wrap gap-3">{primary()}{secondary}</div></div>
        </>
      )
      break
    case 'COUNTER_URGENCY': {
      ground = 'putih'
      shell = 'border border-line p-6'
      const end = w.endDate ? w.endDate.toISOString() : null // filterCtasForPost already dropped expired widgets
      body = (
        <>
          {w.countdownLabel || end ? <p className="t-dateline mb-3 text-ink-2">{emoji}{w.countdownLabel}</p> : null}
          {end ? <CtaCountdown end={end} locale={l}><p className="t-small">{UI.ends[l]} <time dateTime={end}>{fmtDate(end, l)}</time></p></CtaCountdown> : null}
          {w.heading ? <p className="t-h3 mt-4 pr-10">{w.heading}</p> : null}
          {w.subheading ? <p className="t-small mt-2 text-ink-2">{w.subheading}</p> : null}
          <div className="mt-4">{primary()}</div>
        </>
      )
      break
    }
    case 'SERVICE_CARD':
      ground = 'putih'
      shell = 'border border-line p-6'
      body = (<>{text}<div className="mt-5">{primary('btn btn-ink btn-sm w-full')}</div></>)
      break
    default: // INLINE_CALLOUT, FLOATING_NOTIFICATION
      shell = 'border-l-4 border-key bg-surface-alt py-5 pl-5 pr-12'
      body = (<>{text}<p className="mt-3">{primary('link t-small inline-flex min-h-tap items-center font-650')}</p></>)
  }

  return (
    <CtaTrack id={w.id} placement={w.placement} template={t} gaLabel={w.gaEventLabel} gaCategory={w.gaEventCategory}
      dismissible={w.dismissible && DISMISSIBLE.has(t)} days={w.dismissDuration} closeLabel={UI.close[l]} ground={ground}
      className={cn('my-8 max-w-measure', w.cssClass)}>
      <div className={shell} {...data}>{body}</div>
    </CtaTrack>
  )
}
