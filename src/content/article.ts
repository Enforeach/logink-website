// Article page labels (blog detail): FAQ heading, content-block captions, YouTube consent. Post text itself is CMS-owned.
// CMS: Pages → Blog page → Article.
import type { L } from '@/lib/services'
import { live } from '@/cms/store'

export const ARTICLE = live('blog-page', 'article', {
  faqHeading: { id: 'Pertanyaan yang sering diajukan', en: 'Frequently asked questions' },
  takeaways: { id: 'Poin penting', en: 'Key takeaways' },
  tipLabel: { id: 'Tips', en: 'Tip' },
  infoLabel: { id: 'Info', en: 'Note' },
  warningLabel: { id: 'Perhatian', en: 'Heads up' },
  serviceEyebrow: { id: 'Layanan terkait', en: 'Related service' },
  serviceOpen: { id: 'Buka halaman layanan', en: 'Open the service page' },
  waLabel: { id: 'Chat WhatsApp', en: 'Chat WhatsApp' },
  videoConsent: {
    id: 'Video diputar lewat youtube-nocookie.com: YouTube baru menyimpan data setelah Anda menekan putar.',
    en: 'Video plays via youtube-nocookie.com: YouTube only stores data after you press play.',
  },
  videoWatch: { id: 'Tonton di YouTube', en: 'Watch on YouTube' },
} satisfies Record<string, L>)
