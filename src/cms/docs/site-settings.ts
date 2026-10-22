// Settings → Site settings: the lines every page repeats and the WhatsApp templates (src/lib/services.ts).
// The legacy contact fields stay in the table but are hidden: the site never read them (the number, email and
// Instagram are in code because links, the anti-scam line and JSON-LD must agree).
import { AI_BASELINE, AI_DISCLOSURE, ANTI_SCAM, ENTITY } from '@/lib/services'
import { pageGlobal } from '../define'
import { fieldsFrom } from '../fields'

const legacy = (name: string, type: 'text' | 'upload' = 'text', defaultValue?: string) =>
  (type === 'upload' ? { name, type, relationTo: 'media', admin: { hidden: true } } : { name, type, defaultValue, admin: { hidden: true } }) as never

export const SiteSettings = pageGlobal({
  slug: 'site-settings',
  label: 'Site settings',
  group: 'Settings',
  description: 'Text that appears on many pages at once. Changes go live on every page after Publish.',
  path: { id: '/', en: '/en' },
  tabs: [
    {
      label: 'Brand lines',
      fields: fieldsFrom([{ entity: ENTITY, antiScam: ANTI_SCAM, aiDisclosure: AI_DISCLOSURE, aiBaseline: AI_BASELINE }], {
        entity: { label: 'Who Logink is', description: 'One paragraph: the footer, About page, llms.txt and the Organization schema use it.' },
        antiScam: { label: 'Official WhatsApp notice', description: 'Shown next to WhatsApp buttons. Keep the official number in it.' },
        aiDisclosure: { label: 'AI illustration notice', description: 'Shown where AI-assisted illustrations appear.' },
        aiBaseline: { label: 'AI citation baseline', description: 'The SEO AI page’s honest current-state line.' },
      }),
    },
    {
      name: 'waTemplates',
      label: 'WhatsApp templates',
      description: 'Pre-filled WhatsApp messages. Keep the {words in braces}: the site fills them in (e.g. {service} becomes the service name).',
      ov: {
        caseStudy: { label: 'Case study page', description: '{title} = the case study title' },
        category: { label: 'Blog category page', description: '{name} = the category name' },
        post: { label: 'Blog article', description: '{title} = the article title, {service} = its related service' },
        tier: { label: 'Price plan button', description: '{plan} = the plan name, {service} = the service name' },
        generic: { label: 'General (404 and fallbacks)' },
        campaign360: { label: '360° campaign' },
        upgrade: { label: 'Service as part of a 360° campaign', description: '{service} = the service name' },
      },
    },
  ],
  extraFields: [legacy('siteName', 'text', 'Logink'), legacy('tagline'), legacy('contactEmail'), legacy('whatsappNumber'), legacy('instagram'), legacy('address'), legacy('defaultOgImage', 'upload')],
})
