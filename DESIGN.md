# Logink design system v2 · "Sehari Semalam"

**Status:** binding for the public site from 27 Sep 2026 (branch `redesign/sehari-semalam`). Replaces "Warm Canvas" (July 2026), archived at `docs/redesign/DESIGN-warm-canvas-v1.md`. Build instructions, file ownership, the component inventory, the asset table, test gates and the budget table live in `docs/redesign/BUILD.md`. Source direction: `/Users/mm/logink/redesign-2026/directions/final.md`, as amended by `blueprint/CRITIC.md`. Where this file and final.md disagree, this file wins.

**Never changes:** `src/components/ui/Logo.tsx` (never edited), the Payload admin at `/admin` (stock Payload UI, own root layout, never imports frontend CSS), and every public URL (same path, same ID/EN pair).

---

## 1 · Thesis

- "360°" is one turn of the sun. The homepage tells one Jakarta day in one place: a coral-awning kedai on a ruko street in Tebet and the rooftop above it.
- The logo ribbon's four stops are the day's four lights, the four hours and the four stages of the customer loop: **Ditemukan 07.00 magenta · Dipercaya 12.40 crimson · Dikutip AI 18.05 coral · Dihubungi 21.30 jingga**, ending on WhatsApp green.
- By day the site is newsprint paper (Putih, Kertas). At dusk it turns plum (Senja), at night indigo (Malam), then paper again: the loop repeats.
- The voice is the Indonesian *koran pagi*: condensed-caps headlines and datelines (`JAKARTA, 07.00 WIB — PAGI · DITEMUKAN`) that double as answer-first ledes.
- Everything a reader or crawler needs is server HTML on flat surfaces. Film, canvas, cursor and parallax are desktop layers with a CSS or poster version on phones.

## 2 · Files and loading contract

| File | Role |
|---|---|
| `src/styles/tokens.css` | The design stylesheet and Tailwind entry: primitives, fallback faces, hour/stage/ground rules, base, component classes, user modes. The only file that may contain raw colour values besides `motion.css`. |
| `src/motion/motion.css` | Motion layer. Consumes tokens, defines none. |
| `src/styles/prose.css` | CMS article body styles (blog posts, case-study rich text). Imported only by the article components. |
| `src/styles/tailwind.tokens.ts` | Tailwind theme + JS mirrors (`EASE`, `DUR`, `STAGGER`, `SPRING`, `MAGNETIC`, `LENIS`, `MEDIA`, `hourInfo()`, `skyOf()`, `stageLabel()`). |
| `tailwind.config.ts` | Tailwind 3.4 config: content globs + theme from `tailwind.tokens.ts`, `corePlugins.container: false`. |
| `src/styles/fonts.ts` | `next/font/google` calls for Archivo and Martian Mono. |
| `src/app/(frontend)/(public)/layout.tsx` · `src/app/(frontend)/en/layout.tsx` | The two frontend root layouts (`<html lang="id">`, `<html lang="en">`). Only they import `tokens.css` and `motion.css`; `src/app/global-not-found.tsx` imports `tokens.css` only. |
| `scripts/check-tokens.mjs` | CI: AA matrix, allow-list lint, hour parity, computed colours, fallback widths. |

The old `src/app/globals.css` and the Warm Canvas Tailwind config are deleted. There is no `html { scroll-behavior: smooth }` anywhere (it fights Lenis).

## 3 · Colour

### 3.1 Primitives (only `tokens.css` references `--c-*`)

| Token | Hex | Role |
|---|---|---|
| `--c-putih` Putih | `#FFFFFF` | First light: home hero, Bab II, forms, header by day, cards |
| `--c-kertas` Kertas | `#F5F5F1` | Newsprint reading ground: tables, Bab I, FAQ, blog, legal, footer, `:root` |
| `--c-semburat` Semburat | `#FFD6C9` | Stabilo highlight and house-lights spill only. Never text, never a section fill |
| `--c-aspal` Aspal | `#14121B` | Ink on paper, ink button fill, focus ring on paper |
| `--c-aspal-70` Aspal 70 | `#4A4757` | Secondary ink on paper |
| `--c-garis` Garis UI | `#8A8794` | Meaningful boundaries on paper (inputs, table heads), ≥3:1 |
| `--c-magenta` | `#A8138F` | Ribbon 1 · 07.00 · Ditemukan |
| `--c-crimson` | `#D81C5C` | Ribbon 2 · 12.40 · Dipercaya |
| `--c-coral` | `#EE3D5E` | Ribbon 3 · 18.05 · Dikutip AI |
| `--c-jingga` | `#F88438` | Ribbon 4 · 21.30 · Dihubungi (sodium light) |
| `--c-senja` Senja | `#2A0D2E` | Dusk plum: Bab III, AI page hero |
| `--c-senja-dalam` | `#3A1340` | Dusk panels, instruments |
| `--c-malam` Malam | `#0C1330` | Night indigo: Bab IV, Paid Ads and Contact heroes, closing band, header by night |
| `--c-malam-dalam` | `#151E47` | Night cards, chat window |
| `--c-cahaya` Cahaya | `#F4F1F7` | Ink on dark, partner button fill on dark |
| `--c-cahaya-70` | `#B9B3C9` | Secondary ink on dark |
| `--c-garis-gelap` | `#74738C` | Meaningful boundaries on dark (3.40–3.97:1) |
| `--c-wa` WhatsApp | `#25D366` | Every WhatsApp control; the only saturated button fill |
| `--c-wa-label` | `#0A2E17` | WhatsApp label + glyph (7.48:1) and the 1.5px inset edge on paper |
| `--c-hair-light` / `--c-hair-dark` | `rgba(20,18,27,.12)` / `rgba(244,241,247,.14)` | Decorative hairlines |
| Wordmark ink | `#A855F7` | Fixed inside Logo.tsx; harmony anchor (hue 304 sits between Malam 270 and Senja 323). Not a UI token |

