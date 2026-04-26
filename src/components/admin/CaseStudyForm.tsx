'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { slugify } from '@/lib/utils'

interface Metric { metricLabel: string; beforeValue: string; afterValue: string }
interface CaseStudy {
  id: string; title: string; slug: string; clientName: string; clientLogo?: string | null
  industry: string; challenge: string; strategy: string; results: string; thumbnail?: string | null
  status: string; metrics?: Metric[]
}

const STATUSES = ['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED']
const INDUSTRIES = ['E-Commerce', 'F&B', 'Fashion', 'Healthcare', 'Education', 'Finance', 'Property', 'Tech', 'Other']

export function CaseStudyForm({ caseStudy }: { caseStudy?: CaseStudy | null }) {
  const router = useRouter()
  const isEdit = !!caseStudy

  const [title, setTitle] = useState(caseStudy?.title || '')
  const [slug, setSlug] = useState(caseStudy?.slug || '')
  const [slugTouched, setSlugTouched] = useState(isEdit)
  const [clientName, setClientName] = useState(caseStudy?.clientName || '')
  const [clientLogo, setClientLogo] = useState(caseStudy?.clientLogo || '')
  const [industry, setIndustry] = useState(caseStudy?.industry || '')
  const [challenge, setChallenge] = useState(caseStudy?.challenge || '')
  const [strategy, setStrategy] = useState(caseStudy?.strategy || '')
  const [results, setResults] = useState(caseStudy?.results || '')
  const [thumbnail, setThumbnail] = useState(caseStudy?.thumbnail || '')
  const [status, setStatus] = useState(caseStudy?.status || 'DRAFT')
  const [metrics, setMetrics] = useState<Metric[]>(caseStudy?.metrics || [])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const updateSlug = (val: string) => { setTitle(val); if (!slugTouched) setSlug(slugify(val)) }
  const addMetric = () => setMetrics(m => [...m, { metricLabel: '', beforeValue: '', afterValue: '' }])
  const removeMetric = (i: number) => setMetrics(m => m.filter((_, idx) => idx !== i))
  const updateMetric = (i: number, field: keyof Metric, val: string) =>
    setMetrics(m => m.map((item, idx) => idx === i ? { ...item, [field]: val } : item))

  const handleSave = useCallback(async () => {
    if (!title.trim() || !slug.trim() || !clientName.trim()) { setError('Title, slug, and client name are required'); return }
    setError(''); setSaving(true)

    const body = { title: title.trim(), slug: slug.trim(), clientName: clientName.trim(), clientLogo: clientLogo || null, industry, challenge, strategy, results, thumbnail: thumbnail || null, status, metrics }
    const url = isEdit ? `/api/case-studies/${caseStudy.id}` : '/api/case-studies'

    try {
      const res = await fetch(url, { method: isEdit ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Save failed'); return }
      router.push('/admin/case-studies')
      router.refresh()
    } catch { setError('Network error') } finally { setSaving(false) }
  }, [title, slug, clientName, clientLogo, industry, challenge, strategy, results, thumbnail, status, metrics, isEdit, caseStudy, router])

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">{label}</label>
      {children}
    </div>
  )

  const inputCls = 'w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-brand-violet focus:outline-none'
  const textareaCls = `${inputCls} resize-none`

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">{isEdit ? 'Edit Case Study' : 'New Case Study'}</h1>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => router.push('/admin/case-studies')} size="sm">Cancel</Button>
          <Button onClick={handleSave} loading={saving} size="sm">{isEdit ? 'Update' : 'Create'}</Button>
        </div>
      </div>

      {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Title">
          <input type="text" value={title} onChange={e => updateSlug(e.target.value)} placeholder="Campaign title" className={inputCls} />
        </Field>
        <Field label="Slug">
          <input type="text" value={slug} onChange={e => { setSlug(e.target.value); setSlugTouched(true) }} className={inputCls} />
        </Field>
        <Field label="Client Name">
          <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Brand / company name" className={inputCls} />
        </Field>
        <Field label="Industry">
          <select value={industry} onChange={e => setIndustry(e.target.value)} className={inputCls}>
            <option value="">Select industry</option>
            {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </Field>
        <Field label="Status">
          <select value={status} onChange={e => setStatus(e.target.value)} className={inputCls}>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Client Logo URL">
          <input type="text" value={clientLogo} onChange={e => setClientLogo(e.target.value)} placeholder="/uploads/..." className={inputCls} />
        </Field>
        <Field label="Thumbnail URL">
          <input type="text" value={thumbnail} onChange={e => setThumbnail(e.target.value)} placeholder="/uploads/..." className={inputCls} />
        </Field>
      </div>

      <Field label="Challenge">
        <textarea value={challenge} onChange={e => setChallenge(e.target.value)} rows={4} placeholder="What problem did the client face?" className={textareaCls} />
      </Field>
      <Field label="Strategy">
        <textarea value={strategy} onChange={e => setStrategy(e.target.value)} rows={4} placeholder="What did we do?" className={textareaCls} />
      </Field>
      <Field label="Results">
        <textarea value={results} onChange={e => setResults(e.target.value)} rows={4} placeholder="What were the outcomes?" className={textareaCls} />
      </Field>

      {/* Metrics */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Metrics</label>
          <Button variant="ghost" size="sm" onClick={addMetric}>+ Add Metric</Button>
        </div>
        <div className="space-y-3">
          {metrics.map((m, i) => (
            <div key={i} className="grid grid-cols-3 gap-3 relative">
              <input type="text" value={m.metricLabel} onChange={e => updateMetric(i, 'metricLabel', e.target.value)} placeholder="Metric (e.g. ROAS)" className={inputCls} />
              <input type="text" value={m.beforeValue} onChange={e => updateMetric(i, 'beforeValue', e.target.value)} placeholder="Before" className={inputCls} />
              <div className="flex gap-2">
                <input type="text" value={m.afterValue} onChange={e => updateMetric(i, 'afterValue', e.target.value)} placeholder="After" className={`${inputCls} flex-1`} />
                <button onClick={() => removeMetric(i)} className="text-[var(--text-muted)] hover:text-red-400 transition-colors text-sm px-2">✕</button>
              </div>
            </div>
          ))}
          {metrics.length === 0 && <p className="text-sm text-[var(--text-muted)]">No metrics yet. Add key before/after results.</p>}
        </div>
      </div>
    </div>
  )
}
