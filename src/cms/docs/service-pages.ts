// Services → Service pages: one document per service (src/lib/services.ts + src/content/services/<key>.ts).
// Phase 1C adds the Content tab.
import { SERVICES } from '@/lib/services'
import { keyedCollection, seoOf } from '../define'

export const ServicePages = keyedCollection({
  slug: 'service-pages',
  singular: 'Service page',
  plural: 'Service pages',
  group: 'Services',
  description: 'One document per service page. Prices, names and texts here update the menu, the services table and the page itself.',
  keys: SERVICES.map((s) => ({ key: s.key, title: s.name.id, path: s.path, seo: seoOf(s) })),
  tabs: [{
    name: 'basics',
    label: 'Page',
    description: 'Name, one-liner and price appear in the menu, the services table and the page hero. Title and description are in the SEO tab.',
    defs: SERVICES.map((s) => {
      const { name, line, h1, price, quote, wa } = s
      return { name, line, h1, price, quote, wa }
    }),
    ov: {
      name: { label: 'Service name', description: 'Used as link text everywhere (menu, table, footer).' },
      line: { label: 'One-line summary', description: 'Services table and menu.' },
      price: { label: 'Price line', description: 'Exactly as shown, e.g. "Rp 8 · 10 · 15 Juta/bulan". Empty = custom quote (the line below is shown instead).' },
      quote: { label: 'Custom quote line', description: 'Shown when the price line is empty.' },
      wa: { description: 'Pre-filled text when a visitor taps WhatsApp on this page.' },
    },
  }],
})
