import type { CollectionConfig } from 'payload'
import { isAuthenticated } from '../payload/access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
    group: 'Admin',
  },
  access: {
    read: isAuthenticated,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'avatar', type: 'upload', relationTo: 'media', admin: { description: 'Author avatar shown on blog posts.' } },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'EDITOR',
      options: [
        { label: 'Admin', value: 'ADMIN' },
        { label: 'Editor', value: 'EDITOR' },
        { label: 'Viewer', value: 'VIEWER' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
