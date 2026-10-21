// Legal → Legal pages: Privacy, Terms, Disclaimer (src/content/legal/*). Page tab + Content tab (the full text,
// written separately per language).
import { page } from '@/lib/services'
import '@/content/legal/privacy'
import '@/content/legal/terms'
import '@/content/legal/disclaimer'
import { keyedCollection, pageTab, seoOf } from '../define'

const DOCS = [['privacy', 'Kebijakan Privasi'], ['terms', 'Syarat & Ketentuan'], ['disclaimer', 'Disclaimer']] as const

const slugify = (s: unknown) => String(s ?? '').toLowerCase().replace(/^\d+\.\s*/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
/** A list the component reads by position: a fixed number of rows. `extra.admin` replaces the generated admin, so
 *  the description and the row label are repeated here. */
const fixedRows = (description: string, minRows: number, maxRows: number) => ({
  minRows, maxRows,
  admin: { description, isSortable: false, components: { RowLabel: '/cms/admin/RowLabel#RowLabel' } },
})

export const LegalPages = keyedCollection({
  slug: 'legal-pages',
  singular: 'Legal page',
  plural: 'Legal pages',
  group: 'Legal',
  description: 'Privacy policy, terms and disclaimer. Changes here are legal text: have them reviewed before publishing.',
  keys: DOCS.map(([key, title]) => ({ key, title, path: page(key).path, seo: seoOf(page(key)) })),
  tabs: [
    pageTab(page('privacy')),
    {
      name: 'content',
      label: 'Content',
      description: 'Legal text: have changes reviewed before publishing. Switch the language at the top right; each language has its own text.',
      rootLocalized: true,
      ov: {
        updated: {
          label: 'Last updated date',
          description: 'Shown as "Last updated" under the heading. Format: YYYY-MM-DD, e.g. 2025-05-01.',
          extra: { validate: (v: unknown) => !v || /^\d{4}-\d{2}-\d{2}$/.test(String(v)) || 'Use the format YYYY-MM-DD, e.g. 2025-05-01' },
        },
        lede: { label: 'Intro line under the heading', type: 'textarea' },
        intro: {
          label: 'Opening paragraph',
          extra: fixedRows('Exactly 3 parts, in order: the text before the bold word, the bold word (e.g. the website name), the text after it.', 3, 3),
        },
        sections: { label: 'Sections', description: 'Each section becomes a heading in the "On this page" list.', dbName: 'lp_sections' },
        'sections.id': {
          label: 'Link ID',
          description: 'Used in the section link (#id) and the "On this page" list. Filled in automatically for new sections; leave existing ones unchanged.',
          readOnly: true,
          extra: { hooks: { beforeValidate: [({ value, siblingData }: { value?: string; siblingData?: { title?: string } }) => value || slugify(siblingData?.title)] } },
        },
        'sections.title': { label: 'Section heading', description: 'Keep the number at the start (e.g. "1. Information We Collect"); the side list hides it.' },
        'sections.content': { label: 'Paragraphs', description: 'Each paragraph has a small heading and its text.', dbName: 'lp_items' },
        'sections.content.subtitle': { label: 'Paragraph heading' },
        'sections.content.text': { label: 'Paragraph text', type: 'textarea' },
        ask: {
          label: 'Questions card (right side)',
          extra: fixedRows('Row 1: the question. Row 2 (optional): the short line under it.', 1, 2),
        },
      },
    },
  ],
})
