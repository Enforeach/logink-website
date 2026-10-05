import { ServicePage, serviceMeta } from '@/components/sections/service/ServicePage'

export const metadata = serviceMeta('social', 'en')
export const revalidate = 3600

export default function Page() {
  return <ServicePage k="social" locale="en" />
}
