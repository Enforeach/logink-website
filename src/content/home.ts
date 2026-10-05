// Home copy (BUILD §3.7 / §11, reshaped by the owner 2026-10-03/04: six sections, each message once, about half
// the text: hero → services → Kampanye 360° → proses → proof → FAQ, then the layout's closing band). Plain data, no JSX.
// Gated phrases ship their fallback while CAMPAIGN_CONFIRMED is false (§3.6); `gated()` picks.
import type { L, SvcKey } from '@/lib/services'
import { CAMPAIGN_CONFIRMED, gated } from '@/content/campaign'

const K14 = CAMPAIGN_CONFIRMED.K1 && CAMPAIGN_CONFIRMED.K4

// 01 Hero: the registry H1 split into FrontPageTitle lines (textContent === h1), one sentence, 2 CTAs, over the hero loop.
// ENTITY stays verbatim in the footer and orgNode.
export const HERO = {
  kicker: { id: 'Agensi Digital Marketing 360° di Jakarta:', en: '360° Digital Marketing Agency in Jakarta:' } as L,
  lines: [
    { text: { id: 'Ditemukan.', en: 'Found.' } as L },
    { text: { id: 'Dipercaya.', en: 'Trusted.' } as L },
    { text: { id: 'Dikutip AI.', en: 'Cited by AI.' } as L, wide: true },
    { text: { id: 'Dihubungi.', en: 'Contacted.' } as L },
  ],
  sentence: {
    id: 'Logink membantu UMKM dan brand yang bertumbuh di Indonesia mendapat lebih banyak chat WhatsApp dari Google, Maps, media sosial, iklan, dan jawaban AI.',
    en: 'Logink helps growing Indonesian brands win more WhatsApp chats from Google, Maps, social media, ads and AI answers.',
  } as L,
  // the hero film's pause control (the whole card), named apart from the 360° video's button
  filmLabels: { id: { pause: 'Jeda video pembuka', play: 'Putar video pembuka' }, en: { pause: 'Pause intro video', play: 'Play intro video' } },
}

// Collapsed longer copy: stays in the SSR DOM for crawlers, AI and Mode teks
export const MORE: L = { id: 'Selengkapnya', en: 'Read more' }

// 02 Services: the one list of the 7 services (name link + one-line outcome + price or quote)
export const SERVICES_H = {
  label: { id: 'Satu layanan', en: 'One service' } as L,
  h2: { id: 'Layanan dan harga', en: 'Services and prices' } as L,
}
export const OUTCOME: Record<SvcKey, L> = {
  seo: { id: 'Traffic organik yang tumbuh dari kata kunci yang benar-benar dicari pelanggan.', en: 'Organic traffic that grows from the words customers actually search.' },
  localseo: { id: 'Muncul di Google Maps saat orang di sekitar mencari bisnis seperti Anda.', en: 'Show up on Google Maps when people nearby look for a business like yours.' },
  ads: { id: 'Iklan Google & Meta yang mengantar pelanggan ke chat WhatsApp Anda.', en: 'Google & Meta ads that bring customers to your WhatsApp chat.' },
  social: { id: 'Instagram, TikTok, dan Facebook yang konsisten dan membangun kepercayaan.', en: 'Consistent Instagram, TikTok and Facebook that build trust.' },
  creative: { id: 'Desain dan video yang membuat brand Anda mudah dikenali.', en: 'Design and video that make your brand easy to recognise.' },
  website: { id: 'Website cepat yang mengubah kunjungan menjadi chat.', en: 'A fast website that turns visits into chats.' },
  ai: { id: 'Brand yang layak dikutip Google AI Overview dan ChatGPT, lalu diukur.', en: 'A brand worth citing in Google AI Overviews and ChatGPT, then measured.' },
}

