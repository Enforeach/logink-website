import type { CollectionConfig } from 'payload'
import { anyone, isAuthenticated } from '../payload/access'
import { slugField } from '../payload/fields'
import { makeRevalidateHooks } from '../payload/revalidate'

const revalidate = makeRevalidateHooks(['/portfolio', '/en/portfolio'])

export const Industries: CollectionConfig = {
  slug: 'industries',
  admin: {
    useAsTitle: 'nameId',
    defaultColumns: ['nameId', 'nameEn', 'slug'],
    group: 'Content',
  },
  access: {
    read: anyone,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: {
    afterChange: [revalidate.afterChange],
    afterDelete: [revalidate.afterDelete],
  },
  fields: [
    { name: 'nameId', type: 'text', required: true },
    { name: 'nameEn', type: 'text' },
    slugField('nameId'),
    { name: 'accentColor', type: 'text', admin: { description: 'Hex color, e.g. #A855F7' } },
  ],
}
