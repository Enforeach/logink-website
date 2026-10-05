# Critic review of the blueprint (binding fixes for the build)

**Verdict:** Not ready for owner sign-off as one build document. Sehari Semalam holds up: URLs, SEO/SSR rules, honesty rules and phone budgets are sound, and I verified most of them against the repo and the live sitemap. The problem is that the blueprint is six specs that disagree on the basics:
- 3 route/root-layout trees
- 4 component folders
- 2 token models
- 2 frame counts (120 vs 25)
- 5 frame paths and 3 OG naming schemes
- 2 places for the site chrome (header, menus, WhatsApp bar/pill, closing band, footer)

The build plan in particular ignores the design-system and motion-engineering deliverables and repeats defects they had already proved, such as escaped Tailwind globs that match nothing (I re-tested: 0 matches) and a single untunable fallback font.

On top of that there are real defects:
- Pre-paint `.js` hides text if the observer script fails to load.
- `data-nosnippet` is on `<figure>`, where Google ignores it.
- The fact strip and hub H1 say every service has a written price; Social and Creative do not.
- The looping film and ticker have no pause control (WCAG 2.2.2).
- The `:popover-open` selector list makes the mobile menu invisible on browsers in browserslist.
- The bottom bar covers the end of every page on phones.
- The cursor lamp pushes on-dark text below AA.

The build plan's Lead Profiler "defect" is false: the profiler does collect email.

About 1–2 days of reconciliation (one tree, one token set, one asset path table, 25 blended frames) plus the fixes below make it buildable. Owner-facing decisions to add: Weave instead of Claude Design for photos and film; the LOOP tier; the price wording.

## [blocker] Route / root-layout architecture (all keys)

There are three incompatible trees, plus a fourth path in motion-engineering.
- design-system: roots (legacy) / (v2-id) / (v2-en). The single (legacy) root keeps lang='id' + SetLang, so EN legacy pages stay wrong until migrated.
- page-architecture: one root per locale ((public)/layout.tsx and en/layout.tsx) with nested (legacy)/(v2) groups. On client navigation, legacy globals.css (h1–h6 Bricolage font, cream body, html scroll-behavior:smooth at globals.css:62) bleeds into v2 pages. This is exactly what design-system §1 warns about.
- build-plan: four roots (legacy) / (legacy-en) / (v2) / (v2-en).
- motion-engineering: template.tsx at src/app/(frontend)/(public)/(v2)/.

**Fix:** Adopt build-plan's four root layouts: (frontend)/(legacy), (legacy-en)/en/…, (v2), (v2-en)/en/…, plus src/app/global-not-found.tsx with experimental.globalNotFound (verified in the Next 16.2.6 docs).
- Put design-system's tokens.css/fonts.ts/@config isolation only in the two v2 roots.
- Move ViewTransition template.tsx to (v2)/template.tsx and (v2-en)/template.tsx.
- Use Tailwind globs './src/app/[(]frontend[)]/[(]v2[)]/**/*.{ts,tsx}' and '[(]v2-en[)]'.
- Rewrite page-architecture §2 and motion-engineering §4 paths to match.

## [blocker] build-plan vs design-system/motion-engineering deliverables

