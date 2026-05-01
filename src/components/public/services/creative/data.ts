export const CREATIVE_DELIVERABLES = {
  design: {
    category: 'Design',
    accentColor: '#F59E0B',
    accentRgb: '245,158,11',
    items: [
      { id: 'social-templates', name: 'Template Social Media (IG feed, story, cover)', description: 'Feed post, story frame, cover design, dan highlight icon.' },
      { id: 'banner-ads', name: 'Banner / Display Ads', description: 'Banner HTML5 dan statis untuk Google Display. Semua ukuran IAB.' },
      { id: 'infographics', name: 'Infografik', description: 'Data dan proses diubah jadi visual on-brand yang mudah dibagikan.' },
      { id: 'campaign-kv', name: 'Key Visual Kampanye', description: 'Visual hero yang menentukan arah creative untuk peluncuran dan promosi.' },
      { id: 'motion-elements', name: 'Elemen Motion Graphic', description: 'Animasi logo, animasi social, dan micro-interaction.' },
      { id: 'brand-guidelines', name: 'Brand Guidelines (buku brand lengkap)', description: 'Logo, warna, tipografi, gaya fotografi, dan tone of voice.' },
    ],
  },
  video: {
    category: 'Video',
    accentColor: '#DB2777',
    accentRgb: '219,39,119',
    items: [
      { id: 'brand-film', name: 'Brand Film / Company Profile', description: 'Company profile atau brand documentary berdurasi 1–5 menit.' },
      { id: 'product-video', name: 'Video Produk / Tutorial', description: 'Showcase produk dan tutorial cara penggunaan.' },
      { id: 'testimonial-video', name: 'Video Testimoni / Studi Kasus', description: 'Video testimoni klien dan cerita keberhasilan.' },
      { id: 'reels-tiktok', name: 'Reels / TikTok (Short-form)', description: 'Video short-form vertikal untuk platform social.' },
      { id: 'motion-standalone', name: 'Motion Graphics (Standalone)', description: 'Explainer dan video promosi yang sepenuhnya dianimasi.' },
    ],
  },
  copy: {
    category: 'Copy',
    accentColor: '#7C3AED',
    accentRgb: '124,58,237',
    items: [
      { id: 'ad-copy', name: 'Ad Copy (Google, Meta, TikTok)', description: 'Headline, deskripsi, dan CTA per platform. Varian A/B.' },
      { id: 'landing-page-copy', name: 'Landing Page Copy', description: 'Copy halaman berfokus CRO yang terstruktur untuk konversi maksimal.' },
      { id: 'email-copy', name: 'Email Campaign Copy', description: 'Subject line, body copy, dan CTA untuk kampanye email.' },
      { id: 'social-captions', name: 'Caption Social Media (bulanan)', description: 'Caption spesifik platform dengan hashtag dan CTA.' },
      { id: 'longform-content', name: 'Blog / Artikel Long-form', description: 'Blog post, thought leadership, dan artikel SEO.' },
    ],
  },
} as const

export const CREATIVE_ADDONS = [
  {
    id: 'product-photography',
    name: 'Fotografi Produk & Lifestyle',
    description: 'Fotografi produk dan lifestyle profesional. Studio atau on-location di Jakarta.',
  },
  {
    id: 'podcast-production',
    name: 'Produksi & Distribusi Podcast',
    description: 'Rekaman, editing, show notes, artwork, dan distribusi ke Spotify, Apple, dan Google Podcasts.',
  },
] as const

export const CREATIVE_ENGAGEMENT_TYPES = [
  {
    id: 'one-time',
    name: 'Proyek sekali jalan',
    description: 'Scope yang jelas dengan awal dan akhir. Cocok untuk: brand guidelines, brand film, peluncuran kampanye.',
  },
  {
    id: 'monthly-retainer',
    name: 'Retainer bulanan',
    description: 'Dukungan creative berkelanjutan dengan scope bulanan tetap. Cocok untuk: konten social, ad creative, copywriting.',
  },
  {
    id: 'not-sure',
    name: 'Belum tahu',
    description: 'Yuk ngobrol dulu tentang kebutuhanmu dan cari pengaturan terbaik.',
  },
] as const

