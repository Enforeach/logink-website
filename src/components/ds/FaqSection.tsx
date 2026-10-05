import type { Ground } from '@/styles/tailwind.tokens'
import type { Locale } from '@/lib/services'
import { Section } from './Section'
import { Dateline } from './Dateline'
import { Faq } from './Faq'

/** FAQ block. The page adds faqNode() to its JSON-LD graph. */
export function FaqSection({ locale: l, heading, items, hour, ground, id = 'faq' }: {
  locale: Locale; heading: string; items: { q: string; a: string }[]; hour?: string; ground?: Ground; id?: string
}) {
  return (
    <Section hour={hour} ground={ground ?? (hour ? undefined : 'kertas')} id={id} labelledBy={`${id}-h`}>
      <div className="wrap grid-12 gap-y-8">
        {hour ? <Dateline locale={l} hour={hour} className="col-span-12" /> : null}
        <h2 id={`${id}-h`} className="t-h2 col-span-12 lg:col-span-4">{heading}</h2>
        <div className="col-span-12 lg:col-span-8">
          <Faq items={items} />
        </div>
      </div>
    </Section>
  )
}
