import { Metadata } from 'next'
import { buildMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo'
import { CTASection } from '@/components/public/home/CTASection'
import { CreativeHero } from '@/components/public/services/creative/CreativeHero'
import { CreativeShowcase } from '@/components/public/services/creative/CreativeShowcase'
import { CreativeCatalog } from '@/components/public/services/creative/CreativeCatalog'
import { CreativePricing } from '@/components/public/services/creative/CreativePricing'
import { CreativeStats } from '@/components/public/services/creative/CreativeStats'
import { CreativeProcess } from '@/components/public/services/creative/CreativeProcess'
import { CreativeFAQ } from '@/components/public/services/creative/CreativeFAQ'
import { CreativeCrossSell } from '@/components/public/services/creative/CreativeCrossSell'
import { CREATIVE_FAQS } from '@/components/public/services/creative/data'

export const metadata: Metadata = buildMetadata({
  title: 'Creative Services | Logink - Digital Marketing Agency',
  description:
    'Desain grafis, produksi video, dan copywriting kustom untuk brand Indonesia. Brand identity, konten social media, ad creative, dan lainnya. 100% original, tanpa template.',
  path: '/services/creative-services',
})

const breadcrumbs = [
  { name: 'Beranda', url: 'https://logink.id' },
  { name: 'Layanan', url: 'https://logink.id/services' },
  { name: 'Creative Services', url: 'https://logink.id/services/creative-services' },
]

export default function CreativeServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema(breadcrumbs),
            faqSchema([...CREATIVE_FAQS]),
          ]),
        }}
      />

      <CreativeHero />
      <CreativeShowcase />
      <CreativeCatalog />
      <CreativePricing />
      <CreativeStats />
      <CreativeProcess />
      <CreativeFAQ />
      <CreativeCrossSell />
      <CTASection />
    </>
  )
}