export const CREATIVE_MODULES = [
  {
    id: 'graphic-design',
    title: 'Desain Grafis & Visual Branding',
    tagline: 'Visual identity yang membuat brandmu langsung dikenali.',
    description:
      'Dari template social media hingga brand guidelines lengkap, desainer kami membuat sistem visual kohesif yang bekerja di setiap touchpoint. Setiap aset dibangun dalam bahasa desainmu, tidak dari marketplace template.',
    accentColor: '#F59E0B',
    accentRgb: '245,158,11',
    deliverables: [
      { name: 'Template Social Media (IG feed, story, cover)', description: 'Feed post, story frame, cover design, dan highlight icon. Didesain sebagai sistem, bukan satu per satu, agar brandmu tetap konsisten bahkan saat kami tidak ada.' },
      { name: 'Banner Display Ads', description: 'Banner HTML5 dan statis untuk Google Display Network dan kampanye programmatic. Semua ukuran IAB standar termasuk.' },
      { name: 'Infografik', description: 'Data dan proses kompleks diubah jadi visual on-brand yang mudah dibagikan. Sempurna untuk thought leadership dan engagement social.' },
      { name: 'Key Visual Kampanye', description: 'Visual hero kampanye yang menentukan arah creative untuk peluncuran, promosi, dan push musiman. Diadaptasi di semua format.' },
      { name: 'Elemen Motion Graphic', description: 'Animasi logo, loading screen, animasi social media, dan micro-interaction yang menghidupkan brandmu.' },
      { name: 'Brand Guidelines', description: 'Buku brand komprehensif: penggunaan logo, palet warna, tipografi, gaya fotografi, tone of voice, dan contoh aplikasi.' },
    ],
  },
  {
    id: 'video-production',
    title: 'Produksi & Editing Video',
    tagline: 'Dari konsep hingga final cut: video yang menggerakkan orang dan menggerakkan angka.',
    description:
      'Produksi video full-service berbasis di Jakarta. Pengembangan konsep, scripting, syuting, editing, dan motion graphics. Dikirim dalam format multi-platform agar kamu dapat manfaat maksimal dari satu sesi syuting.',
    accentColor: '#DB2777',
    accentRgb: '219,39,119',
    deliverables: [
      { name: 'Pengembangan Konsep & Script', description: 'Konsep creative dan script yang menyeimbangkan brand storytelling dengan tujuan performa.' },
      { name: 'Syuting (Jakarta & sekitarnya)', description: 'Kru profesional, peralatan, dan koordinasi talent. On-location atau studio. Area Jabodetabek tercakup.' },
      { name: 'Editing Profesional', description: 'Color grading, sound design, pacing, dan struktur storytelling. Kami edit untuk rentang perhatian penonton.' },
      { name: 'Motion Graphics', description: 'Teks animasi, visualisasi data, animasi logo, dan sekuen explainer.' },
      { name: 'Format Multi-Platform (1:1, 9:16, 16:9)', description: 'Satu syuting, banyak output untuk feed, stories, reels, TikTok, dan YouTube.' },
      { name: 'Brand Film / Testimoni / Tutorial', description: 'Company profile, testimoni pelanggan, dan tutorial produk. Durasi 1–5 menit.' },
    ],
  },
  {
    id: 'copywriting',
    title: 'Copywriting & Penulisan Konten',
    tagline: 'Kata-kata yang menjual, dalam bahasa yang digunakan audiens kamu.',
    description:
      'Headline yang menghentikan scroll, landing page yang mengkonversi, dan ad copy yang mendapat klik. Ditulis secara native dalam Bahasa Indonesia oleh penulis yang memahami psikologi konsumen Indonesia.',
    accentColor: '#7C3AED',
    accentRgb: '124,58,237',
    deliverables: [
      { name: 'Ad Copy (Google, Meta, TikTok)', description: 'Headline, deskripsi, dan CTA yang dioptimasi per platform. Varian A/B sudah termasuk.' },
      { name: 'Landing Page Copy', description: 'Copy halaman berfokus CRO: hero headline, seksi benefit, social proof, FAQ, dan CTA.' },
      { name: 'Email Blast Copy', description: 'Subject line, preview text, body copy, dan CTA untuk email promosi dan nurturing.' },
      { name: 'Caption Social Media / bulan', description: 'Caption spesifik platform dengan hashtag strategis, CTA, dan brand voice.' },
      { name: 'Konten Long-form / Artikel', description: 'Blog post, thought leadership, dan artikel SEO. Bisa diintegrasikan dengan tim SEO kami.' },
    ],
  },
] as const

