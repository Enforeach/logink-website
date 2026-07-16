import type { CollectionConfig } from 'payload'
import { isAuthenticated } from '../payload/access'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'company', 'isRead', 'createdAt'],
    group: 'Leads',
  },
  access: {
    create: isAuthenticated,
    read: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'text', required: true },
    { name: 'company', type: 'text' },
    { name: 'phone', type: 'text' },
    { name: 'services', type: 'json' },
    { name: 'budgetRange', type: 'text' },
    { name: 'timeline', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
    { name: 'source', type: 'text' },
    {
      name: 'isRead',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
  ],
}
