import type { GlobalConfig } from 'payload'

import { anyone, isAuthenticated } from '../payload/access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: { group: 'Settings' },
  access: {
    read: anyone,
    update: isAuthenticated,
  },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Logink' },
    { name: 'tagline', type: 'text' },
    { name: 'contactEmail', type: 'text' },
    { name: 'whatsappNumber', type: 'text' },
    { name: 'instagram', type: 'text' },
    { name: 'address', type: 'text' },
    { name: 'defaultOgImage', type: 'upload', relationTo: 'media' },
  ],
}
