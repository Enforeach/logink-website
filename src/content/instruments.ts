// Instrument copy (BUILD §2.5d, §3.6; owner: Instruments). Plain data, no JSX. Fictional entities only:
// Kedai Contoh, contohkedai.id, @kedaicontoh, Brand A/B/C. No dates, clock stamps, "Live" badges or brand chrome.
// Customer utterances (the search query, chat lines, the review, prompts) stay Indonesian in both locales;
// UI labels, captions and annotations are translated (03a §3.6).
import type { L, Locale } from '@/lib/services'

type LL = Record<Locale, string[]>

export const MOCK_LABEL: L = { id: 'Ilustrasi · data contoh', en: 'Illustration · sample data' }
export const MOCK_LABEL_PHOTO: L = { id: 'Ilustrasi · data contoh · foto: ilustrasi AI', en: 'Illustration · sample data · photos: AI illustration' }
export const SAMPLE: L = { id: 'contoh', en: 'sample' }

export const KEDAI = 'Kedai Contoh'
export const DOMAIN = 'contohkedai.id'
export const HANDLE = '@kedaicontoh'
export const QUERY = 'kopi susu gula aren dekat Tebet'
export const AI_QUESTION = 'Kopi susu enak di Tebet yang buka sampai malam?'

// E1 SERP -> Maps
export const SERP = {
  url: 'contohkedai.id › menu',
  title: 'Kedai Contoh · Tebet',
  text: { id: 'Kopi susu gula aren dan roti bakar. Pesan antar se-Tebet lewat WhatsApp.', en: 'Palm-sugar iced coffee and toast. Delivery across Tebet via WhatsApp.' } as L,
  rank: { id: 'Posisi', en: 'Position' } as L,
  map: { id: 'Peta', en: 'Map' } as L,
  open: { id: 'Buka', en: 'Open' } as L,
  places: [
    { name: 'Kedai Contoh', note: { id: 'Kedai kopi · Tebet', en: 'Coffee shop · Tebet' } as L, hit: true },
    { name: 'Brand A', note: { id: 'Kedai kopi', en: 'Coffee shop' } as L },
    { name: 'Brand B', note: { id: 'Kafe', en: 'Café' } as L },
  ],
}

// E2 Instagram grid + review
export const IG = {
  bio: { id: 'Kedai kopi di Tebet · antar se-Tebet', en: 'Coffee shop in Tebet · delivery across Tebet' } as L,
  follow: { id: 'Ikuti', en: 'Follow' } as L,
  tiles: [{ id: 'Promo', en: 'Promo' }, { id: 'Menu baru', en: 'New menu' }, { id: 'Ulasan', en: 'Reviews' }] as L[],
}
export const REVIEW = {
  who: 'R.',
  text: 'Kopinya enak, tempatnya bersih.',
  kind: { id: 'Ulasan pelanggan', en: 'Customer review' } as L,
}

// E3 website frame + PageSpeed-style rings
export const SITE = {
  nav: { id: ['Menu', 'Lokasi', 'Tentang'], en: ['Menu', 'Location', 'About'] } as LL,
  sub: { id: 'Kopi susu gula aren, antar se-Tebet.', en: 'Palm-sugar iced coffee, delivered across Tebet.' } as L,
  cta: { id: 'Pesan via WhatsApp', en: 'Order on WhatsApp' } as L,
  menu: { id: ['Es kopi susu', 'Kopi gula aren', 'Roti bakar'], en: ['Iced kopi susu', 'Palm-sugar coffee', 'Toast'] } as LL,
  gauges: [
    { k: { id: 'Performa', en: 'Performance' } as L, v: 94 },
    { k: { id: 'Aksesibilitas', en: 'Accessibility' } as L, v: 100 },
    { k: { id: 'SEO', en: 'SEO' } as L, v: 100 },
  ],
  gaugeTag: { id: 'Skor contoh', en: 'Sample scores' } as L,
}

// E4 campaign funnel (relative bars, no absolute numbers)
export const FUNNEL = {
  title: { id: 'Corong kampanye · tanpa angka absolut', en: 'Campaign funnel · no absolute numbers' } as L,
  steps: [
    { k: { id: 'Tayangan', en: 'Impressions' } as L, v: 1 },
    { k: { id: 'Klik', en: 'Clicks' } as L, v: 0.46 },
    { k: { id: 'Chat WhatsApp', en: 'WhatsApp chats' } as L, v: 0.2 },
    { k: { id: 'Pesanan', en: 'Orders' } as L, v: 0.1 },
  ],
  chips: ['Google Ads', 'Meta Ads'],
  pill: { id: 'Chat WhatsApp', en: 'WhatsApp chat' } as L,
}

