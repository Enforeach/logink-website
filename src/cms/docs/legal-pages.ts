// Legal → Legal pages: Privacy, Terms, Disclaimer (src/content/legal/*). Phase 1D adds the Content tab.
import { page } from '@/lib/services'
import { keyedCollection, pageTab, seoOf } from '../define'

const DOCS = [['privacy', 'Kebijakan Privasi'], ['terms', 'Syarat & Ketentuan'], ['disclaimer', 'Disclaimer']] as const

export const LegalPages = keyedCollection({
  slug: 'legal-pages',
  singular: 'Legal page',
  plural: 'Legal pages',
  group: 'Legal',
  description: 'Privacy policy, terms and disclaimer. Changes here are legal text: have them reviewed before publishing.',
  keys: DOCS.map(([key, title]) => ({ key, title, path: page(key).path, seo: seoOf(page(key)) })),
  tabs: [pageTab(page('privacy'))],
})