export const CREATIVE_PROCESS = [
  {
    step: 1,
    title: 'Creative Brief',
    timeline: 'Hari 1',
    description: 'Kami selaraskan tujuan, audiens, tone, deliverable, dan timeline. Kamu bagikan aset brand dan referensi. Kami ajukan pertanyaan yang menghemat ronde revisi ke depannya.',
    deliverable: 'Dokumen brief yang sudah ditandatangani',
    accentColor: '#7C3AED',
    side: 'center' as const,
  },
  {
    step: 2,
    title: 'Konsep & Moodboard',
    timeline: 'Hari 2–3',
    description: 'Kami presentasikan 2-3 arah creative: moodboard untuk desain, storyboard untuk video, draft angle untuk copy. Kamu pilih arah yang paling resonan.',
    deliverable: 'Arah creative yang disetujui',
    accentColor: '#DB2777',
    side: 'left' as const,
  },
  {
    step: 3,
    title: 'Produksi',
    timeline: 'Hari 3–7',
    description: 'Eksekusi penuh dari konsep yang disetujui. Desainer mendesain, videografer syuting, copywriter menulis. Semuanya dibangun dari nol sesuai spesifikasi brandmu.',
    deliverable: 'Draft pertama deliverable',
    accentColor: '#D97706',
    side: 'right' as const,
  },
  {
    step: 4,
    title: 'Review & Revisi',
    timeline: 'Hari 7–9',
    description: 'Kamu review hasilnya. Dua ronde revisi sudah termasuk. Feedback dikumpulkan dalam satu ronde per siklus agar prosesnya efisien.',
    deliverable: 'Aset final yang disetujui',
    accentColor: '#F59E0B',
    side: 'left' as const,
  },
  {
    step: 5,
    title: 'Pengiriman & Format',
    timeline: 'Hari 9–10',
    description: 'Aset final dikirim dalam semua format dan ukuran. Source file sudah termasuk. Diorganisir dalam folder bersama dengan konvensi penamaan yang jelas.',
    deliverable: 'Paket aset lengkap + source file',
    accentColor: '#A78BFA',
    side: 'right' as const,
  },
] as const

export const CREATIVE_FAQS = [
  {
    question: 'Format apa saja yang bisa kamu produksi?',
    answer: 'Kami mencakup grafis statis (semua format social, banner, cetak), video (reels/TikTok, brand film, tutorial, testimoni), motion graphics (animasi logo, explainer), dan konten tertulis (ad copy, landing page, artikel blog, email). Semuanya dalam format multi-platform.',
  },
  {
    question: 'Berapa lama waktu produksinya?',
    answer: 'Deliverable grafis: 3–5 hari kerja. Editing video sederhana: 5–7 hari. Brand film dengan syuting: 2–3 minggu. Copywriting: 2–3 hari untuk ad copy, 5–7 hari untuk long-form. Timeline rush tersedia dengan biaya tambahan.',
  },
  {
    question: 'Apakah revisi sudah termasuk?',
    answer: 'Ya: 2 ronde revisi per deliverable. Kumpulkan feedback dalam satu ronde, kami implementasikan, kamu konfirmasi. Kebanyakan proyek selesai dalam 1–2 ronde. Revisi tambahan tersedia jika dibutuhkan.',
  },
  {
    question: 'Apakah kamu syuting di luar Jakarta?',
    answer: 'Jabodetabek tercakup tanpa biaya tambahan. Di luar Jakarta, biaya transportasi dan akomodasi dikuotasi terpisah. Untuk pulau lain, kami bekerja dengan mitra produksi lokal di bawah arahan creative kami.',
  },
  {
    question: 'Apakah kami bisa memesan hanya copywriting tanpa desain?',
    answer: 'Tentu saja, setiap sub-layanan (Desain, Video, Copywriting) bekerja secara mandiri. Banyak klien mulai dari satu area dan berkembang seiring melihat hasilnya.',
  },
  {
    question: 'Apakah kamu memberikan source file?',
    answer: 'Ya. Semua final termasuk source file: PSD, AI, AE (untuk motion), DOCX, dan file editable. Kamu memiliki semua yang kami buat untukmu. Aset diorganisir dalam folder bersama dengan penamaan yang jelas.',
  },
  {
    question: 'Bagaimana retainer bulanan bekerja?',
    answer: 'Scope bulanan tetap dengan biaya yang bisa diprediksi. Biasanya mencakup sejumlah grafis social media, video short-form, dan deliverable copy per bulan. Waktu desainer yang dedicated dengan prioritas turnaround.',
  },
] as const

