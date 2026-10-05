# 8 · CRITIC resolutions (B): minors and open items

**m1 · Header logo mechanism.** "Pick design-system's CSS override."
→ One `<LogoFull theme="light" className="logo-auto" />` in a server header; `.logo-auto tspan:first-of-type { fill: var(--logo-log) }` follows `html[data-sky]` (and `main[data-sky]` before hydration). HeaderLogo and `useHtmlAttr` are deleted. Logo.tsx is untouched. §2.5b, §5.4 patch 11.

**m2 · Mode teks persistence key.** "Mixing the two means the choice is never restored."
→ One key, `lk-mode-teks`, with value `'1'`, in SiteObserver, `TEKS_SCRIPT` and fonts.ts (whose PRE_PAINT comment is deleted). SiteObserver syncs `#mode-teks.checked` on load. §5.4 patch 1.

**m3 · Cursor attribute contract.** "WhatsApp controls would show an Aspal disc labelled 'wa'."
→ `data-cursor` is always the localised label; the tone is `data-cursor-tone`. `WaButton` emits `data-cursor="Chat WhatsApp" data-cursor-tone="wa"`. The contract is written once, in DESIGN §10.7, and quoted in §2.4.

**m4 · Phone Overture mechanism and the LOOP tier.** "Adopt motion-engineering's data-step band. Decide LOOP."
→ The phone band is T1 `data-step` (works in Firefox and Safari <26, 0 extra bytes). The LOOP tier is cut (owner default, §7.1-C); ffmpeg LOOP output is not installed. §5.4 patches 3–4.

**m5 · JSON-LD visible-text CI definition.** "Fails as written on every @id, url, logo…"
→ Excluded: URL-valued strings and the keys `@id @type @context url logo image sameAs item priceCurrency unitCode` plus any key containing `Date`. `knowsAbout` = visible service names. No `audienceType`. G9 applies this in `states.cjs` (QA-0 patch). §2.4, §3.3.

**m6 · Budget inconsistencies.** "The budgets disagree."
→ One table, §6.2: fonts 100,472 B; inlined CSS ≤48 KB raw per page; initial JS home ≤200 KB and other pages ≤170 KB transfer; T1 ≤3.4 KB gz; T2 ≤17 KB gz + player ≤2.2 KB gz. DESIGN §14 points to it.

**m7 · Next 16 images config.** "Next 16 requires images.qualities."
→ `qualities: [60, 75]`. Film posters and canvas frames are pre-encoded WebP served as-is, not through next/image. `priority` is deprecated in 16 and `preload` is used instead (image.md). §1.5, §4.6.

**m8 · Bundle gate command.** "@next/bundle-analyzer is webpack-only."
→ The enforced gate is `motion-gate.cjs` (it scans downloaded script bodies on a touch profile) = G11. `pnpm next build --experimental-analyze` is optional human review. No `ANALYZE=true` Turbopack command. §6.1.

**m9 · Offer JSON-LD on home/hub.** "Follow page-architecture: Offers only on service pages."
→ Offer only on the priced service pages (seo, localseo, ads, website). Home and hub use `itemListNode` → `{service}#service`. ServicesTable emits no JSON-LD. §2.4, §3.7, §3.9.

**m10 · Local SEO Maps iframe.** "None exists."
→ No MapsEmbed and no iframe QA until owner decision 8 supplies a GBP. Local SEO is the lightest build. §3.8.

**m11 · Contact page rendering and form ground.** "Keep /contact static."
→ Static page; `ContactForm` reads `?layanan` and legacy `?service` with `useSearchParams` inside `<Suspense>`; the form sits on a Putih inset under a Malam hero. §3.9.

**m12 · Missing or unsafe logo assets.** "Organization logo is /images/logo-512.png, which no key produces."
→ Core renders `public/images/logo-512.png` (512×512, LogoFull light output unchanged, on Putih) with Playwright. The live-`<text>` `logo-light.svg` is not shipped. An outlined-path SVG is skipped: nothing on the site needs it, and the Organization logo takes the PNG. Add it when a consumer appears. §4.2.

**m13 · Overture fallback when plates never arrive.** "There is no image-less fallback."
→ Defined in §4.4: flat Kertas, live `Phone panels` on `data-step`, no poster slot. The rendered frames exist now, so it serves only when `atap` is absent (and it is checked on the dev-only fallback page, §5.8).

**m14 · Service hero LCP.** "It becomes the LCP element and loads late."
→ The still renders smaller than the H1 block on desktop (`sizes="(min-width:1024px) 34vw, 100vw"`), lazy, without `preload`; on phones it sits below the CTA pair. The gate stays "LCP element = H1". §3.8.

**m15 · Honesty in H1s and stats.** "Reads as a promised outcome."
→ AI H1 `Jasa SEO AI (GEO & AEO): Agar Brand Anda Layak Dikutip di Google AI Overview, AI Mode, dan ChatGPT` (EN `…: Make Your Brand Worth Citing in…`). The APJII chip reads `APJII via Kompas`. `AI_BASELINE` sits behind `AI_BASELINE_LIVE`, which is true under owner default 7. §3.2.

**m16 · Minor contract drift.**
→ `Section` emits `data-sky` derived from its ground. `hourInfo()` is the only source of dateline words (15–16h = Sore). The AI hero header is Malam (a dark sky). DESIGN.md is already v2 (v1 archived); this build does not rewrite it mid-way. Slug redirects have no `loading.tsx` or Suspense above them. §1.2, §2.5a, §3.8.

**Also from the CRITIC summary:** "a single untunable fallback font" → the per-cut `LK *` faces in tokens.css (verbatim). "Lead Profiler defect is false" → M9.

## Open items (not blockers; logged for the owner or later)

- WebKit 16.4 and Firefox 115 ESR menu runs: not reproducible locally. The CSS fallback and the G4 grep cover the failure class, and a BrowserStack run is recommended before launch.
- Firefox browser binary: not installed for Playwright (`pnpm exec playwright install firefox` if network allows). Chromium and WebKit are installed.
- The rendered film is 1680×720, not the direction's 1920×820 (the same 21:9). It stays within budget; a Veo re-render may raise it to 1920×820 at ≤1.5 MB.
- The owner items in §7.4.
