'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { WHATSAPP_URL } from '@/lib/constants'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  services: z.array(z.string()).optional(),
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

interface ContactFormProps {
  services: { id: string; name: string; slug: string }[]
}

const BUDGET_OPTIONS = [
  { value: '<5M', label: '< IDR 5M' },
  { value: '5-10M', label: 'IDR 5 - 10M' },
  { value: '10-20M', label: 'IDR 10 - 20M' },
  { value: '20-50M', label: 'IDR 20 - 50M' },
  { value: '50M+', label: '> IDR 50M' },
]

const TIMELINE_OPTIONS = [
  { value: 'ASAP', label: 'As soon as possible' },
  { value: '1month', label: 'Within 1 month' },
  { value: '2-3months', label: '2 - 3 months' },
  { value: '3+months', label: '3+ months' },
]

const FALLBACK_SERVICES = [
  { id: '1', name: 'SEO & Content Marketing', slug: 'seo-content-marketing' },
  { id: '2', name: 'Social Media Management', slug: 'social-media-management' },
  { id: '3', name: 'Paid Advertising', slug: 'paid-advertising' },
  { id: '4', name: 'Creative Services', slug: 'creative-services' },
  { id: '5', name: 'Website & Landing Page', slug: 'website-landing-page' },
]

const NEXT_STEPS = [
  'We review your brief within 24 hours',
  'Schedule a free 30-minute discovery call',
  'We prepare a custom proposal',
]

const inputCls =
  'w-full rounded-xl border border-[var(--border-default)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus:outline-none focus:border-brand-crimson focus:ring-2 focus:ring-brand-crimson/20'
const inputErrCls = ' border-red-500 focus:border-red-500 focus:ring-red-500/20'
const labelCls = 'text-sm font-medium text-[var(--text-primary)] mb-1.5 block'
const pillCls = (selected: boolean) =>
  `px-4 py-2.5 rounded-full border text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson focus-visible:ring-offset-2 ${
    selected
      ? 'border-brand-crimson bg-brand-crimson/10 text-brand-crimson'
      : 'border-[var(--border-default)] bg-white text-[var(--text-secondary)] hover:border-brand-crimson/40 hover:text-[var(--text-primary)]'
  }`

