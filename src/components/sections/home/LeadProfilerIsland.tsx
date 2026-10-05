'use client'
// Lead Profiler island (moved from components/public/LeadProfiler.tsx, restyled; §4.4, M9). ProfilerMount imports
// it near the viewport and swaps it in for the SSR shell, which it mirrors 1:1 (same first bubble, same chips),
// so the swap shifts nothing. Contract kept: 6 questions per path, the existing brief format opened on wa.me,
// and POST /api/contact { name, email, company, phone, services: [key], message: brief, source: 'lead_profiler' }
// with the `website` honeypot. No framer-motion: bubbles rise with motion.css .lk-chat--live (CSS only).
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ANTI_SCAM, waLink, type Locale } from '@/lib/services'
import { CHIP, CHIP_KEYS, NO_SITE, PATHS, UI, type PathKey } from './profiler-data'
import { ProfilerCard, chipCls } from './ProfilerCard'

type Msg = { id: number; bot: boolean; text: string }
type Phase = 'gateway' | 'busy' | 'questions' | 'contact' | 'done'
type Contact = { nama: string; bisnis: string; email: string; wa: string; website: string }
const EMPTY: Contact = { nama: '', bisnis: '', email: '', wa: '', website: '' }
let seq = 0

export function LeadProfilerIsland({ locale: l, first, chip360, orOne, bot }: { locale: Locale; first: string; chip360: string; orOne: string; bot: string }) {
  const ui = UI[l]
  const paths = PATHS[l]
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, bot: true, text: first }])
  const [phase, setPhase] = useState<Phase>('gateway')
  const [path, setPath] = useState<PathKey | null>(null)
  const [qi, setQi] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [multi, setMulti] = useState<string[]>([])
  const [contact, setContact] = useState<Contact>(EMPTY)
  const [typing, setTyping] = useState(false)
  const log = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const el = log.current
    if (el && msgs.length > 1) el.scrollTop = el.scrollHeight
  }, [msgs, typing])

  const user = (text: string) => setMsgs((m) => [...m, { id: ++seq, bot: false, text }])
  const say = (text: string) =>
    new Promise<void>((done) => {
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        setMsgs((m) => [...m, { id: ++seq, bot: true, text }])
        setTimeout(done, 120)
      }, Math.min(400 + text.length * 8, 1200))
    })

  async function pick(k: PathKey) {
    setPhase('busy')
    user(k === '360' ? chip360 : CHIP[l][k])
    setPath(k)
    await say(paths[k].confirm ?? ui.confirm(paths[k].name))
    await say(paths[k].qs[0].text)
    setQi(0)
    setPhase('questions')
  }

  async function next(k: PathKey, idx: number) {
    const qs = paths[k].qs
    if (idx >= qs.length) {
      await say(ui.contact1)
      await say(ui.contact2)
      setPhase('contact')
      return
    }
    await say((idx === qs.length - 1 ? ui.lastQ : '') + qs[idx].text)
    setQi(idx)
    setPhase('questions')
  }

  async function answer(value: string) {
    if (!path) return
    const q = paths[path].qs[qi]
    setPhase('busy')
    user(value)
    setMulti([])
    setAnswers((a) => ({ ...a, [q.key]: value }))
    if (path === 'seo' && q.key === 'status_website' && value === NO_SITE[l]) {
      await say(ui.seoRedirect) // kept from the original flow: SEO without a site → the Website path, question 2
      setPath('website')
      await next('website', 1)
      return
    }
    await next(path, qi + 1)
  }

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!path) return
    const p = paths[path]
    const brief = [
      '🔥 *LEAD BARU - LOGINK*',
      `📋 *Service: ${p.name}*`,
      '',
      ...p.qs.map((q) => `*${q.label}:* ${answers[q.key] || '-'}`),
      '',
      '👤 *Kontak:*',
      `Nama: ${contact.nama}`,
      `Bisnis: ${contact.bisnis || '-'}`,
      `Email: ${contact.email}`,
      `WA: ${contact.wa}`,
      '',
      '_Dikirim via Logink Lead Profiler_',
    ].join('\n')
    window.open(waLink(brief), '_blank', 'noopener') // synchronous in the click, so popup blockers allow it
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        name: contact.nama, email: contact.email, company: contact.bisnis || undefined, phone: contact.wa,
        services: [path], budgetRange: answers.budget, message: brief, source: 'lead_profiler', website: contact.website,
      }),
    }).catch(() => {}) // the wa.me brief already carries everything; the save is best effort
    ;(window as unknown as { dataLayer?: object[] }).dataLayer?.push({ event: 'lead_submit', source: 'lead_profiler', service: path })
    setPhase('busy')
    user(ui.sent)
    const name = contact.nama.trim().split(/\s+/)[0]
    say(ui.done1(name)).then(() => say(ui.done2)).then(() => say(ANTI_SCAM[l])).then(() => setPhase('done'))
  }

  function restart() {
    setMsgs([{ id: ++seq, bot: true, text: first }])
    setPath(null)
    setAnswers({})
    setContact(EMPTY)
    setPhase('gateway')
  }

  const q = path && phase === 'questions' ? paths[path].qs[qi] : null
  return (
    <ProfilerCard
      bot={bot}
      status={q ? ui.step(qi + 1) : undefined}
      logRef={log}
      msgs={msgs}
      typing={typing ? ui.typing : undefined}
    >
      {phase === 'gateway' ? (
        <>
          <button type="button" className={chipCls(true)} onClick={() => pick('360')} data-cta="profiler" data-placement="profiler" data-service="360">{chip360}</button>
          <p className="t-small text-ink-2">{orOne}</p>
          <div className="flex flex-wrap gap-2">
            {CHIP_KEYS.map((k) => (
              <button key={k} type="button" className={chipCls()} onClick={() => pick(k)} data-cta="profiler" data-placement="profiler" data-service={k}>{CHIP[l][k]}</button>
            ))}
          </div>
        </>
      ) : null}
      {q && q.type === 'single' ? (
        <div className="flex flex-wrap gap-2">
          {q.opts.map((o) => <button key={o} type="button" className={chipCls()} onClick={() => answer(o)}>{o}</button>)}
        </div>
      ) : null}
      {q && q.type === 'multi' ? (
        <div className="grid gap-3">
          <div className="flex flex-wrap gap-2">
            {q.opts.map((o) => {
              const on = multi.includes(o)
              return (
                <button key={o} type="button" aria-pressed={on} className={chipCls(false, on)}
                  onClick={() => setMulti((m) => (on ? m.filter((x) => x !== o) : [...m, o]))}>{o}</button>
              )
            })}
          </div>
          {multi.length ? <button type="button" className="btn btn-ink btn-sm justify-self-start" onClick={() => answer(multi.join(', '))}>{ui.multi(multi.length)}</button> : null}
        </div>
      ) : null}
      {phase === 'contact' ? <ContactForm l={l} c={contact} set={setContact} onSubmit={submit} /> : null}
      {phase === 'done' ? <button type="button" className={chipCls()} onClick={restart}>{ui.restart}</button> : null}
    </ProfilerCard>
  )
}

