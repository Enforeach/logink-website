// Pages → Contact. Phase 1B adds the content tabs (docs/cms/PLAN.md).
import { page } from '@/lib/services'
import { pageGlobal, pageTab, seoOf } from '../define'

export const ContactPage = pageGlobal({
  slug: 'contact-page',
  label: 'Contact',
  group: 'Pages',
  description: 'The contact page and its form.',
  path: page('contact').path,
  seo: seoOf(page('contact')),
  tabs: [pageTab(page('contact'))],
})
