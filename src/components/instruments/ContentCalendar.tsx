// E12 · Content calendar: a Mon–Sun week of text chips (Reels, Carousel, Story, Foto produk); one day expanded
// with an `ig` tile and a draft caption; approval ticks pop in once. The grid wraps, so it holds at 320px.
// Used on: Social and Creative steps, Creative hero.
import type { Locale } from '@/lib/services'
import { mediaFile } from '@/lib/assets'
import { CALENDAR, MOCK_LABEL, MOCK_LABEL_PHOTO } from '@/content/instruments'
import { Icon } from '@/components/ds/Icon'
import { MockFrame, v, type MockGround } from './MockFrame'

export function ContentCalendar({ locale: l, ground = 'putih', className }: { locale: Locale; ground?: MockGround; className?: string }) {
  const tile = mediaFile('ig', 'tile-1')
  return (
    <MockFrame locale={l} ground={ground} className={className} label={(tile ? MOCK_LABEL_PHOTO : MOCK_LABEL)[l]}>
      <span className="m-cap">{CALENDAR.title[l]}</span>
      <ol className="m-cal">
        {CALENDAR.days[l].map((d, i) => {
          const open = i === CALENDAR.open
          return (
            <li key={d} className={open ? 'm-box m-strong col-span-2' : 'm-box'}>
              <span className="flex items-center justify-between gap-1">
                <span className="m-cap">{d}</span>
                {i < 5 ? <span className="m-tick inline-flex" style={v({ '--i': i })}><Icon name="check" size={14} /></span> : null}
              </span>
              <span className="m-chip justify-self-start">{CALENDAR.items[i][l]}</span>
              {open ? (
                <span className="flex items-start gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element -- pre-encoded 480px ig tile served as-is (BUILD §2.2 rule 9) */}
                  {tile ? <img src={tile.src} width={tile.w} height={tile.h} alt={tile.alt?.[l] ?? ''} loading="lazy" decoding="async" className="aspect-square w-14 flex-none rounded object-cover" /> : null}
                  <span className="grid gap-1">
                    <span className="m-cap">{CALENDAR.draft[l]}</span>
                    <span className="m-s">{CALENDAR.caption[l]}</span>
                  </span>
                </span>
              ) : null}
            </li>
          )
        })}
      </ol>
    </MockFrame>
  )
}
