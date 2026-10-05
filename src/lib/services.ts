// src/lib/services.ts: the ONE registry for the redesign (BUILD §3.1; owner Core, frozen after W1).
// Read by: ds/chrome (header, menus, LanguageLink, ClosingBand, WaPill, BottomBar, footer), ServicesTable,
// StageStrip, CrossSell, src/lib/meta.ts, src/app/sitemap.xml/route.ts, src/app/llms.txt/route.ts,
// next.config.ts redirects() (relative import: no '@/' alias in this file). Check: pnpm check:registry.
// ponytail: price SUMMARY lives here; tier detail lives in src/content/services/<svc>.ts.
// services.check.ts asserts both agree. Split a facts file out only if this passes ~450 lines.

export type Locale = 'id' | 'en'
export type StageKey = 'ditemukan' | 'dipercaya' | 'dikutip' | 'dihubungi'
export type Light = 'putih' | 'kertas' | 'senja' | 'malam'
export type SvcKey = 'seo' | 'localseo' | 'ads' | 'social' | 'creative' | 'website' | 'ai'
export type L = Record<Locale, string>

export const SITE_URL = 'https://logink.co'
export const WA_NUMBER = '628139453933' // owner decision 15; the anti-scam line prints the same number
export const WA_DISPLAY = '+62 813-9453-933'
export const EMAIL = 'hello@logink.co'
export const INSTAGRAM = 'https://instagram.com/logink.co'
export const AI_PAGE_LIVE = true // owner decision 1 (BUILD §7.1-A): the AI pair ships
export const AI_BASELINE_LIVE = true // owner default 7: publish the honest baseline; false hides it everywhere

// Owner gates (decisions 5 and 8). Empty = the slot hides or falls back; never placeholder text.
export type Reviewer = { name: string; jobTitle: L; sameAs?: string }
export const REVIEWER: Reviewer | null = null // owner decision 8: hides every 'Ditinjau oleh' line and reviewedBy
export const APPROVED_CASE_SLUGS: string[] = [] // add a slug only after its data defects are fixed
export const CASE_SERVICES: Record<string, SvcKey[]> = {
  // CMS caseStudyServices is empty on all 3; mapping kept here until the CMS field is filled.
  'traffic-organik-pariwisata-bali': ['seo'],
  'pameran-fnb-internasional-case-study': ['seo'],
  'franchise-hub-case-studies': ['seo'],
}

export const ENTITY: L = {
  id: 'Logink adalah agensi digital marketing 360° di Jakarta untuk UMKM dan brand yang sedang bertumbuh di Indonesia: SEO & konten, Local SEO & Google Maps, social media, iklan berbayar, kreatif, website, dan optimasi AI search (GEO/AEO), yang dijalankan satu per satu atau sebagai satu kampanye terhubung sampai ke WhatsApp.',
  en: 'Logink is a 360° digital marketing agency in Jakarta for Indonesian SMBs and growing brands, running SEO & content, Local SEO & Google Maps, social media, paid ads, creative, websites and AI search optimization (GEO/AEO) one at a time or as one connected campaign that ends in WhatsApp.',
}
export const ANTI_SCAM: L = {
  id: `Nomor WhatsApp resmi Logink hanya ${WA_DISPLAY}.`,
  en: `Logink's only official WhatsApp number is ${WA_DISPLAY}.`,
}
export const AI_DISCLOSURE: L = {
  id: 'Ilustrasi dibuat dengan bantuan AI; klien, testimoni, tim dan hasil adalah nyata.',
  en: 'Illustrations are made with AI assistance; clients, testimonials, team and results are real.',
}

export const STAGES: Record<StageKey, { name: L; hour: string; keyLight: 'magenta' | 'crimson' | 'coral' | 'jingga'; anchor: string }> = {
  ditemukan: { name: { id: 'Ditemukan', en: 'Found' }, hour: '07.00', keyLight: 'magenta', anchor: 'ditemukan' },
  dipercaya: { name: { id: 'Dipercaya', en: 'Trusted' }, hour: '12.40', keyLight: 'crimson', anchor: 'dipercaya' },
  dikutip: { name: { id: 'Dikutip AI', en: 'Cited by AI' }, hour: '18.05', keyLight: 'coral', anchor: 'dikutip-ai' },
  dihubungi: { name: { id: 'Dihubungi', en: 'Contacted' }, hour: '21.30', keyLight: 'jingga', anchor: 'dihubungi' },
}

// Live goal groups = mega-menu columns. The stage is a chip on each item plus the strip under the columns.
export const GROUPS = {
  organik: { id: 'Tingkatkan Organik', en: 'Grow Organic' },
  penjualan: { id: 'Tingkatkan Penjualan', en: 'Drive Revenue' },
  kreasi: { id: 'Kreasi & Konten', en: 'Creative & Content' },
} as const

