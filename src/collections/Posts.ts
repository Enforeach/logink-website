import type { CollectionConfig } from 'payload'
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from '@payloadcms/plugin-seo/fields'
import { isAuthenticated, publishedOrAuthed } from '../payload/access'
import { slugField, statusField, setPublishedAt } from '../payload/fields'
import { makeRevalidateHooks } from '../payload/revalidate'
import { SVC_OPTIONS, articleEditor } from '../payload/articleBlocks'

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
    // Unnamed tabs only: the layout is admin-only, every field keeps its name and DB column.
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Bahasa Indonesia',
          fields: [
            { name: 'titleId', type: 'text', required: true },
            { name: 'excerptId', type: 'textarea' },
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
                description: 'How you author the article body (both languages). "Rich text" uses the visual editor; "Markdown" lets you write/paste raw Markdown. The published article uses whichever is selected here.',
              },
            },
            // Rich text bodies (shown when format = richtext). Type "/" for callouts, takeaways, CTAs and video.
            {
              name: 'bodyId',
              type: 'richText',
              label: 'Body — Indonesian (Rich Text)',
              editor: articleEditor,
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
          ],
        },
        {
          label: 'English',
          fields: [
            { name: 'titleEn', type: 'text' },
            { name: 'excerptEn', type: 'textarea' },
            {
              name: 'bodyEn',
              type: 'richText',
              label: 'Body — English (Rich Text)',
              editor: articleEditor,
              admin: { condition: (data) => data?.bodyFormat !== 'markdown' },
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
          ],
        },
        {
          label: 'Media',
          fields: [
            { name: 'featuredImage', type: 'upload', relationTo: 'media' },
            { name: 'featuredImageAlt', type: 'text' },
          ],
        },
        {
          label: 'Article components',
          description: 'The pieces around the article. Defaults reproduce the standard layout.',
          fields: [
            {
              name: 'relatedService',
              type: 'select',
              options: SVC_OPTIONS,
              admin: { description: 'Service promoted in the image card, mid-article CTA and sidebar. Blank = the one that matches the category.' },
            },
            {
              name: 'showFeatureCard',
              type: 'checkbox',
              defaultValue: true,
              label: 'Show the service card on the featured image',
            },
            {
              name: 'midCta',
              type: 'group',
              label: 'Mid-article service CTA',
              fields: [
                { name: 'show', type: 'checkbox', defaultValue: true, label: 'Show the CTA inside the article' },
                {
                  name: 'position',
                  type: 'select',
                  defaultValue: 'middle',
                  options: [
                    { label: 'Middle of the article', value: 'middle' },
                    { label: 'After paragraph 2', value: 'p2' },
                    { label: 'After paragraph 3', value: 'p3' },
                    { label: 'After paragraph 4', value: 'p4' },
                    { label: 'After paragraph 5', value: 'p5' },
                    { label: 'End of the article', value: 'end' },
                  ],
                },
              ],
            },
            {
              name: 'faqId',
              type: 'array',
              label: 'FAQ — Indonesian',
              labels: { singular: 'Question', plural: 'Questions' },
              admin: { description: 'Shown under the article and added to Google as FAQ structured data.' },
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
              ],
            },
            {
              name: 'faqEn',
              type: 'array',
              label: 'FAQ — English',
              labels: { singular: 'Question', plural: 'Questions' },
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          // plugin-seo's own components on the existing fields (names and columns unchanged)
          fields: [
            OverviewField({ titlePath: 'metaTitle', descriptionPath: 'metaDescription', imagePath: 'ogImage', overrides: { name: 'seoOverviewId', label: 'Overview — Indonesian' } }),
            MetaTitleField({ overrides: { name: 'metaTitle', localized: false, label: 'Meta title — Indonesian' } }),
            MetaDescriptionField({ overrides: { name: 'metaDescription', localized: false, label: 'Meta description — Indonesian' } }),
            PreviewField({ titlePath: 'metaTitle', descriptionPath: 'metaDescription', overrides: { name: 'seoPreviewId', label: 'Google preview — Indonesian' } }),
            MetaTitleField({ overrides: { name: 'metaTitleEn', localized: false, label: 'Meta title — English' } }),
            MetaDescriptionField({ overrides: { name: 'metaDescriptionEn', localized: false, label: 'Meta description — English' } }),
            PreviewField({ titlePath: 'metaTitleEn', descriptionPath: 'metaDescriptionEn', overrides: { name: 'seoPreviewEn', label: 'Google preview — English' } }),
            MetaImageField({ relationTo: 'media', overrides: { name: 'ogImage', localized: false, label: 'Share image (Open Graph)' } }),
            { name: 'focusKeyword', type: 'text' },
            {
              name: 'noIndex',
              type: 'checkbox',
              label: 'Hide from Google (noindex)',
              admin: { description: 'Only for articles that should not appear in search results. Also leaves it out of the sitemap.' },
            },
          ],
        },
      ],
    },
    slugField('titleId'),
    {
      name: 'slugEn',
      type: 'text',
      unique: true,
      admin: { position: 'sidebar', description: 'English URL slug' },
    },
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
