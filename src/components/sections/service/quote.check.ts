// pnpm exec tsx src/components/sections/service/quote.check.ts
// Proves the moved builders give byte-identical prefills to the legacy SocialPricing.tsx (EN) and
// CreativePricing.tsx (ID) for the same inputs. The legacy expressions below are copied verbatim.
import assert from 'node:assert/strict'
import { creativeMessage, socialMessage, type SocialState } from './quote'

// ── legacy SocialPricing.tsx (state shape + waMessage, decoded) ──
type Org = { selected: boolean; instagram: boolean; tiktok: boolean; facebook: boolean; postsPerMonth: number | 'custom' | string }
function legacySocial(org: Org, tiktok: { selected: boolean; videosPerMonth: number | string }, linkedin: { selected: boolean; postsPerMonth: number | string; profilesManaged: number | string }) {
  const selectedPlatforms = [org.instagram && 'Instagram', org.tiktok && 'TikTok', org.facebook && 'Facebook'].filter(Boolean)
  return `Hi Logink, I'm interested in Social Media Management: ${[
    org.selected && `Organic Social (${selectedPlatforms.join(' + ')}, ${org.postsPerMonth} posts/mo)`,
    tiktok.selected && `TikTok Strategy (${tiktok.videosPerMonth} videos/mo)`,
    linkedin.selected && `LinkedIn Management (${linkedin.postsPerMonth} posts/mo, ${linkedin.profilesManaged} profiles)`,
  ]
    .filter(Boolean)
    .join(', ')}. Can you send me a custom quote?`
}

// ── legacy CreativePricing.tsx (ID copy; names = CREATIVE_DELIVERABLES item names) ──
function legacyCreative(design: string[], video: string[], copyN: string[], addonNames: string[], engagementName: string) {
  const copy = { waPrefix: 'Halo Logink! Saya tertarik dengan Creative Services:\n', waType: 'Tipe' }
  const selectedDesign = design.map((n) => n.split(' (')[0])
  const selectedVideo = video.map((n) => n.split(' (')[0])
  const selectedCopy = copyN.map((n) => n.split(' (')[0])
  const selectedAddons = addonNames.map((n) => n.split(' & ')[0])
  return (
    `${copy.waPrefix}` +
    (selectedDesign.length ? `Design: ${selectedDesign.join(', ')}\n` : '') +
    (selectedVideo.length ? `Video: ${selectedVideo.join(', ')}\n` : '') +
    (selectedCopy.length ? `Copy: ${selectedCopy.join(', ')}\n` : '') +
    (selectedAddons.length ? `Add-ons: ${selectedAddons.join(', ')}\n` : '') +
    (engagementName ? `${copy.waType}: ${engagementName}` : '')
  )
}

let n = 0
const bools = [true, false]
for (const org of bools) for (const tt of bools) for (const li of bools) for (const fb of bools) for (const posts of ['12', '20', 'custom']) {
  const s: SocialState = { org, instagram: true, tiktok: !fb, facebook: fb, postsPerMonth: posts, tt, videosPerMonth: '8', li, liPosts: '4', liProfiles: 'custom' }
  const want = !org && !tt && !li ? null
    : legacySocial({ selected: org, instagram: true, tiktok: !fb, facebook: fb, postsPerMonth: posts === 'custom' ? 'Custom' : posts },
      { selected: tt, videosPerMonth: 8 }, { selected: li, postsPerMonth: 4, profilesManaged: 'Custom' })
  assert.equal(socialMessage(s, 'en'), want, `social ${JSON.stringify(s)}`)
  if (want) assert.match(socialMessage(s, 'id')!, /^Halo Logink, saya tertarik dengan Social Media Management: .+\. Bisa kirimkan penawaran kustom\?$/)
  n++
}

const D = ['Template Social Media (IG feed, story, cover)', 'Key Visual Kampanye']
const V = ['Reels / TikTok (Short-form)']
const C = ['Ad Copy (Google, Meta, TikTok)', 'Landing Page Copy']
const A = ['Fotografi Produk & Lifestyle']
for (const d of [[], D]) for (const v of [[], V]) for (const c of [[], C]) for (const a of [[], A]) for (const t of ['', 'Retainer bulanan']) {
  const want = d.length + v.length + c.length + a.length === 0 ? null : legacyCreative(d, v, c, a, t)
  assert.equal(creativeMessage({ design: d, video: v, copy: c, addons: a, type: t }, 'id'), want, `creative ${d}|${v}|${c}|${a}|${t}`)
  n++
}
console.log(`quote.check: ${n} cases, byte-identical to the legacy builders`)
