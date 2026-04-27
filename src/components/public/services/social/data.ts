export const SOCIAL_MODULES = [
  {
    id: 'organic-social',
    title: 'Organic Social Management',
    platforms: ['Instagram', 'TikTok', 'Facebook'],
    tagline: 'Kehadiran harianmu di platform yang paling penting di Indonesia.',
    description:
      'Kami tangani semuanya — dari perencanaan konten bulanan hingga posting harian, desain visual, penulisan caption dalam Bahasa Indonesia, dan community management. Kamu review dan setujui; kami kerjakan sisanya.',
    features: [
      {
        name: 'Monthly Content Plan',
        description:
          'Kalender strategis yang selaras dengan tujuan brand, tren musiman, dan event industri. Diulas dan disetujui sebelum apapun tayang.',
      },
      {
        name: 'Jumlah post per bulan (kustom)',
        description:
          'Volume disesuaikan kebutuhanmu. Kami rekomendasikan 12–20 post per platform untuk visibilitas yang konsisten.',
      },
      {
        name: 'Desain Visual & Penulisan Caption',
        description:
          'Setiap post didesain kustom sesuai brand guideline kamu. Caption dalam Bahasa Indonesia yang natural dengan hashtag strategis dan CTA.',
      },
      {
        name: 'Community Management (reply & DM)',
        description:
          'Kami pantau dan balas komentar serta DM di jam kerja. Audiensmu tidak pernah merasa diabaikan.',
      },
      {
        name: 'Laporan Performa Bulanan',
        description:
          'Reach, engagement, pertumbuhan follower, konten terbaik, dan rekomendasi bulan depan.',
      },
    ],
    accentColor: '#DB2777',
    accentRgb: '219,39,119',
    icon: 'Smartphone',
    priceNote: 'Harga kustom berdasarkan jumlah platform dan volume post',
  },
  {
    id: 'tiktok-strategy',
    title: 'TikTok Strategy & Production',
    platforms: ['TikTok'],
    tagline: 'Riding tren lokal sebelum puncaknya. Konten TikTok-native yang bikin algoritma berpihak ke kamu.',
    description:
      'TikTok butuh playbook yang sama sekali berbeda. Kami riset suara, format, dan hashtag yang trending di pasar Indonesia, lalu produksi video scroll-stopping yang dioptimasi untuk algoritma FYP.',
    features: [
      {
        name: 'Riset Tren & Suara Lokal',
        description:
          'Kami pantau audio trending, format, dan challenge di ekosistem TikTok Indonesia setiap hari — bukan setelah trennya lewat.',
      },
      {
        name: 'Video per bulan (kustom)',
        description:
          'Produksi video short-form. Struktur hook-first yang dirancang untuk 3 detik pertama.',
      },
      {
        name: 'Optimasi Hook & CTA',
        description:
          'Setiap video dibuka dengan pattern interrupt dan ditutup dengan langkah selanjutnya yang jelas. Kami A/B test hook untuk memaksimalkan completion rate.',
      },
      {
        name: 'Strategi Hashtag',
        description:
          'Perpaduan strategis hashtag trending, niche, dan branded untuk memaksimalkan discoverability tanpa terlihat spam.',
      },
      {
        name: 'Laporan Analitik TikTok',
        description:
          'Views, completion rate, shares, pertumbuhan follower, dan performa FYP — metrik yang benar-benar penting.',
      },
    ],
    accentColor: '#EC4899',
    accentRgb: '236,72,153',
    icon: 'Film',
    priceNote: 'Harga kustom berdasarkan volume video',
  },
  {
    id: 'linkedin-b2b',
    title: 'LinkedIn Management (Fokus B2B)',
    platforms: ['LinkedIn'],
    tagline: 'Posisikan founder dan perusahaanmu sebagai thought leader industri.',
    description:
      'LinkedIn adalah tempat keputusan B2B dibuat. Kami optimalkan company page dan profil utamamu, publikasikan konten thought leadership, dan jalankan strategi engagement yang menempatkan brandmu di depan para pengambil keputusan.',
    features: [
      {
        name: 'Optimasi Profil & Company Page',
        description:
          'Overhaul lengkap pada kehadiran LinkedIn kamu — headline, about, featured content, dan visual branding yang mengkomunikasikan otoritas.',
      },
      {
        name: 'Post per bulan (kustom)',
        description:
          'Perpaduan text post, carousel, artikel, dan polling yang dioptimasi untuk algoritma LinkedIn yang menghargai percakapan.',
      },
      {
        name: 'Artikel Thought Leadership',
        description:
          'Konten long-form di bawah profil eksekutif kamu. Insight industri, opini, dan studi kasus yang membangun kredibilitas.',
      },
      {
        name: 'Strategi Koneksi & Engagement',
        description:
          'Koneksi tertarget, komentar strategis di post industri, dan engagement dengan prospek. Networking organik dalam skala besar.',
      },
    ],
    accentColor: '#0A66C2',
    accentRgb: '10,102,194',
    icon: 'Briefcase',
    priceNote: 'Harga kustom berdasarkan jumlah profil dan volume post',
  },
] as const

