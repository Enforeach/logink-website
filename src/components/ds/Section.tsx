import type { ReactNode } from 'react'
import { hourInfo, skyOf, type Ground } from '@/styles/tailwind.tokens'
import type { StageKey } from '@/lib/services'
import { cn } from '@/lib/utils'

/** Every section: data-hour (HHMM, '07.00' accepted), data-ground, data-stage, data-sky (from the ground). */
export function Section({ hour, ground, stage, id, labelledBy, pad = 'md', className, children }: {
  hour?: string; ground?: Ground; stage?: StageKey; id?: string; labelledBy?: string
  pad?: 'sm' | 'md' | 'none'; className?: string; children: ReactNode
}) {
  const h = hour?.replace('.', '')
  const g = ground ?? (h ? hourInfo(h).ground : undefined)
  return (
    <section
      id={id}
      data-hour={h}
      data-ground={ground}
      data-stage={stage}
      data-sky={g ? skyOf(g) : 'light'}
      aria-labelledby={labelledBy}
      className={cn(pad === 'md' && 'py-section', pad === 'sm' && 'py-section-sm', className)}
    >
      {children}
    </section>
  )
}
