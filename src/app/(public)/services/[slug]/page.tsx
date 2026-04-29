import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { buildMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo'
import { PricingTierCard } from '@/components/public/PricingTier'
import { Accordion } from '@/components/ui/Accordion'
import { CTASection } from '@/components/public/home/CTASection'
import { icons, LucideProps } from 'lucide-react'

function LucideIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = icons[name as keyof typeof icons]
  if (!Icon) return null
  return <Icon {...props} />
}

interface Props { params: Promise<{ slug: string }> }

// ─── STATIC DATA ──────────────────────────────────────────────────────────────

export const SERVICES = {
  'seo-content-marketing': {
    name: 'SEO & Content Marketing',
    tagline: 'Rank Higher. Reach Further. Convert Better.',
    description: 'We build organic search presence that compounds month over month. From keyword strategy to 150+ articles per month, every piece is crafted to capture high-intent traffic and turn it into revenue.',
    color: '#7C3AED', rgb: '124,58,237',
    featuresVariant: 'list' as const,
    processVariant: 'horizontal' as const,
    features: [
      { icon: 'Crosshair', title: 'Keyword Research & Strategy', desc: 'In-depth analysis to find the exact queries your customers are typing right now.' },
      { icon: 'PenLine', title: 'Long-form Content Production', desc: 'Up to 150+ SEO-optimised articles/month by specialist writers.' },
      { icon: 'Wrench', title: 'Technical SEO Audit', desc: 'Fix crawlability, page speed, schema markup, and Core Web Vitals.' },
      { icon: 'BarChart3', title: 'Looker Studio Reporting', desc: 'Live dashboards for rankings, traffic, and conversions — always on.' },
      { icon: 'Link2', title: 'Internal Linking Architecture', desc: 'Strategic links between pages to pass authority and guide user flows.' },
      { icon: 'MapPin', title: 'Local SEO', desc: 'Dominate "near me" searches and Google Business map packs.' },
    ],
    process: [
      { step: '01', title: 'Keyword Audit', desc: 'Map current rankings, competitor gaps, and top opportunities.', duration: 'Week 1' },
      { step: '02', title: 'Content Strategy', desc: 'Topical cluster map and editorial calendar built for your funnel.', duration: 'Week 2' },
      { step: '03', title: 'Technical Fixes', desc: 'Engineers resolve crawl errors, speed, and structured data.', duration: 'Week 2–3' },
      { step: '04', title: 'Content Production', desc: 'Writers produce and publish optimised articles continuously.', duration: 'Ongoing' },
      { step: '05', title: 'Report & Iterate', desc: "Monthly strategy reviews to double down on what's working.", duration: 'Monthly' },
    ],
    stats: [
      { value: '150+', label: 'Articles / Month', desc: 'Maximum production capacity' },
      { value: '3–6mo', label: 'Time to Rank', desc: 'Typical page-one timeline' },
      { value: '2.5×', label: 'Traffic Lift', desc: 'Avg. across clients at 6 months' },
    ],
    faqs: [
      { question: 'How long does it take to see SEO results?', answer: 'SEO typically takes 3–6 months to show significant results. However, we usually see traffic improvements within the first 4–8 weeks.' },
      { question: 'What language are articles written in?', answer: 'We write in the language your audience uses — Indonesian, English, or both — fully optimised for your keywords.' },
      { question: 'Can we choose article topics?', answer: 'Absolutely. We conduct keyword research and discuss relevant topics with you every month.' },
      { question: 'How is progress reported?', answer: 'Monthly Looker Studio reports covering keyword rankings, traffic, and conversions — accessible anytime.' },
      { question: 'Is backlink building included?', answer: 'Off-page SEO and link building are available as an add-on from IDR 5M/month.' },
    ],
    crossSells: ['paid-advertising', 'website-landing-page'],
  },
  'social-media-management': {
    name: 'Social Media Management',
    tagline: 'Content That Connects. Presence That Converts.',
    description: 'We take social media completely off your plate — strategy, content creation, scheduling, and community management across Instagram, TikTok, Facebook, and LinkedIn.',
    color: '#DB2777', rgb: '219,39,119',
    featuresVariant: 'emoji-cards' as const,
    processVariant: 'vertical' as const,
    features: [
      { icon: 'Smartphone', title: 'Multi-Platform Management', desc: 'Instagram, TikTok, Facebook & LinkedIn from one integrated strategy.' },
      { icon: 'Palette', title: 'Custom Visual Design', desc: 'Every post built to your brand guide — zero stock templates.' },
      { icon: 'MessageCircle', title: 'Community Management', desc: 'Comments and DMs responded to during business hours.' },
      { icon: 'CalendarDays', title: 'Content Calendar', desc: 'Monthly calendar reviewed and approved before anything goes live.' },
      { icon: 'TrendingUp', title: 'Growth Strategy', desc: 'Hashtag research, collaborations, and engagement campaigns.' },
      { icon: 'BarChart3', title: 'Monthly Analytics', desc: 'Reach, impressions, follower growth, and engagement tracked.' },
    ],
    process: [
      { step: '01', title: 'Brand Onboarding', desc: 'We learn your tone, audience, competitors, and visual identity.', duration: 'Week 1' },
      { step: '02', title: 'Strategy & Pillars', desc: 'Define content pillars, platform focus, and posting cadence.', duration: 'Week 1–2' },
      { step: '03', title: 'Content Production', desc: 'Design, copy, and captions created for the full month.', duration: 'Week 2–3' },
      { step: '04', title: 'Approval & Scheduling', desc: 'You review the calendar and approve before we schedule.', duration: 'Week 3–4' },
    ],
    stats: [
      { value: '4', label: 'Platforms', desc: 'Instagram, TikTok, Facebook, LinkedIn' },
      { value: '30+', label: 'Posts / Month', desc: 'Consistent presence, zero blank days' },
      { value: '100%', label: 'Original Content', desc: 'Custom-built for your brand' },
    ],
    faqs: [
      { question: 'Which platforms do you manage?', answer: 'Instagram, TikTok, Facebook, and LinkedIn. We can focus on one or multiple based on your audience.' },
      { question: 'Is community management included?', answer: 'Yes — comment and DM responses during business hours are included in all packages.' },
      { question: 'Who creates the visual content?', answer: 'Our creative team designs everything to your brand guidelines. You simply approve before publishing.' },
      { question: 'How many posts per month?', answer: 'Post frequency is tailored to your budget and goals, discussed during onboarding.' },
    ],
    crossSells: ['creative-services', 'paid-advertising'],
  },
  'paid-advertising': {
    name: 'Paid Advertising',
    tagline: 'Every Rupiah Invested. Maximum Return Delivered.',
    description: 'Data-driven paid campaigns across Google, Meta, TikTok, and Marketplace platforms. We target the right audience at the right moment — and optimise relentlessly until ROAS hits 2–4×.',
    color: '#D97706', rgb: '217,119,6',
    featuresVariant: 'numbered' as const,
    processVariant: 'funnel' as const,
    features: [
      { icon: 'Search', title: 'Google Ads (Search + Display)', desc: "Capture high-intent buyers the moment they're searching." },
      { icon: 'Megaphone', title: 'Meta Ads', desc: 'Interests, lookalikes, and retargeting on Facebook & Instagram.' },
      { icon: 'Music', title: 'TikTok Ads', desc: 'Native-format video ads designed for conversion.' },
      { icon: 'ShoppingCart', title: 'Marketplace Ads', desc: 'Tokopedia, Shopee, and Lazada for e-commerce brands.' },
      { icon: 'Crosshair', title: 'Full-Funnel Strategy', desc: 'TOFU, MOFU, BOFU — every stage of the customer journey covered.' },
      { icon: 'BarChart3', title: 'Weekly Reports', desc: 'ROAS, CPC, CTR tracked weekly with optimisation notes.' },
    ],
    process: [
      { step: '01', title: 'Account Audit', desc: 'Full review of existing accounts, wasted spend, and audience data.', duration: 'Week 1' },
      { step: '02', title: 'Funnel Mapping', desc: 'Campaign objectives defined at each stage — awareness to conversion.', duration: 'Week 1' },
      { step: '03', title: 'Creative Production', desc: 'Ad copy and visuals built for each platform and segment.', duration: 'Week 1–2' },
      { step: '04', title: 'Campaign Launch', desc: 'Live with controlled budgets for initial data gathering.', duration: 'Week 2' },
      { step: '05', title: 'Optimisation Loops', desc: 'Weekly bid adjustments, audience pruning, and creative refreshes.', duration: 'Weekly' },
    ],
    stats: [
      { value: '2–4×', label: 'Average ROAS', desc: 'Return on ad spend across clients' },
      { value: '−35%', label: 'Avg. CPA Drop', desc: 'After first 90 days of optimisation' },
      { value: '5', label: 'Ad Platforms', desc: 'Google, Meta, TikTok, Tokopedia, Shopee' },
    ],
    faqs: [
      { question: 'Which ad platforms do you manage?', answer: 'Google Ads (Search, Display, Shopping), Meta Ads (Facebook & Instagram), TikTok Ads, and Marketplace Ads.' },
      { question: 'What is the minimum ad budget?', answer: 'Ad spend is separate from our fee. We recommend IDR 3–5M/month minimum for meaningful results.' },
      { question: 'What is ROAS and how do you measure it?', answer: "ROAS is the revenue generated per IDR spent on ads. We track via GA4 and each platform's native reporting." },
      { question: 'Will I have access to my own ad accounts?', answer: 'Yes, 100%. We manage within your own accounts — full access retained at all times.' },
      { question: 'How long until ads go live?', answer: 'Typically 1–2 weeks from kickoff, including audit, strategy, and creative production.' },
    ],
    crossSells: ['seo-content-marketing', 'creative-services'],
  },
  'creative-services': {
    name: 'Creative Services',
    tagline: 'Bold Visuals. Clear Stories. Brands That Stick.',
    description: 'From brand identity to video production, our creative team transforms ideas into visuals that stop scrolls and drive action. Every asset built for your audience — never from a template library.',
    color: '#F59E0B', rgb: '245,158,11',
    featuresVariant: 'bento' as const,
    processVariant: 'flow' as const,
    features: [
      { icon: 'Palette', title: 'Brand Identity Design', desc: 'Logo, colour palette, typography, and brand guide.' },
      { icon: 'Camera', title: 'Photo & Video Production', desc: 'Shoot and post-production for product, corporate, and campaign content.' },
      { icon: 'Film', title: 'Reels & Short-form Video', desc: 'Vertical video for TikTok, Reels, and Shorts — edited for retention.' },
      { icon: 'Image', title: 'Social Media Graphics', desc: 'Feed posts, stories, and carousels — all original, all on-brand.' },
      { icon: 'FileText', title: 'Copywriting', desc: 'Headlines, captions, ad copy, and landing page text that converts.' },
      { icon: 'Monitor', title: 'Marketing Collateral', desc: 'Brochures, decks, banners, and event materials.' },
    ],
    process: [
      { step: '01', title: 'Creative Brief', desc: 'Align on objectives, audience, tone, and deliverables.', duration: 'Day 1–2' },
      { step: '02', title: 'Concept & Moodboard', desc: 'Initial concepts and direction presented for your approval.', duration: 'Day 3–5' },
      { step: '03', title: 'Production', desc: 'Full execution of approved concept — shoot, design, or animate.', duration: 'Week 1–2' },
      { step: '04', title: 'Review & Refine', desc: '2 rounds of revisions, fast turnaround.', duration: 'Day 1–3' },
      { step: '05', title: 'Final Delivery', desc: 'All formats delivered — web, print, social — ready to deploy.', duration: 'Day 1' },
    ],
    stats: [
      { value: '500+', label: 'Assets / Month', desc: 'Total production across all clients' },
      { value: '2', label: 'Revision Rounds', desc: 'Included in every deliverable' },
      { value: '3–5d', label: 'Avg. Turnaround', desc: 'For standard graphic deliverables' },
    ],
    faqs: [
      { question: 'What formats can you produce?', answer: 'Social posts (feed, story, reels), banner ads, video (1:1, 9:16, 16:9), infographics, landing page copy, and more.' },
      { question: 'How long does production take?', answer: 'Graphic design: 3–5 business days. Video with shooting: 1–2 weeks depending on complexity.' },
      { question: 'Are revisions included?', answer: 'Yes — 2 rounds per deliverable. Additional revisions available at a separate fee.' },
      { question: 'Do you shoot outside Jakarta?', answer: 'Our team covers Jakarta and surroundings. Out-of-city shoots available with additional travel costs.' },
    ],
    crossSells: ['social-media-management', 'website-landing-page'],
  },
  'website-landing-page': {
    name: 'Website & Landing Page',
    tagline: 'Convert Visitors Into Customers. Built to Perform.',
    description: 'We design and build high-performance websites and landing pages — fast, mobile-first, and wired for conversion. From company profiles to full e-commerce stores.',
    color: '#06B6D4', rgb: '6,182,212',
    featuresVariant: 'checklist' as const,
    processVariant: 'gantt' as const,
    features: [
      { icon: 'Zap', title: 'Performance-First Build', desc: 'Core Web Vitals optimised — fast load, smooth interaction, zero layout shifts.' },
      { icon: 'Smartphone', title: 'Mobile-First Responsive', desc: '100% responsive across all devices, built mobile-first from day one.' },
      { icon: 'Search', title: 'SEO-Ready Architecture', desc: 'Clean URLs, meta tags, schema markup, and sitemap at launch.' },
      { icon: 'ShoppingCart', title: 'E-Commerce Integration', desc: 'Shopify, WooCommerce, or custom cart with fully integrated checkout.' },
      { icon: 'Plug', title: 'CRM & Analytics Setup', desc: 'GA4, Meta Pixel, WhatsApp chat, and CRM wired in on day one.' },
      { icon: 'ShieldCheck', title: 'SSL & Security', desc: 'HTTPS, regular backups, and maintenance packages available.' },
    ],
    process: [
      { step: '01', title: 'Discovery & Scope', desc: 'Goals, sitemap, references, and platform confirmed.', duration: '2–3 days' },
      { step: '02', title: 'Wireframe & Design', desc: 'Full Figma prototype — desktop and mobile — for your approval.', duration: '5–7 days' },
      { step: '03', title: 'Development', desc: 'Clean, fast code with all integrations and CMS configured.', duration: '7–21 days' },
      { step: '04', title: 'QA & Testing', desc: 'Cross-browser testing, speed audit, and form validation.', duration: '2–3 days' },
      { step: '05', title: 'Launch & Handover', desc: 'Go live, training session, and documentation delivered.', duration: '1 day' },
    ],
    stats: [
      { value: '<2s', label: 'Target Load Time', desc: 'Performance-first standard' },
      { value: '100%', label: 'Mobile Responsive', desc: 'Every project, every device' },
      { value: '1–8wk', label: 'Time to Launch', desc: 'Landing page to full e-commerce' },
    ],
    faqs: [
      { question: 'How long does a website take to build?', answer: 'Landing pages: 1–2 weeks. Company profiles: 3–4 weeks. E-commerce: 4–8 weeks.' },
      { question: 'Which platforms do you use?', answer: 'WordPress, custom Next.js, Shopify, or WooCommerce — depends on your requirements.' },
      { question: 'Is hosting and domain included?', answer: 'Not included, but we assist with setup and recommend the right providers.' },
      { question: 'Are websites mobile-responsive?', answer: 'Yes — 100% mobile-first and fully responsive, on every project.' },
      { question: 'Is training included?', answer: 'Yes — training session and documentation for your team after launch.' },
    ],
    crossSells: ['seo-content-marketing', 'paid-advertising'],
  },
} as const

