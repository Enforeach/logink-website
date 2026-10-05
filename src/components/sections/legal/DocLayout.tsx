// Document pages (owner 2026-10-05, benchmarked on duomark.id): About, Privacy Policy, Terms and Disclaimer share one
// reading layout. A light hero band (breadcrumbs, eyebrow pill, H1, lede or last-updated), then three columns: the
// 'On this page' rail (scroll-spy), the prose, and a sticky aside of cards. Phones: rail (collapsed), prose, cards.
import Link from 'next/link'
import type { ReactNode } from 'react'
import { EMAIL, page, type Locale, type PageKey } from '@/lib/services'
import { Section } from '@/components/ds/Section'
import { Breadcrumbs } from '@/components/ds/Breadcrumbs'
import { Dateline } from '@/components/ds/Dateline'
import { H1Svc } from '@/components/ds/H1Svc'
import { Toc } from '@/components/ds/Toc'
import { Icon } from '@/components/ds/Icon'
import { WaButton } from '@/components/ds/WaButton'
import { T } from '@/components/ds/strings'

const L = {
  onPage: { id: 'Di halaman ini', en: 'On this page' },
  legal: { id: 'Legal & perusahaan', en: 'Legal & company' },
}

export function DocHero({ locale: l, crumbs, eyebrow, h1, id, children }: {
  locale: Locale; crumbs: { name: string; href: string }[]; eyebrow: string; h1: string; id: string; children?: ReactNode
}) {
  return (
    <Section ground="kertas" pad="sm" labelledBy={id}>
      <div className="wrap grid gap-6 pb-4">
        <Breadcrumbs locale={l} items={crumbs} />
        <Dateline locale={l} label={eyebrow} />
        <div className="grid max-w-[52rem] gap-5">
          <H1Svc text={h1} id={id} />
          {children}
        </div>
      </div>
    </Section>
  )
}

export function DocBody({ locale: l, toc, aside, children }: {
  locale: Locale; toc: { id: string; text: string }[]; aside: ReactNode; children: ReactNode
}) {
  return (
    <Section ground="putih" pad="sm">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8 lg:pt-6">
        <div className="lg:col-span-3">
          <Toc items={toc.map((t) => ({ ...t, level: 2 }))} locale={l} label={L.onPage[l]} rail />
        </div>
        <div className="doc-prose min-w-0 lg:col-span-6">{children}</div>
        <aside className="grid content-start gap-4 lg:sticky lg:top-[calc(var(--nav-h)+var(--dial-h)+24px)] lg:col-span-3 lg:self-start">{aside}</aside>
      </div>
    </Section>
  )
}

/** A prose section: an H2 the rail links to, then its body. */
export function DocSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`}>{title}</h2>
      {children}
    </section>
  )
}

/** The four company/legal pages, the current one marked. */
export function LegalLinks({ locale: l, current }: { locale: Locale; current: PageKey }) {
  const keys: PageKey[] = ['about', 'privacy', 'terms', 'disclaimer']
  return (
    <nav aria-label={L.legal[l]} className="doc-card">
      <p className="doc-card__label">{L.legal[l]}</p>
      <ul className="mt-2">
        {keys.map((k) => {
          const p = page(k)
          const name = k === 'about' ? T.about[l] : p.h1[l]
          return (
            <li key={k} className="border-t border-hair first:border-t-0">
              <Link href={p.path[l]} aria-current={k === current ? 'page' : undefined}
                className="flex min-h-tap items-center justify-between gap-3 text-ink transition-colors hover:text-[var(--link)] aria-[current=page]:font-650 aria-[current=page]:text-[var(--link)]">
                {name}<Icon name="arrow-up-right" size={16} />
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/** Key facts as label/value rows (About's 'Logink at a glance'). */
export function FactCard({ title, items }: { title: string; items: { k: string; v: ReactNode }[] }) {
  return (
    <div className="doc-card doc-card--tint">
      <p className="doc-card__label">{title}</p>
      <dl className="mt-3 grid gap-3">
        {items.map((x) => (
          <div key={x.k}>
            <dt className="t-small text-ink-2">{x.k}</dt>
            <dd className="font-650 text-ink">{x.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/** The question / next-step card: one line, the WhatsApp button, the contact page and email. */
export function AskCard({ locale: l, title, sub, wa }: { locale: Locale; title: string; sub?: string; wa: string }) {
  return (
    <div className="doc-card">
      <p className="font-650 text-ink">{title}</p>
      {sub ? <p className="t-small mt-1 text-ink-2">{sub}</p> : null}
      <div className="mt-4"><WaButton text={wa} placement="doc" full /></div>
      <p className="t-small mt-3 flex flex-wrap gap-x-4 gap-y-1">
        <Link href={page('contact').path[l]} className="link">{T.contact[l]}</Link>
        <a href={`mailto:${EMAIL}`} className="link [overflow-wrap:anywhere]">{EMAIL}</a>
      </p>
    </div>
  )
}