### 3.2 Roles (what components use)

`--surface`, `--surface-alt`, `--ink`, `--ink-2`, `--line`, `--hair`, `--link`, `--focus`, `--btn`, `--btn-ink`, `--wa-edge`, `--error`, `--sky`, `--key`, `--key-on`, `--key-ink`, `--key-num`, `--cursor-dot`, `--cursor-disc`, `--lamp`, `--logo-log`. Derived tokens are declared inside every hour/stage/ground rule (custom properties resolve where they are declared), never once on `:root`.

Tailwind exposes **only roles**: `text-ink`, `text-ink-2`, `text-key-ink`, `text-key-num`, `text-link`, `text-error`, `text-btn-ink`, `text-on-key`, `text-wa-label`; `bg-surface`, `bg-surface-alt`, `bg-btn`, `bg-wa`, `bg-key`, `bg-hair`, `bg-line`. `text-coral`, `bg-white`, `text-gray-500`, `rounded-lg` and `shadow-md` do not exist. No hex or `rgba()` in components.

### 3.3 The hour / stage / ground system

| Attribute | Put it on | Sets |
|---|---|---|
| `data-hour="HHMM"` | `<main>` or any `<section>` | key light (stage) **and** default ground; the dateline hour |
| `data-ground="putih\|kertas\|senja\|senja-dalam\|malam\|malam-dalam"` | section, inset, panel, card | surface and every ink role; overrides the hour's default |
| `data-stage="ditemukan\|dipercaya\|dikutip\|dihubungi"` | chip, row, card, dial segment | key light only; never a surface |
| `data-sky="light\|dark"` | every `<Section>` (derived from its ground), `<main>` | read by SiteObserver → `html[data-sky]` → header, bottom bar, cursor disc |

| Hour prefix | Stage | `--key` | Default ground | Cursor dot | Lamp |
|---|---|---|---|---|---|
| 04–09 | Ditemukan | Magenta | Kertas | magenta | off |
| 10–16 | Dipercaya | Crimson | Putih | crimson | off |
| 17–19 | Dikutip AI | Coral | Senja | coral | coral |
| 20–23, 00–03 | Dihubungi | Jingga | Malam | jingga | jingga |

Dateline words come only from `hourInfo()`: 04 Subuh, 05 Fajar, 06–10 Pagi, 11–14 Siang, **15–16 Sore**, 17–19 Senja, 20–03 Malam (EN: Dawn, First light, Morning, Midday, Afternoon, Dusk, Night).

Hours in use: 0445 Subuh (house-lights sheet, 404) · 0530 home hero, about · 0600 facts, table, hub, blog, legal · 0700 Bab I, SEO, portfolio · 0830 Local SEO · 1240 Bab II, Social · 1510 Creative · 1630 Website · 1805 Bab III, AI page · 2030 Paid Ads · 2130 Bab IV, closing band, contact.

A ground re-resolves key text for its own element. A card that needs stage-coloured **text** carries both `data-stage` and `data-ground`; `data-stage` alone recolours graphics only.

### 3.4 Token × surface AA matrix (WCAG 2.x, computed by `check-tokens.mjs`)

**Bold** = allowed as small text; *italic* = large text / UI only; everything else banned for text.

| token \ surface | Putih | Kertas | Semburat | Senja | Senja Dalam | Malam | Malam Dalam |
|---|---|---|---|---|---|---|---|
| Aspal | **18.55** | **16.97** | **13.88** | 1.06 | 1.19 | 1.02 | 1.16 |
| Aspal 70 | **9.01** | **8.25** | **6.74** | 1.95 | 1.73 | 2.02 | 1.78 |
| Magenta | **6.66** | **6.09** | **4.98** | 2.64 | 2.34 | 2.74 | 2.41 |
| Crimson | **4.95** | *4.53* | 3.71 | 3.55 | 3.15 | 3.68 | 3.24 |
| Coral | *3.84* | *3.52* | 2.88 | **4.57** | *4.06* | 4.75 (unused) | 4.18 |
| Jingga | 2.52 | 2.30 | 1.88 | **6.98** | **6.20** | **7.25** | **6.38** |
| Cahaya | 1.12 | 1.02 | 1.19 | **15.70** | **13.94** | **16.30** | **14.35** |
| Cahaya 70 | 2.03 | 1.86 | 1.52 | **8.66** | **7.69** | **8.99** | **7.91** |
| Garis (UI) | 3.52 | 3.22 | – | – | – | – | – |
| Garis gelap | – | – | – | 3.83 | 3.40 | 3.97 | 3.50 |
| WhatsApp fill | 1.98 (needs inset edge) | 1.81 (needs inset edge) | – | 8.86 | 7.86 | 9.20 | 8.09 |

