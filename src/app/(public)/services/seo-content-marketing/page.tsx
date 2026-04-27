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
import { SEO_FAQS } from '@/components/public/services/seo/data'

export const metadata: Metadata = buildMetadata({
  title: 'SEO & Content Marketing | Logink - Digital Marketing Agency',
  description:
    'Pertumbuhan organic search untuk brand Indonesia. Riset keyword, artikel SEO dalam Bahasa Indonesia, optimasi teknikal, dan laporan transparan. Mulai dari Rp 6 Juta/bulan.',
  path: '/services/seo-content-marketing',
})

const breadcrumbs = [
  { name: 'Beranda', url: 'https://logink.id' },
  { name: 'Layanan', url: 'https://logink.id/services' },
  { name: 'SEO & Content Marketing', url: 'https://logink.id/services/seo-content-marketing' },
]

export default function SEOServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema(breadcrumbs),
            faqSchema([...SEO_FAQS]),
          ]),
        }}
      />

      <SEOHero />
      <SEOStats />
      <SEOFeatures />
      <SEOPricing />
      <SEOProcess />
      <SEOFAQ />
      <SEOCrossSell />
      <CTASection />
    </>
  )
}
