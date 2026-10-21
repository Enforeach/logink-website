// Blog hub, category and post copy (BUILD §3.9 Blog). Plain data, no JSX. Post text itself is CMS-owned.
// CMS: Pages → Blog page. Texts that need a number or a name are editable templates with {placeholders}; the
// functions below keep their old signatures and fill the templates.
import type { L, Locale } from '@/lib/services'
import { live } from '@/cms/store'
import { fmt } from '@/cms/merge'
import { view } from '@/cms/view'

const HOME = live('blog-page', 'home', {
  // soft-modern pass: one sentence
  lede: {
    id: 'Panduan praktis tentang SEO, Local SEO, social media, iklan, website, dan pencarian AI, dengan langkah yang bisa langsung Anda coba.',
    en: 'Practical guides on SEO, Local SEO, social media, ads, websites and AI search, with steps you can try right away.',
  },
  latest: { id: 'Artikel terbaru', en: 'Latest article' },
  more: { id: 'Semua artikel', en: 'All articles' },
  categories: { id: 'Kategori', en: 'Categories' },
  allCats: { id: 'Semua', en: 'All' },
  empty: { id: 'Belum ada artikel di sini. Artikel baru terbit di halaman Blog.', en: 'No articles here yet. New articles appear on the Blog page.' },
} satisfies Record<string, L>)

const CATS = live('blog-page', 'categories', {
  backToBlog: { id: 'Kembali ke semua artikel', en: 'Back to all articles' },
  catNav: { id: 'Kategori blog', en: 'Blog categories' },
  catService: { id: 'Layanan terkait:', en: 'Related service:' },
  // templates: {n} = number of articles, {name} = the category name
  countOne: { id: '{n} artikel', en: '{n} article' },
  countMany: { id: '{n} artikel', en: '{n} articles' },
  h1Tpl: { id: 'Artikel {name}', en: '{name} Articles' },
  titleTpl: { id: 'Artikel {name}: Panduan & Insight | Logink', en: '{name} Articles & Guides | Logink' },
  descTpl: {
    id: 'Kumpulan artikel {name} dari blog Logink: panduan praktis yang bisa langsung diterapkan.',
    en: '{name} articles from the Logink blog: practical guides you can apply right away.',
  },
} satisfies Record<string, L>)

const LABELS = live('blog-page', 'labels', {
  by: { id: 'Oleh', en: 'By' },
  published: { id: 'Terbit', en: 'Published' },
  readTime: { id: 'Waktu baca', en: 'Reading time' },
  // template: {n} = minutes
  minReadTpl: { id: '{n} menit baca', en: '{n} min read' },
  summary: { id: 'Ringkasan', en: 'Key takeaway' },
  sources: { id: 'Sumber', en: 'Sources' },
  sourcesNote: { id: 'Tautan luar yang dikutip di artikel ini.', en: 'External links cited in this article.' },
  author: { id: 'Penulis', en: 'Author' },
  authorLine: { id: 'Menulis untuk blog Logink.', en: 'Writes for the Logink blog.' },
  authorMore: { id: 'Baca artikel lainnya', en: 'Read more articles' },
  related: { id: 'Artikel terkait', en: 'Related articles' },
  share: { id: 'Bagikan', en: 'Share' },
  copy: { id: 'Salin tautan', en: 'Copy link' },
  copied: { id: 'Tautan tersalin', en: 'Link copied' },
  railEyebrow: { id: 'Layanan terkait', en: 'Related service' },
  railOpen: { id: 'Buka halaman layanan', en: 'Open the service page' },
  rail360: { id: 'Atau jalankan bersama kanal lain dalam Kampanye 360°', en: 'Or run it with other channels in a 360° campaign' },
  crossHeading: { id: 'Layanan di balik artikel ini', en: 'The service behind this article' },
  // post conversion pieces (owner 2026-10-05)
  featureEyebrow: { id: 'Butuh bantuan menerapkannya? Tim kami bisa mengerjakannya.', en: 'Need help putting this into practice? Our team can do it.' },
  // template: {service} = the related service's name
  inlineHTpl: { id: 'Mau {service} dikerjakan tim Logink?', en: 'Want the Logink team to handle {service}?' },
  inlineP: { id: 'Ceritakan kondisi bisnis Anda lewat WhatsApp. Kami balas dengan langkah pertama yang jelas.', en: "Tell us about your business on WhatsApp. We'll reply with a clear first step." },
} satisfies Record<string, L>)

export const BLOG = view(HOME, CATS, LABELS)

/** Mid-article CTA line with the related service's name. */
export const inlineH = (svcName: string, l: Locale) => fmt(BLOG.inlineHTpl[l], { service: svcName })

export const minRead = (n: number, l: Locale) => fmt(BLOG.minReadTpl[l], { n })
export const countLabel = (n: number, l: Locale) => fmt((n === 1 ? BLOG.countOne : BLOG.countMany)[l], { n })
export const catH1 = (name: string, l: Locale) => fmt(BLOG.h1Tpl[l], { name })
export const catTitle = (name: string, l: Locale) => fmt(BLOG.titleTpl[l], { name })
export const catDescFallback = (name: string, l: Locale) => fmt(BLOG.descTpl[l], { name })
