'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { LogoMark } from '@/components/ui/Logo'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6287782495916'

// ─── Shared (language-agnostic) ───────────────────────────────────────────────

type QType = 'single' | 'multi'
interface Q { key: string; text: string; type: QType; opts: string[] }

// ─── Indonesian data ──────────────────────────────────────────────────────────

const INDUSTRY_ID = [
  'F&B / Kuliner', 'Fashion & Beauty', 'Properti', 'Jasa Profesional',
  'E-commerce / Retail', 'Teknologi / SaaS', 'Pendidikan', 'Lainnya',
]
const BUDGET_ID = ['< Rp 5 juta', 'Rp 5–20 juta', 'Rp 20–50 juta', 'Rp 50 juta+']

const PATHS_ID: Record<string, Q[]> = {
  ads: [
    { key: 'industri', type: 'single', text: 'Pertama, bisnis Anda bergerak di industri apa?', opts: INDUSTRY_ID },
    { key: 'platform', type: 'single', text: 'Platform iklan mana yang ingin Anda gunakan?', opts: ['Google Ads', 'Meta (Facebook/Instagram)', 'TikTok Ads', 'LinkedIn Ads', 'Belum tahu butuh arahan'] },
    { key: 'tujuan', type: 'single', text: 'Apa tujuan utama dari iklan ini?', opts: ['Lead generation', 'Penjualan langsung (e-commerce)', 'Brand awareness', 'Traffic ke website', 'App installs'] },
    { key: 'pengalaman', type: 'single', text: 'Apakah Anda sudah pernah beriklan digital sebelumnya?', opts: ['Belum pernah', 'Pernah tapi hasilnya kurang', 'Sedang jalan ingin optimasi', 'Handle sendiri & kewalahan'] },
    { key: 'landing_page', type: 'single', text: 'Bagaimana dengan landing page atau website Anda?', opts: ['Sudah ada siap dipakai', 'Ada tapi perlu diperbaiki', 'Belum ada'] },
    { key: 'budget', type: 'single', text: 'Terakhir, berapa budget iklan bulanan Anda?', opts: BUDGET_ID },
  ],
  creative: [
    { key: 'industri', type: 'single', text: 'Bisnis Anda di industri apa?', opts: INDUSTRY_ID },
    { key: 'jenis_konten', type: 'multi', text: 'Jenis konten kreatif apa yang dibutuhkan?', opts: ['Desain feed & stories', 'Video produksi (TVC/reels)', 'Branding & visual identity', 'Campaign & key visual', 'Foto produk / katalog', 'Motion graphic / animasi'] },
    { key: 'penggunaan', type: 'multi', text: 'Konten ini akan digunakan untuk apa?', opts: ['Posting sosial media', 'Iklan digital', 'Website / landing page', 'Presentasi / pitch deck', 'Print (brosur packaging)', 'Event / exhibition'] },
    { key: 'frekuensi', type: 'single', text: 'Seberapa rutin Anda butuh konten?', opts: ['One-time project', 'Bulanan (ongoing retainer)', 'Kampanye spesifik', 'Belum tahu'] },
    { key: 'brand_guideline', type: 'single', text: 'Apakah Anda sudah punya brand guideline?', opts: ['Sudah lengkap', 'Ada sebagian tapi belum konsisten', 'Belum ada sama sekali'] },
    { key: 'budget', type: 'single', text: 'Dan budget kreatif Anda kira-kira berapa?', opts: BUDGET_ID },
  ],
  socmed: [
    { key: 'industri', type: 'single', text: 'Bisnis Anda bergerak di bidang apa?', opts: INDUSTRY_ID },
    { key: 'platform', type: 'multi', text: 'Platform mana yang jadi prioritas?', opts: ['Instagram', 'TikTok', 'LinkedIn', 'Facebook', 'YouTube', 'X (Twitter)'] },
    { key: 'tantangan', type: 'single', text: 'Apa tantangan terbesar di media sosial Anda saat ini?', opts: ['Tidak konsisten posting', 'Engagement rendah', 'Followers tidak bertumbuh', 'Tidak tahu strategi konten', 'Kompetitor lebih aktif'] },
    { key: 'tim_internal', type: 'single', text: 'Apakah sudah ada tim internal untuk kelola sosmed?', opts: ['Belum butuh fully managed', 'Ada tapi butuh arahan strategi', 'Ada tapi butuh konten saja', 'Ada tapi butuh reporting & analytics'] },
    { key: 'target_posting', type: 'single', text: 'Berapa target posting per minggu?', opts: ['1–2x per minggu', '3–4x per minggu', 'Setiap hari', 'Belum tahu butuh rekomendasi'] },
    { key: 'budget', type: 'single', text: 'Budget social media management bulanan?', opts: BUDGET_ID },
  ],
  seo: [
    { key: 'industri', type: 'single', text: 'Industri bisnis Anda?', opts: INDUSTRY_ID },
    { key: 'status_website', type: 'single', text: 'Bagaimana status website Anda saat ini?', opts: ['Ada tapi tidak muncul di Google', 'Ada ranking turun belakangan', 'Ada baru dibuat', 'Belum punya website'] },
    { key: 'target_pencarian', type: 'multi', text: 'Apa yang ingin ditemukan calon customer Anda di Google?', opts: ['Produk/jasa spesifik', 'Nama brand', 'Edukasi/informasi industri', 'Lokasi bisnis (Google Maps)'] },
    { key: 'pengalaman_seo', type: 'single', text: 'Pengalaman SEO sebelumnya?', opts: ['Belum pernah', 'Pernah tapi tidak lanjut', 'Sedang jalan hasil kurang', 'Pernah pakai jasa SEO lain'] },
    { key: 'prioritas', type: 'single', text: 'Apa prioritas SEO Anda?', opts: ['Ranking halaman 1 Google', 'Meningkatkan traffic website', 'Leads dari organic search', 'Mengalahkan kompetitor di search'] },
    { key: 'budget', type: 'single', text: 'Budget SEO bulanan?', opts: BUDGET_ID },
  ],
  webdev: [
    { key: 'industri', type: 'single', text: 'Industri bisnis Anda?', opts: INDUSTRY_ID },
    { key: 'kebutuhan', type: 'single', text: 'Apa kebutuhan website Anda?', opts: ['Website baru dari nol', 'Redesign/upgrade website lama', 'Landing page untuk campaign', 'E-commerce / toko online', 'Web application / SaaS platform'] },
    { key: 'tech_stack', type: 'single', text: 'Ada preferensi tech stack? Atau serahkan ke kami?', opts: ['WordPress', 'Webflow', 'Shopify', 'Wix', 'Next.js / React', 'Nuxt.js / Vue', 'Laravel (PHP)', 'Node.js (Express)', 'React Native (Mobile)', 'Flutter (Mobile)', 'Native iOS/Android', 'Serahkan ke Logink'] },
    { key: 'fitur', type: 'multi', text: 'Fitur apa yang paling penting?', opts: ['Tampilan profesional & modern', 'Kecepatan & SEO-friendly', 'Integrasi WhatsApp', 'Payment gateway', 'CRM integration', 'CMS (mudah di-update)', 'Multi-bahasa', 'Booking / appointment', 'Dashboard / admin panel'] },
    { key: 'timeline', type: 'single', text: 'Kapan target website harus live?', opts: ['Secepatnya (< 1 bulan)', '1–3 bulan', '3–6 bulan', 'Masih tahap perencanaan'] },
    { key: 'budget', type: 'single', text: 'Budget website development?', opts: ['< Rp 10 juta', 'Rp 10–30 juta', 'Rp 30–75 juta', 'Rp 75 juta+'] },
  ],
}

