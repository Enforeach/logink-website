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

// ─── English exports ─────────────────────────────────────────────────────────

export const SOCIAL_MODULES_EN = [
  {
    id: 'organic-social',
    title: 'Organic Social Management',
    platforms: ['Instagram', 'TikTok', 'Facebook'],
    tagline: 'Your daily presence across the platforms that matter most in Indonesia.',
    description:
      'We handle everything — from monthly content planning to daily posting, visual design, caption writing in Bahasa Indonesia, and community management. You review and approve; we do the rest.',
    features: [
      {
        name: 'Monthly Content Plan',
        description:
          'A strategic calendar aligned with your brand goals, seasonal trends, and industry events. Reviewed and approved before anything goes live.',
      },
      {
        name: 'Posts per month (customized)',
        description:
          'Volume tailored to your needs. We recommend 12–20 posts per platform for consistent visibility.',
      },
      {
        name: 'Visual Design & Caption Writing',
        description:
          'Every post custom-designed to your brand guidelines. Captions in natural Bahasa Indonesia with strategic hashtags and CTAs.',
      },
      {
        name: 'Community Management (replies & DMs)',
        description:
          'We monitor and respond to comments and DMs during business hours. Your audience never feels ignored.',
      },
      {
        name: 'Monthly Performance Report',
        description:
          "Reach, engagement, follower growth, top content, and next month's recommendations.",
      },
    ],
    accentColor: '#DB2777',
    accentRgb: '219,39,119',
    icon: 'Smartphone',
    priceNote: 'Custom pricing based on platform count and post volume',
  },
  {
    id: 'tiktok-strategy',
    title: 'TikTok Strategy & Production',
    platforms: ['TikTok'],
    tagline: 'Ride local trends before they peak. TikTok-native content that gets the algorithm on your side.',
    description:
      'TikTok requires a completely different playbook. We research trending sounds, formats, and hashtags in the Indonesian market, then produce scroll-stopping videos optimized for the FYP algorithm.',
    features: [
      {
        name: 'Local Trend & Sound Research',
        description:
          "We monitor trending audio, formats, and challenges in the Indonesian TikTok ecosystem daily — not after they've peaked.",
      },
      {
        name: 'Videos per month (customized)',
        description:
          'Short-form video production. Hook-first structure designed for the first 3 seconds.',
      },
      {
        name: 'Hook & CTA Optimization',
        description:
          'Every video opens with a pattern interrupt and closes with a clear next step. We A/B test hooks to maximize completion rate.',
      },
      {
        name: 'Hashtag Strategy',
        description:
          'Strategic mix of trending, niche, and branded hashtags to maximize discoverability without looking spammy.',
      },
      {
        name: 'TikTok Analytics Report',
        description:
          'Views, completion rate, shares, follower growth, and FYP performance — the metrics that actually matter.',
      },
    ],
    accentColor: '#EC4899',
    accentRgb: '236,72,153',
    icon: 'Film',
    priceNote: 'Custom pricing based on video volume',
  },
  {
    id: 'linkedin-b2b',
    title: 'LinkedIn Management (B2B Focus)',
    platforms: ['LinkedIn'],
    tagline: 'Position your founders and company as industry thought leaders.',
    description:
      'LinkedIn is where B2B decisions are made. We optimize your company page and key profiles, publish thought leadership content, and run engagement strategies that put your brand in front of decision-makers.',
    features: [
      {
        name: 'Profile & Company Page Optimization',
        description:
          'Complete overhaul of your LinkedIn presence — headline, about, featured content, and visual branding that communicates authority.',
      },
      {
        name: 'Posts per month (customized)',
        description:
          "Mix of text posts, carousels, articles, and polls optimized for LinkedIn's algorithm which rewards conversations.",
      },
      {
        name: 'Thought Leadership Articles',
        description:
          "Long-form content under your executives' profiles. Industry insights, opinion pieces, and case studies that build credibility.",
      },
      {
        name: 'Connection & Engagement Strategy',
        description:
          'Targeted connections, strategic commenting on industry posts, and engagement with potential leads. Organic networking at scale.',
      },
    ],
    accentColor: '#0A66C2',
    accentRgb: '10,102,194',
    icon: 'Briefcase',
    priceNote: 'Custom pricing based on profile count and post volume',
  },
] as const

export const SOCIAL_ADDONS_EN = [
  {
    id: 'influencer-marketing',
    name: 'Influencer Marketing / KOL-KOC',
    description:
      'Partner with Indonesian creators and Key Opinion Leaders to amplify your brand reach. We handle talent sourcing, briefing, and performance tracking.',
    badge: 'Optional add-on',
  },
  {
    id: 'social-audit',
    name: 'Social Media Audit',
    description:
      'Comprehensive analysis of your current social presence — content performance, audience demographics, competitor benchmarking, and actionable recommendations.',
    badge: 'One-time service',
  },
] as const

