// Services → Service pages: one document per service (src/lib/services.ts + src/content/services/<key>.ts).
// Tabs: Page (name, price, H1, WhatsApp), Content (the whole page body, per language), SEO.
// The Content tab is generated from the 7 service defaults (one unioned schema, each doc reads only its own keys),
// then arranged in page order: sections are collapsibles, and fields that only some services have are hidden on the
// others (admin.condition on the doc key, derived from the defaults).
import type { Field } from 'payload'
import { SERVICES } from '@/lib/services'
import { defaultOf } from '@/cms/store'
import { fieldsFrom, type Overrides } from '../fields'
import { keyedCollection, seoOf } from '../define'
import seo from '@/content/services/seo'
import localseo from '@/content/services/localseo'
import ads from '@/content/services/ads'
import social from '@/content/services/social'
import creative from '@/content/services/creative'
import website from '@/content/services/website'
import ai from '@/content/services/ai'

const DEFS = [seo, localseo, ads, social, creative, website, ai]
const ALL = SERVICES.map((s) => s.key as string)

const INSTRUMENTS = ['SerpToMaps', 'IgGrid', 'ReviewCard', 'SiteFrame', 'Funnel', 'AiAnswer', 'PromptTable', 'SovBars', 'CrawlerLog', 'QueryFanout', 'JsonLdFragment', 'ReportFrame', 'AdToChat', 'ContentCalendar']
const code = (label: string, description?: string) => ({ label, readOnly: true, ...(description && { description }) })
const priceValue = 'Number in IDR for Google structured data (Offer). It must match the visible price: "Rp 8 Juta" = 8000000.'