export type Service = {
  key: SvcKey
  cmsSlug: string | null // Payload services.slug (contact checkbox label map, legacy redirects)
  path: L
  name: L // anchor text everywhere (nav, table, footer, cross-links)
  line: L // one-line answer: services table + mega menu
  group: keyof typeof GROUPS
  stage: StageKey
  alsoStages: StageKey[]
  hour: string // dateline hour of the page
  light: Light
  h1: L // CI: document.querySelector('h1').textContent === h1[locale]
  title: L // <title>, absolute, <= 60 chars
  desc: L // meta description, 120-160 chars
  price: { id: string; en: string } | null // exact visible text; null = custom quote, no Offer node
  quote?: L // required when price === null (Price renders it)
  og: L // OG file key without .jpg (public/og/<key>.jpg, listed in src/content/og.json)
  wa: L // WhatsApp prefill; existing strings kept verbatim (they are the only lead attribution without GA4)
  pairs: SvcKey[] // "Cocok dikombinasikan dengan" (AI page appended by crossLinks)
  updated: string // ISO date of the last substantive copy/price edit: visible "Diperbarui", dateModified, sitemap lastmod
}

// Row order = the home/hub services table in final.md (01..07).
export const SERVICES: Service[] = [
  {
    key: 'seo', cmsSlug: 'seo-content-marketing',
    path: { id: '/layanan/jasa-seo-profesional', en: '/en/services/seo-content-marketing' },
    name: { id: 'Jasa SEO Profesional', en: 'SEO & Content Marketing' },
    line: { id: 'Riset keyword, konten SEO Bahasa Indonesia, SEO teknikal, dan laporan bulanan.', en: 'Keyword research, Indonesian SEO content, technical SEO and monthly reporting.' },
    group: 'organik', stage: 'ditemukan', alsoStages: ['dikutip'], hour: '07.00', light: 'kertas',
    h1: { id: 'Jasa SEO Profesional Jakarta: Traffic Organik yang Tumbuh dan Terukur', en: 'Professional SEO Services Jakarta: Organic Traffic That Grows, Measured Monthly' },
    title: { id: 'Jasa SEO Profesional Jakarta, Mulai Rp 6 Juta | Logink', en: 'SEO & Content Marketing Services Jakarta | Logink' },
    desc: {
      id: 'Jasa SEO profesional di Jakarta: riset keyword, konten SEO Bahasa Indonesia, SEO teknikal, dan laporan bulanan. Mulai Rp 6 Juta/bulan. Konsultasi via WhatsApp.',
      en: 'SEO for Indonesian brands: keyword research, Bahasa Indonesia content, technical SEO and transparent monthly reports. From IDR 6M/month. Chat on WhatsApp.',
    },
    price: { id: 'Rp 6 · 8 · 15 Juta/bulan', en: 'IDR 6 · 8 · 15M/month' },
    wa: { id: 'Halo Logink! Saya tertarik dengan layanan SEO & Content Marketing.', en: 'Hi Logink! I am interested in your SEO & Content Marketing service.' },
    og: { id: 'id-seo', en: 'en-seo' },
    pairs: ['ads', 'website', 'localseo'], updated: '2026-07-16',
  },
  {
    key: 'localseo', cmsSlug: 'local-seo',
    path: { id: '/layanan/local-seo', en: '/en/services/local-seo' },
    name: { id: 'Local SEO & Google Maps', en: 'Local SEO & Google Maps' },
    line: { id: 'Setup Google Business Profile, landing page lokal, dan optimasi Maps dalam radius hingga 20 km.', en: 'Google Business Profile setup, a local landing page and Maps optimization within up to 20 km.' },
    group: 'organik', stage: 'ditemukan', alsoStages: ['dipercaya', 'dikutip'], hour: '08.30', light: 'kertas',
    h1: { id: 'Jasa Local SEO & Optimasi Google Maps: Jadi Pilihan Utama di Sekitar Anda', en: 'Local SEO & Google Maps Optimization Jakarta: Be the Top Pick Near You' },
    title: { id: 'Jasa Local SEO & Optimasi Google Maps | Logink', en: 'Local SEO & Google Maps Optimization Jakarta | Logink' },
    desc: {
      id: 'Jasa Local SEO & optimasi Google Maps: setup Google Business Profile, landing page lokal, radius hingga 20 km. Mulai Rp 1 Juta/bulan, ditagih tahunan.',
      en: 'Local SEO & Google Maps: Google Business Profile setup, a local landing page and a radius of up to 20 km. From IDR 1M/month, billed annually.',
    },
    price: { id: 'Rp 1 · 2 Juta/bulan, ditagih tahunan', en: 'IDR 1 · 2M/month, billed annually' },
    wa: { id: 'Halo Logink! Saya tertarik dengan layanan Local SEO & Google Maps.', en: 'Hi Logink! I am interested in your Local SEO & Google Maps service.' },
    og: { id: 'id-local-seo', en: 'en-local-seo' },
    pairs: ['seo', 'website', 'ads'], updated: '2026-07-16',
  },
  {
    key: 'ads', cmsSlug: 'paid-advertising',
    path: { id: '/layanan/paid-ads', en: '/en/services/paid-advertising' },
    name: { id: 'Iklan Google & Meta Ads', en: 'Google & Meta Ads' },
    line: { id: 'Google Ads, Meta Ads, TikTok Ads dan Marketplace Ads.', en: 'Google Ads, Meta Ads, TikTok Ads and Marketplace Ads.' },
    group: 'penjualan', stage: 'dihubungi', alsoStages: ['ditemukan'], hour: '20.30', light: 'putih', // Warm Canvas 2026-10-04: every hero is light
    h1: { id: 'Jasa Iklan Digital Jakarta: Google Ads & Meta Ads yang Berujung di WhatsApp', en: 'Digital Advertising Jakarta: Google Ads & Meta Ads That End in WhatsApp' },
    title: { id: 'Jasa Iklan Digital Jakarta: Google & Meta Ads | Logink', en: 'Paid Advertising Jakarta: Google & Meta Ads | Logink' },
    desc: {
      id: 'Jasa iklan Google Ads & Meta Ads di Jakarta yang diarahkan ke WhatsApp. Laporan transparan, akses akun penuh. Management fee mulai Rp 6 Juta/bulan.',
      en: 'Google Ads & Meta Ads management in Jakarta that sends buyers to WhatsApp. Transparent reports, full account access. Management fee from IDR 6M/month.',
    },
    price: { id: 'Rp 6 · 12 · 20 Juta/bulan management fee, di luar budget iklan', en: 'IDR 6 · 12 · 20M/month management fee, ad spend excluded' },
    wa: { id: 'Halo Logink! Saya tertarik dengan layanan Paid Advertising.', en: 'Hi Logink! I am interested in your Paid Advertising service.' },
    og: { id: 'id-ads', en: 'en-ads' },
    pairs: ['seo', 'creative', 'website'], updated: '2026-07-16',
  },
  {
    key: 'social', cmsSlug: 'social-media-management',
    path: { id: '/layanan/sosial-media-manajemen', en: '/en/services/social-media-management' },
    name: { id: 'Social Media Management', en: 'Social Media Management' },
    line: { id: 'Strategi, konten, dan community management untuk Instagram, TikTok, Facebook dan LinkedIn.', en: 'Strategy, content and community management for Instagram, TikTok, Facebook and LinkedIn.' },
    group: 'organik', stage: 'dipercaya', alsoStages: ['dikutip'], hour: '12.40', light: 'putih',
    h1: { id: 'Jasa Social Media Management Jakarta: Konten Konsisten, Audiens Bertumbuh', en: 'Social Media Management Jakarta: Consistent Content, a Growing Audience' },
    title: { id: 'Jasa Social Media Management Jakarta | Logink', en: 'Social Media Management Services Jakarta | Logink' },
    desc: {
      id: 'Jasa social media management Jakarta: strategi, konten, dan community management untuk Instagram, TikTok, Facebook & LinkedIn. Proposal kustom dalam 24 jam.',
      en: 'Social media management in Jakarta: strategy, content and community management for Instagram, TikTok, Facebook & LinkedIn. Custom proposal within 24 hours.',
    },
    price: null, // no module prices exist in data.ts
    quote: { id: 'Paket modular, proposal kustom dalam 24 jam', en: 'Modular packages, custom proposal within 24 hours' },
    wa: { id: 'Halo Logink! Saya tertarik dengan layanan Social Media Management.', en: 'Hi Logink! I am interested in your Social Media Management service.' },
    og: { id: 'id-social', en: 'en-social' },
    pairs: ['creative', 'ads'], updated: '2026-07-16',
  },
  {
    key: 'creative', cmsSlug: 'creative-services',
    path: { id: '/layanan/kreatif', en: '/en/services/creative-services' },
    name: { id: 'Desain Grafis & Video', en: 'Graphic Design & Video' },
    line: { id: 'Desain grafis, edit dan produksi video, foto produk, dan copywriting.', en: 'Graphic design, video editing and production, product photography and copywriting.' },
    group: 'kreasi', stage: 'dipercaya', alsoStages: ['dikutip'], hour: '15.10', light: 'putih',
    h1: { id: 'Jasa Desain Grafis & Video Jakarta: Branding, Konten Kreatif & Copywriting', en: 'Graphic Design & Video Production Jakarta: Branding, Creative Content & Copywriting' },
    title: { id: 'Jasa Desain Grafis & Video Jakarta | Logink', en: 'Graphic Design & Video Production Jakarta | Logink' },
    desc: {
      id: 'Jasa desain grafis, edit dan produksi video, foto produk, dan copywriting untuk brand Indonesia. Harga per proyek, penawaran kustom dalam 24 jam.',
      en: 'Graphic design, video editing and production, product photography and copywriting for Indonesian brands. Priced per project, custom quote within 24 hours.',
    },
    price: null,
    quote: { id: 'Harga per proyek, penawaran kustom dalam 24 jam', en: 'Priced per project, custom quote within 24 hours' },
    wa: { id: 'Halo Logink! Saya tertarik dengan Creative Services.', en: "Hi Logink! I'm interested in Creative Services." },
    og: { id: 'id-kreatif', en: 'en-creative' },
    pairs: ['social', 'website'], updated: '2026-07-16',
  },
  {
    key: 'website', cmsSlug: 'website-landing-page',
    path: { id: '/layanan/website-development', en: '/en/services/website-landing-page' },
    name: { id: 'Website & Landing Page', en: 'Websites & Landing Pages' },
    line: { id: 'Company profile, landing page, dan toko online yang cepat, mobile-first, dan siap konversi.', en: 'Company profiles, landing pages and online stores that are fast, mobile-first and built to convert.' },
    group: 'penjualan', stage: 'dipercaya', alsoStages: ['dihubungi', 'dikutip'], hour: '16.30', light: 'putih',
    h1: { id: 'Jasa Pembuatan Website & Landing Page Jakarta: Cepat, Mobile-First, Konversi Tinggi', en: 'Website & Landing Page Development Jakarta: Fast, Mobile-First, High Conversion' },
    title: { id: 'Jasa Pembuatan Website & Landing Page Jakarta | Logink', en: 'Website & Landing Page Development Jakarta | Logink' },
    desc: {
      id: 'Jasa pembuatan website company profile, landing page, dan toko online: cepat, mobile-first, siap konversi. Mulai Rp 10 Juta. Konsultasi via WhatsApp.',
      en: 'Company profile websites, landing pages and online stores that are fast, mobile-first and built to convert. From IDR 10M. Talk to us on WhatsApp.',
    },
    price: { id: 'Mulai Rp 10 Juta, harga final lewat diskusi', en: 'From IDR 10M, final price after a discussion' }, // owner 2026-10-05: no fixed price
    wa: { id: 'Halo Logink! Saya tertarik dengan layanan Website & Landing Page.', en: 'Hi Logink! I am interested in your Website & Landing Page service.' },
    og: { id: 'id-website', en: 'en-website' },
    pairs: ['seo', 'ads'], updated: '2026-07-16',
  },
  {
    key: 'ai', cmsSlug: null,
    path: { id: '/layanan/jasa-seo-ai', en: '/en/services/ai-search-optimization' },
    name: { id: 'SEO AI (GEO & AEO)', en: 'AI Search Optimization (GEO & AEO)' },
    line: { id: 'Membuat brand Anda layak dikutip Google AI Overview, AI Mode, ChatGPT, dan Perplexity, lalu mengukurnya.', en: 'Making your brand citable in Google AI Overviews, AI Mode, ChatGPT and Perplexity, and measuring it.' },
    group: 'organik', stage: 'dikutip', alsoStages: [], hour: '18.05', light: 'kertas', // Warm Canvas 2026-10-04: every hero is light
    h1: { id: 'Jasa SEO AI (GEO & AEO): Agar Brand Anda Layak Dikutip di Google AI Overview, AI Mode, dan ChatGPT', en: 'AI Search Optimization (GEO & AEO): Make Your Brand Worth Citing in Google AI Overviews, AI Mode and ChatGPT' },
    title: { id: 'Jasa SEO AI (GEO & AEO) Jakarta | Logink', en: 'AI Search Optimization (GEO & AEO) Jakarta | Logink' },
    desc: {
      id: 'Jasa SEO AI (GEO & AEO) di Jakarta: bantu brand Anda dikutip Google AI Overview, AI Mode, dan ChatGPT. Tanpa janji kutipan, progres diukur tiap bulan.',
      en: 'AI search optimization (GEO & AEO) in Jakarta: help your brand get cited in Google AI Overviews, AI Mode and ChatGPT. No guaranteed citations, tracked monthly.',
    },
    price: { id: 'Rp 5 · 10 · 20 Juta/bulan', en: 'IDR 5 · 10 · 20M/month' }, // owner 2026-10-04: benchmarked on crawlcompass.com/ai-seo
    wa: { id: 'Halo Logink! Saya tertarik dengan layanan SEO AI (GEO & AEO).', en: 'Hi Logink! I am interested in your AI Search Optimization (GEO & AEO) service.' },
    og: { id: 'id-seo-ai', en: 'en-ai-search' },
    pairs: ['seo', 'localseo', 'social', 'website'], updated: '2026-07-16',
  },
]

