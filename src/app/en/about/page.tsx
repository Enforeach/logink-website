import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'About Us',
  description: 'Logink is a 360° digital marketing agency in Jakarta combining strategy, creativity, and data into one integrated system.',
  path: '/en/about',
})

export { default } from '@/app/(public)/about/page'
