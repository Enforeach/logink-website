// Peta kampanye 360° geometry (§11 5.2). Pure; units are the 340-unit viewBox (= px at the full 340px frame).
// The ring is the day dial bent into a circle: noon at the top, clockwise, angle = (hour − 12) / 24 × 360°.
export const SIZE = 340
export const R = (SIZE - 144) / 2 // ring radius: frame minus 72px per side for labels (98)
const C = SIZE / 2

export const angleOf = (hour: string) => {
  const [h, m] = hour.split('.').map(Number)
  return (h * 60 + m - 720) / 4 // minutes from noon × 360 / 1440 (exact in binary for whole minutes)
}
/** Angles in day order; each node sits ≥ gap° clockwise of the previous one, and the push cascades. */
export const placeAngles = (hours: string[], gap = 22) =>
  hours.reduce<number[]>((out, h, i) => [...out, i ? Math.max(angleOf(h), out[i - 1] + gap) : angleOf(h)], [])

const f = (n: number) => +n.toFixed(1)
export const pt = (deg: number, r: number): [number, number] => {
  const t = (deg * Math.PI) / 180
  return [f(C + r * Math.sin(t)), f(C - r * Math.cos(t))]
}
/** Clockwise arc from a0 to a1 (degrees). */
export const arc = (a0: number, a1: number, r = R) => {
  const [x0, y0] = pt(a0, r)
  const [x1, y1] = pt(a1, r)
  return `M${x0} ${y0}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`
}
export const DISC = 0.14 * SIZE // centre disc radius (28% of the frame, see .cm-c)
/** Chord between two nodes: a quadratic bowed toward the centre, its control point 35% of R inside the chord's
 *  midpoint. A long chord would then dive under the centre disc and vanish, so its apex is held 8 units clear of
 *  the disc and it swings around on the side of its shorter arc. Trimmed to leave and enter outside the 7-unit
 *  dots, so the arrowhead lands on the target's edge. */
export const chord = (a0: number, a1: number) => {
  const p0 = pt(a0, R)
  const p2 = pt(a1, R)
  const mx = (p0[0] + p2[0]) / 2 - C
  const my = (p0[1] + p2[1]) / 2 - C
  const m = Math.hypot(mx, my) || 1
  const s = Math.max(m - 0.35 * R, 2 * (DISC + 8) - m) // signed distance of the control point from the centre
  const c: [number, number] = [C + (mx / m) * s, C + (my / m) * s]
  const trim = (p: [number, number], by: number): [number, number] => {
    const dx = c[0] - p[0]
    const dy = c[1] - p[1]
    const d = Math.hypot(dx, dy) || 1
    return [f(p[0] + (dx / d) * by), f(p[1] + (dy / d) * by)]
  }
  const st = trim(p0, 9)
  const e = trim(p2, 11)
  return `M${st[0]} ${st[1]}Q${f(c[0])} ${f(c[1])} ${e[0]} ${e[1]}`
}
/** Where a node's plain-text label sits (% of the frame) and which way it hangs off that point. */
export const labelAt = (deg: number) => {
  const [x, y] = pt(deg, R + 13)
  const s = Math.sin((deg * Math.PI) / 180)
  const side = s > 0.35 ? 'l' : s < -0.35 ? 'r' : Math.cos((deg * Math.PI) / 180) > 0 ? 't' : 'b'
  return { left: `${f((x / SIZE) * 100)}%`, top: `${f((y / SIZE) * 100)}%`, side }
}
// Ring segments follow the hour prefixes of DESIGN §3.3: 06.30 / 10.00 / 17.00 / 20.00 / 23.00, then the Malam tail.
export const SEGMENTS = [
  { from: '06.30', to: '10.00', stage: 'ditemukan' },
  { from: '10.00', to: '17.00', stage: 'dipercaya' },
  { from: '17.00', to: '20.00', stage: 'dikutip' },
  { from: '20.00', to: '23.00', stage: 'dihubungi' },
  { from: '23.00', to: '30.30', stage: null }, // 30.30 = 06.30 the next morning
] as const
