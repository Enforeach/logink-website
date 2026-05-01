import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { ServicesPageContent } from '@/components/public/ServicesPageContent'

export const metadata: Metadata = buildMetadata({
  title: 'Layanan Digital Marketing',
  description: 'Lima layanan digital marketing terintegrasi: SEO, Social Media, Paid Ads, Creative Services, dan Website & Landing Page. Mulai dari Rp 6 Juta/bulan.',
  path: '/layanan',
})

export const revalidate = 3600

export default function ServicesPage() {
  return <ServicesPageContent locale="id" />
}