export const SOCIAL_ADDONS = [
  {
    id: 'influencer-marketing',
    name: 'Influencer Marketing / KOL-KOC',
    description:
      'Berkolaborasi dengan kreator Indonesia dan Key Opinion Leader untuk memperluas jangkauan brand. Kami tangani pencarian talent, briefing, dan performance tracking.',
    badge: 'Add-on opsional',
  },
  {
    id: 'social-audit',
    name: 'Social Media Audit',
    description:
      'Analisis komprehensif kehadiran social mediamu saat ini — performa konten, demografi audiens, benchmarking kompetitor, dan rekomendasi yang bisa langsung dieksekusi.',
    badge: 'Layanan sekali jalan',
  },
] as const

export const SOCIAL_CONTENT_PILLARS = [
  {
    name: 'Edukasi',
    percentage: 40,
    subtitle: 'Bangun otoritas & kepercayaan',
    description:
      'Tips, how-to, insight industri, dan thought leadership yang memposisikan brandmu sebagai ahli. Audiens belajar sesuatu — dan ingat siapa yang mengajari mereka.',
    examples: 'Infografik carousel, reel tips, statistik industri, video penjelasan',
    accentColor: '#7C3AED',
    accentRgb: '124,58,237',
    icon: 'BookOpen',
  },
  {
    name: 'Hiburan',
    percentage: 40,
    subtitle: 'Stop the scroll',
    description:
      'Trend-jacking, humor, behind-the-scenes, dan konten relatable yang mendapat shares dan saves. Inilah yang membuat brandmu terasa manusiawi dan membuat algoritma bekerja untukmu.',
    examples: 'Reel audio trending, meme, konten BTS, challenges, video POV',
    accentColor: '#DB2777',
    accentRgb: '219,39,119',
    icon: 'Sparkles',
  },
  {
    name: 'Konversi',
    percentage: 20,
    subtitle: 'Ubah follower jadi pelanggan',
    description:
      'Penawaran langsung, testimoni, showcase produk, dan CTA yang mendorong aksi. Strategis — tidak pernah spam. Waktunya tepat ketika audiensmu sudah siap.',
    examples: 'Peluncuran produk, pengumuman promo, testimoni klien, penawaran terbatas',
    accentColor: '#D97706',
    accentRgb: '217,119,6',
    icon: 'ShoppingCart',
  },
] as const

export const SOCIAL_PROCESS = [
  {
    step: 1,
    title: 'Brand Onboarding',
    timeline: 'Minggu 1',
    description:
      'Kami pelajari brandmu dari dalam — tone of voice, visual identity, persona audiens, kompetitor, dan dos & don\'ts konten. Kami audit kehadiran social mediamu saat ini dan identifikasi quick wins.',
    deliverable: 'Dokumen brand brief + analisis kompetitor',
    accentColor: '#7C3AED',
    icon: 'ClipboardList',
  },
  {
    step: 2,
    title: 'Strategi & Pilar',
    timeline: 'Minggu 1–2',
    description:
      'Kami tentukan pilar kontenmu (Edukasi, Hiburan, Konversi), fokus platform, jadwal posting, dan kalender konten bulan pertama. Semuanya dipetakan ke tujuan bisnismu.',
    deliverable: 'Deck strategi konten + kalender Bulan 1',
    accentColor: '#DB2777',
    icon: 'Compass',
  },
  {
    step: 3,
    title: 'Produksi Konten',
    timeline: 'Minggu 2–3',
    description:
      'Desainer membuat visual, copywriter menulis caption dalam Bahasa Indonesia, dan video editor memproduksi reels dan TikTok. Semuanya dibuat sesuai brand guideline kamu — tanpa template.',
    deliverable: 'Konten satu bulan penuh siap untuk review',
    accentColor: '#D97706',
    icon: 'PenLine',
  },
  {
    step: 4,
    title: 'Persetujuan & Penjadwalan',
    timeline: 'Minggu 3–4',
    description:
      'Kamu review kalender konten dan setujui setiap konten. Kami tangani penjadwalan, riset hashtag, dan waktu posting optimal. Setelah disetujui, semuanya dijadwalkan dan tayang otomatis.',
    deliverable: 'Kalender disetujui + community management aktif',
    accentColor: '#F59E0B',
    icon: 'CalendarCheck',
  },
] as const

