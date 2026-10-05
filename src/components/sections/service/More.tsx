import type { ReactNode } from 'react'
import type { Locale } from '@/lib/services'
import { Icon } from '@/components/ds/Icon'
import { cn } from '@/lib/utils'

const LABEL = { id: 'Selengkapnya', en: 'More details' }

/** The More panel: long explanations collapse into a native <details> that stays in the SSR DOM (owner
 *  2026-10-03: heading + 1–2 short sentences + a visual per section; the rest one tap away). */
export function More({ locale: l, label, className, children }: { locale: Locale; label?: string; className?: string; children: ReactNode }) {
  return (
    <details className={cn('group', className)}>
      <summary className="t-ui inline-flex min-h-tap cursor-pointer list-none items-center gap-2 font-650 [&::-webkit-details-marker]:hidden">
        {label ?? LABEL[l]}
        <Icon name="plus" size={18} className="shrink-0 transition-transform duration-ui ease-drawer group-open:rotate-45" />
      </summary>
      <div className="grid gap-4 pb-2 pt-3">{children}</div>
    </details>
  )
}
