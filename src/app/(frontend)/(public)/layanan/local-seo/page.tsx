import { ServicePage, serviceMeta } from '@/components/sections/service/ServicePage'

export const metadata = serviceMeta('localseo', 'id')
export const revalidate = 3600

export default function Page() {
  return <ServicePage k="localseo" locale="id" />
}