// ─── ID TRANSLATIONS ──────────────────────────────────────────────────────────

const SERVICES_ID = {
  'seo-content-marketing': {
    tagline: 'Peringkat Lebih Tinggi. Jangkauan Lebih Luas. Konversi Lebih Baik.',
    description: 'Kami membangun kehadiran pencarian organik yang terus bertumbuh dari bulan ke bulan. Dari strategi keyword hingga 150+ artikel per bulan, setiap konten dibuat untuk menangkap traffic berniat tinggi dan mengubahnya menjadi pendapatan.',
    features: [
      { icon: 'Crosshair', title: 'Riset Keyword & Strategi', desc: 'Analisis mendalam untuk menemukan kata kunci yang tepat-tepat diketik calon pelangganmu saat ini.' },
      { icon: 'PenLine', title: 'Produksi Konten Panjang', desc: 'Hingga 150+ artikel SEO per bulan oleh penulis spesialis.' },
      { icon: 'Wrench', title: 'Audit Technical SEO', desc: 'Perbaiki crawlability, kecepatan halaman, schema markup, dan Core Web Vitals.' },
      { icon: 'BarChart3', title: 'Laporan Looker Studio', desc: 'Dashboard live untuk ranking, traffic, dan konversi — selalu aktif.' },
      { icon: 'Link2', title: 'Arsitektur Internal Linking', desc: 'Link strategis antar halaman untuk meneruskan otoritas dan memandu alur pengguna.' },
      { icon: 'MapPin', title: 'Local SEO', desc: 'Dominasi pencarian "dekat sini" dan Google Business map pack.' },
    ],
    process: [
      { step: '01', title: 'Audit Keyword', desc: 'Pemetaan ranking saat ini, celah kompetitor, dan peluang terbaik.', duration: 'Minggu 1' },
      { step: '02', title: 'Strategi Konten', desc: 'Peta topical cluster dan kalender editorial untuk funnelmu.', duration: 'Minggu 2' },
      { step: '03', title: 'Perbaikan Teknis', desc: 'Engineer menyelesaikan crawl error, kecepatan, dan structured data.', duration: 'Minggu 2–3' },
      { step: '04', title: 'Produksi Konten', desc: 'Penulis memproduksi dan menerbitkan artikel teroptimasi secara berkelanjutan.', duration: 'Berkelanjutan' },
      { step: '05', title: 'Laporan & Iterasi', desc: 'Review strategi bulanan untuk memaksimalkan yang sudah berhasil.', duration: 'Bulanan' },
    ],
    stats: [
      { value: '150+', label: 'Artikel / Bulan', desc: 'Kapasitas produksi maksimal' },
      { value: '3–6 bln', label: 'Waktu Ranking', desc: 'Timeline rata-rata masuk halaman 1' },
      { value: '2.5×', label: 'Peningkatan Traffic', desc: 'Rata-rata di klien setelah 6 bulan' },
    ],
    faqs: [
      { question: 'Berapa lama untuk melihat hasil SEO?', answer: 'SEO biasanya butuh 3–6 bulan untuk menunjukkan hasil signifikan. Namun, peningkatan traffic biasanya mulai terlihat dalam 4–8 minggu pertama.' },
      { question: 'Dalam bahasa apa artikel ditulis?', answer: 'Kami menulis dalam bahasa yang digunakan audiensmu — Indonesia, Inggris, atau keduanya — sepenuhnya dioptimasi untuk keywordmu.' },
      { question: 'Bisakah kami memilih topik artikel?', answer: 'Tentu. Kami melakukan riset keyword dan mendiskusikan topik yang relevan bersamamu setiap bulan.' },
      { question: 'Bagaimana progres dilaporkan?', answer: 'Laporan Looker Studio bulanan mencakup ranking keyword, traffic, dan konversi — bisa diakses kapan saja.' },
      { question: 'Apakah backlink building termasuk?', answer: 'Off-page SEO dan link building tersedia sebagai add-on mulai dari IDR 5 Juta/bulan.' },
    ],
  },
  'social-media-management': {
    tagline: 'Konten yang Terhubung. Kehadiran yang Mengonversi.',
    description: 'Kami mengurus media sosialmu sepenuhnya — strategi, pembuatan konten, penjadwalan, dan community management di Instagram, TikTok, Facebook, dan LinkedIn.',
    features: [
      { icon: 'Smartphone', title: 'Manajemen Multi-Platform', desc: 'Instagram, TikTok, Facebook & LinkedIn dalam satu strategi terintegrasi.' },
      { icon: 'Palette', title: 'Desain Visual Kustom', desc: 'Setiap postingan dibangun sesuai brand guide — tanpa template stok.' },
      { icon: 'MessageCircle', title: 'Community Management', desc: 'Komentar dan DM direspons selama jam kerja.' },
      { icon: 'CalendarDays', title: 'Kalender Konten', desc: 'Kalender bulanan direview dan disetujui sebelum tayang.' },
      { icon: 'TrendingUp', title: 'Strategi Pertumbuhan', desc: 'Riset hashtag, kolaborasi, dan kampanye engagement.' },
      { icon: 'BarChart3', title: 'Analitik Bulanan', desc: 'Jangkauan, impresi, pertumbuhan follower, dan engagement terpantau.' },
    ],
    process: [
      { step: '01', title: 'Brand Onboarding', desc: 'Kami mempelajari tone, audiens, kompetitor, dan identitas visual kamu.', duration: 'Minggu 1' },
      { step: '02', title: 'Strategi & Pilar', desc: 'Tentukan pilar konten, fokus platform, dan jadwal posting.', duration: 'Minggu 1–2' },
      { step: '03', title: 'Produksi Konten', desc: 'Desain, copy, dan caption dibuat untuk satu bulan penuh.', duration: 'Minggu 2–3' },
      { step: '04', title: 'Persetujuan & Penjadwalan', desc: 'Kamu review kalender dan setujui sebelum kami jadwalkan.', duration: 'Minggu 3–4' },
    ],
    stats: [
      { value: '4', label: 'Platform', desc: 'Instagram, TikTok, Facebook, LinkedIn' },
      { value: '30+', label: 'Postingan / Bulan', desc: 'Kehadiran konsisten, tanpa hari kosong' },
      { value: '100%', label: 'Konten Orisinal', desc: 'Dibuat khusus untuk brand kamu' },
    ],
    faqs: [
      { question: 'Platform mana yang kamu kelola?', answer: 'Instagram, TikTok, Facebook, dan LinkedIn. Kami bisa fokus ke satu atau beberapa sesuai audiensmu.' },
      { question: 'Apakah community management termasuk?', answer: 'Ya — respons komentar dan DM selama jam kerja termasuk dalam semua paket.' },
      { question: 'Siapa yang membuat konten visual?', answer: 'Tim kreatif kami mendesain semua sesuai brand guideline. Kamu tinggal menyetujui sebelum dipublish.' },
      { question: 'Berapa banyak postingan per bulan?', answer: 'Frekuensi posting disesuaikan dengan budget dan tujuanmu, didiskusikan saat onboarding.' },
    ],
  },
  'paid-advertising': {
    tagline: 'Setiap Rupiah yang Diinvestasikan. Imbal Hasil Maksimal.',
    description: 'Kampanye berbasis data di Google, Meta, TikTok, dan platform Marketplace. Kami menarget audiens yang tepat di momen yang tepat — dan terus mengoptimasi hingga ROAS mencapai 2–4×.',
    features: [
      { icon: 'Search', title: 'Google Ads (Search + Display)', desc: 'Tangkap pembeli berniat tinggi saat mereka sedang mencari.' },
      { icon: 'Megaphone', title: 'Meta Ads', desc: 'Interests, lookalike, dan retargeting di Facebook & Instagram.' },
      { icon: 'Music', title: 'TikTok Ads', desc: 'Iklan video format native yang dirancang untuk konversi.' },
      { icon: 'ShoppingCart', title: 'Marketplace Ads', desc: 'Tokopedia, Shopee, dan Lazada untuk brand e-commerce.' },
      { icon: 'Crosshair', title: 'Strategi Full-Funnel', desc: 'TOFU, MOFU, BOFU — semua tahapan perjalanan pelanggan tercakup.' },
      { icon: 'BarChart3', title: 'Laporan Mingguan', desc: 'ROAS, CPC, CTR dipantau mingguan dengan catatan optimasi.' },
    ],
    process: [
      { step: '01', title: 'Audit Akun', desc: 'Review menyeluruh akun yang ada, pengeluaran tidak efisien, dan data audiens.', duration: 'Minggu 1' },
      { step: '02', title: 'Pemetaan Funnel', desc: 'Tujuan kampanye ditentukan di setiap tahap — dari awareness hingga konversi.', duration: 'Minggu 1' },
      { step: '03', title: 'Produksi Kreatif', desc: 'Ad copy dan visual dibuat untuk setiap platform dan segmen.', duration: 'Minggu 1–2' },
      { step: '04', title: 'Peluncuran Kampanye', desc: 'Live dengan budget terkontrol untuk pengumpulan data awal.', duration: 'Minggu 2' },
      { step: '05', title: 'Siklus Optimasi', desc: 'Penyesuaian bid mingguan, pemangkasan audiens, dan pembaruan kreatif.', duration: 'Mingguan' },
    ],
    stats: [
      { value: '2–4×', label: 'Rata-rata ROAS', desc: 'Return on ad spend di seluruh klien' },
      { value: '−35%', label: 'Penurunan CPA Rata-rata', desc: 'Setelah 90 hari pertama optimasi' },
      { value: '5', label: 'Platform Iklan', desc: 'Google, Meta, TikTok, Tokopedia, Shopee' },
    ],
    faqs: [
      { question: 'Platform iklan mana yang kamu kelola?', answer: 'Google Ads (Search, Display, Shopping), Meta Ads (Facebook & Instagram), TikTok Ads, dan Marketplace Ads.' },
      { question: 'Berapa budget iklan minimum?', answer: 'Budget iklan terpisah dari fee kami. Kami rekomendasikan minimal IDR 3–5 Juta/bulan untuk hasil yang berarti.' },
      { question: 'Apa itu ROAS dan bagaimana mengukurnya?', answer: 'ROAS adalah pendapatan yang dihasilkan per rupiah yang diinvestasikan dalam iklan. Kami melacaknya melalui GA4 dan laporan native setiap platform.' },
      { question: 'Apakah saya memiliki akses ke akun iklan sendiri?', answer: 'Ya, 100%. Kami mengelola di dalam akunmu sendiri — akses penuh tetap ada di tanganmu setiap saat.' },
      { question: 'Berapa lama hingga iklan live?', answer: 'Biasanya 1–2 minggu dari kickoff, termasuk audit, strategi, dan produksi kreatif.' },
    ],
  },
  'creative-services': {
    tagline: 'Visual yang Berani. Cerita yang Jelas. Brand yang Diingat.',
    description: 'Dari identitas brand hingga produksi video, tim kreatif kami mengubah ide menjadi visual yang menghentikan scroll dan mendorong aksi. Setiap aset dibuat untuk audiensmu — bukan dari template.',
    features: [
      { icon: 'Palette', title: 'Desain Identitas Brand', desc: 'Logo, palet warna, tipografi, dan brand guide.' },
      { icon: 'Camera', title: 'Produksi Foto & Video', desc: 'Syuting dan post-production untuk konten produk, korporat, dan kampanye.' },
      { icon: 'Film', title: 'Reels & Video Pendek', desc: 'Video vertikal untuk TikTok, Reels, dan Shorts — diedit untuk retensi.' },
      { icon: 'Image', title: 'Grafis Media Sosial', desc: 'Feed post, stories, dan carousel — semua orisinal, semua sesuai brand.' },
      { icon: 'FileText', title: 'Copywriting', desc: 'Headline, caption, ad copy, dan teks landing page yang mengonversi.' },
      { icon: 'Monitor', title: 'Materi Marketing', desc: 'Brosur, deck, banner, dan materi event.' },
    ],
    process: [
      { step: '01', title: 'Brief Kreatif', desc: 'Selaraskan tujuan, audiens, tone, dan deliverable.', duration: 'Hari 1–2' },
      { step: '02', title: 'Konsep & Moodboard', desc: 'Konsep awal dan arahan dipresentasikan untuk persetujuanmu.', duration: 'Hari 3–5' },
      { step: '03', title: 'Produksi', desc: 'Eksekusi penuh konsep yang disetujui — syuting, desain, atau animasi.', duration: 'Minggu 1–2' },
      { step: '04', title: 'Review & Revisi', desc: '2 putaran revisi, turnaround cepat.', duration: 'Hari 1–3' },
      { step: '05', title: 'Pengiriman Final', desc: 'Semua format dikirimkan — web, print, sosial — siap deploy.', duration: 'Hari 1' },
    ],
    stats: [
      { value: '500+', label: 'Aset / Bulan', desc: 'Total produksi di seluruh klien' },
      { value: '2', label: 'Putaran Revisi', desc: 'Termasuk di setiap deliverable' },
      { value: '3–5 hr', label: 'Turnaround Rata-rata', desc: 'Untuk deliverable grafis standar' },
    ],
    faqs: [
      { question: 'Format apa saja yang bisa diproduksi?', answer: 'Postingan sosial (feed, story, reels), banner iklan, video (1:1, 9:16, 16:9), infografis, teks landing page, dan lainnya.' },
      { question: 'Berapa lama proses produksi?', answer: 'Desain grafis: 3–5 hari kerja. Video dengan syuting: 1–2 minggu tergantung kompleksitas.' },
      { question: 'Apakah revisi termasuk?', answer: 'Ya — 2 putaran per deliverable. Revisi tambahan tersedia dengan biaya terpisah.' },
      { question: 'Apakah syuting di luar Jakarta bisa?', answer: 'Tim kami mencakup Jakarta dan sekitarnya. Syuting luar kota tersedia dengan biaya perjalanan tambahan.' },
    ],
  },
  'website-landing-page': {
    tagline: 'Ubah Pengunjung Menjadi Pelanggan. Dibangun untuk Performa.',
    description: 'Kami merancang dan membangun website serta landing page berperforma tinggi — cepat, mobile-first, dan disiapkan untuk konversi. Dari company profile hingga toko e-commerce lengkap.',
    features: [
      { icon: 'Zap', title: 'Performa Terdepan', desc: 'Core Web Vitals dioptimasi — loading cepat, interaksi mulus, tanpa layout shift.' },
      { icon: 'Smartphone', title: 'Responsif Mobile-First', desc: '100% responsif di semua perangkat, dibangun mobile-first dari awal.' },
      { icon: 'Search', title: 'Arsitektur Siap SEO', desc: 'URL bersih, meta tag, schema markup, dan sitemap tersedia saat launch.' },
      { icon: 'ShoppingCart', title: 'Integrasi E-Commerce', desc: 'Shopify, WooCommerce, atau cart kustom dengan checkout yang terintegrasi penuh.' },
      { icon: 'Plug', title: 'Setup CRM & Analitik', desc: 'GA4, Meta Pixel, chat WhatsApp, dan CRM terpasang sejak hari pertama.' },
      { icon: 'ShieldCheck', title: 'SSL & Keamanan', desc: 'HTTPS, backup rutin, dan paket maintenance tersedia.' },
    ],
    process: [
      { step: '01', title: 'Discovery & Scope', desc: 'Tujuan, sitemap, referensi, dan platform dikonfirmasi.', duration: '2–3 hari' },
      { step: '02', title: 'Wireframe & Desain', desc: 'Prototipe Figma lengkap — desktop dan mobile — untuk persetujuanmu.', duration: '5–7 hari' },
      { step: '03', title: 'Development', desc: 'Kode bersih dan cepat dengan semua integrasi dan CMS terkonfigurasi.', duration: '7–21 hari' },
      { step: '04', title: 'QA & Testing', desc: 'Pengujian lintas browser, audit kecepatan, dan validasi form.', duration: '2–3 hari' },
      { step: '05', title: 'Launch & Handover', desc: 'Go live, sesi pelatihan, dan dokumentasi diserahkan.', duration: '1 hari' },
    ],
    stats: [
      { value: '<2 dtk', label: 'Target Waktu Load', desc: 'Standar performa terdepan' },
      { value: '100%', label: 'Responsif Mobile', desc: 'Setiap proyek, semua perangkat' },
      { value: '1–8 mggu', label: 'Waktu hingga Launch', desc: 'Dari landing page hingga e-commerce penuh' },
    ],
    faqs: [
      { question: 'Berapa lama membangun website?', answer: 'Landing page: 1–2 minggu. Company profile: 3–4 minggu. E-commerce: 4–8 minggu.' },
      { question: 'Platform apa yang digunakan?', answer: 'WordPress, Next.js kustom, Shopify, atau WooCommerce — tergantung kebutuhanmu.' },
      { question: 'Apakah hosting dan domain termasuk?', answer: 'Tidak termasuk, tetapi kami membantu setup dan merekomendasikan provider yang tepat.' },
      { question: 'Apakah website responsif mobile?', answer: 'Ya — 100% mobile-first dan sepenuhnya responsif, di setiap proyek.' },
      { question: 'Apakah pelatihan termasuk?', answer: 'Ya — sesi pelatihan dan dokumentasi untuk tim kamu setelah launch.' },
    ],
  },
}

