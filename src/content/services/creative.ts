// Desain Grafis & Video (BUILD §3.4). The X / X_EN exports are the vetted legacy copy, kept verbatim; the
// default export maps them into ServiceContent ('modules' pricing + the QuoteBuilder copy).
import type { Locale } from '@/lib/services'
import { liveDoc } from '@/cms/store'
import type { BuilderGroup, ServiceContent } from './types'

export const CREATIVE_DELIVERABLES = {
  design: {
    category: 'Design',
    accentColor: '#F5A623',
    accentRgb: '245,166,35',
    items: [
      { id: 'social-templates', name: 'Template Social Media (IG feed, story, cover)', description: 'Feed post, story frame, cover design, dan highlight icon.' },
      { id: 'banner-ads', name: 'Banner / Display Ads', description: 'Banner HTML5 dan statis untuk Google Display. Semua ukuran IAB.' },
      { id: 'infographics', name: 'Infografik', description: 'Data dan proses diubah menjadi visual on-brand yang mudah dibagikan.' },
      { id: 'campaign-kv', name: 'Key Visual Kampanye', description: 'Visual hero yang menentukan arah creative untuk peluncuran dan promosi.' },
      { id: 'motion-elements', name: 'Elemen Motion Graphic', description: 'Animasi logo, animasi social, dan micro-interaction.' },
      { id: 'brand-guidelines', name: 'Brand Guidelines (buku brand lengkap)', description: 'Logo, warna, tipografi, gaya fotografi, dan tone of voice.' },
    ],
  },
  video: {
    category: 'Video',
    accentColor: '#D81C5C',
    accentRgb: '216,28,92',
    items: [
      { id: 'brand-film', name: 'Brand Film / Company Profile', description: 'Company profile atau brand documentary berdurasi 1–5 menit.' },
      { id: 'product-video', name: 'Video Produk / Tutorial', description: 'Showcase produk dan tutorial cara penggunaan.' },
      { id: 'testimonial-video', name: 'Video Testimoni / Studi Kasus', description: 'Video testimoni klien dan cerita keberhasilan.' },
      { id: 'reels-tiktok', name: 'Reels / TikTok (Short-form)', description: 'Video short-form vertikal untuk platform social.' },
      { id: 'motion-standalone', name: 'Motion Graphics (Standalone)', description: 'Explainer dan video promosi beranimasi penuh.' },
    ],
  },
  copy: {
    category: 'Copy',
    accentColor: '#A855F7',
    accentRgb: '168,85,247',
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
    description: 'Mari diskusikan kebutuhan Anda dan temukan model kerja sama yang paling tepat.',
  },
] as const

