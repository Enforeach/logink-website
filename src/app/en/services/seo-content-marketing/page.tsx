import { Metadata } from 'next'
import { buildMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo'
import { CTASection } from '@/components/public/home/CTASection'
import { SEOHero } from '@/components/public/services/seo/SEOHero'
import { SEOStats } from '@/components/public/services/seo/SEOStats'
import { SEOFeatures } from '@/components/public/services/seo/SEOFeatures'
import { SEOPricing } from '@/components/public/services/seo/SEOPricing'
import { SEOProcess } from '@/components/public/services/seo/SEOProcess'
import { SEOFAQ } from '@/components/public/services/seo/SEOFAQ'
import { SEOCrossSell } from '@/components/public/services/seo/SEOCrossSell'
import { SEO_FAQS_EN } from '@/components/public/services/seo/data'

export const metadata: Metadata = buildMetadata({
  title: 'SEO & Content Marketing | Logink - Digital Marketing Agency',
  description:
    'Organic search growth for Indonesian brands. Keyword research, SEO articles in Bahasa Indonesia, technical optimization, and transparent reporting. Starting from Rp 6M/month.',
  path: '/en/services/seo-content-marketing',
})

const breadcrumbs = [
  { name: 'Home', url: 'https://logink.id/en' },
  { name: 'Services', url: 'https://logink.id/en/services' },
  { name: 'SEO & Content Marketing', url: 'https://logink.id/en/services/seo-content-marketing' },
]

export default function SEOServiceEnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema(breadcrumbs),
            faqSchema([...SEO_FAQS_EN]),
          ]),
        }}
      />

      <SEOHero locale="en" />
      <SEOStats locale="en" />
      <SEOFeatures locale="en" />
      <SEOPricing locale="en" />
      <SEOProcess locale="en" />
      <SEOFAQ locale="en" />
      <SEOCrossSell locale="en" />
      <CTASection locale="en" />
    </>
  )
}
