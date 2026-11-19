// AI platform access (owner 2026-11-13): an MCP endpoint at /api/mcp (official @payloadcms/plugin-mcp) authorised by
// "AI access keys" created in the admin (Settings), plus a signed webhook per key for every new lead.
// Safety: without "Allow publishing" on its key, the AI saves articles as DRAFT, cannot touch a live article, and
// saves page changes as draft versions. An editor previews and publishes. docs/cms/AI-MCP.md is the platform guide.
import { createHmac, randomBytes } from 'node:crypto'
import { APIError, type CollectionAfterChangeHook, type CollectionBeforeChangeHook, type CollectionBeforeOperationHook, type Field, type GlobalConfig, type PayloadRequest } from 'payload'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { z } from 'zod/v3' // the plugin's MCP SDK schemas are zod 3

type Key = { allowPublish?: boolean | null; leadWebhookUrl?: string | null; webhookSecret?: string | null }
const KEYS = 'payload-mcp-api-keys'

// The plugin marks the key's user (_strategy) and every tool passes that user (the global tools pass no req), so
// the user object carries the key's publish right too (set in overrideAuth).
type AiUser = { _strategy?: string; aiAllowPublish?: boolean }
const isAi = (req: PayloadRequest) => (req.user as AiUser | null)?._strategy === 'mcp-api-key'
const mayPublish = (req: PayloadRequest) => Boolean((req.user as AiUser | null)?.aiAllowPublish)

/** Posts: AI articles stay DRAFT and live articles are off limits, unless the key may publish. */
export const aiPostGuard: CollectionBeforeChangeHook = ({ data, originalDoc, operation, req }) => {
  if (!isAi(req)) return data
  if (mayPublish(req)) return data
  if (operation === 'update' && originalDoc?.status === 'PUBLISHED') {
    throw new APIError('This AI key cannot edit a published article. Ask an editor, or enable "Allow publishing" on the key.', 403)
  }
  data.status = 'DRAFT'
  return data
}

/** Service and legal pages (versioned collections): an AI update becomes a draft version unless the key may publish.
 *  Globals settle draft-or-publish before hooks run, so their AI updates go through the updatePage tool instead. */
export const aiDraftForKeyed: CollectionBeforeOperationHook = ({ args, operation, req }) => {
  if ((operation === 'update' || operation === 'updateByID') && isAi(req) && !mayPublish(req)) args.draft = true
  return args
}

/** New lead → POST to every key's webhook, signed: X-Logink-Signature: sha256=HMAC(webhookSecret, body). */
export const notifyLead: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc
  const payload = req.payload
  const send = async () => {
    const { docs } = await payload.find({ collection: KEYS as never, where: { leadWebhookUrl: { exists: true } }, limit: 50, depth: 0, overrideAccess: true })
    const lead = (({ id, name, email, phone, company, services, budgetRange, timeline, message, source, createdAt }) =>
      ({ id, name, email, phone, company, services, budgetRange, timeline, message, source, createdAt }))(doc)
    const body = JSON.stringify({ event: 'lead.created', lead, adminUrl: `${payload.config.serverURL}/admin/collections/contact-submissions/${doc.id}` })
    await Promise.all((docs as Key[]).filter((k) => k.leadWebhookUrl && k.webhookSecret).map(async (k) => {
      try {
        const res = await fetch(k.leadWebhookUrl!, {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-logink-event': 'lead.created', 'x-logink-signature': `sha256=${createHmac('sha256', k.webhookSecret!).update(body).digest('hex')}` },
          body,
          signal: AbortSignal.timeout(8000),
        })
        if (!res.ok) payload.logger.warn(`[ai] lead webhook ${k.leadWebhookUrl}: HTTP ${res.status}`)
      } catch (e) {
        payload.logger.warn(`[ai] lead webhook ${k.leadWebhookUrl}: ${(e as Error).message}`)
      }
    }))
  }
  // after the response when inside Next (the visitor never waits on the AI platform); inline in scripts
  try {
    const { after } = await import('next/server')
    after(send)
  } catch {
    await send()
  }
  return doc
}

const keyFields: Field[] = [
  {
    name: 'allowPublish', type: 'checkbox', defaultValue: false, label: 'Allow publishing',
    admin: { position: 'sidebar', description: 'Off (recommended): the AI saves articles and page changes as drafts and cannot edit live articles; an editor publishes. On: the AI publishes directly.' },
  },
  {
    name: 'leadWebhookUrl', type: 'text', label: 'New-lead webhook URL',
    admin: { position: 'sidebar', description: 'Optional. Every new contact-form lead is POSTed here as JSON, right away.' },
    validate: (v: unknown) => !v || /^https:\/\/|^http:\/\/(localhost|127\.0\.0\.1)[:/]/.test(String(v)) || 'Use an https:// URL',
  },
  {
    name: 'webhookSecret', type: 'text', label: 'Webhook signing secret', defaultValue: () => randomBytes(24).toString('hex'),
    admin: { position: 'sidebar', readOnly: true, description: 'Give this to the AI platform: it checks the X-Logink-Signature header (HMAC-SHA256 of the body) to know the lead came from logink.co.' },
  },
]

/** Secret link for clients that cannot send an Authorization header (claude.ai custom connectors without the
 *  request-headers beta): https://logink.co/api/mcp?key=<API key>. Same lookup as the plugin's (HMAC index of the
 *  key; unticking "Enable API Key" clears the index). The link is the credential: treat it like a password. */
