export const WEBSITE_PROJECT_TYPES = [
  {
    id: 'landing-page',
    title: 'Landing Page Kampanye',
    tagline: 'Mesin konversi satu halaman yang dibangun untuk kampanye dan lead generation.',
    description:
      'Ketika kamu butuh halaman yang fokus melakukan satu hal — menangkap leads, menjual produk, atau mendorong sign-up — landing page adalah senjata tercepat dan paling cost-effective. Desain berfokus CRO, framework A/B testing, dan tracking penuh dari hari pertama.',
    bestFor: 'Kampanye · Lead gen · Peluncuran produk · Promo',
    timeline: '1-2 minggu',
    accentColor: '#06B6D4',
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
    tagline: 'Markas digital brandmu — kredibel, profesional, dan dibangun untuk berkembang.',
    description:
      'Website multi-halaman yang membangun kehadiran brandmu, mengkomunikasikan nilaimu, dan menangkap leads. Desain UI kustom, integrasi CMS untuk update konten yang mudah, dan SEO on-page yang membuatmu mudah ditemukan sejak hari peluncuran.',
    bestFor: 'Brand presence · Kredibilitas · Bisnis jasa',
    timeline: '3-5 minggu',
    accentColor: '#7C3AED',
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
    tagline: 'Toko online lengkap dengan pembayaran dan pengiriman Indonesia sudah terpasang.',
    description:
      'Katalog produk, payment gateway lokal (Midtrans, Xendit), integrasi pengiriman (JNE, J&T, dan lainnya), dan dashboard admin untuk mengelola semuanya. Dibangun di WooCommerce, Shopify, atau fully custom — tergantung skala dan kebutuhanmu.',
    bestFor: 'Toko online · Brand D2C · FMCG · Retail',
    timeline: '4-8 minggu',
    accentColor: '#10B981',
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
    title: 'Build Prioritas Performa',
    description:
      'Setiap situs hadir dengan waktu muat di bawah 2 detik. Bundle code-split, gambar lazy-load, font teroptimasi, dan CDN delivery. PageSpeed score kamu akan 90+ atau kami perbaiki gratis.',
    span: 2,
    accentColor: '#06B6D4',
    badge: '90+',
  },
  {
    id: 'mobile',
    title: 'Mobile-First Responsive',
    description:
      'Didesain untuk layar mobile dulu, lalu di-scale ke atas. Lebih dari 70% traffic web Indonesia berasal dari mobile — situsmu terlihat sempurna di setiap perangkat, setiap orientasi.',
    span: 1,
    accentColor: '#7C3AED',
    badge: null,
  },
  {
    id: 'seo',
    title: 'Arsitektur Siap SEO',
    description:
      'HTML semantik yang bersih, hierarki heading, XML sitemap, robots.txt, meta tag, Open Graph, dan structured data — semuanya dikonfigurasi sebelum launch.',
    span: 1,
    accentColor: '#10B981',
    badge: null,
  },
  {
    id: 'tracking',
    title: 'Setup CRM & Analytics',
    description:
      'Google Analytics 4, Meta Pixel, WhatsApp chat, dan integrasi CRM agar kamu bisa melacak setiap pengunjung dan konversi sejak hari pertama.',
    span: 1,
    accentColor: '#D97706',
    badge: null,
  },
  {
    id: 'security',
    title: 'SSL & Keamanan',
    description:
      'HTTPS sebagai default, hosting aman, backup rutin, dan konfigurasi yang diperketat. Data pengunjungmu terlindungi.',
    span: 1,
    accentColor: '#DB2777',
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
    accentColor: '#06B6D4',
  },
  {
    phase: 2,
    title: 'Wireframe & Desain',
    timeline: 'Minggu 1-2',
    barStart: 10,
    barEnd: 40,
    description:
      'Wireframe low-fidelity untuk struktur dan alur pengguna, lalu mockup desain UI high-fidelity di Figma. Versi desktop dan mobile. Kamu setujui desainnya sebelum satu baris kode pun ditulis.',
    accentColor: '#7C3AED',
  },
  {
    phase: 3,
    title: 'Development',
    timeline: 'Minggu 2-4+',
    barStart: 30,
    barEnd: 75,
    description:
      'Build front-end, integrasi back-end, setup CMS, konfigurasi payment gateway, tracking analytics, dan implementasi responsive. Deploy ke staging URL untuk reviewmu.',
    accentColor: '#DB2777',
  },
  {
    phase: 4,
    title: 'QA & Testing',
    timeline: 'Minggu 3-5',
    barStart: 55,
    barEnd: 85,
    description:
      'Testing lintas browser (Chrome, Safari, Firefox, Edge), mobile testing (iOS + Android), load testing, pengujian form submission, pengujian alur pembayaran, dan audit aksesibilitas.',
    accentColor: '#D97706',
  },
  {
    phase: 5,
    title: 'Launch & Serah Terima',
    timeline: 'Minggu 4-8',
    barStart: 75,
    barEnd: 100,
    description:
      'Konfigurasi DNS, setup SSL, deployment final, redirect 301, monitoring pasca-launch selama 2 minggu, pelatihan CMS untuk timmu, dan serah terima dokumentasi lengkap.',
    accentColor: '#10B981',
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
      'Hosting berkelanjutan, pembaruan keamanan, monitoring performa, pembaruan konten, dan dukungan teknikal. Jaga situsmu tetap cepat, aman, dan up-to-date setelah launch.',
    badge: 'Retainer bulanan',
    accentColor: '#06B6D4',
  },
  {
    name: 'CRO (Conversion Rate Optimization)',
    description:
      'Optimasi pasca-launch: analisis heatmap, rekaman sesi pengguna, A/B testing, optimasi form, dan analisis funnel. Kami tingkatkan conversion rate-mu dengan data, bukan tebakan.',
    badge: 'Retainer bulanan',
    accentColor: '#D97706',
  },
] as const

