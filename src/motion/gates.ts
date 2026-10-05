// Device and preference gates for every JS motion layer. Browser-only (call from effects).
// No imports at all: this file ships in the tiny client islands (RichGate, ScrollSequence) on
// every device, so it must stay a few hundred bytes. canvasEligible is pure (sequence-core.check.ts).
type Nav = Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number }

const POINTER = '(hover: hover) and (pointer: fine)'
const MOTION = '(prefers-reduced-motion: no-preference)'
const WIDE = '(min-width: 1024px)'

const mq = (q: string) => matchMedia(q).matches
/** Mode teks: html.mode-teks (pre-paint script when persisted; SiteObserver on the live checkbox). */
export const teks = () => document.documentElement.classList.contains('mode-teks')
const saveData = () => !!(navigator as Nav).connection?.saveData

/** T2 rich layer (Lenis, cursor label, magnetic, lamp, hover still, loupe, film). Never in a tall renderer. */
export const richAllowed = () => mq(POINTER) && mq(MOTION) && !teks() && innerHeight <= TALL_VIEWPORT

/** Desktop hero film: rich + wide + no Save-Data. Phones never get a video. */
export const filmAllowed = () => richAllowed() && mq(WIDE) && !saveData()

export interface GateInput {
  richPointer: boolean // matchMedia('(hover: hover) and (pointer: fine)')
  wide: boolean // matchMedia('(min-width: 1024px)')
  reducedMotion: boolean
  teks: boolean // Mode teks on
  saveData?: boolean // navigator.connection.saveData (Chromium only)
  deviceMemory?: number // navigator.deviceMemory (Chromium only; Safari/Firefox: undefined = capable)
  viewportHeight: number
}

// Renderers that never scroll (Google WRS was measured at 12,140 px tall) must not fetch the 25 frames
// or the rich chunk.
export const TALL_VIEWPORT = 2000

export function canvasEligible(i: GateInput): boolean {
  if (!i.richPointer || !i.wide || i.reducedMotion || i.teks || i.saveData) return false
  if (i.deviceMemory !== undefined && i.deviceMemory < 4) return false
  return i.viewportHeight <= TALL_VIEWPORT
}

/** Overture canvas: film gate + deviceMemory >= 4 or unknown + not a tall never-scrolling renderer. */
export const canvasAllowed = () =>
  canvasEligible({
    richPointer: mq(POINTER),
    wide: mq(WIDE),
    reducedMotion: !mq(MOTION),
    teks: teks(),
    saveData: saveData(),
    deviceMemory: (navigator as Nav).deviceMemory,
    viewportHeight: innerHeight,
  })

/** Calls cb when any gate input may have changed (media queries, Mode teks). Returns unsubscribe. */
export function onGateChange(cb: () => void): () => void {
  const lists = [POINTER, MOTION, WIDE].map((q) => matchMedia(q))
  lists.forEach((l) => l.addEventListener('change', cb))
  addEventListener('lk:teks', cb)
  return () => {
    lists.forEach((l) => l.removeEventListener('change', cb))
    removeEventListener('lk:teks', cb)
  }
}

/** Runs cb after window load, in an idle slot (Safari has no requestIdleCallback). Returns cancel. */
export function afterLoad(cb: () => void): () => void {
  let cancel = () => {}
  const idle = () => {
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(cb, { timeout: 1500 })
      cancel = () => cancelIdleCallback(id)
    } else {
      const id = setTimeout(cb, 1)
      cancel = () => clearTimeout(id)
    }
  }
  if (document.readyState === 'complete') idle()
  else addEventListener('load', idle, { once: true })
  return () => {
    removeEventListener('load', idle)
    cancel()
  }
}
