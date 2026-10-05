# 3 · Content (B): §3.7 home order · §3.8 service template

## 3.7 Home (`/`, `/en`): `sections/home/HomePage.tsx` (owner: Home)

`<PageShell locale alt={page('home').path} wa={page('home').wa[l]} sky="light" sheet={<HomeSheet/>}>`. Rhythm: Putih → Kertas → Putih → Kertas → Putih → horizon → Senja → Malam → Kertas sheet. Dark share ≈25% (cap 30%). At most 14 phone screens; 1,100–1,400 main-content words (floor 638/639).

| # | Component · `data-hour`/ground · id | Heading (ID / EN) | Content (source) | Media → no-asset fallback | Tier |
|---|---|---|---|---|---|
| 01 | `Hero` · 0530 Putih | H1 = `page('home').h1[l]` via `FrontPageTitle`: kicker `Agensi Digital Marketing 360° di Jakarta:` + lines `Ditemukan.` `Dipercaya.` `Dikutip AI.` (wide) `Dihubungi.` (EN `360° Digital Marketing Agency in Jakarta:` `Found.` `Trusted.` `Cited by AI.` (wide) `Contacted.`) | dateline `JAKARTA, 05.30 WIB — FAJAR · BUKA`; lede = `ENTITY[l]` with Stabilo on its first clause; WaButton (hero) + Minta Penawaran → `/contact#formulir`; `StageStrip strip` → `#ditemukan #dipercaya #dikutip-ai #dihubungi` | `FilmHero` with `buka`: 21:9 poster + film on desktop, 4:3 poster with one-shot push-in on phones, caption + pause button → **no `buka`: text-only hero, no media slot** | T0 rise, T2 film + lamp |
| 02 | `FactsStrip` · 0600 Kertas | none (label "Fakta pagi" as `.t-dateline`) | `<ul>` of 4 FACT_STRIP values (tnum); approved-case slot only when `APPROVED_CASE_SLUGS` is set; `ClientLogos` (≥6) | none | T1 hairline |
| 03 | `ServicesTable` in a `Section` · 0600 Kertas · `id="harga"` | `Layanan dan harga` / `Services and prices` | the one table (registry) | hover stills + thumbs from `jam-*` → rows without media | T2 hover still |
| 04 | `LeadProfiler` · Putih | `Mulai dari tujuan Anda` / `Start from your goal` | SSR first bot message + 7 chips: SEO, Local SEO, Iklan, Sosial media, Kreatif, Website, AI search (EN: …Ads, Social media, Creative…); without JS each chip is a wa.me link with a prefilled line; island adds localseo + ai paths (6 questions each, page-architecture §9), saves to `/api/contact`, final bubble repeats ANTI_SCAM | none | T1 island near viewport |
| 05 | `Overture` · Kertas · `data-steps` | `Sehari, satu pelanggan` / `One day, one customer` | `<ol data-runway>` of 4 `<li data-step-item><h3><p>` (40–60 words each, `home.ts`): 07.10 search + Maps, 12.40 Instagram + reviews, 18.05 AI answer cites (2), 21.30 WhatsApp | `atap`: `ScrollSequence` (25 frames desktop, k1–k4 phones, tablets use f0001/9/17/25) + `Phone panels` + canvas caption in the text column → **no `atap`: flat Kertas, `Phone panels` swapped by `data-step` (sticky on desktop, inline per step on phones), no `<img>`** | T2 canvas, T1 step |
| 06 | `BabPagi` · 0700 Kertas · `id="ditemukan"` | ChapterOpener: ClockNumeral 07.00 + H2 `Ditemukan di Google & Maps` / `Found on Google & Maps` (display word = stage name) | lead 40–60 words; H3 `Jasa SEO Profesional` + `seo.answer` + Price + name link; H3 `Jasa Local SEO & Google Maps` + `localseo.answer` + Price + link; `SerpToMaps`; "Catatan pagi": `CaseFileRow` when approved, else `MeasureBlock` | `Figure jam-0700-seo wipe` → opener without photo | T0 wipe, T1 inst |
| 07 | `BabSiang` · 1240 Putih · `id="dipercaya"` | `Dipercaya sebelum di-chat` / `Trusted before the chat` | H3s `Jasa Social Media Management`, `Jasa Desain Grafis & Video`, `Jasa Pembuatan Website & Landing Page`, each with answer, price or quote, link | collage: back `jam-1240-sosial` (the one descriptive alt) + `jam-1510-kreatif` (decorative); middle IgGrid + ReviewCard; front SiteFrame. Missing stills → the live-HTML layers only | T0 plx (desktop) |
| — | `RibbonHorizon` | text-free | — | — | T0 |
| 08 | `BabSenja` · 1805 Senja · `id="dikutip-ai"` + CoralGlow | `Dikutip AI` / `Cited by AI` | lead; 5 SourcedStats (`SOURCES` with `for` ⊇ home); H3 `Di balik layar`: ProofLoupe(AiAnswer + AnnotationLayer), PromptTable, SovBars, CrawlerLog (+ Jeda log), QueryFanout (phones: AiAnswer open, the rest in `<details>`); `AI_COMPARE` table on a Kertas inset + the customs line; `AI_BASELINE` (flag) + `Kami tidak menjamin kutipan.`; `ModeTeksLabel`; link `SEO AI (GEO & AEO)` via `svcHref('ai')` | `Figure jam-1805-seo-ai lamp` → none | T1 inst, T2 loupe |
| 09 | `BabMalam` · 2130 Malam · `id="dihubungi"` | `Dihubungi lewat WhatsApp` / `Contacted on WhatsApp` | AdToChat; H3 `Jasa Iklan Google & Meta Ads` + `ads.answer` + `Mulai Rp 6 Juta/bulan · management fee, di luar budget iklan`; CTA pair | `Figure jam-2030-iklan lamp` → none | CSS bubbles |
| — | ClosingBand (PageShell) | `Satu pesan cukup.` | registry | — | — |
| 10 | Sheet: `ProcessStack` | `30 hari pertama` / `The first 30 days` | Hari 1–3 Discovery · Hari 4–7 Strategi · Hari 8–30 Eksekusi · Berkelanjutan (from `HowWeWorkSection.tsx` STEPS) | — | T0 sticky |
| 11 | Sheet: `FaqSection` | `Tanya jawab` / `Questions and answers` | 6–8 answers (40–80 words): cost (links `#harga`), "Apa itu GEO dan AEO?" (customs line), "Apakah Logink bisa menjamin brand muncul di ChatGPT?" (honest no), contracts, reporting, Local SEO billing | — | — |

