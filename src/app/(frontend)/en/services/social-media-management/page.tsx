import { ServicePage, serviceMeta } from '@/components/sections/service/ServicePage'
import { loadCms } from '@/cms/load'

export async function generateMetadata() {
  await loadCms()
  return serviceMeta('social', 'en')
}
export const revalidate = 3600

export default async function Page() {
  await loadCms()
  return <ServicePage k="social" locale="en" />
}
