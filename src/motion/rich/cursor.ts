// Cursor (rich pointers only): the label disc on [data-cursor] links, magnetic CTAs, and the lamp. Owner
// 2026-10-04: no always-on dot; outside labelled links the native cursor shows alone. One delegated
// pointerover/pointermove pair (index.ts) feeds it: pointermove moves the disc and sets springs; attributes are
// written only when the zone actually changes.
//
// Markup contract (Server Components, identical on every device):
//   <a data-cursor="Buka layanan">                   96px Aspal/Cahaya disc with that (localised) label;
//                                                  native cursor hidden on that element only (.rich CSS)
//   <a data-cursor="Chat WhatsApp" data-cursor-tone="wa">   #25D366 disc, #0A2E17 label
//   <div data-cursor="hide">                        no disc (loupe zones, Maps iframe wrapper)
//   disc surface: the computed --sky of whatever is under the pointer, read only when that changes.
//   <span data-magnetic><a class="btn">...</a></span>   the <a> leans <= 14px (strength .35) toward the pointer
//   <div data-lamp> ... <i class="lk-lamp"></i></div>   pre-blurred light pool follows the pointer; media
//                                                  frames only (no text inside), clipped by the frame
// Form fields, iframes, <video controls> and contenteditable never get the disc.
import { clamp, follow2d, SPRING, type Follower } from './follow'
import type { Effect } from './index'

const SKIP = 'input,textarea,select,iframe,video[controls],[contenteditable=""],[contenteditable="true"],[data-cursor="hide"]'

export function cursor(): Effect {
  const root = document.createElement('div')
  root.className = 'lk-cur cursor-layer' // .cursor-layer: hidden by the design system's Mode teks
  root.setAttribute('aria-hidden', 'true')
  root.innerHTML = '<b class="lk-cur__disc"><span></span></b>'
  document.body.append(root)
  const discEl = root.firstElementChild as HTMLElement
  const labelEl = discEl.firstElementChild as HTMLElement
  // pinned to the pointer (owner 2026-10-04: no trailing, no in/out animation); a transform write reads no layout
  const place = (x: number, y: number) => (discEl.style.transform = `translate3d(${x}px,${y}px,0)`)

  const followers = new Map<HTMLElement, Follower>() // magnetic CTAs and lamps, per element
  let magnet: HTMLElement | null = null
  let lamp: HTMLElement | null = null
  let light: Element | null | undefined // the grounded element under the pointer (undefined = not read yet)
  let px = -100
  let py = -100
  let shown = false

  const attr = (name: string, v: string) => {
    if (root.getAttribute(name) !== v) root.setAttribute(name, v)
  }

  const magnetFor = (m: HTMLElement) => {
    let f = followers.get(m)
    const cta = m.firstElementChild as HTMLElement | null
    if (!f && cta) followers.set(m, (f = follow2d(SPRING.magnetic, (x, y) => (cta.style.translate = `${x}px ${y}px`))))
    return f
  }
  const lampFor = (z: HTMLElement) => {
    let f = followers.get(z)
    const light = z.querySelector<HTMLElement>(':scope > .lk-lamp')
    if (!f && light) followers.set(z, (f = follow2d(SPRING.trail, (x, y) => (light.style.transform = `translate3d(${x}px,${y}px,0)`))))
    return f
  }

  return {
    move(x, y) {
      px = x
      py = y
      place(x, y)
      if (!shown) {
        shown = true
        attr('data-on', '')
      }
      if (magnet) {
        const r = magnet.getBoundingClientRect() // layout is clean: we only ever write transforms
        const k = (v: number) => clamp(v * 0.35, -14, 14)
        magnetFor(magnet)?.set(k(x - r.left - r.width / 2), k(y - r.top - r.height / 2))
      }
      if (lamp) {
        const r = lamp.getBoundingClientRect()
        lampFor(lamp)?.set(x - r.left, y - r.top)
      }
    },

    over(t) {
      const z = t.closest(`[data-cursor],${SKIP}`)
      const label = !!z && !z.matches(SKIP)
      attr('data-mode', label ? 'label' : 'hidden')
      if (label) {
        const text = z!.getAttribute('data-cursor') || ''
        if (labelEl.textContent !== text) labelEl.textContent = text
        attr('data-tone', z!.getAttribute('data-cursor-tone') || '')
      }
      const lit = t.closest('[data-stage],[data-hour],[data-ground]')
      if (lit !== light) {
        light = lit
        attr('data-sky', getComputedStyle(t).getPropertyValue('--sky').trim() || 'light') // once per section change
      }

      const m = t.closest<HTMLElement>('[data-magnetic]')
      if (m !== magnet) {
        if (magnet) followers.get(magnet)?.set(0, 0) // spring back with a small overshoot
        magnet = m
      }
      const l = t.closest<HTMLElement>('[data-lamp]')
      if (l !== lamp) {
        lamp = l
        if (l) {
          const r = l.getBoundingClientRect()
          lampFor(l)?.jump(px - r.left, py - r.top) // appear under the pointer, don't sweep from 0,0
        }
      }
    },

    leave() {
      shown = false
      root.removeAttribute('data-on')
    },

    route() {
      // New page: per-element followers belong to nodes that are gone.
      followers.forEach((f) => f.destroy())
      followers.clear()
      magnet = lamp = null
      light = undefined
    },

    stop() {
      followers.forEach((f) => f.destroy())
      document.querySelectorAll<HTMLElement>('[data-magnetic] > *').forEach((el) => (el.style.translate = ''))
      root.remove()
    },
  }
}