export type PageKey = 'home' | 'hub' | 'about' | 'portfolio' | 'blog' | 'contact' | 'privacy' | 'terms' | 'disclaimer'
export type Page = {
  key: PageKey; path: L; light: Light; hour: string | null
  h1: L; title: L; desc: L; wa: L; og: L; priority: number; freq: 'weekly' | 'monthly' | 'yearly' | 'daily'; updated: string
}

export const PAGES: Page[] = [
  { key: 'home', og: { id: 'id-home', en: 'en-home' }, path: { id: '/', en: '/en' }, light: 'putih', hour: '05.30', priority: 1, freq: 'weekly', updated: '2026-07-16',
    h1: { id: 'Agensi Digital Marketing 360° di Jakarta: Ditemukan. Dipercaya. Dikutip AI. Dihubungi.', en: '360° Digital Marketing Agency in Jakarta: Found. Trusted. Cited by AI. Contacted.' },
    title: { id: 'Jasa Digital Marketing Jakarta: Agensi 360° | Logink', en: 'Digital Marketing Agency Jakarta: 360° Campaigns | Logink' },
    desc: { id: 'Jasa digital marketing di Jakarta: ambil satu layanan dengan harga yang jelas, atau Kampanye 360° yang menghubungkan SEO, Maps, social, iklan, dan website.', en: 'Digital marketing agency in Jakarta: hire one service with clear pricing, or run a 360° campaign that connects SEO, Maps, social, ads and your website.' },
    wa: { id: 'Halo Logink! Saya ingin konsultasi digital marketing untuk bisnis saya.', en: "Hi Logink! I'd like a digital marketing consultation for my business." } },
  { key: 'hub', og: { id: 'id-layanan', en: 'en-services' }, path: { id: '/layanan', en: '/en/services' }, light: 'kertas', hour: '06.00', priority: 0.85, freq: 'monthly', updated: '2026-07-16',
    h1: { id: 'Layanan Digital Marketing 360° di Jakarta: Harga dan Paket Setiap Layanan', en: '360° Digital Marketing Services in Jakarta: Prices and Packages for Every Service' },
    title: { id: 'Layanan & Harga Digital Marketing Jakarta | Logink', en: 'Digital Marketing Services & Pricing Jakarta | Logink' },
    desc: { id: 'Harga dan paket setiap layanan digital marketing: SEO, Local SEO & Google Maps, iklan, social media, desain & video, website, SEO AI, atau Kampanye 360°.', en: 'Prices and packages for every Logink service: SEO, Local SEO & Google Maps, ads, social media, design & video, websites, AI search, or a 360° campaign.' },
    wa: { id: 'Halo Logink! Saya ingin tahu layanan dan harga yang cocok untuk bisnis saya.', en: "Hi Logink! I'd like to know which service and price fits my business." } },
  { key: 'about', og: { id: 'id-about', en: 'en-about' }, path: { id: '/about', en: '/en/about' }, light: 'putih', hour: '05.30', priority: 0.6, freq: 'monthly', updated: '2026-07-16',
    h1: { id: 'Tentang Logink: Kreativitas yang Terhubung', en: 'About Logink: Connected Creativity' },
    title: { id: 'Tentang Kami | Logink', en: 'About Us | Logink' },
    desc: { id: 'Logink adalah agensi digital marketing 360° di Jakarta: setiap layanan bisa diambil sendiri atau dijalankan sebagai satu kampanye terhubung untuk brand Anda.', en: 'Logink is a 360° digital marketing agency in Jakarta: hire any service on its own, or run them as one connected campaign built for Indonesian brands.' },
    wa: { id: 'Halo Logink! Saya sudah membaca profil Logink dan ingin konsultasi.', en: "Hi Logink! I've read about Logink and would like a consultation." } },
  { key: 'portfolio', og: { id: 'id-portfolio', en: 'en-portfolio' }, path: { id: '/portfolio', en: '/en/portfolio' }, light: 'kertas', hour: '07.00', priority: 0.75, freq: 'weekly', updated: '2026-07-16',
    h1: { id: 'Portofolio & Studi Kasus: Hasil Nyata, Klien Nyata', en: 'Portfolio & Case Studies: Real Results, Real Clients' },
    title: { id: 'Portofolio & Studi Kasus Digital Marketing | Logink', en: 'Portfolio & Case Studies | Logink' },
    desc: { id: 'Studi kasus Logink dengan angka yang bisa dicek: periode, sumber data, dan layanan yang dipakai. Lihat cara kami mengukur pertumbuhan traffic organik klien.', en: "Logink case studies with numbers you can check: the period, the data source and the services used. See how we measure our clients' organic growth." },
    wa: { id: 'Halo Logink! Saya sudah melihat studi kasus Logink dan ingin diskusi untuk bisnis saya.', en: "Hi Logink! I've seen Logink's case studies and want to discuss my business." } },
  { key: 'blog', og: { id: 'id-blog', en: 'en-blog' }, path: { id: '/blog', en: '/en/blog' }, light: 'kertas', hour: null, priority: 0.9, freq: 'daily', updated: '2026-07-18',
    h1: { id: 'Blog & Insight Digital Marketing', en: 'Digital Marketing Blog & Insights' },
    title: { id: 'Blog & Insight Digital Marketing | Logink', en: 'Digital Marketing Blog & Insights | Logink' },
    desc: { id: 'Tips, panduan, dan insight digital marketing terbaru dari tim Logink. Pelajari strategi SEO, Social Media, Paid Ads, dan konten yang bisa langsung diterapkan.', en: 'Latest digital marketing tips, guides, and insights from the Logink team. Learn actionable strategies for SEO, Social Media, Paid Ads, and content marketing.' },
    wa: { id: 'Halo Logink! Saya membaca blog Logink dan ingin konsultasi.', en: "Hi Logink! I read Logink's blog and would like a consultation." } },
  { key: 'contact', og: { id: 'id-contact', en: 'en-contact' }, path: { id: '/contact', en: '/en/contact' }, light: 'putih', hour: '21.30', priority: 0.6, freq: 'monthly', updated: '2026-07-16',
    h1: { id: 'Mari Kerja Bersama', en: "Let's Work Together" },
    title: { id: 'Hubungi Kami | Logink', en: 'Contact Us | Logink' },
    desc: { id: 'Konsultasi digital marketing gratis bersama tim Logink. Ceritakan kebutuhan brand Anda dan kami akan menyusun strategi yang tepat, terukur, dan sesuai anggaran.', en: 'Free digital marketing consultation with the Logink team. Share your goals on WhatsApp or through the form and get a focused, measurable plan for your brand.' },
    wa: { id: 'Halo Logink! Saya ingin konsultasi digital marketing.', en: "Hi Logink! I'd like a digital marketing consultation." } },
  { key: 'privacy', og: { id: 'id-privacy', en: 'en-privacy' }, path: { id: '/privacy', en: '/en/privacy' }, light: 'kertas', hour: null, priority: 0.3, freq: 'yearly', updated: '2026-07-16',
    h1: { id: 'Kebijakan Privasi', en: 'Privacy Policy' },
    title: { id: 'Kebijakan Privasi | Logink', en: 'Privacy Policy | Logink' },
    desc: { id: 'Kebijakan Privasi Logink menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi Anda saat menggunakan layanan kami.', en: 'Logink Privacy Policy explains how we collect, use, store, and protect your personal data when you use our digital marketing services and website.' },
    wa: { id: 'Halo Logink! Saya punya pertanyaan tentang kebijakan privasi.', en: 'Hi Logink! I have a question about the privacy policy.' } },
  { key: 'terms', og: { id: 'id-terms', en: 'en-terms' }, path: { id: '/terms', en: '/en/terms' }, light: 'kertas', hour: null, priority: 0.3, freq: 'yearly', updated: '2026-07-16',
    h1: { id: 'Syarat & Ketentuan', en: 'Terms of Service' },
    title: { id: 'Syarat & Ketentuan | Logink', en: 'Terms of Service | Logink' },
    desc: { id: 'Syarat dan Ketentuan layanan Logink mengatur hak dan kewajiban antara klien dan Logink, termasuk ketentuan pembayaran, pengiriman, dan penyelesaian sengketa.', en: 'Logink Terms of Service outlines the rights and obligations of clients and Logink, covering payment terms, service deliverables, and dispute resolution.' },
    wa: { id: 'Halo Logink! Saya punya pertanyaan tentang syarat & ketentuan.', en: 'Hi Logink! I have a question about the terms of service.' } },
  // owner 2026-10-05: new page (benchmarked on duomark.id); copy in content/legal/disclaimer.ts
  { key: 'disclaimer', og: { id: 'id-disclaimer', en: 'en-disclaimer' }, path: { id: '/disclaimer', en: '/en/disclaimer' }, light: 'kertas', hour: null, priority: 0.3, freq: 'yearly', updated: '2026-10-05',
    h1: { id: 'Disclaimer', en: 'Disclaimer' },
    title: { id: 'Disclaimer | Logink', en: 'Disclaimer | Logink' },
    desc: { id: 'Disclaimer Logink menjelaskan cara membaca isi situs ini: informasi bersifat umum, tanpa jaminan hasil, ilustrasi diberi label, dan merek pihak ketiga.', en: 'How to read the Logink site: the information is general, results are never guaranteed, illustrations are labelled, and third-party brands stay theirs.' },
    wa: { id: 'Halo Logink! Saya punya pertanyaan tentang disclaimer.', en: 'Hi Logink! I have a question about the disclaimer.' } },
]

