// Peta kampanye 360° / 360° campaign map (§11 5). Server component, 0 KB JS. The ring is the day dial bent into
// a circle; the 8 channels sit at their hours; chords are the live channel-to-channel edges (unconfirmed K-gated
// edges never render). Chips are radios + labels: CSS :has() lights one channel at every width, no hover, no
// data-cursor. The real SSR table (#koneksi-kanal) is the text key: crawlers and AI read it; it is not a mock.
// Used on: home 05 (table="details"), hub #kampanye-360 (table="open" example), service pages (focus={k}).
import Link from 'next/link'
import { Fragment } from 'react'
import { svc, svcHref, type Locale, type SvcKey } from '@/lib/services'
import { CAMPAIGN_CONFIRMED, CENTER, EXAMPLE, NODES, REPORT, STRATEGY, TABLE, campaignRows, liveEdges, type CellItem, type NodeKey } from '@/content/campaign'
import { CMAP } from '@/content/instruments'
import { DataTable } from '@/components/ds/DataTable'
import { cn } from '@/lib/utils'
import { MockFrame, v } from './MockFrame'
import { R, SEGMENTS, angleOf, arc, chord, labelAt, placeAngles, pt } from './cmap-geom'
import './campaign-map.css'

const stageOf = (k: NodeKey) => (k === 'wa' ? 'dihubungi' : svc(k).stage)
const nameOf = (k: CellItem['k'], l: Locale) =>
  k === 'wa' ? 'WhatsApp' : k === 'strategy' ? STRATEGY[l] : k === 'report' ? REPORT[l] : svc(k).name[l]
const list = (items: CellItem[], l: Locale) => items.map((x) => `${nameOf(x.k, l)} (${x.label})`).join(' · ')

export function CampaignMap({ locale: l, table = 'none', example, focus, id = 'cm' }: {
  locale: Locale
  table?: 'open' | 'details' | 'none' // home 'details' · hub 'open' · service pages 'none'
  example?: boolean // the fictional Kedai Contoh strip (hub only)
  focus?: SvcKey | 'wa' // service pages: static, only this node's chords, no chips
  id?: string // radio ids, group name and marker ids
}) {
  const ang = Object.fromEntries(placeAngles(NODES.map((n) => n.hour)).map((a, i) => [NODES[i].k, a])) as Record<NodeKey, number>
  const edges = liveEdges().flatMap((e) => (e.to === 'report' || (focus && e.from !== focus && e.to !== focus) ? [] : [{ ...e, to: e.to as NodeKey }]))
  const rows = table === 'none' ? [] : campaignRows(l)
  const tbl = rows.length ? (
    <DataTable
      id={TABLE.id}
      caption={TABLE.caption[l]}
      head={TABLE.head[l]}
      stack
      rowHeaders
      rowKeys={rows.map((r) => r.k)}
      foot={TABLE.foot[l]}
      rows={rows.map((r) => [
        <Fragment key="n">
          {r.k === 'wa' ? 'WhatsApp' : <Link className="link" href={svcHref(r.k, l)}>{svc(r.k).name[l]}</Link>}
          {r.note ? ` (${r.note})` : null}
        </Fragment>,
        list(r.fedBy, l),
        list(r.feeds, l),
      ])}
    />
  ) : null

  return (
    <div className={cn('cmap', focus && 'cmap--focus', table === 'open' && 'cmap--open')} data-ground="putih" data-reveal="inst">
      <figure className="cm-fig">
        <div className="cm-frame">
          <svg viewBox="0 0 340 340" aria-hidden="true" focusable="false">
            <defs>
              {[['a', 'cm-ab'], ['al', 'cm-al']].map(([s, c]) => (
                <marker key={s} id={`${id}-${s}`} viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" markerUnits="userSpaceOnUse" orient="auto">
                  <path className={c} d="M0 0 6 3 0 6Z" />
                </marker>
              ))}
            </defs>
            {SEGMENTS.map((s, i) => (
              <path key={s.from} className={s.stage ? 'cm-seg' : 'cm-seg cm-seg--night'} data-stage={s.stage ?? undefined} d={arc(angleOf(s.from), angleOf(s.to))} style={v({ '--i': i })} />
            ))}
            {NODES.map((n) => {
              const [x, y] = pt(ang[n.k], R - 9)
              return <path key={n.k} className={cn('cm-sp', focus === n.k && 'on')} data-k={n.k} d={`M170 170L${x} ${y}`} />
            })}
            {edges.map((e) => (
              <Fragment key={e.n}>
                {focus ? null : <path className="cm-b" data-from={e.from} data-to={e.to} d={chord(ang[e.from], ang[e.to])} markerEnd={`url(#${id}-a)`} />}
                <path className={cn('cm-l', focus && e.to === focus && 'in')} data-from={e.from} data-to={e.to} d={chord(ang[e.from], ang[e.to])} markerEnd={`url(#${id}-al)`} />
              </Fragment>
            ))}
            {NODES.map((n, i) => {
              const [cx, cy] = pt(ang[n.k], R)
              return <circle key={n.k} className={cn('cm-nd', focus === n.k && 'on')} data-k={n.k} data-stage={stageOf(n.k)} cx={cx} cy={cy} r="7" style={v({ '--i': i })} />
            })}
          </svg>
          {NODES.map((n) => {
            const at = labelAt(ang[n.k])
            return <span key={n.k} className="cm-lb" data-side={at.side} style={{ left: at.left, top: at.top }}>{n.label[l]}</span>
          })}
          <div className="cm-c">
            <b>{CENTER[l]}</b>
            <span>{CMAP.centreSub[l].split(' · ').map((t, i) => <Fragment key={t}>{i ? ' · ' : null}<span className="whitespace-nowrap">{t}</span></Fragment>)}</span>
          </div>
        </div>
        <figcaption className="cm-cap">
          <span>{CMAP.caption[l]}</span>
          <span className="cm-night">{(CAMPAIGN_CONFIRMED.K1 ? CMAP.night.yes : CMAP.night.no)[l]}</span>
        </figcaption>
      </figure>

      {focus ? null : (
        <fieldset className="cm-chips">
          <legend className="t-dateline text-ink-2">{CMAP.legend[l]}</legend>
          <div className="cm-row">
            {[{ k: 'all', label: CMAP.all }, ...NODES].map((n) => (
              <Fragment key={n.k}>
                <input type="radio" name={id} id={`${id}-${n.k}`} value={n.k} className="sr-only" defaultChecked={n.k === 'all'} />
                <label htmlFor={`${id}-${n.k}`}>{n.label[l]}</label>
              </Fragment>
            ))}
          </div>
        </fieldset>
      )}

      {table === 'details' ? <details><summary>{TABLE.summary[l]}</summary>{tbl}</details> : tbl}

      {example ? (
        <MockFrame locale={l} label={EXAMPLE.label[l]} className="cm-ex">
          <b className="m-l font-650">{EXAMPLE.title[l]}</b>
          <p>{EXAMPLE.idea[l]}</p>
          <ul className="grid gap-x-6 gap-y-2 md:grid-cols-2">
            {EXAMPLE.lines.map((x) => (
              <li key={x.k} className="flex items-baseline gap-2">
                <span className={x.k === 'wa' ? 'm-dot m-wa' : 'm-dot'} data-stage={x.k === 'wa' ? undefined : stageOf(x.k)} aria-hidden="true" />
                <span><b className="font-650">{NODES.find((n) => n.k === x.k)!.label[l]}</b> · {x.text[l]}</span>
              </li>
            ))}
          </ul>
        </MockFrame>
      ) : null}
    </div>
  )
}
