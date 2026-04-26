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
import { ADS_FAQS } from '@/components/public/services/ads/data'

export const metadata: Metadata = buildMetadata({
  title: 'Paid Advertising | Logink - Digital Marketing Agency',
  description:
    'Data-driven paid campaigns across Google, Meta, TikTok, and Indonesian marketplaces. 2-4× ROAS. Transparent reporting, full account access. Starting from Rp 6 Juta/month.',
  path: '/services/paid-advertising',
})

const breadcrumbs = [
  { name: 'Home', url: 'https://logink.id' },
  { name: 'Services', url: 'https://logink.id/services' },
  { name: 'Paid Advertising', url: 'https://logink.id/services/paid-advertising' },
]

export default function PaidAdvertisingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema(breadcrumbs),
            faqSchema([...ADS_FAQS]),
          ]),
        }}
      />

      <AdsHero />
      <AdsPlatformOverview />
      <AdsStats />
      <AdsProcess />
      <AdsPricing />
      <AdsFAQ />
      <AdsCrossSell />
      <CTASection />
    </>
  )
}
