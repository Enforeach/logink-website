// Services hub /layanan + /en/services (BUILD §3.9 hub, amended by §11 7.2) · 0600 Kertas.
// Order: hero → ServicesTable #harga → Kampanye 360° #kampanye-360 → FAQ (owner 2026-10-04: each message once).
// JSON-LD: CollectionPage + ItemList (7 services + #kampanye-360) + the 360° Service node + breadcrumb + FAQ. No Offer.
import { ORG_ID, abs, breadcrumbNode, faqNode, itemListNode, orgNode, webPageNode } from '@/lib/meta'
import { liveServices, page, type Locale } from '@/lib/services'
import { PageShell } from '@/components/ds/chrome/PageShell'
import { ClosingBand } from '@/components/ds/chrome/ClosingBand'
import { quoteHref } from '@/components/ds/chrome/links'
import { Section } from '@/components/ds/Section'
import { Dateline } from '@/components/ds/Dateline'
import { H1Svc } from '@/components/ds/H1Svc'
import { Breadcrumbs } from '@/components/ds/Breadcrumbs'
import { WaButton } from '@/components/ds/WaButton'
import { Button } from '@/components/ds/Button'
import { ServicesTable } from '@/components/ds/ServicesTable'
import { FaqSection } from '@/components/ds/FaqSection'
import { JsonLd } from '@/components/ds/JsonLd'
import { T } from '@/components/ds/strings'
import { HUB, HUB_FAQ, HUB_FAQ_H, OFFER } from '@/content/hub'
import { Campaign360Offer } from './Campaign360Offer'

export function HubPage({ locale: l }: { locale: Locale }) {
  const p = page('hub')
  const url = p.path[l]
  const faq = HUB_FAQ.map((f) => ({ q: f.q[l], a: f.a[l] }))
  const crumbs = [{ name: T.home[l], href: page('home').path[l] }, { name: HUB.crumb[l], href: url }]
  const list = itemListNode(url, liveServices().map((s) => s.path[l]))
  const c360 = `${abs(url)}#kampanye-360`
  list.itemListElement.push({ '@type': 'ListItem', position: list.itemListElement.length + 1, item: { '@id': c360 } })
  const graph = [
    orgNode(l),
    webPageNode({ url, name: p.h1[l], type: 'CollectionPage', locale: l, dateModified: p.updated }),
    list,
    {
      '@type': 'Service', '@id': c360, url: c360, name: T.c360[l], description: OFFER.lead1[l],
      provider: { '@id': ORG_ID },
      areaServed: [{ '@type': 'City', name: 'Jakarta' }, { '@type': 'Country', name: 'Indonesia' }],
    },
    breadcrumbNode(url, crumbs),
    faqNode(url, faq),
  ]

  return (
    <PageShell locale={l} alt={p.path} wa={p.wa[l]} sky="light" closing="inline">
      <JsonLd graph={graph} />
      <Section hour="0600" ground="kertas" labelledBy="hub-h">
        <div className="wrap grid-12 gap-y-6">
          <div className="col-span-12"><Breadcrumbs locale={l} items={crumbs} /></div>
          <Dateline locale={l} hour="0600" word={HUB.word[l]} className="col-span-12" />
          <div className="col-span-12 lg:col-span-8"><H1Svc text={p.h1[l]} id="hub-h" /></div>
          <div className="col-span-12 grid gap-6 lg:col-span-7">
            <p className="t-lead max-w-lead">{HUB.lede[l]}</p>
            <div className="flex flex-wrap gap-3">
              <WaButton text={p.wa[l]} placement="hero" />
              <Button href={quoteHref(l)} cta="quote" placement="hero">{T.quote[l]}</Button>
            </div>
          </div>
        </div>
      </Section>
      <Section hour="0600" ground="kertas" labelledBy="harga-h" pad="sm">
        <div className="wrap grid gap-6">
          <h2 id="harga-h" className="t-h2">{HUB.tableH[l]}</h2>
          <ServicesTable locale={l} id="harga" />
          <p className="t-small max-w-measure text-ink-2">{HUB.tableNote[l]}</p>
        </div>
      </Section>
      <Campaign360Offer locale={l} />
      <ClosingBand locale={l} text={p.wa[l]} link360 inline />
      <FaqSection locale={l} heading={HUB_FAQ_H[l]} items={faq} ground="kertas" />
    </PageShell>
  )
}
