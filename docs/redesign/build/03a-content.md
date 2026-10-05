# 3 · Content (A): registry, metadata, content files, Payload, locales

Part of `docs/redesign/BUILD.md`.

## 3.1 The registry: `src/lib/services.ts` (owner: Core; frozen after W1)

Start from `docs/redesign/blueprint-src/page-architecture/services.ts.txt` (copy it with `cp`, then edit). It is the only source for service names, paths, H1s, titles, descriptions, prices, WhatsApp prefills, stages, hours, lights, pairs, redirects, sitemap pairs, FACT_STRIP, SOURCES and the entity sentence. Nav, footer, LanguageLink, ServicesTable, StageStrip, CrossSell, llms.txt, sitemap, JSON-LD, `next.config` redirects and the H1 gate all read it. It must not use `@/` imports (next.config imports it). Its check is `src/lib/services.check.ts` (blueprint check + §3.2 additions), run with `pnpm check:registry`.

## 3.2 Changes to the blueprint registry (binding)

1. `AI_PAGE_LIVE = true` (owner default 1). The pair `/layanan/jasa-seo-ai` + `/en/services/ai-search-optimization` is live, in STATIC_PAIRS, the sitemap, llms.txt and the menus. `svcHref('ai')` returns the real path. `#ai-search` sections stay on every service page.
2. AI H1 (CRITIC honesty fix, names GEO & AEO):
   - ID `Jasa SEO AI (GEO & AEO): Agar Brand Anda Layak Dikutip di Google AI Overview, AI Mode, dan ChatGPT`
   - EN `AI Search Optimization (GEO & AEO): Make Your Brand Worth Citing in Google AI Overviews, AI Mode and ChatGPT`
   Delete the "DEFECT" comment.
3. Hub (CRITIC price-claim fix):
   - H1 ID `Layanan Digital Marketing 360° di Jakarta: Harga dan Paket Setiap Layanan` · EN `360° Digital Marketing Services in Jakarta: Prices and Packages for Every Service`
   - desc ID `Harga dan paket setiap layanan digital marketing Logink: SEO, Local SEO & Google Maps, iklan Google & Meta, social media, desain & video, website, dan SEO AI.` (158) · EN `Prices and packages for every Logink service: SEO, Local SEO & Google Maps, Google & Meta ads, social media, design & video, websites and AI search.` (148)
4. `FACT_STRIP: { id; en; source: string }[]`, and every entry is true today:
   - `Mulai Rp 1 Juta/bulan · Local SEO, ditagih tahunan` / `From IDR 1M/month · Local SEO, billed annually`. Source: `content/services/localseo.ts LOCALSEO_PRICING_TIERS[0]`
   - `6 layanan + SEO AI, satu sistem` / `6 services + AI search, one system`. Source: `SERVICES`
   - `Harga mulai tertulis untuk SEO, Local SEO, Iklan dan Website; Social & Kreatif: proposal dalam 24 jam` / `Starting prices published for SEO, Local SEO, Ads and Websites; Social & Creative: proposal within 24 hours`. Source: `SERVICES[].price`
   - `Tracking GA4 disiapkan untuk SEO, Iklan dan Website` / `GA4 tracking set up for SEO, Ads and Websites`. Source: `seo/data.ts:13 · ads/data.ts:15 · website/data.ts:15` (the old "Laporan GA4 setiap bulan" claimed it for every service; GA4 appears only in these three)
   The check asserts that every service named in the price fact has `price !== null`, that social and creative have `price === null`, and that each has a `quote` mentioning 24 hours.
5. `Service.quote: L`, required when `price === null` (Price renders it):
   - social `Paket modular, proposal kustom dalam 24 jam` / `Modular packages, custom proposal within 24 hours`
   - creative `Harga per proyek, penawaran kustom dalam 24 jam` / `Priced per project, custom quote within 24 hours`
   - ai `Proposal kustom dalam 24 jam` / `Custom proposal within 24 hours`
