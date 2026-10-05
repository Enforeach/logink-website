import Link from 'next/link'
import type { ReactNode } from 'react'
import { Icon } from './Icon'
import { cn } from '@/lib/utils'

/** Body link: always underlined (.link). External hrefs open with rel=noopener. */
export function TextLink({ href, arrow, className, children }: { href: string; arrow?: boolean; className?: string; children: ReactNode }) {
  const cls = cn('link', arrow && 'inline-flex items-center gap-1.5', className)
  const inner = (
    <>
      {children}
      {arrow ? <Icon name="arrow-right" size={16} /> : null}
    </>
  )
  return /^https?:/.test(href)
    ? <a href={href} className={cls} target="_blank" rel="noopener">{inner}</a>
    : <Link href={href} className={cls}>{inner}</Link>
}
