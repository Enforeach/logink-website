import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Our Services',
  description: 'SEO, Social Media, Paid Advertising, Creative Services, and Website development — all integrated to maximize your digital marketing results.',
  path: '/en/services',
})

export { default } from '@/app/(public)/services/page'
