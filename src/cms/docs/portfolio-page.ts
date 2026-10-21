// Pages → Portfolio page. Phase 1B adds the content tabs (docs/cms/PLAN.md).
import { page } from '@/lib/services'
import { pageGlobal, pageTab, seoOf } from '../define'

export const PortfolioPage = pageGlobal({
  slug: 'portfolio-page',
  label: 'Portfolio page',
  group: 'Pages',
  description: 'The portfolio list and the labels on case studies.',
  path: page('portfolio').path,
  seo: seoOf(page('portfolio')),
  tabs: [pageTab(page('portfolio'))],
})
