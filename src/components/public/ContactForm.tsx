'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
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
      <div className="rounded-2xl border border-brand-violet/20 bg-brand-violet/5 p-10 text-center">
        <div className="h-16 w-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6">
          <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Thank you!</h2>
        <p className="text-[var(--text-secondary)] mb-8">We'll get back to you within 24 hours. Or chat with us directly on WhatsApp.</p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold text-sm hover:bg-emerald-400 transition-all">
          Chat on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${s < step ? 'gradient-bg text-white' : s === step ? 'border-2 border-brand-violet text-brand-violet' : 'border border-[var(--border-default)] text-[var(--text-muted)]'}`}>
              {s < step ? '✓' : s}
            </div>
            {s < 4 && <div className={`flex-1 h-0.5 ${s < step ? 'gradient-bg' : 'bg-[var(--border-default)]'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Tell us about you</h2>
          <Input label="Full Name *" id="name" placeholder="John Doe" error={errors.name?.message} {...register('name')} />
          <Input label="Email *" id="email" type="email" placeholder="john@company.com" error={errors.email?.message} {...register('email')} />
          <Input label="Company Name" id="company" placeholder="Your Company" {...register('company')} />
          <Input label="Phone Number (optional)" id="phone" type="tel" placeholder="+62 812 3456 7890" {...register('phone')} />
        </div>
      )}

      {/* Step 2: Services */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Services you're interested in</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {displayServices.map((svc) => (
              <button
                key={svc.slug}
                type="button"
                onClick={() => toggleService(svc.slug)}
                className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${selectedServices.includes(svc.slug) ? 'border-brand-violet bg-brand-violet/10 text-brand-violet' : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:border-brand-violet/40'}`}
              >
                {selectedServices.includes(svc.slug) && '✓ '}{svc.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Budget & Timeline */}
      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Budget & Timeline</h2>
          <div>
            <label className="text-sm font-medium text-[var(--text-secondary)] mb-2 block">Monthly Budget</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {BUDGET_OPTIONS.map((opt) => (
                <label key={opt.value} className="cursor-pointer">
                  <input type="radio" value={opt.value} className="sr-only" {...register('budgetRange')} />
                  <div className="p-3 rounded-xl border border-[var(--border-default)] text-sm text-center hover:border-brand-violet/40 transition-all has-[:checked]:border-brand-violet has-[:checked]:bg-brand-violet/10 has-[:checked]:text-brand-violet">
                    {opt.label}
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-[var(--text-secondary)] mb-2 block">When do you want to start?</label>
            <div className="grid grid-cols-2 gap-2">
              {TIMELINE_OPTIONS.map((opt) => (
                <label key={opt.value} className="cursor-pointer">
                  <input type="radio" value={opt.value} className="sr-only" {...register('timeline')} />
                  <div className="p-3 rounded-xl border border-[var(--border-default)] text-sm text-center hover:border-brand-violet/40 transition-all has-[:checked]:border-brand-violet has-[:checked]:bg-brand-violet/10 has-[:checked]:text-brand-violet">
                    {opt.label}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Message */}
      {step === 4 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Tell us more</h2>
          <Textarea
            label="Message *"
            id="message"
            placeholder="Tell us about your business, the challenges you're facing, and what you'd like to achieve..."
            rows={6}
            error={errors.message?.message}
            {...register('message')}
          />
          <div className="text-center">
            <p className="text-sm text-[var(--text-muted)] mb-4">or</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
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
          <Button type="button" variant="ghost" onClick={() => setStep((s) => s - 1)}>
            ← Back
          </Button>
        )}
        {step < 4 ? (
          <Button type="button" onClick={nextStep} fullWidth={step === 1}>
            Next →
          </Button>
        ) : (
          <Button type="submit" loading={loading} fullWidth>
            Send Message
          </Button>
        )}
      </div>
    </form>
  )
}
