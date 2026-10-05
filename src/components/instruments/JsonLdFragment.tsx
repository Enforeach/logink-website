// E8 · JSON-LD fragment: a trimmed LocalBusiness for Kedai Contoh as visible <pre><code> (not a script, so no
// crawler reads it as data). Keys --ink-2, strings in the highlight ink (jingga on dark panels), one highlighted
// line with a 2px rule. Lines wrap instead of scrolling. Used on: AI page, SEO steps.
import type { Locale } from '@/lib/services'
import { JSONLD } from '@/content/instruments'
import { MockFrame, type MockGround } from './MockFrame'

export function JsonLdFragment({ locale: l, ground = 'senja-dalam', className }: { locale: Locale; ground?: MockGround; className?: string }) {
  return (
    <MockFrame locale={l} ground={ground} className={className}>
      <span className="m-cap">{JSONLD.title[l]}</span>
      <pre className="m-code"><code>
        {JSONLD.lines.map(([ind, k, val, end, on], i) => {
          const bracket = val === '{' || val === '}'
          return (
            <span key={i} className={on ? 'on' : undefined}>
              {'  '.repeat(ind)}
              {k ? <><span className="k">&quot;{k}&quot;</span>: </> : null}
              {bracket ? val : <span className="m-hl">&quot;{val}&quot;</span>}
              {end}
            </span>
          )
        })}
      </code></pre>
    </MockFrame>
  )
}
