# 3 · Content (C): §3.9 other page recipes

Every page: `PageShell` with its registry `path`, `wa`, `sky`; Breadcrumbs + BreadcrumbList on every inner page; one H1 (`H1Svc`); `pageMeta` title/desc from the registry or CMS; OG per §4.5. Words are main-content SSR words (floor = 0.85 × baseline).

## 3.9 Page recipes

### Hub `/layanan`, `/en/services` [Hubs] · 0600 Kertas · light · 700–1,000 words
1. Breadcrumbs + Dateline `JAKARTA, 06.00 WIB — PAGI · LAYANAN`.
2. Hero: H1 `page('hub').h1`; 40–60-word lede (`hub.ts`) naming the 6 services + SEO AI, the starting prices for SEO, Local SEO, Iklan and Website, and that Social & Kreatif get a proposal within 24 hours; CTA pair; `StageStrip strip` → the bands.
3. `ServicesTable id="harga"` under H2 `Layanan dan harga`.
4. `StageBands`: 4 Sections (0700 Kertas `#ditemukan`, 1240 Putih `#dipercaya`, 1805 flat Senja `#dikutip-ai` with no ribbon, 2130 Malam `#dihubungi`). Each has a dateline, an H2 (`Ditemukan: dicari di Google dan Maps`, …), a one-sentence stage answer, and service cards (name link, line, Price, "juga berperan di" chips from `alsoStages`). Dark bands hold no paragraph over 60 words.
5. FaqSection (4–6, `hub.ts`). JSON-LD: CollectionPage + `itemListNode` → `{service}#service` + breadcrumb + FAQ. **No Offer.**

### About `/about`, `/en/about` [Hubs] · 0530 Putih · 500–800 words
Hero: H1 `Tentang Logink: Kreativitas yang Terhubung` / `About Logink: Connected Creativity`, lede = ENTITY (Stabilo), CTA pair, `Figure buka file="poster-4x3"` (→ none). Then: `Fakta Logink` `<dl>` (Nama, Kota Jakarta, the 7 services as links, Bahasa ID/EN, WhatsApp as text, email, Instagram; the rows PT, founding year, street address and GBP are hidden until the owner supplies them); `Misi & nilai` (moved copy, "Lima layanan" → "Enam layanan + SEO AI"); `Cara kami bekerja & mengukur` (StageStrip + MeasureBlock); `Kenapa bukan agensi lain` (only verifiable differentiators); `Yang tidak kami janjikan`; ClientLogos (≥6). The team section is not rendered (no real team data). JSON-LD: AboutPage + `orgNode(l, full)` + breadcrumb.

### Portfolio `/portfolio`, `/en/portfolio` [Hubs] · 0700 Kertas, magenta · 350–600 words
H1 `page('portfolio').h1` (localised; the ID page is English today). The 40–60-word lede says how many public cases exist, that they are SEO, measured in Google Search Console, and that other services have no public case yet. A `CaseCover` grid from `getPortfolioList()`: each card is a real `<a>` to the locale-correct URL (`/en/portfolio/{slugEn ?? slug}`). **Metric sentences appear only for `APPROVED_CASE_SLUGS`** (empty today); otherwise the cover shows title, industry and duration. Then MeasureBlock and "Layanan tanpa studi kasus publik" (links). JSON-LD: CollectionPage + ItemList + breadcrumb.

### Case `/portfolio/[slug]`, `/en/portfolio/[slug]` [Hubs] · 0700 Kertas · CMS words (≥0.85 × baseline)
- Slug rules, applied before rendering (no `loading.tsx` or Suspense above): the ID route hit by a `slugEn` that differs from `slug` → `permanentRedirect('/portfolio/'+slug)` (find it with `getCaseStudyBySlug(param, 'en')`, which also matches `slugEn`); the EN route hit by an ID slug whose case has a different `slugEn` → `permanentRedirect('/en/portfolio/'+slugEn)`; unknown → `notFound()`.
- Dateline `JAKARTA · {durationLabel} · {industry}`; H1 = CMS title (`H1Svc variant="reading"`); hero metrics as sentences with period and source (only CMS data, never invented); "Layanan yang dipakai" chips from `CASE_SERVICES`; `CaseSubnav` (Ringkasan · Tantangan · Strategi · Hasil + "Mulai proyek" → WhatsApp `WA_PATTERNS.caseStudy(title)`); the 17 block renderers restyled in place (NARRATIVE subheads become real H2/H3; METRIC_GRID values are final, e.g. `3.080%`; recharts lazy); related cases; CrossSell.
- `alt = { id: '/portfolio/'+slug, en: '/en/portfolio/'+(slugEn ?? slug) }`. OG = CMS `ogImage`, else `/og/{l}-portfolio.jpg`. JSON-LD: Article (headline = H1, CMS dates, publisher ORG_ID, `about` the client only when named) + breadcrumb. No Review or AggregateRating. Hero `ViewTransition name={'case-'+slug}`.

