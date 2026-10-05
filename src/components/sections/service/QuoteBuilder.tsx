'use client'
// Social / Creative quote builder island (BUILD §3.8 block 07). Every module, deliverable and price line is
// SSR text in PricingSection; this island only turns choices into a WhatsApp prefill (quote.ts). There is no
// price and no total here: every quote is custom. Before hydration (or without JS) the controls render in
// their initial state and the button carries the page's own prefill, so WhatsApp is always reachable.
import { useState, type ReactNode } from 'react'
import type { BuilderCopy } from '@/content/services/types'
import { initialForm, message, type Form } from './quote'

const box = 'flex min-h-tap items-center gap-3 t-small [&:has(:disabled)]:text-ink-2'
const input = 'size-5 shrink-0 [accent-color:var(--ink)]'

export function QuoteBuilder({ kind, locale: l, copy, fallback, waBase, service, label, icon }: {
  kind: 'social' | 'creative'
  locale: 'id' | 'en'
  copy: BuilderCopy
  fallback: string // the page prefill (registry `wa`) while nothing is chosen
  waBase: string // `https://wa.me/<number>?text=` (built on the server, so no registry in this bundle)
  service: 'social' | 'creative'
  label: string
  icon: ReactNode
}) {
  const [f, setF] = useState<Form>(() => initialForm(copy.groups))
  const msg = message(kind, l, f, copy.groups)
  const on = (id: string, v: boolean) => setF((s) => ({ ...s, on: { ...s.on, [id]: v } }))
  const sel = (id: string, v: string) => setF((s) => ({ ...s, sel: { ...s.sel, [id]: v } }))
  return (
    <div className="card grid gap-8 p-6 lg:p-8">
      <div className="grid max-w-[60ch] gap-2">
        <h3 className="t-h3">{copy.heading}</h3>
        <p className="t-body">{copy.intro}</p>
      </div>
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
        {copy.groups.map((g) => {
          const off = !!g.toggle && !f.on[g.id]
          return (
            <fieldset key={g.id} className="grid content-start gap-1 border-t border-hair pt-4">
              <legend className="t-ui float-left w-full pb-2 font-650">{g.label}</legend>
              {g.toggle ? (
                <label className={box}>
                  <input type="checkbox" className={input} checked={!!f.on[g.id]} onChange={(e) => on(g.id, e.target.checked)} />
                  <span className="font-650">{g.toggle}</span>
                </label>
              ) : null}
              {g.items?.map((i) => (
                <label key={i.id} className={box}>
                  {g.multi === false ? (
                    <input type="radio" className={input} name={`${kind}-${g.id}`} checked={f.sel[g.id] === i.id} onChange={() => sel(g.id, i.id)} />
                  ) : (
                    <input type="checkbox" className={input} disabled={off} checked={!!f.on[i.id]} onChange={(e) => on(i.id, e.target.checked)} />
                  )}
                  <span>{i.label}</span>
                </label>
              ))}
              {g.selects?.map((s) => (
                <label key={s.id} className="t-small mt-2 grid gap-1 [&:has(:disabled)]:text-ink-2">
                  {s.label}
                  <select className="t-ui min-h-tap rounded border border-hair bg-surface px-3 disabled:opacity-60" disabled={off}
                    value={f.sel[s.id]} onChange={(e) => sel(s.id, e.target.value)}>
                    {s.options.map((o) => <option key={o.v} value={o.v}>{o.label}</option>)}
                  </select>
                </label>
              ))}
            </fieldset>
          )
        })}
      </div>
      <div className="grid gap-4 border-t border-hair pt-6 lg:grid-cols-[minmax(0,2fr)_auto] lg:items-end">
        <div className="grid gap-2" aria-live="polite">
          <p className="t-small font-650 text-ink-2">{copy.summary}</p>
          <p className="t-small max-w-[70ch] whitespace-pre-line">{msg ?? copy.empty}</p>
          <p className="t-small font-650">{copy.price}</p>
        </div>
        <a className="btn btn-wa" href={waBase + encodeURIComponent(msg ?? fallback)} target="_blank" rel="noopener"
          data-cta="whatsapp" data-placement="builder" data-service={service} data-cursor="Chat WhatsApp" data-cursor-tone="wa">
          {icon}
          {label}
        </a>
      </div>
    </div>
  )
}