// E5 AI answer + annotation layer (ProofLoupe)
export const ENGINES = ['ChatGPT', 'Gemini', 'AI Mode', 'Perplexity']
export const AI = {
  answer: {
    id: 'Kedai Contoh di Tebet sering direkomendasikan untuk kopi susu gula aren dan buka sampai malam. Ulasan menyebut kopinya enak dan tempatnya bersih. Pesanan antar bisa lewat WhatsApp.',
    en: 'Kedai Contoh in Tebet is often recommended for palm-sugar iced coffee and stays open into the evening. Reviews say the coffee is good and the place is clean. Delivery orders go through WhatsApp.',
  } as L,
  sources: { id: 'Sumber', en: 'Sources' } as L,
  cites: [
    { n: 1, t: { id: 'artikel lokal', en: 'local article' } as L },
    { n: 2, t: { id: DOMAIN, en: DOMAIN } as L, hit: true },
    { n: 3, t: { id: 'profil bisnis', en: 'business profile' } as L },
  ],
}
export const ANNOT = [
  { id: 'sumber: halaman website · paragraf jawaban 52 kata · diperbarui', en: 'source: website page · 52-word answer paragraph · updated' },
  { id: 'entitas: Google Business Profile', en: 'entity: Google Business Profile' },
  { id: 'sebutan: artikel lokal', en: 'mention: local article' },
] as L[]
export const ANNOT_TOGGLE: L = { id: 'Tampilkan anotasi', en: 'Show annotations' }

// E6 prompt tracking, share of voice, crawler log
export const PROMPTS = {
  caption: { id: 'Pelacakan prompt · tiap prompt dijalankan 3×', en: 'Prompt tracking · each prompt run 3×' } as L,
  head: { id: ['Prompt', 'Mesin', 'Disebut?', 'URL dikutip', 'Posisi'], en: ['Prompt', 'Engine', 'Mentioned?', 'Cited URL', 'Position'] } as LL,
  yes: { id: 'Ya', en: 'Yes' } as L,
  no: { id: 'Tidak', en: 'No' } as L,
  rows: [
    { q: 'kopi susu gula aren dekat Tebet', e: 'ChatGPT', hit: true, url: 'contohkedai.id/menu', pos: '2–3' },
    { q: 'kedai kopi Tebet buka sampai malam', e: 'Gemini', hit: true, url: 'contohkedai.id', pos: '1–2' },
    { q: 'kopi susu enak Jakarta Selatan', e: 'AI Mode', hit: false, url: '–', pos: '–' },
    { q: 'kopi Tebet yang bisa antar', e: 'Perplexity', hit: true, url: 'contohkedai.id/antar', pos: '3–4' },
    { q: 'rekomendasi kopi gula aren Tebet', e: 'ChatGPT', hit: true, url: 'contohkedai.id/faq', pos: '2–4' },
  ],
}
export const SOV = {
  title: { id: 'Pangsa sebutan di jawaban AI', en: 'Share of voice in AI answers' } as L,
  note: { id: 'Persentase sebutan per bulan · contoh', en: 'Share of mentions per month · sample' } as L,
  rows: [['Kedai Contoh', 38], ['Brand A', 27], ['Brand B', 21], ['Brand C', 14]] as [string, number][],
}
export const CRAWLER = {
  title: { id: 'Log crawler AI', en: 'AI crawler log' } as L,
  pause: { id: 'Jeda log', en: 'Pause log' } as L,
  region: { id: 'Log crawler, bergulir', en: 'Crawler log, scrolling' } as L,
  lines: [
    'OAI-SearchBot GET /menu 200',
    'PerplexityBot GET /lokasi 200',
    'Googlebot GET / 200',
    'ClaudeBot GET /faq 200',
    'Bingbot GET /menu/es-kopi-susu 200',
    'GPTBot GET /tentang 200',
  ],
}

// E7 query fan-out
export const FANOUT = {
  title: { id: 'Satu pertanyaan, empat sub-kueri', en: 'One question, four sub-queries' } as L,
  subs: [
    { q: 'kedai kopi Tebet jam buka', src: { id: 'website', en: 'website' } as L },
    { q: 'kopi susu gula aren Tebet', src: { id: 'Google Business Profile', en: 'Google Business Profile' } as L },
    { q: 'ulasan kedai kopi Tebet', src: { id: 'ulasan', en: 'reviews' } as L },
    { q: 'kedai kopi dekat stasiun Tebet', src: { id: 'artikel lokal', en: 'local article' } as L },
  ],
}

