# 5 · Work breakdown (A): waves, strict file ownership, coordination

Package keys: **Core** (Foundation-core), **Motion**, **Chrome** (Chrome + primitives), **Instruments**, **Service** (template + all 7 service pairs incl. the AI pair), **Home**, **Hubs** (hub, about, portfolio, case), **Blog** (blog, contact, legal, 404), **QA**. The asset agent is outside these packages; it only produces files in `/Users/mm/logink/redesign-2026/assets/out/` and may re-run `scripts/install-media.mjs`.

## 5.1 Waves

| Wave | Packages (parallel inside a wave) | Starts when |
|---|---|---|
| W1 | **Core** · **QA-0** (gate scripts only) | now |
| W2a | **Motion** | Core done (§5.3 done criteria) |
| W2b | **Chrome** · **Instruments** | Motion done |
| W2c | **QA-1**: foundation check (tsc, lint, `pnpm build`, G1–G8 on the kit pages) | Chrome and Instruments done |
| W3 | **Service** · **Home** · **Hubs** · **Blog** | QA-1 green. Home wires its chapter rows only after Service's step 1 (content files) exists; it builds hero, facts, table, profiler and overture first |
| W4 | **QA** final: all gates on all URLs, orphan deletion, screenshots, report | all W3 packages done |

## 5.2 Single owner per file

No two packages own the same file at the same time. Three files change owner once, in sequence, and the earlier owner never touches them again:

| File | W1 | then |
|---|---|---|
| `src/app/(frontend)/(public)/layout.tsx`, `src/app/(frontend)/en/layout.tsx` | Core | Motion (W2a) adds the (M) lines of §1.3, then frozen |
| `src/app/global-not-found.tsx` | Core (minimal) | Blog (W3) |
| `package.json` | Core writes every §6.1 script entry, including those pointing at QA files | frozen |

Shared files (read by everyone, written by one):

| Path | Owner |
|---|---|
| `src/lib/services.ts`, `src/lib/services.check.ts`, `src/lib/meta.ts`, `src/lib/assets.ts`, `src/lib/web-vitals.tsx` | Core |
| `src/styles/{tokens.css, tailwind.tokens.ts, fonts.ts}`, `tailwind.config.ts`, `next.config.ts`, `.gitignore`, `public/robots.txt`, `public/og/**`, `public/images/**` | Core |
| `scripts/install-media.mjs`, `scripts/check-tokens.mjs`, `scripts/fixtures/**`, `src/content/og.json` | Core |
| `public/media/**`, `src/content/media.json` | generated only by `scripts/install-media.mjs` (never hand-edited) |
| `src/app/sitemap.xml/route.ts`, `src/app/llms.txt/route.ts` | Core |
| `src/motion/**` (incl. `motion.css`), `src/types/react-canary.d.ts`, `src/app/(frontend)/(public)/template.tsx`, `src/app/(frontend)/en/template.tsx`, `eslint.config.mjs` | Motion |
| `src/components/ds/**` (incl. `chrome/`, `strings.ts`, `types.ts`), `src/app/(frontend)/(public)/dev-kit/page.tsx` | Chrome |
| `src/components/instruments/**`, `src/content/instruments.ts`, `src/app/(frontend)/(public)/dev-kit/instruments/page.tsx` | Instruments |
| `src/components/sections/service/**`, `src/content/services/**`, the 12 existing service route files + the 2 new AI route files, `(public)/dev-kit/service-fallback/page.tsx` | Service |
| `src/components/sections/home/**`, `src/content/home.ts`, `(public)/page.tsx`, `en/page.tsx`, `(public)/dev-kit/home-fallback/page.tsx` | Home |
| `src/components/sections/{hub,about,portfolio,case}/**`, `src/content/{hub,about,portfolio}.ts`, routes `layanan/page`, `en/services/page`, `about` ×2, `portfolio` + `portfolio/[slug]` ×2, `src/types/case-study.ts` | Hubs |
| `src/components/sections/{blog,contact,legal,notfound}/**`, `src/content/{blog,contact,notfound}.ts`, `src/content/legal/**`, `src/styles/prose.css`, routes `blog/**` ×6, `contact` ×2, `privacy`/`terms` ×4, `not-found.tsx` ×2, `src/app/api/contact/route.ts`, `src/lib/cta.ts` | Blog |
| `scripts/qa/**`, `/Users/mm/logink/redesign-2026/build-shots/qa/**`, W4 orphan deletions (§5.11) | QA |

