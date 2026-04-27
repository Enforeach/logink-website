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
    price: 'Mulai dari Rp 5 Juta/media',
  },
] as const

export const SEO_FEATURES_TABS = [
  {
    id: 'research',
    label: 'Riset & Data',
    icon: 'Search',
    features: [
      {
        title: 'Riset Keyword (Bahasa Indonesia)',
        desc: 'Kami menggali apa yang benar-benar dicari pengguna Indonesia — dalam Bahasa Indonesia, bukan terjemahan dari keyword Inggris. Query long-tail, transaksional, dan informasional dipetakan ke funnel kamu.',
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
        desc: 'Kami audit dan perbaiki LCP, FID, dan CLS. Halamanmu muat cepat di jaringan mobile Indonesia — bukan cuma di fiber.',
        badge: null,
      },
      {
        title: 'Sitemap & Robots.txt',
        desc: 'Fondasi teknikal: XML sitemap otomatis, direktif robots.txt yang tepat, dan optimasi crawl budget.',
        badge: null,
      },
      {
        title: 'Arsitektur Internal Linking',
        desc: 'Tautan strategis antar halaman untuk mendistribusikan authority dan memandu perjalanan pengguna. Bukan asal-asalan — dipetakan ke funnel konversimu.',
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
        desc: 'Dashboard live yang bisa kamu cek kapan saja. Ranking, tren traffic, halaman teratas, conversion tracking — selalu up to date.',
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
    desc: 'Kami membangun topical cluster map dan editorial calendar yang disesuaikan dengan funnelmu. Setiap artikel dipetakan ke keyword, search intent, dan tujuan konversi — tidak diterbitkan sembarangan.',
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

export const SEO_FAQS = [
  {
    question: 'Berapa lama sampai bisa lihat hasil SEO?',
    answer: 'SEO adalah permainan jangka panjang — itulah yang membuatnya powerful. Biasanya, kamu akan melihat pergerakan ranking awal dalam 4-6 minggu. Pertumbuhan traffic yang signifikan mulai terlihat di bulan ke-3, dan hasil yang compounding muncul sekitar bulan ke-6. Berbeda dari iklan berbayar, hasil ini tidak berhenti ketika budget habis.',
  },
  {
    question: 'Artikel ditulis dalam bahasa apa?',
    answer: 'Semua konten ditulis secara native dalam Bahasa Indonesia oleh penulis spesialis yang memahami perilaku pencarian lokal. Kami tidak menerjemahkan konten Inggris — kami riset dan tulis sesuai cara pengguna Indonesia benar-benar mencari. Konten Inggris tersedia sebagai add-on untuk brand yang menarget audiens internasional.',
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
    answer: 'Off-page SEO dan link building tersedia sebagai add-on mulai Rp 5 Juta per penempatan media. Pendekatan kami fokus pada penempatan editorial di media Indonesia — tidak ada PBN, tidak ada direktori spam. Kualitas di atas kuantitas.',
  },
  {
    question: 'Bagaimana jika kami ingin berhenti?',
    answer: 'Tidak ada kontrak lock-in. Kami bekerja per bulan karena kami percaya hasil kami seharusnya memenangkan kepercayaanmu, bukan klausul kontrak. Semua konten, akun, dan data milikmu — kami tidak pernah menahan apapun.',
  },
  {
    question: 'Apakah kamu menjamin ranking?',
    answer: 'Tidak ada agency SEO yang jujur menjamin ranking spesifik — algoritma Google tidak bisa dikendalikan siapapun. Yang kami jamin adalah proses sistematis berbasis data yang secara konsisten memberikan pertumbuhan traffic 2-4× bagi klien kami dalam 6 bulan. Kami transparan tentang apa yang berhasil dan apa yang perlu disesuaikan.',
  },
] as const
