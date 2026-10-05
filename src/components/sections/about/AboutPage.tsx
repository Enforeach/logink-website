// About /about + /en/about (BUILD §3.9 about, §11 7.3) · 0530 Putih. Only facts that exist: the owner
// rows (PT, founding year, street address, GBP) and the team section are not rendered until supplied.
import Link from 'next/link'
import { EMAIL, ENTITY, INSTAGRAM, WA_DISPLAY, liveServices, page, svcHref, type Locale } from '@/lib/services'
import { breadcrumbNode, orgNode, webPageNode } from '@/lib/meta'
import { PageShell } from '@/components/ds/chrome/PageShell'
import { quoteHref, hub360 } from '@/components/ds/chrome/links'
import { Section } from '@/components/ds/Section'
import { Dateline } from '@/components/ds/Dateline'
import { H1Svc } from '@/components/ds/H1Svc'
import { Breadcrumbs } from '@/components/ds/Breadcrumbs'
import { Figure } from '@/components/ds/Figure'
import { WaButton } from '@/components/ds/WaButton'
import { Button } from '@/components/ds/Button'
import { FactList } from '@/components/ds/FactList'
import { ClientLogos } from '@/components/ds/ClientLogos'
import { JsonLd } from '@/components/ds/JsonLd'
import { T } from '@/components/ds/strings'
import { ABOUT } from '@/content/about'
import { MeasureBlock } from '@/components/instruments/MeasureBlock'

export function AboutPage({ locale: l }: { locale: Locale }) {
  const p = page('about')
  const F = ABOUT.facts
  const crumbs = [{ name: T.home[l], href: page('home').path[l] }, { name: ABOUT.crumb[l], href: p.path[l] }]
  const facts = [
    { k: F.name[l], v: 'Logink' },
    { k: F.city[l], v: F.cityV[l] },
    {
      k: F.services[l],
      v: (
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {liveServices().map((s) => <li key={s.key}><Link href={svcHref(s.key, l)} className="link">{s.name[l]}</Link></li>)}
        </ul>
      ),
    },
    { k: F.modes[l], v: <>{F.modesV[l]} <Link href={hub360(l)} className="link">{T.c360How[l]}</Link></> },
    { k: F.lang[l], v: F.langV[l] },
    { k: F.wa[l], v: WA_DISPLAY },
    { k: F.email[l], v: <a href={`mailto:${EMAIL}`} className="link">{EMAIL}</a> },
    { k: F.ig[l], v: <a href={INSTAGRAM} className="link" target="_blank" rel="noopener">@logink.co</a> },
  ]
  const graph = [
    orgNode(l, true),
    webPageNode({ url: p.path[l], name: p.h1[l], type: 'AboutPage', locale: l, dateModified: p.updated }),
    breadcrumbNode(p.path[l], crumbs),
  ]

  return (
    <PageShell locale={l} alt={p.path} wa={p.wa[l]} sky="light">
      <JsonLd graph={graph} />
      <Section hour="0530" ground="putih" labelledBy="ab-h">
        <div className="wrap grid-12 gap-y-6">
          <div className="col-span-12"><Breadcrumbs locale={l} items={crumbs} /></div>
          <Dateline locale={l} hour="0530" word={ABOUT.word[l]} className="col-span-12" />
          <div className="col-span-12 grid content-start gap-6 lg:col-span-7">
            <H1Svc text={p.h1[l]} id="ab-h" />
            <p className="t-lead max-w-lead text-ink-2">{ENTITY[l]}</p>
            <div className="flex flex-wrap gap-3">
              <WaButton text={p.wa[l]} placement="hero" />
              <Button href={quoteHref(l)} cta="quote" placement="hero">{T.quote[l]}</Button>
            </div>
          </div>
          <Figure asset="buka" file="poster-4x3" locale={l} sizes="(min-width:1024px) 40vw, 100vw" ratio="4/3" className="col-span-12 lg:col-span-5" />
        </div>
      </Section>
      <Section hour="0530" ground="kertas" id="fakta" labelledBy="fakta-h">
        <div className="wrap grid-12 gap-y-6">
          <h2 id="fakta-h" className="t-h2 col-span-12 lg:col-span-4">{ABOUT.factsH[l]}</h2>
          <FactList items={facts} className="col-span-12 lg:col-span-8" />
        </div>
      </Section>
      <Section hour="0530" ground="putih" id="kenapa" labelledBy="kenapa-h">
        <div className="wrap grid-12 gap-y-8">
          <div className="col-span-12 lg:col-span-4">
            <h2 id="kenapa-h" className="t-h2">{ABOUT.whyH[l]}</h2>
            <p className="t-body mt-4 text-ink-2">{ABOUT.mission[l]}</p>
          </div>
          <ul className="col-span-12 grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {ABOUT.why.map((w) => (
              <li key={w.t.id} className="card p-5 sm:p-6">
                <h3 className="t-h3">{w.t[l]}</h3>
                <p className="t-small mt-2 text-ink-2">{w.d[l]}</p>
              </li>
            ))}
          </ul>
          <div className="col-span-12 lg:col-span-8 lg:col-start-5">
            <h3 className="t-h3" id="janji-h">{ABOUT.notH[l]}</h3>
            <ul className="t-body mt-3 list-disc space-y-1 pl-5" aria-labelledby="janji-h">
              {ABOUT.not.map((n) => <li key={n.id}>{n[l]}</li>)}
            </ul>
          </div>
          <div className="col-span-12"><ClientLogos locale={l} /></div>
        </div>
      </Section>
      <Section hour="0530" ground="kertas" id="cara-kerja" labelledBy="kerja-h">
        <div className="wrap">
          <MeasureBlock locale={l} headingLevel={2} id="kerja-h" />
        </div>
      </Section>
    </PageShell>
  )
}
