import Image from 'next/image'
import { media, type MediaKey } from '@/lib/assets'
import type { Locale } from '@/lib/services'
import { HorizonWipe } from '@/motion/primitives'
import { cn } from '@/lib/utils'

const AR = { '4/5': 'aspect-[4/5]', '16/9': 'aspect-[16/9]', '4/3': 'aspect-[4/3]', '21/9': 'aspect-[21/9]' } as const

/**
 * Photo from media.json. Returns null when the file is not installed (BUILD §4.4): no <img>, no frame,
 * no caption. Caption comes from media.json and sits under the image, never on it. The frame holds no text,
 * so it may carry the lamp.
 */
export function Figure({ asset, file = 'still', locale: l, sizes, ratio, preload, lamp, wipe, decorative, className }: {
  asset: MediaKey; file?: string; locale: Locale; sizes: string; ratio?: keyof typeof AR
  preload?: boolean; lamp?: boolean; wipe?: boolean; decorative?: boolean; className?: string
}) {
  const m = media(asset)
  const f = m?.files[file]
  if (!m || !f) return null
  const img = (
    <Image
      src={f.src}
      width={f.w}
      height={f.h}
      quality={75}
      sizes={sizes}
      preload={preload}
      alt={decorative ? '' : (f.alt?.[l] ?? m.alt[l])}
      className={cn('block w-full', ratio ? 'absolute inset-0 h-full object-cover' : 'h-auto')}
    />
  )
  // the ratio box sits INSIDE the wipe: clip-path clips to the wiped element's own box
  const box = ratio ? <div className={cn('relative', AR[ratio])}>{img}</div> : img
  return (
    <figure className={className}>
      <div className="relative overflow-clip rounded-[var(--r-card)]" data-lamp={lamp ? '' : undefined}>
        {wipe ? <HorizonWipe>{box}</HorizonWipe> : box}
        {lamp ? <i className="lk-lamp" aria-hidden="true" /> : null}
        {!decorative && m.caption ? (
          <figcaption className="absolute bottom-3 left-3 rounded-full bg-[var(--badge-bg)] px-3 py-1 text-[.75rem] font-medium text-[#fff] backdrop-blur-sm">{m.caption[l]}</figcaption>
        ) : null}
      </div>
    </figure>
  )
}
