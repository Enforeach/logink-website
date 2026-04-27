'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

const TEMPLATES = [
  { value: 'HERO_BANNER', label: 'Hero Banner', desc: 'Full-width gradient with CTA' },
  { value: 'SERVICE_CARD', label: 'Service Card', desc: 'Bordered card with icon' },
  { value: 'INLINE_CALLOUT', label: 'Inline Callout', desc: 'Editorial left-border callout' },
  { value: 'CUSTOM_IMAGE', label: 'Custom Image', desc: 'Uploaded banner image' },
  { value: 'MINIMAL_STRIP', label: 'Minimal Strip', desc: 'Single-line separator text' },
  { value: 'FLOATING_NOTIFICATION', label: 'Floating Notif.', desc: 'Toast popup widget' },
  { value: 'SPLIT_VISUAL', label: 'Split Visual', desc: 'Image + text side by side' },
  { value: 'COUNTER_URGENCY', label: 'Countdown', desc: 'Countdown timer CTA' },
]

const PLACEMENTS = ['INLINE', 'ABOVE_FOLD', 'BELOW_ARTICLE', 'SIDEBAR', 'STICKY_BOTTOM', 'BETWEEN_PARAGRAPHS', 'AFTER_TOC']
const TARGETING_TYPES = ['ALL_POSTS', 'SPECIFIC_POSTS', 'BY_TAG', 'BY_CATEGORY', 'EXCLUDE_POSTS']
const TRIGGERS = ['delay', 'scroll_depth', 'exit_intent']

interface CtaWidgetFormProps {
  widget?: {
    id: string
    name: string
    templateType: string
    heading?: string | null
    subheading?: string | null
    buttonText?: string | null
    buttonUrl: string
    secondaryButtonText?: string | null
    secondaryButtonUrl?: string | null
    backgroundImage?: string | null
    cssClass?: string | null
    gaEventCategory?: string | null
    gaEventLabel?: string | null
    placement: string
    paragraphIndex?: number | null
    targetingType: string
    isActive: boolean
    startDate?: Date | null
    endDate?: Date | null
    showOnMobile: boolean
    showOnDesktop: boolean
    dismissible: boolean
    dismissDuration: number
    displayTrigger?: string | null
    displayDelay?: number | null
    scrollDepthThreshold?: number | null
    countdownLabel?: string | null
    imagePosition?: string | null
    emoji?: string | null
    sponsoredLabel: boolean
  } | null
}

