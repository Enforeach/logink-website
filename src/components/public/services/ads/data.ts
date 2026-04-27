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
    bestFor: 'Scale multi-platform',
    platformCoverage: 'Google + Meta + Marketplace',
    isPopular: true,
    features: [
      'Semua yang ada di Entry',
      'Meta Ads — Targeting Audiens Lokal',
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

export const ADS_COMPARISON_TABLE = {
  categories: [
    {
      name: 'Google Ads (Search, Display, Shopping)',
      features: [
        { name: 'Setup Struktur Campaign & Ad Group', entry: true, growth: true, full: true },
        { name: 'Strategi Keyword Bidding', entry: true, growth: true, full: true },
        { name: 'Penulisan Ad Copy (Bahasa Indonesia)', entry: true, growth: true, full: true },
        { name: 'Conversion Tracking via GA4', entry: true, growth: true, full: true },
        { name: 'Laporan Performa', entry: true, growth: true, full: true },
      ],
    },
    {
      name: 'Meta Ads (Instagram & Facebook)',
      features: [
        { name: 'Targeting Audiens Lokal', entry: false, growth: true, full: true },
        { name: 'Desain Ad Creative', entry: false, growth: true, full: true },
        { name: 'A/B Testing', entry: false, growth: true, full: true },
        { name: 'Pixel Setup & Retargeting', entry: false, growth: true, full: true },
        { name: 'Laporan Performa', entry: true, growth: true, full: true },
      ],
    },
    {
      name: 'TikTok Ads',
      features: [
        { name: 'Setup TikTok Ads Manager', entry: false, growth: false, full: true },
        { name: 'Creative Brief & Produksi', entry: false, growth: false, full: true },
        { name: 'Targeting Audiens', entry: false, growth: false, full: true },
        { name: 'Optimasi Konversi', entry: false, growth: false, full: true },
        { name: 'Laporan Performa', entry: true, growth: true, full: true },
      ],
    },
    {
      name: 'Marketplace Ads (Tokopedia, Shopee, Lazada)',
      features: [
        { name: 'Setup Tokopedia Ads & Shopee Ads', entry: false, growth: true, full: true },
        { name: 'Optimasi Keyword Produk', entry: false, growth: true, full: true },
        { name: 'Strategi Flash Sale & Voucher', entry: false, growth: true, full: true },
        { name: 'Laporan Performa', entry: true, growth: true, full: true },
      ],
    },
  ],
} as const

export const ADS_ADDONS = [
  {
    name: 'Retargeting Campaign',
    description:
      'Re-engage pengguna yang sudah mengunjungi situsmu tapi belum konversi. Bekerja di Google Display dan Meta — membawa prospek hangat kembali untuk menyelesaikan pembelian mereka.',
    availability: 'Add-on untuk Entry & Growth. Sudah termasuk di Full.',
    accentColor: '#D97706',
  },
  {
    name: 'Programmatic Display Advertising',
    description:
      'Pembelian display ad otomatis di jaringan publisher Indonesia premium. Jangkau audiensmu dalam skala besar di luar ekosistem Google dan Meta.',
    availability: 'Tersedia sebagai add-on untuk tier Growth & Full.',
    accentColor: '#7C3AED',
  },
] as const

export const ADS_PLATFORMS = [
  {
    id: 'google',
    name: 'Google Ads',
    subtitle: 'Search · Display · Shopping',
    tagline: 'Tangkap pembeli high-intent tepat saat mereka mencari.',
    description:
      'Google Ads menempatkan brandmu di puncak hasil pencarian ketika pengguna Indonesia aktif mencari apa yang kamu jual. Search untuk intent, Display untuk retargeting dan brand awareness, Shopping untuk listing produk e-commerce.',
    features: [
      'Setup Struktur Campaign & Ad Group',
      'Strategi Keyword Bidding',
      'Penulisan Ad Copy (Bahasa Indonesia)',
      'Conversion Tracking via GA4',
      'Laporan Performa (bulanan)',
    ],
    tiers: { entry: true, growth: true, full: true },
    accentColor: '#D97706',
    accentRgb: '217,119,6',
  },
  {
    id: 'meta',
    name: 'Meta Ads',
    subtitle: 'Instagram & Facebook',
    tagline: 'Jangkau audiens idealmu dengan targeting presisi dan creative yang bikin scroll berhenti.',
    description:
      'Platform iklan Meta memberimu akses ke audiens social terbesar Indonesia. Targeting demografi lokal, audiens berbasis interest, retargeting perilaku — dan creative yang benar-benar menghentikan scroll.',
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
      'TikTok Ads menjangkau audiens termuda dan paling engaged di Indonesia. Kami setup Ads Manager kamu, produksi creative brief, tangani targeting audiens, dan optimasi untuk konversi — bukan sekadar views.',
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
      'Iklan native platform yang menempatkan produkmu di depan pembeli yang siap belanja. Optimasi keyword, strategi flash sale, dan kampanye voucher — dibangun untuk ekosistem marketplace Indonesia.',
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
    accentColor: '#7C3AED',
  },
  {
    step: 2,
    title: 'Pemetaan Funnel',
    timeline: 'Minggu 1',
    description:
      'Tujuan kampanye didefinisikan di setiap tahap funnel — dari awareness hingga konversi. Kami petakan platform mana yang menangani tahap mana: Google Search untuk intent, Meta untuk awareness, TikTok untuk discovery. Setiap rupiah punya tujuan.',
    accentColor: '#DB2777',
  },
  {
    step: 3,
    title: 'Produksi Creative',
    timeline: 'Minggu 1–2',
    description:
      'Ad copy dan visual dibangun untuk setiap platform dan segmen audiens. Search ads mendapat copy teroptimasi keyword. Meta mendapat visual yang menghentikan scroll. TikTok mendapat video format native. Tidak ada yang didaur ulang antar platform.',
    accentColor: '#D97706',
  },
  {
    step: 4,
    title: 'Launch Kampanye',
    timeline: 'Minggu 2',
    description:
      'Live dengan budget terkontrol untuk pengumpulan data awal. Kami mulai konservatif, membiarkan algoritma mempelajari audiens idealmu — lalu scale budget ke yang berhasil. Monitoring harian dari hari pertama.',
    accentColor: '#F59E0B',
  },
  {
    step: 5,
    title: 'Loop Optimasi',
    timeline: 'Mingguan',
    description:
      'Penyesuaian bid mingguan, refinement audiens, rotasi creative iklan, dan realokasi budget. Kami matikan iklan yang underperform dengan cepat, gandakan yang menang, dan terus uji sudut pandang baru. Review strategi bulanan bersama timmu.',
    accentColor: '#A78BFA',
    isOngoing: true,
  },
] as const

export const ADS_FAQS = [
  {
    question: 'Platform iklan apa saja yang kamu kelola?',
    answer:
      'Kami kelola Google Ads (Search, Display, Shopping), Meta Ads (Instagram & Facebook), TikTok Ads, dan marketplace Indonesia (Tokopedia, Shopee, Lazada). Ketersediaan platform tergantung tiermu — Entry mencakup Google saja, Growth menambah Meta dan Marketplace, Full menambah TikTok. Kami rekomendasikan mulai dengan Google + Meta untuk kebanyakan brand, lalu berkembang.',
  },
  {
    question: 'Berapa budget iklan minimum?',
    answer:
      'Tidak ada minimum yang baku, tapi kami rekomendasikan setidaknya Rp 5 Juta/bulan untuk ad spend di Entry, Rp 15 Juta untuk Growth, dan Rp 50 Juta+ untuk Full. Budget lebih kecil bisa berhasil untuk kampanye hyper-lokal atau niche, tapi menyebar terlalu tipis ke banyak platform mengurangi efektivitas. Kami akan sarankan alokasi optimal saat onboarding.',
  },
  {
    question: 'Apa itu ROAS dan bagaimana kamu mengukurnya?',
    answer:
      'ROAS (Return on Ad Spend) mengukur revenue yang dihasilkan per rupiah yang dibelanjakan untuk iklan. Jika kamu spend Rp 10 Juta dan menghasilkan Rp 30 Juta revenue, ROAS-mu adalah 3×. Kami lacak ini melalui conversion tracking GA4, atribusi native platform, dan jika memungkinkan, integrasi CRM langsung. Klien kami biasanya mencapai ROAS 2-4× dalam 3 bulan.',
  },
  {
    question: 'Apakah saya punya akses ke akun iklan saya sendiri?',
    answer:
      'Tentu saja — transparansi penuh adalah hal yang tidak bisa ditawar. Kamu memiliki semua akun iklan (Google, Meta, TikTok). Kami bekerja di dalam akunmu sebagai manager, tidak pernah di akun kami sendiri. Jika kami berpisah, kamu menyimpan semuanya — kampanye, audiens, data, dan histori performa. Tidak ada yang ditahan.',
  },
  {
    question: 'Berapa lama sampai iklan tayang?',
    answer:
      'Biasanya 2 minggu dari kickoff. Minggu 1 adalah audit akun, pemetaan funnel, dan produksi creative. Minggu 2 adalah launch kampanye dengan budget awal. Kami mulai melihat data dalam beberapa hari setelah launch, dan pola optimasi yang berarti muncul dalam 2–4 minggu.',
  },
  {
    question: 'Apakah kamu menangani creative (gambar/video) untuk iklan?',
    answer:
      'Untuk Meta Ads, ya — desain ad creative sudah termasuk di tier Growth dan Full. Untuk produksi video TikTok, creative brief dan produksi sudah termasuk di tier Full. Untuk kebutuhan creative yang lebih kompleks, kami bisa bundle dengan tim Creative Services kami dengan harga diskon.',
  },
  {
    question: 'Apa bedanya management fee dan ad spend?',
    answer:
      'Management fee (yang kamu bayar ke Logink) mencakup strategi, setup, copywriting, creative, optimasi harian, dan pelaporan. Ad spend (yang kamu bayar langsung ke Google/Meta/TikTok) adalah budget media yang mendanai impresi dan klik yang sebenarnya. Anggap management fee sebagai membayar pilotnya — ad spend adalah bahan bakarnya. Keduanya transparan dan kamu kendalikan keduanya.',
  },
] as const

export const ADS_STATS = [
  {
    value: '2–4×',
    label: 'Rata-rata ROAS',
    context: 'Return on ad spend di kampanye klien pada tanda 3 bulan. Kami optimasi sampai tercapai.',
  },
  {
    value: '~35%',
    label: 'Rata-rata Penurunan CPA',
    context: 'Pengurangan cost per acquisition setelah 90 hari optimasi vs. agency sebelumnya atau in-house klien.',
  },
  {
    value: '5',
    label: 'Platform Iklan',
    context: 'Google, Meta, TikTok, Tokopedia, Shopee — dikelola sebagai satu ekosistem cross-platform.',
  },
] as const

// ─── English exports ─────────────────────────────────────────────────────────

export const ADS_COMPARISON_TABLE_EN = {
  categories: [
    {
      name: 'Google Ads (Search, Display, Shopping)',
      features: [
        { name: 'Campaign & Ad Group Structure Setup', entry: true, growth: true, full: true },
        { name: 'Keyword Bidding Strategy', entry: true, growth: true, full: true },
        { name: 'Ad Copy Writing', entry: true, growth: true, full: true },
        { name: 'Conversion Tracking via GA4', entry: true, growth: true, full: true },
        { name: 'Performance Reports', entry: true, growth: true, full: true },
      ],
    },
    {
      name: 'Meta Ads (Instagram & Facebook)',
      features: [
        { name: 'Local Audience Targeting', entry: false, growth: true, full: true },
        { name: 'Ad Creative Design', entry: false, growth: true, full: true },
        { name: 'A/B Testing', entry: false, growth: true, full: true },
        { name: 'Pixel Setup & Retargeting', entry: false, growth: true, full: true },
        { name: 'Performance Reports', entry: true, growth: true, full: true },
      ],
    },
    {
      name: 'TikTok Ads',
      features: [
        { name: 'TikTok Ads Manager Setup', entry: false, growth: false, full: true },
        { name: 'Creative Brief & Production', entry: false, growth: false, full: true },
        { name: 'Audience Targeting', entry: false, growth: false, full: true },
        { name: 'Conversion Optimization', entry: false, growth: false, full: true },
        { name: 'Performance Reports', entry: true, growth: true, full: true },
      ],
    },
    {
      name: 'Marketplace Ads (Tokopedia, Shopee, Lazada)',
      features: [
        { name: 'Tokopedia Ads & Shopee Ads Setup', entry: false, growth: true, full: true },
        { name: 'Product Keyword Optimization', entry: false, growth: true, full: true },
        { name: 'Flash Sale & Voucher Strategy', entry: false, growth: true, full: true },
        { name: 'Performance Reports', entry: true, growth: true, full: true },
      ],
    },
  ],
} as const

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
      'Meta Ads — Local Audience Targeting',
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
      "Re-engage users who visited your site but didn't convert. Works across Google Display and Meta — bringing warm leads back to complete their purchase.",
    availability: 'Add-on for Entry & Growth. Included in Full.',
    accentColor: '#D97706',
  },
  {
    name: 'Programmatic Display Advertising',
    description:
      "Automated display ad buying across premium Indonesian publisher networks. Reach your audience at scale beyond Google and Meta's ecosystems.",
    availability: 'Available as add-on for Growth & Full tiers.',
    accentColor: '#7C3AED',
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
    accentColor: '#D97706',
    accentRgb: '217,119,6',
  },
  {
    id: 'meta',
    name: 'Meta Ads',
    subtitle: 'Instagram & Facebook',
    tagline: 'Reach your ideal audience with precision targeting and scroll-stopping creative.',
    description:
      "Meta's advertising platform gives you access to Indonesia's largest social audience. Local demographic targeting, interest-based audiences, behavioral retargeting — and creative that actually stops the scroll.",
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
      "TikTok Ads reach Indonesia's youngest, most engaged audience. We set up your Ads Manager, produce creative briefs, handle audience targeting, and optimize for conversions — not just views.",
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
      'Platform-native ads that put your products in front of ready-to-buy shoppers. Keyword optimization, flash sale strategy, and voucher campaigns — built for the Indonesian marketplace ecosystem.',
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
    accentColor: '#7C3AED',
  },
  {
    step: 2,
    title: 'Funnel Mapping',
    timeline: 'Week 1',
    description:
      'Campaign objectives defined at each funnel stage — awareness to conversion. We map which platforms handle which stage: Google Search for intent, Meta for awareness, TikTok for discovery. Every rupiah has a purpose.',
    accentColor: '#DB2777',
  },
  {
    step: 3,
    title: 'Creative Production',
    timeline: 'Week 1–2',
    description:
      'Ad copy and visuals built for each platform and audience segment. Search ads get keyword-optimized copy. Meta gets scroll-stopping visuals. TikTok gets native-format video. Nothing recycled across platforms.',
    accentColor: '#D97706',
  },
  {
    step: 4,
    title: 'Campaign Launch',
    timeline: 'Week 2',
    description:
      "Live with controlled budgets for initial data gathering. We start conservative, letting the algorithms learn your ideal audience — then scale spend into what's working. Daily monitoring from day one.",
    accentColor: '#F59E0B',
  },
  {
    step: 5,
    title: 'Optimization Loops',
    timeline: 'Weekly',
    description:
      'Weekly bid adjustments, audience refinement, ad creative rotation, and budget reallocation. We kill underperforming ads fast, double down on winners, and continuously test new angles. Monthly strategy review with your team.',
    accentColor: '#A78BFA',
    isOngoing: true,
  },
] as const