export const SOCIAL_CONTENT_PILLARS_EN = [
  {
    name: 'Educate',
    percentage: 40,
    subtitle: 'Build authority & trust',
    description:
      'Tips, how-tos, industry insights, and thought leadership that position your brand as the expert. Your audience learns something — and remembers who taught them.',
    examples: 'Carousel infographics, tips reels, industry stats, explainer videos',
    accentColor: '#7C3AED',
    accentRgb: '124,58,237',
    icon: 'BookOpen',
  },
  {
    name: 'Entertain',
    percentage: 40,
    subtitle: 'Stop the scroll',
    description:
      'Trend-jacking, humor, behind-the-scenes, and relatable content that earns shares and saves. This is what makes your brand feel human and gets the algorithm working for you.',
    examples: 'Trending audio reels, memes, BTS content, challenges, POV videos',
    accentColor: '#DB2777',
    accentRgb: '219,39,119',
    icon: 'Sparkles',
  },
  {
    name: 'Convert',
    percentage: 20,
    subtitle: 'Turn followers into customers',
    description:
      'Direct offers, testimonials, product showcases, and CTAs that drive action. Strategic — never spammy. Timed to land when your audience is already warmed up.',
    examples: 'Product launches, promo announcements, client testimonials, limited offers',
    accentColor: '#D97706',
    accentRgb: '217,119,6',
    icon: 'ShoppingCart',
  },
] as const

export const SOCIAL_PROCESS_EN = [
  {
    step: 1,
    title: 'Brand Onboarding',
    timeline: 'Week 1',
    description:
      "We learn your brand inside out — tone of voice, visual identity, audience personas, competitors, and content dos and don'ts. We audit your current social presence and identify quick wins.",
    deliverable: 'Brand brief document + competitor analysis',
    accentColor: '#7C3AED',
    icon: 'ClipboardList',
  },
  {
    step: 2,
    title: 'Strategy & Pillars',
    timeline: 'Week 1–2',
    description:
      "We define your content pillars (Educate, Entertain, Convert), platform focus, posting cadence, and the first month's content calendar. Everything is mapped to your business goals.",
    deliverable: 'Content strategy deck + Month 1 calendar',
    accentColor: '#DB2777',
    icon: 'Compass',
  },
  {
    step: 3,
    title: 'Content Production',
    timeline: 'Week 2–3',
    description:
      'Designers create visuals, copywriters craft captions in Bahasa Indonesia, and video editors produce reels and TikToks. Everything built to your brand guidelines — no templates.',
    deliverable: 'Full month of content ready for review',
    accentColor: '#D97706',
    icon: 'PenLine',
  },
  {
    step: 4,
    title: 'Approval & Scheduling',
    timeline: 'Week 3–4',
    description:
      'You review the content calendar and approve each piece. We handle scheduling, hashtag research, and optimal posting times. Once approved, everything is queued and goes live automatically.',
    deliverable: 'Approved calendar live + community management active',
    accentColor: '#F59E0B',
    icon: 'CalendarCheck',
  },
] as const

export const SOCIAL_FAQS_EN = [
  {
    question: 'Which platforms do you manage?',
    answer:
      "We manage Instagram, TikTok, Facebook, and LinkedIn. Each platform gets a tailored strategy — what works on TikTok doesn't work on LinkedIn. We recommend starting with 2–3 platforms where your audience is most active, then expanding. We don't spread thin across platforms that don't matter for your brand.",
  },
  {
    question: 'Is community management included?',
    answer:
      "Yes — we monitor and respond to comments and DMs during business hours (Mon–Fri, 9am–6pm WIB). For brands that need 24/7 or weekend coverage, we offer extended community management as an add-on. Every interaction follows your brand's tone of voice guidelines.",
  },
  {
    question: 'Who creates the visual content?',
    answer:
      "Our in-house design team creates all visual content — feed posts, stories, reels covers, carousel graphics, and TikTok thumbnails. Everything is custom-designed to your brand guidelines. We don't use Canva templates or stock graphics. If your brand needs video production (shooting), that's handled by our Creative Services team.",
  },
  {
    question: 'How many posts per month?',
    answer:
      'Post volume is customized to your needs and budget. For most brands, we recommend 12–20 posts per platform per month for consistent visibility. This typically breaks down into 3–5 posts per week. We can scale up for product launches, campaigns, or seasonal pushes.',
  },
  {
    question: 'Do you create TikTok videos?',
    answer:
      'Yes — our TikTok Strategy & Production module includes full video creation. We handle concept development, scripting, shooting (Jakarta area), editing, and caption writing. Each video is optimized for the FYP algorithm with hook-first structure and trending audio. For brands outside Jakarta, we can work with local creators or provide detailed briefs for your team to execute.',
  },
  {
    question: 'Can we approve content before it goes live?',
    answer:
      "Absolutely — nothing goes live without your approval. We prepare the full month's content calendar in advance, including visuals and captions. You review everything in a shared document or content approval tool. Once approved, we handle scheduling and posting. Revision rounds are included.",
  },
  {
    question: 'How do you measure success?',
    answer:
      "We track reach, engagement rate, follower growth, saves, shares, profile visits, and link clicks — the metrics that indicate real brand growth, not just vanity numbers. Our monthly report includes top-performing content analysis, audience demographic insights, and strategic recommendations for the next month. We tie social performance back to your business goals wherever possible.",
  },
] as const

export const SOCIAL_STATS_EN = [
  {
    value: 4,
    suffix: '',
    label: 'Platforms Covered',
    context: 'Instagram, TikTok, Facebook, LinkedIn — managed as one integrated strategy.',
    isCounter: true,
    decimals: 0,
  },
  {
    value: 30,
    suffix: '+',
    label: 'Posts / Month',
    context: 'Consistent presence, zero missed days. Content produced and approved before it goes live.',
    isCounter: true,
    decimals: 0,
  },
  {
    value: 100,
    suffix: '%',
    label: 'Original Content',
    context: 'Custom-designed for your brand. No stock templates, no recycled graphics.',
    isCounter: true,
    decimals: 0,
  },
] as const
