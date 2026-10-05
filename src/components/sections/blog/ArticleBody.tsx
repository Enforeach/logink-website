import type { ReactNode } from 'react'
import type { CtaWidgetRow } from '@/lib/cta'
import { SITE_URL, type Locale } from '@/lib/services'
import { Toc } from '@/components/ds/Toc'
import { BLOG } from '@/content/blog'
import { ShareBar } from './ShareBar'

export const SVC_CTA = { kind: 'svc-cta' } as const // the built-in mid-article service CTA
export type Widget = CtaWidgetRow | typeof SVC_CTA
export type Part = string | Widget
const ON_PAGE = { id: 'Di halaman ini', en: 'On this page' }

/**
 * The F-pattern body (owner 2026-10-05, the document layout of About/Privacy): the 'On this page' rail on the left
 * (the F's vertical stroke, scroll-spy), the article in the middle (.prose runs with CMS widgets and the built-in
 * service CTA spliced between paragraphs), and the aside on the right (author + sticky related service + CMS rail).
 * Phones: rail (collapsed), article, aside.
 */
export function ArticleBody({ locale: l, toc, parts, render, aside, below, sticky, sources, title, url }: {
  locale: Locale
  toc: { id: string; text: string; level: number }[]
  parts: Part[]
  render: (p: Widget, i: number) => ReactNode
  aside: ReactNode; below: ReactNode[]; sticky: ReactNode[]
  sources: { url: string; label: string; where: string }[]
  title: string; url: string
}) {
  return (
    <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8 lg:pt-6">
      <div className="lg:col-span-3">
        {toc.length ? <Toc items={toc} locale={l} label={ON_PAGE[l]} rail /> : null}
      </div>
      <div className="min-w-0 lg:col-span-6">
        {/* each HTML run is its own .prose block, so widgets between them never inherit body styles */}
        {parts.map((p, i) => (typeof p === 'string' ? <div key={i} className="prose" dangerouslySetInnerHTML={{ __html: p }} /> : render(p, i)))}
        {below}
        {sources.length ? (
          <section aria-labelledby="sumber" className="mt-12 border-t border-hair pt-6">
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
        <div className="mt-10 border-t border-hair pt-6"><ShareBar locale={l} title={title} url={`${SITE_URL}${url}`} /></div>
        {sticky.length ? <div className="z-sticky lg:sticky lg:bottom-4">{sticky}</div> : null}
      </div>
      <aside className="grid content-start gap-4 lg:col-span-3">{aside}</aside>
    </div>
  )
}