export const ADS_FAQS_EN = [
  {
    question: 'Which ad platforms do you manage?',
    answer:
      'We manage Google Ads (Search, Display, Shopping), Meta Ads (Instagram & Facebook), TikTok Ads, and Indonesian marketplace platforms (Tokopedia, Shopee, Lazada). Platform availability depends on your tier — Entry covers Google only, Growth adds Meta and Marketplace, Full adds TikTok. We recommend starting with Google + Meta for most brands, then expanding.',
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
      'Absolutely — full transparency is non-negotiable. You own all ad accounts (Google, Meta, TikTok). We work inside your accounts as managers, never in our own. If we part ways, you keep everything — campaigns, audiences, data, and historical performance. Nothing is held hostage.',
  },
  {
    question: 'How long until ads go live?',
    answer:
      'Typically 2 weeks from kickoff. Week 1 is account audit, funnel mapping, and creative production. Week 2 is campaign launch with initial budgets. We start seeing data within days of launch, and meaningful optimization patterns emerge within 2–4 weeks.',
  },
  {
    question: 'Do you handle the creative (images/videos) for ads?',
    answer:
      'For Meta Ads, yes — creative ad design is included in Growth and Full tiers. For TikTok video production, creative briefs and production are included in the Full tier. For more complex creative needs, we can bundle in our Creative Services team at a discounted rate.',
  },
  {
    question: "What's the difference between management fee and ad spend?",
    answer:
      "Management fee (what you pay Logink) covers strategy, setup, copywriting, creative, daily optimization, and reporting. Ad spend (what you pay Google/Meta/TikTok directly) is your media budget that funds actual impressions and clicks. Think of management fee as hiring the pilot — ad spend is the fuel. Both are transparent and you control both.",
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
    context: 'Google, Meta, TikTok, Tokopedia, Shopee — managed as one cross-platform ecosystem.',
  },
] as const