const ov: Overrides = {
  // 1 Hero
  answer: { label: 'Hero answer', description: 'About 40 words under the page heading. Answer first. Also used as the service description in Google structured data and on the home page.' },
  trust: { label: 'Trust ticks', dbName: 'sp_trust', description: 'Three short ticks under the hero buttons.' },
  'trust.text': { label: 'Tick' },
  // 2 Highlights
  highlights: { label: 'Highlights band', description: 'The facts strip under the hero. Offer facts only, never results.' },
  'highlights.items': { label: 'Highlights', dbName: 'sp_hl' },
  'highlights.items.value': { label: 'Big value', description: 'For example "30" or "24 jam".' },
  'highlights.items.label': { label: 'Label' },
  'highlights.note': { label: 'Note under the band' },
  // 3 USP
  usp: { label: 'USP section', description: 'The heading with cards right after the highlights.' },
  'usp.heading': { label: 'Heading' },
  'usp.lead': { label: 'Lead text' },
  'usp.accent': { label: 'Gradient words', description: 'How many words at the END of the heading are shown in the brand gradient colour.' },
  'usp.pop': { label: 'Highlighted card', description: 'Which card is highlighted, counting from 0 (0 = first, 1 = second). -1 = none. Empty = the second card.' },
  'usp.visual': { skip: true },
  'usp.cards': { label: 'Cards', dbName: 'sp_usp' },
  'usp.cards.title': { label: 'Title' },
  'usp.cards.text': { label: 'Text' },
  'usp.cards.value': { label: 'Big number', description: 'Replaces the 01/02 number on the card, e.g. "40%".' },
  'usp.cards.logo': { label: 'Platform logo', type: 'select', options: ['google', 'meta', 'tiktok', 'shopee'], description: 'Shows that platform mark on the card.' },
  'usp.cards.sub': { label: 'Sub-line' },
  'usp.cards.tag': { label: 'Footer line', description: 'For example the plans that include this card.' },
  'usp.cards.points': { label: 'Bullet points', dbName: 'sp_usp_pts' },
  'usp.cards.points.text': { label: 'Point' },
  // 4 Included
  included: { label: "What's included", description: 'Tabs of items shown after the USP cards.' },
  'included.heading': { label: 'Heading' },
  'included.lead': { label: 'Lead text' },
  'included.tabs': { label: 'Tabs', dbName: 'sp_inc_tabs' },
  'included.tabs.label': { label: 'Tab name' },
  'included.tabs.items': { label: 'Items', dbName: 'sp_inc_items' },
  'included.tabs.items.title': { label: 'Title' },
  'included.tabs.items.text': { label: 'Text' },
  'included.tabs.items.badge': { label: 'Badge (optional)', description: 'A small tag next to the title, e.g. "Add-on".' },
  // 5 Page-specific extras
  showcase: { label: 'Section 2 lead', description: 'Optional lead sentence for the section after the hero (Ads page).' },
  aiPage: { label: 'SEO AI page extras' },
  'aiPage.behind': { label: 'Behind the scenes section' },
  'aiPage.behind.heading': { label: 'Heading' },
  'aiPage.behind.lead': { label: 'Lead text' },
  'aiPage.engines': { label: 'How each engine finds sources (table)' },
  'aiPage.engines.caption': { label: 'Table title' },
  'aiPage.engines.head': { label: 'Column headings', dbName: 'sp_ai_head' },
  'aiPage.engines.head.text': { label: 'Heading' },
  'aiPage.engines.rows': { label: 'Table rows', dbName: 'sp_ai_rows' },
  'aiPage.note': { label: 'Margin note', description: 'Explains that the answer above is written to be quotable.' },
  // 6 Work
  work: { label: 'Work steps', dbName: 'sp_work', description: 'The "what we do" list: one heading and one line each.' },
  'work.title': { label: 'Heading' },
  'work.text': { label: 'One line' },
  'work.card': { label: 'Illustration', type: 'select', options: INSTRUMENTS, description: 'The live illustration shown beside this step.' },
  // 7 Pricing
  pricing: { label: 'Pricing' },
  'pricing.kind': { ...code('Price layout', 'How this page shows prices. Set in code.'), type: 'select', options: ['tiers', 'quote', 'modules', 'projects'] },
  'pricing.builder': { ...code('Quote builder type', 'Set in code.'), type: 'select', options: ['social', 'creative'] },
  'pricing.note': { label: 'Note under the prices' },
  'pricing.priceValue': { label: 'Price value (IDR)', description: priceValue },
  'pricing.tiers': { label: 'Plans', dbName: 'sp_tiers' },
  'pricing.tiers.id': code('Plan ID', 'Used for links and tracking. Set in code.'),
  'pricing.tiers.name': { label: 'Plan name' },
  'pricing.tiers.price': { label: 'Price (as shown)', description: 'Exactly as visitors see it, e.g. "Rp 8 Juta". Update the price value too.' },
  'pricing.tiers.priceValue': { label: 'Price value (IDR)', description: priceValue },
  'pricing.tiers.period': { label: 'Billing period', description: 'For example "/bulan" or "/month". Empty for a one-off price.' },
  'pricing.tiers.bestFor': { label: 'Best for' },
  'pricing.tiers.isPopular': { label: 'Highlight as most popular' },
  'pricing.tiers.color': code('Accent colour', 'Set in code.'),
  'pricing.tiers.features': { label: 'Features', dbName: 'sp_tier_feat' },
  'pricing.tiers.features.text': { label: 'Feature' },
  'pricing.tiers.note': { label: 'Note under the price' },
  'pricing.tiers.billing': { label: 'Billing note' },
  'pricing.tiers.platformCoverage': { label: 'Platform coverage' },
  'pricing.tiers.addOnNote': { label: 'Add-on note' },
  'pricing.tiers.recommendedAdSpend': { label: 'Recommended ad spend' },
  'pricing.addons': { label: 'Add-ons', dbName: 'sp_addons' },
  'pricing.addons.name': { label: 'Name' },
  'pricing.addons.text': { label: 'Description' },
  'pricing.addons.price': { label: 'Price' },
  'pricing.addons.href': code('Link', 'Where the add-on links to. Set in code.'),
  'pricing.addons.linkText': { label: 'Link text' },
  'pricing.modules': { label: 'Modules', dbName: 'sp_mods' },
  'pricing.modules.id': code('Module ID', 'Set in code.'),
  'pricing.modules.title': { label: 'Title' },
  'pricing.modules.text': { label: 'Text' },
  'pricing.modules.items': { label: 'Included items', dbName: 'sp_mod_items' },
  'pricing.modules.items.text': { label: 'Item' },
  'pricing.modules.price': { label: 'Price line' },
  'pricing.projects': { label: 'Project types', dbName: 'sp_proj' },
  'pricing.projects.id': code('Project ID', 'Set in code.'),
  'pricing.projects.name': { label: 'Name' },
  'pricing.projects.text': { label: 'Text' },
  'pricing.projects.bestFor': { label: 'Best for' },
  'pricing.projects.timeline': { label: 'Timeline' },
  'pricing.discovery': { label: 'Discovery call button' },
  'pricing.discovery.label': { label: 'Button label' },
  'pricing.discovery.wa': { label: 'WhatsApp message' },
  'pricing.copy': { label: 'Quote builder text', description: 'The words of the "build your quote" form.' },
  'pricing.copy.heading': { label: 'Heading' },
  'pricing.copy.intro': { label: 'Intro' },
  'pricing.copy.empty': { label: 'Message before anything is chosen' },
  'pricing.copy.summary': { label: 'Summary label' },
  'pricing.copy.price': { label: 'Price line' },
  'pricing.copy.groups': { label: 'Groups', dbName: 'sp_grp', description: 'Edit the words only. The quote message depends on the group, choice and drop-down IDs, which are set in code.' },
  'pricing.copy.groups.id': code('Group ID', 'Set in code.'),
  'pricing.copy.groups.label': { label: 'Group name' },
  'pricing.copy.groups.toggle': { label: 'Toggle label', description: 'The tick box that adds this module.' },
  'pricing.copy.groups.multi': { ...code('Several choices allowed', 'Set in code.') },
  'pricing.copy.groups.items': { label: 'Choices', dbName: 'sp_grp_items' },
  'pricing.copy.groups.items.id': code('Choice ID', 'Set in code.'),
  'pricing.copy.groups.items.label': { label: 'Choice' },
  'pricing.copy.groups.items.on': { label: 'Selected by default' },
  'pricing.copy.groups.selects': { label: 'Drop-downs', dbName: 'sp_sel' },
  'pricing.copy.groups.selects.id': code('Drop-down ID', 'Set in code.'),
  'pricing.copy.groups.selects.label': { label: 'Question' },
  'pricing.copy.groups.selects.v': code('Default value', 'Set in code.'),
  'pricing.copy.groups.selects.options': { label: 'Options', dbName: 'sp_sel_opt' },
  'pricing.copy.groups.selects.options.v': code('Option value', 'Set in code.'),
  'pricing.copy.groups.selects.options.label': { label: 'Option' },
  // 8 Process
  process: { label: 'Show the 5-step process section', type: 'checkbox', description: 'The "before you sign, your decision, after approval" steps after the prices. The steps themselves are edited on the Home page.' },
  // 9 Stats
  stats: { label: 'Data & sources (stats)', dbName: 'sp_stats', description: 'Each row is either a source key or a custom stat. Text: a source key such as aio-id (the site shows its built-in sourced stat), or fill Text, Source, Year and Link for a custom stat.' },
  'stats.text': { label: 'Text', description: 'A source key (e.g. aio-id), or the stat sentence for a custom stat.' },
  'stats.src': { label: 'Source name', description: 'Custom stat only.' },
  'stats.year': { label: 'Year', description: 'Custom stat only.' },
  'stats.url': { label: 'Link to the source', description: 'Custom stat only. A full https:// address.' },
  // 10 FAQ
  faq: { label: 'FAQ', dbName: 'sp_faq', description: '7 to 10 questions. The first sentence of each answer answers the question; do not restate the price.' },
  'faq.q': { label: 'Question' },
  'faq.a': { label: 'Answer' },
  // 11 Sources
  sources: { label: 'Sources', dbName: 'sp_src', description: 'Sources listed at the bottom of the data section.' },
  'sources.label': { label: 'Source name' },
  'sources.url': { label: 'Link', description: 'A full https:// address.' },
  // 12 Campaign and AI
  campaign: { label: 'Campaign block', description: 'The "run it alone or in a 360 campaign" section. Edit the text only; each row is tied to a service.' },
  'campaign.fedBy': { label: 'Fed by', dbName: 'sp_fed', description: 'What other services give this one. Do not reorder or delete rows.', extra: { admin: { description: 'What other services give this one. Do not reorder or delete rows.', isSortable: false, initCollapsed: true, components: { RowLabel: '/cms/admin/RowLabel#RowLabel' } } } },
  'campaign.feeds': { label: 'Feeds', dbName: 'sp_feeds', description: 'What this service gives other services. Do not reorder or delete rows.', extra: { admin: { description: 'What this service gives other services. Do not reorder or delete rows.', isSortable: false, initCollapsed: true, components: { RowLabel: '/cms/admin/RowLabel#RowLabel' } } } },
  'campaign.fedBy.k': { ...code('Service'), type: 'select', options: [...ALL, 'wa', 'strategy', 'report'] },
  'campaign.feeds.k': { ...code('Service'), type: 'select', options: [...ALL, 'wa', 'strategy', 'report'] },
  'campaign.fedBy.text': { label: 'Text' },
  'campaign.feeds.text': { label: 'Text' },
  'campaign.fedBy.gate': { ...code('Owner gate', 'The row shows only when the owner confirmed it. Set in code.'), type: 'select', options: ['K1', 'K5', 'K6', 'K11'] },
  'campaign.feeds.gate': { ...code('Owner gate', 'The row shows only when the owner confirmed it. Set in code.'), type: 'select', options: ['K1', 'K5', 'K6', 'K11'] },
  'campaign.feeds.fallback': { label: 'Text while the gate is not confirmed' },
  'campaign.fedBy.fallback': { label: 'Text while the gate is not confirmed' },
  ai: { label: 'How this feeds AI search', description: 'One or two sentences. Shown in the campaign block and on the home page.' },
}