6. `SOURCES['apjii-ai'].src = 'APJII via Kompas'` (the link is the Kompas article; CRITIC).
7. `export const AI_BASELINE_LIVE = true`. This is the CRITIC gate on AI_BASELINE; it is set to true because owner default 7 ("publish the honest baseline") is in force. Setting it to false hides the baseline line everywhere.
8. `og: L` on every Service and Page = the OG file key without `.jpg` (§4.5): seo `id-seo`/`en-seo` · localseo `id-local-seo`/`en-local-seo` · ads `id-ads`/`en-ads` · social `id-social`/`en-social` · creative `id-kreatif`/`en-creative` · website `id-website`/`en-website` · ai `id-seo-ai`/`en-ai-search` · home `id-home`/`en-home` · hub `id-layanan`/`en-services` · about, portfolio, blog, contact, privacy, terms `id-<key>`/`en-<key>`.
9. Helpers and types added: `page(k)`, `type Reviewer = { name: string; jobTitle: L; sameAs?: string }`, `hhmm(hour) = hour.replace('.', '')`.
10. `WA_PATTERNS` (page-architecture §10), functions returning `{ id, en }`: `caseStudy(title)`, `category(name)`, `post(title, serviceName)`, `tier(tierName, serviceName)`, `generic` (`Halo Logink! Saya ingin konsultasi digital marketing.` / `Hi Logink! I'd like a digital marketing consultation.`) for contact and 404.
11. `REVIEWER` stays `null` (owner decision 8), so every "Ditinjau oleh" line is hidden and there is no `reviewedBy`. `APPROVED_CASE_SLUGS` stays `[]` (owner decision 5).

Check additions: AI pair present when live; every FACT_STRIP entry has a `source`; the price-fact rule in item 4; null price ⇒ `quote`; every `og` key exists in `src/content/og.json`; no string contains "Harga tertulis di setiap", "Written prices for every" or "Laporan GA4 setiap bulan" (negative test).

## 3.3 Metadata and JSON-LD helpers: `src/lib/meta.ts` (owner: Core)

A new file. The legacy `src/lib/seo.ts` stays untouched for legacy pages and is deleted in W4.
- `pageMeta({ locale, title, desc, path: { id: string|null; en: string|null }, og: string, robots?: 'noindex,follow', ogImage?: string }): Metadata`. It sets an absolute `title` (no template), `description`, `alternates.canonical = path[locale]`, `alternates.languages = { id, en, 'x-default': path.id }` only when both exist, `openGraph { url, title, description, locale, images: [{ url: ogImage ?? ogUrl(og), width: 1200, height: 630 }] }`, and `twitter` (summary_large_image).
- `staticMeta(k: PageKey, locale)` = pageMeta from PAGES. Services use `serviceMeta(k, locale)` (Service pkg) on top of pageMeta.
- JSON-LD nodes (return plain objects; the page passes them to `JsonLd`): `ORG_ID`, `WEBSITE_ID`, `orgNode(locale, full?)` (`['Organization','ProfessionalService']`; logo `/images/logo-512.png`; description = ENTITY; email; telephone `+628139453933`; Jakarta address locality/region/country; sameAs `[INSTAGRAM]`; `knowsAbout` = visible service names; no priceRange, alternateName or rating), `websiteNode(locale)`, `webPageNode({ url, name, type?, locale, dateModified?, about? })`, `breadcrumbNode(url, items)`, `faqNode(url, items)`, `itemListNode(url, urls)`. Service/Offer (Service pkg), Article (Hubs) and BlogPosting (Blog) live in their own `schema.ts`.

## 3.4 Content files: `src/content/` (plain data, no JSX)

| File | Owner | Source |
|---|---|---|
| `services/types.ts` | Service | defines `ServiceContent` (below) |
| `services/{seo,localseo,ads,social,creative,website}.ts` | Service | `git mv src/components/public/services/<svc>/data.ts` (folder names equal the keys). Existing X / X_EN exports are kept verbatim; a new `export default { id: {…}, en: {…} } satisfies Record<Locale, ServiceContent>` maps them and adds the new fields |
| `services/ai.ts` | Service | new: AI page copy + `AI_COMPARE` (SEO vs AEO vs GEO table with the customs line), also read by home Bab III |
| `home.ts` | Home | overture steps, chapter leads, Bab III copy, process (from `components/public/home/HowWeWorkSection.tsx` STEPS), FAQ (6–8) |
| `hub.ts`, `about.ts`, `portfolio.ts` | Hubs | hub lede + stage-band copy + FAQ; about copy moved from `(public)/about/page.tsx` and `en/about/page.tsx` ("Lima layanan" → "Enam layanan + SEO AI"); portfolio lede |
| `blog.ts`, `contact.ts`, `notfound.ts`, `legal/privacy.ts`, `legal/terms.ts` | Blog | legal text verbatim from today's four page files, with the last-updated date as data |
| `instruments.ts` | Instruments | all mock strings (ID/EN) and `MOCK_LABEL` |
| `og.json` | Core | `cp /Users/mm/logink/redesign-2026/blueprint/asset-production/og/index.json` (47 keys) |
| `media.json` | generated | written only by `scripts/install-media.mjs` (§4.3) |

