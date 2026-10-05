# 2 · Components (A): one tree, rules, PageShell, contracts

Part of `docs/redesign/BUILD.md`. The full inventory with props and pages is §2.5 (parts 02b and 02c).

## 2.1 One tree, one name per thing

```
src/
  styles/          tokens.css · tailwind.tokens.ts · fonts.ts (Core) · prose.css (Blog)
  motion/          SiteObserver · RichGate · gates · primitives · ScrollSequence · sequence-core · sequence-player
                   HoverRevealTable · ProofLoupe · motion.css · rich/{index,cursor,follow,hover-still,loupe}   (Motion)
  components/
    ui/Logo.tsx    NEVER edited. The other ui/* files are legacy (deleted in W4).
    ds/            primitives (Chrome pkg)
    ds/chrome/     PageShell + header, menus, WhatsApp pill, bottom bar, closing band, footer (Chrome pkg)
    instruments/   live-HTML mocks + MockFrame + MeasureBlock (Instruments pkg)
    sections/<page>/   home · service · hub · about · portfolio · case · blog · contact · legal · notfound
  content/         copy and data only (no JSX): services/<key>.ts, home.ts, hub.ts, about.ts, portfolio.ts,
                   blog.ts, contact.ts, legal/{privacy,terms}.ts, notfound.ts, instruments.ts, og.json, media.json (generated)
  lib/             services.ts (registry) · meta.ts · assets.ts · web-vitals.tsx (Core) · utils.ts · cta.ts (kept) · seo.ts (legacy, deleted W4)
  types/react-canary.d.ts (Motion)
```

Fixed names. These replace every alternative name found in the blueprint:

| Use | Never |
|---|---|
| `SiteObserver` | RevealObserver |
| `RichGate` | MotionRoot, RichLayer |
| `PageShell` | PageFrame, a chrome-holding layout |
| `Figure` (ds) | Media, a raw `<img>`/`next/image` in sections |
| `ServicesTable` (ds) | a second services or prices table |
| `src/components/{ds,instruments,sections}` | `src/components/v2/*`, `templates/*`, `site/*` |

Import direction, with no cycles: `lib` ← `content` ← `motion` ← `ds` ← `instruments` ← `sections` ← `app`. `content` imports only types and registry helpers from `lib`. `motion` never imports `ds`. `ds` never imports `instruments` or `sections`. An agent may add private sub-components **inside its own folder**. A new shared component needs the owner of that folder to add it (§5.12).

## 2.2 Component rules (all packages)

1. **Server by default.** `'use client'` only on the leaves marked *client* in §2.5. A client leaf receives ids, numbers and short labels, never paragraphs (inline RSC payload ≤60 KB per page).
2. **No framer-motion React API anywhere** (`motion.*`, `AnimatePresence`, `useScroll`, `LazyMotion`). `framer-motion` is imported only by `src/motion/rich/**` and `src/motion/sequence-player.ts`; `lenis` only by `src/motion/rich/index.ts`. `next/dynamic` is not used for motion. Motion adds an ESLint `no-restricted-imports` block for `src/components/{ds,instruments,sections}/**` and `src/app/**`.
3. **Nothing hidden at rest.** No text at `opacity:0`, no inline `opacity:0`, no `hidden` or `display:none` on content. Reveals only use the `data-reveal` contract (DESIGN §10.8) and animate transform or clip-path. FAQ answers stay mounted in `<details>`. Prices, tiers and tab or step contents are all in the SSR HTML.
4. **Roles only** (DESIGN §3.2): no hex or `rgba()` in TSX, and no `text-coral`, `bg-white`, `rounded-lg`, `shadow-*` or `bg-gradient*`.
5. **Every section is a `<Section>`**, which emits `data-hour`/`data-ground` and `data-sky`. Hours are written `HHMM` in markup (`data-hour="0830"`); the registry stores `HH.MM`, and `Section`/`Dateline` accept either and strip the dot before calling `hourInfo()`. A card that needs stage-coloured text carries both `data-stage` and `data-ground`.
6. **Exactly one H1 per page**, and its textContent equals the registry string (or the CMS title). Numerals, clocks and decorations sit outside headings. H2s use `SplitHeading` (motion) or plain `<h2 className="t-h2">`.
7. **Links:** `next/link` for internal hrefs; anchor text is descriptive, and service anchors use the registry `name`. "Selengkapnya" and "Learn more" are banned. Links to the AI page always go through `svcHref('ai', l)`.
8. **CTAs are `<a>`** with `data-cta` (whatsapp|quote|profiler|form), `data-placement` (header|pill|bar|hero|table|tier|builder|faq|closing|footer|menu|profiler|case|post|channel) and `data-service` (registry key or `none`). WhatsApp links come only from `WaButton`/`waLink()`; "Minta Penawaran" always points to `{contact path}?layanan={key}#formulir`.
9. **Media** only through `Figure`, `FilmHero`, `ScrollSequence`, or a `mediaFile()` URL (ServicesTable thumbs and hover stills, `ig` tiles inside instruments). Each renders nothing (no `<img>`, no `<video>`) when the lookup returns null (§4.4). No code-drawn stand-in photos.
10. **Mocks** only inside `MockFrame` (§2.4). Mock buttons are `<span>`. No real brands, dates, "Live" badges or third-party chrome.
11. **Locale:** every component that shows copy takes `locale: Locale` and picks from `{ id, en }` itself, or receives already-localised strings from a server parent.

