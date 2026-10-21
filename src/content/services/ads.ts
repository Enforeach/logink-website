// Iklan Google & Meta Ads (BUILD §3.4). The X / X_EN exports are the vetted legacy copy, kept verbatim; the
// default export maps them into ServiceContent.
import type { Locale } from '@/lib/services'
import { liveDoc } from '@/cms/store'
import type { ServiceContent } from './types'

export const ADS_PRICING_TIERS = [
  {
    name: 'Entry',
    price: 'Rp 6 Juta',
    priceValue: 6000000,
    period: '/bulan',
    bestFor: 'Mulai mencoba Google Ads',
    platformCoverage: 'Google Ads saja',
    isPopular: false,
    features: [
      'Google Ads (Search, Display, Shopping)',
      'Setup Struktur Campaign & Ad Group',
      'Strategi Keyword Bidding',
      'Penulisan Ad Copy (Bahasa Indonesia)',
      'Conversion Tracking via GA4',
      'Laporan Performa Bulanan',
    ],
    addOnNote: 'Retargeting Campaign tersedia sebagai add-on',
    recommendedAdSpend: 'Rp 5–15 Juta/bln',
  },
  {
    name: 'Growth',
    price: 'Rp 12 Juta',
    priceValue: 12000000,
    period: '/bulan',
    bestFor: 'Scaling multi-platform',
    platformCoverage: 'Google + Meta + Marketplace',
    isPopular: true,
    features: [
      'Semua yang ada di Entry',
      'Meta Ads: Targeting Audiens Lokal',
      'Desain Ad Creative untuk Meta',
      'A/B Testing di Meta',
      'Pixel Setup & Retargeting',
      'Marketplace Ads (Tokopedia, Shopee, Lazada)',
      'Optimasi Keyword Produk',
      'Strategi Flash Sale & Voucher',
    ],
    addOnNote: null,
    recommendedAdSpend: 'Rp 15–50 Juta/bln',
  },
  {
    name: 'Full',
    price: 'Rp 20 Juta',
    priceValue: 20000000,
    period: '/bulan',
    bestFor: 'Jangkauan maksimal di semua platform',
    platformCoverage: 'Semua 5 platform',
    isPopular: false,
    features: [
      'Semua yang ada di Growth',
      'Setup TikTok Ads Manager',
      'Creative Brief & Produksi Video',
      'Targeting Audiens TikTok',
      'Optimasi Konversi',
      'Retargeting Campaign (sudah termasuk)',
    ],
    addOnNote: null,
    recommendedAdSpend: 'Rp 50 Juta+/bln',
  },
] as const

export const ADS_ADDONS = [
  {
    name: 'Retargeting Campaign',
    description:
      'Aktifkan kembali pengguna yang sudah mengunjungi situs Anda tetapi belum melakukan konversi. Bekerja di Google Display dan Meta untuk membawa prospek hangat kembali menyelesaikan pembelian.',
    availability: 'Add-on untuk Entry & Growth. Sudah termasuk di Full.',
    accentColor: '#F88438',
  },
  {
    name: 'Programmatic Display Advertising',
    description:
      'Pembelian display ad secara otomatis di jaringan publisher premium Indonesia. Jangkau audiens Anda dalam skala besar, di luar ekosistem Google dan Meta.',
    availability: 'Tersedia sebagai add-on untuk tier Growth & Full.',
    accentColor: '#A855F7',
  },
] as const

export const ADS_PLATFORMS = [
  {
    id: 'google',
    name: 'Google Ads',
    subtitle: 'Search · Display · Shopping',
    tagline: 'Tangkap pembeli high-intent tepat saat mereka mencari.',
    description:
      'Google Ads menempatkan brand Anda di puncak hasil pencarian saat pengguna Indonesia aktif mencari apa yang Anda jual. Search untuk intent, Display untuk retargeting dan brand awareness, Shopping untuk listing produk e-commerce.',
    features: [
      'Setup Struktur Campaign & Ad Group',
      'Strategi Keyword Bidding',
      'Penulisan Ad Copy (Bahasa Indonesia)',
      'Conversion Tracking via GA4',
      'Laporan Performa (bulanan)',
    ],
    tiers: { entry: true, growth: true, full: true },
    accentColor: '#F88438',
    accentRgb: '248,132,56',
  },
  {
    id: 'meta',
    name: 'Meta Ads',
    subtitle: 'Instagram & Facebook',
    tagline: 'Jangkau audiens ideal Anda dengan targeting presisi dan creative yang mencuri perhatian.',
    description:
      'Platform iklan Meta memberi Anda akses ke audiens media sosial terbesar di Indonesia. Targeting demografi lokal, audiens berbasis interest, retargeting berbasis perilaku, dan creative yang benar-benar menarik perhatian di feed.',
    features: [
      'Targeting Audiens Lokal',
      'Desain Ad Creative untuk Meta',
      'A/B Testing',
      'Pixel Setup & Retargeting',
      'Laporan Performa',
    ],
    tiers: { entry: false, growth: true, full: true },
    accentColor: '#1877F2',
    accentRgb: '24,119,242',
    tierNote: 'Tidak termasuk di tier Entry',
  },
  {
    id: 'tiktok',
    name: 'TikTok Ads',
    subtitle: 'In-feed · Spark · TopView',
    tagline: 'Iklan video format native yang dirancang untuk algoritma FYP.',
    description:
      'TikTok Ads menjangkau audiens termuda dan paling engaged di Indonesia. Kami setup Ads Manager Anda, memproduksi creative brief, menangani targeting audiens, dan mengoptimasi untuk konversi, bukan sekadar views.',
    features: [
      'Setup TikTok Ads Manager',
      'Creative Brief & Produksi',
      'Targeting Audiens',
      'Optimasi Konversi',
      'Laporan Performa',
    ],
    tiers: { entry: false, growth: false, full: true },
    accentColor: '#FE2C55',
    accentRgb: '254,44,85',
    tierNote: 'Eksklusif untuk tier Full',
  },
  {
    id: 'marketplace',
    name: 'Marketplace Ads',
    subtitle: 'Tokopedia · Shopee · Lazada',
    tagline: 'Menangkan buy box di platform e-commerce terbesar Indonesia.',
    description:
      'Iklan native platform yang menempatkan produk Anda di depan pembeli yang siap belanja. Optimasi keyword, strategi flash sale, dan kampanye voucher, dirancang untuk ekosistem marketplace Indonesia.',
    features: [
      'Setup Tokopedia Ads & Shopee Ads',
      'Optimasi Keyword Produk',
      'Strategi Flash Sale & Voucher',
      'Laporan Performa',
    ],
    tiers: { entry: false, growth: true, full: true },
    accentColor: '#10B981',
    accentRgb: '16,185,129',
    tierNote: 'Tidak termasuk di tier Entry',
  },
] as const

