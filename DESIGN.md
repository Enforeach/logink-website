# Logink "Warm Canvas" Design System — 2026 rebrand

The brand guideline for the light-theme rebrand. The logo (`src/components/ui/Logo.tsx`) is the one element that did not change — everything else derives from it: the accent colors come from the logo ribbon's magenta→coral→orange gradient.

## Color guideline

| Token | Value | Use |
|---|---|---|
| `--bg-primary` / `brand-cream` | `#FDF8F3` | Default page background (warm cream) |
| `--bg-surface` | `#FFFFFF` | Cards, elevated surfaces |
| `--bg-tint-peach` | `#FBEFE4` | Alternating section band |
| `--bg-tint-rose` | `#FBE9EF` | Alternating section band |
| `--bg-tint-lilac` | `#F5EFFB` | Alternating section band (sparse) |
| `--bg-ink` / `brand-ink` | `#231A26` | Inverted band — max 1–2 per page (stats, announcement) |
| `--text-primary` | `#231A26` | Espresso-plum body text |
| `--text-secondary` | `rgba(35,26,38,.66)` | Support text |
| `brand-magenta` | `#A8138F` | Gradient stop (from logo) |
| `brand-crimson` | `#D81C5C` | Primary accent, eyebrows, links |
| `brand-coral` | `#EE3D5E` | Gradient stop |
| `brand-orange` | `#F88438` | Gradient stop |
| `brand-purple` | `#A855F7` | Secondary accent (the "ink" purple), article links |

Gradients: `--grad-brand` (full 4-stop logo gradient — hero words, big moments) and `--grad-cta` (crimson→orange — primary buttons, via `.gradient-bg`). One gradient word per headline, never whole headlines.

Service accents: SEO `#A855F7` · Social `#D81C5C` · Ads `#F88438` · Creative `#F5A623` · Web `#C084FC`.
WhatsApp elements always stay `#25D366` (recognition beats consistency).

Legacy tailwind aliases (`brand-violet`, `brand-pink`, `brand-amber`, …) still compile and map to the nearest new hue — the DB stores old service hexes, and `CaseStudyCard`/`PricingTier` remap them at render time.

## Typography

- **Display / headings:** Bricolage Grotesque (`font-display`, `--font-display`), tracking −0.03em, tight leading.
- **Body / UI:** Outfit (`font-outfit`), 1.7 line-height.
- Eyebrow pattern: `.eyebrow` (0.75rem, uppercase, 0.18em tracking, crimson) above every section headline.

## Section rhythm & CRO

Alternate cream → white → tint band → ink band so every scroll stop feels new. One primary action per screenful; primary CTAs are gradient pills with an arrow, secondary are hairline ghosts. Trust microcopy ("Tanpa kontrak lock-in · Laporan GA4 transparan") sits under primary CTAs. WhatsApp is offered beside every quote CTA.

## Motion

framer-motion `whileInView` fade-ups (24px, ~0.6s, stagger 0.08–0.12, `once: true`); CSS `.orb` drift in heroes; scroll-linked gradient progress lines (`useScroll` + `scaleY`); count-ups via `useCountUp`. Transform/opacity only; `prefers-reduced-motion` is honored globally in `globals.css`.

## F-pattern (blog + legal pages only)

- **Blog hub:** full-width horizontal featured card (text left) → category pill bar → scannable list rows down the left edge → sticky CTA rail on the right.
- **Blog detail:** title band → share/hook row → body in a left 65ch column with hard-left H2s → sticky right TOC + CTA card.
- **Legals:** title band with last-updated → sticky left TOC rail (numbered) → 70ch content with numbered H2s.

## Scope notes

- `/admin` is intentionally NOT rebranded: it keeps the legacy dark shell via the `.theme-dark-admin` scope in `globals.css`. Shared UI primitives (`Button`, `Card`, `Badge`) were restyled with identical prop APIs.
- Do not edit `src/components/ui/Logo.tsx` — the logo is fixed brand equity.
