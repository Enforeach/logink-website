# 1 · Architecture (C): every route file today → destination, redirects, URL gate

Paths below are relative to `src/app/(frontend)/`. "Rewrite" means the file stays at the same path (same URL) and becomes a thin wrapper. Owners are the packages in §5.

## 1.8 Route wrapper pattern

```tsx
// (public)/layanan/local-seo/page.tsx
import { ServicePage, serviceMeta } from '@/components/sections/service/ServicePage'
export const revalidate = 3600
export const metadata = serviceMeta('localseo', 'id')
export default function Page() { return <ServicePage k="localseo" locale="id" /> }
```
Each page component renders `<PageShell …>` itself (§2.3). The EN file is the same with `'en'`. Copy never lives in route files. Metadata comes from `pageMeta()` / `serviceMeta()` (§3.3). A route file may export `revalidate`, `metadata`/`generateMetadata`, `generateStaticParams` and a default page, nothing else.

## 1.9 File map (all 42 files under `src/app/(frontend)` today)

| Today | Action | URL | Owner |
|---|---|---|---|
| `layout.tsx` | delete | – | Core |
| `(public)/layout.tsx` | rewrite as ID root (§1.3) | – | Core W1 → Motion W2a |
| `(public)/page.tsx` | rewrite `<HomePage locale="id"/>` | `/` | Home |
| `(public)/ProblemSolution.tsx` | delete (no importer) | – | Core |
| `(public)/about/page.tsx` | rewrite | `/about` | Hubs |
| `(public)/about/Reveal.tsx` | delete after `en/about` stops importing it | – | Hubs |
| `(public)/blog/page.tsx` | rewrite | `/blog` | Blog |
| `(public)/blog/[slug]/page.tsx` | rewrite | `/blog/{slug}` | Blog |
| `(public)/blog/category/[slug]/page.tsx` | rewrite; unknown slug → `notFound()`; <1 post in locale → `noindex,follow` | `/blog/category/{slug}` | Blog |
| `(public)/contact/page.tsx` | rewrite, static (no searchParams on the server) | `/contact` | Blog (Contact) |
| `(public)/layanan/page.tsx` | rewrite | `/layanan` | Hubs |
| `(public)/layanan/[slug]/page.tsx` | **delete** (1,100-line legacy template; its CMS slugs 308 via REDIRECTS, others 404) | – | Core |
| `(public)/layanan/jasa-seo-profesional/page.tsx` | rewrite `k="seo"` | same | Service |
| `(public)/layanan/local-seo/page.tsx` | rewrite `k="localseo"` | same | Service |
| `(public)/layanan/paid-ads/page.tsx` | rewrite `k="ads"` | same | Service |
| `(public)/layanan/sosial-media-manajemen/page.tsx` | rewrite `k="social"` | same | Service |
| `(public)/layanan/kreatif/page.tsx` | rewrite `k="creative"` | same | Service |
| `(public)/layanan/website-development/page.tsx` | rewrite `k="website"` | same | Service |
| – | **new** `(public)/layanan/jasa-seo-ai/page.tsx` `k="ai"` | `/layanan/jasa-seo-ai` | Service |
| `(public)/portfolio/page.tsx` | rewrite | `/portfolio` | Hubs |
| `(public)/portfolio/[slug]/page.tsx` | rewrite; an EN slug on the ID route → `permanentRedirect('/portfolio/'+slug)` | `/portfolio/{slug}` | Hubs |
| `(public)/privacy/page.tsx` | rewrite; copy verbatim → `src/content/legal/privacy.ts` | `/privacy` | Blog (Legal) |
| `(public)/terms/page.tsx` | rewrite; copy verbatim → `src/content/legal/terms.ts` | `/terms` | Blog (Legal) |
| `(public)/template.tsx` · `(public)/not-found.tsx` | **new** | – | Motion · Blog (404) |
| `en/layout.tsx` | rewrite as EN root | – | Core W1 → Motion W2a |
| `en/SetLang.tsx` | delete | – | Core |
| `en/page.tsx` | rewrite `<HomePage locale="en"/>` | `/en` | Home |
| `en/about/page.tsx` | rewrite | `/en/about` | Hubs |
| `en/blog/page.tsx` | rewrite | `/en/blog` | Blog |
| `en/blog/[slug]/page.tsx` | rewrite; ID slug with an EN twin → `permanentRedirect('/en/blog/'+slugEn)`; ID slug without EN → `permanentRedirect('/blog/'+slug)` | `/en/blog/{slugEn}` | Blog |
| `en/blog/category/[slug]/page.tsx` | rewrite (same rules as ID) | `/en/blog/category/{slug}` | Blog |
| `en/contact/page.tsx` | rewrite | `/en/contact` | Blog (Contact) |
| `en/portfolio/page.tsx` | rewrite | `/en/portfolio` | Hubs |
| `en/portfolio/[slug]/page.tsx` | rewrite; params = `slugEn ?? slug`; ID slug whose case has a different `slugEn` → `permanentRedirect('/en/portfolio/'+slugEn)` | `/en/portfolio/{slugEn}` | Hubs |
| `en/privacy/page.tsx` · `en/terms/page.tsx` | rewrite | same | Blog (Legal) |
| `en/services/page.tsx` | rewrite | `/en/services` | Hubs |
| `en/services/[slug]/page.tsx` | **delete** (shadowed by the static pages; imports the deleted ID template) | – | Core |
| `en/services/seo-content-marketing/page.tsx` | rewrite `k="seo"` | same | Service |
| `en/services/local-seo/page.tsx` | rewrite `k="localseo"` | same | Service |
| `en/services/paid-advertising/page.tsx` | rewrite `k="ads"` | same | Service |
| `en/services/social-media-management/page.tsx` | rewrite `k="social"` | same | Service |
| `en/services/creative-services/page.tsx` | rewrite `k="creative"` | same | Service |
| `en/services/website-landing-page/page.tsx` | rewrite `k="website"` | same | Service |
| – | **new** `en/services/ai-search-optimization/page.tsx` `k="ai"` | `/en/services/ai-search-optimization` | Service |
| `en/template.tsx` · `en/not-found.tsx` | **new** | – | Motion · Blog (404) |

