// Fixed labels of the service template (BUILD §3.8 headings, §11 6.1). `{name}` = the registry name.
// Chrome labels (Diperbarui, Minta Penawaran, Beranda…) stay in components/ds/strings.ts.
import type { L, Locale } from '@/lib/services'

export const TPL = {
  answer: { id: 'Jawaban singkat', en: 'Short answer' },
  facts: { id: 'Ringkasan fakta', en: 'Key facts' },
  priceRow: { id: 'Harga', en: 'Price' },
  campaign: { id: 'Jalankan sendiri, atau sebagai bagian dari Kampanye 360°', en: 'Run it alone, or as part of a 360° campaign' },
  fedBy: { id: 'Diisi oleh', en: 'Fed by' },
  feeds: { id: 'Mengisi', en: 'Feeds' },
  wa: { id: 'WhatsApp', en: 'WhatsApp' },
  strategy: { id: 'Strategi kampanye', en: 'Campaign strategy' },
  work: { id: 'Apa yang kami kerjakan', en: 'What we do' },
  pricing: { id: 'Paket & harga {name}', en: '{name} plans & pricing' },
  choose: { id: 'Pilih {tier}', en: 'Choose {tier}' },
  addons: { id: 'Add-on', en: 'Add-ons' },
  proof: { id: 'Bukti & data', en: 'Proof & data' },
  noCase: { id: 'Belum ada studi kasus publik untuk layanan ini.', en: 'There is no public case study for this service yet.' },
  process: { id: 'Proses', en: 'Process' },
  ai: { id: 'Siap untuk AI search', en: 'Ready for AI search' },
  aiMore: { id: 'Lebih dalam:', en: 'Going further:' },
  faq: { id: 'Tanya jawab seputar {name}', en: '{name}: questions and answers' },
  sources: { id: 'Sumber', en: 'Sources' },
  pairs: { id: 'Cocok dikombinasikan dengan', en: 'Pairs well with' },
} satisfies Record<string, L>

/** TPL string with {name}/{tier} filled. */
export const tpl = (k: keyof typeof TPL, l: Locale, v: Record<string, string> = {}) =>
  TPL[k][l].replace(/\{(\w+)\}/g, (_, x: string) => v[x] ?? '')