// Launch fact strip (home §02). Offer facts only, until APPROVED_CASE_SLUGS has an entry.
// Every entry is true today and names its source (BUILD §3.2 item 4, §11 4.2).
export const FACT_STRIP: { id: string; en: string; source: string }[] = [
  { id: 'Mulai Rp 1 Juta/bulan · Local SEO, ditagih tahunan', en: 'From IDR 1M/month · Local SEO, billed annually', source: 'content/services/localseo.ts LOCALSEO_PRICING_TIERS[0]' },
  { id: '6 layanan + SEO AI, satu per satu atau satu Kampanye 360°', en: '6 services + AI search, one at a time or as one 360° campaign', source: 'SERVICES' },
  { id: 'Harga mulai tertulis untuk SEO, Local SEO, Iklan, Website dan SEO AI; Social & Kreatif: proposal dalam 24 jam', en: 'Starting prices published for SEO, Local SEO, Ads, Websites and AI search; Social & Creative: proposal within 24 hours', source: 'SERVICES[].price' },
  { id: 'Tracking GA4 disiapkan untuk SEO, Iklan dan Website', en: 'GA4 tracking set up for SEO, Ads and Websites', source: 'seo/data.ts:13 · ads/data.ts:15 · website/data.ts:15' },
]
// The services the price fact names (checked: price !== null) and the two it says are quote-only.
export const PRICE_FACT = { priced: ['seo', 'localseo', 'ads', 'website', 'ai'], quoted: ['social', 'creative'] } as const

