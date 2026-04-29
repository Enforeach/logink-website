'use client'

import { type BlockType } from '@/types/case-study'

export const BLOCK_LABELS: Record<BlockType, string> = {
  HERO: 'Hero',
  OVERVIEW: 'Overview / Summary',
  CLIENT_SNAPSHOT: 'Client Snapshot',
  NARRATIVE: 'Narrative Section',
  METRIC_GRID: 'Metric Grid',
  TIMELINE: 'Timeline',
  CHART: 'Chart',
  BEFORE_AFTER: 'Before / After',
  GALLERY: 'Gallery',
  VIDEO: 'Video',
  QUOTE: 'Testimonial Quote',
  SERVICES_USED: 'Services Used',
  RELATED_CASES: 'Related Cases',
  CTA: 'Call to Action',
  LEAD_FORM: 'Lead Form',
  FAQ: 'FAQ',
  RICH_TEXT: 'Rich Text',
}

export const BLOCK_DEFAULTS: Record<BlockType, object> = {
  HERO: { variant: 'editorial', headingId: '', metrics: [] },
  OVERVIEW: { bulletsId: [''] },
  CLIENT_SNAPSHOT: { facts: [], aboutId: '' },
  NARRATIVE: { headingId: '', bodyId: '', eyebrowId: 'Challenge' },
  METRIC_GRID: { metrics: [{ labelId: '', value: '', deltaDirection: 'up' }] },
  TIMELINE: { milestones: [{ date: '', titleId: '', descriptionId: '' }] },
  CHART: { chartType: 'area', xKey: 'month', yKeys: ['value'], dataset: [] },
  BEFORE_AFTER: { beforeMediaUrl: '', afterMediaUrl: '', beforeLabelId: 'Before', afterLabelId: 'After' },
  GALLERY: { layout: 'grid-3', items: [] },
  VIDEO: { provider: 'youtube', src: '' },
  QUOTE: { quoteId: '', authorName: '' },
  SERVICES_USED: { serviceIds: [] },
  RELATED_CASES: { mode: 'auto', limit: 3 },
  CTA: { variant: 'dark-band', headingId: '', primaryCtaLabelId: 'Contact Us', primaryCtaHref: '/contact' },
  LEAD_FORM: { presetGoalId: '' },
  FAQ: { items: [{ questionId: '', answerId: '' }] },
  RICH_TEXT: { contentId: '' },
}

interface BlockEditorProps {
  blockType: BlockType
  data: Record<string, unknown>
  lang: 'id' | 'en'
  onChange: (data: Record<string, unknown>) => void
}

function Inp({ label, value, onChange, placeholder, multiline }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean
}) {
  const cls = 'w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-brand-violet focus:outline-none'
  return (
    <label className="block">
      <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1 block">{label}</span>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} className={`${cls} resize-none`} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      }
    </label>
  )
}

function field(data: Record<string, unknown>, key: string, lang: 'id' | 'en'): string {
  const k = lang === 'en' ? key.replace(/Id$/, 'En') : key
  return (data[k] as string) || ''
}

function set(data: Record<string, unknown>, key: string, val: string, lang: 'id' | 'en'): Record<string, unknown> {
  const k = lang === 'en' ? key.replace(/Id$/, 'En') : key
  return { ...data, [k]: val }
}

