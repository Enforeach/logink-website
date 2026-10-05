import { getImageProps } from 'next/image'
import { HoverRevealTable, type ServiceRow } from '@/motion/HoverRevealTable'
import { SVC_STILL, mediaFile } from '@/lib/assets'
import { STAGES, liveServices, svcHref, type Locale } from '@/lib/services'
import { priceText } from './Price'
import { T, fmtDate } from './strings'

const COLS = {
  id: ['Layanan', 'Tahap', 'Jawaban singkat', 'Harga'],
  en: ['Service', 'Stage', 'Short answer', 'Price'],
} as const
const ROW360 = {
  id: { stage: 'Semua tahap', answer: 'Layanan di atas yang Anda butuhkan, dijalankan satu tim sebagai satu kampanye terhubung.', price: 'Proposal kustom' },
  en: { stage: 'Every stage', answer: 'The services above that you need, run by one team as one connected campaign.', price: 'Custom proposal' },
}

// Fixed column widths, shared by the 360° row below the table (md+).
const COLW = 'md:[&_table]:table-fixed md:[&_th:nth-child(1)]:w-[26%] md:[&_:is(th,td):nth-child(2)]:w-[14%] md:[&_:is(th,td):nth-child(3)]:w-[40%] md:[&_:is(th,td):nth-child(4)]:w-[20%]'

/** The one services/prices table (home + hub). Rows without jam-* media get no still and no thumb. No JSON-LD. */
export function ServicesTable({ locale: l, id }: { locale: Locale; id?: string }) {
  const svcs = liveServices()
  const latest = svcs.map((s) => s.updated).sort().at(-1)!
  const rows: ServiceRow[] = svcs.map((s) => {
    const still = mediaFile(SVC_STILL[s.key], 'still')
    const thumb = mediaFile(SVC_STILL[s.key], 'thumb')
    return {
      href: svcHref(s.key, l),
      name: s.name[l],
      stage: { label: STAGES[s.stage].name[l], key: s.stage },
      answer: s.line[l],
      price: priceText(s.key, l),
      still: still ? getImageProps({ src: still.src, width: 384, height: Math.round((384 * still.h) / still.w), quality: 60, alt: '' }).props.src : undefined,
      thumb: thumb?.src,
    }
  })
  const r = ROW360[l]
  return (
    <div id={id} className={COLW}>
      <HoverRevealTable
        caption={`${l === 'id' ? 'Layanan dan harga Logink · diperbarui' : 'Logink services and prices · updated'} ${fmtDate(latest, l)}`}
        columns={[...COLS[l]]}
        rows={rows}
        cursorLabel={T.openService[l]}
      />
      {/* ponytail: the 360° row belongs in the table's <tfoot> (BUILD §11 4.3); HoverRevealTable (Motion) has no
          foot slot yet, so it renders as the row right under the table. Swap when Motion adds `foot`. */}
      <dl className="grid grid-cols-1 gap-y-1 border-b border-line py-4 md:grid-cols-[26%_14%_40%_20%] md:[&>*]:pr-4">
        <dt className="font-650">
          <a href="#kampanye-360" className="link">{T.c360[l]}</a>
        </dt>
        <dd className="t-small text-ink-2">{r.stage}</dd>
        <dd>{r.answer}</dd>
        <dd className="font-650">{r.price}</dd>
      </dl>
    </div>
  )
}
