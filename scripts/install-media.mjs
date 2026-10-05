#!/usr/bin/env node
// Installs the generated media into public/media/<key>-<sha8>/ and writes src/content/media.json
// (BUILD §4.3). The ONLY writer of both. Components read media.json via src/lib/assets.ts; a key that
// is absent renders its documented fallback (§4.4).
//   node scripts/install-media.mjs            install every key whose sources all exist
//   node scripts/install-media.mjs --check    gate G7: files exist with recorded sizes, within budgets
// env ASSETS_OUT (default /Users/mm/logink/redesign-2026/assets/out)
import { createHash } from 'node:crypto'
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = process.env.ASSETS_OUT ?? '/Users/mm/logink/redesign-2026/assets/out'
const PUB = join(ROOT, 'public')
const MEDIA = join(PUB, 'media')
const JSON_PATH = join(ROOT, 'src/content/media.json')
const KB = 1024

const JAM = {
  '0700-seo': ['Ruang kerja bersama, Kemang', 'Coworking space, Kemang'],
  '0830-local': ['Kedai ruko, Tebet', 'Ruko kedai, Tebet'],
  '1240-sosial': ['Butik batik, Solo', 'Batik boutique, Solo'],
  '1510-kreatif': ['Studio foto produk', 'Product photo studio'],
  '1630-website': ['Resepsionis klinik gigi', 'Dental clinic reception'],
  '1805-seo-ai': ['Atap ruko, Tebet', 'Ruko rooftop, Tebet'],
  '2030-iklan': ['Penjual online, Surabaya', 'Online seller, Surabaya'],
}
const pad = (n) => String(n).padStart(4, '0')

