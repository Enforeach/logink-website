# 5 · Work breakdown (B): foundation packages

Each package: **owns** (plus the §5.2 rows) · **inputs** · **steps** · **done**. Blueprint text sources live in `docs/redesign/blueprint-src/`; binaries (OG JPEGs, og-default, logo SVG, woff2) are read from `/Users/mm/logink/redesign-2026/blueprint/`.

## 5.3 Core (W1)

**Inputs:** blueprint `design-system/`, `page-architecture/services.ts.txt` + `services.check.ts.txt`, `asset-production/og/`, `asset-production/images/og-default.jpg`, `asset-production/logo-light.svg`; `/Users/mm/logink/redesign-2026/assets/out/`; today's `(frontend)/layout.tsx` (GTM snippet).

**Steps:**
1. Screenshot `/admin/login` to `build-shots/core/admin-before.png` before any edit.
2. Styles: copy tokens.css, tailwind.tokens.ts and fonts.ts into `src/styles/`, applying the §1.4 edits. Copy check.mjs to `scripts/check-tokens.mjs` and `/Users/mm/logink/redesign-2026/blueprint/design-system/archivo-full.woff2` to `scripts/fixtures/archivo-latin.woff2`. Replace `tailwind.config.ts`. Delete `src/app/globals.css`.
3. Registry: `src/lib/services.ts` + `services.check.ts` with every §3.2 change; `src/content/og.json`.
4. `src/lib/meta.ts` (§3.3), `src/lib/assets.ts` (§4.3), `src/lib/web-vitals.tsx` (§1.3).
5. Assets: write and run `scripts/install-media.mjs`; copy the 47 OG JPEGs to `public/og/` and og-default to `public/images/`; render `public/images/logo-512.png`.
6. `next.config.ts` (§1.5). Delete `src/middleware.ts`, `(frontend)/layout.tsx`, `en/SetLang.tsx`, `(public)/ProblemSolution.tsx`, `(public)/layanan/[slug]/`, `en/services/[slug]/`, `public/llms.txt` and the starter SVGs.
7. The two root layouts (§1.3, without the (M) lines). A minimal `global-not-found.tsx` (tokens + fonts, `<html lang="id">`, H1 `Halaman tidak ditemukan`, a link home).
8. `sitemap.xml/route.ts` (registry pairs + CMS posts and cases + indexable categories, real `lastmod`, hreflang only for complete pairs, `revalidate = 3600`) and `llms.txt/route.ts`.
9. `robots.txt` comment block, `.gitignore`, and `package.json` scripts (§6.1). Delete the legacy orphans listed in §5.2.

**Done:**
- `tsc` clean for Core paths.
- `pnpm check:registry` prints `ok: 7 services, 8 pages, 15 pairs, 27 redirects`.
- `pnpm check:tokens` passes.
- `node scripts/install-media.mjs --check` passes, and `media.json` holds `buka`, `atap`, the 7 `jam-*` and `ig`.
- `/`, `/en`, one service, `/blog` and one post return 200 on :3000 (legacy bodies unstyled is fine).
- `/admin/login` looks the same (`admin-after.png`).
- `/sitemap.xml` lists 46 URLs and `/llms.txt` is 200.
- Every §1.10 next.config redirect is a single-hop 308.
- `<html lang>` is `id` on `/` and `en` on `/en` in the raw HTML.
- `/nope-123` returns 404.

## 5.4 Motion (W2a)

**Owns:** see §5.2. **Inputs:** `blueprint-src/motion-engineering/src/**`, DESIGN §10, CRITIC.

