// T2 canvas player for ScrollSequence. Loaded ONLY by `import('./sequence-player')` from
// ScrollSequence after window load and only when canvasAllowed() (desktop fine pointer, >=1024px,
// deviceMemory >= 4 or unknown, no Save-Data / reduced motion / Mode teks). Phones never request it.
//
// Loop: joins motion's frame loop (the same rAF that drives Lenis and every spring):
//   scroll event -> frame.read(measure)  -> progress -> fractional frame x -> post 'want' to the worker
//               -> frame.render(paint)   -> drawImage(floor(x)), then drawImage(ceil(x)) at alpha frac(x)
// Network: frames are fetched only while the section is within one viewport (IO rootMargin 100%),
//   step stops first (0, 8, 16, 24), then coarse-to-fine; wanted frames jump the fetch queue.
// Decode: createImageBitmap in a Blob Worker (WebKit blocks the main thread otherwise, measured
//   113 ms max in cinematic-tech), 2 at a time, bitmaps transferred zero-copy.
// Memory: a byte-budgeted window (BITMAP_BUDGET = 128 MiB = 36 frames at 1280x720) around the
//   playhead and its blend partner + the 4 step stops; every bitmap is close()d when the section leaves the extended
//   viewport ("release offscreen") and re-decoded from the worker's compressed blobs on return.
import { frame, cancelFrame } from 'framer-motion'
import {
  BITMAP_BUDGET,
  cacheCapacity,
  blendAt,
  coverCrop,
  effectiveDpr,
  framePos,
  frameUrl,
  loadOrder,
  nearestCached,
  runwayProgress,
  stepStops,
  wantedFrames,
} from './sequence-core'

export type Frames = { dir: string; count: number; width: number; height: number }

export type PlayerOptions = {
  section: HTMLElement // [data-steps] root (observed for release)
  runway: HTMLElement // <ol data-runway>: the scrubbed distance
  stage: HTMLElement // sticky stage (its rect top/height define the playhead)
  canvas: HTMLCanvasElement
  frames: Frames
  steps: number // number of story steps (4)
  focus: [number, number]
  budgetBytes?: number
}

// Inline worker (Blob URL): no bundler config. Blob workers resolve relative URLs against blob:,
// so the main thread sends absolute URLs. Needs `worker-src blob:` if a CSP is ever added.
const WORKER = `
const blobs = [], busy = new Set(); let pending = [], want = [], rank = new Map(), active = 0
onmessage = ({ data }) => {
  if (data.urls) { pending = data.urls.slice(); for (let k = 0; k < 4; k++) lane() }
  if (data.want) { want = data.want; rank = new Map(want.map((i, r) => [i, r])); prioritise(); pump() }
}
function prioritise() {
  const r = (i) => (rank.has(i) ? rank.get(i) : 1e9)
  pending.sort((a, b) => r(a[0]) - r(b[0])) // stable: unwanted frames keep coarse-to-fine order
}
async function lane() {
  while (pending.length) {
    const [i, url] = pending.shift()
    try { const res = await fetch(url, { priority: 'low' }); if (res.ok) { blobs[i] = await res.blob(); pump() } } catch {}
  }
}
function pump() {
  while (active < 2) {
    const at = want.findIndex((i) => blobs[i] && !busy.has(i))
    if (at < 0) return
    const i = want.splice(at, 1)[0]
    busy.add(i); active++
    createImageBitmap(blobs[i]).then((bmp) => postMessage({ i, bmp }, [bmp]), () => {})
      .finally(() => { busy.delete(i); active--; pump() })
  }
}`

