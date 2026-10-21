// Pages → Home. Phase 1A adds the content tabs (docs/cms/PLAN.md).
import { page } from '@/lib/services'
import { pageGlobal, pageTab, seoOf } from '../define'

export const HomePage = pageGlobal({
  slug: 'home-page',
  label: 'Home',
  group: 'Pages',
  description: 'The homepage.',
  path: page('home').path,
  seo: seoOf(page('home')),
  tabs: [pageTab(page('home'))],
})
