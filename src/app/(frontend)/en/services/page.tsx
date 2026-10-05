import { staticMeta } from '@/lib/meta'
import { HubPage } from '@/components/sections/hub/HubPage'

export const metadata = staticMeta('hub', 'en')
export default function Page() { return <HubPage locale="en" /> }
