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
import { SOCIAL_FAQS_EN } from '@/components/public/services/social/data'

export const metadata: Metadata = buildMetadata({
  title: 'Social Media Management | Logink',
  description:
    'Social media strategy, content creation, and community management for Indonesian brands. Instagram, TikTok, Facebook & LinkedIn. 100% original content.',
  path: '/en/services/social-media-management',
})

const breadcrumbs = [
  { name: 'Home', url: 'https://logink.id/en' },
  { name: 'Services', url: 'https://logink.id/en/services' },
  { name: 'Social Media Management', url: 'https://logink.id/en/services/social-media-management' },
]

export default function SocialMediaEnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema(breadcrumbs),
            faqSchema([...SOCIAL_FAQS_EN]),
          ]),
        }}
      />

      <SocialHero locale="en" />
      <SocialPillars locale="en" />
      <SocialSubServices locale="en" />
      <SocialPricing locale="en" />
      <SocialStats locale="en" />
      <SocialProcess locale="en" />
      <SocialFAQ locale="en" />
      <SocialCrossSell locale="en" />
      <CTASection locale="en" />
    </>
  )
}
