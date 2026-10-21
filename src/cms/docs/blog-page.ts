// Pages → Blog page. Phase 1B adds the content tabs (docs/cms/PLAN.md).
import { page } from '@/lib/services'
import { pageGlobal, pageTab, seoOf } from '../define'

export const BlogPage = pageGlobal({
  slug: 'blog-page',
  label: 'Blog page',
  group: 'Pages',
  description: 'The blog home and the labels around articles.',
  path: page('blog').path,
  seo: seoOf(page('blog')),
  tabs: [pageTab(page('blog'))],
})