Build-plan Phase 1 re-specifies the system from final.md instead of consuming the sibling blueprints. Differences:
- Its own tokens (--putih, .s-kertas, data-surface, --accent/--accent-lg) cannot express the hour/stage key light on a given ground (e.g. crimson key on a Kertas Social page).
- A single 'Archivo Fallback' face, which design-system proved cannot be tuned (Arial Narrow Bold 85.9% vs Arial Bold 70.4% size-adjust).
- Escaped globs './src/app/\\(frontend\\)/\\(v2*\\)/**'. I re-tested with the repo's Tailwind 3.4.19: backslash form = 0 matches, [(]…[)] = matches.
- next/dynamic RichLayer, where motion-engineering deliberately avoids next/dynamic.
- A port of the old sz/ prototypes instead of the rewritten src/motion.
- A src/components/v2/* tree, while design-system uses src/components/{ds,sections}, page-architecture src/components/v2/{site,templates} and motion-engineering src/motion.
- The file names are inconsistent across keys: SiteObserver vs RevealObserver, MotionRoot vs RichGate vs RichLayer, PageFrame vs PageShell.

**Fix:** Rewrite build-plan Phase 1 so it copies blueprint/design-system/{tokens.css,tailwind.tokens.ts,tailwind.v2.config.ts,fonts.ts,check.mjs} and blueprint/motion-engineering/src/** verbatim.
- Fix one component tree, e.g. src/components/ds (primitives, chrome), src/components/sections, src/motion, src/components/instruments.
- Use one name per component: SiteObserver, RichGate, PageShell.
- Delete the build-plan token and font specs, and point its gate at scripts/check-tokens.mjs.

## [blocker] Canvas sequence: frame count, budget, player

The direction's ladder cannot reach 2.5 MB. asset-production measured 46–66 KB per photographic frame: 120 frames ≈ 7.9 MB, and even the bottom rung (96 frames @1120w q60) ≈ 4.4 MB. Its fix is 25 frames with a runtime blend of neighbouring frames, but the pieces were never lined up:
- motion-engineering's player draws only the nearest bitmap (sequence-player.ts:103, a single drawImage) and is tested for 120 frames with stops 0/40/80/119.
- build-plan and motion-engineering budget tables still say 120 frames with 600×800 phone keyframes.
- asset-production says 800×720.
As specified, the Overture either blows the budget or scrubs in visible steps.

**Fix:** Set frames.count=25, giving stops 0/8/16/24 and files f0001/f0009/f0017/f0025.
- Patch sequence-player paint(): x=p*(n-1); draw floor(x); if frac>.01 draw ceil(x) with globalAlpha=frac. Reserve both bitmaps in the window.
- Extend sequence-core.check.ts to assert blend alpha.
- Ladder: 37 frames (≤65 KB/frame) → 25 → q60 → 1120w, gated by frames.sh ≤2.5 MB.
- Phone keyframes 800×720 (40 KB measured).
- Update every budget table (motion-engineering budgets, build-plan Budgets, page-architecture home §05).

## [major] SSR contract: .js pre-state timing

design-system fonts.ts PRE_PAINT adds html.js before first paint, and build-plan P1 specifies 'an inline head script that sets html.js'. motion.css keys the hidden pre-states on it: .js [data-reveal='split'|'words'|'inst']:not([data-in]) … translateY(110%), .lk-cite, .lk-chat bubbles.
- If the SiteObserver chunk is blocked, slow or throws, H2 words, citation chips and chat text stay masked at rest (fails the blocked-chunk gate).
- H2s visible at load flash.
motion-engineering's contract ('html.js set by SiteObserver after its first scan') is the correct one.

**Fix:** Remove d.classList.add('js') from PRE_PAINT and from the build-plan head script. The pre-paint script only restores .mode-teks, and SiteObserver sets html.js after marking on-screen [data-reveal] elements data-in. Keep states.cjs's blocked-chunk run (route.abort on /_next/static/chunks/* except framework) as a hard gate.

## [major] Chrome placement (motion-engineering §4 step 5 vs page-architecture PageFrame)

motion-engineering renders SiteHeader, the menu dialog, .bottom-bar, .wa-pill and <main data-sky> inside the (v2) layouts. A layout has no pathname or page props, so it cannot know:
- the LanguageLink alternate (the cause of today's /en/index and /en/layanan/local-seo 404s)
- the per-page WhatsApp prefill on the pill, bar and closing band, which is the only lead attribution that survives without GA4
- whether the page opens dark (Contact, Paid Ads, AI), which the pre-hydration main[data-sky='dark'] header fix needs.

**Fix:** The layout holds only SiteObserver, RichGate, DayDial and the skip link. Each page renders <PageShell locale alt={{id,en}} wa={prefill} sky='light|dark'> containing SiteHeader, MegaMenu, MobileMenu, WaPill, BottomBar, <main data-sky>, ClosingBand, HouseLights and SiteFooter (as page-architecture and build-plan already specify).

## [major] SEO: data-nosnippet on <figure>

design-system MockFrame is '<figure data-nosnippet>' and motion-engineering ProofLoupe.tsx:24 renders <figure className='lk-proof' data-nosnippet>. Google honours data-nosnippet only on span, div and section, so fictional mock data ('Kedai Contoh', contohkedai.id, Brand A/B/C share-of-voice, sample GSC ranges) can surface in snippets and AI Overviews as page facts about Logink. Also:
- The mocks include look-alike WhatsApp buttons (E3, E4, E11) inside aria-hidden containers.
- aria-hidden with focusable descendants is an a11y violation.

**Fix:** Use <figure><div data-nosnippet inert>…mock…</div><figcaption class='mock-label'>Ilustrasi · data contoh</figcaption></figure>.
- Build mock buttons as <span>, never <a> or <button>.
- Add a CI lint: rg -nP '<(?!div|span|section)\w+[^>]*data-nosnippet' src must be empty, plus an axe check for aria-hidden-focus.

## [major] Fabricated/false claim: written prices

The FACT_STRIP line 'Harga tertulis di setiap halaman layanan' and the new hub H1 'Layanan Digital Marketing 360° di Jakarta: Harga Tertulis untuk Setiap Layanan' (EN 'Written Prices for Every Service') are false.
- Social and Creative have no prices: social/data.ts says 'Harga kustom…', and page-architecture itself says none are shown.
- The AI page has none either.
- 'Laporan GA4 setiap bulan' is asserted for all services, but GA4 appears only in the seo, ads and website data.

**Fix:** Use a true alternative:
- Hub H1: 'Layanan Digital Marketing 360° di Jakarta: Harga dan Paket Setiap Layanan'.
- Fact: 'Harga mulai tertulis untuk SEO, Local SEO, Iklan dan Website; Social & Kreatif: proposal dalam 24 jam'.
Otherwise make the claim conditional on owner decision (Social/Creative module prices). Give each FACT_STRIP entry a source field pointing to the data.ts line it comes from, and have services.check.ts fail when a claimed price is missing for any live service.

## [major] Accessibility: WCAG 2.2.2 (A) pause control

The 8 s looping hero film (desktop) and the infinite crawler-log ticker start automatically and run in parallel with content, but only pause offscreen or on hover. There is no user control in design-system FilmLoop or in motion-engineering films()/.lk-ticker (the references key found this; the other keys did not adopt it).

**Fix:** Add a <button type='button' aria-pressed> 'Jeda film'/'Lanjutkan film' (EN 'Pause film'/'Play film') at the end of the film caption line on Putih.
- It is 44px with a focus ring and lives inside the desktop-only film code, so phones ship 0 KB.
- Remember the state in sessionStorage with try/catch.
- Give the ticker the same toggle, or pause it on :focus-within plus a 'Jeda' button.
- Make the phone poster push-in one-shot.

## [major] Menus: selector-list invalidation (browserslist Safari 16.4, Firefox 111)

motion.css:93–94 '.lk-menu[open], .lk-mega:popover-open { opacity:1 }' and the matching @starting-style list. :popover-open is unknown in Safari 16.4–16.x and Firefox 111–124, both inside the repo browserslist, so the whole rule is dropped. The phone <dialog> menu then opens at opacity 0: an invisible, focus-trapping modal. Also, [popover] without UA support renders as normal in-flow content (invisible at opacity 0 but clickable). This is the same class of trap design-system caught for :has().

**Fix:** Split the rules: .lk-menu[open]{…} and .lk-mega:popover-open{…} separately (or use .lk-mega:is(:popover-open)), and do the same inside @starting-style. Add @supports not selector(:popover-open){ .lk-mega{display:none} } so the 'Layanan' trigger falls back to a link to /layanan. Add a Playwright run on WebKit 16.4 and Firefox 115 ESR that opens the menu.

## [major] Phone chrome: bottom bar covers content

.bottom-bar is fixed, 56px plus safe-area. Neither tokens.css nor motion.css adds body padding-bottom or scroll-padding-bottom, so on phones:
- the last 56–90px of every page (footer legal links, Mode teks checkbox, AI disclosure, ©) is permanently under the bar
- focused elements near the bottom are obscured (WCAG 2.4.11 AA).

**Fix:** @media (max-width:1023px){ body{padding-bottom:calc(var(--bar-h) + env(safe-area-inset-bottom))} html{scroll-padding-bottom:calc(var(--bar-h) + env(safe-area-inset-bottom) + 8px)} }. On /contact the same padding applies (WhatsApp only). Extend render.cjs to assert that the last footer link is not covered at 390×844.

## [major] AA matrix vs lamp and coral glow

The cursor Lamp is specified as a screen-blend pool 'under the text' on Senja and Malam. The motion.css radial uses 40% of --lamp at the centre. With Jingga on Malam, the background under the pointer becomes about #6A4442 (computed):
- Jingga links ≈3.3:1
- Cahaya 70 ≈4.0:1
- coral datelines on Senja fall below 4.57 in the same way
The Bab III coral glow sits at the top of Senja, where the dateline is. The CI AA matrix checks only flat grounds, so the claim 'every text node on a flat surface' is false while the pointer moves.

**Fix:** Clip the lamp to media only (film, photo, phone stage), never under text rows, or cap the centre at ≤10% and prove it by sampling.
- End the glow above the first text row.
- In render.cjs, hover the pointer over each [data-lamp] text node and re-run the contrast check on the computed backdrop.

## [major] Lead Profiler server save (build-plan defect #1 is wrong)

Build-plan says the profiler 'collects no email', so it drops the server-side save the direction requires and proposes a migration. That is wrong: src/components/public/LeadProfiler.tsx:211/444 collects nama, bisnis, email and wa, and contactValid requires email. The brief is far longer than zod's message.min(10). page-architecture's POST {name, email, company, phone, services:[key], message: brief, source:'lead_profiler'} passes today's /api/contact schema and ContactSubmissions unchanged.

**Fix:** Keep the server save with no migration.
- Add a honeypot field and a simple per-IP rate limit (Vercel WAF rule or an in-route check). /api/contact is a public overrideAccess write.
- Remove build-plan's optional migration and defect #1.

## [major] Asset brief contradicts the AA fix

asset-production E5 ('P6 (direction text, unchanged)') still tells Claude Design to set 'ILUSTRASI · DATA CONTOH' in Archivo 12px #EE3D5E on Senja Dalam. That is 4.06:1, banned, and fixed by design-system. E8 also uses different key/string colours from design-system JsonLdFragment.

**Fix:** Edit prompts.json E5/P6: label = .mock-label in --ink-2 (#B9B3C9, 7.69:1). Use design-system's colour roles for every instrument brief ('use tokens.css role classes only; no hex'). Re-render nothing: the instruments are not built yet.

## [major] Tailwind purge of component classes

design-system tailwind.v2.config.ts scans only src/components/ds, src/components/sections and the v2 app groups. The component classes (.t-title, .house-lights, .day-dial--progress, .ribbon-horizon, .chip, .tbl) live in @layer components and are purged when not seen. motion-engineering's primitives.tsx (FrontPageTitle, HouseLights, DayDial, RibbonHorizon) lives in src/motion, which is not scanned, and neither are page-architecture's src/components/v2/**.

**Fix:** Add './src/motion/**/*.{ts,tsx}' plus the final component tree to content. Add a CI step: compile, then assert every class token used in TSX className strings that is defined in tokens.css exists in the output.

