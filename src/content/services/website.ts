// Website & Landing Page (BUILD §3.4). The X / X_EN exports are the vetted legacy copy, kept verbatim; the
// default export maps them into ServiceContent ('projects' pricing: one registry price for every project).
import type { Locale } from '@/lib/services'
import type { ServiceContent } from './types'

export const WEBSITE_PROJECT_TYPES = [
  {
    id: 'landing-page',
    title: 'Landing Page Kampanye',
    tagline: 'Mesin konversi satu halaman yang dirancang untuk kampanye dan lead generation.',
    description:
      'Saat Anda butuh halaman yang fokus pada satu tujuan: menangkap leads, menjual produk, atau mendorong sign-up. Landing page adalah senjata tercepat dan paling cost-effective. Desain berfokus CRO, framework A/B testing, dan tracking penuh sejak hari pertama.',
    bestFor: 'Kampanye · Lead gen · Peluncuran produk · Promo',
    timeline: '1-2 minggu',
    accentColor: '#C084FC',
    features: [
      'Desain Berfokus CRO',
      'Framework A/B Testing',
      'Integrasi Form & CTA',
      'Tracking Meta Pixel & GA4',
      'Dukungan Multi-variant Page',
    ],
  },
  {
    id: 'company-profile',
    title: 'Website Company Profile',
    tagline: 'Markas digital brand Anda: kredibel, profesional, dan dirancang untuk berkembang.',
    description:
      'Website multi-halaman yang membangun kehadiran brand Anda, mengomunikasikan nilai Anda, dan menangkap leads. Desain UI kustom, integrasi CMS untuk update konten yang mudah, dan SEO on-page yang membuat Anda mudah ditemukan sejak hari peluncuran.',
    bestFor: 'Brand presence · Kredibilitas · Bisnis jasa',
    timeline: '3-5 minggu',
    accentColor: '#A855F7',
    features: [
      'Desain UI Kustom',
      'Integrasi CMS',
      'Mobile Responsive',
      'Setup SEO Dasar',
      'Google Analytics 4',
      'SEO On-page Lanjutan',
    ],
  },
  {
    id: 'e-commerce',
    title: 'Website E-Commerce',
    tagline: 'Toko online lengkap dengan sistem pembayaran dan pengiriman Indonesia yang sudah terpasang.',
    description:
      'Katalog produk, payment gateway lokal (Midtrans, Xendit), integrasi pengiriman (JNE, J&T, dan lainnya), dan dashboard admin untuk mengelola semuanya. Dibangun di WooCommerce, Shopify, atau fully custom, sesuai skala dan kebutuhan Anda.',
    bestFor: 'Toko online · Brand D2C · FMCG · Retail',
    timeline: '4-8 minggu',
    accentColor: '#EE3D5E',
    features: [
      'Setup Katalog Produk',
      'Payment Gateway Lokal (Midtrans, Xendit)',
      'Integrasi Pengiriman (JNE, J&T, dll.)',
      'Dashboard Admin',
      'WooCommerce / Shopify / Custom',
    ],
  },
] as const

export const WEBSITE_TECH_FEATURES = [
  {
    id: 'performance',
    title: 'Dibangun untuk Performa Tinggi',
    description:
      'Setiap situs hadir dengan waktu muat di bawah 2 detik. Bundle code-split, gambar lazy-load, font teroptimasi, dan CDN delivery. PageSpeed score Anda dijamin 90+ atau kami perbaiki gratis.',
    span: 2,
    accentColor: '#C084FC',
    badge: '90+',
  },
  {
    id: 'mobile',
    title: 'Mobile-First Responsive',
    description:
      'Didesain untuk layar mobile lebih dulu, lalu di-scale ke atas. Lebih dari 70% traffic web Indonesia berasal dari mobile, dan situs Anda tampil sempurna di setiap perangkat dan orientasi.',
    span: 1,
    accentColor: '#A855F7',
    badge: null,
  },
  {
    id: 'seo',
    title: 'Arsitektur Siap SEO',
    description:
      'HTML semantik yang bersih, hierarki heading, XML sitemap, robots.txt, meta tag, Open Graph, dan structured data: semuanya dikonfigurasi sebelum launch.',
    span: 1,
    accentColor: '#EE3D5E',
    badge: null,
  },
  {
    id: 'tracking',
    title: 'Setup CRM & Analytics',
    description:
      'Google Analytics 4, Meta Pixel, WhatsApp chat, dan integrasi CRM agar Anda dapat melacak setiap pengunjung dan konversi sejak hari pertama.',
    span: 1,
    accentColor: '#F88438',
    badge: null,
  },
  {
    id: 'security',
    title: 'SSL & Keamanan',
    description:
      'HTTPS sebagai default, hosting aman, backup rutin, dan konfigurasi yang diperketat. Data pengunjung Anda terlindungi.',
    span: 1,
    accentColor: '#D81C5C',
    badge: null,
  },
] as const

export const WEBSITE_STATS = [
  {
    value: '<2dtk',
    label: 'Target Waktu Muat',
    context: 'Core Web Vitals dioptimasi. PageSpeed 90+ di mobile, bukan hanya desktop.',
    animate: false,
  },
  {
    value: '100%',
    label: 'Mobile Responsive',
    context: 'Setiap komponen diuji di semua perangkat, dibangun mobile-first dari hari pertama.',
    animate: true,
  },
  {
    value: '1-8mgg',
    label: 'Waktu Hingga Launch',
    context: 'Landing page 1-2 minggu. Company profile 3-5 minggu. E-commerce 4-8 minggu.',
    animate: false,
  },
] as const

