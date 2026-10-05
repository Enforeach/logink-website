// Lead Profiler question paths (moved from components/public/LeadProfiler.tsx, §4.4 + page-architecture §9).
// Loaded only with the island (client chunk near the viewport), so none of this is in the RSC payload.
// Path keys are registry keys + '360'; they are what POST /api/contact receives as services: [key].
import type { Locale, SvcKey } from '@/lib/services'

export type PathKey = '360' | SvcKey
export type Q = { key: string; label: string; type: 'single' | 'multi'; text: string; opts: string[] }
export type Path = { name: string; confirm?: string; qs: Q[] }

const IND = {
  id: ['F&B / Kuliner', 'Fashion & Beauty', 'Properti', 'Jasa Profesional', 'E-commerce / Retail', 'Teknologi / SaaS', 'Pendidikan', 'Lainnya'],
  en: ['F&B / Culinary', 'Fashion & Beauty', 'Property / Real Estate', 'Professional Services', 'E-commerce / Retail', 'Technology / SaaS', 'Education', 'Other'],
}
const BUDGET = { id: ['< Rp 5 juta', 'Rp 5–20 juta', 'Rp 20–50 juta', 'Rp 50 juta+'], en: ['< IDR 5M', 'IDR 5–20M', 'IDR 20–50M', 'IDR 50M+'] }
// §4.4: its own scale; several channels plus ad spend do not fit under the < Rp 5 juta floor
const BUDGET_360 = { id: ['< Rp 15 juta', 'Rp 15–30 juta', 'Rp 30–60 juta', 'Rp 60 juta+'], en: ['< IDR 15M', 'IDR 15–30M', 'IDR 30–60M', 'IDR 60M+'] }

const q = (key: string, label: string, type: Q['type'], text: string, opts: string[]): Q => ({ key, label, type, text, opts })

