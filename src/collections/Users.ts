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
    { name: 'jobTitleId', type: 'text', label: 'Job title (Indonesian)', admin: { description: 'Shown in the article author widget, e.g. "Kepala SEO".' } },
    { name: 'jobTitleEn', type: 'text', label: 'Job title (English)' },
    { name: 'bioId', type: 'textarea', label: 'Short bio (Indonesian)', admin: { description: 'One or two sentences, shown in the author widget.' } },
    { name: 'bioEn', type: 'textarea', label: 'Short bio (English)' },
    { name: 'profileUrl', type: 'text', label: 'Profile link', admin: { description: 'LinkedIn or personal page (https://...). Used as the author link and in structured data.' } },
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
