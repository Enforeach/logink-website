// Blog post conversion pieces (owner 2026-10-05): the featured image as the hero card with the related service attached
// (CRO in the first screen), the mid-article service CTA, the related-service aside card and the author widget.
import Image from 'next/image'
import Link from 'next/link'
import { svc, svcHref, type Locale, type SvcKey } from '@/lib/services'
import { Price } from '@/components/ds/Price'
import { WaButton } from '@/components/ds/WaButton'
import { Icon } from '@/components/ds/Icon'
import { T, fmtDate } from '@/components/ds/strings'
import { hub360 } from '@/components/ds/chrome/links'
import { BLOG, inlineH } from '@/content/blog'
import { BLOG_PATH } from './data'

/** Featured image on top, the service that does this work underneath: name, price, WhatsApp. No image: the strip alone. */
export function FeatureCard({ locale: l, k, wa, image, alt }: { locale: Locale; k: SvcKey; wa: string; image: string | null; alt: string }) {
  const s = svc(k)
  return (
    <figure data-ground="putih" data-stage={s.stage} className="feature-card">
      {image ? (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image src={image} alt={alt} fill priority sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
        </div>
      ) : null}
      <figcaption className="grid gap-3 p-5 sm:p-6">
        <p className="t-small font-650 text-ink-2">{BLOG.featureEyebrow[l]}</p>
        <p className="t-h3">
          <Link href={svcHref(k, l)} className="underline-offset-4 hover:underline" data-cursor={T.openService[l]}>{s.name[l]}</Link>
        </p>
        <Price svc={k} locale={l} lead className="t-small block font-650 text-ink-2" />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <WaButton text={wa} placement="post" service={k} size="sm" />
          <Link href={svcHref(k, l)} className="link t-small inline-flex min-h-tap items-center gap-1">{BLOG.railOpen[l]}<Icon name="arrow-right" size={14} /></Link>
        </div>
      </figcaption>
    </figure>
  )
}

/** Mid-article: one line that turns a reader into a lead, with the WhatsApp button. */
export function InlineServiceCta({ locale: l, k, wa }: { locale: Locale; k: SvcKey; wa: string }) {
  const s = svc(k)
  return (
    <aside data-ground="putih" data-stage={s.stage} className="inline-cta my-10" aria-label={BLOG.railEyebrow[l]}>
      <div className="grid gap-1">
        <p className="font-650 text-ink">{inlineH(s.name[l], l)}</p>
        <p className="t-small text-ink-2">{BLOG.inlineP[l]}</p>
      </div>
      <WaButton text={wa} placement="post" service={k} size="sm" />
    </aside>
  )
}

/** Aside: the related service, sticky while reading. */
export function ServiceCard({ locale: l, k, wa }: { locale: Locale; k: SvcKey; wa: string }) {
  const s = svc(k)
  return (
    <div data-ground="putih" data-stage={s.stage} className="doc-card">
      <p className="doc-card__label">{BLOG.railEyebrow[l]}</p>
      <p className="t-h3 mt-3">
        <Link href={svcHref(k, l)} className="underline-offset-4 hover:underline" data-cursor={T.openService[l]}>{s.name[l]}</Link>
      </p>
      <p className="t-small mt-2 text-ink-2">{s.line[l]}</p>
      <Price svc={k} locale={l} lead className="t-small mt-3 block font-650" />
      <div className="mt-4"><WaButton text={wa} placement="post" service={k} size="sm" full /></div>
      <p className="t-small mt-3"><Link href={hub360(l)} className="link">{BLOG.rail360[l]}</Link></p>
    </div>
  )
}

/** Aside: who wrote it, when it was updated, and the way to more of their articles. */
export function AuthorCard({ locale: l, name, image, updated, minutes }: { locale: Locale; name: string; image: string | null; updated: string; minutes: string }) {
  const initials = name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div className="doc-card doc-card--tint">
      <p className="doc-card__label">{BLOG.author[l]}</p>
      <div className="mt-3 flex items-center gap-3">
        {image ? (
          <Image src={image} alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-full object-cover" />
        ) : (
          <span className="author-initials" aria-hidden="true">{initials}</span>
        )}
        <div className="min-w-0">
          <p className="font-650 text-ink">{name}</p>
          <p className="t-small text-ink-2">{BLOG.authorLine[l]}</p>
        </div>
      </div>
      <dl className="t-small mt-4 grid grid-cols-2 gap-3 border-t border-[var(--line)] pt-3">
        {updated ? <div><dt className="text-ink-2">{T.updated[l]}</dt><dd className="font-650 text-ink"><time dateTime={updated}>{fmtDate(updated, l)}</time></dd></div> : null}
        <div><dt className="text-ink-2">{BLOG.readTime[l]}</dt><dd className="font-650 text-ink">{minutes}</dd></div>
      </dl>
      <p className="t-small mt-3"><Link href={BLOG_PATH[l]} className="link">{BLOG.authorMore[l]}</Link></p>
    </div>
  )
}