export const CREATIVE_MODULES = [
  {
    id: 'graphic-design',
    title: 'Desain Grafis & Visual Branding',
    tagline: 'Visual identity yang membuat brand Anda langsung dikenali.',
    description:
      'Dari template social media hingga brand guidelines lengkap, desainer kami membangun sistem visual yang kohesif dan bekerja di setiap touchpoint. Setiap aset dibuat dalam bahasa desain Anda, bukan dari marketplace template.',
    accentColor: '#F5A623',
    accentRgb: '245,166,35',
    deliverables: [
      { name: 'Template Social Media (IG feed, story, cover)', description: 'Feed post, story frame, cover design, dan highlight icon. Didesain sebagai sistem, bukan satu per satu, agar brand Anda tetap konsisten bahkan tanpa kehadiran kami.' },
      { name: 'Banner Display Ads', description: 'Banner HTML5 dan statis untuk Google Display Network dan kampanye programmatic. Semua ukuran IAB standar termasuk.' },
      { name: 'Infografik', description: 'Data dan proses kompleks diubah menjadi visual on-brand yang mudah dibagikan. Ideal untuk thought leadership dan engagement social.' },
      { name: 'Key Visual Kampanye', description: 'Visual hero kampanye yang menentukan arah creative untuk peluncuran, promosi, dan push musiman. Diadaptasi di semua format.' },
      { name: 'Elemen Motion Graphic', description: 'Animasi logo, loading screen, animasi social media, dan micro-interaction yang menghidupkan brand Anda.' },
      { name: 'Brand Guidelines', description: 'Buku brand komprehensif: penggunaan logo, palet warna, tipografi, gaya fotografi, tone of voice, dan contoh aplikasi.' },
    ],
  },
  {
    id: 'video-production',
    title: 'Produksi & Editing Video',
    tagline: 'Dari konsep hingga final cut: video yang menggerakkan orang dan menggerakkan angka.',
    description:
      'Produksi video full-service berbasis di Jakarta. Pengembangan konsep, scripting, syuting, editing, dan motion graphics. Dikirim dalam format multi-platform agar Anda mendapat manfaat maksimal dari satu sesi syuting.',
    accentColor: '#D81C5C',
    accentRgb: '216,28,92',
    deliverables: [
      { name: 'Pengembangan Konsep & Script', description: 'Konsep creative dan script yang menyeimbangkan brand storytelling dengan tujuan performa.' },
      { name: 'Syuting (Jakarta & sekitarnya)', description: 'Kru profesional, peralatan, dan koordinasi talent. On-location atau studio. Area Jabodetabek tercakup.' },
      { name: 'Editing Profesional', description: 'Color grading, sound design, pacing, dan struktur storytelling. Kami mengedit dengan memperhitungkan rentang perhatian penonton.' },
      { name: 'Motion Graphics', description: 'Teks animasi, visualisasi data, animasi logo, dan sekuen explainer.' },
      { name: 'Format Multi-Platform (1:1, 9:16, 16:9)', description: 'Satu syuting, banyak output untuk feed, stories, reels, TikTok, dan YouTube.' },
      { name: 'Brand Film / Testimoni / Tutorial', description: 'Company profile, testimoni pelanggan, dan tutorial produk. Durasi 1–5 menit.' },
    ],
  },
  {
    id: 'copywriting',
    title: 'Copywriting & Penulisan Konten',
    tagline: 'Kata-kata yang menjual, dalam bahasa yang digunakan audiens Anda.',
    description:
      'Headline yang scroll-stopping, landing page yang mengonversi, dan ad copy yang mengundang klik. Ditulis langsung dalam Bahasa Indonesia oleh penulis yang memahami psikologi konsumen Indonesia.',
    accentColor: '#A855F7',
    accentRgb: '168,85,247',
    deliverables: [
      { name: 'Ad Copy (Google, Meta, TikTok)', description: 'Headline, deskripsi, dan CTA yang dioptimasi per platform. Varian A/B sudah termasuk.' },
      { name: 'Landing Page Copy', description: 'Copy halaman berfokus CRO: hero headline, bagian benefit, social proof, FAQ, dan CTA.' },
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
    description: 'Kami selaraskan tujuan, audiens, tone, deliverable, dan timeline. Anda membagikan aset brand dan referensi. Kami ajukan pertanyaan yang menghemat ronde revisi ke depan.',
    deliverable: 'Dokumen brief yang sudah ditandatangani',
    accentColor: '#A855F7',
    side: 'center' as const,
  },
  {
    step: 2,
    title: 'Konsep & Moodboard',
    timeline: 'Hari 2–3',
    description: 'Kami presentasikan 2-3 arah creative: moodboard untuk desain, storyboard untuk video, draft angle untuk copy. Anda memilih arah yang paling sesuai.',
    deliverable: 'Arah creative yang disetujui',
    accentColor: '#D81C5C',
    side: 'left' as const,
  },
  {
    step: 3,
    title: 'Produksi',
    timeline: 'Hari 3–7',
    description: 'Eksekusi penuh dari konsep yang disetujui. Desainer mendesain, videografer syuting, copywriter menulis. Semuanya dibangun dari nol sesuai spesifikasi brand Anda.',
    deliverable: 'Draft pertama deliverable',
    accentColor: '#F88438',
    side: 'right' as const,
  },
  {
    step: 4,
    title: 'Review & Revisi',
    timeline: 'Hari 7–9',
    description: 'Anda meninjau hasilnya. Dua ronde revisi sudah termasuk. Feedback dikumpulkan dalam satu ronde per siklus agar prosesnya efisien.',
    deliverable: 'Aset final yang disetujui',
    accentColor: '#F5A623',
    side: 'left' as const,
  },
  {
    step: 5,
    title: 'Pengiriman & Format',
    timeline: 'Hari 9–10',
    description: 'Aset final dikirim dalam semua format dan ukuran. Source file sudah termasuk. Diorganisir dalam folder bersama dengan konvensi penamaan yang jelas.',
    deliverable: 'Paket aset lengkap + source file',
    accentColor: '#C084FC',
    side: 'right' as const,
  },
] as const

export const CREATIVE_FAQS = [
  {
    question: 'Format apa saja yang bisa Anda produksi?',
    answer: 'Kami mencakup grafis statis (semua format social, banner, cetak), video (reels/TikTok, brand film, tutorial, testimoni), motion graphics (animasi logo, explainer), dan konten tertulis (ad copy, landing page, artikel blog, email). Semuanya dalam format multi-platform.',
  },
  {
    question: 'Berapa lama waktu produksinya?',
    answer: 'Deliverable grafis: 3–5 hari kerja. Editing video sederhana: 5–7 hari. Brand film dengan syuting: 2–3 minggu. Copywriting: 2–3 hari untuk ad copy, 5–7 hari untuk long-form. Timeline rush tersedia dengan biaya tambahan.',
  },
  {
    question: 'Apakah revisi sudah termasuk?',
    answer: 'Ya: 2 ronde revisi per deliverable. Kumpulkan feedback dalam satu ronde, kami implementasikan, lalu Anda konfirmasi. Kebanyakan proyek selesai dalam 1–2 ronde. Revisi tambahan tersedia jika dibutuhkan.',
  },
  {
    question: 'Apakah Anda syuting di luar Jakarta?',
    answer: 'Jabodetabek tercakup tanpa biaya tambahan. Di luar Jakarta, biaya transportasi dan akomodasi dikuotasi terpisah. Untuk pulau lain, kami bekerja dengan mitra produksi lokal di bawah arahan creative kami.',
  },
  {
    question: 'Apakah kami bisa memesan hanya copywriting tanpa desain?',
    answer: 'Tentu saja, setiap sub-layanan (Desain, Video, Copywriting) bekerja secara mandiri. Banyak klien mulai dari satu area dan berkembang seiring melihat hasilnya.',
  },
  {
    question: 'Apakah Anda memberikan source file?',
    answer: 'Ya. Semua final termasuk source file: PSD, AI, AE (untuk motion), DOCX, dan file editable. Anda memiliki semua yang kami buat untuk Anda. Aset diorganisir dalam folder bersama dengan penamaan yang jelas.',
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
    context: 'Total kapasitas produksi di semua klien. Proyek Anda mendapat perhatian desainer yang dedicated, bukan sekadar antrian.',
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
    accentColor: '#F5A623',
    accentRgb: '245,166,35',
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
    accentColor: '#D81C5C',
    accentRgb: '216,28,92',
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
    accentColor: '#A855F7',
    accentRgb: '168,85,247',
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
    accentColor: '#F5A623',
    accentRgb: '245,166,35',
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
    accentColor: '#D81C5C',
    accentRgb: '216,28,92',
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
    accentColor: '#A855F7',
    accentRgb: '168,85,247',
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
    accentColor: '#A855F7',
    side: 'center' as const,
  },
  {
    step: 2,
    title: 'Concept & Moodboard',
    timeline: 'Day 2–3',
    description: 'We present 2-3 creative directions: moodboards for design, storyboards for video, draft angles for copy. You pick the direction that resonates.',
    deliverable: 'Approved creative direction',
    accentColor: '#D81C5C',
    side: 'left' as const,
  },
  {
    step: 3,
    title: 'Production',
    timeline: 'Day 3–7',
    description: 'Full execution of the approved concept. Designers design, videographers shoot, copywriters write. Everything built from scratch to your brand specifications.',
    deliverable: 'First draft deliverables',
    accentColor: '#F88438',
    side: 'right' as const,
  },
  {
    step: 4,
    title: 'Review & Revisions',
    timeline: 'Day 7–9',
    description: 'You review the work. Two revision rounds are included. Feedback collected in one round per cycle to keep things efficient.',
    deliverable: 'Final approved assets',
    accentColor: '#F5A623',
    side: 'left' as const,
  },
  {
    step: 5,
    title: 'Delivery & Formats',
    timeline: 'Day 9–10',
    description: 'Final assets delivered in all formats and sizes. Source files included. Organized in shared folders with clear naming conventions.',
    deliverable: 'Complete asset package + source files',
    accentColor: '#C084FC',
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

// ─── ServiceContent (redesign) ───────────────────────────────────────────────
// Dropped from the legacy copy (unverified): "500+ aset/bulan" and "Banyak klien mulai dari satu area". No
// module price exists, so every module shows the per-project quote line and the builder shows no total.
// Module cards carry no deliverable list: the builder below lists every deliverable as SSR text already.

const GUIDE = 'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide'
type Deliv = typeof CREATIVE_DELIVERABLES | typeof CREATIVE_DELIVERABLES_EN
const groups = (d: Deliv, addons: typeof CREATIVE_ADDONS | typeof CREATIVE_ADDONS_EN, types: typeof CREATIVE_ENGAGEMENT_TYPES | typeof CREATIVE_ENGAGEMENT_TYPES_EN, l: Locale): BuilderGroup[] => [
  { id: 'design', label: l === 'id' ? 'Desain' : 'Design', items: d.design.items.map((i) => ({ id: i.id, label: i.name })) },
  { id: 'video', label: 'Video', items: d.video.items.map((i) => ({ id: i.id, label: i.name })) },
  { id: 'copy', label: 'Copy', items: d.copy.items.map((i) => ({ id: i.id, label: i.name })) },
  { id: 'addons', label: 'Add-on', items: addons.map((a) => ({ id: a.id, label: a.name })) },
  { id: 'type', label: l === 'id' ? 'Tipe kerja sama' : 'Engagement type', multi: false, items: types.map((t) => ({ id: t.id, label: t.name })) },
]

// Rich page (owner 2026-10-05, benchmarked on the live page; the SEO page's pattern): the three studios as the USP,
// every deliverable as tabs (the film's scope: design, video, copy), no comparison panel, the homepage process.
// The dropped asset counter above stays out: the stats band uses the FAQ's own numbers.
const studios = (ms: typeof CREATIVE_MODULES | typeof CREATIVE_MODULES_EN) =>
  ms.map((m) => ({ title: m.title, text: m.tagline, points: m.deliverables.slice(0, 4).map((d) => d.name) }))
const tabsOf = (d: Deliv, labels: [string, string, string]) =>
  (['design', 'video', 'copy'] as const).map((k, i) => ({ label: labels[i], items: d[k].items.map((x) => ({ title: x.name, text: x.description })) }))

const id: ServiceContent = {
  answer: 'Jasa desain grafis dan video Logink membuat template social media, banner iklan, key visual, video, foto produk, dan copywriting Bahasa Indonesia. Setiap deliverable mendapat 2 ronde revisi, dan semua source file menjadi milik Anda.',
  campaign: {
    fedBy: [
      { k: 'strategy', text: 'Brief kreatif berangkat dari satu ide kampanye yang dipakai semua kanal.' },
    ],
    feeds: [
      { k: 'social', text: 'Satu sesi syuting menghasilkan feed, story, Reels, dan TikTok dalam format yang tepat.' },
      { k: 'ads', text: 'Banner, video, dan copy iklan dibuat khusus per platform, dengan varian untuk diuji.' },
      { k: 'website', text: 'Copy landing page dan key visual kampanye menjaga halaman selaras dengan iklan yang mengantar pengunjung.' },
      { k: 'localseo', text: 'Foto produk dan lokasi mengisi profil Google Business.' },
    ],
  },
  work: [
    { title: 'Desain Grafis', text: 'Template social, banner, key visual, sampai brand guidelines.', card: 'IgGrid' },
    { title: 'Edit & Produksi Video', text: 'Satu sesi syuting, dipotong ke format 1:1, 9:16, dan 16:9.' },
    { title: 'Foto Produk', text: 'Studio atau on-location di Jakarta, sebagai add-on.' },
    { title: 'Copywriting', text: 'Ad copy, landing page, caption, dan artikel Bahasa Indonesia.' },
  ],
  pricing: {
    kind: 'modules',
    builder: 'creative',
    modules: CREATIVE_MODULES.map((m) => ({ id: m.id, title: m.title, text: m.tagline, items: [], price: 'Per proyek atau retainer' })),
    addons: CREATIVE_ADDONS.map((a) => ({ name: a.name, text: a.description })),
    copy: {
      heading: 'Susun brief kreatif Anda',
      intro: 'Centang deliverable yang Anda butuhkan, pilih tipe kerja sama, lalu kirim lewat WhatsApp.',
      empty: 'Pilih deliverable di atas untuk menyusun brief kreatif Anda.',
      summary: 'Pesan yang akan terkirim',
      price: 'Tanpa komitmen. Tidak ada total di sini: harga dihitung dari scope Anda.',
      groups: groups(CREATIVE_DELIVERABLES, CREATIVE_ADDONS, CREATIVE_ENGAGEMENT_TYPES, 'id'),
    },
  },
  compare: null,
  trust: ['Desain kustom, bukan template', '2 ronde revisi per deliverable', 'Source file milik Anda'],
  highlights: {
    items: [
      { value: '2', label: 'ronde revisi sudah termasuk di setiap deliverable' },
      { value: '3–5', label: 'hari kerja untuk deliverable grafis standar' },
      { value: '3', label: 'studio: desain, video, dan copywriting' },
    ],
    note: 'Timeline video tergantung scope dan disepakati di awal.',
  },
  usp: {
    heading: 'Tiga studio, satu tim kreatif',
    accent: 2,
    lead: 'Desain, video, dan copy dibuat kustom untuk brand Anda, tanpa template dan tanpa stok, supaya brand Anda mudah diingat.',
    cards: studios(CREATIVE_MODULES),
  },
  included: {
    heading: 'Semua yang bisa kami buat',
    lead: 'Pilih satu deliverable atau gabungkan beberapa. Semuanya mengikuti brand guideline yang sama.',
    tabs: tabsOf(CREATIVE_DELIVERABLES, ['Desain', 'Video', 'Copy']),
  },
  process: true,
  stats: [
    { text: 'Menambahkan statistik, kutipan, dan sumber di dalam teks menaikkan visibilitas di mesin generatif hingga 40% (studi lab)', src: 'Aggarwal dkk., KDD', year: 2024, url: 'https://arxiv.org/abs/2311.09735' },
    { text: 'Sebutan di YouTube adalah sinyal terkuat visibilitas brand di AI (korelasi 0,737; 75.000 brand)', src: 'Ahrefs via BusinessWire', year: 2026, url: 'https://www.businesswire.com/news/home/20260526119691/en/Across-75000-Brands-YouTube-Mentions-Are-the-Strongest-Signal-of-AI-Visibility-New-Ahrefs-Report-Reveals' },
    { text: 'Panduan Google untuk AI search: buat konten yang tidak generik, dengan sudut pandang yang nyata', src: 'Google Search Central', year: 2026, url: GUIDE },
  ],
  ai: 'Copy yang menjawab langsung dan video yang menyebut nama brand Anda memberi Google AI Overview dan ChatGPT bahan yang jelas untuk dikutip. Kami tidak menjamin kutipan.',
  faq: [
    { q: 'Berapa lama waktu produksinya?', a: 'Deliverable grafis 3 sampai 5 hari kerja, editing video sederhana 5 sampai 7 hari, dan brand film dengan syuting 2 sampai 3 minggu. Ad copy selesai dalam 2 sampai 3 hari dan konten long-form 5 sampai 7 hari. Timeline rush tersedia dengan biaya tambahan.' },
    { q: 'Apakah revisi sudah termasuk?', a: 'Ya, 2 ronde revisi per deliverable sudah termasuk. Kumpulkan feedback dalam satu ronde, kami terapkan, lalu Anda konfirmasi. Sebagian besar proyek selesai dalam satu atau dua ronde, dan revisi tambahan tersedia bila dibutuhkan.' },
    { q: 'Apakah Anda syuting di luar Jakarta?', a: 'Ya. Jabodetabek tercakup tanpa biaya tambahan. Di luar Jakarta, biaya transportasi dan akomodasi dihitung terpisah dalam penawaran. Untuk pulau lain, kami bekerja dengan mitra produksi lokal di bawah arahan kreatif tim kami.' },
    { q: 'Apakah kami bisa memesan hanya copywriting tanpa desain?', a: 'Bisa. Setiap area, yaitu desain, video, dan copywriting, bisa diambil sendiri. Anda juga bisa memulai dari satu area lalu menambah yang lain kapan saja, dan semua deliverable tetap mengikuti brand guideline yang sama.' },
    { q: 'Apakah Anda memberikan source file?', a: 'Ya. Semua hasil final disertai source file seperti PSD, AI, AE untuk motion, dan DOCX, sehingga Anda memiliki semua yang kami buat untuk Anda. Aset diserahkan dalam folder bersama dengan penamaan yang jelas.' },
    { q: 'Bagaimana retainer bulanan bekerja?', a: 'Retainer adalah scope bulanan tetap dengan biaya yang bisa diprediksi. Biasanya isinya sejumlah grafis social media, video short-form, dan deliverable copy per bulan, dikerjakan desainer yang dedicated dengan prioritas waktu pengerjaan.' },
  ],
  sources: [
    { label: 'Aggarwal dkk.: GEO, Generative Engine Optimization (KDD 2024)', url: 'https://arxiv.org/abs/2311.09735' },
  ],
}

const en: ServiceContent = {
  answer: "Logink's graphic design and video service makes social media templates, ad banners, key visuals, video, product photos and Bahasa Indonesia copywriting. Every deliverable gets 2 revision rounds, and every source file is yours.",
  campaign: {
    fedBy: [
      { k: 'strategy', text: 'The creative brief starts from one campaign idea that every channel uses.' },
    ],
    feeds: [
      { k: 'social', text: 'One shoot produces feed posts, stories, Reels and TikToks in the right formats.' },
      { k: 'ads', text: 'Banners, video and ad copy are made for each platform, with variants to test.' },
      { k: 'website', text: 'Landing page copy and the campaign key visual keep the page in line with the ads that bring visitors.' },
      { k: 'localseo', text: 'Product and location photos fill your Google Business Profile.' },
    ],
  },
  work: [
    { title: 'Graphic Design', text: 'Social templates, banners, key visuals, up to brand guidelines.', card: 'IgGrid' },
    { title: 'Video Editing & Production', text: 'One shoot, cut to 1:1, 9:16 and 16:9.' },
    { title: 'Product Photography', text: 'In the studio or on location in Jakarta, as an add-on.' },
    { title: 'Copywriting', text: 'Ad copy, landing pages, captions and articles in Bahasa Indonesia.' },
  ],
  pricing: {
    kind: 'modules',
    builder: 'creative',
    modules: CREATIVE_MODULES_EN.map((m) => ({ id: m.id, title: m.title, text: m.tagline, items: [], price: 'Per project or retainer' })),
    addons: CREATIVE_ADDONS_EN.map((a) => ({ name: a.name, text: a.description })),
    copy: {
      heading: 'Build your creative brief',
      intro: 'Tick the deliverables you need, choose an engagement type, then send it on WhatsApp.',
      empty: 'Select deliverables above to build your creative brief.',
      summary: 'The message you will send',
      price: 'No commitment. There is no total here: the price is worked out from your scope.',
      groups: groups(CREATIVE_DELIVERABLES_EN, CREATIVE_ADDONS_EN, CREATIVE_ENGAGEMENT_TYPES_EN, 'en'),
    },
  },
  compare: null,
  trust: ['Custom design, not templates', '2 revision rounds per deliverable', 'The source files are yours'],
  highlights: {
    items: [
      { value: '2', label: 'revision rounds included in every deliverable' },
      { value: '3–5', label: 'working days for standard graphic deliverables' },
      { value: '3', label: 'studios: design, video and copywriting' },
    ],
    note: 'Video timelines depend on the scope and are agreed at the start.',
  },
  usp: {
    heading: 'Three studios, one creative team',
    accent: 3,
    lead: 'Design, video and copy made for your brand, with no templates and no stock, so your brand is easy to remember.',
    cards: studios(CREATIVE_MODULES_EN),
  },
  included: {
    heading: 'Everything we can make',
    lead: 'Pick one deliverable or combine several. All of it follows the same brand guideline.',
    tabs: tabsOf(CREATIVE_DELIVERABLES_EN, ['Design', 'Video', 'Copy']),
  },
  process: true,
  stats: [
    { text: 'Adding statistics, quotations and sources to a text raised visibility in generative engines by up to 40% (lab study)', src: 'Aggarwal et al., KDD', year: 2024, url: 'https://arxiv.org/abs/2311.09735' },
    { text: 'YouTube mentions are the strongest signal of brand visibility in AI (correlation 0.737; 75,000 brands)', src: 'Ahrefs via BusinessWire', year: 2026, url: 'https://www.businesswire.com/news/home/20260526119691/en/Across-75000-Brands-YouTube-Mentions-Are-the-Strongest-Signal-of-AI-Visibility-New-Ahrefs-Report-Reveals' },
    { text: "Google's guide to AI search: make non-commodity content with a real point of view", src: 'Google Search Central', year: 2026, url: GUIDE },
  ],
  ai: 'Answer-first copy and videos that name your brand give Google AI Overviews and ChatGPT clear material to cite. We do not guarantee citations.',
  faq: [
    { q: 'How long does production take?', a: 'Graphic deliverables take 3 to 5 business days, simple video edits 5 to 7 days, and a brand film with a shoot 2 to 3 weeks. Ad copy takes 2 to 3 days and long-form content 5 to 7 days. Rush timelines are available at an extra cost.' },
    { q: 'Are revisions included?', a: 'Yes, 2 revision rounds per deliverable are included. Collect your feedback in one round, we implement it, and you confirm. Most projects are done in one or two rounds, and extra revisions are available if needed.' },
    { q: 'Do you shoot outside Jakarta?', a: 'Yes. Greater Jakarta is covered at no extra cost. Outside Jakarta, travel and accommodation are quoted separately. For other islands we work with local production partners under our creative direction.' },
    { q: 'Can we order only copywriting without design?', a: 'Yes. Each area, design, video and copywriting, can be hired on its own. You can also start with one area and add the others any time, and every deliverable follows the same brand guidelines.' },
    { q: 'Do you provide source files?', a: 'Yes. All finals include the source files, such as PSD, AI, AE for motion and DOCX, so you own everything we create for you. Assets are delivered in a shared folder with clear naming.' },
    { q: 'How does a monthly retainer work?', a: 'A retainer is a fixed monthly scope at a predictable cost. It usually covers a set number of social graphics, short-form videos and copy deliverables per month, handled by a dedicated designer with priority turnaround.' },
  ],
  sources: [
    { label: 'Aggarwal et al.: GEO, Generative Engine Optimization (KDD 2024)', url: 'https://arxiv.org/abs/2311.09735' },
  ],
}

export default liveDoc('service-pages', 'creative', 'content', { id, en } satisfies Record<Locale, ServiceContent>)
