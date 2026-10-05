// Kampanye 360° data (BUILD §11; owner: Service, the only owner). Plain data, no JSX. Read by
// instruments/CampaignMap (Instruments), sections/home/Campaign360 (Home), sections/hub/Campaign360Offer (Hubs)
// and sections/service/LoopPosition (Service). The 360° WhatsApp prefill is WA_PATTERNS.campaign360 (registry).
import type { L, Locale, SvcKey } from '@/lib/services'

/** Owner confirmations K1–K6, K11 (§3.6). All false at launch, so every gated phrase ships as its fallback. */
export const CAMPAIGN_CONFIRMED = { K1: false, K2: false, K3: false, K4: false, K5: false, K6: false, K11: false }
export type Gate = keyof typeof CAMPAIGN_CONFIRMED
export const confirmed = (g?: Gate) => !g || CAMPAIGN_CONFIRMED[g]
/** A K-gated phrase: the confirmed text once the owner says yes, else the fallback. */
export const gated = (g: Gate, yes: L, no: L): L => (CAMPAIGN_CONFIRMED[g] ? yes : no)

export type NodeKey = SvcKey | 'wa'
export const CENTER: L = { id: 'Kampanye 360°', en: '360° campaign' }
// Ring position = the registry hour of each service; WhatsApp sits at 21.30.
export const NODES: { k: NodeKey; hour: string; label: L }[] = [
  { k: 'seo', hour: '07.00', label: { id: 'SEO', en: 'SEO' } },
  { k: 'localseo', hour: '08.30', label: { id: 'Local SEO', en: 'Local SEO' } },
  { k: 'social', hour: '12.40', label: { id: 'Social', en: 'Social' } },
  { k: 'creative', hour: '15.10', label: { id: 'Kreatif', en: 'Creative' } },
  { k: 'website', hour: '16.30', label: { id: 'Website', en: 'Website' } },
  { k: 'ai', hour: '18.05', label: { id: 'SEO AI', en: 'AI search' } },
  { k: 'ads', hour: '20.30', label: { id: 'Iklan', en: 'Ads' } },
  { k: 'wa', hour: '21.30', label: { id: 'WhatsApp', en: 'WhatsApp' } },
]

/** §3.3. `ok: false` edges render nowhere until their gate is confirmed. `n` is a content key only (never printed). */
export type Edge = { n: number; from: NodeKey; to: NodeKey | 'report'; label: L; ok: boolean; gate?: Gate }
export const EDGES: Edge[] = [
  { n: 1, from: 'seo', to: 'ads', label: { id: 'kata kunci', en: 'keywords' }, ok: true },
  { n: 2, from: 'seo', to: 'ai', label: { id: 'konten & schema', en: 'content & schema' }, ok: true },
  { n: 3, from: 'website', to: 'seo', label: { id: 'fondasi teknis', en: 'technical base' }, ok: true },
  { n: 4, from: 'localseo', to: 'ai', label: { id: 'data entitas', en: 'entity data' }, ok: true },
  { n: 5, from: 'localseo', to: 'wa', label: { id: 'tautan WhatsApp di profil Google', en: 'WhatsApp link on your Google profile' }, ok: true },
  { n: 6, from: 'creative', to: 'social', label: { id: 'visual & video', en: 'visuals & video' }, ok: true },
  { n: 7, from: 'creative', to: 'ads', label: { id: 'materi & copy iklan', en: 'ad creative & copy' }, ok: true },
  { n: 8, from: 'creative', to: 'website', label: { id: 'copy & visual halaman', en: 'page copy & visuals' }, ok: true },
  { n: 9, from: 'creative', to: 'localseo', label: { id: 'foto untuk profil', en: 'profile photos' }, ok: true },
  { n: 10, from: 'social', to: 'seo', label: { id: 'ide konten', en: 'content ideas' }, ok: true },
  { n: 11, from: 'social', to: 'ai', label: { id: 'sebutan brand', en: 'brand mentions' }, ok: true },
  { n: 12, from: 'website', to: 'ads', label: { id: 'pixel & audiens', en: 'pixel & audiences' }, ok: true },
  { n: 13, from: 'ads', to: 'website', label: { id: 'trafik ke landing page', en: 'traffic to landing pages' }, ok: true },
  { n: 14, from: 'website', to: 'ai', label: { id: 'situs terbaca mesin', en: 'machine-readable site' }, ok: true },
  { n: 15, from: 'website', to: 'wa', label: { id: 'tombol chat', en: 'chat button' }, ok: true },
  { n: 16, from: 'ads', to: 'wa', label: { id: 'click-to-WhatsApp', en: 'click-to-WhatsApp' }, ok: false, gate: 'K11' },
  { n: 17, from: 'ads', to: 'seo', label: { id: 'data search term', en: 'search-term data' }, ok: false, gate: 'K5' },
  { n: 18, from: 'social', to: 'ads', label: { id: 'audiens yang berinteraksi', en: 'engaged audiences' }, ok: false, gate: 'K6' },
  { n: 19, from: 'wa', to: 'report', label: { id: 'klik per kanal', en: 'clicks by channel' }, ok: false, gate: 'K4' },
]
export const liveEdges = () => EDGES.filter((e) => e.ok || (e.gate ? CAMPAIGN_CONFIRMED[e.gate] : false))