// ── which services have which field (from the defaults), to hide the rest ──
const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)
const keysAt = new Map<string, Set<string>>()
const mark = (p: string, key: string) => keysAt.set(p, (keysAt.get(p) ?? new Set()).add(key))
function walk(v: unknown, p: string, key: string) {
  if (Array.isArray(v)) {
    for (const x of v) {
      if (typeof x === 'string') mark(`${p}.text`, key)
      else walk(x, p, key)
    }
  } else if (isObj(v)) {
    for (const [k, x] of Object.entries(v)) {
      if (x === null || x === undefined) continue
      const q = p ? `${p}.${k}` : k
      mark(q, key)
      walk(x, q, key)
    }
  }
}
DEFS.forEach((d, i) => {
  const { id, en } = defaultOf(d)
  walk(id, '', ALL[i])
  walk(en, '', ALL[i])
})
// SERVICES order must match DEFS order
if (ALL.join() !== 'seo,localseo,ads,social,creative,website,ai') throw new Error('service-pages: SERVICES order changed, update DEFS')

type AnyField = Field & { admin?: Record<string, unknown>; fields?: AnyField[]; name?: string; label?: unknown }
const only = (keys: Set<string>) => (data: Record<string, unknown>) => keys.has(String(data?.key))

/** Conditions on fields only some services have; rowKey last in every row; recurse. */
function arrange(fields: AnyField[], prefix: string, parent: Set<string>) {
  for (const f of fields) {
    if (!f.name) continue
    const p = prefix ? `${prefix}.${f.name === 'rowKey' ? 'id' : f.name}` : f.name
    const set = keysAt.get(p) ?? parent
    if (set.size < parent.size) f.admin = { ...f.admin, condition: only(set) }
    if (f.fields) {
      f.fields.sort((a, b) => Number(a.name === 'rowKey') - Number(b.name === 'rowKey'))
      arrange(f.fields, p, set)
    }
  }
}

