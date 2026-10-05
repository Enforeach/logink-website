// A 2D spring follower on motion's frame loop: pointer handlers call set() (no React, no layout),
// motion integrates the springs, and write() runs at most once per frame in the render step.
import { cancelFrame, frame, springValue, type SpringOptions } from 'framer-motion'

// Motion tokens (motion-tech §5). Keep in sync with --dur-* / --ease-* in motion.css.
export const SPRING = {
  dot: { stiffness: 900, damping: 55, mass: 0.25 }, // near 1:1, removes jitter only (loupe)
  magnetic: { stiffness: 220, damping: 16, mass: 0.4 }, // small overshoot on release
  trail: { stiffness: 170, damping: 22, mass: 0.6 }, // hover still, lamp
} satisfies Record<string, SpringOptions>

export type Follower = { set(x: number, y: number): void; jump(x: number, y: number): void; destroy(): void }

export function follow2d(opts: SpringOptions, write: (x: number, y: number, vx: number) => void): Follower {
  const x = springValue<number>(0, opts)
  const y = springValue<number>(0, opts)
  const render = () => write(x.get(), y.get(), x.getVelocity())
  const schedule = () => frame.render(render) // deduplicated per frame by motion's step queue
  const offX = x.on('change', schedule)
  const offY = y.on('change', schedule)
  return {
    set(tx, ty) {
      x.set(tx)
      y.set(ty)
    },
    jump(tx, ty) {
      x.jump(tx)
      y.jump(ty)
      schedule()
    },
    destroy() {
      offX()
      offY()
      x.destroy()
      y.destroy()
      cancelFrame(render)
    },
  }
}

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