export const CREATIVE_STATS = [
  {
    value: '500+',
    label: 'Aset / Bulan',
    context: 'Total kapasitas produksi di semua klien. Proyekmu mendapat perhatian desainer yang dedicated, bukan antrian.',
  },
  {
    value: '2',
    label: 'Ronde Revisi',
    context: 'Sudah termasuk di setiap deliverable. Ronde tambahan tersedia. Kami pastikan hasilnya tepat dan cepat.',
  },
  {
    value: '3–5hr',
    label: 'Rata-rata Turnaround',
    context: 'Untuk deliverable grafis standar. Timeline video tergantung scope dan disepakati di awal.',
  },
] as const

// ─── English exports ─────────────────────────────────────────────────────────

export const CREATIVE_DELIVERABLES_EN = {
  design: {
    category: 'Design',
    accentColor: '#F59E0B',
    accentRgb: '245,158,11',
    items: [
      { id: 'social-templates', name: 'Social Media Templates (IG feed, story, cover)', description: 'Feed posts, story frames, cover designs, and highlight icons.' },
      { id: 'banner-ads', name: 'Banner / Display Ads', description: 'HTML5 and static banners for Google Display. All IAB sizes.' },
      { id: 'infographics', name: 'Infographics', description: 'Data and processes turned into shareable, on-brand visuals.' },
      { id: 'campaign-kv', name: 'Campaign Key Visuals', description: 'Hero visuals that set creative direction for launches and promotions.' },
      { id: 'motion-elements', name: 'Motion Graphic Elements', description: 'Animated logos, social animations, and micro-interactions.' },
      { id: 'brand-guidelines', name: 'Brand Guidelines (full brand book)', description: 'Logo, colors, typography, photography style, and tone of voice.' },
    ],
  },
  video: {
    category: 'Video',
    accentColor: '#DB2777',
    accentRgb: '219,39,119',
    items: [
      { id: 'brand-film', name: 'Brand Film / Company Profile', description: '1–5 minute company profile or brand documentary.' },
      { id: 'product-video', name: 'Product / Tutorial Video', description: 'Product showcases and how-to tutorials.' },
      { id: 'testimonial-video', name: 'Testimonial / Case Study Video', description: 'Client testimonials and success story videos.' },
      { id: 'reels-tiktok', name: 'Reels / TikTok (Short-form)', description: 'Vertical short-form video for social platforms.' },
      { id: 'motion-standalone', name: 'Motion Graphics (Standalone)', description: 'Fully animated explainers and promotional videos.' },
    ],
  },
  copy: {
    category: 'Copy',
    accentColor: '#7C3AED',
    accentRgb: '124,58,237',
    items: [
      { id: 'ad-copy', name: 'Ad Copy (Google, Meta, TikTok)', description: 'Headlines, descriptions, and CTAs per platform. A/B variants.' },
      { id: 'landing-page-copy', name: 'Landing Page Copy', description: 'CRO-focused page copy structured for maximum conversion.' },
      { id: 'email-copy', name: 'Email Campaign Copy', description: 'Subject lines, body copy, and CTAs for email campaigns.' },
      { id: 'social-captions', name: 'Social Media Captions (monthly)', description: 'Platform-specific captions with hashtags and CTAs.' },
      { id: 'longform-content', name: 'Blog / Long-form Articles', description: 'Blog posts, thought leadership, and SEO articles.' },
    ],
  },
} as const

export const CREATIVE_ADDONS_EN = [
  {
    id: 'product-photography',
    name: 'Product & Lifestyle Photography',
    description: 'Professional product and lifestyle photography. Studio or on-location in Jakarta.',
  },
  {
    id: 'podcast-production',
    name: 'Podcast Production & Distribution',
    description: 'Recording, editing, show notes, artwork, and distribution to Spotify, Apple, and Google Podcasts.',
  },
] as const