export const ADS_PROCESS = [
  {
    step: 1,
    title: 'Audit Akun',
    timeline: 'Minggu 1',
    description:
      'Review menyeluruh akun iklan yang ada, analisis pemborosan budget, evaluasi data audiens, dan setup conversion tracking. Jika mulai dari nol, kami setup setiap akun dari awal.',
    accentColor: '#A855F7',
  },
  {
    step: 2,
    title: 'Pemetaan Funnel',
    timeline: 'Minggu 1',
    description:
      'Tujuan kampanye didefinisikan di setiap tahap funnel, dari awareness hingga konversi. Kami petakan platform mana yang menangani tahap mana: Google Search untuk intent, Meta untuk awareness, TikTok untuk discovery. Setiap rupiah punya tujuan.',
    accentColor: '#D81C5C',
  },
  {
    step: 3,
    title: 'Produksi Creative',
    timeline: 'Minggu 1–2',
    description:
      'Ad copy dan visual dirancang khusus untuk setiap platform dan segmen audiens. Search ads mendapat copy yang dioptimasi untuk keyword. Meta mendapat visual yang mencuri perhatian. TikTok mendapat video format native. Tidak ada materi yang dipakai ulang antar platform.',
    accentColor: '#F88438',
  },
  {
    step: 4,
    title: 'Launch Kampanye',
    timeline: 'Minggu 2',
    description:
      'Tayang dengan budget terkontrol untuk pengumpulan data awal. Kami mulai konservatif, membiarkan algoritma mempelajari audiens ideal Anda, lalu menaikkan budget ke yang terbukti berhasil. Monitoring harian sejak hari pertama.',
    accentColor: '#F5A623',
  },
  {
    step: 5,
    title: 'Loop Optimasi',
    timeline: 'Mingguan',
    description:
      'Penyesuaian bid mingguan, penyempurnaan audiens, rotasi creative iklan, dan realokasi budget. Kami hentikan iklan yang underperform dengan cepat, perkuat yang berhasil, dan terus menguji sudut pandang baru. Review strategi bulanan bersama tim Anda.',
    accentColor: '#C084FC',
    isOngoing: true,
  },
] as const

export const ADS_FAQS = [
  {
    question: 'Platform iklan apa saja yang Anda kelola?',
    answer:
      'Kami mengelola Google Ads (Search, Display, Shopping), Meta Ads (Instagram & Facebook), TikTok Ads, dan marketplace Indonesia (Tokopedia, Shopee, Lazada). Ketersediaan platform tergantung tier Anda: Entry mencakup Google saja, Growth menambah Meta dan Marketplace, Full menambah TikTok. Untuk kebanyakan brand, kami rekomendasikan mulai dengan Google + Meta, lalu berkembang dari sana.',
  },
  {
    question: 'Berapa budget iklan minimum?',
    answer:
      'Tidak ada minimum baku, tetapi kami rekomendasikan setidaknya Rp 5 Juta/bulan untuk ad spend di Entry, Rp 15 Juta untuk Growth, dan Rp 50 Juta+ untuk Full. Budget lebih kecil bisa berhasil untuk kampanye hyper-lokal atau niche, tetapi menyebar terlalu tipis ke banyak platform akan menurunkan efektivitas. Kami akan menyarankan alokasi optimal saat onboarding.',
  },
  {
    question: 'Apa itu ROAS dan bagaimana cara Anda mengukurnya?',
    answer:
      'ROAS (Return on Ad Spend) mengukur revenue yang dihasilkan per rupiah yang dibelanjakan untuk iklan. Jika Anda membelanjakan Rp 10 Juta dan menghasilkan Rp 30 Juta revenue, ROAS Anda adalah 3×. Kami melacaknya melalui conversion tracking GA4, atribusi native platform, dan jika memungkinkan, integrasi CRM langsung. Klien kami biasanya mencapai ROAS 2-4× dalam 3 bulan.',
  },
  {
    question: 'Apakah saya punya akses ke akun iklan saya sendiri?',
    answer:
      'Tentu saja. Transparansi penuh bagi kami tidak bisa ditawar. Anda memiliki semua akun iklan (Google, Meta, TikTok). Kami bekerja di dalam akun Anda sebagai manager, bukan di akun kami sendiri. Jika suatu saat kita berpisah, Anda tetap memiliki semuanya: kampanye, audiens, data, dan histori performa. Tidak ada yang kami tahan.',
  },
  {
    question: 'Berapa lama sampai iklan tayang?',
    answer:
      'Biasanya 2 minggu dari kickoff. Minggu 1 adalah audit akun, pemetaan funnel, dan produksi creative. Minggu 2 adalah launch kampanye dengan budget awal. Kami mulai melihat data dalam beberapa hari setelah launch, dan pola optimasi yang berarti muncul dalam 2–4 minggu.',
  },
  {
    question: 'Apakah Anda menangani creative (gambar/video) untuk iklan?',
    answer:
      'Untuk Meta Ads, ya: desain ad creative sudah termasuk di tier Growth dan Full. Untuk produksi video TikTok, creative brief dan produksi sudah termasuk di tier Full. Untuk kebutuhan creative yang lebih kompleks, kami dapat menggabungkannya dengan tim Creative Services kami dengan harga khusus.',
  },
  {
    question: 'Apa bedanya management fee dan ad spend?',
    answer:
      'Management fee (yang Anda bayar ke Logink) mencakup strategi, setup, copywriting, creative, optimasi harian, dan pelaporan. Ad spend (yang Anda bayar langsung ke Google/Meta/TikTok) adalah budget media yang mendanai impresi dan klik. Anggap management fee sebagai membayar pilotnya; ad spend adalah bahan bakarnya. Keduanya transparan dan sepenuhnya Anda kendalikan.',
  },
] as const

