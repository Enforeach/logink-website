// The only mock wrapper (BUILD §2.4): figure > figcaption.mock-label + div[data-nosnippet][inert]. Google honours
// data-nosnippet on div/span/section only; inert keeps every mock out of the tab order and the a11y tree, so mock
// buttons are <span>s and no <a>/<button> ever sits inside. The label sits top-left, inside the panel.
// data-reveal="inst" makes the instrument come alive once (SiteObserver → data-in; motion.css + instruments.css).
import type { CSSProperties, ReactNode } from 'react'
import type { Locale } from '@/lib/services'
import { MOCK_LABEL } from '@/content/instruments'
import { cn } from '@/lib/utils'
import './instruments.css'

/** CSS custom properties for inline style (stagger index, bar value). */
export const v = (vars: Record<string, string | number>) => vars as CSSProperties

export type MockGround = 'putih' | 'kertas' | 'senja-dalam' | 'malam-dalam'

export function MockFrame({ locale: l, ground = 'putih', label, className, children }: {
  locale: Locale
  ground?: MockGround
  label?: string // default 'Ilustrasi · data contoh' / 'Illustration · sample data'
  className?: string
  children: ReactNode
}) {
  return (
    <figure className={cn('mock', className)} data-ground={ground} data-reveal="inst">
      <figcaption className="mock-label">{label ?? MOCK_LABEL[l]}</figcaption>
      <div data-nosnippet="" inert>
        {children}
      </div>
    </figure>
  )
}
