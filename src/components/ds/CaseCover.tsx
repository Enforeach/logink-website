import Link from 'next/link'
import * as React from 'react'
import type { Locale } from '@/lib/services'
import type { CaseCard } from './types'
import { T } from './strings'
import { cn } from '@/lib/utils'

const VT = (React as Partial<typeof React>).ViewTransition
const caseHref = (c: CaseCard, l: Locale) => (l === 'en' ? `/en/portfolio/${c.slugEn ?? c.slug}` : `/portfolio/${c.slug}`)

/** Typographic Kertas case cover (no invented imagery): magenta rule, title, industry · duration, metric only when approved. */
export function CaseCover({ locale: l, c, variant }: { locale: Locale; c: CaseCard; variant: 'card' | 'hero' }) {
  const title = (l === 'en' ? c.title.en : null) ?? c.title.id
  const body = (
    <div data-ground="putih" data-stage="ditemukan" className={cn('card-raised flex h-full flex-col p-6', variant === 'hero' && 'lg:p-10')}>
      <p className="t-dateline text-key-ink">{[c.industry, c.duration].filter(Boolean).join(' · ')}</p>
      <p className={cn('mt-4', variant === 'hero' ? 't-h2' : 't-h3')}>{title}</p>
      {c.metric ? (
        <p className="t-body mt-auto pt-6">
          {c.metric.text} <span className="text-ink-2">{`${c.metric.period} · ${c.metric.source}`}</span>
        </p>
      ) : null}
    </div>
  )
  const named = VT ? <VT name={`case-${c.slug}`}>{body}</VT> : body
  if (variant === 'hero') return named
  return (
    <Link href={caseHref(c, l)} data-cursor={T.viewCase[l]} className="block h-full">
      {named}
    </Link>
  )
}

/** Scroll-snap row of case cards that mouse-drags on rich pointers. */
export function CaseFileRow({ locale: l, cases }: { locale: Locale; cases: CaseCard[] }) {
  if (!cases.length) return null
  return (
    <ul data-drag-x="" data-cursor={T.drag[l]} className="gap-4 pb-4">
      {cases.map((c) => (
        <li key={c.slug} className="w-[min(80vw,420px)]">
          <CaseCover locale={l} c={c} variant="card" />
        </li>
      ))}
    </ul>
  )
}
