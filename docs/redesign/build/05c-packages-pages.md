# 5 · Work breakdown (C): page packages and QA

## 5.7 Service: template + all service pages (W3)

**Owns:** see §5.2. That includes the new routes `(public)/layanan/jasa-seo-ai/page.tsx` and `en/services/ai-search-optimization/page.tsx` (owner-approved by default, `AI_PAGE_LIVE = true`).
**Inputs:** §3.4 (`ServiceContent`), §3.8, §2.5e, the registry, today's six `data.ts` and service components (for copy, the pricing logic and the message builders), blueprint page-architecture templates, `/Users/mm/logink/redesign-2026/research/{seo-data,aeo-geo}.md` (PAA questions, AEO facts, sources).
**Steps:**
1. **Content first** (Home is waiting on it): `git mv` the six `data.ts` files into `src/content/services/<key>.ts`; write `types.ts`; add the default exports with every `ServiceContent` field in ID and EN, starting with `answer` and `ai`; write `ai.ts` including `AI_COMPARE`.
2. `sections/service/**`: the 15 blocks, `HERO_CARD`, `QuoteBuilder` (pure builder logic moved from `SocialPricing.tsx`/`CreativePricing.tsx`; `node --test` proves the same inputs give byte-identical wa.me text as the legacy builders), `schema.ts`, `serviceMeta`.
3. Rewrite the 12 existing route files and add the 2 AI routes (§1.8 wrapper). Delete `components/public/services/**`.
4. `ServicePage` takes `noMedia?: boolean`; the dev-only route `(public)/dev-kit/service-fallback/page.tsx` (Service owns it; production guard as §5.5) renders SEO, Local SEO and AI without media, so the card-only hero can be checked.

**Done** (for all 14 URLs):
- H1 === registry.
- Words are within §3.4 targets and ≥ floor.
- Offer JSON-LD equals the visible tiers on seo, localseo, ads and website, and is absent on the others.
- Every "Mulai Rp 1 Juta" carries "ditagih tahunan".
- `#ai-search` is present on the six non-AI pages.
- The AI page shows GEO & AEO in its H1 and title, the customs line, "Kami tidak menjamin kutipan." and the baseline (flag).
- Local SEO loads no film or canvas.
- G1, G3, G4, G8, G9, G10 and G11 pass on these URLs.
- Screenshots at 390 and 1440 go to `build-shots/service/`.

## 5.8 Home (W3)

**Owns:** see §5.2. **Inputs:** §3.7, §2.5e, the registry, `content/services/*` (answers, `AI_COMPARE`), instruments, motion primitives, `media('buka')`, `media('atap')`, today's `HowWeWorkSection.tsx` steps and `LeadProfiler.tsx`.
**Steps:** `content/home.ts` (ID/EN: overture steps, chapter leads, Bab III copy, process, FAQ) → `sections/home/**` in §3.7 order → `git mv` LeadProfiler into `LeadProfilerIsland.tsx` (restyle; add the localseo and ai paths; POST `/api/contact` with a honeypot; no framer-motion) + `ProfilerMount.tsx` → rewrite `(public)/page.tsx` and `en/page.tsx` → delete `components/public/home/**`.
**Done:**
- H1 === registry, and LCP ≈ FCP (the maskless rise).
- ≤14 phone screens; content-height ratio ≤1.5.
- 1,100–1,400 words.
- Phones download 0 KB of motion JS, no video and no frames beyond k1–k4.
- On desktop the film plays after `load`, the pause button works and persists for the session, and the canvas scrubs 25 frames with a blend.
- `HomePage` takes `noMedia?: boolean`, which passes `null` for every media lookup. The dev-only route `(public)/dev-kit/home-fallback/page.tsx` (Home owns it; `notFound()` in production, noindex) renders it, and shows the §4.4 fallbacks with no `<img>`, `<video>` or canvas.
- Initial JS ≤200 KB; G1–G12 pass on `/` and `/en`.
- Screenshots go to `build-shots/home/`.

## 5.9 Hubs: hub, about, portfolio, case (W3)

