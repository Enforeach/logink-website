import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Portfolio',
  description: 'Explore real results Logink has achieved for Indonesian brands: organic traffic growth, high ROAS campaigns, and measurable brand awareness improvements.',
  path: '/en/portfolio',
})

export { default } from '@/app/(public)/portfolio/page'
