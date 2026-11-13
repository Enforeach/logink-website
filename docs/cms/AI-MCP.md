# Connecting an AI platform to the Logink CMS

The CMS exposes an MCP server (Model Context Protocol) so an AI platform can write articles, edit pages and work
with leads. Code: `src/payload/ai.ts` (official `@payloadcms/plugin-mcp`).

## 1. Create a key (in the CMS)

Admin → **Settings → AI access keys → Create new**

| Field | What to set |
|---|---|
| User | The CMS user the AI acts as. AI-written articles get this user as author, so a dedicated user such as "Logink AI" reads best. |
| Label | e.g. "Content AI" |
| Enable API Key | Tick it, Save, then copy the key with the copy icon. It is shown only to admins. |
| Permissions (right column) | Tick only what this AI needs: Posts find/create/update, Categories find, Contact submissions find/update, the pages it may read, and **updatePage** under Tools if it may propose page changes. |
| Allow publishing | **Off (recommended):** the AI saves drafts and an editor publishes (details below). On: the AI publishes directly. |
| New-lead webhook URL | Optional: your platform's endpoint for new leads (https). |
| Webhook signing secret | Generated. Copy it into your platform to verify lead webhooks. |

A key stops working the moment you untick *Enable API Key* or delete it.

## 2. Connect the AI platform

- **MCP endpoint:** `https://logink.co/api/mcp` (Streamable HTTP)
- **Auth header:** `Authorization: Bearer <API key>`

Any MCP client that can send a header works. Claude Code, for example:

```
claude mcp add --transport http logink https://logink.co/api/mcp --header "Authorization: Bearer <API key>"
```

The tool list a client sees is exactly what the key allows (e.g. `createPosts`, `findPosts`, `updatePosts`,
`findCategories`, `findContactSubmissions`, `updateContactSubmissions`, `findHomePage`, `updatePage`).

## 3. What the AI can do

**Articles** (`createPosts`, `updatePosts`, `findPosts`)
- Fields come in pairs: `…Id` = Bahasa Indonesia, `…En` = English.
- Write the body in Markdown: `bodyFormat: "markdown"`, `bodyMarkdownId`, `bodyMarkdownEn`.
- Also set `titleId`/`titleEn`, `excerptId`/`excerptEn` and `category` (an id from `findCategories`).
- Set `slug`/`slugEn` in lowercase-with-dashes.
- SEO fields: `metaTitle`, `metaDescription`, `metaTitleEn`, `metaDescriptionEn`, `focusKeyword`.
- Optional: `relatedService` and an FAQ (`faqId`/`faqEn` rows of `{ question, answer }`).
- Images are uploaded by an editor in the admin. The AI can reference existing media found with `findMedia`.

**Pages**
- Read a page with `findHomePage`, `findAboutPage`, and so on.
- Change a page with `updatePage { page, locale: "id" | "en", data }`, sending only the fields to change, in the same shape the find tool returns.
- Service and legal pages: use `updateServicePages` / `updateLegalPages` with the document `id`.

**Leads**
- `findContactSubmissions` with `where: {"isRead":{"equals":false}}` lists unhandled leads.
- `updateContactSubmissions { id, isRead: true }` marks a lead handled.

## 4. Safety rules (keys without "Allow publishing")

- New articles are always saved as **DRAFT**, even if the AI asks to publish.
- Articles that are already **PUBLISHED cannot be edited**. The AI gets a clear error message.
- Page changes (`updatePage`, service and legal pages) are saved as **draft versions**. The live page does not change until an editor publishes: open the page in the admin, press **Preview**, then **Publish changes**.

## 5. New-lead webhook

Every new lead from the contact form or the chat is POSTed to the key's webhook URL as soon as it arrives:

```
POST <your URL>
Content-Type: application/json
X-Logink-Event: lead.created
X-Logink-Signature: sha256=<hex HMAC-SHA256 of the raw body, keyed with the webhook signing secret>

{ "event": "lead.created",
  "lead": { "id": 42, "name": "…", "email": "…", "phone": "…", "company": "…", "services": ["seo"],
            "budgetRange": "…", "timeline": "…", "message": "…", "source": "contact_form", "createdAt": "…" },
  "adminUrl": "https://logink.co/admin/collections/contact-submissions/42" }
```

Verify the signature before trusting the payload (Node example):

```js
import { createHmac, timingSafeEqual } from 'node:crypto'
const expected = 'sha256=' + createHmac('sha256', process.env.LOGINK_WEBHOOK_SECRET).update(rawBody).digest('hex')
const ok = timingSafeEqual(Buffer.from(expected), Buffer.from(req.headers['x-logink-signature'] ?? ''))
```

Delivery is attempted once (8-second timeout). If the platform was down, `findContactSubmissions` still has every lead.