const BRIEF_LABELS_ID: Record<string, string[]> = {
  ads: ['Industri', 'Platform', 'Tujuan', 'Pengalaman beriklan', 'Landing page', 'Budget'],
  creative: ['Industri', 'Jenis konten', 'Penggunaan', 'Frekuensi', 'Brand guideline', 'Budget'],
  socmed: ['Industri', 'Platform prioritas', 'Tantangan', 'Tim internal', 'Target posting', 'Budget'],
  seo: ['Industri', 'Status website', 'Target pencarian', 'Pengalaman SEO', 'Prioritas', 'Budget'],
  webdev: ['Industri', 'Kebutuhan', 'Tech stack', 'Fitur penting', 'Timeline', 'Budget'],
}

const SERVICE_META_ID: Record<string, { label: string; icon: string; confirm: string }> = {
  ads: { label: 'Ads', icon: '📢', confirm: 'Oke, Anda butuh layanan Paid Ads. Keren, saya siapkan pertanyaannya! 💪' },
  creative: { label: 'Creative', icon: '🎨', confirm: 'Oke, Creative Services, pilihan tepat! Mari kita cari tahu lebih lanjut.' },
  socmed: { label: 'Social Media', icon: '📱', confirm: 'Oke, Social Media Management! Yuk kita mulai profiling bisnis Anda.' },
  seo: { label: 'SEO', icon: '🔍', confirm: 'Oke, SEO: investasi jangka panjang yang cerdas! Ada beberapa pertanyaan.' },
  webdev: { label: 'Website Development', icon: '💻', confirm: 'Mantap, Website Development! Kami spesialis di sini. Yuk mulai!' },
}

