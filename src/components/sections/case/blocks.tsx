// Case block renderers (server, 0 KB JS), restyled from the legacy client blocks with the same data
// contracts (the legacy case-study types, now deleted). No reveal wrapper, no count-up: final values in the SSR HTML.
// ponytail: only the block types the CMS uses today render (HERO metrics, OVERVIEW, CLIENT_SNAPSHOT,
// NARRATIVE, METRIC_GRID, TIMELINE). CHART/GALLERY/VIDEO/QUOTE/FAQ/RICH_TEXT/BEFORE_AFTER/LEAD_FORM render
// nothing; CTA and RELATED_CASES are replaced by the page's own WhatsApp CTA and related-case row.
// Add a renderer here when a published case first uses one of them.
import { FactList } from '@/components/ds/FactList'
import { CASE } from '@/content/portfolio'
import type { Locale } from '@/lib/services'
import { clean, factLabel, pick, type Metric } from './clean'

type Doc = Record<string, unknown>
type Part = { t: 'h'; label: string; text: string } | { t: 'p'; text: string } | { t: 'ul'; items: string[] }
const LABEL = /^(tantangan|challenge|solusi|solution|strategi|strategy)\s*\d+\s*:?$/i

/** NARRATIVE body text → real subheads: "Tantangan 1\nTitle" paragraphs become a label + H3; ">>" lines a list. */
export function parseBody(body: string): Part[] {
  const out: Part[] = []
  for (const para of body.split(/\n\s*\n/)) {
    const lines = para.split('\n').map((s) => s.trim()).filter(Boolean)
    if (!lines.length) continue
    if (LABEL.test(lines[0]) && lines[1]) {
      out.push({ t: 'h', label: lines[0], text: lines[1] })
      if (lines[2]) out.push({ t: 'p', text: lines.slice(2).join(' ') })
    } else if (lines[0].startsWith('>>')) {
      const items = lines.map((x) => x.replace(/^>>\s*/, ''))
      const prev = out.at(-1)
      if (prev?.t === 'ul') prev.items.push(...items)
      else out.push({ t: 'ul', items })
    } else out.push({ t: 'p', text: lines.join(' ') })
  }
  return out
}

/** 'tantangan' | 'strategi' from the body's first label (falls back to the block's position). */
export const narrativeKind = (parts: Part[], i: number) => {
  const h = parts.find((p) => p.t === 'h') as { label: string } | undefined
  if (h) return /tantangan|challenge/i.test(h.label) ? 'tantangan' : 'strategi'
  return i === 0 ? 'tantangan' : 'strategi'
}

export function Narrative({ parts, heading }: { parts: Part[]; heading?: string }) {
  return (
    <div className="max-w-measure space-y-5">
      {heading ? <h3 className="t-h3">{heading}</h3> : null}
      {parts.map((p, i) =>
        p.t === 'h' ? (
          <div key={i} className="pt-4">
            <p className="t-dateline text-key-ink">{p.label}</p>
            <h3 className="t-h3 mt-2">{p.text}</h3>
          </div>
        ) : p.t === 'ul' ? (
          <ul key={i} className="t-body list-disc space-y-2 pl-5">
            {p.items.map((x) => <li key={x}>{x}</li>)}
          </ul>
        ) : (
          <p key={i} className="t-body">{p.text}</p>
        ),
      )}
    </div>
  )
}

// Prepared block data: the page knows what will render before it builds the subnav (no empty sections).
export const overviewOf = (d: Doc | undefined, l: Locale, client: string) =>
  (((l === 'en' && (d?.bulletsEn as string[])?.length ? d?.bulletsEn : d?.bulletsId) as string[]) ?? [])
    .map((b) => clean(b, l, client)).filter(Boolean)

export function snapshotOf(d: Doc | undefined, l: Locale, client: string) {
  if (!d) return null
  const about = pick(d, 'about', l, client)
  const facts = ((d.facts as { label: string; value: string }[]) ?? [])
    .map((f) => ({ k: factLabel(f.label ?? '', l), v: clean(f.value, l, client) }))
    .filter((f) => f.k && f.v)
  const site = typeof d.website === 'string' && /^https?:\/\//.test(d.website) ? d.website : null // 'dirahasiakan' is not a URL
  return about || facts.length ? { about, facts, site } : null
}

export const timelineOf = (d: Doc | undefined, l: Locale, client: string) =>
  ((d?.milestones as Doc[]) ?? [])
    .map((m) => ({ date: clean(m.date, l), title: pick(m, 'title', l, client), desc: pick(m, 'description', l, client) }))
    .filter((m) => m.title || m.desc)

export function Overview({ bullets }: { bullets: string[] }) {
  return (
    <ul className="max-w-measure space-y-4">
      {bullets.map((b) => (
        <li key={b} className="t-body border-l-2 border-key pl-4">{b}</li>
      ))}
    </ul>
  )
}

export function ClientSnapshot({ s, l }: { s: NonNullable<ReturnType<typeof snapshotOf>>; l: Locale }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <h3 className="t-h3">{CASE.client[l]}</h3>
        {s.about ? <p className="t-body mt-3 whitespace-pre-line">{s.about}</p> : null}
        {s.site ? <a href={s.site} className="link mt-3 inline-flex min-h-tap items-center" target="_blank" rel="noopener">{s.site.replace(/^https?:\/\//, '')}</a> : null}
      </div>
      {s.facts.length ? <FactList items={s.facts} /> : null}
    </div>
  )
}

export function Timeline({ ms, l }: { ms: ReturnType<typeof timelineOf>; l: Locale }) {
  return (
    <div>
      <h3 className="t-h3">{CASE.timeline[l]}</h3>
      <ol className="mt-6 grid gap-6 border-l-2 border-line pl-5 md:grid-cols-2 md:border-l-0 md:pl-0">
        {ms.map((m, i) => (
          <li key={i} className="md:border-t-2 md:border-line md:pt-4">
            {m.date ? <p className="t-dateline text-key-ink">{m.date}</p> : null}
            {m.title ? <p className="t-body mt-1 font-650">{m.title}</p> : null}
            {m.desc ? <p className="t-small mt-1 text-ink-2">{m.desc}</p> : null}
          </li>
        ))}
      </ol>
    </div>
  )
}

/** Results grid: final values as text, the period and the source under it. */
export function MetricGrid({ metrics, l, period }: { metrics: Metric[]; l: Locale; period: string | null }) {
  return (
    <div>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
        {metrics.map((m) => (
          <div key={m.label + m.value} className="card flex flex-col-reverse p-4">
            <dt className="t-small mt-1 text-ink-2">{m.label}</dt>
            <dd className="t-h2 tabular-nums">{m.value}</dd>
          </div>
        ))}
      </dl>
      <p className="t-small mt-6 text-ink-2">
        {period ? `${CASE.period[l]}: ${period} · ` : null}
        {CASE.source[l]}
      </p>
    </div>
  )
}
