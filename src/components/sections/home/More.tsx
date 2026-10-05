// 'Selengkapnya' (owner 2026-10-03: visible copy halved): the longer copy stays in the SSR DOM inside a closed
// <details>, so crawlers, AI and Mode teks still read it.
import type { ReactNode } from 'react'
import type { Locale } from '@/lib/services'
import { Icon } from '@/components/ds/Icon'
import { cn } from '@/lib/utils'
import { MORE } from '@/content/home'

export function More({ locale: l, label, className, children }: { locale: Locale; label?: string; className?: string; children: ReactNode }) {
  return (
    <details className={cn('group', className)}>
      <summary className="t-small inline-flex min-h-tap cursor-pointer list-none items-center gap-2 font-650 text-link [&::-webkit-details-marker]:hidden">
        {label ?? MORE[l]}
        <Icon name="plus" size={16} className="shrink-0 transition-transform duration-ui group-open:rotate-45" />
      </summary>
      <div className="grid gap-3 pb-2 pt-1">{children}</div>
    </details>
  )
}