export const SOCIAL_FAQS = [
  {
    question: 'Platform apa saja yang kamu kelola?',
    answer:
      'Kami kelola Instagram, TikTok, Facebook, dan LinkedIn. Setiap platform mendapat strategi tersendiri — apa yang berhasil di TikTok tidak berlaku di LinkedIn. Kami rekomendasikan mulai dari 2–3 platform tempat audiensmu paling aktif, baru berkembang. Kami tidak menyebar tipis ke platform yang tidak relevan untuk brandmu.',
  },
  {
    question: 'Apakah community management sudah termasuk?',
    answer:
      'Ya — kami pantau dan balas komentar serta DM di jam kerja (Sen–Jum, 09.00–18.00 WIB). Untuk brand yang butuh coverage 24/7 atau akhir pekan, kami menawarkan extended community management sebagai add-on. Setiap interaksi mengikuti panduan tone of voice brandmu.',
  },
  {
    question: 'Siapa yang membuat konten visual?',
    answer:
      'Tim desain internal kami membuat semua konten visual — feed post, stories, cover reel, grafik carousel, dan thumbnail TikTok. Semuanya didesain kustom sesuai brand guideline kamu. Kami tidak pakai template Canva atau grafik stok. Jika brandmu butuh produksi video (syuting), itu ditangani tim Creative Services kami.',
  },
  {
    question: 'Berapa banyak post per bulan?',
    answer:
      'Volume post dikustomisasi sesuai kebutuhan dan budget kamu. Untuk kebanyakan brand, kami rekomendasikan 12–20 post per platform per bulan untuk visibilitas yang konsisten. Ini biasanya setara 3–5 post per minggu. Kami bisa scale up untuk peluncuran produk, kampanye, atau momen musiman.',
  },
  {
    question: 'Apakah kamu membuat video TikTok?',
    answer:
      'Ya — modul TikTok Strategy & Production kami mencakup pembuatan video penuh. Kami tangani pengembangan konsep, scripting, syuting (area Jakarta), editing, dan penulisan caption. Setiap video dioptimasi untuk algoritma FYP dengan struktur hook-first dan audio trending. Untuk brand di luar Jakarta, kami bisa bekerja dengan kreator lokal atau memberikan brief detail untuk timmu.',
  },
  {
    question: 'Apakah kami bisa approve konten sebelum tayang?',
    answer:
      'Tentu saja — tidak ada yang tayang tanpa persetujuanmu. Kami siapkan kalender konten bulan penuh di awal, termasuk visual dan caption. Kamu review semuanya di dokumen bersama atau tool content approval. Setelah disetujui, kami tangani penjadwalan dan posting. Ronde revisi sudah termasuk.',
  },
  {
    question: 'Bagaimana kamu mengukur keberhasilan?',
    answer:
      'Kami lacak reach, engagement rate, pertumbuhan follower, saves, shares, kunjungan profil, dan klik link — metrik yang menunjukkan pertumbuhan brand nyata, bukan angka vanity. Laporan bulanan kami mencakup analisis konten terbaik, insight demografi audiens, dan rekomendasi strategis untuk bulan depan. Kami kaitkan performa social dengan tujuan bisnismu sebisa mungkin.',
  },
] as const

export const SOCIAL_STATS = [
  {
    value: 4,
    suffix: '',
    label: 'Platform Dikelola',
    context: 'Instagram, TikTok, Facebook, LinkedIn — dikelola sebagai satu strategi terintegrasi.',
    isCounter: true,
    decimals: 0,
  },
  {
    value: 30,
    suffix: '+',
    label: 'Post / Bulan',
    context: 'Kehadiran konsisten, tidak ada hari yang terlewat. Konten diproduksi dan disetujui sebelum tayang.',
    isCounter: true,
    decimals: 0,
  },
  {
    value: 100,
    suffix: '%',
    label: 'Konten Original',
    context: 'Didesain kustom untuk brandmu. Tidak ada template stok, tidak ada grafik daur ulang.',
    isCounter: true,
    decimals: 0,
  },
] as const
