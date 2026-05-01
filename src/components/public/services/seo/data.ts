export const SEO_PRICING_TIERS = [
  {
    id: 'entry',
    name: 'Entry',
    price: 'Rp 6 Juta',
    priceValue: 6000000,
    period: '/bulan',
    bestFor: 'Website baru yang baru mulai organic',
    isPopular: false,
    color: '#7C3AED',
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
    price: 'Rp 8 Juta',
    priceValue: 8000000,
    period: '/bulan',
    bestFor: 'Scale traffic & leads',
    isPopular: true,
    color: '#7C3AED',
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
    color: '#D97706',
    features: [
      'Semua yang ada di Growth',
      'Custom Event Tracking',
      '30 Artikel SEO/bulan',
      'Looker Studio Dashboard',
    ],
  },
] as const

export const SEO_COMPARISON_TABLE = {
  categories: [
    {
      name: 'Riset Keyword',
      features: [
        { name: 'Riset Keyword (Bahasa Indonesia)', entry: true, growth: true, full: true },
      ],
    },
    {
      name: 'Data & Tracking',
      features: [
        { name: 'Google Search Console', entry: true, growth: true, full: true },
        { name: 'Google Analytics 4', entry: true, growth: true, full: true },
        { name: 'Schema Markup Lokal', entry: false, growth: true, full: true },
        { name: 'Custom Event Tracking', entry: false, growth: false, full: true },
      ],
    },
    {
      name: 'On-Page SEO',
      features: [
        { name: 'Meta, Heading, Struktur Konten', entry: true, growth: true, full: true },
        { name: 'Core Web Vitals / Page Speed', entry: true, growth: true, full: true },
        { name: 'Sitemap & Robots.txt', entry: true, growth: true, full: true },
      ],
    },
    {
      name: 'Content Marketing',
      features: [
        { name: 'Artikel SEO / bulan', entry: '5', growth: '15', full: '30' },
        { name: 'Keyword Mapping per Artikel', entry: true, growth: true, full: true },
        { name: 'Strategi Internal Linking', entry: true, growth: true, full: true },
      ],
    },
    {
      name: 'Pelaporan',
      features: [
        { name: 'Laporan Performa Bulanan', entry: true, growth: true, full: true },
        { name: 'Looker Studio Dashboard', entry: false, growth: true, full: true },
      ],
    },
  ],
} as const

export const SEO_ADDONS = [
  {
    name: 'Local SEO & Google Business Profile',
    description: "Dominasi pencarian 'dekat saya' dan map pack Google Business di kotamu.",
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
        desc: 'Kami mencari keywords yang sesuai dengan bisnismu kemudian Query long-tail, transaksional, dan informasional akan dipetakan ke funnel kamu.',
        badge: null,
      },
      {
        title: 'Setup Google Search Console & GA4',
        desc: 'Setup teknikal lengkap dengan tracking yang tepat. Kamu punya akunnya, kamu lihat setiap angkanya. Tidak ada yang ditutupi.',
        badge: null,
      },
      {
        title: 'Schema Markup Lokal',
        desc: 'Structured data yang membantu Google memahami bisnismu di pasar Indonesia. LocalBusiness, FAQPage, dan product schema.',
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
        desc: 'Kami audit dan perbaiki LCP, FID, dan CLS. Halamanmu muat cepat di jaringan mobile Indonesia, bukan cuma di fiber.',
        badge: null,
      },
      {
        title: 'Sitemap & Robots.txt',
        desc: 'Fondasi teknikal: XML sitemap otomatis, direktif robots.txt yang tepat, dan optimasi crawl budget.',
        badge: null,
      },
      {
        title: 'Arsitektur Internal Linking',
        desc: 'Tautan strategis antar halaman untuk mendistribusikan authority dan memandu perjalanan pengguna. Dipetakan ke funnel konversimu, bukan asal-asalan.',
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
        desc: 'Setiap artikel punya keyword utama, 3-5 keyword sekunder, dan kecocokan search intent yang jelas. Tidak ada tebak-tebakan.',
        badge: null,
      },
      {
        title: 'Strategi Internal Linking',
        desc: 'Setiap artikel baru memperkuat halaman yang sudah ada. Kami membangun topic cluster yang berkompon seiring waktu, bukan posting terisolir.',
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
        desc: 'Dashboard live yang bisa kamu cek kapan saja. Ranking, tren traffic, halaman teratas, conversion tracking: selalu up to date.',
        badge: 'Growth+',
      },
    ],
  },
] as const