export const ADS_STATS = [
  {
    value: '2–4×',
    label: 'Rata-rata ROAS',
    context: 'Return on ad spend di kampanye klien pada bulan ke-3. Kami optimasi hingga target tercapai.',
  },
  {
    value: '~35%',
    label: 'Rata-rata Penurunan CPA',
    context: 'Pengurangan cost per acquisition setelah 90 hari optimasi, dibandingkan agency sebelumnya atau tim in-house klien.',
  },
  {
    value: '5',
    label: 'Platform Iklan',
    context: 'Google, Meta, TikTok, Tokopedia, Shopee: dikelola sebagai satu ekosistem cross-platform.',
  },
] as const

// ─── English exports ─────────────────────────────────────────────────────────

export const ADS_PRICING_TIERS_EN = [
  {
    name: 'Entry',
    price: 'Rp 6 Juta',
    priceValue: 6000000,
    period: '/month',
    bestFor: 'Testing the waters with Google Ads',
    platformCoverage: 'Google Ads only',
    isPopular: false,
    features: [
      'Google Ads (Search, Display, Shopping)',
      'Campaign & Ad Group Structure Setup',
      'Keyword Bidding Strategy',
      'Ad Copywriting (Bahasa Indonesia)',
      'Conversion Tracking via GA4',
      'Monthly Performance Report',
    ],
    addOnNote: 'Retargeting Campaign available as add-on',
    recommendedAdSpend: 'Rp 5–15 Juta/mo',
  },
  {
    name: 'Growth',
    price: 'Rp 12 Juta',
    priceValue: 12000000,
    period: '/month',
    bestFor: 'Multi-platform scaling',
    platformCoverage: 'Google + Meta + Marketplace',
    isPopular: true,
    features: [
      'Everything in Entry',
      'Meta Ads: Local Audience Targeting',
      'Creative Ad Design for Meta',
      'A/B Testing on Meta',
      'Pixel Setup & Retargeting',
      'Marketplace Ads (Tokopedia, Shopee, Lazada)',
      'Product Keyword Optimization',
      'Flash Sale & Voucher Strategy',
    ],
    addOnNote: null,
    recommendedAdSpend: 'Rp 15–50 Juta/mo',
  },
  {
    name: 'Full',
    price: 'Rp 20 Juta',
    priceValue: 20000000,
    period: '/month',
    bestFor: 'Maximum reach across all platforms',
    platformCoverage: 'All 5 platforms',
    isPopular: false,
    features: [
      'Everything in Growth',
      'TikTok Ads Manager Setup',
      'Creative Brief & Video Production',
      'TikTok Audience Targeting',
      'Conversion Optimization',
      'Retargeting Campaign (included)',
    ],
    addOnNote: null,
    recommendedAdSpend: 'Rp 50 Juta+/mo',
  },
] as const

export const ADS_ADDONS_EN = [
  {
    name: 'Retargeting Campaign',
    description:
      "Re-engage users who visited your site but didn't convert. Works across Google Display and Meta, bringing warm leads back to complete their purchase.",
    availability: 'Add-on for Entry & Growth. Included in Full.',
    accentColor: '#F88438',
  },
  {
    name: 'Programmatic Display Advertising',
    description:
      "Automated display ad buying across premium Indonesian publisher networks. Reach your audience at scale beyond Google and Meta's ecosystems.",
    availability: 'Available as add-on for Growth & Full tiers.',
    accentColor: '#A855F7',
  },
] as const

