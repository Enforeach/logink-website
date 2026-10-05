import { staticMeta } from '@/lib/meta'
import { PortfolioPage } from '@/components/sections/portfolio/PortfolioPage'

export const revalidate = 3600
export const metadata = staticMeta('portfolio', 'en')
export default function Page() { return <PortfolioPage locale="en" /> }
