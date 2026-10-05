// The service template composer (BUILD §3.8 + §11 6, reshaped by the owner 2026-10-03: six sections, each
// message once, 400–600 visible words). A route file is two lines:
//   export const metadata = serviceMeta('seo', 'id')
//   export default function Page() { return <ServicePage k="seo" locale="id" /> }
// Content comes from src/content/services/<k>.ts (default export { id, en }); register it in CONTENT below.
// Order: 1 hero (H1, answer, CTAs, still) → 2 visual (instruments) → 3 what's included → 4 price → the one
// ClosingBand (inline, owner 2026-10-04: CTA before the FAQ) → 5 FAQ → 6 "run it alone or in a 360° campaign".
// Rich page (content with `included`, SEO first): hero (film + trust) → stats band → USP → tabs → price → process → CTA → FAQ → 6.
import type { Metadata } from 'next'
import { AI_BASELINE, AI_BASELINE_LIVE, page, svc as svcOf, type Locale, type SvcKey } from '@/lib/services'
import { pageMeta } from '@/lib/meta'
import type { Ground } from '@/styles/tailwind.tokens'
import type { ServiceContent } from '@/content/services/types'
import { tpl } from '@/content/services/template'
import seo from '@/content/services/seo'
import localseo from '@/content/services/localseo'
import social from '@/content/services/social'
import creative from '@/content/services/creative'
import website from '@/content/services/website'
import ads from '@/content/services/ads'
import ai from '@/content/services/ai'
import { PageShell } from '@/components/ds/chrome/PageShell'
import { ClosingBand } from '@/components/ds/chrome/ClosingBand'
import { JsonLd } from '@/components/ds/JsonLd'
import { FaqSection } from '@/components/ds/FaqSection'
import { DataTable } from '@/components/ds/DataTable'
import { T } from '@/components/ds/strings'
import { ServiceHero } from './ServiceHero'
import { Showcase } from './Showcase'
import { WhatWeDo } from './WhatWeDo'
import { PricingSection } from './PricingSection'
import { LoopPosition } from './LoopPosition'
import { serviceGraph } from './schema'
import { AiBehind } from './AiBehind'
import { Behind, Highlights, Included, Usp } from './RichSections'
import { Process } from '@/components/sections/home/Process'
import { More } from './More'

/** Add each service's content file here as its page moves onto the template. */
const CONTENT: Partial<Record<SvcKey, Record<Locale, ServiceContent>>> = { seo, localseo, social, creative, website, ads, ai }

export const serviceMeta = (k: SvcKey, l: Locale): Metadata => {
  const s = svcOf(k)
  return pageMeta({ locale: l, title: s.title[l], desc: s.desc[l], path: s.path, og: s.og[l] })
}

export function ServicePage({ k, locale: l, noMedia }: { k: SvcKey; locale: Locale; noMedia?: boolean }) {
  const s = svcOf(k)
  const c = CONTENT[k]?.[l]
  if (!c) throw new Error(`No content for service "${k}": add src/content/services/${k}.ts to CONTENT`)
  const dark = s.light === 'senja' || s.light === 'malam'
  // Body returns to paper after the hero and alternates Putih/Kertas (starting opposite a paper hero).
  let i = s.light === 'kertas' ? 0 : 1
  const next = (): Ground => (i++ % 2 === 0 ? 'putih' : 'kertas')
  const crumbs = [
    { name: T.home[l], href: page('home').path[l] },
    { name: T.services[l], href: page('hub').path[l] },
    { name: s.name[l], href: s.path[l] },
  ]
  // The comparison sits with the prices on Website (project types), and in "what's included" elsewhere.
  const cmpInPrice = k === 'website'
  const x = c.aiPage // the SEO AI page's extras
  return (
    <PageShell locale={l} alt={s.path} wa={s.wa[l]} sky={dark ? 'dark' : 'light'} svc={k} closing="inline">
      <JsonLd graph={serviceGraph(k, l, c, crumbs)} />
      <ServiceHero k={k} locale={l} answer={c.answer} note={x?.note} trust={c.trust} crumbs={crumbs} noMedia={noMedia} />
      {/* rich page (SEO first): the stats band sits on the hero's ground, the tabs replace sections 2-3 */}
      {c.highlights ? <Highlights k={k} h={c.highlights} ground={s.light} /> : null}
      {c.usp ? <Usp k={k} locale={l} u={c.usp} ground={next()} /> : null}
      {c.included ? (
        <>
          <Included k={k} inc={c.included} ground={next()} />
          {x ? (
            <Behind k={k} heading={x.behind.heading} lead={x.behind.lead} ground={next()}>
              <AiBehind locale={l} />
            </Behind>
          ) : null}
        </>
      ) : (
        <>
          {x ? (
            <Showcase k={k} locale={l} c={c} ground={next()} heading={x.behind.heading}
              lead={AI_BASELINE_LIVE ? `${x.behind.lead} ${AI_BASELINE[l]}` : x.behind.lead}>
              <AiBehind locale={l} />
            </Showcase>
          ) : (
            <Showcase k={k} locale={l} c={c} lead={c.showcase} ground={next()} />
          )}
          <WhatWeDo k={k} locale={l} work={c.work} compare={cmpInPrice ? null : c.compare} open={!!x} ground={next()}
            after={x ? (
              <More locale={l} label={x.engines.caption}>
                <DataTable caption={x.engines.caption} head={x.engines.head} rows={x.engines.rows} rowHeaders stack />
              </More>
            ) : null} />
        </>
      )}
      <PricingSection k={k} locale={l} pricing={c.pricing} compare={cmpInPrice ? c.compare : null} ground={next()} compact={!!c.included} />
      {c.process ? <Process locale={l} ground={next()} /> : null}
      <ClosingBand locale={l} text={s.wa[l]} svc={k} inline />
      <FaqSection locale={l} heading={tpl('faq', l, { name: s.name[l] })} items={c.faq} ground={next()} />
      <LoopPosition k={k} locale={l} campaign={c.campaign} ai={c.ai} ground={next()} />
    </PageShell>
  )
}
