import { SITE } from './constants'

export function buildMetadata({
  title,
  description,
  path = '',
  ogImage,
  type = 'website',
  noSuffix = false,
}: {
  title: string
  description: string
  path?: string
  ogImage?: string
  type?: 'website' | 'article'
  noSuffix?: boolean
}) {
  const fullTitle = noSuffix ? title : `${title} | Logink`
  const url = `${SITE.url}${path}`
  const image = ogImage || `${SITE.url}/images/og-default.jpg`

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Logink',
      images: [{ url: image, width: 1200, height: 630 }],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  }
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Logink',
    description: SITE.description,
    url: SITE.url,
    logo: `${SITE.url}/images/logo-light.svg`,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jakarta',
      addressCountry: 'ID',
    },
    sameAs: [SITE.instagram],
  }
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Logink',
    description: SITE.description,
    url: SITE.url,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jakarta',
      addressCountry: 'ID',
    },
    priceRange: 'Rp 6 Juta - Rp 50 Juta+',
    image: `${SITE.url}/images/og-default.jpg`,
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