// Sourced stats (source chip + year + outbound link). `for` = which templates may show it.
export const SOURCES = [
  { k: 'aio-id', for: ['home', 'ai', 'seo'], text: { id: 'AI Overviews hadir dalam Bahasa Indonesia sejak 28 Okt 2024', en: 'AI Overviews in Bahasa Indonesia since 28 Oct 2024' }, src: 'Google', year: 2024, url: 'https://blog.google/intl/id-id/products/platforms/memperkaya-hasil-penelusuran-ai-overviews-kini-hadir-di-indonesia/' },
  { k: 'aimode-id', for: ['home', 'ai'], text: { id: 'AI Mode dalam Bahasa Indonesia sejak Sep 2025', en: 'AI Mode in Bahasa Indonesia since Sep 2025' }, src: 'Google', year: 2025, url: 'https://blog.google/intl/id-id/products/explore-get-answers/google-search-memperkenalkan-mode-ai-di-indonesia/' },
  { k: 'ctr-58', for: ['home', 'ai', 'seo'], text: { id: 'CTR posisi #1 sekitar 58% lebih rendah saat AI Overview muncul (data AS)', en: 'Position-1 CTR about 58% lower when an AI Overview appears (US data)' }, src: 'Ahrefs', year: 2025, url: 'https://ahrefs.com/blog/ai-overviews-reduce-clicks-update' },
  { k: 'pew-8-15', for: ['home', 'ai'], text: { id: 'Klik 8% dengan ringkasan AI vs 15% tanpa ringkasan (data AS)', en: '8% clicks with AI summaries vs 15% without (US data)' }, src: 'Pew Research', year: 2025, url: 'https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/' },
  { k: 'apjii-ai', for: ['home', 'ai', 'social'], text: { id: '27,34% responden di Indonesia memakai AI', en: '27.34% of respondents in Indonesia use AI' }, src: 'APJII via Kompas', year: 2025, url: 'https://www.kompas.id/artikel/pengguna-ai-di-indonesia-meningkat-kebanyakan-gen-z-untuk-belajar' },
] as const

