// Local SEO / Google Maps service: content for both locales.
// Accent: teal #0D9488 (location/maps). Two annual-billed packages that both
// include a simple local landing page + Google Business Profile setup.

import type { Locale } from '@/lib/services'
import { liveDoc } from '@/cms/store'
import type { ServiceContent } from './types'

export const LOCALSEO_ACCENT = '#0D9488'

// ─── Pricing (2 tiers, billed yearly) ─────────────────────────────────────────
export const LOCALSEO_PRICING_TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Rp 1 Juta',
    priceValue: 1000000,
    period: '/bulan',
    billing: 'Ditagih tahunan (Rp 12 Juta/tahun)',
    bestFor: 'Bisnis 1 lokasi yang ingin tampil di Google Maps',
    isPopular: false,
    color: '#0D9488',
    features: [
      'Setup & optimasi Google Business Profile',
      'Landing page lokal sederhana (1 halaman)',
      'Riset keyword "near me" & pencarian lokal',
      'Optimasi radius pencarian hingga 20 km',
      'Konsistensi NAP & citation dasar',
      'Setup Google Maps, foto & jam operasional',
      'Laporan performa bulanan',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 'Rp 2 Juta',
    priceValue: 2000000,
    period: '/bulan',
    billing: 'Ditagih tahunan (Rp 24 Juta/tahun)',
    bestFor: 'Bisnis yang ingin mendominasi map pack & review',
    isPopular: true,
    color: '#0EA5A4',
    features: [
      'Semua yang ada di Starter',
      'Optimasi GBP lanjutan (produk, layanan, Q&A)',
      'Manajemen & strategi mendapatkan review',
      'Google Posts mingguan + foto geo-tag',
      'Local schema markup (LocalBusiness)',
      'Tracking ranking map pack + kompetitor',
      'Optimasi hingga 3 area layanan',
    ],
  },
] as const

export const LOCALSEO_PRICING_TIERS_EN = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'IDR 1 Mio',
    priceValue: 1000000,
    period: '/month',
    billing: 'Billed annually (IDR 12 Mio/year)',
    bestFor: 'Single-location businesses getting on Google Maps',
    isPopular: false,
    color: '#0D9488',
    features: [
      'Google Business Profile setup & optimization',
      'Simple local landing page (1 page)',
      '"Near me" & local keyword research',
      'Search radius optimization up to 20 km',
      'Basic NAP consistency & citations',
      'Google Maps setup, photos & hours',
      'Monthly performance report',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 'IDR 2 Mio',
    priceValue: 2000000,
    period: '/month',
    billing: 'Billed annually (IDR 24 Mio/year)',
    bestFor: 'Businesses aiming to dominate the map pack & reviews',
    isPopular: true,
    color: '#0EA5A4',
    features: [
      'Everything in Starter',
      'Advanced GBP optimization (products, services, Q&A)',
      'Review generation & management strategy',
      'Weekly Google Posts + geo-tagged photos',
      'Local schema markup (LocalBusiness)',
      'Map pack ranking + competitor tracking',
      'Up to 3 service areas optimized',
    ],
  },
] as const

export const LOCALSEO_ADDONS = [
  {
    name: 'Lokasi Tambahan',
    description: 'Setiap outlet atau cabang tambahan dengan GBP dan landing page lokalnya sendiri.',
    price: 'Mulai dari Rp 750 Ribu/lokasi/bulan',
  },
  {
    name: 'Foto & Video Lokasi',
    description: 'Sesi foto profesional interior, eksterior, dan tim untuk profil Google Maps yang meyakinkan.',
    price: 'Mulai dari Rp 2 Juta/lokasi',
  },
] as const

export const LOCALSEO_ADDONS_EN = [
  {
    name: 'Additional Location',
    description: 'Each extra outlet or branch with its own GBP and local landing page.',
    price: 'Starting from IDR 750K/location/month',
  },
  {
    name: 'On-Location Photo & Video',
    description: 'Professional interior, exterior, and team shoot for a convincing Google Maps profile.',
    price: 'Starting from IDR 2 Mio/location',
  },
] as const

