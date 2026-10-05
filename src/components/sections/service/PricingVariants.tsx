// Block 07 variants beyond 'tiers'/'quote': Social/Creative 'modules' (SSR module lists + the QuoteBuilder
// island) and Website 'projects' (one registry price line for every project + the Discovery call CTA).
import Link from 'next/link'
import { WA_NUMBER, svc as svcOf, type Locale, type SvcKey } from '@/lib/services'
import type { Addon, Pricing } from '@/content/services/types'
import { tpl } from '@/content/services/template'
import { WaButton } from '@/components/ds/WaButton'
import { Button } from '@/components/ds/Button'
import { Price } from '@/components/ds/Price'
import { Icon } from '@/components/ds/Icon'
import { T } from '@/components/ds/strings'
import { quoteHref } from '@/components/ds/chrome/links'
import { QuoteBuilder } from './QuoteBuilder'
import { More } from './More'

const LABEL = {
  bestFor: { id: 'Cocok untuk', en: 'Best for' },
  timeline: { id: 'Waktu pengerjaan', en: 'Timeline' },
}

export function AddonList({ locale: l, addons }: { locale: Locale; addons: Addon[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      <h3 className="t-h3">{tpl('addons', l)}</h3>
      <ul className="grid gap-3 sm:grid-cols-2">
        {addons.map((a) => (
          <li key={a.name} className="card p-5">
            <p className="t-ui font-650">{a.name}</p>
            {a.text ? <p className="t-small mt-1">{a.text}</p> : null}
            {a.price ? <p className="t-small mt-2 font-650">{a.price}</p> : null}
            {a.href ? <Link href={a.href} className="link t-small mt-2 inline-flex min-h-tap items-center">{a.linkText}</Link> : null}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Social / Creative: every module and its price line as SSR text, then the builder (output = a wa.me link).
 *  `compact` (rich page, whose tabs already list each module's deliverables): no collapsed item list per card. */
export function ModulesPricing({ k, locale: l, pricing: p, compact }: { k: SvcKey; locale: Locale; pricing: Extract<Pricing, { kind: 'modules' }>; compact?: boolean }) {
  const s = svcOf(k)
  return (
    <>
      <p className="t-lead max-w-[65ch]"><Price svc={k} locale={l} /></p>
      <div className="grid gap-4 md:grid-cols-3">
        {p.modules.map((m) => (
          <article key={m.id} data-ground="putih" className="card-raised flex flex-col p-6 lg:p-8">
            <h3 className="t-h3">{m.title}</h3>
            <p className="t-small mt-3">{m.text}</p>
            {m.items.length && !compact ? (
              <More locale={l} className="mt-4">
                <ul className="t-small grid gap-2">{m.items.map((x) => <li key={x}>{x}</li>)}</ul>
              </More>
            ) : null}
            <p className="t-small mt-auto pt-6 font-650">{m.price}</p>
          </article>
        ))}
      </div>
      {p.note ? <p className="t-small max-w-[65ch] text-ink-2">{p.note}</p> : null}
      {p.addons?.length ? <AddonList locale={l} addons={p.addons} /> : null}
      <QuoteBuilder kind={p.builder} locale={l} copy={p.copy} fallback={s.wa[l]} waBase={`https://wa.me/${WA_NUMBER}?text=`}
        service={p.builder} label="Chat WhatsApp" icon={<Icon name="whatsapp" size={18} />} />
    </>
  )
}

/** Website: the three project types, one starting price (registry), the Discovery call and the quote CTA. */
export function ProjectsPricing({ k, locale: l, pricing: p }: { k: SvcKey; locale: Locale; pricing: Extract<Pricing, { kind: 'projects' }> }) {
  return (
    <>
      <div className="grid max-w-[65ch] gap-3">
        <p className="t-h2 tabular-nums"><Price svc={k} locale={l} /></p>
        <p className="t-body">{p.note}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {p.projects.map((x) => (
          <article key={x.id} data-ground="putih" className="card-raised flex flex-col p-6 lg:p-8">
            <h3 className="t-h3">{x.name}</h3>
            <p className="t-small mb-5 mt-3">{x.text}</p>
            <dl className="t-small mt-auto grid gap-3 border-t border-hair pt-4">
              <div><dt className="text-ink-2">{LABEL.bestFor[l]}</dt><dd className="font-650">{x.bestFor}</dd></div>
              <div><dt className="text-ink-2">{LABEL.timeline[l]}</dt><dd className="font-650 tabular-nums">{x.timeline}</dd></div>
            </dl>
          </article>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <WaButton text={p.discovery.wa} placement="tier" service={k} label={p.discovery.label} />
        <Button href={quoteHref(l, k)} cta="quote" placement="tier" service={k} variant="ghost">{T.quote[l]}</Button>
      </div>
      {p.addons?.length ? <AddonList locale={l} addons={p.addons} /> : null}
    </>
  )
}