const ID: Record<PathKey, Path> = {
  '360': {
    name: 'Kampanye 360°',
    confirm: 'Baik, Kampanye 360°: semua kanal Anda dalam satu kampanye. Enam pertanyaan singkat, lalu brief Anda siap dikirim ke WhatsApp.',
    qs: [
      q('industri', 'Industri', 'single', 'Pertama, bisnis Anda bergerak di industri apa?', IND.id),
      q('tujuan', 'Tujuan', 'single', 'Apa tujuan utama kampanye ini?', ['Lebih banyak chat WhatsApp', 'Penjualan online', 'Pelanggan datang ke lokasi', 'Brand lebih dikenal', 'Peluncuran produk atau promo']),
      q('kanal', 'Kanal berjalan', 'multi', 'Kanal apa yang sudah berjalan?', ['Website', 'Google Maps / Google Business', 'Instagram, TikTok atau Facebook', 'Iklan Google, Meta atau TikTok', 'Artikel / SEO', 'Belum ada']),
      q('kendala', 'Kendala', 'single', 'Apa kendala terbesarnya?', ['Kanal jalan sendiri-sendiri', 'Tidak tahu kanal mana yang menghasilkan', 'Konten dan iklan tidak konsisten', 'Terlalu banyak vendor', 'Belum punya strategi']),
      q('tracking', 'Tracking', 'single', 'Apakah GA4 atau pixel iklan sudah terpasang?', ['Sudah', 'Sebagian', 'Belum', 'Tidak tahu']),
      q('budget', 'Budget', 'single', 'Total budget marketing bulanan, termasuk budget iklan?', BUDGET_360.id),
    ],
  },
  seo: {
    name: 'SEO',
    qs: [
      q('industri', 'Industri', 'single', 'Industri bisnis Anda?', IND.id),
      q('status_website', 'Status website', 'single', 'Bagaimana status website Anda saat ini?', ['Ada, tapi tidak muncul di Google', 'Ada, tapi ranking menurun belakangan', 'Ada, baru dibuat', 'Belum punya website']),
      q('target_pencarian', 'Target pencarian', 'multi', 'Apa yang ingin ditemukan calon customer Anda di Google?', ['Produk/jasa spesifik', 'Nama brand', 'Edukasi/informasi industri', 'Lokasi bisnis (Google Maps)']),
      q('pengalaman_seo', 'Pengalaman SEO', 'single', 'Pengalaman SEO sebelumnya?', ['Belum pernah', 'Pernah, tapi tidak dilanjutkan', 'Sedang berjalan, hasil kurang', 'Pernah menggunakan jasa SEO lain']),
      q('prioritas', 'Prioritas', 'single', 'Apa prioritas SEO Anda?', ['Ranking halaman 1 Google', 'Meningkatkan traffic website', 'Leads dari organic search', 'Mengalahkan kompetitor di search']),
      q('budget', 'Budget', 'single', 'Budget SEO bulanan?', BUDGET.id),
    ],
  },
  localseo: {
    name: 'Local SEO & Google Maps',
    qs: [
      q('industri', 'Jenis bisnis', 'single', 'Bisnis Anda di bidang apa?', IND.id),
      q('area', 'Area', 'single', 'Di area mana sebagian besar pelanggan Anda?', ['Jakarta Selatan', 'Jakarta Pusat', 'Jakarta Barat, Utara atau Timur', 'Bodetabek', 'Kota lain di Indonesia']),
      q('gbp', 'Google Business Profile', 'single', 'Apakah sudah punya Google Business Profile?', ['Sudah, terverifikasi', 'Sudah, belum terverifikasi', 'Belum punya', 'Tidak tahu']),
      q('lokasi', 'Jumlah lokasi', 'single', 'Berapa jumlah lokasi bisnis Anda?', ['1 lokasi', '2–3 lokasi', '4–10 lokasi', 'Lebih dari 10']),
      q('tujuan', 'Tujuan', 'single', 'Apa yang paling Anda harapkan dari pelanggan di Maps?', ['Lebih banyak telepon', 'Lebih banyak rute ke lokasi', 'Lebih banyak chat WhatsApp', 'Lebih banyak ulasan']),
      q('budget', 'Budget', 'single', 'Budget Local SEO bulanan?', BUDGET.id),
    ],
  },
  ads: {
    name: 'Iklan Google & Meta Ads',
    qs: [
      q('industri', 'Industri', 'single', 'Pertama, bisnis Anda bergerak di industri apa?', IND.id),
      q('platform', 'Platform', 'single', 'Platform iklan mana yang ingin Anda gunakan?', ['Google Ads', 'Meta (Facebook/Instagram)', 'TikTok Ads', 'LinkedIn Ads', 'Belum tahu, butuh arahan']),
      q('tujuan', 'Tujuan', 'single', 'Apa tujuan utama dari iklan ini?', ['Lead generation', 'Penjualan langsung (e-commerce)', 'Brand awareness', 'Traffic ke website', 'App installs']),
      q('pengalaman', 'Pengalaman beriklan', 'single', 'Apakah Anda sudah pernah beriklan digital sebelumnya?', ['Belum pernah', 'Pernah, tapi hasilnya kurang', 'Sedang berjalan, ingin optimasi', 'Kelola sendiri & kewalahan']),
      q('landing_page', 'Landing page', 'single', 'Bagaimana dengan landing page atau website Anda?', ['Sudah ada, siap dipakai', 'Ada, tapi perlu diperbaiki', 'Belum ada']),
      q('budget', 'Budget', 'single', 'Terakhir, berapa budget iklan bulanan Anda?', BUDGET.id),
    ],
  },
  social: {
    name: 'Social Media Management',
    qs: [
      q('industri', 'Industri', 'single', 'Bisnis Anda bergerak di bidang apa?', IND.id),
      q('platform', 'Platform prioritas', 'multi', 'Platform mana yang jadi prioritas?', ['Instagram', 'TikTok', 'LinkedIn', 'Facebook', 'YouTube', 'X (Twitter)']),
      q('tantangan', 'Tantangan', 'single', 'Apa tantangan terbesar di media sosial Anda saat ini?', ['Tidak konsisten posting', 'Engagement rendah', 'Followers tidak bertumbuh', 'Tidak tahu strategi konten', 'Kompetitor lebih aktif']),
      q('tim_internal', 'Tim internal', 'single', 'Apakah sudah ada tim internal untuk mengelola media sosial?', ['Belum, butuh fully managed', 'Ada, tapi butuh arahan strategi', 'Ada, tapi butuh konten saja', 'Ada, tapi butuh reporting & analytics']),
      q('target_posting', 'Target posting', 'single', 'Berapa target posting per minggu?', ['1–2x per minggu', '3–4x per minggu', 'Setiap hari', 'Belum tahu, butuh rekomendasi']),
      q('budget', 'Budget', 'single', 'Budget social media management bulanan?', BUDGET.id),
    ],
  },
  creative: {
    name: 'Desain Grafis & Video',
    qs: [
      q('industri', 'Industri', 'single', 'Bisnis Anda di industri apa?', IND.id),
      q('jenis_konten', 'Jenis konten', 'multi', 'Jenis konten kreatif apa yang dibutuhkan?', ['Desain feed & stories', 'Video produksi (TVC/reels)', 'Branding & visual identity', 'Campaign & key visual', 'Foto produk / katalog', 'Motion graphic / animasi']),
      q('penggunaan', 'Penggunaan', 'multi', 'Konten ini akan digunakan untuk apa?', ['Posting sosial media', 'Iklan digital', 'Website / landing page', 'Presentasi / pitch deck', 'Print (brosur, packaging)', 'Event / exhibition']),
      q('frekuensi', 'Frekuensi', 'single', 'Seberapa rutin Anda butuh konten?', ['One-time project', 'Bulanan (ongoing retainer)', 'Kampanye spesifik', 'Belum tahu']),
      q('brand_guideline', 'Brand guideline', 'single', 'Apakah Anda sudah punya brand guideline?', ['Sudah lengkap', 'Ada sebagian, tapi belum konsisten', 'Belum ada sama sekali']),
      q('budget', 'Budget', 'single', 'Dan budget kreatif Anda kira-kira berapa?', BUDGET.id),
    ],
  },
  website: {
    name: 'Website & Landing Page',
    qs: [
      q('industri', 'Industri', 'single', 'Industri bisnis Anda?', IND.id),
      q('kebutuhan', 'Kebutuhan', 'single', 'Apa kebutuhan website Anda?', ['Website baru dari nol', 'Redesign/upgrade website lama', 'Landing page untuk campaign', 'E-commerce / toko online', 'Web application / SaaS platform']),
      q('tech_stack', 'Tech stack', 'single', 'Ada preferensi tech stack? Atau serahkan ke kami?', ['WordPress', 'Webflow', 'Shopify', 'Wix', 'Next.js / React', 'Nuxt.js / Vue', 'Laravel (PHP)', 'Node.js (Express)', 'React Native (Mobile)', 'Flutter (Mobile)', 'Native iOS/Android', 'Serahkan ke Logink']),
      q('fitur', 'Fitur penting', 'multi', 'Fitur apa yang paling penting?', ['Tampilan profesional & modern', 'Kecepatan & SEO-friendly', 'Integrasi WhatsApp', 'Payment gateway', 'CRM integration', 'CMS (mudah di-update)', 'Multi-bahasa', 'Booking / appointment', 'Dashboard / admin panel']),
      q('timeline', 'Timeline', 'single', 'Kapan target website harus live?', ['Secepatnya (< 1 bulan)', '1–3 bulan', '3–6 bulan', 'Masih tahap perencanaan']),
      q('budget', 'Budget', 'single', 'Budget website development?', ['< Rp 10 juta', 'Rp 10–30 juta', 'Rp 30–75 juta', 'Rp 75 juta+']),
    ],
  },
  ai: {
    name: 'SEO AI (GEO & AEO)',
    qs: [
      q('industri', 'Industri', 'single', 'Bisnis Anda bergerak di industri apa?', IND.id),
      q('website', 'Website', 'single', 'Apakah website Anda sudah ada?', ['Sudah ada dan aktif', 'Ada, tapi jarang diperbarui', 'Belum ada']),
      q('pertanyaan', 'Pertanyaan target', 'multi', 'Pertanyaan seperti apa yang ingin Anda menangkan di jawaban AI?', ['Rekomendasi produk atau jasa', 'Perbandingan dengan kompetitor', 'Pertanyaan soal harga', 'Pencarian "dekat saya"', 'Edukasi seputar industri']),
      q('kompetitor', 'Kompetitor di AI', 'single', 'Apakah kompetitor utama Anda sudah muncul di jawaban AI?', ['Ya, sering', 'Kadang-kadang', 'Belum', 'Tidak tahu']),
      q('seo', 'SEO berjalan', 'single', 'Apakah SEO sudah berjalan?', ['Sudah, dikelola tim sendiri', 'Sudah, dengan agensi lain', 'Pernah, tapi berhenti', 'Belum']),
      q('budget', 'Budget', 'single', 'Budget bulanan untuk SEO AI?', BUDGET.id),
    ],
  },
}

