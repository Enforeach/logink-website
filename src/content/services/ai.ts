// SEO AI (GEO & AEO) (BUILD §3.4, §3.8 AI variant). New copy from research/aeo-geo.md §1, §4.3, §6 (sources
// below). AI_COMPARE (SEO vs AEO vs GEO + the customs line) is also read by home Bab III.
// Honesty: no guaranteed citations. Prices (owner 2026-10-04): three plans benchmarked on crawlcompass.com/ai-seo.
import type { Locale } from '@/lib/services'
import type { ServiceContent, Table } from './types'

const GUIDE = 'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide'
const FEATURES = 'https://developers.google.com/search/docs/appearance/ai-features'

export const AI_COMPARE: Record<Locale, Table> = {
  id: {
    caption: 'SEO vs AEO vs GEO',
    head: ['Aspek', 'SEO', 'AEO', 'GEO'],
    rows: [
      ['Tujuan', 'Naik di hasil pencarian dan Maps', 'Menjadi jawaban yang diambil', 'Disebut atau dikutip di jawaban AI'],
      ['Tempat muncul', 'Hasil Google biasa, local pack', 'Featured snippet, AI Overview, AI Mode', 'ChatGPT, Gemini, Perplexity, Copilot'],
      ['Satuan kerja', 'Halaman', 'Satu paragraf untuk satu pertanyaan', 'Klaim tentang brand, didukung sumber'],
      ['Cara mengukur', 'Ranking dan klik di Search Console', 'Impresi AI generatif di Search Console', 'Panel prompt: disebut, dikutip, share of voice'],
    ],
    note: 'AEO di sini adalah Answer Engine Optimization, bukan Authorized Economic Operator (fasilitas Bea Cukai).',
  },
  en: {
    caption: 'SEO vs AEO vs GEO',
    head: ['Aspect', 'SEO', 'AEO', 'GEO'],
    rows: [
      ['Goal', 'Rank in search results and Maps', 'Be the extracted answer', 'Be named or cited in AI answers'],
      ['Where it shows', 'Classic Google results, local pack', 'Featured snippets, AI Overviews, AI Mode', 'ChatGPT, Gemini, Perplexity, Copilot'],
      ['Unit of work', 'A page', 'One passage for one question', 'A claim about the brand, backed by sources'],
      ['How it is measured', 'Rankings and clicks in Search Console', 'Generative AI impressions in Search Console', 'Prompt panel: mentioned, cited, share of voice'],
    ],
    note: 'AEO here means Answer Engine Optimization, not Authorized Economic Operator (the customs facility).',
  },
}

const ENGINES: Record<Locale, Table> = {
  id: {
    caption: 'Dari mana mesin AI mengambil sumber',
    head: ['Mesin', 'Sumber jawaban', 'Crawler'],
    rows: [
      ['Google AI Overview & AI Mode', 'Indeks Google, dengan query fan-out', 'Googlebot'],
      ['ChatGPT search', 'Hasil Bing dan crawler OpenAI', 'OAI-SearchBot'],
      ['Perplexity', 'Indeks sendiri dan pengambilan langsung', 'PerplexityBot'],
      ['Microsoft Copilot', 'Indeks Bing', 'Bingbot'],
    ],
  },
  en: {
    caption: 'Where AI engines find their sources',
    head: ['Engine', 'Answer sources', 'Crawler'],
    rows: [
      ['Google AI Overviews & AI Mode', 'The Google index, with query fan-out', 'Googlebot'],
      ['ChatGPT search', 'Bing results and OpenAI’s crawler', 'OAI-SearchBot'],
      ['Perplexity', 'Its own index and live fetching', 'PerplexityBot'],
      ['Microsoft Copilot', 'The Bing index', 'Bingbot'],
    ],
  },
}

// Rich page (owner 2026-10-04; no live page to benchmark, the SEO page's pattern + the owner's GEO film): the stats band
// shows sourced 'why it matters' figures (never results), the USP is SEO / AEO / GEO built from AI_COMPARE (one source
// of truth), the tabs follow the film's scope (audit, entity, content, report), 'Di balik layar' stays without its
// collapsed panels (two plain panels, owner: 'too technical'), and the homepage process. No guaranteed citations.
const layers = (l: Locale, titles: string[]) => {
  const r = AI_COMPARE[l].rows
  const v = (x: string) => (x.includes(': ') ? `${x.replace(': ', ' (')})` : x) // 'Panel prompt: a, b' → 'Panel prompt (a, b)'
  return ['SEO', 'AEO', 'GEO'].map((value, i) => ({
    value, title: titles[i], text: `${r[0][i + 1]}.`,
    points: [1, 2, 3].map((row) => `${r[row][0]}: ${v(r[row][i + 1])}`),
  }))
}