Never edited by anyone: `src/components/ui/Logo.tsx`, `src/app/(payload)/**`, `src/payload/**`, `src/collections/**`, `src/globals/**`, `src/migrations/**`, `src/payload.config.ts`, `src/payload-types.ts`, `prisma/**`, `src/app/api/{cta-widgets,revalidate}/**`, `DESIGN.md` (the spec agent only), `docs/redesign/**` (the spec agent only).

Legacy files are deleted by the package that removes their last importer, after `rg -l "<import path>" src` shows no other importer:
- Core: `components/public/{Navbar,Footer,WhatsAppButton,Hero,BlogCard,StatsCounter,TestimonialCarousel,PricingTier}.tsx`, `components/ui/{Toast,LanguageSwitcher}.tsx` (only if orphaned), `(frontend)/(public)/ProblemSolution.tsx`, `en/SetLang.tsx`.
- Service: `components/public/services/**` (51 files) after `git mv` of the six `data.ts`.
- Home: `components/public/home/**` and `LeadProfiler.tsx` (`git mv`).
- Hubs: `components/public/{ServicesPageContent,ServiceCard,CTASection,CaseStudyCard}.tsx`, `components/public/case-study/**` (`git mv` of blocks), `(public)/about/Reveal.tsx`.
- Blog: `components/public/blog/**`, `components/public/cta/**` (`git mv`), `components/public/ContactForm.tsx` (`git mv`).
- QA (W4): whatever is still orphaned (§5.11).

## 5.12 Coordination rules (every package)

1. Edit only files you own. If you need a change in a file you do not own, do not edit it: list it under `open_issues` in your final report as `REQUEST <owner>: <file> — <change>`, and build against the current contract meanwhile.
2. Read `docs/redesign/BUILD.md`, your package section, `DESIGN.md` and the parts your package cites before writing code. Check `node_modules/next/dist/docs` before any unfamiliar Next API.
3. Type-check only your paths: `pnpm exec tsc --noEmit -p . 2>&1 | grep -E '<your paths>'`. Fix only your errors. Legacy files that others own may error mid-wave; ignore those.
4. Use the shared dev server at `http://localhost:3000` (log `/tmp/logink-dev.log`). Do not start another one. If `:3000` fails twice 10 s apart and `lsof -i :3000 -sTCP:LISTEN` prints nothing, restart it: `cd /Users/mm/logink/logink_website/logink-website && nohup pnpm dev > /tmp/logink-dev.log 2>&1 &`. Only QA-1 and QA (W4) run `pnpm build`; dev writes to `.next/dev`, so the two can coexist.
5. Screenshots: your own Playwright script (`require('/Users/mm/logink/logink_website/logink-website/node_modules/@playwright/test').chromium`, headless) saved to `/Users/mm/logink/redesign-2026/build-shots/<package key>/`, at 390×844 and 1440×900 minimum. Never the mcp playwright tools.
6. No shell command over ~2.5 minutes. Write big files in chunks (≤10 KB per tool call; `Write` the first part, then `Edit` or `cat >>`). Prefer many small files.
7. Do not switch branches, commit, push or deploy. `git mv` is allowed, since it only stages a rename.
8. Copy blueprint sources with `cp` from `docs/redesign/blueprint-src/` (the `.txt` suffix is removed on copy), then edit.
9. Honesty: never invent clients, testimonials, logos, team facts, results or dates. A slot with no real data hides or shows its documented empty state.
10. **No writes to Payload.** The shared dev server uses the project's Neon database (`.env.local`); treat it as production. Never submit a real form, create or edit CMS documents, or run migrations. Test POSTs use only a filled honeypot or an invalid payload.
11. Your package is done only when its done criteria (§5.3–§5.11) pass. Your final report lists the gates you ran and their output.
