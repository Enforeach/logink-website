import { staticMeta } from '@/lib/meta'
import { PortfolioPage } from '@/components/sections/portfolio/PortfolioPage'
import { loadCms } from '@/cms/load'

export const revalidate = 3600
export async function generateMetadata() {
  await loadCms()
  return staticMeta('portfolio', 'en')
}
export default async function Page() { await loadCms(); return <PortfolioPage locale="en" /> }
