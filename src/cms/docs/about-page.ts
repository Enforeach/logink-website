// Pages → About (src/content/about.ts). Tabs follow the page from top to bottom.
import '@/content/about'
import { page } from '@/lib/services'
import { pageGlobal, pageTab, seoOf } from '../define'

const LINE = 'One line per row. Add or remove rows with the buttons; the order here is the order on the page.'

export const AboutPage = pageGlobal({
  slug: 'about-page',
  label: 'About',
  group: 'Pages',
  description: 'The About page, from the top banner down to the side cards. Switch the language at the top right to edit Bahasa Indonesia or English.',
  path: page('about').path,
  seo: seoOf(page('about')),
  tabs: [
    pageTab(page('about')),
    {
      name: 'top',
      label: 'Top banner',
      description: 'The small text above the heading and the opening paragraph. The heading itself is in the Page tab.',
      ov: {
        crumb: { label: 'Breadcrumb name', description: 'The page name in the trail at the very top (Home / About).' },
        eyebrow: { label: 'Small label above the heading' },
        intro: { label: 'Opening paragraph', description: 'The large paragraph under the heading.' },
      },
    },
    {
      name: 'headings',
      label: 'Section headings',
      description: 'The six headings of the page. They also appear in the "On this page" list on the left.',
      ov: {
        sections: { label: 'Headings' },
        'sections.who': { label: '1. Who we are' },
        'sections.ways': { label: '2. Ways to work together' },
        'sections.how': { label: '3. How we work', description: 'The steps below this heading come from the Home page process.' },
        'sections.why': { label: '4. Why Logink' },
        'sections.not': { label: '5. What we do not promise' },
        'sections.services': { label: '6. Our services', description: 'The service list below this heading is generated from the service pages.' },
      },
    },
    {
      name: 'story',
      label: 'Who we are & ways to work',
      ov: {
        who: { label: 'Who we are: paragraphs', description: 'Each row is one paragraph in this language. Add or remove rows with the buttons.' },
        'who.text': { label: 'Paragraph' },
        ways: { label: 'Two ways to work together', description: 'Each row is a bold lead-in followed by a sentence.' },
        'ways.t': { label: 'Bold lead-in', description: 'Ends with a full stop, e.g. "One service."' },
        'ways.d': { label: 'Sentence after it' },
        waysMore: { label: 'Line after the list', description: 'A link "How it works" is added after it automatically.' },
        howLead: { label: 'Line before the steps', description: 'Introduces the process steps (which come from the Home page).' },
      },
    },
    {
      name: 'why',
      label: 'Why Logink & promises',
      ov: {
        why: { label: 'Why Logink: reasons', description: 'Each row is a bold lead-in followed by a sentence.' },
        'why.t': { label: 'Bold lead-in' },
        'why.d': { label: 'Sentence after it' },
        not: { label: 'What we do not promise', description: LINE },
        'not.text': { label: 'Line' },
      },
    },
    {
      name: 'aside',
      label: 'Side cards',
      description: 'The two cards beside the text: "Logink at a glance" and the call to action.',
      ov: {
        glance: { label: 'Facts card: title' },
        facts: { label: 'Facts card: rows', description: 'Each row is a label and its value, e.g. City / Jakarta, Indonesia.' },
        'facts.k': { label: 'Label' },
        'facts.v': { label: 'Value' },
        ask: { label: 'Call-to-action card: title' },
        askSub: { label: 'Call-to-action card: text', description: 'The WhatsApp button below it uses the message from the Page tab.' },
      },
    },
  ],
})