// ─── What's included (tabbed features) ────────────────────────────────────────
export const LOCALSEO_FEATURES_TABS = [
  {
    id: 'gbp',
    label: 'Google Business Profile',
    icon: 'MapPin',
    features: [
      { title: 'Setup & Verifikasi Lengkap', desc: 'Kami buat atau ambil alih profil Google Business Anda, verifikasi kepemilikan, pilih kategori yang tepat, dan lengkapi setiap detail yang dilihat calon pelanggan.', badge: null },
      { title: 'Optimasi Profil Menyeluruh', desc: 'Deskripsi bisnis kaya keyword lokal, jam operasional, atribut, area layanan, foto, dan tautan langsung ke WhatsApp, telepon, dan rute.', badge: null },
      { title: 'Produk, Layanan & Q&A', desc: 'Katalog produk/layanan langsung di profil, plus pertanyaan-jawaban yang sering ditanyakan agar pelanggan langsung dapat jawaban.', badge: 'Growth' },
      { title: 'Google Posts Mingguan', desc: 'Update promo, artikel, dan event mingguan lengkap dengan foto geo-tag untuk menjaga profil tetap aktif dan relevan.', badge: 'Growth' },
    ],
  },
  {
    id: 'landing',
    label: 'Landing Page Lokal',
    icon: 'LayoutTemplate',
    features: [
      { title: 'Landing Page Cepat & Fokus', desc: 'Satu halaman ringan yang dioptimasi untuk keyword lokal Anda, memuat cepat di jaringan mobile, dan langsung mengarahkan pengunjung untuk menghubungi Anda.', badge: null },
      { title: 'Klik-ke-WhatsApp & Telepon', desc: 'Tombol WhatsApp, telepon, dan rute yang menonjol. Pencari lokal ingin bertindak cepat, kami permudah mereka.', badge: null },
      { title: 'Embed Google Maps & Review', desc: 'Peta lokasi tertanam, jam buka, dan review terbaik ditampilkan untuk membangun kepercayaan sebelum mereka datang.', badge: null },
    ],
  },
  {
    id: 'nearme',
    label: 'Keyword "Near Me"',
    icon: 'Navigation',
    features: [
      { title: 'Riset Keyword Lokal', desc: 'Kami petakan cara orang mencari bisnis seperti Anda: "jasa … terdekat", "… di [area]", dan pencarian bermodifier lokasi lainnya di sekitar Anda.', badge: null },
      { title: 'Optimasi Radius hingga 20 km', desc: 'Kami targetkan area layanan dan kelurahan-kelurahan di sekitar bisnis Anda agar muncul untuk pencarian dalam radius hingga 20 km, bukan hanya di alamat persis Anda.', badge: null },
      { title: 'Local Schema Markup', desc: 'Structured data LocalBusiness yang memberi tahu Google alamat, jam, area layanan, dan kategori Anda dengan tepat, agar mudah muncul di map pack.', badge: 'Growth' },
    ],
  },
  {
    id: 'reviews',
    label: 'Review & Laporan',
    icon: 'Star',
    features: [
      { title: 'Strategi & Manajemen Review', desc: 'Sistem untuk mengumpulkan review dari pelanggan puas dan membalas setiap ulasan. Rating dan jumlah review adalah faktor peringkat map pack terbesar.', badge: 'Growth' },
      { title: 'Tracking Ranking Map Pack', desc: 'Kami pantau posisi Anda di 3 besar Google Maps untuk keyword utama di berbagai titik dalam radius Anda, plus posisi kompetitor.', badge: 'Growth' },
      { title: 'Laporan Performa Bulanan', desc: 'Insight nyata dari Google: berapa banyak yang melihat, menelepon, minta rute, dan klik ke website dari profil Anda setiap bulan.', badge: null },
    ],
  },
] as const

