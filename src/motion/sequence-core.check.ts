// Run: pnpm check:seq  (= tsx src/motion/sequence-core.check.ts; node:test, exits 1 on any failure)
// Also runs under `pnpm exec tsx --test src/motion/*.check.ts`.
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { canvasEligible } from './gates'
import {
  BITMAP_BUDGET,
  blendAt,
  cacheCapacity,
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

const N = 25 // atap/d1280/f0001..f0025 (BUILD §4.2)
const S = stepStops(N, 4)

test('gate: canvas only on capable desktop fine pointers', () => {
  const desk = { richPointer: true, wide: true, reducedMotion: false, teks: false, viewportHeight: 900 }
  assert.equal(canvasEligible(desk), true) // Safari / Firefox desktop: no hints = capable
  assert.equal(canvasEligible({ ...desk, deviceMemory: 8 }), true)
  assert.equal(canvasEligible({ ...desk, deviceMemory: 4 }), true)
  assert.equal(canvasEligible({ ...desk, deviceMemory: 2 }), false) // low memory: STEP tier (LOOP is cut)
  assert.equal(canvasEligible({ ...desk, saveData: true }), false)
  assert.equal(canvasEligible({ ...desk, reducedMotion: true }), false)
  assert.equal(canvasEligible({ ...desk, teks: true }), false)
  assert.equal(canvasEligible({ ...desk, wide: false }), false) // tablets and phones: never
  assert.equal(canvasEligible({ ...desk, richPointer: false }), false)
  assert.equal(canvasEligible({ ...desk, viewportHeight: 2001 }), false) // tall never-scrolling renderer
  assert.equal(canvasEligible({ ...desk, viewportHeight: 2000 }), true)
})

test('byte budget: all 25 frames fit, never below 2 (both blend bitmaps)', () => {
  assert.equal(cacheCapacity(BITMAP_BUDGET, 1280, 720, N), 25)
  assert.equal(cacheCapacity(BITMAP_BUDGET, 1280, 720, 120), 36)
  assert.equal(cacheCapacity(1, 1280, 720, N), 2)
})

test('25 frames: step stops 0/8/16/24 = f0001/f0009/f0017/f0025', () => {
  assert.deepEqual(S, [0, 8, 16, 24])
  assert.deepEqual(S.map((i) => frameUrl('/media/atap-x/d1280', i)), [
    '/media/atap-x/d1280/f0001.webp',
    '/media/atap-x/d1280/f0009.webp',
    '/media/atap-x/d1280/f0017.webp',
    '/media/atap-x/d1280/f0025.webp',
  ])
  assert.deepEqual(stepStops(120, 4), [0, 40, 80, 119]) // helper stays general
})

test('framePos: x = p * (n - 1), steps rest on their stop frames', () => {
  assert.equal(framePos(0, S), 0)
  assert.equal(framePos(1 / 3, S), 8)
  assert.equal(framePos(2 / 3, S), 16)
  assert.equal(framePos(1, S), 24)
  assert.equal(framePos(1.4, S), 24)
  assert.equal(framePos(-1, S), 0)
  for (let p = 0; p <= 1; p += 0.01) {
    assert.ok(Math.abs(framePos(p, S) - p * (N - 1)) < 1e-9)
    assert.ok(framePos(p, S) <= framePos(Math.min(1, p + 0.01), S)) // monotonic
  }
})

test('neighbour blend: floor(x) opaque, ceil(x) at globalAlpha = frac', () => {
  assert.deepEqual(blendAt(0, N), { a: 0, b: -1, alpha: 0 })
  assert.deepEqual(blendAt(8, N), { a: 8, b: -1, alpha: 0 }) // a stop: one sharp frame
  const m = blendAt(framePos(0.5, S), N) // x = 12
  assert.deepEqual(m, { a: 12, b: -1, alpha: 0 })
  const q = blendAt(3.25, N)
  assert.equal(q.a, 3)
  assert.equal(q.b, 4)
  assert.ok(Math.abs(q.alpha - 0.25) < 1e-9)
  const h = blendAt(framePos(0.1, S), N) // x = 2.4
  assert.deepEqual([h.a, h.b], [2, 3])
  assert.ok(Math.abs(h.alpha - 0.4) < 1e-9)
  assert.deepEqual(blendAt(5.005, N), { a: 5, b: -1, alpha: 0 }) // frac <= .01: skip the second draw
  assert.deepEqual(blendAt(24, N), { a: 24, b: -1, alpha: 0 }) // last frame has no partner
  assert.deepEqual(blendAt(30, N), { a: 24, b: -1, alpha: 0 })
  for (let p = 0; p <= 1; p += 0.005) {
    const { a, b, alpha } = blendAt(framePos(p, S), N)
    assert.ok(a >= 0 && a < N && alpha >= 0 && alpha < 1)
    if (b >= 0) assert.equal(b, a + 1)
  }
})

test('runway: 4 steps x 900 = 3600 px runway, 900 px stage => 2700 px of scrub', () => {
  assert.equal(runwayProgress(0, 3600, 0, 900), 0)
  assert.equal(runwayProgress(-900, 3600, 0, 900), 1 / 3) // step 2 fills the stage -> frame 8
  assert.equal(runwayProgress(-2700, 3600, 0, 900), 1)
  assert.equal(runwayProgress(500, 3600, 0, 900), 0)
  assert.equal(runwayProgress(0, 800, 0, 900), 0) // degenerate
  assert.equal(runwayProgress(-850, 3600, 50, 900), 1 / 3) // centred stage on a tall screen
})

test('load order: permutation, stops first, then coarse to fine', () => {
  for (const n of [1, 2, 7, 25, 96, 120]) {
    const o = loadOrder(n, stepStops(n, 4))
    assert.equal(o.length, n)
    assert.deepEqual([...o].sort((a, b) => a - b), Array.from({ length: n }, (_, i) => i))
  }
  assert.deepEqual(loadOrder(N, S).slice(0, 4), [0, 8, 16, 24])
})

test('wanted window: playhead, then its blend partner, stops reserved, bounded', () => {
  const w = wantedFrames(N, 10, 25, S)
  assert.deepEqual(w.slice(0, 2), [10, 11])
  assert.equal(new Set(w).size, w.length)
  for (const k of S) assert.ok(w.includes(k))
  const tight = wantedFrames(N, 10, 6, S) // small budget: both blend frames still first
  assert.ok(tight.length <= 6)
  assert.deepEqual(tight.slice(0, 2), [10, 11])
  assert.equal(wantedFrames(N, 24, 2, S).length, 2)
})

test('nearest cached frame', () => {
  const have = new Set([0, 8, 12])
  assert.equal(nearestCached(10, N, (i) => have.has(i)), 8) // ties go backwards
  assert.equal(nearestCached(11, N, (i) => have.has(i)), 12)
  assert.equal(nearestCached(5, N, () => false), -1)
})

test('cover crop + dpr', () => {
  const c = coverCrop(1280, 720, 790, 900)
  assert.equal(Math.round(c.sh), 720)
  assert.equal(Math.round(c.sx), Math.round((1280 - c.sw) / 2))
  assert.deepEqual(coverCrop(1280, 720, 1280, 720), { sx: 0, sy: 0, sw: 1280, sh: 720 })
  assert.equal(coverCrop(1280, 720, 790, 900, 0, 0.5).sx, 0)
  assert.equal(effectiveDpr(2, 1440, 900, 1280, 720), 1)
  assert.equal(effectiveDpr(3, 200, 100, 1280, 720), 2)
})
