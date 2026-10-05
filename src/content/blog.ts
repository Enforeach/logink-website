// Blog hub, category and post copy (BUILD §3.9 Blog). Plain data, no JSX. Post text itself is CMS-owned.
import type { L, Locale } from '@/lib/services'

export const BLOG = {
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
  backToBlog: { id: 'Kembali ke semua artikel', en: 'Back to all articles' },
  by: { id: 'Oleh', en: 'By' },
  published: { id: 'Terbit', en: 'Published' },
  summary: { id: 'Ringkasan', en: 'Key takeaway' },
  sources: { id: 'Sumber', en: 'Sources' },
  sourcesNote: { id: 'Tautan luar yang dikutip di artikel ini.', en: 'External links cited in this article.' },
  author: { id: 'Penulis', en: 'Author' },
  authorLine: { id: 'Menulis untuk blog Logink.', en: 'Writes for the Logink blog.' },
  related: { id: 'Artikel terkait', en: 'Related articles' },
  share: { id: 'Bagikan', en: 'Share' },
  copy: { id: 'Salin tautan', en: 'Copy link' },
  copied: { id: 'Tautan tersalin', en: 'Link copied' },
  railEyebrow: { id: 'Layanan terkait', en: 'Related service' },
  railOpen: { id: 'Buka halaman layanan', en: 'Open the service page' },
  rail360: { id: 'Atau jalankan bersama kanal lain dalam Kampanye 360°', en: 'Or run it with other channels in a 360° campaign' },
  crossHeading: { id: 'Layanan di balik artikel ini', en: 'The service behind this article' },
  catNav: { id: 'Kategori blog', en: 'Blog categories' },
  catService: { id: 'Layanan terkait:', en: 'Related service:' },
} satisfies Record<string, L>

export const minRead = (n: number, l: Locale) => (l === 'id' ? `${n} menit baca` : `${n} min read`)
export const countLabel = (n: number, l: Locale) => (l === 'id' ? `${n} artikel` : `${n} ${n === 1 ? 'article' : 'articles'}`)
export const catH1 = (name: string, l: Locale) => (l === 'id' ? `Artikel ${name}` : `${name} Articles`)
export const catTitle = (name: string, l: Locale) =>
  l === 'id' ? `Artikel ${name}: Panduan & Insight | Logink` : `${name} Articles & Guides | Logink`
export const catDescFallback = (name: string, l: Locale) =>
  l === 'id' ? `Kumpulan artikel ${name} dari blog Logink: panduan praktis yang bisa langsung diterapkan.` : `${name} articles from the Logink blog: practical guides you can apply right away.`
