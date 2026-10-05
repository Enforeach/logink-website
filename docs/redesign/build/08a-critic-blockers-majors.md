# 8 · CRITIC resolutions (A): blockers and majors

Every fix in `blueprint/CRITIC.md` is binding. Each item quotes the defect, then states how this build resolves it and where. A resolution that differs from CRITIC's suggested fix says why.

## Blockers

**B1 · Route / root-layout architecture.** "There are three incompatible trees, plus a fourth path in motion-engineering." CRITIC's fix was four roots `(legacy)/(legacy-en)/(v2)/(v2-en)`.
→ Superseded by the full replacement (owner scope for this branch). One tree with two frontend roots: `(frontend)/(public)/layout.tsx` (`lang="id"`) and `(frontend)/en/layout.tsx` (`lang="en"`), plus the untouched `(payload)` root and `src/app/global-not-found.tsx` with `experimental.globalNotFound` (verified in the installed 16.2.6 docs and `config-shared.d.ts:763`). tokens.css is the only frontend stylesheet; the globs use `[(]…[)]`; `template.tsx` sits in both roots. With no legacy root, nothing can bleed between them. §1.1–§1.4.

**B2 · Build-plan vs the design-system/motion deliverables.** "Build-plan Phase 1 re-specifies the system from final.md instead of consuming the sibling blueprints."
→ Core copies `design-system/{tokens.css, tailwind.tokens.ts, fonts.ts, check.mjs}` verbatim, with three listed edits (§1.4). Motion copies `motion-engineering/src/**` verbatim with twelve listed patches (§5.4). One component tree (`ds`, `ds/chrome`, `instruments`, `sections`, `motion`) and one name each: SiteObserver, RichGate, PageShell (§2.1). The build-plan tokens, single fallback face and `next/dynamic` RichLayer are dropped. `scripts/check-tokens.mjs` is gate G5.

**B3 · Canvas sequence: frame count, budget, player.** "As specified, the Overture either blows the budget or scrubs in visible steps."
→ 25 frames, 1280×720 (measured **1,132,086 B**). Stops 0/8/16/24 = f0001/f0009/f0017/f0025. `paint()` blends `floor(x)` and `ceil(x)` with `globalAlpha = frac` and keeps both bitmaps. `sequence-core.check.ts` asserts the stops and the blend alpha (G6). Phone keyframes are 800×720 (20.8–35.1 KB). The one budget table (§6.2) replaces every 120-frame figure. §4.2, §5.4 patch 2.

## Majors

**M1 · SSR contract: `.js` pre-state timing.** "If the SiteObserver chunk is blocked, slow or throws, H2 words, citation chips and chat text stay masked at rest."
→ No inline script ever adds `html.js`. `TEKS_SCRIPT` only restores `.mode-teks`, and SiteObserver sets `html.js` after its first scan. The blocked-chunk run is part of G9. §1.3, §5.4 patch 1, §6.1.

**M2 · Chrome placement.** "A layout has no pathname or page props."
→ Layouts hold only DayDial, the skip link, SiteObserver, RichGate and WebVitals. Every page renders `<PageShell locale alt wa sky svc bar sheet>` with header, menus, pill, bar, `<main data-sky>`, closing band, house lights and footer. §1.3, §2.3.

**M3 · `data-nosnippet` on `<figure>`.** "Google honours data-nosnippet only on span, div and section."
→ Mock markup is `<figure><div data-nosnippet inert>…</div><figcaption class="mock-label">`. MockFrame is the only wrapper, mock buttons are `<span>`, and the ProofLoupe root is a `<div>` with no `data-nosnippet`. Enforced by the G4 grep, and by G13 (no `a`/`button` inside `[data-nosnippet]`). §2.4, §2.5d, §5.4 patch 10.

**M4 · Fabricated/false claim: written prices.** "Social and Creative have no prices."
→ Hub H1 `…: Harga dan Paket Setiap Layanan` (EN `…: Prices and Packages for Every Service`), and a new hub description. The fact reads `Harga mulai tertulis untuk SEO, Local SEO, Iklan dan Website; Social & Kreatif: proposal dalam 24 jam`. "Laporan GA4 setiap bulan" becomes `Tracking GA4 disiapkan untuk SEO, Iklan dan Website` (GA4 appears only in those `data.ts` files). Every FACT_STRIP entry carries a `source`. `Service.quote` replaces a missing price. `services.check.ts` fails if a named service lacks a price, and on the old strings (negative test). §3.2 items 3–5.