// ─── English data ─────────────────────────────────────────────────────────────

const INDUSTRY_EN = [
  'F&B / Culinary', 'Fashion & Beauty', 'Property / Real Estate', 'Professional Services',
  'E-commerce / Retail', 'Technology / SaaS', 'Education', 'Other',
]
const BUDGET_EN = ['< IDR 5M', 'IDR 5–20M', 'IDR 20–50M', 'IDR 50M+']

const PATHS_EN: Record<string, Q[]> = {
  ads: [
    { key: 'industri', type: 'single', text: "First, what industry is your business in?", opts: INDUSTRY_EN },
    { key: 'platform', type: 'single', text: 'Which advertising platform would you like to use?', opts: ['Google Ads', 'Meta (Facebook/Instagram)', 'TikTok Ads', 'LinkedIn Ads', "Not sure, need guidance"] },
    { key: 'tujuan', type: 'single', text: "What's the main goal of your ads?", opts: ['Lead generation', 'Direct sales (e-commerce)', 'Brand awareness', 'Website traffic', 'App installs'] },
    { key: 'pengalaman', type: 'single', text: 'Have you run digital ads before?', opts: ["Never run ads before", "Tried it but poor results", "Currently running, want to optimise", "Managing it myself and overwhelmed"] },
    { key: 'landing_page', type: 'single', text: "How about your landing page or website?", opts: ["Already have one, ready to use", "Have one but needs improvement", "Don't have one yet"] },
    { key: 'budget', type: 'single', text: "Last one: what's your monthly ad budget?", opts: BUDGET_EN },
  ],
  creative: [
    { key: 'industri', type: 'single', text: "What industry is your business in?", opts: INDUSTRY_EN },
    { key: 'jenis_konten', type: 'multi', text: 'What type of creative content do you need?', opts: ['Feed & stories design', 'Video production (TVC/reels)', 'Branding & visual identity', 'Campaign & key visual', 'Product photography / catalogue', 'Motion graphic / animation'] },
    { key: 'penggunaan', type: 'multi', text: 'What will this content be used for?', opts: ['Social media posting', 'Digital ads', 'Website / landing page', 'Presentation / pitch deck', 'Print (brochure, packaging)', 'Events / exhibition'] },
    { key: 'frekuensi', type: 'single', text: 'How often do you need content?', opts: ['One-time project', 'Monthly (ongoing retainer)', 'Specific campaign', 'Not sure yet'] },
    { key: 'brand_guideline', type: 'single', text: 'Do you already have brand guidelines?', opts: ['Yes, fully complete', 'Partially, not consistent yet', 'No, starting from scratch'] },
    { key: 'budget', type: 'single', text: "And roughly what's your creative budget?", opts: BUDGET_EN },
  ],
  socmed: [
    { key: 'industri', type: 'single', text: "What industry is your business in?", opts: INDUSTRY_EN },
    { key: 'platform', type: 'multi', text: 'Which platforms are your priority?', opts: ['Instagram', 'TikTok', 'LinkedIn', 'Facebook', 'YouTube', 'X (Twitter)'] },
    { key: 'tantangan', type: 'single', text: "What's your biggest social media challenge right now?", opts: ['Inconsistent posting', 'Low engagement', 'Follower growth is stagnant', "Don't know what content strategy to use", 'Competitors are more active'] },
    { key: 'tim_internal', type: 'single', text: 'Do you have an internal team managing social media?', opts: ['No, need fully managed service', 'Yes, but need strategic direction', 'Yes, but need content only', 'Yes, but need reporting & analytics'] },
    { key: 'target_posting', type: 'single', text: 'How many posts per week are you targeting?', opts: ['1–2x per week', '3–4x per week', 'Every day', "Not sure, need a recommendation"] },
    { key: 'budget', type: 'single', text: "What's your monthly social media budget?", opts: BUDGET_EN },
  ],
  seo: [
    { key: 'industri', type: 'single', text: "What industry is your business in?", opts: INDUSTRY_EN },
    { key: 'status_website', type: 'single', text: "What's the current status of your website?", opts: ["Have one but it doesn't show on Google", "Rankings have been dropping lately", 'Just launched a new site', "Don't have a website yet"] },
    { key: 'target_pencarian', type: 'multi', text: 'What do you want potential customers to find on Google?', opts: ['Specific products / services', 'Brand name', 'Educational / industry content', 'Business location (Google Maps)'] },
    { key: 'pengalaman_seo', type: 'single', text: 'What is your SEO experience?', opts: ["Never done SEO before", "Tried it but didn't continue", "Currently doing it with poor results", 'Previously used another SEO agency'] },
    { key: 'prioritas', type: 'single', text: "What's your SEO priority?", opts: ['Rank on Google page 1', 'Increase website traffic', 'Generate leads from organic search', 'Outrank competitors in search'] },
    { key: 'budget', type: 'single', text: "What's your monthly SEO budget?", opts: BUDGET_EN },
  ],
  webdev: [
    { key: 'industri', type: 'single', text: "What industry is your business in?", opts: INDUSTRY_EN },
    { key: 'kebutuhan', type: 'single', text: 'What do you need for your website?', opts: ['Brand new website from scratch', 'Redesign / upgrade existing site', 'Landing page for a campaign', 'E-commerce / online store', 'Web application / SaaS platform'] },
    { key: 'tech_stack', type: 'single', text: 'Do you have a preferred tech stack, or leave it to us?', opts: ['WordPress', 'Webflow', 'Shopify', 'Wix', 'Next.js / React', 'Nuxt.js / Vue', 'Laravel (PHP)', 'Node.js (Express)', 'React Native (Mobile)', 'Flutter (Mobile)', 'Native iOS/Android', 'Leave it to Logink'] },
    { key: 'fitur', type: 'multi', text: 'Which features are most important to you?', opts: ['Professional & modern design', 'Fast & SEO-friendly', 'WhatsApp integration', 'Payment gateway', 'CRM integration', 'CMS (easy to update)', 'Multi-language', 'Booking / appointment system', 'Dashboard / admin panel'] },
    { key: 'timeline', type: 'single', text: 'When do you need the website to go live?', opts: ['ASAP (< 1 month)', '1–3 months', '3–6 months', 'Still in planning stage'] },
    { key: 'budget', type: 'single', text: "What's your website development budget?", opts: ['< IDR 10M', 'IDR 10–30M', 'IDR 30–75M', 'IDR 75M+'] },
  ],
}