// 03 'Satu kampanye, semua kanal' (§4.5): the 360° story, told once
export const C360 = {
  h2: { id: 'Satu kampanye, semua kanal', en: 'One campaign, every channel' } as L,
  lead1: {
    id: 'Kampanye 360° berarti semua kanal yang Anda butuhkan dijalankan satu tim sebagai satu kampanye.',
    en: 'A 360° campaign means every channel you need is run by one team as one campaign.',
  } as L,
  lead4: {
    id: 'Anda tetap bisa mulai dari satu layanan dan menyambungkan kanal lain nanti.',
    en: 'You can still start with a single service and connect more channels later.',
  } as L,
  pillarsLabel: { id: 'Empat pilar Kampanye 360°', en: 'The four pillars of a 360° campaign' } as L,
  // one line per pillar card, in PILLARS order
  pillarLine: [
    { id: 'Satu ide kampanye, diadaptasi untuk setiap kanal.', en: 'One campaign idea, adapted for every channel.' },
    { id: 'Kata kunci, visual, dan data mengalir antarkanal.', en: 'Keywords, visuals and data flow between channels.' },
    { id: 'GA4, Search Console, dan pixel iklan dibaca bersama.', en: 'GA4, Search Console and ad pixels, read together.' },
    { id: 'Satu sesi review bulanan bersama tim Anda.', en: 'One monthly review with your team.' },
  ] as L[],
  one: { id: 'Mulai dari satu layanan', en: 'Start with one service' } as L,
  video: { id: { pause: 'Jeda video', play: 'Putar video' }, en: { pause: 'Pause video', play: 'Play video' } },
}

// 04 Proses (owner 2026-10-04, after Kampanye 360°): the five steps, grouped so the reader sees that the
// opportunity and the plan come BEFORE the contract. Step names are the owner's; one line each.
type Step = { t: L; d: L; sign?: true }
export const PROCESS = {
  label: { id: 'Proses kerja', en: 'How we work' } as L,
  h2: { id: 'Tahu peluang dan rencananya sebelum tanda tangan', en: 'See the opportunity and the plan before you sign' } as L,
  lead: {
    id: 'Sebelum ada kontrak, Anda sudah melihat peluang bisnis Anda, rencana kerjanya, dan biayanya.',
    en: "Before any contract, you've already seen your opportunity, the plan and what it costs.",
  } as L,
  groups: [
    { label: { id: 'Sebelum Anda tanda tangan', en: 'Before you sign' } as L, steps: [
      { t: { id: 'Konsultasi', en: 'Consultation' }, d: { id: 'Ceritakan bisnis dan target Anda, gratis lewat WhatsApp atau call.', en: 'Tell us about your business and goals, free on WhatsApp or a call.' } },
      { t: { id: 'Discovery', en: 'Discovery' }, d: { id: 'Kami audit kanal digital dan kompetitor Anda untuk menemukan peluangnya.', en: 'We audit your digital channels and competitors to find the opportunity.' } },
      { t: { id: 'Perencanaan', en: 'Planning' }, d: { id: 'Rencana per kanal: target, langkah, jadwal, dan biaya.', en: 'A plan for each channel: goals, steps, timeline and cost.' } },
    ] as Step[] },
    { label: { id: 'Keputusan Anda', en: 'Your decision' } as L, steps: [
      { t: { id: 'Persetujuan & tanda tangan', en: 'Approval & sign-off' }, d: { id: 'Anda review dan setujui rencananya. Kerja baru dimulai setelah Anda tanda tangan.', en: 'You review and approve the plan. Work starts only after you sign.' }, sign: true },
    ] as Step[] },
    { label: { id: 'Setelah disetujui', en: 'After approval' } as L, steps: [
      { t: { id: 'Proyek berjalan', en: 'Project running' }, d: { id: 'Tim menjalankan rencana yang disetujui, lalu kita review hasilnya setiap bulan.', en: 'The team runs the approved plan, and we review the results together every month.' } },
    ] as Step[] },
  ],
}

// 04 Proof: real case studies only (no metric until a slug is approved) + how we measure, collapsed
export const PROOF = {
  label: { id: 'Bukti', en: 'Proof' } as L,
  h2: { id: 'Studi kasus', en: 'Case studies' } as L,
  lede: { id: 'Studi kasus nyata dari klien Logink. Angka hanya kami tampilkan bersama periode dan sumbernya.', en: 'Real case studies from Logink clients. We only show numbers together with their period and source.' } as L,
  all: { id: 'Lihat semua studi kasus', en: 'See all case studies' } as L,
}

