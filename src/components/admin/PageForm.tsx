'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { slugify } from '@/lib/utils'

interface Page { id: string; title: string; slug: string; metaTitle?: string | null; metaDescription?: string | null; status: string }
const STATUSES = ['DRAFT', 'PUBLISHED', 'ARCHIVED']

export function PageForm({ page }: { page?: Page | null }) {
  const router = useRouter()
  const isEdit = !!page

  const [title, setTitle] = useState(page?.title || '')
  const [slug, setSlug] = useState(page?.slug || '')
  const [slugTouched, setSlugTouched] = useState(isEdit)
  const [metaTitle, setMetaTitle] = useState(page?.metaTitle || '')
  const [metaDescription, setMetaDescription] = useState(page?.metaDescription || '')
  const [status, setStatus] = useState(page?.status || 'DRAFT')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const updateTitle = (val: string) => { setTitle(val); if (!slugTouched) setSlug(slugify(val)) }

  const handleSave = useCallback(async () => {
    if (!title.trim() || !slug.trim()) { setError('Title and slug are required'); return }
    setError(''); setSaving(true)

    const body = { title: title.trim(), slug: slug.trim(), metaTitle: metaTitle || null, metaDescription: metaDescription || null, status }
    const url = isEdit ? `/api/admin-pages/${page.id}` : '/api/admin-pages'

    try {
      const res = await fetch(url, { method: isEdit ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Save failed'); return }
      router.push('/admin/pages')
      router.refresh()
    } catch { setError('Network error') } finally { setSaving(false) }
  }, [title, slug, metaTitle, metaDescription, status, isEdit, page, router])

  const inputCls = 'w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-brand-violet focus:outline-none'

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">{isEdit ? 'Edit Page' : 'New Page'}</h1>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => router.push('/admin/pages')} size="sm">Cancel</Button>
          <Button onClick={handleSave} loading={saving} size="sm">Save</Button>
        </div>
      </div>

      {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}

      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Title</label>
          <input type="text" value={title} onChange={e => updateTitle(e.target.value)} placeholder="Page title" className={inputCls} />
        </div>
        <div>
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Slug</label>
          <div className="flex items-center gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3">
            <span className="text-xs text-[var(--text-muted)]">/</span>
            <input type="text" value={slug} onChange={e => { setSlug(e.target.value); setSlugTouched(true) }} className="flex-1 bg-transparent text-sm text-[var(--text-primary)] focus:outline-none" />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)} className={inputCls}>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">SEO</h3>
          <input type="text" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} placeholder="Meta title" className={inputCls} />
          <textarea value={metaDescription} onChange={e => setMetaDescription(e.target.value)} rows={3} placeholder="Meta description" className={`${inputCls} resize-none`} />
        </div>
      </div>
    </div>
  )
}
