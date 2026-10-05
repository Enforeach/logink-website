import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * One real <table>. `scroll`: horizontal scroll with a sticky first column. `stack`: under 640px every row
 * reflows into a block; explicit roles keep table semantics, each cell shows its column name.
 */
export function DataTable({ caption, head, rows, scroll, stack, rowHeaders, id, className, rowKeys, foot }: {
  caption: ReactNode; head: string[]; rows: ReactNode[][]; scroll?: boolean; stack?: boolean; rowHeaders?: boolean
  id?: string; className?: string
  rowKeys?: string[] // → <tr data-node> (CampaignMap lights the linked row with CSS)
  foot?: ReactNode // → one <tfoot> cell spanning every column
}) {
  // [@media(max-width:639px)]: not max-sm: — Tailwind 3.4 drops every max-* variant when `screens` has raw
  // entries (fine, desk), so max-sm: classes were never generated.
  const st = stack
    ? '[@media(max-width:639px)]:[&_:is(tbody,tr,th,td)]:block [@media(max-width:639px)]:[&_thead]:sr-only [@media(max-width:639px)]:[&_tbody_tr]:border-b [@media(max-width:639px)]:[&_tbody_tr]:border-line [@media(max-width:639px)]:[&_tbody_tr]:py-3 [@media(max-width:639px)]:[&_tbody_:is(th,td)]:border-0 [@media(max-width:639px)]:[&_tbody_:is(th,td)]:py-1 [@media(max-width:639px)]:[&_td[data-label]]:before:content-[attr(data-label)] [@media(max-width:639px)]:[&_td]:before:block [@media(max-width:639px)]:[&_td]:before:font-exp [@media(max-width:639px)]:[&_td]:before:text-dateline [@media(max-width:639px)]:[&_td]:before:uppercase [@media(max-width:639px)]:[&_td]:before:font-650 [@media(max-width:639px)]:[&_td]:before:[font-stretch:125%] [@media(max-width:639px)]:[&_td]:before:text-ink-2'
    : ''
  const table = (
    <table id={id} className={cn('tbl', st, className)} role={stack ? 'table' : undefined}>
      <caption className="t-dateline text-key-ink">{caption}</caption>
      <thead role={stack ? 'rowgroup' : undefined}>
        <tr role={stack ? 'row' : undefined}>
          {head.map((h) => (
            <th key={h} scope="col" role={stack ? 'columnheader' : undefined} className="t-small font-650 text-ink-2">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody role={stack ? 'rowgroup' : undefined}>
        {rows.map((r, i) => (
          <tr key={i} role={stack ? 'row' : undefined} data-node={rowKeys?.[i]}>
            {r.map((c, j) =>
              j === 0 && rowHeaders ? (
                <th key={j} scope="row" role={stack ? 'rowheader' : undefined} className="font-650">{c}</th>
              ) : (
                <td key={j} role={stack ? 'cell' : undefined} data-label={stack ? head[j] : undefined}>{c}</td>
              ),
            )}
          </tr>
        ))}
      </tbody>
      {foot ? (
        <tfoot role={stack ? 'rowgroup' : undefined}>
          <tr role={stack ? 'row' : undefined}><td colSpan={head.length} role={stack ? 'cell' : undefined}>{foot}</td></tr>
        </tfoot>
      ) : null}
    </table>
  )
  return scroll ? <div className="tbl-scroll">{table}</div> : table
}
