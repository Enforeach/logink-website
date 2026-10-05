// Contact page copy (BUILD §3.9 Contact + §11 two modes). Plain data. Response-time claims are today's
// claims only: WhatsApp "hitungan menit", email and form "24 jam", next steps from the old contact page.
import type { L, Locale } from '@/lib/services'

export const CONTACT = {
  lede: {
    id: 'Satu pesan cukup: chat WhatsApp untuk respons tercepat, atau isi formulir singkat.',
    en: 'One message is enough: chat on WhatsApp for the fastest reply, or fill in the short form.',
  },
  official: { id: 'WhatsApp resmi', en: 'Official WhatsApp' },
  channelsH: { id: 'Pilih cara menghubungi kami', en: 'Choose how to reach us' },
  waName: { id: 'WhatsApp', en: 'WhatsApp' },
  waNote: { id: 'Respons dalam hitungan menit', en: 'Replies within minutes' },
  waAsk: { id: 'Mau bahas apa?', en: 'What would you like to discuss?' },
  oneEyebrow: { id: 'Satu layanan', en: 'One service' },
  oneText: {
    id: 'Anda sudah tahu kanal yang dibutuhkan: SEO, Google Maps, iklan, social media, kreatif, website, atau SEO AI.',
    en: 'You already know the channel you need: SEO, Google Maps, ads, social media, creative, websites or AI search.',
  },
  oneCta: { id: 'Chat soal satu layanan', en: 'Chat about one service' },
  c360Eyebrow: { id: 'Kampanye 360°', en: '360° campaign' },
  c360Text: {
    id: 'Semua kanal yang Anda butuhkan, satu tim, satu kampanye, lewat proposal kustom. Anda tetap bisa mulai dari satu layanan.',
    en: 'Every channel you need, one team, one campaign, by custom proposal. You can still start with one service.',
  },
  c360Cta: { id: 'Chat soal Kampanye 360°', en: 'Chat about a 360° campaign' },
  formName: { id: 'Formulir', en: 'Form' },
  formNote: { id: 'Brief singkat, dibalas dalam 24 jam', en: 'A short brief, answered within 24 hours' },
  formCta: { id: 'Isi formulir', en: 'Fill in the form' },
  emailName: { id: 'Email', en: 'Email' },
  emailNote: { id: 'Respons dalam 24 jam', en: 'Replies within 24 hours' },
  formH: { id: 'Formulir singkat', en: 'The short form' },
  formLede: {
    id: 'Empat kolom wajib, sisanya opsional. Belum yakin layanan mana yang cocok? Kosongkan pilihan layanan dan ceritakan tujuan bisnis Anda di kolom pesan; kami bantu memilih antara satu layanan atau Kampanye 360°.',
    en: "Four required fields; the rest is optional. Not sure which service fits? Leave the services unticked and tell us your business goal in the message; we'll help you choose between one service and a 360° campaign.",
  },
  stepsLede: {
    id: 'Konsultasi awal gratis. Proposal dikirim setelah sesi discovery, dan keputusan sepenuhnya di tangan Anda.',
    en: 'The first consultation is free. The proposal follows the discovery call, and the decision is entirely yours.',
  },
  stepsH: { id: 'Setelah pesan Anda masuk', en: 'What happens next' },
} satisfies Record<string, L>

export const STEPS: Record<Locale, string[]> = {
  id: ['Kami tinjau brief Anda dalam 24 jam', 'Jadwalkan sesi discovery gratis selama 30 menit', 'Kami siapkan proposal khusus untuk Anda', 'Onboarding & kickoff dalam 1 minggu'],
  en: ['We review your brief within 24 hours', 'Schedule a free 30-minute discovery call', 'We prepare a custom proposal', 'Onboarding and kickoff within 1 week'],
}

