import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Portfolio',
  description: 'See how Logink has helped Indonesian brands grow through digital marketing.',
  path: '/en/portfolio',
})

export { default } from '@/app/(public)/portfolio/page'
