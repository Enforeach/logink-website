// Hub copy: /layanan + /en/services (BUILD §3.9 hub, amended by §11 7.2). Plain data, no JSX.
// Prices are quoted from the registry text (src/lib/services.ts); 360° phrases ship their K1 fallbacks
// (CAMPAIGN_CONFIRMED all false at launch, §11 3.6): no "satu laporan" / "one report" anywhere here.
import type { L } from '@/lib/services'
import { CAMPAIGN_CONFIRMED, gated } from './campaign'

export const HUB = {
  crumb: { id: 'Layanan', en: 'Services' } as L,
  word: { id: 'Layanan', en: 'Services' } as L,
  // soft-modern pass: one sentence; prices live in the table right below
  lede: {
    id: 'Tujuh layanan digital marketing dengan harga yang jelas. Ambil satu layanan, atau gabungkan kanal yang Anda butuhkan menjadi satu Kampanye 360°.',
    en: 'Seven digital marketing services with clear pricing. Hire one, or combine the channels you need into one 360° campaign.',
  } as L,
  tableH: { id: 'Layanan dan harga', en: 'Services and prices' } as L,
  tableNote: {
    id: 'Harga di tabel adalah harga mulai dari halaman setiap layanan. Budget iklan dibayar langsung ke platform, terpisah dari biaya jasa.',
    en: "Prices in the table are the starting prices from each service's page. Ad spend is paid directly to the platforms, separate from our fee.",
  } as L,
}

// The 360° offer section (§11 7.2 item 4). Lead ships its K1 fallback middle sentence; no minimum scope (K7).
export const OFFER = {
  h2: { id: 'Kampanye 360°: satu kampanye, semua kanal', en: '360° campaign: one campaign, every channel' } as L,
  // first sentence = the 360° Service node description (JSON-LD), so it must stay visible verbatim
  lead1: {
    id: 'Kampanye 360° menggabungkan layanan yang Anda butuhkan menjadi satu kampanye yang dijalankan satu tim.',
    en: 'A 360° campaign combines the services you need into one campaign run by one team.',
  } as L,
  lead2: gated('K1',
    { id: 'Kanal yang dipilih berbagi satu data dan satu laporan.', en: 'The channels you choose share one data layer and one report.' },
    { id: 'Kanal yang dipilih berbagi satu data dan satu review bulanan.', en: 'The channels you choose share one data layer and one monthly review.' }),
  lead3: {
    id: 'Harganya lewat proposal kustom, karena kanal dan volume setiap bisnis berbeda.',
    en: 'It is priced by custom proposal, because channels and volumes differ for every business.',
  } as L,
  pillarsH: { id: 'Empat hal yang menyatukan kampanye', en: 'Four things that join the campaign' } as L,
  proposal: { id: 'Minta proposal 360°', en: 'Request a 360° proposal' } as L,
  mapH: { id: 'Peta kampanye 360°', en: '360° campaign map' } as L,
}

