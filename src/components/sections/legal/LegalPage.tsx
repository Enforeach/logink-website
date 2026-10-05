import privacy from '@/content/legal/privacy'
import terms from '@/content/legal/terms'
import disclaimer from '@/content/legal/disclaimer'
import { page, type Locale } from '@/lib/services'
import { breadcrumbNode, orgNode, staticMeta, webPageNode } from '@/lib/meta'
import { PageShell } from '@/components/ds/chrome/PageShell'
import { JsonLd } from '@/components/ds/JsonLd'
import { T, fmtDate } from '@/components/ds/strings'
import { AskCard, DocBody, DocHero, DocSection, LegalLinks } from './DocLayout'

const DOCS = { privacy, terms, disclaimer }
type Doc = keyof typeof DOCS
const LAST = { id: 'Terakhir diperbarui', en: 'Last updated' }
export const legalMeta = (doc: Doc, l: Locale) => staticMeta(doc, l)

/** Legal reading layout (owner 2026-10-05, benchmarked on duomark.id): the shared document layout. Privacy and Terms
 *  text stays verbatim (titles keep their numbers; the rail drops them); the closing 'ask' lines move to the aside card. */
export function LegalPage({ doc, locale: l }: { doc: Doc; locale: Locale }) {
  const p = page(doc)
  const d = DOCS[doc][l]
  const url = p.path[l]
  const crumbs = [{ name: T.home[l], href: page('home').path[l] }, { name: p.h1[l], href: url }]
  const toc = d.sections.map((s) => ({ id: s.id, text: s.title.replace(/^\d+\.\s/, '') }))
  const graph = [orgNode(l), webPageNode({ url, name: p.h1[l], locale: l, dateModified: d.updated }), breadcrumbNode(url, crumbs)]

  return (
    <PageShell locale={l} alt={p.path} wa={p.wa[l]} sky="light">
      <JsonLd graph={graph} />
      <DocHero locale={l} crumbs={crumbs} eyebrow="Legal" h1={p.h1[l]} id="legal-h1">
        <p className="t-lead">{d.lede}</p>
        <p className="t-small text-ink-2">{LAST[l]} <time dateTime={d.updated}>{fmtDate(d.updated, l)}</time></p>
      </DocHero>
      <DocBody locale={l} toc={toc}
        aside={<><LegalLinks locale={l} current={doc} /><AskCard locale={l} title={d.ask[0]} sub={d.ask[1]} wa={p.wa[l]} /></>}>
        <p className="doc-lead">{d.intro[0]}<strong>{d.intro[1]}</strong>{d.intro[2]}</p>
        {d.sections.map((s) => (
          <DocSection key={s.id} id={s.id} title={s.title}>
            {s.content.map((c) => (
              <div key={c.subtitle}>
                <h3>{c.subtitle}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </DocSection>
        ))}
      </DocBody>
    </PageShell>
  )
}
