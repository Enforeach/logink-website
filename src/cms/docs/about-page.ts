// Pages → About. Phase 1B adds the content tabs (docs/cms/PLAN.md).
import { page } from '@/lib/services'
import { pageGlobal, pageTab, seoOf } from '../define'

export const AboutPage = pageGlobal({
  slug: 'about-page',
  label: 'About',
  group: 'Pages',
  description: 'The About page.',
  path: page('about').path,
  seo: seoOf(page('about')),
  tabs: [pageTab(page('about'))],
})