const BRIEF_LABELS_EN: Record<string, string[]> = {
  ads: ['Industry', 'Platform', 'Goal', 'Ad experience', 'Landing page', 'Budget'],
  creative: ['Industry', 'Content type', 'Usage', 'Frequency', 'Brand guideline', 'Budget'],
  socmed: ['Industry', 'Priority platforms', 'Challenge', 'Internal team', 'Posting target', 'Budget'],
  seo: ['Industry', 'Website status', 'Search target', 'SEO experience', 'Priority', 'Budget'],
  webdev: ['Industry', 'Need', 'Tech stack', 'Key features', 'Timeline', 'Budget'],
}

const SERVICE_META_EN: Record<string, { label: string; icon: string; confirm: string }> = {
  ads: { label: 'Paid Ads', icon: '📢', confirm: "Got it, Paid Ads! Great choice. Let me prepare a few questions. 💪" },
  creative: { label: 'Creative', icon: '🎨', confirm: "Creative Services: perfect pick! Let's find out more about what you need." },
  socmed: { label: 'Social Media', icon: '📱', confirm: "Social Media Management: let's build something your audience will love!" },
  seo: { label: 'SEO', icon: '🔍', confirm: "SEO: a smart long-term investment! I have a few questions to understand your needs." },
  webdev: { label: 'Website Development', icon: '💻', confirm: "Website Development: we specialize in this! Let's get started." },
}

// ─── UI copy ──────────────────────────────────────────────────────────────────

