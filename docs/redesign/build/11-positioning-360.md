# 11 · Positioning amendment: 360° = one connected campaign, two ways to buy

Part of `docs/redesign/BUILD.md`. Written 2026-09-27 by the strategist pass and revised the same day after the critic pass (23 fixes applied). It amends `/Users/mm/logink/redesign-2026/directions/final.md` (the "Sehari Semalam" direction) and parts 03a, 03b and 03c of this build spec where they conflict. The 03c conflicts (hub lede, FAQ cap, word target) are declared in §7.2. Everything not named here stays as specified there.

Owner input behind it:
1. "360 means we can do the whole digital channel campaign, connected."
2. "We can do individual services and we can do 360 services."
3. Current services only: no new service pages and no new channels.

Tags used below:
- **[ada]**: supported by existing Logink copy. The file:line points at the live repo; `<svc>/data.ts` means `src/components/public/services/<svc>/data.ts`, which moves to `src/content/services/<key>.ts` in this build.
- **[KONFIRMASI]**: the owner must confirm it before it ships. Fallback wording is given in §3.6.

User-facing copy appears as ID first, then EN. The copy uses no em dash; the dateline "—" is the only one (DESIGN §16).

## For build agents: what to change

Apply these items mechanically. Each exact string is in the section cited; copy it from there. The package that owns each item is in brackets (full owner table: §12). **Launch state:** `CAMPAIGN_CONFIRMED` has K1–K6 and K11 all `false`, so every gated phrase ships as its fallback.

### A. Registry strings: `src/lib/services.ts` and friends [Core]
- [ ] `ENTITY.id` (line 34): insert `yang dijalankan ` before `satu per satu`, giving the §1.4 "ID (new)" sentence (319 chars). Re-check the hero on `spec-390.jpg`; if it no longer fits, change `yang sedang bertumbuh` to `yang bertumbuh`. `ENTITY.en` is already correct.
- [ ] `PAGES.home.h1`: **no change**. `PAGES.home.title`: already the §2.3 value; verify it.
- [ ] `PAGES.home.desc` (line 218): replace with §2.3 (`…dengan harga yang jelas…` 155 / `…with clear pricing…` 151).
- [ ] `PAGES.hub.desc` (line 223): replace with §7.1 (153 / 151). Hub H1 and title: no change.
- [ ] `PAGES.about.desc` (line 228): replace with §7.3 (157 / 149).
- [ ] `FACT_STRIP[1]`: §4.2 (keep `source: 'SERVICES'`).
- [ ] `ads.line` (line 122): delete `, termasuk iklan click-to-WhatsApp` / `, including click-to-WhatsApp ads` until K11 is confirmed. The ads H1 stays.
- [ ] `WA_PATTERNS.campaign360` (line 334): keep. It is the only 360° prefill; create no `WA_360` and no `OFFER_360.wa`.
- [ ] Add `WA_PATTERNS.upgrade(name)` (§6.1), `OFFER_360 = { name, line, anchor: 'kampanye-360' }` and `offerHref(l)` (§12).
- [ ] `meta.ts` `orgNode.description` = ENTITY in the page locale. llms.txt: ENTITY plus the 360° line (§11).
- [ ] `services.check.ts` `BANNED` and G4 grep #11: add `harga mulai setiap layanan|Every price is in|at published prices` (§12).

### B. Home sections [Home, unless marked]
- [ ] **01 Hero:** lede = ENTITY (Stabilo on the first clause); add the "Dua cara bekerja…" line under the CTAs (§4.1).
- [ ] **03 `#harga`** [Chrome]: `ModeChoice context="home"` between the H2 and ServicesTable. Each panel is eyebrow + H3 + one sentence, ≤150px at 390. Panel A has **no link** on home; panel B has one WaButton (§4.3). ServicesTable always renders the `<tfoot>` 360° row; there is no `mode360` prop.
- [ ] **04 LeadProfiler:** new first bot message; the 360° chip goes first (full width on phones), then `atau satu layanan:` and the 7 chips; add path `'360'` with 6 questions and its own `BUDGET_360_ID/EN`; POST `services: ['360']` (§4.4).
- [ ] **05 NEW** `sections/home/Campaign360.tsx`: `<Section id="kampanye-360" data-hour="0630" data-ground="kertas">`, containing:
  - `<Dateline hour="06.30" right="KAMPANYE 360°">` (no new prop);
  - the H2, then the lead with its K1 fallback;
  - `PILLARS` mapped to a `<dl>` (pillar 3 uses the narrow ownership line; pillar 4 uses its K1 fallback);
  - the CTA pair;
  - `CampaignMap table="details"` with **no `example`**;
  - the closing line `Harga atau cara penawaran…` (§4.5).
- [ ] **06 Overture:** see C.
- [ ] **07–10 Bab I–IV:** `chapters[].lead` from §4.7. Bab IV ships the K11 default ("Iklan yang mengantar ke landing page dengan tombol WhatsApp…") and the K4/K1 fallback third sentence. Service rows show the registry `line`, not `answer`.
- [ ] **Home-only trims, the same DOM at every width:** Bab II collage = IgGrid + ReviewCard (no SiteFrame); Bab III shows 3 SourcedStats and `AI_COMPARE` in a closed `<details>`; Bab IV AdToChat shows 2 bubbles. Do not use `display:none` on text and do not render a second copy.
- [ ] **ClosingBand** [Chrome]: new `text` for home, hub and other pages, and for service pages; on home and hub add the `Tanya soal Kampanye 360°` text link (§4.8).
- [ ] **11 ProcessStack:** card texts ≤25 words.
- [ ] **12 FAQ:** 7 items in the §4.9 order. No Q3 and no Q5 on home.
- [ ] **Measure G10 at 390×844.** If the page is more than 14 screens, drop QueryFanout from home. If it is still over, trim every pillar `dd` to ≤18 words (§4.10).

### C. Overture captions [Home, `content/home.ts` `overture`]
- [ ] H2 unchanged. Dateline right label `CONTOH KAMPANYE · KEDAI CONTOH` / `EXAMPLE CAMPAIGN · KEDAI CONTOH`.
- [ ] New one-sentence lead (§4.6).
- [ ] 4 steps, each `<li><h3>` + `<p class="t-chips">` + `<p>`, taken from the §4.6 table and paragraphs. Step 4 uses the landing-page wording ("iklan retargeting membawanya kembali ke halaman menu") and ships its K4 fallback (`Klik itu tercatat di GA4.`) and K1 fallback (`Di akhir bulan, review bersama tim menunjukkan…`).
- [ ] Unchanged: the phone panels, canvas, keyframes, `data-step` logic and the `Ilustrasi · data contoh` labels.

### D. Instruments [Instruments]
- [ ] `MockFrame`: add the optional `label?: string` prop. The default label stays.
- [ ] `instruments/CampaignMap.tsx` (§5):
  - **Frame:** `min(100%, 340px)` wide including labels, with `aspect-ratio: 1`. The ring diameter is the frame minus 144px.
  - **Ring:** 5 segments with `data-stage` + `stroke: var(--key)`, split at 06.30 / 10.00 / 17.00 / 20.00 / 23.00.
  - **Nodes:** placed at their hours with a 22° cascading push. WhatsApp uses `--c-wa` / `--c-wa-label` / `--wa-edge-w`; no hex.
  - **Text in the figure:** plain labels, the caption `Posisi di cincin = tahap utama setiap layanan.` and the night label.
  - **Chords:** no numbers, no markers and no legend.
  - **Chips:** a fieldset under the ring at every width. Each radio is immediately followed by its chip `<label>`, and each chip is at least 48px tall. The checked chip is Aspal with Putih text. Focus uses `input:focus-visible + label` with a 2px `--focus` outline.
  - **Lighting:** CSS only, via `.cmap:has(#cm-x:checked)`. There is no hover and no `data-cursor`.
  - **Linked table row:** a 2px Aspal left rule plus a Kertas tint.
  - **`focus` mode:** static, and draws only that node's chords.
  - **Motion:** a T1 reveal of segment opacity and dot scale, ≤900ms in total. There is no travelling dot, no chord flash and no pulse.
  - **Budgets:** DOM ≤180 nodes.

### E. Service-page module [Service]
- [ ] `content/campaign.ts` (Service is the only owner) holds:
  - `NODES`;
  - `EDGES`, the 19 rows of §3.3. Edge 16 is `ok: false, gate: 'K11'`, and edge 5's label is `tautan WhatsApp di profil Google`;
  - `PILLARS`, `NOTE`, `EXAMPLE` and `TABLE`;
  - `CAMPAIGN_CONFIRMED`, all `false`.
- [ ] `content/services/<k>.ts` ×7: replace `loop` with `campaign: { fedBy, feeds }` of type `CampaignItem` (with `gate` and `fallback`), using the §6.2 copy verbatim. Key fixes:
  - the Social `creative` item uses the "Dalam Kampanye 360°…" sentence;
  - the Local SEO items say `paket Growth` and `tautan WhatsApp`;
  - the Ads `website` item carries no tier detail;
  - the Ads `wa` item is `[K11]`;
  - the AI `report` item is `[K1]` with the `laporan bulanan` fallback.
- [ ] `sections/service/LoopPosition.tsx`: `id="kampanye-360"`, with the heading `Posisi dalam kampanye 360°`. In order it holds:
  - StageStrip;
  - `CampaignMap focus={k} table="none"`;
  - the `Diisi oleh` and `Mengisi` `<dl>`s;
  - the note on `bg-surface-alt` with a 1px `--line` border. The note's first sentence branches on `svc.price` (price or `proposal kustom dalam 24 jam`). It ends with the `offerHref` link and a WaButton with `WA_PATTERNS.upgrade(name)`.
- [ ] `serviceNode`: add `isRelatedTo: { "@id": "<hub url>#kampanye-360" }`.

### F. Hub and About [Hubs]
- [ ] Hub lede: keep the 03c lede, then append `Atau jalankan kanal yang Anda butuhkan sebagai satu Kampanye 360°: satu tim, satu strategi, satu data, satu laporan.` Ship it with the K1 fallback `…satu review bulanan.` (§7.2).
- [ ] Hub `ModeChoice context="hub"`, whose panel A links to `#harga`. `ServicesTable id="harga"` renders its `<tfoot>`.
- [ ] Add `sections/hub/Campaign360Offer.tsx`, `<Section id="kampanye-360" data-ground="putih">`, containing:
  - the H2 and the lead, whose middle sentence is `Kanal yang dipilih berbagi satu data dan satu review bulanan.` at launch;
  - `PILLARS` mapped to a `<dl>`;
  - `Cara memulai` and the line;
  - `CampaignMap table="open" example`;
  - the CTA pair.
- [ ] Hub FAQ: 8 items (see H). The word target is 1,200–1,700.
- [ ] `about.ts`: the "Cakupan 360°" card, and the entity paragraph set to ENTITY (§7.3).

### G. Schema [Core: `orgNode`; Hubs: hub graph; Service: `serviceNode`]
- [ ] Emit **no `hasOfferCatalog`**. Home `itemListNode` is unchanged (7 services).
- [ ] Hub `itemListNode` gets an 8th item, `{hub}#kampanye-360`. The hub emits the 360° Service node with no `offers`, no `priceRange` and no `serviceType` (§8).
- [ ] Offer appears only on seo, localseo, ads and website. FAQPage mirrors the visible questions.

### H. FAQ [Home: `home.ts`; Hubs: `hub.ts`]
- [ ] Home, 7 items:
  1. cost, with the 360° sentence appended;
  2. Q1;
  3. Q2;
  4. Q4;
  5. GEO/AEO;
  6. ChatGPT;
  7. the Local SEO billing question in the contracts slot until owner decision 6 is settled.
- [ ] Hub, 8 items: Q1, Q2, Q4, Q5, the Local SEO billing question and 3 existing questions. Q3 is a reserve that renders nowhere.
- [ ] At launch, Q1 ships its K1 fallback and Q4 ships its full fallback. Q2 and Q5 use the §9 text as written ("(atau penawaran)"; prices only for the 4 priced services). Every answer is 40–80 words.

### I. Chrome and forms [Chrome; Blog for the form]
- [ ] MegaMenu: the service columns come first, captioned `Satu layanan` / `One service`. The 360° card is the last column at ≥1280px and a full-width strip at 1024–1279px (§11).
- [ ] MobileMenu and SiteFooter: add `Kampanye 360° (semua kanal)` **after** the 7 services.
- [ ] CTA attributes: `data-service` accepts `'360'`, and `data-placement` accepts `campaign`.
- [ ] Contact form: first checkbox `Kampanye 360° (semua kanal)`, preselected by `?layanan=360`. `/api/contact` accepts `'360'`.

### J. Never ship
- Home: the example strip, a new Dateline prop, `CampaignPillars`, `mode360`, `WA_360` or `hasOfferCatalog`.
- The map: chord numbers, a legend, hover previews, `data-cursor` on a `<label>`, or `offset-path` / `stroke-dashoffset` animation.
- Any `display:none` on text.
- The phrases "Semua akun dan data", "harga tertulis" or "published prices" used for every service, "Banyak bisnis mulai", "tombol WhatsApp di profil Google", and any public minimum 360° scope.

## 0. Summary

- **What 360° means.** One campaign across every channel Logink runs, connected: one strategy, one idea adapted per channel, channels that feed each other, one data layer, one monthly report and one team. The Jakarta day stays, and it becomes the **proof**. The same customer meets the same campaign on four channels in one day, and overnight the data loops back into the next morning's plan.
- **Two ways to buy.** Both are visible from the hero down.
  - **(A) Satu layanan / One service:** today's service pages, prices and packages.
  - **(B) Kampanye 360° / 360° campaign:** priced by custom proposal. A client can start with (A) and connect more channels later.
- **Keywords (Ahrefs, ID).** "360" terms get 40–60 searches a month and have informational SERPs. "Terintegrasi" and "kampanye digital terintegrasi" have no measurable volume. The commercial head terms are "jasa digital marketing" (900, KD 2) and "digital marketing agency jakarta" (400, KD 9). Recommendations:
  - The home **H1 stays unchanged**.
  - The home **title changes** to lead with "Jasa Digital Marketing Jakarta".
  - The 360° offer gets **no URL of its own** (owner decision, default no). It lives at `/layanan#kampanye-360` and in a new home section.
- **New home section.** 'Satu kampanye, semua kanal' sits between the Lead Profiler and the Overture, on the Overture's Kertas ground, as its intro. It carries the **Peta kampanye 360°** instrument: CSS-only chips (one model at every width) and a real SSR table of the connections. The fictional example strip is on the hub only; on home the Overture directly below is the example.
- **Service pages.** 'Posisi di loop' becomes **'Posisi dalam kampanye 360°'**: what feeds this service, what it feeds, and the note 'Bisa sendiri, lebih kuat terhubung'. Copy for all 7 services is in §6.
- **Home length.** Estimated at about 13.9 phone screens, against the 14-screen gate. Every cut applies at every width, so no content is hidden by CSS. The cuts: Bab I–IV service rows shrink to one line, Bab III shows 3 stats, `AI_COMPARE` sits in a closed `<details>`, AdToChat shows 2 bubbles, and the Bab II collage drops SiteFrame (§4.10). If the gate measures more than 14, QueryFanout leaves home first.
- **Nothing unconfirmed ships as fact.** Eleven owner confirmations (K1–K11, §3.6) each have fallback wording. Click-to-WhatsApp ads (K11) and one combined report (K1) are not claimed until the owner confirms them.

## 1. Positioning

### 1.1 What "360°" means for Logink

The day direction treated 360° as a full turn of the sun. The owner defines it as the **whole digital campaign, connected**. The two definitions fit together:
- **The ring is the campaign.** 360° is every channel a business needs, run as one campaign. The ring has four stages, Ditemukan, Dipercaya, Dikutip AI and Dihubungi, and a campaign covers all four.
- **The day is the proof.** One customer meets one campaign at 07.10 on search and Maps, at 12.40 on Instagram and the website, at 18.05 in an AI answer and at 21.30 on WhatsApp.
- **The night is the loop.** Between 21.30 and 07.00 the data from every touch returns to one report. The next morning's plan is built from it.

The Jakarta day stays as the story. It stops being the definition of 360°.

**Positioning statement (internal, EN):**
> For Indonesian SMBs and growing brands that already run, or need to run, several digital channels, Logink is the Jakarta agency that runs them as one connected campaign. One team works from one strategy and one idea adapted per channel. Each channel feeds the others, and one data layer and one monthly report follow every lead to WhatsApp. Any single channel can also be hired on its own at a published price or a 24-hour quote.

### 1.2 Two ways to buy

