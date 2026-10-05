// The canonical home of the Kampanye 360° offer (§11 7.2 item 4): /layanan#kampanye-360 · /en/services#kampanye-360.
// PILLARS are mapped here (no shared component, no cross-package import); copy ships its K1 fallbacks.
import { WA_PATTERNS, type Locale } from '@/lib/services'
import { Section } from '@/components/ds/Section'
import { Dateline } from '@/components/ds/Dateline'
import { Stabilo } from '@/components/ds/Stabilo'
import { WaButton } from '@/components/ds/WaButton'
import { Button } from '@/components/ds/Button'
import { quoteHref } from '@/components/ds/chrome/links'
import { T } from '@/components/ds/strings'
import { PILLARS } from '@/content/campaign'
import { OFFER } from '@/content/hub'
import { CampaignMap } from '@/components/instruments/CampaignMap'

export function Campaign360Offer({ locale: l }: { locale: Locale }) {
  return (
    <Section hour="0630" ground="putih" id="kampanye-360" labelledBy="k360-h">
      <div className="wrap grid-12 gap-y-10 lg:items-center">
        <div className="col-span-12 grid content-start gap-6 lg:col-span-6">
          <Dateline locale={l} hour="0630" right={T.c360[l]} />
          <h2 id="k360-h" className="t-h2">{OFFER.h2[l]}</h2>
          <p className="t-lead max-w-lead">
            <Stabilo>{OFFER.lead1[l]}</Stabilo> {OFFER.lead2[l]} {OFFER.lead3[l]}
          </p>
          <div className="flex flex-wrap gap-3">
            <WaButton text={WA_PATTERNS.campaign360[l]} placement="campaign" service="360" label={T.c360Chat[l]} />
            <Button href={quoteHref(l, '360')} cta="quote" placement="campaign" service="360">{OFFER.proposal[l]}</Button>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <CampaignMap locale={l} table="details" id="hub" />
        </div>
        <dl className="col-span-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label={OFFER.pillarsH[l]}>
          {PILLARS.map((p) => (
            <div key={p.dt.id} className="card p-5">
              <dt className="t-h3">{p.dt[l]}</dt>
              <dd className="t-small mt-2 text-ink-2">{p.dd[l]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
