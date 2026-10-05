// Run: pnpm exec tsx src/components/instruments/cmap-geom.check.ts
import assert from 'node:assert/strict'
import { NODES } from '@/content/campaign'
import { DISC, R, angleOf, chord, labelAt, placeAngles } from './cmap-geom'

// §11 5.2: Website 67.5 → 69.5, SEO AI 91.25 → 91.5, WhatsApp 142.5 → 149.5; the rest stay at their hour.
assert.deepEqual(placeAngles(NODES.map((n) => n.hour)), [-75, -52.5, 10, 47.5, 69.5, 91.5, 127.5, 149.5])
assert.equal(angleOf('06.30'), -82.5)
assert.equal(angleOf('30.30'), 277.5)
assert.equal(labelAt(-75).side, 'r')
assert.equal(labelAt(10).side, 't')
assert.equal(labelAt(149.5).side, 'l')
// every chord's midpoint (t = .5) stays outside the centre disc
for (const [a, b] of [[-75, 127.5], [-75, 91.5], [69.5, -75], [47.5, 10], [127.5, 69.5]]) {
  const n = chord(a, b).match(/-?[\d.]+/g)!.map(Number) // M x y Q cx cy x y
  const x = (n[0] + 2 * n[2] + n[4]) / 4 - 170
  const y = (n[1] + 2 * n[3] + n[5]) / 4 - 170
  assert.ok(Math.hypot(x, y) > DISC && Math.hypot(x, y) < R, `chord ${a}→${b} apex ${Math.hypot(x, y).toFixed(1)}`)
}
console.log('ok: cmap geometry')