// ─── UI COPY ──────────────────────────────────────────────────────────────────

const UI_COPY = {
  id: {
    badge: 'Layanan Digital Marketing',
    ctaPrimary: 'Mulai Konsultasi Gratis',
    ctaSecondary: 'Lihat Harga',
    featuresLabel: 'Apa yang Kamu Dapat',
    featuresHeadline: 'Semua sudah termasuk.',
    featuresDesc: 'Tidak ada biaya tersembunyi. Semua yang dibutuhkan brand kamu untuk berkembang, dalam satu atap.',
    processLabel: 'Cara Kerjanya',
    processHeadline: 'Dari kickoff hingga hasil.',
    processDesc: 'Proses yang jelas dan terstruktur agar kamu selalu tahu langkah selanjutnya.',
    pricingLabel: 'Harga',
    pricingHeadline: 'Pilih paket yang sesuai.',
    pricingDesc: 'Harga transparan, tanpa kejutan, disesuaikan dengan tujuanmu.',
    faqLabel: 'FAQ',
    faqHeadline: 'Pertanyaan yang sering ditanyakan.',
    addOnsLabel: 'Add-on Tersedia',
    crossSellHeadline: 'Cocok dikombinasikan dengan',
    crossSellDesc: 'Gabungkan layanan untuk hasil yang saling menguatkan.',
    breadcrumbHome: 'Beranda',
    breadcrumbServices: 'Layanan',
    contactPath: '/contact',
    servicesBasePath: '/services',
  },
  en: {
    badge: 'Digital Marketing Service',
    ctaPrimary: 'Start Free Consultation',
    ctaSecondary: 'See Pricing',
    featuresLabel: 'What You Get',
    featuresHeadline: 'Everything included.',
    featuresDesc: 'No hidden extras. Every deliverable your brand needs to grow, under one roof.',
    processLabel: 'How It Works',
    processHeadline: 'From kickoff to results.',
    processDesc: 'A clear, repeatable process so you always know what happens next.',
    pricingLabel: 'Pricing',
    pricingHeadline: 'Choose your plan.',
    pricingDesc: 'Transparent, no-surprise pricing built around your goals.',
    faqLabel: 'FAQ',
    faqHeadline: 'Common questions.',
    addOnsLabel: 'Available Add-ons',
    crossSellHeadline: 'Pairs well with',
    crossSellDesc: 'Combine services for compounding results.',
    breadcrumbHome: 'Home',
    breadcrumbServices: 'Services',
    contactPath: '/en/contact',
    servicesBasePath: '/en/services',
  },
}