export const LOCALSEO_FEATURES_TABS_EN = [
  {
    id: 'gbp',
    label: 'Google Business Profile',
    icon: 'MapPin',
    features: [
      { title: 'Full Setup & Verification', desc: 'We create or claim your Google Business profile, verify ownership, pick the right categories, and complete every detail prospects look at.', badge: null },
      { title: 'End-to-End Optimization', desc: 'Local-keyword-rich business description, hours, attributes, service areas, photos, and direct links to WhatsApp, phone, and directions.', badge: null },
      { title: 'Products, Services & Q&A', desc: 'Your product/service catalog right on the profile, plus a curated Q&A so customers get answers instantly.', badge: 'Growth' },
      { title: 'Weekly Google Posts', desc: 'Weekly promos, articles, and events with geo-tagged photos to keep the profile active and relevant.', badge: 'Growth' },
    ],
  },
  {
    id: 'landing',
    label: 'Local Landing Page',
    icon: 'LayoutTemplate',
    features: [
      { title: 'Fast, Focused Landing Page', desc: 'A lightweight page optimized for your local keywords, loading fast on mobile networks and driving visitors straight to contact you.', badge: null },
      { title: 'Click-to-WhatsApp & Call', desc: 'Prominent WhatsApp, call, and directions buttons. Local searchers want to act fast, we make it effortless.', badge: null },
      { title: 'Embedded Map & Reviews', desc: 'An embedded location map, opening hours, and top reviews shown to build trust before they arrive.', badge: null },
    ],
  },
  {
    id: 'nearme',
    label: '"Near Me" Keywords',
    icon: 'Navigation',
    features: [
      { title: 'Local Keyword Research', desc: 'We map how people search for businesses like yours: "… near me", "… in [area]", and other location-modified searches around you.', badge: null },
      { title: 'Radius Optimization up to 20 km', desc: 'We target the service areas and neighborhoods around your business so you show up for searches within a radius of up to 20 km, not just at your exact address.', badge: null },
      { title: 'Local Schema Markup', desc: 'LocalBusiness structured data that tells Google your exact address, hours, service area, and category, making it easy to surface in the map pack.', badge: 'Growth' },
    ],
  },
  {
    id: 'reviews',
    label: 'Reviews & Reporting',
    icon: 'Star',
    features: [
      { title: 'Review Strategy & Management', desc: 'A system to collect reviews from happy customers and reply to every one. Rating and review count are the biggest map-pack ranking factors.', badge: 'Growth' },
      { title: 'Map Pack Rank Tracking', desc: 'We track your position in the Google Maps top 3 for key terms across multiple points in your radius, plus competitor positions.', badge: 'Growth' },
      { title: 'Monthly Performance Report', desc: 'Real insights from Google: how many people viewed, called, requested directions, and clicked to your website from your profile each month.', badge: null },
    ],
  },
] as const

// ─── Process ──────────────────────────────────────────────────────────────────
export const LOCALSEO_PROCESS_STEPS = [
  { step: '01', title: 'Audit Lokal', duration: 'Minggu 1', color: '#0D9488', align: 'left' as const, desc: 'Kami audit profil Google Business Anda, memetakan ranking map pack saat ini, dan menganalisis kompetitor dalam radius 20 km. Anda dapat gambaran jelas posisi awal Anda.' },
  { step: '02', title: 'Setup GBP & Landing Page', duration: 'Minggu 1–2', color: '#0EA5A4', align: 'right' as const, desc: 'Kami optimasi (atau bangun) profil Google Business Anda hingga lengkap dan membuat landing page lokal yang cepat dan fokus konversi.' },
  { step: '03', title: 'Optimasi "Near Me"', duration: 'Minggu 2–3', color: '#14B8A6', align: 'left' as const, desc: 'Riset dan penempatan keyword lokal, konsistensi citation NAP, local schema markup, dan foto geo-tag untuk menargetkan pencarian di sekitar Anda.' },
  { step: '04', title: 'Review & Konten', duration: 'Berkelanjutan', color: '#06B6D4', align: 'right' as const, desc: 'Kami jalankan strategi review, publikasikan Google Posts, dan jaga profil tetap aktif agar sinyal lokal Anda terus menguat dari waktu ke waktu.' },
  { step: '05', title: 'Laporan & Iterasi', duration: 'Bulanan', color: '#0D9488', align: 'left' as const, desc: 'Review bulanan atas ranking map pack, panggilan, permintaan rute, dan klik website. Kami perkuat yang berhasil dan sempurnakan area yang perlu.' },
] as const

export const LOCALSEO_PROCESS_STEPS_EN = [
  { step: '01', title: 'Local Audit', duration: 'Week 1', color: '#0D9488', align: 'left' as const, desc: 'We audit your Google Business profile, map your current map-pack rankings, and analyze competitors within a 20 km radius. You get a clear picture of your starting position.' },
  { step: '02', title: 'GBP & Landing Page Setup', duration: 'Week 1–2', color: '#0EA5A4', align: 'right' as const, desc: 'We optimize (or build) your Google Business profile to completion and create a fast, conversion-focused local landing page.' },
  { step: '03', title: '"Near Me" Optimization', duration: 'Week 2–3', color: '#14B8A6', align: 'left' as const, desc: 'Local keyword research and placement, NAP citation consistency, local schema markup, and geo-tagged photos to target searches around you.' },
  { step: '04', title: 'Reviews & Content', duration: 'Ongoing', color: '#06B6D4', align: 'right' as const, desc: 'We run the review strategy, publish Google Posts, and keep the profile active so your local signals keep strengthening over time.' },
  { step: '05', title: 'Report & Iterate', duration: 'Monthly', color: '#0D9488', align: 'left' as const, desc: 'Monthly reviews of map-pack rankings, calls, direction requests, and website clicks. We double down on what works and refine where needed.' },
] as const