export const WEBSITE_PROCESS = [
  {
    phase: 1,
    title: 'Discovery & Scope',
    timeline: 'Hari 1-3',
    barStart: 0,
    barEnd: 15,
    description:
      'Wawancara stakeholder, analisis kompetitor, perencanaan sitemap, keputusan teknologi, dan dokumen scope yang detail. Kami tentukan setiap halaman, fitur, dan integrasi sebelum desain dimulai.',
    accentColor: '#C084FC',
  },
  {
    phase: 2,
    title: 'Wireframe & Desain',
    timeline: 'Minggu 1-2',
    barStart: 10,
    barEnd: 40,
    description:
      'Wireframe low-fidelity untuk struktur dan alur pengguna, lalu mockup desain UI high-fidelity di Figma. Versi desktop dan mobile. Anda menyetujui desainnya sebelum satu baris kode pun ditulis.',
    accentColor: '#A855F7',
  },
  {
    phase: 3,
    title: 'Development',
    timeline: 'Minggu 2-4+',
    barStart: 30,
    barEnd: 75,
    description:
      'Build front-end, integrasi back-end, setup CMS, konfigurasi payment gateway, tracking analytics, dan implementasi responsive. Deploy ke staging URL untuk review Anda.',
    accentColor: '#D81C5C',
  },
  {
    phase: 4,
    title: 'QA & Testing',
    timeline: 'Minggu 3-5',
    barStart: 55,
    barEnd: 85,
    description:
      'Testing lintas browser (Chrome, Safari, Firefox, Edge), mobile testing (iOS + Android), load testing, pengujian form submission, pengujian alur pembayaran, dan audit aksesibilitas.',
    accentColor: '#F88438',
  },
  {
    phase: 5,
    title: 'Launch & Serah Terima',
    timeline: 'Minggu 4-8',
    barStart: 75,
    barEnd: 100,
    description:
      'Konfigurasi DNS, setup SSL, deployment final, redirect 301, monitoring pasca-launch selama 2 minggu, pelatihan CMS untuk tim Anda, dan serah terima dokumentasi lengkap.',
    accentColor: '#EE3D5E',
  },
] as const

export const WEBSITE_ADDONS = [
  {
    name: 'Maintenance & Hosting Website',
    description:
      'Hosting berkelanjutan, pembaruan keamanan, monitoring performa, pembaruan konten, dan dukungan teknis. Jaga situs Anda tetap cepat, aman, dan up-to-date setelah launch.',
    badge: 'Retainer bulanan',
    accentColor: '#C084FC',
  },
  {
    name: 'CRO (Conversion Rate Optimization)',
    description:
      'Optimasi pasca-launch: analisis heatmap, rekaman sesi pengguna, A/B testing, optimasi form, dan analisis funnel. Kami tingkatkan conversion rate Anda dengan data, bukan tebakan.',
    badge: 'Retainer bulanan',
    accentColor: '#F88438',
  },
] as const