// key -> [[source in ASSETS_OUT, dest in the key folder, files[] name | null, budget bytes]]
const MAP = {
  buka: [
    ['film/buka-1680x720.vp9.webm', 'film.webm', 'film', 1.5 * KB * KB],
    ['film/buka-poster-21x9.webp', 'poster-21x9.webp', 'poster-21x9', 80 * KB],
    ['film/buka-poster-4x3.webp', 'poster-4x3.webp', 'poster-4x3', 60 * KB],
  ],
  atap: [
    ...Array.from({ length: 25 }, (_, i) => [`frames/d1280/f${pad(i + 1)}.webp`, `d1280/f${pad(i + 1)}.webp`, null, Infinity]),
    ...[1, 2, 3, 4].map((i) => [`frames/key-m/k${i}.webp`, `key-m/k${i}.webp`, `key-${i}`, 50 * KB]),
  ],
  ...Object.fromEntries(Object.keys(JAM).map((k) => [`jam-${k}`, [
    [`stills/jam-${k}-1600.webp`, 'still.webp', 'still', 300 * KB],
    [`stills/jam-${k}-96x72.webp`, 'thumb.webp', 'thumb', 4 * KB],
  ]])),
  motion360: [
    ['film/motion360-1280x720.vp9.webm', 'film-720.webm', 'film', 2 * KB * KB],
    ['film/motion360-854x480.vp9.webm', 'film-480.webm', 'film-480', 1 * KB * KB],
    ['film/motion360-poster-1280.webp', 'poster-1280.webp', 'poster', 80 * KB],
    ['film/motion360-poster-854.webp', 'poster-854.webp', 'poster-854', 40 * KB],
  ],
  hero: [ // owner's 'Digital Activation' film (2026-10-04), full 16:9 frame and full 15 s in the split home hero
    ['film/hero-1600x900.vp9.webm', 'film-1600.webm', 'film', 2.5 * KB * KB],
    ['film/hero-960x540.vp9.webm', 'film-960.webm', 'film-sm', 1.2 * KB * KB],
    ['film/hero-poster-1600.webp', 'poster-1600.webp', 'poster', 60 * KB],
    ['film/hero-poster-960.webp', 'poster-960.webp', 'poster-sm', 30 * KB],
  ],
  'film-seo': [ // owner's SEO film (2026-10-04), full 16:9 frame and full 15 s in the SEO service hero
    ['film/seo-1600x900.vp9.webm', 'film-1600.webm', 'film', 2.5 * KB * KB],
    ['film/seo-960x540.vp9.webm', 'film-960.webm', 'film-sm', 1.2 * KB * KB],
    ['film/seo-poster-1600.webp', 'poster-1600.webp', 'poster', 60 * KB],
    ['film/seo-poster-960.webp', 'poster-960.webp', 'poster-sm', 30 * KB],
  ],
  'film-localseo': [ // owner's Local SEO film (2026-10-04), full 16:9 frame and full 15 s in the Local SEO service hero
    ['film/localseo-1600x900.vp9.webm', 'film-1600.webm', 'film', 2.5 * KB * KB],
    ['film/localseo-960x540.vp9.webm', 'film-960.webm', 'film-sm', 1.2 * KB * KB],
    ['film/localseo-poster-1600.webp', 'poster-1600.webp', 'poster', 60 * KB],
    ['film/localseo-poster-960.webp', 'poster-960.webp', 'poster-sm', 30 * KB],
  ],
  'film-social': [ // owner's social media film (2026-10-04), full 16:9 frame and full 15 s in the social service hero
    ['film/social-1600x900.vp9.webm', 'film-1600.webm', 'film', 2.5 * KB * KB],
    ['film/social-960x540.vp9.webm', 'film-960.webm', 'film-sm', 1.2 * KB * KB],
    ['film/social-poster-1600.webp', 'poster-1600.webp', 'poster', 60 * KB],
    ['film/social-poster-960.webp', 'poster-960.webp', 'poster-sm', 30 * KB],
  ],
  'film-geo': [ // owner's AI search (GEO) film (2026-10-04), full 16:9 frame and full 15 s in the SEO AI service hero
    ['film/geo-1600x900.vp9.webm', 'film-1600.webm', 'film', 2.5 * KB * KB],
    ['film/geo-960x540.vp9.webm', 'film-960.webm', 'film-sm', 1.2 * KB * KB],
    ['film/geo-poster-1600.webp', 'poster-1600.webp', 'poster', 60 * KB],
    ['film/geo-poster-960.webp', 'poster-960.webp', 'poster-sm', 30 * KB],
  ],
  'film-ads': [ // owner's paid ads film (2026-10-05), full 16:9 frame and full 15 s in the Paid Ads service hero
    ['film/ads-1600x900.vp9.webm', 'film-1600.webm', 'film', 2.5 * KB * KB],
    ['film/ads-960x540.vp9.webm', 'film-960.webm', 'film-sm', 1.2 * KB * KB],
    ['film/ads-poster-1600.webp', 'poster-1600.webp', 'poster', 60 * KB],
    ['film/ads-poster-960.webp', 'poster-960.webp', 'poster-sm', 30 * KB],
  ],
  'film-web': [ // owner's website film (2026-10-05), full 16:9 frame and full 15 s in the Website service hero
    ['film/web-1600x900.vp9.webm', 'film-1600.webm', 'film', 2.5 * KB * KB],
    ['film/web-960x540.vp9.webm', 'film-960.webm', 'film-sm', 1.2 * KB * KB],
    ['film/web-poster-1600.webp', 'poster-1600.webp', 'poster', 60 * KB],
    ['film/web-poster-960.webp', 'poster-960.webp', 'poster-sm', 30 * KB],
  ],
  'film-creative': [ // owner's creative film (2026-10-05), full 16:9 frame and full 15 s in the Creative service hero
    ['film/creative-1600x900.vp9.webm', 'film-1600.webm', 'film', 2.5 * KB * KB],
    ['film/creative-960x540.vp9.webm', 'film-960.webm', 'film-sm', 1.2 * KB * KB],
    ['film/creative-poster-1600.webp', 'poster-1600.webp', 'poster', 60 * KB],
    ['film/creative-poster-960.webp', 'poster-960.webp', 'poster-sm', 30 * KB],
  ],
  ig: [
    ['stills/ig-batik-shirt-480.webp', 'tile-1.webp', 'tile-1', 25 * KB],
    ['stills/ig-batik-texture-480.webp', 'tile-2.webp', 'tile-2', 25 * KB],
    ['stills/ig-kopi-susu-480.webp', 'tile-3.webp', 'tile-3', 25 * KB],
  ],
}
const FRAMES_BUDGET = 2.5 * KB * KB

function caption(key, rendered) {
  if (key === 'ig' || key === 'motion360' || key === 'hero' || key.startsWith('film-')) return null // motion360, hero, film-*: owner-supplied brand motion graphics, no people or places
  // soft-modern pass: short honesty badge, no place or time
  if (key === 'buka' || key === 'atap') return { id: 'Ilustrasi AI, animasi · bukan klien Logink', en: 'AI illustration, animated · not a Logink client' }
  return { id: 'Ilustrasi AI · bukan klien Logink', en: 'AI illustration · not a Logink client' }
}