// ─── Stats ────────────────────────────────────────────────────────────────────
export const LOCALSEO_STATS = [
  { value: '20 km', label: 'Jangkauan pencarian lokal', color: '#0D9488' },
  { value: 'Top 3', label: 'Target posisi map pack', color: '#0EA5A4' },
  { value: '3×', label: 'Lipat kemunculan di Maps', color: '#14B8A6' },
  { value: '2', label: 'Paket, ditagih tahunan', color: '#06B6D4' },
] as const

export const LOCALSEO_STATS_EN = [
  { value: '20 km', label: 'Local search reach', color: '#0D9488' },
  { value: 'Top 3', label: 'Target map pack position', color: '#0EA5A4' },
  { value: '3×', label: 'More Maps visibility', color: '#14B8A6' },
  { value: '2', label: 'Plans, billed annually', color: '#06B6D4' },
] as const

// ─── Map section: example "near me" queries shown around the radius ──────────────
export const LOCALSEO_NEARME_QUERIES = [
  'kopi terdekat', 'klinik gigi near me', 'bengkel mobil terdekat',
  'laundry 24 jam dekat sini', 'jasa cuci ac terdekat', 'restoran halal near me',
] as const

export const LOCALSEO_NEARME_QUERIES_EN = [
  'coffee near me', 'dentist near me', 'car repair near me',
  '24h laundry near me', 'ac cleaning near me', 'halal restaurant near me',
] as const

// ─── FAQ ────────────────────────────────────────────────────────────────────
export const LOCALSEO_FAQS = [
  { question: 'Apa itu Local SEO dan kenapa penting?', answer: 'Local SEO membuat bisnis Anda muncul saat orang di sekitar mencari layanan seperti Anda di Google Maps dan pencarian "near me". Untuk bisnis lokal, 3 hasil teratas di Google Maps (map pack) sering mendapat mayoritas klik, telepon, dan kunjungan. Ini kanal dengan intent tertinggi: orang yang mencari "terdekat" biasanya siap bertindak sekarang.' },
  { question: 'Berapa lama hingga muncul di Google Maps?', answer: 'Setelah profil Google Business diverifikasi dan dioptimasi, Anda bisa mulai muncul dalam beberapa hari. Peningkatan posisi di map pack untuk keyword kompetitif umumnya terlihat dalam 4–8 minggu seiring bertambahnya review, citation, dan sinyal lokal. Karena itu paket kami tahunan, hasil lokal terbaik datang dari konsistensi.' },
  { question: 'Maksud "radius hingga 20 km" itu apa?', answer: 'Kami mengoptimasi profil dan konten Anda agar muncul untuk pencarian dari area di sekitar bisnis Anda, bukan hanya di alamat persis. Kami targetkan kelurahan, kecamatan, dan area layanan dalam radius hingga 20 km sehingga Anda menjangkau pelanggan potensial di seluruh wilayah, tidak hanya yang berdiri tepat di depan toko.' },
  { question: 'Apakah landing page dan setup Google Business benar-benar termasuk?', answer: 'Ya. Kedua paket sudah mencakup setup dan optimasi Google Business Profile penuh plus satu landing page lokal sederhana, tanpa biaya tersembunyi. Landing page memperkuat sinyal lokal dan memberi tempat bagi pencari untuk langsung menghubungi Anda.' },
  { question: 'Kenapa ditagih tahunan?', answer: 'Local SEO adalah permainan konsistensi: review, Google Posts, dan sinyal lokal menumpuk seiring waktu. Penagihan tahunan menjaga strategi tetap berjalan tanpa putus dan membuat harga tetap terjangkau (Rp 1–2 Juta/bulan). Anda mendapat semua akun dan aset sepenuhnya milik Anda.' },
  { question: 'Apakah cocok untuk bisnis tanpa toko fisik?', answer: 'Ya. Untuk service-area business (seperti jasa panggilan, kontraktor, atau katering), Google mengizinkan profil tanpa alamat publik. Kami setel area layanan Anda dan optimasi untuk pencarian "near me" di wilayah yang Anda jangkau.' },
  { question: 'Berapa lokasi yang bisa dioptimasi?', answer: 'Paket Starter fokus pada 1 lokasi, dan Growth mengoptimasi hingga 3 area layanan. Punya lebih banyak cabang? Tersedia add-on lokasi tambahan, masing-masing dengan profil Google Business dan landing page lokalnya sendiri.' },
] as const