export const WEBSITE_TECH_STACK = [
  {
    category: 'Framework & CMS',
    accentColor: '#C084FC',
    items: ['Next.js', 'WordPress', 'Webflow', 'Shopify', 'WooCommerce', 'Laravel'],
  },
  {
    category: 'Frontend',
    accentColor: '#A855F7',
    items: ['React', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
  },
  {
    category: 'Hosting & Infrastruktur',
    accentColor: '#D81C5C',
    items: ['Vercel', 'Cloudflare', 'AWS', 'Nginx'],
  },
  {
    category: 'Pembayaran & Pengiriman (Indonesia)',
    accentColor: '#EE3D5E',
    items: ['Midtrans', 'Xendit', 'JNE', 'J&T Express', 'SiCepat'],
  },
  {
    category: 'Analytics & Tracking',
    accentColor: '#F88438',
    items: ['Google Analytics 4', 'Google Tag Manager', 'Meta Pixel', 'Looker Studio', 'Hotjar'],
  },
  {
    category: 'Desain & Kolaborasi',
    accentColor: '#F5A623',
    items: ['Figma', 'Adobe Creative Suite', 'Notion'],
  },
] as const

export const WEBSITE_FAQS = [
  {
    question: 'Berapa lama proses pembuatan website?',
    answer:
      'Landing page biasanya membutuhkan 1-2 minggu. Website company profile 3-5 minggu. Situs e-commerce 4-8 minggu, tergantung ukuran katalog produk dan integrasi. Kami memberikan timeline detail pada fase Discovery & Scope, dan Anda selalu tahu posisi proyek Anda.',
  },
  {
    question: 'Platform apa saja yang Anda gunakan?',
    answer:
      'Kami memilih teknologi terbaik untuk proyek Anda: WordPress untuk situs berbasis konten yang butuh editing mudah, Shopify untuk e-commerce dengan ekosistem terbukti, WooCommerce untuk toko berbasis WordPress, Webflow untuk company profile yang mengutamakan desain, atau build fully custom dengan Next.js untuk performa maksimal. Kami merekomendasikan berdasarkan kebutuhan Anda, bukan preferensi kami.',
  },
  {
    question: 'Apakah hosting dan domain sudah termasuk?',
    answer:
      'Kami menangani setup hosting dan konfigurasi DNS sebagai bagian dari proyek. Hosting tahun pertama bisa dimasukkan ke scope proyek atau di-setup di akun Anda sendiri (Vercel, Cloudflare, atau provider pilihan Anda). Registrasi domain menjadi tanggung jawab Anda; kami akan memandu prosesnya jika diperlukan.',
  },
  {
    question: 'Apakah website mobile-responsive?',
    answer:
      'Setiap situs yang kami bangun bersifat mobile-first: didesain untuk layar mobile lebih dulu, baru di-scale ke atas. Lebih dari 70% traffic web Indonesia datang dari perangkat mobile, jadi pendekatan yang hanya fokus desktop sudah ketinggalan zaman. Kami menguji di perangkat iOS dan Android, berbagai ukuran layar, dan semua browser utama.',
  },
  {
    question: 'Apakah pelatihan sudah termasuk?',
    answer:
      'Ya. Setelah launch, kami memberikan pelatihan CMS untuk tim Anda: cara update konten, menambah blog post, mengelola produk (untuk e-commerce), dan melakukan perubahan dasar tanpa perlu developer. Kami juga menyediakan dokumentasi dan video walkthrough yang direkam.',
  },
  {
    question: 'Bagaimana dengan SEO: apakah situs saya akan ranking di Google?',
    answer:
      'Setiap situs mencakup setup SEO dasar: struktur HTML yang bersih, meta tag, sitemap, robots.txt, Open Graph tag, dan optimasi page speed. Tier Company Profile dan E-Commerce mencakup SEO On-page Lanjutan. Untuk SEO berkelanjutan dan content marketing yang aktif menumbuhkan ranking, kami merekomendasikan menggabungkannya dengan layanan SEO & Content Marketing kami.',
  },
  {
    question: 'Apa yang terjadi setelah launch?',
    answer:
      'Kami memantau situs Anda selama 2 minggu pasca-launch untuk menangkap masalah apa pun. Setelah itu, kami menawarkan retainer Maintenance & Hosting Website opsional untuk pembaruan berkelanjutan, patch keamanan, dan monitoring performa. Anda juga bisa menambahkan CRO (Conversion Rate Optimization) untuk terus meningkatkan performa konversi situs Anda.',
  },
] as const

// ─── English exports ─────────────────────────────────────────────────────────

export const WEBSITE_PROJECT_TYPES_EN = [
  {
    id: 'landing-page',
    title: 'Landing Page Campaign',
    tagline: 'Single-page conversion machines built for campaigns and lead generation.',
    description:
      'When you need a focused page that does one thing: capture leads, sell a product, or drive sign-ups. A landing page is the fastest, most cost-effective weapon. CRO-focused design, A/B testing framework, and full tracking from day one.',
    bestFor: 'Campaigns · Lead gen · Product launches · Promos',
    timeline: '1-2 weeks',
    accentColor: '#C084FC',
    features: [
      'CRO-Focused Design',
      'A/B Testing Framework',
      'Form & CTA Integration',
      'Meta Pixel & GA4 Tracking',
      'Multi-variant Page Support',
    ],
  },
  {
    id: 'company-profile',
    title: 'Company Profile Website',
    tagline: "Your brand's digital headquarters: credible, professional, and built to grow.",
    description:
      'A multi-page website that establishes your brand presence, communicates your value, and captures leads. Custom UI design, CMS integration for easy content updates, and on-page SEO that makes you findable from launch day.',
    bestFor: 'Brand presence · Credibility · Service businesses',
    timeline: '3-5 weeks',
    accentColor: '#A855F7',
    features: [
      'Custom UI Design',
      'CMS Integration',
      'Mobile Responsive',
      'Basic SEO Setup',
      'Google Analytics 4',
      'Advanced On-page SEO',
    ],
  },
  {
    id: 'e-commerce',
    title: 'E-Commerce Website',
    tagline: 'A full online store with Indonesian payment and shipping built in.',
    description:
      'Product catalog, local payment gateways (Midtrans, Xendit), shipping integrations (JNE, J&T, and more), and an admin dashboard to manage everything. Built on WooCommerce, Shopify, or fully custom, depending on your scale and needs.',
    bestFor: 'Online stores · D2C brands · FMCG · Retail',
    timeline: '4-8 weeks',
    accentColor: '#EE3D5E',
    features: [
      'Product Catalog Setup',
      'Local Payment Gateway (Midtrans, Xendit)',
      'Shipping Integration (JNE, J&T, etc.)',
      'Admin Dashboard',
      'WooCommerce / Shopify / Custom',
    ],
  },
] as const

export const WEBSITE_TECH_FEATURES_EN = [
  {
    id: 'performance',
    title: 'Performance-First Build',
    description:
      "Every site ships with under 2-second load times. Code-split bundles, lazy-loaded images, optimized fonts, and CDN delivery. Your PageSpeed score will be 90+ or we fix it for free.",
    span: 2,
    accentColor: '#C084FC',
    badge: '90+',
  },
  {
    id: 'mobile',
    title: 'Mobile-First Responsive',
    description:
      'Designed for mobile screens first, then scaled up. Over 70% of Indonesian web traffic is mobile, and your site looks perfect on every device, every orientation.',
    span: 1,
    accentColor: '#A855F7',
    badge: null,
  },
  {
    id: 'seo',
    title: 'SEO-Ready Architecture',
    description:
      'Clean semantic HTML, heading hierarchy, XML sitemap, robots.txt, meta tags, Open Graph, and structured data: all configured before launch.',
    span: 1,
    accentColor: '#EE3D5E',
    badge: null,
  },
  {
    id: 'tracking',
    title: 'CRM & Analytics Setup',
    description:
      'Google Analytics 4, Meta Pixel, WhatsApp chat, and CRM integration so you track every visitor and conversion from day one.',
    span: 1,
    accentColor: '#F88438',
    badge: null,
  },
  {
    id: 'security',
    title: 'SSL & Security',
    description:
      "HTTPS by default, secure hosting, regular backups, and hardened configurations. Your visitors' data is protected.",
    span: 1,
    accentColor: '#D81C5C',
    badge: null,
  },
] as const

export const WEBSITE_STATS_EN = [
  {
    value: '<2s',
    label: 'Target Load Time',
    context: 'Core Web Vitals optimized. PageSpeed 90+ on mobile, not just desktop.',
    animate: false,
  },
  {
    value: '100%',
    label: 'Mobile Responsive',
    context: 'Every component tested across all devices, built mobile-first from day one.',
    animate: true,
  },
  {
    value: '1-8wk',
    label: 'Time to Launch',
    context: 'Landing pages in 1-2 weeks. Company profiles in 3-5 weeks. E-commerce in 4-8 weeks.',
    animate: false,
  },
] as const

export const WEBSITE_PROCESS_EN = [
  {
    phase: 1,
    title: 'Discovery & Scope',
    timeline: 'Day 1-3',
    barStart: 0,
    barEnd: 15,
    description:
      'Stakeholder interviews, competitor analysis, sitemap planning, technology decisions, and detailed scope document. We define every page, feature, and integration before design begins.',
    accentColor: '#C084FC',
  },
  {
    phase: 2,
    title: 'Wireframe & Design',
    timeline: 'Week 1-2',
    barStart: 10,
    barEnd: 40,
    description:
      'Low-fidelity wireframes for structure and user flow, then high-fidelity UI design mockups in Figma. Desktop and mobile versions. You approve the design before a single line of code is written.',
    accentColor: '#A855F7',
  },
  {
    phase: 3,
    title: 'Development',
    timeline: 'Week 2-4+',
    barStart: 30,
    barEnd: 75,
    description:
      'Front-end build, back-end integration, CMS setup, payment gateway configuration, analytics tracking, and responsive implementation. Deployed to a staging URL for your review.',
    accentColor: '#D81C5C',
  },
  {
    phase: 4,
    title: 'QA & Testing',
    timeline: 'Week 3-5',
    barStart: 55,
    barEnd: 85,
    description:
      'Cross-browser testing (Chrome, Safari, Firefox, Edge), mobile testing (iOS + Android), load testing, form submission testing, payment flow testing, and accessibility audit.',
    accentColor: '#F88438',
  },
  {
    phase: 5,
    title: 'Launch & Handover',
    timeline: 'Week 4-8',
    barStart: 75,
    barEnd: 100,
    description:
      'DNS configuration, SSL setup, final deployment, 301 redirects, post-launch monitoring for 2 weeks, CMS training for your team, and complete documentation handover.',
    accentColor: '#EE3D5E',
  },
] as const

export const WEBSITE_ADDONS_EN = [
  {
    name: 'Website Maintenance & Hosting',
    description:
      'Ongoing hosting, security updates, performance monitoring, content updates, and technical support. Keep your site fast, secure, and up-to-date after launch.',
    badge: 'Monthly retainer',
    accentColor: '#C084FC',
  },
  {
    name: 'CRO (Conversion Rate Optimization)',
    description:
      'Post-launch optimization: heatmap analysis, user session recording, A/B testing, form optimization, and funnel analysis. We improve your conversion rate with data, not guesswork.',
    badge: 'Monthly retainer',
    accentColor: '#F88438',
  },
] as const

export const WEBSITE_FAQS_EN = [
  {
    question: 'How long does a website take to build?',
    answer:
      "Landing pages typically take 1-2 weeks. Company profile websites take 3-5 weeks. E-commerce sites take 4-8 weeks depending on product catalog size and integrations. We provide a detailed timeline during the Discovery & Scope phase, and you'll always know where we are in the process.",
  },
  {
    question: 'Which platforms do you use?',
    answer:
      "We choose the best technology for your project: WordPress for content-heavy sites that need easy editing, Shopify for e-commerce with a proven ecosystem, WooCommerce for WordPress-based stores, Webflow for design-forward company profiles, or fully custom builds with Next.js for maximum performance. We recommend based on your needs, not our preferences.",
  },
  {
    question: 'Is hosting and domain included?',
    answer:
      "We handle hosting setup and DNS configuration as part of the project. First-year hosting can be included in the project scope or set up on your own accounts (Vercel, Cloudflare, or your preferred provider). Domain registration is your responsibility; we'll guide you through the process if needed.",
  },
  {
    question: 'Are websites mobile-responsive?',
    answer:
      "Every site we build is mobile-first: designed for mobile screens first, then scaled up. Over 70% of Indonesian web traffic comes from mobile devices, so a desktop-only approach is outdated. We test on iOS and Android devices, multiple screen sizes, and all major browsers.",
  },
  {
    question: 'Is training included?',
    answer:
      'Yes. After launch, we provide CMS training for your team: how to update content, add blog posts, manage products (for e-commerce), and make basic changes without needing a developer. We also provide documentation and a recorded walkthrough video.',
  },
  {
    question: 'What about SEO: will my site rank on Google?',
    answer:
      'Every site includes baseline SEO setup: clean HTML structure, meta tags, sitemap, robots.txt, Open Graph tags, and page speed optimization. Company Profile and E-Commerce tiers include Advanced On-page SEO. For ongoing SEO and content marketing to actively grow your rankings, we recommend pairing with our SEO & Content Marketing service.',
  },
  {
    question: 'What happens after launch?',
    answer:
      "We monitor your site for 2 weeks post-launch to catch any issues. After that, we offer an optional Website Maintenance & Hosting retainer for ongoing updates, security patches, and performance monitoring. You also have the option to add CRO (Conversion Rate Optimization) to continuously improve your site's conversion performance.",
  },
] as const

// ─── ServiceContent (redesign) ───────────────────────────────────────────────
// Dropped from the legacy copy (unverified or unsourced): "PageSpeed dijamin 90+ atau kami perbaiki gratis",
// "Lebih dari 70% traffic web Indonesia dari mobile", "100% mobile responsive" as a stat. The project types
// appear once (in #harga with their timelines); "what's included" lists what every project gets.

const GUIDE = 'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide'
const VERCEL = 'https://vercel.com/blog/the-rise-of-the-ai-crawler'

// Rich page (owner 2026-10-05, benchmarked on the live page; the SEO page's pattern): 'built to be found' (the film's
// end line) as the USP, the film's scope (blueprint, design, development, launch) as tabs, no comparison panel, the
// homepage process. Price (owner): no fixed price, from Rp 10 Juta, final price after a discussion.

const id: ServiceContent = {
  answer: 'Jasa pembuatan website Logink membangun company profile, landing page, dan toko online yang cepat, mobile-first, dan siap konversi, lengkap dengan GA4, Meta Pixel, dan tombol WhatsApp. Scope final disusun bersama setelah Discovery call gratis, lalu situs diserahkan beserta pelatihan CMS.',
  campaign: {
    fedBy: [
      { k: 'creative', text: 'Copy dan visual halaman datang dari ide kampanye yang sama.' },
      { k: 'ads', text: 'Iklan mengantar pengunjung ke landing page kampanye, dan datanya menunjukkan versi halaman mana yang perlu diuji.' },
    ],
    feeds: [
      { k: 'seo', text: 'HTML yang bersih, kecepatan, dan sitemap memberi fondasi teknis untuk SEO.' },
      { k: 'ai', text: 'Structured data dan halaman yang mudah dibaca mesin membantu AI memahami bisnis Anda.' },
      { k: 'ads', text: 'GA4 dan Meta Pixel mencatat pengunjung, sehingga iklan bisa diukur dan menyapa mereka lagi lewat retargeting.' },
      { k: 'wa', text: 'Tombol chat WhatsApp mengubah kunjungan menjadi percakapan.' },
    ],
  },
  work: [
    { title: 'Desain Mobile-First', text: 'Didesain untuk layar ponsel dulu, lalu diperbesar ke desktop.' },
    { title: 'Cepat di Jaringan Seluler', text: 'Target waktu muat di bawah 2 detik, Core Web Vitals dijaga.' },
    { title: 'Arsitektur Siap SEO', text: 'HTML semantik, sitemap, meta tag, dan structured data sejak launch.' },
    { title: 'GA4, Meta Pixel & WhatsApp', text: 'Setiap kunjungan dan klik chat tercatat sejak hari pertama.' },
    { title: 'SSL & Keamanan', text: 'HTTPS, hosting aman, dan backup rutin.' },
    { title: 'Pelatihan & Serah Terima', text: 'Pelatihan CMS, dokumentasi, dan pemantauan 2 minggu setelah launch.' },
  ],
  pricing: {
    kind: 'projects',
    priceValue: 10000000,
    note: 'Tidak ada harga paket tetap: setiap website dimulai dari Rp 10 Juta, dan harga finalnya kita sepakati lewat diskusi, tergantung jumlah halaman, integrasi, dan fitur kustom. Scope dan proposal detail kami kirim dalam 48 jam setelah Discovery call gratis.',
    projects: [
      { id: 'landing-page', name: 'Landing Page', text: 'Satu halaman yang fokus pada satu tujuan, dengan A/B testing.', bestFor: WEBSITE_PROJECT_TYPES[0].bestFor, timeline: '1–2 minggu' },
      { id: 'company-profile', name: 'Company Profile', text: 'Website multi-halaman dengan desain kustom dan CMS.', bestFor: WEBSITE_PROJECT_TYPES[1].bestFor, timeline: '3–5 minggu' },
      { id: 'e-commerce', name: 'Toko Online', text: 'Katalog, Midtrans atau Xendit, dan integrasi pengiriman JNE dan J&T.', bestFor: WEBSITE_PROJECT_TYPES[2].bestFor, timeline: '4–8 minggu' },
    ],
    discovery: { label: 'Jadwalkan Discovery call', wa: 'Halo Logink, saya tertarik dengan proyek website. Bisa jadwalkan Discovery call?' },
    addons: WEBSITE_ADDONS.map((a) => ({ name: a.name, text: a.description, price: a.badge })),
  },
  compare: null,
  trust: ['Discovery call gratis', 'GA4, Meta Pixel & WhatsApp terpasang', 'Pelatihan CMS saat serah terima'],
  highlights: {
    items: [
      { value: '1–8', label: 'minggu sampai launch: landing page 1–2, company profile 3–5, toko online 4–8' },
      { value: '3', label: 'jenis proyek: landing page, company profile, toko online' },
      { value: '<2 dtk', label: 'target waktu muat di jaringan seluler' },
    ],
    note: 'Timeline dan target adalah perkiraan; detailnya disusun di Discovery call.',
  },
  usp: {
    heading: 'Website yang dibangun untuk ditemukan',
    lead: 'Bukan sekadar tampil bagus. Setiap website kami rencanakan untuk cepat dibuka, mudah dibaca Google dan AI, dan mengubah kunjungan menjadi chat.',
    cards: [
      { title: 'Cepat', text: 'Target waktu muat di bawah 2 detik di jaringan seluler, dengan Core Web Vitals dijaga.',
        points: ['Didesain mobile-first', 'Gambar lazy-load dan font teroptimasi', 'Code-split dan CDN'] },
      { title: 'Siap SEO & AI', text: 'Blueprint SEO disusun sebelum desain: struktur halaman, keyword, dan schema.',
        points: ['HTML semantik dan hierarki heading', 'Sitemap, robots.txt, meta tag, Open Graph', 'Structured data yang mudah dibaca crawler AI'] },
      { title: 'Siap konversi', text: 'Setiap kunjungan dan klik chat tercatat sejak hari pertama.',
        points: ['GA4 dan Meta Pixel terpasang', 'Tombol WhatsApp dan form', 'Pelatihan CMS saat serah terima'] },
    ],
  },
  included: {
    heading: 'Semua yang Anda dapatkan',
    lead: 'Dari blueprint sampai launch. Fitur khusus toko online, seperti payment gateway, disebut di itemnya.',
    tabs: [
      { label: 'Blueprint', items: [
        { title: 'Discovery & Scope', text: 'Wawancara, analisis kompetitor, sitemap, pilihan teknologi, dan dokumen scope sebelum desain dimulai.' },
        { title: 'Blueprint SEO', text: 'Keyword, struktur halaman, dan URL direncanakan sejak awal, agar situs siap ditemukan saat launch.' },
      ] },
      { label: 'Desain', items: [
        { title: 'Wireframe', text: 'Struktur dan alur pengguna dirancang dulu, sebelum visual.' },
        { title: 'Desain UI Kustom', text: 'Mockup desktop dan mobile di Figma. Anda menyetujuinya sebelum satu baris kode pun ditulis.' },
        { title: 'Desain Berfokus Konversi', text: 'Landing page dirancang untuk satu tujuan, lengkap dengan framework A/B testing.' },
      ] },
      { label: 'Development', items: [
        { title: 'Teknologi yang Tepat', text: 'WordPress, Shopify, WooCommerce, Webflow, atau Next.js, dipilih sesuai kebutuhan dan skala Anda.' },
        { title: 'CMS & Integrasi', text: 'CMS untuk update konten, form dan CTA; toko online mendapat katalog, Midtrans atau Xendit, dan pengiriman JNE atau J&T.' },
        { title: 'Tracking & SEO Teknis', text: 'GA4, Meta Pixel, tombol WhatsApp, sitemap, dan structured data terpasang sebelum launch.' },
        { title: 'QA & Testing', text: 'Diuji di Chrome, Safari, Firefox, Edge, iOS, dan Android, termasuk form dan alur pembayaran.' },
      ] },
      { label: 'Launch', items: [
        { title: 'Launch & Serah Terima', text: 'Konfigurasi DNS, SSL, redirect 301, dan deployment final.' },
        { title: 'Pemantauan 2 Minggu', text: 'Situs dipantau selama 2 minggu setelah launch untuk menangkap masalah apa pun.' },
        { title: 'Pelatihan CMS & Dokumentasi', text: 'Tim Anda dilatih memperbarui konten, plus dokumentasi dan video panduan.' },
      ] },
    ],
  },
  process: true,
  stats: [
    { text: 'Crawler AI seperti GPTBot dan ClaudeBot mengambil file JavaScript tetapi tidak menjalankannya', src: 'Vercel', year: 2024, url: VERCEL },
    { text: 'Panduan Google untuk AI search: halaman yang bisa diindeks, pengalaman halaman yang baik, dan HTML semantik', src: 'Google Search Central', year: 2026, url: GUIDE },
    'aio-id',
  ],
  ai: 'Website dengan HTML yang bersih dan structured data lebih mudah dibaca crawler AI, yang tidak menjalankan JavaScript. Kami tidak menjamin kutipan.',
  faq: [
    { q: 'Berapa lama proses pembuatan website?', a: 'Landing page biasanya 1 sampai 2 minggu, website company profile 3 sampai 5 minggu, dan toko online 4 sampai 8 minggu, tergantung jumlah produk dan integrasinya. Timeline detail kami berikan di fase Discovery & Scope, sehingga Anda selalu tahu posisi proyek.' },
    { q: 'Platform apa saja yang Anda gunakan?', a: 'Kami memilih teknologi yang paling cocok untuk proyek Anda: WordPress untuk situs konten yang mudah diedit, Shopify atau WooCommerce untuk toko online, Webflow untuk company profile yang mengutamakan desain, atau Next.js untuk performa maksimal. Rekomendasinya berdasarkan kebutuhan Anda, bukan preferensi kami.' },
    { q: 'Apakah hosting dan domain sudah termasuk?', a: 'Setup hosting dan konfigurasi DNS termasuk dalam proyek. Hosting tahun pertama bisa dimasukkan ke scope atau dipasang di akun Anda sendiri, misalnya Vercel atau Cloudflare. Registrasi domain menjadi tanggung jawab Anda, dan kami akan memandu prosesnya bila diperlukan.' },
    { q: 'Apakah ChatGPT bisa membuat website?', a: 'ChatGPT bisa membantu menulis draf teks atau potongan kode, tetapi website bisnis tetap butuh desain yang sesuai brand, hosting, keamanan, tracking, uji di banyak perangkat, dan perawatan. Itulah yang kami kerjakan, dan hasilnya halaman yang cepat dan bisa diukur.' },
    { q: 'Apakah pelatihan sudah termasuk?', a: 'Ya. Setelah launch, tim Anda mendapat pelatihan CMS: cara memperbarui konten, menambah artikel, mengelola produk untuk toko online, dan melakukan perubahan dasar tanpa developer. Kami juga menyerahkan dokumentasi dan rekaman video panduan.' },
    { q: 'Apakah situs saya akan ranking di Google?', a: 'Setiap situs dibangun dengan fondasi SEO: HTML yang bersih, meta tag, sitemap, robots.txt, Open Graph, dan kecepatan halaman. Company profile dan toko online juga mendapat SEO on-page lanjutan. Untuk menumbuhkan ranking secara aktif, gabungkan dengan layanan Jasa SEO Profesional kami.' },
    { q: 'Apa yang terjadi setelah launch?', a: 'Kami memantau situs selama 2 minggu setelah launch untuk menangkap masalah apa pun. Setelah itu tersedia retainer Maintenance & Hosting untuk pembaruan, patch keamanan, dan pemantauan performa, serta retainer CRO untuk terus menaikkan konversi.' },
  ],
  sources: [
    { label: 'web.dev: Core Web Vitals', url: 'https://web.dev/articles/vitals' },
  ],
}

const en: ServiceContent = {
  answer: "Logink's website development service builds company profiles, landing pages and online stores that are fast, mobile-first and built to convert, with GA4, the Meta Pixel and a WhatsApp button. The final scope is set together after a free Discovery call, and the site is handed over with CMS training.",
  campaign: {
    fedBy: [
      { k: 'creative', text: 'Page copy and visuals come from the same campaign idea.' },
      { k: 'ads', text: 'Ads send visitors to campaign landing pages, and the data shows which page version to test next.' },
    ],
    feeds: [
      { k: 'seo', text: 'Clean HTML, speed and a sitemap give SEO its technical base.' },
      { k: 'ai', text: 'Structured data and machine-readable pages help AI understand your business.' },
      { k: 'ads', text: 'GA4 and the Meta Pixel record visitors, so ads can be measured and reach them again through retargeting.' },
      { k: 'wa', text: 'The WhatsApp chat button turns a visit into a conversation.' },
    ],
  },
  work: [
    { title: 'Mobile-First Design', text: 'Designed for phone screens first, then scaled up to desktop.' },
    { title: 'Fast on Mobile Networks', text: 'A load-time target under 2 seconds, with Core Web Vitals kept in check.' },
    { title: 'SEO-Ready Architecture', text: 'Semantic HTML, sitemap, meta tags and structured data from launch.' },
    { title: 'GA4, Meta Pixel & WhatsApp', text: 'Every visit and chat click is recorded from day one.' },
    { title: 'SSL & Security', text: 'HTTPS, secure hosting and regular backups.' },
    { title: 'Training & Handover', text: 'CMS training, documentation and 2 weeks of post-launch monitoring.' },
  ],
  pricing: {
    kind: 'projects',
    priceValue: 10000000,
    note: 'There is no fixed package price: every website starts from IDR 10M, and the final price is agreed in a discussion, based on page count, integrations and custom features. We send a detailed scope and proposal within 48 hours of a free Discovery call.',
    projects: [
      { id: 'landing-page', name: 'Landing Page', text: 'One page focused on one goal, with A/B testing.', bestFor: WEBSITE_PROJECT_TYPES_EN[0].bestFor, timeline: '1–2 weeks' },
      { id: 'company-profile', name: 'Company Profile', text: 'A multi-page website with custom design and a CMS.', bestFor: WEBSITE_PROJECT_TYPES_EN[1].bestFor, timeline: '3–5 weeks' },
      { id: 'e-commerce', name: 'Online Store', text: 'A catalog, Midtrans or Xendit, and JNE and J&T shipping integration.', bestFor: WEBSITE_PROJECT_TYPES_EN[2].bestFor, timeline: '4–8 weeks' },
    ],
    discovery: { label: 'Book a Discovery call', wa: "Hi Logink, I'm interested in a website project. Can we schedule a Discovery call?" },
    addons: WEBSITE_ADDONS_EN.map((a) => ({ name: a.name, text: a.description, price: a.badge })),
  },
  compare: null,
  trust: ['A free Discovery call', 'GA4, Meta Pixel & WhatsApp set up', 'CMS training at handover'],
  highlights: {
    items: [
      { value: '1–8', label: 'weeks to launch: landing page 1–2, company profile 3–5, online store 4–8' },
      { value: '3', label: 'project types: landing page, company profile, online store' },
      { value: '<2 s', label: 'load-time target on mobile networks' },
    ],
    note: 'Timelines and targets are estimates; the details are set in the Discovery call.',
  },
  usp: {
    heading: 'Websites built to be found',
    lead: 'Not just good-looking. Every site is planned to open fast, read clearly to Google and AI, and turn visits into chats.',
    cards: [
      { title: 'Fast', text: 'A load-time target under 2 seconds on mobile networks, with Core Web Vitals kept in check.',
        points: ['Designed mobile-first', 'Lazy-loaded images and optimized fonts', 'Code splitting and a CDN'] },
      { title: 'SEO & AI ready', text: 'An SEO blueprint before design: page structure, keywords and schema.',
        points: ['Semantic HTML and a clean heading hierarchy', 'Sitemap, robots.txt, meta tags, Open Graph', 'Structured data AI crawlers can read'] },
      { title: 'Ready to convert', text: 'Every visit and chat click is recorded from day one.',
        points: ['GA4 and the Meta Pixel set up', 'A WhatsApp button and forms', 'CMS training at handover'] },
    ],
  },
  included: {
    heading: 'Everything you get',
    lead: 'From blueprint to launch. Online-store-only features, such as payment gateways, are named in their item.',
    tabs: [
      { label: 'Blueprint', items: [
        { title: 'Discovery & Scope', text: 'Interviews, competitor analysis, sitemap, technology choice and a scope document before design starts.' },
        { title: 'SEO Blueprint', text: 'Keywords, page structure and URLs planned from the start, so the site is ready to be found at launch.' },
      ] },
      { label: 'Design', items: [
        { title: 'Wireframes', text: 'Structure and user flow designed first, before visuals.' },
        { title: 'Custom UI Design', text: 'Desktop and mobile mockups in Figma. You approve them before a line of code is written.' },
        { title: 'Conversion-Focused Design', text: 'Landing pages designed for one goal, with an A/B testing framework.' },
      ] },
      { label: 'Development', items: [
        { title: 'The Right Technology', text: 'WordPress, Shopify, WooCommerce, Webflow or Next.js, chosen for your needs and scale.' },
        { title: 'CMS & Integrations', text: 'A CMS for content updates, forms and CTAs; online stores get a catalog, Midtrans or Xendit, and JNE or J&T shipping.' },
        { title: 'Tracking & Technical SEO', text: 'GA4, the Meta Pixel, a WhatsApp button, a sitemap and structured data set up before launch.' },
        { title: 'QA & Testing', text: 'Tested on Chrome, Safari, Firefox, Edge, iOS and Android, including forms and checkout.' },
      ] },
      { label: 'Launch', items: [
        { title: 'Launch & Handover', text: 'DNS configuration, SSL, 301 redirects and the final deployment.' },
        { title: '2 Weeks of Monitoring', text: 'The site is monitored for 2 weeks after launch to catch any issue.' },
        { title: 'CMS Training & Documentation', text: 'Your team is trained to update content, plus documentation and video walkthroughs.' },
      ] },
    ],
  },
  process: true,
  stats: [
    { text: 'AI crawlers such as GPTBot and ClaudeBot fetch JavaScript files but do not run them', src: 'Vercel', year: 2024, url: VERCEL },
    { text: "Google's guide to AI search: indexable pages, a good page experience and semantic HTML", src: 'Google Search Central', year: 2026, url: GUIDE },
    'aio-id',
  ],
  ai: 'A site with clean HTML and structured data is easier for AI crawlers to read, since they do not run JavaScript. We do not guarantee citations.',
  faq: [
    { q: 'How long does it take to build a website?', a: 'A landing page usually takes 1 to 2 weeks, a company profile website 3 to 5 weeks and an online store 4 to 8 weeks, depending on the catalog and integrations. We give a detailed timeline in the Discovery & Scope phase, so you always know where the project stands.' },
    { q: 'Which platforms do you use?', a: 'We choose the technology that fits your project: WordPress for content sites that are easy to edit, Shopify or WooCommerce for online stores, Webflow for design-led company profiles, or Next.js for maximum performance. We recommend based on your needs, not our preferences.' },
    { q: 'Are hosting and the domain included?', a: 'Hosting setup and DNS configuration are part of the project. First-year hosting can be included in the scope or set up in your own account, such as Vercel or Cloudflare. Domain registration is your responsibility, and we will guide you through it if needed.' },
    { q: 'Can ChatGPT build a website?', a: 'ChatGPT can help draft text or snippets of code, but a business website still needs on-brand design, hosting, security, tracking, testing across devices and maintenance. That is the work we do, and the result is a fast page you can measure.' },
    { q: 'Is training included?', a: 'Yes. After launch your team gets CMS training: how to update content, add articles, manage products for an online store and make basic changes without a developer. We also hand over documentation and recorded video walkthroughs.' },
    { q: 'Will my site rank on Google?', a: 'Every site is built on an SEO foundation: clean HTML, meta tags, a sitemap, robots.txt, Open Graph and page speed. Company profiles and online stores also get advanced on-page SEO. To grow rankings actively, pair it with our SEO & Content Marketing service.' },
    { q: 'What happens after launch?', a: 'We monitor the site for 2 weeks after launch to catch any issues. After that there is a Maintenance & Hosting retainer for updates, security patches and performance monitoring, and a CRO retainer to keep lifting conversions.' },
  ],
  sources: [
    { label: 'web.dev: Core Web Vitals', url: 'https://web.dev/articles/vitals' },
  ],
}

const content: Record<Locale, ServiceContent> = { id, en }
export default content
