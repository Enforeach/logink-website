// ServiceContent (BUILD §3.4, amended by §11 6.1: `loop` → `campaign`). Plain data, no JSX.
// Every field is SSR text (owner 2026-10-03: 6 sections, each message once). One object per locale: `export default { id, en } satisfies Record<Locale, ServiceContent>`.
import type { SOURCES, SvcKey } from '@/lib/services'

/** Live-HTML instruments (components/instruments, BUILD §2.5d) a work step may show beside the list. */
export type InstrumentKey =
  | 'SerpToMaps' | 'IgGrid' | 'ReviewCard' | 'SiteFrame' | 'Funnel' | 'AiAnswer' | 'PromptTable'
  | 'SovBars' | 'CrawlerLog' | 'QueryFanout' | 'JsonLdFragment' | 'ReportFrame' | 'AdToChat' | 'ContentCalendar'

export type SourceKey = (typeof SOURCES)[number]['k']
export type Stat = SourceKey | { value?: string; text: string; src: string; year: number; url: string }

/** §11 6.1. `gate` items render only when CAMPAIGN_CONFIRMED[gate] is true, unless they carry a `fallback`. */
export type CampaignItem = {
  k: SvcKey | 'wa' | 'strategy' | 'report'
  text: string
  gate?: 'K1' | 'K5' | 'K6' | 'K11'
  fallback?: string
}

/** One priced plan. Shape = the legacy *_PRICING_TIERS entries, so the moved arrays map in verbatim. */
export type Tier = {
  id: string
  name: string
  price: string // visible text, e.g. 'Rp 6 Juta'
  priceValue: number // IDR, for the Offer node (mirrors `price`)
  period: string // '/bulan', '/month', '' for one-off
  bestFor: string
  isPopular: boolean
  features: readonly string[]
  note?: string // shown under the price on every card (Ads: the management-fee vs ad-spend line)
}
export type Table = { caption: string; head: string[]; rows: string[][]; note?: string }
export type Addon = { name: string; text?: string; price?: string; href?: string; linkText?: string }

/** Social/Creative: one module as SSR text. `price` is the visible price line (a custom-quote line while no
 *  module price exists: there is never a computed total). */
export type Module = { id: string; title: string; text: string; items: readonly string[]; price: string }
/** Website: one project type. The price is one line for every project (registry `price`). */
export type Project = { id: string; name: string; text: string; bestFor: string; timeline: string }

/** QuoteBuilder strings, passed from the server (the island imports no content). One fieldset per group:
 *  an optional module `toggle` (its id = the group id), checkbox items (`multi`) or radio items, and selects
 *  that stay disabled until the module is toggled. */
export type BuilderGroup = {
  id: string; label: string; toggle?: string; multi?: boolean
  items?: { id: string; label: string; on?: boolean }[]
  selects?: { id: string; label: string; v: string; options: { v: string; label: string }[] }[]
}
export type BuilderCopy = { heading: string; intro: string; empty: string; summary: string; price: string; groups: BuilderGroup[] }

export type Pricing =
  | { kind: 'tiers'; tiers: readonly Tier[]; matrix?: Table; addons?: Addon[]; note?: string }
  | { kind: 'quote'; note?: string }
  | { kind: 'modules'; builder: 'social' | 'creative'; modules: Module[]; addons?: Addon[]; note?: string; copy: BuilderCopy }
  | { kind: 'projects'; projects: Project[]; priceValue: number; note: string; discovery: { label: string; wa: string }; addons?: Addon[] }

export type ServiceContent = {
  answer: string // ~40 words, answer first, said once (hero); also Service.description in JSON-LD and home rows
  campaign: { fedBy: CampaignItem[]; feeds: CampaignItem[] }
  work: { title: string; text: string; card?: InstrumentKey }[] // the one "what's included" section: H3 + one line
  pricing: Pricing
  compare: Table | null
  stats: Stat[] // 3–5, under 'Data & sumber'
  ai: string // how this service feeds AI search (home reads it; the 360 block shows it when SEO AI is not listed)
  faq: { q: string; a: string }[] // 7–10, 40–80 words, the first sentence answers; never restates the price
  sources: { label: string; url: string }[]
  showcase?: string // section 2 lead when the default honest line needs a page-specific clause (Ads: K11)
  aiPage?: AiPage // the SEO AI page only
  // Rich service page (owner 2026-10-04, benchmarked on the live SEO page; SEO first). With `included`, it replaces
  // sections 2-3 (Showcase + WhatWeDo); `highlights` follow the hero, `process` follows the prices.
  trust?: string[] // 3 short ticks under the hero CTAs
  highlights?: { items: { value: string; label: string }[]; note: string } // the stats band: offer facts, never results
  // after the stats band; `visual: 'maps'` = the Maps mock on the left, the cards as a compact list (Local SEO)
  // `value` replaces a card's 01/02 number (Social: '40%'), `logo` a platform mark (Ads), `tag` = a footer line
  // (Ads: the plans that include it); `pop` = the highlighted card (default the 2nd, -1 = none)
  usp?: { heading: string; lead: string; accent?: number; visual?: 'maps'; pop?: number
    cards: { title: string; text: string; value?: string; logo?: 'google' | 'meta' | 'tiktok' | 'shopee'; sub?: string; tag?: string; points?: string[] }[] }
  included?: { heading: string; lead: string; tabs: { label: string; items: { title: string; text: string; badge?: string }[] }[] }
  process?: true // the homepage's 5-step process (before you sign → your decision → after approval), after the prices
}

/** SEO AI page extras (BUILD §3.8 AiExtras, folded into the 6-section template). */
export type AiPage = {
  behind: { heading: string; lead: string } // section 2 'Di balik layar' (+ AI_BASELINE when live)
  // the customs line is AI_COMPARE.note, shown once under the open SEO vs AEO vs GEO table
  engines: Table // how each engine finds sources (sourced)
  note: string // the margin note: the answer above is written to be quotable
}
