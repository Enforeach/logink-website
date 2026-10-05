// Section 03 'Layanan & harga': ONE real <table> (Server Component). It is the citable answer to
// 'Berapa biaya jasa digital marketing?', so every word and price is server HTML.
//   Desktop rich pointer: rich/hover-still.ts trails a 4:5 still (data-still) with velocity rotation;
//     a row whose jam-* media is missing gets no data-still and no thumb (BUILD §4.4);
//     rows show the 'Buka layanan' disc; a click anywhere on a row follows its link.
//   Touch, keyboard, reduced motion, Mode teks: inline 96x72 thumbnails (lazy; display:none on rich
//     desktops, so they are never fetched there). Below 768px rows reflow into stacked blocks; the
//     explicit ARIA roles keep table semantics when `display` changes.
// data-still-table sits on a wrapper <div>, never on <table> (the float is appended inside it).
import Link from 'next/link'
import type { StageKey } from '@/lib/services'

export type ServiceRow = {
  href: string // svcHref(key, locale) from src/lib/services.ts
  name: string // 'Jasa SEO Profesional' (service-name anchor text)
  stage: { label: string; key: StageKey } // 'Ditemukan', 'ditemukan' (row key light + cursor dot colour)
  answer: string // one-line answer
  price: string // 'Rp 6 · 8 · 15 Juta/bulan'
  still?: string // 384w float URL, getImageProps({ src, width: 384, quality: 60 }).props.src; omit when no media
  thumb?: string // media thumb.webp src (96x72, pre-cropped); omit when no media
}

export function HoverRevealTable({
  caption,
  columns,
  rows,
  cursorLabel,
}: {
  caption: string // 'Layanan dan harga Logink · diperbarui 27 Sep 2026'
  columns: [string, string, string, string] // Layanan / Tahap / Jawaban singkat / Harga
  rows: ServiceRow[]
  cursorLabel: string // 'Buka layanan' | 'Open service'
}) {
  return (
    <div className="lk-svc" data-still-table="">
      <table className="lk-svc__table tbl" role="table">
        <caption>{caption}</caption>
        <thead role="rowgroup">
          <tr role="row">
            {columns.map((c) => (
              <th key={c} role="columnheader" scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {rows.map((r, i) => (
            <tr key={r.href} role="row" data-still={r.still || undefined} data-cursor={cursorLabel} data-stage={r.stage.key}>
              <th role="rowheader" scope="row">
                <Link href={r.href} data-cursor={cursorLabel}>
                  <span className="lk-svc__n">{String(i + 1).padStart(2, '0')}</span> <span className="lk-svc__name">{r.name}</span>
                </Link>
                {r.thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element -- 1-2 KB pre-cropped thumb, served as-is
                  <img className="lk-svc__thumb" src={r.thumb} alt="" width={96} height={72} loading="lazy" decoding="async" />
                ) : null}
              </th>
              <td role="cell">
                <span className="chip" data-stage={r.stage.key}>
                  {r.stage.label}
                </span>
              </td>
              <td role="cell">{r.answer}</td>
              <td role="cell" className="lk-svc__price">
                {r.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
