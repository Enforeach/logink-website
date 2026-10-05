// E1 · SERP → Maps pack. Search field, three organic rows (one readable: Kedai Contoh), then a street-grid map
// card (SVG, no tiles) with three pins and the place list. Once in view the rank chip settles 3 → 1 and the
// Kedai Contoh pin drops ≤6px. Used on: home Bab I (both), SEO hero (serp), Local SEO hero (maps), Phone 1–2.
import type { Locale } from '@/lib/services'
import { QUERY, SERP } from '@/content/instruments'
import { MockFrame, type MockGround } from './MockFrame'

type Mode = 'serp' | 'maps' | 'both'

function Search() {
  return (
    <div className="m-field">
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" className="flex-none text-ink-2">
        <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="m15.5 15.5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="min-w-0 truncate">{QUERY}</span>
    </div>
  )
}

function Serp({ l }: { l: Locale }) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2" aria-hidden="true"><i className="m-ln w-1/3" /><i className="m-ln w-11/12" /><i className="m-ln w-3/4" /></div>
      <div className="grid gap-1">
        <span className="m-mono m-xs text-ink-2">{SERP.url}</span>
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <b className="m-l m-hl font-650">{SERP.title}</b>
          <span className="m-chip m-rank">
            {SERP.rank[l]}
            <b><i><span aria-hidden="true">3</span><span aria-hidden="true">2</span><span>1</span></i></b>
          </span>
        </span>
        <span className="m-s text-ink-2">{SERP.text[l]}</span>
      </div>
      <div className="grid gap-2" aria-hidden="true"><i className="m-ln w-1/4" /><i className="m-ln w-5/6" /></div>
    </div>
  )
}

function Pin({ x, y, hit }: { x: number; y: number; hit?: boolean }) {
  const d = `M${x} ${y}c-5.5 0-10 4.3-10 9.8 0 7.2 10 18.2 10 18.2s10-11 10-18.2c0-5.5-4.5-9.8-10-9.8Z`
  return hit ? (
    <g className="lk-pin"><path d={d} /><circle cx={x} cy={y + 10} r="3.5" className="fill-[var(--surface)]" /></g>
  ) : (
    <path d={d} className="pin" />
  )
}

function Maps({ l }: { l: Locale }) {
  return (
    <div className="grid gap-3">
      <svg className="m-map" viewBox="0 0 320 150" aria-hidden="true">
        <rect className="pk" x="196" y="16" width="70" height="44" rx="3" />
        <path className="rd2" d="M-10 96 L330 70" />
        <path className="rd" d="M60 -10 L84 160 M150 -10 L162 160 M250 -10 L238 160 M-10 30 L330 22 M-10 132 L330 124" />
        <Pin x={118} y={38} />
        <Pin x={212} y={86} />
        <Pin x={150} y={70} hit />
      </svg>
      <ol className="grid gap-2">
        {SERP.places.map((p) => (
          <li key={p.name} className="flex items-center gap-2">
            <span className={p.hit ? 'm-dot' : 'm-dot m-mute'} aria-hidden="true" />
            <span className="min-w-0 flex-1">
              <b className={p.hit ? 'm-hl font-650' : 'font-650'}>{p.name}</b> <span className="m-s text-ink-2">· {p.note[l]}</span>
            </span>
            {p.hit ? <span className="m-chip">{SERP.open[l]}</span> : null}
          </li>
        ))}
      </ol>
    </div>
  )
}

/** Frameless body: Phone reuses it at phone size. */
export function SerpToMapsBody({ locale: l, mode = 'both' }: { locale: Locale; mode?: Mode }) {
  return (
    <>
      <Search />
      {mode !== 'maps' ? <Serp l={l} /> : null}
      {mode !== 'serp' ? <Maps l={l} /> : null}
    </>
  )
}

export function SerpToMaps({ locale, mode = 'both', ground = 'putih', className }: { locale: Locale; mode?: Mode; ground?: MockGround; className?: string }) {
  return (
    <MockFrame locale={locale} ground={ground} className={className}>
      <SerpToMapsBody locale={locale} mode={mode} />
    </MockFrame>
  )
}
