'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { slugify } from '@/lib/utils'
import { BlockEditor, BLOCK_LABELS, BLOCK_DEFAULTS } from './case-study-blocks/BlockEditors'
import { ImageUploader } from './ImageUploader'
import type { BlockType } from '@/types/case-study'

interface BlockItem {
  id: string
  blockType: BlockType
  sortOrder: number
  isVisible: boolean
  data: Record<string, unknown>
}

interface CaseStudyEditorProps {
  caseStudy?: {
    id: string
    title: string
    titleId?: string | null
    titleEn?: string | null
    subtitleId?: string | null
    subtitleEn?: string | null
    summaryId?: string | null
    summaryEn?: string | null
    slug: string
    slugEn?: string | null
    clientName: string
    clientLogo?: string | null
    clientWebsite?: string | null
    industry: string
    industryId?: string | null
    durationLabel?: string | null
    featuredImage?: string | null
    thumbnail?: string | null
    seoTitleId?: string | null
    seoTitleEn?: string | null
    seoDescId?: string | null
    seoDescEn?: string | null
    ogImage?: string | null
    featured?: boolean
    serviceId?: string | null
    status: string
    metrics?: Array<{ metricLabel: string; beforeValue: string; afterValue: string }>
    blocks?: BlockItem[]
  } | null
}

const STATUSES = ['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED']
const INDUSTRIES = ['E-Commerce', 'F&B', 'Fashion', 'Healthcare', 'Education', 'Finance', 'Property', 'Tech', 'FMCG', 'Other']
const ALL_BLOCK_TYPES: BlockType[] = [
  'HERO', 'OVERVIEW', 'CLIENT_SNAPSHOT', 'NARRATIVE', 'METRIC_GRID',
  'TIMELINE', 'CHART', 'BEFORE_AFTER', 'GALLERY', 'VIDEO',
  'QUOTE', 'SERVICES_USED', 'RELATED_CASES', 'CTA', 'LEAD_FORM', 'FAQ', 'RICH_TEXT',
]

let blockIdCounter = 1000

