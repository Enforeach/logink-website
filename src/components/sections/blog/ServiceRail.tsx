import Link from 'next/link'
import { svc, svcHref, type Locale, type SvcKey } from '@/lib/services'
import { Price } from '@/components/ds/Price'
import { WaButton } from '@/components/ds/WaButton'
import { TextLink } from '@/components/ds/TextLink'
import { T } from '@/components/ds/strings'
import { hub360 } from '@/components/ds/chrome/links'
import { BLOG } from '@/content/blog'

/** Service CTA card for the blog hub/category rail (sticky on desktop, inline after the list on phones). */
export function ServiceRail({ locale: l, k, wa }: { locale: Locale; k: SvcKey; wa: string }) {
  const s = svc(k)
  return (
    <div data-ground="putih" data-stage={s.stage} className="card-raised p-5 sm:p-6 lg:sticky lg:top-[calc(var(--nav-h)+var(--dial-h)+24px)]">
      <p className="t-dateline text-ink-2">{BLOG.railEyebrow[l]}</p>
      <p className="t-h3 mt-3">
        <Link href={svcHref(k, l)} className="underline-offset-4 hover:underline" data-cursor={T.openService[l]}>{s.name[l]}</Link>
      </p>
      <p className="t-small mt-2 text-ink-2">{s.line[l]}</p>
      <Price svc={k} locale={l} lead className="t-small mt-3 block font-650" />
      <WaButton text={wa} placement="post" service={k} size="sm" className="mt-4" />
      <p className="t-small mt-4"><TextLink href={hub360(l)}>{BLOG.rail360[l]}</TextLink></p>
    </div>
  )
}