export const AI_BASELINE: L = {
  id: 'logink.co: 1 kutipan AI (Ahrefs, Sep 2026). Progres dipublikasikan tiap kuartal.',
  en: 'logink.co: 1 AI citation (Ahrefs, Sep 2026). Progress published quarterly.',
}

// Blog categories (CMS slugs) -> the service they feed. Lede <= 50 words, visible under the category H1.
export const CATEGORIES: Record<string, { svc: SvcKey; lede: L }> = {
  seo: { svc: 'seo', lede: { id: 'Panduan SEO praktis dari tim Logink: technical SEO, Core Web Vitals, dan cara halaman Anda dibaca Google serta mesin AI.', en: 'Practical SEO guides from the Logink team: technical SEO, Core Web Vitals and how Google and AI engines read your pages.' } },
  'social-media': { svc: 'social', lede: { id: 'Artikel social media dari Logink: engagement, konten, dan cara mengukur hasil di Instagram, TikTok, dan LinkedIn.', en: 'Social media articles from Logink: engagement, content and how to measure results on Instagram, TikTok and LinkedIn.' } },
  'paid-ads': { svc: 'ads', lede: { id: 'Artikel iklan digital dari Logink: Google Ads, Meta Ads, dan iklan yang berujung di WhatsApp.', en: 'Paid advertising articles from Logink: Google Ads, Meta Ads and ads that end in WhatsApp.' } },
  branding: { svc: 'creative', lede: { id: 'Artikel branding dari Logink: identitas visual, desain grafis, video, dan copywriting untuk brand Indonesia.', en: 'Branding articles from Logink: visual identity, graphic design, video and copywriting for Indonesian brands.' } },
  'web-dev': { svc: 'website', lede: { id: 'Artikel website dari Logink: company profile, landing page, kecepatan, dan konversi.', en: 'Website articles from Logink: company profiles, landing pages, speed and conversion.' } },
}
export const CATEGORY_MIN_POSTS = 1 // below this (per locale): noindex,follow + left out of the sitemap

