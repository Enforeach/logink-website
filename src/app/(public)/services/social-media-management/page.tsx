import { Metadata } from 'next'
import { buildMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo'
import { CTASection } from '@/components/public/home/CTASection'
import { SocialHero } from '@/components/public/services/social/SocialHero'
import { SocialPillars } from '@/components/public/services/social/SocialPillars'
import { SocialSubServices } from '@/components/public/services/social/SocialSubServices'
import { SocialPricing } from '@/components/public/services/social/SocialPricing'
import { SocialStats } from '@/components/public/services/social/SocialStats'
import { SocialProcess } from '@/components/public/services/social/SocialProcess'
import { SocialFAQ } from '@/components/public/services/social/SocialFAQ'
import { SocialCrossSell } from '@/components/public/services/social/SocialCrossSell'
import { SOCIAL_FAQS } from '@/components/public/services/social/data'

export const metadata: Metadata = buildMetadata({
  title: 'Social Media Management | Logink',
  description:
    'Strategi social media, pembuatan konten, dan community management untuk brand Indonesia. Instagram, TikTok, Facebook & LinkedIn. 100% konten original.',
  path: '/services/social-media-management',
})

const breadcrumbs = [
  { name: 'Beranda', url: 'https://logink.id' },
  { name: 'Layanan', url: 'https://logink.id/services' },
  { name: 'Social Media Management', url: 'https://logink.id/services/social-media-management' },
]

export default function SocialMediaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema(breadcrumbs),
            faqSchema([...SOCIAL_FAQS]),
          ]),
        }}
      />

      <SocialHero />
      <SocialPillars />
      <SocialSubServices />
      <SocialPricing />
      <SocialStats />
      <SocialProcess />
      <SocialFAQ />
      <SocialCrossSell />
      <CTASection />
    </>
  )
}