## [major] Asset storage and path contradictions

Paths disagree across keys:
- Canvas frames: page-architecture public/media/overture/f0001–f0120; motion-engineering /seq/rooftop-v1/d1280/…; asset-production public/media/atap-tebet-<sha8>/d1280/f0001–f0025; build-plan Vercel Blob overture/d/0000–0119; references rooftop-000…
- Hero film: public/media/home/buka-1920.webm vs public/media/buka-<sha8>/ vs Blob vs /film/*.
- Cache headers: vercel.json /seq/* and /film/* vs next.config headers /media/:path*.
- OG images: page-architecture /og/{locale}/{leaf}.jpg; asset-production public/og/{lang}-{key}.jpg (48 files already rendered); build-plan colocated opengraph-image.jpg.

**Fix:** Publish one path table, owned by asset-production because its files exist:
- public/media/<asset>-<sha8>/… with next.config headers source '/media/:path*' immutable, plus the 206 range check
- frames d1280/fNNNN.webp and key-m/k1–4.webp
- OG public/og/{lang}-{key}.jpg wired in buildMetadata
Drop colocated opengraph-image and nested /og/{l}/. Update the ScrollSequence prop examples, page-architecture data sources and build-plan brand-assets.json.

## [major] Owner ingredient: 'Imagery via Claude Design'

The owner asked for imagery via Claude Design. The blueprint routes every photo, plate and film through Figma Weave (Nano Banana Pro, Veo/Kling), with Claude Design only for the HTML scene, instruments, OG and case covers. asset-production does not present this as a deviation. Weave is also unlinked (verified by the asset key), so every generated still is blocked.

**Fix:** Add an explicit owner decision to the owner list: 'Photographic stills/film: Figma Weave (Claude Design cannot produce photoreal plates/video); Claude Design: scene composite, instruments, OG, case covers'.
- Fallbacks: Canva generate-image for stills; imageless service heroes (instrument card only); graded-still film.
- Record the answer in DESIGN.md v2's decisions log.

## [major] URL preservation in build-plan Phase 0

Build-plan contradicts page-architecture's redirect plan:
- It returns notFound() for '/en/blog/<id-slug> without EN content'. /en/blog/apa-itu-social-media-engagement returns 200 today; page-architecture 308s it to /blog/…
- Its redirect list adds only 8 of the 27 registry redirects, missing /en/layanan/*, /en/services/<id-slug>, /pricing and the page-code 308s for EN post/case ID slugs.
- Its sitemap gate expects 10 category URLs, while page-architecture noindexes and omits the 7 zero-post categories.

**Fix:** Phase 0 imports REDIRECTS from page-architecture's services.ts (27 entries) and implements its page-code 308s. Never turn a URL that returns 200 today into a 404. The sitemap gate becomes 44 URLs (28 static + 7 posts + 6 cases + 3 indexable categories).

## [minor] Header logo mechanism

design-system uses a server header with one <LogoFull theme='light' className='logo-auto'> plus a CSS fill override (verified: theme only changes the 'Log' tspan fill). motion-engineering uses a client HeaderLogo island with useHtmlAttr('data-sky') that re-renders the theme prop. Build-plan says 'switches theme by prop'.

**Fix:** Pick design-system's CSS override: 0 JS, no hydration re-render, same pixels. Delete HeaderLogo/useHtmlAttr and keep the LogoFull visual-diff test.

## [minor] Mode teks persistence key

design-system PRE_PAINT reads localStorage 'lk-mode-teks' ==='1', but motion-engineering SiteObserver writes 'lk-teks' and its TEKS_SCRIPT reads 'lk-teks'. Mixing the two means the choice is never restored.

**Fix:** Use one key, 'lk-mode-teks', in SiteObserver.tsx:123–124, TEKS_SCRIPT and fonts.ts. SiteObserver also sets #mode-teks.checked on load.

## [minor] Cursor attribute contract

design-system WaButton sets data-cursor='wa'. cursor.ts treats data-cursor as the label text and reads the tone from data-cursor-tone, so WhatsApp controls would show an Aspal disc labelled 'wa'.

**Fix:** WaButton emits data-cursor={t('Chat WhatsApp')} data-cursor-tone='wa'. Document the attribute contract once in DESIGN.md v2 §10.

## [minor] Phone Overture mechanism and LOOP tier

The phone keyframe crossfade differs by key: CSS view-timelines (direction, design-system, asset-production, build-plan) vs T1 data-step (motion-engineering, which is better: it works in Firefox and Safari <26 at 0 extra bytes). The LOOP tier is restored by motion-engineering, recommended cut by asset-production and kept by build-plan.

**Fix:** Adopt motion-engineering's data-step band. Decide LOOP: default cut, because low-memory desktops get the STEP tier. Update final.md/DESIGN.md v2 and remove the ffmpeg LOOP path from the schedule.

## [minor] JSON-LD visible-text CI definition

The rule 'every JSON-LD string ≥20 chars is visible' fails as written on every @id, url, logo, sameAs, item and date. Some generated strings (knowsAbout, audience.audienceType) are not visible anywhere.

**Fix:** Exclude keys @id, @type, @context, url, logo, image, sameAs, item, *Date*, priceCurrency, unitCode and any URL-valued string. Build knowsAbout from visible service names and drop audienceType unless it is shown.

## [minor] Budget inconsistencies

The budgets disagree:
- Initial JS: motion-engineering says home ≤170 / service ≤150 KB; build-plan says service ≤170 / home ≤200 KB.
- Inlined CSS: design-system says ≤40 KB raw, but tokens.css (26.3 KB) + motion.css (15.8 KB) = 42.1 KB before any page utilities; build-plan says ≤82 KB.
- Build-plan's 'own motion ≤6 KB' ignores motion-engineering's 9.08 KB motion-dom springs in the rich chunk.

**Fix:** One budget table in DESIGN.md v2 §14: fonts 100,472 B; inlined CSS ≤48 KB raw per page; initial JS home ≤200 / service ≤170 KB transfer; T1 ≤3.4 KB gz; T2 rich ≤17 KB gz + player ≤2.2 KB gz. Gate them all in perf.cjs.

## [minor] Next 16 images config

Next 16 requires images.qualities (docs: 'required starting with Next.js 16'). Build-plan's next.config omits it, so the hover float's quality 60 won't be honoured and the 50 KB budget breaks. Posters served through next/image are re-encoded (AVIF first), so they aren't pixel-identical to video frame 1, and a cold-cache AVIF encode can delay LCP.

**Fix:** Add qualities: [60, 75] (as asset-production does). Serve the film posters and the canvas poster as pre-encoded WebP with unoptimized plus a preload/fetchpriority=high, so the poster→video swap stays invisible.

## [minor] Bundle gate command

Build-plan's gate 'ANALYZE=true pnpm build shows no framer-motion in the (v2) initial chunk' produces nothing: @next/bundle-analyzer is webpack-only, and Next 16 builds with Turbopack by default. The 0 KB-on-phones result was measured on an esbuild fixture, not a real Next build.

**Fix:** Use 'pnpm next build --experimental-analyze' (verified in the CLI) or 'ANALYZE=true pnpm next build --webpack'. Make motion-gate.cjs (a body scan of downloaded scripts on a touch profile) against the Vercel preview the enforced gate.

## [minor] Offer JSON-LD on home/hub

design-system ServicesTable (used on home and /layanan) says 'Offer JSON-LD from the same facts', and final.md §03 agrees. page-architecture says no Service/Offer on home and no Offer on the hub.

**Fix:** Follow page-architecture: Offers only on service pages; home and hub reference {service}#service via ItemList. Remove the Offer note from ServicesTable.

## [minor] Local SEO Maps iframe

design-system (MapsEmbed), build-plan P3 and motion-engineering device QA assume a Maps iframe on Local SEO. None exists (verified: LocalSeoMap is an SVG mock; no iframe in the localseo components).

**Fix:** Drop MapsEmbed and the iframe QA items until owner decision 8 supplies Logink's GBP. Then add a click-to-load facade with data-lenis-prevent and data-cursor='hide'.

## [minor] Contact page rendering and form ground

page-architecture makes /contact dynamic to read ?layanan=, which adds a function call and DB fetch per request and contradicts 'marketing pages fully static'. Existing CTAs use ?service=. The form is placed on Kertas, while design-system allows forms only on Putih, where crimson error text is valid.

**Fix:** Keep /contact static. Read ?layanan (and legacy ?service) in the ContactForm island with useSearchParams inside <Suspense>. Put the form on a Putih inset.

## [minor] Missing or unsafe logo assets

page-architecture's Organization logo is /images/logo-512.png, which no key produces. asset-production's logo-light.svg keeps a live <text> in system-ui fonts, so crawlers and social renderers draw the wordmark in arbitrary fonts.

**Fix:** Export an outlined-path SVG and a 512×512 PNG of LogoFull theme='light' (Logo.tsx unchanged) into public/images/, and list them in asset-manifest.json.

## [minor] Overture fallback when plates never arrive

Build-plan says 'ship the CSS keyframe tier if frames are late', but the keyframes and SSR poster come from the same plate render pipeline, which is blocked on Weave. There is no image-less fallback.

**Fix:** Define one: the Overture on flat Kertas with the live-HTML phone stage, the day-dial strip and step text, with the poster slot omitted (no <img>). The canvas and keyframes are added later with no URL or content change.

## [minor] Service hero LCP

The service hero still is 'eager, fetchpriority low', about 42vw × 4:5 on desktop. It is larger than the H1 block, so it becomes the LCP element and loads late, contradicting the 'LCP element is the H1' gate.

**Fix:** Keep the still smaller than the H1's rendered area on desktop, or make it lazy and below the first viewport on phones. If it must stay large, give it priority, keep it ≤120 KB and change the gate to 'LCP ≤2.0 s'.

## [minor] Honesty in H1s and stats

The AI H1 'Brand Anda Dikutip di Google AI Overview…' reads as a promised outcome next to 'Kami tidak menjamin kutipan' (and still lacks GEO & AEO). The APJII stat chip says 'APJII' but links to a paywalled Kompas.id article. AI_BASELINE is rendered on home without gating on owner decision 7.

**Fix:** Use 'Jasa SEO AI (GEO & AEO): Agar Brand Anda Layak Dikutip di Google AI Overview, AI Mode, dan ChatGPT'. Label the chip 'APJII via Kompas, 2025' or link the APJII report. Gate AI_BASELINE on a registry flag that defaults off until the owner approves.

## [minor] Minor contract drift

Smaller mismatches between keys:
- SiteObserver: design-system reads the computed --sky; motion-engineering needs data-sky attributes, which design-system Section doesn't emit.
- Hours: page-architecture labels 15.10 'Siang' against hourInfo 'Sore'.
- AI hero header: page-architecture says Senja, but the design-system header is Putih/Malam only.
- DESIGN.md: build-plan rewrites it in P1 while legacy pages still exist; design-system keeps v1 plus docs/DESIGN-v2.md until cleanup.
- Redirects: permanentRedirect() in page code degrades to a meta refresh if the segment streams (loading.tsx/Suspense).

**Fix:** Fixes, one per item:
- Section emits data-sky derived from ground.
- hourInfo() is the only source of dateline words.
- The AI hero header stays Malam.
- Follow design-system's DESIGN.md sequencing.
- Keep slug-pair redirects free of loading.tsx above them, or generate next.config redirects from CMS slug pairs at build.

## Strengths
- URL preservation is complete. All 35 live sitemap URLs (refetched 2026-09-27) plus the 4 ID and 3 EN posts, 10 category URLs, 3 case pairs, 404 and infra routes are mapped. The 27 registry-generated single-hop 308s match the repo routes and the captured statuses (/index 200 duplicate, /en/index 404, /services/local-seo 404, /layanan/<cms-slug> 200 duplicates, CMS slugs confirmed).
- One src/lib/services.ts registry drives nav, footer, the switcher, sitemap, hreflang, llms.txt, Offer schema, H1 strings and redirects, with a runnable check and a negative test. The svcHref('ai') → #ai-search fallback removes the dependency on the optional page.
- design-system turns the hour/stage/ground idea into plain CSS whose allow-list is the AA matrix, backed by check.mjs mutation tests. It also caught real traps: bare :has() on Firefox 111–120, escaped Tailwind globs (I re-verified: 0 vs 2 matches), LogoFull defaulting to theme 'dark', --font-sans changing the wordmark, and the clamp ratio >2.5 failing WCAG 1.4.4.
- motion-engineering: phones get 0 KB of motion JS (plain import() behind media-query gates, verified by a body scan). SiteObserver sets html.js only after its first scan, so a blocked chunk hides nothing. ScrollSequence was rewritten with a byte-budgeted ImageBitmap window. The claim that ViewTransition works without the flag holds: in Next 16.2.6 the flag appears only in the config schema, react 19.3.0-canary exports ViewTransition, and react-dom calls startViewTransition.
- asset-production measured instead of assuming, and exposed the direction's canvas budget defect (66 KB/frame). It shipped working scripts (drift gate, LUTs, frames.sh, OG renderer) and 47 OG drafts of 16.7–46 KB. It also fixed composition, location and naming bugs (f0001 naming, 4:5 hover float, one ribbon-coloured object per frame, Tebet location).
- build-plan's rollout mechanics are sound: one revertable git mv swap commit per page group, staged `vercel --prod --skip-domain` then pnpm qa then promote, zero schema changes, and Media imageSizes kept. I verified Media already has thumbnail/card/og/featured, so the WebM, formatOptions and clientUploads changes are config-only. It also flags the shared Neon DB for previews and puts Phase 0 SEO fixes on today's site first.
- Honesty rules are consistent across keys. Clients, testimonials, team and results are never generated. Proof slots collapse to offer facts or 'Cara kami mengukur'. Every AI asset carries a caption and a manifest entry. Mocks are labelled 'Ilustrasi · data contoh' with no dates or 'Live' badges. Unsourced ROAS/CTR claims are dropped.
- Every owner ingredient has a concrete home, an engineering entry and an asset or a live-HTML equivalent: editorial type (Archivo width axis), immersive film (Buka), Lenis, pinned Overture and house lights, Bab II parallax, the scroll-scrubbed canvas, live-HTML product motion, the Bab III instruments, cursor, lamp, magnetic and loupe, AEO/GEO (Bab III, AI pair, answer blocks, llms.txt), and WebP/WebM. The references key added the one missing accessibility control (pause).