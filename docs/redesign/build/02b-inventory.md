# 2 · Components (B): §2.5 inventory, part 1 (ds, chrome, motion)

S = Server Component, C = `'use client'` leaf. `L` = `Locale`. Every path is under `src/`. Pages: H home, SV service pages (7 pairs), HB hub, AB about, PF portfolio, CS case, BL blog hub/category/post, CT contact, LG legal, NF 404, ALL every page.

## 2.5 Component inventory

Parts 2.5a–c are below; 2.5d–e are in `02c-inventory.md`.

## 2.5a Primitives: `components/ds/` (owner: Chrome)

| Component | S/C | Props | Pages |
|---|---|---|---|
| `Section.tsx` | S | `{ hour?: string; ground?: Ground; stage?: StageKey; id?: string; labelledBy?: string; pad?: 'sm'\|'md'\|'none'; className?; children }` → `<section data-hour data-ground data-stage data-sky aria-labelledby>`; `data-sky = skyOf(ground ?? hourInfo(hour).ground)` | ALL |
| `Wrap.tsx` | S | `{ grid?: boolean; className?; children }` → `.wrap` (+ `.grid-12`) | ALL |
| `Dateline.tsx` | S | `{ locale; hour?: string; date?: string (ISO, real date); word?: string; right?: string }` → `JAKARTA, 07.00 WIB — PAGI · DITEMUKAN` from `hourInfo()` + stage label; a real `date` renders `<time dateTime>` | ALL but H hero |
| `H1Svc.tsx` | S | `{ text: string; variant?: 'display'\|'reading' }`: display line = text up to and including the first `': '`, `.tail` = the rest, same `<h1>`, textContent === text. `reading` = H2 scale for long CMS titles | SV HB AB PF CS BL CT LG NF |
| `ClockNumeral.tsx` | S | `{ hour: string }`, `aria-hidden`, outside headings | H chapter openers only |
| `Stabilo.tsx` | S | `{ children }` → `<mark class="stabilo">` (paper only) | H AB SV footer |
| `StageStrip.tsx` | S | `{ locale; variant: 'strip'\|'loop'; active?: StageKey; svc?: SvcKey }`. strip = 4 real anchors `#ditemukan…` labelled by stage + services (`Ditemukan · SEO, Local SEO, Iklan`); loop = "Posisi di loop": `active` lit, sibling-stage service links via `servicesInStage()` | H HB (strip) · SV (loop) |
| `Chip.tsx` | S | `{ variant: 'stage'\|'source'\|'engine'\|'filter'\|'choice'; stage?; href?; year?: number; current?: boolean; children }`; source chips link out with `rel="noopener"` | ALL |
| `Button.tsx` | S | `{ href; variant?: 'ink'\|'ghost'\|'text'; size?: 'sm'\|'md'\|'lg'; cta?: 'quote'\|'form'\|'profiler'; placement?; service?; cursor?: string; children }` → `<Link>`; `as="button"` for form submit | ALL |
| `WaButton.tsx` | S | `{ text: string (prefill); placement; service?: SvcKey\|'none'; label?: string; size?; full?: boolean }` → `<a class="btn btn-wa" href={waLink(text)} data-cta="whatsapp" data-placement data-service data-cursor="Chat WhatsApp" data-cursor-tone="wa">` + icon | ALL |
| `TextLink.tsx` | S | `{ href; arrow?: boolean; children }` → `.link`, always underlined | ALL |
| `Icon.tsx` | S | `{ name: 'arrow-right'\|'arrow-up-right'\|'whatsapp'\|'plus'\|'minus'\|'check'\|'alert'\|'play'\|'pause'\|'menu'\|'close'; size? }`, inline SVG, `aria-hidden`, currentColor (Archivo lacks U+2192) | ALL |
| `Figure.tsx` | S | `{ asset: MediaKey; file?: string (default 'still'); locale; sizes: string; ratio?: '4/5'\|'16/9'\|'4/3'\|'21/9'; preload?: boolean; lamp?: boolean; wipe?: boolean; decorative?: boolean; className? }`. **Returns `null` when `media(asset)?.files[file]` is missing.** next/image (q75, `preload` only for an LCP-candidate hero), caption from media.json, `decorative` → `alt=""` and no caption | H SV AB CT |
| `DataTable.tsx` | S | `{ caption: ReactNode; head: string[]; rows: ReactNode[][]; scroll?: boolean; stack?: boolean; rowHeaders?: boolean }` → `<table class="tbl">`; `stack` reflows under 640px with explicit table/row/cell roles | H HB SV LG |
| `Faq.tsx` + `FaqSection.tsx` | S | Faq `{ items: { q: string; a: string }[] }` → `<details>`, 48px summary, answer always mounted. FaqSection `{ locale; heading: string; items; hour?; ground?; id? }` | H HB SV CT |
| `FactList.tsx` | S | `{ items: { k: string; v: ReactNode }[] }` → `<dl>` | SV AB CS |
| `AnswerBlock.tsx` | S | `{ locale; heading: string; text: string; updated: string; reviewer: Reviewer \| null }` → H2 + `<p><Stabilo>` + `Diperbarui {date}`; "Ditinjau oleh" only when `reviewer` is set | SV (+ AI "Definisi") |
| `SourcedStat.tsx` | S | `{ value?: string; text: string; src: string; year: number; url: string }`: final value in HTML (`.t-stat` tnum), sentence, source chip + year + outbound link. No count-up | H SV |
| `Price.tsx` | S | `{ svc: SvcKey; locale; lead?: boolean }` → registry `price[l]` (with "Mulai" when `lead`); `price === null` → `svc.quote[l]` | H HB SV |
| `Badge.tsx` | S | `{ kind: 'populer'\|'contoh'; locale }`; populer = crimson + white (4.95), contoh = outline chip | SV instruments |
| `Breadcrumbs.tsx` | S | `{ items: { name: string; href: string }[] }` → `<nav aria-label>`; the page adds `breadcrumbNode(items)` to its graph | all inner pages |
| `Toc.tsx` + `TocSpy.tsx` | S + C (~0.3 KB) | Toc `{ items: { id; text; level }[]; locale; numbered?: boolean }`; sticky on desktop, `<details>` on phones; TocSpy sets `aria-current` | BL post, LG |
| `Field.tsx` | S (hook-free, importable by client forms) | `Input`, `Textarea`, `Select`, `CheckboxGroup`, `Honeypot` (`name="website"`, visually hidden, `tabIndex=-1`, `autoComplete="off"`): 48px, radius 4, `--line`, error via `aria-describedby` + alert icon. Forms only on Putih | CT H (profiler) |
| `JsonLd.tsx` | S | `{ graph: object[] }` → one script | ALL but NF |
| `ProcessStack.tsx` | S | `{ locale; heading: string; steps: { when: string; title: string; text: string }[]; hour?; ground? }` → `<ol>` sticky cards, 18px step; desktop scale is CSS (motion.css) | H (sheet) SV |
| `CrossSell.tsx` | S | `{ locale; keys: SvcKey[]; heading: string }`: cards with `data-stage` + `data-ground`, name anchors via `svcHref`, price line, `data-cursor="Buka layanan"` | SV CS BL post |
| `ServicesTable.tsx` | S | `{ locale; id?: string }` → wraps `motion/HoverRevealTable`: caption `Layanan dan harga Logink · diperbarui {latest svc.updated}`, columns Layanan / Tahap / Jawaban singkat / Harga, 7 rows in registry order, AI via `svcHref`; `still`/`thumb` from the `jam-*` media keys (a row without media has no still). **No Offer JSON-LD** | H HB |
| `CaseCover.tsx` + `CaseFileRow.tsx` | S | Cover `{ locale; c: CaseCard; variant: 'card'\|'hero' }`: typographic Kertas cover, magenta rule, metric sentence + period + source (approved cases only), `ViewTransition name={'case-'+slug}`. Row `{ locale; cases: CaseCard[] }`: scroll-snap, `data-drag-x`, `data-cursor="Geser"` | H (only when approved) PF CS |
| `ClientLogos.tsx` | S async | `{ locale }` → `getClientLogos()`; renders nothing below 6 logos | H AB |

