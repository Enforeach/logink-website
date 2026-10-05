# BUILD · "Sehari Semalam" full redesign

The reconciled build document for branch `redesign/sehari-semalam`. No commits, pushes or deploys.

**Precedence:** BUILD parts (`docs/redesign/build/*`) > `DESIGN.md` > blueprint (`docs/redesign/blueprint-src/`, the originals in `/Users/mm/logink/redesign-2026/blueprint/`, including every CRITIC.md fix) > `directions/final.md` > research. When two BUILD parts disagree, the more specific one wins (a package section over a general rule). Report the conflict under `open_issues`.

| Part | § | Contents |
|---|---|---|
| [01a-architecture](build/01a-architecture.md) | 1.1–1.4 | Full replacement; two frontend roots (id/en) + untouched `(payload)` + `global-not-found`; layout contract; tokens.css; Tailwind globs |
| [01b-config](build/01b-config.md) | 1.5–1.7 | `next.config.ts`, middleware removal + matcher, repo-level changes |
| [01c-route-map](build/01c-route-map.md) | 1.8–1.11 | All 42 `(frontend)` files → destination, 27 + 7 redirects, URL gate |
| [02a-components](build/02a-components.md) | 2.1–2.4 | One tree, rules, **PageShell**, contracts (cursor, data attributes, mocks, JSON-LD) |
| [02b-inventory](build/02b-inventory.md) | 2.5a–c | Primitives, chrome, motion: file, S/C, props, pages |
| [02c-inventory](build/02c-inventory.md) | 2.5d–e | Instruments E1–E12 and page sections |
| [03a-content](build/03a-content.md) | 3.1–3.6 | Registry changes (AI live, fixed H1s, true price claims), `meta.ts`, `src/content/**`, Payload, ID/EN |
| [03b-home-service](build/03b-home-service.md) | 3.7–3.8 | Home order; the 15-block service template + variants |
| [03c-other-pages](build/03c-other-pages.md) | 3.9 | Hub, about, portfolio, case, blog, contact, legal, 404 |
| [04-assets](build/04-assets.md) | 4 | The one path table, `install-media.mjs` + `media.json`, fallbacks, OG |
| [05a-work-waves](build/05a-work-waves.md) | 5.1–5.2, 5.12 | Waves W1–W4, **strict file ownership**, handoffs, coordination rules |
| [05b-packages-foundation](build/05b-packages-foundation.md) | 5.3–5.6 | Core, Motion, Chrome, Instruments: inputs, steps, done criteria |
| [05c-packages-pages](build/05c-packages-pages.md) | 5.7–5.11 | Service, Home, Hubs, Blog, QA |
| [06-gates-budgets](build/06-gates-budgets.md) | 6.1–6.2 | Gate commands G1–G14 and thresholds; **the one budget table** |
| [07-owner-defaults](build/07-owner-defaults.md) | 7 | Owner defaults in force and the owner's open items |
| [08a](build/08a-critic-blockers-majors.md) · [08b](build/08b-critic-minors.md) | 8 | Every CRITIC blocker, major and minor, quoted and resolved |
| [10-motion-mounting](build/10-motion-mounting.md) | 10 | Motion pkg: the exact (M) layout lines, the chrome class contract motion.css binds to, section usage (FilmHero, ScrollSequence, ProofLoupe, ticker, lamp), checks |
| [11-positioning-360](build/11-positioning-360.md) | 11 | Strategist amendment (another pass; still being written when this index was made). Where it explicitly amends 03a/03b it wins over them. Owners of its new items: registry changes (ENTITY, home title) → Core; `content/campaign.ts` → Service; `instruments/CampaignMap.tsx` → Instruments; home section → Home; `/layanan#kampanye-360` → Hubs |

**Non-negotiables** (details in the parts):
1. Every live URL keeps its path and its ID/EN pair; nothing that returns 200 today becomes a 404.
2. SSR-complete: one visible keyword H1 per page (= the registry string), no text at opacity 0 at rest, FAQ answers mounted, real numbers.
3. Phones download 0 KB of motion JS. WhatsApp `#25D366` is always reachable.
4. No invented clients, testimonials, logos, team facts, results or dates. Mocks read "Ilustrasi · data contoh", with `data-nosnippet` on a `div`, never on a `figure`.
5. `src/components/ui/Logo.tsx` is never edited; `--font-sans` is never defined; `/admin` keeps working.
6. Real generated media only, installed by `scripts/install-media.mjs`; a missing asset shows its documented fallback, never a fake or broken `<img>`/`<video>`.

Blueprint text sources for `cp`: `docs/redesign/blueprint-src/` (drop `.txt`). DESIGN.md's "BUILD.md §x" references use the § numbers above.
