// E2 · Instagram-style profile + 3×2 grid: the three real `ig` tiles (AI illustration photos, captioned in the
// mock label) + three flat text tiles. Missing tiles render as flat surface-alt squares. Tiles rise 12px once.
// Used on: home Bab II, Social hero/steps, Phone 'instagram'.
import type { Locale } from '@/lib/services'
import { mediaFile } from '@/lib/assets'
import { HANDLE, IG, KEDAI, MOCK_LABEL, MOCK_LABEL_PHOTO } from '@/content/instruments'
import { MockFrame, v, type MockGround } from './MockFrame'

const TILES = ['tile-3', 'tile-1', 'tile-2'] as const // kopi susu first: the kedai's own post leads
export const igTiles = () => TILES.map((t) => mediaFile('ig', t))

export function IgGridBody({ locale: l }: { locale: Locale }) {
  const photos = igTiles()
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="m-av" aria-hidden="true">KC</span>
        <span className="grid min-w-0 flex-1">
          <b className="font-650">{HANDLE}</b>
          <span className="m-s truncate text-ink-2">{KEDAI} · {IG.bio[l]}</span>
        </span>
        <span className="m-btn bg-btn text-btn-ink">{IG.follow[l]}</span>
      </div>
      <ul className="m-ig">
        {photos.map((f, i) => (
          <li key={i} className="m-rise" style={v({ '--i': i })}>
            {/* eslint-disable-next-line @next/next/no-img-element -- pre-encoded 480px ig tile served as-is (BUILD §2.2 rule 9) */}
            {f ? <img src={f.src} width={f.w} height={f.h} alt={f.alt?.[l] ?? ''} loading="lazy" decoding="async" /> : null}
          </li>
        ))}
        {IG.tiles[l].map((t, i) => (
          <li key={i} className="m-rise flex items-end p-[.6em]" style={v({ '--i': i + 3 })}>
            <span className="m-tile">{t}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

export function IgGrid({ locale: l, ground = 'putih', className }: { locale: Locale; ground?: MockGround; className?: string }) {
  return (
    <MockFrame locale={l} ground={ground} className={className} label={(igTiles().some(Boolean) ? MOCK_LABEL_PHOTO : MOCK_LABEL)[l]}>
      <IgGridBody locale={l} />
    </MockFrame>
  )
}