const generated = fieldsFrom(DEFS, ov, true) as AnyField[]
arrange(generated, '', new Set(ALL))
const byName = new Map(generated.map((f) => [f.name, f]))

function section(label: string, description: string, names: string[], open = false): AnyField | null {
  const fields = names.map((n) => byName.get(n)).filter((f): f is AnyField => !!f)
  if (!fields.length) return null
  if (fields.length === 1 && fields[0].type === 'group') fields[0].label = false as never
  const keys = new Set(fields.flatMap((f) => [...(keysAt.get(f.name!) ?? ALL)]))
  return {
    type: 'collapsible', label, fields,
    admin: { description, initCollapsed: !open, ...(keys.size < ALL.length && { condition: only(keys) }) },
  } as AnyField
}

const contentFields = [
  section('1 · Hero', 'The answer under the page heading and the ticks under the buttons.', ['answer', 'trust'], true),
  section('2 · Highlights band', 'The facts strip under the hero.', ['highlights']),
  section('3 · USP cards', 'Heading and cards after the highlights.', ['usp']),
  section("4 · What's included", 'Tabs with the items of the service.', ['included']),
  section('5 · Page-specific extras', 'Only on some pages: the SEO AI page sections and the Ads lead line.', ['showcase', 'aiPage']),
  section('6 · Work steps', 'The "what we do" list.', ['work']),
  section('7 · Pricing', 'Plans, modules or project types, add-ons and the quote builder text. Prices shown in the menu and services table are on the Page tab.', ['pricing']),
  section('8 · Process', 'Show or hide the 5-step process section after the prices.', ['process']),
  section('9 · Data & sources (stats)', 'The stats under "Data & sources".', ['stats']),
  section('10 · FAQ', 'Questions and answers.', ['faq']),
  section('11 · Sources', 'Source links.', ['sources']),
  section('12 · Campaign & AI', 'The "run it alone or in a 360 campaign" section and the AI search line.', ['campaign', 'ai']),
].filter((f): f is AnyField => !!f)

