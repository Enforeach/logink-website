# 1 · Architecture (A): routes, root layouts, styles, config

Part of `docs/redesign/BUILD.md`. Precedence: BUILD parts > `DESIGN.md` > blueprint > final.md.

## 1.1 Decision

**Full replacement on `redesign/sehari-semalam`.** There are no `(legacy)`/`(v2)` groups, no dual rollout and no pilot soak on this branch. Every public URL keeps its path and its ID/EN pair. Route files stay where they are today and become thin wrappers over section components (§1.8). Until its package rewrites it, a legacy page may render unstyled because its Tailwind classes no longer exist. That is accepted during the build; it must not crash.

## 1.2 Target tree

```
src/app/
  (payload)/…                  UNTOUCHED: Payload root layout, /admin, /api/[...slug]
  api/contact/route.ts         kept; + honeypot + per-IP rate limit (Blog/Contact pkg)
  api/cta-widgets/…, api/revalidate/route.ts   kept, untouched
  sitemap.xml/route.ts         rewritten from the registry (Core)
  llms.txt/route.ts            NEW, generated from the registry (Core)
  global-not-found.tsx         NEW (Core writes a minimal one; the Blog pkg owns it from W3)
  favicon.ico · icon.svg       kept
  globals.css                  DELETED (Core)
  (frontend)/
    layout.tsx                 DELETED (no shared root)
    (public)/                  ID ROOT: /, /layanan/…, /about, /portfolio…, /blog…, /contact, /privacy, /terms
      layout.tsx               <html lang="id">   (Core W1, then Motion W2a)
      template.tsx             NEW <ViewTransition> (Motion)
      not-found.tsx            NEW (Blog pkg)
    en/                        EN ROOT: /en, /en/services/…, /en/about, …
      layout.tsx               <html lang="en">   (Core W1, then Motion W2a)
      template.tsx             NEW (Motion)
      not-found.tsx            NEW (Blog pkg)
```

Verified in the installed Next 16.2.6 (`node_modules/next/dist/docs`, `dist/server/config-shared.d.ts`):
- `layout.md`: a layout with no `layout.js` above it is a root layout. Deleting `(frontend)/layout.tsx` makes `(public)/layout.tsx` and `en/layout.tsx` the two frontend roots. `/` lives inside `(public)`. Navigating ID ↔ EN crosses roots and does a full page load, which is fine for a language switch.
- `not-found.md` "global-not-found.js (experimental)": with multiple root layouts, unmatched URLs need `app/global-not-found.tsx` plus `experimental.globalNotFound: true` (declared at `config-shared.d.ts:763`). It bypasses layouts, so it imports `@/styles/tokens.css` and the fonts itself and returns a full `<html lang="id"><body>` document. `notFound()` thrown inside a root renders that root's `not-found.tsx`. 404s get `noindex` from Next.
- `experimental.viewTransition` (`:687`) and `inlineCss` (`:739`) exist. Next's compiled React exports `ViewTransition` (`next/dist/compiled/react`), so `import { ViewTransition } from 'react'` works in app code. Motion keeps `src/types/react-canary.d.ts` for the typings.
- `proxy.md`: `middleware` is deprecated in 16.0 and renamed `proxy`.
- `image.md`: `priority` is deprecated; use `preload`. `images.qualities` must list every quality used.
- `.next/dev/` exists: `next dev` writes to its own folder, so the one-off `pnpm build` runs in W2 and W4 can run beside the shared dev server.

Rules:
- There is no `src/app/layout.tsx` and no other new route group. There is no `loading.tsx` anywhere under `(frontend)`, because streaming would turn page-code `permanentRedirect()` into a meta refresh.
- Marketing routes are static. Routes that read Payload keep `export const revalidate = 3600` (posts 300).

## 1.3 Root layout contract (the two roots differ only in `lang`, OG locale and SkipLink text)

Core writes both in W1 with the lines not marked (M). **Ownership passes to Motion at the start of W2a**; Motion adds the (M) lines and no one edits the layouts after that.

