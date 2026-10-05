# 6 · Test gates and the one budget table

Part of `docs/redesign/BUILD.md`. `BASE` defaults to `http://localhost:3000` (the shared dev server). Perf (G12) runs only on a production build.

## 6.1 Gates (exact commands; Core adds these `package.json` scripts in W1)

```jsonc
"check:registry": "tsx src/lib/services.check.ts",
"check:tokens":   "tailwindcss -i src/styles/tokens.css -o /tmp/lk-tokens.css && TOKENS_DIR=src/styles ARCHIVO_WOFF2=scripts/fixtures/archivo-latin.woff2 node scripts/check-tokens.mjs --browser /tmp/lk-tokens.css",
"check:seq":      "tsx src/motion/sequence-core.check.ts",
"check:media":    "node scripts/install-media.mjs --check",
"qa:greps":       "node scripts/qa/greps.mjs",
"qa:urls":        "node scripts/qa/urls.mjs",
"qa:states":      "node scripts/qa/states.cjs",
"qa:tall":        "node scripts/qa/tall-viewport.cjs",
"qa:motion":      "node scripts/qa/motion-gate.cjs",
"qa:dom":         "node scripts/qa/dom.cjs",
"qa:perf":        "node scripts/qa/perf-mobile.cjs",
"qa":             "pnpm check:registry && pnpm check:tokens && pnpm check:seq && pnpm check:media && pnpm qa:greps && pnpm qa:urls"
```

| Gate | Command | Passes when |
|---|---|---|
| G1 types | `pnpm exec tsc --noEmit -p .` (in waves: `… 2>&1 \| grep -E '<your paths>'`) | 0 errors (W4: in the whole project) |
| G2 lint | `pnpm lint` | 0 errors, including the §2.2 `no-restricted-imports` rule |
| G3 registry | `pnpm check:registry` | prints `ok: 7 services, 8 pages, 15 pairs, 27 redirects`; the negative test still fails when a rule is broken |
| G4 greps | `pnpm qa:greps` | 0 hits for every check in the table below |
| G5 tokens | `pnpm check:tokens` | the AA matrix passes (54 allowed pairs, 17 banned confirmed), the allow-list is clean, 24/24 hours match, every browser cell passes, and the fallback widths are within tolerance |
| G6 canvas math | `pnpm check:seq` | 25-frame stops 0/8/16/24 and blend alpha asserted |
| G7 media | `pnpm check:media` | every `media.json` file exists with the recorded size and within the §6.2 budgets; `find public/og public/images -size +150k` prints nothing |
| G8 URLs | `pnpm qa:urls` | §1.11: 200 on the 35 live URLs + 6 other posts + 10 categories + the AI pair; every §1.10 row is a single-hop 308 to a 200; `/nope-123` and `/en/nope-123` 404; raw-HTML `<html lang>` is id/en per root; `/sitemap.xml` has 46 `<loc>`; `/llms.txt` 200 `text/plain`; `/admin/login` 200; `/api/services` 200. Before W3 use `--skip-ai` |
| G9 states | `H1_JSON=scripts/qa/h1.json pnpm qa:states <paths>` | runs no-JS at 390 and 1440, reduced motion, Mode teks, and **blocked chunks** (`route.abort` on `/_next/static/chunks/*` except framework): exactly one H1 === approved; 0 hidden text; no inline `opacity:0` in the SSR HTML; every JSON-LD string ≥20 chars is visible (excluding URL values and the §2.4 keys); no rich chunk, Lenis or player under reduced motion or Mode teks; nothing painted in Mode teks |
| G10 tall | `pnpm qa:tall <paths>` | at 412×732, 412×12140 and 1440×12140: 0 hidden text, no horizontal overflow, content-height ratio ≤1.5, no `.webm`, ≤4 keyframes and no rich chunk in tall renders |
| G11 motion | `pnpm qa:motion / /layanan/jasa-seo-profesional /layanan/local-seo` | phone (390×844, touch): none of `lenis-smooth`, `lk-cur__dot`, `createImageBitmap`, `restDelta`, `framerAppearId` in any downloaded script; desktop: the initial scripts are clean, the rich chunk arrives after `load`, `html.rich` and `html.lenis` are set, and the player loads and draws on `/` |
| G12 perf | W4 only: `pnpm build && (pnpm start -p 3100 &)`, then `BASE=http://localhost:3100 RUNS=3 pnpm qa:perf / /en /layanan/jasa-seo-profesional /layanan/local-seo /layanan/jasa-seo-ai /blog/apa-itu-social-media-engagement /contact`; stop :3100 afterwards | every §6.2 row marked G12 is met (median of 3) |
| G13 DOM | `pnpm qa:dom <paths>` | the last footer link is uncovered at 390×844 (`elementFromPoint`); no `a`/`button` inside `[data-nosnippet]`; no text node inside `[data-lamp]`; ≤1 `.ribbon-horizon`, only on `/`, `/en` and the AI pair; one `LogoFull` in the header; the mega menu opens in Chromium and WebKit (`popover` fallback link where unsupported), and the dialog menu opens and closes; a WhatsApp control is in the viewport at 5 scroll positions; every `<img>` has `naturalWidth > 0` and an `alt`; no `<video>` without an attached, loadable `src` on desktop; main-content words ≥ the §3.4 floor |
| G14 admin | `node scripts/qa/dom.cjs --admin` | `/admin/login` 200 and a screenshot beside `admin-baseline.png` (visual check by QA) |