export const LOCALSEO_FAQS_EN = [
  { question: 'What is Local SEO and why does it matter?', answer: 'Local SEO makes your business show up when nearby people search for services like yours on Google Maps and "near me" searches. For local businesses, the top 3 Google Maps results (the map pack) often capture the majority of clicks, calls, and visits. It is the highest-intent channel: people searching "near me" are usually ready to act now.' },
  { question: 'How long until we appear on Google Maps?', answer: 'Once your Google Business profile is verified and optimized, you can start appearing within days. Map-pack ranking improvements for competitive keywords typically show within 4–8 weeks as reviews, citations, and local signals build. That is why our plans are annual, the best local results come from consistency.' },
  { question: 'What does "radius up to 20 km" mean?', answer: 'We optimize your profile and content to appear for searches from the areas around your business, not just at your exact address. We target the neighborhoods, districts, and service areas within a radius of up to 20 km so you reach potential customers across the region, not only those standing right outside your door.' },
  { question: 'Are the landing page and Google Business setup really included?', answer: 'Yes. Both plans include full Google Business Profile setup and optimization plus one simple local landing page, with no hidden fees. The landing page strengthens your local signals and gives searchers a place to contact you directly.' },
  { question: 'Why is it billed annually?', answer: 'Local SEO is a consistency game: reviews, Google Posts, and local signals compound over time. Annual billing keeps the strategy running without gaps and keeps pricing affordable (IDR 1–2 Mio/month). You own all accounts and assets fully.' },
  { question: 'Does it work for businesses without a storefront?', answer: 'Yes. For service-area businesses (like on-call services, contractors, or catering), Google allows a profile without a public address. We set your service areas and optimize for "near me" searches across the region you cover.' },
  { question: 'How many locations can be optimized?', answer: 'The Starter plan focuses on 1 location, and Growth optimizes up to 3 service areas. Have more branches? An additional-location add-on is available, each with its own Google Business profile and local landing page.' },
] as const

// ─── ServiceContent (redesign) ───────────────────────────────────────────────
// Dropped from the legacy copy (unverified or §11 vocabulary): "3× lipat kemunculan di Maps", "Top 3" as a
// target, "mayoritas klik" for the map pack, and "semua akun dan aset sepenuhnya milik Anda". The billing
// answer is the hub's (content/hub.ts) word for word, so both pages say the same thing.

const GUIDE = 'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide'

// Rich page (owner 2026-10-04, benchmarked on the live page; the SEO page's pattern): plan lists on the cards (no matrix,
// no comparison panel), the homepage process, the vetted legacy tabs with the dropped claims taken out ('Top 3' as a
// target, reviews as 'the biggest' factor), and the owner's Google Ads on Google Maps add-on (custom price).
type Tabs = typeof LOCALSEO_FEATURES_TABS | typeof LOCALSEO_FEATURES_TABS_EN
const tabsOf = (tabs: Tabs, nearMe: string) => tabs.map((t) => ({
  label: t.id === 'nearme' ? nearMe : t.label,
  items: t.features.map((f) => ({
    title: f.title,
    text: f.desc
      .replace(' Rating dan jumlah review adalah faktor peringkat map pack terbesar.', ' Rating dan jumlah ulasan adalah salah satu sinyal peringkat lokal Google.')
      .replace(' Rating and review count are the biggest map-pack ranking factors.', " Rating and review count are among Google's local ranking signals.")
      .replace('di 3 besar Google Maps', 'di Google Maps')
      .replace('in the Google Maps top 3', 'on Google Maps'),
    badge: f.badge ?? undefined,
  })),
}))
const addonsOf = (a: typeof LOCALSEO_ADDONS | typeof LOCALSEO_ADDONS_EN, ads: { name: string; text: string; price: string }) =>
  [...a.map((x) => ({ name: x.name, text: x.description, price: x.price.replace(' Mio', 'M') })), ads]

