'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import type {
  HeroBlockData, OverviewBlockData, ClientSnapshotBlockData, NarrativeBlockData,
  MetricGridBlockData, TimelineBlockData, ChartBlockData, BeforeAfterBlockData,
  GalleryBlockData, VideoBlockData, QuoteBlockData, ServicesUsedBlockData,
  RelatedCasesBlockData, CtaBlockData, FaqBlockData, RichTextBlockData,
  LeadFormBlockData,
} from '@/types/case-study'

type Locale = 'id' | 'en'

function t(obj: Record<string, unknown>, idKey: string, locale: Locale): string {
  const enKey = idKey.replace(/Id$/, 'En')
  const val = locale === 'en' ? (obj[enKey] as string) || (obj[idKey] as string) : (obj[idKey] as string) || ''
  return val || ''
}

// ─── Animated Counter ───
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1400
          const start = performance.now()
          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            setValue(Math.floor(ease * target))
            if (progress < 1) requestAnimationFrame(tick)
            else setValue(target)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>
}

// ─── Reveal wrapper ───
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
      }}
    >
      {children}
    </div>
  )
}

// ─── 1. HERO ───
export function HeroBlockRenderer({ data, locale, clientName, clientLogo, durationLabel, services }: {
  data: HeroBlockData; locale: Locale; clientName: string; clientLogo?: string | null; durationLabel?: string | null
  services?: Array<{ name: string; color: string }>
}) {
  const metrics = data.metrics || []
  return (
    <div className="relative overflow-hidden">
      {data.mediaUrl && (
        <div className="absolute inset-0">
          <Image src={data.mediaUrl} alt={data.mediaAlt || clientName} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F0A1E]/60 via-[#0F0A1E]/40 to-[#0F0A1E]/80" />
        </div>
      )}
      <div className={`relative max-w-5xl mx-auto px-4 ${data.mediaUrl ? 'pt-40 pb-20 text-white' : 'pt-12 pb-10'}`}>
        {t(data as unknown as Record<string, unknown>, 'eyebrowId', locale) && (
          <div className="inline-block px-4 py-1.5 rounded-full border border-brand-violet/30 bg-brand-violet/10 text-brand-violet text-sm font-medium mb-6">
            {t(data as unknown as Record<string, unknown>, 'eyebrowId', locale)}
          </div>
        )}
        <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4 ${data.mediaUrl ? 'text-white' : 'text-[var(--text-primary)]'}`}>
          {t(data as unknown as Record<string, unknown>, 'headingId', locale)}
        </h1>
        {t(data as unknown as Record<string, unknown>, 'subheadingId', locale) && (
          <p className={`text-lg sm:text-xl mb-8 ${data.mediaUrl ? 'text-white/80' : 'text-[var(--text-secondary)]'}`}>
            {t(data as unknown as Record<string, unknown>, 'subheadingId', locale)}
          </p>
        )}
        {/* Client + duration + services row */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {clientLogo && (
            <div className="h-10 w-24 relative bg-white/10 rounded-lg overflow-hidden">
              <Image src={clientLogo} alt={clientName} fill className="object-contain p-1" />
            </div>
          )}
          <span className={`text-sm font-medium ${data.mediaUrl ? 'text-white/70' : 'text-[var(--text-secondary)]'}`}>{clientName}</span>
          {durationLabel && <span className={`text-sm px-3 py-1 rounded-full bg-white/10 ${data.mediaUrl ? 'text-white/70' : 'text-[var(--text-secondary)]'}`}>{durationLabel}</span>}
          {services?.map(s => (
            <span key={s.name} className="text-xs px-3 py-1 rounded-full font-medium text-white" style={{ backgroundColor: s.color }}>{s.name}</span>
          ))}
        </div>
        {/* Hero metrics */}
        {metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/20">
            {metrics.slice(0, 3).map((m, i) => {
              const numericVal = parseFloat(String(m.value).replace(/[^0-9.]/g, ''))
              const suffix = String(m.value).replace(/[0-9.]/g, '')
              return (
                <Reveal key={i} delay={i * 100}>
                  <div>
                    <div className={`text-4xl sm:text-5xl font-extrabold tabular-nums gradient-text`}>
                      {isNaN(numericVal) ? m.value : <Counter target={numericVal} suffix={suffix} />}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      {m.deltaDirection === 'up' && <span className="text-emerald-400 text-sm">↑</span>}
                      {m.deltaDirection === 'down' && <span className="text-red-400 text-sm">↓</span>}
                      <span className={`text-sm ${data.mediaUrl ? 'text-white/70' : 'text-[var(--text-secondary)]'}`}>{t(m as unknown as Record<string, unknown>, 'labelId', locale)}</span>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── 2. OVERVIEW ───
export function OverviewBlockRenderer({ data, locale }: { data: OverviewBlockData; locale: Locale }) {
  const title = t(data as unknown as Record<string, unknown>, 'titleId', locale) || (locale === 'en' ? 'Summary' : 'Ringkasan')
  const bullets = (locale === 'en' ? data.bulletsEn || data.bulletsId : data.bulletsId) || []
  return (
    <Reveal>
      <div className="max-w-3xl mx-auto rounded-2xl border-l-4 border-brand-violet bg-brand-violet/5 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">{title}</h2>
        <ul className="space-y-2">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-[var(--text-secondary)]">
              <span className="text-brand-violet mt-1 flex-shrink-0">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

// ─── 3. CLIENT SNAPSHOT ───
export function ClientSnapshotBlockRenderer({ data, locale, clientName, clientLogo }: {
  data: ClientSnapshotBlockData; locale: Locale; clientName: string; clientLogo?: string | null
}) {
  return (
    <Reveal>
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-8">
        <div>
          {clientLogo && (
            <div className="h-16 w-40 relative mb-4 bg-[var(--bg-surface)] rounded-xl overflow-hidden border border-[var(--border-default)]">
              <Image src={clientLogo} alt={clientName} fill className="object-contain p-3" />
            </div>
          )}
          <h3 className="font-bold text-[var(--text-primary)] mb-2">{clientName}</h3>
          {t(data as unknown as Record<string, unknown>, 'aboutId', locale) && (
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              {t(data as unknown as Record<string, unknown>, 'aboutId', locale)}
            </p>
          )}
          {data.website && (
            <a href={data.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-brand-violet hover:underline mt-3">
              {data.website.replace('https://', '')} ↗
            </a>
          )}
        </div>
        {data.facts.length > 0 && (
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {data.facts.map((f, i) => (
                  <tr key={i} className="border-b border-[var(--border-default)] last:border-0">
                    <td className="px-4 py-3 text-[var(--text-muted)] font-medium">{f.label}</td>
                    <td className="px-4 py-3 text-[var(--text-primary)]">{f.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Reveal>
  )
}

// ─── 4. NARRATIVE ───
export function NarrativeBlockRenderer({ data, locale }: { data: NarrativeBlockData; locale: Locale }) {
  const eyebrow = t(data as unknown as Record<string, unknown>, 'eyebrowId', locale)
  const heading = t(data as unknown as Record<string, unknown>, 'headingId', locale)
  const body = t(data as unknown as Record<string, unknown>, 'bodyId', locale)
  const pullQuote = t(data as unknown as Record<string, unknown>, 'pullQuoteId', locale)
  return (
    <Reveal>
      <div className="max-w-3xl mx-auto">
        {eyebrow && <p className="text-sm font-semibold text-brand-violet uppercase tracking-wider mb-2">{eyebrow}</p>}
        {heading && <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-5">{heading}</h2>}
        {body && (
          <div className="prose prose-neutral dark:prose-invert max-w-none text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">{body}</div>
        )}
        {pullQuote && (
          <blockquote className="my-8 pl-6 border-l-4 border-brand-violet italic text-xl text-[var(--text-primary)] font-medium">
            &ldquo;{pullQuote}&rdquo;
          </blockquote>
        )}
        {data.supportingMediaUrl && (
          <div className="mt-6 rounded-2xl overflow-hidden relative aspect-video">
            <Image src={data.supportingMediaUrl} alt={heading || ''} fill className="object-cover" />
          </div>
        )}
      </div>
    </Reveal>
  )
}

// ─── 5. METRIC GRID ───
export function MetricGridBlockRenderer({ data, locale }: { data: MetricGridBlockData; locale: Locale }) {
  const title = t(data as unknown as Record<string, unknown>, 'titleId', locale)
  return (
    <Reveal>
      <div className="max-w-5xl mx-auto">
        {title && <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-8 text-center">{title}</h2>}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.metrics.map((m, i) => {
            const numericVal = parseFloat(String(m.value).replace(/[^0-9.]/g, ''))
            const suffix = String(m.value).replace(/[0-9.]/g, '')
            return (
              <Reveal key={i} delay={i * 80}>
                <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold tabular-nums gradient-text mb-1">
                    {isNaN(numericVal) ? m.value : <Counter target={numericVal} suffix={suffix} />}
                  </div>
                  {m.unit && <div className="text-xs text-[var(--text-muted)] mb-1">{m.unit}</div>}
                  <div className="text-sm text-[var(--text-secondary)]">{t(m as unknown as Record<string, unknown>, 'labelId', locale)}</div>
                  {m.deltaDirection && (
                    <div className={`text-xs font-medium mt-1 ${m.deltaDirection === 'up' ? 'text-emerald-500' : m.deltaDirection === 'down' ? 'text-red-500' : 'text-[var(--text-muted)]'}`}>
                      {m.deltaDirection === 'up' ? '↑' : m.deltaDirection === 'down' ? '↓' : '→'} {m.delta || ''}
                    </div>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Reveal>
  )
}

// ─── 6. TIMELINE ───
export function TimelineBlockRenderer({ data, locale }: { data: TimelineBlockData; locale: Locale }) {
  const [active, setActive] = useState<number | null>(null)
  const title = t(data as unknown as Record<string, unknown>, 'titleId', locale)
  const milestones = data.milestones || []
  return (
    <Reveal>
      <div className="max-w-4xl mx-auto">
        {title && <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">{title}</h2>}
        {/* Desktop horizontal */}
        <div className="hidden sm:block relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-[var(--border-default)]" />
          <div className="flex gap-0 overflow-x-auto pb-4">
            {milestones.map((m, i) => {
              const mTitle = locale === 'en' ? (m.titleEn || m.titleId) : m.titleId
              const mDesc = locale === 'en' ? (m.descriptionEn || m.descriptionId) : m.descriptionId
              return (
                <div key={i} className="flex-1 min-w-[140px] text-center relative cursor-pointer" onClick={() => setActive(active === i ? null : i)}>
                  <div className={`w-4 h-4 rounded-full mx-auto relative z-10 border-2 transition-all ${active === i ? 'bg-brand-violet border-brand-violet scale-125' : 'bg-[var(--bg-surface)] border-brand-violet/50 hover:border-brand-violet'}`} />
                  <div className="mt-3">
                    <div className="text-xs text-brand-violet font-medium">{m.date}</div>
                    <div className="text-xs font-semibold text-[var(--text-primary)] mt-1">{mTitle}</div>
                  </div>
                  {active === i && mDesc && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-3 text-xs text-[var(--text-secondary)] z-20 shadow-lg text-left">
                      {mDesc}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        {/* Mobile vertical */}
        <div className="sm:hidden space-y-0">
          {milestones.map((m, i) => {
            const mTitle = locale === 'en' ? (m.titleEn || m.titleId) : m.titleId
            const mDesc = locale === 'en' ? (m.descriptionEn || m.descriptionId) : m.descriptionId
            return (
              <div key={i} className="relative pl-8 pb-6">
                <div className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-brand-violet" />
                {i < milestones.length - 1 && <div className="absolute left-[13px] top-4 bottom-0 w-0.5 bg-brand-violet/20" />}
                <div className="text-xs text-brand-violet font-medium">{m.date}</div>
                <div className="text-sm font-semibold text-[var(--text-primary)] mt-0.5">{mTitle}</div>
                {mDesc && <p className="text-sm text-[var(--text-secondary)] mt-1">{mDesc}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </Reveal>
  )
}

// ─── 7. CHART ───
const BRAND_COLORS = ['#7C3AED', '#DB2777', '#F97316', '#FCD34D', '#10B981', '#06B6D4']

export function ChartBlockRenderer({ data, locale }: { data: ChartBlockData; locale: Locale }) {
  const title = t(data as unknown as Record<string, unknown>, 'titleId', locale)
  const colors = data.colorScheme?.length ? data.colorScheme : BRAND_COLORS
  const dataset = data.dataset || []
  const yKeys = data.yKeys || ['value']

  const renderChart = () => {
    const commonProps = { data: dataset }
    const margin = { top: 10, right: 20, bottom: 20, left: 10 }

    if (data.chartType === 'donut') {
      return (
        <PieChart>
          <Pie data={dataset} dataKey={yKeys[0]} nameKey={data.xKey} cx="50%" cy="50%" outerRadius={100} innerRadius={60} paddingAngle={3}>
            {dataset.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )
    }
    if (data.chartType === 'bar' || data.chartType === 'stacked') {
      return (
        <BarChart {...commonProps} margin={margin}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
          <XAxis dataKey={data.xKey} tick={{ fontSize: 12 }} stroke="var(--text-muted)" />
          <YAxis tick={{ fontSize: 12 }} stroke="var(--text-muted)" />
          <Tooltip />
          {yKeys.length > 1 && <Legend />}
          {yKeys.map((key, i) => <Bar key={key} dataKey={key} fill={colors[i % colors.length]} stackId={data.chartType === 'stacked' ? 'stack' : undefined} radius={[4, 4, 0, 0]} />)}
        </BarChart>
      )
    }
    // line/area default
    const ChartComp = data.chartType === 'line' ? LineChart : AreaChart
    const DataComp = data.chartType === 'line' ? Line : Area
    return (
      <ChartComp {...commonProps} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
        <XAxis dataKey={data.xKey} tick={{ fontSize: 12 }} stroke="var(--text-muted)" />
        <YAxis tick={{ fontSize: 12 }} stroke="var(--text-muted)" />
        <Tooltip />
        {yKeys.length > 1 && <Legend />}
        {yKeys.map((key, i) => (
          <DataComp key={key} type="monotone" dataKey={key} stroke={colors[i % colors.length]} fill={colors[i % colors.length]} fillOpacity={0.15} strokeWidth={2} dot={false} />
        ))}
      </ChartComp>
    )
  }

  return (
    <Reveal>
      <div className="max-w-4xl mx-auto">
        {title && <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">{title}</h2>}
        {dataset.length > 0 ? (
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 sm:p-6">
            <ResponsiveContainer width="100%" height={300}>
              {renderChart()}
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[var(--border-default)] bg-[var(--bg-surface)] p-8 text-center text-[var(--text-muted)] text-sm">
            No chart data available
          </div>
        )}
        {t(data as unknown as Record<string, unknown>, 'sourceId', locale) && (
          <p className="text-xs text-[var(--text-muted)] mt-2">Source: {t(data as unknown as Record<string, unknown>, 'sourceId', locale)}</p>
        )}
      </div>
    </Reveal>
  )
}

// ─── 8. BEFORE/AFTER ───
export function BeforeAfterBlockRenderer({ data, locale }: { data: BeforeAfterBlockData; locale: Locale }) {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    setSliderPos(pct)
  }

  return (
    <Reveal>
      <div className="max-w-3xl mx-auto">
        <div
          ref={containerRef}
          className="relative rounded-2xl overflow-hidden cursor-col-resize select-none aspect-video bg-[var(--bg-surface)]"
          onMouseMove={e => handleMove(e.clientX)}
          onTouchMove={e => handleMove(e.touches[0].clientX)}
          role="slider"
          aria-valuenow={sliderPos}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'ArrowLeft') setSliderPos(p => Math.max(0, p - 2))
            if (e.key === 'ArrowRight') setSliderPos(p => Math.min(100, p + 2))
          }}
        >
          {/* After (full) */}
          {data.afterMediaUrl && (
            <Image src={data.afterMediaUrl} alt={t(data as unknown as Record<string, unknown>, 'afterLabelId', locale) || 'After'} fill className="object-cover" />
          )}
          {/* Before (clipped) */}
          {data.beforeMediaUrl && (
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
              <Image src={data.beforeMediaUrl} alt={t(data as unknown as Record<string, unknown>, 'beforeLabelId', locale) || 'Before'} fill className="object-cover" style={{ width: `${100 / (sliderPos / 100)}%`, maxWidth: 'none' }} />
            </div>
          )}
          {/* Divider */}
          <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg" style={{ left: `${sliderPos}%` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center">
              <svg className="w-4 h-4 text-[#0F0A1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
              </svg>
            </div>
          </div>
          {/* Labels */}
          <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
            {t(data as unknown as Record<string, unknown>, 'beforeLabelId', locale) || 'Before'}
          </div>
          <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
            {t(data as unknown as Record<string, unknown>, 'afterLabelId', locale) || 'After'}
          </div>
        </div>
        {t(data as unknown as Record<string, unknown>, 'captionId', locale) && (
          <p className="text-sm text-center text-[var(--text-muted)] mt-3">{t(data as unknown as Record<string, unknown>, 'captionId', locale)}</p>
        )}
      </div>
    </Reveal>
  )
}

// ─── 9. GALLERY ───
export function GalleryBlockRenderer({ data, locale }: { data: GalleryBlockData; locale: Locale }) {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const items = data.items || []
  const cols = data.layout === 'grid-2' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  return (
    <Reveal>
      <div className="max-w-5xl mx-auto">
        {t(data as unknown as Record<string, unknown>, 'titleId', locale) && (
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">{t(data as unknown as Record<string, unknown>, 'titleId', locale)}</h2>
        )}
        <div className={`grid ${cols} gap-4`}>
          {items.map((item, i) => (
            <button key={i} onClick={() => setLightbox(i)} className="group relative rounded-xl overflow-hidden aspect-video bg-[var(--bg-surface)] focus:outline-none focus:ring-2 focus:ring-brand-violet">
              <Image src={item.mediaUrl} alt={item.alt || t(item as unknown as Record<string, unknown>, 'captionId', locale) || ''} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </button>
          ))}
        </div>
        {/* Lightbox */}
        {lightbox !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
            <button className="absolute top-4 right-4 text-white text-2xl">✕</button>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl p-2" onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? Math.max(0, l - 1) : null) }}>‹</button>
            <div className="relative max-w-4xl w-full aspect-video" onClick={e => e.stopPropagation()}>
              <Image src={items[lightbox].mediaUrl} alt={items[lightbox].alt || ''} fill className="object-contain" />
            </div>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl p-2" onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? Math.min(items.length - 1, l + 1) : null) }}>›</button>
          </div>
        )}
      </div>
    </Reveal>
  )
}

// ─── 10. VIDEO ───
export function VideoBlockRenderer({ data, locale }: { data: VideoBlockData; locale: Locale }) {
  const embedSrc = data.provider === 'youtube'
    ? `https://www.youtube.com/embed/${data.src.replace(/.*v=/, '').replace(/&.*/, '')}`
    : data.provider === 'vimeo'
    ? `https://player.vimeo.com/video/${data.src.replace(/.*vimeo.com\//, '')}`
    : null
  return (
    <Reveal>
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden aspect-video bg-[var(--bg-surface)] border border-[var(--border-default)]">
          {embedSrc ? (
            <iframe src={embedSrc} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full" title={t(data as unknown as Record<string, unknown>, 'captionId', locale) || 'Video'} />
          ) : data.src ? (
            <video src={data.src} poster={data.posterUrl} controls muted className="w-full h-full" />
          ) : null}
        </div>
        {t(data as unknown as Record<string, unknown>, 'captionId', locale) && (
          <p className="text-sm text-center text-[var(--text-muted)] mt-3">{t(data as unknown as Record<string, unknown>, 'captionId', locale)}</p>
        )}
      </div>
    </Reveal>
  )
}

// ─── 11. QUOTE ───
export function QuoteBlockRenderer({ data, locale }: { data: QuoteBlockData; locale: Locale }) {
  const quote = t(data as unknown as Record<string, unknown>, 'quoteId', locale)
  return (
    <Reveal>
      <div className="max-w-3xl mx-auto text-center py-6">
        <div className="text-6xl gradient-text font-serif leading-none mb-4 select-none" aria-hidden>&ldquo;</div>
        <blockquote className="text-xl sm:text-2xl font-medium text-[var(--text-primary)] leading-relaxed italic mb-6">
          {quote}
        </blockquote>
        <div className="flex items-center justify-center gap-3">
          {data.authorAvatar && (
            <div className="w-12 h-12 rounded-full overflow-hidden relative flex-shrink-0">
              <Image src={data.authorAvatar} alt={data.authorName} fill className="object-cover" />
            </div>
          )}
          <div className="text-left">
            <div className="font-semibold text-[var(--text-primary)]">{data.authorName}</div>
            {(data.authorRole || data.authorCompany) && (
              <div className="text-sm text-[var(--text-secondary)]">{[data.authorRole, data.authorCompany].filter(Boolean).join(' · ')}</div>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

// ─── 12. SERVICES USED ───
export function ServicesUsedBlockRenderer({ data, locale, allServices }: {
  data: ServicesUsedBlockData; locale: Locale
  allServices?: Array<{ id: string; name: string; slug: string; color: string; icon?: string | null }>
}) {
  const services = allServices?.filter(s => data.serviceIds.includes(s.id)) || []
  const desc = t(data as unknown as Record<string, unknown>, 'customDescriptionId', locale)
  return (
    <Reveal>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">{locale === 'en' ? 'Services Used' : 'Layanan yang Digunakan'}</h2>
        {desc && <p className="text-[var(--text-secondary)] mb-6">{desc}</p>}
        <div className="flex flex-wrap gap-3">
          {services.map(s => (
            <Link key={s.id} href={`/${locale === 'en' ? 'en/' : ''}services/${s.slug}`} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--border-hover)] hover:shadow-md transition-all group">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-brand-violet transition-colors">{s.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

// ─── 13. RELATED CASES (placeholder — rendered server-side in parent) ───
export function RelatedCasesBlockRenderer({ locale }: { data: RelatedCasesBlockData; locale: Locale; cases?: unknown[] }) {
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">{locale === 'en' ? 'Related Case Studies' : 'Studi Kasus Terkait'}</h2>
    </div>
  )
}

// ─── 14. CTA ───
export function CtaBlockRenderer({ data, locale }: { data: CtaBlockData; locale: Locale }) {
  const heading = t(data as unknown as Record<string, unknown>, 'headingId', locale)
  const body = t(data as unknown as Record<string, unknown>, 'bodyId', locale)
  const primaryLabel = t(data as unknown as Record<string, unknown>, 'primaryCtaLabelId', locale)
  const dark = data.variant === 'dark-band'
  return (
    <Reveal>
      <div className={`rounded-3xl p-8 sm:p-12 text-center ${dark ? 'bg-[#0F0A1E] text-white' : 'bg-brand-violet/5 border border-brand-violet/20'}`}>
        <h2 className={`text-3xl sm:text-4xl font-extrabold mb-3 ${dark ? 'text-white' : 'text-[var(--text-primary)]'}`}>{heading}</h2>
        {body && <p className={`text-lg mb-8 max-w-xl mx-auto ${dark ? 'text-white/70' : 'text-[var(--text-secondary)]'}`}>{body}</p>}
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href={data.primaryCtaHref} className="gradient-bg px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity">
            {primaryLabel}
          </Link>
          {data.secondaryCtaHref && t(data as unknown as Record<string, unknown>, 'secondaryCtaLabelId', locale) && (
            <Link href={data.secondaryCtaHref} className={`px-6 py-3 rounded-xl font-semibold border transition-colors ${dark ? 'border-white/30 text-white hover:bg-white/10' : 'border-[var(--border-default)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'}`}>
              {t(data as unknown as Record<string, unknown>, 'secondaryCtaLabelId', locale)}
            </Link>
          )}
        </div>
      </div>
    </Reveal>
  )
}

// ─── 15. LEAD FORM (simplified) ───
export function LeadFormBlockRenderer({ locale }: { data: LeadFormBlockData; locale: Locale }) {
  const href = locale === 'en' ? '/en/contact' : '/contact'
  return (
    <Reveal>
      <div className="max-w-xl mx-auto text-center rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
          {locale === 'en' ? 'Ready to grow?' : 'Siap untuk berkembang?'}
        </h2>
        <p className="text-[var(--text-secondary)] mb-6 text-sm">
          {locale === 'en' ? "Let's discuss your goals and build a strategy that delivers." : 'Konsultasikan kebutuhan bisnis Anda dengan tim kami.'}
        </p>
        <Link href={href} className="gradient-bg px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity inline-block">
          {locale === 'en' ? 'Contact Us' : 'Hubungi Kami'}
        </Link>
      </div>
    </Reveal>
  )
}

// ─── 16. FAQ ───
export function FaqBlockRenderer({ data, locale }: { data: FaqBlockData; locale: Locale }) {
  const [open, setOpen] = useState<number | null>(null)
  const title = t(data as unknown as Record<string, unknown>, 'titleId', locale) || (locale === 'en' ? 'Frequently Asked Questions' : 'Pertanyaan yang Sering Diajukan')
  const items = data.items || []
  return (
    <Reveal>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">{title}</h2>
        <div className="space-y-2">
          {items.map((item, i) => {
            const q = t(item as unknown as Record<string, unknown>, 'questionId', locale)
            const a = t(item as unknown as Record<string, unknown>, 'answerId', locale)
            return (
              <div key={i} className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                  aria-expanded={open === i}
                >
                  <span className="font-medium text-[var(--text-primary)]">{q}</span>
                  <span className={`text-[var(--text-muted)] transition-transform flex-shrink-0 ${open === i ? 'rotate-180' : ''}`}>▾</span>
                </button>
                {open === i && (
                  <div className="px-5 pb-4 text-[var(--text-secondary)] text-sm leading-relaxed border-t border-[var(--border-default)] pt-3">
                    {a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </Reveal>
  )
}

// ─── 17. RICH TEXT ───
export function RichTextBlockRenderer({ data, locale }: { data: RichTextBlockData; locale: Locale }) {
  const content = t(data as unknown as Record<string, unknown>, 'contentId', locale)
  return (
    <Reveal>
      <div
        className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert text-[var(--text-secondary)]"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Reveal>
  )
}
