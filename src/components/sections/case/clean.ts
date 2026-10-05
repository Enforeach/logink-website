// Presentation guards for CMS case data (BUILD §3.9 case; owner item 5 still open). The Payload data has
// known defects (an agency name leak, "[Klien]" placeholders, numbers mangled by the old count-up into
// "3.080,%", a franchise title whose +253% / 3 months contradicts its own metrics). Nothing here edits
// data: we hide or reformat at render time. Pure functions; check: pnpm exec tsx src/components/sections/case/clean.check.ts
import { CASE, FACT_LABELS, METRIC_LABELS } from '@/content/portfolio'
import type { Locale } from '@/lib/services'
import type { CaseCard } from '@/components/ds/types'

type Doc = Record<string, unknown>
export type CaseLike = {
  slug: string; slugEn: string | null; title: string; titleId: string | null; titleEn: string | null
  subtitleId: string | null; subtitleEn: string | null; seoTitleId: string | null; seoTitleEn: string | null
  seoDescId: string | null; seoDescEn: string | null; clientName: string; durationLabel: string | null; industry: string
  metrics: { metricLabel: string; afterValue: string }[]
  blocks: { blockType: string; isVisible: boolean; data: Doc }[]
}

// ponytail: one known leak; add names here if the CMS ever carries another agency's name.
const BLOCKED_NAMES = /duomark/i

/** Trimmed, placeholder-free CMS text, or '' when the field must not render. */
export function clean(v: unknown, l: Locale, client = ''): string {
  if (typeof v !== 'string') return ''
  let s = v.replace(/[\t ]+/g, ' ').replace(/ *\n */g, '\n').trim()
  if (BLOCKED_NAMES.test(s)) return ''
  s = s.replace(/\s*\((client|klien)\)/gi, '')
  s = s.replace(/\[(klien|client)\]/gi, l === 'id' ? 'klien' : 'the client')
  if (client) s = s.split(`[${client}]`).join(client)
  s = s.replace(/(\d),%/g, '$1%') // "3.080,%" → "3.080%"
  s = s.replace(/\s*CTA Body:\s*$/i, '')
  return s
}

/** Locale-pick a CMS pair (`xId`/`xEn`); EN falls back to ID only when the EN field is empty. */
export const pick = (d: Doc, key: string, l: Locale, client = '') =>
  (l === 'en' && clean(d[`${key}En`], l, client)) || clean(d[`${key}Id`], l, client)

const NUM = /^([+\-~]?)\s*(\d{1,3}(?:,\d{3})+|\d+)(?:\.(\d+))?\s*(%|[KkMm])?$/

/** Final metric value in the locale's format ("3,080%" → ID "3.080%"), or null when it can't be read. */
export function fmtMetric(v: unknown, l: Locale, up = false): string | null {
  if (typeof v !== 'string' && typeof v !== 'number') return null
  const m = String(v).trim().match(NUM)
  if (!m) return null
  const [, sign, int, dec, unit = ''] = m
  const intF = int.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, l === 'id' ? '.' : ',')
  return `${sign || (up && unit === '%' ? '+' : '')}${intF}${dec ? (l === 'id' ? ',' : '.') + dec : ''}${unit}`
}

export const metricLabel = (raw: string, l: Locale) => METRIC_LABELS.find(([re]) => re.test(raw))?.[1][l] ?? clean(raw, l)
export const factLabel = (raw: string, l: Locale) => FACT_LABELS.find(([re]) => re.test(raw.trim()))?.[1][l] ?? clean(raw, l)

/** "5 Months" / "5 Month" → "5 bulan" / "5 months". */
export function months(label: string | null, l: Locale): string | null {
  const m = label?.match(/(\d+)\s*(month|bulan)/i)
  return m ? CASE.months(Number(m[1]))[l] : clean(label, l) || null
}

export const blocks = (cs: CaseLike, type: string) => cs.blocks.filter((b) => b.isVisible && b.blockType === type).map((b) => b.data)
export const block = (cs: CaseLike, type: string): Doc | undefined => blocks(cs, type)[0]

