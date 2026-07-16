import type { CollectionConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../payload/access'
import { slugField, statusField, setPublishedAt } from '../payload/fields'
import { makeRevalidateHooks } from '../payload/revalidate'

// Revalidate the blog lists AND each post's own detail URL (new + previous slug),
// so drafting/unpublishing or renaming a post immediately purges its page from
// cache instead of leaving it publicly reachable until ISR expires.
const { afterChange, afterDelete } = makeRevalidateHooks(['/blog', '/en/blog', '/'], (doc, prev) => {
  const paths: string[] = []
  const add = (p: unknown, base: string) => {
    if (typeof p === 'string' && p) paths.push(`${base}/${p}`)
  }
  add(doc.slug, '/blog')
  add(doc.slugEn, '/en/blog')
  if (prev && prev.slug !== doc.slug) add(prev.slug, '/blog')
  if (prev && prev.slugEn !== doc.slugEn) add(prev.slugEn, '/en/blog')
  return paths
})

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
    {
      name: 'bodyFormat',
      type: 'radio',
      defaultValue: 'richtext',
      options: [
        { label: 'Rich text editor', value: 'richtext' },
        { label: 'Markdown', value: 'markdown' },
      ],
      admin: {
        layout: 'horizontal',
        description: 'How you author the article body. "Rich text" uses the visual editor; "Markdown" lets you write/paste raw Markdown. The published article uses whichever is selected here.',
      },
    },
    // Rich text bodies (shown when format = richtext)
    {
      name: 'bodyId',
      type: 'richText',
      label: 'Body — Indonesian (Rich Text)',
      admin: { condition: (data) => data?.bodyFormat !== 'markdown' },
    },
    {
      name: 'bodyEn',
      type: 'richText',
      label: 'Body — English (Rich Text)',
      admin: { condition: (data) => data?.bodyFormat !== 'markdown' },
    },
    // Markdown bodies (shown when format = markdown)
    {
      name: 'bodyMarkdownId',
      type: 'textarea',
      label: 'Body — Indonesian (Markdown)',
      admin: {
        condition: (data) => data?.bodyFormat === 'markdown',
        rows: 22,
        description: 'Markdown source: headings (## / ###), lists, links, bold/italic, blockquotes, images, code.',
      },
    },
    {
      name: 'bodyMarkdownEn',
      type: 'textarea',
      label: 'Body — English (Markdown)',
      admin: {
        condition: (data) => data?.bodyFormat === 'markdown',
        rows: 22,
        description: 'Optional English translation, in Markdown.',
      },
    },
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
