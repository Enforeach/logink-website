import { staticMeta } from '@/lib/meta'
import { HomePage } from '@/components/sections/home/HomePage'

export const metadata = staticMeta('home', 'en')
export const revalidate = 3600 // ClientLogos reads Payload (BUILD §3.5)
export default function Page() { return <HomePage locale="en" /> }
