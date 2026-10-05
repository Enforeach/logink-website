import { REVIEWER, svc as svcOf, type Locale, type SvcKey } from '@/lib/services'
import { SVC_FILM, SVC_STILL, mediaFile } from '@/lib/assets'
import { Section } from '@/components/ds/Section'
import { Breadcrumbs } from '@/components/ds/Breadcrumbs'
import { Dateline } from '@/components/ds/Dateline'
import { H1Svc } from '@/components/ds/H1Svc'
import { Stabilo } from '@/components/ds/Stabilo'
import { WaButton } from '@/components/ds/WaButton'
import { Button } from '@/components/ds/Button'
import { Figure } from '@/components/ds/Figure'
import { Icon } from '@/components/ds/Icon'
import { SHORT, T, fmtDate } from '@/components/ds/strings'
import { quoteHref } from '@/components/ds/chrome/links'
import { HeroVideo } from '@/components/sections/home/MotionVideo'

const VIDEO = { id: { pause: 'Jeda video', play: 'Putar video' }, en: { pause: 'Pause video', play: 'Play video' } }

/**
 * Section 1 (owner 2026-10-03): breadcrumbs, the service-label eyebrow, H1 (= registry), the short answer
 * (said once on the page, Stabilo = what a machine would quote), Diperbarui, the CTA pair, and the hour-lit
 * still with its honesty caption (≤264px wide at desktop, so its area stays under the H1 text: LCP = text). No price here: the price lives once, in #harga. The still is lazy and
 * smaller than the H1 block, so the LCP is the H1; no still (missing asset or noMedia) = no media column.
 * A service film (SVC_FILM, owner 2026-10-04: SEO) replaces the still: a split hero with the film's whole 16:9 frame in
 * a card (the home hero card), and the content's `trust` ticks under the CTAs.
 */
export function ServiceHero({ k, locale: l, answer, note, trust, crumbs, noMedia }: {
  k: SvcKey; locale: Locale; answer: string; note?: string; trust?: string[]; crumbs: { name: string; href: string }[]; noMedia?: boolean
}) {
  const s = svcOf(k)
  const dark = s.light === 'senja' || s.light === 'malam'
  const fk = noMedia ? undefined : SVC_FILM[k]
  const f = (n: string) => (fk ? mediaFile(fk, n) : null)
  const [lg, sm, plg, psm] = [f('film'), f('film-sm'), f('poster'), f('poster-sm')]
  const film = lg && sm && plg && psm
  const still = noMedia || !mediaFile(SVC_STILL[k], 'still') ? null : (
    <Figure asset={SVC_STILL[k]} locale={l} ratio="4/5" sizes="(min-width:1024px) 264px, 85vw" lamp={dark} />
  )
  return (
    <Section hour={s.hour} ground={s.light} id="top" labelledBy="hero-h">
      <div className="wrap grid-12 gap-y-6">
        <div className="col-span-12">
          <Breadcrumbs locale={l} items={crumbs} />
        </div>
        <Dateline locale={l} right={SHORT[k][l]} className="col-span-12" />
        <div className={`col-span-12 grid content-start gap-6 lg:pt-4 ${film ? 'lg:col-span-6' : 'lg:col-span-7'}`}>
          <H1Svc text={s.h1[l]} id="hero-h" />
          {/* Stabilo is paper-only: on Senja/Malam the bar reads as a strikethrough */}
          <p className="t-lead max-w-[60ch]">{dark ? answer : <Stabilo>{answer}</Stabilo>}</p>
          {note ? <p className="t-small max-w-[60ch] text-ink-2">{note}</p> : null}
          <p className="t-small text-ink-2">
            {T.updated[l]} <time dateTime={s.updated}>{fmtDate(s.updated, l)}</time>
            {REVIEWER ? ` · ${T.reviewedBy[l]} ${REVIEWER.name}, ${REVIEWER.jobTitle[l]}` : null}
          </p>
          <div className="flex flex-wrap gap-3">
            <WaButton text={s.wa[l]} placement="hero" service={k} size="lg" />
            <Button href={quoteHref(l, k)} cta="quote" placement="hero" service={k} size="lg" variant="ghost">{T.quote[l]}</Button>
          </div>
          {trust?.length ? (
            <ul className="t-small flex flex-wrap gap-x-5 gap-y-2 text-ink-2">
              {trust.map((t) => <li key={t} className="inline-flex items-center gap-2"><span className="svc-tick scale-90" aria-hidden="true"><Icon name="check" size={12} /></span>{t}</li>)}
            </ul>
          ) : null}
        </div>
        {film ? (
          <div className="hero-stage col-span-12 self-center lg:col-span-6" data-decor="">
            <HeroVideo src={{ lg: lg.src, sm: sm.src }} poster={{ lg: plg.src, sm: psm.src }} labels={VIDEO[l]} />
          </div>
        ) : still ? (
          <div className="col-span-12 mt-4 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <div className="ml-auto w-[85%] lg:w-[264px]">{still}</div>
          </div>
        ) : null}
      </div>
    </Section>
  )
}