// every generated field must be placed in a section
const placed = new Set(contentFields.flatMap((c) => (c.fields ?? []).map((f) => f.name)))
for (const f of generated) if (!placed.has(f.name)) throw new Error(`service-pages: field "${f.name}" is in no Content section`)

export const ServicePages = keyedCollection({
  slug: 'service-pages',
  singular: 'Service page',
  plural: 'Service pages',
  group: 'Services',
  description: 'One document per service page. Prices, names and texts here update the menu, the services table and the page itself.',
  keys: SERVICES.map((s) => ({ key: s.key, title: s.name.id, path: s.path, seo: seoOf(s) })),
  tabs: [
    {
      name: 'basics',
      label: 'Page',
      description: 'Name, one-liner and price appear in the menu, the services table and the page hero. Title and description are in the SEO tab.',
      defs: SERVICES.map((s) => {
        const { name, line, h1, price, quote, wa } = s
        return { name, line, h1, price, quote, wa }
      }),
      ov: {
        name: { label: 'Service name', description: 'Used as link text everywhere (menu, table, footer).' },
        line: { label: 'One-line summary', description: 'Services table and menu.' },
        price: { label: 'Price line', description: 'Exactly as shown, e.g. "Rp 8 · 10 · 15 Juta/bulan". Empty = custom quote (the line below is shown instead).' },
        quote: { label: 'Custom quote line', description: 'Shown when the price line is empty.' },
        wa: { description: 'Pre-filled text when a visitor taps WhatsApp on this page.' },
      },
    },
    {
      name: 'content',
      label: 'Content',
      description: 'The whole page body, written per language: switch the language with the picker at the top. Sections follow the order of the page.',
      rootLocalized: true,
      fields: contentFields as Field[],
    },
  ],
})