export const ADS_PLATFORMS_EN = [
  {
    id: 'google',
    name: 'Google Ads',
    subtitle: 'Search · Display · Shopping',
    tagline: "Capture high-intent buyers the moment they're searching.",
    description:
      'Google Ads puts your brand at the top of search results when Indonesian users are actively looking for what you sell. Search for intent, Display for retargeting and brand awareness, Shopping for e-commerce product listings.',
    features: [
      'Campaign & Ad Group Structure Setup',
      'Keyword Bidding Strategy',
      'Ad Copywriting (Bahasa Indonesia)',
      'Conversion Tracking via GA4',
      'Performance Report (monthly)',
    ],
    tiers: { entry: true, growth: true, full: true },
    accentColor: '#F88438',
    accentRgb: '248,132,56',
  },
  {
    id: 'meta',
    name: 'Meta Ads',
    subtitle: 'Instagram & Facebook',
    tagline: 'Reach your ideal audience with precision targeting and scroll-stopping creative.',
    description:
      "Meta's advertising platform gives you access to Indonesia's largest social audience. Local demographic targeting, interest-based audiences, behavioral retargeting, and creative that actually stops the scroll.",
    features: [
      'Local Audience Targeting',
      'Creative Ad Design for Meta',
      'A/B Testing',
      'Pixel Setup & Retargeting',
      'Performance Report',
    ],
    tiers: { entry: false, growth: true, full: true },
    accentColor: '#1877F2',
    accentRgb: '24,119,242',
    tierNote: 'Not included in Entry tier',
  },
  {
    id: 'tiktok',
    name: 'TikTok Ads',
    subtitle: 'In-feed · Spark · TopView',
    tagline: 'Native-format video ads designed for the FYP algorithm.',
    description:
      "TikTok Ads reach Indonesia's youngest, most engaged audience. We set up your Ads Manager, produce creative briefs, handle audience targeting, and optimize for conversions, not just views.",
    features: [
      'TikTok Ads Manager Setup',
      'Creative Brief & Production',
      'Audience Targeting',
      'Conversion Optimization',
      'Performance Report',
    ],
    tiers: { entry: false, growth: false, full: true },
    accentColor: '#FE2C55',
    accentRgb: '254,44,85',
    tierNote: 'Exclusive to Full tier',
  },
  {
    id: 'marketplace',
    name: 'Marketplace Ads',
    subtitle: 'Tokopedia · Shopee · Lazada',
    tagline: "Win the buy box on Indonesia's biggest e-commerce platforms.",
    description:
      'Platform-native ads that put your products in front of ready-to-buy shoppers. Keyword optimization, flash sale strategy, and voucher campaigns, built for the Indonesian marketplace ecosystem.',
    features: [
      'Tokopedia Ads & Shopee Ads Setup',
      'Product Keyword Optimization',
      'Flash Sale & Voucher Strategy',
      'Performance Report',
    ],
    tiers: { entry: false, growth: true, full: true },
    accentColor: '#10B981',
    accentRgb: '16,185,129',
    tierNote: 'Not included in Entry tier',
  },
] as const

export const ADS_PROCESS_EN = [
  {
    step: 1,
    title: 'Account Audit',
    timeline: 'Week 1',
    description:
      "Full review of existing ad accounts, wasted spend analysis, audience data evaluation, and conversion tracking setup. If you're starting fresh, we set up every account from scratch.",
    accentColor: '#A855F7',
  },
  {
    step: 2,
    title: 'Funnel Mapping',
    timeline: 'Week 1',
    description:
      'Campaign objectives defined at each funnel stage, from awareness to conversion. We map which platforms handle which stage: Google Search for intent, Meta for awareness, TikTok for discovery. Every rupiah has a purpose.',
    accentColor: '#D81C5C',
  },
  {
    step: 3,
    title: 'Creative Production',
    timeline: 'Week 1–2',
    description:
      'Ad copy and visuals built for each platform and audience segment. Search ads get keyword-optimized copy. Meta gets scroll-stopping visuals. TikTok gets native-format video. Nothing recycled across platforms.',
    accentColor: '#F88438',
  },
  {
    step: 4,
    title: 'Campaign Launch',
    timeline: 'Week 2',
    description:
      "Live with controlled budgets for initial data gathering. We start conservative, letting the algorithms learn your ideal audience, then scale spend into what's working. Daily monitoring from day one.",
    accentColor: '#F5A623',
  },
  {
    step: 5,
    title: 'Optimization Loops',
    timeline: 'Weekly',
    description:
      'Weekly bid adjustments, audience refinement, ad creative rotation, and budget reallocation. We kill underperforming ads fast, double down on winners, and continuously test new angles. Monthly strategy review with your team.',
    accentColor: '#C084FC',
    isOngoing: true,
  },
] as const

