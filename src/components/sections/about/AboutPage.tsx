// About /about + /en/about (owner 2026-10-05: the document layout benchmarked on duomark.id, shared with the legal
// pages). Hero band, then the 'On this page' rail, the story as prose, and the aside: 'Logink at a glance' + the next
// step. Only facts that exist (no founding year, PT, address or team until supplied).
import Link from 'next/link'
import { ENTITY, liveServices, page, svcHref, type Locale } from '@/lib/services'
import { breadcrumbNode, orgNode, webPageNode } from '@/lib/meta'
import { PageShell } from '@/components/ds/chrome/PageShell'
import { hub360 } from '@/components/ds/chrome/links'
import { ClientLogos } from '@/components/ds/ClientLogos'
import { JsonLd } from '@/components/ds/JsonLd'
import { T } from '@/components/ds/strings'
import { ABOUT } from '@/content/about'
import { OUTCOME, PROCESS } from '@/content/home'
import { AskCard, DocBody, DocHero, DocSection, FactCard } from '../legal/DocLayout'

export function AboutPage({ locale: l }: { locale: Locale }) {
  const p = page('about')
  const S = ABOUT.sections
  const crumbs = [{ name: T.home[l], href: page('home').path[l] }, { name: ABOUT.crumb[l], href: p.path[l] }]
  const toc = (['who', 'ways', 'how', 'why', 'not', 'services'] as const).map((k) => ({ id: k, text: S[k][l] }))
  const steps = PROCESS.groups.flatMap((g) => g.steps)
  const graph = [
    orgNode(l, true),
    webPageNode({ url: p.path[l], name: p.h1[l], type: 'AboutPage', locale: l, dateModified: p.updated }),
    breadcrumbNode(p.path[l], crumbs),
  ]

  return (
    <PageShell locale={l} alt={p.path} wa={p.wa[l]} sky="light">
      <JsonLd graph={graph} />
      <DocHero locale={l} crumbs={crumbs} eyebrow={ABOUT.eyebrow[l]} h1={p.h1[l]} id="ab-h">
        <p className="t-lead">{ENTITY[l]}</p>
      </DocHero>
      <DocBody locale={l} toc={toc}
        aside={<>
          <FactCard title={ABOUT.glance[l]} items={ABOUT.facts.map((f) => ({ k: f.k[l], v: f.v[l] }))} />
          <AskCard locale={l} title={ABOUT.ask[l]} sub={ABOUT.askSub[l]} wa={p.wa[l]} />
        </>}>
        <p className="doc-lead">{ABOUT.intro[l]}</p>
        <DocSection id="who" title={S.who[l]}>
          {ABOUT.who[l].map((x) => <p key={x}>{x}</p>)}
        </DocSection>
        <DocSection id="ways" title={S.ways[l]}>
          <ul>{ABOUT.ways.map((w) => <li key={w.t.id}><strong>{w.t[l]}</strong> {w.d[l]}</li>)}</ul>
          <p>{ABOUT.waysMore[l]} <Link href={hub360(l)}>{T.c360How[l]}</Link></p>
        </DocSection>
        <DocSection id="how" title={S.how[l]}>
          <p>{ABOUT.howLead[l]}</p>
          <ol>{steps.map((s) => <li key={s.t.id}><strong>{s.t[l]}.</strong> {s.d[l]}</li>)}</ol>
        </DocSection>
        <DocSection id="why" title={S.why[l]}>
          <ul>{ABOUT.why.map((w) => <li key={w.t.id}><strong>{w.t[l]}</strong> {w.d[l]}</li>)}</ul>
        </DocSection>
        <DocSection id="not" title={S.not[l]}>
          <ul>{ABOUT.not[l].map((n) => <li key={n}>{n}</li>)}</ul>
        </DocSection>
        <DocSection id="services" title={S.services[l]}>
          <ul>{liveServices().map((s) => <li key={s.key}><Link href={svcHref(s.key, l)}>{s.name[l]}</Link>: {OUTCOME[s.key][l]}</li>)}</ul>
        </DocSection>
        <ClientLogos locale={l} />
      </DocBody>
    </PageShell>
  )
}