export const svc = (k: SvcKey) => SERVICES.find((s) => s.key === k)!
export const page = (k: PageKey) => PAGES.find((p) => p.key === k)!
export const hhmm = (hour: string) => hour.replace('.', '') // registry '07.00' -> markup '0700'
export const liveServices = () => SERVICES.filter((s) => s.key !== 'ai' || AI_PAGE_LIVE)

// Every link to the AI page goes through here: falls back to the SEO page's #ai-search section.
export function svcHref(k: SvcKey, l: Locale): string {
  if (k === 'ai' && !AI_PAGE_LIVE) return `${svc('seo').path[l]}#ai-search`
  return svc(k).path[l]
}

// "Cocok dikombinasikan dengan": registry pairs + the AI page (or its fallback) last; never self.
export const crossLinks = (k: SvcKey): SvcKey[] => (k === 'ai' ? svc(k).pairs : [...svc(k).pairs, 'ai'])

// "Posisi di loop": services lit per stage (primary stage first, then alsoStages).
export const servicesInStage = (st: StageKey) =>
  SERVICES.filter((s) => s.stage === st || s.alsoStages.includes(st)).sort((a, b) => Number(b.stage === st) - Number(a.stage === st))

// Sitemap STATIC_PAIRS + head hreflang + LanguageLink for code-owned pages. CMS pages pair via slug/slugEn.
export const STATIC_PAIRS = (): [string, string, number, Page['freq'], string][] => [
  ...PAGES.map((p) => [p.path.id, p.path.en, p.priority, p.freq, p.updated] as [string, string, number, Page['freq'], string]),
  ...liveServices().map((s) => [s.path.id, s.path.en, 0.9, 'monthly', s.updated] as [string, string, number, Page['freq'], string]),
]

