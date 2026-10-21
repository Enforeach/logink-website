import type { Block, Field } from 'payload'
import {
  BlocksFeature, EXPERIMENTAL_TableFeature, FixedToolbarFeature, UploadFeature, lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { SvcKey } from '@/lib/services'

// Static labels on purpose: this runs at config load, before any live() content exists.
const SVC_LABELS: Record<SvcKey, string> = {
  seo: 'SEO & Content Marketing', localseo: 'Local SEO & Google Maps', ads: 'Ads (Google & Meta)', social: 'Social Media',
  creative: 'Creative & Content', website: 'Website', ai: 'AI Search (GEO)',
}
export const SVC_OPTIONS = (Object.keys(SVC_LABELS) as SvcKey[]).map((value) => ({ label: SVC_LABELS[value], value }))

export const calloutBlock: Block = {
  slug: 'callout',
  labels: { singular: 'Callout', plural: 'Callouts' },
  fields: [
    {
      name: 'tone', type: 'select', defaultValue: 'info', required: true,
      options: [{ label: 'Info', value: 'info' }, { label: 'Tip', value: 'tip' }, { label: 'Warning', value: 'warning' }],
    },
    { name: 'title', type: 'text' },
    { name: 'text', type: 'textarea', required: true },
  ],
}

export const takeawaysBlock: Block = {
  slug: 'takeaways',
  labels: { singular: 'Key takeaways', plural: 'Key takeaways' },
  fields: [
    { name: 'title', type: 'text', admin: { description: 'Leave blank for "Key takeaways" / "Poin penting".' } },
    { name: 'points', type: 'array', required: true, minRows: 1, fields: [{ name: 'text', type: 'text', required: true }] },
  ],
}

export const serviceCtaBlock: Block = {
  slug: 'serviceCta',
  labels: { singular: 'Service CTA', plural: 'Service CTAs' },
  fields: [
    {
      name: 'service', type: 'select', required: true, options: SVC_OPTIONS,
      admin: { description: 'Name, one-line answer, price and link come from the service registry.' },
    },
  ],
}

export const waCtaBlock: Block = {
  slug: 'waCta',
  labels: { singular: 'WhatsApp CTA', plural: 'WhatsApp CTAs' },
  fields: [
    { name: 'label', type: 'text', admin: { description: 'Button text. Blank = "Chat WhatsApp".' } },
    { name: 'message', type: 'textarea', required: true, admin: { description: 'Prefilled message the reader sends. Opens the official Logink WhatsApp.' } },
  ],
}

export const youtubeBlock: Block = {
  slug: 'youtube',
  labels: { singular: 'YouTube video', plural: 'YouTube videos' },
  fields: [
    { name: 'url', type: 'text', required: true, label: 'YouTube URL or video id' },
    { name: 'title', type: 'text', required: true, admin: { description: 'Describes the video (accessibility + caption).' } },
  ],
}

const captionField: Field = { name: 'caption', type: 'text', admin: { description: 'Shown under the image.' } }

/** Editor for the post bodies: the defaults (headings, quote, links, lists, rule) + captioned images, tables and the blocks. */
export const articleEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures.filter((f) => f.key !== 'upload'),
    UploadFeature({ collections: { media: { fields: [captionField] } } }),
    EXPERIMENTAL_TableFeature(),
    BlocksFeature({ blocks: [calloutBlock, takeawaysBlock, serviceCtaBlock, waCtaBlock, youtubeBlock] }),
    FixedToolbarFeature(),
  ],
})