**Fills:** Aspal + white label 18.55 (ink button) · Cahaya + Malam label 16.30 (partner button on dark) · WhatsApp + WA Label 7.48 · Magenta + white 6.66 · Crimson + white 4.95 ('Paling populer' badge only) · Coral + Aspal 4.83 · Jingga + Aspal 7.37.

**Banned pairs (lint + check):** coral or jingga text on paper; magenta or crimson text on any dark ground; white on WhatsApp, coral or jingga; a green fill on paper without the inset edge; a jingga link inside Stabilo. House rules on top of WCAG: crimson small text only on Putih (4.53 on Kertas is large-only); coral small text only on the Senja base; the night accent is jingga only (no coral on Malam).

### 3.5 Structural rule

Every text node sits on one of six flat surfaces (Putih, Kertas, Senja, Senja Dalam, Malam, Malam Dalam) or inside a Semburat Stabilo highlight. Nothing sits on photos, film, canvas, parallax layers, the lamp or the horizon band. The lamp may only light media frames that contain no text (§7).

### 3.6 WhatsApp and buttons

- The only button fills are Aspal (on light), Cahaya (on dark) and `#25D366`. Crimson is a badge and key light only and never sits next to WhatsApp.
- WhatsApp is always an `<a>` to wa.me built by `waLink()`, label and glyph `#0A2E17`, 1.5px `#0A2E17` inset edge on paper, per-page prefill. Green appears on WhatsApp controls only.
- WhatsApp is always reachable: fixed pill on desktop (never hides), 56px bottom bar on phones.
- Official number everywhere: +62 813-9453-933, plus the anti-scam line "Nomor WhatsApp resmi Logink hanya +62 813-9453-933."

### 3.7 Accessibility modes

- `prefers-contrast: more`: `--ink-2` → `--ink`, `--hair` → `--line`.
- `forced-colors`: Stabilo becomes an underline; horizon, spill, dial and `[data-decor]` hide; buttons keep a 1.5px transparent border.
- `prefers-reduced-motion: reduce`: every animation and transition is clamped; scroll-driven effects are static; the rich layer never loads.

## 4 · Type

### 4.1 Families (two, one preloaded file)

- **Archivo** variable (wdth 62–125, wght 100–900), latin woff2 **90,096 B**, `next/font/google` with `axes: ['wdth']`, `preload: true`, `display: 'swap'`, `adjustFontFallback: false`, `variable: '--font-archivo'`.
- **Martian Mono** 400, **10,376 B**, `preload: false`, `variable: '--font-martian'`. Instruments, captions and Mode teks only.
- Total 100,472 B. No italic file, no serif, no second text family. Banned: Bricolage, Outfit, Space Grotesk, Manrope, Inter, Geist, any serif.
- Widths come from `font-stretch: 62%|74%|88%|100%|125%` (mapped to wdth), never `font-variation-settings`.

### 4.2 Cuts (one class = one cut)

| Class | Stack | Stretch / weight | Use |
|---|---|---|---|
| `.t-title` (+ `.ln`) | ff-title | 62 / 850, caps, lh .86, word-spacing .14em | Home H1 lines and the 4 home chapter titles only |
| `.t-wide` | ff-wide | 125 / 300, caps, 0.64× title | Kata Lebar: at most one phrase per headline ('Dikutip AI.' on home) |
| `.t-kicker` | ff-exp | 125 / 620, caps, +.06em | Keyword part of the home H1 |
| `.t-clock` | ff-title | 62 / 300, tnum, `--key-num` | Chapter numerals, home only, aria-hidden, outside headings |
| `.t-h1svc` (+ `.tail`) | ff-mid | 74 / 780, sentence case, max 18ch; tail 100 / 500 ≥18px | Every non-home H1: display line = text up to and including the first ': ', tail = the rest, same `<h1>` |
| `.t-h2` | ff-mid | 74 / 760 | Section H2 (the only masked split reveals) |
| `.t-h3` | ff-h3 | 88 / 650 | H3, FAQ summaries, service rows |
| `.t-lead` `.t-body` `.t-ui` `.t-small` | ff-text | 100 / 400–650 | Copy and UI |
| `.t-stat` | ff-title | 62 / 300, tnum | Stats (final value in HTML) |
| `.t-dateline` `.chip` `.mock-label` | ff-exp | 125 / 600, caps, +.08–.12em | Datelines, chips, labels |
| `.t-mono` `.t-caption` | ff-mono | 400 | Instruments, photo captions |

### 4.3 Scale