// E8 JSON-LD fragment: [indent, key, value, trailing, highlighted]
export const JSONLD = {
  title: { id: 'Data terstruktur · LocalBusiness', en: 'Structured data · LocalBusiness' } as L,
  lines: [
    [0, '', '{', '', false],
    [1, '@context', 'https://schema.org', ',', false],
    [1, '@type', 'CafeOrCoffeeShop', ',', false],
    [1, 'name', 'Kedai Contoh', ',', false],
    [1, 'url', 'https://contohkedai.id', ',', false],
    [1, 'address', '{', '', false],
    [2, '@type', 'PostalAddress', ',', false],
    [2, 'addressLocality', 'Tebet', ',', true],
    [2, 'addressRegion', 'Jakarta Selatan', '', false],
    [1, '', '}', ',', false],
    [1, 'servesCuisine', 'Kopi', ',', false],
    [1, 'sameAs', 'https://example.com', '', false],
    [0, '', '}', '', false],
  ] as [number, string, string, string, boolean][],
}

// E9 report frame + MeasureBlock
export const REPORT = {
  title: { id: 'Laporan bulanan · contoh', en: 'Monthly report · sample' } as L,
  panels: [
    { src: 'Google Search Console', k: { id: 'impresi AI generatif', en: 'generative AI impressions' } as L, v: { id: '1.200–1.500', en: '1,200–1,500' } as L },
    { src: 'Bing Webmaster Tools', k: { id: 'AI Performance', en: 'AI Performance' } as L, v: { id: '300–450', en: '300–450' } as L },
    { src: 'GA4', k: { id: 'channel AI Assistant', en: 'AI Assistant channel' } as L, v: { id: '40–60 sesi', en: '40–60 sessions' } as L },
  ],
  goal: { k: { id: 'Klik WhatsApp', en: 'WhatsApp clicks' } as L, v: '12–18' },
  foot: { id: 'Laporan contoh. Angka ilustrasi.', en: 'Sample report. Illustrative numbers.' } as L,
}
export const MEASURE = {
  heading: { id: 'Cara kami mengukur', en: 'How we measure' } as L,
  text: {
    id: 'Kami mengukur dari data Anda sendiri: Google Analytics 4, Google Search Console, dan statistik Google Business Profile atau akun social media sesuai layanannya. Setiap layanan bulanan punya laporan bulanan. Setiap angka ditulis bersama periode dan sumbernya, lalu dibandingkan dengan periode yang sama panjangnya.',
    en: 'We measure from your own data: Google Analytics 4, Google Search Console and the Google Business Profile or social media insights that fit the service. Every monthly service comes with a monthly report. Each number is written with its period and source, then compared with a period of the same length.',
  } as L,
}

// E10 phone + E11 ad -> chat (chat lines are customer/kedai utterances: Indonesian in both locales)
export const CHAT = {
  out: 'Halo, masih buka? Mau pesan 2 kopi susu.',
  reply: 'Masih, Kak! Diantar 20 menit ya.',
  out2: 'Siap, saya tunggu.',
}
export const ADCHAT = {
  sponsored: { id: 'Bersponsor', en: 'Sponsored' } as L,
  headline: { id: 'Kopi susu 2 gelas, antar ke Tebet', en: 'Two iced coffees, delivered in Tebet' } as L,
  cta: { id: 'Kirim pesan WhatsApp', en: 'Send a WhatsApp message' } as L,
}

// E12 content calendar
export const CALENDAR = {
  title: { id: 'Kalender konten · minggu contoh', en: 'Content calendar · sample week' } as L,
  days: { id: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'], en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] } as LL,
  items: [
    { id: 'Reels', en: 'Reels' }, { id: 'Story', en: 'Story' }, { id: 'Carousel', en: 'Carousel' }, { id: 'Foto produk', en: 'Product photo' },
    { id: 'Reels', en: 'Reels' }, { id: 'Story', en: 'Story' }, { id: 'Carousel', en: 'Carousel' },
  ] as L[],
  open: 3, // the expanded day (Kam / Thu)
  draft: { id: 'Draf caption · contoh', en: 'Draft caption · sample' } as L,
  caption: { id: 'Es kopi susu gula aren, antar se-Tebet.', en: 'Iced palm-sugar coffee, delivered across Tebet.' } as L,
}

// Peta kampanye 360° UI strings (data: content/campaign.ts, owner Service)
export const CMAP = {
  legend: { id: 'Sorot satu kanal', en: 'Highlight one channel' } as L,
  all: { id: 'Semua', en: 'All' } as L,
  caption: { id: 'Posisi di cincin = tahap utama setiap layanan.', en: "Position on the ring = each service's main stage." } as L,
  centreSub: { id: 'satu strategi · satu data', en: 'one strategy · one data layer' } as L,
  night: {
    yes: { id: 'Data kembali ke laporan, lalu ke rencana berikutnya', en: 'Data returns to the report, then to the next plan' } as L,
    no: { id: 'Data kembali ke review bulanan, lalu ke rencana berikutnya', en: 'Data returns to the monthly review, then to the next plan' } as L,
  },
}
