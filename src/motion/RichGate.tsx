'use client'

// Mount once per root layout, next to <SiteObserver/>. The ONLY path to the T2 rich layer
// (Lenis, cursor label disc, magnetic CTAs, lamp, hover-reveal still, Proof Loupe, hero film).
// A plain import() inside an effect: the server never renders it, so Next emits no preload for the
// chunk, and devices that fail the gate (every phone, reduced motion, Mode teks) never request it.
// Loads after window load in an idle slot, so it never competes with LCP or hydration on desktop.
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { afterLoad, onGateChange, richAllowed } from './gates'

type Rich = { stop(): void; route(): void }

export function RichGate() {
  const path = usePathname()
  const rich = useRef<Rich | undefined>(undefined)

  // Layouts persist across navigations: tell the layer the page changed (films rescan,
  // per-element springs of removed nodes are dropped). Delegated listeners need nothing.
  useEffect(() => rich.current?.route(), [path])

  useEffect(() => {
    let cancelLoad: (() => void) | undefined
    let alive = true
    const sync = () => {
      if (richAllowed()) {
        if (rich.current || cancelLoad) return
        cancelLoad = afterLoad(() =>
          import('./rich').then((m) => {
            cancelLoad = undefined
            if (alive && !rich.current && richAllowed()) rich.current = m.start()
          }),
        )
      } else {
        cancelLoad?.()
        cancelLoad = undefined
        rich.current?.stop()
        rich.current = undefined
      }
    }
    sync()
    const off = onGateChange(sync)
    return () => {
      alive = false
      off()
      cancelLoad?.()
      rich.current?.stop()
      rich.current = undefined
    }
  }, [])

  return null
}
