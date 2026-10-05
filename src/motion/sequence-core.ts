// Pure helpers for the Overture canvas sequence ('Satu atap, satu hari'). No DOM, no imports,
// so sequence-core.check.ts runs them in plain Node.
//
// 25 frames at 1280x720 (atap/d1280/f0001..f0025, BUILD §4.2). The player draws the two nearest frames
// and blends them (CRITIC B3), so 25 real frames scrub without visible steps.
//  - phones never run the player (T1 data-step keyframes instead); the gate lives in gates.ts;
//  - frames load step stops first (0, 8, 16, 24 = f0001/f0009/f0017/f0025), then coarse-to-fine;
//  - decoded bitmaps live in a BYTE-budgeted window (not a frame count);
//  - scroll progress maps piecewise through the step stops, so each step rests exactly on the frame
//    that is also its static keyframe image (seamless canvas <-> <img> handover).

// Decoded RGBA bitmaps: 1280x720 = 3.69 MB each. 128 MiB => 36 frames, so all 25 fit.
export const BITMAP_BUDGET = 128 * 2 ** 20

export function cacheCapacity(budgetBytes: number, w: number, h: number, count: number): number {
  return Math.max(2, Math.min(count, Math.floor(budgetBytes / (w * h * 4))))
}

// Frames that each story step rests on: 25 frames / 4 steps -> [0, 8, 16, 24]; 120 -> [0, 40, 80, 119].
export function stepStops(n: number, steps: number): number[] {
  if (steps < 2) return [0]
  const stride = Math.round((n - 1) / (steps - 1))
  return Array.from({ length: steps }, (_, k) => Math.min(n - 1, k * stride))
}

// Scroll progress 0..1 -> fractional frame position, linear inside each step segment.
// With 25 frames and stops 0/8/16/24 this is exactly p * (n - 1).
export function framePos(p: number, stops: number[]): number {
  const segs = stops.length - 1
  if (segs < 1) return stops[0] ?? 0
  const x = Math.min(1, Math.max(0, p)) * segs
  const k = Math.min(segs - 1, Math.floor(x))
  return stops[k] + (x - k) * (stops[k + 1] - stops[k])
}

// Neighbour blend: draw frame a = floor(x) opaque, then b = ceil(x) on top with globalAlpha = x - a.
// Below 1% the second draw is skipped (b = -1): the step stops land on a single sharp frame.
export function blendAt(x: number, n: number): { a: number; b: number; alpha: number } {
  const a = Math.min(n - 1, Math.max(0, Math.floor(x)))
  const alpha = Math.min(1, Math.max(0, x - a))
  return alpha > 0.01 && a + 1 < n ? { a, b: a + 1, alpha } : { a, b: -1, alpha: 0 }
}

// Progress of the sticky stage through the runway (the <ol data-runway>): 0 when the first step's top
// meets the stage top, 1 when the runway's bottom meets the stage bottom.
export function runwayProgress(runwayTop: number, runwayHeight: number, stageTop: number, stageHeight: number): number {
  const span = runwayHeight - stageHeight
  if (span <= 0) return 0
  return Math.min(1, Math.max(0, (stageTop - runwayTop) / span))
}

// Fetch order: the step stops first (where readers rest), then first/last, then bisection
// (stride 16, 8, 4 ... for 25 frames).
export function loadOrder(n: number, first: number[] = []): number[] {
  const seen = new Uint8Array(n)
  const out: number[] = []
  const add = (i: number) => {
    if (i >= 0 && i < n && !seen[i]) {
      seen[i] = 1
      out.push(i)
    }
  }
  first.forEach(add)
  add(0)
  add(n - 1)
  for (let step = 2 ** Math.floor(Math.log2(Math.max(1, n - 1))); step >= 1; step /= 2)
    for (let i = 0; i < n; i += step) add(i)
  return out
}

// Frames to keep decoded, most urgent first: the playhead, then its blend partner (cur + 1), then
// alternating behind/ahead, with the step stops reserved so a fast scrub always lands on a sharp frame.
// Never more than cap (cacheCapacity keeps cap >= 2, so both blend bitmaps always fit).
export function wantedFrames(n: number, cur: number, cap: number, keys: number[] = []): number[] {
  const out = new Set<number>()
  const reserve = Math.min(keys.length, Math.max(0, cap - 2))
  for (let d = 0; out.size < cap - reserve && d < n; d++) {
    if (cur + d < n) out.add(cur + d)
    if (d > 0 && cur - d >= 0 && out.size < cap - reserve) out.add(cur - d)
  }
  for (const k of keys) if (out.size < cap) out.add(k)
  return [...out]
}

// Nearest cached frame to the playhead, or -1.
export function nearestCached(cur: number, n: number, has: (i: number) => boolean): number {
  for (let d = 0; d < n; d++) {
    if (has(cur - d)) return cur - d
    if (has(cur + d)) return cur + d
  }
  return -1
}

// object-fit: cover as a source crop for the 9-argument drawImage. fx/fy = focal point (0..1).
export function coverCrop(iw: number, ih: number, cw: number, ch: number, fx = 0.5, fy = 0.5) {
  const s = Math.max(cw / iw, ch / ih)
  const sw = cw / s
  const sh = ch / s
  return { sx: (iw - sw) * fx, sy: (ih - sh) * fy, sw, sh }
}

// Canvas pixel ratio: never above 2, never more pixels than the source has at cover scale.
export function effectiveDpr(dpr: number, cssW: number, cssH: number, iw: number, ih: number): number {
  const srcPxPerCssPx = 1 / Math.max(cssW / iw, cssH / ih)
  return Math.max(1, Math.min(dpr || 1, 2, srcPxPerCssPx))
}

// Naming contract with frames.sh: 1-based, 4 digits.
export const frameUrl = (dir: string, i: number) => `${dir}/f${String(i + 1).padStart(4, '0')}.webp`