**M5 · WCAG 2.2.2 pause control.** "There is no user control in design-system FilmLoop or in motion-engineering films()/.lk-ticker."
→ The film gets a `<button aria-pressed>` "Jeda film / Lanjutkan film" (EN "Pause film / Play film"): 44px, focus ring, at the end of the caption line, shipped `hidden` and revealed only by the desktop film code (phones 0 KB), with state in `sessionStorage['lk-film-paused']`. The ticker gets a CSS "Jeda log" checkbox plus pause on `:hover` and `:focus-within`. The phone poster push-in runs once. §5.4 patches 5–6, §2.5d CrawlerLog, DESIGN §10.5.

**M6 · Menus: selector-list invalidation.** "The phone <dialog> menu then opens at opacity 0."
→ `.lk-menu[open]` and `.lk-mega:popover-open` are separate rules, also inside `@starting-style`. `@supports not selector(:popover-open)` hides the popover and its button and shows the `/layanan` link. G4 greps for any selector list containing `:popover-open`. G13 opens both menus in Chromium and WebKit. Exact Safari 16.4 / Firefox 115 ESR engines are not available locally (Playwright ships current engines only; no Firefox is installed), so that run is an open item (08b). §5.4 patch 7.

**M7 · Phone chrome: bottom bar covers content.** "The last 56–90px of every page … is permanently under the bar."
→ Below 1024px: `body { padding-bottom: calc(var(--bar-h) + env(safe-area-inset-bottom)) }` and a matching `html { scroll-padding-bottom }`. G13 asserts the last footer link is uncovered at 390×844. §5.4 patch 8.

**M8 · AA matrix vs lamp and coral glow.** "The CI AA matrix checks only flat grounds."
→ The lamp exists only as a child of `[data-lamp]` media frames that hold no text (film frame; hour-lit photos on AI, Ads and home Bab III/IV). It never sits under text rows, and no ground-level lamp exists. The coral glow height is capped above Bab III's first text row. G13 fails when a `[data-lamp]` contains text. §2.4, §5.4 patch 9.

**M9 · Lead Profiler server save.** "The profiler does collect email." Build-plan defect #1 was wrong.
→ The profiler keeps its fields and POSTs `/api/contact {name, email, company, phone, services:[key], message: brief, source:'lead_profiler'}`. That passes today's zod schema and the collection unchanged (no migration). `/api/contact` gains a honeypot (`website`) and a per-IP limit (5 per 10 min, 429). §3.9 Contact, §5.8, §5.10.

**M10 · Asset brief contradicts the AA fix.** "That is 4.06:1, banned."
→ Instruments are live HTML using role classes only. The mock label is `.mock-label` in `--ink-2` (7.69:1 on Senja Dalam). The prompts.json hexes (E5/P6, E8) are superseded, and nothing is re-rendered. §2.5d.

**M11 · Tailwind purge of component classes.** "… are purged when not seen."
→ tokens.css's `@layer components` wrapper is removed (same cascade position, never purged; 26.3 KB with every class, measured). The content globs also cover `src/motion`, `src/components/{ds,instruments,sections}`, the `(frontend)` app tree and global-not-found. §1.4.

**M12 · Asset storage and path contradictions.** "Paths disagree across keys."
→ One path table (§4.2): `public/media/<key>-<sha8>/…`, written only by `scripts/install-media.mjs` together with `src/content/media.json`; `/media/:path*` immutable in next.config, with a 206 range check. Frames are `atap/d1280/fNNNN.webp` + `key-m/k1–k4.webp`; OG images are `public/og/{lang}-{key}.jpg` wired through `pageMeta` → `ogUrl`. No colocated `opengraph-image`, no `/og/{l}/`, no `/seq`, no `/film`, no Blob. §4.

**M13 · Owner ingredient: "Imagery via Claude Design".** "asset-production does not present this as a deviation."
→ Recorded as an owner decision (§7.2 item 2, DESIGN.md §17). Stills, the film and the rooftop plates are image-model output: Canva now (owner-approved), Weave/Veo later at the same names. Claude Design / live HTML covers instruments, OG images and case covers. Every media slot has an imageless fallback (§4.4).

**M14 · URL preservation.** "Never turn a URL that returns 200 today into a 404."
→ All 27 `REDIRECTS` from the registry, the 7 page-code 308s derived from CMS `slug`/`slugEn`, `/en/blog/<id-slug>` → 308 (never 404), and no `loading.tsx` above them. The sitemap has 46 URLs (30 static including the live AI pair, 7 posts, 6 cases, 3 indexable categories). G8. §1.10–§1.11.