| Token | Value | px |
|---|---|---|
| `--fs-title` | `clamp(3.25rem, 1rem + 7.9vw, 8.125rem)`; `:lang(id)` × .94 | 52 → 130 (max/min 2.5 for WCAG 1.4.4; final.md's 140 was a defect) |
| `--fs-wide` | `calc(var(--fs-title) * .64)` | |
| `--fs-kicker` | `clamp(1.25rem, 1rem + 1vw, 1.75rem)` | 20 → 28 |
| `--fs-clock` | `clamp(6rem, 3rem + 12vw, 14rem)` | 96 → 224 |
| `--fs-h1-svc` | `clamp(2.5rem, 1.4rem + 4.4vw, 5.5rem)` | 40 → 86 |
| `--fs-h2` | `clamp(2rem, 1.2rem + 3.2vw, 4.25rem)` | 32 → 68 |
| `--fs-h3` | `clamp(1.25rem, 1.05rem + .8vw, 1.75rem)` | 20 → 28 |
| `--fs-lead` | `clamp(1.125rem, 1rem + .5vw, 1.375rem)` | 18 → 22 |
| `--fs-body` | `clamp(1rem, .96rem + .2vw, 1.125rem)`; ≥17px on dark grounds | 16 → 18 |
| `--fs-stat` | `clamp(3rem, 2rem + 4vw, 6rem)` | 48 → 96 |
| `--fs-dateline` / `--fs-caption` / `--fs-mono` / `--fs-small` / `--fs-ui` | .75 / .75 / .8125 / .875 / 1rem | |

### 4.4 Fallback faces and CLS guard

- 13 measured `@font-face` fallbacks in `tokens.css` (`LK Text`, `LK Title N/A`, `LK Mid N/A`, `LK H3 A`, `LK Exp A`, `LK Wide A`, `LK Mono C/A`), each with its own `size-adjust` (a single `local(A), local(B)` chain cannot be tuned). Every cut is within ±2.2% of Archivo's width.
- Display lines are `span.ln` (`display:block; white-space:nowrap`) with a fixed unitless line-height inside `overflow-x: clip`: a font swap can change width, never line count.
- Escape hatch if CLS > 0.05 on throttled 4G: a second `Archivo()` call with identical flags and `display: 'optional'`, pointed at by `--ff-title/-mid/-wide` (one woff2 request; verify in Network).

### 4.5 Authoring rules

- `h1.textContent` must equal the approved string exactly. Put literal `' '` text nodes between line spans. Numerals and decorations sit outside headings.
- Split headings keep `aria-label` on the heading and `aria-hidden` word spans.
- The latin files lack → (U+2192) and ≤ (U+2264): arrows are the `Icon` SVG; copy avoids ≤. ↑ ↓ — ° · × are present.
- **Never define `--font-sans`.** Logo.tsx draws its wordmark with `var(--font-sans, -apple-system, system-ui)`; defining it changes the logo. No `fontFamily.sans` key exists in the theme.
- No gradient text, no underlight.

## 5 · Layout

- 12-column grid, max 1360px (`.wrap`, `.grid-12`); gutters 16px (phones) / 24px (≥640) / 40–48px (≥1024). Left-set and asymmetric: text in columns 1–7, media in 8–12, alternating. Nothing centred except clock numerals.
- **Section anatomy:** dateline row (hairline, then `JAKARTA, 12.40 WIB — SIANG · DIPERCAYA` left, stage or page label right). Home chapter openers: dateline, clock numeral in the key light, caps chapter title, 40–60-word answer-first lead, half-bleed hour-lit photo with a horizon wipe.
- **Home rhythm:** Putih → Kertas → Putih → Kertas → Putih → ribbon horizon → Senja → Malam → Kertas (house lights). Dark share: home ≈25% (cap 30%); standard pages closing band only (≤15%); SEO AI and Paid Ads ≤35%; Contact ≤40%. A dark section holds no paragraph over 60 words; long answers go in a Kertas inset.
- **Heights:** heroes `min-height: min(100svh, 1000px)`; sticky stages `min(100svh, 900px)`; runways `calc(N × min(100svh, 900px))`; never `N × 100vh`.
- **Header offset:** the header is fixed; the first child of `<main>` gets `padding-top: calc(var(--nav-h) + var(--dial-h) + var(--section-y-sm))` from tokens.css. Don't add `pt-*` to a page's first section.
- **Shapes:** radius 0 on sections, cards and tables; 4px on buttons, inputs and media frames; pills on chips only. No shadows (depth comes from surface change), no rounded-lg cards, icon tiles, orbs, dot grids, glass or gradient words.
- **Hairlines:** `--hair` decorative; `--line` for meaningful boundaries.
- **z-index:** under −1 · lamp 1 · content 2 · loupe 3 · sticky 10 · bar 40 · header 40 · wa-pill 41 · dial 42 · cursor 50 · toast 55 · skip 60. Popover and `<dialog>` use the top layer.
- **Breakpoints:** Tailwind defaults (sm 640, md 768, lg 1024, xl 1280, 2xl 1536) + `fine` = `(hover:hover) and (pointer:fine)` + `desk` = fine + `(min-width:1024px)`. Test at 390×844, 412×732, 412×915, 412×12140, 768, 1024, 1440×900.

## 6 · Micro-motifs (cap: three)

1. **Dateline** (`Dateline`, `.dateline`).
2. **Day dial**: the four ribbon stops as hard segments plus a Malam tail. Fixed 3px progress strip on every page (sun tick on `scroll(root)`), hero stage strip, service "Posisi di loop" strip. Never a gradient.
3. **Stabilo** (`<mark class="stabilo">`, paper only) on citable passages: the entity sentence and every "Jawaban singkat".

"Recurring" means two or more sections of one page. A fourth motif requires removing one of these. Permanently cut: sticky chapter labels, column rules, grain, slugs, timecodes, HUD brackets, letterbox bars, corner ticks, scan cursor, tilt-glare cards, time-scrub thumbnails, velocity marquee, announcement bar, pulse-glow FAB, count-ups.

## 7 · Gradient and light rules

- The only ribbon graphic is `RibbonHorizon` (`.ribbon-horizon`): once per page, only on `/`, `/en` and the AI page pair, text-free and logo-free, 160–280px (px-capped), 2% static noise. The hub's Dikutip AI band is flat Senja. Every other page shows the ribbon only in the logo.
- Permitted non-ribbon gradients, all text-free: the Stabilo hard-stop band, the house-lights Semburat spill (≤48px), the day-dial hard segments, the lamp's pre-blurred radial and the pre-tinted coral glow at the top of Bab III.
- **Lamp:** only inside `[data-lamp]` frames that contain no text (film frame, hour-lit photo frames). Never under text rows. On paper the lamp is off except over the hero film (Semburat, the rising sun); on Senja/Malam it takes the stage key light.
- **Coral glow:** ends above the first text row of Bab III (its height is capped at the section's top padding).
- Never: gradient text or buttons, mesh, glows behind text, animated `background-color` / gradient / `@property` / `filter` on full-bleed areas. Light changes only crossfade the opacity of pre-tinted layers or move them by transform.

## 8 · Imagery and honesty

- **Direction:** "Satu kota, satu hari." Documentary-editorial 35mm, one place, shot at the hour of its chapter. Exactly one ribbon-coloured object per frame; 40% calm negative space; anonymous or mid-action people only; screens never readable; the Indonesia checklist (left-hand traffic, C/F sockets, ruko and terrazzo, galon dispensers, batik as office wear, named ethnicities, a natural mix of hijab and non-hijab women).
- **Production:** photographic stills, rooftop plates and the hero film come from an image/video model: Canva generate-image stills now (owner-approved), graded and rendered locally into the film and the rooftop frames; Figma Weave (Nano Banana Pro, Veo 3.x, Kling alternate) later at the same file names. Claude Design / live HTML builds the instruments, OG images and case covers. Files are installed by `scripts/install-media.mjs` at the paths in BUILD.md §4. Until a file exists the component renders its documented no-asset fallback. Never a code-drawn fake photo, never a broken `<img>` or `<video>`.
- **Grade:** one Logink LUT, two presets: Day (neutral 5600K whites, shadows toward plum h≈323, greens −20, blues −10) and Night (indigo shadows h≈270, sodium-orange highlights). No grain.
- **Captions** (newspaper caption line under the image, never on it; written by `scripts/install-media.mjs` into `src/content/media.json`, read through `src/lib/assets.ts`): `Foto: ilustrasi AI · {tempat}, {HH.MM} WIB · bukan klien Logink` / `Photo: AI illustration · {place}, {HH.MM} WIB · not a Logink client`. Rendered film (today): `Film: ilustrasi AI, animasi dirender · Jalan ruko, Tebet, Jakarta Selatan, 05.30 WIB · bukan klien Logink`; filmed footage later: `Foto/film: ilustrasi AI · …`. Canvas: `Foto: ilustrasi AI, animasi dirender · Atap ruko Tebet, Jakarta Selatan, 07.00–21.30 WIB · bukan klien Logink`.
- **Mocks** (live-HTML instruments): `<figure><div data-nosnippet inert>…</div><figcaption class="mock-label">Ilustrasi · data contoh</figcaption></figure>`. `data-nosnippet` only ever on `div`, `span` or `section` (Google ignores it elsewhere). Mock buttons are `<span>`, never `<a>`/`<button>`. Fictional entities only (Kedai Contoh, contohkedai.id, Brand A/B/C). No dates, no narrative clock stamps, no "Live" badges, no third-party logos or chrome. Engines are plain text chips (ChatGPT · Gemini · AI Mode · Perplexity).
- **Footer disclosure:** "Ilustrasi dibuat dengan bantuan AI; klien, testimoni, tim dan hasil adalah nyata."
- **Never generated:** clients, testimonials, team, portfolio work, offices presented as Logink's, results, logos. Proof slots with no real data collapse to offer facts or "Cara kami mengukur" with a labelled sample report. Metrics are sentences with period and source. Counters render final values (no count-up).

## 9 · Logo rules

- `LogoFull` only on Putih or Kertas with `theme="light"`, and on Senja or Malam with `theme="dark"`. Never on Senja Dalam / Malam Dalam panels, Semburat, the horizon, a key-colour fill, a photo, film or canvas.
- **Always pass `theme`.** The default `'dark'` paints a white "Log" that vanishes on paper. Lint: `rg -nP '<LogoFull(?![^>]*theme=)' src` must be empty.
- **Header:** exactly one instance, `<LogoFull theme="light" className="logo-auto" />`; `.logo-auto tspan:first-of-type { fill: var(--logo-log) }` swaps the "Log" ink by `html[data-sky]` with no re-render (same pixels as the theme prop). No client logo island, no hidden twin.
- Gradient ids in Logo.tsx are fixed strings: no Logo inside a `display:none` ancestor that precedes a visible one; the mobile `<dialog>` comes after the header and holds no Logo.
- Sizes: header mark 28px tall (24px on phones); footer giant LogoFull at 100% of `.wrap`; clear space ≥0.5× mark height; minimum 24px. No recolour, stroke, rotation or animation. `LogoMark` alone is for favicon/icon only.

## 10 · Motion

### 10.1 Tokens

Eases: out `cubic-bezier(.16,1,.3,1)` (entrances, reveals, H1 rise) · ui `(.25,1,.5,1)` (hover, press) · drawer `(.32,.72,0,1)` (menus, header, details) · in-out `(.83,0,.17,1)` (horizon wipe, house lights) · in `(.5,0,.75,0)` (exits only). Durations: press 90ms · hover 150ms · ui 240ms · page-out 150ms · reveal 700ms · rise 800ms · image 900ms. Stagger: line 90ms, word 45ms, cap 600ms / 6 items. Springs (stiffness/damping/mass): cursor dot 900/55/.25 · disc 320/32/.6 · trail 170/22/.6 · magnetic 220/16/.4 (max 14px, strength .35). Lenis: lerp .1, `autoRaf:false` on motion's frame loop, `anchors:true`, `stopInertiaOnNavigate:true`.

### 10.2 Tiers

| Tier | What | Who gets it |
|---|---|---|
| T0 | CSS only (`motion.css`, inlined): H1 rise, day dial, horizon wipe, noon parallax, coral glow, stacking cards, house lights, ticker, phone poster push-in (one-shot), page cuts | Everyone; static where unsupported or under reduced motion |
| T1 | `SiteObserver` + `RichGate` + `gates` (+ ScrollSequence island on home), ≤3.4 KB gz: reveals, steps, sky, header state, Mode teks, dialog fallback, CTA tracking | Every device with JS |
| T2 | Rich chunk ≤17 KB gz (Lenis, springs, cursor, magnetic, lamp, hover still, loupe, film src attach, drag rows) + canvas player ≤2.2 KB gz | `(hover:hover) and (pointer:fine)`, no reduced motion, no Mode teks, viewport ≤2000px tall; loaded after `load` in an idle slot via plain `import()` |
| T3 | Phase 2 film in a `<dialog>` | Not in this build |

Phones download **0 KB** of motion JS. No framer-motion React components (`motion.*`, `AnimatePresence`, `useScroll`…) anywhere; `framer-motion` is imported only by `src/motion/rich/**` and `src/motion/sequence-player.ts` (springValue/frame). `lenis` only by `src/motion/rich/index.ts`. `next/dynamic` is not used for motion.

### 10.3 Signature moments

- **Front-page rise:** H1 lines rise 0.35em by transform, opacity held at 1, no masks, 90ms per line → LCP = FCP.
- **Split-line H2:** words in masks, lines rise 90ms apart when marked `data-in`. Never on the H1. Text never at opacity 0.
- **Horizon wipe:** `clip-path: inset(100% 0 0 0) → inset(0)` on the photo layer only, on `view()`.
- **Time-lapse canvas "Satu atap, satu hari":** 25 frames 1280×720, the player blends the two nearest frames; phones get 4 keyframes crossfaded by SiteObserver `data-step` in a `min(40svh,360px)` sticky band. No LOOP tier.
- **Instruments come alive once** (`data-reveal="inst"`): answer words 45ms each (cap 600ms), citation chips, share-of-voice bars (scaleX), prompt-row light, map pin ≤6px.
- **House lights:** a Kertas sheet slides over the sticky Malam closing band at the end of every page (un-sticks below 640px viewport height).
- **Page cuts:** React `<ViewTransition>` in each root's `template.tsx`: 150ms out, 240ms in with 12px rise; header, dial, WhatsApp pill and bottom bar hold still. Instant under reduced motion.

### 10.4 Restraint

One scroll signature per viewport; at most two infinite animations on screen (hero film, crawler ticker), one on non-home pages; stagger ≤6 items; every effect names its tier plus its phone and reduced-motion fallback. Only transform, translate, scale, opacity and clip-path animate.

### 10.5 Pause controls (WCAG 2.2.2)

- Hero film: `<button type="button" aria-pressed>` "Jeda film" / "Lanjutkan film" (EN "Pause film" / "Play film") at the end of the film caption line (on Putih, not on the film), 44px target, 2px focus ring. Shipped `hidden` in the SSR HTML and revealed only by the desktop film code when a video is attached; state kept in `sessionStorage` (`lk-film-paused`, try/catch). Never label it "Putar film" (reserved for the phase-2 film).
- Crawler ticker: a CSS-only checkbox "Jeda log" beside it pauses the track (`:checked ~`), plus pause on hover and `:focus-within`. The Mode teks checkbox beside it is the hide mechanism.
- Phone poster push-in runs once (12s) and stops.

### 10.6 Mode teks

"Mode teks · Lihat halaman ini seperti AI membacanya" / "Text mode · See this page the way AI reads it". One `<input type="checkbox" id="mode-teks">` in the footer of every page; Bab III and the AI page render `<label for="mode-teks">`. CSS (`:root:is(.mode-teks, :has(#mode-teks:checked))`) turns every stack into Martian Mono and every ground into Kertas/Aspal, hides images, video, canvas, iframes, decoration, horizon, dial and cursor, prefixes headings with `#`/`##`/`###`, and stops all motion. SiteObserver persists the choice in `localStorage` key **`lk-mode-teks`**; a pre-paint inline script (`TEKS_SCRIPT`) restores `html.mode-teks`; FilmHero, ScrollSequence and RichGate check it, so it doubles as a motion and data-off switch. No URL, no query parameter.

### 10.7 Cursor attribute contract (rich pointers only)

| Markup | Effect |
|---|---|
| `data-cursor="{localised label}"` on `<a>`, `<tr>` or a zone | 96px disc (Aspal on light, Cahaya on dark) showing that label; the native cursor hides inside that element only. Labels: "Buka layanan"/"Open service", "Lihat studi kasus"/"View case study", "Geser"/"Drag" |
| `data-cursor="Chat WhatsApp" data-cursor-tone="wa"` | `#25D366` disc with a `#0A2E17` label (every WhatsApp control; `WaButton` emits it) |
| `data-cursor="hide"` | follower hidden (loupe zones, future iframe facades) |
| `input, textarea, select, iframe, video[controls], [contenteditable]` | follower always hidden |
| `<span data-magnetic><a class="btn">…</a></span>` | the CTA leans ≤14px toward the pointer; `.btn:active` scale .97 is the fallback |
| `<div data-lamp>…<i class="lk-lamp" aria-hidden></i></div>` | light pool follows the pointer; media frames only (no text inside) |
| `data-drag-x` | scroll-snap row that mouse-drags |
| `data-still-table` wrapper + `data-still="{url}"` rows | hover-reveal still on the services table |
| `data-loupe` zone | Proof Loupe lens |

The dot colour is the computed `--cursor-dot` of what is under the pointer (magenta/crimson on paper, coral on Senja, jingga on Malam). Keyboard users get the same label as a `:focus-visible::after` chip on labelled links. Cut: tilt-glare, scan crosshairs, time-scrub thumbnails.

### 10.8 Data-attribute contract (T1, `SiteObserver`)

`html.js` is set by SiteObserver **after** its first scan (never by an inline script), so a blocked chunk hides nothing. `[data-reveal=lift|fade|split|words|wipe|inst]` → `data-in` once (`fade` is decorative only, never text). `[data-steps]` + `[data-step-item]` + `[data-step-panel][data-k]` → `data-step`, `data-on`, `aria-current="step"`. `[data-sky]` → `html[data-sky]` (deepest element under the header band). `html[data-nav]=top|pill|hide`. `#mode-teks` → `html.mode-teks` + storage + `lk:teks` event. `button[commandfor][command]` → dialog fallback where Invoker Commands are missing. `[data-cta][data-placement][data-service]` clicks → `dataLayer.push({event:'cta_click', cta, placement, service, page, locale})`.

## 11 · Components

One tree. Primitives and chrome: `src/components/ds/` (+ `ds/chrome/`). Live-HTML mocks: `src/components/instruments/`. Page sections: `src/components/sections/<page>/`. Motion leaves: `src/motion/`. Copy: `src/content/`. Registry: `src/lib/services.ts`. The full inventory with props, server/client and pages is BUILD.md §2.5.

## 12 · Accessibility and SEO guards

- AA token × surface matrix in CI (§3.4); 2px focus rings (Aspal on light, Jingga on dark) with 2px offset; body links always underlined; clamp ratios ≤2.5; forced-colors and prefers-contrast handled; 48px tap targets; bottom bar never covers content (body padding on phones).
- SSR contract: every H1–H3, lede, answer, price, tier, comparison table, FAQ answer, stat with source, overture step, case metric sentence and the mega menu are in the server HTML. Nothing is at opacity 0 at rest. FAQ answers always mounted in `<details>`. Canvas, film, lamp, dial and horizon are `aria-hidden`.
- Exactly one visible keyword H1 per page, `h1.textContent === approved string` (CI). Chapter numerals sit outside headings.
- Anchors are descriptive service names; "Selengkapnya" and "Learn more" are banned. Every service gets ≥3 SSR inlinks from chrome alone.
- One JSON-LD `@graph` per page; every JSON-LD string of 20+ characters is visible text (excluding URL-valued strings and the keys `@id @type @context url logo image sameAs item priceCurrency unitCode *Date*`). Offer schema only on service pages. No VideoObject, no self-serving AggregateRating.
- Correct SSR `<html lang>` from two root layouts; head hreflang id/en/x-default from the registry pair map; no automatic language redirects.

## 13 · Page recipes and lights

| Page | Hour · ground | Header by default | Notes |
|---|---|---|---|
| Home `/`, `/en` | 0530 Putih hero → chapters | Putih | Order in BUILD.md §3.7 |
| Hub `/layanan` | 0600 Kertas | Putih | Services table + 4 stage bands (flat Senja, no horizon) |
| SEO | 0700 Kertas, magenta | Putih | |
| Local SEO | 0830 Kertas, magenta | Putih | Lightest build: stills + CSS, no film/canvas/iframe |
| Social | 1240 Putih, crimson | Putih | |
| Creative | 1510 Putih, crimson | Putih | Dateline "SORE" |
| Website | 1630 Putih, crimson | Putih | Dateline "SORE" |
| SEO AI (GEO & AEO) | 1805 Senja hero + the page's one horizon | Malam | Body returns to paper |
| Paid Ads | 2030 Malam hero, jingga | Malam | Body returns to paper |
| About | 0530 Putih | Putih | Real people only |
| Portfolio + case | 0700 Kertas, magenta | Putih | Typographic case files |
| Blog, category, post | 0600 Kertas (dateline = real date) | Putih | Reading pages, always light |
| Contact | 2130 Malam hero, form on a Putih inset | Malam | WhatsApp first |
| Privacy, Terms | 0600 Kertas (dateline = last-updated date) | Putih | |
| 404 | 0445 Kertas | Putih | |

Every page ends with the identical Malam closing band ("21.30 — Satu pesan cukup.", WhatsApp + Minta Penawaran + anti-scam line), then house lights into the Kertas footer. The service template (15 blocks) is BUILD.md §3.8.

## 14 · Budgets

The single budget table is BUILD.md §6.2. Summary: fonts 100,472 B with 1 preload; inlined CSS ≤48 KB raw per page; initial JS home ≤200 KB / other pages ≤170 KB transfer; T1 ≤3.4 KB gz; T2 ≤17 KB gz + player ≤2.2 KB gz; lab LCP ≤2.0 s, TBT ≤200 ms, CLS ≤0.05.

## 15 · CI

Commands and thresholds: BUILD.md §6.1.

## 16 · Voice and copy

- Bahasa Indonesia first (formal "Anda"); English mirrors, never machine-literal. Answer first: the first sentence answers the question; ledes 40–60 words; FAQ answers 40–80 words.
- Datelines are the dateline style: `JAKARTA, 07.00 WIB — PAGI · DITEMUKAN`. The dateline "—" is the only em dash on the site; body copy uses no em dashes (owner's July 2026 copy review).
- Stage names and service names lead; clock times support. The clock appears as numerals only on the four home chapter openers.
- Prices are exact registry text. Every "Mulai Rp 1 Juta" says "ditagih tahunan"; every Ads price says "management fee, di luar budget iklan". Social and Creative show "Paket modular, proposal kustom dalam 24 jam", never a price. No "Ranking #1", no "ROAS 2–4× Terbukti", no "tanpa lock-in" until the owner reconciles it, no guaranteed AI citation ("Kami tidak menjamin kutipan").
- AEO is always glossed once as "Answer Engine Optimization, bukan Authorized Economic Operator".

## 17 · Decisions log

| Date | Decision |
|---|---|
| 2026-09-27 | "Sehari Semalam" replaces Warm Canvas (2026-07). Specimen `/Users/mm/logink/redesign-2026/final/spec-1440.jpg`, `spec-390.jpg`. |
| 2026-09-27 | Full replacement on one branch: two frontend root layouts, no legacy/v2 dual rollout. |
| 2026-09-27 | Owner defaults in force (BUILD.md §7): AI page pair live; UI motion as live HTML (not .webm); LOOP canvas tier cut; WebP masters served as AVIF/WebP by next/image; Mode teks yes (Bab III + footer); blog and all long reading light. |
| 2026-09-27 | Photographic stills and film from an image model, not Claude Design (it cannot produce photoreal plates or video): Canva stills now (owner-approved), rendered locally into the film "Buka" and 25 rooftop frames; Figma Weave/Veo later at the same names. Claude Design / live HTML for instruments, OG images and case covers. Fallbacks: imageless heroes (instrument card only), Overture on flat Kertas with the live phone, hero with no poster slot. |
| 2026-09-27 | Direction defects fixed: title max 130px (not 140); per-cut fallback faces; mock labels in `--ink-2` (coral 12px on Senja Dalam is 4.06); header logo by CSS override; 15–16h datelines read "Sore"; canvas 25 frames with neighbour blend (120 frames measured ≈7.9 MB); phone keyframes 800×720; film and canvas set in Tebet. |
| 2026-09-27 | Honesty fixes: AI H1 "Jasa SEO AI (GEO & AEO): Agar Brand Anda Layak Dikutip di Google AI Overview, AI Mode, dan ChatGPT"; hub H1 "…: Harga dan Paket Setiap Layanan"; price claim limited to SEO, Local SEO, Iklan and Website; APJII chip reads "APJII via Kompas, 2025". |
| 2026-09-27 | Deliberate deviations: phone Overture uses T1 `data-step` (not CSS view-timelines); stacking-card scale is a CSS view-timeline (not T2 JS); "Tampilkan anotasi" uses `:checked ~` (not `:has()`); media lives in `public/media/<key>-<sha8>/` folders written only by `scripts/install-media.mjs`, which also regenerates `src/content/media.json`; replacing a render changes no site code and never serves a stale immutable file. |
