// About copy: /about + /en/about (owner 2026-10-05: the document layout benchmarked on duomark.id). Only facts that
// exist: no founding year, PT, street address, team or client counts until the owner supplies them. The process
// steps, service outcomes and 360° wording are read from their one source (content/home, lib/services).
import type { L } from '@/lib/services'

export const ABOUT = {
  crumb: { id: 'Tentang', en: 'About' } as L,
  eyebrow: { id: 'Perusahaan', en: 'Company' } as L,
  intro: {
    id: 'Logink membantu UMKM dan brand yang sedang bertumbuh di Indonesia agar mudah ditemukan, dipercaya, dikutip AI, lalu dihubungi calon pelanggan. Kami bekerja dari Jakarta, dengan harga yang jelas dan angka yang bisa Anda cek sendiri.',
    en: 'Logink helps growing Indonesian SMEs and brands get found, trusted, cited by AI and then contacted by customers. We work from Jakarta, with clear prices and numbers you can check yourself.',
  } as L,
  sections: {
    who: { id: 'Siapa kami', en: 'Who we are' } as L,
    ways: { id: 'Dua cara bekerja sama', en: 'Two ways to work with us' } as L,
    how: { id: 'Cara kami bekerja', en: 'How we work' } as L,
    why: { id: 'Kenapa Logink', en: 'Why Logink' } as L,
    not: { id: 'Yang tidak kami janjikan', en: 'What we do not promise' } as L,
    services: { id: 'Layanan kami', en: 'Our services' } as L,
  },
  who: [
    {
      id: 'Kami tim digital marketing yang percaya brand tidak harus memilih antara strategi yang kuat, konten kreatif, dan hasil yang terukur. Anda bisa mendapatkan ketiganya.',
      en: "We are a digital marketing team that believes brands shouldn't have to choose between strong strategy, creative content and measurable results. You can have all three.",
    },
    {
      id: 'Pekerjaan kami mencakup SEO, Local SEO & Google Maps, iklan digital, social media, desain & video, website, dan SEO AI. Semuanya diukur dengan data dari akun Anda sendiri, dan diarahkan ke satu tujuan: lebih banyak chat dan penjualan.',
      en: 'Our work covers SEO, Local SEO & Google Maps, digital ads, social media, design & video, websites and AI search. All of it is measured with data from your own accounts, and pointed at one goal: more chats and sales.',
    },
  ] as L[],
  ways: [
    { t: { id: 'Satu layanan.', en: 'One service.' }, d: { id: 'Ambil layanan yang Anda butuhkan, dengan harga atau penawarannya sendiri di setiap halaman layanan.', en: 'Hire the service you need, at the price or quote shown on its own service page.' } },
    { t: { id: 'Kampanye 360°.', en: '360° campaign.' }, d: { id: 'Satu tim menjalankan semua kanal yang Anda pilih sebagai satu kampanye, lewat proposal kustom.', en: 'One team runs every channel you choose as one campaign, by custom proposal.' } },
  ] as { t: L; d: L }[],
  waysMore: { id: 'Anda bisa mulai dari satu layanan, lalu menyambungkan kanal lain nanti.', en: 'You can start with one service and connect more channels later.' } as L,
  howLead: { id: 'Sebelum ada kontrak, Anda sudah melihat peluang, rencana kerja, dan biayanya:', en: "Before any contract, you've already seen the opportunity, the plan and the cost:" } as L,
  why: [
    { t: { id: 'Satu layanan atau 360°.', en: 'One service or 360°.' }, d: { id: 'Anda memilih cakupannya, dan bisa menambah kanal kapan saja.', en: 'You choose the scope, and can add channels at any time.' } },
    { t: { id: 'Harga yang jelas.', en: 'Clear pricing.' }, d: { id: 'Harga mulai ada di setiap halaman layanan. Sisanya mendapat proposal dalam 24 jam.', en: 'Starting prices are on every service page. The rest get a proposal within 24 hours.' } },
    { t: { id: 'Dibuat untuk brand Anda.', en: 'Made for your brand.' }, d: { id: 'Tidak ada konten generik: setiap karya dibuat untuk audiens Anda dan pasar Indonesia.', en: 'No generic content: every piece is made for your audience and the Indonesian market.' } },
    { t: { id: 'Angka yang bisa Anda cek.', en: 'Numbers you can check.' }, d: { id: 'Kami mengukur leads, penjualan, dan chat. Akun iklan, GA4, dan Search Console tetap milik Anda.', en: 'We measure leads, sales and chats. Ad accounts, GA4 and Search Console stay yours.' } },
  ] as { t: L; d: L }[],
  not: [
    { id: 'Posisi pertama di Google dalam waktu tertentu.', en: 'The top position on Google by a set date.' },
    { id: 'Kutipan di ChatGPT atau AI Overview. Kami tidak menjamin kutipan, tetapi kami mengukur progresnya.', en: 'Citations in ChatGPT or AI Overviews. We do not guarantee citations, but we measure progress.' },
    { id: 'Konten yang pasti viral.', en: 'Content that is sure to go viral.' },
    { id: 'Angka yang tidak bisa Anda cek sendiri.', en: 'Numbers you cannot check yourself.' },
  ] as L[],
  // aside cards
  glance: { id: 'Logink singkat', en: 'Logink at a glance' } as L,
  facts: [
    { k: { id: 'Kota', en: 'City' }, v: { id: 'Jakarta, Indonesia', en: 'Jakarta, Indonesia' } },
    { k: { id: 'Fokus', en: 'Focus' }, v: { id: 'Digital marketing 360°', en: '360° digital marketing' } },
    { k: { id: 'Klien', en: 'Clients' }, v: { id: 'UMKM & brand yang bertumbuh', en: 'Growing SMEs & brands' } },
    { k: { id: 'Cara bekerja sama', en: 'Ways to work' }, v: { id: 'Satu layanan atau Kampanye 360°', en: 'One service or a 360° campaign' } },
    { k: { id: 'Bahasa', en: 'Languages' }, v: { id: 'Indonesia & Inggris', en: 'Indonesian & English' } },
  ] as { k: L; v: L }[],
  ask: { id: 'Siap tumbuh bersama Logink?', en: 'Ready to grow with Logink?' } as L,
  askSub: { id: 'Ceritakan bisnis Anda. Kami balas dengan saran yang jujur.', en: "Tell us about your business. We'll reply with honest advice." } as L,
}