export function CtaWidgetForm({ widget }: CtaWidgetFormProps) {
  const router = useRouter()
  const isEdit = !!widget

  const [name, setName] = useState(widget?.name || '')
  const [templateType, setTemplateType] = useState(widget?.templateType || 'HERO_BANNER')
  const [heading, setHeading] = useState(widget?.heading || '')
  const [subheading, setSubheading] = useState(widget?.subheading || '')
  const [buttonText, setButtonText] = useState(widget?.buttonText || '')
  const [buttonUrl, setButtonUrl] = useState(widget?.buttonUrl || '/contact')
  const [secondaryButtonText, setSecondaryButtonText] = useState(widget?.secondaryButtonText || '')
  const [secondaryButtonUrl, setSecondaryButtonUrl] = useState(widget?.secondaryButtonUrl || '')
  const [backgroundImage, setBackgroundImage] = useState(widget?.backgroundImage || '')
  const [cssClass, setCssClass] = useState(widget?.cssClass || '')
  const [gaEventCategory, setGaEventCategory] = useState(widget?.gaEventCategory || 'cta_click')
  const [gaEventLabel, setGaEventLabel] = useState(widget?.gaEventLabel || '')
  const [placement, setPlacement] = useState(widget?.placement || 'BETWEEN_PARAGRAPHS')
  const [paragraphIndex, setParagraphIndex] = useState(widget?.paragraphIndex ?? 3)
  const [targetingType, setTargetingType] = useState(widget?.targetingType || 'ALL_POSTS')
  const [isActive, setIsActive] = useState(widget?.isActive ?? true)
  const [startDate, setStartDate] = useState(widget?.startDate ? new Date(widget.startDate).toISOString().split('T')[0] : '')
  const [endDate, setEndDate] = useState(widget?.endDate ? new Date(widget.endDate).toISOString().split('T')[0] : '')
  const [showOnMobile, setShowOnMobile] = useState(widget?.showOnMobile ?? true)
  const [showOnDesktop, setShowOnDesktop] = useState(widget?.showOnDesktop ?? true)
  const [dismissible, setDismissible] = useState(widget?.dismissible ?? true)
  const [dismissDuration, setDismissDuration] = useState(widget?.dismissDuration ?? 7)
  const [displayTrigger, setDisplayTrigger] = useState(widget?.displayTrigger || 'delay')
  const [displayDelay, setDisplayDelay] = useState(widget?.displayDelay ?? 5)
  const [scrollDepthThreshold, setScrollDepthThreshold] = useState(widget?.scrollDepthThreshold ?? 0.4)
  const [countdownLabel, setCountdownLabel] = useState(widget?.countdownLabel || '')
  const [imagePosition, setImagePosition] = useState(widget?.imagePosition || 'left')
  const [emoji, setEmoji] = useState(widget?.emoji || '')
  const [sponsoredLabel, setSponsoredLabel] = useState(widget?.sponsoredLabel ?? false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSave = useCallback(async () => {
    if (!name.trim() || !buttonUrl.trim()) { setError('Widget name and button URL are required'); return }
    setError('')
    setSaving(true)

    const body: Record<string, any> = {
      name: name.trim(),
      templateType,
      heading: heading.trim() || null,
      subheading: subheading.trim() || null,
      buttonText: buttonText.trim() || null,
      buttonUrl: buttonUrl.trim(),
      secondaryButtonText: secondaryButtonText.trim() || null,
      secondaryButtonUrl: secondaryButtonUrl.trim() || null,
      backgroundImage: backgroundImage.trim() || null,
      cssClass: cssClass.trim() || null,
      gaEventCategory: gaEventCategory.trim() || null,
      gaEventLabel: gaEventLabel.trim() || null,
      placement,
      paragraphIndex: placement === 'BETWEEN_PARAGRAPHS' ? paragraphIndex : null,
      targetingType,
      isActive,
      startDate: startDate || null,
      endDate: endDate || null,
      showOnMobile,
      showOnDesktop,
      dismissible,
      dismissDuration,
      displayTrigger: templateType === 'FLOATING_NOTIFICATION' ? displayTrigger : null,
      displayDelay: templateType === 'FLOATING_NOTIFICATION' ? displayDelay : null,
      scrollDepthThreshold: templateType === 'FLOATING_NOTIFICATION' && displayTrigger === 'scroll_depth' ? scrollDepthThreshold : null,
      countdownLabel: templateType === 'COUNTER_URGENCY' ? (countdownLabel || null) : null,
      imagePosition: templateType === 'SPLIT_VISUAL' ? imagePosition : null,
      emoji: emoji.trim() || null,
      sponsoredLabel,
    }

    const url = isEdit ? `/api/cta-widgets/${widget.id}` : '/api/cta-widgets'
    const method = isEdit ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Save failed'); return }
      router.push('/admin/cta-widgets')
      router.refresh()
    } catch {
      setError('Network error')
    } finally {
      setSaving(false)
    }
  }, [name, templateType, heading, subheading, buttonText, buttonUrl, secondaryButtonText, secondaryButtonUrl, backgroundImage, cssClass, gaEventCategory, gaEventLabel, placement, paragraphIndex, targetingType, isActive, startDate, endDate, showOnMobile, showOnDesktop, dismissible, dismissDuration, displayTrigger, displayDelay, scrollDepthThreshold, countdownLabel, imagePosition, emoji, sponsoredLabel, isEdit, widget, router])

  const inputCls = 'w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-brand-violet focus:outline-none'
  const labelCls = 'text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block'
  const panelCls = 'rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 space-y-4'

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">{isEdit ? 'Edit CTA Widget' : 'New CTA Widget'}</h1>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => router.push('/admin/cta-widgets')} size="sm">Cancel</Button>
          <Button onClick={handleSave} loading={saving} size="sm">Save Widget</Button>
        </div>
      </div>

      {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}

      {/* Basic Info */}
      <div className={panelCls}>
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Basic Info</h3>
        <div>
          <label className={labelCls}>Widget Name (admin only)</label>
          <input type="text" placeholder="Q2 SEO Audit Promo" value={name} onChange={e => setName(e.target.value)} className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Template</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TEMPLATES.map(t => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTemplateType(t.value)}
                className={`text-left rounded-lg border p-3 transition-all ${templateType === t.value ? 'border-brand-violet bg-brand-violet/10' : 'border-[var(--border-default)] bg-[var(--bg-elevated)] hover:border-[var(--border-hover)]'}`}
              >
                <div className="text-xs font-semibold text-[var(--text-primary)]">{t.label}</div>
                <div className="text-[10px] text-[var(--text-muted)] mt-0.5">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={panelCls}>
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Content</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Emoji / Icon (optional)</label>
            <input type="text" placeholder="🔥" value={emoji} onChange={e => setEmoji(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Heading</label>
            <input type="text" placeholder="Get a Free SEO Audit" value={heading} onChange={e => setHeading(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Subheading</label>
          <textarea placeholder="Short supporting text..." value={subheading} onChange={e => setSubheading(e.target.value)} rows={2} className={inputCls + ' resize-none'} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Primary Button Text</label>
            <input type="text" placeholder="Start Now →" value={buttonText} onChange={e => setButtonText(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Primary Button URL</label>
            <input type="text" placeholder="/contact?utm_source=blog" value={buttonUrl} onChange={e => setButtonUrl(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Secondary Button Text (optional)</label>
            <input type="text" placeholder="Learn More" value={secondaryButtonText} onChange={e => setSecondaryButtonText(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Secondary Button URL (optional)</label>
            <input type="text" placeholder="/services/seo" value={secondaryButtonUrl} onChange={e => setSecondaryButtonUrl(e.target.value)} className={inputCls} />
          </div>
        </div>
        {templateType === 'CUSTOM_IMAGE' && (
          <div>
            <label className={labelCls}>Background Image URL</label>
            <input type="text" placeholder="/uploads/cta/banner.webp" value={backgroundImage} onChange={e => setBackgroundImage(e.target.value)} className={inputCls} />
            {backgroundImage && <img src={backgroundImage} alt="" className="mt-2 rounded-lg w-full object-cover aspect-[3/1]" />}
            <label className="flex items-center gap-2 mt-2">
              <input type="checkbox" checked={sponsoredLabel} onChange={e => setSponsoredLabel(e.target.checked)} />
              <span className="text-xs text-[var(--text-secondary)]">Show "Sponsored" label</span>
            </label>
          </div>
        )}
        {templateType === 'SPLIT_VISUAL' && (
          <div>
            <label className={labelCls}>Image URL (optional)</label>
            <input type="text" placeholder="/uploads/cta/visual.webp" value={backgroundImage} onChange={e => setBackgroundImage(e.target.value)} className={inputCls} />
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 text-xs text-[var(--text-secondary)] cursor-pointer">
                <input type="radio" checked={imagePosition === 'left'} onChange={() => setImagePosition('left')} />
                Image left
              </label>
              <label className="flex items-center gap-2 text-xs text-[var(--text-secondary)] cursor-pointer">
                <input type="radio" checked={imagePosition === 'right'} onChange={() => setImagePosition('right')} />
                Image right
              </label>
            </div>
          </div>
        )}
        {templateType === 'COUNTER_URGENCY' && (
          <div>
            <label className={labelCls}>Countdown Label</label>
            <input type="text" placeholder="Offer ends in:" value={countdownLabel} onChange={e => setCountdownLabel(e.target.value)} className={inputCls} />
          </div>
        )}
        {templateType === 'FLOATING_NOTIFICATION' && (
          <div className="space-y-3">
            <div>
              <label className={labelCls}>Display Trigger</label>
              <select value={displayTrigger} onChange={e => setDisplayTrigger(e.target.value)} className={inputCls}>
                {TRIGGERS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            {displayTrigger === 'delay' && (
              <div>
                <label className={labelCls}>Delay (seconds)</label>
                <input type="number" min={1} value={displayDelay} onChange={e => setDisplayDelay(Number(e.target.value))} className={inputCls} />
              </div>
            )}
            {displayTrigger === 'scroll_depth' && (
              <div>
                <label className={labelCls}>Scroll Depth (0.0 – 1.0)</label>
                <input type="number" min={0} max={1} step={0.1} value={scrollDepthThreshold} onChange={e => setScrollDepthThreshold(Number(e.target.value))} className={inputCls} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Placement */}
      <div className={panelCls}>
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Placement</h3>
        <div>
          <label className={labelCls}>Position</label>
          <select value={placement} onChange={e => setPlacement(e.target.value)} className={inputCls}>
            {PLACEMENTS.map(p => <option key={p} value={p}>{p.replace('_', ' ')}</option>)}
          </select>
        </div>
        {placement === 'BETWEEN_PARAGRAPHS' && (
          <div>
            <label className={labelCls}>After paragraph #</label>
            <input type="number" min={1} value={paragraphIndex} onChange={e => setParagraphIndex(Number(e.target.value))} className={inputCls} />
          </div>
        )}
      </div>

      {/* Targeting */}
      <div className={panelCls}>
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Targeting</h3>
        <div>
          <label className={labelCls}>Show on</label>
          <select value={targetingType} onChange={e => setTargetingType(e.target.value)} className={inputCls}>
            {TARGETING_TYPES.map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
          </select>
        </div>
      </div>

      {/* Scheduling */}
      <div className={panelCls}>
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Scheduling</h3>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
          <span className="text-sm text-[var(--text-secondary)]">Active</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Start Date (optional)</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>End Date (optional)</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className={inputCls} />
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className={panelCls}>
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Analytics & Tracking</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>CSS Class</label>
            <input type="text" placeholder="cta-q2-seo" value={cssClass} onChange={e => setCssClass(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>GA4 Event Category</label>
            <input type="text" placeholder="cta_click" value={gaEventCategory} onChange={e => setGaEventCategory(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>GA4 Event Label</label>
            <input type="text" placeholder="q2_seo_audit_blog" value={gaEventLabel} onChange={e => setGaEventLabel(e.target.value)} className={inputCls} />
          </div>
        </div>
      </div>

      {/* Display Rules */}
      <div className={panelCls}>
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Display Rules</h3>
        <div className="flex flex-wrap gap-5">
          <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)] cursor-pointer">
            <input type="checkbox" checked={showOnMobile} onChange={e => setShowOnMobile(e.target.checked)} />
            Show on mobile
          </label>
          <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)] cursor-pointer">
            <input type="checkbox" checked={showOnDesktop} onChange={e => setShowOnDesktop(e.target.checked)} />
            Show on desktop
          </label>
          <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)] cursor-pointer">
            <input type="checkbox" checked={dismissible} onChange={e => setDismissible(e.target.checked)} />
            Show close button
          </label>
        </div>
        <div>
          <label className={labelCls}>Dismiss cookie duration (days)</label>
          <input type="number" min={1} value={dismissDuration} onChange={e => setDismissDuration(Number(e.target.value))} className={inputCls + ' max-w-[120px]'} />
        </div>
      </div>

      <div className="flex justify-end gap-2 pb-8">
        <Button variant="ghost" onClick={() => router.push('/admin/cta-widgets')} size="sm">Cancel</Button>
        <Button onClick={handleSave} loading={saving}>Save Widget</Button>
      </div>
    </div>
  )
}