async function keyFromLink(req: PayloadRequest) {
  const key = req.searchParams?.get('key')
  if (!key || req.headers.get('authorization')) return null
  const { docs } = await req.payload.find({
    collection: KEYS as never, depth: 1, limit: 1, pagination: false, overrideAccess: true,
    where: { apiKeyIndex: { equals: createHmac('sha256', req.payload.secret).update(key).digest('hex') } },
  })
  const doc = docs[0] as (Key & { user: AiUser & { collection?: string } }) | undefined
  if (!doc?.user || typeof doc.user !== 'object') throw new APIError('Unauthorized, invalid key.', 401)
  doc.user.collection = 'users'
  doc.user._strategy = 'mcp-api-key'
  return doc as never
}

const page = 'Page document (locale "id" = Bahasa Indonesia, "en" = English). Changes are saved as a draft version for an editor to publish, unless this key may publish.'

/** `pages`: the CMS page documents (src/cms/docs), passed in because they import this file's guard. */
export const aiPlugin = (pages: { globals: GlobalConfig[]; keyed: string[] }) =>
  mcpPlugin({
    userCollection: 'users',
    collections: {
      posts: {
        enabled: { find: true, create: true, update: true },
        description:
          'Blog articles. Paired fields: ...Id = Bahasa Indonesia, ...En = English. Write the body in Markdown: bodyFormat "markdown", ' +
          'bodyMarkdownId, bodyMarkdownEn. Set titleId (+ titleEn), excerptId/excerptEn, category (an id from categories), slug and slugEn ' +
          '(lowercase-with-dashes), SEO: metaTitle, metaDescription, metaTitleEn, metaDescriptionEn, focusKeyword; optional relatedService ' +
          '(seo|localseo|ads|social|creative|website|ai) and faqId/faqEn ({ question, answer } rows). author defaults to this key\'s user. ' +
          'Unless the key may publish, articles are saved as DRAFT for an editor and published articles cannot be edited.',
      },
      categories: { enabled: { find: true, create: true }, description: 'Blog categories (an article needs one).' },
      tags: { enabled: { find: true, create: true }, description: 'Blog tags.' },
      media: { enabled: { find: true }, description: 'Uploaded images (read only: upload images in the admin).' },
      'contact-submissions': {
        enabled: { find: true, update: true },
        description: 'Incoming leads from the contact form and the chat. New ones have isRead false; set isRead true once handled.',
      },
      'case-studies': { enabled: { find: true, create: true, update: true }, description: 'Portfolio case studies.' },
      'cta-widgets': { enabled: { find: true, update: true }, description: 'Call-to-action boxes shown inside blog articles (isActive switches one on or off).' },
      ...Object.fromEntries(pages.keyed.map((slug) => [slug, { enabled: { find: true, update: true }, description: `${page} One document per page; its key says which.` }])),
    },
    globals: Object.fromEntries(pages.globals.map((g) => [g.slug, { enabled: { find: true }, description: `${typeof g.label === 'string' ? g.label : g.slug}. Page document (locale "id" = Bahasa Indonesia, "en" = English). Change it with the updatePage tool.` }])),
    mcp: {
      serverOptions: { serverInfo: { name: 'Logink CMS', version: '1.0.0' } },
      tools: [{
        name: 'updatePage',
        description:
          'Change a page document (home-page, about-page, site-settings, …). Send only the fields to change, in the shape the find tool ' +
          'returns for that page, for one locale. Saved as a draft version for an editor to preview and publish, unless this key may publish.',
        parameters: {
          page: z.enum(pages.globals.map((g) => g.slug) as [string, ...string[]]).describe('The page document slug'),
          locale: z.enum(['id', 'en']).describe('id = Bahasa Indonesia, en = English'),
          data: z.record(z.string(), z.unknown()).describe('The fields to change'),
        } as never, // zod/v3 shape vs the plugin's own zod copy: too deep for tsc to compare
        handler: async (args, req) => {
          const key = req.context.aiKey as Key & { user: AiUser & { id: number } }
          const draft = !key.allowPublish
          await req.payload.updateGlobal({ slug: args.page as never, locale: args.locale as 'id' | 'en', data: args.data as never, draft, user: key.user, overrideAccess: false, depth: 0 })
          return { content: [{ type: 'text' as const, text: draft ? `Saved a draft of ${args.page} (${args.locale}). An editor previews and publishes it in the admin.` : `Published ${args.page} (${args.locale}).` }] }
        },
      }],
    },
    overrideAuth: async (req, getDefault) => {
      const settings = (await keyFromLink(req)) ?? (await getDefault())
      ;(settings.user as AiUser).aiAllowPublish = Boolean((settings as Key).allowPublish)
      req.context.aiKey = settings // for the custom tools, which get the request but not the user
      return settings
    },
    overrideApiKeyCollection: (c) => ({
      ...c,
      labels: { singular: 'AI access key', plural: 'AI access keys' },
      admin: { ...c.admin, group: 'Settings', description: 'Keys for the AI platform. Claude (custom connector, No sign-in): https://logink.co/api/mcp?key=<API key>. Other MCP clients: https://logink.co/api/mcp with the header Authorization: Bearer <API key>. Tick what each key may read or change.' },
      fields: [...c.fields, ...keyFields],
    }),
  })
