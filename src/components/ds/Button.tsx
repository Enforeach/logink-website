import Link from 'next/link'
import type { ReactNode } from 'react'
import type { CtaService, Placement } from './types'
import { Icon } from './Icon'
import { cn } from '@/lib/utils'

type Props = {
  href?: string; variant?: 'ink' | 'ghost' | 'text'; size?: 'sm' | 'md' | 'lg'
  cta?: 'quote' | 'form' | 'profiler'; placement?: Placement; service?: CtaService; cursor?: string
  as?: 'button'; full?: boolean; className?: string; children: ReactNode
}

/** Ink (Aspal on light, Cahaya on dark), ghost or text link. `as="button"` = form submit. */
export function Button({ href, variant = 'ink', size = 'md', cta, placement, service, cursor, as, full, className, children }: Props) {
  const cls = cn(
    variant === 'text' ? 'link inline-flex min-h-tap items-center gap-2 font-650' : cn('btn', variant === 'ink' ? 'btn-ink' : 'btn-ghost'),
    variant !== 'text' && size === 'sm' && 'btn-sm',
    variant !== 'text' && size === 'lg' && 'btn-lg',
    full && 'w-full',
    className,
  )
  const data = { 'data-cta': cta, 'data-placement': cta ? placement : undefined, 'data-service': cta ? (service ?? 'none') : undefined, 'data-cursor': cursor }
  const inner = (
    <>
      {children}
      {variant === 'text' ? <Icon name="arrow-right" size={18} /> : null}
    </>
  )
  if (as === 'button') return <button type="submit" className={cls} {...data}>{inner}</button>
  return <Link href={href!} className={cls} {...data}>{inner}</Link>
}
