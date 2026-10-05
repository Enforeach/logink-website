import type { ReactNode } from 'react'
import { svc as svcOf, type Locale, type SvcKey } from '@/lib/services'
import type { Ground } from '@/styles/tailwind.tokens'
import type { ServiceContent, Table } from '@/content/services/types'
import { tpl } from '@/content/services/template'
import { Section } from '@/components/ds/Section'
import { DataTable } from '@/components/ds/DataTable'
import { More } from './More'

const CMP = { id: 'Perbandingan', en: 'Comparison' }

/** A comparison as a real <table> (stacks under 640px) + its note. */
export function CompareTable({ locale: l, compare }: { locale: Locale; compare: Table }) {
  return (
    <div className="grid gap-3">
      <DataTable caption={CMP[l]} head={compare.head} rows={compare.rows} rowHeaders stack />
      {compare.note ? <p className="t-small text-ink-2">{compare.note}</p> : null}
    </div>
  )
}

/**
 * Section 3, the ONE "what's included" section (owner 2026-10-03): a card per H3 (named after a real query)
 * with one line of text. A comparison table, when the page has one here, sits in a collapsed More panel
 * (labelled with its caption), or open when `open` (the AI page's SEO vs AEO vs GEO). `after` = extra SSR
 * content (the AI page's customs line and engine table).
 */
export function WhatWeDo({ k, locale: l, work, compare, open, after, ground }: {
  k: SvcKey; locale: Locale; work: ServiceContent['work']; compare?: Table | null; open?: boolean; after?: ReactNode; ground: Ground
}) {
  return (
    <Section hour={svcOf(k).hour} ground={ground} id="layanan" labelledBy="layanan-h">
      <div className="wrap grid gap-10">
        <h2 id="layanan-h" className="t-h2">{tpl('work', l)}</h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {work.map((w) => (
            <li key={w.title} className="card p-6">
              <h3 className="t-h3">{w.title}</h3>
              <p className="t-small mt-2">{w.text}</p>
            </li>
          ))}
        </ol>
        {compare && open ? (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <h3 className="t-h3">{compare.caption}</h3>
            <CompareTable locale={l} compare={compare} />
          </div>
        ) : compare ? (
          <More locale={l} label={compare.caption}><CompareTable locale={l} compare={compare} /></More>
        ) : null}
        {after}
      </div>
    </Section>
  )
}