`Reviewer`, `CaseCard`, `MediaKey`, `Placement` are exported types: `Reviewer` from `lib/services.ts`, `MediaKey` from `lib/assets.ts`, `CaseCard` and `Placement` from `components/ds/types.ts`.

## 2.5b Chrome: `components/ds/chrome/` (owner: Chrome)

| Component | S/C | Props | Notes |
|---|---|---|---|
| `PageShell.tsx` | S | §2.3 | the only place chrome is composed |
| `SiteHeader.tsx` | S | `{ locale; alt; svc? }` | one `<LogoFull theme="light" className="logo-auto" />`; the sky swap is CSS (`.logo-auto tspan:first-of-type { fill: var(--logo-log) }`); no client logo island, no `useHtmlAttr`. Condense/hide via `html[data-nav]` (SiteObserver) |
| `MegaMenu.tsx` | S, 0 KB JS | `{ locale }` | `popover="auto"`, 3 columns = `GROUPS` (organik: SEO, Local SEO, Social, SEO AI; penjualan: Ads, Website; kreasi: Creative), each item = name link + one-line answer + stage chip, plus a WhatsApp line. Trigger `<button popovertarget="mega">` + sibling `<a href="/layanan">` fallback (§5.4 CSS) |
| `MobileMenu.tsx` | S | `{ locale; alt; svc? }` | `<dialog id="menu" class="lk-menu">`, all services by group, pages, LanguageLink, WhatsApp + Penawaran; closes with `MenuButton close` |
| `LanguageLink.tsx` | S | `{ locale; alt }` | `<a href hrefLang lang>`: "EN" / "ID", never `usePathname` |
| `WaPill.tsx` | S | `{ text; service? }` | `.wa-pill` wrapper with `data-magnetic`; desktop only; never hides |
| `BottomBar.tsx` | S, 0 KB JS | `{ locale; text; svc?; variant: 'full'\|'wa' }` | WhatsApp 60% + Penawaran 40% (btn-ink); hides while an input has focus (CSS) |
| `ClosingBand.tsx` | S | `{ locale; text; svc? }` | Dateline 21.30 + `<h2 id="closing-h">Satu pesan cukup.</h2>` (EN "One message is enough."), lede, WaButton (placement closing), Penawaran (Cahaya partner button, never crimson), `ANTI_SCAM[l]`; ≥48px text-free bottom padding |
| `SiteFooter.tsx` | S | `{ locale; text }` | WaButton directly above a giant `LogoFull theme="light"` (width 100%); ENTITY verbatim; NAP (Jakarta, WA_DISPLAY, EMAIL, Instagram); all 7 services by name; pages; column titles as `<p>`; privacy + terms; `ModeTeksToggle`; `AI_DISCLOSURE`; © year |