export const ADS_FAQS_EN = [
  {
    question: 'Which ad platforms do you manage?',
    answer:
      'We manage Google Ads (Search, Display, Shopping), Meta Ads (Instagram & Facebook), TikTok Ads, and Indonesian marketplace platforms (Tokopedia, Shopee, Lazada). Platform availability depends on your tier: Entry covers Google only, Growth adds Meta and Marketplace, Full adds TikTok. We recommend starting with Google + Meta for most brands, then expanding.',
  },
  {
    question: 'What is the minimum ad budget?',
    answer:
      "There's no hard minimum, but we recommend at least Rp 5 Juta/month in ad spend for Entry, Rp 15 Juta for Growth, and Rp 50 Juta+ for Full. Smaller budgets can work for hyper-local or niche campaigns, but spreading too thin across platforms reduces effectiveness. We'll advise on optimal allocation during onboarding.",
  },
  {
    question: 'What is ROAS and how do you measure it?',
    answer:
      'ROAS (Return on Ad Spend) measures revenue generated per rupiah spent on ads. If you spend Rp 10 Juta and generate Rp 30 Juta in revenue, your ROAS is 3×. We track this through GA4 conversion tracking, platform-native attribution, and where possible, direct CRM integration. Our clients typically achieve 2-4× ROAS within 3 months.',
  },
  {
    question: 'Will I have access to my own ad accounts?',
    answer:
      'Absolutely, full transparency is non-negotiable. You own all ad accounts (Google, Meta, TikTok). We work inside your accounts as managers, never in our own. If we part ways, you keep everything: campaigns, audiences, data, and historical performance. Nothing is held hostage.',
  },
  {
    question: 'How long until ads go live?',
    answer:
      'Typically 2 weeks from kickoff. Week 1 is account audit, funnel mapping, and creative production. Week 2 is campaign launch with initial budgets. We start seeing data within days of launch, and meaningful optimization patterns emerge within 2–4 weeks.',
  },
  {
    question: 'Do you handle the creative (images/videos) for ads?',
    answer:
      'For Meta Ads, yes: creative ad design is included in Growth and Full tiers. For TikTok video production, creative briefs and production are included in the Full tier. For more complex creative needs, we can bundle in our Creative Services team at a discounted rate.',
  },
  {
    question: "What's the difference between management fee and ad spend?",
    answer:
      "Management fee (what you pay Logink) covers strategy, setup, copywriting, creative, daily optimization, and reporting. Ad spend (what you pay Google/Meta/TikTok directly) is your media budget that funds actual impressions and clicks. Think of management fee as paying the pilot; ad spend is the fuel. Both are transparent and you control both.",
  },
] as const

export const ADS_STATS_EN = [
  {
    value: '2–4×',
    label: 'Average ROAS',
    context: 'Return on ad spend across client campaigns at the 3-month mark. We optimize until we hit it.',
  },
  {
    value: '~35%',
    label: 'Avg. CPA Drop',
    context: "Cost per acquisition reduction after 90 days of optimization vs. client's previous agency or in-house.",
  },
  {
    value: '5',
    label: 'Ad Platforms',
    context: 'Google, Meta, TikTok, Tokopedia, Shopee: managed as one cross-platform ecosystem.',
  },
] as const

// ─── ServiceContent (redesign) ───────────────────────────────────────────────
// Dropped from the legacy copy (unverified): the ROAS range, the CPA-drop percentage, "Klien kami biasanya
// mencapai…", "Anda memiliki semua…data" (narrowed to ad accounts, GA4 and Search Console, §11 1.3).
// Owner decision 6 (§11 3.6): the retargeting tiers contradict each other, so no copy names a tier for it:
// 'Pixel Setup & Retargeting' shows as 'Pixel Setup' and the add-on's tier line is replaced. K11: nothing here
// says Logink runs click-to-WhatsApp ads; ads lead to a landing page whose button opens WhatsApp.

const tierId = (n: string) => n.toLowerCase()
const idr = (s: string) => s.replace(/^Rp (\S+) Juta/, 'IDR $1M').replace('Juta', 'M').replace(/^Rp /, 'IDR ')

// Rich page (owner 2026-10-04, benchmarked on the live page; the SEO page's pattern): the four platform cards with
// their marks as the USP, the film's scope (strategy & audit, ads, creative, tracking) as tabs, plan lists on the
// cards (no matrix, no comparison panel), the homepage process. The dropped claims above stay out.
const LOGO = { google: 'google', meta: 'meta', tiktok: 'tiktok', marketplace: 'shopee' } as const
// owner decision 6 on the cards too: no plan is named for retargeting (the add-on line says it is in the proposal)
const noRt = (fs: readonly string[]) => fs.filter((f) => !/^Retargeting Campaign/.test(f)).map((f) => f.replace(/ & Retargeting$/, ''))
const platforms = (ps: typeof ADS_PLATFORMS | typeof ADS_PLATFORMS_EN, avail: string, names: Record<string, string>) =>
  ps.map((x) => ({
    title: x.name, sub: x.subtitle, text: x.tagline, logo: LOGO[x.id as keyof typeof LOGO],
    points: x.features.filter((f) => !/^Laporan Performa|^Performance Report/.test(f)).map((f) => f.replace(/ & Retargeting$/, '')),
    tag: `${avail}: ${(['entry', 'growth', 'full'] as const).filter((t) => x.tiers[t]).map((t) => names[t]).join(' · ')}`,
  }))

