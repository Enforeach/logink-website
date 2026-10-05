// E3 · Website frame + PageSpeed-style rings. A chrome-less frame of a fictional kedai landing page; the
// "Pesan via WhatsApp" is a static <span>. The rings swing in once; values are text. Used on: Website hero/steps
// (home Bab II drops it, §11 4.7).
import type { Locale } from '@/lib/services'
import { DOMAIN, KEDAI, SITE } from '@/content/instruments'
import { MockFrame, v, type MockGround } from './MockFrame'

const C = 2 * Math.PI * 16 // ring circumference (r = 16 in a 40 box)

export function SiteFrame({ locale: l, ground = 'putih', className }: { locale: Locale; ground?: MockGround; className?: string }) {
  return (
    <MockFrame locale={l} ground={ground} className={className}>
      <div className="grid">
        <div className="m-site bg-surface">
          <div className="border-b border-hair px-3 py-2"><span className="m-mono m-xs text-ink-2">{DOMAIN}</span></div>
          <div className="grid gap-3 p-3 sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <b className="font-650">{KEDAI}</b>
              <span className="m-xs flex gap-3 text-ink-2">{SITE.nav[l].map((n) => <span key={n}>{n}</span>)}</span>
            </div>
            <div className="grid justify-items-start gap-2 bg-surface-alt p-4">
              <b className="m-h">{KEDAI}</b>
              <span className="m-s">{SITE.sub[l]}</span>
              <span className="m-btn m-wa m-press">{SITE.cta[l]}</span>
            </div>
            <ul className="grid grid-cols-3 gap-2 pb-6">
              {SITE.menu[l].map((m) => (
                <li key={m} className="grid gap-1"><i className="block h-[3.5em] bg-surface-alt" aria-hidden="true" /><span className="m-xs">{m}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="m-box relative -mt-5 mr-3 grid justify-self-end gap-2 bg-surface">
          <span className="m-cap">{SITE.gaugeTag[l]}</span>
          <ul className="flex gap-3">
            {SITE.gauges.map((g, i) => (
              <li key={g.k.en} className="grid justify-items-center gap-1">
                <span className="m-ring">
                  <svg viewBox="0 0 40 40" aria-hidden="true">
                    <circle className="tr" cx="20" cy="20" r="16" />
                    <circle className="arc" cx="20" cy="20" r="16" strokeDasharray={`${(g.v / 100) * C} ${C}`} style={v({ '--i': i })} />
                  </svg>
                  <b className="m-s font-650 tabular-nums">{g.v}</b>
                </span>
                <span className="m-xs text-ink-2">{g.k[l]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MockFrame>
  )
}