const SERVICE_META: Record<string, { name: string; color: string }> = {
  'seo-content-marketing': { name: 'SEO & Content Marketing', color: '#7C3AED' },
  'social-media-management': { name: 'Social Media Management', color: '#DB2777' },
  'paid-advertising': { name: 'Paid Advertising', color: '#D97706' },
  'creative-services': { name: 'Creative Services', color: '#F59E0B' },
  'website-landing-page': { name: 'Website & Landing Page', color: '#06B6D4' },
}

type SvcKey = keyof typeof SERVICES
type Svc = typeof SERVICES[SvcKey]

// ─── HERO VISUALS ─────────────────────────────────────────────────────────────

function SeoHeroVisual() {
  const rows = [
    { kw: 'jasa digital marketing jakarta', rank: '#1', change: '+5' },
    { kw: 'agency social media indonesia', rank: '#2', change: '+7' },
    { kw: 'google ads management jakarta', rank: '#3', change: '+11' },
    { kw: 'content marketing seo murah', rank: '#4', change: '+14' },
  ]
  return (
    <div className="relative">
      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-default)] bg-[var(--bg-surface)]">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
          <span className="ml-2 text-xs text-[var(--text-muted)] font-mono">keyword-tracker.csv</span>
        </div>
        <div className="p-3">
          <div className="grid grid-cols-[1fr_52px_56px] px-3 py-1.5 text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-widest">
            <span>Keyword</span><span className="text-center">Rank</span><span className="text-right">Δ</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-[1fr_52px_56px] px-3 py-2.5 rounded-lg items-center"
              style={{ background: i % 2 === 0 ? 'rgba(124,58,237,0.05)' : 'transparent' }}>
              <span className="text-xs text-[var(--text-secondary)] truncate">{r.kw}</span>
              <span className="text-center text-sm font-bold text-violet-400">{r.rank}</span>
              <span className="text-right text-xs font-semibold text-emerald-400">↑ {r.change}</span>
            </div>
          ))}
        </div>
        <div className="px-4 py-2.5 border-t border-[var(--border-default)] flex justify-between text-xs">
          <span className="text-[var(--text-muted)]">Updated today</span>
          <span className="text-emerald-400 font-semibold">All positions improving ↑</span>
        </div>
      </div>
      <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg,#7C3AED,#DB2777)' }}>
        Page #1 ✓
      </div>
    </div>
  )
}

