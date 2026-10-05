import type { ReactNode } from 'react'
import { SOURCES, svc as svcOf, type Locale, type SvcKey } from '@/lib/services'
import type { Ground } from '@/styles/tailwind.tokens'
import type { ServiceContent, Stat } from '@/content/services/types'
import { MEASURE } from '@/content/instruments'
import { Section } from '@/components/ds/Section'
import { SourcedStat } from '@/components/ds/SourcedStat'
import { ReportFrame } from '@/components/instruments/ReportFrame'
import { Instrument } from '@/components/instruments/Instrument'
import { SerpToMaps } from '@/components/instruments/SerpToMaps'
import { HERO_CARD } from './cards'
import { More } from './More'

const L = {
  h: { id: 'Seperti ini di layar', en: 'What it looks like on screen' },
  p: {
    id: 'Ilustrasi di bawah memakai data contoh. Belum ada studi kasus publik untuk layanan ini, jadi kami tunjukkan cara kami mengukur.',
    en: 'The illustrations below use sample data. There is no public case study for this service yet, so here is how we measure.',
  },
  data: { id: 'Data & sumber', en: 'Data & sources' },
}

export const statOf = (st: Stat, l: Locale) => {
  if (typeof st !== 'string') return st
  const s = SOURCES.find((x) => x.k === st)!
  return { text: s.text[l], src: s.src, year: s.year, url: s.url }
}

/** 'Data & sumber': the sourced stats + the source list, collapsed. */
function DataSources({ locale: l, c }: { locale: Locale; c: ServiceContent }) {
  const stats = c.stats.map((st) => statOf(st, l))
  const sources = [...c.sources, ...stats.map((x) => ({ label: `${x.src}, ${x.year} (${new URL(x.url).hostname})`, url: x.url }))]
    .filter((x, i, a) => a.findIndex((y) => y.url === x.url) === i)
  return (
    <More locale={l} label={L.data[l]}>
      <ul className="grid gap-6">{stats.map((s) => <li key={s.url}><SourcedStat {...s} /></li>)}</ul>
      <ol className="t-small grid list-decimal gap-2 pl-5">
        {sources.map((x) => <li key={x.url}><a href={x.url} target="_blank" rel="noopener" className="link">{x.label}</a></li>)}
      </ol>
    </More>
  )
}

/**
 * Section 2, the visual (owner 2026-10-03): the service's instruments (hero card + work-step cards, each
 * labelled 'Ilustrasi · data contoh'), the honest no-case line, and two collapsed panels: 'Cara kami
 * mengukur' (APPROVED_CASE_SLUGS is empty) and 'Data & sumber' (sourced stats + the source list).
 * `children` replaces the default instruments (the AI page's 'Di balik layar').
 */
export function Showcase({ k, locale: l, c, ground, heading, lead, children }: {
  k: SvcKey; locale: Locale; c: ServiceContent; ground: Ground; heading?: string; lead?: ReactNode; children?: ReactNode
}) {
  const hero = HERO_CARD[k]
  const extra = c.work.filter((w) => w.card && w.card !== hero.k).map((w) => w.card!)
  const n = 1 + extra.length
  const intro = (
    <div className="grid max-w-[65ch] content-start gap-3">
      <h2 id="tampilan-h" className="t-h2">{heading ?? L.h[l]}</h2>
      <p className="t-body">{lead ?? L.p[l]}</p>
    </div>
  )
  const more = (
    <div className={children || n > 1 ? 'grid gap-2 md:grid-cols-2 md:gap-8' : 'grid gap-2'}>
      <More locale={l} label={MEASURE.heading[l]}>
        <p className="t-body">{MEASURE.text[l]}</p>
        {children ? null : <ReportFrame locale={l} />}
      </More>
      <DataSources locale={l} c={c} />
    </div>
  )
  const lead1 = hero.mode ? <SerpToMaps locale={l} mode={hero.mode} /> : <Instrument k={hero.k} locale={l} />
  return (
    <Section hour={svcOf(k).hour} ground={ground} id="tampilan" labelledBy="tampilan-h">
      {/* one instrument: text left, instrument right; several (or the AI page's set): text above, grid below */}
      {!children && n === 1 ? (
        <div className="wrap grid items-start gap-10 lg:grid-cols-12">
          <div className="grid gap-8 lg:col-span-5">{intro}{more}</div>
          <div className="lg:col-span-6 lg:col-start-7">{lead1}</div>
        </div>
      ) : (
        <div className="wrap grid gap-10">
          {intro}
          {children ?? (
            <div className="grid items-start gap-6 md:grid-cols-2">
              {lead1}
              {extra.map((x) => <Instrument key={x} k={x} locale={l} />)}
            </div>
          )}
          {more}
        </div>
      )}
    </Section>
  )
}
