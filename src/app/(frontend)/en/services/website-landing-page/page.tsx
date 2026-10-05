import { ServicePage, serviceMeta } from '@/components/sections/service/ServicePage'

export const metadata = serviceMeta('website', 'en')
export const revalidate = 3600

export default function Page() {
  return <ServicePage k="website" locale="en" />
}
