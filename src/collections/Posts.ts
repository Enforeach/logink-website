import type { CollectionConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../payload/access'
import { slugField, statusField, setPublishedAt } from '../payload/fields'
import { makeRevalidateHooks } from '../payload/revalidate'

const { afterChange, afterDelete } = makeRevalidateHooks(['/blog', '/en/blog', '/'], ['posts'])

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    group: 'Content',
    useAsTitle: 'titleId',
    defaultColumns: ['titleId', 'status', 'publishedAt'],
  },
  access: {
    read: publishedOrAuthed,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: { afterChange: [afterChange], afterDelete: [afterDelete] },
  fields: [
    { name: 'titleId', type: 'text', required: true },
    { name: 'titleEn', type: 'text' },
    slugField('titleId'),
    {
      name: 'slugEn',
      type: 'text',
      unique: true,
      admin: { position: 'sidebar', description: 'English URL slug' },
    },
    { name: 'excerptId', type: 'textarea' },
    { name: 'excerptEn', type: 'textarea' },
    { name: 'bodyId', type: 'richText', required: true },
    { name: 'bodyEn', type: 'richText' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'featuredImageAlt', type: 'text' },
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' },
    { name: 'metaTitleEn', type: 'text' },
    { name: 'metaDescriptionEn', type: 'textarea' },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
    { name: 'focusKeyword', type: 'text' },
    {
      name: 'readingTime',
      type: 'number',
      admin: { position: 'sidebar', readOnly: true, description: 'auto-calculated' },
    },
    {
      name: 'wordCount',
      type: 'number',
      admin: { position: 'sidebar', readOnly: true, description: 'auto-calculated' },
    },
    statusField,
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      admin: { position: 'sidebar' },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
      hooks: { beforeValidate: [setPublishedAt] },
    },
    { name: 'scheduledAt', type: 'date', admin: { position: 'sidebar' } },
  ],
}
