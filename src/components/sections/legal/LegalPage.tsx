import privacy from '@/content/legal/privacy'
import terms from '@/content/legal/terms'
import { EMAIL, page, type Locale } from '@/lib/services'
import { breadcrumbNode, orgNode, staticMeta, webPageNode } from '@/lib/meta'
import { PageShell } from '@/components/ds/chrome/PageShell'
import { Section } from '@/components/ds/Section'
import { Wrap } from '@/components/ds/Wrap'
import { Breadcrumbs } from '@/components/ds/Breadcrumbs'
import { H1Svc } from '@/components/ds/H1Svc'
import { Toc } from '@/components/ds/Toc'
import { TextLink } from '@/components/ds/TextLink'
import { JsonLd } from '@/components/ds/JsonLd'
import { T, fmtDate } from '@/components/ds/strings'

const DOCS = { privacy, terms }
const LAST = { id: 'Terakhir diperbarui', en: 'Last updated' }
export const legalMeta = (doc: 'privacy' | 'terms', l: Locale) => staticMeta(doc, l)

/** Legal reading layout (BUILD §3.9): 0600 Kertas, last-updated dateline, numbered sticky TOC, 70ch verbatim body. */
export function LegalPage({ doc, locale: l }: { doc: 'privacy' | 'terms'; locale: Locale }) {
  const p = page(doc)
  const d = DOCS[doc][l]
  const url = p.path[l]
  const crumbs = [{ name: T.home[l], href: page('home').path[l] }, { name: p.h1[l], href: url }]
  const toc = d.sections.map((s) => ({ id: s.id, text: s.title.replace(/^\d+\.\s/, ''), level: 2 }))
  const graph = [orgNode(l), webPageNode({ url, name: p.h1[l], locale: l, dateModified: d.updated }), breadcrumbNode(url, crumbs)]

  return (
    <PageShell locale={l} alt={p.path} wa={p.wa[l]} sky="light">
      <JsonLd graph={graph} />
      <Section hour="0600" labelledBy="legal-h1">
        <Wrap>
          <Breadcrumbs locale={l} items={crumbs} />
          <p className="dateline mt-6">
            <span>{LAST[l]} <time dateTime={d.updated}>{fmtDate(d.updated, l)}</time></span>
            <span>Legal</span>
          </p>
          <header className="mt-8 max-w-[52rem]">
            <H1Svc text={p.h1[l]} id="legal-h1" />
            <p className="t-lead mt-6">{d.lede}</p>
          </header>
          <div className="grid-12 mt-12 gap-y-8">
            <aside className="col-span-12 lg:col-span-3 lg:row-start-1">
              <Toc items={toc} locale={l} numbered />
            </aside>
            <div className="col-span-12 min-w-0 lg:col-span-8 lg:col-start-5 lg:row-start-1">
              <div className="max-w-[70ch]">
                <p className="t-lead">{d.intro[0]}<strong className="font-650">{d.intro[1]}</strong>{d.intro[2]}</p>
                {d.sections.map((s) => (
                  <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="mt-10 border-t border-hair pt-8">
                    <h2 id={`${s.id}-h`} className="t-h3">{s.title}</h2>
                    {s.content.map((c) => (
                      <div key={c.subtitle} className="mt-6">
                        <h3 className="font-650">{c.subtitle}</h3>
                        <p className="t-body mt-2">{c.text}</p>
                      </div>
                    ))}
                  </section>
                ))}
                <div className="mt-12 border-t border-line pt-6">
                  {d.ask.map((a, i) => <p key={a} className={i ? 't-small mt-1 text-ink-2' : 'font-650'}>{a}</p>)}
                  <p className="t-small mt-3 flex flex-wrap gap-x-4 gap-y-2">
                    <a href={`mailto:${EMAIL}`} className="link">{EMAIL}</a>
                    <TextLink href={page('contact').path[l]} arrow>{T.contact[l]}</TextLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Wrap>
      </Section>
    </PageShell>
  )
}