const COPY = {
  id: {
    sectionLabel: 'Lead Profiler',
    sectionTitle: 'Temukan Solusi Digital Terbaik',
    sectionSubtext: 'Jawab beberapa pertanyaan singkat dan dapatkan rekomendasi layanan + konsultasi gratis',
    init1: 'Halo! 👋 Selamat datang di Logink.',
    init2: 'Saya akan bantu carikan solusi digital terbaik untuk bisnis Anda. Cuma butuh 1–2 menit saja!',
    gatewayQ: 'Layanan apa yang paling Anda butuhkan saat ini?',
    contactMsg1: 'Mantap, terima kasih atas jawabannya! 🙌',
    contactMsg2: 'Tinggal selangkah lagi: isi data kontak Anda supaya tim Logink bisa follow up dalam 24 jam.',
    doneMsg1: (name: string) => `Terima kasih, ${name}! 🎉 Brief Anda sudah terkirim ke tim Logink via WhatsApp.`,
    doneMsg2: 'Kami akan menghubungi Anda dalam 24 jam. Sampai jumpa! 👋',
    userDataSent: 'Data terkirim! ✅',
    lastQPrefix: 'Pertanyaan terakhir! ',
    multiConfirm: (n: number) => `Lanjutkan (${n} dipilih) →`,
    seoRedirect: 'Sepertinya Anda belum punya website, tidak apa-apa! Saya arahkan ke layanan Website Development kami. 🚀',
    restart: '↩ Mulai dari awal',
    statusTyping: 'Logink sedang mengetik...',
    statusOnline: 'Logink · Online',
    poweredBy: 'Powered by Logink',
    form: {
      nama: 'Nama Lengkap *', namaPlaceholder: 'Nama Anda',
      bisnis: 'Website / Nama Bisnis', bisnisPlaceholder: 'contoh.com atau Nama Bisnis',
      email: 'Email *', emailPlaceholder: 'email@example.com',
      wa: 'WhatsApp *', waPlaceholder: '08xxxxxxxxxx',
      submit: 'Kirim via WhatsApp 🚀',
    },
  },
  en: {
    sectionLabel: 'Lead Profiler',
    sectionTitle: 'Find Your Best Digital Solution',
    sectionSubtext: 'Answer a few quick questions and get a tailored service recommendation + free consultation',
    init1: 'Hello! 👋 Welcome to Logink.',
    init2: "I'll help find the best digital solution for your business. It only takes 1–2 minutes!",
    gatewayQ: 'Which service do you need most right now?',
    contactMsg1: "Great, thanks for your answers! 🙌",
    contactMsg2: "Just one more step: fill in your contact details so Logink's team can follow up within 24 hours.",
    doneMsg1: (name: string) => `Thank you, ${name}! 🎉 Your brief has been sent to the Logink team via WhatsApp.`,
    doneMsg2: "We'll reach out within 24 hours. Talk soon! 👋",
    userDataSent: 'Details sent! ✅',
    lastQPrefix: 'Last question! ',
    multiConfirm: (n: number) => `Continue (${n} selected) →`,
    seoRedirect: "Looks like you don't have a website yet. No problem! Let me redirect you to our Website Development service. 🚀",
    restart: '↩ Start over',
    statusTyping: 'Logink is typing...',
    statusOnline: 'Logink · Online',
    poweredBy: 'Powered by Logink',
    form: {
      nama: 'Full Name *', namaPlaceholder: 'Your name',
      bisnis: 'Website / Business Name', bisnisPlaceholder: 'example.com or Business Name',
      email: 'Email *', emailPlaceholder: 'email@example.com',
      wa: 'WhatsApp *', waPlaceholder: '+62xxxxxxxxxx',
      submit: 'Send via WhatsApp 🚀',
    },
  },
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Locale = 'id' | 'en'
type Phase = 'init' | 'gateway' | 'questions' | 'contact' | 'done'
interface Message { id: number; from: 'bot' | 'user'; text: string }
interface Contact { nama: string; bisnis: string; email: string; wa: string }

let _id = 0

// ─── CSS ──────────────────────────────────────────────────────────────────────

const CSS = `
@keyframes lp-bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-7px); }
}
@keyframes lp-fadeup {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes lp-chipin {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.lp-dot { animation: lp-bounce 1.2s infinite; }
.lp-dot:nth-child(2) { animation-delay: 0.15s; }
.lp-dot:nth-child(3) { animation-delay: 0.3s; }
.lp-msg  { animation: lp-fadeup 0.35s ease both; }
.lp-chip { animation: lp-chipin 0.3s ease both; }
`

// ─── Component ────────────────────────────────────────────────────────────────

interface Props { locale?: Locale }

export default function LeadProfiler({ locale = 'id' }: Props) {
  const copy = COPY[locale]
  const paths = locale === 'en' ? PATHS_EN : PATHS_ID
  const briefLabels = locale === 'en' ? BRIEF_LABELS_EN : BRIEF_LABELS_ID
  const serviceMeta = locale === 'en' ? SERVICE_META_EN : SERVICE_META_ID
  const seoNoWebsiteOpt = locale === 'en' ? "Don't have a website yet" : 'Belum punya website'

  const [messages, setMessages] = useState<Message[]>([])
  const [phase, setPhase] = useState<Phase>('init')
  const [service, setService] = useState<string | null>(null)
  const [qIdx, setQIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [multiSel, setMultiSel] = useState<string[]>([])
  const [contact, setContact] = useState<Contact>({ nama: '', bisnis: '', email: '', wa: '' })
  const [typing, setTyping] = useState(false)
  const [showOpts, setShowOpts] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [resetCount, setResetCount] = useState(0)

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing, showOpts])

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  // ── Bot speak ──────────────────────────────────────────────────────────────
  const botSay = useCallback((text: string): Promise<void> => {
    return new Promise(resolve => {
      setTyping(true)
      setShowOpts(false)
      const delay = Math.min(500 + text.length * 10, 1600)
      setTimeout(() => {
        setTyping(false)
        setMessages(prev => [...prev, { id: ++_id, from: 'bot', text }])
        setTimeout(resolve, 120)
      }, delay)
    })
  }, [])

  const userSay = useCallback((text: string) => {
    setMessages(prev => [...prev, { id: ++_id, from: 'user', text }])
  }, [])

  // ── Init ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false
    const run = async () => {
      await new Promise(r => setTimeout(r, 200))
      if (cancelled) return
      await botSay(copy.init1)
      if (cancelled) return
      await botSay(copy.init2)
      if (cancelled) return
      await botSay(copy.gatewayQ)
      if (cancelled) return
      setPhase('gateway')
      setShowOpts(true)
    }
    run()
    return () => { cancelled = true }
  }, [resetCount, botSay, copy.init1, copy.init2, copy.gatewayQ])

  // ── Service select ─────────────────────────────────────────────────────────
  const handleServiceSelect = useCallback(async (key: string) => {
    const svc = serviceMeta[key]
    setShowOpts(false)
    userSay(`${svc.icon} ${svc.label}`)
    setService(key)
    await botSay(svc.confirm)
    await botSay(paths[key][0].text)
    setPhase('questions')
    setQIdx(0)
    setShowOpts(true)
  }, [serviceMeta, paths, botSay, userSay])

  // ── Single select ──────────────────────────────────────────────────────────
  const handleSingleSelect = useCallback(async (opt: string) => {
    if (!service) return
    const currentQ = paths[service][qIdx]
    setShowOpts(false)
    userSay(opt)

    const newAnswers = { ...answers, [currentQ.key]: opt }
    setAnswers(newAnswers)

    // SEO → webdev redirect
    if (service === 'seo' && currentQ.key === 'status_website' && opt === seoNoWebsiteOpt) {
      await botSay(copy.seoRedirect)
      setService('webdev')
      setQIdx(1)
      await botSay(paths.webdev[1].text)
      setShowOpts(true)
      return
    }

    const nextIdx = qIdx + 1
    const pathLen = paths[service].length

    if (nextIdx >= pathLen) {
      await botSay(copy.contactMsg1)
      await botSay(copy.contactMsg2)
      setPhase('contact')
      setShowOpts(true)
    } else {
      const isLast = nextIdx === pathLen - 1
      await botSay((isLast ? copy.lastQPrefix : '') + paths[service][nextIdx].text)
      setQIdx(nextIdx)
      setShowOpts(true)
    }
  }, [service, qIdx, answers, paths, copy, seoNoWebsiteOpt, botSay, userSay])

  // ── Multi select ───────────────────────────────────────────────────────────
  const toggleMulti = useCallback((opt: string) => {
    setMultiSel(prev => prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt])
  }, [])

  const handleMultiConfirm = useCallback(async () => {
    if (!service || multiSel.length === 0) return
    const currentQ = paths[service][qIdx]
    setShowOpts(false)
    const combined = multiSel.join(', ')
    userSay(combined)
    const newAnswers = { ...answers, [currentQ.key]: combined }
    setAnswers(newAnswers)
    setMultiSel([])

    const nextIdx = qIdx + 1
    const pathLen = paths[service].length

    if (nextIdx >= pathLen) {
      await botSay(copy.contactMsg1)
      await botSay(copy.contactMsg2)
      setPhase('contact')
      setShowOpts(true)
    } else {
      const isLast = nextIdx === pathLen - 1
      await botSay((isLast ? copy.lastQPrefix : '') + paths[service][nextIdx].text)
      setQIdx(nextIdx)
      setShowOpts(true)
    }
  }, [service, qIdx, answers, multiSel, paths, copy, botSay, userSay])

  // ── Contact submit ─────────────────────────────────────────────────────────
  const handleContactSubmit = useCallback(async () => {
    if (!service) return
    const firstName = contact.nama.split(' ')[0]
    const labels = briefLabels[service]
    const questions = paths[service]

    const briefLines = questions.map((q, i) => `*${labels[i]}:* ${answers[q.key] || '-'}`).join('\n')
    const brief = [
      '🔥 *LEAD BARU - LOGINK*',
      `📋 *Service: ${serviceMeta[service].label}*`,
      '',
      briefLines,
      '',
      '👤 *Kontak:*',
      `Nama: ${contact.nama}`,
      `Bisnis: ${contact.bisnis || '-'}`,
      `Email: ${contact.email}`,
      `WA: ${contact.wa}`,
      '',
      '_Dikirim via Logink Lead Profiler_',
    ].join('\n')

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(brief)}`, '_blank')

    userSay(copy.userDataSent)
    await botSay(copy.doneMsg1(firstName))
    await botSay(copy.doneMsg2)
    setPhase('done')
    setShowOpts(true)
  }, [service, answers, contact, paths, briefLabels, serviceMeta, copy, botSay, userSay])

  // ── Reset ──────────────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    setMessages([])
    setPhase('init')
    setService(null)
    setQIdx(0)
    setAnswers({})
    setMultiSel([])
    setContact({ nama: '', bisnis: '', email: '', wa: '' })
    setTyping(false)
    setShowOpts(false)
    setResetCount(c => c + 1)
  }, [])

  // ── Derived ────────────────────────────────────────────────────────────────
  const currentQ = service && phase === 'questions' ? paths[service][qIdx] : null
  const progress = phase === 'questions' && service ? ((qIdx + 1) / 6) * 100 : 0
  const contactValid = contact.nama.trim() && contact.email.trim() && contact.wa.trim()

  // ── Options renderer ───────────────────────────────────────────────────────
  const renderOptions = () => {
    if (phase === 'gateway') {
      return (
        <div className="flex flex-wrap gap-2">
          {Object.entries(serviceMeta).map(([key, svc], i) => (
            <button
              key={key}
              className="lp-chip px-4 py-2 rounded-2xl text-sm font-semibold border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
              style={{ animationDelay: `${i * 0.04}s` }}
              onClick={() => handleServiceSelect(key)}
            >
              {svc.icon} {svc.label}
            </button>
          ))}
        </div>
      )
    }

    if (phase === 'questions' && currentQ) {
      if (currentQ.type === 'single') {
        return (
          <div className="flex flex-wrap gap-2">
            {currentQ.opts.map((opt, i) => (
              <button
                key={opt}
                className="lp-chip px-3 py-1.5 rounded-2xl text-sm border border-white/10 bg-white/5 text-white/80 hover:bg-violet-600/30 hover:border-violet-500/50 hover:text-white transition-all"
                style={{ animationDelay: `${i * 0.04}s` }}
                onClick={() => handleSingleSelect(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        )
      }

      if (currentQ.type === 'multi') {
        return (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {currentQ.opts.map((opt, i) => {
                const sel = multiSel.includes(opt)
                return (
                  <button
                    key={opt}
                    className="lp-chip px-3 py-1.5 rounded-2xl text-sm border transition-all"
                    style={{
                      animationDelay: `${i * 0.04}s`,
                      background: sel ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.05)',
                      borderColor: sel ? 'rgba(139,92,246,0.6)' : 'rgba(255,255,255,0.1)',
                      color: sel ? '#fff' : 'rgba(255,255,255,0.75)',
                    }}
                    onClick={() => toggleMulti(opt)}
                  >
                    {sel ? '✓ ' : ''}{opt}
                  </button>
                )
              })}
            </div>
            {multiSel.length > 0 && (
              <button
                className="lp-chip px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #DB2777, #F97316)', animationDelay: '0.2s' }}
                onClick={handleMultiConfirm}
              >
                {copy.multiConfirm(multiSel.length)}
              </button>
            )}
          </div>
        )
      }
    }

    if (phase === 'contact') {
      const f = copy.form
      return (
        <div className="lp-chip rounded-2xl border border-white/10 p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {([
              { field: 'nama' as const, label: f.nama, placeholder: f.namaPlaceholder, type: 'text' },
              { field: 'bisnis' as const, label: f.bisnis, placeholder: f.bisnisPlaceholder, type: 'text' },
              { field: 'email' as const, label: f.email, placeholder: f.emailPlaceholder, type: 'email' },
              { field: 'wa' as const, label: f.wa, placeholder: f.waPlaceholder, type: 'tel' },
            ]).map(({ field, label, placeholder, type }) => (
              <div key={field} className="space-y-1">
                <label className="text-xs font-medium text-white/50">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={contact[field]}
                  onChange={e => setContact(c => ({ ...c, [field]: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl text-sm border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-violet-500/60 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                />
              </div>
            ))}
          </div>
          <button
            disabled={!contactValid}
            onClick={handleContactSubmit}
            className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: contactValid ? 'linear-gradient(135deg, #7C3AED, #DB2777, #F97316)' : 'rgba(255,255,255,0.1)' }}
          >
            {f.submit}
          </button>
        </div>
      )
    }

    if (phase === 'done') {
      return (
        <button
          className="lp-chip px-5 py-2.5 rounded-2xl text-sm font-semibold border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-all"
          onClick={handleReset}
        >
          {copy.restart}
        </button>
      )
    }

    return null
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section style={{ width: '100%', padding: '0 24px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#0F0A1E' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="text-center mb-8">
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7C3AED', marginBottom: 10 }}>
          {copy.sectionLabel}
        </p>
        <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, color: '#FFF7ED', marginBottom: 8, lineHeight: 1.2 }}>
          {copy.sectionTitle}
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,247,237,0.4)', maxWidth: 440, margin: '0 auto' }}>
          {copy.sectionSubtext}
        </p>
      </div>

      {/* Mac frame */}
      <div
        style={{
          width: '100%', maxWidth: 900,
          borderRadius: 20,
          background: 'rgba(20,14,36,0.92)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
          transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)',
          overflow: 'hidden',
        }}
      >
        {/* Title bar */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', gap: 12, minHeight: 44 }}>
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            {(['#FF5F57', '#FEBC2E', '#28C840'] as const).map((c, i) => (
              <span key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c, display: 'block' }} />
            ))}
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '3px 12px', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 11 }}>🔒</span> logink.co/profiler
            </div>
          </div>
          {service && phase === 'questions' && (
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <div style={{ width: 80, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'linear-gradient(90deg, #7C3AED, #DB2777, #F97316)', borderRadius: 4, width: `${progress}%`, transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)' }} />
              </div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontVariantNumeric: 'tabular-nums' }}>{qIdx + 1}/6</span>
            </div>
          )}
        </div>

        {/* Chat body */}
        <div ref={scrollRef} style={{ height: 'clamp(360px, 45vw, 520px)', overflowY: 'auto', padding: '24px 24px 16px', display: 'flex', flexDirection: 'column', gap: 16, scrollBehavior: 'smooth' }}>
          {messages.map(msg => (
            msg.from === 'bot'
              ? <BotMessage key={msg.id} text={msg.text} />
              : <UserMessage key={msg.id} text={msg.text} />
          ))}
          {typing && <TypingIndicator />}
        </div>

        {/* Options area */}
        {showOpts && !typing && (
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '16px 24px', background: 'rgba(255,255,255,0.01)' }}>
            {renderOptions()}
          </div>
        )}

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', borderTop: '1px solid rgba(255,255,255,0.04)', fontSize: 11 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.35)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', display: 'inline-block', background: typing ? '#F59E0B' : '#22C55E', boxShadow: typing ? '0 0 6px #F59E0B' : '0 0 6px #22C55E', transition: 'all 0.3s' }} />
            <span>{typing ? copy.statusTyping : copy.statusOnline}</span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>{copy.poweredBy}</span>
        </div>
      </div>
    </section>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function BotMessage({ text }: { text: string }) {
  return (
    <div className="lp-msg flex items-end gap-2.5" style={{ maxWidth: '80%' }}>
      <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LogoMark size={18} />
      </div>
      <div style={{ padding: '10px 14px', borderRadius: '4px 20px 20px 20px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#FFF7ED', fontSize: 14, lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>
        {text}
      </div>
    </div>
  )
}

function UserMessage({ text }: { text: string }) {
  return (
    <div className="lp-msg flex justify-end">
      <div style={{ padding: '10px 14px', borderRadius: '20px 4px 20px 20px', background: 'rgba(124,58,237,0.25)', border: '1px solid rgba(124,58,237,0.3)', color: '#FFF7ED', fontSize: 14, lineHeight: 1.55, maxWidth: '75%', whiteSpace: 'pre-wrap' }}>
        {text}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5">
      <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LogoMark size={18} />
      </div>
      <div style={{ padding: '12px 16px', borderRadius: '4px 20px 20px 20px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 5, alignItems: 'center' }}>
        {[0, 1, 2].map(i => (
          <span key={i} className="lp-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,255,255,0.45)', display: 'block' }} />
        ))}
      </div>
    </div>
  )
}
