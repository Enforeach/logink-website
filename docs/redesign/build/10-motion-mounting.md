# 10 · Motion mounting instructions

Part of `docs/redesign/BUILD.md`. Written by the Motion package (§5.4). Motion did **not** edit the layouts or chrome in this run: the exact edits are below, for the owner of each file. Everything Motion ships lives in `src/motion/**`, `src/types/react-canary.d.ts`, both `template.tsx`, `eslint.config.mjs` and `scripts/qa/motion-gate.cjs`.

## 10.1 Root layouts: the (M) lines of §1.3 (both roots, identical)

`src/app/(frontend)/(public)/layout.tsx` and `src/app/(frontend)/en/layout.tsx`. Add exactly these lines and change nothing else.

```tsx
import '@/styles/tokens.css'
import '@/motion/motion.css'                                     // (M) right AFTER tokens.css
import { TEKS_SCRIPT, DayDial } from '@/motion/primitives'       // (M)
import { SiteObserver } from '@/motion/SiteObserver'             // (M)
import { RichGate } from '@/motion/RichGate'                     // (M)
…
<html lang="id" className={`${archivo.variable} ${martian.variable}`} suppressHydrationWarning>
  <head><script dangerouslySetInnerHTML={{ __html: TEKS_SCRIPT }} /></head>   {/* (M) */}
  <body>
    {/* GTM noscript iframe (unchanged) */}
    <a href="#main" className="skip-link">Langsung ke konten</a>
    <DayDial />                                                   {/* (M) */}
    {children}
    <SiteObserver /><RichGate />                                  {/* (M) */}
    <WebVitals />
    {/* <Script id="gtm" …> (unchanged) */}
  </body>
</html>
```
- `suppressHydrationWarning` on `<html>` is already there. It is required, because `TEKS_SCRIPT`, SiteObserver and Lenis all write classes on `<html>`.
- `TEKS_SCRIPT` only restores `html.mode-teks` from `localStorage['lk-mode-teks'] === '1'`. Nothing inline adds `html.js`. SiteObserver adds it after its first scan, so a blocked chunk leaves every word visible (verified: blocked-chunks run, 0 hidden text).
- Never import `motion.css` from `(payload)`, `global-not-found.tsx` or any component.
- `template.tsx` in both roots already renders `<PageCut>` (React `<ViewTransition enter="lk-page" exit="lk-page" default="none">`). `next.config.ts` must keep `experimental.viewTransition: true`.

## 10.2 PageShell and chrome (Chrome pkg): the class contract motion.css binds to

| Markup (§2.3) | What motion does with it |
|---|---|
| `<header class="site-header">` | `html[data-nav]` = top, pill (>80 px) or hide (scrolling down past 240 px). The pill is clip-path; hide is translate. Never hides while it holds focus |
| `<button class="nav-mega-btn" popovertarget="mega">` + sibling `<a class="nav-mega-link" href="/layanan">` | With popover support the link is hidden. Without it, `.lk-mega` and the button are hidden and the link shows |
| `<div id="mega" popover="auto" class="lk-mega">` | Opens at opacity 1 via `:popover-open` (a separate rule, also in `@starting-style`) |
| `<dialog id="menu" class="lk-menu" aria-label="Menu">` with `<MenuButton target="menu">` (open) and `<MenuButton target="menu" close>` inside | Invoker Commands open and close it natively. SiteObserver's click fallback covers Safari <26.2 and Firefox <144 |
| `<span class="wa-pill" data-magnetic><a …WaButton…></span>` | Fixed at ≥1024 px, never hides. Its `<a>` leans ≤14 px toward a fine pointer (magnetic) |
| `<nav class="bottom-bar">` | Shown below 1024 px. `body` gets `padding-bottom: calc(var(--bar-h) + env(safe-area-inset-bottom))` there, so it never covers the last footer link. It slides away while an input has focus |
| `<main id="main" tabindex="-1" data-sky={sky}>` and every `<section data-sky>` | SiteObserver writes `html[data-sky]` from the band under the header |
| Footer: `<ModeTeksToggle label="Mode teks" />` (the ONE `#mode-teks` checkbox per page) | SiteObserver toggles `html.mode-teks`, writes or removes `lk-mode-teks`, and re-syncs `checked` on every page |
| WhatsApp links: `data-cursor="Chat WhatsApp" data-cursor-tone="wa"`; other labelled links: `data-cursor="{localised label}"`; `data-cursor="hide"` for zones | The cursor disc shows that label. Tone `wa` = `#25D366` disc |

