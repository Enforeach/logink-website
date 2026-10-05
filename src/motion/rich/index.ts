// T2 rich layer. Imported only by RichGate via import('./rich') after window load, and only when
// (hover: hover) and (pointer: fine) and no reduced motion and no Mode teks. Phones never request
// this chunk (nor Lenis, nor framer-motion). Everything here is vanilla DOM bound to the server
// markup by data attributes: no React components, no motion.* / m.* elements, no LazyMotion.
//
// ONE rAF: Lenis runs with autoRaf:false inside motion's frame loop (frame.update); all springs,
// the cursor writes and the canvas player (sequence-player.ts) are scheduled on that same loop.
import Lenis from 'lenis'
import { cancelFrame, frame } from 'framer-motion'
import { filmAllowed, onGateChange } from '../gates'
import { cursor } from './cursor'
import { hoverStill } from './hover-still'
import { loupe } from './loupe'

export type Effect = {
  over(target: Element): void
  move(x: number, y: number): void
  leave?(): void
  route?(): void
  stop(): void
}

let lenis: Lenis | null = null
/** For modals that are not <dialog>/[popover]: getLenis()?.stop() on open, ?.start() on close. */
export const getLenis = () => lenis

export function start(): { stop(): void; route(): void } {
  const html = document.documentElement
  html.classList.add('rich')

  // Lenis: desktop fine pointers only. lerp .1 is for Windows wheel steps; don't lower it (Mac
  // trackpads turn floaty). anchors honour html{scroll-padding-top}. Wheel events inside an open
  // <dialog> or [popover] are left native (the page behind stays locked by CSS overflow).
  lenis = new Lenis({
    autoRaf: false,
    lerp: 0.1,
    anchors: true,
    stopInertiaOnNavigate: true,
    prevent: (node) => node.matches('dialog,[popover]'), // Lenis walks the event's composed path itself
  })
  const lenisRaf = ({ timestamp }: { timestamp: number }) => lenis?.raf(timestamp)
  frame.update(lenisRaf, true)

  // Pointer effects share one delegated listener pair. Handlers only set springs / attributes.
  const fx: Effect[] = [cursor(), hoverStill(), loupe()]
  const move = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') for (const f of fx) f.move(e.clientX, e.clientY)
  }
  const over = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') for (const f of fx) f.over(e.target as Element)
  }
  const leave = () => fx.forEach((f) => f.leave?.())
  addEventListener('pointermove', move, { passive: true })
  document.addEventListener('pointerover', over, { passive: true })
  html.addEventListener('mouseleave', leave)
  addEventListener('blur', leave)

  const film = films()
  const offDrag = dragRows()

  return {
    route() {
      fx.forEach((f) => f.route?.())
      film.scan()
    },
    stop() {
      removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      html.removeEventListener('mouseleave', leave)
      removeEventListener('blur', leave)
      fx.forEach((f) => f.stop())
      film.stop()
      offDrag()
      cancelFrame(lenisRaf)
      lenis?.destroy()
      lenis = null
      html.classList.remove('rich')
    },
  }
}

