import { waLink } from '@/lib/services'
import type { CtaService, Placement } from './types'
import { Icon } from './Icon'
import { cn } from '@/lib/utils'

/**
 * Every WhatsApp control (owner 2026-10-04: no green fill with a dark label): a white pill with an Aspal label and
 * the glyph in a WhatsApp-green disc, the same on paper and on dark panels. wa.me link from waLink() with the page
 * prefill, cursor contract DESIGN §10.7.
 */
export function WaButton({ text, placement, service = 'none', label = 'Chat WhatsApp', size = 'md', full, className }: {
  text: string; placement: Placement; service?: CtaService; label?: string; size?: 'sm' | 'md' | 'lg'; full?: boolean; className?: string
}) {
  return (
    <a
      className={cn('btn btn-wa', size === 'sm' && 'btn-sm', size === 'lg' && 'btn-lg', full && 'w-full', className)}
      href={waLink(text)}
      target="_blank"
      rel="noopener"
      data-cta="whatsapp"
      data-placement={placement}
      data-service={service}
      data-cursor="Chat WhatsApp"
      data-cursor-tone="wa"
    >
      <span className="wa-ico" aria-hidden="true"><Icon name="whatsapp" size={size === 'sm' ? 14 : 16} /></span>
      {label}
    </a>
  )
}
