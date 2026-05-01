import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { SERVICES, ServiceDetailContent, generateStaticParams } from '@/app/(public)/layanan/[slug]/page'

export { generateStaticParams }

interface Props { params: Promise<{ slug: string }> }

type SvcKey = keyof typeof SERVICES

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const svc = SERVICES[slug as SvcKey]
  if (!svc) return {}
  return buildMetadata({
    title: `${svc.name} | Logink Digital Marketing Jakarta`,
    description: svc.description.slice(0, 155),
    path: `/en/services/${slug}`,
  })
}

export default async function ServiceDetailEnPage({ params }: Props) {
  const { slug } = await params
  return <ServiceDetailContent slug={slug} locale="en" />
}