export const SEO_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Keyword Audit',
    duration: 'Minggu 1',
    color: '#7C3AED',
    align: 'left' as const,
    desc: 'Kami memetakan ranking saat ini, menganalisis gap kompetitor, dan mengidentifikasi peluang terbaik. Kamu dapat daftar keyword prioritas yang diurutkan berdasarkan potensi traffic dan tingkat kesulitan dalam 5 hari kerja.',
  },
  {
    step: '02',
    title: 'Strategi Konten',
    duration: 'Minggu 1–2',
    color: '#DB2777',
    align: 'right' as const,
    desc: 'Kami membangun topical cluster map dan editorial calendar yang disesuaikan dengan funnelmu. Setiap artikel dipetakan ke keyword, search intent, dan tujuan konversi, tidak diterbitkan sembarangan.',
  },
  {
    step: '03',
    title: 'Perbaikan Teknikal',
    duration: 'Minggu 1–2',
    color: '#D97706',
    align: 'left' as const,
    desc: 'Engineer menyelesaikan crawl error, memperbaiki bottleneck page speed, mengimplementasikan schema markup, dan menyiapkan structured data. Fondasi teknikal yang membuat kontenmu bisa ranking.',
  },
  {
    step: '04',
    title: 'Produksi Konten',
    duration: 'Berkelanjutan',
    color: '#F59E0B',
    align: 'right' as const,
    desc: 'Penulis spesialis memproduksi dan mempublikasikan artikel SEO secara konsisten. Setiap tulisan melewati keyword mapping, penulisan, editing, dan optimasi on-page sebelum tayang.',
  },
  {
    step: '05',
    title: 'Laporan & Iterasi',
    duration: 'Bulanan',
    color: '#A78BFA',
    align: 'left' as const,
    desc: 'Review strategi bulanan untuk menganalisis ranking, traffic, dan konversi. Kami perkuat yang berhasil, potong yang tidak, dan terus sempurnakan pendekatan.',
  },
] as const

// ─── English exports ─────────────────────────────────────────────────────────

export const SEO_PRICING_TIERS_EN = [
  {
    id: 'entry',
    name: 'Entry',
    price: 'IDR 6 Mio',
    priceValue: 6000000,
    period: '/month',
    bestFor: 'New websites starting organic',
    isPopular: false,
    color: '#7C3AED',
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
    price: 'IDR 8 Mio',
    priceValue: 8000000,
    period: '/month',
    bestFor: 'Scaling traffic & leads',
    isPopular: true,
    color: '#7C3AED',
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
    color: '#D97706',
    features: [
      'Everything in Growth',
      'Custom Event Tracking',
      '30 SEO Articles/month',
      'Looker Studio Dashboard',
    ],
  },
] as const

export const SEO_COMPARISON_TABLE_EN = {
  categories: [
    {
      name: 'Keyword Research',
      features: [
        { name: 'Keyword Research (Bahasa Indonesia)', entry: true, growth: true, full: true },
      ],
    },
    {
      name: 'Data Enablement',
      features: [
        { name: 'Google Search Console', entry: true, growth: true, full: true },
        { name: 'Google Analytics 4', entry: true, growth: true, full: true },
        { name: 'Local Schema Markup', entry: false, growth: true, full: true },
        { name: 'Custom Event Tracking', entry: false, growth: false, full: true },
      ],
    },
    {
      name: 'On-Page SEO',
      features: [
        { name: 'Meta, Heading, Content Structure', entry: true, growth: true, full: true },
        { name: 'Core Web Vitals / Page Speed', entry: true, growth: true, full: true },
        { name: 'Sitemap & Robots.txt', entry: true, growth: true, full: true },
      ],
    },
    {
      name: 'Content Marketing',
      features: [
        { name: 'SEO Articles / month', entry: '5', growth: '15', full: '30' },
        { name: 'Keyword Mapping per Article', entry: true, growth: true, full: true },
        { name: 'Internal Linking Strategy', entry: true, growth: true, full: true },
      ],
    },
    {
      name: 'Reporting',
      features: [
        { name: 'Monthly Performance Report', entry: true, growth: true, full: true },
        { name: 'Looker Studio Dashboard', entry: false, growth: true, full: true },
      ],
    },
  ],
} as const

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