`scripts/qa/greps.mjs` (Node, no dependencies: walks the paths, tests each regex per line, prints `file:line`, exits 1 on any hit). There is no `rg` binary for scripts on this Mac (`rg` exists only as the agent shell's zsh function), so the gate is not a bash script. Agents may still use `rg` interactively. Checks (JS regex · scope · exclusions):

| # | Regex | Scope |
|---|---|---|
| 1 | `--font-sans\s*:` and `variable:\s*['"]--font-sans` | `src` |
| 2 | `<LogoFull(?![^>]*theme=)` | `src` |
| 3 | `#[0-9A-Fa-f]{6}\b` and `rgba?\(` | `src/components/{ds,instruments,sections}`, `src/app/(frontend)` |
| 4 | `text-(coral\|jingga\|magenta\|crimson)\b`, `rounded-(lg\|xl\|2xl)`, `shadow-(sm\|md\|lg\|xl)`, `bg-gradient` | same as 3 |
| 5 | `tokens\.css\|tailwind\.tokens\|motion\.css` | `src/app/(payload)` |
| 6 | `<(?!div\|span\|section)\w+[^>]*data-nosnippet` | `src` |
| 7 | `scroll-behavior:\s*smooth` | `src` |
| 8 | `from ['"](framer-motion\|motion/react)` | `src` minus `src/motion/rich/**`, `src/motion/sequence-player.ts`, `src/components/public/**` (W4: without the last exclusion) |
| 9 | `from ['"]lenis` | `src` minus `src/motion/rich/index.ts` |
| 10 | `/selengkapnya\|learn more/i` | `src/components/{ds,instruments,sections}`, `src/content` |
| 11 | `Harga tertulis di setiap\|Written prices for every\|Laporan GA4 setiap bulan\|Ranking #1\|ROAS 2–4\|tanpa lock-in` | `src/lib`, `src/content`, `src/components/{ds,sections}` |
| 12 | a selector list containing `:popover-open` (`:popover-open[^{]*,` or `,[^{]*:popover-open`) | `src/motion/motion.css` |
| 13 | `—` (em dash) | `src/content` minus `src/content/legal/**` |
| 14 | `next/dynamic` | `src/motion`, `src/components/{ds,instruments}` |
| 15 (W4, `W4=1`) | `components/public\|components/ui/(?!Logo)\|lib/i18n\|lib/constants\|@/lib/seo['"]` and `framer-motion` outside `src/motion/**` | `src` |

## 6.2 The one budget table

Measured values come from the asset agent (2026-09-27) and the blueprint. QA fills the "W4 measured" column.

| Metric | Home | Service pages | Other pages | Gate | W4 measured |
|---|---|---|---|---|---|
| Fonts | 100,472 B (Archivo 90,096 preloaded + Martian Mono 10,376 lazy), exactly 1 font preload | same | same | G12 (+2%) | |
| Inlined CSS per page (raw, minified) | ≤48 KB (tokens ≈26.3 + motion ≈15.8 + page utilities) | ≤48 KB | ≤48 KB | G12 | |
| Initial JS, phone (transfer before `load`) | ≤200 KB | ≤170 KB | ≤170 KB | G12 | |
| T1 motion JS, all devices | ≤3.4 KB gz (SiteObserver + RichGate + gates + ScrollSequence island) | ≤2.4 KB gz | ≤2.4 KB gz | G11/G12 | |
| T2 rich JS, desktop fine pointer only, after `load` | ≤17 KB gz + canvas player ≤2.2 KB gz | ≤17 KB gz | ≤17 KB gz | G11 | |
| Motion JS on phones | 0 KB | 0 KB | 0 KB | G11 | |
| Lab LCP (412×915, 4× CPU, 1.6 Mbps, 150 ms RTT) | ≤2.0 s (fail >2.5 s); LCP = H1 or poster; H1 LCP − FCP ≤150 ms | ≤2.0 s, LCP = H1 | ≤2.0 s | G12 | |
| TBT / CLS | ≤200 ms / ≤0.05 | same | same | G12 | |
| INP (field p75) | ≤200 ms (web-vitals → dataLayer) | same | same | RUM | |
| Hero film (desktop only) | ≤1.5 MB (measured 1.03 MB); poster ≤80 KB (54.5) / phone poster ≤60 KB (36.4) | 0 | 0 | G7, G10 | |
| Canvas (desktop only) | 25 frames ≤2.5 MB (measured 1.13 MB); decoded window ≤128 MiB; phone keys 4 × ≤50 KB (20.8–35.1) | 0 | 0 | G7, G11 | |
| Stills | master ≤300 KB (29–127); hero delivered ≤120 KB desktop / ≤70 KB phone; hover float ≤50 KB; thumb ≤4 KB | same | — | G7 | |
| OG image | 1200×630 JPEG ≤150 KB (16.7–46) | same | same | G7 | |
| Page weight before interaction, phone | ≤1 MB | ≤700 KB | ≤700 KB | G12 | |
| Inline RSC payload | ≤60 KB | ≤60 KB | ≤60 KB | G12 | |
| Infinite animations on screen | ≤2 (film, ticker) | ≤1 | ≤1 | review | |
| Hidden text; content-height ratio 12140:732 | 0; ≤1.5 | same | same | G9, G10 | |
| Length | ≤14 phone screens (content height at 390 ≤ 14 × 844 px) | — | — | G10 | |
| Main-content words | 1,100–1,400 | §3.4 per service | §3.9 per page | G13 | |
| Dark share | ≤30% | ≤15% (AI and Ads ≤35%) | ≤15% (contact ≤40%) | G13 | |
