// 404 copy (BUILD §3.9 404). Plain data. The links themselves come from the registry.
import type { L } from '@/lib/services'

export const NF = {
  title: { id: 'Halaman tidak ditemukan | Logink', en: 'Page not found | Logink' },
  h1: { id: 'Halaman tidak ditemukan', en: 'Page not found' },
  text: {
    id: 'Alamat ini tidak ada atau sudah dipindahkan, jadi mulai lagi dari salah satu halaman di bawah.',
    en: 'This address does not exist or has moved, so start again from one of the pages below.',
  },
  pagesH: { id: 'Halaman yang mungkin Anda cari', en: 'Pages you may be looking for' },
  servicesH: { id: 'Layanan', en: 'Services' },
  hub: { id: 'Layanan & harga', en: 'Services & prices' },
  waLead: { id: 'Atau tanyakan langsung lewat WhatsApp:', en: 'Or ask us directly on WhatsApp:' },
} satisfies Record<string, L>
