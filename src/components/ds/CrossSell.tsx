import Link from 'next/link'
import { STAGES, svc, svcHref, type Locale, type SvcKey } from '@/lib/services'
import { Price } from './Price'
import { T } from './strings'

/** "Cocok dikombinasikan dengan": soft raised cards with a stage pill; anchors = registry names. */
export function CrossSell({ locale: l, keys, heading, id = 'kombinasi' }: { locale: Locale; keys: SvcKey[]; heading: string; id?: string }) {
  return (
    <div>
      <h2 id={id} className="t-h2">{heading}</h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {keys.map((k) => {
          const s = svc(k)
          return (
            <li key={k} data-stage={s.stage} data-ground="putih" className="card-raised flex flex-col gap-3 p-5 sm:p-6">
              <p className="dateline"><span>{STAGES[s.stage].name[l]}</span></p>
              <Link href={svcHref(k, l)} className="t-h3 underline-offset-4 hover:underline" data-cursor={T.openService[l]}>
                {s.name[l]}
              </Link>
              <p className="t-small text-ink-2">{s.line[l]}</p>
              <Price svc={k} locale={l} lead className="t-small mt-auto font-650" />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
