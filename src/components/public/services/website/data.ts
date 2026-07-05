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
    title: 'Build yang Mengutamakan Performa',
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

export const WEBSITE_COMPARISON_TABLE = [
  {
    category: 'Desain',
    features: [
      { name: 'Desain Berfokus CRO', landing: true, profile: false, ecommerce: false },
      { name: 'Desain UI Kustom', landing: false, profile: true, ecommerce: true },
      { name: 'Mobile Responsive', landing: true, profile: true, ecommerce: true },
    ],
  },
  {
    category: 'Fungsionalitas',
    features: [
      { name: 'Framework A/B Testing', landing: true, profile: false, ecommerce: false },
      { name: 'Integrasi Form & CTA', landing: true, profile: true, ecommerce: true },
      { name: 'Dukungan Multi-variant Page', landing: true, profile: false, ecommerce: false },
      { name: 'Integrasi CMS', landing: false, profile: true, ecommerce: true },
      { name: 'Katalog Produk', landing: false, profile: false, ecommerce: true },
      { name: 'Dashboard Admin', landing: false, profile: false, ecommerce: true },
    ],
  },
  {
    category: 'E-Commerce',
    features: [
      { name: 'Payment Gateway (Midtrans, Xendit)', landing: false, profile: false, ecommerce: true },
      { name: 'Integrasi Pengiriman (JNE, J&T)', landing: false, profile: false, ecommerce: true },
      { name: 'WooCommerce / Shopify / Custom', landing: false, profile: false, ecommerce: true },
    ],
  },
  {
    category: 'Tracking & SEO',
    features: [
      { name: 'Tracking Meta Pixel & GA4', landing: true, profile: true, ecommerce: true },
      { name: 'Setup SEO Dasar', landing: false, profile: true, ecommerce: true },
      { name: 'SEO On-page Lanjutan', landing: false, profile: true, ecommerce: true },
      { name: 'Google Analytics 4', landing: true, profile: true, ecommerce: true },
    ],
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
    question: 'Berapa lama waktu yang dibutuhkan untuk membangun sebuah website?',
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
