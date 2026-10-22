# CMS for the redesigned logink.co: plan

Owner request (2026-10-21): every page of logink.co editable in Payload by a non-coder, an SEO panel on every
document, and a full article CMS. Plan: Opus 5.5. Implementation: Sonnet 5.5 sub-agents on the foundation below.

## Principles

1. **The TypeScript content stays as the default.** `src/content/*`, `src/lib/services.ts` and the service files
   keep their literals. Each export is wrapped with `live(slug, key, default)`, a proxy that returns the CMS value
   merged over the default. A missing or empty CMS field falls back to the default, so the site never breaks and
   components do not change.
2. **Every route entry awaits `loadCms()` before rendering** (page.tsx, generateMetadata, route.ts, not-found).
   `loadCms()` reads every CMS global/collection once per request (React `cache`) for both locales and fills the
   store the proxies read. A route that forgets renders the defaults; `scripts/check-cms-entries.mjs` fails the build
   check in that case.
3. **Payload localization** (`id` default, `en`). Editors switch language with the locale picker. Text leaves are
   `localized: true`. Arrays:
   - *shared rows* (content whose rows are the same items in both languages, e.g. home process steps): array NOT
     localized, its text children localized;
   - *per-language rows* (whole documents written per language: service pages, legal pages): array localized.
   The seeder reads the field config, so it knows which is which.
4. **Additive-only schema.** New tables/columns only; never drop or rename an existing column. The live site keeps
   working after the migration runs and before the new code deploys. Posts keep their paired `...Id/...En` fields.
5. **URLs, keys, stages, redirects and owner gates stay in code.** Editors change words, images, prices and SEO,
   never routing.
6. **Safety for non-coders:** drafts + Publish on every page document (the site reads published only), a Preview
   button (Next draft mode), version history with restore, plain-language labels and descriptions, page docs that
   cannot be created or deleted (only edited).

## Shape mapping (one rule set, enforced by `src/cms/merge.ts`)

| TypeScript default | Payload field |
|---|---|
| `L` = `{ id, en }` of strings | `text`/`textarea` with `localized: true` |
| `{ id: X, en: X }` where X is an object/array (root-localized, e.g. a whole `ServiceContent`) | the fields of X, every leaf localized, arrays localized |
| plain object | `group` (or a named `tab` at the top level) with the same key |
| array of objects | `array` with the same key; a content field named `id` is stored as `rowKey` |
| array of strings | `array` of `{ text }` rows (helper `stringList()`) |
| `Record<SvcKey, L>` | `group` with one localized text per service key |
| string literal union / boolean / number that is not translated | `select` / `checkbox` / `number`, not localized |
| functions, RegExp, owner gates, URLs | stay in code (templates use `{placeholders}`) |

CMS field names equal the TypeScript keys exactly (camelCase), so the merge needs no per-field mapping.

## Documents

| Admin group | Document | Slug | Wraps |
|---|---|---|---|
| Pages | Home | `home-page` | `content/home.ts` + home registry text |
| Pages | Services hub | `hub-page` | `content/hub.ts` |
| Pages | About | `about-page` | `content/about.ts` |
| Pages | Contact | `contact-page` | `content/contact.ts` |
| Pages | Blog page | `blog-page` | `content/blog.ts` (labels + templates) |
| Pages | Portfolio page | `portfolio-page` | `content/portfolio.ts` (labels) |
| Pages | 404 page | `not-found-page` | `content/notfound.ts` |
| Shared | 360° campaign | `campaign-content` | `content/campaign.ts` labels (gates stay code) |
| Shared | Illustrations (sample data) | `instruments-content` | `content/instruments.ts` objects |
| Services | Service pages (7 docs, keyed) | `service-pages` | `content/services/<key>.ts` + registry text of that service |
| Legal | Legal pages (3 docs, keyed) | `legal-pages` | `content/legal/{privacy,terms,disclaimer}.ts` |
| Settings | Site settings | `site-settings` | contact, ENTITY, ANTI_SCAM, AI_DISCLOSURE, WA templates, defaults |
| Settings | Labels & buttons | `ui-labels` | `components/ds/strings.ts` (T, SHORT), `services/template.ts` (TPL) |
| Blog | Posts, Categories, Tags, Authors (users), CTA widgets | existing | article CMS upgrade (below) |

Every page document has a **Page** tab (H1, WhatsApp prefill message) and an **SEO** tab (plugin-seo: title,
description, image, Google preview, character counters, plus `noIndex`). Metadata reads CMS SEO first, then the
registry title/description.

## Article CMS

- Posts edit screen in tabs: Bahasa Indonesia | English | Media | Article components | SEO; sidebar: status, dates,
  author, category, tags, slugs.
- Lexical editor upgraded: headings, quotes, links, images with captions, tables, and blocks the site renders as
  designed components: Callout, Key takeaways, Service CTA (pick a service), WhatsApp CTA, YouTube.
- Article components per post: related service override, show/hide featured-image service card, show/hide and
  position of the mid-article CTA, an FAQ list (rendered + FAQPage JSON-LD).
- Authors (users): photo, job title, short bio (ID/EN), profile link, shown in the author widget.
- SEO tab reuses plugin-seo's components on the existing paired fields (no schema change) + Google preview.

## Work split

| Phase | Who | Output |
|---|---|---|
| 0 Foundation | Opus | local DB copy, localization, plugin-seo, `src/cms/*` (store, merge, load, seed, fields, hooks), route entries, registry overrides, pilot (404 + site settings), roundtrip check |
| 1A Pages | Sonnet | home, hub, campaign-content |
| 1B Pages | Sonnet | about, contact, blog-page, portfolio-page, ui-labels, instruments-content |
| 1C Services | Sonnet | service-pages (all 7, incl. pricing variants) |
| 1D Legal | Sonnet | legal-pages |
| 1E Articles | Sonnet | article CMS |
| 2 Integrate | Opus | merge branches, one migration, seed, full verification, admin UX pass |
| 3 Ship | Opus, after owner approval | migration + seed on production, deploy |

Each Sonnet agent works in its own git worktree and its own local database, validates with
`scripts/cms-roundtrip.ts <slug>` until every leaf is served from the CMS, and never creates migrations.

## Status (2026-10-22)

Phases 0–2 done on `redesign/sehari-semalam` (local only, not deployed). One additive migration
`20261021_154024_cms_pages` (new tables/columns only). Verified on a migrated + seeded copy of production:
roundtrip ok for every entry, seed idempotent, 33/34 pages text-identical to live (contact: dev-only form SSR),
admin edit → Publish → live immediately, Versions → Restore → live immediately, drafts only in Preview.

Ship (Phase 3, owner approval): back up Neon → `DATABASE_URL=<neon> scripts/payload.sh migrate` →
`scripts/payload.sh run scripts/cms.ts seed --remote` → staging deploy + smoke test → production deploy.
Order matters: migrate before deploying (the new code reads the new tables). The old code ignores them.
