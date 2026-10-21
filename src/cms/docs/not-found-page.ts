// Pages → 404 page (src/content/notfound.ts). Always noindex, so no SEO tab.
import '@/content/notfound'
import { pageGlobal } from '../define'

export const NotFoundPage = pageGlobal({
  slug: 'not-found-page',
  label: '404 page',
  group: 'Pages',
  description: 'What visitors see on an address that does not exist. The page links come from the site menu.',
  path: { id: '/halaman-tidak-ada', en: '/en/page-not-found' },
  tabs: [{
    name: 'content',
    label: 'Content',
    ov: {
      title: { label: 'Browser tab title' },
      h1: { label: 'Heading' },
      text: { label: 'Intro text' },
      pagesH: { label: 'Heading above the page links' },
      servicesH: { label: 'Heading above the service links' },
      hub: { label: 'Services & prices link text' },
      waLead: { label: 'Line above the WhatsApp button' },
    },
  }],
})