export const CREATIVE_ENGAGEMENT_TYPES_EN = [
  {
    id: 'one-time',
    name: 'One-time project',
    description: 'Defined scope with start and end. Best for: brand guidelines, brand films, campaign launches.',
  },
  {
    id: 'monthly-retainer',
    name: 'Monthly retainer',
    description: 'Ongoing creative support with fixed monthly scope. Best for: social content, ad creative, copywriting.',
  },
  {
    id: 'not-sure',
    name: 'Not sure yet',
    description: "Let's talk through your needs and find the best arrangement.",
  },
] as const

export const CREATIVE_MODULES_EN = [
  {
    id: 'graphic-design',
    title: 'Graphic Design & Visual Branding',
    tagline: 'Visual identity that makes your brand instantly recognizable.',
    description:
      "From social media templates to full brand guidelines, our designers create cohesive visual systems that work across every touchpoint. Every asset built in your design language, not pulled from a template marketplace.",
    accentColor: '#F59E0B',
    accentRgb: '245,158,11',
    deliverables: [
      { name: 'Social Media Templates (IG feed, story, cover)', description: "Feed posts, story frames, cover designs, and highlight icons. Designed as systems, not one-offs, so your brand stays consistent even when we're not around." },
      { name: 'Banner Display Ads', description: 'HTML5 and static banners for Google Display Network and programmatic campaigns. All standard IAB sizes included.' },
      { name: 'Infographics', description: 'Complex data and processes turned into shareable, on-brand visuals. Perfect for thought leadership and social engagement.' },
      { name: 'Campaign Key Visuals', description: 'Campaign hero visuals that set the creative direction for launches, promotions, and seasonal pushes. Adapted across all formats.' },
      { name: 'Motion Graphic Elements', description: 'Animated logos, loading screens, social media animations, and micro-interactions that bring your brand to life.' },
      { name: 'Brand Guidelines', description: 'Comprehensive brand book: logo usage, color palette, typography, photography style, tone of voice, and application examples.' },
    ],
  },
  {
    id: 'video-production',
    title: 'Video Production & Editing',
    tagline: 'From concept to final cut: video that moves people and moves metrics.',
    description:
      'Full-service video production based in Jakarta. Concept development, scripting, shooting, editing, and motion graphics. Delivered in multi-platform formats so you get maximum mileage from a single shoot.',
    accentColor: '#DB2777',
    accentRgb: '219,39,119',
    deliverables: [
      { name: 'Concept & Script Development', description: 'Creative concepts and scripts that balance brand storytelling with performance goals.' },
      { name: 'Shooting (Jakarta & surroundings)', description: 'Professional crew, equipment, and talent coordination. On-location or studio. Jabodetabek area covered.' },
      { name: 'Professional Editing', description: 'Color grading, sound design, pacing, and storytelling structure. We edit for attention spans.' },
      { name: 'Motion Graphics', description: 'Animated text, data visualizations, logo animations, and explainer sequences.' },
      { name: 'Multi-Platform Formats (1:1, 9:16, 16:9)', description: 'One shoot, multiple outputs for feed, stories, reels, TikTok, and YouTube.' },
      { name: 'Brand Film / Testimonial / Tutorial', description: 'Company profiles, customer testimonials, and product tutorials. 1–5 minutes.' },
    ],
  },
  {
    id: 'copywriting',
    title: 'Copywriting & Content Writing',
    tagline: 'Words that sell, in the language your audience speaks.',
    description:
      'Headlines that stop the scroll, landing pages that convert, and ad copy that earns clicks. Written natively in Bahasa Indonesia by writers who understand Indonesian consumer psychology.',
    accentColor: '#7C3AED',
    accentRgb: '124,58,237',
    deliverables: [
      { name: 'Ad Copy (Google, Meta, TikTok)', description: 'Headlines, descriptions, and CTAs optimized per platform. A/B variants included.' },
      { name: 'Landing Page Copy', description: 'CRO-focused page copy: hero headlines, benefit sections, social proof, FAQs, and CTAs.' },
      { name: 'Email Blast Copy', description: 'Subject lines, preview text, body copy, and CTAs for promotional and nurture emails.' },
      { name: 'Social Media Captions / month', description: 'Platform-specific captions with strategic hashtags, CTAs, and brand voice.' },
      { name: 'Long-form Content / Articles', description: 'Blog posts, thought leadership, and SEO articles. Can integrate with our SEO team.' },
    ],
  },
] as const