function install() {
  const manifestPath = join(OUT, 'manifest.json')
  const man = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : { files: [] }
  const info = Object.fromEntries(man.files.map((f) => [f.file, f]))
  const assets = {}
  mkdirSync(MEDIA, { recursive: true })
  for (const [key, rows] of Object.entries(MAP)) {
    const missing = rows.find(([src]) => !existsSync(join(OUT, src)) || !info[src])
    if (missing) { console.log(`skip ${key}: missing ${missing[0]}${existsSync(join(OUT, missing[0])) ? ' (no manifest entry)' : ''}`); continue }
    const tmp = join(MEDIA, `.tmp-${key}-${process.pid}`)
    rmSync(tmp, { recursive: true, force: true })
    const hash = createHash('sha256')
    for (const [src, dest] of [...rows].sort((a, b) => a[1].localeCompare(b[1]))) {
      mkdirSync(dirname(join(tmp, dest)), { recursive: true })
      copyFileSync(join(OUT, src), join(tmp, dest))
      hash.update(dest).update(readFileSync(join(tmp, dest)))
    }
    const name = `${key}-${hash.digest('hex').slice(0, 8)}`
    for (const d of readdirSync(MEDIA)) if (new RegExp(`^${key}-[0-9a-f]{8}$`).test(d) && d !== name) rmSync(join(MEDIA, d), { recursive: true })
    if (existsSync(join(MEDIA, name))) rmSync(tmp, { recursive: true })
    else renameSync(tmp, join(MEDIA, name))

    const dir = `/media/${name}`, first = info[rows[0][0]]
    const rendered = /dirender|rendered/.test(first.caption_id ?? '')
    const files = {}
    for (const [src, dest, fname] of rows) {
      if (!fname) continue
      const f = info[src]
      files[fname] = { src: `${dir}/${dest}`, w: f.w, h: f.h, bytes: statSync(join(MEDIA, name, dest)).size,
                       ...(key === 'ig' && { alt: { id: f.alt_id, en: f.alt_en } }) }
    }
    assets[key] = {
      dir, rendered, alt: { id: first.alt_id, en: first.alt_en }, caption: caption(key, rendered),
      ...(key === 'atap' && { frames: { dir: `${dir}/d1280`, count: 25, width: first.w, height: first.h } }),
      files,
    }
    console.log(`installed ${key} -> ${dir}`)
  }
  const out = { version: 1, generated: new Date().toISOString().slice(0, 10), assets }
  writeFileSync(JSON_PATH, JSON.stringify(out, null, 2) + '\n')
  console.log(`wrote src/content/media.json (${Object.keys(assets).length} keys)`)
}

function check() {
  const fail = []
  const { assets = {} } = existsSync(JSON_PATH) ? JSON.parse(readFileSync(JSON_PATH, 'utf8')) : {}
  const onDisk = (src) => join(PUB, src)
  for (const [key, a] of Object.entries(assets)) {
    const budget = Object.fromEntries((MAP[key] ?? []).filter((r) => r[2]).map((r) => [r[2], r[3]]))
    for (const [fname, f] of Object.entries(a.files)) {
      if (!existsSync(onDisk(f.src))) { fail.push(`${key}.${fname}: missing ${f.src}`); continue }
      const size = statSync(onDisk(f.src)).size
      if (size !== f.bytes) fail.push(`${key}.${fname}: ${size} B on disk, ${f.bytes} B recorded`)
      if (size > (budget[fname] ?? Infinity)) fail.push(`${key}.${fname}: ${size} B over budget ${budget[fname]} B`)
    }
    if (a.frames) {
      let total = 0
      for (let i = 1; i <= a.frames.count; i++) {
        const p = onDisk(`${a.frames.dir}/f${pad(i)}.webp`)
        if (!existsSync(p)) fail.push(`${key}: missing frame f${pad(i)}`)
        else total += statSync(p).size
      }
      if (total > FRAMES_BUDGET) fail.push(`${key}: frames ${total} B over budget ${FRAMES_BUDGET} B`)
    }
  }
  for (const d of ['og', 'images']) for (const f of existsSync(join(PUB, d)) ? readdirSync(join(PUB, d)) : [])
    if (statSync(join(PUB, d, f)).size > 150 * KB) fail.push(`public/${d}/${f} > 150 KB`)
  if (fail.length) { console.error(fail.join('\n')); process.exit(1) }
  console.log(`ok: media.json ${Object.keys(assets).length} keys (${Object.keys(assets).join(', ')}), sizes and budgets hold`)
}

process.argv.includes('--check') ? check() : install()