const id: ServiceContent = {
  answer: 'Jasa iklan digital Logink mengelola Google Ads, Meta Ads, TikTok Ads, dan Marketplace Ads, dari riset keyword dan materi iklan sampai optimasi mingguan. Iklan mengantar pembeli ke landing page dengan tombol WhatsApp, dan akun iklan, GA4, serta Search Console tetap milik Anda.',
  showcase: 'Ilustrasi dengan data contoh: iklan mengantar pembeli ke landing page, lalu tombol WhatsApp di halaman itu membuka chat. Belum ada studi kasus publik untuk layanan ini.',
  campaign: {
    fedBy: [
      { k: 'seo', text: 'Kata kunci dari riset SEO menjadi dasar struktur kampanye dan copy iklan pencarian.' },
      { k: 'creative', text: 'Materi dan copy iklan dibuat per platform oleh tim kreatif dari ide kampanye yang sama.' },
      { k: 'website', text: 'GA4 dan Meta Pixel di website menyediakan data konversi dan audiens untuk retargeting.' },
    ],
    feeds: [
      { k: 'website', text: 'Iklan mengantar trafik ke landing page kampanye, lengkap dengan tombol WhatsApp.' },
      { k: 'wa', gate: 'K11', text: 'Iklan click-to-WhatsApp membuka chat langsung dari iklan.' },
      { k: 'seo', gate: 'K5', text: 'Data search term dari iklan menunjukkan kata yang layak dijadikan konten.' },
    ],
  },
  work: [
    { title: 'Jasa Google Ads', text: 'Search, Display, dan Shopping, dengan conversion tracking GA4.' },
    { title: 'Jasa Meta Ads (Facebook & Instagram)', text: 'Targeting audiens lokal, desain materi, dan A/B testing.', card: 'AdToChat' },
    { title: 'Jasa TikTok Ads', text: 'Setup Ads Manager dan video format native untuk konversi.' },
    { title: 'Marketplace Ads', text: 'Tokopedia, Shopee, dan Lazada: keyword produk dan flash sale.' },
    { title: 'Optimasi Mingguan', text: 'Bid, audiens, dan materi disesuaikan setiap minggu.' },
  ],
  pricing: {
    kind: 'tiers',
    tiers: ADS_PRICING_TIERS.map((t) => ({ ...t, features: noRt(t.features), id: tierId(t.name), note: `Management fee · saran budget iklan ${t.recommendedAdSpend}` })),
    note: 'Management fee dibayar ke Logink. Budget iklan dibayar langsung ke Google, Meta, atau TikTok, terpisah dari biaya jasa.',
    addons: [
      { name: ADS_ADDONS[0].name, text: 'Menyapa lagi pengunjung situs yang belum konversi. Paket yang mencakupnya kami tulis di penawaran.' },
      { name: ADS_ADDONS[1].name, text: ADS_ADDONS[1].availability },
    ],
  },
  compare: null,
  trust: ['Akun iklan tetap milik Anda', 'Optimasi setiap minggu', 'Budget iklan dibayar langsung ke platform'],
  highlights: {
    items: [
      { value: '4', label: 'platform: Google, Meta, TikTok, dan Marketplace' },
      { value: '2', label: 'minggu dari kickoff sampai iklan tayang, biasanya' },
      { value: '3', label: 'paket, management fee terpisah dari budget iklan' },
    ],
    note: 'Jadwal adalah perkiraan umum, bukan jaminan hasil.',
  },
  usp: {
    heading: 'Satu strategi, empat platform iklan',
    accent: 3,
    lead: 'Google menangkap niat, Meta membangun awareness, TikTok mendorong discovery, dan Marketplace mengonversi pembeli. Semuanya dijalankan sebagai satu kampanye.',
    pop: -1,
    cards: platforms(ADS_PLATFORMS, 'Tersedia di', { entry: 'Entry', growth: 'Growth', full: 'Full' }),
  },
  included: {
    heading: 'Semua yang Anda dapatkan',
    lead: 'Dikelompokkan per bidang. Label Growth+ dan Khusus Full menandai item yang hanya ada di paket itu.',
    tabs: [
      { label: 'Strategi & Audit', items: [
        { title: 'Audit Akun', text: 'Review akun iklan yang ada, pemborosan budget, dan data audiens. Mulai dari nol? Kami setup setiap akun dari awal.' },
        { title: 'Pemetaan Funnel', text: 'Setiap platform punya tugas: Google untuk niat, Meta untuk awareness, TikTok untuk discovery.' },
        { title: 'Saran Budget Iklan', text: 'Alokasi budget per platform disarankan saat onboarding, lalu pemakaiannya dilaporkan setiap bulan.' },
      ] },
      { label: 'Iklan', items: [
        { title: 'Google Ads', text: 'Struktur kampanye dan ad group, strategi keyword bidding: Search, Display, dan Shopping.' },
        { title: 'Meta Ads', text: 'Targeting audiens lokal di Instagram dan Facebook.', badge: 'Growth+' },
        { title: 'Marketplace Ads', text: 'Tokopedia, Shopee, dan Lazada: optimasi keyword produk, strategi flash sale dan voucher.', badge: 'Growth+' },
        { title: 'TikTok Ads', text: 'Setup TikTok Ads Manager, targeting audiens, dan optimasi untuk konversi.', badge: 'Khusus Full' },
      ] },
      { label: 'Kreatif', items: [
        { title: 'Ad Copy Bahasa Indonesia', text: 'Copy iklan pencarian yang ditulis untuk keyword yang Anda tuju.' },
        { title: 'Desain Materi Meta', text: 'Visual iklan untuk feed Instagram dan Facebook, diuji lewat A/B testing.', badge: 'Growth+' },
        { title: 'Produksi Video TikTok', text: 'Creative brief dan video format native untuk feed TikTok.', badge: 'Khusus Full' },
        { title: 'Arah ke Landing Page', text: 'Iklan mengantar pembeli ke landing page dengan tombol WhatsApp. Halaman baru bisa dibuat lewat layanan Website.' },
      ] },
      { label: 'Tracking & Optimasi', items: [
        { title: 'Conversion Tracking GA4', text: 'Setiap konversi dari iklan tercatat di GA4 milik Anda.' },
        { title: 'Pixel Setup', text: 'Meta Pixel terpasang untuk data konversi dan audiens.', badge: 'Growth+' },
        { title: 'Optimasi Mingguan', text: 'Bid, audiens, dan materi disesuaikan setiap minggu: yang kurang berhasil dihentikan, yang berhasil diperkuat.' },
        { title: 'Laporan Performa Bulanan', text: 'Pemakaian budget, hasil per platform, dan langkah bulan berikutnya.' },
      ] },
    ],
  },
  process: true,
  stats: ['ctr-58', 'pew-8-15', 'aio-id'],
  ai: 'Iklan sendiri tidak membuat brand Anda dikutip AI. Yang membantu adalah landing page yang jelas dan konten yang menjawab pertanyaan pembeli. Kami tidak menjamin kutipan.',
  faq: [
    { q: 'Apakah Google Ads gratis?', a: 'Tidak. Anda membayar budget iklan langsung ke Google, biasanya per klik, dan biaya itu terpisah dari management fee Logink. Kami menyarankan alokasi budget saat onboarding dan melaporkan pemakaiannya setiap bulan, sehingga Anda tahu ke mana setiap rupiah pergi.' },
    { q: 'Platform iklan apa saja yang Anda kelola?', a: 'Google Ads (Search, Display, Shopping), Meta Ads untuk Instagram dan Facebook, TikTok Ads, dan Marketplace Ads di Tokopedia, Shopee, serta Lazada. Entry mencakup Google, Growth menambah Meta dan Marketplace, dan Full menambah TikTok. Untuk sebagian besar brand, kami sarankan mulai dari Google dan Meta.' },
    { q: 'Apa itu ROAS dan bagaimana cara Anda mengukurnya?', a: 'ROAS (Return on Ad Spend) adalah pendapatan per rupiah budget iklan: belanja Rp 10 Juta yang menghasilkan Rp 30 Juta berarti ROAS 3×. Kami mengukurnya lewat conversion tracking GA4, atribusi bawaan platform, dan bila memungkinkan, integrasi CRM langsung.' },
    { q: 'Apakah saya punya akses ke akun iklan sendiri?', a: 'Ya. Akun iklan, GA4, dan Search Console tetap milik Anda. Kami bekerja di dalam akun Anda sebagai manager, bukan di akun kami. Jika kerja sama berakhir, kampanye, audiens, dan histori performa tetap ada di akun Anda.' },
    { q: 'Berapa lama sampai iklan tayang?', a: 'Biasanya 2 minggu dari kickoff. Minggu pertama untuk audit akun, pemetaan funnel, dan produksi materi; minggu kedua kampanye tayang dengan budget awal yang terkontrol. Data mulai terlihat beberapa hari setelah tayang, dan pola optimasi yang berarti muncul dalam 2 sampai 4 minggu.' },
    { q: 'Apakah Anda menangani materi iklan?', a: 'Ya. Desain materi Meta Ads termasuk di paket Growth dan Full, dan creative brief serta produksi video TikTok termasuk di paket Full. Untuk kebutuhan yang lebih kompleks, iklan bisa digabungkan dengan layanan Desain Grafis & Video kami.' },
  ],
  sources: [],
}

