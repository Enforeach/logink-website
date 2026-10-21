// Portfolio hub + case page UI copy (BUILD §3.9 portfolio, case). Case titles, bodies and numbers are
// CMS-owned (Payload); this file holds only the frame around them.
import type { L } from '@/lib/services'
import { live } from '@/cms/store'
import { fmt } from '@/cms/merge'
import { view } from '@/cms/view'

const LIST = live('portfolio-page', 'list', {
  crumb: { id: 'Portofolio', en: 'Portfolio' } as L,
  word: { id: 'Portofolio', en: 'Portfolio' } as L,
  // soft-modern pass: one line (the 'services without a case' section was cut as a duplicate of the footer/hub)
  // template: {n} = number of case studies
  ledeTpl: {
    id: '{n} studi kasus SEO publik, masing-masing dengan periode dan data Google Search Console.',
    en: '{n} public SEO case studies, each with its period and Google Search Console data.',
  } as L,
  casesH: { id: 'Studi kasus', en: 'Case studies' } as L,
  emptyH: { id: 'Studi kasus sedang diperbarui', en: 'Case studies are being updated' } as L,
  empty: {
    id: 'Belum ada studi kasus yang bisa kami tampilkan dengan data yang lengkap. Sementara itu, inilah cara kami mengukur hasil untuk setiap klien.',
    en: 'There is no case study we can show with complete data right now. Meanwhile, here is how we measure results for every client.',
  } as L,
})
export const PORTFOLIO = view(LIST, { lede: (n: number): L => ({ id: fmt(LIST.ledeTpl.id, { n }), en: fmt(LIST.ledeTpl.en, { n }) }) })

const CASE_LIVE = live('portfolio-page', 'case', {
  sections: {
    ringkasan: { id: 'Ringkasan', en: 'Summary' },
    tantangan: { id: 'Tantangan', en: 'The challenge' },
    strategi: { id: 'Strategi', en: 'The strategy' },
    hasil: { id: 'Hasil', en: 'Results' },
  } satisfies Record<string, L>,
  subnav: { id: 'Bagian studi kasus', en: 'Case study sections' } as L,
  start: { id: 'Mulai proyek', en: 'Start a project' } as L,
  servicesUsed: { id: 'Layanan yang dipakai', en: 'Services used' } as L,
  client: { id: 'Tentang klien', en: 'About the client' } as L,
  timeline: { id: 'Perjalanan proyek', en: 'Project timeline' } as L,
  period: { id: 'Periode', en: 'Period' } as L,
  source: { id: 'Sumber: Google Search Console', en: 'Source: Google Search Console' } as L,
  // templates: {n} = number of months
  monthOne: { id: '{n} bulan', en: '{n} month' } as L,
  monthMany: { id: '{n} bulan', en: '{n} months' } as L,
  within: { id: 'dalam', en: 'in' } as L,
  related: { id: 'Studi kasus lain', en: 'More case studies' } as L,
  pairs: { id: 'Layanan terkait', en: 'Related services' } as L,
  emptyH: { id: 'Detail studi kasus ini sedang diperbarui', en: 'This case study is being updated' } as L,
  empty: {
    id: 'Kami sedang merapikan data studi kasus ini sebelum menampilkannya lagi. Sementara itu, inilah cara kami mengukur hasil untuk setiap klien.',
    en: 'We are tidying this case study’s data before showing it again. Meanwhile, here is how we measure results for every client.',
  } as L,
  ctaH: { id: 'Ingin hasil yang terukur untuk bisnis Anda?', en: 'Want measurable results for your business?' } as L,
  cta: {
    id: 'Ceritakan bisnis Anda lewat WhatsApp. Kami jelaskan apa yang realistis untuk bisnis Anda dan bagaimana kami mengukurnya.',
    en: 'Tell us about your business on WhatsApp. We will explain what is realistic for your business and how we measure it.',
  } as L,
})
export const CASE = view(CASE_LIVE, {
  months: (n: number): L => {
    const t = n === 1 ? CASE_LIVE.monthOne : CASE_LIVE.monthMany
    return { id: fmt(t.id, { n }), en: fmt(t.en, { n }) }
  },
})

// Known CMS metric labels (often English in the ID fields) → locale labels. Unknown labels pass through.
export const METRIC_LABELS: [RegExp, L][] = [
  [/organic\s*click|klik\s*organik/i, { id: 'Klik organik', en: 'Organic clicks' }],
  [/organic\s*traffic|traffic\s*organik/i, { id: 'Traffic organik', en: 'Organic traffic' }],
  [/impression|impresi/i, { id: 'Impresi', en: 'Impressions' }],
  [/avg\.?\s*position|average\s*position|posisi/i, { id: 'Posisi rata-rata', en: 'Average position' }],
  [/quer(y|ies)|kueri/i, { id: 'Kueri yang tertangkap', en: 'Queries captured' }],
]

// Known CMS client-snapshot fact labels (English in the CMS) → locale labels.
export const FACT_LABELS: [RegExp, L][] = [
  [/^business type$/i, { id: 'Jenis bisnis', en: 'Business type' }],
  [/^event type$/i, { id: 'Jenis event', en: 'Event type' }],
  [/^location$/i, { id: 'Lokasi', en: 'Location' }],
  [/^services?$/i, { id: 'Layanan', en: 'Services' }],
  [/^timeline$/i, { id: 'Periode', en: 'Timeline' }],
  [/^target market$/i, { id: 'Target pasar', en: 'Target market' }],
  [/^website (re)?launched$/i, { id: 'Website diluncurkan', en: 'Website launched' }],
]