`ServiceContent` (per locale). Every field is SSR text:
```ts
{ lede: string                           // 1–2 sentences under the H1
  answer: string                         // "Jawaban singkat", 40–60 words, answer first; also Service.description and the home chapter row
  facts: { k: string; v: string }[]      // harga mulai (from the registry), kontrak, waktu hasil, deliverable, laporan, area, bahasa
  loop: string                           // one sentence: how this service feeds Dikutip AI
  work: { title: string; text: string; card: InstrumentKey }[]   // H3s named after real queries
  pricing: { kind: 'tiers' | 'modules' | 'projects' | 'quote'; …existing arrays; note?: string }
  compare: { caption: string; head: string[]; rows: string[][]; note?: string } | null
  stats: (SourceKey | { text: string; src: string; year: number; url: string })[]   // 3–5
  process: { when: string; title: string; text: string }[]
  ai: string                             // "Siap untuk AI search" paragraph
  faq: { q: string; a: string }[]        // 7–10, 40–80 words, the first sentence answers
  sources: { label: string; url: string }[] }
```
Word targets per page (main-content SSR words, same metric as `baseline_2026-09-26.csv words_visible`): SEO 1,100–1,300 · Local SEO 1,000–1,200 · Ads 1,200–1,400 · Social 1,000–1,300 · Creative 1,150–1,350 · Website 1,150–1,350 · AI 1,200–1,600. Never below 0.85 × baseline (floors: 782 / 876 / 1,120 / 972 / 1,115 / 1,099 ID). Unverified claims are dropped ("Ranking #1", "ROAS 2–4× Terbukti", "Viral", "tanpa lock-in"). Counters show final values.

## 3.5 Payload reads per page (`src/payload/queries.ts` unchanged)

| Page | Queries | Rendering |
|---|---|---|
| Home | `getClientLogos()`; `getPortfolioList()` only if `APPROVED_CASE_SLUGS.length` | `revalidate = 3600` |
| Services (7 pairs) | `getPortfolioList()` only if an approved case maps to the service (`CASE_SERVICES`) | `revalidate = 3600` |
| Hub, contact, legal | none (registry and content only) | static |
| About | `getClientLogos()` | `revalidate = 3600` |
| Portfolio / case | `getPortfolioList()` / `getCaseStudyBySlug(slug, l)` + `getRelatedCaseStudies()`; `generateStaticParams` from the list (`slug`, `slugEn ?? slug`) | 3600 |
| Blog hub / category / post | `getBlogList(l)` / `getCategoryBySlug()` + `getBlogList(l, slug)` / `getPostBySlug(slug, l)` + `getRelatedPosts()` + `getActiveCtas()` | 3600 / 3600 / 300 |
| sitemap.xml | `getSitemapEntries()` + `getBlogList(l, slug)` per CATEGORIES key and locale (category indexable iff ≥ CATEGORY_MIN_POSTS) | 3600 |
| Contact form | POST `/api/contact`; `services` = registry keys (the collection field is JSON, so no migration) | client |

## 3.6 Which strings are ID and which EN

- Every visible string exists in both locales: as `{ id, en }` (type `L`), as a paired `X` / `X_EN` export (the moved data files), or as CMS `…Id`/`…En` fields. An EN page never shows an ID UI string, and vice versa (the ID contact form labels are English today; fix them).
- Registry strings: names, H1, title, desc, price, quote, wa, ENTITY, ANTI_SCAM, AI_DISCLOSURE, STAGES, GROUPS, FACT_STRIP, SOURCES text, AI_BASELINE, CATEGORIES ledes. Chrome UI labels (Layanan, Portofolio, Blog, Tentang, Minta Penawaran, Chat WhatsApp, menu, skip link, Mode teks, Diperbarui, Ditinjau oleh) live in `src/components/ds/strings.ts` (Chrome) as `L` objects.
- Datelines come from `hourInfo()`, with EN words (`JAKARTA, 07.00 WIB — MORNING · FOUND`). The clock format stays `07.00`.
- In instruments, customer utterances (the search query, the chat message, the review) stay Indonesian in both locales because they are quotes from an Indonesian customer. UI labels, captions, annotations and the mock label are translated.
- CMS-owned: post and case titles, bodies, excerpts and SEO fields (`titleId/En`, `slug/slugEn`, …). The EN routes list only posts with an EN body.
- Legal text is verbatim in both locales. Body copy uses no em dash; the dateline's "—" is the only one (DESIGN §16).
