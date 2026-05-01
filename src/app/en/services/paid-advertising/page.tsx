import { Metadata } from 'next'
import { buildMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo'
import { CTASection } from '@/components/public/home/CTASection'
import { AdsHero } from '@/components/public/services/ads/AdsHero'
import { AdsPlatformOverview } from '@/components/public/services/ads/AdsPlatformOverview'
import { AdsStats } from '@/components/public/services/ads/AdsStats'
import { AdsProcess } from '@/components/public/services/ads/AdsProcess'
import { AdsPricing } from '@/components/public/services/ads/AdsPricing'
import { AdsFAQ } from '@/components/public/services/ads/AdsFAQ'
import { AdsCrossSell } from '@/components/public/services/ads/AdsCrossSell'
import { ADS_FAQS_EN } from '@/components/public/services/ads/data'

export const metadata: Metadata = buildMetadata({
  title: 'Paid Advertising',
  description:
    'Data-driven ads on Google, Meta, TikTok, and Indonesian marketplaces. ROAS 2–4×. Transparent reporting, full account access. Starting from Rp 6M/month.',
  path: '/en/services/paid-advertising',
})

const breadcrumbs = [
  { name: 'Home', url: 'https://logink.co/en' },
  { name: 'Services', url: 'https://logink.co/en/services' },
  { name: 'Paid Advertising', url: 'https://logink.co/en/services/paid-advertising' },
]

export default function PaidAdvertisingEnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema(breadcrumbs),
            faqSchema([...ADS_FAQS_EN]),
          ]),
        }}
      />

      <AdsHero locale="en" />
      <AdsPlatformOverview locale="en" />
      <AdsStats locale="en" />
      <AdsProcess locale="en" />
      <AdsPricing locale="en" />
      <AdsFAQ locale="en" />
      <AdsCrossSell locale="en" />
      <CTASection locale="en" />
    </>
  )
}