const id: ServiceContent = {
  answer: 'Jasa Local SEO Logink membuat bisnis Anda muncul saat orang di sekitar mencari di Google Maps. Kami optimasi Google Business Profile, membuat satu landing page lokal, dan menargetkan pencarian dalam radius hingga 20 km dari lokasi Anda.',
  campaign: {
    fedBy: [
      { k: 'creative', text: 'Foto produk dan lokasi yang bagus membuat profil Google Anda lebih meyakinkan.' },
      { k: 'strategy', text: 'Google Posts (paket Growth) memakai ide kampanye yang sama dengan kanal lain.' },
    ],
    feeds: [
      { k: 'ai', text: 'Nama, alamat, jam buka, kategori, dan ulasan yang konsisten adalah data entitas yang dibaca Google dan mesin AI saat merekomendasikan bisnis lokal.' },
      { k: 'wa', text: 'Tautan WhatsApp di profil Google dan tombol klik-ke-WhatsApp di landing page lokal membawa pencari "terdekat" langsung ke chat.' },
    ],
  },
  work: [
    { title: 'Optimasi Google Maps & Business Profile', text: 'Kategori, jam buka, foto, dan tautan WhatsApp yang lengkap.' },
    { title: 'Landing Page Lokal', text: 'Satu halaman cepat dengan peta, ulasan, dan tombol WhatsApp.' },
    { title: 'Riset Keyword "Terdekat" & Radius 20 km', text: 'Pencarian "terdekat" di kelurahan sekitar, hingga 20 km.' },
    { title: 'Ulasan & Google Posts', text: 'Growth: ulasan dikumpulkan dan dibalas, Google Posts tiap minggu.', card: 'ReviewCard' },
    { title: 'Laporan Google Maps Bulanan', text: 'Tayangan, telepon, rute, dan klik website dari data Google.' },
  ],
  pricing: {
    kind: 'tiers',
    tiers: LOCALSEO_PRICING_TIERS.map((t) => ({ ...t, note: t.billing })),
    addons: addonsOf(LOCALSEO_ADDONS, { name: 'Google Ads di Google Maps', text: 'Iklan pencarian berbayar yang tampil di Google Maps dan pencarian sekitar, untuk hasil lebih cepat sambil Local SEO bertumbuh.', price: 'Harga disesuaikan setelah diskusi' }),
  },
  compare: null,
  trust: ['Setup Google Business Profile', 'Landing page lokal termasuk', 'Ditagih tahunan'],
  highlights: {
    items: [
      { value: '20 km', label: 'radius pencarian lokal yang ditargetkan' },
      { value: '4–8', label: 'minggu sampai posisi map pack mulai naik' },
      { value: '2', label: 'paket, keduanya ditagih tahunan' },
    ],
    note: 'Perkiraan umum untuk keyword kompetitif, bukan jaminan. Setiap bisnis berbeda.',
  },
  usp: {
    heading: 'Menang di pencarian "terdekat" hingga radius 20 km',
    accent: 2,
    visual: 'maps',
    lead: 'Pencari lokal siap menelepon, minta rute, atau datang hari ini. Kami optimasi sinyal lokal Anda agar muncul di Google Maps untuk area di sekitar bisnis, bukan hanya di alamat persis.',
    cards: [
      { title: 'Tampil di Google Maps', text: 'Profil yang lengkap dan konsisten agar bisnis Anda muncul untuk keyword utama di sekitar.' },
      { title: 'Google Business Profile', text: 'Profil lengkap dan terverifikasi: foto, jam buka, layanan, sampai tanya jawab.' },
      { title: 'Ulasan & rating', text: 'Strategi mengumpulkan dan membalas ulasan, salah satu sinyal peringkat lokal Google.' },
      { title: 'Keyword "terdekat"', text: 'Kelurahan dan area layanan ditargetkan, agar muncul untuk pencarian di sekitar Anda.' },
    ],
  },
  included: {
    heading: 'Semua yang Anda butuhkan untuk menang di pencarian lokal',
    lead: 'Dikelompokkan per bidang. Label Growth menandai item yang hanya ada di paket Growth.',
    tabs: tabsOf(LOCALSEO_FEATURES_TABS, 'Keyword "Terdekat"'),
  },
  process: true,
  stats: [
    'aio-id',
    'aimode-id',
    { text: 'Panduan AI search Google: untuk bisnis lokal, Google merujuk ke Google Business Profile', src: 'Google Search Central', year: 2026, url: GUIDE },
  ],
  ai: 'Profil Google yang lengkap membuat data bisnis Anda mudah dibaca Google AI Overview, AI Mode, dan ChatGPT saat orang meminta rekomendasi terdekat. Kami tidak menjamin kutipan.',
  faq: [
    { q: 'Apa itu Local SEO dan kenapa penting?', a: 'Local SEO membuat bisnis Anda muncul saat orang di sekitar mencari layanan seperti Anda di Google Maps dan pencarian "terdekat". Ini kanal dengan niat paling tinggi untuk bisnis lokal, karena orang yang mencari tempat terdekat biasanya siap datang, menelepon, atau chat saat itu juga.' },
    { q: 'Berapa lama hingga muncul di Google Maps?', a: 'Beberapa hari setelah profil Google Business diverifikasi dan dioptimasi, bisnis Anda bisa mulai muncul. Kenaikan posisi di map pack untuk keyword yang kompetitif umumnya terlihat dalam 4 sampai 8 minggu, seiring bertambahnya ulasan, citation, dan sinyal lokal.' },
    { q: 'Maksud "radius hingga 20 km" itu apa?', a: 'Artinya bisnis Anda dioptimasi untuk pencarian dari area di sekitarnya, bukan hanya dari alamat persis. Kelurahan, kecamatan, dan area layanan dalam radius hingga 20 km ikut ditargetkan, sehingga Anda menjangkau calon pelanggan di seluruh wilayah itu.' },
    { q: 'Kenapa Local SEO ditagih tahunan?', a: 'Karena hasil Local SEO datang dari konsistensi. Ulasan, Google Posts, dan sinyal lokal menumpuk seiring waktu, dan peningkatan posisi di map pack untuk kata kunci kompetitif umumnya terlihat dalam 4–8 minggu. Penagihan tahunan menjaga pekerjaan berjalan tanpa putus dan membuat harga bulanannya tetap terjangkau.' },
    { q: 'Apakah cocok untuk bisnis tanpa toko fisik?', a: 'Ya. Google mengizinkan profil tanpa alamat publik untuk bisnis berbasis area layanan, seperti jasa panggilan, kontraktor, atau katering. Kami mengatur area layanan Anda dan mengoptimasi profil untuk pencarian "terdekat" di wilayah yang Anda layani.' },
    { q: 'Berapa lokasi yang bisa dioptimasi?', a: 'Starter fokus pada satu lokasi, dan Growth mengoptimasi hingga tiga area layanan. Untuk cabang atau outlet lain tersedia add-on lokasi tambahan, masing-masing dengan profil Google Business dan landing page lokalnya sendiri.' },
  ],
  sources: [
    { label: 'Google: Tips meningkatkan peringkat lokal di Google', url: 'https://support.google.com/business/answer/7091?hl=id' },
    { label: 'Google: Panduan structured data LocalBusiness', url: 'https://developers.google.com/search/docs/appearance/structured-data/local-business' },
  ],
}