type Plan = { id: string; name: string; price: string; priceValue: number; period: string; bestFor: string; isPopular: boolean; features: string[] }
const plan = (id: string, name: string, price: string, priceValue: number, period: string, isPopular: boolean, bestFor: string, features: string[]): Plan =>
  ({ id, name, price, priceValue, period, bestFor, isPopular, features })
const TIERS_ID: Plan[] = [
  plan('entry', 'Entry', 'Rp 5 Juta', 5000000, '/bulan', false, 'Brand yang mulai dengan audit visibilitas AI dan baseline', [
    'Panel 15 prompt di mesin AI utama', 'Pemetaan prompt ke halaman prioritas', 'Laporan visibilitas AI bulanan (sebutan & kutipan)',
    'Hingga 5 halaman prioritas dioptimasi per siklus', 'Sebutan & kutipan off-page setiap bulan', 'Analisis gap kutipan kompetitor', 'Checklist kesiapan AI + setup llms.txt']),
  plan('growth', 'Growth', 'Rp 10 Juta', 10000000, '/bulan', true, 'Brand yang siap memperluas visibilitas dan kutipan AI', [
    'Semua yang ada di Entry', 'Panel 30 prompt', 'Analisis tren visibilitas AI bulanan', 'Share of voice AI vs kompetitor',
    'Hingga 10 halaman prioritas per siklus', 'Analisis sumber kutipan di jawaban AI', 'Entity kit + audit konsistensi brand']),
  plan('full', 'Full', 'Rp 20 Juta', 20000000, '/bulan', false, 'Brand yang bersaing menjadi jawaban AI di kategorinya', [
    'Semua yang ada di Growth', 'Panel 50 prompt', 'Pemantauan sentimen & narasi brand di AI', 'Hingga 20 halaman prioritas per siklus',
    'Cakupan entitas penuh di sumber milik sendiri & pihak ketiga', 'Dukungan implementasi konten, schema, dan perbaikan kutipan']),
]
const TIERS_EN: Plan[] = [
  plan('entry', 'Entry', 'IDR 5M', 5000000, '/month', false, 'Brands starting with an AI visibility audit and a baseline', [
    'A 15-prompt panel across the main AI engines', 'Prompt mapping to priority pages', 'A monthly AI visibility report (mentions & citations)',
    'Up to 5 priority pages optimized per cycle', 'Off-page mentions & citations every month', 'Competitor citation gap analysis', 'AI readiness checklist + llms.txt setup']),
  plan('growth', 'Growth', 'IDR 10M', 10000000, '/month', true, 'Brands ready to widen their AI visibility and citations', [
    'Everything in Entry', 'A 30-prompt panel', 'Monthly AI visibility trend analysis', 'AI share of voice vs competitors',
    'Up to 10 priority pages per cycle', 'Citation source analysis across AI answers', 'Entity kit + brand consistency audit']),
  plan('full', 'Full', 'IDR 20M', 20000000, '/month', false, 'Brands competing to be the AI answer in their category', [
    'Everything in Growth', 'A 50-prompt panel', 'Brand sentiment & narrative monitoring in AI', 'Up to 20 priority pages per cycle',
    'Full entity coverage across owned & third-party sources', 'Implementation support for content, schema and citation fixes']),
]