function SocialHeroVisual() {
  const platforms = [
    { name: 'Instagram', icon: 'Camera', valueColor: '#E4405F', followers: '12.4K', growth: '+284 this month' },
    { name: 'TikTok', icon: 'Music', valueColor: '#ffffff', followers: '8.7K', growth: '+610 this month' },
    { name: 'Facebook', icon: 'ThumbsUp', valueColor: '#1877F2', followers: '5.2K', growth: '+128 this month' },
    { name: 'LinkedIn', icon: 'Briefcase', valueColor: '#0A66C2', followers: '2.1K', growth: '+89 this month' },
  ]
  return (
    <div className="grid grid-cols-2 gap-3">
      {platforms.map((p) => (
        <div key={p.name} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 hover:border-[var(--border-hover)] transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <LucideIcon name={p.icon} size={18} strokeWidth={1.5} style={{ color: p.valueColor }} />
            <span className="text-sm font-semibold text-[var(--text-primary)]">{p.name}</span>
          </div>
          <div className="text-2xl font-extrabold" style={{ color: p.valueColor }}>{p.followers}</div>
          <div className="text-[11px] text-emerald-400 mt-1">{p.growth}</div>
        </div>
      ))}
    </div>
  )
}

function AdsHeroVisual() {
  const stages = [
    { label: 'Awareness', value: '250,000', unit: 'reach', indent: 0 },
    { label: 'Consideration', value: '18,500', unit: 'clicks', indent: 6 },
    { label: 'Intent', value: '4,200', unit: 'leads', indent: 14 },
    { label: 'Conversion', value: '840', unit: 'sales', indent: 22 },
  ]
  return (
    <div className="space-y-2">
      <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-4 font-semibold">Campaign Funnel — Live</div>
      {stages.map((s, i) => (
        <div key={i} className="rounded-xl px-4 py-3 flex items-center justify-between"
          style={{
            background: `rgba(217,119,6,${0.22 - i * 0.04})`,
            border: '1px solid rgba(217,119,6,0.2)',
            marginLeft: `${s.indent}%`,
          }}>
          <span className="text-sm font-semibold text-[var(--text-primary)]">{s.label}</span>
          <div className="text-right">
            <div className="text-sm font-bold text-amber-400">{s.value}</div>
            <div className="text-[10px] text-[var(--text-muted)]">{s.unit}</div>
          </div>
        </div>
      ))}
      <div className="text-right text-sm font-bold text-amber-400 pt-2 pr-2">ROAS: 3.2× ↑</div>
    </div>
  )
}

