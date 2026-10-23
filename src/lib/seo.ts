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
    title: { absolute: fullTitle },
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
  const wa = SITE.whatsapp
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE.url}/#business`,
    name: 'Logink',
    alternateName: 'Logink Digital Marketing Agency',
    description: SITE.description,
    url: SITE.url,
    logo: `${SITE.url}/icon.svg`,
    image: `${SITE.url}/images/og-default.jpg`,
    email: SITE.email,
    telephone: `+${wa}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jakarta',
      addressRegion: 'DKI Jakarta',
      addressCountry: 'ID',
    },
    areaServed: [
      { '@type': 'Country', name: 'Indonesia' },
      { '@type': 'City', name: 'Jakarta' },
    ],
    priceRange: 'Rp 1 Juta - Rp 50 Juta+',
    sameAs: [SITE.instagram, `https://wa.me/${wa}`],
    serviceType: [
      'SEO & Content Marketing',
      'Social Media Management',
      'Paid Advertising',
      'Creative Services',
      'Website & Landing Page',
      'Local SEO & Google Maps',
    ],
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