export function alternateOf(path: string): string | null {
  for (const [id, en] of STATIC_PAIRS()) {
    if (path === id) return en
    if (path === en) return id
  }
  return null
}

export const waLink = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`

// WhatsApp prefills for CMS pages and tier CTAs (page-architecture §10). Code-owned pages use their `wa`.
export const WA_PATTERNS = {
  caseStudy: (title: string): L => ({ id: `Halo Logink! Saya membaca studi kasus '${title}' dan ingin diskusi untuk bisnis saya.`, en: `Hi Logink! I read the case study '${title}' and want to discuss my business.` }),
  category: (name: string): L => ({ id: `Halo Logink! Saya membaca artikel ${name} di blog Logink dan ingin konsultasi.`, en: `Hi Logink! I read your ${name} articles and would like a consultation.` }),
  post: (title: string, serviceName: string): L => ({ id: `Halo Logink! Saya membaca artikel '${title}' dan ingin konsultasi soal ${serviceName}.`, en: `Hi Logink! I read '${title}' and would like to talk about ${serviceName}.` }),
  tier: (tierName: string, serviceName: string): L => ({ id: `Halo Logink! Saya tertarik dengan paket ${tierName} untuk layanan ${serviceName}.`, en: `Hi Logink! I'm interested in the ${tierName} plan for ${serviceName}.` }),
  generic: { id: 'Halo Logink! Saya ingin konsultasi digital marketing.', en: "Hi Logink! I'd like a digital marketing consultation." } as L,
  // BUILD §11 1.2: the Kampanye 360° mode (ModeChoice, profiler chip, hub section)
  campaign360: { id: 'Halo Logink! Saya tertarik Kampanye 360° untuk bisnis saya.', en: "Hi Logink! I'm interested in a 360° campaign for my business." } as L,
  // BUILD §11 6.1: the service-page note 'Bisa sendiri, lebih kuat terhubung'
  upgrade: (name: string): L => ({ id: `Halo Logink! Saya tertarik dengan ${name} sebagai bagian dari Kampanye 360°.`, en: `Hi Logink! I'm interested in ${name} as part of a 360° campaign.` }),
}

// next.config.ts redirects(): all permanent (Next emits 308). www -> apex 308 is a Vercel domain setting.
const leaf = (p: string) => p.split('/').pop()!
export const REDIRECTS: { source: string; destination: string; permanent: true }[] = [
  { source: '/index', destination: '/', permanent: true }, // 200 duplicate today
  { source: '/en/index', destination: '/en', permanent: true }, // 404 today, linked from home switcher
  { source: '/pricing', destination: '/layanan', permanent: true }, // old nav link (removed Jul 2026), 404 today
  { source: '/services', destination: '/layanan', permanent: true }, // kept
  // 5 kept + /services/local-seo added (404 today)
  ...SERVICES.filter((s) => s.cmsSlug).map((s) => ({ source: `/services/${s.cmsSlug}`, destination: s.path.id, permanent: true as const })),
  // legacy CMS-slug duplicates from the old /layanan/[slug] template (delete that page; check GSC first)
  ...SERVICES.filter((s) => s.cmsSlug && s.cmsSlug !== leaf(s.path.id))
    .map((s) => ({ source: `/layanan/${s.cmsSlug}`, destination: s.path.id, permanent: true as const })),
  // wrong-locale URLs emitted by the old switcher/footers (404 today)
  { source: '/en/layanan', destination: '/en/services', permanent: true },
  ...SERVICES.filter((s) => s.key !== 'ai').map((s) => ({ source: `/en${s.path.id}`, destination: s.path.en, permanent: true as const })),
  ...SERVICES.filter((s) => s.key !== 'ai' && leaf(s.path.id) !== leaf(s.path.en))
    .map((s) => ({ source: `/en/services/${leaf(s.path.id)}`, destination: s.path.en, permanent: true as const })),
]