export function startSequence(o: PlayerOptions): () => void {
  const { section, runway, stage, canvas, frames, focus } = o
  const n = frames.count
  const stops = stepStops(n, o.steps)
  const cap = cacheCapacity(o.budgetBytes ?? BITMAP_BUDGET, frames.width, frames.height, n)
  const cache = new Map<number, ImageBitmap>()
  const ctx = canvas.getContext('2d', { alpha: false })
  if (!ctx) return () => {}

  let x = 0 // fractional frame position
  let cur = 0 // floor(x): the playhead the window is centred on
  let shownA = -1 // what the canvas holds: base frame, blended frame, its alpha
  let shownB = -1
  let shownAlpha = 0
  let near = false // section within one viewport
  let dead = false
  let worker: Worker | undefined
  let blobUrl = ''

  const measure = () => {
    const r = runway.getBoundingClientRect()
    const s = stage.getBoundingClientRect()
    const nx = framePos(runwayProgress(r.top, r.height, s.top, s.height), stops)
    if (Math.abs(nx - x) < 0.002) return
    x = nx
    const f = Math.floor(x)
    if (f !== cur) {
      cur = f
      request()
    }
    frame.render(paint)
  }

  const draw = (bmp: ImageBitmap, alpha: number) => {
    const { sx, sy, sw, sh } = coverCrop(bmp.width, bmp.height, canvas.width, canvas.height, focus[0], focus[1])
    ctx.globalAlpha = alpha
    ctx.drawImage(bmp, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)
  }

  const paint = () => {
    const { a, b, alpha } = blendAt(x, n)
    const has = (i: number) => cache.has(i)
    const base = has(a) ? a : nearestCached(a, n, has)
    if (base < 0) return
    // Blend only when both exact neighbours are decoded; otherwise the nearest frame alone (sharp).
    const top = base === a && b >= 0 && has(b) ? b : -1
    const al = top < 0 ? 0 : alpha
    if (base === shownA && top === shownB && Math.abs(al - shownAlpha) < 0.004) return
    draw(cache.get(base)!, 1)
    if (top >= 0) draw(cache.get(top)!, al)
    ctx.globalAlpha = 1
    if (shownA < 0) canvas.setAttribute('data-drawn', '') // CSS fades the canvas in over the keyframe <img>
    shownA = base
    shownB = top
    shownAlpha = al
  }

  const request = () => {
    if (!worker || !near) return
    worker.postMessage({ want: wantedFrames(n, cur, cap, stops).filter((i) => !cache.has(i)) })
  }

  const evict = () => {
    if (cache.size <= cap) return
    const keep = new Set(wantedFrames(n, cur, cap, stops))
    const drop = [...cache.keys()]
      .filter((i) => !keep.has(i) && i !== shownA && i !== shownB)
      .sort((a, b) => Math.abs(b - cur) - Math.abs(a - cur)) // farthest first
    for (const i of drop) {
      if (cache.size <= cap) break
      cache.get(i)!.close()
      cache.delete(i)
    }
  }

  const release = () => {
    cache.forEach((b) => b.close())
    cache.clear()
    shownA = shownB = -1 // canvas keeps its last pixels; the next decoded frame repaints it
    worker?.postMessage({ want: [] })
  }

  const start = () => {
    blobUrl = URL.createObjectURL(new Blob([WORKER], { type: 'text/javascript' }))
    worker = new Worker(blobUrl)
    worker.onmessage = ({ data }: MessageEvent<{ i: number; bmp: ImageBitmap }>) => {
      if (dead || !near || cache.has(data.i)) return data.bmp.close()
      cache.set(data.i, data.bmp)
      evict()
      frame.render(paint)
    }
    const abs = (i: number) => new URL(frameUrl(frames.dir, i), location.href).href
    worker.postMessage({ urls: loadOrder(n, stops).map((i) => [i, abs(i)]) })
  }

  const io = new IntersectionObserver(
    ([e]) => {
      near = e.isIntersecting
      if (!near) return release()
      if (!worker) start()
      frame.read(measure)
      request()
    },
    { rootMargin: '100% 0px' },
  )
  io.observe(section)

  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect()
    const r = effectiveDpr(devicePixelRatio, width, height, frames.width, frames.height)
    const w = Math.round(width * r)
    const h = Math.round(height * r)
    if (!w || !h || (canvas.width === w && canvas.height === h)) return
    canvas.width = w // clears the (opaque, black) bitmap: hide until repainted
    canvas.height = h
    canvas.removeAttribute('data-drawn')
    shownA = shownB = -1
    paint()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)

  const onScroll = () => frame.read(measure)
  addEventListener('scroll', onScroll, { passive: true })
  frame.read(measure)

  return () => {
    dead = true
    removeEventListener('scroll', onScroll)
    cancelFrame(measure)
    cancelFrame(paint)
    io.disconnect()
    ro.disconnect()
    worker?.terminate()
    if (blobUrl) URL.revokeObjectURL(blobUrl)
    cache.forEach((b) => b.close())
    cache.clear()
    canvas.removeAttribute('data-drawn')
  }
}
