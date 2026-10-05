import { ANTI_SCAM, WA_DISPLAY, liveServices, page, waLink, type Locale } from '@/lib/services'
import { breadcrumbNode, orgNode, staticMeta, webPageNode } from '@/lib/meta'
import { PageShell } from '@/components/ds/chrome/PageShell'
import { Section } from '@/components/ds/Section'
import { Wrap } from '@/components/ds/Wrap'
import { Breadcrumbs } from '@/components/ds/Breadcrumbs'
import { Dateline } from '@/components/ds/Dateline'
import { H1Svc } from '@/components/ds/H1Svc'
import { JsonLd } from '@/components/ds/JsonLd'
import { T } from '@/components/ds/strings'
import { BUDGET, CONTACT as C, FORM, TIMELINE } from '@/content/contact'
import { ChannelChooser } from './ChannelChooser'
import { ContactForm } from './ContactForm'
import { NextSteps } from './NextSteps'

export const contactMeta = (l: Locale) => staticMeta('contact', l) // canonical /contact, no query

/** Contact (BUILD §3.9): Malam 21.30 hero with the WhatsApp-first chooser, the form on a Putih inset. Static. */
export function ContactPage({ locale: l }: { locale: Locale }) {
  const p = page('contact')
  const url = p.path[l]
  const crumbs = [{ name: T.home[l], href: page('home').path[l] }, { name: T.contact[l], href: url }]
  const services = [{ value: '360', label: T.c360Item[l] }, ...liveServices().map((s) => ({ value: s.key, label: s.name[l] }))]
  const legacy = Object.fromEntries(liveServices().filter((s) => s.cmsSlug).map((s) => [s.cmsSlug!, s.key]))
  const graph = [
    { ...orgNode(l, true), contactPoint: { '@type': 'ContactPoint', telephone: '+628139453933', contactType: 'sales', availableLanguage: ['id', 'en'] } },
    webPageNode({ url, name: p.h1[l], type: 'ContactPage', locale: l, dateModified: p.updated }),
    breadcrumbNode(url, crumbs),
  ]

  return (
    <PageShell locale={l} alt={p.path} wa={p.wa[l]} sky="light" bar="wa">
      <JsonLd graph={graph} />
      <Section hour="2130" ground="putih" labelledBy="contact-h1">
        <Wrap>
          <Breadcrumbs locale={l} items={crumbs} />
          <Dateline locale={l} hour="2130" right={T.contact[l]} className="mt-6" />
          <div className="grid-12 mt-8 gap-y-10">
            <div className="col-span-12 lg:col-span-5">
              <H1Svc text={p.h1[l]} id="contact-h1" />
              <p className="t-lead mt-6">{C.lede[l]}</p>
              <p className="t-small mt-8 text-ink-2">{C.official[l]}</p>
              <p className="t-h3 mt-1 tabular-nums">{WA_DISPLAY}</p>
              <p className="t-small mt-3 text-ink-2">{ANTI_SCAM[l]}</p>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <ChannelChooser locale={l} />
            </div>
          </div>
        </Wrap>
      </Section>
      <Section ground="kertas" id="formulir" labelledBy="formulir-h">
        <Wrap grid className="gap-y-10">
          <div data-ground="putih" className="card-raised col-span-12 p-5 sm:p-8 lg:col-span-8 lg:p-10">
            <h2 id="formulir-h" className="t-h2">{C.formH[l]}</h2>
            <p className="t-body mt-3 text-ink-2">{C.formLede[l]}</p>
            <div className="mt-8">
              <ContactForm t={FORM[l]} services={services} legacy={legacy} budget={BUDGET[l]} timeline={TIMELINE[l]} waHref={waLink(p.wa[l])} />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <NextSteps locale={l} />
          </div>
        </Wrap>
      </Section>
    </PageShell>
  )
}