export function CaseStudyEditor({ caseStudy }: CaseStudyEditorProps) {
  const router = useRouter()
  const isEdit = !!caseStudy

  // Language tab
  const [activeLang, setActiveLang] = useState<'id' | 'en'>('id')

  // Top-level fields
  const [titleId, setTitleId] = useState(caseStudy?.titleId || caseStudy?.title || '')
  const [titleEn, setTitleEn] = useState(caseStudy?.titleEn || '')
  const [subtitleId, setSubtitleId] = useState(caseStudy?.subtitleId || '')
  const [subtitleEn, setSubtitleEn] = useState(caseStudy?.subtitleEn || '')
  const [summaryId, setSummaryId] = useState(caseStudy?.summaryId || '')
  const [summaryEn, setSummaryEn] = useState(caseStudy?.summaryEn || '')
  const [slug, setSlug] = useState(caseStudy?.slug || '')
  const [slugTouched, setSlugTouched] = useState(isEdit)
  const [slugEn, setSlugEn] = useState(caseStudy?.slugEn || '')
  const [slugEnTouched, setSlugEnTouched] = useState(isEdit)
  const [clientName, setClientName] = useState(caseStudy?.clientName || '')
  const [clientLogo, setClientLogo] = useState(caseStudy?.clientLogo || '')
  const [clientWebsite, setClientWebsite] = useState(caseStudy?.clientWebsite || '')
  const [industry, setIndustry] = useState(caseStudy?.industry || '')
  const [durationLabel, setDurationLabel] = useState(caseStudy?.durationLabel || '')
  const [featuredImage, setFeaturedImage] = useState(caseStudy?.featuredImage || caseStudy?.thumbnail || '')
  const [seoTitleId, setSeoTitleId] = useState(caseStudy?.seoTitleId || '')
  const [seoTitleEn, setSeoTitleEn] = useState(caseStudy?.seoTitleEn || '')
  const [seoDescId, setSeoDescId] = useState(caseStudy?.seoDescId || '')
  const [seoDescEn, setSeoDescEn] = useState(caseStudy?.seoDescEn || '')
  const [ogImage, setOgImage] = useState(caseStudy?.ogImage || '')
  const [featured, setFeatured] = useState(caseStudy?.featured ?? false)
  const [status, setStatus] = useState(caseStudy?.status || 'DRAFT')
  const [metrics, setMetrics] = useState(caseStudy?.metrics || [])

  // Blocks
  const [blocks, setBlocks] = useState<BlockItem[]>(
    caseStudy?.blocks?.map(b => ({ ...b, data: b.data as Record<string, unknown> })) || []
  )
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null)
  const [showBlockPicker, setShowBlockPicker] = useState(false)
  const [activePanel, setActivePanel] = useState<'content' | 'seo' | 'settings'>('content')

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleTitleId = (v: string) => {
    setTitleId(v)
    if (!slugTouched) setSlug(slugify(v))
  }
  const handleTitleEn = (v: string) => {
    setTitleEn(v)
    if (!slugEnTouched) setSlugEn(slugify(v))
  }

  const addBlock = (type: BlockType) => {
    const newBlock: BlockItem = {
      id: `new_${blockIdCounter++}`,
      blockType: type,
      sortOrder: blocks.length,
      isVisible: true,
      data: { ...BLOCK_DEFAULTS[type] } as Record<string, unknown>,
    }
    setBlocks(b => [...b, newBlock])
    setExpandedBlock(newBlock.id)
    setShowBlockPicker(false)
  }

  const removeBlock = (id: string) => setBlocks(b => b.filter(bl => bl.id !== id))
  const moveBlock = (id: string, dir: 'up' | 'down') => {
    setBlocks(b => {
      const idx = b.findIndex(bl => bl.id === id)
      if ((dir === 'up' && idx === 0) || (dir === 'down' && idx === b.length - 1)) return b
      const next = [...b]
      const swap = dir === 'up' ? idx - 1 : idx + 1
      ;[next[idx], next[swap]] = [next[swap], next[idx]]
      return next.map((bl, i) => ({ ...bl, sortOrder: i }))
    })
  }
  const updateBlockData = (id: string, data: Record<string, unknown>) =>
    setBlocks(b => b.map(bl => bl.id === id ? { ...bl, data } : bl))
  const toggleBlockVisibility = (id: string) =>
    setBlocks(b => b.map(bl => bl.id === id ? { ...bl, isVisible: !bl.isVisible } : bl))

  const handleSave = useCallback(async () => {
    if (!titleId.trim() || !slug.trim() || !clientName.trim()) {
      setError('Title (ID), slug, and client name are required')
      return
    }
    setError('')
    setSaving(true)

    const body = {
      title: titleId.trim(),
      titleId: titleId.trim(),
      titleEn: titleEn.trim() || null,
      subtitleId: subtitleId.trim() || null,
      subtitleEn: subtitleEn.trim() || null,
      summaryId: summaryId.trim() || null,
      summaryEn: summaryEn.trim() || null,
      slug: slug.trim(),
      slugEn: slugEn.trim() || null,
      clientName: clientName.trim(),
      clientLogo: clientLogo.trim() || null,
      clientWebsite: clientWebsite.trim() || null,
      industry: industry.trim(),
      durationLabel: durationLabel.trim() || null,
      featuredImage: featuredImage.trim() || null,
      thumbnail: featuredImage.trim() || null,
      seoTitleId: seoTitleId.trim() || null,
      seoTitleEn: seoTitleEn.trim() || null,
      seoDescId: seoDescId.trim() || null,
      seoDescEn: seoDescEn.trim() || null,
      ogImage: ogImage.trim() || null,
      featured,
      status,
      metrics,
      blocks: blocks.map((b, i) => ({ blockType: b.blockType, data: b.data, sortOrder: i, isVisible: b.isVisible })),
    }

    const url = isEdit ? `/api/case-studies/${caseStudy.id}` : '/api/case-studies'
    try {
      const res = await fetch(url, { method: isEdit ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Save failed'); return }
      router.push('/admin/case-studies')
      router.refresh()
    } catch { setError('Network error') } finally { setSaving(false) }
  }, [titleId, titleEn, subtitleId, subtitleEn, summaryId, summaryEn, slug, slugEn, clientName, clientLogo, clientWebsite, industry, durationLabel, featuredImage, seoTitleId, seoTitleEn, seoDescId, seoDescEn, ogImage, featured, status, metrics, blocks, isEdit, caseStudy, router])

  const inputCls = 'w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-brand-violet focus:outline-none'
  const textareaCls = `${inputCls} resize-none`

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">{isEdit ? 'Edit Case Study' : 'New Case Study'}</h1>
        <div className="flex gap-2 items-center">
          <select value={status} onChange={e => setStatus(e.target.value)} className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-brand-violet focus:outline-none">
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <Button variant="ghost" onClick={() => router.push('/admin/case-studies')} size="sm">Cancel</Button>
          <Button onClick={handleSave} loading={saving} size="sm">{isEdit ? 'Update' : 'Create'}</Button>
        </div>
      </div>

      {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}

      {/* Language Tabs */}
      <div className="flex gap-1 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-1 w-fit">
        {(['id', 'en'] as const).map(l => (
          <button key={l} onClick={() => setActiveLang(l)} className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${activeLang === l ? 'bg-brand-violet text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>
            {l === 'id' ? '🇮🇩 Bahasa Indonesia' : '🇬🇧 English'}
          </button>
        ))}
      </div>

      {/* Panel Tabs */}
      <div className="flex gap-4 border-b border-[var(--border-default)]">
        {(['content', 'seo', 'settings'] as const).map(p => (
          <button key={p} onClick={() => setActivePanel(p)} className={`pb-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${activePanel === p ? 'border-brand-violet text-brand-violet' : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>
            {p}
          </button>
        ))}
      </div>

      {/* Content Panel */}
      {activePanel === 'content' && (
        <div className="space-y-6">
          {/* Core fields */}
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 space-y-4">
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">Case Study Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeLang === 'id' ? (
                <>
                  <div>
                    <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Title (ID) *</label>
                    <input value={titleId} onChange={e => handleTitleId(e.target.value)} placeholder="Cara BrandX tumbuh 948% dalam 9 bulan" className={inputCls} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Slug (ID) *</label>
                    <input value={slug} onChange={e => { setSlug(e.target.value); setSlugTouched(true) }} className={inputCls} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Subtitle (ID)</label>
                    <input value={subtitleId} onChange={e => setSubtitleId(e.target.value)} className={inputCls} />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Title (EN)</label>
                    <input value={titleEn} onChange={e => handleTitleEn(e.target.value)} placeholder="How BrandX grew 948% in 9 months" className={inputCls} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Slug (EN)</label>
                    <input value={slugEn} onChange={e => { setSlugEn(e.target.value); setSlugEnTouched(true) }} className={inputCls} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Subtitle (EN)</label>
                    <input value={subtitleEn} onChange={e => setSubtitleEn(e.target.value)} className={inputCls} />
                  </div>
                </>
              )}
              <div>
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Client Name *</label>
                <input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="DepositoBPR" className={inputCls} />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Industry</label>
                <select value={industry} onChange={e => setIndustry(e.target.value)} className={inputCls}>
                  <option value="">Select industry</option>
                  {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Duration Label</label>
                <input value={durationLabel} onChange={e => setDurationLabel(e.target.value)} placeholder="9 months" className={inputCls} />
              </div>
              <div>
                <ImageUploader
                  label="Client Logo"
                  value={clientLogo}
                  onChange={setClientLogo}
                  folder="case-studies"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Client Website</label>
                <input value={clientWebsite} onChange={e => setClientWebsite(e.target.value)} placeholder="https://..." className={inputCls} />
              </div>
              <div>
                <ImageUploader
                  label="Featured Image (Hero)"
                  value={featuredImage}
                  onChange={setFeaturedImage}
                  folder="case-studies"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">
                Summary ({activeLang.toUpperCase()})
              </label>
              <textarea
                value={activeLang === 'id' ? summaryId : summaryEn}
                onChange={e => activeLang === 'id' ? setSummaryId(e.target.value) : setSummaryEn(e.target.value)}
                rows={3}
                placeholder="Brief summary of the case study…"
                className={textareaCls}
              />
            </div>
          </div>

          {/* Key Metrics (legacy, still useful for homepage teaser) */}
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">Key Metrics (Summary Cards)</h2>
              <Button variant="ghost" size="sm" onClick={() => setMetrics(m => [...m, { metricLabel: '', beforeValue: '', afterValue: '' }])}>+ Add</Button>
            </div>
            <div className="space-y-3">
              {metrics.map((m, i) => (
                <div key={i} className="grid grid-cols-3 gap-3">
                  <input value={m.metricLabel} onChange={e => setMetrics(ms => ms.map((x, xi) => xi === i ? { ...x, metricLabel: e.target.value } : x))} placeholder="Metric (e.g. Traffic)" className={inputCls} />
                  <input value={m.beforeValue} onChange={e => setMetrics(ms => ms.map((x, xi) => xi === i ? { ...x, beforeValue: e.target.value } : x))} placeholder="Before" className={inputCls} />
                  <div className="flex gap-2">
                    <input value={m.afterValue} onChange={e => setMetrics(ms => ms.map((x, xi) => xi === i ? { ...x, afterValue: e.target.value } : x))} placeholder="After" className={`${inputCls} flex-1`} />
                    <button onClick={() => setMetrics(ms => ms.filter((_, xi) => xi !== i))} className="text-[var(--text-muted)] hover:text-red-400 px-2">✕</button>
                  </div>
                </div>
              ))}
              {metrics.length === 0 && <p className="text-sm text-[var(--text-muted)]">No metrics yet.</p>}
            </div>
          </div>

          {/* Blocks */}
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">Content Blocks ({blocks.length})</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowBlockPicker(!showBlockPicker)}>+ Add Block</Button>
            </div>

            {/* Block picker */}
            {showBlockPicker && (
              <div className="mb-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] p-3">
                <p className="text-xs text-[var(--text-muted)] mb-2 font-medium uppercase tracking-wider">Choose block type</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {ALL_BLOCK_TYPES.map(type => (
                    <button key={type} onClick={() => addBlock(type)} className="text-left px-3 py-2 rounded-lg text-xs text-[var(--text-primary)] hover:bg-brand-violet/10 hover:text-brand-violet transition-colors border border-transparent hover:border-brand-violet/20">
                      {BLOCK_LABELS[type]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Block list */}
            <div className="space-y-2">
              {blocks.map((block, idx) => (
                <div key={block.id} className={`rounded-xl border ${block.isVisible ? 'border-[var(--border-default)]' : 'border-dashed border-[var(--border-default)] opacity-60'} bg-[var(--bg-primary)] overflow-hidden`}>
                  {/* Block header */}
                  <div className="flex items-center gap-2 px-4 py-3">
                    <span className="text-xs font-mono text-[var(--text-muted)] w-5">{idx + 1}</span>
                    <button onClick={() => setExpandedBlock(expandedBlock === block.id ? null : block.id)} className="flex-1 text-left">
                      <span className="text-sm font-medium text-[var(--text-primary)]">{BLOCK_LABELS[block.blockType]}</span>
                    </button>
                    <div className="flex gap-1 items-center">
                      <button onClick={() => moveBlock(block.id, 'up')} disabled={idx === 0} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30 text-xs">↑</button>
                      <button onClick={() => moveBlock(block.id, 'down')} disabled={idx === blocks.length - 1} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30 text-xs">↓</button>
                      <button onClick={() => toggleBlockVisibility(block.id)} className={`p-1 text-xs ${block.isVisible ? 'text-brand-violet' : 'text-[var(--text-muted)]'}`} title={block.isVisible ? 'Hide' : 'Show'}>
                        {block.isVisible ? '👁' : '🙈'}
                      </button>
                      <button onClick={() => removeBlock(block.id)} className="p-1 text-[var(--text-muted)] hover:text-red-400 text-xs">✕</button>
                    </div>
                  </div>

                  {/* Block editor (expanded) */}
                  {expandedBlock === block.id && (
                    <div className="px-4 pb-4 border-t border-[var(--border-default)] pt-3">
                      <BlockEditor
                        blockType={block.blockType}
                        data={block.data}
                        lang={activeLang}
                        onChange={data => updateBlockData(block.id, data)}
                      />
                    </div>
                  )}
                </div>
              ))}
              {blocks.length === 0 && (
                <div className="text-center py-8 text-[var(--text-muted)] text-sm">
                  No blocks yet. Add your first content block above.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SEO Panel */}
      {activePanel === 'seo' && (
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 space-y-4">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">SEO Settings</h2>
          <div className="flex gap-1 rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] p-1 w-fit mb-2">
            {(['id', 'en'] as const).map(l => (
              <button key={l} onClick={() => setActiveLang(l)} className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeLang === l ? 'bg-brand-violet text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          {activeLang === 'id' ? (
            <>
              <div>
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Meta Title (ID)</label>
                <input value={seoTitleId} onChange={e => setSeoTitleId(e.target.value)} className={inputCls} />
                <span className="text-xs text-[var(--text-muted)] mt-1 block">{seoTitleId.length} / 60 chars</span>
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Meta Description (ID)</label>
                <textarea value={seoDescId} onChange={e => setSeoDescId(e.target.value)} rows={3} className={textareaCls} />
                <span className="text-xs text-[var(--text-muted)] mt-1 block">{seoDescId.length} / 155 chars</span>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Meta Title (EN)</label>
                <input value={seoTitleEn} onChange={e => setSeoTitleEn(e.target.value)} className={inputCls} />
                <span className="text-xs text-[var(--text-muted)] mt-1 block">{seoTitleEn.length} / 60 chars</span>
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">Meta Description (EN)</label>
                <textarea value={seoDescEn} onChange={e => setSeoDescEn(e.target.value)} rows={3} className={textareaCls} />
                <span className="text-xs text-[var(--text-muted)] mt-1 block">{seoDescEn.length} / 155 chars</span>
              </div>
            </>
          )}
          <div>
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">OG Image URL</label>
            <input value={ogImage} onChange={e => setOgImage(e.target.value)} className={inputCls} />
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {activePanel === 'settings' && (
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 space-y-4">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">Settings</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} className="rounded border-[var(--border-default)] text-brand-violet focus:ring-brand-violet" />
            <span className="text-sm text-[var(--text-primary)]">Featured case study (shown prominently on homepage)</span>
          </label>
          {isEdit && (
            <div className="text-sm text-[var(--text-muted)]">
              <p>Preview (ID): <a href={`/portfolio/${caseStudy?.slug}`} target="_blank" rel="noopener noreferrer" className="text-brand-violet hover:underline">/portfolio/{caseStudy?.slug}</a></p>
              {caseStudy?.slugEn && <p>Preview (EN): <a href={`/en/portfolio/${caseStudy.slugEn}`} target="_blank" rel="noopener noreferrer" className="text-brand-violet hover:underline">/en/portfolio/{caseStudy.slugEn}</a></p>}
            </div>
          )}
        </div>
      )}

      {/* Bottom save */}
      <div className="flex justify-end gap-2 pb-8">
        <Button variant="ghost" onClick={() => router.push('/admin/case-studies')}>Cancel</Button>
        <Button onClick={handleSave} loading={saving}>{isEdit ? 'Update Case Study' : 'Create Case Study'}</Button>
      </div>
    </div>
  )
}
