import type { CollectionConfig } from 'payload'
import { anyone, isAuthenticated } from '../payload/access'
import { slugField } from '../payload/fields'
import { makeRevalidateHooks } from '../payload/revalidate'

const revalidate = makeRevalidateHooks(['/blog', '/en/blog'])

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'nameId',
    defaultColumns: ['nameId', 'nameEn', 'slug', 'sortOrder'],
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
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