JSON-LD: `orgNode(l, full)`, `websiteNode`, `webPageNode` (about → org, dateModified = `page('home').updated`), `itemListNode` of the 7 `{service url}#service` ids, `faqNode`. No Service, Offer or VideoObject.

## 3.8 Service template (7 pairs): `sections/service/ServicePage.tsx` (owner: Service)

`<PageShell locale alt={svc(k).path} wa={svc(k).wa[l]} sky={light ∈ {senja, malam} ? 'dark' : 'light'} svc={k}>`. `c = content/services/<k>.ts default[l]`.

| # | Block | Heading ID / EN | Content |
|---|---|---|---|
| 01 | Breadcrumbs + Dateline | — | Beranda / Layanan / {name}; `JAKARTA, {hour} WIB — {part} · {STAGE}` |
| 02 | `ServiceHero` (hour = `svc.hour`, ground = `svc.light`) | H1 = `svc.h1[l]` via `H1Svc` | `c.lede`; `Price lead` (with "ditagih tahunan" where true); WaButton hero + Minta Penawaran `?layanan=k#formulir`; media column = `Figure jam-*` (lamp on dark heroes) with the `HERO_CARD` instrument overlapping its corner → **no still: the instrument card alone**. The still renders smaller than the H1 block on desktop (`sizes="(min-width:1024px) 34vw, 100vw"`, lazy, no `preload`), so the LCP is the H1. On phones it sits below the CTA pair. `min-height: min(100svh,1000px)` |
| 03 | `AnswerAndFacts` (Kertas inset on dark pages) | `Jawaban singkat` / `Short answer` | `AnswerBlock` with `c.answer`, `Diperbarui {svc.updated}` (no reviewer while `REVIEWER` is null) |
| 04 | … | `Ringkasan fakta` / `Key facts` | `FactList c.facts` (the price row is registry text) |
| 05 | `LoopPosition` | `Posisi di loop` / `Where it sits in the loop` | `StageStrip loop active={svc.stage}` + `c.loop` + sibling-stage links |
| 06 | `WhatWeDo` | `Apa yang kami kerjakan` / `What we do` | `<ol>` of H3 `c.work[].title` + text; sticky stage with `c.work[].card` per step on desktop, inline on phones |
| 07 | `PricingSection` `id="harga"` | `Paket & harga {name}` / `{name} plans & pricing` | tiers as SSR text + Badge populer; tier CTA `Pilih {tier}` → WaButton with `WA_PATTERNS.tier`; the Ads fee note; Social/Creative module lists as text + `QuoteBuilder` whose output is a WhatsApp link (existing builders; Social gets its ID twin); Website projects + "Jadwalkan Discovery call"; tier matrix `DataTable`. **Service + Offer JSON-LD mirrors the visible tiers exactly**: seo, localseo, ads, website only |
| 08 | `ComparisonSection` | `c.compare.caption` | seo: SEO vs Google Ads · localseo: Local SEO vs Google Ads vs Meta Ads · ads: Google Ads vs Meta Ads vs TikTok Ads (ADS_PLATFORMS) · social: modules (SOCIAL_MODULES) · creative: engagement types · website: Company Profile vs Landing Page vs Toko Online · ai: `AI_COMPARE` + customs line |
| 09 | `ProofSection` | `Bukti & data` / `Proof & data` | an approved case sentence (none today) → `Belum ada studi kasus publik untuk layanan ini.` + `MeasureBlock`; 3–5 SourcedStats `c.stats` |
| 10 | `ProcessStack` | `Proses` / `Process` | `c.process` (real durations) |
| 11 | `AiSearchReady` `id="ai-search"` | `Siap untuk AI search` / `Ready for AI search` | `c.ai` + link `SEO AI (GEO & AEO)`. On the AI page this block is replaced by `AiExtras` |
| 12 | `FaqSection` | `Tanya jawab seputar {name}` / `{name}: questions and answers` | `c.faq` (7–10, real PAA first) |
| 13 | `SourcesSection` | `Sumber` / `Sources` | `c.sources` + stat sources + `Diperbarui {svc.updated}` |
| 14 | `CrossSell` | `Cocok dikombinasikan dengan` / `Pairs well with` | `crossLinks(k)` |
| 15 | ClosingBand → house lights → footer | — | PageShell |

