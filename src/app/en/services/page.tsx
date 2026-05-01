import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { ServicesPageContent } from '@/components/public/ServicesPageContent'

export const metadata: Metadata = buildMetadata({
  title: 'Our Services',
  description: 'SEO, Social Media Management, Paid Advertising, Creative Services, and Website development, all integrated and optimized to maximize your digital marketing ROI.',
  path: '/en/services',
})

export const revalidate = 3600

export default function ServicesEnPage() {
  return <ServicesPageContent locale="en" />
}
