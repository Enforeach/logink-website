# 4 · Assets: one path table, install script, fallbacks, OG

Part of `docs/redesign/BUILD.md`. This is the only asset path table; it replaces every path in the blueprint (`/seq/…`, `/film/…`, `public/media/overture/…`, `src/assets/brand/…`, `/og/{l}/…`, Blob).

## 4.1 Principles

- The cinematic parts use **real generated footage**: the hero film "Buka", the Tebet rooftop time-lapse frames, and the 7 hour-lit stills. The interim sources are the asset agent's renders in `/Users/mm/logink/redesign-2026/assets/out/` (Canva stills, graded, rendered by `assets/scripts/*`). Weave/Veo sources of the same names replace them later by re-running those scripts, then `install-media.mjs`. **No site code changes.**
- All site media lives in `public/media/<key>-<sha8>/`, with `<sha8>` = the first 8 hex of the sha256 of the folder's files (sorted by name). The folder name changes whenever the bytes change, so `Cache-Control: immutable` is safe.
- **Only `scripts/install-media.mjs` writes `public/media/**` and `src/content/media.json`.** Components learn what exists only by importing `media.json` through `src/lib/assets.ts`, at build and ISR time alike. Nothing touches the filesystem at request time: Vercel functions cannot see `public/`.
- A key missing from `media.json` means the component renders its documented fallback (§4.4). There is never a broken `<img>`/`<video>`, and never a code-drawn stand-in photo.

## 4.2 The table

| Key | Files in `public/media/<key>-<sha8>/` | Dims · measured | From `assets/out/` | Used by | Budget |
|---|---|---|---|---|---|
| `buka` | `film.webm` · `poster-21x9.webp` · `poster-4x3.webp` | 1680×720 VP9 8 s loop 1,055,445 B · 1280×548 54.5 KB · 800×600 36.4 KB | `film/buka-1680x720.vp9.webm`, `film/buka-poster-21x9.webp`, `film/buka-poster-4x3.webp` | Home Hero `FilmHero`; About hero (`poster-4x3`) | film ≤1.5 MB; posters ≤80 / ≤60 KB |
| `atap` | `d1280/f0001.webp … f0025.webp` · `key-m/k1.webp … k4.webp` | 1280×720, 1,132,086 B total · 800×720, 20.8–35.1 KB | `frames/d1280/*`, `frames/key-m/*` | Home Overture `ScrollSequence` (stops f0001/f0009/f0017/f0025 = 07.00/12.40/18.05/21.30; tablets 768–1023 use those four) | frames ≤2.5 MB; each key ≤50 KB |
| `jam-0700-seo` · `jam-0830-local` · `jam-1240-sosial` · `jam-1510-kreatif` · `jam-1630-website` · `jam-1805-seo-ai` · `jam-2030-iklan` | `still.webp` · `thumb.webp` | 1088×1360 (4:5), 29–127 KB · 96×72, 1.0–1.8 KB (pre-cropped) | `stills/<key>-1600.webp`, `stills/<key>-96x72.webp` | ServiceHero (seo, localseo, social, creative, website, ai, ads in that order), home chapter photos and collage, ServicesTable hover still + thumb | master ≤300 KB; hero delivered ≤120 KB desktop / ≤70 KB phone; hover float ≤50 KB at `w=384&q=60`; thumb ≤4 KB |
| `ig` | `tile-1.webp` (batik shirt) · `tile-2.webp` (batik texture) · `tile-3.webp` (kopi susu) | 480×480, 18.8–23.2 KB | `stills/ig-batik-shirt-480.webp`, `ig-batik-texture-480.webp`, `ig-kopi-susu-480.webp` | IgGrid, ContentCalendar, Phone "instagram" screen | ≤25 KB each |

Not installed (they stay in `assets/out`): `film/atap-timelapse-1280x720.vp9.webm` (the LOOP tier is cut, owner default; it is kept in case the owner reverses that), `frames/atap-poster.webp` (identical to f0001), `stills/*-640.webp` (next/image derives sizes from the master), `contact-sheet.jpg` (review only).