```tsx
import type { Metadata } from 'next'
import Script from 'next/script'
import '@/styles/tokens.css'
import '@/motion/motion.css'                                  // (M)
import { archivo, martian } from '@/styles/fonts'
import { SITE_URL } from '@/lib/services'
import { WebVitals } from '@/lib/web-vitals'
import { TEKS_SCRIPT, DayDial } from '@/motion/primitives'    // (M)
import { SiteObserver } from '@/motion/SiteObserver'          // (M)
import { RichGate } from '@/motion/RichGate'                  // (M)

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  openGraph: { siteName: 'Logink', type: 'website', locale: 'id_ID' },  // 'en_US' in the EN root
  twitter: { card: 'summary_large_image' },
}
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${archivo.variable} ${martian.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: TEKS_SCRIPT }} /></head>   {/* (M) */}
      <body>
        {/* GTM noscript iframe GTM-54VQ85P3, verbatim from today's (frontend)/layout.tsx */}
        <a href="#main" className="skip-link">Langsung ke konten</a>   {/* EN: Skip to content */}
        <DayDial />                                                     {/* (M) */}
        {children}                                                      {/* every page renders <PageShell> (§2.3) */}
        <SiteObserver /><RichGate />                                    {/* (M) */}
        <WebVitals />
        {/* <Script id="gtm" strategy="lazyOnload"> … verbatim from today's layout */}
      </body>
    </html>
  )
}
```
- **No chrome in layouts** (no header, menus, WhatsApp pill, bottom bar, closing band or footer). A layout has no pathname, so it cannot know the language alternate, the WhatsApp prefill or whether the page opens dark. Chrome is `PageShell`, rendered by each page (§2.3).
- No `ToastProvider` (its only consumers are the two layouts), no `SetLang`, `Navbar`, `Footer` or `WhatsAppButton`.
- `TEKS_SCRIPT` only restores `html.mode-teks` from `localStorage['lk-mode-teks'] === '1'`. No inline script ever adds `html.js`. SiteObserver sets it after its first scan.
- No title template. Every page passes an absolute title through `pageMeta()` (§3.3).
- `src/lib/web-vitals.tsx` (Core): a `'use client'` leaf that calls `useReportWebVitals` from `next/web-vitals` and pushes `{event:'web_vitals', name, value, id, rating}` to `window.dataLayer` (owner decision 14).
- `.skip-link` is a tokens.css class. If it does not exist there, Core adds it in the tokens.css components section.

## 1.4 Stylesheets and Tailwind (Core)

- `src/styles/tokens.css` = blueprint `design-system/tokens.css` (copy from `docs/redesign/blueprint-src/design-system/tokens.css`) with exactly three edits:
  1. Delete line 15 `@config "../../tailwind.v2.config.ts";`. Tailwind then uses the root `tailwind.config.ts`.
  2. Unwrap the `@layer components { … }` block (delete the opener line and its closing brace, keep the rules in place). Unlayered rules are never purged, and they still sit before `@tailwind components; @tailwind utilities`, so the cascade order is unchanged. This fixes the CRITIC purge item by construction; the measured size with every component class is 26.3 KB minified.
  3. Add `.skip-link` (visually hidden until `:focus-visible`, `z-index: var(--z-skip)`, Aspal on Putih, 2px focus ring).
  It is the only frontend stylesheet that defines tokens. Other agents never edit it. If they need a class, they use Tailwind utilities in their own TSX.
- `src/motion/motion.css` (Motion owns it) consumes tokens and defines no colour primitives. `src/styles/prose.css` (Blog pkg) styles CMS bodies and is imported only by the article and case-body components.
- `src/styles/tailwind.tokens.ts` and `src/styles/fonts.ts` = blueprint verbatim. In fonts.ts, delete the trailing `PRE_PAINT` comment block (it adds `js`, which is banned).
- `src/app/globals.css` is **deleted**, and with it `html { scroll-behavior: smooth }` (line 62) and its reduced-motion override. Nothing may add `scroll-behavior: smooth` again (grep gate G4): it fights Lenis.
- Root `tailwind.config.ts` is **replaced** by:

```ts
import type { Config } from 'tailwindcss'
import { theme } from './src/styles/tailwind.tokens'
export default {
  content: [
    './src/app/[(]frontend[)]/**/*.{ts,tsx}',
    './src/app/global-not-found.tsx',
    './src/components/ds/**/*.{ts,tsx}',
    './src/components/instruments/**/*.{ts,tsx}',
    './src/components/sections/**/*.{ts,tsx}',
    './src/motion/**/*.{ts,tsx}',
  ],
  theme,
  corePlugins: { container: false },
} satisfies Config
```
Write route-group parentheses as `[(]…[)]`. Backslash escapes match 0 files in Tailwind 3.4.19 (CRITIC, re-verified). Never scan `(payload)`, `src/collections`, `src/components/public` (legacy) or `docs/`. `postcss.config.mjs` is unchanged.
- Admin isolation: `rg -n 'tokens.css|tailwind.tokens|motion.css' 'src/app/(payload)'` must print nothing. `/admin/login` must look the same before and after. Core's first action, before any edit, is to screenshot `/admin/login` to `build-shots/core/admin-before.png`.
