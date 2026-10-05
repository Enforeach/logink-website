/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS gate script run by plain node */
// G11 motion gate (BUILD §6.1): scans the body of every script the browser actually downloads.
//   BASE=http://localhost:3000 node scripts/qa/motion-gate.cjs [/path ...] [--phone-only]
// Phone (390x844, touch, coarse pointer): scroll the whole page; NO downloaded script may contain a motion
//   marker (Lenis, the rich layer/cursor, the canvas player, a spring engine, framer-motion components).
// Desktop (1440x900, fine pointer): scripts before `load` are clean; after load the rich chunk (with Lenis)
//   arrives, html gets .rich and .lenis, and where a [data-steps] canvas exists the player loads and draws.
// Exit 1 on any failure. Prints one JSON line per path/device, then PASS or FAIL.
let pw
try {
  pw = require('@playwright/test')
} catch {
  pw = require('/Users/mm/logink/logink_website/logink-website/node_modules/@playwright/test')
}

const BASE = process.env.BASE || 'http://localhost:3000'
const args = process.argv.slice(2)
const PHONE_ONLY = args.includes('--phone-only')
const PATHS = args.filter((a) => !a.startsWith('--'))
if (!PATHS.length) PATHS.push('/', '/layanan/jasa-seo-profesional', '/layanan/local-seo')

// Strings that survive minification (blueprint: esbuild -minify on framer-motion 12.38 / lenis 1.3.23).
const MARKERS = {
  lenis: 'lenis-smooth', // Lenis core
  cursor: 'lk-cur__dot', // our T2 rich layer (cursor, magnetic, lamp, hover still, loupe, film)
  sequence: 'createImageBitmap', // our T2 canvas player
  springs: 'restDelta', // any motion spring/animation engine
  components: 'framerAppearId', // framer-motion React components (motion.* / m.*)
}

const PHONE = {
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36',
}
const DESKTOP = { viewport: { width: 1440, height: 900 } }

function record(page) {
  const list = []
  const reads = []
  let loaded = false
  page.on('load', () => (loaded = true))
  page.on('response', (r) => {
    if (r.request().resourceType() !== 'script') return
    const s = { url: r.url(), afterLoad: loaded, body: '' }
    list.push(s)
    reads.push(r.body().then((b) => (s.body = b.toString('utf8')), () => {}))
  })
  return { list, done: () => Promise.all(reads) }
}

const name = (u) => new URL(u).pathname.split('/').pop()
const markersIn = (scripts) =>
  Object.fromEntries(Object.entries(MARKERS).map(([k, m]) => [k, scripts.filter((s) => s.body.includes(m)).map((s) => name(s.url))]))

async function scrollThrough(page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < h; y += 600) {
    await page.evaluate((y) => scrollTo(0, y), y)
    await page.waitForTimeout(120)
  }
}

;(async () => {
  const browser = await pw.chromium.launch()
  const failures = []
  for (const p of PATHS) {
    const phone = await browser.newContext(PHONE)
    const pp = await phone.newPage()
    const ps = record(pp)
    const res = await pp.goto(BASE + p, { waitUntil: 'load', timeout: 90000 })
    if (!res || res.status() >= 400) failures.push(`${p}: HTTP ${res && res.status()}`)
    await pp.waitForTimeout(3000)
    await scrollThrough(pp)
    await pp.waitForTimeout(1500)
    await ps.done()
    const pm = markersIn(ps.list)
    const phoneCls = await pp.evaluate(() => [...document.documentElement.classList].filter((c) => c === 'rich' || c.startsWith('lenis')))
    console.log(JSON.stringify({ path: p, device: 'phone', scripts: ps.list.length, markers: pm, htmlClasses: phoneCls }))
    for (const [k, f] of Object.entries(pm)) if (f.length) failures.push(`${p} phone: ${k} code in ${f.join(', ')}`)
    if (phoneCls.length) failures.push(`${p} phone: html has ${phoneCls.join(' ')}`)
    await phone.close()
    if (PHONE_ONLY) continue

    const desk = await browser.newContext(DESKTOP)
    const dp = await desk.newPage()
    const ds = record(dp)
    await dp.goto(BASE + p, { waitUntil: 'load', timeout: 90000 })
    await dp.waitForTimeout(3000)
    await dp.mouse.move(700, 400)
    await scrollThrough(dp)
    await dp.waitForTimeout(1500)
    await ds.done()
    const initial = markersIn(ds.list.filter((s) => !s.afterLoad))
    const all = markersIn(ds.list)
    const st = await dp.evaluate(() => {
      const c = document.documentElement.classList
      return { js: c.contains('js'), rich: c.contains('rich'), lenis: c.contains('lenis'), canvas: !!document.querySelector('[data-steps] canvas'), drawn: !!document.querySelector('canvas[data-drawn]') }
    })
    console.log(JSON.stringify({ path: p, device: 'desktop', scripts: ds.list.length, initial, afterLoad: all, ...st }))
    for (const [k, f] of Object.entries(initial)) if (f.length) failures.push(`${p} desktop: ${k} code before load in ${f.join(', ')}`)
    if (!st.js) failures.push(`${p} desktop: html.js not set (SiteObserver not mounted?)`)
    if (!st.rich || !st.lenis || !all.cursor.length || !all.lenis.length) failures.push(`${p} desktop: rich layer / Lenis not active`)
    if (st.canvas && (!all.sequence.length || !st.drawn)) failures.push(`${p} desktop: canvas player did not load or draw`)
    await desk.close()
  }
  await browser.close()
  if (failures.length) {
    console.error('motion-gate: FAIL\n  - ' + failures.join('\n  - '))
    process.exitCode = 1
  } else console.log('motion-gate: PASS')
})().catch((e) => {
  console.error(e)
  process.exitCode = 1
})