const EN: Record<PathKey, Path> = {
  '360': {
    name: '360° campaign',
    confirm: 'Great, a 360° campaign: all your channels in one campaign. Six quick questions, then your brief is ready to send on WhatsApp.',
    qs: [
      q('industri', 'Industry', 'single', 'First, what industry is your business in?', IND.en),
      q('tujuan', 'Goal', 'single', 'What is the main goal of this campaign?', ['More WhatsApp chats', 'Online sales', 'Customers visiting the location', 'Brand awareness', 'A product launch or promo']),
      q('kanal', 'Channels running', 'multi', 'Which channels are already running?', ['Website', 'Google Maps / Google Business', 'Instagram, TikTok or Facebook', 'Google, Meta or TikTok ads', 'Articles / SEO', 'None yet']),
      q('kendala', 'Problem', 'single', 'What is the biggest problem?', ['Channels run separately', 'Not sure which channel brings results', 'Content and ads are inconsistent', 'Too many vendors', 'No strategy yet']),
      q('tracking', 'Tracking', 'single', 'Are GA4 or ad pixels installed?', ['Yes', 'Partly', 'No', 'Not sure']),
      q('budget', 'Budget', 'single', 'Total monthly marketing budget, including ad spend?', BUDGET_360.en),
    ],
  },
  seo: {
    name: 'SEO',
    qs: [
      q('industri', 'Industry', 'single', 'What industry is your business in?', IND.en),
      q('status_website', 'Website status', 'single', "What's the current status of your website?", ["Have one but it doesn't show on Google", 'Rankings have been dropping lately', 'Just launched a new site', "Don't have a website yet"]),
      q('target_pencarian', 'Search target', 'multi', 'What do you want potential customers to find on Google?', ['Specific products / services', 'Brand name', 'Educational / industry content', 'Business location (Google Maps)']),
      q('pengalaman_seo', 'SEO experience', 'single', 'What is your SEO experience?', ['Never done SEO before', "Tried it but didn't continue", 'Currently doing it with poor results', 'Previously used another SEO agency']),
      q('prioritas', 'Priority', 'single', "What's your SEO priority?", ['Rank on Google page 1', 'Increase website traffic', 'Generate leads from organic search', 'Outrank competitors in search']),
      q('budget', 'Budget', 'single', "What's your monthly SEO budget?", BUDGET.en),
    ],
  },
  localseo: {
    name: 'Local SEO & Google Maps',
    qs: [
      q('industri', 'Business type', 'single', 'What kind of business do you run?', IND.en),
      q('area', 'Area', 'single', 'Where are most of your customers?', ['South Jakarta', 'Central Jakarta', 'West, North or East Jakarta', 'Greater Jakarta (Bodetabek)', 'Another city in Indonesia']),
      q('gbp', 'Google Business Profile', 'single', 'Do you have a Google Business Profile?', ['Yes, verified', 'Yes, not verified', 'Not yet', 'Not sure']),
      q('lokasi', 'Locations', 'single', 'How many business locations do you have?', ['1 location', '2–3 locations', '4–10 locations', 'More than 10']),
      q('tujuan', 'Goal', 'single', 'What do you want most from customers on Maps?', ['More calls', 'More directions to the location', 'More WhatsApp chats', 'More reviews']),
      q('budget', 'Budget', 'single', "What's your monthly Local SEO budget?", BUDGET.en),
    ],
  },
  ads: {
    name: 'Google & Meta Ads',
    qs: [
      q('industri', 'Industry', 'single', 'First, what industry is your business in?', IND.en),
      q('platform', 'Platform', 'single', 'Which advertising platform would you like to use?', ['Google Ads', 'Meta (Facebook/Instagram)', 'TikTok Ads', 'LinkedIn Ads', 'Not sure, need guidance']),
      q('tujuan', 'Goal', 'single', "What's the main goal of your ads?", ['Lead generation', 'Direct sales (e-commerce)', 'Brand awareness', 'Website traffic', 'App installs']),
      q('pengalaman', 'Ad experience', 'single', 'Have you run digital ads before?', ['Never run ads before', 'Tried it but poor results', 'Currently running, want to optimise', 'Managing it myself and overwhelmed']),
      q('landing_page', 'Landing page', 'single', 'How about your landing page or website?', ['Already have one, ready to use', 'Have one but needs improvement', "Don't have one yet"]),
      q('budget', 'Budget', 'single', "Last one: what's your monthly ad budget?", BUDGET.en),
    ],
  },
  social: {
    name: 'Social Media Management',
    qs: [
      q('industri', 'Industry', 'single', 'What industry is your business in?', IND.en),
      q('platform', 'Priority platforms', 'multi', 'Which platforms are your priority?', ['Instagram', 'TikTok', 'LinkedIn', 'Facebook', 'YouTube', 'X (Twitter)']),
      q('tantangan', 'Challenge', 'single', "What's your biggest social media challenge right now?", ['Inconsistent posting', 'Low engagement', 'Follower growth is stagnant', "Don't know what content strategy to use", 'Competitors are more active']),
      q('tim_internal', 'Internal team', 'single', 'Do you have an internal team managing social media?', ['No, need fully managed service', 'Yes, but need strategic direction', 'Yes, but need content only', 'Yes, but need reporting & analytics']),
      q('target_posting', 'Posting target', 'single', 'How many posts per week are you targeting?', ['1–2x per week', '3–4x per week', 'Every day', 'Not sure, need a recommendation']),
      q('budget', 'Budget', 'single', "What's your monthly social media budget?", BUDGET.en),
    ],
  },
  creative: {
    name: 'Graphic Design & Video',
    qs: [
      q('industri', 'Industry', 'single', 'What industry is your business in?', IND.en),
      q('jenis_konten', 'Content type', 'multi', 'What type of creative content do you need?', ['Feed & stories design', 'Video production (TVC/reels)', 'Branding & visual identity', 'Campaign & key visual', 'Product photography / catalogue', 'Motion graphic / animation']),
      q('penggunaan', 'Usage', 'multi', 'What will this content be used for?', ['Social media posting', 'Digital ads', 'Website / landing page', 'Presentation / pitch deck', 'Print (brochure, packaging)', 'Events / exhibition']),
      q('frekuensi', 'Frequency', 'single', 'How often do you need content?', ['One-time project', 'Monthly (ongoing retainer)', 'Specific campaign', 'Not sure yet']),
      q('brand_guideline', 'Brand guideline', 'single', 'Do you already have brand guidelines?', ['Yes, fully complete', 'Partially, not consistent yet', 'No, starting from scratch']),
      q('budget', 'Budget', 'single', "And roughly what's your creative budget?", BUDGET.en),
    ],
  },
  website: {
    name: 'Websites & Landing Pages',
    qs: [
      q('industri', 'Industry', 'single', 'What industry is your business in?', IND.en),
      q('kebutuhan', 'Need', 'single', 'What do you need for your website?', ['Brand new website from scratch', 'Redesign / upgrade existing site', 'Landing page for a campaign', 'E-commerce / online store', 'Web application / SaaS platform']),
      q('tech_stack', 'Tech stack', 'single', 'Do you have a preferred tech stack, or leave it to us?', ['WordPress', 'Webflow', 'Shopify', 'Wix', 'Next.js / React', 'Nuxt.js / Vue', 'Laravel (PHP)', 'Node.js (Express)', 'React Native (Mobile)', 'Flutter (Mobile)', 'Native iOS/Android', 'Leave it to Logink']),
      q('fitur', 'Key features', 'multi', 'Which features are most important to you?', ['Professional & modern design', 'Fast & SEO-friendly', 'WhatsApp integration', 'Payment gateway', 'CRM integration', 'CMS (easy to update)', 'Multi-language', 'Booking / appointment system', 'Dashboard / admin panel']),
      q('timeline', 'Timeline', 'single', 'When do you need the website to go live?', ['ASAP (< 1 month)', '1–3 months', '3–6 months', 'Still in planning stage']),
      q('budget', 'Budget', 'single', "What's your website development budget?", ['< IDR 10M', 'IDR 10–30M', 'IDR 30–75M', 'IDR 75M+']),
    ],
  },
  ai: {
    name: 'AI Search Optimization (GEO & AEO)',
    qs: [
      q('industri', 'Industry', 'single', 'What industry is your business in?', IND.en),
      q('website', 'Website', 'single', 'Do you already have a website?', ['Yes, live and active', 'Yes, but rarely updated', 'Not yet']),
      q('pertanyaan', 'Target questions', 'multi', 'Which kinds of questions do you want to win in AI answers?', ['Product or service recommendations', 'Comparisons with competitors', 'Pricing questions', '"Near me" searches', 'Industry education']),
      q('kompetitor', 'Competitors in AI', 'single', 'Do your main competitors already appear in AI answers?', ['Yes, often', 'Sometimes', 'Not yet', 'Not sure']),
      q('seo', 'SEO running', 'single', 'Is SEO already running?', ['Yes, run by our own team', 'Yes, with another agency', 'We tried, then stopped', 'Not yet']),
      q('budget', 'Budget', 'single', "What's your monthly AI search budget?", BUDGET.en),
    ],
  },
}

