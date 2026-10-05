'use client'
import { Suspense, useState, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckboxGroup, Honeypot, Input, Select, Textarea } from '@/components/ds/Field'
import { Icon } from '@/components/ds/Icon'

type Opt = { value: string; label: string }
type Props = {
  t: Record<string, string>; services: Opt[]; legacy: Record<string, string>
  budget: Opt[]; timeline: Opt[]; waHref: string
}

/**
 * Contact form island (BUILD §3.9). Same /api/contact contract as before ({ name, email, phone, company,
 * services, budgetRange, timeline, message, source: 'contact_form' }) + the `website` honeypot; services are
 * registry keys, '360' first. ?layanan= (and the legacy ?service= CMS slug) are read here, inside <Suspense>,
 * so the page stays static: the fallback is the same form without preselection.
 */
export function ContactForm(props: Props) {
  return (
    <Suspense fallback={<Form {...props} pre={[]} />}>
      <WithParams {...props} />
    </Suspense>
  )
}

function WithParams(props: Props) {
  const sp = useSearchParams()
  const known = new Set(props.services.map((s) => s.value))
  const pre = [
    ...sp.getAll('layanan').flatMap((v) => v.split(',')),
    ...sp.getAll('service').map((v) => props.legacy[v] ?? v),
  ].filter((v) => known.has(v))
  return <Form {...props} pre={pre} />
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Form({ t, services, budget, timeline, waHref, pre }: Props & { pre: string[] }) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'fail' | 'busy'>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const v = (k: string) => String(fd.get(k) ?? '').trim()
    const data = {
      name: v('name'), phone: v('phone'), email: v('email'), message: v('message'),
      company: v('company') || undefined, budgetRange: v('budgetRange') || undefined, timeline: v('timeline') || undefined,
      services: fd.getAll('services').map(String), website: v('website'), source: 'contact_form',
    }
    const err: Record<string, string> = {}
    if (data.name.length < 2) err.name = t.eName
    if (data.phone.replace(/\D/g, '').length < 8) err.phone = t.ePhone
    if (!EMAIL.test(data.email)) err.email = t.eEmail
    if (data.message.length < 10) err.message = t.eMessage
    setErrors(err)
    const first = Object.keys(err)[0]
    if (first) return form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
    setState('sending')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (res.status === 429) return setState('busy')
      if (!res.ok) return setState('fail')
      const w = window as unknown as { dataLayer?: object[] }
      ;(w.dataLayer ??= []).push({ event: 'lead_submit', source: 'contact_form', services: data.services })
      setState('ok')
    } catch {
      setState('fail')
    }
  }

  if (state === 'ok')
    return (
      <div role="status" className="grid gap-4">
        <p className="t-h3">{t.okH}</p>
        <p className="t-body">{t.okP}</p>
        <p>
          <a className="btn btn-wa" href={waHref} target="_blank" rel="noopener" data-cta="whatsapp" data-placement="channel"
            data-service="none" data-cursor="Chat WhatsApp" data-cursor-tone="wa">
            <Icon name="whatsapp" size={18} />{t.okWa}
          </a>
        </p>
      </div>
    )

  return (
    <form method="post" noValidate onSubmit={onSubmit} className="relative grid gap-6" aria-busy={state === 'sending'}>
      <div className="grid items-start gap-6 sm:grid-cols-2">
        <Input label={`${t.name} *`} name="name" autoComplete="name" required error={errors.name} />
        <Input label={`${t.phone} *`} name="phone" type="tel" inputMode="tel" autoComplete="tel" required hint={t.phoneHint} error={errors.phone} />
      </div>
      <Input label={`${t.email} *`} name="email" type="email" autoComplete="email" required error={errors.email} />
      <div className="sm:[&_fieldset]:grid-cols-2 sm:[&_fieldset]:gap-x-6">
        <CheckboxGroup legend={t.services} name="services" options={services} checked={pre} />
      </div>
      <Textarea label={`${t.message} *`} name="message" required placeholder={t.messagePh} error={errors.message} />
      <details className="border-y border-hair">
        <summary className="flex min-h-tap cursor-pointer list-none items-center justify-between font-650 [&::-webkit-details-marker]:hidden">{t.more}<Icon name="plus" size={18} /></summary>
        <div className="grid items-start gap-6 pb-6 pt-2 sm:grid-cols-3">
          <Input label={t.company} name="company" autoComplete="organization" />
          <Select label={t.budget} name="budgetRange" options={[{ value: '', label: t.choose }, ...budget]} defaultValue="" />
          <Select label={t.timeline} name="timeline" options={[{ value: '', label: t.choose }, ...timeline]} defaultValue="" />
        </div>
      </details>
      <Honeypot />
      {state === 'fail' || state === 'busy' ? (
        <p role="alert" className="t-small flex items-center gap-2 text-error"><Icon name="alert" size={16} />{state === 'busy' ? t.tooMany : t.fail}</p>
      ) : null}
      <p>
        <button type="submit" className="btn btn-ink btn-lg" disabled={state === 'sending'} data-cta="form" data-placement="channel" data-service={pre[0] ?? 'none'}>
          {state === 'sending' ? t.sending : t.submit}
          <Icon name="arrow-right" size={18} />
        </button>
      </p>
      <noscript><p className="t-small text-ink-2">{t.noscript}</p></noscript>
    </form>
  )
}