const id: ServiceContent = {
  answer: 'Jasa SEO AI (GEO & AEO) Logink membuat brand Anda layak dikutip di Google AI Overview, AI Mode, ChatGPT, dan Perplexity: halaman yang terbaca crawler, jawaban di kalimat pertama, data entitas yang konsisten, dan sebutan di luar situs, lalu diukur setiap bulan. Kami tidak menjamin kutipan.',
  campaign: {
    fedBy: [
      { k: 'seo', text: 'Artikel yang menjawab langsung dan schema yang rapi menjadi sumber yang bisa dikutip.' },
      { k: 'localseo', text: 'Data profil Google yang lengkap dan konsisten memperjelas siapa Anda dan di mana Anda berada.' },
      { k: 'social', text: 'Sebutan brand di social media menambah sinyal bahwa bisnis Anda nyata dan aktif.' },
      { k: 'website', text: 'Situs yang cepat dan terstruktur memudahkan crawler AI membaca dan mengutip halaman Anda.' },
    ],
    feeds: [
      { k: 'report', gate: 'K1', text: 'Kutipan dan sebutan di jawaban AI dipantau setiap bulan dan masuk ke laporan kampanye. Kami tidak menjamin kutipan.', fallback: 'Kutipan dan sebutan di jawaban AI dipantau setiap bulan dan masuk ke laporan bulanan. Kami tidak menjamin kutipan.' },
    ],
  },
  work: [
    { title: 'Audit Crawl & Render', text: 'Setiap halaman terbaca crawler AI, yang tidak menjalankan JavaScript.' },
    { title: 'Entitas & Google Business Profile', text: 'Nama, alamat, dan kategori yang sama di semua tempat.' },
    { title: 'Penulisan Ulang Answer-First', text: 'Paragraf jawaban di awal halaman prioritas.' },
    { title: 'Konten Bersumber', text: 'Angka dan kutipan dengan sumber yang jelas di dalam teks.' },
    { title: 'Sebutan di Luar Situs', text: 'Artikel lokal, direktori, dan video yang menyebut brand Anda.' },
    { title: 'Panel Prompt & Share of Voice', text: 'Setiap prompt dijalankan 3× per siklus, dilaporkan sebagai rentang.' },
  ],
  pricing: { kind: 'tiers', tiers: TIERS_ID, note: 'Butuh lebih dari 50 prompt, beberapa pasar, atau banyak situs? Kami susun paket kustom. Di semua paket: kami tidak menjamin kutipan, tetapi setiap perubahan diukur dari baseline.' },
  compare: null, // AI_COMPARE feeds the USP cards (and home), not a separate table
  trust: ['Baseline dicatat di awal', 'Diukur setiap bulan', 'Tanpa janji kutipan'],
  highlights: {
    items: [
      { value: 'Okt 2024', label: 'AI Overviews hadir dalam Bahasa Indonesia (Google)' },
      { value: '27,34%', label: 'responden di Indonesia memakai AI (APJII via Kompas, 2025)' },
      { value: '≈58%', label: 'CTR posisi #1 lebih rendah saat AI Overview muncul (Ahrefs, 2025, data AS)' },
    ],
    note: 'Data publik dengan sumbernya, bukan hasil klien Logink.',
  },
  usp: {
    heading: 'Dari ditemukan, dijawab, sampai dikutip AI',
    accent: 2,
    lead: 'SEO AI memperluas SEO yang sudah Anda kenal: tiga lapisan, satu tujuan, brand Anda menjadi jawaban. AEO di sini berarti Answer Engine Optimization, bukan fasilitas Bea Cukai.',
    pop: 2,
    cards: layers('id', ['Ditemukan', 'Dijawab', 'Dikutip']),
  },
  included: {
    heading: 'Semua yang Anda dapatkan',
    lead: 'Empat bidang kerja, dari audit sampai laporan. Label Growth+ dan Khusus Full menandai item yang hanya ada di paket itu.',
    tabs: [
      { label: 'Audit', items: [
        { title: 'Audit Visibilitas AI', text: 'Kami cek di mana brand Anda sudah disebut, atau belum, di ChatGPT, Gemini, Perplexity, Copilot, dan AI Overview, lalu mencatatnya sebagai baseline.' },
        { title: 'Peta Prompt', text: 'Pertanyaan yang benar-benar diajukan calon pelanggan, dipetakan ke halaman yang seharusnya menjawabnya: 15, 30, atau 50 prompt sesuai paket.' },
        { title: 'Analisis Gap Kutipan Kompetitor', text: 'Prompt mana yang sudah dimenangkan kompetitor, dan sumber apa yang dikutip AI untuk mereka.' },
        { title: 'Kesiapan AI & Crawl', text: 'Setiap halaman terbaca crawler AI, plus checklist kesiapan AI dan llms.txt (gratis, tanpa janji efek).' },
      ] },
      { label: 'Entitas', items: [
        { title: 'Entitas & Google Business Profile', text: 'Nama, alamat, dan kategori yang sama di semua tempat.' },
        { title: 'Sebutan di Luar Situs', text: 'Artikel lokal, direktori, dan video yang menyebut brand Anda, dibangun setiap bulan.' },
        { title: 'Entity Kit & Audit Konsistensi', text: 'Profil entitas brand dan pengecekan konsistensi data di semua sumber.', badge: 'Growth+' },
      ] },
      { label: 'Konten', items: [
        { title: 'Optimasi Halaman Prioritas', text: 'Paragraf jawaban di awal halaman, struktur yang mudah dikutip: 5, 10, atau 20 halaman per siklus sesuai paket.' },
        { title: 'Konten Bersumber', text: 'Angka dan kutipan dengan sumber yang jelas di dalam teks.' },
        { title: 'Dukungan Implementasi', text: 'Tim kami ikut menerapkan perbaikan konten, schema, dan kutipan di situs Anda.', badge: 'Khusus Full' },
      ] },
      { label: 'Pengukuran', items: [
        { title: 'Laporan Visibilitas AI Bulanan', text: 'Sebutan dan kutipan di jawaban AI, setiap prompt dijalankan 3× per siklus dan dilaporkan sebagai rentang.' },
        { title: 'Share of Voice & Sumber Kutipan', text: 'Seberapa sering brand Anda disebut dibanding kompetitor, dan sumber mana yang dikutip AI.', badge: 'Growth+' },
        { title: 'Sentimen & Narasi Brand', text: 'Bagaimana AI menggambarkan brand Anda, dan apakah gambaran itu berubah.', badge: 'Khusus Full' },
      ] },
    ],
  },
  process: true,
  stats: ['aio-id', 'aimode-id', 'ctr-58', 'pew-8-15', 'apjii-ai'],
  ai: 'SEO AI membuat brand Anda layak dikutip di jawaban AI dan mengukurnya setiap bulan. Kami tidak menjamin kutipan.',
  faq: [
    { q: 'Apa itu jasa SEO AI (GEO dan AEO)?', a: 'Jasa SEO AI adalah pekerjaan agar brand Anda dikutip atau disebut saat orang bertanya ke Google AI Overview, AI Mode, ChatGPT, atau Perplexity. Isinya SEO yang diperluas: halaman yang terbaca mesin, jawaban yang jelas, data entitas yang konsisten, sebutan di luar situs, dan pengukuran yang jujur.' },
    { q: 'Apakah Logink bisa menjamin brand muncul di ChatGPT?', a: 'Tidak. Tidak ada yang bisa menjamin kutipan, karena jawaban AI berubah menurut prompt, bahasa, lokasi, dan waktu. Yang kami pegang adalah pekerjaan yang terbukti membantu, panel prompt yang dijalankan berulang, dan laporan bulanan yang menunjukkan perubahan dari baseline.' },
    { q: 'Bagaimana kemajuannya diukur?', a: 'Lewat panel prompt tetap yang dijalankan tiga kali per siklus dan dilaporkan sebagai rentang, impresi AI generatif di Google Search Console, AI Performance di Bing Webmaster Tools, dan channel AI Assistant di GA4 sampai ke klik WhatsApp. Semua angka ditulis bersama periode dan sumbernya.' },
    { q: 'Apakah perlu schema atau file khusus untuk AI Overview?', a: 'Tidak. Google menyatakan optimasi untuk AI search generatif tetaplah SEO, tanpa schema khusus. Schema yang rapi tetap berguna untuk Google dan Bing, tetapi fakta penting harus ada di teks yang terlihat, karena asisten AI membaca HTML yang tampil.' },
    { q: 'Apakah llms.txt membuat brand dikutip AI?', a: 'Tidak ada bukti untuk itu. Dalam studi Ahrefs, 97% file llms.txt tidak pernah diminta crawler, dan Google menyebut file itu tidak memengaruhi visibilitas. Logink tetap memasangnya karena gratis, tetapi kami tidak menjualnya sebagai cara naik.' },
    { q: 'Berapa lama hasilnya terlihat?', a: 'Tidak ada jangka waktu yang bisa dijanjikan, karena setiap mesin memperbarui sumbernya dengan caranya sendiri. Kami mencatat baseline di awal kerja sama, lalu melaporkan perubahan setiap bulan, termasuk prompt yang belum menyebut brand Anda.' },
  ],
  sources: [
    { label: 'Google: Fitur AI dan website Anda', url: FEATURES },
    { label: 'Google: Panduan optimasi untuk AI search', url: GUIDE },
    { label: 'OpenAI: Crawler dan robots.txt', url: 'https://developers.openai.com/api/docs/bots' },
    { label: 'Aggarwal dkk.: GEO, Generative Engine Optimization (KDD 2024)', url: 'https://arxiv.org/abs/2311.09735' },
    { label: 'Ahrefs: Studi llms.txt', url: 'https://ahrefs.com/blog/llmstxt-study/' },
  ],
  aiPage: {
    behind: { heading: 'Seperti ini hasilnya terlihat', lead: 'Jawaban AI yang menyebut brand Anda, dan seberapa sering brand Anda disebut dibanding kompetitor. Contoh dengan data ilustrasi.' },
    engines: ENGINES.id,
    note: 'Paragraf di atas sengaja ditulis agar mudah dikutip: jawaban di kalimat pertama, fakta yang bisa dicek.',
  },
}

