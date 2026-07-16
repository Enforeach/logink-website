import type { CollectionConfig } from 'payload'
import { anyone, isAuthenticated } from '../payload/access'
import { slugField } from '../payload/fields'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
    group: 'Content',
  },
  access: {
    read: anyone,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    { name: 'name', type: 'text', required: true, unique: true },
    slugField('name'),
  ],
}
