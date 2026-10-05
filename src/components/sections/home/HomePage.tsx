// Home / and /en (BUILD §3.7/§11, reshaped by the owner 2026-10-04: six sections, each message once):
// hero → services → Kampanye 360° (motion film + CampaignMap) → proses → proof → closing CTA → FAQ (owner 2026-10-04).
// JSON-LD: Organization (full) + WebSite + WebPage + ItemList of the 7 service nodes + FAQPage. No Offer.
import { ORG_ID, faqNode, itemListNode, orgNode, webPageNode, websiteNode } from '@/lib/meta'
import { liveServices, page, type Locale } from '@/lib/services'
import { PageShell } from '@/components/ds/chrome/PageShell'
import { ClosingBand } from '@/components/ds/chrome/ClosingBand'
import { JsonLd } from '@/components/ds/JsonLd'
import { FAQ, FAQ_H } from '@/content/home'
import { Hero } from './Hero'
import { Services } from './Services'
import { Campaign360 } from './Campaign360'
import { Process } from './Process'
import { Proof } from './Proof'
import { FaqSection } from '@/components/ds/FaqSection'

export function HomePage({ locale: l, noMedia }: { locale: Locale; noMedia?: boolean }) {
  const p = page('home')
  const url = p.path[l]
  const faq = FAQ.map((f) => ({ q: f.q[l], a: f.a[l] }))
  const graph = [
    orgNode(l, true),
    websiteNode(l),
    webPageNode({ url, name: p.h1[l], locale: l, dateModified: p.updated, about: ORG_ID }),
    itemListNode(url, liveServices().map((s) => s.path[l])),
    faqNode(url, faq),
  ]
  return (
    <PageShell locale={l} alt={p.path} wa={p.wa[l]} sky="light" closing="inline">
      <JsonLd graph={graph} />
      <Hero locale={l} noMedia={noMedia} />
      <Services locale={l} />
      <Campaign360 locale={l} noMedia={noMedia} />
      <Process locale={l} />
      <Proof locale={l} />
      <ClosingBand locale={l} text={p.wa[l]} link360 inline />
      <FaqSection locale={l} heading={FAQ_H[l]} ground="kertas" items={faq} />
    </PageShell>
  )
}
