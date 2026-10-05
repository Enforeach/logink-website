// E5 · Annotation layer for ProofLoupe (layer 2): aria-hidden leader lines + notes on how each part of the AI
// answer is measured. ProofLoupe positions it over the zone (inset 0); the desktop loupe clones it into its lens,
// touch and keyboard show it with 'Tampilkan anotasi'. The same facts are in the visible copy around it.
// Usage: <ProofLoupe id="ai-answer" toggleLabel={ANNOT_TOGGLE[l]} annotations={<AnnotationLayer locale={l} />}>
//          <AiAnswer locale={l} /></ProofLoupe>
import type { Locale } from '@/lib/services'
import { ANNOT } from '@/content/instruments'

// [note box position, leader line from (x1,y1) to the target (x2,y2)] in % of the zone
const AT: { box: Record<string, string>; d: [number, number, number, number] }[] = [
  { box: { top: '30%', right: '3%' }, d: [70, 36, 46, 50] },
  { box: { top: '58%', right: '3%' }, d: [80, 70, 74, 88] },
  { box: { top: '58%', left: '3%' }, d: [22, 70, 20, 88] },
]

export function AnnotationLayer({ locale: l }: { locale: Locale }) {
  return (
    <>
      <svg className="m-leads" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {AT.map(({ d: [x1, y1, x2, y2] }, i) => <path key={i} d={`M${x1} ${y1}L${x2} ${y2}`} />)}
      </svg>
      {ANNOT.map((n, i) => (
        <p key={n.en} className="m-note" style={AT[i].box}>{n[l]}</p>
      ))}
    </>
  )
}
