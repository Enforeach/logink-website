// Pages → Portfolio page (src/content/portfolio.ts): the list page and the labels around every case study.
// The case studies themselves (titles, numbers, stories) are in the Portfolio collection.
import '@/content/portfolio'
import { page } from '@/lib/services'
import { pageGlobal, pageTab, seoOf } from '../define'

export const PortfolioPage = pageGlobal({
  slug: 'portfolio-page',
  label: 'Portfolio page',
  group: 'Pages',
  description: 'The portfolio list and the labels around case studies. The case studies themselves are in the Portfolio section. Switch the language at the top right to edit Bahasa Indonesia or English.',
  path: page('portfolio').path,
  seo: seoOf(page('portfolio')),
  tabs: [
    pageTab(page('portfolio')),
    {
      name: 'list',
      label: 'Portfolio list',
      description: 'Texts on the page that lists all case studies.',
      ov: {
        crumb: { label: 'Breadcrumb name', description: 'The page name in the trail at the top.' },
        word: { label: 'Page name in the header and cards' },
        ledeTpl: { label: 'Opening line', description: '{n} = the number of case studies, filled in by the site: keep it.' },
        casesH: { label: 'Heading of the case study list' },
        emptyH: { label: 'No case studies: heading' },
        empty: { label: 'No case studies: text' },
      },
    },
    {
      name: 'case',
      label: 'Case study labels',
      description: 'Fixed labels shown on every case study page. Words in {braces} are filled in by the site: keep them.',
      ov: {
        sections: { label: 'Section names', description: 'Used in the menu under the heading and as section headings.' },
        'sections.ringkasan': { label: 'Summary' },
        'sections.tantangan': { label: 'The challenge' },
        'sections.strategi': { label: 'The strategy' },
        'sections.hasil': { label: 'Results' },
        subnav: { label: 'Section menu: name for screen readers' },
        start: { label: 'Start-a-project button' },
        servicesUsed: { label: 'Heading: services used' },
        client: { label: 'Heading: about the client' },
        timeline: { label: 'Heading: project timeline' },
        period: { label: 'Label: period' },
        source: { label: 'Data source line' },
        monthOne: { label: 'Duration: one month', description: '{n} = number of months. Shown when the duration is exactly 1.' },
        monthMany: { label: 'Duration: several months', description: '{n} = number of months.' },
        within: { label: 'Word between a result and its duration', description: 'For example "in" in "+11% in 5 months".' },
        related: { label: 'Heading: more case studies' },
        pairs: { label: 'Heading: related services' },
        emptyH: { label: 'Case being updated: heading' },
        empty: { label: 'Case being updated: text' },
        ctaH: { label: 'Closing call to action: heading' },
        cta: { label: 'Closing call to action: text' },
      },
    },
  ],
})
