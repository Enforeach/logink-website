import Link from 'next/link'
import type { ReactNode } from 'react'
import type { StageKey } from '@/lib/services'
import { cn } from '@/lib/utils'

/** The only pills. source chips link out (rel=noopener) and show the year; stage chips carry the key-light dot. */
export function Chip({ variant, stage, href, year, current, className, children }: {
  variant: 'stage' | 'source' | 'engine' | 'filter' | 'choice'; stage?: StageKey; href?: string; year?: number
  current?: boolean; className?: string; children: ReactNode
}) {
  const cls = cn('chip', variant === 'choice' && 'chip-choice', current && 'border-line text-ink', className)
  const body = (
    <>
      {children}
      {year ? <span aria-hidden="true">·</span> : null}
      {year ? <span>{year}</span> : null}
    </>
  )
  if (!href) return <span className={cls} data-stage={stage}>{body}</span>
  if (/^https?:/.test(href))
    return <a className={cn(cls, 'underline-offset-2 hover:underline')} data-stage={stage} href={href} target="_blank" rel="noopener">{body}</a>
  return (
    <Link className={cn(cls, 'hover:border-line')} data-stage={stage} href={href} aria-current={current ? 'page' : undefined}>
      {body}
    </Link>
  )
}
