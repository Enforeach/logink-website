// Time-travel page cuts (0 KB of JS of our own): each root's template.tsx re-mounts on every navigation,
// so this one <ViewTransition> gives each page an exit (150 ms fade) and an enter (240 ms, 12 px rise,
// 90 ms delay); motion.css §19 styles the 'lk-page' class. App Router navigations are transitions, so
// React calls document.startViewTransition itself; browsers without it simply navigate, and reduced
// motion gets no animation (motion.css). default="none": nothing animates on first load.
// Verified in the installed build: Next 16.2.6 vendors react 19.3.0-canary, whose stable build exports
// ViewTransition (next/dist/compiled/react/cjs/react.production.js:395); the typings come from
// src/types/react-canary.d.ts. The namespace lookup keeps a React build without it working (no-op).
// Chrome inside PageShell (header, WhatsApp pill, bottom bar) holds still only when PageShell wraps each
// in its own <ViewTransition name="site-header|wa-pill|bottom-bar"> (docs/redesign/build/10-motion-mounting.md).
import * as React from 'react'
import type { ReactNode } from 'react'

const VT = (React as Partial<typeof React>).ViewTransition

export function PageCut({ children }: { children: ReactNode }) {
  if (!VT) return children
  return (
    <VT enter="lk-page" exit="lk-page" default="none">
      {children}
    </VT>
  )
}
