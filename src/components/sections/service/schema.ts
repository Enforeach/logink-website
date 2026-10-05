// Service JSON-LD (BUILD §3.8, §11 8). Every 20+ character string mirrors visible text: name = registry name
// (breadcrumb + pricing H2), description = the visible "Jawaban singkat", offers = the visible tiers only.
import { svc as svcOf, type Locale, type SvcKey } from '@/lib/services'
import { ORG_ID, abs, breadcrumbNode, faqNode, orgNode, webPageNode } from '@/lib/meta'
import type { ServiceContent } from '@/content/services/types'
import { hub360 } from '@/components/ds/chrome/links'

/** Offer per visible tier, only on priced services (seo, localseo, ads, website); none for quote-only pages. */
export function offerNodes(k: SvcKey, c: ServiceContent, url: string, l: Locale) {
  if (!svcOf(k).price) return undefined
  // Website: one visible starting price for every project ('Mulai Rp 10 Juta, harga final lewat diskusi') → one Offer, minPrice.
  if (c.pricing.kind === 'projects') {
    const p = c.pricing.priceValue
    return [{ '@type': 'Offer', name: svcOf(k).name[l], priceCurrency: 'IDR', url,
      priceSpecification: { '@type': 'PriceSpecification', minPrice: p, priceCurrency: 'IDR' } }]
  }
  if (c.pricing.kind !== 'tiers') return undefined
  return c.pricing.tiers.map((t) => ({
    '@type': 'Offer',
    name: t.name,
    price: t.priceValue,
    priceCurrency: 'IDR',
    url,
    priceSpecification: {
      '@type': 'UnitPriceSpecification', price: t.priceValue, priceCurrency: 'IDR',
      ...(t.period && { unitCode: 'MON' }),
    },
  }))
}

export function serviceNode(k: SvcKey, l: Locale, c: ServiceContent) {
  const s = svcOf(k)
  const url = abs(s.path[l])
  const offers = offerNodes(k, c, `${url}#harga`, l)
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    url,
    name: s.name[l],
    description: c.answer,
    provider: { '@id': ORG_ID },
    areaServed: [{ '@type': 'City', name: 'Jakarta' }, { '@type': 'Country', name: 'Indonesia' }],
    isRelatedTo: { '@id': abs(hub360(l)) },
    ...(offers && { offers }),
  }
}

/** The page's one @graph: org ref, WebPage, Service (+ Offers), BreadcrumbList, FAQPage. */
export function serviceGraph(k: SvcKey, l: Locale, c: ServiceContent, crumbs: { name: string; href: string }[]) {
  const s = svcOf(k)
  const url = s.path[l]
  return [
    orgNode(l),
    webPageNode({ url, name: s.h1[l], locale: l, dateModified: s.updated, about: `${abs(url)}#service` }),
    serviceNode(k, l, c),
    breadcrumbNode(url, crumbs),
    faqNode(url, c.faq),
  ]
}
