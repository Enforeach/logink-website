import { Metadata } from 'next'
import { buildMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo'
import { CTASection } from '@/components/public/home/CTASection'
import { LocalSeoHero } from '@/components/public/services/localseo/LocalSeoHero'
import { LocalSeoStats } from '@/components/public/services/localseo/LocalSeoStats'
import { LocalSeoMap } from '@/components/public/services/localseo/LocalSeoMap'
import { LocalSeoFeatures } from '@/components/public/services/localseo/LocalSeoFeatures'
import { LocalSeoPricing } from '@/components/public/services/localseo/LocalSeoPricing'
import { LocalSeoProcess } from '@/components/public/services/localseo/LocalSeoProcess'
import { LocalSeoFAQ } from '@/components/public/services/localseo/LocalSeoFAQ'
import { LocalSeoCrossSell } from '@/components/public/services/localseo/LocalSeoCrossSell'
import { LOCALSEO_FAQS_EN } from '@/components/public/services/localseo/data'

export const metadata: Metadata = buildMetadata({
  title: 'Local SEO & Google Maps Optimization Jakarta',
  description:
    'Win "near me" searches and Google Maps. Google Business Profile setup, a local landing page, and map pack optimization within a radius of up to 20 km. From IDR 1 Mio/month, billed annually.',
  path: '/en/services/local-seo',
})

const breadcrumbs = [
  { name: 'Home', url: 'https://logink.co/en' },
  { name: 'Services', url: 'https://logink.co/en/services' },
  { name: 'Local SEO & Google Maps', url: 'https://logink.co/en/services/local-seo' },
]

export default function LocalSeoServiceEnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema(breadcrumbs),
            faqSchema([...LOCALSEO_FAQS_EN]),
          ]),
        }}
      />

      <LocalSeoHero locale="en" />
      <LocalSeoStats locale="en" />
      <LocalSeoMap locale="en" />
      <LocalSeoFeatures locale="en" />
      <LocalSeoPricing locale="en" />
      <LocalSeoProcess locale="en" />
      <LocalSeoFAQ locale="en" />
      <LocalSeoCrossSell locale="en" />
      <CTASection locale="en" />
    </>
  )
}