| | (A) Satu layanan · One service | (B) Kampanye 360° · 360° campaign |
|---|---|---|
| What | Any one service on its own (SEO, Local SEO & Google Maps, Iklan, Social, Kreatif, Website, SEO AI) | Every channel the business needs, run by one team as one campaign |
| Price | Published tiers for SEO, Local SEO, Iklan and Website (registry `price`); a proposal within 24 hours for Social, Kreatif and SEO AI (registry `quote`) | Custom proposal (no invented price). The hub FAQ points to the published starting prices as a reference (§9 Q5) |
| Report | The monthly report of that service, for the monthly services SEO, Local SEO, Social and Iklan [ada]. Website and Kreatif are project-based and have no monthly report | One monthly report across channels plus one review with the team (K1, §3.6; until confirmed: each monthly service's report, discussed in one monthly review) |
| Upgrade | Start here, then connect more channels later. This is intent, from the owner's "individual services and 360 services"; it is not [ada] (`creative/data.ts:192` is a Creative sub-service FAQ) | Can start as a smaller scope and add channels |
| WhatsApp prefill | The existing per-service strings, verbatim (they are today's lead attribution) | `WA_PATTERNS.campaign360` (already in `services.ts:334`): `Halo Logink! Saya tertarik Kampanye 360° untuk bisnis saya.` / `Hi Logink! I'm interested in a 360° campaign for my business.` It is the only source of this string |

**Minimum scope of a Kampanye 360° (K7: an internal sales rule, never published).** No page states a minimum. Sales uses this default until the owner answers K7:
- the channels cover all four stages, counting a service's `stage` **or** its `alsoStages` (so Local SEO + Website already qualifies);
- they run on one shared data layer;
- they meet in one monthly review (one report once K1 is confirmed).

K7 asks the owner to choose between **any stage** (the default above, which is loose) and **primary stages only** (which puts SEO AI and Iklan in every 360° campaign).

### 1.3 Vocabulary rules (all copy, both locales)

- **Name the offer the same way everywhere.** ID uses **"Kampanye 360°"** with a capital K. EN uses **"360° campaign"**. The adjective is **"terhubung"** / **"connected"**. Use "terintegrasi" only in the FAQ answer that defines the term (no search demand, §2).
- **Say "adapted", never "reused".** Write "satu ide diadaptasi per kanal" or "satu sesi syuting dipotong per format". Never write "materi dipakai ulang". `ads/data.ts:223` states "Tidak ada materi yang dipakai ulang antar platform", and the Creative copy says "Satu syuting, banyak output" (`creative/data.ts:103`). Both stay true only if we say adapted.
- **Don't imply everything is mandatory.** Every 360° mention within one scroll of it also says a single service is fine: "Anda tetap bisa mulai dari satu layanan".
- **No outcome numbers for 360°.** Logink has no public multi-channel case. The one example is fictional and always labelled **'Contoh kampanye'** / **'Example campaign'**, with the fictional **Kedai Contoh** from `content/instruments.ts`.
- **"Every channel" means Logink's current channels only** (§3.1). The copy never names email, SMS, marketplaces-as-organic, PR or offline media as 360° channels.
- **Never say every service has a written price.** Four services have a starting price (SEO, Local SEO, Iklan, Website); Social, Kreatif and SEO AI get a proposal within 24 hours. Say `harga yang jelas`, `harga atau cara penawaran` or `harga (atau penawaran)`, never `harga tertulis` / `published prices` for all.
- **Account ownership is narrow.** Say `Akun iklan, GA4, dan Search Console tetap milik Anda.` / `Ad accounts, GA4 and Search Console stay yours.` (`ads/data.ts:264`, `seo/data.ts:126`). Never "semua akun dan data".
- **Gated words.** `satu laporan`, `one report`, `one monthly report`, `laporan kampanye` and `campaign report` are K1 phrases. `click-to-WhatsApp` as something Logink's ads do is a K11 phrase. Each has a fallback (§3.6).

### 1.4 Canonical entity sentence (replaces registry `ENTITY`)

It changes one clause: "yang dijalankan sebagai satu sistem yang terukur" becomes "yang dijalankan satu per satu atau sebagai satu kampanye terhubung". The sentence now states both ways to buy.
- The ID sentence grows from 301 to 319 characters. Re-check the hero on `spec-390.jpg`. If the lede no longer fits, change "yang sedang bertumbuh" to "yang bertumbuh" (−7).
- The EN sentence grows from 268 to 286 characters.
- `services.ts:34` currently holds a draft without "yang dijalankan", which leaves the ID sentence with no verb after the list. Core replaces it with the ID (new) row below.

| | Sentence |
|---|---|
| ID (old) | Logink adalah agensi digital marketing 360° di Jakarta untuk UMKM dan brand yang sedang bertumbuh di Indonesia: SEO & konten, Local SEO & Google Maps, social media, iklan berbayar, kreatif, website, dan optimasi AI search (GEO/AEO), yang dijalankan sebagai satu sistem yang terukur sampai ke WhatsApp. |
| **ID (new)** | **Logink adalah agensi digital marketing 360° di Jakarta untuk UMKM dan brand yang sedang bertumbuh di Indonesia: SEO & konten, Local SEO & Google Maps, social media, iklan berbayar, kreatif, website, dan optimasi AI search (GEO/AEO), yang dijalankan satu per satu atau sebagai satu kampanye terhubung sampai ke WhatsApp.** |
| EN (old) | Logink is a 360° digital marketing agency in Jakarta for Indonesian SMBs and growing brands, running SEO & content, Local SEO & Google Maps, social media, paid ads, creative, websites and AI search optimization (GEO/AEO) as one measurable system that ends in WhatsApp. |
| **EN (new)** | **Logink is a 360° digital marketing agency in Jakarta for Indonesian SMBs and growing brands, running SEO & content, Local SEO & Google Maps, social media, paid ads, creative, websites and AI search optimization (GEO/AEO) one at a time or as one connected campaign that ends in WhatsApp.** |

Use it verbatim, as today, in:
- the home hero lede, with Stabilo on the first clause;
- the About page, the footer and llms.txt;
- `orgNode.description`;
- GBP and LinkedIn (owner to paste).

The Instagram bio limit is 150 characters, so the bio uses a short variant (owner to paste):
- ID `Agensi digital marketing 360° di Jakarta. SEO, Maps, social, iklan, kreatif, website & SEO AI: satu layanan atau satu kampanye terhubung.` (137)
- EN `360° digital marketing agency in Jakarta. SEO, Maps, social, ads, creative, web & AI search: one service or one connected campaign.` (131)

`AboutPage` also swaps "Lima layanan terintegrasi" for the 360° wording in §7.3.

## 2. Keyword check

**Source.** Ahrefs Keywords Explorer, country ID, 12-month average volume, pulled 2026-09-27 through the Ahrefs MCP (`keywords-explorer-overview`), plus Ahrefs SERP Overview (ID) for two terms. The numbers match `research/seo-data.md` (Ahrefs, 2026-09-26) where they overlap. Semrush was not used.

### 2.1 Data

| Term | Vol/mo (ID) | KD | CPC | Intent / SERP features | Read |
|---|---|---|---|---|---|
| digital marketing agency | 2,800 | 0 | $0.10 | commercial, local; AIO, local pack, PAA | Home head term (EN phrase, typed in ID) |
| digital agency | 1,400 | 0 | $0.15 | AIO, local pack | Broad |
| jasa digital marketing | **900** | **2** | $0.20 | commercial + transactional, local; AIO, local pack, PAA | **Biggest ID-language commercial term.** Top 10 has homepages (digitalmarketer.co.id DR 6 at #5, gosocial.co.id at #7) and service pages (fastwork, juicebox `/jasa-digital-marketing/`) |
| digital agency jakarta | 500 | 14 | $0.30 | local pack, sitelinks, PAA | Home |
| digital marketing agency jakarta | 400 | 9 | $0.35 | local pack, PAA | Home (EN H1 matches) |
| agency digital marketing | 400 | 32 | $0.04 | AIO, PAA | Home |
| kampanye digital | 400 | 0 | $0.03 | informational (parent "kampanye digital adalah") | Blog territory, not a service page |
| omnichannel marketing | 450 | 0 | $0.80 | informational | Not our word |
| integrated marketing communication | 600 | 0 | $0.15 | informational, academic | Not our word |
| digital marketing agency indonesia | 200 | 1 | $0.25 | AIO, local pack | Home/EN |
| digital marketing jakarta | 200 | 0 | $0.30 | local pack | Home |
| 360 marketing | 200 | 0 | $0.20 | informational; AIO | Definitional; also a US brand name ("Marketing 360") |
| jasa digital marketing jakarta | 150 | 0 | $0.45 | local pack, PAA | Home title |
| jasa digital marketing agency | 150 | 30 | $0.20 | local pack | Home |
| jasa digital agency | 150 | 25 | $0.10 | AIO, local pack | Home |
| agensi digital marketing | 100 | 12 | $0.25 | AIO, knowledge panel, PAA | Home H1 phrase |
| marketing 360 | 100 | 0 | $0.35 | informational | Definitional |
| integrated marketing | 100 | 0 | $0.20 | informational | Definitional |
| agency digital marketing jakarta | 70 | 7 | $0.30 | local pack | Home |
| digital marketing campaign | 70 | 1 | $0.15 | parent "contoh kampanye digital" | Informational |
| **360 digital marketing** | **60** | 0 | $0.20 | informational + commercial; AIO, local pack, PAA | See the SERP below |
| **digital marketing 360** | **40** | – | $0.25 | none recorded | Tiny |
| 360 marketing agency | 40 | – | – | – | Tiny |
| integrated marketing campaign | 20 | – | – | informational | Tiny |
| integrated digital marketing | 10 | 0 | $0.10 | informational | Tiny |
| jasa digital marketing 360 | no volume | 3 | – | – | None |
| agensi digital marketing 360 · agency digital marketing 360 · digital marketing 360 derajat · kampanye digital terintegrasi · digital marketing terintegrasi · jasa digital marketing terintegrasi · agensi digital marketing jakarta | no row returned (no measurable volume) | | | | None |

**SERP "360 digital marketing" (ID).** It is an AI Overview citing juicebox.co.id's article "Apa itu Digital Marketing 360 Derajat?" (DR 41) and a Glints job page. Below that:
- a local pack (Digital360, watchin360 Surabaya);
- PAA: "360 marketing itu apa?", "360 maksudnya apa?", "Apa itu agency 360?";
- organic results that are definitional articles (juicebox, stickearn, glints, accurate.id, mediatics), a LinkedIn page and one homepage (digital360.id at #10).

The intent is "what is it", not "hire one".

### 2.2 What the data says

1. **360° is a brand idea, not a keyword.** The whole "360" cluster is worth about 40–60 commercial searches a month plus about 400 definitional ones ("360 marketing", "marketing 360", "integrated marketing"). It earns its place in the H1 because it is the concept and costs nothing there. It cannot justify a page of its own (§2.4).
2. **"Terintegrasi / kampanye terintegrasi" has no demand.** Indonesians don't search for the category that way. Use "terhubung" as the brand word and answer the definitional PAA in the FAQ ("Apa itu digital marketing 360°?", §9).
3. **The home page is the agency-term page.** The SERPs for "jasa digital marketing" and "digital marketing agency jakarta" rank homepages, some with DR 6. Both the ID term (jasa, 900) and the EN term (agency, 2,800 / 400 Jakarta) belong on `/` and `/en`.

### 2.3 Home H1, title and meta (recommendation)

| Element | ID | EN | Change |
|---|---|---|---|
| **H1** (registry `page('home').h1`, CI gate) | `Agensi Digital Marketing 360° di Jakarta: Ditemukan. Dipercaya. Dikutip AI. Dihubungi.` | `360° Digital Marketing Agency in Jakarta: Found. Trusted. Cited by AI. Contacted.` | **None.** It is the entity phrase ("agensi digital marketing 360°") and matches the EN head term. The four stage words are what a connected campaign delivers. The specimen and CI string stay valid. |
| **Title** (≤60) | `Jasa Digital Marketing Jakarta: Agensi 360° \| Logink` (52) | `Digital Marketing Agency Jakarta: 360° Campaigns \| Logink` (57) | **Changes** from `Logink \| Agensi Digital Marketing 360° Jakarta`. The title carries the higher-volume ID term, which the H1 lacks: jasa digital marketing 900 plus jakarta 150, and digital marketing jakarta 200 as a substring. Keyword first, brand last, like the SERP winners. |
| **Meta** (120–160) | `Jasa digital marketing di Jakarta: ambil satu layanan dengan harga yang jelas, atau Kampanye 360° yang menghubungkan SEO, Maps, social, iklan, dan website.` (155) | `Digital marketing agency in Jakarta: hire one service with clear pricing, or run a 360° campaign that connects SEO, Maps, social, ads and your website.` (151) | **Changes.** It states both ways to buy. |

The meta says "harga yang jelas" / "clear pricing", not "harga tertulis" / "published prices": Social, Kreatif and SEO AI are quote-based (§1.3). `services.ts:218` currently holds the older "harga tertulis" / "at published prices" draft; Core replaces it with the strings above.

**Optional H1 test (owner decision, default: don't).** Only if GSC shows the home stuck beyond position 20 for "jasa digital marketing" after 8–12 weeks: swap the kicker "Agensi" → "Jasa" (`Jasa Digital Marketing 360° di Jakarta:`) through the logged H1 change list. The kicker gets 2 characters shorter and the display lines stay the same.

### 2.4 Does the 360° offer need its own URL pair? (owner decision)

**Default: no.**
- The offer's canonical home is a section on the hub, `/layanan#kampanye-360` (EN `/en/services#kampanye-360`; the anchor id stays in ID in both locales, like `STAGES.anchor`).
- Home carries the story section at `/#kampanye-360`.
- No new URL, no sitemap or hreflang change, and all existing URLs stay as they are.

Why:
1. **Demand.** Commercial "360" demand is about 100 searches a month across all variants, and the SERP is definitional. "Terintegrasi" variants have none. A commercial page would target almost no demand.
2. **Cannibalisation with the home.** `/layanan/digital-marketing-360` would target "digital marketing 360", "agensi digital marketing 360" and, inevitably, "jasa digital marketing". Those are the terms the home H1 ("Agensi Digital Marketing 360°") and the new home title ("Jasa Digital Marketing Jakarta: Agensi 360°") already target. logink.co has about 0 rankings and a low DR. Splitting the agency cluster across two URLs weakens both, and Google would pick one of them anyway.
3. **No thin page.** Logink has no public multi-channel case (`APPROVED_CASE_SLUGS = []`). A standalone offer page would rest on one fictional example and fall short of the 900–1,300 honest words the service template requires.
4. **The hub already fits.** The hub H1 already says "Layanan Digital Marketing 360° di Jakarta" (03a item 3). The offer section makes `/layanan` the natural place to compare "one service vs 360°", with the prices on the same page.

**Revisit trigger.** Add the pair only when both of these hold:
- (a) at least one approved multi-channel case study exists;
- (b) GSC shows at least about 100 impressions a month on 360 or terintegrasi queries landing on the home or hub.

Then add `/layanan/digital-marketing-360` + `/en/services/360-digital-marketing` (additive, 308 nothing):
- H1 `Kampanye Digital Marketing 360°: Semua Kanal, Satu Kampanye Terhubung` / `360° Digital Marketing Campaigns: Every Channel, One Connected Campaign`;
- a title that avoids "Jasa Digital Marketing Jakarta" (the home keeps it);
- the hub section shrinks to a summary and a link.

**Informational demand (optional, phase 3, CMS).** A blog post "Apa itu Digital Marketing 360°? Contoh dan Cara Kerjanya" is the right URL type for the definitional SERP. It would target 360 marketing 200, marketing 360 100, 360 digital marketing 60, integrated marketing 100 and the PAA above, and link to `/layanan#kampanye-360`. It is not a service page, so it respects the owner's "no new service pages".

## 3. The connected-campaign model Logink can honestly claim

### 3.1 Channel inventory (current services only; checked in the data files and the live site on 2026-09-27)

| Service (registry name) | Channels it runs today | Source |
|---|---|---|
| Jasa SEO Profesional | Google organic search: keyword research, SEO articles (5/15/30 a month), technical SEO, schema, GSC and GA4 setup, monthly report; custom event tracking including WhatsApp taps (Full) | `seo/data.ts:1-50, 125-137` |
| Local SEO & Google Maps | Google Business Profile, Maps, a local landing page (1 page) with click-to-WhatsApp, NAP and citations, reviews (Growth), LocalBusiness schema (Growth), GBP report | `localseo/data.ts:8-49, 203-238` |
| Social Media Management | Instagram, TikTok, Facebook, LinkedIn (B2B module); content plan, community management (replies and DMs in office hours), monthly report; add-ons KOL/KOC and audit | `social/data.ts:1-150, 255` |
| Desain Grafis & Video | Design (social templates, display banners, key visuals), video (Reels/TikTok, brand film), product photo (add-on), copy (ad copy for Google, Meta and TikTok, landing page copy, captions, articles) | `creative/data.ts:1-125` |
| Website & Landing Page | Landing pages, company profiles, online stores; GA4, GTM, Meta Pixel, WhatsApp chat, CRM integration, Looker Studio | `website/data.ts:1-90, 250-260` |
| Iklan Google & Meta Ads | Google Ads (Search, Display, Shopping), Meta Ads (IG and FB; Growth+), TikTok Ads (Full), Marketplace Ads (Tokopedia, Shopee, Lazada; Growth+), retargeting (the tiers contradict each other: Growth lists "Pixel Setup & Retargeting" at `:34`, the add-on says "Entry & Growth" at `:112`; added to owner decision 6). Click-to-WhatsApp ads are **not** in the existing copy (`ads/data.ts` never mentions WhatsApp): K11 | `ads/data.ts:1-115, 163-176` |
| SEO AI (GEO & AEO) | AI Overviews, AI Mode, ChatGPT, Perplexity: citable content, entity data, measurement (approved optional page, `AI_PAGE_LIVE = true`) | registry; `content/services/ai.ts` |
| WhatsApp | The conversion point for every channel. It is not a sold service | registry `waLink` |

**Map scope.** The Peta kampanye (§5) shows the seven services plus WhatsApp. LinkedIn, Marketplace Ads and Programmatic Display are real but secondary, so they appear only as text inside the Social and Iklan rows of the SSR table. The map never shows a channel Logink doesn't sell.

### 3.2 One strategy, one idea, adapted per channel

**Strategy [ada].** Hari 1–3 Discovery, then Hari 4–7 Strategi: "roadmap 90 hari yang disesuaikan untuk semua channel (SEO, social, iklan, kreatif) dengan KPI spesifik" (`components/public/home/HowWeWorkSection.tsx:26`). Hari 8–30 Eksekusi: "Tim terintegrasi kami bekerja paralel" (`:33`). Monthly: "Review performa bulanan bersama tim dedikasi Anda" (`:40`).

**One idea → adaptations [ada].**
- Creative: "Key Visual Kampanye … Diadaptasi di semua format" (`creative/data.ts:85`), and "Satu syuting, banyak output untuk feed, stories, reels, TikTok, dan YouTube" (`:103`).
- Ads: "Kami petakan platform mana yang menangani tahap mana: Google Search untuk intent, Meta untuk awareness, TikTok untuk discovery" (`ads/data.ts:215`), and copy and visuals built per platform (`:223`).

| Channel | How the one idea is adapted (example: 'Es kopi susu gula aren, antar se-Tebet', Contoh kampanye) |
|---|---|
| SEO | an article and menu page for the searched phrase ("kopi susu gula aren dekat Tebet") |
| Local SEO | a Google Post about the new menu (Google Posts are in the Growth plan, `localseo/data.ts:43`), and replies to reviews that mention it |
| Social | 3 Reels and a story from one shoot, with captions in the kedai's voice |
| Kreatif | one photo and video session, cut 1:1, 9:16 and 16:9; ad copy variants per platform |
| Website | a landing page for the menu with a WhatsApp button and tracking |
| Iklan | Search ads on the same keywords; Meta retargeting of site visitors to the landing page with its WhatsApp button (click-to-WhatsApp ads only once K11 is confirmed) |
| SEO AI | an FAQ and menu data written to be quotable |
| WhatsApp | the prefill "Halo, masih buka? Mau pesan 2 kopi susu." (the AdToChat instrument's line) |

### 3.3 Channel-to-channel connections (the edges of the map)

The number is the `EDGES[].n` key in content only; the map prints no numbers (§5.2). "Live" means it renders at launch (15 edges). The **[KONFIRMASI]** edges have `ok: false` in content and do not render until the owner confirms them.

| # | From → to | Label ID / EN | Evidence | Status |
|---|---|---|---|---|
| 1 | SEO → Iklan | kata kunci / keywords | About: "Data SEO Anda menajamkan iklan Anda" (`app/(frontend)/(public)/about/page.tsx:23`); SEO keyword research (`seo/data.ts`); Ads "Strategi Keyword Bidding" (`ads/data.ts:13`) | Live |
| 2 | SEO → SEO AI | konten & schema / content & schema | SEO schema: LocalBusiness, FAQPage (`seo/data.ts:131`); articles; aeo-geo §1.3 | Live |
| 3 | Website → SEO | fondasi teknis / technical base | "Arsitektur Siap SEO" (`website/data.ts:76`); SEO fixes CWV and page speed (`seo/data.ts`) | Live |
| 4 | Local SEO → SEO AI | data entitas / entity data | GBP, NAP consistency, LocalBusiness schema (`localseo/data.ts:8-49`); aeo-geo §1.3 | Live |
| 5 | Local SEO → WhatsApp | tautan WhatsApp di profil Google / WhatsApp link on your Google profile | "tautan langsung ke WhatsApp" (`localseo/data.ts:205`, a link, not a button); "Klik-ke-WhatsApp" on the local landing page (`:216`) | Live |
| 6 | Kreatif → Social | visual & video / visuals & video | social templates, Reels/TikTok (`creative/data.ts:1-30`); video shoots "ditangani tim Creative Services" (`social/data.ts:226`), although the TikTok module shoots its own (`:236`) | Live |
| 7 | Kreatif → Iklan | materi & copy iklan / ad creative & copy | display banners, ad copy for Google, Meta and TikTok (`creative/data.ts:116`); "tim Creative Services kami" for complex ad creative (`ads/data.ts:274`) | Live |
| 8 | Kreatif → Website | copy & visual halaman / page copy & visuals | landing page copy (`creative/data.ts:117`), key visual (`:85`) | Live |
| 9 | Kreatif → Local SEO | foto untuk profil / profile photos | product and lifestyle photography (`creative/data.ts:44`); Local SEO add-on "Foto & Video Lokasi" (`localseo/data.ts:178`) | Live |
| 10 | Social → SEO | ide konten / content ideas | About: "Social media Anda memasok konten" (`about/page.tsx:23`) | Live |
| 11 | Social → SEO AI | sebutan brand / brand mentions | aeo-geo §1.3 (mentions drive citations); the AI page copy says the same | Live |
| 12 | Website → Iklan | pixel & audiens / pixel & audiences | "Tracking Meta Pixel & GA4" (`website/data.ts:15`); Retargeting Campaign for site visitors (`ads/data.ts:109`) | Live. The copy contradicts itself on which Ads tiers include retargeting (owner decision 6), so no copy names a tier |
| 13 | Iklan → Website | trafik ke landing page / traffic to landing pages | "Landing Page Kampanye" (`website/data.ts:1-17`); the ads funnel (`ads/data.ts:215`) | Live |
| 14 | Website → SEO AI | situs terbaca mesin / machine-readable site | structured data, semantic HTML (`website/data.ts:76`) | Live |
| 15 | Website → WhatsApp | tombol chat / chat button | "WhatsApp chat" integration (`website/data.ts:88`) | Live |
| 16 | Iklan → WhatsApp | click-to-WhatsApp | none in existing copy: `ads/data.ts` never mentions WhatsApp, and the live page has only the "Chat di WhatsApp" CTA. The registry `ads.line` and H1 are the redesign's own words, so citing them is circular. `ok: false, gate: 'K11'` | [KONFIRMASI] K11 |
| 17 | Iklan → SEO | data search term / search-term data | not in copy | [KONFIRMASI] |
| 18 | Social → Iklan | audiens yang berinteraksi / engaged audiences | Meta "retargeting berbasis perilaku" (`ads/data.ts:149`) is about behaviour, not IG engagers | [KONFIRMASI] |
| 19 | WhatsApp → laporan | klik per kanal / clicks by channel | SEO Full tracks WhatsApp taps (`seo/data.ts:136`); a site-wide per-channel WhatsApp attribution is not in the copy | [KONFIRMASI] |

Plus the **spokes**: centre "Kampanye 360°" ↔ every node. Outward is "satu strategi, satu ide" [ada, §3.2]. Inward is "data → satu laporan" (K1; fallback "data → review bulanan").

The ads H1 "…yang Berujung di WhatsApp" stays true without edge 16: ads send traffic to a landing page (edge 13), and the landing page's chat button opens WhatsApp (edge 15).

### 3.4 One data layer

| Signal | Comes from | Evidence | Status |
|---|---|---|---|
| GA4 (traffic, conversions, events) | SEO, Ads, Website | `seo/data.ts:13`, `ads/data.ts:15`, `website/data.ts:15` | [ada] (03a item 4 already scopes the fact strip to these three) |
| Google Search Console | SEO | `seo/data.ts:13` | [ada] |
| Google Tag Manager, Looker Studio | Website stack; SEO Growth+ dashboard | `website/data.ts:258`, `seo/data.ts:202` | [ada] |
| Meta Pixel | Website; Ads ("Pixel Setup & Retargeting") | `website/data.ts:15`, `ads/data.ts:34` | [ada]. The copy names no tier for it here (tier contradiction: owner decision 6) |
| Google Ads conversions | Ads ("Conversion Tracking via GA4") | `ads/data.ts:15` | [ada] |
| TikTok Pixel / Events | Ads Full ("Setup TikTok Ads Manager", "Optimasi Konversi"); no pixel is named | `ads/data.ts:52-56` | [KONFIRMASI] |
| GBP insights (views, calls, directions, website clicks) | Local SEO monthly report | `localseo/data.ts:237` | [ada] |
| Social analytics (reach, engagement, link clicks) | Social monthly report | `social/data.ts:246` | [ada] |
| WhatsApp click events | SEO Full (WhatsApp taps), Website (WhatsApp integration) | `seo/data.ts:136`, `website/data.ts:88` | [ada] per service; per-channel attribution for every 360° client is [KONFIRMASI] |
| CRM | Website ("integrasi CRM"), Ads ("jika memungkinkan, integrasi CRM langsung") | `website/data.ts:88`, `ads/data.ts:259` | [ada] "where possible" |
| Account ownership | Ads: "Anda memiliki semua akun iklan"; SEO: "Akun sepenuhnya milik Anda" | `ads/data.ts:264`, `seo/data.ts:126` | [ada] for ad accounts, GA4 and GSC only. Copy line: `Akun iklan, GA4, dan Search Console tetap milik Anda.` / `Ad accounts, GA4 and Search Console stay yours.` |

### 3.5 One report, one team, one contact

- **One team [ada].** "Satu tim terintegrasi yang mengelola semua channel sekaligus" (`components/public/home/ProblemSolutionSection.tsx:62`) and "tim dedikasi Anda" (`HowWeWorkSection.tsx:40`).
- **One monthly review [ada].** "Review performa bulanan bersama tim dedikasi Anda" (`HowWeWorkSection.tsx:40`).
- **One combined monthly report [KONFIRMASI].** Every monthly service (SEO, Local SEO, Social, Iklan) has its own monthly report today; Website and Kreatif are project-based and have none. One report across channels, for example a Looker Studio report plus a PDF, is the natural 360° deliverable but is not written anywhere.
- **One main contact (PIC) [KONFIRMASI].** Not in the copy. Until confirmed, the copy says "satu tim", never "satu kontak".

### 3.6 Owner confirmations (with the default the build ships if there is no answer)

| # | Question | If confirmed | Default wording if not confirmed |
|---|---|---|---|
| K1 | One combined monthly report for 360° clients? | "satu laporan bulanan" / "one monthly report" (FAQ §9 Q1 and Q4, pillar 4, Bab IV lead, Overture step 4, hub lede and offer lead, service note); the labels "Laporan kampanye" / "Campaign report" (SSR table rows SEO AI and WhatsApp, the AI `feeds` item) | ID "laporan setiap layanan bulanan, dibahas dalam satu sesi review bulanan bersama tim" / EN "each monthly service's report, discussed in one monthly review with the team". Labels: `Laporan bulanan` / `Monthly report` |
| K2 | One named point of contact per 360° client? | add "dan satu kontak utama" / "and one main contact" to pillar 4 | "satu tim" only |
| K3 | TikTok Pixel / Events API set up with TikTok Ads? | list "pixel Meta, Google, dan TikTok" | list "GA4, Search Console, dan Meta Pixel" |
| K4 | WhatsApp clicks attributed per channel for every 360° client (GA4 event + UTM + per-channel prefill)? | keep "Setiap klik dicatat bersama kanal asalnya" (Bab IV, Overture step 4); render edge 19 | ID "Klik WhatsApp dari website dan iklan dicatat di GA4" / EN "WhatsApp clicks from the website and ads are recorded in GA4"; edge 19 hidden |
| K5 | Google Ads search-term data shared with the SEO team (edge 17)? | render edge 17 | hidden |
| K6 | Retargeting of Instagram/Facebook engagers (edge 18)? | render edge 18 | hidden |
| K7 | Minimum 360° scope (§1.2), an internal sales rule: do the four stages count a service's primary `stage` only, or `stage` + `alsoStages`? | the owner's rule, used in sales only | any stage (`stage` + `alsoStages`) + one data layer + one monthly review. Never stated on the site |
| K8 | Any 360° bundle pricing or discount? | the owner supplies the exact line | say nothing about discounts; "proposal kustom" only |
| K9 | A committed proposal turnaround for 360° (Social and Creative say 24 hours)? | add it to the tfoot price cell | "Proposal kustom" with no time |
| K10 | Own URL pair for 360° (§2.4)? | build per the revisit trigger | no URL; hub + home anchors |
| K11 | Do you run click-to-WhatsApp (Meta CTWA) ads for clients? | render edge 16; Bab IV lead names "Iklan click-to-WhatsApp"; the ads `feeds` item `wa` renders; registry `ads.line` may carry ", termasuk iklan click-to-WhatsApp" | edge 16 hidden; Bab IV default lead (§4.7); `ads.line` without that clause; the ads H1 "Berujung di WhatsApp" stays (true through the landing page) |

**Added to owner decision 6** (the "tanpa lock-in" reconciliation in 07-owner-defaults): the retargeting tier contradiction in `ads/data.ts` (Growth "Pixel Setup & Retargeting" at `:34` vs the add-on "Entry & Growth" at `:112`). Until it is settled, no copy names a tier for retargeting.

The content file holds each gated phrase twice (`confirmed` / `fallback`). A single `CAMPAIGN_CONFIRMED: Record<'K1'|'K2'|'K3'|'K4'|'K5'|'K6'|'K11', boolean>` in `content/campaign.ts`, all `false` at launch, picks between them. This is ponytail: one flag object, no CMS field. K7–K10 are decisions, not copy flags. Registry strings that depend on K11 (`ads.line`) are edited by Core when the owner answers, not flagged.

## 4. Homepage changes, in page order

New order, amending 03b §3.7. Only the changed rows are specified; the rest stay as they are.

| # | Section | Ground | Change |
|---|---|---|---|
| 01 | Hero | Putih | new lede (ENTITY) + one "two ways" line |
| 02 | FactsStrip | Kertas | one fact reworded |
| 03 | Layanan & harga `#harga` | Kertas | **ModeChoice** above the table + a `<tfoot>` Kampanye 360° row |
| 04 | Lead Profiler | Putih | a 360° chip and path |
| **05** | **Satu kampanye, semua kanal `#kampanye-360`** | **Kertas** | **NEW**, with the Peta kampanye 360° instrument |
| 06 | Overture | Kertas | re-captioned as the example campaign |
| 07–10 | Bab I–IV | as before | new leads that name the connections; service rows compacted |
| — | ClosingBand | Malam | new lede + a 360° text link (home) |
| 11–12 | Sheet: ProcessStack, FAQ | Kertas | FAQ: 3 new (Q1, Q2, Q4), 7 items |

The ground rhythm is unchanged: Putih → Kertas → Putih → Kertas (05 + 06 read as one chapter, "the plan, then the day") → Kertas (Bab I, separated by a hard edge and the 07.00 opener) → Putih → horizon → Senja → Malam → Kertas sheet.

### 4.1 Hero (01)

- The H1 is unchanged (§2.3).
- The **lede** is the new ENTITY (§1.4), verbatim, with the Stabilo highlight on "Logink adalah agensi digital marketing 360° di Jakarta" / "Logink is a 360° digital marketing agency in Jakarta".
- The CTA pair is unchanged: WaButton with the `page('home').wa` prefill, and Minta Penawaran.
- **New line** under the CTA pair, SSR `<p class="t-body">`, Aspal 70 on Putih (9.01:1), links in magenta (6.66:1):
  - ID: `Dua cara bekerja dengan kami: <a href="#harga">satu layanan</a> atau <a href="#kampanye-360">Kampanye 360°</a>.`
  - EN: `Two ways to work with us: <a href="#harga">one service</a> or <a href="#kampanye-360">a 360° campaign</a>.`
  - On phones it may fall just below the first 844px. That is acceptable, because the lede above it already names both modes.

### 4.2 Facts strip (02)

`FACT_STRIP[1]`:
- ID: `6 layanan + SEO AI, satu per satu atau satu Kampanye 360°`
- EN: `6 services + AI search, one at a time or as one 360° campaign`

Source: `SERVICES`. The other three facts are unchanged.

### 4.3 Services and prices (03): the two-path choice

Section order: H2 `Layanan dan harga` → **ModeChoice** → ServicesTable.

**`ModeChoice`** (`src/components/ds/ModeChoice.tsx`, Chrome pkg, S, 0 KB JS; props `{ locale: Locale; context: 'home' | 'hub' }`). Two flat panels, side by side at ≥640px and stacked on phones. Each is Putih on the Kertas section with a Garis UI border (3.52:1), radius 0 and no shadow. Each panel is eyebrow + H3 + **one sentence** + at most one action, the same DOM at every width, and **≤150px tall at 390px** (the sentence fits 2 lines at 358px).

| | Panel A | Panel B |
|---|---|---|
| Top rule | 1px Aspal | 3px day-dial rule: the four ribbon stops as hard segments (the dial motif) |
| Eyebrow (dateline style, Aspal 70) | `SATU LAYANAN` / `ONE SERVICE` | `KAMPANYE 360°` / `360° CAMPAIGN` |
| H3 | `Pilih satu kanal` / `Pick one channel` | `Satukan semua kanal` / `Connect every channel` |
| Sentence | `Harga atau penawaran setiap layanan ada di tabel di bawah.` / `Each service's price or quote is in the table below.` | `Semua kanal yang Anda butuhkan dalam satu kampanye, lewat proposal kustom.` / `Every channel you need in one campaign, by custom proposal.` (no K1 phrase) |
| Action | home: none (the table follows immediately); hub: text link `Lihat tabel harga` / `See the price table` → `#harga` | WaButton size sm `Chat soal Kampanye 360°` / `Chat about a 360° campaign` (`WA_PATTERNS.campaign360`, `data-placement="table" data-service="360"`) |

**ServicesTable `<tfoot>` row** (always rendered; the eighth row is a different mode, not an eighth service):
- **ID:** `<th scope="row"><a href="#kampanye-360">Kampanye 360°</a></th>` · Tahap: `Semua tahap`, with a mini dial of the 4 segments instead of one stage dot · Jawaban singkat: `Layanan di atas yang Anda butuhkan, dijalankan satu tim sebagai satu kampanye terhubung.` · Harga: `Proposal kustom`
- **EN:** `360° campaign` · `Every stage` · `The services above that you need, run by one team as one connected campaign.` · `Custom proposal`
- It has no hover still, no thumbnail and no Offer JSON-LD. The caption is unchanged.
- No prop: every ServicesTable instance renders the `<tfoot>` (there is no `mode360`). Its link is `#kampanye-360`, which exists on both home (section 05) and the hub (offer section).

### 4.4 Lead Profiler (04): a path for every channel

**SSR first bot message** (replaces the current one):
- ID: `Halo! Mau mulai dari mana: satu layanan, atau semua kanal sekaligus sebagai Kampanye 360°?`
- EN: `Hi! Where would you like to start: one service, or every channel at once as a 360° campaign?`

**Chips:**
- First chip, full width on phones: `Semua kanal · Kampanye 360°` / `Every channel · 360° campaign`.
- Then a small label `atau satu layanan:` / `or one service:`, followed by the existing 7 chips.
- Without JS, the 360° chip is a wa.me link with `WA_PATTERNS.campaign360`.
- Attributes: `data-cta="profiler" data-service="360"`.

**Island path `'360'`.** Confirm bubble:
- ID `Baik, Kampanye 360°: semua kanal Anda dalam satu kampanye. Enam pertanyaan singkat, lalu brief Anda siap dikirim ke WhatsApp.`
- EN `Great, a 360° campaign: all your channels in one campaign. Six quick questions, then your brief is ready to send on WhatsApp.`

| key | type | Question ID / EN | Options ID / EN |
|---|---|---|---|
| industri | single | the existing industry question | `INDUSTRY_ID` / `INDUSTRY_EN` |
| tujuan | single | `Apa tujuan utama kampanye ini?` / `What is the main goal of this campaign?` | Lebih banyak chat WhatsApp · Penjualan online · Pelanggan datang ke lokasi · Brand lebih dikenal · Peluncuran produk atau promo / More WhatsApp chats · Online sales · Customers visiting the location · Brand awareness · A product launch or promo |
| kanal | multi | `Kanal apa yang sudah berjalan?` / `Which channels are already running?` | Website · Google Maps / Google Business · Instagram, TikTok atau Facebook · Iklan Google, Meta atau TikTok · Artikel / SEO · Belum ada / Website · Google Maps / Google Business · Instagram, TikTok or Facebook · Google, Meta or TikTok ads · Articles / SEO · None yet |
| kendala | single | `Apa kendala terbesarnya?` / `What is the biggest problem?` | Kanal jalan sendiri-sendiri · Tidak tahu kanal mana yang menghasilkan · Konten dan iklan tidak konsisten · Terlalu banyak vendor · Belum punya strategi / Channels run separately · Not sure which channel brings results · Content and ads are inconsistent · Too many vendors · No strategy yet |
| tracking | single | `Apakah GA4 atau pixel iklan sudah terpasang?` / `Are GA4 or ad pixels installed?` | Sudah · Sebagian · Belum · Tidak tahu / Yes · Partly · No · Not sure |
| budget | single | `Total budget marketing bulanan, termasuk budget iklan?` / `Total monthly marketing budget, including ad spend?` | its own scale, not `BUDGET_ID` (whose `< Rp 5 juta` floor is too low for several channels plus ad spend): `BUDGET_360_ID = ['< Rp 15 juta', 'Rp 15–30 juta', 'Rp 30–60 juta', 'Rp 60 juta+']` / `BUDGET_360_EN = ['< IDR 15M', 'IDR 15–30M', 'IDR 30–60M', 'IDR 60M+']` |

- The brief header is `Kampanye 360°` / `360° campaign`.
- It POSTs to `/api/contact` with `services: ['360']` and `source: 'lead_profiler'`. The API's service allow-list gains `'360'`; the field is JSON, so there is no migration.
- The final bubble repeats `ANTI_SCAM`, as the other paths do.

### 4.5 NEW section 05: 'Satu kampanye, semua kanal' / 'One campaign, every channel'

**Placement: after the Lead Profiler, before the Overture, as the Overture's intro.** The two options in the brief were "directly after the table" and "inside the Overture". This takes the middle path:
- **Services, prices and the Profiler still come first.** That was the conversion judge's must-fix: the Profiler stays at about the fifth phone screen, before any runway. The map is not a runway; it is a static instrument.
- **It is its own `<Section>`,** so the Overture's sticky stage, runway height and `data-steps` logic are untouched.
- **It shares the Overture's Kertas ground,** so "the plan" (06.30) reads straight into "the day" (07.00 → 21.30).

Merging it into the Overture was rejected because it would put an interactive map inside a pinned runway. Placing it before the Profiler was rejected because it would push the Profiler to screen 7.

**Component:** `sections/home/Campaign360.tsx` (Home, S): `<Section id="kampanye-360" data-hour="0630" data-ground="kertas">`.

1. **Dateline:** the existing component, no new prop: `<Dateline hour="06.30" right="KAMPANYE 360°" />` / `right="360° CAMPAIGN"`. It renders `JAKARTA, 06.30 WIB — PAGI · KAMPANYE 360°`.
2. **H2** (SplitHeading): `Satu kampanye, semua kanal` / `One campaign, every channel`.
3. **Lead** (51 / 58 words). Stabilo goes on its first sentence, the definition a machine would quote:
   - ID: `Kampanye 360° berarti semua kanal yang Anda butuhkan dijalankan satu tim sebagai satu kampanye. Satu strategi dan satu ide diadaptasi untuk Google, Maps, Instagram, TikTok, iklan, dan website. Setiap kanal mengisi kanal lain, lalu datanya kembali ke satu laporan. Anda tetap bisa mulai dari satu layanan dan menyambungkan kanal lain nanti.`
   - EN: `A 360° campaign means every channel you need is run by one team as one campaign. One strategy and one idea are adapted for Google, Maps, Instagram, TikTok, ads and your website. Each channel feeds the others, and the data comes back into one report. You can still start with a single service and connect more channels later.`
   - K1 fallback for the third sentence: `…lalu datanya dibahas dalam satu review bulanan.` / `…and the data is reviewed in one monthly session.`
4. **Four pillars:** the section maps `PILLARS` (from `content/campaign.ts`) to a 4-item `<dl>`: 2×2 on desktop, one column on phones. Each `dd` is at most 30 words. The hub does the same map; there is no shared `CampaignPillars` component, so nothing is imported across package folders.

| dt ID / EN | dd ID | dd EN | Basis |
|---|---|---|---|
| Satu strategi, satu ide / One strategy, one idea | Roadmap 90 hari untuk semua kanal disusun di minggu pertama, lalu satu ide kampanye diadaptasi per kanal: copy untuk search, visual untuk feed, video vertikal untuk TikTok. | A 90-day roadmap for every channel is set in the first week, then one campaign idea is adapted per channel: copy for search, visuals for feeds, vertical video for TikTok. | [ada] `HowWeWorkSection.tsx:26`, `creative/data.ts:85,103`, `ads/data.ts:223` |
| Kanal saling mengisi / Channels feed each other | Kata kunci SEO menajamkan iklan, satu sesi syuting mengisi social dan iklan, data profil Google membantu jawaban AI, dan pengunjung website bisa disapa lagi lewat retargeting. | SEO keywords sharpen your ads, one shoot fills social and ads, Google profile data helps AI answers, and website visitors can be reached again through retargeting. | [ada] edges 1, 4, 6, 7, 12 |
| Satu data / One data layer | GA4, Search Console, pixel iklan, insight Google Business, dan klik WhatsApp dibaca bersama. Akun iklan, GA4, dan Search Console tetap milik Anda. | GA4, Search Console, ad pixels, Google Business insights and WhatsApp clicks are read together. Ad accounts, GA4 and Search Console stay yours. | [ada] §3.4 |
| Satu laporan, satu tim / One report, one team | Satu laporan bulanan dan satu sesi review bersama tim yang menjalankan semua kanal. | One monthly report and one review session with the team that runs every channel. | K1, K2. Fallback dt `Satu review, satu tim` / `One review, one team`; dd `Laporan setiap layanan bulanan, dibahas dalam satu sesi review bulanan bersama tim yang menjalankan semua kanal.` / `Each monthly service's report, discussed in one monthly review with the team that runs every channel.` |

5. **CTA pair:**
   - WaButton `Chat soal Kampanye 360°` / `Chat about a 360° campaign` (`WA_PATTERNS.campaign360`, `data-placement="campaign" data-service="360"`).
   - Ink button `Minta proposal 360°` / `Request a 360° proposal` → `{contact}?layanan=360#formulir`.
   - `data-placement` gains the value `campaign`.
6. **`CampaignMap`** with `table="details"` and **no `example`** (§5). The Overture directly below is the same Kedai Contoh campaign, so home does not repeat the strip; the hub keeps it.
7. **Closing line**, `<p>`:
   - ID `Mulai dari satu kanal saja? Harga atau cara penawaran setiap layanan ada di <a href="#harga">tabel layanan dan harga</a>.`
   - EN `Starting with one channel? Each service's price or quote terms are in the <a href="#harga">services and prices table</a>.`

**Layout.** On desktop, columns 1–6 hold the dateline, H2, lead, pillars and CTAs, and columns 7–12 hold the map (ring + chips). The table `<details>` summary runs full width below. On phones everything stacks: the map frame is `min(100%, 340px)` including labels, with the chips under the ring, then the `<details>` summary.

### 4.6 Overture (06): the day becomes the example campaign

- **H2 stays** `Sehari, satu pelanggan` / `One day, one customer` (the story's name on the proposal and the Miro board).
- **Dateline right label:** `CONTOH KAMPANYE · KEDAI CONTOH` / `EXAMPLE CAMPAIGN · KEDAI CONTOH`.
- **New lead** (1 sentence):
  - ID `Contoh kampanye: satu kampanye Kedai Contoh menemui satu pelanggan di empat kanal dalam sehari, lalu datanya kembali ke rencana esok pagi.`
  - EN `Example campaign: one Kedai Contoh campaign meets one customer on four channels in one day, and the data comes back into the next morning's plan.`
- **Steps.** Each is `<li><h3>` + a chips line + `<p>`, all SSR and all in the DOM. The chips line is plain text in `<p class="t-chips">`, outside the heading.
- **Unchanged:** the phone panels, canvas, keyframes, `data-step` logic and 'Ilustrasi · data contoh' labels on the phone.

| # | H3 ID / EN | Chips ID / EN |
|---|---|---|
| 1 | `07.10 · Ditemukan di search dan Maps` / `07.10 · Found on search and Maps` | SEO · Local SEO · Iklan / SEO · Local SEO · Ads |
| 2 | `12.40 · Dipercaya di Instagram dan website` / `12.40 · Trusted on Instagram and the website` | Kreatif · Social · Website / Creative · Social · Website |
| 3 | `18.05 · Dikutip jawaban AI` / `18.05 · Cited in an AI answer` | SEO AI, diisi SEO, Local SEO, Social, Website / AI search, fed by SEO, Local SEO, Social, Website |
| 4 | `21.30 · Dihubungi lewat WhatsApp` / `21.30 · Contacted on WhatsApp` | Iklan · Website · WhatsApp · Laporan / Ads · Website · WhatsApp · Report |

Step paragraphs (40–60 words each; counts are ID/EN):

1. (48/52) ID: `Contoh kampanye. Pukul 07.10 seorang pelanggan mengetik "kopi susu gula aren dekat Tebet". Kedai Contoh muncul di Maps karena profil Google Business dan ulasannya dirawat, dan iklan pencariannya memakai kata kunci dari riset SEO yang sama. Ide kampanyenya, "es kopi susu gula aren, antar se-Tebet", tampil di keduanya.`
   EN: `Example campaign. At 07.10 a customer types "kopi susu gula aren dekat Tebet". Kedai Contoh shows up on Maps because its Google Business Profile and reviews are looked after, and its search ad uses keywords from the same SEO research. The campaign idea, "iced palm-sugar coffee, delivered across Tebet", appears in both.`
2. (50/55) ID: `Saat makan siang ia membuka Instagram kedai itu. Reels dan foto produknya berasal dari satu sesi syuting tim kreatif, dipotong untuk feed, story, dan iklan Meta. Dari link di bio ia membuka menu di website, dan kunjungan itu tercatat oleh GA4 dan Meta Pixel sehingga iklan bisa menyapanya lagi nanti.`
   EN: `At lunch they open the kedai's Instagram. The Reels and product photos come from one shoot by the creative team, cut for feed, stories and Meta ads. From the bio link they open the menu on the website, and GA4 and the Meta Pixel record the visit so an ad can reach them again later.`
3. (50/51) ID: `Menjelang senja ia bertanya ke asisten AI: kopi gula aren enak di Tebet yang bisa antar? Jawabannya mengutip Kedai Contoh sebagai sumber (2). Kutipan tidak bisa dijamin, tetapi peluangnya naik ketika artikel SEO, data profil Google, sebutan di social media, dan website yang mudah dibaca mesin mengatakan hal yang sama.`
   EN: `Near dusk they ask an AI assistant for good palm-sugar coffee in Tebet that delivers. The answer cites Kedai Contoh as source (2). Citations cannot be guaranteed, but the odds rise when the SEO articles, the Google profile data, the social mentions and a machine-readable website all say the same thing.`
4. (46/58) ID: `Pukul 21.30 iklan retargeting membawanya kembali ke halaman menu, dan ia menekan tombol WhatsApp: "Halo, masih buka? Mau pesan 2 kopi susu." Klik itu tercatat bersama kanal asalnya. Di akhir bulan, satu laporan menunjukkan kanal mana yang bekerja, dan rencana pagi berikutnya disusun dari data itu.`
   EN: `At 21.30 a retargeting ad brings them back to the menu page, and they tap the WhatsApp button: "Halo, masih buka? Mau pesan 2 kopi susu." The click is recorded with the channel it came from. At the end of the month one report shows which channels worked, and the next morning's plan is built from that data.`
   - The ad leads to the landing page, not straight to a chat, so the step holds without K11. Once K11 is confirmed it may read `iklan click-to-WhatsApp muncul di feed-nya dan ia menekan tombolnya` / `a click-to-WhatsApp ad appears in their feed and they tap it`.
   - K4 fallback for the second sentence: `Klik itu tercatat di GA4.` / `GA4 records the click.`
   - K1 fallback for the third: `Di akhir bulan, review bersama tim menunjukkan…` / `At the end of the month, the review with the team shows…`

Why not a Ramadan promo, as the brief suggested: the day starts with a 07.10 coffee search. During Ramadan, daytime coffee conflicts with fasting and with the existing instruments ("kopi susu gula aren dekat Tebet", "Mau pesan 2 kopi susu"). A new-menu launch keeps every existing mock valid. A Ramadan variant can be a later seasonal swap of the example only.

### 4.7 Bab I–IV (07–10): leads name the connections; service rows get shorter

**Leads.** Each chapter lead is replaced; `home.ts` gets `chapters[].lead`. The H2s, clock numerals, instruments and photos stay the same. Word counts are ID/EN.

| Bab | Lead ID | Lead EN | Connections named |
|---|---|---|---|
| I · 07.00 Ditemukan (51/56) | Pagi dimulai di pencarian. Jasa SEO Profesional menulis konten untuk kata kunci yang benar-benar diketik pelanggan, dan kata kunci yang sama menajamkan iklan pencarian. Local SEO & Google Maps merapikan profil, ulasan, dan jam buka, data yang juga dibaca mesin AI. Satu riset kata kunci mengisi konten organik dan iklan pencarian. | The morning starts in search. Professional SEO writes content for the words customers actually type, and the same keywords sharpen your search ads. Local SEO & Google Maps keeps your profile, reviews and opening hours in order, and AI engines read that data too. One piece of keyword research feeds both organic content and search ads. | edges 1, 4 (SEO → Maps is not an edge, so the last sentence names only organic and ads) |
| II · 12.40 Dipercaya (46/55) | Sebelum chat, orang memeriksa. Satu sesi foto dan video dari tim kreatif dipotong untuk feed, story, Reels, TikTok, dan iklan. Social media menjaga percakapan tetap hidup. Website merangkum semuanya dan memasang GA4 serta Meta Pixel, sehingga kunjungan bisa diukur dan, dengan retargeting, disapa lagi oleh iklan. | Before they chat, people check. One photo and video shoot by the creative team is cut for feed, stories, Reels, TikTok and ads. Social media keeps the conversation going. The website pulls it all together and carries GA4 and the Meta Pixel, so visits can be measured and, with retargeting, reached again by an ad. | edges 6, 7, 8, 12 |
| III · 18.05 Dikutip AI (52/58) | Jawaban AI dirakit dari sumber yang saling menguatkan. Konten SEO, data profil Google, sebutan brand di social media, dan website yang mudah dibaca mesin adalah bahan yang sama yang dikerjakan kanal lain dalam kampanye ini. SEO AI (GEO & AEO) merapikan bahan itu dan mengukur hasilnya setiap bulan. Kami tidak menjamin kutipan. | AI answers are assembled from sources that back each other up. SEO content, Google profile data, brand mentions on social media and a machine-readable website are the same materials the other channels in this campaign already produce. AI Search Optimization (GEO & AEO) puts them in order and measures the result every month. We do not guarantee citations. | edges 2, 4, 11, 14 |
| IV · 21.30 Dihubungi (48/60) | Semua kanal berakhir di satu tempat: WhatsApp. Iklan yang mengantar ke landing page dengan tombol WhatsApp, tombol chat di website, dan tautan WhatsApp di profil Google membawa pelanggan ke percakapan yang sama. Setiap klik dicatat bersama kanal asalnya, lalu masuk ke laporan bulanan yang menyusun rencana hari berikutnya. | Every channel ends in one place: WhatsApp. Ads that lead to a landing page with a WhatsApp button, the chat button on your website and the WhatsApp link on your Google profile bring customers into the same conversation. Each click is recorded with the channel it came from and goes into the monthly report that shapes the next day's plan. | edges 5, 13, 15, 19 (K4, K1). K11 confirmed: "Iklan yang mengantar ke landing page dengan tombol WhatsApp" / "Ads that lead to a landing page with a WhatsApp button" becomes `Iklan click-to-WhatsApp` / `Click-to-WhatsApp ads`. Fallback for the third sentence (K4 or K1 false): `Klik WhatsApp dari website dan iklan dicatat di GA4, lalu dibahas dalam review bulanan yang menyusun rencana hari berikutnya.` / `WhatsApp clicks from the website and ads are recorded in GA4, then discussed in the monthly review that shapes the next day's plan.` |

**Service rows inside the chapters (length cut).** Each row keeps:
- its H3 with the service name (for SEO);
- the registry `line` (one line, about 12–15 words) instead of the 40–60-word `answer`;
- the Price or quote, and the name link.

The full `answer` stays on the service page (AnswerBlock) and in `Service.description`, so nothing citable is lost. Each service still gets at least 3 SSR inlinks from home (table, chapter row, mega menu, footer).

**Home-only instrument trims (the same at every width; no CSS hiding, no second DOM copy):**
- Bab II: the collage is IgGrid + ReviewCard, without SiteFrame (SiteFrame stays on the Website page).
- Bab III: 3 SourcedStats (`aio-id`, `ctr-58`, `apjii-ai`; all 5 stay on the AI page); `AI_COMPARE` sits in a closed `<details>` (open on the AI page).
- Bab IV: AdToChat shows 2 bubbles instead of 3.

### 4.8 Closing band (every page)

- The H2 `Satu pesan cukup.` / `One message is enough.` and the buttons are unchanged.
- The **lede** (the ClosingBand `text` prop) changes:
  - **Home, hub and non-service pages:**
    - ID `Ceritakan bisnis Anda lewat WhatsApp. Kami beri saran yang jujur: mulai dari satu layanan, atau Kampanye 360° bila semua kanal perlu bergerak bersama.`
    - EN `Tell us about your business on WhatsApp. We'll give you an honest recommendation: start with one service, or a 360° campaign when every channel needs to move together.`
  - **Service pages:**
    - ID `Ambil {name} sendiri, atau sambungkan dengan kanal lain dalam Kampanye 360°. Kami bantu memilih lewat WhatsApp.`
    - EN `Hire {name} on its own, or connect it with other channels in a 360° campaign. We'll help you choose on WhatsApp.`
- **Home and hub only:** after the lede, a text link `Tanya soal Kampanye 360°` / `Ask about a 360° campaign`.
  - It is `waLink(WA_PATTERNS.campaign360[l])` with `data-cta="whatsapp" data-placement="closing" data-service="360"`, set in Jingga on Malam (7.25:1).
  - It is a link, not a third button. The button pair stays WhatsApp (page prefill) + Minta Penawaran, and the anti-scam line stays.

### 4.9 Home FAQ (12): 7 items

Order:
1. `Berapa biaya jasa digital marketing?` (existing; links `#harga`). Append: `Kampanye 360° dihargai lewat proposal kustom.` / `A 360° campaign is priced by custom proposal.`
2. `Apa itu digital marketing 360°?` (§9 Q1)
3. `Apakah saya harus mengambil semua layanan?` (§9 Q2)
4. `Bagaimana hasil kampanye dilaporkan?` (§9 Q4; replaces the old reporting question)
5. `Apa itu GEO dan AEO?` (existing, with the customs line)
6. `Apakah Logink bisa menjamin brand muncul di ChatGPT?` (existing, honest no)
7. Contracts slot: while "tanpa lock-in" is unreconciled (owner decision 6), this slot keeps the existing Local SEO billing question; the contracts question takes it once decision 6 is settled.

Q3 and Q5 are **not** on home: Q3 repeats pillar 2 and the table one screen up, and Q5 repeats the sentence appended to item 1. Both stay available to the hub (§7.2). FAQPage JSON-LD mirrors the visible 7.

### 4.10 Home length: still ≤14 phone screens

This is an estimate at 390×844, against the direction's own estimate of about 13 screens. The build's tall-viewport and measure gate (G10) is the judge. **Every cut applies at every width**: 02a §2.2 rule 3 and the G9/G10 "0 hidden text" gates forbid CSS hiding and second DOM copies, and a `<details>` open state cannot follow a media query without JS.

Section 05 at 390px, measured line by line: dateline 40 · H2 (2 lines) 90 · lead (51 words, 8 lines) 232 · 4 pillars 688 · stacked CTAs 148 · map frame 340 + ring caption and night label 52 · 9 chips at 48px in 3 rows + fieldset legend 198 · `<details>` summary 56 · padding 128 = **about 1,970px, 2.35 screens**.

| Change | Phone screens |
|---|---|
| + Hero "two ways" line | +0.05 |
| + ModeChoice (2 panels ≤150px each, stacked, + gap) | +0.40 |
| + ServicesTable `<tfoot>` row | +0.15 |
| + Profiler 360° chip + label | +0.10 |
| + NEW section 05 (no example strip on home; see above) | +2.35 |
| + Overture lead + chips lines | +0.15 |
| + FAQ net +1 item (closed `<details>`) | +0.08 |
| **Added** | **+3.28** |
| − Bab I–IV service rows: `answer` → `line` (6 rows) | −0.75 |
| − Bab III on home: 5 SourcedStats → 3 | −0.35 |
| − Bab III on home: `AI_COMPARE` in a closed `<details>` at every width | −0.55 |
| − Bab II on home: collage without SiteFrame at every width | −0.30 |
| − ProcessStack card texts trimmed to ≤25 words each (process detail lives on service pages) | −0.25 |
| − Bab IV on home: AdToChat with 2 bubbles at every width | −0.15 |
| **Cut** | **−2.35** |
| **Net** | **+0.93 → about 13.9 (plausible range 13.6–14.3)** |

The estimate sits just under the gate, so the fallbacks are likely to be needed:
- **Fallback 1 (first):** drop QueryFanout from home (the AI page keeps it).
- **Fallback 2:** trim every pillar `dd` to ≤18 words. `PILLARS` is one data set, so home and hub change together (about −0.25).
- **Word target** for home main content moves from 1,100–1,400 to **1,300–1,700**, and the hub's from 700–1,000 to **1,200–1,700** (§7.2), because the `<details>` table and the FAQs count as words. Words are not the length risk; screens are. The floor (638/639) is unaffected. **open_issue:** 06 §6.2's "Main-content words" row still reads 1,100–1,400; QA logs both new targets there.

## 5. Instrument: 'Peta kampanye 360°' / '360° campaign map'

Ingredients: a one-time ring reveal + technical interface details (a transit-map style ring with chords, chip controls and a real table). The table is the text key; the map prints no chord numbers and has no legend. Everything is live HTML/SVG, with no video and no canvas.

### 5.1 Component, props and data

```ts
// src/components/instruments/CampaignMap.tsx  (Instruments pkg, Server component, 0 KB JS)
type CampaignMapProps = {
  locale: Locale
  table?: 'open' | 'details' | 'none' // home: 'details' · hub: 'open' · service pages: 'none'
  example?: boolean                   // the Kedai Contoh strip (hub only)
  focus?: SvcKey | 'wa'               // service pages: only that node's chords drawn, lit; no chips, no radios
  id?: string                         // prefix for radio ids and the radio group name (default 'cm')
}
```

**Data:** `src/content/campaign.ts` (owner: **Service** pkg; plain data, no JSX; imports only types and `svcHref`):
- `NODES: { k: SvcKey | 'wa'; hour: string; label: L }[]`
  - the 7 services use their registry hour; `wa` uses 21.30;
  - labels: SEO / SEO · Local SEO / Local SEO · Social / Social · Kreatif / Creative · Website / Website · SEO AI / AI search · Iklan / Ads · WhatsApp / WhatsApp;
  - centre: `Kampanye 360°` / `360° campaign`.
- `EDGES: { n: number; from: NodeKey; to: NodeKey | 'report'; label: L; ok: boolean; gate?: 'K4' | 'K5' | 'K6' | 'K11' }[]`. These are the 19 rows of §3.3. `ok: false` edges render nowhere until their flag in `CAMPAIGN_CONFIRMED` is true.
- `PILLARS`, `NOTE`, `EXAMPLE`, `TABLE` (caption, head, rows built from EDGES) and `CAMPAIGN_CONFIRMED` (§3.6). There is no `WA_360` here: the 360° prefill is `WA_PATTERNS.campaign360` in `services.ts`, the only source.

**Where it's used:**
- home 05: `table="details"` (no example);
- hub `#kampanye-360`: `table="open" example`;
- service pages, 'Posisi dalam kampanye 360°': `focus={k} table="none"`.

### 5.2 Layout: channels on the day dial

- **The ring is the day dial bent into a circle,** with noon at the top: `angle = ((hour − 12) / 24) × 360°`, clockwise from the top. Dawn sits on the left, noon at the top, dusk on the right and night at the bottom.
- **Ring colours.** The ring is the dial motif, so it is not a new motif. It is a 6px stroke in hard segments that follow the hour prefixes of DESIGN §3.3:
  - [06.30, 10.00) magenta;
  - [10.00, 17.00) crimson;
  - [17.00, 20.00) coral;
  - [20.00, 23.00) jingga;
  - [23.00, 06.30) Malam.
  - Each segment is a path with `data-stage` (`ditemukan`, `dipercaya`, `dikutip`, `dihubungi`) and `stroke: var(--key)`; the Malam segment uses the Malam token. No hex.
  - The ring is decorative, `aria-hidden`, and carries no text.
- **Nodes** sit on the ring at their hours: SEO 07.00, Local SEO 08.30, Social 12.40, Kreatif 15.10, Website 16.30, SEO AI 18.05, Iklan 20.30, WhatsApp 21.30.
  - A 22° minimum gap pushes a node clockwise, and the push cascades to later nodes: Website 67.5° → 69.5°, then SEO AI 91.25° → 91.5°, then WhatsApp 142.5° → 149.5°. Every node stays inside its stage's segment.
  - Positions are computed in the component from `NODES` (pure, 8 items).
  - **Caption** (visible SSR text under the ring, Aspal 70 on Putih): `Posisi di cincin = tahap utama setiap layanan.` / `Position on the ring = each service's main stage.` The map shows Website at 16.30 and Iklan at 20.30 while the Overture shows them at 12.40 and 07.10; the caption explains why.
- **Node look:** a 14px dot in the node's stage key light with a 2px Aspal outline, which gives the ≥3:1 boundary that coral and jingga lack on paper.
  - WhatsApp: `fill: var(--c-wa)` with `stroke: var(--c-wa-label)` at `stroke-width: var(--wa-edge-w)` (the WhatsApp rule on light grounds; G4 grep #3 bans hex in components).
  - Label: Archivo 600, 13px, Aspal, on the Putih map panel (18.55:1), placed radially outside the ring. **Labels are plain, non-interactive text** (no `<label>`, no hover, no `data-cursor`).
- **Frame:** `min(100%, 340px)` wide including the labels, `aspect-ratio: 1`; ring diameter = frame − 144px (72px per side for labels). It never overflows the 358px phone column.
- **Centre:** a Putih disc with a Garis UI border, `Kampanye 360°` (Aspal 650) and `satu strategi · satu data` (Aspal 70, 9.01:1).
- **Spokes:** centre ↔ every node, 1px Garis UI (3.52:1 on Putih), dashed.
- **Night arc label** (visible SSR text in the figure, Aspal 70 on Putih): `Malam: data kembali ke laporan, lalu ke rencana 06.30` / `Night: data returns to the report, then to the 06.30 plan`. K1 fallback: `…kembali ke review bulanan…` / `…returns to the monthly review…`.
- **Chords** (the channel-to-channel edges with `ok: true`, 15 at launch):
  - drawn as quadratic curves bowed toward the centre (control point at 35% of the radius), with an arrowhead at the target;
  - at rest: 1px Garis UI (3.52:1 on Putih, 3.22:1 on Kertas; non-text AA);
  - **no numbers and no markers.** An SVG numeral scales with the viewBox (11px in a ~600 box renders at about 5.5px on a small ring), and 16 markers collide inside the ring. Chords carry no text; the SSR table (§5.8) is the text key.
- **Panel:** the map sits on a Putih inset panel (radius 0, Garis UI border) on the Kertas section. Every text node is on Putih, a token surface.
- **No legend.** It repeated the table and cost about 48 DOM nodes.
- **Service pages (`focus`):** the same frame; only the focused node's chords (in and out) are drawn, already lit. No other chords, no chips, no radios.

### 5.3 Interaction: one model at every width (CSS only, 0 KB JS)

There is no desktop/phone split, no hover preview and no `data-cursor` in the map. Chips are the only control, at every width, so nothing is hidden with `display: none` (G9) and keyboard focus always lands on something visible.

- **Structure:**
  - The root is `<div class="cmap">`: the figure (SVG line layer + plain-text node labels + caption + night label), then the chips, then (hub, home) the table.
  - Under the ring: `<fieldset class="cm-chips"><legend>Sorot satu kanal</legend>` / `Highlight one channel`, holding 9 pairs (`Semua` / `All` + 8 nodes). Each pair is a radio **immediately followed by** its chip `<label for>`: `<input type="radio" name="{id}" id="{id}-{k}" class="sr-only"><label for="{id}-{k}">SEO</label>`. `{id}-all` is `checked` by default.
  - Chips are ≥48px tall at every width, wrap into rows and never scroll sideways.
- **Lighting** (via `:has()` on the root, one rule per node written out for the 8 nodes):
  - `.cmap:has(#cm-seo:checked) [data-from="seo"] .ch-lit { opacity: 1 }`: outgoing chords switch to 2px Aspal with an Aspal arrowhead;
  - incoming chords (`[data-to="seo"]`) switch to 2px Aspal dashed (4 3);
  - every other chord and spoke drops to opacity .2;
  - the node dot scales to 1.25 (transform only).
  - Each chord is two pre-drawn paths, `.ch-base` (Garis UI) and `.ch-lit` (Aspal, opacity 0). Highlighting crossfades opacity (150ms, quart-out); stroke colour is never animated.
- **Chip states** (text never relies on colour alone):
  - rest: Putih fill, Aspal text (18.55:1), 1px Garis UI border;
  - checked (`input:checked + label`): **Aspal fill, Putih text (18.55:1)**;
  - focus: `.cm-chips input:focus-visible + label { outline: 2px solid var(--focus); outline-offset: 2px }` (WCAG 2.4.7; the radio takes focus, so the rule targets its sibling label).
- **Linked table row:** when the table is visible (hub, or home `<details>` open), the checked node's row (`tr[data-node="{k}"]`) gets a **2px Aspal left rule** (the cue that does not depend on colour) and a Kertas tint. Its text stays Aspal.
- **Keyboard:** Tab reaches the radio group, arrow keys move through the chips, and the focused chip shows the focus ring. `Semua` / `All` resets.
- **No content is hidden at rest.** Node labels, caption, night label, chips and table text are always in the DOM and visible. Selection only changes emphasis.

### 5.4 Service pages (`focus`)

Static: the same frame, only the focused node's chords drawn and lit (§5.2), no fieldset and no radios. Nothing to operate, so nothing to focus.

### 5.5 Reduced motion, Mode teks, forced colours, no JS

- **`prefers-reduced-motion: reduce`:** no reveal and no transitions. The highlight switches instantly.
- **Mode teks:** the SVG and ring layer hide like other decoration. The chips hide with it (they only drive the drawing). The caption, night label, table and (hub) example remain as text.
- **`forced-colors: active`:** chords use `CanvasText`, lit chords go to stroke-width 3 instead of changing colour, and the checked chip uses `Highlight` / `HighlightText`.
- **No JS:** fully works (CSS `:has`). The one-time reveal simply doesn't run.
- **Browsers without `:has()`:** static map, table intact.

### 5.6 Motion (T1, once, on data-in)

This uses the existing `data-reveal="inst"` contract, driven by SiteObserver. No new JS. Only transform and opacity are animated (DESIGN §10.4, 02a rule 3).

1. **0–540ms:** the 5 ring segments fade in clockwise from 06.30 (opacity 0 → 1, 60ms stagger, quart-out).
2. **240–900ms:** the node **dots** (not labels) scale from .6 to 1 (transform), staggered 60ms. Labels are visible from first paint, with no opacity 0 on text.
3. Done by 900ms. There is **no travelling "idea" dot, no per-node chord flash and no centre pulse**: the Overture one section later scrubs the same day, so the map does not replay it.

If a moving dot is ever wanted, it is a `<g>` rotated about the centre with `transform: rotate()`; a circle needs no `offset-path`.

**Budgets.**
- Tiers: T0 (static and interactive via CSS) + T1 (one-time reveal). No T2 or T3.
- 0 KB added JS.
- Inline SVG ≤6 KB gzip; component CSS ≤3 KB gzip; DOM ≤180 nodes (the chord numbers and the legend are gone); no images or extra fonts (Martian Mono is not used).
- Animated properties: transform and opacity only. Total reveal ≤900ms.
- No infinite animation; the page's cap of two infinite animations is unchanged.
- `aspect-ratio: 1` on the frame, so CLS is 0. INP: a radio change is a style recalc only (target <50ms on a mid-range Android).
- It sits below the fold, so there is no effect on LCP.

### 5.7 The example campaign strip (fictional, labelled)

**Hub only** (home drops it; the Overture is the home example). `MockFrame ground="putih"` (so `data-nosnippet` + `inert`) with the label `Contoh kampanye · bukan klien Logink` / `Example campaign · not a Logink client`. MockFrame gains an optional `label?: string` prop; the default stays `Ilustrasi · data contoh`.
- **Title:** `Kedai Contoh · peluncuran menu es kopi susu gula aren` / `Kedai Contoh · launching an iced palm-sugar coffee`
- **Idea:** `Satu ide: "Es kopi susu gula aren, antar se-Tebet."` / `One idea: "Iced palm-sugar coffee, delivered across Tebet."`
- **Lines** (each prefixed by the node's stage dot; 2 columns on desktop, 1 on phones):

| Node | ID | EN |
|---|---|---|
| SEO | Artikel dan halaman menu untuk "kopi susu gula aren dekat Tebet" | An article and menu page for "kopi susu gula aren dekat Tebet" |
| Local SEO | Google Post menu baru (paket Growth) dan balasan untuk setiap ulasan | A Google Post for the new menu (Growth plan) and a reply to every review |
| Kreatif | Satu sesi foto dan video, dipotong 1:1, 9:16, dan 16:9 | One photo and video shoot, cut 1:1, 9:16 and 16:9 |
| Social | 3 Reels dan story promo dari sesi yang sama | 3 Reels and a promo story from the same shoot |
| Website | Landing page menu dengan tombol WhatsApp | A menu landing page with a WhatsApp button |
| Iklan | Iklan search untuk kata kunci SEO yang sama, lalu retargeting pengunjung website | Search ads on the same SEO keywords, then retargeting of website visitors |
| SEO AI | FAQ menu yang mudah dikutip | A menu FAQ written to be quoted |
| WhatsApp | "Halo, masih buka? Mau pesan 2 kopi susu." | "Halo, masih buka? Mau pesan 2 kopi susu." (customer quote, stays Indonesian per 03a §3.6) |

There are no numbers, dates, real brands or results. Kedai Contoh, `contohkedai.id` and the Tebet query are the fictional entities from `content/instruments.ts`.

### 5.8 SSR text version: the real table (crawlers and AI read this)

`DataTable { caption, head, rows, stack: true, rowHeaders: true }` with `id="koneksi-kanal"`.
- It is **not** inside MockFrame or `data-nosnippet`: these connections describe the real offer, so they may be quoted.
- On the hub it renders open. On home it sits in `<details><summary>Tabel: kanal mana mengisi kanal mana</summary>…</details>` (EN `Table: which channel feeds which`). The contents stay mounted, which G-rules allow for `<details>`.
- Service names are links via `svcHref(k, l)`, with the registry `name` as anchor text. The label follows in brackets.

Caption: `Bagaimana kanal saling mengisi dalam Kampanye 360°` / `How the channels feed each other in a 360° campaign`. Head: `Kanal · Menerima dari · Memberi ke` / `Channel · Fed by · Feeds`.

| Kanal | Menerima dari | Memberi ke |
|---|---|---|
| Jasa SEO Profesional | Website & Landing Page (fondasi teknis) · Social Media Management (ide konten) | Iklan Google & Meta Ads (kata kunci) · SEO AI (GEO & AEO) (konten & schema) |
| Local SEO & Google Maps | Desain Grafis & Video (foto untuk profil) | SEO AI (GEO & AEO) (data entitas) · WhatsApp (tautan WhatsApp di profil Google) |
| Social Media Management (Instagram, TikTok, Facebook, LinkedIn) | Desain Grafis & Video (visual & video) | Jasa SEO Profesional (ide konten) · SEO AI (GEO & AEO) (sebutan brand) |
| Desain Grafis & Video | Strategi kampanye (satu ide) | Social Media Management (visual & video) · Iklan Google & Meta Ads (materi & copy iklan) · Website & Landing Page (copy & visual halaman) · Local SEO & Google Maps (foto untuk profil) |
| Website & Landing Page | Desain Grafis & Video (copy & visual halaman) · Iklan Google & Meta Ads (trafik ke landing page) | Jasa SEO Profesional (fondasi teknis) · SEO AI (GEO & AEO) (situs terbaca mesin) · Iklan Google & Meta Ads (pixel & audiens) · WhatsApp (tombol chat) |
| SEO AI (GEO & AEO) | Jasa SEO Profesional (konten & schema) · Local SEO & Google Maps (data entitas) · Social Media Management (sebutan brand) · Website & Landing Page (situs terbaca mesin) | Laporan bulanan (kutipan dan sebutan AI yang dipantau). K1 confirmed: `Laporan kampanye` |
| Iklan Google & Meta Ads (Google, Meta, TikTok, Marketplace) | Jasa SEO Profesional (kata kunci) · Desain Grafis & Video (materi & copy iklan) · Website & Landing Page (pixel & audiens) | Website & Landing Page (trafik ke landing page). K11 confirmed: `· WhatsApp (click-to-WhatsApp)` |
| WhatsApp | Website & Landing Page (tombol chat) · Local SEO & Google Maps (tautan WhatsApp di profil Google). K11 confirmed: `· Iklan Google & Meta Ads` | Laporan bulanan (klik dari website dan iklan). K1 + K4 confirmed: `Laporan kampanye (klik per kanal)` |

The rows are built from `EDGES`, so the gated cells appear by themselves when a flag turns true. The launch table has no "laporan kampanye" and no click-to-WhatsApp ad.

EN uses the registry EN names (SEO & Content Marketing, Local SEO & Google Maps, Social Media Management, Graphic Design & Video, Websites & Landing Pages, AI Search Optimization (GEO & AEO), Google & Meta Ads) and the EN edge labels from §3.3.
- EN head: `Channel · Fed by · Feeds`.
- "Strategi kampanye (satu ide)" becomes "Campaign strategy (one idea)".
- "Laporan bulanan" becomes "Monthly report"; the K1-confirmed "Laporan kampanye" becomes "Campaign report".
- "(klik dari website dan iklan)" becomes "(clicks from the website and ads)".

`<tfoot>` sentence (one cell spanning 3 columns):
- ID `Semua kanal menerima satu strategi dan satu ide, dan mengirim datanya ke satu laporan bulanan.`
- EN `Every channel receives one strategy and one idea, and sends its data to one monthly report.`
- K1 fallback: `…ke review bulanan bersama tim.` / `…to the monthly review with the team.`

When edges 17 and 18 are confirmed, rows 1, 3 and 7 gain `Iklan Google & Meta Ads (data search term)` and `Social Media Management (audiens yang berinteraksi)` automatically, because the rows are built from `EDGES`.

## 6. Service pages: 'Posisi dalam kampanye 360°'

### 6.1 The module (replaces 'Posisi di loop', block 05 of 03b §3.8)

- **Component:** keep the file `sections/service/LoopPosition.tsx` (no rename churn); only its heading and content change. Its `id` is `kampanye-360`.
- **Heading:** `Posisi dalam kampanye 360°` / `Its place in a 360° campaign`.
- **Content, in order:**
  1. The `StageStrip variant="loop" active={svc.stage}`, unchanged.
  2. `CampaignMap focus={k} table="none"`: the standard frame (`min(100%, 340px)`), static, only this node's chords drawn (§5.4).
  3. Two short lists as `<dl>`s side by side (stacked on phones):
     - **`Diisi oleh`** / **`Fed by`**: the services that feed this one;
     - **`Mengisi`** / **`Feeds`**: the services this one feeds.
     - Each item is a registry-name link plus one sentence. WhatsApp is plain text.
  4. **The note**, a flat inset: `bg-surface-alt` with a 1px `--line` border, radius 0, no shadow. (A Kertas inset would vanish on the Kertas pages, SEO and Local SEO; the surface tokens resolve per ground, so every text node stays on a token surface.)
     - `<p class="t-h3">Bisa sendiri, lebih kuat terhubung</p>` / `Works alone, stronger connected`
     - the sentence below;
     - link `Lihat cara kerja Kampanye 360°` / `See how a 360° campaign works` → `/layanan#kampanye-360` (EN `/en/services#kampanye-360`);
     - WaButton size sm with the **upgrade prefill** `WA_PATTERNS.upgrade(name)` (new in `services.ts`, Core):
       - ID `Halo Logink! Saya tertarik dengan {name} sebagai bagian dari Kampanye 360°.`
       - EN `Hi Logink! I'm interested in {name} as part of a 360° campaign.`
       - `data-placement="campaign" data-service="{k}"`.
  - Note sentences, branched on `svc.price`:
    - price set (SEO, Local SEO, Iklan, Website): ID `{name} bisa diambil sendiri dengan harga di halaman ini.` / EN `{name} can be hired on its own at the prices on this page.`
    - `price` null (Social, Kreatif, SEO AI): ID `{name} bisa diambil sendiri dengan proposal kustom dalam 24 jam.` / EN `{name} can be hired on its own with a custom proposal within 24 hours.`
    - then, for all: ID `Dalam Kampanye 360°, layanan ini bekerja dengan kanal lain di bawah satu strategi, satu data, dan satu laporan.` / EN `In a 360° campaign it works with the other channels under one strategy, one data layer and one report.`
  - K1 fallback: `…satu strategi, satu data, dan satu review bulanan.` / `…one strategy, one data layer and one monthly review.`
- **Content type change (ServiceContent in 03a §3.4):** `loop: string` becomes
  ```ts
  type CampaignItem = { k: SvcKey | 'wa' | 'strategy' | 'report'; text: string; gate?: 'K1' | 'K5' | 'K6' | 'K11'; fallback?: string }
  campaign: { fedBy: CampaignItem[]; feeds: CampaignItem[] }
  ```
  An item with a `gate` renders only when `CAMPAIGN_CONFIRMED[gate]` is true, unless it carries a `fallback` text (the AI `report` item, §6.2), which renders instead.
  The old `loop` sentence (how it feeds Dikutip AI) is absorbed as the SEO AI item in `feeds`. `c.ai` in `AiSearchReady` (#ai-search) stays as it is.
- The note text comes from `content/campaign.ts` (`NOTE: { priced: L; quoted: L; rest: { confirmed: L; fallback: L } }`, with the `{name}` template; `rest` is the K1-gated second sentence). It is not per service; `svc.price` picks `priced` or `quoted`.

### 6.2 Copy for all 7 services (`content/services/<k>.ts` → `campaign`)

Every item links the registry `name` via `svcHref`. `wa`, `strategy` and `report` are plain text. `strategy` links to `/layanan#kampanye-360`. Items tagged with a gate render only when that flag is true.

**seo · Jasa SEO Profesional / SEO & Content Marketing**
- Diisi oleh / Fed by
  - `website`: ID `Situs yang cepat dan terstruktur rapi memberi fondasi teknis, sehingga konten SEO bisa dirayapi dan naik peringkat.` EN `A fast, well-structured site gives SEO its technical base, so content can be crawled and climb the rankings.`
  - `social`: ID `Topik yang ramai dan pertanyaan audiens di social media menjadi ide artikel.` EN `Popular topics and audience questions on social media become article ideas.`
  - `ads` [K5]: ID `Data search term dari iklan menunjukkan kata yang layak dijadikan konten.` EN `Search-term data from ads shows which words deserve content.`
- Mengisi / Feeds
  - `ads`: ID `Riset kata kunci yang sama menajamkan iklan pencarian, sehingga iklan dan konten menjawab kata yang sama.` EN `The same keyword research sharpens search ads, so ads and content answer the same words.`
  - `ai`: ID `Artikel yang menjawab langsung dan schema yang rapi adalah bahan utama agar brand Anda layak dikutip mesin AI.` EN `Answer-first articles and clean schema are the main material that makes your brand worth citing in AI answers.`

**localseo · Local SEO & Google Maps**
- Diisi oleh / Fed by
  - `creative`: ID `Foto produk dan lokasi yang bagus membuat profil Google Anda lebih meyakinkan.` EN `Good product and location photos make your Google profile more convincing.`
  - `strategy`: ID `Google Posts (paket Growth) memakai ide kampanye yang sama dengan kanal lain.` EN `Google Posts (Growth plan) use the same campaign idea as the other channels.`
- Mengisi / Feeds
  - `ai`: ID `Nama, alamat, jam buka, kategori, dan ulasan yang konsisten adalah data entitas yang dibaca Google dan mesin AI saat merekomendasikan bisnis lokal.` EN `Consistent name, address, hours, categories and reviews are the entity data Google and AI engines read when they recommend a local business.`
  - `wa`: ID `Tautan WhatsApp di profil Google dan tombol klik-ke-WhatsApp di landing page lokal membawa pencari "terdekat" langsung ke chat.` EN `The WhatsApp link on your Google profile and the click-to-WhatsApp button on your local landing page take "near me" searchers straight to a chat.` [ada: `localseo/data.ts:205, 216`]

**social · Social Media Management**
- Diisi oleh / Fed by
  - `creative`: ID `Dalam Kampanye 360°, sesi foto dan video tim kreatif bisa dipotong untuk feed, Reels, dan TikTok.` EN `In a 360° campaign, the creative team's photo and video sessions can be cut for feed, Reels and TikTok.` (The TikTok module shoots its own video, `social/data.ts:236`, so this never says the creative team handles all shoots.)
  - `strategy`: ID `Kalender konten bulanan berangkat dari ide kampanye yang sama dengan iklan dan website.` EN `The monthly content calendar starts from the same campaign idea as the ads and website.`
- Mengisi / Feeds
  - `seo`: ID `Pertanyaan yang muncul di komentar dan DM menjadi ide konten untuk artikel SEO.` EN `Questions that come up in comments and DMs become content ideas for SEO articles.`
  - `ai`: ID `Sebutan brand yang konsisten di Instagram, TikTok, dan Facebook ikut menjadi sinyal bagi mesin AI.` EN `Consistent brand mentions on Instagram, TikTok and Facebook are signals AI engines pick up.`
  - `ads` [K6]: ID `Audiens yang sudah berinteraksi bisa disapa lagi lewat iklan Meta.` EN `People who already engaged can be reached again with Meta ads.`

**creative · Desain Grafis & Video / Graphic Design & Video**
- Diisi oleh / Fed by
  - `strategy`: ID `Brief kreatif berangkat dari satu ide kampanye yang dipakai semua kanal.` EN `The creative brief starts from one campaign idea that every channel uses.`
- Mengisi / Feeds
  - `social`: ID `Satu sesi syuting menghasilkan feed, story, Reels, dan TikTok dalam format yang tepat.` EN `One shoot produces feed posts, stories, Reels and TikToks in the right formats.`
  - `ads`: ID `Banner, video, dan copy iklan dibuat khusus per platform, dengan varian untuk diuji.` EN `Banners, video and ad copy are made for each platform, with variants to test.`
  - `website`: ID `Copy landing page dan key visual kampanye menjaga halaman selaras dengan iklan yang mengantar pengunjung.` EN `Landing page copy and the campaign key visual keep the page in line with the ads that bring visitors.`
  - `localseo`: ID `Foto produk dan lokasi mengisi profil Google Business.` EN `Product and location photos fill your Google Business Profile.`

**website · Website & Landing Page / Websites & Landing Pages**
- Diisi oleh / Fed by
  - `creative`: ID `Copy dan visual halaman datang dari ide kampanye yang sama.` EN `Page copy and visuals come from the same campaign idea.`
  - `ads`: ID `Iklan mengantar pengunjung ke landing page kampanye, dan datanya menunjukkan versi halaman mana yang perlu diuji.` EN `Ads send visitors to campaign landing pages, and the data shows which page version to test next.`
- Mengisi / Feeds
  - `seo`: ID `HTML yang bersih, kecepatan, dan sitemap memberi fondasi teknis untuk SEO.` EN `Clean HTML, speed and a sitemap give SEO its technical base.`
  - `ai`: ID `Structured data dan halaman yang mudah dibaca mesin membantu AI memahami bisnis Anda.` EN `Structured data and machine-readable pages help AI understand your business.`
  - `ads`: ID `GA4 dan Meta Pixel mencatat pengunjung, sehingga iklan bisa diukur dan menyapa mereka lagi lewat retargeting.` EN `GA4 and the Meta Pixel record visitors, so ads can be measured and reach them again through retargeting.`
  - `wa`: ID `Tombol chat WhatsApp mengubah kunjungan menjadi percakapan.` EN `The WhatsApp chat button turns a visit into a conversation.`

**ai · SEO AI (GEO & AEO) / AI Search Optimization (GEO & AEO)**
- Diisi oleh / Fed by
  - `seo`: ID `Artikel yang menjawab langsung dan schema yang rapi menjadi sumber yang bisa dikutip.` EN `Answer-first articles and clean schema become sources that can be cited.`
  - `localseo`: ID `Data profil Google yang lengkap dan konsisten memperjelas siapa Anda dan di mana Anda berada.` EN `Complete, consistent Google profile data makes clear who you are and where you are.`
  - `social`: ID `Sebutan brand di social media menambah sinyal bahwa bisnis Anda nyata dan aktif.` EN `Brand mentions on social media add signals that your business is real and active.`
  - `website`: ID `Situs yang cepat dan terstruktur memudahkan crawler AI membaca dan mengutip halaman Anda.` EN `A fast, structured site makes it easy for AI crawlers to read and cite your pages.`
- Mengisi / Feeds
  - `report` [K1]: ID `Kutipan dan sebutan di jawaban AI dipantau setiap bulan dan masuk ke laporan kampanye. Kami tidak menjamin kutipan.` EN `Citations and mentions in AI answers are tracked every month and go into the campaign report. We do not guarantee citations.` Fallback (renders while K1 is false): ID `…dipantau setiap bulan dan masuk ke laporan bulanan. Kami tidak menjamin kutipan.` EN `…tracked every month and go into the monthly report. We do not guarantee citations.`

**ads · Iklan Google & Meta Ads / Google & Meta Ads**
- Diisi oleh / Fed by
  - `seo`: ID `Kata kunci dari riset SEO menjadi dasar struktur kampanye dan copy iklan pencarian.` EN `Keywords from SEO research shape the campaign structure and the search ad copy.`
  - `creative`: ID `Materi dan copy iklan dibuat per platform oleh tim kreatif dari ide kampanye yang sama.` EN `Ad creative and copy are made per platform by the creative team from the same campaign idea.`
  - `website`: ID `GA4 dan Meta Pixel di website menyediakan data konversi dan audiens untuk retargeting.` EN `GA4 and the Meta Pixel on the website provide conversion data and audiences for retargeting.` (No tier detail: the copy contradicts itself on retargeting tiers, owner decision 6.)
- Mengisi / Feeds
  - `website`: ID `Iklan mengantar trafik ke landing page kampanye, lengkap dengan tombol WhatsApp.` EN `Ads bring traffic to campaign landing pages, complete with a WhatsApp button.`
  - `wa` [K11]: ID `Iklan click-to-WhatsApp membuka chat langsung dari iklan.` EN `Click-to-WhatsApp ads open a chat straight from the ad.`
  - `seo` [K5]: ID `Data search term dari iklan menunjukkan kata yang layak dijadikan konten.` EN `Search-term data from ads shows which words deserve content.`

The `strategy` items for Local SEO and Social are the spokes (centre → node), not chords. They appear in these lists because the lists are about what a service receives. In the map they are the dashed spokes.

**Word budget.** The module adds about 90–140 SSR words per service page. That helps the 900–1,300 targets and replaces the one `loop` sentence.

## 7. Services hub `/layanan` · `/en/services` (and About)

### 7.1 H1, title, meta

| Element | ID | EN | Change |
|---|---|---|---|
| H1 (03a item 3, binding) | `Layanan Digital Marketing 360° di Jakarta: Harga dan Paket Setiap Layanan` | `360° Digital Marketing Services in Jakarta: Prices and Packages for Every Service` | **None.** It already joins "360°" and "every service" and carries the price intent from the PAA "Berapa biaya jasa digital marketing?". The two modes live in the lede and in ModeChoice. |
| Title | `Layanan & Harga Digital Marketing Jakarta \| Logink` | `Digital Marketing Services & Pricing Jakarta \| Logink` | **None.** It deliberately avoids "Jasa Digital Marketing Jakarta", which the home title now owns (§2.3), so the two pages don't compete. |
| Meta | `Harga dan paket setiap layanan digital marketing: SEO, Local SEO & Google Maps, iklan, social media, desain & video, website, SEO AI, atau Kampanye 360°.` (153) | `Prices and packages for every Logink service: SEO, Local SEO & Google Maps, ads, social media, design & video, websites, AI search, or a 360° campaign.` (151) | **Changes** from 03a item 3 (`PAGES.hub.desc`, Core). It keeps the "harga dan paket" wording CRITIC approved and the full service list, and adds the 360° mode. |

### 7.2 Hub page order (amends 02c `HubPage`)

1. **Hero.**
   - H1.
   - **Lede** (declared conflict with 03c item 2, resolved additively): keep the **03c lede as specified** (40–60 words naming the 6 services + SEO AI, the starting prices for SEO, Local SEO, Iklan and Website, and the 24-hour proposal for Social and Kreatif), then **append** one sentence:
     - ID `Atau jalankan kanal yang Anda butuhkan sebagai satu Kampanye 360°: satu tim, satu strategi, satu data, satu laporan.`
     - EN `Or run the channels you need as one 360° campaign: one team, one strategy, one data layer, one report.`
     - K1 fallback: `…satu data, satu review bulanan.` / `…one data layer, one monthly review.`
     - The lede grows to about 55–75 words; 03c's 40–60 cap is lifted for this one sentence.
   - CTA pair (hub prefill + Penawaran).
   - `ModeChoice context="hub"` (panel A links `#harga`).
2. `StageStrip strip` (unchanged).
3. `ServicesTable id="harga"` with the `<tfoot>` 360° row. On the hub its link is the in-page `#kampanye-360`.
4. **NEW `<Section id="kampanye-360" data-ground="putih">`**, the canonical home of the offer. Component: `sections/hub/Campaign360Offer.tsx` (Hubs pkg).
   - **H2:** `Kampanye 360°: satu kampanye, semua kanal` / `360° campaign: one campaign, every channel`.
   - **Lead** (34 / 40 words; Stabilo on the first sentence):
     - ID `Kampanye 360° menggabungkan layanan yang Anda butuhkan menjadi satu kampanye yang dijalankan satu tim. Kanal yang dipilih berbagi satu data dan satu laporan. Harganya lewat proposal kustom, karena kanal dan volume setiap bisnis berbeda.`
     - EN `A 360° campaign combines the services you need into one campaign run by one team. The channels you choose share one data layer and one report. It is priced by custom proposal, because channels and volumes differ for every business.`
     - K1 fallback for the middle sentence: `Kanal yang dipilih berbagi satu data dan satu review bulanan.` / `The channels you choose share one data layer and one monthly review.`
     - It states no minimum scope: K7 is an internal sales rule (§1.2).
   - **The same four pillars** as home §4.5: this section maps `PILLARS` to its own 4-item `<dl>`, like home. No shared component, no cross-package import.
   - **H3 `Cara memulai` / `How to start`**, an `<ol>` of 3:
     1. `Ceritakan bisnis Anda` / `Tell us about your business`: `Lewat WhatsApp atau formulir: kanal yang sudah berjalan, tujuan, dan budget.` / `On WhatsApp or through the form: the channels already running, your goal and your budget.`
     2. `Terima proposal` / `Get a proposal`: `Kanal, lingkup kerja, dan biaya per bulan, termasuk saran budget iklan bila ada iklan.` / `Channels, scope and the monthly fee, including a recommended ad budget if ads are in scope.` [ada: `recommendedAdSpend`, `ads/data.ts:19`]
     3. `30 hari pertama` / `The first 30 days`: `Discovery di Hari 1–3, roadmap 90 hari di Hari 4–7, lalu semua kanal berjalan paralel di Hari 8–30.` / `Discovery on days 1–3, a 90-day roadmap on days 4–7, then every channel runs in parallel on days 8–30.` [ada: `HowWeWorkSection.tsx:19-33`]
   - **Line:**
     - ID `Belum perlu semua kanal? Mulai dari satu layanan di tabel di atas, lalu sambungkan kanal lain kapan saja.`
     - EN `Don't need every channel yet? Start with one service from the table above and connect more channels any time.`
   - `CampaignMap table="open" example`.
   - CTA pair: WaButton (`WA_PATTERNS.campaign360`) + `Minta proposal 360°`.
5. `StageBands` (unchanged).
6. **FAQ, capped at 8** (declared conflict with 03c's 4–6): §9 Q1, Q2, Q4, Q5, the existing Local SEO billing question, and 3 existing hub questions (`hub.ts`). Q3 is a reserve: the open `#koneksi-kanal` table in the offer section already says the same.

**Hub word target** (declared conflict with 03c's 700–1,000): **1,200–1,700**, because the offer section, the open table and the FAQ add about 700 words. Logged with home's 1,300–1,700 as an open_issue against 06 §6.2 (§4.10).

**Hub schema** (keeps 03c and the 08b resolution): CollectionPage + `itemListNode` + breadcrumb + FAQ, with no Offer. The hub's `itemListNode` gains an 8th item, `{hub}#kampanye-360`, and the hub emits the 360° Service node (§8). No `hasOfferCatalog`.

### 7.3 About page (copy moved in 03a)

- The value card "Cakupan 360°" / "360° Coverage":
  - ID `Enam layanan + SEO AI, diambil satu per satu atau dijalankan sebagai satu kampanye yang terhubung.`
  - EN `Six services + AI search, hired one at a time or run as one connected campaign.`
  - This replaces "Lima layanan terintegrasi…", in line with 03a's "Enam layanan + SEO AI".
- The entity paragraph uses the new ENTITY verbatim.
- **Meta** (`PAGES.about.desc`, Core; today's "satu sistem terintegrasi" at `services.ts:228` breaks §1.3):
  - ID `Logink adalah agensi digital marketing 360° di Jakarta: setiap layanan bisa diambil sendiri atau dijalankan sebagai satu kampanye terhubung untuk brand Anda.` (157)
  - EN `Logink is a 360° digital marketing agency in Jakarta: hire any service on its own, or run them as one connected campaign built for Indonesian brands.` (149)

## 8. Schema

- **`orgNode.description` = the new ENTITY**, in the page language, on every page. `knowsAbout` stays as the visible service names.
- **No `hasOfferCatalog`.** It would hold bare `@id` references to Service nodes that are not in the home graph, earn no rich result, duplicate `itemListNode` and contradict the 08b resolution.
- **`itemListNode` stays** on home (03b §3.7, the 7 services) and on the hub (03c).
  - **Hub only:** the list gains an 8th `ListItem` pointing to `{hub}#kampanye-360` (`https://logink.co/layanan#kampanye-360`, EN `https://logink.co/en/services#kampanye-360`), and the hub emits that Service node in full.
  - Home's list is unchanged: the 360° node is not in the home graph.
- **360° Service node** (hub only, where the offer lives):
  ```json
  { "@type": "Service", "@id": "https://logink.co/layanan#kampanye-360",
    "url": "https://logink.co/layanan#kampanye-360", "name": "Kampanye 360°",
    "description": "<the hub offer lead's first sentence, verbatim>",
    "provider": { "@id": "https://logink.co/#organization" },
    "areaServed": "<same value as the service nodes>" }
  ```
  - It has **no `offers`, no `priceRange` and no `serviceType`** (a ≥20-character serviceType string would need to be visible).
  - The EN `@id` is `https://logink.co/en/services#kampanye-360` and the name is `360° campaign`.
- **Service pages:** `serviceNode` is unchanged, plus one property, `"isRelatedTo": { "@id": "<hub url>#kampanye-360" }` in the page locale. This ties every service to the combined offer; `isRelatedTo` is valid on Service.
- **Offer stays only on the priced service pages:** seo, localseo, ads and website, which are the 4 with a registry `price`. Note that 02a §2.4 says "6 priced service pages", but the registry has 4 prices and 03b §3.8 already lists these 4; 03b is right. There is no Offer on home, the hub, Social, Creative, AI or the 360° node.
- **FAQPage** on home (7) and hub (8) mirrors the visible questions (§4.9, §7.2). Every answer is visible in `<details>`.

## 9. FAQ additions (ID + EN; 40–80 words; the first sentence answers)

Home shows Q1, Q2 and Q4 (§4.9). The hub shows Q1, Q2, Q4 and Q5 (§7.2). Q3 is a reserve that renders nowhere at launch. Word counts are ID/EN.

**Q1 · `Apa itu digital marketing 360°?` / `What is 360° digital marketing?`** (57/62)
- ID: Digital marketing 360° adalah cara menjalankan semua kanal digital sebagai satu kampanye yang terhubung, bukan proyek terpisah. Di Logink artinya satu strategi dan satu ide diadaptasi untuk SEO, Google Maps, social media, iklan, konten kreatif, dan website; setiap kanal mengisi kanal lain; hasilnya dibaca dari satu data dan dilaporkan dalam satu laporan bulanan, sampai ke chat WhatsApp.
- EN: 360° digital marketing means running every digital channel as one connected campaign instead of separate projects. At Logink, one strategy and one idea are adapted for SEO, Google Maps, social media, ads, creative content and your website; each channel feeds the others; results are read from one data layer and reported in one monthly report, all the way to the WhatsApp chat.
- K1 fallback: `…dan dibahas dalam satu review bulanan…` / `…and discussed in one monthly review…`.
- This answers the PAA "360 marketing itu apa?" and "Apa itu agency 360?" (§2.1).

**Q2 · `Apakah saya harus mengambil semua layanan?` / `Do I have to take every service?`** (56/68)
- ID: Tidak. Setiap layanan bisa diambil sendiri, dengan paket dan harga (atau penawaran) di halamannya. Anda bisa mulai dari satu kanal, misalnya Local SEO & Google Maps atau website, lalu menyambungkan kanal lain setelah melihat datanya. Kampanye 360° cocok ketika beberapa kanal sudah berjalan tetapi belum saling terhubung, atau ketika Anda ingin satu tim yang mengurus semuanya.
- EN: No. Every service can be hired on its own, with the packages and price (or quote) on its page. You can start with one channel, such as Local SEO & Google Maps or a website, then connect more channels once you see the data. A 360° campaign fits when several channels are already running but not connected, or when you want one team to handle all of them.
- "(atau penawaran)" / "(or quote)" covers Social, Kreatif and SEO AI. "Anda bisa mulai" replaces the unsourced "Banyak bisnis mulai".

**Q3 · `Bagaimana kanal-kanal ini terhubung?` / `How do the channels connect?`** (58/59) · reserve, not rendered at launch
- ID: Kanal saling mengisi lewat data dan materi yang sama. Kata kunci dari riset SEO menajamkan iklan pencarian. Satu sesi foto dan video dipotong untuk social media, iklan, dan website. Data profil Google, konten SEO, dan sebutan di social media membantu mesin AI mengenali bisnis Anda. Pengunjung website bisa disapa lagi lewat retargeting, dan semuanya berakhir di tombol WhatsApp.
- EN: Channels feed each other through shared data and materials. Keywords from SEO research sharpen search ads. One photo and video shoot is cut for social media, ads and the website. Google profile data, SEO content and social mentions help AI engines recognise your business. Website visitors can be reached again through retargeting, and everything ends at the WhatsApp button.
- Every claim is a live edge (1, 2, 4, 5, 6–8, 11, 12, 13, 15); "semuanya berakhir di tombol WhatsApp" rests on 13 and 15, not on edge 16 (K11). If it is ever rendered, it links `Tabel koneksi antarkanal` / `The channel connection table` → `#koneksi-kanal` on the same page.

**Q4 · `Bagaimana hasil kampanye dilaporkan?` / `How are campaign results reported?`** (61/63)
- ID: Dalam Kampanye 360°, hasil semua kanal dilaporkan dalam satu laporan bulanan: traffic dan konversi dari GA4, performa pencarian dari Search Console, hasil iklan, insight Google Business, performa social media, dan klik WhatsApp per kanal. Laporan dibahas dalam satu sesi review bersama tim yang menjalankan kampanye. Akun iklan, GA4, dan Search Console tetap milik Anda, jadi setiap angka bisa Anda cek sendiri.
- EN: In a 360° campaign, every channel is reported in one monthly report: traffic and conversions from GA4, search performance from Search Console, ad results, Google Business insights, social performance and WhatsApp clicks by channel. The report is discussed in one review session with the team running the campaign. Ad accounts, GA4 and Search Console stay yours, so you can check each number yourself.
- **Full fallback if K1 and/or K4 is not confirmed** (63/64; this is what ships at launch):
  - ID: Dalam Kampanye 360°, setiap layanan bulanan (SEO, Local SEO, social, iklan) tetap punya laporan bulanan: traffic dan konversi dari GA4, performa pencarian dari Search Console, hasil iklan, insight Google Business, dan performa social media. Semua laporan dibahas dalam satu sesi review bulanan bersama tim yang menjalankan kampanye. Akun iklan, GA4, dan Search Console tetap milik Anda, jadi setiap angka bisa Anda cek sendiri.
  - EN: In a 360° campaign, each monthly service (SEO, Local SEO, social, ads) keeps its monthly report: traffic and conversions from GA4, search performance from Search Console, ad results, Google Business insights and social performance. All of them are discussed in one monthly review with the team running the campaign. Ad accounts, GA4 and Search Console stay yours, so you can check each number yourself.

**Q5 · `Berapa biaya Kampanye 360°?` / `How much does a 360° campaign cost?`** (71/78) · hub only
- ID: Kampanye 360° dihargai lewat proposal kustom, karena kanal, volume konten, dan target setiap bisnis berbeda. Sebagai acuan, harga mulai untuk SEO, Local SEO, Iklan, dan Website tertulis di tabel layanan dan harga, misalnya Local SEO mulai Rp 1 Juta per bulan (ditagih tahunan) dan SEO mulai Rp 6 Juta per bulan; Social, Kreatif, dan SEO AI lewat proposal dalam 24 jam. Budget iklan dibayar langsung ke platform, terpisah dari biaya jasa.
- EN: A 360° campaign is priced through a custom proposal, because channels, content volume and targets differ for every business. As a reference, starting prices for SEO, Local SEO, Ads and Websites are in the services and prices table, for example Local SEO from IDR 1M a month (billed annually) and SEO from IDR 6M a month; Social, Creative and AI search are quoted within 24 hours. Ad spend is paid directly to the platforms, separate from our fee.
- The prices are from the registry: `localseo.price`, `seo.price`. The "ditagih tahunan" rule is honoured. Only the four priced services are said to have a written price. The ad-spend line is [ada] (`ads/data.ts:279`). There is no discount claim (K8).

## 10. Proposal artifact and Miro board: wording changes

Nothing is edited by this pass. These are the lines to change.

**Proposal page** `/Users/mm/logink/redesign-2026/artifact/sehari-semalam.html` (also published as an Artifact):
1. The intro "tells 360° digital marketing, including AEO and GEO, as one Jakarta day" becomes "shows 360° as one connected campaign across every Logink channel, including AEO and GEO, and proves it with one Jakarta day".
2. The section "360° is one full turn of the sun" becomes **"360° is one campaign, every channel, connected"**. Its body gains: "The day is the proof: one customer meets one campaign on four channels, and overnight the data loops back into the next morning's plan."
3. The card "Tell 360° as one day" becomes "Two ways to buy: one service, or a 360° campaign", with one line each for (A) and (B) from §1.2.
4. "The same six services and the same URLs" gains "…sold one by one or as one 360° campaign".
5. The day dial motif line "…and the 'Posisi di loop' strip on service pages" becomes "'Posisi dalam kampanye 360°'". The same change applies to the service-template row "Posisi di loop: The day dial with this service lit…", which becomes "Posisi dalam kampanye 360°: what feeds this service and what it feeds, plus 'Bisa sendiri, lebih kuat terhubung'".
6. The homepage storyboard gets a new card "05 · Satu kampanye, semua kanal · Peta kampanye 360° (live HTML, CSS-only interaction, SSR table)" between the Lead Profiler and the Overture. The Overture card is relabelled "Contoh kampanye: sehari, satu pelanggan".
7. Owner decisions gain confirmations K1–K11 (§3.6), including the §2.4 URL question (K10, default no) and click-to-WhatsApp ads (K11).

**Miro board** `https://miro.com/app/board/uXjVHhnolVA=`:
1. The frame **"04 The 360 loop"** is renamed **"04 The 360° campaign"**.
   - Subtitle: "One campaign across every channel, connected. The day is the proof."
   - Label the existing stage connectors with the chord labels (kata kunci, visual & video, data entitas, pixel & audiens, tautan WhatsApp di profil Google).
   - Add a sticky "Two ways to buy: Satu layanan · Kampanye 360°".
2. **"01 Brief":** the 360 sticky becomes "360° = the whole digital campaign, connected (owner, 27 Sep 2026). Individual services still sold."
3. **"05 Directions":** the "360 in One Day" text becomes "360° campaign, proved in one day".
4. **"06 Homepage storyboard":** insert the card "05 · Satu kampanye, semua kanal (Peta kampanye 360°)" after the Lead Profiler, and relabel the Overture card "Contoh kampanye".
5. **"07 Your decisions":** add stickies "Own URL for 360°? (default no)", "One combined report? (K1)", "One contact person? (K2)", "TikTok pixel? (K3)", "WhatsApp attribution per channel? (K4)", "360° minimum scope, internal (K7)" and "Click-to-WhatsApp ads? (K11)".

## 11. Both modes across the site: navigation, CTAs, WhatsApp, forms

| Surface | (A) Satu layanan | (B) Kampanye 360° |
|---|---|---|
| **Mega menu** (`MegaMenu`, popover, 0 KB JS) | **First:** the 3 `GROUPS` columns, unchanged, under a small caption `Satu layanan` / `One service` (the service pages carry the search demand) | **Last:** a flat inset card, the 4th column at ≥1280px and a full-width strip under the columns at 1024–1279px (four columns crowd the 1024 panel). Eyebrow `SEMUA KANAL` / `EVERY CHANNEL`; name `Kampanye 360°`; line `Semua kanal yang Anda butuhkan, satu tim, satu kampanye.` / `Every channel you need, one team, one campaign.`; links `Cara kerjanya` → `/layanan#kampanye-360` and a WhatsApp text link with `WA_PATTERNS.campaign360` (`data-placement="menu" data-service="360"`). Text sits on the menu's own token surface (Putih by day, Malam by night), with links in magenta by day and Jingga by night. |
| **Mobile menu** (`<dialog>`) | The 7 services, as today, first | After the 7 services: `Kampanye 360° (semua kanal)` / `360° campaign (every channel)` → hub anchor |
| **Header** | unchanged | No new top-level item. The 1024px header has no room, and the mega menu and hero already carry it. Owner option: add `Kampanye 360°` as a top-level link at ≥1280px later. |
| **Footer** | the 7 services, as today, first | After the 7 services in the services column: `Kampanye 360° (semua kanal)` / `360° campaign (every channel)` → hub anchor. ENTITY (new) verbatim. |
| **Home** | ModeChoice panel A, the table, the Profiler's 7 chips | hero lede + "two ways" line, ModeChoice panel B, the table `<tfoot>` row, the Profiler's 360° chip, section 05, the Overture as the example, the closing-band link, FAQ Q1, Q2, Q4 |
| **Hub** | ModeChoice A, the table | lede, ModeChoice B, `<tfoot>`, the `#kampanye-360` offer section, FAQ Q1, Q2, Q4, Q5 |
| **Service pages** | everything as specified | the 'Posisi dalam kampanye 360°' module + the 'Bisa sendiri, lebih kuat terhubung' note with the upgrade prefill; the closing-band lede (§4.8) |
| **Contact** (`/contact`, form) | today's service checkboxes | a first checkbox `Kampanye 360° (semua kanal)` / `360° campaign (every channel)`; `?layanan=360` preselects it; POST `services` accepts `'360'` (JSON field, no migration) |
| **llms.txt** | the 7 services | ENTITY (new), plus the line `- Kampanye 360°: layanan di atas sebagai satu kampanye terhubung, proposal kustom. https://logink.co/layanan#kampanye-360` (EN twin in the EN block) |

**WhatsApp prefills** (all through `waLink()`; existing strings kept verbatim):

| Key | ID | EN | Used by |
|---|---|---|---|
| per service (`svc(k).wa`) | unchanged | unchanged | service heroes, tier CTAs, table rows, Profiler service chips (no JS) |
| `page('home').wa`, `page('hub').wa` | unchanged | unchanged | the WhatsApp pill, bottom bar and closing-band button on those pages |
| **`WA_PATTERNS.campaign360`** (already shipped, `services.ts:334`; the only source, no `WA_360` and no `OFFER_360.wa`) | `Halo Logink! Saya tertarik Kampanye 360° untuk bisnis saya.` | `Hi Logink! I'm interested in a 360° campaign for my business.` | ModeChoice B, table `<tfoot>`, section 05, hub offer, mega menu, the Profiler 360° chip (no JS), the closing-band text link |
| **`WA_PATTERNS.upgrade(name)`** (new) | `Halo Logink! Saya tertarik dengan {name} sebagai bagian dari Kampanye 360°.` | `Hi Logink! I'm interested in {name} as part of a 360° campaign.` | the service-page note |

**CTA attributes:**
- `data-service` widens from `SvcKey | 'none'` to `SvcKey | '360' | 'none'`.
- `data-placement` gains `campaign`.
- GA4 then counts 360° leads separately from single-service leads with no new tracking code; the existing `data-cta` listener reads the attributes.
- The 360° prefill string is its own attribution for WhatsApp leads, as the per-service strings are today.

## 12. Owners and checks

**Owners.** This extends BUILD.md's §11 owner line (which names only ENTITY and the home title for Core). The registry is frozen after W1 (03a §3.1), so Core lands its items in W1 or as one logged registry change. The per-file work is the checklist at the top of this file.

| Package | Owns |
|---|---|
| Core | `services.ts`: ENTITY (fix), `PAGES.home.desc` (fix), `PAGES.hub.desc`, `PAGES.about.desc`, `FACT_STRIP[1]`, `ads.line` (drop the K11 clause), `OFFER_360`, `WA_PATTERNS.upgrade`, `offerHref`; `meta.ts` `orgNode`; the llms.txt route |
| Chrome | `ds/ModeChoice.tsx`, ServicesTable `<tfoot>`, MegaMenu, MobileMenu, SiteFooter, ClosingBand text |
| Instruments | `MockFrame` `label` prop, `instruments/CampaignMap.tsx` |
| Home | `sections/home/Campaign360.tsx`, the LeadProfiler 360° path, `content/home.ts` |
| Hubs | `sections/hub/Campaign360Offer.tsx`, `content/hub.ts`, `content/about.ts`, hub JSON-LD |
| Service | `content/campaign.ts` (the only owner), `content/services/*` `campaign` fields, `LoopPosition.tsx`, `serviceNode` `isRelatedTo` |
| Blog | the contact form and `/api/contact` accepting `'360'` |

`OFFER_360` is `{ name: L; line: L; anchor: 'kampanye-360' }`: name `Kampanye 360°` / `360° campaign`, line = the `<tfoot>` answer (§4.3). It has no `wa` field; the prefill is `WA_PATTERNS.campaign360`. `offerHref(l)` returns `/layanan#kampanye-360` · `/en/services#kampanye-360`.

**Checks to add (registry check / content manifest / G4):**
- ENTITY (ID) contains "yang dijalankan satu per satu atau sebagai satu kampanye terhubung"; ENTITY (EN) contains "one connected campaign".
- **K1:** with `CAMPAIGN_CONFIRMED.K1 = false`, the SSR HTML of home, hub and every service page matches none of `\b(satu laporan|one (monthly )?report|laporan kampanye|campaign report)\b` (case-insensitive). The `\b` keeps the Ads pricing copy's existing "pelaporan kampanye" (`AdsPricing.tsx:24`, about ad campaigns) from failing it.
- **K11:** with `K11 = false`, the SSR HTML contains neither "iklan click-to-WhatsApp" nor "click-to-WhatsApp ads" (the Local SEO page's "Klik-ke-WhatsApp" landing-page button is allowed).
- No `EDGES` item with `ok: false` appears in the SSR HTML.
- No 360° copy contains "dipakai ulang" or "reused".
- Each FAQ answer is 40–80 words.
- **G4 grep #11** gains `harga mulai setiap layanan|Every price is in|at published prices` (the last one catches the old home meta at `services.ts:218`).
- **G4 grep #3** (hex) covers `CampaignMap`: WhatsApp colours come from `--c-wa`, `--c-wa-label` and `--wa-edge-w`.
- **G9/G10:** home's Bab II, Bab III, Bab IV and section 05 render the same DOM at 390 and 1440 (no `display:none` on text, no second copy).
- **Docs (QA):** 07-owner-defaults §7.4 lists K1–K11 (K10 is the own-URL question, §2.4), and owner decision 6 gains the retargeting-tier contradiction (§3.6).
