// Rich service page sections (owner 2026-10-04, benchmarked on the live SEO page; SEO first): the stats band under
// the hero, the USP, and 'Semua yang Anda dapatkan' as tabs (replaces Showcase + WhatWeDo). Every word is SSR text: the tabs are
// CSS radios (no JS); without :has() every panel shows. The process section is the homepage's (home/Process).
import { Fragment, type ReactNode } from 'react'
import { svc as svcOf, type Locale, type SvcKey } from '@/lib/services'
import type { Ground } from '@/styles/tailwind.tokens'
import type { ServiceContent } from '@/content/services/types'
import { SplitHeading } from '@/motion/primitives'
import { Section } from '@/components/ds/Section'
import { Icon } from '@/components/ds/Icon'
import { SerpToMaps } from '@/components/instruments/SerpToMaps'
import { BrandLogo } from '@/components/ds/BrandLogo'

/** The stats band: offer facts (never results), big gradient numbers, one honesty note. */
export function Highlights({ k, h, ground }: { k: SvcKey; h: NonNullable<ServiceContent['highlights']>; ground: Ground }) {
  return (
    <Section hour={svcOf(k).hour} ground={ground} pad="sm">
      <div className="wrap grid gap-3">
        <ul className="svc-stats">
          {h.items.map((x) => (
            <li key={x.label} className="flex items-center gap-4 px-5 py-4 md:grid md:gap-1 md:p-6 lg:p-8">
              <span className="t-stat grad-text w-[4.4ch] shrink-0 md:w-fit">{x.value}</span>
              <span className="t-small text-ink-2">{x.label}</span>
            </li>
          ))}
        </ul>
        <p className="t-small text-ink-2">{h.note}</p>
      </div>
    </Section>
  )
}

/** The USP (owner 2026-10-04): heading with its accent words in the gradient. Default: centred, two cards with points
 *  (SEO: "data-driven SEO, built for conversions"). `visual: 'maps'`: the Maps mock left, heading + a compact list
 *  right (Local SEO, like the live page's radius section). */
export function Usp({ k, locale: l, u, ground }: { k: SvcKey; locale: Locale; u: NonNullable<ServiceContent['usp']>; ground: Ground }) {
  if (u.visual === 'maps') {
    return (
      <Section hour={svcOf(k).hour} ground={ground} id="usp" labelledBy="usp-h">
        <div className="wrap grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5"><SerpToMaps locale={l} mode="maps" /></div>
          <div className="grid gap-6 lg:col-span-6 lg:col-start-7">
            <div className="grid gap-3">
              <SplitHeading text={u.heading} id="usp-h" accent={u.accent ?? 1} />
              <p className="t-lead">{u.lead}</p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {u.cards.map((x) => (
                <li key={x.title} className="flex items-start gap-3">
                  <span className="svc-tick mt-[.2em]" aria-hidden="true"><Icon name="check" size={14} /></span>
                  <span className="grid gap-1"><h3 className="t-ui font-650">{x.title}</h3><span className="t-small text-ink-2">{x.text}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    )
  }
  return (
    <Section hour={svcOf(k).hour} ground={ground} id="usp" labelledBy="usp-h">
      <div className="wrap grid gap-10">
        <div className="mx-auto grid max-w-lead justify-items-center gap-4 text-center">
          <SplitHeading text={u.heading} id="usp-h" accent={u.accent ?? 1} />
          <p className="t-lead">{u.lead}</p>
        </div>
        <ul className={`mx-auto grid w-full gap-4 ${u.cards.length === 3 ? 'md:grid-cols-3' : u.cards.length === 4 ? 'md:grid-cols-2' : 'max-w-[1040px] md:grid-cols-2'}`}>
          {u.cards.map((x, i) => (
            <li key={x.title} data-ground="putih" className={`card-raised grid content-start gap-3 p-6 lg:p-8 ${i === (u.pop ?? 1) ? 'tier-pop' : ''}`}>
              {x.logo ? (
                <span className="flex items-center gap-3">
                  <BrandLogo brand={x.logo} />
                  <span className="grid"><h3 className="t-h3">{x.title}</h3>{x.sub ? <span className="t-small text-ink-2">{x.sub}</span> : null}</span>
                </span>
              ) : (
                <>
                  {x.value
                    ? <span className="t-stat grad-text w-fit">{x.value}</span>
                    : <span className="proc-num grad-text w-fit" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>}
                  <h3 className="t-h3">{x.title}</h3>
                </>
              )}
              <p className="t-body text-ink-2">{x.text}</p>
              {x.points?.length ? (
                <ul className="t-small mt-1 grid gap-2.5 border-t border-hair pt-4">
                  {x.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2"><span className="svc-tick mt-px scale-90" aria-hidden="true"><Icon name="check" size={12} /></span>{pt}</li>
                  ))}
                </ul>
              ) : null}
              {x.tag ? <p className="mt-auto pt-2"><span className="svc-badge">{x.tag}</span></p> : null}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

/** 'Di balik layar' on the rich AI page: heading, lead and the labelled mocks, without Showcase's collapsed panels. */
export function Behind({ k, heading, lead, ground, children }: { k: SvcKey; heading: string; lead: string; ground: Ground; children: ReactNode }) {
  return (
    <Section hour={svcOf(k).hour} ground={ground} id="tampilan" labelledBy="tampilan-h">
      <div className="wrap grid gap-10">
        <div className="grid max-w-lead gap-3">
          <h2 id="tampilan-h" className="t-h2">{heading}</h2>
          <p className="t-lead">{lead}</p>
        </div>
        {children}
      </div>
    </Section>
  )
}

/** 'Semua yang Anda dapatkan': one radio per group (arrow keys move between them natively), one panel each. */
export function Included({ k, inc, ground }: { k: SvcKey; inc: NonNullable<ServiceContent['included']>; ground: Ground }) {
  const name = `inc-${k}`
  return (
    <Section hour={svcOf(k).hour} ground={ground} id="layanan" labelledBy="layanan-h">
      <div className="wrap grid gap-8">
        <div className="grid max-w-lead gap-3">
          <h2 id="layanan-h" className="t-h2">{inc.heading}</h2>
          <p className="t-lead">{inc.lead}</p>
        </div>
        <div className="svc-tabs grid gap-6">
          <fieldset className="svc-tablist">
            <legend className="sr-only">{inc.heading}</legend>
            {inc.tabs.map((t, i) => (
              <Fragment key={t.label}>
                <input type="radio" name={name} id={`${name}-${i}`} defaultChecked={i === 0} className="sr-only" />
                <label htmlFor={`${name}-${i}`}>{t.label}</label>
              </Fragment>
            ))}
          </fieldset>
          <div className="svc-panels">
            {inc.tabs.map((t) => (
              <ul key={t.label}>
                {t.items.map((x) => (
                  <li key={x.title} className="card grid content-start gap-2 p-5 lg:p-6">
                    <span className="flex items-start gap-2">
                      <span className="svc-tick mt-[.2em]" aria-hidden="true"><Icon name="check" size={14} /></span>
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h3 className="t-h3">{x.title}</h3>
                        {x.badge ? <span className="svc-badge">{x.badge}</span> : null}
                      </span>
                    </span>
                    <p className="t-small text-ink-2">{x.text}</p>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
