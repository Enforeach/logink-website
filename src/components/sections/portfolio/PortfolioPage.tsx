// Portfolio hub /portfolio + /en/portfolio (BUILD §3.9 portfolio) · 0700 Kertas, magenta.
// Typographic case covers from Payload; no metric sentence unless the slug is in APPROVED_CASE_SLUGS.
import { getPortfolioList } from '@/payload/queries'
import { APPROVED_CASE_SLUGS, page, type Locale } from '@/lib/services'
import { abs, breadcrumbNode, orgNode, webPageNode } from '@/lib/meta'
import { PageShell } from '@/components/ds/chrome/PageShell'
import { Section } from '@/components/ds/Section'
import { Dateline } from '@/components/ds/Dateline'
import { H1Svc } from '@/components/ds/H1Svc'
import { Breadcrumbs } from '@/components/ds/Breadcrumbs'
import { CaseCover } from '@/components/ds/CaseCover'
import { JsonLd } from '@/components/ds/JsonLd'
import { T } from '@/components/ds/strings'
import { PORTFOLIO } from '@/content/portfolio'
import { clean, toCard } from '../case/clean'
import { MeasureBlock } from '@/components/instruments/MeasureBlock'

const caseHref = (c: { slug: string; slugEn: string | null }, l: Locale) => (l === 'en' ? `/en/portfolio/${c.slugEn ?? c.slug}` : `/portfolio/${c.slug}`)

export async function PortfolioPage({ locale: l }: { locale: Locale }) {
  const p = page('portfolio')
  const list = await getPortfolioList().catch(() => [])
  const cards = list.map((cs) => toCard(cs, l, APPROVED_CASE_SLUGS))
  const subs = list.map((cs) => clean(l === 'en' ? cs.subtitleEn : cs.subtitleId, l, cs.clientName))
  const crumbs = [{ name: T.home[l], href: page('home').path[l] }, { name: PORTFOLIO.crumb[l], href: p.path[l] }]
  const title = (c: (typeof cards)[number]) => (l === 'en' ? c.title.en : null) ?? c.title.id
  const graph = [
    orgNode(l),
    webPageNode({ url: p.path[l], name: p.h1[l], type: 'CollectionPage', locale: l, dateModified: p.updated }),
    {
      '@type': 'ItemList', '@id': `${abs(p.path[l])}#cases`,
      itemListElement: cards.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(caseHref(c, l)), name: title(c) })),
    },
    breadcrumbNode(p.path[l], crumbs),
  ]

  return (
    <PageShell locale={l} alt={p.path} wa={p.wa[l]} sky="light">
      <JsonLd graph={graph} />
      <Section hour="0700" ground="kertas" labelledBy="pf-h">
        <div className="wrap grid-12 gap-y-6">
          <div className="col-span-12"><Breadcrumbs locale={l} items={crumbs} /></div>
          <Dateline locale={l} hour="0700" word={PORTFOLIO.word[l]} className="col-span-12" />
          <div className="col-span-12 lg:col-span-9"><H1Svc text={p.h1[l]} id="pf-h" /></div>
          <p className="t-lead col-span-12 max-w-lead lg:col-span-7">{cards.length ? PORTFOLIO.lede(cards.length)[l] : PORTFOLIO.empty[l]}</p>
        </div>
      </Section>
      {cards.length ? (
        <Section hour="0700" ground="putih" id="studi-kasus" labelledBy="sk-h" pad="sm">
          <div className="wrap">
            <h2 id="sk-h" className="t-h2">{PORTFOLIO.casesH[l]}</h2>
            <ul className="mt-8 grid gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((c, i) => (
                <li key={c.slug} className="row-span-2 grid grid-rows-subgrid gap-y-3 pb-5">
                  <CaseCover locale={l} c={c} variant="card" />
                  {subs[i] ? <p className="t-small text-ink-2">{subs[i]}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : (
        <Section hour="0700" ground="putih" labelledBy="kosong-h" pad="sm">
          <div className="wrap"><h2 id="kosong-h" className="t-h2">{PORTFOLIO.emptyH[l]}</h2></div>
        </Section>
      )}
      <Section hour="0700" ground="kertas" id="cara-mengukur" labelledBy="ukur-h">
        <div className="wrap"><div className="max-w-[56rem]"><MeasureBlock locale={l} headingLevel={2} id="ukur-h" /></div></div>
      </Section>
    </PageShell>
  )
}
