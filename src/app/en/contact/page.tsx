import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us',
  description: 'Get in touch with Logink. Start your free consultation today.',
  path: '/en/contact',
})

export { default } from '@/app/(public)/contact/page'
