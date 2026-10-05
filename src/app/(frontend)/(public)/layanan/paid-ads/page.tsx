import { ServicePage, serviceMeta } from '@/components/sections/service/ServicePage'

export const metadata = serviceMeta('ads', 'id')
export const revalidate = 3600

export default function Page() {
  return <ServicePage k="ads" locale="id" />
}
