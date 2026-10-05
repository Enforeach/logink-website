'use client'

// T1: the only motion JS every device downloads. Mount once per root layout (id and en), outside
// <main>. Server Components opt in with data attributes; nothing imports motion.
//
// Contract (DESIGN.md §10.8)
//   html.js            set HERE, after the first scan (never by an inline head script): if this chunk is
//                      blocked or slow, nothing is ever hidden. CSS hides pre-reveal states only under
//                      .js AND (prefers-reduced-motion: no-preference).
//   [data-reveal]      -> data-in once it enters (rootMargin -8% bottom). Elements already on screen at
//                      scan time get data-in BEFORE .js exists, so they never animate or flash. In a
//                      12,140 px render viewport everything is on screen, so nothing is ever masked.
//                      Values: lift | fade (decorative only, never text) | split (H2 only) | words | wipe | inst.
//   [data-steps]       -> data-step="k" on the section, data-on on its [data-step-panel][data-k=k],
//                      aria-current="step" on the k-th [data-step-item] (item crossing 58-60% of the viewport).
//   html[data-nav]     top | pill (> 80 px). The header never hides and never turns dark (owner 2026-10-04).
//   #mode-teks         checkbox (footer; Bab III uses <label for="mode-teks">): html.mode-teks +
//                      localStorage 'lk-mode-teks' = '1' (removed when off) + a window 'lk:teks' event
//                      that the JS gates listen to. The checkbox is re-synced on every page.
//   [commandfor]       <button commandfor="menu" command="show-modal"> opens the menu <dialog> natively
//                      (Invoker Commands); older browsers get the same behaviour from the click fallback.
//   [data-cta]         clicks -> dataLayer.push({event:'cta_click', cta, placement, service, page, locale}).
import { useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'

const TEKS_KEY = 'lk-mode-teks' // TEKS_SCRIPT (primitives.tsx) restores it pre-paint

type DL = Window & { dataLayer?: Record<string, unknown>[] }

export function SiteObserver() {
  const path = usePathname()

  // Reveal + steps + Mode teks checkbox: rescanned on every route change (layouts persist across
  // navigations, the footer checkbox does not). Layout effect: runs before the new page paints.
  useLayoutEffect(() => {
    const html = document.documentElement
    const vh = innerHeight

    const box = document.getElementById('mode-teks') as HTMLInputElement | null
    if (box) box.checked = html.classList.contains('mode-teks')

    const reveal = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          if (!e.isIntersecting) continue
          if (e.target.getAttribute('data-reveal') === 'split') indexLines(e.target)
          e.target.setAttribute('data-in', '')
          reveal.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    // Read every rect first, then write: one layout, not N.
    const els = [...document.querySelectorAll('[data-reveal]:not([data-in])')]
    const onScreen = els.map((el) => {
      const r = el.getBoundingClientRect()
      return r.top < vh && r.bottom > 0
    })
    els.forEach((el, i) => (onScreen[i] ? el.setAttribute('data-in', '') : reveal.observe(el)))
    html.classList.add('js')
    // Reveal targets mounted after this scan (late client islands, dev fast refresh) would stay hidden: watch them too.
    const late = new MutationObserver((ms) => {
      for (const m of ms) for (const n of m.addedNodes) {
        if (!(n instanceof Element)) continue
        for (const el of [n, ...n.querySelectorAll('[data-reveal]')]) {
          if (!el.matches('[data-reveal]:not([data-in])')) continue
          const r = el.getBoundingClientRect()
          if (r.top < innerHeight && r.bottom > 0) el.setAttribute('data-in', '')
          else reveal.observe(el)
        }
      }
    })
    late.observe(document.body, { childList: true, subtree: true })

    const steps = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          if (!e.isIntersecting) continue
          const sec = e.target.closest('[data-steps]')
          if (!sec) continue
          const items = [...sec.querySelectorAll('[data-step-item]')]
          const k = String(items.indexOf(e.target))
          if (sec.getAttribute('data-step') === k) continue
          sec.setAttribute('data-step', k)
          items.forEach((it, i) => (String(i) === k ? it.setAttribute('aria-current', 'step') : it.removeAttribute('aria-current')))
          sec.querySelectorAll('[data-step-panel]').forEach((p) => p.toggleAttribute('data-on', p.getAttribute('data-k') === k))
        }
      },
      // A 2% band at 58-60% of the viewport: mid reading area on desktop, just under the 40svh sticky
      // band on phones. One item at a time; the latest crossing wins.
      { rootMargin: '-58% 0px -40% 0px' },
    )
    document.querySelectorAll('[data-steps] [data-step-item]').forEach((el) => steps.observe(el))

    return () => {
      reveal.disconnect()
      late.disconnect()
      steps.disconnect()
    }
  }, [path])

  // Header state, Mode teks, dialog fallback, CTA tracking: page-independent, bound once.
  useLayoutEffect(() => {
    const html = document.documentElement
    const nav = () => {
      const v = scrollY < 80 ? 'top' : 'pill' // reading scrollY forces no layout
      if (html.dataset.nav !== v) html.dataset.nav = v
    }
    nav()
    addEventListener('scroll', nav, { passive: true })

    const change = (e: Event) => {
      const t = e.target as HTMLInputElement
      if (t.id !== 'mode-teks') return
      html.classList.toggle('mode-teks', t.checked)
      try {
        if (t.checked) localStorage.setItem(TEKS_KEY, '1')
        else localStorage.removeItem(TEKS_KEY)
      } catch {}
      dispatchEvent(new Event('lk:teks'))
    }
    document.addEventListener('change', change)

    const click = (e: MouseEvent) => {
      const t = e.target as Element
      const cta = t.closest?.<HTMLElement>('[data-cta]')
      if (cta) {
        const d = cta.dataset
        ;((window as DL).dataLayer ??= []).push({
          event: 'cta_click',
          cta: d.cta,
          placement: d.placement,
          service: d.service ?? 'none',
          page: location.pathname,
          locale: html.lang,
        })
      }
      // Invoker Commands fallback (Safari < 26.2, Firefox < 144): only when the platform lacks it.
      if (native) return
      const b = t.closest?.('button[commandfor]')
      const dlg = b && document.getElementById(b.getAttribute('commandfor')!)
      if (!(dlg instanceof HTMLDialogElement)) return
      const cmd = b!.getAttribute('command')
      if (cmd === 'show-modal' && !dlg.open) dlg.showModal()
      else if (cmd === 'close') dlg.close()
    }
    const native = 'commandForElement' in HTMLButtonElement.prototype
    document.addEventListener('click', click)

    return () => {
      removeEventListener('scroll', nav)
      document.removeEventListener('change', change)
      document.removeEventListener('click', click)
    }
  }, [])

  return null
}

// Per-line stagger for data-reveal="split": word spans get --line from their offsetTop at reveal
// time (fonts are loaded by then). Two passes: read all, then write.
function indexLines(el: Element) {
  const words = [...el.querySelectorAll<HTMLElement>('.lk-w')]
  const tops = words.map((w) => w.offsetTop)
  let line = -1
  let top = -Infinity
  words.forEach((w, i) => {
    if (tops[i] > top + 2) {
      line++
      top = tops[i]
    }
    w.style.setProperty('--line', String(line))
  })
}
