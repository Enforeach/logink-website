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
  title: 'Paid Advertising',
  description:
    'Iklan berbasis data di Google, Meta, TikTok, dan marketplace Indonesia. ROAS 2-4×. Laporan transparan, akses akun penuh. Mulai dari Rp 6 Juta/bulan.',
  path: '/layanan/paid-ads',
})

const breadcrumbs = [
  { name: 'Beranda', url: 'https://logink.co' },
  { name: 'Layanan', url: 'https://logink.co/layanan' },
  { name: 'Paid Advertising', url: 'https://logink.co/layanan/paid-ads' },
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