**Chrome holds still across page cuts.** React names the top-level DOM nodes under the page's `<ViewTransition>` itself. That inline name overrides the CSS `view-transition-name`, so PageShell must wrap each persistent chrome part in its own named boundary:
```tsx
import { ViewTransition } from 'react'          // exported by Next 16.2.6's React; types: src/types/react-canary.d.ts
<ViewTransition name="site-header"><header className="site-header">…</header></ViewTransition>
<ViewTransition name="wa-pill"><span className="wa-pill" data-magnetic>…</span></ViewTransition>
<ViewTransition name="bottom-bar"><nav className="bottom-bar" aria-label="Aksi cepat">…</nav></ViewTransition>
```
motion.css sets `animation: none` on those groups. Until PageShell exists this is unverified: the harness only proved that a `<Link>` navigation calls `document.startViewTransition` once.

## 10.3 Section usage (Home, Service, Hubs)

- **Home hero:** render `FilmHero` only when `media('buka')` has both posters. Pass `film` only when `mediaFile('buka','film')` exists:
  `<FilmHero poster={{ desktop: mediaFile('buka','poster-21x9')!, mobile: mediaFile('buka','poster-4x3')! }} film={mediaFile('buka','film')?.src} alt={media('buka')!.alt[l]} caption={media('buka')!.caption![l]} labels={l==='id' ? {pause:'Jeda film',play:'Lanjutkan film'} : {pause:'Pause film',play:'Play film'}} />`.
  The pause button ships `hidden` and is revealed only by the desktop film code. Phones get the 4:3 poster with a one-shot push-in, and never a video src.
- **Home Overture:** only when `media('atap')?.frames` exists:
  `<ScrollSequence frames={atap.frames} keyframes={[1,9,17,25].map((f,i)=>({ desktop: `${atap.frames.dir}/f${String(f).padStart(4,'0')}.webp`, mobile: atap.files['key-'+(i+1)]?.src }))} alt={atap.alt[l]} stage={<Phone locale={l} panels />}>` with children = H2 (`SplitHeading`) + `<ol data-runway>` of 4 `<li data-step-item>`. Each step is `min(100svh, 900px)` tall from 1024 px, so the runway is `4 × min(100svh, 900px)`. The phone band is `min(40svh, 360px)`. Otherwise use the §4.4 fallback: `<section data-steps>` + the same `<ol>` + `Phone panels`, with no ScrollSequence.
- **Proof Loupe:** `<ProofLoupe id="ai-answer" toggleLabel="Tampilkan anotasi" annotations={…}><MockFrame>…</MockFrame></ProofLoupe>`. The root is a `div`. The MockFrame child carries the figure, `data-nosnippet` and the label.
- **Ticker (CrawlerLog):** `<input type="checkbox" id="jeda-log" class="lk-ticker-toggle"><label for="jeda-log">Jeda log</label><div class="lk-ticker" tabindex="0"><ol class="lk-ticker__track">6 lines + the same 6 aria-hidden</ol></div>`. The control shows only where the track moves (desktop, no reduced motion, no Mode teks). Hover and focus-within pause it too.
- **Lamp:** `<i class="lk-lamp" aria-hidden>` only as a direct child of a `[data-lamp]` media frame that holds no text. `FilmHero` already has one. Also on `Figure lamp` on the AI, Ads and home Bab III/IV photos.
- **Services table:** `ServicesTable` wraps `HoverRevealTable`. `still` = `getImageProps({ src, width: 384, quality: 60 }).props.src` and `thumb` = `mediaFile(k,'thumb')?.src`. Omit both when the media is missing.
- **Reveals:** `data-reveal="lift|fade|split|words|wipe|inst"` (`fade` is for decoration only). `SplitHeading` for H2s, and never on the H1.

## 10.4 Checks (run after mounting)

```
pnpm check:seq                                      # 10 node:test cases: 25 frames, stops 0/8/16/24, blend alpha, gates
pnpm exec eslint src/motion 'src/app/(frontend)/(public)/template.tsx' 'src/app/(frontend)/en/template.tsx'
node scripts/qa/motion-gate.cjs / /layanan/jasa-seo-profesional /layanan/local-seo      # G11 (add --phone-only to skip desktop)
```
The motion gate fails on the live pages until W3 replaces the legacy `src/components/public/**` pages, which still import framer-motion. On a harness page with every motion module mounted (the evidence is in `build-shots/motion/`), it passes. On the phone, 0 of 5 markers appear in 22 scripts. On the desktop, the initial scripts are clean, the rich chunk and Lenis arrive after `load`, `html.js`, `html.rich` and `html.lenis` are set, and the canvas draws.