Core deletes `layanan/[slug]` and `en/services/[slug]` together in W1 (the EN file imports the ID one).

## 1.10 Redirects

**next.config (27 × 308, generated from `REDIRECTS` in `src/lib/services.ts`):**

| Source | Destination | Why |
|---|---|---|
| `/index` | `/` | 200 duplicate today |
| `/en/index` | `/en` | 404 today, linked by the old switcher |
| `/pricing` | `/layanan` | old nav link, 404 today |
| `/services` | `/layanan` | kept |
| `/services/{seo-content-marketing, local-seo, paid-advertising, social-media-management, creative-services, website-landing-page}` (6) | the ID service pages | 5 kept; `local-seo` added (404 today) |
| `/layanan/{seo-content-marketing, paid-advertising, social-media-management, creative-services, website-landing-page}` (5) | the ID keyword slugs | legacy CMS-slug duplicates (200 today) |
| `/en/layanan` | `/en/services` | wrong-locale links, 404 today |
| `/en/layanan/{jasa-seo-profesional, local-seo, paid-ads, sosial-media-manajemen, kreatif, website-development}` (6) | the EN service pages | 404 today |
| `/en/services/{jasa-seo-profesional, paid-ads, sosial-media-manajemen, kreatif, website-development}` (5) | the EN service pages | ID leaf on the EN route |

**Page code (7 × 308, `permanentRedirect()` before any await that could stream; no `loading.tsx` above):**
- `/en/blog/cara-memperbaiki-core-web-vitals` → `/en/blog/how-to-fix-core-web-vitals`
- `/en/blog/panduan-technical-seo` → `/en/blog/technical-seo`
- `/en/blog/apa-itu-robots-txt` → `/en/blog/robots-txt-guide`
- `/en/blog/apa-itu-social-media-engagement` → `/blog/apa-itu-social-media-engagement` (no EN version)
- `/en/portfolio/traffic-organik-pariwisata-bali` → `/en/portfolio/organic-traffic-bali-tourism`
- `/en/portfolio/pameran-fnb-internasional-case-study` → `/en/portfolio/food-beverage-expo-case-study`
- `/portfolio/{organic-traffic-bali-tourism, food-beverage-expo-case-study}` → their ID slugs
These are derived from CMS `slug`/`slugEn` at request time, not hard-coded.

**Status fixes (not redirects):** `/blog/category/{unknown}` → 404 (200 soft-404 today); `/layanan/{unknown}` → 404 once `[slug]` is gone; `/layanan/jasa-seo-ai` and `/en/services/ai-search-optimization` → 200 (owner default: AI page live). A URL that returns 200 today never becomes a 404.

## 1.11 URL gate (G8: `node scripts/qa/urls.mjs`; Core runs it at the end of W1, every page package at its end, QA in W4)

On `http://localhost:3000`:
- 200: all 35 URLs in `/Users/mm/logink/redesign-2026/sitemap-live.xml`; the other posts `/blog/{cara-memperbaiki-core-web-vitals, panduan-technical-seo, apa-itu-robots-txt}` and `/en/blog/{how-to-fix-core-web-vitals, technical-seo, robots-txt-guide}`; the 10 category URLs (ID/EN × seo, social-media, paid-ads, branding, web-dev); the AI pair (from W3, once the Service package lands; before that `urls.mjs --skip-ai` is used, although the registry already lists the pair in the sitemap and menus).
- Every row in §1.10: a single-hop 308 to the exact destination (`curl -s -o /dev/null -w '%{http_code} %{redirect_url}'`), destination 200.
- `/admin/login` 200 (after any redirect from `/admin`), `/api/services` 200, `/sitemap.xml` and `/llms.txt` 200 with the right content type.
- `<html lang="id">` on `/` and every ID URL; `<html lang="en">` on `/en` and every EN URL (in the raw SSR HTML, before hydration).
- A random `/nope-123` and `/en/nope-123` return 404 with the styled page.

**Sitemap:** 46 URLs = 30 static (15 registry pairs, AI pair included) + 7 posts (4 ID, 3 EN) + 6 cases + 3 indexable categories (seo ID, seo EN, social-media ID). `lastmod` = registry `updated` or CMS `updatedAt`, never build time. hreflang id/en/x-default only where both sides exist. `export const revalidate = 3600` (Payload hooks are not edited).
