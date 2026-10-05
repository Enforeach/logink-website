// Bab III 'Di balik layar' and the AI page: a live-HTML instrument (layer 1, clean) with an
// aria-hidden annotation layer (layer 2: leader lines + how each thing is measured).
//   Desktop rich pointer: rich/loupe.ts clones layer 2 into a 200px lens that follows the pointer
//     (compositor-only: the lens and its counter-translated clone move by transform).
//   Touch, keyboard, reduced motion, no JS: the 'Tampilkan anotasi' checkbox shows layer 2 in full
//     (CSS sibling selector, 0 JS). The same facts are also in the visible 'Cara kami mengukur' copy,
//     so no sentence exists only in the hidden layer.
// The root is a <div> (never a figure) with no data-nosnippet and no label: the MockFrame child carries
// <figure><div data-nosnippet inert>…</div><figcaption class="mock-label">. The zone has no border (the
// lens math uses its padding box); hairlines live on inner panels.
import type { ReactNode } from 'react'

export function ProofLoupe({
  id,
  toggleLabel,
  annotations,
  children,
}: {
  id: string // unique per page, e.g. 'ai-answer'
  toggleLabel: string // 'Tampilkan anotasi' | 'Show annotations'
  annotations: ReactNode // SVG leader lines + <p> notes, absolutely positioned on the zone's box
  children: ReactNode // the instrument inside its MockFrame
}) {
  return (
    <div className="lk-proof" data-loupe="">
      <input type="checkbox" id={`${id}-annot`} className="lk-annot-toggle" />
      <label htmlFor={`${id}-annot`} className="lk-annot-switch">
        {toggleLabel}
      </label>
      <div className="lk-proof__zone" data-cursor="hide">
        {children}
        <div className="lk-annot" aria-hidden="true">
          {annotations}
        </div>
      </div>
    </div>
  )
}
