// Desktop behaviour for <HoverRevealTable>: a 4:5 hour-lit still (<= 50 KB WebP) trails the pointer
// over the services-and-prices table with +-10 deg velocity rotation (trail spring 170/22/0.6) and
// crossfades between rows. Images are created on the first pointer entry (never on phones, which
// show the inline 96x72 thumbnails instead). A click anywhere on a row follows the row's link
// (mouse only; keyboard users tab to the real <a>).
import { clamp, follow2d, SPRING, type Follower } from './follow'
import type { Effect } from './index'

type State = { el: HTMLElement; f: Follower; imgs: Map<string, HTMLImageElement>; active: string; onClick: (e: MouseEvent) => void }

export function hoverStill(): Effect {
  const states = new Map<HTMLElement, State>()
  let table: HTMLElement | null = null
  let lastX = 0
  let lastY = 0

  const ensure = (tb: HTMLElement): State => {
    let s = states.get(tb)
    if (s) return s
    const el = document.createElement('div')
    el.className = 'lk-still'
    el.setAttribute('aria-hidden', 'true')
    const imgs = new Map<string, HTMLImageElement>()
    tb.querySelectorAll('[data-still]').forEach((row) => {
      const src = row.getAttribute('data-still')
      if (!src || imgs.has(src)) return
      const img = new Image()
      img.alt = ''
      img.decoding = 'async'
      img.src = src // preload all 7 on first intent: <= 7 x 50 KB, desktop only
      el.append(img)
      imgs.set(src, img)
    })
    tb.append(el)
    const f = follow2d(SPRING.trail, (x, y, vx) => {
      el.style.transform = `translate3d(${x}px,${y}px,0) rotate(${clamp((vx / 2000) * 10, -10, 10)}deg)`
    })
    const onClick = (e: MouseEvent) => {
      const t = e.target as Element
      if (t.closest('a,button,input,label') || !getSelection()?.isCollapsed) return
      t.closest('[data-still]')?.querySelector<HTMLAnchorElement>('a[href]')?.click()
    }
    tb.addEventListener('click', onClick)
    s = { el, f, imgs, active: '', onClick }
    states.set(tb, s)
    return s
  }

  return {
    over(t) {
      const tb = t.closest<HTMLElement>('[data-still-table]')
      if (table && tb !== table) {
        const old = states.get(table)
        if (old) {
          old.active = ''
          old.el.removeAttribute('data-on')
        }
      }
      table = tb
      if (!tb) return
      const s = ensure(tb)
      const src = t.closest('[data-still]')?.getAttribute('data-still') || ''
      if (src === s.active) return
      if (!s.active && src) {
        const r = tb.getBoundingClientRect() // appear at the pointer, then trail
        s.f.jump(lastX - r.left, lastY - r.top)
      }
      s.active = src
      s.imgs.forEach((img, key) => img.toggleAttribute('data-on', key === src))
      s.el.toggleAttribute('data-on', !!src)
    },

    move(x, y) {
      lastX = x
      lastY = y
      if (!table) return
      const r = table.getBoundingClientRect()
      states.get(table)?.f.set(x - r.left, y - r.top)
    },

    route() {
      states.forEach((s, tb) => {
        s.f.destroy()
        tb.removeEventListener('click', s.onClick)
      })
      states.clear()
      table = null
    },

    stop() {
      states.forEach((s, tb) => {
        s.f.destroy()
        s.el.remove()
        tb.removeEventListener('click', s.onClick)
      })
      states.clear()
    },
  }
}
