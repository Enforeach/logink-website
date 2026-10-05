import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function FactList({ items, className }: { items: { k: string; v: ReactNode }[]; className?: string }) {
  return (
    <dl className={cn('grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]', className)}>
      {items.map((it) => (
        <div key={it.k} className="contents">
          <dt className="t-small border-t border-hair pt-3 font-650 text-ink-2 sm:pb-3">{it.k}</dt>
          <dd className="pb-3 sm:border-t sm:border-hair sm:pt-3">{it.v}</dd>
        </div>
      ))}
    </dl>
  )
}
