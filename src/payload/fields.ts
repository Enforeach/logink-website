import type { Field } from 'payload'

/** Slugify helper shared by slug auto-generation hooks. */
export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

/**
 * A slug field that auto-fills from `sourceField` on create when left blank,
 * stays editable, and is unique. Mirrors the current CMS slug behaviour.
 */
export const slugField = (sourceField = 'title', overrides: Partial<Field> = {}): Field => ({
  name: 'slug',
  type: 'text',
  unique: true,
  index: true,
  admin: { position: 'sidebar', description: 'URL path. Auto-generated from the title if left blank.' },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (value) return slugify(String(value))
        const source = data?.[sourceField]
        return source ? slugify(String(source)) : value
      },
    ],
  },
  ...overrides,
} as Field)

/** PostStatus select matching the Prisma enum (DRAFT/REVIEW/SCHEDULED/PUBLISHED/ARCHIVED). */
export const statusField: Field = {
  name: 'status',
  type: 'select',
  required: true,
  defaultValue: 'DRAFT',
  index: true,
  options: [
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Review', value: 'REVIEW' },
    { label: 'Scheduled', value: 'SCHEDULED' },
    { label: 'Published', value: 'PUBLISHED' },
    { label: 'Archived', value: 'ARCHIVED' },
  ],
  admin: { position: 'sidebar' },
}

/** Sets publishedAt the first time a doc flips to PUBLISHED. */
export const setPublishedAt = ({ value, data, originalDoc }: {
  value?: unknown
  data?: Record<string, unknown>
  originalDoc?: Record<string, unknown>
}) => {
  if (value) return value
  const nowPublished = data?.status === 'PUBLISHED'
  const wasPublished = originalDoc?.status === 'PUBLISHED'
  if (nowPublished && !wasPublished) return new Date().toISOString()
  return value
}