export function BlockEditor({ blockType, data, lang, onChange }: BlockEditorProps) {
  const d = data

  switch (blockType) {
    case 'HERO':
      return (
        <div className="space-y-3">
          <Inp label={`Eyebrow (${lang.toUpperCase()})`} value={field(d, 'eyebrowId', lang)} onChange={v => onChange(set(d, 'eyebrowId', v, lang))} placeholder="E-commerce" />
          <Inp label={`Heading (${lang.toUpperCase()})`} value={field(d, 'headingId', lang)} onChange={v => onChange(set(d, 'headingId', v, lang))} placeholder="How BrandX grew traffic 948% in 9 months" />
          <Inp label={`Subheading (${lang.toUpperCase()})`} value={field(d, 'subheadingId', lang)} onChange={v => onChange(set(d, 'subheadingId', v, lang))} />
          <Inp label="Hero Media URL" value={(d.mediaUrl as string) || ''} onChange={v => onChange({ ...d, mediaUrl: v })} placeholder="/uploads/..." />
          <label className="block">
            <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1 block">Variant</span>
            <select value={(d.variant as string) || 'editorial'} onChange={e => onChange({ ...d, variant: e.target.value })} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-brand-violet focus:outline-none">
              {['editorial', 'split', 'immersive'].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </label>
          <MetricsEditor d={d} lang={lang} onChange={onChange} />
        </div>
      )

    case 'OVERVIEW':
      return (
        <div className="space-y-3">
          <Inp label={`Title (${lang.toUpperCase()})`} value={field(d, 'titleId', lang)} onChange={v => onChange(set(d, 'titleId', v, lang))} placeholder="Summary" />
          <BulletsEditor d={d} lang={lang} onChange={onChange} />
        </div>
      )

    case 'CLIENT_SNAPSHOT':
      return (
        <div className="space-y-3">
          <Inp label={`About Client (${lang.toUpperCase()})`} value={field(d, 'aboutId', lang)} onChange={v => onChange(set(d, 'aboutId', v, lang))} multiline placeholder="Brief description of the client..." />
          <Inp label="Website URL" value={(d.website as string) || ''} onChange={v => onChange({ ...d, website: v })} placeholder="https://..." />
          <FactsEditor d={d} onChange={onChange} />
        </div>
      )

    case 'NARRATIVE':
      return (
        <div className="space-y-3">
          <Inp label={`Eyebrow (${lang.toUpperCase()})`} value={field(d, 'eyebrowId', lang)} onChange={v => onChange(set(d, 'eyebrowId', v, lang))} placeholder="Challenge" />
          <Inp label={`Heading (${lang.toUpperCase()})`} value={field(d, 'headingId', lang)} onChange={v => onChange(set(d, 'headingId', v, lang))} />
          <Inp label={`Body (${lang.toUpperCase()})`} value={field(d, 'bodyId', lang)} onChange={v => onChange(set(d, 'bodyId', v, lang))} multiline />
          <Inp label={`Pull Quote (${lang.toUpperCase()})`} value={field(d, 'pullQuoteId', lang)} onChange={v => onChange(set(d, 'pullQuoteId', v, lang))} />
          <Inp label="Supporting Image URL" value={(d.supportingMediaUrl as string) || ''} onChange={v => onChange({ ...d, supportingMediaUrl: v })} />
        </div>
      )

    case 'METRIC_GRID':
      return (
        <div className="space-y-3">
          <Inp label={`Section Title (${lang.toUpperCase()})`} value={field(d, 'titleId', lang)} onChange={v => onChange(set(d, 'titleId', v, lang))} placeholder="Results" />
          <MetricsEditor d={d} lang={lang} onChange={onChange} showGroup />
        </div>
      )

    case 'TIMELINE':
      return (
        <div className="space-y-3">
          <Inp label={`Title (${lang.toUpperCase()})`} value={field(d, 'titleId', lang)} onChange={v => onChange(set(d, 'titleId', v, lang))} placeholder="Project Timeline" />
          <TimelineMilestonesEditor d={d} lang={lang} onChange={onChange} />
        </div>
      )

    case 'CHART':
      return (
        <div className="space-y-3">
          <Inp label={`Title (${lang.toUpperCase()})`} value={field(d, 'titleId', lang)} onChange={v => onChange(set(d, 'titleId', v, lang))} placeholder="Organic Traffic Growth" />
          <label className="block">
            <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1 block">Chart Type</span>
            <select value={(d.chartType as string) || 'area'} onChange={e => onChange({ ...d, chartType: e.target.value })} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-brand-violet focus:outline-none">
              {['line', 'area', 'bar', 'donut', 'stacked'].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </label>
          <Inp label="X-Axis Key" value={(d.xKey as string) || ''} onChange={v => onChange({ ...d, xKey: v })} placeholder="month" />
          <Inp label="Y-Axis Keys (comma-separated)" value={((d.yKeys as string[]) || []).join(',')} onChange={v => onChange({ ...d, yKeys: v.split(',').map(s => s.trim()).filter(Boolean) })} placeholder="visitors,pageviews" />
          <Inp label={`Source (${lang.toUpperCase()})`} value={field(d, 'sourceId', lang)} onChange={v => onChange(set(d, 'sourceId', v, lang))} placeholder="Google Analytics" />
          <label className="block">
            <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1 block">Dataset JSON</span>
            <textarea
              value={JSON.stringify(d.dataset || [], null, 2)}
              onChange={e => { try { onChange({ ...d, dataset: JSON.parse(e.target.value) }) } catch { /* invalid JSON */ } }}
              rows={5}
              className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-2 text-xs font-mono text-[var(--text-primary)] focus:border-brand-violet focus:outline-none resize-none"
              placeholder='[{"month":"Jan","visitors":1200}]'
            />
          </label>
        </div>
      )

    case 'BEFORE_AFTER':
      return (
        <div className="space-y-3">
          <Inp label="Before Image URL" value={(d.beforeMediaUrl as string) || ''} onChange={v => onChange({ ...d, beforeMediaUrl: v })} />
          <Inp label="After Image URL" value={(d.afterMediaUrl as string) || ''} onChange={v => onChange({ ...d, afterMediaUrl: v })} />
          <Inp label={`Before Label (${lang.toUpperCase()})`} value={field(d, 'beforeLabelId', lang)} onChange={v => onChange(set(d, 'beforeLabelId', v, lang))} placeholder="Before" />
          <Inp label={`After Label (${lang.toUpperCase()})`} value={field(d, 'afterLabelId', lang)} onChange={v => onChange(set(d, 'afterLabelId', v, lang))} placeholder="After" />
          <Inp label={`Caption (${lang.toUpperCase()})`} value={field(d, 'captionId', lang)} onChange={v => onChange(set(d, 'captionId', v, lang))} />
        </div>
      )

    case 'GALLERY':
      return (
        <div className="space-y-3">
          <label className="block">
            <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1 block">Layout</span>
            <select value={(d.layout as string) || 'grid-3'} onChange={e => onChange({ ...d, layout: e.target.value })} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-brand-violet focus:outline-none">
              {['grid-2', 'grid-3', 'masonry'].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </label>
          <GalleryItemsEditor d={d} lang={lang} onChange={onChange} />
        </div>
      )

    case 'VIDEO':
      return (
        <div className="space-y-3">
          <label className="block">
            <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1 block">Provider</span>
            <select value={(d.provider as string) || 'youtube'} onChange={e => onChange({ ...d, provider: e.target.value })} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-brand-violet focus:outline-none">
              {['youtube', 'vimeo', 'mp4'].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </label>
          <Inp label="Video URL / ID" value={(d.src as string) || ''} onChange={v => onChange({ ...d, src: v })} placeholder="https://youtube.com/... or video ID" />
          <Inp label="Poster Image URL" value={(d.posterUrl as string) || ''} onChange={v => onChange({ ...d, posterUrl: v })} />
          <Inp label={`Caption (${lang.toUpperCase()})`} value={field(d, 'captionId', lang)} onChange={v => onChange(set(d, 'captionId', v, lang))} />
        </div>
      )

    case 'QUOTE':
      return (
        <div className="space-y-3">
          <Inp label={`Quote Text (${lang.toUpperCase()})`} value={field(d, 'quoteId', lang)} onChange={v => onChange(set(d, 'quoteId', v, lang))} multiline />
          <Inp label="Author Name" value={(d.authorName as string) || ''} onChange={v => onChange({ ...d, authorName: v })} />
          <Inp label="Author Role" value={(d.authorRole as string) || ''} onChange={v => onChange({ ...d, authorRole: v })} />
          <Inp label="Author Company" value={(d.authorCompany as string) || ''} onChange={v => onChange({ ...d, authorCompany: v })} />
          <Inp label="Author Photo URL" value={(d.authorAvatar as string) || ''} onChange={v => onChange({ ...d, authorAvatar: v })} />
        </div>
      )

    case 'SERVICES_USED':
      return (
        <div className="space-y-3">
          <Inp label="Service IDs (comma-separated)" value={((d.serviceIds as string[]) || []).join(',')} onChange={v => onChange({ ...d, serviceIds: v.split(',').map(s => s.trim()).filter(Boolean) })} placeholder="svc_id1,svc_id2" />
          <Inp label={`Custom Description (${lang.toUpperCase()})`} value={field(d, 'customDescriptionId', lang)} onChange={v => onChange(set(d, 'customDescriptionId', v, lang))} multiline />
        </div>
      )

    case 'RELATED_CASES':
      return (
        <div className="space-y-3">
          <label className="block">
            <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1 block">Mode</span>
            <select value={(d.mode as string) || 'auto'} onChange={e => onChange({ ...d, mode: e.target.value })} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-brand-violet focus:outline-none">
              <option value="auto">Auto (by industry/service)</option>
              <option value="manual">Manual selection</option>
            </select>
          </label>
          <Inp label="Limit" value={String((d.limit as number) || 3)} onChange={v => onChange({ ...d, limit: parseInt(v) || 3 })} placeholder="3" />
          {d.mode === 'manual' && (
            <Inp label="Case Study Slugs (comma-separated)" value={((d.manualSlugIds as string[]) || []).join(',')} onChange={v => onChange({ ...d, manualSlugIds: v.split(',').map(s => s.trim()).filter(Boolean) })} />
          )}
        </div>
      )

    case 'CTA':
      return (
        <div className="space-y-3">
          <label className="block">
            <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1 block">Variant</span>
            <select value={(d.variant as string) || 'dark-band'} onChange={e => onChange({ ...d, variant: e.target.value })} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-brand-violet focus:outline-none">
              {['dark-band', 'gradient', 'minimal'].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </label>
          <Inp label={`Heading (${lang.toUpperCase()})`} value={field(d, 'headingId', lang)} onChange={v => onChange(set(d, 'headingId', v, lang))} />
          <Inp label={`Body (${lang.toUpperCase()})`} value={field(d, 'bodyId', lang)} onChange={v => onChange(set(d, 'bodyId', v, lang))} />
          <Inp label={`Primary CTA Label (${lang.toUpperCase()})`} value={field(d, 'primaryCtaLabelId', lang)} onChange={v => onChange(set(d, 'primaryCtaLabelId', v, lang))} />
          <Inp label="Primary CTA URL" value={(d.primaryCtaHref as string) || ''} onChange={v => onChange({ ...d, primaryCtaHref: v })} />
        </div>
      )

    case 'LEAD_FORM':
      return (
        <div className="space-y-3">
          <Inp label={`Preset Goal (${lang.toUpperCase()})`} value={field(d, 'presetGoalId', lang)} onChange={v => onChange(set(d, 'presetGoalId', v, lang))} placeholder="Increase organic traffic" />
          <Inp label="Preset Service ID" value={(d.presetServiceId as string) || ''} onChange={v => onChange({ ...d, presetServiceId: v })} placeholder="seo" />
        </div>
      )

    case 'FAQ':
      return (
        <div className="space-y-3">
          <Inp label={`Title (${lang.toUpperCase()})`} value={field(d, 'titleId', lang)} onChange={v => onChange(set(d, 'titleId', v, lang))} placeholder="Frequently Asked Questions" />
          <FaqItemsEditor d={d} lang={lang} onChange={onChange} />
        </div>
      )

    case 'RICH_TEXT':
      return (
        <div className="space-y-3">
          <Inp label={`Content HTML (${lang.toUpperCase()})`} value={field(d, 'contentId', lang)} onChange={v => onChange(set(d, 'contentId', v, lang))} multiline />
        </div>
      )

    default:
      return <p className="text-sm text-[var(--text-muted)]">No editor available for this block type.</p>
  }
}

function MetricsEditor({ d, lang, onChange, showGroup }: { d: Record<string, unknown>; lang: 'id' | 'en'; onChange: (v: Record<string, unknown>) => void; showGroup?: boolean }) {
  const metrics = (d.metrics as Array<Record<string, unknown>>) || []
  const update = (idx: number, key: string, val: string) => {
    const next = metrics.map((m, i) => i === idx ? { ...m, [key]: val } : m)
    onChange({ ...d, metrics: next })
  }
  const labelKey = lang === 'en' ? 'labelEn' : 'labelId'
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Metrics</span>
        <button type="button" onClick={() => onChange({ ...d, metrics: [...metrics, { labelId: '', value: '', deltaDirection: 'up' }] })} className="text-xs text-brand-violet hover:opacity-80">+ Add</button>
      </div>
      <div className="space-y-2">
        {metrics.map((m, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 relative">
            <input value={(m[labelKey] as string) || ''} onChange={e => update(i, labelKey, e.target.value)} placeholder={`Label (${lang.toUpperCase()})`} className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs text-[var(--text-primary)] focus:border-brand-violet focus:outline-none" />
            <input value={(m.value as string) || ''} onChange={e => update(i, 'value', e.target.value)} placeholder="948%" className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs text-[var(--text-primary)] focus:border-brand-violet focus:outline-none" />
            <div className="flex gap-1">
              <select value={(m.deltaDirection as string) || 'up'} onChange={e => update(i, 'deltaDirection', e.target.value)} className="flex-1 rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-2 py-1.5 text-xs text-[var(--text-primary)] focus:border-brand-violet focus:outline-none">
                <option value="up">↑ Up</option>
                <option value="down">↓ Down</option>
                <option value="neutral">→ Neutral</option>
              </select>
              <button type="button" onClick={() => onChange({ ...d, metrics: metrics.filter((_, idx) => idx !== i) })} className="text-[var(--text-muted)] hover:text-red-400 text-xs px-1">✕</button>
            </div>
            {showGroup && <input value={(m.group as string) || ''} onChange={e => update(i, 'group', e.target.value)} placeholder="Group (e.g. SEO)" className="col-span-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs text-[var(--text-primary)] focus:border-brand-violet focus:outline-none" />}
          </div>
        ))}
      </div>
    </div>
  )
}

function BulletsEditor({ d, lang, onChange }: { d: Record<string, unknown>; lang: 'id' | 'en'; onChange: (v: Record<string, unknown>) => void }) {
  const key = lang === 'en' ? 'bulletsEn' : 'bulletsId'
  const bullets = (d[key] as string[]) || []
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Bullets ({lang.toUpperCase()})</span>
        <button type="button" onClick={() => onChange({ ...d, [key]: [...bullets, ''] })} className="text-xs text-brand-violet hover:opacity-80">+ Add</button>
      </div>
      <div className="space-y-2">
        {bullets.map((b, i) => (
          <div key={i} className="flex gap-2">
            <input value={b} onChange={e => onChange({ ...d, [key]: bullets.map((x, xi) => xi === i ? e.target.value : x) })} placeholder="Bullet point..." className="flex-1 rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs text-[var(--text-primary)] focus:border-brand-violet focus:outline-none" />
            <button type="button" onClick={() => onChange({ ...d, [key]: bullets.filter((_, xi) => xi !== i) })} className="text-[var(--text-muted)] hover:text-red-400 text-xs px-1">✕</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function FactsEditor({ d, onChange }: { d: Record<string, unknown>; onChange: (v: Record<string, unknown>) => void }) {
  const facts = (d.facts as Array<{ label: string; value: string }>) || []
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Facts Table</span>
        <button type="button" onClick={() => onChange({ ...d, facts: [...facts, { label: '', value: '' }] })} className="text-xs text-brand-violet hover:opacity-80">+ Add</button>
      </div>
      <div className="space-y-2">
        {facts.map((f, i) => (
          <div key={i} className="flex gap-2">
            <input value={f.label} onChange={e => onChange({ ...d, facts: facts.map((x, xi) => xi === i ? { ...x, label: e.target.value } : x) })} placeholder="Label" className="flex-1 rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs text-[var(--text-primary)] focus:border-brand-violet focus:outline-none" />
            <input value={f.value} onChange={e => onChange({ ...d, facts: facts.map((x, xi) => xi === i ? { ...x, value: e.target.value } : x) })} placeholder="Value" className="flex-1 rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs text-[var(--text-primary)] focus:border-brand-violet focus:outline-none" />
            <button type="button" onClick={() => onChange({ ...d, facts: facts.filter((_, xi) => xi !== i) })} className="text-[var(--text-muted)] hover:text-red-400 text-xs px-1">✕</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function TimelineMilestonesEditor({ d, lang, onChange }: { d: Record<string, unknown>; lang: 'id' | 'en'; onChange: (v: Record<string, unknown>) => void }) {
  const milestones = (d.milestones as Array<Record<string, unknown>>) || []
  const titleKey = lang === 'en' ? 'titleEn' : 'titleId'
  const descKey = lang === 'en' ? 'descriptionEn' : 'descriptionId'
  const upd = (i: number, k: string, v: string) => onChange({ ...d, milestones: milestones.map((m, mi) => mi === i ? { ...m, [k]: v } : m) })
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Milestones</span>
        <button type="button" onClick={() => onChange({ ...d, milestones: [...milestones, { date: '', titleId: '', descriptionId: '' }] })} className="text-xs text-brand-violet hover:opacity-80">+ Add</button>
      </div>
      <div className="space-y-3">
        {milestones.map((m, i) => (
          <div key={i} className="rounded-lg border border-[var(--border-default)] p-3 space-y-2 relative">
            <button type="button" onClick={() => onChange({ ...d, milestones: milestones.filter((_, mi) => mi !== i) })} className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-red-400 text-xs">✕</button>
            <input value={(m.date as string) || ''} onChange={e => upd(i, 'date', e.target.value)} placeholder="Month Year (e.g. Jan 2024)" className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs text-[var(--text-primary)] focus:border-brand-violet focus:outline-none" />
            <input value={(m[titleKey] as string) || ''} onChange={e => upd(i, titleKey, e.target.value)} placeholder={`Title (${lang.toUpperCase()})`} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs text-[var(--text-primary)] focus:border-brand-violet focus:outline-none" />
            <textarea value={(m[descKey] as string) || ''} onChange={e => upd(i, descKey, e.target.value)} placeholder={`Description (${lang.toUpperCase()})`} rows={2} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs text-[var(--text-primary)] focus:border-brand-violet focus:outline-none resize-none" />
          </div>
        ))}
      </div>
    </div>
  )
}

function GalleryItemsEditor({ d, lang, onChange }: { d: Record<string, unknown>; lang: 'id' | 'en'; onChange: (v: Record<string, unknown>) => void }) {
  const items = (d.items as Array<Record<string, unknown>>) || []
  const capKey = lang === 'en' ? 'captionEn' : 'captionId'
  const upd = (i: number, k: string, v: string) => onChange({ ...d, items: items.map((m, mi) => mi === i ? { ...m, [k]: v } : m) })
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Images</span>
        <button type="button" onClick={() => onChange({ ...d, items: [...items, { mediaUrl: '', captionId: '' }] })} className="text-xs text-brand-violet hover:opacity-80">+ Add</button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-2 gap-2 relative">
            <input value={(item.mediaUrl as string) || ''} onChange={e => upd(i, 'mediaUrl', e.target.value)} placeholder="Image URL" className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs text-[var(--text-primary)] focus:border-brand-violet focus:outline-none" />
            <div className="flex gap-1">
              <input value={(item[capKey] as string) || ''} onChange={e => upd(i, capKey, e.target.value)} placeholder={`Caption (${lang.toUpperCase()})`} className="flex-1 rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs text-[var(--text-primary)] focus:border-brand-violet focus:outline-none" />
              <button type="button" onClick={() => onChange({ ...d, items: items.filter((_, xi) => xi !== i) })} className="text-[var(--text-muted)] hover:text-red-400 text-xs px-1">✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FaqItemsEditor({ d, lang, onChange }: { d: Record<string, unknown>; lang: 'id' | 'en'; onChange: (v: Record<string, unknown>) => void }) {
  const items = (d.items as Array<Record<string, unknown>>) || []
  const qKey = lang === 'en' ? 'questionEn' : 'questionId'
  const aKey = lang === 'en' ? 'answerEn' : 'answerId'
  const upd = (i: number, k: string, v: string) => onChange({ ...d, items: items.map((m, mi) => mi === i ? { ...m, [k]: v } : m) })
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">FAQ Items</span>
        <button type="button" onClick={() => onChange({ ...d, items: [...items, { questionId: '', answerId: '' }] })} className="text-xs text-brand-violet hover:opacity-80">+ Add</button>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border border-[var(--border-default)] p-3 space-y-2 relative">
            <button type="button" onClick={() => onChange({ ...d, items: items.filter((_, xi) => xi !== i) })} className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-red-400 text-xs">✕</button>
            <input value={(item[qKey] as string) || ''} onChange={e => upd(i, qKey, e.target.value)} placeholder={`Question (${lang.toUpperCase()})`} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs text-[var(--text-primary)] focus:border-brand-violet focus:outline-none" />
            <textarea value={(item[aKey] as string) || ''} onChange={e => upd(i, aKey, e.target.value)} placeholder={`Answer (${lang.toUpperCase()})`} rows={2} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs text-[var(--text-primary)] focus:border-brand-violet focus:outline-none resize-none" />
          </div>
        ))}
      </div>
    </div>
  )
}
