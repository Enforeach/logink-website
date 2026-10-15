// Jasa SEO Profesional (BUILD §3.4). The X / X_EN exports are the vetted legacy copy, kept verbatim; the
// default export maps them into ServiceContent and adds the new fields (answer, campaign, ai, compare, …).
import type { Locale } from '@/lib/services'
import type { ServiceContent } from './types'

export const SEO_PRICING_TIERS = [
  {
    id: 'entry',
    name: 'Entry',
    price: 'Rp 8 Juta',
    priceValue: 8000000,
    period: '/bulan',
    bestFor: 'Website baru yang mulai membangun traffic organic',
    isPopular: false,
    color: '#A855F7',
    features: [
      'Riset Keyword (Bahasa Indonesia)',
      'Google Search Console & GA4',
      'On-Page SEO (Meta, Heading, Struktur)',
      'Core Web Vitals & Page Speed',
      'Sitemap & Robots.txt',
      '5 Artikel SEO/bulan',
      'Keyword Mapping per Artikel',
      'Strategi Internal Linking',
      'Laporan Performa Bulanan',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 'Rp 10 Juta',
    priceValue: 10000000,
    period: '/bulan',
    bestFor: 'Scaling traffic & leads',
    isPopular: true,
    color: '#A855F7',
    features: [
      'Semua yang ada di Entry',
      'Schema Markup Lokal',
      '15 Artikel SEO/bulan',
      'Looker Studio Dashboard',
    ],
  },
  {
    id: 'full',
    name: 'Full',
    price: 'Rp 15 Juta',
    priceValue: 15000000,
    period: '/bulan',
    bestFor: 'Pertumbuhan maksimal',
    isPopular: false,
    color: '#F88438',
    features: [
      'Semua yang ada di Growth',
      'Custom Event Tracking',
      '30 Artikel SEO/bulan',
      'Looker Studio Dashboard',
    ],
  },
] as const

export const SEO_ADDONS = [
  {
    name: 'Local SEO & Google Business Profile',
    description: "Dominasi pencarian 'dekat saya' dan map pack Google Business di kota Anda.",
    price: 'Mulai dari Rp 2 Juta/lokasi/bulan',
  },
  {
    name: 'Off-Page / Link Building',
    description: 'Bangun domain authority dengan penempatan editorial di media Indonesia.',
    price: 'Mulai dari Rp 1 Juta/media',
  },
] as const

export const SEO_FEATURES_TABS = [
  {
    id: 'research',
    label: 'Riset & Data',
    icon: 'Search',
    features: [
      {
        title: 'Riset Keyword',
        desc: 'Kami menemukan keyword yang relevan dengan bisnis Anda, lalu memetakan query long-tail, transaksional, dan informasional ke funnel Anda.',
        badge: null,
      },
      {
        title: 'Setup Google Search Console & GA4',
        desc: 'Setup teknikal lengkap dengan tracking yang tepat. Akun sepenuhnya milik Anda, dan Anda bisa melihat setiap angkanya. Tidak ada yang ditutupi.',
        badge: null,
      },
      {
        title: 'Schema Markup Lokal',
        desc: 'Structured data yang membantu Google memahami bisnis Anda di pasar Indonesia. LocalBusiness, FAQPage, dan product schema.',
        badge: 'Growth+',
      },
      {
        title: 'Custom Event Tracking',
        desc: 'Lacak micro-conversion: form mulai diisi, scroll depth, klik CTA, tap WhatsApp. Tahu persis di mana pengguna berhenti.',
        badge: 'Full only',
      },
    ],
  },
  {
    id: 'onpage',
    label: 'On-Page SEO',
    icon: 'Settings2',
    features: [
      {
        title: 'Meta, Heading & Struktur Konten',
        desc: 'Setiap halaman dioptimasi dengan hierarki H1-H6 yang benar, meta title di bawah 60 karakter, deskripsi yang mengundang klik, dan konten yang terstruktur untuk featured snippet.',
        badge: null,
      },
      {
        title: 'Core Web Vitals & Page Speed',
        desc: 'Kami audit dan perbaiki LCP, FID, dan CLS. Halaman Anda tetap cepat di jaringan mobile Indonesia, bukan hanya di fiber.',
        badge: null,
      },
      {
        title: 'Sitemap & Robots.txt',
        desc: 'Fondasi teknikal: XML sitemap otomatis, direktif robots.txt yang tepat, dan optimasi crawl budget.',
        badge: null,
      },
      {
        title: 'Arsitektur Internal Linking',
        desc: 'Tautan strategis antar halaman untuk mendistribusikan authority dan memandu perjalanan pengguna. Dipetakan ke funnel konversi Anda, bukan sekadar acak.',
        badge: null,
      },
    ],
  },
  {
    id: 'content',
    label: 'Konten',
    icon: 'PenLine',
    features: [
      {
        title: 'Artikel SEO',
        desc: 'Ditulis oleh penulis spesialis Bahasa Indonesia, bukan AI. Setiap artikel menarget cluster keyword tertentu dengan riset, struktur, dan internal link yang tepat.',
        badge: null,
        tiers: { entry: '5/bln', growth: '15/bln', full: '30/bln' },
      },
      {
        title: 'Keyword Mapping per Artikel',
        desc: 'Setiap artikel memiliki satu keyword utama, 3-5 keyword sekunder, dan kecocokan search intent yang jelas. Tanpa tebak-tebakan.',
        badge: null,
      },
      {
        title: 'Strategi Internal Linking',
        desc: 'Setiap artikel baru memperkuat halaman yang sudah ada. Kami membangun topic cluster yang efeknya terus berlipat seiring waktu, bukan artikel yang berdiri sendiri.',
        badge: null,
      },
    ],
  },
  {
    id: 'reporting',
    label: 'Pelaporan',
    icon: 'BarChart3',
    features: [
      {
        title: 'Laporan Performa Bulanan',
        desc: 'Laporan yang jelas dan bebas jargon, mencakup ranking, traffic, konversi, dan langkah selanjutnya. Dikirim setiap bulan.',
        badge: null,
      },
      {
        title: 'Looker Studio Dashboard',
        desc: 'Dashboard live yang bisa Anda akses kapan saja. Ranking, tren traffic, halaman teratas, conversion tracking: selalu up to date.',
        badge: 'Growth+',
      },
    ],
  },
] as const

// ─── English exports ─────────────────────────────────────────────────────────

export const SEO_PRICING_TIERS_EN = [
  {
    id: 'entry',
    name: 'Entry',
    price: 'IDR 8 Mio',
    priceValue: 8000000,
    period: '/month',
    bestFor: 'New websites starting organic',
    isPopular: false,
    color: '#A855F7',
    features: [
      'Keyword Research (Bahasa Indonesia)',
      'Google Search Console & GA4',
      'On-Page SEO (Meta, Heading, Structure)',
      'Core Web Vitals & Page Speed',
      'Sitemap & Robots.txt',
      '5 SEO Articles/month',
      'Keyword Mapping per Article',
      'Internal Linking Strategy',
      'Monthly Performance Report',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 'IDR 10 Mio',
    priceValue: 10000000,
    period: '/month',
    bestFor: 'Scaling traffic & leads',
    isPopular: true,
    color: '#A855F7',
    features: [
      'Everything in Entry',
      'Local Schema Markup',
      '15 SEO Articles/month',
      'Looker Studio Dashboard',
    ],
  },
  {
    id: 'full',
    name: 'Full',
    price: 'IDR 15 Mio',
    priceValue: 15000000,
    period: '/month',
    bestFor: 'Maximum growth velocity',
    isPopular: false,
    color: '#F88438',
    features: [
      'Everything in Growth',
      'Custom Event Tracking',
      '30 SEO Articles/month',
      'Looker Studio Dashboard',
    ],
  },
] as const

export const SEO_ADDONS_EN = [
  {
    name: 'Local SEO & Google Business Profile',
    description: "Dominate 'near me' searches and Google Business map packs in your city.",
    price: 'Starting from IDR 2 mio/location/month',
  },
  {
    name: 'Off-Page / Link Building',
    description: 'Build domain authority with editorial placements in Indonesian media outlets.',
    price: 'Starting from IDR 1 mio/media',
  },
] as const

export const SEO_FEATURES_TABS_EN = [
  {
    id: 'research',
    label: 'Research & Data',
    icon: 'Search',
    features: [
      {
        title: 'Keyword Research',
        desc: "We dig into your users actually search for: aligning with Long-tail, transactional, and informational queries mapped to your funnel.",
        badge: null,
      },
      {
        title: 'Google Search Console & GA4 Setup',
        desc: 'Full technical setup with proper tracking. You own the accounts, you see every number. No black boxes.',
        badge: null,
      },
      {
        title: 'Local Schema Markup',
        desc: 'Structured data that helps Google understand your business in the Indonesian market. LocalBusiness, FAQPage, and product schema.',
        badge: 'Growth+',
      },
      {
        title: 'Custom Event Tracking',
        desc: 'Track micro-conversions: form starts, scroll depth, CTA clicks, WhatsApp taps. Know exactly where users drop off.',
        badge: 'Full only',
      },
    ],
  },
  {
    id: 'onpage',
    label: 'On-Page SEO',
    icon: 'Settings2',
    features: [
      {
        title: 'Meta, Heading & Content Structure',
        desc: 'Every page optimized with proper H1-H6 hierarchy, meta titles under 60 chars, descriptions that earn clicks, and content structured for featured snippets.',
        badge: null,
      },
      {
        title: 'Core Web Vitals & Page Speed',
        desc: 'We audit and fix LCP, FID, and CLS. Your pages load fast on Indonesian mobile networks, not just on fiber.',
        badge: null,
      },
      {
        title: 'Sitemap & Robots.txt',
        desc: 'Technical foundation: auto-generated XML sitemap, proper robots.txt directives, and crawl budget optimization.',
        badge: null,
      },
      {
        title: 'Internal Linking Architecture',
        desc: 'Strategic links between pages to distribute authority and guide user journeys. Not random: mapped to your conversion funnel.',
        badge: null,
      },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    icon: 'PenLine',
    features: [
      {
        title: 'SEO Articles',
        desc: 'Written by specialist Bahasa Indonesia writers, not AI. Each article targets a specific keyword cluster with proper research, structure, and internal links.',
        badge: null,
        tiers: { entry: '5/mo', growth: '15/mo', full: '30/mo' },
      },
      {
        title: 'Keyword Mapping per Article',
        desc: 'Every article has a primary keyword, 3-5 secondary keywords, and a clear search intent match. No guessing.',
        badge: null,
      },
      {
        title: 'Internal Linking Strategy',
        desc: 'Each new article strengthens existing pages. We build topic clusters that compound over time, not isolated posts.',
        badge: null,
      },
    ],
  },
  {
    id: 'reporting',
    label: 'Reporting',
    icon: 'BarChart3',
    features: [
      {
        title: 'Monthly Performance Report',
        desc: 'Clear, jargon-free report covering rankings, traffic, conversions, and actionable next steps. Delivered every month.',
        badge: null,
      },
      {
        title: 'Looker Studio Dashboard',
        desc: 'Live dashboard you can check anytime. Rankings, traffic trends, top pages, conversion tracking: always up to date.',
        badge: 'Growth+',
      },
    ],
  },
] as const

export const SEO_FAQS = [
  {
    question: 'Berapa lama hingga hasil SEO mulai terlihat?',
    answer: 'SEO adalah permainan jangka panjang, dan justru itu yang membuatnya powerful. Umumnya, Anda akan melihat pergerakan ranking awal dalam 4-6 minggu. Pertumbuhan traffic yang signifikan mulai terlihat di bulan ke-3, dan hasil yang terus berlipat muncul sekitar bulan ke-6. Berbeda dari iklan berbayar, hasil ini tidak berhenti saat budget habis.',
  },
  {
    question: 'Artikel ditulis dalam bahasa apa?',
    answer: 'Semua konten ditulis langsung dalam Bahasa Indonesia oleh penulis spesialis yang memahami perilaku pencarian lokal. Kami tidak sekadar menerjemahkan konten Inggris; kami meriset dan menulis sesuai cara pengguna Indonesia benar-benar mencari. Konten Inggris tersedia sebagai add-on untuk brand yang menyasar audiens internasional.',
  },
  {
    question: 'Apakah kami bisa memilih topik artikel?',
    answer: 'Tentu saja. Kami menyediakan daftar topik rekomendasi berdasarkan riset keyword dan data volume pencarian, tetapi keputusan akhir selalu di tangan Anda. Jika ada topik tertentu yang perlu diangkat brand Anda, kami masukkan ke editorial calendar. Strategi kami bersifat kolaboratif, bukan satu arah.',
  },
  {
    question: 'Bagaimana progress dilaporkan?',
    answer: 'Anda mendapat laporan performa bulanan yang mencakup ranking keyword, organic traffic, halaman terbaik, dan data konversi. Paket Growth dan Full juga dilengkapi live Looker Studio dashboard yang bisa Anda akses kapan saja. Kami meninjau hasilnya bersama dalam strategy call bulanan.',
  },
  {
    question: 'Apakah link building sudah termasuk?',
    answer: 'Off-page SEO dan link building tersedia sebagai add-on mulai Rp 5 Juta per penempatan media. Pendekatan kami fokus pada penempatan editorial di media Indonesia, tanpa PBN, tanpa direktori spam. Kualitas di atas kuantitas.',
  },
  {
    question: 'Bagaimana jika kami ingin berhenti?',
    answer: 'Tidak ada kontrak lock-in. Kami bekerja bulanan karena kepercayaan Anda layak dimenangkan lewat hasil, bukan lewat klausul kontrak. Semua konten, akun, dan data adalah milik Anda; kami tidak pernah menahan apa pun.',
  },
  {
    question: 'Apakah ranking dijamin?',
    answer: 'Tidak ada agency SEO jujur yang berani menjamin ranking spesifik, karena algoritma Google tidak bisa dikendalikan siapa pun. Yang kami jamin adalah proses sistematis berbasis data yang secara konsisten menghasilkan pertumbuhan traffic 2-4× bagi klien kami dalam 6 bulan. Kami transparan soal apa yang berhasil dan apa yang perlu disesuaikan.',
  },
] as const

export const SEO_FAQS_EN = [
  {
    question: 'How long does it take to see SEO results?',
    answer: "SEO is a long game, and that's what makes it powerful. Typically, you'll see initial ranking movements within 4-6 weeks. Meaningful traffic growth starts at the 3-month mark, and compounding results kick in around month 6. Unlike paid ads, these results don't stop when the budget stops.",
  },
  {
    question: 'What language are articles written in?',
    answer: "All content is written natively in Bahasa Indonesia by specialist writers who understand local search behavior. We don't translate English content; we research and write for how Indonesian users actually search. English content is available as an add-on for brands targeting international audiences.",
  },
  {
    question: 'Can we choose article topics?',
    answer: "Absolutely. We provide a recommended topic list based on keyword research and search volume data, but you always have final approval. If there are specific topics your brand needs to cover, we incorporate them into the editorial calendar. Strategy is collaborative, not dictated.",
  },
  {
    question: 'How is progress reported?',
    answer: 'You get a monthly performance report covering keyword rankings, organic traffic, top-performing pages, and conversion data. Growth and Full plans also include a live Looker Studio dashboard you can check anytime. We review results together in a monthly strategy call.',
  },
  {
    question: 'Is backlink building included?',
    answer: 'Off-page SEO and link building is available as an add-on starting at Rp 5 Juta per media placement. Our approach focuses on editorial placements in Indonesian media outlets, no PBNs, no spammy directories. Quality over quantity.',
  },
  {
    question: 'What happens if we want to stop?',
    answer: "There are no lock-in contracts. We work on a monthly basis because we believe our results should earn your continued partnership, not a contract clause. All content, accounts, and data are yours; we never hold anything hostage.",
  },
  {
    question: 'Do you guarantee rankings?',
    answer: "No honest SEO agency guarantees specific rankings, as Google's algorithm isn't something anyone controls. What we guarantee is a systematic, data-driven process that has consistently delivered 2-4x traffic growth for our clients within 6 months. We're transparent about what's working and what needs adjustment.",
  },
] as const

// ─── ServiceContent (redesign) ───────────────────────────────────────────────
// Dropped from the legacy copy (unverified or owner decision 6): "2-4× traffic growth", "Tidak ada kontrak
// lock-in", "semua akun dan data", and both link-building prices (Rp 1 Juta/media vs Rp 5 Juta disagree).

// Rich page (owner 2026-10-04, benchmarked on the live page), built from the vetted legacy tabs. Fixes: FID → INP (the
// Core Web Vital since Mar 2024); the article counts join the article line. The stats band uses the FAQ's own estimates,
// never the dropped results claims above. The process is the homepage's (process: true).
type Item = { title: string; text: string; badge?: string }
// Owner 2026-10-04 additions: commercial keywords (2nd in Riset & Data) and a Konversi tab (end-to-end tracking,
// Conversion Rate Analysis + Optimization, then the Full-only Custom Event Tracking, moved from Riset & Data; its
// 'tap WhatsApp' goes, since the WhatsApp chat is now an end-point conversion tracked in every plan).
const tabsOf = (tabs: typeof SEO_FEATURES_TABS | typeof SEO_FEATURES_TABS_EN, full: string, counts: (e: number, g: number, f: number) => string,
  own: { keywords: Item; conversion: string; convItems: Item[] }) => {
  const m = tabs.map((t) => ({
    id: t.id,
    label: t.label,
    items: t.features.map((f): Item => ({
      title: f.title,
      text: f.desc.replace('FID', 'INP').replace(/, (?:tap WhatsApp|WhatsApp taps)\./, '.')
        + ('tiers' in f ? ` ${counts(parseInt(f.tiers.entry), parseInt(f.tiers.growth), parseInt(f.tiers.full))}` : ''),
      badge: f.badge === 'Full only' ? full : f.badge ?? undefined,
    })),
  }))
  const tab = (id: string) => m.find((t) => t.id === id)!
  const research = tab('research')
  const cet = research.items.find((i) => i.title === 'Custom Event Tracking')!
  return [
    { label: research.label, items: [research.items[0], own.keywords, ...research.items.slice(1).filter((i) => i !== cet)] },
    tab('onpage'),
    tab('content'),
    { label: own.conversion, items: [...own.convItems, cet] },
    tab('reporting'),
  ].map(({ label, items }) => ({ label, items }))
}
// Every plan gets the owner additions (Entry lists them; Growth and Full inherit 'Semua yang ada di Entry').
const withOwner = <T extends { id: string; features: readonly string[] }>(t: T, kw: string, end: string[]) =>
  t.id === 'entry' ? { ...t, features: [t.features[0], kw, ...t.features.slice(1), ...end] } : t

const id: ServiceContent = {
  answer: 'Jasa SEO profesional Logink membuat website Anda lebih mudah ditemukan calon pembeli di Google. Berbasis data dan dibangun untuk konversi: riset keyword komersial, 5 sampai 30 artikel per bulan, perbaikan teknikal, tracking dan optimasi konversi, serta laporan bulanan.',
  campaign: {
    fedBy: [
      { k: 'website', text: 'Situs yang cepat dan terstruktur rapi memberi fondasi teknis, sehingga konten SEO bisa dirayapi dan naik peringkat.' },
      { k: 'social', text: 'Topik yang ramai dan pertanyaan audiens di social media menjadi ide artikel.' },
      { k: 'ads', gate: 'K5', text: 'Data search term dari iklan menunjukkan kata yang layak dijadikan konten.' },
    ],
    feeds: [
      { k: 'ads', text: 'Riset kata kunci yang sama menajamkan iklan pencarian, sehingga iklan dan konten menjawab kata yang sama.' },
      { k: 'ai', text: 'Artikel yang menjawab langsung dan schema yang rapi adalah bahan utama agar brand Anda layak dikutip mesin AI.' },
    ],
  },
  work: [
    { title: 'Riset Keyword Bahasa Indonesia', text: 'Kata yang benar-benar dicari pelanggan, diurutkan menurut potensi traffic.' },
    { title: 'Konten SEO & Artikel', text: 'Penulis spesialis Bahasa Indonesia, satu keyword utama per artikel.' },
    { title: 'SEO Teknikal & Core Web Vitals', text: 'Kecepatan, sitemap, dan schema, agar halaman cepat di jaringan seluler.' },
    { title: 'Jasa SEO Bulanan: yang dikerjakan setiap bulan', text: 'Artikel baru terbit, halaman lama diperkuat, hasilnya dibahas dalam strategy call bulanan.' },
    { title: 'Audit SEO', text: 'Crawl error, halaman lambat, dan celah dibanding kompetitor, di awal kerja sama.' },
  ],
  pricing: {
    kind: 'tiers',
    // the legacy ID array carries two English phrases; the ID page shows them in Indonesian
    tiers: SEO_PRICING_TIERS.map((t) => ({ ...withOwner(t, 'Target Keyword Komersial', ['Tracking Konversi End-to-End', 'Conversion Rate Analysis', 'Conversion Rate Optimization']), bestFor: { entry: 'Website baru yang mulai membangun traffic organik', growth: 'Menambah traffic dan leads', full: 'Pertumbuhan maksimal' }[t.id] })),
    addons: [
      { name: SEO_ADDONS[0].name, text: "Muncul di pencarian 'dekat saya' dan map pack Google di kota Anda.", href: '/layanan/local-seo#harga', linkText: 'Lihat harga Local SEO & Google Maps' },
      { name: SEO_ADDONS[1].name, text: 'Penempatan editorial di media Indonesia untuk membangun otoritas domain.', price: 'Harga per media, dalam penawaran' },
    ],
  },
  trust: ['Penulis spesialis Bahasa Indonesia', 'Akun Search Console & GA4 milik Anda', 'Laporan dan review setiap bulan'],
  highlights: {
    items: [
      { value: '5–30', label: 'artikel SEO per bulan, sesuai paket' },
      { value: '4–6', label: 'minggu sampai ranking mulai bergerak' },
      { value: '3', label: 'bulan sampai traffic organik mulai tumbuh berarti' },
    ],
    note: 'Perkiraan umum, bukan jaminan. Setiap website berbeda.',
  },
  included: {
    heading: 'Semua yang Anda dapatkan',
    lead: 'Dikelompokkan per bidang. Label Growth+ dan Khusus Full menandai item yang hanya ada di paket itu.',
    tabs: tabsOf(SEO_FEATURES_TABS, 'Khusus Full', (e, g, f) => `Entry ${e}, Growth ${g}, Full ${f} artikel per bulan.`, {
      keywords: { title: 'Keyword Komersial yang Ditarget', text: 'Kami prioritaskan keyword dengan niat beli, seperti "jasa …" atau "harga …", yang paling dekat ke penjualan, diurutkan menurut volume dan persaingan.' },
      conversion: 'Konversi',
      convItems: [
        { title: 'Tracking Konversi End-to-End', text: 'Kami lacak perjalanan pengunjung dari pertama masuk website sampai konversi akhir: chat WhatsApp, form terkirim, atau pembelian. Semuanya tercatat di GA4 milik Anda.' },
        { title: 'Conversion Rate Analysis', text: 'Kami analisis halaman yang ramai dikunjungi tapi belum menghasilkan chat atau form, lalu memberi rekomendasi perbaikan setiap bulan.' },
        { title: 'Conversion Rate Optimization', text: 'Hasil analisis kami terapkan: CTA, copy, form, dan kecepatan halaman diperbaiki, lalu dampaknya diukur di bulan berikutnya.' },
      ],
    }),
  },
  usp: {
    heading: 'SEO berbasis data, dibangun untuk konversi',
    lead: 'Traffic saja tidak cukup. Kami memilih keyword dari data, lalu mengukur apakah pengunjung berubah menjadi chat, form, dan penjualan.',
    cards: [
      { title: 'Berbasis data', text: 'Setiap keputusan berangkat dari data Anda sendiri, bukan tebakan.',
        points: ['Data Search Console, GA4, dan volume pencarian', 'Keyword diprioritaskan menurut potensi traffic dan persaingan', 'Laporan bulanan dengan periode dan sumber setiap angka'] },
      { title: 'Dibangun untuk konversi', text: 'Kami menarget pencari yang siap membeli, lalu memperbaiki halaman yang belum menghasilkan.',
        points: ['Keyword komersial yang dipakai calon pembeli', 'Tracking dari kunjungan pertama sampai konversi akhir', 'Conversion Rate Analysis dan Optimization setiap bulan'] },
    ],
  },
  process: true,
  compare: null, // owner 2026-10-04: no 'SEO vs Google Ads' panel
  stats: [
    'aio-id',
    'ctr-58',
    { text: 'Panduan Google: optimasi untuk AI search generatif tetap SEO', src: 'Google Search Central', year: 2026, url: 'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide' },
  ],
  ai: 'Artikel kami menjawab di kalimat pertama, sehingga mudah dikutip Google AI Overview, AI Mode, dan ChatGPT. Kami tidak menjamin kutipan.',
  faq: [
    { q: 'Apa itu jasa SEO?', a: 'Jasa SEO adalah layanan untuk membuat website Anda muncul lebih tinggi di hasil pencarian Google tanpa membayar per klik. Pekerjaannya meliputi riset keyword, penulisan konten, perbaikan teknikal, dan pelaporan. Di Logink, semuanya berjalan sebagai retainer bulanan dengan data dari Google Search Console dan GA4.' },
    { q: 'Apa jasa SEO terbaik di Indonesia?', a: 'Jasa SEO terbaik adalah yang cocok dengan bisnis Anda dan bisa menunjukkan pekerjaannya. Periksa lima hal: harga dan deliverable tertulis, konten untuk pencari Indonesia, akses penuh ke Search Console dan GA4, laporan bulanan yang jelas, dan tidak ada janji posisi pertama.' },
    { q: 'Berapa lama hingga hasil SEO mulai terlihat?', a: 'Pergerakan ranking awal biasanya terlihat dalam 4 sampai 6 minggu. Pertumbuhan traffic yang berarti mulai di bulan ketiga, dan hasil yang terus berlipat muncul sekitar bulan keenam. Berbeda dari iklan berbayar, hasil ini tidak berhenti saat budget habis, karena konten tetap bekerja.' },
    { q: 'Bagaimana progress dilaporkan?', a: 'Anda mendapat laporan performa bulanan berisi ranking keyword, traffic organik, halaman terbaik, dan data konversi. Paket Growth dan Full juga mendapat dashboard Looker Studio yang bisa dibuka kapan saja. Hasilnya kami tinjau bersama setiap bulan, dan akun Search Console serta GA4 tetap milik Anda.' },
    { q: 'Apakah link building sudah termasuk?', a: 'Belum. Link building adalah add-on di luar paket Entry, Growth, dan Full. Kami fokus pada penempatan editorial di media Indonesia, tanpa PBN dan tanpa direktori spam. Harganya tergantung media yang dipilih, jadi kami sampaikan dalam penawaran setelah memahami target bisnis Anda.' },
    { q: 'Apakah ranking dijamin?', a: 'Tidak. Tidak ada agensi SEO jujur yang bisa menjamin posisi tertentu, karena algoritma Google tidak dikendalikan siapa pun. Yang kami pegang adalah proses yang sistematis dan berbasis data, laporan yang transparan setiap bulan, serta keterbukaan soal apa yang berhasil dan apa yang perlu diubah.' },
  ],
  sources: [
    { label: 'Google: Panduan memulai SEO', url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide' },
    { label: 'Google: Fitur AI dan website Anda', url: 'https://developers.google.com/search/docs/appearance/ai-features' },
    { label: 'web.dev: Core Web Vitals', url: 'https://web.dev/articles/vitals' },
  ],
}

const en: ServiceContent = {
  answer: "Logink's professional SEO service makes your website easier for buyers to find on Google. Data-driven and built for conversions: commercial keyword research, 5 to 30 articles a month, technical fixes, conversion tracking and optimization, and a monthly report.",
  campaign: {
    fedBy: [
      { k: 'website', text: 'A fast, well-structured site gives SEO its technical base, so content can be crawled and climb the rankings.' },
      { k: 'social', text: 'Popular topics and audience questions on social media become article ideas.' },
      { k: 'ads', gate: 'K5', text: 'Search-term data from ads shows which words deserve content.' },
    ],
    feeds: [
      { k: 'ads', text: 'The same keyword research sharpens search ads, so ads and content answer the same words.' },
      { k: 'ai', text: 'Answer-first articles and clean schema are the main material that makes your brand worth citing in AI answers.' },
    ],
  },
  work: [
    { title: 'Bahasa Indonesia Keyword Research', text: 'What your customers actually search, ranked by traffic potential.' },
    { title: 'SEO Content & Articles', text: 'Specialist Indonesian writers, one primary keyword per article.' },
    { title: 'Technical SEO & Core Web Vitals', text: 'Speed, sitemap and schema, so pages load fast on mobile networks.' },
    { title: 'Monthly SEO: what happens every month', text: 'New articles, stronger older pages, a monthly strategy call.' },
    { title: 'SEO Audit', text: 'Crawl errors, slow pages and competitor gaps, checked at the start.' },
  ],
  pricing: {
    kind: 'tiers',
    tiers: SEO_PRICING_TIERS_EN.map((t) => ({ ...withOwner(t, 'Commercial Keyword Targeting', ['End-to-End Conversion Tracking', 'Conversion Rate Analysis', 'Conversion Rate Optimization']), price: t.price.replace(' Mio', 'M') })),
    addons: [
      { name: SEO_ADDONS_EN[0].name, text: "Show up in 'near me' searches and the Google map pack in your city.", href: '/en/services/local-seo#harga', linkText: 'See Local SEO & Google Maps pricing' },
      { name: SEO_ADDONS_EN[1].name, text: 'Editorial placements in Indonesian media to build domain authority.', price: 'Priced per outlet, in your proposal' },
    ],
  },
  trust: ['Specialist Bahasa Indonesia writers', 'Your own Search Console & GA4 accounts', 'A report and review every month'],
  highlights: {
    items: [
      { value: '5–30', label: 'SEO articles a month, by plan' },
      { value: '4–6', label: 'weeks until rankings start to move' },
      { value: '3', label: 'months until organic traffic grows meaningfully' },
    ],
    note: 'Typical estimates, not a guarantee. Every website is different.',
  },
  included: {
    heading: 'Everything you get',
    lead: 'Grouped by area. Growth+ and Full only mark items that come with those plans.',
    tabs: tabsOf(SEO_FEATURES_TABS_EN, 'Full only', (e, g, f) => `Entry ${e}, Growth ${g}, Full ${f} articles a month.`, {
      keywords: { title: 'Commercial Keywords to Target', text: 'We prioritise keywords with buying intent, such as "… services" or "… price", the searches closest to a sale, ranked by volume and competition.' },
      conversion: 'Conversion',
      convItems: [
        { title: 'End-to-End Conversion Tracking', text: 'We track the visitor journey from the first website visit to the final conversion: a WhatsApp chat, a sent form or a purchase. It all lands in your own GA4.' },
        { title: 'Conversion Rate Analysis', text: 'We analyse pages that get visits but no chats or form fills yet, and recommend fixes every month.' },
        { title: 'Conversion Rate Optimization', text: 'We act on the analysis: CTAs, copy, forms and page speed get fixed, and the impact is measured the following month.' },
      ],
    }),
  },
  usp: {
    heading: 'Data-driven SEO, built for conversions',
    lead: 'Traffic alone is not enough. We choose keywords from data, then measure whether visitors turn into chats, form fills and sales.',
    cards: [
      { title: 'Data-driven', text: 'Every decision starts from your own data, not guesswork.',
        points: ['Search Console, GA4 and search volume data', 'Keywords prioritised by traffic potential and competition', 'A monthly report with the period and source of every number'] },
      { title: 'Built for conversions', text: 'We target searchers who are ready to buy, then fix the pages that do not convert yet.',
        points: ['Commercial keywords that buyers actually use', 'Tracking from the first visit to the final conversion', 'Conversion Rate Analysis and Optimization every month'] },
    ],
  },
  process: true,
  compare: null,
  stats: [
    'aio-id',
    'ctr-58',
    { text: "Google's guide: optimizing for generative AI search is still SEO", src: 'Google Search Central', year: 2026, url: 'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide' },
  ],
  ai: 'Our articles answer in the first sentence, which makes them easy to cite in Google AI Overviews, AI Mode and ChatGPT. We do not guarantee citations.',
  faq: [
    { q: 'What is an SEO service?', a: 'An SEO service gets your website to appear higher in Google search results without paying per click. The work covers keyword research, content writing, technical fixes and reporting. At Logink it runs as a monthly retainer, measured in Search Console and GA4.' },
    { q: 'What is the best SEO service in Indonesia?', a: 'The best SEO service fits your business and can show its work. Check five things: written prices and deliverables, content for Indonesian searchers, full Search Console and GA4 access, a clear monthly report, and no promise of the top position.' },
    { q: 'How long does it take to see SEO results?', a: "Early ranking movement usually shows within 4 to 6 weeks. Meaningful traffic growth starts around month three, and compounding results kick in around month six. Unlike paid ads, these results don't stop when the budget stops, because content that ranks keeps working." },
    { q: 'How is progress reported?', a: 'You get a monthly report on keyword rankings, organic traffic, top pages and conversions. Growth and Full add a Looker Studio dashboard you can open anytime. We review the results together every month, and your Search Console and GA4 accounts stay yours.' },
    { q: 'Is link building included?', a: 'No. Link building is a separate add-on outside the monthly plans. We focus on editorial placements in Indonesian media, with no PBNs and no spammy directories. The price depends on the outlets, so we quote it in your proposal once we know your goals.' },
    { q: 'Do you guarantee rankings?', a: "No. No honest SEO agency can guarantee a specific position, because nobody controls Google's algorithm. What we commit to is a systematic, data-driven process, a transparent report every month, and openness about what is working and what needs to change." },
  ],
  sources: [
    { label: 'Google: SEO Starter Guide', url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide' },
    { label: 'Google: AI features and your website', url: 'https://developers.google.com/search/docs/appearance/ai-features' },
    { label: 'web.dev: Core Web Vitals', url: 'https://web.dev/articles/vitals' },
  ],
}

const content: Record<Locale, ServiceContent> = { id, en }
export default content
