import Link from 'next/link'
import { WA_PATTERNS, svc as svcOf, svcHref, type Locale, type SvcKey } from '@/lib/services'
import type { Ground } from '@/styles/tailwind.tokens'
import { CAMPAIGN_CONFIRMED, NOTE, REPORT } from '@/content/campaign'
import type { CampaignItem } from '@/content/services/types'
import { tpl } from '@/content/services/template'
import { Section } from '@/components/ds/Section'
import { WaButton } from '@/components/ds/WaButton'
import { TextLink } from '@/components/ds/TextLink'
import { hub360 } from '@/components/ds/chrome/links'
import { More } from './More'

/** Gate rule (§11 6.1): a gated item renders when its flag is true, else its fallback, else nothing. */
const textOf = (it: CampaignItem) => (!it.gate || CAMPAIGN_CONFIRMED[it.gate] ? it.text : it.fallback)

function Name({ k, l }: { k: CampaignItem['k']; l: Locale }) {
  if (k === 'wa') return <>{tpl('wa', l)}</>
  if (k === 'report') return <>{REPORT[l]}</>
  if (k === 'strategy') return <Link href={hub360(l)} className="link">{tpl('strategy', l)}</Link>
  return <Link href={svcHref(k, l)} className="link">{svcOf(k).name[l]}</Link>
}

/** Visible: the service names only. The one-sentence reasons live in the collapsed More panel below. */
function Side({ heading, items, l }: { heading: string; items: CampaignItem[]; l: Locale }) {
  return (
    <div>
      <h3 className="t-small font-650 text-ink-2">{heading}</h3>
      <ul className="t-ui mt-2 grid gap-1">
        {items.filter(textOf).map((it) => <li key={it.k}><Name k={it.k} l={l} /></li>)}
      </ul>
    </div>
  )
}

function Reasons({ heading, items, l }: { heading: string; items: CampaignItem[]; l: Locale }) {
  return (
    <div>
      <p className="t-small font-650 text-ink-2">{heading}</p>
      <dl className="mt-2 grid gap-3">
        {items.filter(textOf).map((it) => (
          <div key={it.k} id={it.k === 'ai' ? 'ai-search' : undefined}>
            <dt className="t-small font-650"><Name k={it.k} l={l} /></dt>
            <dd className="t-small">{textOf(it)}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/**
 * Section 6, the ONE "run it alone or as part of a 360° campaign" block (owner 2026-10-03; it merges the
 * §11 6.1 module, the cross-sell and the stage strip). Visible: the heading (it carries the message; the
 * layout's ClosingBand repeats no more of it), the services that feed this one and that it feeds
 * (registry-name links), the hub link and the upgrade WhatsApp prefill. ponytail: the §11 NOTE sentences left
 * with the owner's 'each message once' pass. The one-line reasons, and the
 * #ai-search line when the lists do not name SEO AI, sit in the collapsed More panel.
 */
export function LoopPosition({ k, locale: l, campaign, ai, ground }: {
  k: SvcKey; locale: Locale; campaign: { fedBy: CampaignItem[]; feeds: CampaignItem[] }; ai: string; ground: Ground
}) {
  const s = svcOf(k)
  const name = s.name[l]
  const named = [...campaign.fedBy, ...campaign.feeds].some((it) => it.k === 'ai' && textOf(it))
  return (
    <Section hour={s.hour} ground={ground} id="kampanye-360" labelledBy="kampanye-360-h">
      <div className="wrap">
        <div className="card grid gap-8 p-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:p-10">
          <div className="grid content-start gap-4">
            <h2 id="kampanye-360-h" className="t-h2">{tpl('campaign', l)}</h2>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <TextLink href={hub360(l)} arrow>{NOTE.link[l]}</TextLink>
              <WaButton text={WA_PATTERNS.upgrade(name)[l]} placement="campaign" service={k} size="sm" />
            </div>
          </div>
          <div className="grid content-start gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Side heading={tpl('fedBy', l)} items={campaign.fedBy} l={l} />
              <Side heading={tpl('feeds', l)} items={campaign.feeds} l={l} />
            </div>
            <More locale={l}>
              <div className="grid gap-6 sm:grid-cols-2">
                <Reasons heading={tpl('fedBy', l)} items={campaign.fedBy} l={l} />
                <Reasons heading={tpl('feeds', l)} items={campaign.feeds} l={l} />
              </div>
              {k !== 'ai' && !named ? (
                <p id="ai-search" className="t-small">
                  <Link href={svcHref('ai', l)} className="link font-650">{svcOf('ai').name[l]}</Link>: {ai}
                </p>
              ) : null}
            </More>
          </div>
        </div>
      </div>
    </Section>
  )
}
