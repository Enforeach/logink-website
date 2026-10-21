// Pages → Services hub (src/content/hub.ts). Tabs follow the page order.
import { page } from '@/lib/services'
import { HUB_FAQ, HUB_FAQ_H } from '@/content/hub'
import '@/content/hub'
import { pageGlobal, pageTab, seoOf } from '../define'

export const HubPage = pageGlobal({
  slug: 'hub-page',
  label: 'Services hub',
  group: 'Pages',
  description: 'The services & prices overview (/layanan). Tabs run in page order. Use the language picker (top right) to edit both languages.',
  path: page('hub').path,
  seo: seoOf(page('hub')),
  tabs: [
    pageTab(page('hub')),
    {
      name: 'hub',
      label: 'Intro & prices table',
      description: 'The sentence under the heading and the heading/note around the services table. Prices themselves come from the services.',
      ov: {
        crumb: { label: 'Breadcrumb name', description: 'The page name in the breadcrumb trail and in Google’s breadcrumb markup.' },
        word: { label: 'Small label above the heading' },
        lede: { label: 'Sentence under the heading' },
        tableH: { label: 'Table heading' },
        tableNote: { label: 'Note under the table' },
      },
    },
    {
      name: 'offer',
      label: '360° campaign',
      description: 'The 360° campaign block. The map and the four pillars are in Shared → 360° campaign.',
      ov: {
        h2: { label: 'Heading' },
        lead1: { label: 'First sentence', description: 'Also the description in Google’s data for this offer: keep it a full sentence.' },
        lead2: { label: 'Second sentence' },
        lead3: { label: 'Third sentence (pricing)' },
        pillarsH: { label: 'Screen-reader name of the pillar list' },
        proposal: { label: 'Button: request a proposal' },
        mapH: { skip: true },
      },
    },
    {
      label: 'FAQ',
      description: 'Questions and answers at the bottom of the page. They also feed Google’s FAQ markup.',
      defs: [{ faqH: HUB_FAQ_H, faq: HUB_FAQ }],
      ov: {
        faqH: { label: 'Section heading' },
        faq: { label: 'Questions' },
        'faq.q': { label: 'Question' },
        'faq.a': { label: 'Answer', description: '40 to 80 words; the first sentence should answer the question. Keep prices in step with the services.' },
      },
    },
  ],
})
