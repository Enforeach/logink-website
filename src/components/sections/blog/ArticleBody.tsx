import Image from 'next/image'
import type { ReactNode } from 'react'
import type { CtaWidgetRow } from '@/lib/cta'
import { SITE_URL, type Locale } from '@/lib/services'
import { Toc } from '@/components/ds/Toc'
import { BLOG } from '@/content/blog'
import { ShareBar } from './ShareBar'

/**
 * The F-pattern stem: body (cols 1-8, .prose, CMS widgets spliced between top-level paragraphs) and the rail
 * (cols 9-12: sticky TOC + AFTER_TOC/SIDEBAR widgets). On phones the rail comes first (TOC as <details>).
 */
export function ArticleBody({ locale: l, toc, parts, rail, below, sticky, cta, sources, author, title, url }: {
  locale: Locale
  toc: { id: string; text: string; level: number }[]
  parts: (string | CtaWidgetRow)[]
  rail: ReactNode[]; below: ReactNode[]; sticky: ReactNode[]
  cta: (w: CtaWidgetRow) => ReactNode
  sources: { url: string; label: string; where: string }[]
  author: { name: string; image: string | null }
  title: string; url: string
}) {
  return (
    <div className="grid-12 mt-10 gap-y-8">
      {toc.length || rail.length ? (
        <aside className="col-span-12 lg:col-span-4 lg:col-start-9 lg:row-start-1">
          <div className="space-y-6 lg:sticky lg:top-[calc(var(--nav-h)+var(--dial-h)+24px)] lg:max-h-[calc(100svh-var(--nav-h)-48px)] lg:overflow-y-auto">
            {toc.length ? <Toc items={toc} locale={l} /> : null}
            {rail}
          </div>
        </aside>
      ) : null}
      <div className="col-span-12 min-w-0 lg:col-span-8 lg:row-start-1">
        {/* each HTML run is its own .prose block, so CMS widgets between them never inherit body styles */}
        {parts.map((p, i) => (typeof p === 'string' ? <div key={i} className="prose" dangerouslySetInnerHTML={{ __html: p }} /> : cta(p)))}
        {below}
        {sources.length ? (
          <section aria-labelledby="sumber" className="mt-12 max-w-measure border-t border-hair pt-6">
            <h2 id="sumber" className="t-h3">{BLOG.sources[l]}</h2>
            <p className="t-small mt-1 text-ink-2">{BLOG.sourcesNote[l]}</p>
            <ol className="t-small mt-4 list-decimal space-y-2 pl-5">
              {sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener" className="link">{s.label}</a>
                  <span className="break-all text-ink-2"> · {s.where}</span>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
        {author.name ? (
          <div className="mt-12 flex max-w-measure items-center gap-4 border-t border-hair pt-6">
            {author.image ? <Image src={author.image} alt="" width={48} height={48} className="h-12 w-12 rounded object-cover" /> : null}
            <div>
              <p className="t-dateline text-ink-2">{BLOG.author[l]}</p>
              <p className="mt-1 font-650">{author.name}</p>
              <p className="t-small text-ink-2">{BLOG.authorLine[l]}</p>
            </div>
          </div>
        ) : null}
        <div className="mt-8"><ShareBar locale={l} title={title} url={`${SITE_URL}${url}`} /></div>
        {sticky.length ? <div className="z-sticky lg:sticky lg:bottom-4">{sticky}</div> : null}
      </div>
    </div>
  )
}