export function ContactForm({ services }: ContactFormProps) {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const displayServices = services.length > 0 ? services : FALLBACK_SERVICES

  const { register, handleSubmit, setValue, formState: { errors }, trigger } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { services: [] },
  })

  const nextStep = async () => {
    const fieldsToValidate: (keyof FormData)[] = step === 1 ? ['name', 'email'] : step === 2 ? [] : step === 3 ? [] : ['message']
    const valid = await trigger(fieldsToValidate)
    if (valid) setStep((s) => s + 1)
  }

  const toggleService = (slug: string) => {
    const next = selectedServices.includes(slug)
      ? selectedServices.filter((s) => s !== slug)
      : [...selectedServices, slug]
    setSelectedServices(next)
    setValue('services', next)
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'contact_form' }),
      })
      setSubmitted(true)
    } catch {}
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-[var(--border-default)] bg-white shadow-card p-8 sm:p-10 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="h-16 w-16 rounded-full gradient-bg shadow-cta flex items-center justify-center mx-auto mb-6"
        >
          <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.25, duration: 0.45, ease: 'easeOut' }}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
        <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[var(--text-primary)] mb-2">Thank you!</h2>
        <p className="text-[var(--text-secondary)] mb-8">We&apos;ll get back to you within 24 hours. Or chat with us directly on WhatsApp.</p>

        <div className="rounded-2xl bg-brand-peach p-5 sm:p-6 text-left mb-8">
          <h3 className="font-display font-bold text-[var(--text-primary)] mb-4">What happens next</h3>
          <ol className="space-y-3">
            {NEXT_STEPS.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                <span className="h-6 w-6 rounded-full gradient-bg text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:brightness-105 hover:scale-[1.02] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
        >
          Chat on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-[var(--border-default)] bg-white shadow-card p-6 sm:p-8 space-y-6"
    >
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8" aria-label={`Step ${step} of 4`}>
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                s < step
                  ? 'gradient-bg text-white'
                  : s === step
                    ? 'border-2 border-brand-crimson text-brand-crimson'
                    : 'border border-[var(--border-default)] text-[var(--text-muted)]'
              }`}
            >
              {s < step ? '✓' : s}
            </div>
            {s < 4 && <div className={`flex-1 h-0.5 rounded-full ${s < step ? 'gradient-bg' : 'bg-[var(--border-default)]'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-[var(--text-primary)]">Tell us about you</h2>
          <div>
            <label htmlFor="name" className={labelCls}>Full Name *</label>
            <input id="name" placeholder="John Doe" className={inputCls + (errors.name ? inputErrCls : '')} {...register('name')} />
            {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className={labelCls}>Email *</label>
            <input id="email" type="email" placeholder="john@company.com" className={inputCls + (errors.email ? inputErrCls : '')} {...register('email')} />
            {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="company" className={labelCls}>Company Name</label>
            <input id="company" placeholder="Your Company" className={inputCls} {...register('company')} />
          </div>
          <div>
            <label htmlFor="phone" className={labelCls}>Phone Number (optional)</label>
            <input id="phone" type="tel" placeholder="+62 812 3456 7890" className={inputCls} {...register('phone')} />
          </div>
        </div>
      )}

      {/* Step 2: Services */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-[var(--text-primary)]">Services you&apos;re interested in</h2>
          <div className="flex flex-wrap gap-2.5">
            {displayServices.map((svc) => {
              const selected = selectedServices.includes(svc.slug)
              return (
                <button
                  key={svc.slug}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleService(svc.slug)}
                  className={pillCls(selected)}
                >
                  {selected && '✓ '}{svc.name}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Step 3: Budget & Timeline */}
      {step === 3 && (
        <div className="space-y-6">
          <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-[var(--text-primary)]">Budget & Timeline</h2>
          <fieldset>
            <legend className={labelCls}>Monthly Budget</legend>
            <div className="flex flex-wrap gap-2.5">
              {BUDGET_OPTIONS.map((opt) => (
                <label key={opt.value} className="cursor-pointer">
                  <input type="radio" value={opt.value} className="peer sr-only" {...register('budgetRange')} />
                  <div className="px-4 py-2.5 rounded-full border border-[var(--border-default)] bg-white text-sm text-[var(--text-secondary)] transition-all hover:border-brand-crimson/40 peer-checked:border-brand-crimson peer-checked:bg-brand-crimson/10 peer-checked:text-brand-crimson peer-checked:font-medium peer-focus-visible:ring-2 peer-focus-visible:ring-brand-crimson peer-focus-visible:ring-offset-2">
                    {opt.label}
                  </div>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className={labelCls}>When do you want to start?</legend>
            <div className="flex flex-wrap gap-2.5">
              {TIMELINE_OPTIONS.map((opt) => (
                <label key={opt.value} className="cursor-pointer">
                  <input type="radio" value={opt.value} className="peer sr-only" {...register('timeline')} />
                  <div className="px-4 py-2.5 rounded-full border border-[var(--border-default)] bg-white text-sm text-[var(--text-secondary)] transition-all hover:border-brand-crimson/40 peer-checked:border-brand-crimson peer-checked:bg-brand-crimson/10 peer-checked:text-brand-crimson peer-checked:font-medium peer-focus-visible:ring-2 peer-focus-visible:ring-brand-crimson peer-focus-visible:ring-offset-2">
                    {opt.label}
                  </div>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      )}

      {/* Step 4: Message */}
      {step === 4 && (
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-[var(--text-primary)]">Tell us more</h2>
          <div>
            <label htmlFor="message" className={labelCls}>Message *</label>
            <textarea
              id="message"
              rows={6}
              placeholder="Tell us about your business, the challenges you're facing, and what you'd like to achieve..."
              className={inputCls + ' resize-y min-h-[100px]' + (errors.message ? inputErrCls : '')}
              {...register('message')}
            />
            {errors.message && <p className="text-xs text-red-500 mt-1.5">{errors.message.message}</p>}
          </div>
          <div className="text-center">
            <p className="text-sm text-[var(--text-muted)] mb-4">or</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors">
              <svg className="h-4 w-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat directly on WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        {step > 1 && (
          <Button type="button" variant="ghost" onClick={() => setStep((s) => s - 1)} className="group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            Back
          </Button>
        )}
        {step < 4 ? (
          <Button type="button" onClick={nextStep} fullWidth={step === 1} className="group">
            Next
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Button>
        ) : (
          <Button type="submit" loading={loading} fullWidth className="group">
            Send Message
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Button>
        )}
      </div>
      {step === 4 && (
        <p className="text-center text-xs text-[var(--text-muted)] !mt-3">No lock-in contracts · Transparent GA4 reporting</p>
      )}
    </form>
  )
}