export const SEO_PROCESS_STEPS_EN = [
  {
    step: '01',
    title: 'Keyword Audit',
    duration: 'Week 1',
    color: '#7C3AED',
    align: 'left' as const,
    desc: "We map your current rankings, analyze competitor gaps, and identify the top opportunities. You get a prioritized keyword list sorted by traffic potential and difficulty within 5 business days.",
  },
  {
    step: '02',
    title: 'Content Strategy',
    duration: 'Week 1–2',
    color: '#DB2777',
    align: 'right' as const,
    desc: "We build a topical cluster map and editorial calendar tailored to your funnel. Every article is mapped to a keyword, a search intent, and a conversion goal, not published randomly.",
  },
  {
    step: '03',
    title: 'Technical Fixes',
    duration: 'Week 1–2',
    color: '#D97706',
    align: 'left' as const,
    desc: "Engineers resolve crawl errors, fix page speed bottlenecks, implement schema markup, and set up structured data. The technical foundation that makes your content rank.",
  },
  {
    step: '04',
    title: 'Content Production',
    duration: 'Ongoing',
    color: '#F59E0B',
    align: 'right' as const,
    desc: "Specialist writers produce and publish SEO-optimized articles continuously. Each piece goes through keyword mapping, writing, editing, and on-page optimization before going live.",
  },
  {
    step: '05',
    title: 'Report & Iterate',
    duration: 'Monthly',
    color: '#A78BFA',
    align: 'left' as const,
    desc: "Monthly strategy reviews to analyze rankings, traffic, and conversions. We double down on what's working, cut what's not, and continuously refine the approach.",
  },
] as const

export const SEO_FAQS = [
  {
    question: 'Berapa lama sampai bisa lihat hasil SEO?',
    answer: 'SEO adalah permainan jangka panjang, dan itulah yang membuatnya powerful. Biasanya, kamu akan melihat pergerakan ranking awal dalam 4-6 minggu. Pertumbuhan traffic yang signifikan mulai terlihat di bulan ke-3, dan hasil yang compounding muncul sekitar bulan ke-6. Berbeda dari iklan berbayar, hasil ini tidak berhenti ketika budget habis.',
  },
  {
    question: 'Artikel ditulis dalam bahasa apa?',
    answer: 'Semua konten ditulis secara native dalam Bahasa Indonesia oleh penulis spesialis yang memahami perilaku pencarian lokal. Kami tidak menerjemahkan konten Inggris; kami riset dan tulis sesuai cara pengguna Indonesia benar-benar mencari. Konten Inggris tersedia sebagai add-on untuk brand yang menarget audiens internasional.',
  },
  {
    question: 'Apakah kami bisa memilih topik artikel?',
    answer: 'Tentu saja. Kami menyediakan daftar topik rekomendasi berdasarkan riset keyword dan data volume pencarian, tapi kamu selalu punya persetujuan akhir. Jika ada topik tertentu yang perlu dicakup brandmu, kami masukkan ke editorial calendar. Strategi bersifat kolaboratif, bukan dikte.',
  },
  {
    question: 'Bagaimana progress dilaporkan?',
    answer: 'Kamu mendapat laporan performa bulanan yang mencakup ranking keyword, organic traffic, halaman terbaik, dan data konversi. Paket Growth dan Full juga termasuk live Looker Studio dashboard yang bisa kamu cek kapan saja. Kami review hasilnya bersama dalam strategy call bulanan.',
  },
  {
    question: 'Apakah link building sudah termasuk?',
    answer: 'Off-page SEO dan link building tersedia sebagai add-on mulai Rp 5 Juta per penempatan media. Pendekatan kami fokus pada penempatan editorial di media Indonesia, tanpa PBN, tanpa direktori spam. Kualitas di atas kuantitas.',
  },
  {
    question: 'Bagaimana jika kami ingin berhenti?',
    answer: 'Tidak ada kontrak lock-in. Kami bekerja per bulan karena kami percaya hasil kami seharusnya memenangkan kepercayaanmu, bukan klausul kontrak. Semua konten, akun, dan data milikmu; kami tidak pernah menahan apapun.',
  },
  {
    question: 'Apakah kamu menjamin ranking?',
    answer: 'Tidak ada agency SEO yang jujur menjamin ranking spesifik, karena algoritma Google tidak bisa dikendalikan siapapun. Yang kami jamin adalah proses sistematis berbasis data yang secara konsisten memberikan pertumbuhan traffic 2-4× bagi klien kami dalam 6 bulan. Kami transparan tentang apa yang berhasil dan apa yang perlu disesuaikan.',
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