**Owns:** see §5.2. **Inputs:** §3.9 (hub, about, portfolio, case), `ServicesTable`, `CaseCover`, `MeasureBlock`, Payload queries, today's about page copy.
**Steps:** `content/{hub,about,portfolio}.ts` → `sections/{hub,about,portfolio,case}/**` (`git mv` of `case-study/blocks` into `sections/case/blocks/`, restyled in place with the same data contracts) → rewrite the 8 route files (with the case slug redirects) → delete the legacy files listed in §5.2.
**Done:**
- The 3 case pairs return 200.
- The EN/ID slug swaps are single-hop 308s.
- Hub H1 is the fixed string, and the hub has no Offer.
- About shows no invented facts and hides empty owner rows.
- Portfolio shows no metric sentence while `APPROVED_CASE_SLUGS` is empty.
- G1, G3, G4, G8 and G9 pass on these URLs.
- Screenshots go to `build-shots/hubs/`.

## 5.10 Blog: blog, contact, legal, 404 (W3)

**Owns:** see §5.2, including `global-not-found.tsx` from W3 and `/api/contact`. **Inputs:** §3.9 (blog, contact, legal, 404), Payload queries, `lib/cta.ts`, today's blog, cta, ContactForm and legal files.
**Steps:** `content/{blog,contact,notfound}.ts` + `content/legal/*` (verbatim) → `src/styles/prose.css` → `git mv` blog, cta and ContactForm into `sections/`, then restyle (no framer-motion; all 7 CTA placements render) → `sections/{contact,legal,notfound}` → rewrite the 12 routes + 2 `not-found.tsx`, and make `global-not-found.tsx` final → add the honeypot and rate limit to `/api/contact` → delete the legacy files.
**Done:**
- The 7 posts return 200, and the 4 EN-route ID slugs 308 correctly.
- Unknown category → 404, zero-post categories are `noindex,follow`, and indexable ones are 200.
- `/contact?layanan=seo` preselects SEO while the page stays static.
- No real submission is sent (the dev server uses the Neon database; treat it as production). A honeypot POST returns 200 and saves nothing (the `/admin` contact-submissions count is unchanged), and an invalid POST returns 400.
- Legal text is byte-identical to today's (diff the extracted text).
- `/nope` and `/en/nope` are styled 404s.
- G1, G3, G4, G8 and G9 pass on these URLs.
- Screenshots go to `build-shots/blog/`.

## 5.11 QA (QA-0 in W1, QA-1 in W2c, final in W4)

**Owns:** `scripts/qa/**`, orphan deletion in W4, `build-shots/qa/`.
- **QA-0 (W1):** copy the blueprint acceptance scripts (`test/acceptance/{lib,perf-mobile,states,tall-viewport,motion-gate}.cjs`) into `scripts/qa/`, and apply the CRITIC changes: the JSON-LD exclusion list (§2.4), `BASE` defaulting to `http://localhost:3000`, `H1_JSON` generated from the registry by `scripts/qa/h1.mjs`, and the content-height metric. Write `scripts/qa/urls.mjs` (G8, with a `--skip-ai` flag used until W3), `scripts/qa/greps.mjs` (G4) and `scripts/qa/dom.cjs` (G13: last footer link uncovered at 390×844; no `a`/`button` inside `[data-nosnippet]`; `[data-lamp]` holds no text nodes; one H1; no inline `opacity:0`; menu opens in Chromium and WebKit). Take `build-shots/qa/admin-baseline.png`.
- **QA-1 (W2c):** G1–G8 and G13 on `/dev-kit` and `/dev-kit/instruments`, plus `pnpm build` (must succeed). Report failures to the owning package.
- **W4:**
  1. Run every gate in §6.1 on every URL in §1.11 and fill in the §6.2 budget table with measured values.
  2. Run `pnpm build && pnpm start -p 3100` for perf (G12) and the bundle gate. Stop the :3100 server afterwards.
  3. Delete what is still orphaned: `components/public/**`, `components/ui/*` except `Logo.tsx`, `src/hooks/**`, `src/lib/{i18n,constants,seo}*`, the `dev-kit` routes (all four). Before each deletion, `rg` must show 0 importers.
  4. Config follow-ups (e.g. dropping `framer-motion` from `optimizePackageImports` once legacy code is gone) go in the report as `REQUEST Core:` lines; QA does not edit Core files.
  5. Take screenshots of every page at 390×844 and 1440×900 into `build-shots/qa/`.
  6. Write the report: gate table, budget table, open issues.
**Done:** every §6.1 gate passes, or each failure is listed with its owner, and the site builds.
