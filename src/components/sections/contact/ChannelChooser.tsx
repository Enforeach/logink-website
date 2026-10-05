import { EMAIL, WA_PATTERNS, page, type Locale } from '@/lib/services'
import { WaButton } from '@/components/ds/WaButton'
import { Icon } from '@/components/ds/Icon'
import { CONTACT as C } from '@/content/contact'

/**
 * WhatsApp first (BUILD §3.9), carrying the two ways to buy (§11): one service (page prefill) or a
 * 360° campaign (WA_PATTERNS.campaign360). Then the form (#formulir) and email. Flat Malam Dalam panels.
 */
export function ChannelChooser({ locale: l }: { locale: Locale }) {
  return (
    <div>
      <h2 className="t-dateline text-ink-2">{C.channelsH[l]}</h2>
      <ol className="mt-4 grid gap-3 sm:grid-cols-2">
        <li data-ground="kertas" className="card-raised p-5 sm:col-span-2 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="t-h3">{C.waName[l]}</p>
            <p className="t-small text-ink-2">{C.waNote[l]}</p>
          </div>
          <p className="t-small mt-5 text-ink-2">{C.waAsk[l]}</p>
          <div className="mt-3 grid gap-5 md:grid-cols-2">
            <div className="flex flex-col border-t border-line pt-4">
              <p className="t-dateline text-ink-2">{C.oneEyebrow[l]}</p>
              <p className="t-small mb-4 mt-2">{C.oneText[l]}</p>
              <WaButton text={page('contact').wa[l]} placement="channel" label={C.oneCta[l]} size="sm" className="mt-auto self-start" />
            </div>
            <div className="flex flex-col border-t border-line pt-4">
              <p className="t-dateline text-ink-2">{C.c360Eyebrow[l]}</p>
              <p className="t-small mb-4 mt-2">{C.c360Text[l]}</p>
              <WaButton text={WA_PATTERNS.campaign360[l]} placement="channel" service="360" label={C.c360Cta[l]} size="sm" className="mt-auto self-start" />
            </div>
          </div>
        </li>
        <li data-ground="kertas" className="card-raised flex flex-col p-5">
          <p className="t-h3">{C.formName[l]}</p>
          <p className="t-small mt-1 text-ink-2">{C.formNote[l]}</p>
          <a href="#formulir" className="link mt-auto inline-flex min-h-tap items-center gap-2 pt-3 font-650" data-cta="form" data-placement="channel" data-service="none">
            {C.formCta[l]}<Icon name="arrow-right" size={16} />
          </a>
        </li>
        <li data-ground="kertas" className="card-raised flex flex-col p-5">
          <p className="t-h3">{C.emailName[l]}</p>
          <p className="t-small mt-1 text-ink-2">{C.emailNote[l]}</p>
          <a href={`mailto:${EMAIL}`} className="link mt-auto inline-flex min-h-tap items-center pt-3 font-650">{EMAIL}</a>
        </li>
      </ol>
    </div>
  )
}