// Hero film 'Buka': <video data-film data-src="/media/buka-<sha8>/film.webm" muted playsinline loop
// preload="none" aria-hidden> sits over its identical poster. src is attached only here (after window
// load, in view, desktop, no Save-Data / reduced motion / Mode teks); it fades in on 'playing', pauses
// off-screen and on visibilitychange. Phones never get a src, so they never download a byte of video.
// WCAG 2.2.2: the caption's <button class="lk-film__pause" hidden aria-pressed> is revealed here and
// toggles play/pause; the choice lives in sessionStorage['lk-film-paused'] and a saved pause means no
// autoplay (and no src until the reader presses play). The LOOP tier is cut: no data-lowmem videos.
const PAUSED = 'lk-film-paused'
function films() {
  let io: IntersectionObserver | undefined
  const vids = new Set<HTMLVideoElement>()
  let paused = false
  try {
    paused = sessionStorage.getItem(PAUSED) === '1'
  } catch {}
  const buttons = () => document.querySelectorAll<HTMLButtonElement>('.lk-film__pause')
  const label = (b: HTMLButtonElement) => {
    b.setAttribute('aria-pressed', String(paused))
    const t = (paused ? b.dataset.lPlay : b.dataset.lPause) || b.textContent || ''
    if (b.textContent !== t) b.textContent = t
  }
  const play = (v: HTMLVideoElement) => {
    if (paused || document.hidden || !v.hasAttribute('data-inview')) return
    v.muted = true // React does not always serialise the muted attribute; autoplay needs the property
    if (!v.src && v.dataset.src) v.src = v.dataset.src
    v.play().catch(() => {}) // autoplay refused: the poster simply stays
  }
  const onVis = () => vids.forEach((v) => (document.hidden ? v.pause() : play(v)))
  const onClick = (e: MouseEvent) => {
    if (!(e.target as Element).closest?.('.lk-film__pause')) return
    paused = !paused
    try {
      if (paused) sessionStorage.setItem(PAUSED, '1')
      else sessionStorage.removeItem(PAUSED)
    } catch {}
    buttons().forEach(label)
    vids.forEach((v) => (paused ? v.pause() : play(v)))
  }
  // Runs on start, on every route change and whenever a gate input changes (window narrowed, etc.).
  const scan = () => {
    io?.disconnect()
    const ok = filmAllowed()
    vids.forEach((v) => (!ok || !v.isConnected) && v.pause())
    vids.clear()
    buttons().forEach((b) => (b.hidden = true))
    if (!ok) return
    io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          const v = e.target as HTMLVideoElement
          v.toggleAttribute('data-inview', e.isIntersecting)
          if (e.isIntersecting) play(v)
          else v.pause()
        }),
      { rootMargin: '200px 0px' },
    )
    document.querySelectorAll<HTMLVideoElement>('video[data-film][data-src]').forEach((v) => {
      vids.add(v)
      v.addEventListener('playing', () => v.setAttribute('data-playing', ''), { once: true })
      io!.observe(v)
      const b = v.closest('figure')?.querySelector<HTMLButtonElement>('.lk-film__pause')
      if (b) {
        label(b)
        b.hidden = false
      }
    })
  }
  scan()
  const offGate = onGateChange(scan)
  document.addEventListener('visibilitychange', onVis)
  document.addEventListener('click', onClick)
  return {
    scan,
    stop() {
      io?.disconnect()
      offGate()
      document.removeEventListener('visibilitychange', onVis)
      document.removeEventListener('click', onClick)
      vids.forEach((v) => {
        v.pause()
        v.removeAttribute('data-playing')
      })
      buttons().forEach((b) => (b.hidden = true))
    },
  }
}

// 'Geser' rows (Bab I case files, a native scroll-snap row on every device): mouse drag scrolls them.
// Snap is suspended while dragging and restored on release, which lets the browser re-snap.
// Touch and trackpads keep native scrolling; keyboard users tab through the real <a> cards.
function dragRows(): () => void {
  let row: HTMLElement | null = null
  let x0 = 0
  let s0 = 0
  let moved = false
  const down = (e: PointerEvent) => {
    const r = (e.target as Element).closest<HTMLElement>('[data-drag-x]')
    if (!r || e.pointerType !== 'mouse' || e.button !== 0) return
    row = r
    x0 = e.clientX
    s0 = r.scrollLeft
    moved = false
  }
  const move = (e: PointerEvent) => {
    if (!row) return
    const dx = e.clientX - x0
    if (!moved && Math.abs(dx) < 6) return // a click, not a drag
    if (!moved) {
      moved = true
      row.style.scrollSnapType = 'none'
      row.setPointerCapture(e.pointerId)
    }
    row.scrollLeft = s0 - dx
  }
  const up = () => {
    if (!row) return
    row.style.scrollSnapType = ''
    row = null
  }
  const click = (e: MouseEvent) => {
    if (moved && (e.target as Element).closest('[data-drag-x]')) {
      e.preventDefault() // the drag ended on a card: don't follow its link
      e.stopPropagation()
      moved = false
    }
  }
  const noDrag = (e: DragEvent) => (e.target as Element).closest?.('[data-drag-x]') && e.preventDefault() // Firefox link DnD
  document.addEventListener('pointerdown', down)
  document.addEventListener('dragstart', noDrag)
  addEventListener('pointermove', move, { passive: true })
  addEventListener('pointerup', up)
  addEventListener('pointercancel', up)
  document.addEventListener('click', click, true)
  return () => {
    up()
    document.removeEventListener('pointerdown', down)
    document.removeEventListener('dragstart', noDrag)
    removeEventListener('pointermove', move)
    removeEventListener('pointerup', up)
    removeEventListener('pointercancel', up)
    document.removeEventListener('click', click, true)
  }
}
