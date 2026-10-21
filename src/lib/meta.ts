// Metadata + JSON-LD node builders (BUILD §3.3; owner Core). The legacy src/lib/seo.ts stays for
// legacy pages until W4. Service/Offer, Article and BlogPosting nodes live in their packages' schema.ts.
// One <script type="application/ld+json"> per page: JsonLd({ graph }) serialises ldJson(graph).
import type { Metadata } from 'next'
import { ogUrl } from '@/lib/assets'
import { rawField } from '@/cms/store'
import {
  EMAIL, ENTITY, INSTAGRAM, SITE_URL, WA_NUMBER, liveServices, page, pageRef,
  type Locale, type PageKey,
} from '@/lib/services'

type Path = { id: string | null; en: string | null }

export const abs = (p: string) => (/^https?:\/\//.test(p) ? p : `${SITE_URL}${p}`)
const LANG = { id: 'id-ID', en: 'en-US' } as const
const OG_LOCALE = { id: 'id_ID', en: 'en_US' } as const

export function pageMeta(o: {
  locale: Locale; title: string; desc: string; path: Path; og: string
  robots?: 'noindex,follow'; ogImage?: string
}): Metadata {
  const url = o.path[o.locale] ?? undefined
  const image = o.ogImage ?? ogUrl(o.og)
  const both = o.path.id && o.path.en
  return {
    title: { absolute: o.title },
    description: o.desc,
    alternates: {
      canonical: url,
      ...(both && { languages: { id: o.path.id!, en: o.path.en!, 'x-default': o.path.id! } }),
    },
    ...(o.robots && { robots: { index: false, follow: true } }),
    openGraph: {
      siteName: 'Logink', type: 'website', url, title: o.title, description: o.desc,
      locale: OG_LOCALE[o.locale], images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: o.title, description: o.desc, images: [image] },
  }
}

/** The CMS SEO tab's share image and noindex switch (its title/description reach the registry through withSeo). */
export function cmsSeo(ref: { slug: string; key?: string }, l: Locale): { ogImage?: string; robots?: 'noindex,follow' } {
  const m = rawField(ref, 'meta', l)
  const url = (m?.image as { url?: string } | null | undefined)?.url
  return { ...(url && { ogImage: url }), ...(m?.noIndex === true && { robots: 'noindex,follow' as const }) }
}

export function staticMeta(k: PageKey, locale: Locale): Metadata {
  const p = page(k)
  return pageMeta({ locale, title: p.title[locale], desc: p.desc[locale], path: p.path, og: p.og[locale], ...cmsSeo(pageRef(k), locale) })
}

// ── JSON-LD nodes (plain objects) ──
export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const ldJson = (graph: object[]) =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')

// full: description, contact, address and knowsAbout (home, about, contact); otherwise a slim reference.
export function orgNode(locale: Locale, full = false) {
  const slim = { '@type': ['Organization', 'ProfessionalService'], '@id': ORG_ID, name: 'Logink', url: SITE_URL, logo: abs('/images/logo-512.png') }
  if (!full) return slim
  return {
    ...slim,
    description: ENTITY[locale],
    email: EMAIL,
    telephone: `+${WA_NUMBER}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Jakarta', addressRegion: 'DKI Jakarta', addressCountry: 'ID' },
    sameAs: [INSTAGRAM],
    knowsAbout: liveServices().map((s) => s.name[locale]),
  }
}

export const websiteNode = (locale: Locale) => ({
  '@type': 'WebSite', '@id': WEBSITE_ID, url: abs(locale === 'en' ? '/en' : '/'), name: 'Logink',
  inLanguage: LANG[locale], publisher: { '@id': ORG_ID },
})

export function webPageNode(o: { url: string; name: string; type?: string; locale: Locale; dateModified?: string; about?: string }) {
  const url = abs(o.url)
  return {
    '@type': o.type ?? 'WebPage', '@id': `${url}#webpage`, url, name: o.name, inLanguage: LANG[o.locale],
    isPartOf: { '@id': WEBSITE_ID },
    ...(o.dateModified && { dateModified: o.dateModified }),
    ...(o.about && { about: { '@id': o.about } }),
  }
}

export const breadcrumbNode = (url: string, items: { name: string; href: string }[]) => ({
  '@type': 'BreadcrumbList', '@id': `${abs(url)}#breadcrumb`,
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.href) })),
})

export const faqNode = (url: string, items: { q: string; a: string }[]) => ({
  '@type': 'FAQPage', '@id': `${abs(url)}#faq`,
  mainEntity: items.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
})

// Home + hub: the services as references to each service page's `{url}#service` node (no Offers here).
export const itemListNode = (url: string, urls: string[]) => ({
  '@type': 'ItemList', '@id': `${abs(url)}#services`,
  itemListElement: urls.map((u, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@id': `${abs(u)}#service` } })),
})
