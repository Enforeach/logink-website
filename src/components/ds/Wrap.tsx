import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Wrap({ grid, className, children }: { grid?: boolean; className?: string; children: ReactNode }) {
  return <div className={cn('wrap', grid && 'grid-12', className)}>{children}</div>
}
