import type { SvcKey } from '@/lib/services'
import { WaButton } from '../WaButton'

/** Desktop WhatsApp pill (≥1024px, fixed, never hides); the <a> leans toward a fine pointer (magnetic). */
export function WaPill({ text, service }: { text: string; service?: SvcKey }) {
  return (
    // ponytail: max-lg:!hidden because motion.css's later [data-magnetic]{display:inline-block} beats its own
    // .wa-pill{display:none} below 1024px (same specificity); drop it once Motion reorders those rules.
    <span className="wa-pill max-lg:!hidden" data-magnetic="">
      <WaButton text={text} placement="pill" service={service ?? 'none'} size="lg" />
    </span>
  )
}
