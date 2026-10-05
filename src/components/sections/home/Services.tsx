// 02 Services (owner 2026-10-04: services listed once): one grid of 7 cards, each the registry-name link, a
// one-line outcome and the exact registry price or quote (the whole card is the link); the 8th tile links the hub. The 360° mode is section 03.
import Link from 'next/link'
import { liveServices, page, svcHref, type Locale } from '@/lib/services'
import { Section } from '@/components/ds/Section'
import { Dateline } from '@/components/ds/Dateline'
import { Price } from '@/components/ds/Price'
import { Icon } from '@/components/ds/Icon'
import { T } from '@/components/ds/strings'
import { OUTCOME, SERVICES_H } from '@/content/home'
import { Dot } from './Dot'

export function Services({ locale: l }: { locale: Locale }) {
  return (
    <Section hour="0600" ground="kertas" id="layanan" labelledBy="layanan-h">
      <div className="wrap grid gap-6">
        <div className="grid gap-3">
          <Dateline locale={l} label={SERVICES_H.label[l]} />
          <h2 id="layanan-h" className="t-h2">{SERVICES_H.h2[l]}</h2>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {liveServices().map((s) => (
            <li key={s.key} className="card group relative grid content-start gap-2 p-5">
              <h3 className="t-h3 flex items-start gap-2">
                <Dot stage={s.stage} />
                {/* stretched link: the whole card opens the service and shows the cursor label */}
                <Link href={svcHref(s.key, l)} className="after:absolute after:inset-0 after:content-[''] group-hover:underline" data-cursor={T.openService[l]}>{s.name[l]}</Link>
              </h3>
              <p className="t-small">{OUTCOME[s.key][l]}</p>
              <Price svc={s.key} locale={l} className="t-small font-650 tabular-nums text-ink-2" />
            </li>
          ))}
          <li className="card flex items-end p-5">
            <Link href={page('hub').path[l]} className="link t-ui inline-flex min-h-tap items-center gap-2 font-650">
              {T.allServices[l]}<Icon name="arrow-right" size={18} />
            </Link>
          </li>
        </ul>
      </div>
    </Section>
  )
}
