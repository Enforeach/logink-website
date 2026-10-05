// Case study page /portfolio/[slug] + /en/portfolio/[slug] (BUILD §3.9 case) · 0700 Kertas.
// The route runs slugRedirect() (308) before this renders. CMS data passes through ./clean (presentation only).
import * as React from 'react'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCaseStudyBySlug, getRelatedCaseStudies } from '@/payload/queries'
import { APPROVED_CASE_SLUGS, CASE_SERVICES, WA_PATTERNS, crossLinks, page, svc, svcHref, type Locale } from '@/lib/services'
import { breadcrumbNode, orgNode, pageMeta, webPageNode } from '@/lib/meta'
import { ogUrl } from '@/lib/assets'
import { PageShell } from '@/components/ds/chrome/PageShell'
import { Section } from '@/components/ds/Section'
import { Dateline } from '@/components/ds/Dateline'
import { H1Svc } from '@/components/ds/H1Svc'
import { Breadcrumbs } from '@/components/ds/Breadcrumbs'
import { Chip } from '@/components/ds/Chip'
import { CaseCover } from '@/components/ds/CaseCover'
import { CrossSell } from '@/components/ds/CrossSell'
import { JsonLd } from '@/components/ds/JsonLd'
import { T } from '@/components/ds/strings'
import { CASE, PORTFOLIO } from '@/content/portfolio'
import { MeasureBlock } from '@/components/instruments/MeasureBlock'
import { CaseSubnav } from './CaseSubnav'
import { block, blocks, caseTitle, clean, contradicts, industryOf, metricsOf, months, pick, toCard } from './clean'
import { ClientSnapshot, MetricGrid, Narrative, Overview, Timeline, narrativeKind, overviewOf, parseBody, snapshotOf, timelineOf } from './blocks'
import { articleNode } from './schema'

type Cs = NonNullable<Awaited<ReturnType<typeof getCaseStudyBySlug>>>
const VT = (React as Partial<typeof React>).ViewTransition
const pathOf = (cs: Cs) => ({ id: `/portfolio/${cs.slug}`, en: `/en/portfolio/${cs.slugEn ?? cs.slug}` })
const load = (slug: string, l: Locale) => getCaseStudyBySlug(slug, l).catch(() => null)
const iso = (d: Date | null) => (d ? d.toISOString() : null)

export async function caseMeta(slug: string, l: Locale): Promise<Metadata> {
  const cs = await load(slug, l)
  if (!cs) return {}
  const seo = clean(l === 'en' ? cs.seoTitleEn : cs.seoTitleId, l, cs.clientName)
  const title = seo && !contradicts(seo, cs) ? seo : caseTitle(cs, l)
  const desc = clean(l === 'en' ? cs.seoDescEn : cs.seoDescId, l, cs.clientName) || clean(l === 'en' ? cs.subtitleEn : cs.subtitleId, l, cs.clientName)
  return pageMeta({ locale: l, title: `${title} | Logink`, desc, path: pathOf(cs), og: `${l}-portfolio`, ogImage: cs.ogImage ?? undefined })
}

function Part({ id, ground, title, children }: { id: string; ground: 'putih' | 'kertas'; title: string; children: ReactNode }) {
  return (
    <Section hour="0700" ground={ground} id={id} labelledBy={`${id}-h`}>
      <div className="wrap grid-12 gap-y-8">
        <h2 id={`${id}-h`} className="t-h2 col-span-12 lg:col-span-3">{title}</h2>
        <div className="col-span-12 grid gap-10 lg:col-span-8 lg:col-start-5">{children}</div>
      </div>
    </Section>
  )
}