export const CREATIVE_PROCESS_EN = [
  {
    step: 1,
    title: 'Creative Brief',
    timeline: 'Day 1',
    description: 'We align on objectives, audience, tone, deliverables, and timelines. You share brand assets and references. We ask the questions that save revision rounds later.',
    deliverable: 'Signed brief document',
    accentColor: '#7C3AED',
    side: 'center' as const,
  },
  {
    step: 2,
    title: 'Concept & Moodboard',
    timeline: 'Day 2–3',
    description: 'We present 2-3 creative directions: moodboards for design, storyboards for video, draft angles for copy. You pick the direction that resonates.',
    deliverable: 'Approved creative direction',
    accentColor: '#DB2777',
    side: 'left' as const,
  },
  {
    step: 3,
    title: 'Production',
    timeline: 'Day 3–7',
    description: 'Full execution of the approved concept. Designers design, videographers shoot, copywriters write. Everything built from scratch to your brand specifications.',
    deliverable: 'First draft deliverables',
    accentColor: '#D97706',
    side: 'right' as const,
  },
  {
    step: 4,
    title: 'Review & Revisions',
    timeline: 'Day 7–9',
    description: 'You review the work. Two revision rounds are included. Feedback collected in one round per cycle to keep things efficient.',
    deliverable: 'Final approved assets',
    accentColor: '#F59E0B',
    side: 'left' as const,
  },
  {
    step: 5,
    title: 'Delivery & Formats',
    timeline: 'Day 9–10',
    description: 'Final assets delivered in all formats and sizes. Source files included. Organized in shared folders with clear naming conventions.',
    deliverable: 'Complete asset package + source files',
    accentColor: '#A78BFA',
    side: 'right' as const,
  },
] as const

export const CREATIVE_FAQS_EN = [
  {
    question: 'What formats can you produce?',
    answer: 'We cover static graphics (all social formats, banners, print), video (reels/TikTok, brand films, tutorials, testimonials), motion graphics (animated logos, explainers), and written content (ad copy, landing pages, blog articles, email). Everything in multi-platform formats.',
  },
  {
    question: 'How long does production take?',
    answer: 'Graphic deliverables: 3–5 business days. Simple video edits: 5–7 days. Brand films with shooting: 2–3 weeks. Copywriting: 2–3 days for ad copy, 5–7 days for long-form. Rush timelines available at an additional fee.',
  },
  {
    question: 'Are revisions included?',
    answer: 'Yes: 2 revision rounds per deliverable. Consolidate feedback into one round, we implement, you confirm. Most projects finalize in 1–2 rounds. Additional revisions available if needed.',
  },
  {
    question: 'Do you shoot outside Jakarta?',
    answer: 'Jabodetabek is covered at no extra cost. Outside Jakarta, travel and accommodation quoted separately. For other islands, we work with local production partners under our creative direction.',
  },
  {
    question: 'Can we get just copywriting without design?',
    answer: 'Absolutely, each sub-service (Design, Video, Copywriting) works independently. Many clients start with one area and expand as they see results.',
  },
  {
    question: 'Do you provide source files?',
    answer: 'Yes. All finals include source files: PSD, AI, AE (for motion), DOCX, and editables. You own everything we create for you. Assets organized in shared folders with clear naming.',
  },
  {
    question: 'How does a monthly retainer work?',
    answer: 'Fixed monthly scope at predictable cost. Typically includes a set number of social media graphics, short-form videos, and copy deliverables per month. Dedicated designer time with priority turnaround.',
  },
] as const

export const CREATIVE_STATS_EN = [
  {
    value: '500+',
    label: 'Assets / Month',
    context: 'Total production capacity across all clients. Your project gets dedicated designer attention, not a queue.',
  },
  {
    value: '2',
    label: 'Revision Rounds',
    context: 'Included in every deliverable. Additional rounds available. We get it right, fast.',
  },
  {
    value: '3–5d',
    label: 'Avg. Turnaround',
    context: 'For standard graphic deliverables. Video timelines depend on scope and are agreed upfront.',
  },
] as const