const en: ServiceContent = {
  answer: "Logink's paid advertising service runs Google Ads, Meta Ads, TikTok Ads and Marketplace Ads, from keyword research and ad creative to weekly optimization. Ads take buyers to a landing page with a WhatsApp button, and your ad accounts, GA4 and Search Console stay yours.",
  showcase: 'Illustration with sample data: an ad takes the buyer to a landing page, and the WhatsApp button on that page opens the chat. There is no public case study for this service yet.',
  campaign: {
    fedBy: [
      { k: 'seo', text: 'Keywords from SEO research shape the campaign structure and the search ad copy.' },
      { k: 'creative', text: 'Ad creative and copy are made per platform by the creative team from the same campaign idea.' },
      { k: 'website', text: 'GA4 and the Meta Pixel on the website provide conversion data and audiences for retargeting.' },
    ],
    feeds: [
      { k: 'website', text: 'Ads bring traffic to campaign landing pages, complete with a WhatsApp button.' },
      { k: 'wa', gate: 'K11', text: 'Click-to-WhatsApp ads open a chat straight from the ad.' },
      { k: 'seo', gate: 'K5', text: 'Search-term data from ads shows which words deserve content.' },
    ],
  },
  work: [
    { title: 'Google Ads Management', text: 'Search, Display and Shopping, with GA4 conversion tracking.' },
    { title: 'Meta Ads (Facebook & Instagram)', text: 'Local audience targeting, ad design and A/B testing.', card: 'AdToChat' },
    { title: 'TikTok Ads', text: 'Ads Manager setup and native-format video built to convert.' },
    { title: 'Marketplace Ads', text: 'Tokopedia, Shopee and Lazada: product keywords and flash sales.' },
    { title: 'Weekly Optimization', text: 'Bids, audiences and creative adjusted every week.' },
  ],
  pricing: {
    kind: 'tiers',
    tiers: ADS_PRICING_TIERS_EN.map((t) => ({ ...t, features: noRt(t.features), id: tierId(t.name), price: idr(t.price), note: `Management fee · suggested ad spend ${idr(t.recommendedAdSpend)}` })),
    note: 'The management fee is paid to Logink. Ad spend is paid directly to Google, Meta or TikTok, separate from our fee.',
    addons: [
      { name: ADS_ADDONS_EN[0].name, text: 'Reaches site visitors who have not converted yet. The plans that include it are set out in your proposal.' },
      { name: ADS_ADDONS_EN[1].name, text: ADS_ADDONS_EN[1].availability },
    ],
  },
  compare: null,
  trust: ['Your ad accounts stay yours', 'Optimized every week', 'Ad spend paid directly to the platforms'],
  highlights: {
    items: [
      { value: '4', label: 'platforms: Google, Meta, TikTok and Marketplace' },
      { value: '2', label: 'weeks from kickoff until ads go live, usually' },
      { value: '3', label: 'plans, management fee separate from ad spend' },
    ],
    note: 'Timings are typical estimates, not a guarantee of results.',
  },
  usp: {
    heading: 'One strategy, four ad platforms',
    accent: 3,
    lead: 'Google captures intent, Meta builds awareness, TikTok drives discovery and Marketplace converts buyers. All run as one campaign.',
    pop: -1,
    cards: platforms(ADS_PLATFORMS_EN, 'Available in', { entry: 'Entry', growth: 'Growth', full: 'Full' }),
  },
  included: {
    heading: 'Everything you get',
    lead: 'Grouped by area. Growth+ and Full only mark items that come with those plans.',
    tabs: [
      { label: 'Strategy & Audit', items: [
        { title: 'Account Audit', text: 'A review of your ad accounts, wasted spend and audience data. Starting from zero? We set up every account from scratch.' },
        { title: 'Funnel Mapping', text: 'Every platform has a job: Google for intent, Meta for awareness, TikTok for discovery.' },
        { title: 'Ad Spend Advice', text: 'A budget split per platform recommended at onboarding, with the spend reported every month.' },
      ] },
      { label: 'Ads', items: [
        { title: 'Google Ads', text: 'Campaign and ad group structure, keyword bidding strategy: Search, Display and Shopping.' },
        { title: 'Meta Ads', text: 'Local audience targeting on Instagram and Facebook.', badge: 'Growth+' },
        { title: 'Marketplace Ads', text: 'Tokopedia, Shopee and Lazada: product keyword optimization, flash sale and voucher strategy.', badge: 'Growth+' },
        { title: 'TikTok Ads', text: 'TikTok Ads Manager setup, audience targeting and optimization for conversions.', badge: 'Full only' },
      ] },
      { label: 'Creative', items: [
        { title: 'Ad Copy', text: 'Search ad copy written for the keywords you target.' },
        { title: 'Meta Ad Design', text: 'Ad visuals for Instagram and Facebook feeds, tested with A/B testing.', badge: 'Growth+' },
        { title: 'TikTok Video Production', text: 'A creative brief and native-format video for the TikTok feed.', badge: 'Full only' },
        { title: 'Landing Page Direction', text: 'Ads take buyers to a landing page with a WhatsApp button. New pages can be built through our Website service.' },
      ] },
      { label: 'Tracking & Optimization', items: [
        { title: 'GA4 Conversion Tracking', text: 'Every conversion from the ads is recorded in your own GA4.' },
        { title: 'Pixel Setup', text: 'The Meta Pixel installed for conversion and audience data.', badge: 'Growth+' },
        { title: 'Weekly Optimization', text: 'Bids, audiences and creative adjusted every week: what underperforms stops, what works gets more.' },
        { title: 'Monthly Performance Report', text: 'Ad spend, results per platform and next month\'s steps.' },
      ] },
    ],
  },
  process: true,
  stats: ['ctr-58', 'pew-8-15', 'aio-id'],
  ai: 'Ads alone do not get your brand cited by AI. What helps is a clear landing page and content that answers buyers’ questions. We do not guarantee citations.',
  faq: [
    { q: 'Is Google Ads free?', a: 'No. You pay the ad spend directly to Google, usually per click, and it is separate from the Logink management fee. We recommend a budget split during onboarding and report the spend every month, so you know where every rupiah goes.' },
    { q: 'Which ad platforms do you manage?', a: 'Google Ads (Search, Display, Shopping), Meta Ads for Instagram and Facebook, TikTok Ads, and Marketplace Ads on Tokopedia, Shopee and Lazada. Entry covers Google, Growth adds Meta and Marketplace, and Full adds TikTok. For most brands we recommend starting with Google and Meta.' },
    { q: 'What is ROAS and how do you measure it?', a: 'ROAS (Return on Ad Spend) is revenue per rupiah of ad spend: spending IDR 10M to generate IDR 30M is a ROAS of 3×. We measure it through GA4 conversion tracking, the platforms’ own attribution and, where possible, a direct CRM integration.' },
    { q: 'Do I get access to my own ad accounts?', a: 'Yes. Your ad accounts, GA4 and Search Console stay yours. We work inside your accounts as a manager, not in ours. If we part ways, the campaigns, audiences and performance history stay in your accounts.' },
    { q: 'How long until ads go live?', a: 'Usually 2 weeks from kickoff. Week one covers the account audit, funnel mapping and creative production; in week two the campaigns launch with a controlled starting budget. Data shows within days of launch, and meaningful optimization patterns appear within 2 to 4 weeks.' },
    { q: 'Do you handle the ad creative?', a: 'Yes. Meta ad design is included in the Growth and Full plans, and the TikTok creative brief and video production are included in Full. For more complex needs, ads can be combined with our Graphic Design & Video service.' },
  ],
  sources: [],
}

export default liveDoc('service-pages', 'ads', 'content', { id, en } satisfies Record<Locale, ServiceContent>)