### Blog hub, category, post [Blog] · 0600 Kertas (always light, owner default 3)
- **Hub** (`/blog`, `/en/blog`, 300–500 words): Dateline with the latest real `datePublished`; H1 `page('blog').h1`; lede (`blog.ts`); featured post + category Chips (only categories indexable in this locale); `PostRow` list (title link, excerpt, date, category, reading time); service CTA rail (dominant category → service; sticky on desktop, inline on phones). JSON-LD: CollectionPage + ItemList + breadcrumb.
- **Category**: unknown slug → `notFound()` (a soft 404 today). H1 `Artikel {nameId}` / `{nameEn} Articles`; the `CATEGORIES` lede with a service-name link; list; related service card. Title `Artikel {nameId}: Panduan & Insight | Logink` / `{nameEn} Articles & Guides | Logink`. Fewer than `CATEGORY_MIN_POSTS` posts in the locale → `robots: noindex,follow` and no sitemap entry; hreflang only when both locales are indexable. WhatsApp `WA_PATTERNS.category(name)`.
- **Post** (revalidate 300): Dateline `JAKARTA, {datePublished} — {KATEGORI}` (real date); H1 = title (`reading`); byline (author Person, `Diperbarui {updatedAt}`, reading time); Ringkasan box (excerpt, Stabilo); `Toc` (`extractHeadings`); body in `.prose` (`src/styles/prose.css`), with any CMS `<h1>` demoted to `<h2>`; `CtaRenderer` renders all 7 placements; Sumber + author box; related-service card + CrossSell (1 card); related posts; `ShareBar`. Reading progress is the DayDial (0 JS). The EN route hit by an ID slug → 308 to `slugEn`, or to `/blog/{slug}` when there is no EN version. `alt = { id: '/blog/'+slug, en: slugEn ? '/en/blog/'+slugEn : null }`. JSON-LD: BlogPosting (author Person `@id`, publisher ORG_ID) + breadcrumb.

### Contact `/contact`, `/en/contact` [Blog] · 2130 Malam hero, form on a Putih inset · sky dark · `bar="wa"` · static · 250–400 words
H1 `Mari Kerja Bersama` / `Let's Work Together`; lede `Satu pesan cukup: chat WhatsApp untuk respons tercepat, atau isi formulir singkat.`; `WA_DISPLAY` as text + ANTI_SCAM. ChannelChooser: WhatsApp first ("Respons dalam hitungan menit", today's claim), Formulir `#formulir`, Email (mailto, "Respons dalam 24 jam"). ContactForm: Nama*, WhatsApp*, Email*, Pesan*; Layanan checkboxes from registry names, preselected from `?layanan=` (legacy `?service=` = cmsSlug, mapped); Perusahaan, Budget and Waktu mulai in a collapsed `<details>`; honeypot; POST `/api/contact` `{…, services: [keys], source: 'contact_form'}`; on success push `lead_submit` and show a WhatsApp handoff link. Canonical `/contact` (no query). JSON-LD: ContactPage + org `contactPoint` (`+628139453933`, sales, `['id','en']`) + breadcrumb.

`/api/contact` (Blog pkg, additive only): if the honeypot field `website` is non-empty, return `200 {success:true}` without saving; per-IP limit 5 per 10 min → `429`. `// ponytail: in-memory per-instance Map; a Vercel WAF rate-limit rule is the upgrade`. The zod schema and the collection are unchanged, so the lead-profiler POST (`source:'lead_profiler'`, brief as `message`) passes as is.

### Legal `/privacy`, `/terms` (+ EN) [Blog] · 0600 Kertas
`LegalPage`: Dateline `Terakhir diperbarui {date}` (real date from the content file); H1 kept (`Kebijakan Privasi` / `Privacy Policy`, `Syarat & Ketentuan` / `Terms of Service`); sticky numbered Toc; 70ch body **verbatim**; JSON-LD WebPage + breadcrumb.

### 404 [Blog]
- `src/app/global-not-found.tsx` (unmatched URLs): `<html lang="id">`, imports `@/styles/tokens.css` + fonts only (no motion.css, no client JS), `NotFoundPage standalone`: Dateline `JAKARTA, 04.45 WIB — SUBUH`, H1 `Halaman tidak ditemukan`, one sentence + "Page not found", links (Beranda, Layanan & harga, the 7 services by name, Blog, Kontak), WaButton (`WA_PATTERNS.generic`), ANTI_SCAM. `metadata.title` `Halaman tidak ditemukan | Logink`.
- `(public)/not-found.tsx`, `en/not-found.tsx` (`notFound()` from routes): `NotFoundPage` inside PageShell in the locale's language, `alt = { id: null, en: null }`.
- Status 404, Next's default noindex, no OG, no JSON-LD.
