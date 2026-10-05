// QuoteBuilder message logic (BUILD §3.8 block 07), moved out of the legacy SocialPricing.tsx and
// CreativePricing.tsx. Pure functions: the island (QuoteBuilder.tsx) and quote.check.ts import them.
// The output is the WhatsApp prefill only. There is never a price or a total: every quote is custom.
// Parity (quote.check.ts): EN Social and ID Creative are byte-identical to the legacy builders. Two legacy
// locale bugs are fixed on purpose: Social gets its Indonesian twin (legacy sent English on the ID page) and
// EN Creative uses the EN deliverable names (legacy used the Indonesian names on the EN page).
import type { BuilderGroup } from '@/content/services/types'

type Locale = 'id' | 'en'

export type SocialState = {
  org: boolean; instagram: boolean; tiktok: boolean; facebook: boolean; postsPerMonth: string
  tt: boolean; videosPerMonth: string
  li: boolean; liPosts: string; liProfiles: string
}
export type CreativeState = { design: string[]; video: string[]; copy: string[]; addons: string[]; type: string }

const CUSTOM = { id: 'kustom', en: 'Custom' } // the legacy EN value of the 'Custom' option
const n = (v: string, l: Locale) => (v === 'custom' ? CUSTOM[l] : v)

/** Legacy SocialPricing waMessage (EN verbatim) + its ID twin. null = no module selected. */
export function socialMessage(s: SocialState, l: Locale): string | null {
  if (!s.org && !s.tt && !s.li) return null
  const platforms = [s.instagram && 'Instagram', s.tiktok && 'TikTok', s.facebook && 'Facebook'].filter(Boolean)
  const parts = l === 'en'
    ? [
        s.org && `Organic Social (${platforms.join(' + ')}, ${n(s.postsPerMonth, l)} posts/mo)`,
        s.tt && `TikTok Strategy (${n(s.videosPerMonth, l)} videos/mo)`,
        s.li && `LinkedIn Management (${n(s.liPosts, l)} posts/mo, ${n(s.liProfiles, l)} profiles)`,
      ]
    : [
        s.org && `Organic Social (${platforms.join(' + ')}, ${n(s.postsPerMonth, l)} post/bln)`,
        s.tt && `TikTok Strategy (${n(s.videosPerMonth, l)} video/bln)`,
        s.li && `LinkedIn Management (${n(s.liPosts, l)} post/bln, ${n(s.liProfiles, l)} profil)`,
      ]
  const list = parts.filter(Boolean).join(', ')
  return l === 'en'
    ? `Hi Logink, I'm interested in Social Media Management: ${list}. Can you send me a custom quote?`
    : `Halo Logink, saya tertarik dengan Social Media Management: ${list}. Bisa kirimkan penawaran kustom?`
}

const PREFIX = { id: 'Halo Logink! Saya tertarik dengan Creative Services:\n', en: "Hi Logink! I'm interested in Creative Services:\n" }
const TYPE = { id: 'Tipe', en: 'Type' }

/** Legacy CreativePricing whatsappMsg (verbatim). Names are the visible item names; null = nothing chosen. */
export function creativeMessage(s: CreativeState, l: Locale): string | null {
  const short = (a: string[]) => a.map((x) => x.split(' (')[0])
  const [d, v, c] = [short(s.design), short(s.video), short(s.copy)]
  const a = s.addons.map((x) => x.split(' & ')[0])
  if (d.length + v.length + c.length + a.length === 0) return null // legacy: no CTA until something is picked
  return (
    PREFIX[l] +
    (d.length ? `Design: ${d.join(', ')}\n` : '') +
    (v.length ? `Video: ${v.join(', ')}\n` : '') +
    (c.length ? `Copy: ${c.join(', ')}\n` : '') +
    (a.length ? `Add-ons: ${a.join(', ')}\n` : '') +
    (s.type ? `${TYPE[l]}: ${s.type}` : '')
  )
}

export type Form = { on: Record<string, boolean>; sel: Record<string, string> }

/** The island's form state → the builder state → the prefill. Group/item ids are the legacy data ids. */
export function message(kind: 'social' | 'creative', l: Locale, f: Form, groups: BuilderGroup[]): string | null {
  if (kind === 'social') {
    return socialMessage({
      org: !!f.on['organic-social'], instagram: !!f.on.instagram, tiktok: !!f.on.tiktok, facebook: !!f.on.facebook,
      postsPerMonth: f.sel.orgPosts, tt: !!f.on['tiktok-strategy'], videosPerMonth: f.sel.videos,
      li: !!f.on['linkedin-b2b'], liPosts: f.sel.liPosts, liProfiles: f.sel.liProfiles,
    }, l)
  }
  const names = (g: string) => (groups.find((x) => x.id === g)?.items ?? []).filter((i) => f.on[i.id]).map((i) => i.label)
  const type = (groups.find((x) => x.id === 'type')?.items ?? []).find((i) => f.sel.type === i.id)?.label ?? ''
  return creativeMessage({ design: names('design'), video: names('video'), copy: names('copy'), addons: names('addons'), type }, l)
}

/** Initial form state from the copy (`on` items, select defaults). */
export function initialForm(groups: BuilderGroup[]): Form {
  const on: Record<string, boolean> = {}
  const sel: Record<string, string> = {}
  for (const g of groups) {
    for (const i of g.items ?? []) if (i.on) on[i.id] = true
    for (const s of g.selects ?? []) sel[s.id] = s.v
  }
  return { on, sel }
}