// Form labels: short strings handed to the client island as props (never paragraphs).
export const FORM: Record<Locale, Record<string, string>> = {
  id: {
    name: 'Nama', phone: 'WhatsApp', email: 'Email', message: 'Pesan', req: 'wajib',
    phoneHint: 'Contoh: 0812 3456 7890', messagePh: 'Ceritakan bisnis Anda dan apa yang ingin dicapai.',
    services: 'Layanan yang Anda minati', more: 'Detail tambahan (opsional)', company: 'Perusahaan',
    budget: 'Budget per bulan', timeline: 'Waktu mulai', choose: 'Pilih',
    submit: 'Kirim pesan', sending: 'Mengirim…',
    eName: 'Isi nama Anda (minimal 2 huruf).', ePhone: 'Isi nomor WhatsApp Anda.', eEmail: 'Alamat email belum valid.',
    eMessage: 'Ceritakan sedikit lebih banyak (minimal 10 karakter).',
    fail: 'Pesan belum terkirim. Coba lagi, atau chat kami lewat WhatsApp.',
    tooMany: 'Terlalu banyak percobaan. Coba lagi dalam beberapa menit, atau chat kami lewat WhatsApp.',
    okH: 'Terima kasih, pesan Anda sudah kami terima.', okP: 'Kami balas dalam 24 jam. Mau lebih cepat? Lanjutkan lewat WhatsApp.',
    okWa: 'Lanjut di WhatsApp', noscript: 'Formulir ini butuh JavaScript. Chat kami lewat WhatsApp atau kirim email ke hello@logink.co.',
  },
  en: {
    name: 'Name', phone: 'WhatsApp', email: 'Email', message: 'Message', req: 'required',
    phoneHint: 'For example: +62 812 3456 7890', messagePh: 'Tell us about your business and what you want to achieve.',
    services: 'Services you are interested in', more: 'More details (optional)', company: 'Company',
    budget: 'Monthly budget', timeline: 'When to start', choose: 'Choose',
    submit: 'Send message', sending: 'Sending…',
    eName: 'Enter your name (at least 2 letters).', ePhone: 'Enter your WhatsApp number.', eEmail: 'That email address is not valid.',
    eMessage: 'Tell us a little more (at least 10 characters).',
    fail: 'Your message was not sent. Try again, or chat with us on WhatsApp.',
    tooMany: 'Too many attempts. Try again in a few minutes, or chat with us on WhatsApp.',
    okH: 'Thank you, we have received your message.', okP: 'We reply within 24 hours. Want it faster? Continue on WhatsApp.',
    okWa: 'Continue on WhatsApp', noscript: 'This form needs JavaScript. Chat with us on WhatsApp or email hello@logink.co.',
  },
}

// Values are the stored contract (unchanged from the old form); labels are localised.
export const BUDGET: Record<Locale, { value: string; label: string }[]> = {
  id: [{ value: '<5M', label: '< Rp 5 Juta' }, { value: '5-10M', label: 'Rp 5–10 Juta' }, { value: '10-20M', label: 'Rp 10–20 Juta' }, { value: '20-50M', label: 'Rp 20–50 Juta' }, { value: '50M+', label: '> Rp 50 Juta' }],
  en: [{ value: '<5M', label: '< IDR 5M' }, { value: '5-10M', label: 'IDR 5–10M' }, { value: '10-20M', label: 'IDR 10–20M' }, { value: '20-50M', label: 'IDR 20–50M' }, { value: '50M+', label: '> IDR 50M' }],
}
export const TIMELINE: Record<Locale, { value: string; label: string }[]> = {
  id: [{ value: 'ASAP', label: 'Secepatnya' }, { value: '1month', label: 'Dalam 1 bulan' }, { value: '2-3months', label: '2–3 bulan' }, { value: '3+months', label: 'Lebih dari 3 bulan' }],
  en: [{ value: 'ASAP', label: 'As soon as possible' }, { value: '1month', label: 'Within 1 month' }, { value: '2-3months', label: '2–3 months' }, { value: '3+months', label: '3+ months' }],
}
