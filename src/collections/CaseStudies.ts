import type { CollectionConfig } from 'payload'
import { isAuthenticated, publishedOrAuthed } from '../payload/access'
import { slugField, statusField, setPublishedAt } from '../payload/fields'
import { makeRevalidateHooks } from '../payload/revalidate'

// Revalidate the portfolio lists AND each case study's own detail URL (new +
// previous slug) so unpublishing or renaming immediately purges its page.
const { afterChange, afterDelete } = makeRevalidateHooks(
  ['/portfolio', '/en/portfolio', '/', '/en'],
  (doc, prev) => {
    const paths: string[] = []
    const add = (p: unknown, base: string) => {
      if (typeof p === 'string' && p) paths.push(`${base}/${p}`)
    }
    add(doc.slug, '/portfolio')
    add(doc.slugEn, '/en/portfolio')
    if (prev && prev.slug !== doc.slug) add(prev.slug, '/portfolio')
    if (prev && prev.slugEn !== doc.slugEn) add(prev.slugEn, '/en/portfolio')
    return paths
  },
)

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'clientName', 'status', 'featured', 'publishedAt'],
  },
  access: {
    read: publishedOrAuthed,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: { afterChange: [afterChange], afterDelete: [afterDelete] },
  fields: [
    // Legacy
    { name: 'title', type: 'text', required: true },
    { name: 'industry', type: 'text' },
    // Legacy narrative fields; newer block-based case studies leave these empty.
    { name: 'challenge', type: 'textarea' },
    { name: 'strategy', type: 'textarea' },
    { name: 'results', type: 'textarea' },
    { name: 'thumbnail', type: 'upload', relationTo: 'media' },
    { name: 'service', type: 'relationship', relationTo: 'services' },

    // Multilingual
    { name: 'titleId', type: 'text' },
    { name: 'titleEn', type: 'text' },
    { name: 'subtitleId', type: 'text' },
    { name: 'subtitleEn', type: 'text' },
    { name: 'summaryId', type: 'textarea' },
    { name: 'summaryEn', type: 'textarea' },
    { name: 'slugEn', type: 'text', unique: true, admin: { position: 'sidebar' } },
    { name: 'seoTitleId', type: 'text' },
    { name: 'seoTitleEn', type: 'text' },
    { name: 'seoDescId', type: 'textarea' },
    { name: 'seoDescEn', type: 'textarea' },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'durationLabel', type: 'text' },
    { name: 'clientWebsite', type: 'text' },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'industryRel', type: 'relationship', relationTo: 'industries' },

    // Core
    slugField('title'),
    { name: 'clientName', type: 'text', required: true },
    { name: 'clientLogo', type: 'upload', relationTo: 'media' },
    { name: 'author', type: 'relationship', relationTo: 'users', admin: { position: 'sidebar' } },

    {
      name: 'metrics',
      type: 'array',
      label: 'Metrics',
      fields: [
        { name: 'metricLabel', type: 'text', required: true },
        { name: 'beforeValue', type: 'text', required: true },
        { name: 'afterValue', type: 'text', required: true },
        { name: 'sortOrder', type: 'number', defaultValue: 0 },
      ],
    },

    { name: 'testimonial', type: 'relationship', relationTo: 'testimonials' },
    { name: 'caseStudyServices', type: 'relationship', relationTo: 'services', hasMany: true, label: 'Services used' },

    {
      name: 'blocks',
      type: 'array',
      label: 'Content blocks',
      fields: [
        {
          name: 'blockType',
          type: 'select',
          required: true,
          options: [
            'HERO',
            'OVERVIEW',
            'CLIENT_SNAPSHOT',
            'NARRATIVE',
            'METRIC_GRID',
            'TIMELINE',
            'CHART',
            'BEFORE_AFTER',
            'GALLERY',
            'VIDEO',
            'QUOTE',
            'SERVICES_USED',
            'RELATED_CASES',
            'CTA',
            'LEAD_FORM',
            'FAQ',
            'RICH_TEXT',
          ],
        },
        { name: 'sortOrder', type: 'number', defaultValue: 0 },
        { name: 'isVisible', type: 'checkbox', defaultValue: true },
        { name: 'data', type: 'json' },
      ],
    },

    statusField,
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
      hooks: { beforeValidate: [setPublishedAt] },
    },
  ],
}
