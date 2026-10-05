'use client'

// Overture 'Sehari, satu pelanggan' (07.00 -> 21.30): one sticky stage, one runway, every tier in
// the same server HTML. Render it only when media('atap') has frames (BUILD §4.4; otherwise Home renders
// the no-asset Overture: flat Kertas, H2 + <ol> + live-HTML phone panels on data-step).
//
//   <section data-steps data-ground=kertas>           SiteObserver sets data-step + [data-on] (T1)
//     <div .lk-seq__copy>{children}</div>             H2 + <ol data-runway> of 4 <li data-step-item>
//     <div .lk-seq__stage>                            sticky: --stage-h = min(100svh,900px) desktop, min(40svh,360px) phones
//       <picture data-step-panel data-k=0..3>         4 keyframes: phones (<768) key-m/k1-k4 800x720,
//                                                     tablets + desktop the d1280 stop frames f0001/f0009/f0017/f0025
//       <canvas aria-hidden>                          desktop only, drawn by sequence-player (T2)
//       {stage}                                       live-HTML phone, 4 screens [data-step-panel] (desktop)
//
// Tiers (all share the DOM above; nothing is inserted, so CLS is 0 in every tier):
//   CANVAS  canvasAllowed(): player chunk imported after window load, blends 25 frames over the keyframes.
//   STEP    everything else with JS (phones, tablets, low-memory desktops, reduced motion, Save-Data):
//           SiteObserver's data-step swaps keyframe + phone screen (240 ms crossfade, instant under RM).
//   STATIC  no JS / Googlebot / AI crawlers: keyframe 0 (the SSR poster <img alt>) + all step text.
//   (The LOOP tier is cut: owner default, BUILD §7.1-C.)
// The runway is CSS: each <li data-step-item> is var(--stage-h) = min(100svh, 900px) tall from 1024px up,
// so the runway is calc(4 x min(100svh, 900px)) and never grows past 3,600 px in a 12,140 px render viewport.
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { afterLoad, canvasAllowed, onGateChange } from './gates'
import type { Frames } from './sequence-player'

export type Keyframe = {
  desktop: string // the step-stop frame itself, e.g. `${frames.dir}/f0009.webp` (canvas cache hit)
  mobile?: string // media('atap').files['key-2'].src (800x720, <= 50 KB); absent = no band on phones
}

type Props = {
  frames: Frames // media('atap').frames: { dir: '/media/atap-<sha8>/d1280', count: 25, width: 1280, height: 720 }
  keyframes: Keyframe[] // one per step, same order as the <li data-step-item>s
  alt: string // poster alt from media.json, e.g. 'Atap ruko Tebet, Jakarta Selatan, pukul 07.00'
  focus?: [number, number] // cover focal point (object-position), shared by <img> and canvas
  stage?: ReactNode // server-rendered live-HTML phone (aria-hidden, data-nosnippet), desktop only
  id?: string
  children: ReactNode // server-rendered H2 + <ol data-runway> with <li data-step-item> x steps
}

export function ScrollSequence({ frames, keyframes, alt, focus = [0.5, 0.5], stage, id, children }: Props) {
  const section = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [fx, fy] = focus
  const steps = keyframes.length

  useEffect(() => {
    const root = section.current
    const cv = canvas.current
    const runway = root?.querySelector<HTMLElement>('[data-runway]')
    const stageEl = cv?.closest<HTMLElement>('.lk-seq__stage')
    if (!root || !cv || !runway || !stageEl) return

    let stop: (() => void) | undefined
    let cancelLoad: (() => void) | undefined
    let alive = true
    const sync = () => {
      if (canvasAllowed()) {
        if (stop || cancelLoad) return
        cancelLoad = afterLoad(() =>
          import('./sequence-player').then((m) => {
            cancelLoad = undefined
            if (alive && !stop && canvasAllowed())
              stop = m.startSequence({ section: root, runway, stage: stageEl, canvas: cv, frames, steps, focus: [fx, fy] })
          }),
        )
      } else {
        cancelLoad?.()
        cancelLoad = undefined
        stop?.()
        stop = undefined
      }
    }
    sync()
    const off = onGateChange(sync) // Mode teks on, reduced motion switched on, window narrowed: tear down
    return () => {
      alive = false
      off()
      cancelLoad?.()
      stop?.()
    }
    // Primitive deps only: object props get a new identity on every parent render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames.dir, frames.count, steps, fx, fy])

  const objectPosition = `${fx * 100}% ${fy * 100}%`
  const keys = keyframes.every((k) => k.mobile) // phone keyframes installed
  return (
    <section
      ref={section}
      id={id}
      className="lk-seq"
      data-steps=""
      data-ground="kertas"
      data-sky="light"
      data-keys={keys ? undefined : 'none'}
      style={{ '--steps': steps } as CSSProperties}
    >
      <div className="lk-seq__copy">{children}</div>
      <div className="lk-seq__stage">
        <div className="lk-seq__frames">
          {keyframes.map((k, i) => (
            <picture key={k.desktop} data-step-panel="" data-k={i}>
              {keys ? <source media="(max-width: 767px)" srcSet={k.mobile} width={800} height={720} /> : null}
              {/* Plain <img>: the frames are pre-encoded WebP and must keep stable URLs (canvas cache hits). */}
              <img
                src={k.desktop}
                alt={i === 0 ? alt : ''}
                width={frames.width}
                height={frames.height}
                loading="lazy"
                decoding="async"
                style={{ objectPosition }}
              />
            </picture>
          ))}
          <canvas ref={canvas} className="lk-seq__canvas" aria-hidden />
        </div>
        {stage ? (
          <div className="lk-seq__phone" aria-hidden data-nosnippet="">
            {stage}
          </div>
        ) : null}
      </div>
    </section>
  )
}