const en: ServiceContent = {
  answer: "Logink's Local SEO service gets your business found when nearby people search Google Maps. We optimize your Google Business Profile, build one local landing page and target searches within up to 20 km of your location.",
  campaign: {
    fedBy: [
      { k: 'creative', text: 'Good product and location photos make your Google profile more convincing.' },
      { k: 'strategy', text: 'Google Posts (Growth plan) use the same campaign idea as the other channels.' },
    ],
    feeds: [
      { k: 'ai', text: 'Consistent name, address, hours, categories and reviews are the entity data Google and AI engines read when they recommend a local business.' },
      { k: 'wa', text: 'The WhatsApp link on your Google profile and the click-to-WhatsApp button on your local landing page take "near me" searchers straight to a chat.' },
    ],
  },
  work: [
    { title: 'Google Business Profile Optimization', text: 'Complete categories, hours, photos and a WhatsApp link.' },
    { title: 'Local Landing Page', text: 'One fast page with a map, reviews and a WhatsApp button.' },
    { title: '"Near Me" Keywords & a 20 km Radius', text: '"Near me" searches in nearby neighborhoods, up to 20 km.' },
    { title: 'Reviews & Google Posts', text: 'Growth: reviews collected and answered, weekly Google Posts.', card: 'ReviewCard' },
    { title: 'Monthly Google Maps Report', text: 'Views, calls, directions and website clicks from Google data.' },
  ],
  pricing: {
    kind: 'tiers',
    tiers: LOCALSEO_PRICING_TIERS_EN.map((t) => ({ ...t, price: t.price.replace(' Mio', 'M'), note: t.billing.replace(' Mio', 'M') })),
    addons: addonsOf(LOCALSEO_ADDONS_EN, { name: 'Google Ads on Google Maps', text: 'Paid search ads that show on Google Maps and in nearby searches, for faster results while Local SEO grows.', price: 'Custom price, agreed after a discussion' }),
  },
  compare: null,
  trust: ['Google Business Profile setup', 'Local landing page included', 'Billed annually'],
  highlights: {
    items: [
      { value: '20 km', label: 'local search radius we target' },
      { value: '4–8', label: 'weeks until map-pack positions start to rise' },
      { value: '2', label: 'plans, both billed annually' },
    ],
    note: 'Typical estimates for competitive keywords, not a guarantee. Every business is different.',
  },
  usp: {
    heading: 'Win "near me" searches within 20 km',
    accent: 2,
    visual: 'maps',
    lead: 'Local searchers are ready to call, ask for directions or visit today. We optimize your local signals so you show up on Google Maps across the area around your business, not just at your exact address.',
    cards: [
      { title: 'Show up on Google Maps', text: 'A complete, consistent profile so your business appears for key searches nearby.' },
      { title: 'Google Business Profile', text: 'Complete and verified: photos, hours, services, right down to Q&A.' },
      { title: 'Reviews & rating', text: "A plan to collect and answer reviews, one of Google's local ranking signals." },
      { title: '"Near me" keywords', text: 'Neighborhoods and service areas targeted, so you appear for searches around you.' },
    ],
  },
  included: {
    heading: 'Everything you need to win local search',
    lead: 'Grouped by area. Growth marks items that come with the Growth plan only.',
    tabs: tabsOf(LOCALSEO_FEATURES_TABS_EN, '"Near Me" Keywords'),
  },
  process: true,
  stats: [
    'aio-id',
    'aimode-id',
    { text: "Google's AI search guide: for local businesses, Google points to Google Business Profile", src: 'Google Search Central', year: 2026, url: GUIDE },
  ],
  ai: 'A complete Google profile makes your business data easy for Google AI Overviews, AI Mode and ChatGPT to read when people ask for a recommendation nearby. We do not guarantee citations.',
  faq: [
    { q: 'What is Local SEO and why does it matter?', a: 'Local SEO makes your business show up when nearby people search for services like yours on Google Maps and in "near me" searches. It is the highest-intent channel for a local business, because people looking for a place nearby are usually ready to visit, call or chat.' },
    { q: 'How long until we appear on Google Maps?', a: 'Your business can start appearing a few days after the Google Business profile is verified and optimized. Map-pack gains for competitive keywords typically show within 4 to 8 weeks, as reviews, citations and other local signals build up.' },
    { q: 'What does "a radius of up to 20 km" mean?', a: 'It means your business is optimized for searches from the areas around it, not only from your exact address. Neighborhoods, districts and service areas within up to 20 km are targeted too, so you reach potential customers across that whole area.' },
    { q: 'Why is Local SEO billed annually?', a: 'Because Local SEO results come from consistency. Reviews, Google Posts and local signals build up over time, and map-pack gains for competitive keywords typically show within 4–8 weeks. Annual billing keeps the work running without gaps and keeps the monthly price affordable.' },
    { q: 'Does it work for businesses without a storefront?', a: 'Yes. Google allows a profile without a public address for service-area businesses such as on-call services, contractors or caterers. We set your service areas and optimize the profile for "near me" searches in the region you serve.' },
    { q: 'How many locations can be optimized?', a: 'Starter focuses on one location, and Growth optimizes up to three service areas. Other branches or outlets can be added with the additional-location add-on, each with its own Google Business profile and local landing page.' },
  ],
  sources: [
    { label: 'Google: Tips to improve your local ranking on Google', url: 'https://support.google.com/business/answer/7091?hl=en' },
    { label: 'Google: LocalBusiness structured data', url: 'https://developers.google.com/search/docs/appearance/structured-data/local-business' },
  ],
}

export default liveDoc('service-pages', 'localseo', 'content', { id, en } satisfies Record<Locale, ServiceContent>)