const num = (s: string) => parseFloat(s.replace(/,/g, '').replace(/[^\d.]/g, ''))
function dataNumbers(cs: CaseLike): number[] {
  const vals = [
    ...cs.metrics.map((m) => m.afterValue),
    ...[...blocks(cs, 'HERO'), ...blocks(cs, 'METRIC_GRID')].flatMap((d) => ((d.metrics as Doc[]) ?? []).map((m) => String(m.value ?? ''))),
  ]
  return vals.map(num).filter((n) => !isNaN(n))
}

/** A title contradicts the data when it claims a % the metrics don't hold, or a duration other than durationLabel. */
export function contradicts(title: string, cs: CaseLike): boolean {
  const data = dataNumbers(cs)
  const pcts = [...title.matchAll(/(\d[\d.,]*)\s*%/g)].map((x) => num(x[1]))
  if (pcts.some((p) => !data.some((d) => Math.abs(d - p) < 0.05))) return true
  const t = title.match(/(\d+)\s*(bulan|months?)/i)
  const d = cs.durationLabel?.match(/(\d+)/)
  return !!(t && d && t[1] !== d[1])
}

/** The H1: the CMS title, or the CMS hero heading when the title contradicts the case's own data. */
export function caseTitle(cs: CaseLike, l: Locale): string {
  const hero = block(cs, 'HERO') ?? {}
  const cands = l === 'en' ? [cs.titleEn, hero.headingEn] : [cs.titleId || cs.title, hero.headingId]
  const ok = cands.map((c) => clean(c, l, cs.clientName)).filter(Boolean)
  return ok.find((c) => !contradicts(c, cs)) ?? (clean(cs.clientName, l) || ok[0] || cs.slug)
}

/** Industry label: the CMS hero eyebrow (the `industry` field is 'Other' on every case). */
export function industryOf(cs: CaseLike, l: Locale): string {
  const hero = block(cs, 'HERO') ?? {}
  return pick(hero, 'eyebrow', l) || (cs.industry && cs.industry !== 'Other' ? clean(cs.industry, l) : '')
}

export type Metric = { value: string; label: string }
/** Readable metrics of one block (HERO or METRIC_GRID); unreadable values are dropped, never shown mangled. */
export function metricsOf(d: Doc | undefined, l: Locale): Metric[] {
  return ((d?.metrics as Doc[]) ?? []).flatMap((m) => {
    const value = fmtMetric(m.value as string, l, m.deltaDirection === 'up')
    const label = metricLabel(String((l === 'en' && m.labelEn) || m.labelId || ''), l)
    return value && label ? [{ value, label }] : []
  })
}

// A CMS title can carry an unapproved number ('…: +463% Pertumbuhan Klik…'); until the slug is approved only the part
// before the colon or dash is shown. ponytail: catches 'N%' titles only; the real fix is the CMS title or approval.
const noMetric = <T extends string | null>(t: T): T => (t && /\d\s*%/.test(t) ? t.split(/:|\s[-–]\s/)[0].trim() as T : t)

/** Portfolio / related card. The metric sentence (and a metric in the title) appears only for APPROVED_CASE_SLUGS (empty today). */
export function toCard(cs: CaseLike, l: Locale, approved: string[]): CaseCard {
  const hero = metricsOf(block(cs, 'HERO'), l)[0]
  const period = months(cs.durationLabel, l)
  const ok = approved.includes(cs.slug)
  return {
    slug: cs.slug,
    slugEn: cs.slugEn,
    title: ok ? { id: caseTitle(cs, 'id'), en: caseTitle(cs, 'en') } : { id: noMetric(caseTitle(cs, 'id')), en: noMetric(caseTitle(cs, 'en')) },
    industry: industryOf(cs, l),
    duration: period,
    metric: ok && hero
      ? { text: `${hero.value} ${hero.label.toLowerCase()}`, period: period ?? '', source: 'Google Search Console' }
      : null,
  }
}
