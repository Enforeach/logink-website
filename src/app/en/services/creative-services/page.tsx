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
import { CREATIVE_FAQS_EN } from '@/components/public/services/creative/data'

export const metadata: Metadata = buildMetadata({
  title: 'Creative Services | Logink - Digital Marketing Agency',
  description:
    'Custom graphic design, video production, and copywriting for Indonesian brands. Brand identity, social media content, ad creative, and more. 100% original, no templates.',
  path: '/en/services/creative-services',
})

const breadcrumbs = [
  { name: 'Home', url: 'https://logink.id/en' },
  { name: 'Services', url: 'https://logink.id/en/services' },
  { name: 'Creative Services', url: 'https://logink.id/en/services/creative-services' },
]

export default function CreativeServicesEnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema(breadcrumbs),
            faqSchema([...CREATIVE_FAQS_EN]),
          ]),
        }}
      />

      <CreativeHero locale="en" />
      <CreativeShowcase locale="en" />
      <CreativeCatalog locale="en" />
      <CreativePricing locale="en" />
      <CreativeStats locale="en" />
      <CreativeProcess locale="en" />
      <CreativeFAQ locale="en" />
      <CreativeCrossSell locale="en" />
      <CTASection locale="en" />
    </>
  )
}
