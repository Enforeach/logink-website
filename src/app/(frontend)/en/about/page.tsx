import { staticMeta } from '@/lib/meta'
import { AboutPage } from '@/components/sections/about/AboutPage'

export const revalidate = 3600
export const metadata = staticMeta('about', 'en')
export default function Page() { return <AboutPage locale="en" /> }
