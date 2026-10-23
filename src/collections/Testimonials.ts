import type { CollectionConfig } from 'payload'
import { isAuthenticated, anyone } from '../payload/access'
import { makeRevalidateHooks } from '../payload/revalidate'

const revalidate = makeRevalidateHooks(['/', '/en'])

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'companyName', 'isHighlighted'],
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
    { name: 'clientName', type: 'text', required: true },
    { name: 'clientTitle', type: 'text', required: true },
    { name: 'clientPhoto', type: 'upload', relationTo: 'media' },
    { name: 'quote', type: 'textarea', required: true },
    { name: 'companyName', type: 'text', required: true },
    {
      name: 'isHighlighted',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Show on homepage' },
    },
  ],
}