// 05 FAQ, 7 items in the §4.9 order (40–80 words each, the first sentence answers). FAQPage mirrors these.
export const FAQ_H: L = { id: 'Tanya jawab', en: 'Questions and answers' }
export const FAQ: { q: L; a: L }[] = [
  {
    q: { id: 'Berapa biaya jasa digital marketing?', en: 'How much does digital marketing cost?' },
    a: {
      id: 'Biayanya tergantung layanan: SEO mulai Rp 6 Juta/bulan, Local SEO & Google Maps mulai Rp 1 Juta/bulan (ditagih tahunan), iklan Google & Meta mulai Rp 6 Juta/bulan management fee di luar budget iklan, dan website mulai Rp 10 Juta per proyek. Social media, desain grafis & video, dan SEO AI lewat proposal kustom dalam 24 jam. Rincian paket ada di halaman setiap layanan. Kampanye 360° dihargai lewat proposal kustom.',
      en: 'It depends on the service: SEO from IDR 6M/month, Local SEO & Google Maps from IDR 1M/month (billed annually), Google & Meta ads from IDR 6M/month management fee with ad spend excluded, and websites from IDR 10M per project. Social media, graphic design & video and AI search are quoted within 24 hours. Package details are on each service page. A 360° campaign is priced by custom proposal.',
    },
  },
  {
    q: { id: 'Apa itu digital marketing 360°?', en: 'What is 360° digital marketing?' },
    a: gated('K1',
      { id: 'Digital marketing 360° adalah cara menjalankan semua kanal digital sebagai satu kampanye yang terhubung, bukan proyek terpisah. Di Logink artinya satu strategi dan satu ide diadaptasi untuk SEO, Google Maps, social media, iklan, konten kreatif, dan website; setiap kanal mengisi kanal lain; hasilnya dibaca dari satu data dan dilaporkan dalam satu laporan bulanan, sampai ke chat WhatsApp.', en: '360° digital marketing means running every digital channel as one connected campaign instead of separate projects. At Logink, one strategy and one idea are adapted for SEO, Google Maps, social media, ads, creative content and your website; each channel feeds the others; results are read from one data layer and reported in one monthly report, all the way to the WhatsApp chat.' },
      { id: 'Digital marketing 360° adalah cara menjalankan semua kanal digital sebagai satu kampanye yang terhubung, bukan proyek terpisah. Di Logink artinya satu strategi dan satu ide diadaptasi untuk SEO, Google Maps, social media, iklan, konten kreatif, dan website; setiap kanal mengisi kanal lain; hasilnya dibaca dari satu data dan dibahas dalam satu review bulanan, sampai ke chat WhatsApp.', en: '360° digital marketing means running every digital channel as one connected campaign instead of separate projects. At Logink, one strategy and one idea are adapted for SEO, Google Maps, social media, ads, creative content and your website; each channel feeds the others; results are read from one data layer and discussed in one monthly review, all the way to the WhatsApp chat.' }),
  },
  {
    q: { id: 'Apakah saya harus mengambil semua layanan?', en: 'Do I have to take every service?' },
    a: {
      id: 'Tidak. Setiap layanan bisa diambil sendiri, dengan paket dan harga (atau penawaran) di halamannya. Anda bisa mulai dari satu kanal, misalnya Local SEO & Google Maps atau website, lalu menyambungkan kanal lain setelah melihat datanya. Kampanye 360° cocok ketika beberapa kanal sudah berjalan tetapi belum saling terhubung, atau ketika Anda ingin satu tim yang mengurus semuanya.',
      en: 'No. Every service can be hired on its own, with the packages and price (or quote) on its page. You can start with one channel, such as Local SEO & Google Maps or a website, then connect more channels once you see the data. A 360° campaign fits when several channels are already running but not connected, or when you want one team to handle all of them.',
    },
  },
  {
    q: { id: 'Bagaimana hasil kampanye dilaporkan?', en: 'How are campaign results reported?' },
    a: K14
      ? { id: 'Dalam Kampanye 360°, hasil semua kanal dilaporkan dalam satu laporan bulanan: traffic dan konversi dari GA4, performa pencarian dari Search Console, hasil iklan, insight Google Business, performa social media, dan klik WhatsApp per kanal. Laporan dibahas dalam satu sesi review bersama tim yang menjalankan kampanye. Akun iklan, GA4, dan Search Console tetap milik Anda, jadi setiap angka bisa Anda cek sendiri.', en: 'In a 360° campaign, every channel is reported in one monthly report: traffic and conversions from GA4, search performance from Search Console, ad results, Google Business insights, social performance and WhatsApp clicks by channel. The report is discussed in one review session with the team running the campaign. Ad accounts, GA4 and Search Console stay yours, so you can check each number yourself.' }
      : { id: 'Dalam Kampanye 360°, setiap layanan bulanan (SEO, Local SEO, social, iklan) tetap punya laporan bulanan: traffic dan konversi dari GA4, performa pencarian dari Search Console, hasil iklan, insight Google Business, dan performa social media. Semua laporan dibahas dalam satu sesi review bulanan bersama tim yang menjalankan kampanye. Akun iklan, GA4, dan Search Console tetap milik Anda, jadi setiap angka bisa Anda cek sendiri.', en: 'In a 360° campaign, each monthly service (SEO, Local SEO, social, ads) keeps its monthly report: traffic and conversions from GA4, search performance from Search Console, ad results, Google Business insights and social performance. All of them are discussed in one monthly review with the team running the campaign. Ad accounts, GA4 and Search Console stay yours, so you can check each number yourself.' },
  },
  {
    q: { id: 'Apa itu GEO dan AEO?', en: 'What are GEO and AEO?' },
    a: {
      id: 'GEO (Generative Engine Optimization) adalah upaya membuat brand Anda layak dikutip dalam jawaban mesin AI seperti Google AI Overview, AI Mode, dan ChatGPT. AEO (Answer Engine Optimization) membuat konten Anda dipilih sebagai jawaban langsung atas pertanyaan. AEO di sini adalah Answer Engine Optimization, bukan Authorized Economic Operator. Keduanya dibangun di atas SEO, dan Logink menjalankannya lewat layanan SEO AI (GEO & AEO).',
      en: 'GEO (Generative Engine Optimization) is the work of making your brand worth citing in the answers of AI engines such as Google AI Overviews, AI Mode and ChatGPT. AEO (Answer Engine Optimization) makes your content the pick for direct answers to questions. AEO here means Answer Engine Optimization, not Authorized Economic Operator. Both build on SEO, and Logink runs them through its AI Search Optimization (GEO & AEO) service.',
    },
  },
  {
    q: { id: 'Apakah Logink bisa menjamin brand muncul di ChatGPT?', en: 'Can Logink guarantee my brand appears in ChatGPT?' },
    a: {
      id: 'Tidak. Tidak ada agensi yang bisa menjamin kutipan di ChatGPT, Google AI Overview, atau mesin AI lain, karena jawabannya dirakit oleh model milik platform. Yang kami kerjakan adalah membuat brand Anda layak dikutip: konten yang menjawab pertanyaan nyata, data entitas yang konsisten, dan website yang mudah dibaca mesin. Lalu kami mengukur kutipan dan sebutan brand Anda setiap bulan, termasuk saat hasilnya belum naik.',
      en: 'No. No agency can guarantee a citation in ChatGPT, Google AI Overviews or any other AI engine, because the answers are assembled by models the platforms own. What we do is make your brand worth citing: content that answers real questions, consistent entity data and a website machines can read. Then we measure your citations and brand mentions every month, including the months when they have not risen yet.',
    },
  },
  {
    q: { id: 'Kenapa Local SEO ditagih tahunan?', en: 'Why is Local SEO billed annually?' },
    a: {
      id: 'Karena hasil Local SEO datang dari konsistensi. Ulasan, Google Posts, dan sinyal lokal menumpuk seiring waktu, dan peningkatan posisi di map pack untuk kata kunci kompetitif umumnya terlihat dalam 4–8 minggu. Penagihan tahunan menjaga pekerjaan berjalan tanpa putus dan membuat harganya tetap Rp 1 Juta atau Rp 2 Juta per bulan, ditagih tahunan (Rp 12 Juta atau Rp 24 Juta per tahun).',
      en: 'Because Local SEO results come from consistency. Reviews, Google Posts and local signals build up over time, and map-pack gains for competitive keywords typically show within 4–8 weeks. Annual billing keeps the work running without gaps and keeps the price at IDR 1M or IDR 2M a month, billed annually (IDR 12M or IDR 24M a year).',
    },
  },
]

// Lead Profiler, SSR shell (§4.4). Built and kept, not rendered on home since the owner's five-section order. The island's question paths live in sections/home/profiler-data.ts.
export const PROFILER = {
  h2: { id: 'Mulai dari tujuan Anda', en: 'Start from your goal' } as L,
  first: {
    id: 'Halo! Mau mulai dari mana: satu layanan, atau semua kanal sekaligus sebagai Kampanye 360°?',
    en: 'Hi! Where would you like to start: one service, or every channel at once as a 360° campaign?',
  } as L,
  chip360: { id: 'Semua kanal · Kampanye 360°', en: 'Every channel · 360° campaign' } as L,
  orOne: { id: 'atau satu layanan:', en: 'or one service:' } as L,
  bot: { id: 'Asisten Logink', en: 'Logink assistant' } as L,
}