// Spokes: centre → every node outward, every node → report inward (§3.3).
export const SPOKES = {
  out: { id: 'satu strategi, satu ide', en: 'one strategy, one idea' } as L,
  in: gated('K1', { id: 'data ke satu laporan', en: 'data to one report' }, { id: 'data ke review bulanan', en: 'data to the monthly review' }),
}

/** §4.5: the four pillars (home 05 and hub map them to their own <dl>). Pillar 4 ships its K1 fallback. */
export const PILLARS: { dt: L; dd: L }[] = [
  {
    dt: { id: 'Satu strategi, satu ide', en: 'One strategy, one idea' },
    dd: {
      id: 'Roadmap 90 hari untuk semua kanal disusun di minggu pertama, lalu satu ide kampanye diadaptasi per kanal: copy untuk search, visual untuk feed, video vertikal untuk TikTok.',
      en: 'A 90-day roadmap for every channel is set in the first week, then one campaign idea is adapted per channel: copy for search, visuals for feeds, vertical video for TikTok.',
    },
  },
  {
    dt: { id: 'Kanal saling mengisi', en: 'Channels feed each other' },
    dd: {
      id: 'Kata kunci SEO menajamkan iklan, satu sesi syuting mengisi social dan iklan, data profil Google membantu jawaban AI, dan pengunjung website bisa disapa lagi lewat retargeting.',
      en: 'SEO keywords sharpen your ads, one shoot fills social and ads, Google profile data helps AI answers, and website visitors can be reached again through retargeting.',
    },
  },
  {
    dt: { id: 'Satu data', en: 'One data layer' },
    dd: {
      id: 'GA4, Search Console, pixel iklan, insight Google Business, dan klik WhatsApp dibaca bersama. Akun iklan, GA4, dan Search Console tetap milik Anda.',
      en: 'GA4, Search Console, ad pixels, Google Business insights and WhatsApp clicks are read together. Ad accounts, GA4 and Search Console stay yours.',
    },
  },
  {
    dt: gated('K1', { id: 'Satu laporan, satu tim', en: 'One report, one team' }, { id: 'Satu review, satu tim', en: 'One review, one team' }),
    dd: gated('K1',
      { id: 'Satu laporan bulanan dan satu sesi review bersama tim yang menjalankan semua kanal.', en: 'One monthly report and one review session with the team that runs every channel.' },
      { id: 'Laporan setiap layanan bulanan, dibahas dalam satu sesi review bulanan bersama tim yang menjalankan semua kanal.', en: "Each monthly service's report, discussed in one monthly review with the team that runs every channel." }),
  },
]

/** §6.1: the service-page note under 'Posisi dalam kampanye 360°'. `{name}` = registry name; svc.price picks priced/quoted. */
export const NOTE = {
  title: { id: 'Bisa sendiri, lebih kuat terhubung', en: 'Works alone, stronger connected' } as L,
  priced: { id: '{name} bisa diambil sendiri dengan harga di halaman ini.', en: '{name} can be hired on its own at the prices on this page.' } as L,
  quoted: { id: '{name} bisa diambil sendiri dengan proposal kustom dalam 24 jam.', en: '{name} can be hired on its own with a custom proposal within 24 hours.' } as L,
  rest: gated('K1',
    { id: 'Dalam Kampanye 360°, layanan ini bekerja dengan kanal lain di bawah satu strategi, satu data, dan satu laporan.', en: 'In a 360° campaign it works with the other channels under one strategy, one data layer and one report.' },
    { id: 'Dalam Kampanye 360°, layanan ini bekerja dengan kanal lain di bawah satu strategi, satu data, dan satu review bulanan.', en: 'In a 360° campaign it works with the other channels under one strategy, one data layer and one monthly review.' }),
  link: { id: 'Lihat cara kerja Kampanye 360°', en: 'See how a 360° campaign works' } as L,
}