// Hub FAQ, 8 items (§11 7.2 item 6 / H): §9 Q1 (K1 fallback), Q2, the price question, Q5, Q4 (full
// fallback), the Local SEO billing question, and two more hub questions. 40–80 words, answer first.
export const HUB_FAQ_H: L = { id: 'Tanya jawab layanan dan harga', en: 'Questions about services and prices' }
export const HUB_FAQ: { q: L; a: L }[] = [
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
    q: { id: 'Berapa biaya jasa digital marketing di Logink?', en: 'How much does digital marketing cost at Logink?' },
    a: {
      id: 'Biayanya tergantung layanan: SEO mulai Rp 6 Juta/bulan, Local SEO & Google Maps mulai Rp 1 Juta/bulan (ditagih tahunan), iklan Google & Meta mulai Rp 6 Juta/bulan management fee di luar budget iklan, SEO AI mulai Rp 5 Juta/bulan, dan website mulai Rp 10 Juta dengan harga final lewat diskusi. Social media serta desain grafis & video dihargai lewat proposal kustom dalam 24 jam. Semuanya ada di tabel layanan dan harga di halaman ini.',
      en: 'It depends on the service: SEO from IDR 6M/month, Local SEO & Google Maps from IDR 1M/month (billed annually), Google & Meta ads from IDR 6M/month management fee with ad spend excluded, AI search from IDR 5M/month, and websites from IDR 10M with the final price agreed after a discussion. Social media and graphic design & video are priced by custom proposal within 24 hours. All of it is in the services and prices table on this page.',
    },
  },
  {
    q: { id: 'Berapa biaya Kampanye 360°?', en: 'How much does a 360° campaign cost?' },
    a: {
      id: 'Kampanye 360° dihargai lewat proposal kustom, karena kanal, volume konten, dan target setiap bisnis berbeda. Sebagai acuan, harga mulai untuk SEO, Local SEO, Iklan, dan Website tertulis di tabel layanan dan harga, misalnya Local SEO mulai Rp 1 Juta per bulan (ditagih tahunan) dan SEO mulai Rp 6 Juta per bulan; Social, Kreatif, dan SEO AI lewat proposal dalam 24 jam. Budget iklan dibayar langsung ke platform, terpisah dari biaya jasa.',
      en: 'A 360° campaign is priced through a custom proposal, because channels, content volume and targets differ for every business. As a reference, starting prices for SEO, Local SEO, Ads and Websites are in the services and prices table, for example Local SEO from IDR 1M a month (billed annually) and SEO from IDR 6M a month; Social, Creative and AI search are quoted within 24 hours. Ad spend is paid directly to the platforms, separate from our fee.',
    },
  },
  {
    q: { id: 'Bagaimana hasil kampanye dilaporkan?', en: 'How are campaign results reported?' },
    // full text only when K1 and K4 are both confirmed (§9 Q4)
    a: CAMPAIGN_CONFIRMED.K1 && CAMPAIGN_CONFIRMED.K4
      ? { id: 'Dalam Kampanye 360°, hasil semua kanal dilaporkan dalam satu laporan bulanan: traffic dan konversi dari GA4, performa pencarian dari Search Console, hasil iklan, insight Google Business, performa social media, dan klik WhatsApp per kanal. Laporan dibahas dalam satu sesi review bersama tim yang menjalankan kampanye. Akun iklan, GA4, dan Search Console tetap milik Anda, jadi setiap angka bisa Anda cek sendiri.', en: 'In a 360° campaign, every channel is reported in one monthly report: traffic and conversions from GA4, search performance from Search Console, ad results, Google Business insights, social performance and WhatsApp clicks by channel. The report is discussed in one review session with the team running the campaign. Ad accounts, GA4 and Search Console stay yours, so you can check each number yourself.' }
      : { id: 'Dalam Kampanye 360°, setiap layanan bulanan (SEO, Local SEO, social, iklan) tetap punya laporan bulanan: traffic dan konversi dari GA4, performa pencarian dari Search Console, hasil iklan, insight Google Business, dan performa social media. Semua laporan dibahas dalam satu sesi review bulanan bersama tim yang menjalankan kampanye. Akun iklan, GA4, dan Search Console tetap milik Anda, jadi setiap angka bisa Anda cek sendiri.', en: 'In a 360° campaign, each monthly service (SEO, Local SEO, social, ads) keeps its monthly report: traffic and conversions from GA4, search performance from Search Console, ad results, Google Business insights and social performance. All of them are discussed in one monthly review with the team running the campaign. Ad accounts, GA4 and Search Console stay yours, so you can check each number yourself.' },
  },
  {
    q: { id: 'Kenapa Local SEO ditagih tahunan?', en: 'Why is Local SEO billed annually?' },
    a: {
      id: 'Karena hasil Local SEO datang dari konsistensi. Ulasan, Google Posts, dan sinyal lokal menumpuk seiring waktu, dan peningkatan posisi di map pack untuk kata kunci kompetitif umumnya terlihat dalam 4–8 minggu. Penagihan tahunan menjaga pekerjaan berjalan tanpa putus dan membuat harganya tetap Rp 1 Juta atau Rp 2 Juta per bulan, ditagih tahunan (Rp 12 Juta atau Rp 24 Juta per tahun).',
      en: 'Because Local SEO results come from consistency. Reviews, Google Posts and local signals build up over time, and map-pack gains for competitive keywords typically show within 4–8 weeks. Annual billing keeps the work running without gaps and keeps the price at IDR 1M or IDR 2M a month, billed annually (IDR 12M or IDR 24M a year).',
    },
  },
  {
    q: { id: 'Layanan mana yang cocok untuk bisnis saya?', en: 'Which service fits my business?' },
    a: {
      id: 'Mulailah dari tahap yang paling lemah. Bila bisnis Anda belum muncul di Google atau Maps, mulai dari SEO atau Local SEO & Google Maps. Bila orang menemukan Anda tetapi ragu, perkuat social media, konten kreatif, dan website. Bila Anda butuh chat masuk lebih cepat, iklan Google & Meta membantu. Ceritakan kondisi bisnis Anda lewat WhatsApp, dan kami beri saran yang jujur.',
      en: 'Start with your weakest stage. If your business does not show up on Google or Maps yet, start with SEO or Local SEO & Google Maps. If people find you but hesitate, strengthen your social media, creative content and website. If you need chats to come in faster, Google & Meta ads help. Tell us about your business on WhatsApp and we will give you an honest recommendation.',
    },
  },
  {
    q: { id: 'Apa bedanya SEO, AEO, dan GEO?', en: 'What is the difference between SEO, AEO and GEO?' },
    a: {
      id: 'Ketiganya menargetkan tempat yang berbeda: SEO untuk hasil pencarian Google, AEO (Answer Engine Optimization, bukan Authorized Economic Operator) untuk jawaban langsung, dan GEO (Generative Engine Optimization) untuk jawaban mesin AI seperti Google AI Overview, AI Mode, dan ChatGPT. Ketiganya saling menguatkan, dan Logink menjalankan AEO dan GEO lewat layanan SEO AI. Kami tidak menjamin kutipan, tetapi kami mengukur progresnya setiap bulan.',
      en: 'They target different places: SEO the Google search results, AEO (Answer Engine Optimization) direct answers, and GEO (Generative Engine Optimization) the answers of AI engines such as Google AI Overviews, AI Mode and ChatGPT. The three reinforce each other, and Logink runs AEO and GEO through its AI search optimization service. We do not guarantee citations, but we measure progress every month.',
    },
  },
]
