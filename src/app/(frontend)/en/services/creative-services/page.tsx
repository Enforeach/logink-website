import { ServicePage, serviceMeta } from '@/components/sections/service/ServicePage'

export const metadata = serviceMeta('creative', 'en')
export const revalidate = 3600

export default function Page() {
  return <ServicePage k="creative" locale="en" />
}