/** §5.7: the fictional example strip (hub only). Always inside MockFrame with EXAMPLE.label. */
export const EXAMPLE = {
  label: { id: 'Contoh kampanye · bukan klien Logink', en: 'Example campaign · not a Logink client' } as L,
  title: { id: 'Kedai Contoh · peluncuran menu es kopi susu gula aren', en: 'Kedai Contoh · launching an iced palm-sugar coffee' } as L,
  idea: { id: 'Satu ide: "Es kopi susu gula aren, antar se-Tebet."', en: 'One idea: "Iced palm-sugar coffee, delivered across Tebet."' } as L,
  lines: [
    { k: 'seo', text: { id: 'Artikel dan halaman menu untuk "kopi susu gula aren dekat Tebet"', en: 'An article and menu page for "kopi susu gula aren dekat Tebet"' } },
    { k: 'localseo', text: { id: 'Google Post menu baru (paket Growth) dan balasan untuk setiap ulasan', en: 'A Google Post for the new menu (Growth plan) and a reply to every review' } },
    { k: 'creative', text: { id: 'Satu sesi foto dan video, dipotong 1:1, 9:16, dan 16:9', en: 'One photo and video shoot, cut 1:1, 9:16 and 16:9' } },
    { k: 'social', text: { id: '3 Reels dan story promo dari sesi yang sama', en: '3 Reels and a promo story from the same shoot' } },
    { k: 'website', text: { id: 'Landing page menu dengan tombol WhatsApp', en: 'A menu landing page with a WhatsApp button' } },
    { k: 'ads', text: { id: 'Iklan search untuk kata kunci SEO yang sama, lalu retargeting pengunjung website', en: 'Search ads on the same SEO keywords, then retargeting of website visitors' } },
    { k: 'ai', text: { id: 'FAQ menu yang mudah dikutip', en: 'A menu FAQ written to be quoted' } },
    { k: 'wa', text: { id: '"Halo, masih buka? Mau pesan 2 kopi susu."', en: '"Halo, masih buka? Mau pesan 2 kopi susu."' } },
  ] as { k: NodeKey; text: L }[],
}

/** §5.8: the SSR table `#koneksi-kanal`. Rows are built from liveEdges(), so gated cells appear when a flag turns true. */
export const STRATEGY: L = { id: 'Strategi kampanye', en: 'Campaign strategy' }
export const REPORT: L = gated('K1', { id: 'Laporan kampanye', en: 'Campaign report' }, { id: 'Laporan bulanan', en: 'Monthly report' })
export type CellItem = { k: NodeKey | 'strategy' | 'report'; label: string } // render: name link (svcHref) + ` (${label})`
type Extra = { k: NodeKey; side: 'fedBy' | 'feeds'; item: { k: 'strategy' | 'report'; label: L }; unless?: Gate }
const EXTRAS: Extra[] = [
  { k: 'creative', side: 'fedBy', item: { k: 'strategy', label: { id: 'satu ide', en: 'one idea' } } },
  { k: 'ai', side: 'feeds', item: { k: 'report', label: { id: 'kutipan dan sebutan AI yang dipantau', en: 'AI citations and mentions tracked' } } },
  { k: 'wa', side: 'feeds', item: { k: 'report', label: { id: 'klik dari website dan iklan', en: 'clicks from the website and ads' } }, unless: 'K4' },
]
export const TABLE = {
  id: 'koneksi-kanal',
  caption: { id: 'Bagaimana kanal saling mengisi dalam Kampanye 360°', en: 'How the channels feed each other in a 360° campaign' } as L,
  head: { id: ['Kanal', 'Menerima dari', 'Memberi ke'], en: ['Channel', 'Fed by', 'Feeds'] } as Record<Locale, string[]>,
  rowNote: {
    social: { id: 'Instagram, TikTok, Facebook, LinkedIn', en: 'Instagram, TikTok, Facebook, LinkedIn' },
    ads: { id: 'Google, Meta, TikTok, Marketplace', en: 'Google, Meta, TikTok, Marketplace' },
  } as Partial<Record<NodeKey, L>>,
  summary: { id: 'Tabel: kanal mana mengisi kanal mana', en: 'Table: which channel feeds which' } as L,
  foot: gated('K1',
    { id: 'Semua kanal menerima satu strategi dan satu ide, dan mengirim datanya ke satu laporan bulanan.', en: 'Every channel receives one strategy and one idea, and sends its data to one monthly report.' },
    { id: 'Semua kanal menerima satu strategi dan satu ide, dan mengirim datanya ke review bulanan bersama tim.', en: 'Every channel receives one strategy and one idea, and sends its data to the monthly review with the team.' }),
}
const ROW_ORDER: NodeKey[] = ['seo', 'localseo', 'social', 'creative', 'website', 'ai', 'ads', 'wa']

/** The table rows (and the map's chords) for a locale: per node, what feeds it and what it feeds. */
export function campaignRows(l: Locale): { k: NodeKey; note?: string; fedBy: CellItem[]; feeds: CellItem[] }[] {
  const edges = liveEdges()
  return ROW_ORDER.map((k) => {
    const extra = (side: Extra['side']) =>
      EXTRAS.filter((x) => x.k === k && x.side === side && !(x.unless && CAMPAIGN_CONFIRMED[x.unless]))
        .map((x) => ({ k: x.item.k, label: x.item.label[l] }))
    return {
      k,
      note: TABLE.rowNote[k]?.[l],
      fedBy: [...extra('fedBy'), ...edges.filter((e) => e.to === k).map((e) => ({ k: e.from, label: e.label[l] }))],
      feeds: [...edges.filter((e) => e.from === k).map((e) => ({ k: e.to, label: e.label[l] })), ...extra('feeds')],
    }
  })
}