**Steps:** copy `src/motion/**`, `src/types/react-canary.d.ts` and `template.tsx` (into both roots), then apply these patches:
1. **Mode teks key:** `lk-mode-teks` everywhere. `TEKS_SCRIPT = "try{localStorage.getItem('lk-mode-teks')==='1'&&document.documentElement.classList.add('mode-teks')}catch(e){}"`. SiteObserver writes `'1'` or removes the key, and on load sets `#mode-teks.checked = html.classList.contains('mode-teks')`.
2. **25-frame canvas with neighbour blend:** `sequence-player` `paint()`: `x = p*(n-1)`; draw `floor(x)`; if `frac > .01`, draw `ceil(x)` with `globalAlpha = frac`. Reserve both bitmaps in the window. Stops for 25 frames are 0/8/16/24 (files f0001/f0009/f0017/f0025). Extend `sequence-core.check.ts` with the 25-frame stops and a blend-alpha assertion.
3. **LOOP tier cut:** remove the `loop` prop and the `data-lowmem` branch in `rich/index.ts films()`. Low-memory desktops get the STEP tier.
4. **Phone keyframes 800×720** (`key-m/k1–k4`) in a `min(40svh, 360px)` band switched by SiteObserver `data-step`. Tablets use the d1280 stop frames via `<picture media>`. There are no CSS view-timelines for this.
5. **Film pause (WCAG 2.2.2):** FilmHero renders, at the end of its figcaption, `<button type="button" class="lk-film__pause" aria-pressed="false" hidden data-l-pause={labels.pause} data-l-play={labels.play}>` (44px, focus ring). `films()` unhides it when it attaches a src, toggles play/pause and `aria-pressed`, swaps the label, and keeps the state in `sessionStorage['lk-film-paused']` (try/catch). A saved pause means no autoplay. Labels: `Jeda film`/`Lanjutkan film`, EN `Pause film`/`Play film`. The phone poster push-in runs once.
6. **Ticker pause:** `.lk-ticker-toggle:checked ~ .lk-ticker .lk-ticker__track`, `.lk-ticker:hover` and `.lk-ticker:focus-within` all set `animation-play-state: paused` (markup contract in 02c CrawlerLog).
7. **Menu selectors split:** `.lk-menu[open] {…}` and `.lk-mega:popover-open {…}` as separate rules, also inside `@starting-style`. Add `@supports not selector(:popover-open) { .lk-mega, .nav-mega-btn { display: none } }` and `@supports selector(:popover-open) { .nav-mega-link { display: none } }` (Chrome's header uses those two class names).
8. **Bottom bar never covers content:** `@media (max-width:1023px) { body { padding-bottom: calc(var(--bar-h) + env(safe-area-inset-bottom)) } html { scroll-padding-bottom: calc(var(--bar-h) + env(safe-area-inset-bottom) + 8px) } }`.
9. **Lamp only over media:** `.lk-lamp` is styled only as a child of `[data-lamp]`. There is no ground-level lamp. `.lk-glow` height is capped so it ends above the first text row of Bab III.
10. **ProofLoupe root** becomes `<div class="lk-proof" data-loupe>`: no figure, no `data-nosnippet`, no label prop (the MockFrame child carries them).
11. Delete `useHtmlAttr` and any HeaderLogo code. FilmHero takes `poster: { desktop: {src,w,h}; mobile: {src,w,h} }` and sets `--ar` from the desktop dimensions.
12. Mount in both root layouts (the (M) lines of §1.3). Add the ESLint `no-restricted-imports` block (§2.2 rule 2).

**Done:**
- `pnpm check:seq` passes.
- `tsc` and `pnpm lint` are clean for `src/motion` and `src/app/**/template.tsx`.
- On :3000 with a fine pointer, `html.js` and `html.rich` get set. With a touch profile (390×844, `hasTouch`), `scripts/qa/motion-gate.cjs /` shows 0 motion markers.
- Mode teks persists across reloads, and no text is hidden (`states.cjs /`).
- The screenshot folder `build-shots/motion/` holds evidence of these checks.

## 5.5 Chrome + primitives (W2b)

**Owns:** `src/components/ds/**`, the dev-kit page. **Inputs:** §2.3–§2.5a/b, DESIGN §3–§9, the registry, `motion/primitives`.

**Steps:** build every 2.5a primitive and 2.5b chrome component. `ds/strings.ts` holds the chrome UI labels (§3.6) and `ds/types.ts` holds `CaseCard` and `Placement`. `SiteHeader` uses `.nav-mega-btn` (the popover trigger) and `.nav-mega-link` (the `/layanan` fallback). Add `src/app/(frontend)/(public)/dev-kit/page.tsx`: `robots: { index: false }`, `notFound()` when `process.env.NODE_ENV === 'production'`; it renders PageShell (ID) with every primitive on each ground.

**Done:**
- `tsc` and lint are clean for `src/components/ds`.
- `/dev-kit` renders at 390 and 1440.
- One `LogoFull`, whose "Log" fill flips with `html[data-sky]`.
- The mega menu opens (Chromium and WebKit) and falls back to a link where popover is missing.
- The `<dialog>` menu opens and closes, and traps focus.
- The bottom bar does not cover the last footer link at 390×844.
- WhatsApp is reachable at every scroll position (pill ≥1024px, bar <1024px).
- The AA check passes on each ground (`check:tokens` + computed-style sample).
- Screenshots are in `build-shots/chrome/`.

## 5.6 Instruments (W2b, parallel with Chrome)

**Owns:** `src/components/instruments/**`, `src/content/instruments.ts`, `dev-kit/instruments/page.tsx` (same production guard). **Inputs:** §2.5d, blueprint `asset-production/prompts.json` E1–E12 briefs (composition only; colours via roles), DESIGN §8.

**Steps:** build the 17 components of §2.5d inside `MockFrame`, each ID/EN, animating once through `data-reveal="inst"` (transform, clip-path and opacity on non-text decoration only). `Phone` reuses the instruments at phone size. The kit page shows every instrument on its ground at 390 and 1440, with Mode teks on and off.

**Done:**
- `tsc` and lint are clean.
- `rg -nP '<(?!div|span|section)\w+[^>]*data-nosnippet' src/components/instruments` prints nothing.
- There is no `<a>` or `<button>` inside any MockFrame.
- Every mock shows the label.
- No text is hidden at rest (`states.cjs /dev-kit/instruments`).
- Screenshots are in `build-shots/instruments/`.
