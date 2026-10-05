// About copy: /about + /en/about (BUILD §3.9 about, §11 7.3). Moved from the old about pages, with
// "Lima layanan" → "Enam layanan + SEO AI" and the 360° vocabulary rules (§11 1.3) applied.
// Owner facts not supplied (PT, founding year, street address, GBP, team) are absent: no placeholders.
import type { L } from '@/lib/services'

export const ABOUT = {
  crumb: { id: 'Tentang', en: 'About' } as L,
  word: { id: 'Tentang', en: 'About' } as L,
  factsH: { id: 'Fakta Logink', en: 'Logink facts' } as L,
  facts: {
    name: { id: 'Nama', en: 'Name' },
    city: { id: 'Kota', en: 'City' },
    cityV: { id: 'Jakarta, Indonesia', en: 'Jakarta, Indonesia' },
    services: { id: 'Layanan', en: 'Services' },
    modes: { id: 'Cara bekerja sama', en: 'Ways to work with us' },
    modesV: {
      id: 'Satu layanan dengan harga atau penawarannya sendiri, atau Kampanye 360° lewat proposal kustom.',
      en: 'One service at its own price or quote, or a 360° campaign by custom proposal.',
    },
    lang: { id: 'Bahasa', en: 'Languages' },
    langV: { id: 'Indonesia dan Inggris', en: 'Indonesian and English' },
    wa: { id: 'WhatsApp', en: 'WhatsApp' },
    email: { id: 'Email', en: 'Email' },
    ig: { id: 'Instagram', en: 'Instagram' },
  } satisfies Record<string, L>,
  // owner 2026-10-04: mission, values and "why" said the same things three times; merged into one section
  whyH: { id: 'Kenapa Logink', en: 'Why Logink' } as L,
  mission: {
    id: 'Brand tidak harus memilih antara strategi yang kuat, konten kreatif, dan hasil yang terukur. Anda bisa mendapatkan ketiganya.',
    en: "Brands shouldn't have to choose between strong strategy, creative content and measurable results. You can have all three.",
  } as L,
  why: [
    { t: { id: 'Satu layanan atau 360°', en: 'One service or 360°' }, d: { id: 'Ambil satu layanan, atau biarkan satu tim menjalankan semua kanal yang Anda pilih sebagai satu kampanye.', en: 'Hire one service, or let one team run every channel you choose as one campaign.' } },
    { t: { id: 'Harga yang jelas', en: 'Clear pricing' }, d: { id: 'Harga mulai ada di setiap halaman layanan. Sisanya mendapat proposal dalam 24 jam.', en: 'Starting prices are on every service page. The rest get a proposal within 24 hours.' } },
    { t: { id: 'Dibuat untuk brand Anda', en: 'Made for your brand' }, d: { id: 'Tidak ada konten generik: setiap karya dibuat untuk audiens Anda dan pasar Indonesia.', en: 'No generic content: every piece is made for your audience and the Indonesian market.' } },
    { t: { id: 'Angka yang bisa Anda cek', en: 'Numbers you can check' }, d: { id: 'Kami mengukur leads, penjualan, dan chat. Akun iklan, GA4, dan Search Console tetap milik Anda.', en: 'We measure leads, sales and chats. Ad accounts, GA4 and Search Console stay yours.' } },
  ] as { t: L; d: L }[],
  notH: { id: 'Yang tidak kami janjikan', en: 'What we do not promise' } as L,
  not: [
    { id: 'Posisi pertama di Google dalam waktu tertentu.', en: 'The top position on Google by a set date.' },
    { id: 'Kutipan di ChatGPT atau AI Overview. Kami tidak menjamin kutipan, tetapi kami mengukur progresnya.', en: 'Citations in ChatGPT or AI Overviews. We do not guarantee citations, but we measure progress.' },
    { id: 'Konten yang pasti viral.', en: 'Content that is sure to go viral.' },
    { id: 'Angka yang tidak bisa Anda cek sendiri.', en: 'Numbers you cannot check yourself.' },
  ] as L[],
}
