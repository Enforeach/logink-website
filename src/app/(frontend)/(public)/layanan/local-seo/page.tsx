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
import { LOCALSEO_FAQS } from '@/components/public/services/localseo/data'

export const metadata: Metadata = buildMetadata({
  title: 'Local SEO & Google Maps',
  description:
    'Menang di pencarian "near me" dan Google Maps. Setup Google Business Profile, landing page lokal, dan optimasi map pack dalam radius hingga 20 km. Mulai Rp 1 Juta/bulan, ditagih tahunan.',
  path: '/layanan/local-seo',
})

const breadcrumbs = [
  { name: 'Beranda', url: 'https://logink.co' },
  { name: 'Layanan', url: 'https://logink.co/layanan' },
  { name: 'Local SEO & Google Maps', url: 'https://logink.co/layanan/local-seo' },
]

export default function LocalSeoServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema(breadcrumbs),
            faqSchema([...LOCALSEO_FAQS]),
          ]),
        }}
      />

      <LocalSeoHero />
      <LocalSeoStats />
      <LocalSeoMap />
      <LocalSeoFeatures />
      <LocalSeoPricing />
      <LocalSeoProcess />
      <LocalSeoFAQ />
      <LocalSeoCrossSell />
      <CTASection />
    </>
  )
}
