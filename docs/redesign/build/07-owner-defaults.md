# 7 · Owner defaults in force

Part of `docs/redesign/BUILD.md`. These are the final.md "Owner decisions" defaults plus the defaults named for this build. Each one is in force until the owner says otherwise. Where a default gates content, the switch is a single registry constant or asset key, so a reversal changes no layout code.

## 7.1 Named for this build

| # | Default in force | Where it lives |
|---|---|---|
| A | **The AI page pair ships**: `/layanan/jasa-seo-ai` + `/en/services/ai-search-optimization` (owner decision 1 default "yes"). The H1 names GEO & AEO and promises nothing (§3.2) | `AI_PAGE_LIVE = true`; Service pkg |
| B | **UI motion is live HTML/CSS**, not `.webm` twins (decision 10). WebM is only for the photographic hero film | instruments (§2.5d) |
| C | **The LOOP canvas tier is cut.** Low-memory desktops get the STEP tier (keyframes via `data-step`). The rendered 12 s rooftop WebM stays unused in `assets/out` | Motion §5.4 patch 3; §4.2 |
| D | **WebP masters**, served by next/image as AVIF/WebP (`formats: ['image/avif','image/webp']`, decision 11). Film posters, canvas frames and keys ship as pre-encoded WebP | §1.5, §4.6 |
| E | **Mode teks ships**: the footer checkbox on every page + the `<label for>` in Bab III and on the AI page (decision 12); key `lk-mode-teks` | DESIGN §10.6; Motion + Chrome |
| F | **Blog and all long reading stay light** (Kertas + Aspal). No site-wide dark mode (decision 3) | §3.9 |
| G | **Full replacement on this branch** (supersedes decision 13's pilot and final.md's (legacy)/(v2) rollout). Nothing is committed or deployed by the build agents | §1.1 |

## 7.2 final.md owner decisions 1–15 (defaults)

| # | Decision | Default in force for this build |
|---|---|---|
| 1 | AEO/GEO URL pair | Yes (7.1-A) |
| 2 | Image/video model | Interim: Canva generate-image stills (owner-approved, downloaded at full size, no visible AI label), graded and rendered locally into the film "Buka" and the rooftop frames by `assets/scripts/*`. Later: Figma Weave (Nano Banana Pro stills, Veo 3.x / Kling) at the same file names, then `install-media.mjs`. Captions say "animasi dirender" until filmed footage replaces the render (§4.3). Claude Design / live HTML covers the instruments, OG images and case covers |
| 3 | Blog dark or light | Light (7.1-F) |
| 4 | Move away from Warm Canvas | Yes. `DESIGN.md` v2 replaces it (v1 archived at `docs/redesign/DESIGN-warm-canvas-v1.md`); the logo and the admin are unchanged |
| 5 | Case data fixes + publishing +575% / +463% | Not approved: `APPROVED_CASE_SLUGS = []`. The facts strip uses offer facts, "Catatan pagi" and service proof show "Cara kami mengukur", and portfolio covers show no metric sentence. Case pages still render their CMS content (they return 200 today) |
| 6 | Pricing facts (Local SEO add-on price, lock-in vs annual billing) | One facts source (the moved `data.ts` + the registry summary); "ditagih tahunan" on every Rp 1 Juta; "tanpa lock-in" appears nowhere; the Local SEO price is shown only as the Local SEO page states it; the SEO page's "Local SEO" add-on row shows no number of its own and links to `/layanan/local-seo#harga` until the owner reconciles Rp 2 Juta vs Rp 1 Juta / 750 Ribu |
| 7 | Publish the AI baseline | Yes: `AI_BASELINE_LIVE = true` ("logink.co: 1 kutipan AI (Ahrefs, Sep 2026). Progres dipublikasikan tiap kuartal.") |
| 8 | Real people and entity facts (reviewer, PT, founding year, address, GBP, logos, testimonials) | None supplied: `REVIEWER = null` hides "Ditinjau oleh" and `reviewedBy`; the entity rows hide; ClientLogos hides below 6; there is no testimonials section; no MapsEmbed |
| 9 | Full 45–60 s film "Sehari di Jakarta" | Phase 2, not in this build. "Putar film" stays reserved for it |
| 10 | UI motion as live HTML | Yes (7.1-B) |
| 11 | WebP vs AVIF | WebP masters, AVIF on the wire (7.1-D) |
| 12 | Mode teks | Yes (7.1-E) |
| 13 | Pilot page | Superseded by the full replacement (7.1-G) |
| 14 | GSC/GA4 access | Not blocking. The build ships `useReportWebVitals` → `dataLayer` (§1.3) |
| 15 | Official WhatsApp number | `+62 813-9453-933` (`WA_NUMBER 628139453933`) in every prefill and the anti-scam line |

## 7.3 CRITIC-added owner items, with the default applied

- **Price wording:** the hub H1 says "Harga dan Paket Setiap Layanan", and the fact reads "Harga mulai tertulis untuk SEO, Local SEO, Iklan dan Website; Social & Kreatif: proposal dalam 24 jam" (§3.2). If the owner later publishes Social or Creative module prices, the registry `price` is set and the check updates the fact.
- **Imagery tool:** see decision 2 above. This is recorded in DESIGN.md §17.
- **LOOP tier:** cut (7.1-C).

## 7.4 Still open for the owner (nothing is invented meanwhile)

A named reviewer + job title; legal entity (PT), founding year, street address and GBP link; ≥6 client logos with permission; verified testimonials; case-data corrections (Duomark leak, "[Klien]", "3.080,%", +253% vs +11.1%); Social, Creative and AI prices; filmed footage via Weave (link at the Weavy profile settings); the www → apex 308 in Vercel Domains; GSC/GA4 access for a before/after baseline.