Static files outside the manifest (stable names, copied by Core in W1 with `cp`):
- `public/og/<key>.jpg`: the 47 JPEGs from `/Users/mm/logink/redesign-2026/blueprint/asset-production/og/*.jpg` (1200×630, 16.7–46 KB), plus `public/images/og-default.jpg` from `/Users/mm/logink/redesign-2026/blueprint/asset-production/images/og-default.jpg`. Cache 1 day (§1.5).
- `public/images/logo-512.png`: Core renders `/Users/mm/logink/redesign-2026/blueprint/asset-production/logo-light.svg` (Logo.tsx `theme="light"` output, unchanged) centred on Putih at 512×512 with Playwright. Used only as `Organization.logo`. The SVG itself is not shipped (its live `<text>` renders in arbitrary fonts elsewhere).
- The horizon noise is an inline SVG data URI in tokens.css (`--noise`), so there is no file. Favicon and `icon.svg` are unchanged. Case covers and instruments use 0 image bytes, except the `ig` tiles.

## 4.3 `scripts/install-media.mjs` and `src/content/media.json` (owner: Core; the asset agent re-runs the script)

- Run: `node scripts/install-media.mjs` (install) · `node scripts/install-media.mjs --check` (gate G7). Env `ASSETS_OUT` defaults to `/Users/mm/logink/redesign-2026/assets/out`.
- Install, per key, using a hard-coded map of `key → [[src, destName], …]`: if every source file exists, copy them into a temp folder, hash, rename to `public/media/<key>-<sha8>/`, and delete older `public/media/<key>-*/`. If any source is missing, skip the key and print `skip <key>: missing <file>`. Then rewrite `src/content/media.json`. With no `assets/out` at all, write `{ "version": 1, "assets": {} }` so the imports still compile.
- `media.json` shape:
```json
{ "version": 1, "generated": "2026-09-27", "assets": {
  "buka": { "dir": "/media/buka-3f2a91c0", "rendered": true,
            "alt": { "id": "…", "en": "…" }, "caption": { "id": "…", "en": "…" },
            "files": { "film": { "src": "/media/buka-3f2a91c0/film.webm", "w": 1680, "h": 720, "bytes": 1055445 },
                       "poster-21x9": { … }, "poster-4x3": { … } } },
  "atap": { "dir": "…", "rendered": true, "alt": {…}, "caption": {…},
            "frames": { "dir": "/media/atap-…/d1280", "count": 25, "width": 1280, "height": 720 },
            "files": { "key-1": { "src": "/media/atap-…/key-m/k1.webp", "w": 800, "h": 720, "bytes": 34304 }, … } },
  "jam-0700-seo": { …, "files": { "still": {…}, "thumb": {…} } },
  "ig": { …, "caption": null, "files": { "tile-1": {…}, "tile-2": {…}, "tile-3": {…} } } } }
```
- `alt` comes from `assets/out/manifest.json` (`alt_id`/`alt_en` of the key's first file; per tile for `ig`, stored as `files[f].alt`).
- `caption` is composed by the script, never hand-written in components:
  - stills: `Foto: ilustrasi AI · {place}, {HH.MM} WIB · bukan klien Logink` / `Photo: AI illustration · {place}, {HH.MM} WIB · not a Logink client`. Places: 0700 `Ruang kerja bersama, Kemang` / `Coworking space, Kemang`; 0830 `Kedai ruko, Tebet` / `Ruko kedai, Tebet`; 1240 `Butik batik, Solo` / `Batik boutique, Solo`; 1510 `Studio foto produk` / `Product photo studio`; 1630 `Resepsionis klinik gigi` / `Dental clinic reception`; 1805 `Atap ruko, Tebet` / `Ruko rooftop, Tebet`; 2030 `Penjual online, Surabaya` / `Online seller, Surabaya`.
  - film, `rendered: true` (today): `Film: ilustrasi AI, animasi dirender · Jalan ruko, Tebet, Jakarta Selatan, 05.30 WIB · bukan klien Logink` / `Film: AI illustration, rendered animation · Ruko street, Tebet, South Jakarta, 05.30 WIB · not a Logink client`. When a filmed Veo clip replaces it (`rendered: false`): `Foto/film: ilustrasi AI · Jalan ruko, Tebet, Jakarta Selatan, 05.30 WIB · bukan klien Logink`.
  - canvas: `Foto: ilustrasi AI, animasi dirender · Atap ruko Tebet, Jakarta Selatan, 07.00–21.30 WIB · bukan klien Logink` (EN mirrors). It is shown in the Overture's text column.
- `--check` fails (exit 1) when a `media.json` src is missing on disk or its size differs, or when a budget in §4.2 is exceeded.
- `src/lib/assets.ts` (Core):
```ts
import data from '@/content/media.json'
import og from '@/content/og.json'
export type MediaKey = 'buka' | 'atap' | 'ig' | 'jam-0700-seo' | 'jam-0830-local' | 'jam-1240-sosial'
  | 'jam-1510-kreatif' | 'jam-1630-website' | 'jam-1805-seo-ai' | 'jam-2030-iklan'
export const media = (k: MediaKey): MediaEntry | null => …            // null when absent
export const mediaFile = (k: MediaKey, f: string): MediaFile | null => …
export const SVC_STILL: Record<SvcKey, MediaKey> = { seo: 'jam-0700-seo', localseo: 'jam-0830-local', social: 'jam-1240-sosial',
  creative: 'jam-1510-kreatif', website: 'jam-1630-website', ai: 'jam-1805-seo-ai', ads: 'jam-2030-iklan' }
export const ogUrl = (key: string) => (og as string[]).includes(key) ? `/og/${key}.jpg` : '/images/og-default.jpg'
```

## 4.4 No-asset fallbacks (they switch on automatically once the key exists; no code change)

| Component | Needs | When missing |
|---|---|---|
| Home `Hero` / `FilmHero` | `buka` posters (+ `film`) | No posters: the hero renders without a media column (no `<figure>`, `<img>` or lamp). Posters but no film: a `<picture>` + caption, no `<video>`, no pause button |
| Home `Overture` | `atap.frames` (+ `key-*`) | No frames: no `ScrollSequence`, canvas, `<img>` or keyframe band. Flat Kertas; H2 + `<ol>` + `Phone panels` swapped by `data-step` (sticky on desktop, inline per step on phones); no canvas caption. Frames but no keys: phones show text + inline phone screens only |
| `ServiceHero` | `SVC_STILL[k]` | the instrument card alone fills the media column |
| `ChapterOpener`, `BabSiang` collage, Bab III/IV photos | `jam-*` | no photo layer; the live-HTML layers stay |
| `ServicesTable` | `jam-*` | that row gets no `data-still` and no thumb |
| `IgGrid`, `ContentCalendar`, `Phone` | `ig` | flat text tiles |
| About hero | `buka.poster-4x3` | no media column |
| `pageMeta` OG | `og.json` key | `/images/og-default.jpg` |

## 4.5 OG wiring (`pageMeta` → `ogUrl`)

- Code-owned pages: registry `og[l]` → `/og/{key}.jpg` (e.g. `/og/id-seo.jpg`, `/og/en-ai-search.jpg`).
- Posts: CMS `ogImage` (Payload `og` size) → `featuredImage` → `/og/{l}-blog-{slug or slugEn}.jpg` when listed → `/og/{l}-blog.jpg`.
- Categories: `/og/{l}-blog-category-{slug}.jpg` when listed → `/og/{l}-blog.jpg`. Cases: CMS `ogImage` → `/og/{l}-portfolio.jpg`. 404: none.

## 4.6 Delivery rules

- `FilmHero` posters are the pre-encoded WebP files served as-is (`<picture>`, `fetchPriority="high"` on desktop), not re-encoded by next/image, so the poster → video swap is pixel-identical (CRITIC). The film `src` is attached by the rich layer after `load`, in view only, desktop only, never under Save-Data, reduced motion or Mode teks.
- Stills go through `Figure` (next/image, `quality` 75, thumbs and the hover float 60). The Overture keyframes and frames are served as-is by `ScrollSequence`.
- Verify range requests once: `curl -sI -r 0-1 http://localhost:3000$(node -p "require('./src/content/media.json').assets.buka.files.film.src")` → `206`.
