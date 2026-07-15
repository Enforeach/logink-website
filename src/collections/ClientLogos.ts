import type { CollectionConfig } from 'payload'
import { isAuthenticated, anyone } from '../payload/access'
import { makeRevalidateHooks } from '../payload/revalidate'

const revalidate = makeRevalidateHooks(['/', '/en'])

// Client logos for the "Trusted by leading Indonesian brands" home strip.
// The strip only renders when at least one active logo exists — so it stays
// hidden until the team has enough clients to show.
export const ClientLogos: CollectionConfig = {
  slug: 'client-logos',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'isActive', 'sortOrder'],
    group: 'Content',
    description: 'Logos shown in the homepage "Trusted by" strip. The strip is hidden while this list is empty.',
  },
  access: {
    read: anyone,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: { afterChange: [revalidate.afterChange], afterDelete: [revalidate.afterDelete] },
  fields: [
    { name: 'name', type: 'text', required: true, admin: { description: 'Client / brand name (used as alt text).' } },
    { name: 'logo', type: 'upload', relationTo: 'media', required: true, admin: { description: 'Transparent PNG or SVG works best.' } },
    { name: 'url', type: 'text', admin: { description: 'Optional link to the client website.' } },
    { name: 'isActive', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar', description: 'Lower shows first.' } },
  ],
}