const en: ServiceContent = {
  answer: "Logink's AI search optimization (GEO & AEO) makes your brand worth citing in Google AI Overviews, AI Mode, ChatGPT and Perplexity: pages crawlers can read, answers in the first sentence, consistent entity data and off-site mentions, measured every month. We do not guarantee citations.",
  campaign: {
    fedBy: [
      { k: 'seo', text: 'Answer-first articles and clean schema become sources that can be cited.' },
      { k: 'localseo', text: 'Complete, consistent Google profile data makes clear who you are and where you are.' },
      { k: 'social', text: 'Brand mentions on social media add signals that your business is real and active.' },
      { k: 'website', text: 'A fast, structured site makes it easy for AI crawlers to read and cite your pages.' },
    ],
    feeds: [
      { k: 'report', gate: 'K1', text: 'Citations and mentions in AI answers are tracked every month and go into the campaign report. We do not guarantee citations.', fallback: 'Citations and mentions in AI answers are tracked every month and go into the monthly report. We do not guarantee citations.' },
    ],
  },
  work: [
    { title: 'Crawl & Render Audit', text: 'Every page readable by AI crawlers, which do not run JavaScript.' },
    { title: 'Entity & Google Business Profile', text: 'The same name, address and categories everywhere.' },
    { title: 'Answer-First Rewrites', text: 'An answer paragraph at the top of priority pages.' },
    { title: 'Sourced Content', text: 'Numbers and quotes with clear sources inside the text.' },
    { title: 'Off-Site Mentions', text: 'Local articles, directories and videos that name your brand.' },
    { title: 'Prompt Panel & Share of Voice', text: 'Each prompt run 3× per cycle, reported as ranges.' },
  ],
  pricing: { kind: 'tiers', tiers: TIERS_EN, note: 'Need more than 50 prompts, several markets or many sites? We build a custom plan. On every plan: we do not guarantee citations, but every change is measured from the baseline.' },
  compare: null,
  trust: ['A baseline recorded at the start', 'Measured every month', 'No promised citations'],
  highlights: {
    items: [
      { value: 'Oct 2024', label: 'AI Overviews launched in Bahasa Indonesia (Google)' },
      { value: '27.34%', label: 'of respondents in Indonesia use AI (APJII via Kompas, 2025)' },
      { value: '≈58%', label: 'lower position-1 CTR when an AI Overview appears (Ahrefs, 2025, US data)' },
    ],
    note: 'Public data with its sources, not Logink client results.',
  },
  usp: {
    heading: 'From found, to answered, to cited by AI',
    accent: 3,
    lead: 'AI search optimization extends the SEO you already know: three layers, one goal, your brand becomes the answer. AEO here means Answer Engine Optimization, not the customs facility.',
    pop: 2,
    cards: layers('en', ['Found', 'Answered', 'Cited']),
  },
  included: {
    heading: 'Everything you get',
    lead: 'Four areas of work, from audit to report. Growth+ and Full only mark items that come with those plans.',
    tabs: [
      { label: 'Audit', items: [
        { title: 'AI Visibility Audit', text: 'We check where your brand is already named, or not, in ChatGPT, Gemini, Perplexity, Copilot and AI Overviews, and record it as the baseline.' },
        { title: 'Prompt Map', text: 'The questions your customers actually ask, mapped to the pages that should answer them: 15, 30 or 50 prompts by plan.' },
        { title: 'Competitor Citation Gap Analysis', text: 'Which prompts competitors already win, and which sources AI cites for them.' },
        { title: 'AI Readiness & Crawl', text: 'Every page readable by AI crawlers, plus an AI readiness checklist and llms.txt (free, no promised effect).' },
      ] },
      { label: 'Entity', items: [
        { title: 'Entity & Google Business Profile', text: 'The same name, address and categories everywhere.' },
        { title: 'Off-Site Mentions', text: 'Local articles, directories and videos that name your brand, built every month.' },
        { title: 'Entity Kit & Consistency Audit', text: 'A brand entity profile and a consistency check of your data across sources.', badge: 'Growth+' },
      ] },
      { label: 'Content', items: [
        { title: 'Priority Page Optimization', text: 'An answer paragraph at the top, a structure that is easy to cite: 5, 10 or 20 pages per cycle by plan.' },
        { title: 'Sourced Content', text: 'Numbers and quotes with clear sources inside the text.' },
        { title: 'Implementation Support', text: 'Our team helps apply content, schema and citation fixes on your site.', badge: 'Full only' },
      ] },
      { label: 'Measurement', items: [
        { title: 'Monthly AI Visibility Report', text: 'Mentions and citations in AI answers, each prompt run 3× per cycle and reported as ranges.' },
        { title: 'Share of Voice & Citation Sources', text: 'How often your brand is named against competitors, and which sources AI cites.', badge: 'Growth+' },
        { title: 'Brand Sentiment & Narrative', text: 'How AI describes your brand, and whether that picture changes.', badge: 'Full only' },
      ] },
    ],
  },
  process: true,
  stats: ['aio-id', 'aimode-id', 'ctr-58', 'pew-8-15', 'apjii-ai'],
  ai: 'AI search optimization makes your brand worth citing in AI answers and measures it every month. We do not guarantee citations.',
  faq: [
    { q: 'What is AI search optimization (GEO and AEO)?', a: 'AI search optimization is the work of getting your brand cited or named when people ask Google AI Overviews, AI Mode, ChatGPT or Perplexity. It is SEO extended: machine-readable pages, clear answers, consistent entity data, off-site mentions and honest measurement.' },
    { q: 'Can Logink guarantee my brand appears in ChatGPT?', a: 'No. Nobody can guarantee citations, because AI answers change with the prompt, language, location and time. What we commit to is work that is shown to help, a prompt panel run repeatedly, and a monthly report that shows the change from your baseline.' },
    { q: 'How is progress measured?', a: 'Through a fixed prompt panel run three times per cycle and reported as ranges, generative AI impressions in Google Search Console, AI Performance in Bing Webmaster Tools, and the AI Assistant channel in GA4 through to WhatsApp clicks. Every number is written with its period and source.' },
    { q: 'Do AI Overviews need special schema or files?', a: 'No. Google says optimizing for generative AI search is still SEO, with no special schema. Clean schema still helps Google and Bing understand you, but key facts must be in the visible text, because AI assistants read the HTML that is shown.' },
    { q: 'Does llms.txt get a brand cited by AI?', a: 'There is no evidence for that. In an Ahrefs study, 97% of llms.txt files were never requested by a crawler, and Google says the file does not affect visibility. Logink still ships one because it costs nothing, but we do not sell it as a lever.' },
    { q: 'How long until results show?', a: 'No timeline can be promised, because every engine refreshes its sources in its own way. We record a baseline at the start, then report the change every month, including the prompts that do not name your brand yet.' },
  ],
  sources: [
    { label: 'Google: AI features and your website', url: FEATURES },
    { label: 'Google: Optimizing for AI search', url: GUIDE },
    { label: 'OpenAI: Crawlers and robots.txt', url: 'https://developers.openai.com/api/docs/bots' },
    { label: 'Aggarwal et al.: GEO, Generative Engine Optimization (KDD 2024)', url: 'https://arxiv.org/abs/2311.09735' },
    { label: 'Ahrefs: llms.txt study', url: 'https://ahrefs.com/blog/llmstxt-study/' },
  ],
  aiPage: {
    behind: { heading: 'What it looks like', lead: 'An AI answer that names your brand, and how often your brand is named against competitors. Illustrated with sample data.' },
    engines: ENGINES.en,
    note: 'The paragraph above is written to be quotable: the answer in the first sentence, facts you can check.',
  },
}

const content: Record<Locale, ServiceContent> = { id, en }
export default content