export async function CasePage({ slug, locale: l }: { slug: string; locale: Locale }) {
  const cs = await load(slug, l)
  if (!cs) notFound()
  const c = cs.clientName
  const title = caseTitle(cs, l)
  const path = pathOf(cs)
  const period = months(cs.durationLabel, l)
  const lede = clean(l === 'en' ? cs.subtitleEn : cs.subtitleId, l, c)
  const heroM = metricsOf(block(cs, 'HERO'), l).slice(0, 3)
  const gridM = metricsOf(block(cs, 'METRIC_GRID'), l)
  const bullets = overviewOf(block(cs, 'OVERVIEW'), l, c)
  const snap = snapshotOf(block(cs, 'CLIENT_SNAPSHOT'), l, c)
  const ms = timelineOf(block(cs, 'TIMELINE'), l, c)
  const narr = blocks(cs, 'NARRATIVE')
    .map((d, i) => {
      const parts = parseBody(pick(d, 'body', l, c))
      return { parts, heading: pick(d, 'heading', l, c), kind: narrativeKind(parts, i) }
    })
    .filter((n) => n.parts.length)
  const used = CASE_SERVICES[cs.slug] ?? []
  const related = (await getRelatedCaseStudies({ id: cs.id, industry: cs.industry, serviceId: cs.service?.id ?? null, industryId: null }).catch(() => []))
    .map((r) => toCard(r, l, APPROVED_CASE_SLUGS))

  const S = CASE.sections
  const challenge = narr.filter((n) => n.kind === 'tantangan')
  const strategy = narr.filter((n) => n.kind === 'strategi')
  const parts = [
    (bullets.length || snap) && 'ringkasan',
    challenge.length && 'tantangan',
    (strategy.length || ms.length) && 'strategi',
    gridM.length && 'hasil',
  ].filter(Boolean) as (keyof typeof S)[]
  const ground = (k: keyof typeof S) => (parts.indexOf(k) % 2 ? 'kertas' : 'putih')

  const crumbs = [
    { name: T.home[l], href: page('home').path[l] },
    { name: PORTFOLIO.crumb[l], href: page('portfolio').path[l] },
    { name: title, href: path[l] },
  ]
  const graph = [
    orgNode(l),
    webPageNode({ url: path[l], name: title, locale: l, dateModified: iso(cs.updatedAt) ?? undefined }),
    articleNode({ url: path[l], headline: title, description: lede || undefined, l, published: iso(cs.publishedAt), modified: iso(cs.updatedAt), image: cs.ogImage ?? ogUrl(`${l}-portfolio`) }),
    breadcrumbNode(path[l], crumbs),
  ]
  const h1 = <H1Svc text={title} variant="reading" />

  return (
    <PageShell locale={l} alt={path} wa={WA_PATTERNS.caseStudy(title)[l]} sky="light">
      <JsonLd graph={graph} />
      <Section hour="0700" ground="kertas" pad="sm">
        <div className="wrap grid gap-6">
          <Breadcrumbs locale={l} items={crumbs} />
          <Dateline locale={l} word={[period, industryOf(cs, l)].filter(Boolean).join(' · ')} />
          {VT ? <VT name={`case-${cs.slug}`}>{h1}</VT> : h1}
          {lede ? <p className="t-lead max-w-lead">{lede}</p> : null}
          {heroM.length ? (
            <div>
              <ul className="grid gap-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-3">
                {heroM.map((m) => (
                  <li key={m.label}>
                    <span className="t-h2 block tabular-nums">{m.value}</span>{' '}
                    <span className="t-small mt-1 block">{`${m.label.toLowerCase()}${period ? ` ${CASE.within[l]} ${period}` : ''}.`}</span>
                  </li>
                ))}
              </ul>
              <p className="t-small mt-4 text-ink-2">{CASE.source[l]}</p>
            </div>
          ) : null}
          {used.length ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="t-small font-650 text-ink-2">{CASE.servicesUsed[l]}:</span>
              {used.map((k) => <Chip key={k} variant="stage" stage={svc(k).stage} href={svcHref(k, l)}>{svc(k).name[l]}</Chip>)}
            </div>
          ) : null}
        </div>
      </Section>
      {parts.length ? <CaseSubnav locale={l} items={parts.map((k) => ({ id: k, label: S[k][l] }))} wa={WA_PATTERNS.caseStudy(title)[l]} /> : null}
      {parts.includes('ringkasan') ? (
        <Part id="ringkasan" ground={ground('ringkasan')} title={S.ringkasan[l]}>
          {bullets.length ? <Overview bullets={bullets} /> : null}
          {snap ? <ClientSnapshot s={snap} l={l} /> : null}
        </Part>
      ) : null}
      {parts.includes('tantangan') ? (
        <Part id="tantangan" ground={ground('tantangan')} title={S.tantangan[l]}>
          {challenge.map((n, i) => <Narrative key={i} parts={n.parts} heading={n.heading} />)}
        </Part>
      ) : null}
      {parts.includes('strategi') ? (
        <Part id="strategi" ground={ground('strategi')} title={S.strategi[l]}>
          {strategy.map((n, i) => <Narrative key={i} parts={n.parts} heading={n.heading} />)}
          {ms.length ? <Timeline ms={ms} l={l} /> : null}
        </Part>
      ) : null}
      {parts.includes('hasil') ? (
        <Part id="hasil" ground={ground('hasil')} title={S.hasil[l]}>
          <MetricGrid metrics={gridM} l={l} period={period} />
        </Part>
      ) : null}
      {!parts.length ? (
        <Section hour="0700" ground="putih" labelledBy="kosong-h">
          <div className="wrap grid gap-6">
            <h2 id="kosong-h" className="t-h2">{CASE.emptyH[l]}</h2>
            <p className="t-body max-w-measure">{CASE.empty[l]}</p>
            <MeasureBlock locale={l} headingLevel={3} />
          </div>
        </Section>
      ) : null}
      {related.length ? (
        <Section hour="0700" ground="putih" labelledBy="lain-h">
          <div className="wrap">
            <h2 id="lain-h" className="t-h2">{CASE.related[l]}</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <li key={r.slug}><CaseCover locale={l} c={r} variant="card" /></li>)}
            </ul>
          </div>
        </Section>
      ) : null}
      <Section hour="0700" ground="kertas" labelledBy="layanan-terkait">
        <div className="wrap">
          <CrossSell locale={l} keys={crossLinks(used[0] ?? 'seo').slice(0, 3)} heading={CASE.pairs[l]} id="layanan-terkait" />
        </div>
      </Section>
    </PageShell>
  )
}