function ContactForm({ l, c, set, onSubmit }: { l: Locale; c: Contact; set: (f: (c: Contact) => Contact) => void; onSubmit: (e: FormEvent) => void }) {
  const f = UI[l].form
  const fields = [
    { k: 'nama', label: f.nama, type: 'text', req: true, auto: 'name' },
    { k: 'bisnis', label: f.bisnis, type: 'text', req: false, auto: 'organization' },
    { k: 'email', label: f.email, type: 'email', req: true, auto: 'email' },
    { k: 'wa', label: f.wa, type: 'tel', req: true, auto: 'tel' },
  ] as const
  return (
    <form className="grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
      {fields.map((x) => (
        <label key={x.k} className="grid gap-1">
          <span className="t-small text-ink-2">{x.label}{x.req ? ` (${f.req})` : ''}</span>
          <input
            type={x.type} required={x.req} autoComplete={x.auto} minLength={x.k === 'nama' ? 2 : undefined}
            value={c[x.k]} onChange={(e) => set((p) => ({ ...p, [x.k]: e.target.value }))}
            className="min-h-tap rounded border border-line bg-surface px-3 text-ink"
          />
        </label>
      ))}
      {/* honeypot: bots fill it, /api/contact then saves nothing */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden [clip-path:inset(50%)]">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" value={c.website} onChange={(e) => set((p) => ({ ...p, website: e.target.value }))} /></label>
      </div>
      <button type="submit" className="btn btn-wa sm:col-span-2">{f.submit}</button>
    </form>
  )
}
