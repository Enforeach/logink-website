import type { CollectionConfig } from 'payload'
import { isAuthenticated, anyone } from '../payload/access'
import { slugField } from '../payload/fields'
import { makeRevalidateHooks } from '../payload/revalidate'

const { afterChange, afterDelete } = makeRevalidateHooks(['/', '/en', '/layanan', '/en/services'])

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'funnelPosition', 'sortOrder', 'isActive'],
  },
  access: {
    read: anyone,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: { afterChange: [afterChange], afterDelete: [afterDelete] },
  fields: [
    { name: 'name', type: 'text', required: true },
    slugField('name'),
    { name: 'descriptionId', type: 'textarea', required: true },
    { name: 'descriptionEn', type: 'textarea' },
    { name: 'shortDescId', type: 'text' },
    { name: 'shortDescEn', type: 'text' },
    { name: 'icon', type: 'text', admin: { description: 'icon id or emoji' } },
    { name: 'color', type: 'text', required: true, admin: { description: 'Hex accent' } },
    { name: 'funnelPosition', type: 'text' },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    { name: 'seoSchema', type: 'json' },
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' },
    { name: 'isActive', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    {
      name: 'pricingTiers',
      type: 'array',
      label: 'Pricing Tiers',
      fields: [
        { name: 'tierName', type: 'text', required: true },
        { name: 'priceLabel', type: 'text', required: true },
        { name: 'priceValue', type: 'number' },
        { name: 'features', type: 'json' },
        { name: 'isPopular', type: 'checkbox', defaultValue: false },
        { name: 'sortOrder', type: 'number', defaultValue: 0 },
      ],
    },
    {
      name: 'addOns',
      type: 'array',
      label: 'Add-ons',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'text' },
        { name: 'priceLabel', type: 'text' },
        { name: 'isActive', type: 'checkbox', defaultValue: true },
      ],
    },
  ],
}
