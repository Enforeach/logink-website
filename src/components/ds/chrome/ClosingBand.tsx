import Link from 'next/link'
import { ANTI_SCAM, WA_PATTERNS, waLink, type Locale, type SvcKey } from '@/lib/services'
import { WaButton } from '../WaButton'
import { T } from '../strings'
import { quoteHref } from './links'

/**
 * The one closing CTA on every page: a rounded Malam panel (its own dark scope via data-hour) on the page ground.
 * Default: at the end, inside HouseLights' section.hl-night. `inline` (owner 2026-10-04): its own <section>, placed by
 * pages with an FAQ right before it (PageShell closing="inline" then skips the end copy). Lede per BUILD §11 4.8;
 * the 360° text link on home and hub only. Penawaran is the gradient partner button.
 */
export function ClosingBand({ locale: l, text, svc, link360, inline }: { locale: Locale; text: string; svc?: SvcKey; link360?: boolean; inline?: boolean }) {
  const h = T.closingH[l], cut = h.lastIndexOf(' ') // the last word carries the brand gradient (one per headline)
  const band = (
    <div className={inline ? 'wrap' : 'wrap pb-6 pt-section-sm'}>
      <div className="closing-panel grid justify-items-center gap-5 px-6 py-14 text-center sm:px-12 lg:py-20" data-hour="2130" data-sky="dark">
        <h2 id="closing-h" className="t-h2">{h.slice(0, cut + 1)}<span className="grad-text">{h.slice(cut + 1)}</span></h2>
        <p className="t-lead max-w-lead text-ink-2">{T.closingLede[l]}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <WaButton text={text} placement="closing" service={svc ?? 'none'} />
          <Link href={quoteHref(l, svc)} className="btn btn-ink" data-cta="quote" data-placement="closing" data-service={svc ?? 'none'}>{T.quote[l]}</Link>
        </div>
        {link360 ? (
          <a href={waLink(WA_PATTERNS.campaign360[l])} target="_blank" rel="noopener" className="link inline-flex min-h-tap items-center"
            data-cta="whatsapp" data-placement="closing" data-service="360" data-cursor="Chat WhatsApp" data-cursor-tone="wa">
            {T.ask360[l]}
          </a>
        ) : null}
        <p className="t-small text-ink-2">{ANTI_SCAM[l]}</p>
      </div>
    </div>
  )
  return inline ? <section className="py-section-sm" aria-labelledby="closing-h">{band}</section> : band
}
