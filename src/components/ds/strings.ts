// Chrome UI labels (BUILD §3.6). Registry strings (names, prices, ENTITY, ANTI_SCAM…) stay in lib/services.ts.
import type { L, Locale, SvcKey } from '@/lib/services'
import { live } from '@/cms/store'
import { view } from '@/cms/view'

// CMS: Settings > Labels & buttons. T is split across admin tabs (one live() object each); callers keep T.x[l].
const NAV = live('ui-labels', 'nav', {
  services: { id: 'Layanan', en: 'Services' },
  portfolio: { id: 'Portofolio', en: 'Portfolio' },
  blog: { id: 'Blog', en: 'Blog' },
  about: { id: 'Tentang', en: 'About' },
  contact: { id: 'Kontak', en: 'Contact' },
  home: { id: 'Beranda', en: 'Home' },
  menu: { id: 'Menu', en: 'Menu' },
  close: { id: 'Tutup menu', en: 'Close menu' },
  skip: { id: 'Langsung ke konten', en: 'Skip to content' },
  mainNav: { id: 'Navigasi utama', en: 'Main navigation' },
  quick: { id: 'Aksi cepat', en: 'Quick actions' },
  crumbs: { id: 'Jejak halaman', en: 'Breadcrumb' },
  langName: { id: 'Bahasa Indonesia', en: 'English' },
} satisfies Record<string, L>)

const BUTTONS = live('ui-labels', 'buttons', {
  quote: { id: 'Minta Penawaran', en: 'Request a Quote' },
  quoteShort: { id: 'Penawaran', en: 'Quote' },
  wa: { id: 'Chat WhatsApp', en: 'Chat WhatsApp' },
  openService: { id: 'Buka layanan', en: 'Open service' },
  viewCase: { id: 'Lihat studi kasus', en: 'View case study' },
  drag: { id: 'Geser', en: 'Drag' },
  allServices: { id: 'Semua layanan dan harga', en: 'All services and prices' },
} satisfies Record<string, L>)

const PAGE = live('ui-labels', 'pageLabels', {
  updated: { id: 'Diperbarui', en: 'Updated' },
  reviewedBy: { id: 'Ditinjau oleh', en: 'Reviewed by' },
  from: { id: 'Mulai', en: 'From' },
  toc: { id: 'Daftar isi', en: 'Contents' },
  faq: { id: 'Tanya jawab', en: 'Questions and answers' },
  populer: { id: 'Paling populer', en: 'Most popular' },
  contoh: { id: 'Contoh', en: 'Sample' },
  loop: { id: 'Tahap dalam satu hari', en: 'Stage in the day' },
} satisfies Record<string, L>)

// closing band (BUILD section 11 4.8)
const CLOSING = live('ui-labels', 'closing', {
  closingH: { id: 'Satu pesan cukup.', en: 'One message is enough.' },
  closingLede: {
    // owner 2026-10-04 dedupe: no 360 pitch here, the page already made it once
    id: 'Ceritakan bisnis Anda lewat WhatsApp. Kami balas dengan saran yang jujur dan langkah pertama yang jelas.',
    en: "Tell us about your business on WhatsApp. We'll reply with honest advice and a clear first step.",
  },
  ask360: { id: 'Tanya soal Kampanye 360°', en: 'Ask about a 360° campaign' },
} satisfies Record<string, L>)

// 360 mode (BUILD section 11)
const MODE = live('ui-labels', 'campaign', {
  oneService: { id: 'Satu layanan', en: 'One service' },
  every: { id: 'Semua kanal', en: 'Every channel' },
  c360: { id: 'Kampanye 360°', en: '360° campaign' },
  c360Item: { id: 'Kampanye 360° (semua kanal)', en: '360° campaign (every channel)' },
  c360Line: { id: 'Semua kanal yang Anda butuhkan, satu tim, satu kampanye.', en: 'Every channel you need, one team, one campaign.' },
  c360How: { id: 'Cara kerjanya', en: 'How it works' },
  c360Chat: { id: 'Chat soal Kampanye 360°', en: 'Chat about a 360° campaign' },
} satisfies Record<string, L>)

// footer
const FOOTER = live('ui-labels', 'footer', {
  pages: { id: 'Halaman', en: 'Pages' },
  reach: { id: 'Hubungi', en: 'Get in touch' },
  city: { id: 'Jakarta, Indonesia', en: 'Jakarta, Indonesia' },
} satisfies Record<string, L>)

export const T = view(NAV, BUTTONS, PAGE, CLOSING, MODE, FOOTER)

// Service-closing lede (BUILD §11 4.8) with the registry name.

// Stage-strip labels only (in-page #stage anchors, not service links, so short names are fine there).
export const SHORT: Record<SvcKey, L> = live('ui-labels', 'stageNames', {
  seo: { id: 'SEO', en: 'SEO' },
  localseo: { id: 'Local SEO', en: 'Local SEO' },
  ads: { id: 'Iklan', en: 'Ads' },
  social: { id: 'Social media', en: 'Social media' },
  creative: { id: 'Kreatif', en: 'Creative' },
  website: { id: 'Website', en: 'Website' },
  ai: { id: 'SEO AI', en: 'AI search' },
} as Record<SvcKey, L>)

const MONTHS: Record<Locale, string[]> = {
  id: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
}
/** '2026-07-16' → '16 Jul 2026' (fixed, locale-stable, no Intl drift between server and client). */
export const fmtDate = (iso: string, l: Locale) => {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number)
  return `${d} ${MONTHS[l][m - 1]} ${y}`
}
