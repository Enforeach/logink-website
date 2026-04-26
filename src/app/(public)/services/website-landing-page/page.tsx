import { Metadata } from 'next'
import { buildMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo'
import { CTASection } from '@/components/public/home/CTASection'
import { WebsiteHero } from '@/components/public/services/website/WebsiteHero'
import { WebsiteProjectTypes } from '@/components/public/services/website/WebsiteProjectTypes'
import { WebsiteTechFeatures } from '@/components/public/services/website/WebsiteTechFeatures'
import { WebsiteStats } from '@/components/public/services/website/WebsiteStats'
import { WebsiteProcess } from '@/components/public/services/website/WebsiteProcess'
import { WebsitePricing } from '@/components/public/services/website/WebsitePricing'
import { WebsiteTechStack } from '@/components/public/services/website/WebsiteTechStack'
import { WebsiteFAQ } from '@/components/public/services/website/WebsiteFAQ'
import { WebsiteCrossSell } from '@/components/public/services/website/WebsiteCrossSell'
import { WEBSITE_FAQS } from '@/components/public/services/website/data'

export const metadata: Metadata = buildMetadata({
  title: 'Website & Landing Page | Logink - Digital Marketing Agency',
  description:
    'High-performance websites and landing pages for Indonesian brands. CRO-focused design, mobile-first, under 2s load time. Starting from Rp 10 Juta.',
  path: '/services/website-landing-page',
})

const breadcrumbs = [
  { name: 'Home', url: 'https://logink.id' },
  { name: 'Services', url: 'https://logink.id/services' },
  { name: 'Website & Landing Page', url: 'https://logink.id/services/website-landing-page' },
]

export default function WebsiteLandingPagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema(breadcrumbs),
            faqSchema([...WEBSITE_FAQS]),
          ]),
        }}
      />

      <WebsiteHero />
      <WebsiteProjectTypes />
      <WebsiteTechFeatures />
      <WebsiteStats />
      <WebsiteProcess />
      <WebsitePricing />
      <WebsiteTechStack />
      <WebsiteFAQ />
      <WebsiteCrossSell />
      <CTASection />
    </>
  )
}