export const WEBSITE_TECH_STACK = [
  {
    category: 'Framework & CMS',
    accentColor: '#06B6D4',
    items: ['Next.js', 'WordPress', 'Webflow', 'Shopify', 'WooCommerce', 'Laravel'],
  },
  {
    category: 'Frontend',
    accentColor: '#7C3AED',
    items: ['React', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
  },
  {
    category: 'Hosting & Infrastruktur',
    accentColor: '#DB2777',
    items: ['Vercel', 'Cloudflare', 'AWS', 'Nginx'],
  },
  {
    category: 'Pembayaran & Pengiriman (Indonesia)',
    accentColor: '#10B981',
    items: ['Midtrans', 'Xendit', 'JNE', 'J&T Express', 'SiCepat'],
  },
  {
    category: 'Analytics & Tracking',
    accentColor: '#D97706',
    items: ['Google Analytics 4', 'Google Tag Manager', 'Meta Pixel', 'Looker Studio', 'Hotjar'],
  },
  {
    category: 'Desain & Kolaborasi',
    accentColor: '#F59E0B',
    items: ['Figma', 'Adobe Creative Suite', 'Notion'],
  },
] as const

export const WEBSITE_FAQS = [
  {
    question: 'Berapa lama waktu membangun sebuah website?',
    answer:
      'Landing page biasanya membutuhkan 1-2 minggu. Website company profile membutuhkan 3-5 minggu. Situs e-commerce membutuhkan 4-8 minggu tergantung ukuran katalog produk dan integrasi. Kami menyediakan timeline detail selama fase Discovery & Scope, dan kamu selalu tahu di mana posisi project-nya.',
  },
  {
    question: 'Platform apa yang kamu gunakan?',
    answer:
      'Kami pilih teknologi terbaik untuk proyekmu: WordPress untuk situs berbasis konten yang butuh editing mudah, Shopify untuk e-commerce dengan ekosistem terbukti, WooCommerce untuk toko berbasis WordPress, Webflow untuk company profile yang mengutamakan desain, atau build fully custom dengan Next.js untuk performa maksimal. Kami rekomendasikan berdasarkan kebutuhanmu, bukan preferensi kami.',
  },
  {
    question: 'Apakah hosting dan domain sudah termasuk?',
    answer:
      'Kami tangani setup hosting dan konfigurasi DNS sebagai bagian dari proyek. Hosting tahun pertama bisa dimasukkan ke scope proyek atau di-setup di akunmu sendiri (Vercel, Cloudflare, atau provider pilihanmu). Registrasi domain adalah tanggung jawabmu — kami akan pandu prosesnya jika diperlukan.',
  },
  {
    question: 'Apakah website mobile-responsive?',
    answer:
      'Setiap situs yang kami bangun adalah mobile-first — didesain untuk layar mobile dulu, baru di-scale ke atas. Lebih dari 70% traffic web Indonesia datang dari perangkat mobile, jadi pendekatan yang hanya fokus desktop sudah ketinggalan zaman. Kami uji di perangkat iOS dan Android, berbagai ukuran layar, dan semua browser utama.',
  },
  {
    question: 'Apakah pelatihan sudah termasuk?',
    answer:
      'Ya. Setelah launch, kami berikan pelatihan CMS untuk timmu — cara update konten, menambah blog post, mengelola produk (untuk e-commerce), dan membuat perubahan dasar tanpa butuh developer. Kami juga menyediakan dokumentasi dan video walkthrough yang direkam.',
  },
  {
    question: 'Bagaimana dengan SEO — apakah situs saya akan ranking di Google?',
    answer:
      'Setiap situs mencakup setup SEO dasar: struktur HTML yang bersih, meta tag, sitemap, robots.txt, Open Graph tag, dan optimasi page speed. Tier Company Profile dan E-Commerce mencakup SEO On-page Lanjutan. Untuk SEO berkelanjutan dan content marketing yang aktif menumbuhkan ranking, kami rekomendasikan menggabungkan dengan layanan SEO & Content Marketing kami.',
  },
  {
    question: 'Apa yang terjadi setelah launch?',
    answer:
      'Kami pantau situsmu selama 2 minggu pasca-launch untuk menangkap masalah apapun. Setelah itu, kami menawarkan retainer Maintenance & Hosting Website opsional untuk pembaruan berkelanjutan, patch keamanan, dan monitoring performa. Kamu juga bisa menambahkan CRO (Conversion Rate Optimization) untuk terus meningkatkan performa konversi situsmu.',
  },
] as const