Variants:
- **SEO** (0700 Kertas): work H3s `Riset Keyword Bahasa Indonesia`, `Konten SEO & Artikel`, `SEO Teknikal & Core Web Vitals`, `Jasa SEO Bulanan: yang dikerjakan setiap bulan`, `Audit SEO`. Tiers 6 / 8 (Paling populer) / 15 Juta. FAQ adds "Apa itu jasa SEO?", "Berapa harga jasa SEO?", "Apa jasa SEO terbaik di Indonesia?" (criteria, never self-ranking). This page keeps every "jasa seo" term.
- **Local SEO** (0830 Kertas): the lightest build (stills + CSS; no film, canvas or iframe; no MapsEmbed until owner decision 8 supplies a GBP). Card SerpToMaps `maps` + ReviewCard; near-me queries list. "ditagih tahunan" on every price.
- **Paid Ads** (2030 Malam hero, body paper): card Funnel; work H3s `Jasa Google Ads`, `Jasa Meta Ads (Facebook & Instagram)`, `Jasa TikTok Ads`, `Marketplace Ads`; the fee note next to every price.
- **Social** (1240 Putih) / **Creative** (1510 Putih, dateline SORE): cards IgGrid / ContentCalendar; creative H3s `Desain Grafis`, `Edit & Produksi Video`, `Foto Produk`, `Copywriting`; `quote` text instead of a price; no Offer.
- **Website** (1630 Putih, SORE): card SiteFrame; H3s `Company Profile`, `Landing Page`, `Toko Online`; Offer `priceSpecification.minPrice 10000000`.
- **SEO AI** (1805 Senja hero, header Malam, `RibbonHorizon` directly after the hero into the paper body): card AiAnswer; `AiExtras` = Definisi (AnswerBlock + the margin note that it is written to be quotable), EngineTable (sourced), `Yang tidak bisa kami janjikan` (incl. `Kami tidak menjamin kutipan.`), BaselineLog (`AI_BASELINE` when live); "Di balik layar": ProofLoupe(AiAnswer + AnnotationLayer), PromptTable, SovBars, CrawlerLog, QueryFanout, JsonLdFragment, ReportFrame. The page owns "seo ai / GEO / AEO"; glossary posts own "Apa itu GEO/AEO". No Offer.

JSON-LD: org ref, `webPageNode` (dateModified = `svc.updated`), `serviceNode` (`{url}#service`, name, description = `c.answer`, provider, areaServed Jakarta + Indonesia, offers only from visible tiers), `breadcrumbNode`, `faqNode`.