## 2.5c Motion: `motion/` (owner: Motion; from blueprint `motion-engineering/src` with the §5.4 patches)

| Module | S/C | API | Mounted by |
|---|---|---|---|
| `SiteObserver.tsx` | C (~1.4 KB gz) | `<SiteObserver />` | both root layouts |
| `RichGate.tsx` + `gates.ts` | C (~1.0 KB gz) | `<RichGate />`; gates `richAllowed()`, `filmAllowed()`, `canvasAllowed()`, `afterLoad()`, `onGateChange()` | root layouts |
| `primitives.tsx` | S | `FrontPageTitle {kicker; lines: {text; wide?}[]}` · `SplitHeading {as?; text; id?; className?}` · `RevealWords {text}` · `DayDial` · `HouseLights {band; children}` · `FilmHero {poster: {desktop: Img; mobile: Img}; film?: string; alt; caption; labels: {pause; play}}` · `HorizonWipe {children}` · `RibbonHorizon` · `CoralGlow` · `ModeTeksToggle {label}` · `ModeTeksLabel {label}` · `TEKS_SCRIPT` · `MenuButton {target; close?; className?; children}` | layouts, ds, sections |
| `ScrollSequence.tsx` | C island (~1 KB gz) | `{ frames: {dir; count: 25; width: 1280; height: 720}; keyframes: {desktop: string; mobile: string}[4]; alt; focus?; stage?: ReactNode; id?; children }` (no `loop`) | H Overture (only when `media('atap')` exists) |
| `sequence-core.ts` / `sequence-player.ts` | T2 chunk (≤2.2 KB gz) | `startSequence(opts)`, neighbour blend | ScrollSequence |
| `HoverRevealTable.tsx` | S | `{ caption; columns: [4]; rows: ServiceRow[]; cursorLabel }` | ds/ServicesTable |
| `ProofLoupe.tsx` | S | `{ id; toggleLabel; annotations: ReactNode; children }`: root `<div class="lk-proof" data-loupe>` (not a figure, no `data-nosnippet`; the MockFrame child carries it) | H Bab III, AI page |
| `rich/*` | T2 chunk (≤17 KB gz) | Lenis, cursor, magnetic, lamp, hover still, loupe, film attach + pause, drag rows | RichGate |
| `motion.css` | T0 | classes `lk-*`, `.wa-pill`, `.bottom-bar`, `.lk-menu`, `.lk-mega`, ticker, film, house lights | root layouts |
| `app/(frontend)/(public)/template.tsx`, `app/(frontend)/en/template.tsx` | S | `<ViewTransition enter="lk-page" exit="lk-page" default="none">` | roots |