export const PATHS: Record<Locale, Record<PathKey, Path>> = { id: ID, en: EN }
// The SEO path's "no website" answer hands over to the Website path at its 2nd question (kept from the original).
export const NO_SITE = { id: 'Belum punya website', en: "Don't have a website yet" }
// Chip labels (SSR shell + island), in the 03b order.
export const CHIP_KEYS: SvcKey[] = ['seo', 'localseo', 'ads', 'social', 'creative', 'website', 'ai']
export const CHIP: Record<Locale, Record<SvcKey, string>> = {
  id: { seo: 'SEO', localseo: 'Local SEO', ads: 'Iklan', social: 'Sosial media', creative: 'Kreatif', website: 'Website', ai: 'AI search' },
  en: { seo: 'SEO', localseo: 'Local SEO', ads: 'Ads', social: 'Social media', creative: 'Creative', website: 'Website', ai: 'AI search' },
}

export const UI = {
  id: {
    confirm: (name: string) => `Baik, ${name}. Enam pertanyaan singkat, lalu brief Anda siap dikirim ke WhatsApp.`,
    contact1: 'Terima kasih atas jawaban Anda.',
    contact2: 'Satu langkah lagi: isi kontak Anda agar tim Logink bisa menghubungi Anda dalam 24 jam.',
    done1: (name: string) => `Terima kasih, ${name}. Brief Anda sudah kami terima dan WhatsApp terbuka untuk mengirimkannya.`,
    done2: 'Kami menghubungi Anda dalam 24 jam.',
    seoRedirect: 'Belum punya website, tidak apa-apa. Saya arahkan ke layanan Website & Landing Page.',
    lastQ: 'Pertanyaan terakhir. ',
    multi: (n: number) => `Lanjutkan (${n} dipilih)`,
    sent: 'Data terkirim',
    restart: 'Mulai dari awal',
    typing: 'Logink sedang mengetik',
    step: (i: number) => `Pertanyaan ${i} dari 6`,
    form: { nama: 'Nama lengkap', bisnis: 'Website atau nama bisnis', email: 'Email', wa: 'WhatsApp', submit: 'Kirim brief lewat WhatsApp', req: 'wajib' },
  },
  en: {
    confirm: (name: string) => `Great, ${name}. Six quick questions, then your brief is ready to send on WhatsApp.`,
    contact1: 'Thanks for your answers.',
    contact2: "One more step: add your contact details so Logink's team can reach you within 24 hours.",
    done1: (name: string) => `Thank you, ${name}. We have your brief, and WhatsApp is open to send it.`,
    done2: "We'll get back to you within 24 hours.",
    seoRedirect: "No website yet, that's fine. Let me take you to our Websites & Landing Pages service.",
    lastQ: 'Last question. ',
    multi: (n: number) => `Continue (${n} selected)`,
    sent: 'Details sent',
    restart: 'Start over',
    typing: 'Logink is typing',
    step: (i: number) => `Question ${i} of 6`,
    form: { nama: 'Full name', bisnis: 'Website or business name', email: 'Email', wa: 'WhatsApp', submit: 'Send the brief on WhatsApp', req: 'required' },
  },
}
