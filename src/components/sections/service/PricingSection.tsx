import { WA_PATTERNS, svc as svcOf, type Locale, type SvcKey } from '@/lib/services'
import type { Ground } from '@/styles/tailwind.tokens'
import type { Pricing, Table, Tier } from '@/content/services/types'
import { tpl } from '@/content/services/template'
import { Section } from '@/components/ds/Section'
import { Badge } from '@/components/ds/Badge'
import { WaButton } from '@/components/ds/WaButton'
import { DataTable } from '@/components/ds/DataTable'
import { Price } from '@/components/ds/Price'
import { Icon } from '@/components/ds/Icon'
import { AddonList, ModulesPricing, ProjectsPricing } from './PricingVariants'
import { More } from './More'
import { CompareTable } from './WhatWeDo'

function TierCard({ t, k, l, features }: { t: Tier; k: SvcKey; l: Locale; features: boolean }) {
  const name = svcOf(k).name[l]
  return (
    <article data-ground="putih" className={`card-raised flex flex-col p-6 lg:p-8 ${t.isPopular ? 'tier-pop' : ''}`}>
      <div className="flex min-h-7 flex-wrap items-center justify-between gap-2">
        <h3 className="t-h3">{t.name}</h3>
        {t.isPopular ? <Badge kind="populer" locale={l} /> : null}
      </div>
      <p className="mt-4">
        <span className="t-h2 tabular-nums">{t.price}</span>
        <span className="t-ui text-ink-2">{t.period}</span>
      </p>
      {t.note ? <p className="t-small mt-1 font-650">{t.note}</p> : null}
      <p className="t-small mt-2 text-ink-2">{t.bestFor}</p>
      {features ? (
        <ul className="t-small mt-5 grid gap-2.5 border-t border-hair pt-4">
          {t.features.map((f) => <li key={f} className="flex items-start gap-2"><span className="svc-tick mt-px scale-90" aria-hidden="true"><Icon name="check" size={12} /></span>{f}</li>)}
        </ul>
      ) : null}
      <div className="mt-auto pt-6">
        <WaButton text={WA_PATTERNS.tier(t.name, name)[l]} placement="tier" service={k} label={tpl('choose', l, { tier: t.name })} full />
      </div>
    </article>
  )
}

/**
 * Block 07 (id harga): every tier, price and feature as SSR text. Tier CTAs are WhatsApp links with the
 * WA_PATTERNS.tier prefill. With a `matrix`, features live in the table (collapsed in a More panel, no
 * duplicate lists in the cards). SEO has no matrix (owner 2026-10-04): its lists show on the cards, like the live page. The Service + Offer JSON-LD (schema.ts) is built from these same tiers.
 */
export function PricingSection({ k, locale: l, pricing, compare, ground, compact }: { k: SvcKey; locale: Locale; pricing: Pricing; compare?: Table | null; ground: Ground; compact?: boolean }) {
  const s = svcOf(k)
  return (
    <Section hour={s.hour} ground={ground} id="harga" labelledBy="harga-h">
      <div className="wrap grid gap-10">
        <h2 id="harga-h" className="t-h2 max-w-[20ch]">{tpl('pricing', l, { name: s.name[l] })}</h2>
        {pricing.kind === 'quote' ? (
          <div className="grid max-w-[60ch] gap-4">
            <p className="t-lead"><Price svc={k} locale={l} /></p>
            {pricing.note ? <p className="t-body">{pricing.note}</p> : null}
            <div><WaButton text={s.wa[l]} placement="tier" service={k} /></div>
          </div>
        ) : pricing.kind === 'modules' ? (
          <ModulesPricing k={k} locale={l} pricing={pricing} compact={compact} />
        ) : pricing.kind === 'projects' ? (
          <ProjectsPricing k={k} locale={l} pricing={pricing} />
        ) : (
          <>
            <div className={pricing.tiers.length === 2 ? 'grid max-w-[880px] gap-4 md:grid-cols-2' : 'grid gap-4 md:grid-cols-3'}>
              {pricing.tiers.map((t) => <TierCard key={t.id} t={t} k={k} l={l} features={!pricing.matrix} />)}
            </div>
            {pricing.note ? <p className="t-small max-w-[60ch] text-ink-2">{pricing.note}</p> : null}
            {pricing.matrix ? (
              <More locale={l} label={pricing.matrix.caption}>
                <DataTable scroll rowHeaders caption={pricing.matrix.caption} head={pricing.matrix.head} rows={pricing.matrix.rows}
                  className="[&_td]:whitespace-nowrap [&_td]:tabular-nums" />
                {pricing.matrix.note ? <p className="t-small max-w-[75ch]">{pricing.matrix.note}</p> : null}
              </More>
            ) : null}
            {pricing.addons?.length ? <AddonList locale={l} addons={pricing.addons} /> : null}
          </>
        )}
        {/* Website: the project-type comparison belongs with the project prices (collapsed, in the SSR DOM) */}
        {compare ? <More locale={l} label={compare.caption}><CompareTable locale={l} compare={compare} /></More> : null}
      </div>
    </Section>
  )
}