function CreativeHeroVisual() {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 rounded-2xl flex items-center justify-center text-5xl"
          style={{ background: 'linear-gradient(135deg,rgba(245,158,11,0.25),rgba(249,115,22,0.2))', height: '130px' }}>
          🎨
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex-1 rounded-2xl" style={{ background: 'rgba(219,39,119,0.2)', minHeight: '60px' }} />
          <div className="flex-1 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: 'rgba(124,58,237,0.2)', minHeight: '60px' }}>🎬</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-2xl flex items-center justify-center text-2xl"
          style={{ background: 'rgba(6,182,212,0.15)', height: '80px' }}>📸</div>
        <div className="col-span-2 rounded-2xl px-4 flex items-center gap-3"
          style={{ background: 'rgba(245,158,11,0.1)', height: '80px' }}>
          {['#F59E0B', '#DB2777', '#7C3AED', '#06B6D4', '#10B981'].map((c) => (
            <div key={c} className="h-9 w-9 rounded-full border-2 border-white/20 flex-shrink-0" style={{ background: c }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function WebHeroVisual() {
  return (
    <div className="rounded-2xl border border-[var(--border-default)] overflow-hidden bg-[var(--bg-elevated)] shadow-2xl">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-default)] bg-[var(--bg-surface)]">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
          <span className="h-3 w-3 rounded-full bg-green-400/70" />
        </div>
        <div className="flex-1 bg-[var(--bg-primary)] rounded-md px-3 py-1 text-xs text-[var(--text-muted)] flex items-center gap-2">
          <span className="text-cyan-400">🔒</span> yourbrand.com
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3 pb-3 border-b border-[var(--border-default)]">
          <div className="h-4 w-14 rounded" style={{ background: 'rgba(6,182,212,0.3)' }} />
          {[1, 2, 3].map((i) => <div key={i} className="h-3 w-10 rounded bg-[var(--bg-surface)]" />)}
          <div className="ml-auto h-7 w-20 rounded-lg" style={{ background: 'linear-gradient(135deg,#06B6D4,#7C3AED)' }} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <div className="h-5 w-full rounded bg-[var(--bg-surface)]" />
            <div className="h-5 w-4/5 rounded bg-[var(--bg-surface)]" />
            <div className="h-3 w-full rounded bg-[var(--bg-surface)]/60 mt-3" />
            <div className="h-3 w-5/6 rounded bg-[var(--bg-surface)]/60" />
            <div className="h-8 w-28 rounded-lg mt-3" style={{ background: 'rgba(6,182,212,0.3)' }} />
          </div>
          <div className="rounded-xl flex items-center justify-center text-3xl"
            style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' }}>
            ⚡
          </div>
        </div>
        <div className="flex gap-2 pt-2 border-t border-[var(--border-default)]">
          {[{ label: 'Perf', score: 98, color: '#10B981' }, { label: 'SEO', score: 100, color: '#06B6D4' }, { label: 'A11y', score: 95, color: '#A78BFA' }].map((m) => (
            <div key={m.label} className="flex-1 text-center">
              <div className="text-sm font-bold" style={{ color: m.color }}>{m.score}</div>
              <div className="text-[10px] text-[var(--text-muted)]">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── FEATURES SECTION ─────────────────────────────────────────────────────────

type Feature = { icon: string; title: string; desc: string }

function FeaturesSection({ features, variant, color, rgb }: {
  features: readonly Feature[]
  variant: Svc['featuresVariant']
  color: string
  rgb: string
}) {
  if (variant === 'list') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((f, i) => (
          <div key={i} className="flex gap-4 p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--border-hover)] transition-colors"
            style={{ borderLeft: `3px solid ${color}` }}>
            <div className="flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center"
              style={{ background: `rgba(${rgb},0.1)` }}>
              <LucideIcon name={f.icon} size={20} strokeWidth={1.5} style={{ color }} />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-1">{f.title}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'emoji-cards') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <div key={i} className="p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] text-center hover:border-[var(--border-hover)] transition-colors group"
            style={{ background: `rgba(${rgb},${0.03 + (i % 3) * 0.02})` }}>
            <div className="mb-3 flex justify-center">
              <LucideIcon name={f.icon} size={28} strokeWidth={1.5} style={{ color }} />
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-sm">{f.title}</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'numbered') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <div key={i} className="p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--border-hover)] transition-all hover:shadow-lg"
            style={{ ['--shadow-color' as string]: color }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl font-black leading-none" style={{ color, opacity: 0.25 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <LucideIcon name={f.icon} size={22} strokeWidth={1.5} style={{ color }} />
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">{f.title}</h3>
            <p className="text-sm text-[var(--text-secondary)]">{f.desc}</p>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'bento') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((f, i) => {
          const isWide = i === 0 || i === 5
          return (
            <div key={i} className={`p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--border-hover)] transition-colors ${isWide ? 'md:col-span-2' : ''}`}
              style={{ background: `rgba(${rgb},${0.04 + (i % 2) * 0.03})` }}>
              <div className="mb-3">
                <LucideIcon name={f.icon} size={28} strokeWidth={1.5} style={{ color }} />
              </div>
              <h3 className="font-bold text-[var(--text-primary)] mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{f.desc}</p>
            </div>
          )
        })}
      </div>
    )
  }

  // checklist
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {features.map((f, i) => (
        <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--border-hover)] transition-colors">
          <div className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mt-0.5"
            style={{ background: color }}>
            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <LucideIcon name={f.icon} size={14} strokeWidth={1.5} style={{ color }} />
              <h3 className="font-semibold text-[var(--text-primary)] text-sm">{f.title}</h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── PROCESS SECTION ──────────────────────────────────────────────────────────

type Step = { step: string; title: string; desc: string; duration: string }

function ProcessSection({ steps, variant, color, rgb }: {
  steps: readonly Step[]
  variant: Svc['processVariant']
  color: string
  rgb: string
}) {
  if (variant === 'horizontal') {
    return (
      <div className="relative">
        <div className="hidden lg:block absolute top-10 left-0 right-0 h-px"
          style={{ background: `linear-gradient(to right, transparent 5%, ${color}40 20%, ${color}40 80%, transparent 95%)` }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              <div className="h-10 w-10 rounded-2xl flex items-center justify-center text-sm font-black text-white mb-4 relative z-10"
                style={{ background: `linear-gradient(135deg,${color},#DB2777)` }}>
                {s.step}
              </div>
              <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-2"
                style={{ color: `rgba(${rgb},0.7)` }}>
                {s.duration}
              </div>
              <h3 className="font-bold text-[var(--text-primary)] mb-2">{s.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'vertical') {
    return (
      <div className="max-w-xl mx-auto space-y-0">
        {steps.map((s, i) => (
          <div key={i} className="flex gap-5">
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-2xl flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                style={{ background: `linear-gradient(135deg,${color},#7C3AED)` }}>
                {s.step}
              </div>
              {i < steps.length - 1 && (
                <div className="w-px flex-1 my-2" style={{ background: `rgba(${rgb},0.25)`, minHeight: '40px' }} />
              )}
            </div>
            <div className="pb-8">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-bold text-[var(--text-primary)]">{s.title}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `rgba(${rgb},0.12)`, color }}>
                  {s.duration}
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'funnel') {
    return (
      <div className="max-w-2xl mx-auto space-y-3">
        {steps.map((s, i) => (
          <div key={i} className="rounded-2xl p-5 border"
            style={{
              background: `rgba(${rgb},${0.07 - i * 0.01})`,
              borderColor: `rgba(${rgb},0.2)`,
              marginLeft: `${i * 3}%`,
              marginRight: `${i * 3}%`,
            }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-lg font-black" style={{ color }}>{s.step}</span>
                <div>
                  <h3 className="font-bold text-[var(--text-primary)]">{s.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">{s.desc}</p>
                </div>
              </div>
              <span className="text-xs flex-shrink-0 px-2 py-1 rounded-lg font-semibold"
                style={{ background: `rgba(${rgb},0.15)`, color }}>
                {s.duration}
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'flow') {
    return (
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-3 flex-shrink-0">
            <div className="flex flex-col items-center text-center" style={{ minWidth: '140px' }}>
              <div className="h-12 w-12 rounded-full flex items-center justify-center text-sm font-black text-white mb-3 border-4"
                style={{ background: `rgba(${rgb},0.15)`, borderColor: color, color }}>
                {s.step}
              </div>
              <div className="text-xs font-semibold mb-1" style={{ color }}>{s.duration}</div>
              <h3 className="font-bold text-[var(--text-primary)] text-sm mb-1">{s.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden md:block flex-shrink-0" style={{ color: `rgba(${rgb},0.4)`, fontSize: '24px' }}>→</div>
            )}
          </div>
        ))}
      </div>
    )
  }

  // gantt
  const maxDays = 21
  const parseBarWidth = (duration: string): number => {
    if (duration.includes('21')) return 100
    if (duration.includes('7')) return 38
    if (duration.includes('5')) return 30
    if (duration.includes('2–3')) return 14
    return 8
  }
  return (
    <div className="space-y-3 max-w-2xl mx-auto">
      <div className="flex gap-2 mb-6 text-xs text-[var(--text-muted)]">
        <div className="w-40 flex-shrink-0" />
        <div className="flex-1 flex justify-between">
          <span>Day 1</span><span>Week 1</span><span>Week 2</span><span>Week 3+</span>
        </div>
      </div>
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-40 flex-shrink-0">
            <div className="text-sm font-semibold text-[var(--text-primary)]">{s.title}</div>
            <div className="text-xs" style={{ color }}>{s.duration}</div>
          </div>
          <div className="flex-1 h-8 rounded-lg bg-[var(--bg-surface)] relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 rounded-lg flex items-center px-3"
              style={{
                width: `${parseBarWidth(s.duration)}%`,
                background: `linear-gradient(90deg, rgba(${rgb},0.6), rgba(${rgb},0.3))`,
                minWidth: '40px',
              }}>
              <span className="text-xs font-semibold text-white truncate">{s.step}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── DB HELPER ────────────────────────────────────────────────────────────────

async function getDbService(slug: string) {
  try {
    return await prisma.service.findUnique({
      where: { slug },
      include: {
        pricingTiers: { orderBy: { sortOrder: 'asc' } },
        addOns: { where: { isActive: true } },
      },
    })
  } catch {
    return null
  }
}

// ─── STATIC PARAMS ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const svc = SERVICES[slug as SvcKey]
  const svcId = SERVICES_ID[slug as SvcKey]
  if (!svc) return {}
  return buildMetadata({
    title: `${svc.name} — Logink Digital Marketing Jakarta`,
    description: (svcId?.description ?? svc.description).slice(0, 155),
    path: `/services/${slug}`,
  })
}

// ─── SHARED CONTENT COMPONENT ─────────────────────────────────────────────────

export async function ServiceDetailContent({ slug, locale = 'id' }: { slug: string; locale?: 'id' | 'en' }) {
  const svc = SERVICES[slug as SvcKey]
  if (!svc) notFound()

  const svcCopy = locale === 'id' ? SERVICES_ID[slug as SvcKey] : svc
  const ui = UI_COPY[locale]
  const dbService = await getDbService(slug)

  const breadcrumbs = [
    { name: ui.breadcrumbHome, url: 'https://logink.co' },
    { name: ui.breadcrumbServices, url: `https://logink.co${ui.servicesBasePath}` },
    { name: svc.name, url: `https://logink.co${ui.servicesBasePath}/${slug}` },
  ]

  const HeroVisual =
    slug === 'seo-content-marketing' ? SeoHeroVisual :
    slug === 'social-media-management' ? SocialHeroVisual :
    slug === 'paid-advertising' ? AdsHeroVisual :
    slug === 'creative-services' ? CreativeHeroVisual :
    WebHeroVisual

  const sectionBg = (i: number) =>
    i % 2 === 0 ? 'bg-[var(--bg-primary)]' : 'bg-[var(--bg-surface)]'

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify([
          breadcrumbSchema(breadcrumbs),
          ...(svcCopy.faqs.length ? [faqSchema([...svcCopy.faqs])] : []),
        ]),
      }} />

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden px-4 pt-24 pb-20">
        <div className="absolute inset-0 animated-mesh opacity-80" />
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, rgba(${svc.rgb},0.2) 0%, transparent 70%)` }} />
          <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, rgba(${svc.rgb},0.12) 0%, transparent 70%)` }} />
        </div>

        <div className="relative max-w-6xl mx-auto w-full z-10">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-10">
            <Link href={locale === 'en' ? '/en' : '/'} className="hover:text-[var(--text-primary)] transition-colors">{ui.breadcrumbHome}</Link>
            <span>/</span>
            <Link href={ui.servicesBasePath} className="hover:text-[var(--text-primary)] transition-colors">{ui.breadcrumbServices}</Link>
            <span>/</span>
            <span className="text-[var(--text-secondary)]">{svc.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-6"
                style={{ borderColor: `rgba(${svc.rgb},0.3)`, background: `rgba(${svc.rgb},0.08)`, color: svc.color }}>
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: svc.color }} />
                {ui.badge}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] mb-4 leading-tight tracking-tight">
                {svcCopy.tagline.split('. ').map((part, i, arr) => (
                  <span key={i}>
                    {i === 0 ? part : <><br /><span style={{ color: svc.color }}>{part}</span></>}
                    {i < arr.length - 1 ? '.' : ''}
                  </span>
                ))}
              </h1>
              <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed max-w-lg">{svcCopy.description}</p>
              <div className="flex flex-wrap gap-3">
                <Link href={ui.contactPath}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm hover:scale-[1.02] hover:shadow-xl transition-all duration-200"
                  style={{ background: `linear-gradient(135deg,${svc.color},#DB2777)` }}>
                  {ui.ctaPrimary}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="#pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border-hover)] text-[var(--text-primary)] font-semibold text-sm hover:bg-[var(--bg-elevated)] transition-all duration-200">
                  {ui.ctaSecondary}
                </Link>
              </div>
            </div>
            <div className="w-full max-w-md mx-auto lg:max-w-none">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 px-4" style={{ background: `rgba(${svc.rgb},0.06)`, borderTop: `1px solid rgba(${svc.rgb},0.15)`, borderBottom: `1px solid rgba(${svc.rgb},0.15)` }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            {svcCopy.stats.map((s, i) => (
              <div key={i}>
                <div className="text-3xl sm:text-4xl font-extrabold mb-1" style={{ color: svc.color }}>{s.value}</div>
                <div className="text-sm font-semibold text-[var(--text-primary)] mb-1">{s.label}</div>
                <div className="text-xs text-[var(--text-muted)]">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className={`py-20 px-4 ${sectionBg(0)}`}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: svc.color }}>{ui.featuresLabel}</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">{ui.featuresHeadline}</h2>
            <p className="text-[var(--text-secondary)] mt-3 max-w-xl">{ui.featuresDesc}</p>
          </div>
          <FeaturesSection features={svcCopy.features} variant={svc.featuresVariant} color={svc.color} rgb={svc.rgb} />
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className={`py-20 px-4 ${sectionBg(1)}`}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: svc.color }}>{ui.processLabel}</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">{ui.processHeadline}</h2>
            <p className="text-[var(--text-secondary)] mt-3">{ui.processDesc}</p>
          </div>
          <ProcessSection steps={svcCopy.process} variant={svc.processVariant} color={svc.color} rgb={svc.rgb} />
        </div>
      </section>

      {/* ── PRICING (DB) ── */}
      {dbService?.pricingTiers && dbService.pricingTiers.length > 0 && (
        <section id="pricing" className={`py-20 px-4 ${sectionBg(0)}`}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: svc.color }}>{ui.pricingLabel}</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">{ui.pricingHeadline}</h2>
              <p className="text-[var(--text-secondary)] mt-3">{ui.pricingDesc}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dbService.pricingTiers.map((tier) => (
                <PricingTierCard
                  key={tier.id}
                  tier={{ ...tier, features: Array.isArray(tier.features) ? tier.features as string[] : [] }}
                  serviceSlug={slug}
                  color={svc.color}
                />
              ))}
            </div>
            {dbService.addOns.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-4">{ui.addOnsLabel}</h3>
                <div className="flex flex-wrap gap-2">
                  {dbService.addOns.map((addon) => (
                    <span key={addon.id} className="px-4 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] text-sm text-[var(--text-secondary)]">
                      {addon.name}
                      {addon.priceLabel && <span className="ml-2 text-xs text-[var(--text-muted)]">({addon.priceLabel})</span>}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className={`py-20 px-4 ${sectionBg(dbService?.pricingTiers?.length ? 1 : 0)}`}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: svc.color }}>{ui.faqLabel}</div>
            <h2 className="text-3xl font-extrabold text-[var(--text-primary)]">{ui.faqHeadline}</h2>
          </div>
          <Accordion items={[...svcCopy.faqs]} />
        </div>
      </section>

      {/* ── CROSS-SELL ── */}
      <section className="py-16 px-4 bg-[var(--bg-surface)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">{ui.crossSellHeadline}</h2>
            <p className="text-sm text-[var(--text-muted)] mt-2">{ui.crossSellDesc}</p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {svc.crossSells.map((cs) => {
              const meta = SERVICE_META[cs]
              if (!meta) return null
              return (
                <Link key={cs} href={`${ui.servicesBasePath}/${cs}`}
                  className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)] transition-all text-sm font-semibold text-[var(--text-primary)] group">
                  <span className="h-2.5 w-2.5 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"
                    style={{ backgroundColor: meta.color }} />
                  {meta.name}
                  <svg className="h-3.5 w-3.5 text-[var(--text-muted)] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <CTASection locale={locale} />
    </>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  return <ServiceDetailContent slug={slug} locale="id" />
}
