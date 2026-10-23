import type { CollectionConfig } from 'payload'
import { isAuthenticated, anyone } from '../payload/access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content' },
  access: {
    read: anyone,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  upload: {
    // Files are stored on Vercel Blob via the storage adapter (see payload.config.ts).
    mimeTypes: ['image/*'],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 225, position: 'centre' },
      { name: 'card', width: 768, height: 432, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
      { name: 'featured', width: 1920, height: 1080, position: 'centre' },
    ],
  },
  fields: [
    { name: 'alt', type: 'text', label: 'Alt text' },
    {
      name: 'folder',
      type: 'select',
      defaultValue: 'general',
      options: ['general', 'blog', 'case-studies', 'services', 'team'].map((v) => ({ label: v, value: v })),
      admin: { position: 'sidebar' },
    },
  ],
}
