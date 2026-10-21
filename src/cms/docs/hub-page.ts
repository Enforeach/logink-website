// Pages → Services hub. Phase 1A adds the content tabs (docs/cms/PLAN.md).
import { page } from '@/lib/services'
import { pageGlobal, pageTab, seoOf } from '../define'

export const HubPage = pageGlobal({
  slug: 'hub-page',
  label: 'Services hub',
  group: 'Pages',
  description: 'The services & prices overview (/layanan).',
  path: page('hub').path,
  seo: seoOf(page('hub')),
  tabs: [pageTab(page('hub'))],
})
