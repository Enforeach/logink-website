import { ServicePage, serviceMeta } from '@/components/sections/service/ServicePage'

export const metadata = serviceMeta('ai', 'id')
export const revalidate = 3600

export default function Page() {
  return <ServicePage k="ai" locale="id" />
}