## 2.3 PageShell (chrome per page, never in a layout)

```tsx
// src/app/(frontend)/(public)/layanan/local-seo/page.tsx → ServicePage renders:
<PageShell locale="id" alt={{ id: '/layanan/local-seo', en: '/en/services/local-seo' }}
           wa={svc('localseo').wa.id} sky="light" svc="localseo">
  …sections…
</PageShell>
```

Props (`src/components/ds/chrome/PageShell.tsx`, server):
- `locale: Locale`.
- `alt: { id: string | null; en: string | null }`: this page's two URLs. LanguageLink targets the other locale, or that locale's home when it is null (e.g. an ID-only post). Code-owned pages pass the registry `path` object (`svc(k).path`, `page(k).path`); CMS pages pass their `slug`/`slugEn` URLs (null when that locale has no version).
- `wa: string`: the WhatsApp prefill, already localised (registry `wa`, or a CMS pattern from §3.6).
- `sky: 'light' | 'dark'`: the ground of the page's first section. It is written as `<main data-sky>`, so the header is right before hydration (`:root:not([data-sky]):has(main[data-sky=dark])`). Dark on AI, Paid Ads and Contact.
- `svc?: SvcKey`: sets `?layanan=` on every Penawaran link and `data-service` on chrome CTAs.
- `bar?: 'full' | 'wa'`: the bottom bar; `'wa'` (WhatsApp only) on /contact.
- `sheet?: ReactNode`: content that rides on the house-lights sheet above the footer (home: process + FAQ).

DOM order, which is fixed (Logo gradient ids are fixed strings, so no Logo may sit in a hidden container before the visible one):
```
<header class="site-header">  LogoFull theme="light" className="logo-auto" · nav (Layanan popover trigger + /layanan fallback link, Portofolio, Blog, Tentang)
                               · LanguageLink · Penawaran (btn-ink) · MenuButton (phones)
  <div id="mega" popover="auto" class="lk-mega">…</div>            (MegaMenu, always in SSR DOM)
</header>
<dialog id="menu" class="lk-menu" aria-label="Menu">…</dialog>      (MobileMenu: after the header, no Logo inside)
<main id="main" tabindex="-1" data-sky={sky}>{children}</main>
<div class="house-lights">
  <section class="hl-night" data-hour="2130" data-sky="dark" aria-labelledby="closing-h">ClosingBand</section>
  <div class="hl-sheet" data-ground="kertas" data-sky="light">{sheet}<footer class="site-footer">SiteFooter</footer></div>
</div>
<span class="wa-pill" data-magnetic>WaButton placement="pill"</span>   (≥1024px, never hides)
<nav class="bottom-bar" aria-label="Aksi cepat">WhatsApp 60% · Penawaran 40%</nav>   (<1024px)
```
The closing band and footer sit outside `<main>`. Both are landmarks (a labelled `section` region and `contentinfo`), so the axe `region` rule still passes. The first child of `<main>` gets the header offset from tokens.css, so pages do not add `pt-*`.

## 2.4 Contracts every package follows

- **Cursor, magnetic, lamp, loupe, drag, hover still:** DESIGN §10.7 (`data-cursor` = localised label; `data-cursor-tone="wa"` for WhatsApp; `data-cursor="hide"`). `WaButton` always emits `data-cursor="Chat WhatsApp" data-cursor-tone="wa"` (same label in EN).
- **T1 data attributes:** DESIGN §10.8 (`data-reveal`, `data-steps`/`data-step-item`/`data-step-panel`, `data-sky`, `html[data-nav]`, `#mode-teks`, `data-cta`).
- **Lamp:** `<i class="lk-lamp" aria-hidden>` only as a direct child of a `[data-lamp]` media frame that holds no text: FilmHero's frame, and `Figure lamp` on the AI, Paid Ads and home Bab III/IV photos. Never on a section or text row.
- **Mock markup** (Google honours `data-nosnippet` only on div, span and section):
```html
<figure class="mock">
  <div data-nosnippet inert> …instrument… </div>
  <figcaption class="mock-label">Ilustrasi · data contoh</figcaption>   <!-- EN: Illustration · sample data -->
</figure>
```
- **Photo markup:** `<figure><div class="frame" [data-lamp]>next/image … [<i class="lk-lamp">]</div><figcaption class="t-caption">{caption from media.json}</figcaption></figure>`. The caption sits under the image, never on it.
- **JSON-LD:** one `<script type="application/ld+json">` per page via `JsonLd` with a single `@graph`. Offer nodes only on the 6 priced service pages (none on home, hub, Social, Creative or AI). Every string of 20+ characters is visible text, except URL-valued strings and the keys `@id @type @context url logo image sameAs item priceCurrency unitCode` and any key containing `Date` (G9). `knowsAbout` = the visible service names. No `audienceType`, `priceRange`, `alternateName`, `AggregateRating` or `VideoObject`.
