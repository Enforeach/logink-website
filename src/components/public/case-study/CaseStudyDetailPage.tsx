'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { WHATSAPP_URL } from '@/lib/constants'
import { serviceAccent } from '@/components/public/CaseStudyCard'
import type { CaseStudyFull } from '@/types/case-study'
import type {
  HeroBlockData, OverviewBlockData, ClientSnapshotBlockData, NarrativeBlockData,
  MetricGridBlockData, TimelineBlockData, ChartBlockData, BeforeAfterBlockData,
  GalleryBlockData, VideoBlockData, QuoteBlockData, ServicesUsedBlockData,
  RelatedCasesBlockData, CtaBlockData, LeadFormBlockData, FaqBlockData, RichTextBlockData,
} from '@/types/case-study'
import {
  Counter,
  HeroBlockRenderer, OverviewBlockRenderer, ClientSnapshotBlockRenderer, NarrativeBlockRenderer,
  MetricGridBlockRenderer, TimelineBlockRenderer, ChartBlockRenderer, BeforeAfterBlockRenderer,
  GalleryBlockRenderer, VideoBlockRenderer, QuoteBlockRenderer, ServicesUsedBlockRenderer,
  RelatedCasesBlockRenderer, CtaBlockRenderer, LeadFormBlockRenderer, FaqBlockRenderer, RichTextBlockRenderer,
} from './blocks'

type Locale = 'id' | 'en'

function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-16 px-4 ${className}`}>
      {children}
    </section>
  )
}

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[var(--border-default)]">
      <div className="h-full gradient-bg transition-[width] duration-100" style={{ width: `${progress}%` }} />
    </div>
  )
}

const SECTION_NAV_ID: Record<string, string> = {
  HERO: 'hero',
  OVERVIEW: 'overview',
  CLIENT_SNAPSHOT: 'client',
  NARRATIVE: 'challenge',
  METRIC_GRID: 'results',
  TIMELINE: 'timeline',
  CHART: 'results',
  QUOTE: 'testimonial',
  CTA: 'cta',
  FAQ: 'faq',
}

interface Props {
  caseStudy: CaseStudyFull
  locale: Locale
  relatedCases?: Array<{ id: string; title: string; titleId?: string | null; titleEn?: string | null; slug: string; slugEn?: string | null; industry: string; thumbnail?: string | null; featuredImage?: string | null; metrics: Array<{ metricLabel: string; afterValue: string }> }>
  allServices?: Array<{ id: string; name: string; slug: string; color: string; icon?: string | null }>
}

export function CaseStudyDetailPage({ caseStudy: cs, locale, relatedCases = [], allServices = [] }: Props) {
  const [activeSection, setActiveSection] = useState('')
  const [showMobileBar, setShowMobileBar] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(64)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = document.querySelector('header')
    if (!header) return
    // ResizeObserver fires once on observe(), which also handles the initial measurement
    const ro = new ResizeObserver(() => setHeaderHeight(header.offsetHeight))
    ro.observe(header)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    document.querySelectorAll('[data-nav-section]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const heroBottom = heroRef.current?.getBoundingClientRect().bottom ?? 0
      setShowMobileBar(heroBottom < 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const title = locale === 'en'
    ? (cs.titleEn || cs.titleId || cs.title)
    : (cs.titleId || cs.title)
  const subtitle = locale === 'en' ? (cs.subtitleEn || cs.subtitleId) : cs.subtitleId

  const allServicesUsed = [
    ...(cs.service ? [cs.service] : []),
    ...(cs.caseStudyServices?.map(css => css.service) || []),
  ].filter((s, i, arr) => arr.findIndex(x => x.id === s.id) === i)

  const industryName = locale === 'en'
    ? (cs.industryRel?.nameEn || cs.industryRel?.nameId || cs.industry)
    : (cs.industryRel?.nameId || cs.industry)

  // Build breadcrumb
  const breadcrumb = locale === 'en'
    ? [{ label: 'Home', href: '/en' }, { label: 'Portfolio', href: '/en/portfolio' }, { label: title || '', href: '#' }]
    : [{ label: 'Home', href: '/' }, { label: 'Portfolio', href: '/portfolio' }, { label: title || '', href: '#' }]

  // Derive nav items from blocks
  const blocks = cs.blocks || []
  const navSections = [
    { id: 'overview', labelId: 'Ringkasan', labelEn: 'Overview' },
    { id: 'challenge', labelId: 'Tantangan', labelEn: 'Challenge' },
    { id: 'strategy', labelId: 'Strategi', labelEn: 'Strategy' },
    { id: 'results', labelId: 'Hasil', labelEn: 'Results' },
    { id: 'testimonial', labelId: 'Testimoni', labelEn: 'Testimonial' },
  ]

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      <ReadingProgressBar />

      {/* Breadcrumb */}
      <div className="pt-24 pb-3 px-4 max-w-5xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)]" aria-label="Breadcrumb">
          {breadcrumb.map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span aria-hidden>›</span>}
              {i < breadcrumb.length - 1 ? (
                <Link href={item.href} className="hover:text-[var(--text-primary)] transition-colors">{item.label}</Link>
              ) : (
                <span className="text-[var(--text-primary)] line-clamp-1 max-w-[200px]">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Hero: blocks OR legacy fallback */}
      <div ref={heroRef}>
        {blocks.some(b => b.blockType === 'HERO') ? (
          blocks.filter(b => b.blockType === 'HERO').map(b => (
            <Section key={b.id} id="hero" className="pt-0 pb-0 bg-[var(--bg-elevated)]">
              <HeroBlockRenderer
                data={b.data as HeroBlockData}
                locale={locale}
                clientName={cs.clientName}
                clientLogo={cs.clientLogo}
                durationLabel={cs.durationLabel}
                services={allServicesUsed}
                featuredImage={cs.featuredImage}
              />
            </Section>
          ))
        ) : (
          // Legacy header fallback — light "Warm Canvas" hero
          <section className="relative px-6 py-16 overflow-hidden mesh-gradient">
            {cs.featuredImage && (
              <div className="absolute inset-0">
                <Image src={cs.featuredImage} alt={title || cs.clientName} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-b from-[#231A26]/65 via-[#231A26]/45 to-[#231A26]/85" />
              </div>
            )}
            <div className={`relative max-w-4xl mx-auto ${cs.featuredImage ? 'pt-20 pb-10' : 'pt-10 pb-6'}`}>
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {industryName && (
                  <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${cs.featuredImage ? 'bg-white/15 text-white backdrop-blur-sm' : 'bg-brand-crimson/10 text-brand-crimson'}`}>
                    {industryName}
                  </span>
                )}
                {allServicesUsed.map(s => {
                  const accent = serviceAccent(s.color)
                  return (
                    <span
                      key={s.id}
                      className={`text-xs px-3 py-1.5 rounded-full font-semibold ${cs.featuredImage ? 'text-white' : ''}`}
                      style={cs.featuredImage
                        ? { backgroundColor: accent }
                        : { color: `color-mix(in srgb, ${accent} 65%, #231A26)`, backgroundColor: `color-mix(in srgb, ${accent} 12%, white)` }}
                    >
                      {s.name}
                    </span>
                  )
                })}
              </div>
              <h1 className={`font-display font-bold tracking-[-0.03em] leading-[1.08] text-[clamp(2.75rem,6vw,4.5rem)] mb-4 ${cs.featuredImage ? 'text-white' : 'text-[var(--text-primary)]'}`}>{title}</h1>
              {subtitle && <p className={`text-xl mb-6 leading-relaxed ${cs.featuredImage ? 'text-white/80' : 'text-[var(--text-secondary)]'}`}>{subtitle}</p>}
              <div className="flex flex-wrap items-center gap-3">
                {cs.clientLogo && (
                  <div className={`h-10 w-24 relative rounded-lg overflow-hidden ${cs.featuredImage ? 'bg-white/90' : 'bg-white border border-[var(--border-default)]'}`}>
                    <Image src={cs.clientLogo} alt={cs.clientName} fill className="object-contain p-1" />
                  </div>
                )}
                <span className={`text-sm font-medium ${cs.featuredImage ? 'text-white/80' : 'text-[var(--text-secondary)]'}`}>{cs.clientName}</span>
                {cs.durationLabel && <span className={`text-sm px-3 py-1 rounded-full border ${cs.featuredImage ? 'bg-white/10 border-white/20 text-white/80' : 'bg-white border-[var(--border-default)] text-[var(--text-secondary)]'}`}>{cs.durationLabel}</span>}
              </div>
              {/* Before → after metric cards */}
              {cs.metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
                  {cs.metrics.slice(0, 3).map((m, i) => {
                    const numericVal = parseFloat(String(m.afterValue).replace(/[^0-9.]/g, ''))
                    const suffix = String(m.afterValue).replace(/[0-9.,]/g, '')
                    return (
                      <div key={i} className="rounded-2xl bg-white/95 backdrop-blur-sm border border-[var(--border-default)] p-5 text-center shadow-card">
                        <div className="flex items-center justify-center gap-2">
                          {m.beforeValue && (
                            <>
                              <span className="text-base font-medium text-[var(--text-muted)] tabular-nums">{m.beforeValue}</span>
                              <span className="text-brand-orange" aria-hidden>→</span>
                            </>
                          )}
                          <span className="font-display text-3xl font-bold tracking-tight gradient-text tabular-nums">
                            {isNaN(numericVal) ? m.afterValue : <Counter target={numericVal} suffix={suffix} />}
                          </span>
                        </div>
                        <div className="text-sm mt-1 text-[var(--text-secondary)]">{m.metricLabel}</div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {/* Sticky sub-nav: offset matches the full header height (navbar + optional announcement bar) */}
      <div className="sticky z-30 bg-[var(--bg-primary)]/95 backdrop-blur border-b border-[var(--border-default)]" style={{ top: headerHeight }}>
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-12">
          <nav className="flex gap-5 overflow-x-auto scrollbar-hide" aria-label="In-page navigation">
            {navSections.map(s => (
              <a key={s.id} href={`#${s.id}`} className={`whitespace-nowrap text-sm font-medium transition-colors ${activeSection === s.id ? 'text-brand-crimson' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}>
                {locale === 'en' ? s.labelEn : s.labelId}
              </a>
            ))}
          </nav>
          <Link href={locale === 'en' ? '/en/contact' : '/contact'} className="hidden sm:block gradient-bg shadow-cta text-white text-xs font-semibold px-4 py-2 rounded-full hover:scale-[1.02] hover:brightness-105 transition-all whitespace-nowrap ml-4">
            {locale === 'en' ? 'Start a project' : 'Mulai proyek'}
          </Link>
        </div>
      </div>

      {/* All blocks */}
      <main id="main-content">
        {(() => { const nonHero = blocks.filter(b => b.blockType !== 'HERO'); return nonHero.map((block, i) => {
          const sectionId = SECTION_NAV_ID[block.blockType] || `block-${i}`
          const altBg = i % 2 === 0 ? '' : 'bg-white'

          const inner = (() => {
            switch (block.blockType) {
              case 'OVERVIEW':
                return <OverviewBlockRenderer data={block.data as OverviewBlockData} locale={locale} />
              case 'CLIENT_SNAPSHOT':
                return <ClientSnapshotBlockRenderer data={block.data as ClientSnapshotBlockData} locale={locale} clientName={cs.clientName} clientLogo={cs.clientLogo} />
              case 'NARRATIVE': {
                // 01/02/03 oversized numerals behind Challenge→Strategy→Results headings
                const num = nonHero.slice(0, i + 1).filter(b => b.blockType === 'NARRATIVE').length
                return <NarrativeBlockRenderer data={block.data as NarrativeBlockData} locale={locale} num={String(num).padStart(2, '0')} />
              }
              case 'METRIC_GRID':
                return <MetricGridBlockRenderer data={block.data as MetricGridBlockData} locale={locale} />
              case 'TIMELINE':
                return <TimelineBlockRenderer data={block.data as TimelineBlockData} locale={locale} />
              case 'CHART':
                return <ChartBlockRenderer data={block.data as ChartBlockData} locale={locale} />
              case 'BEFORE_AFTER':
                return <BeforeAfterBlockRenderer data={block.data as BeforeAfterBlockData} locale={locale} />
              case 'GALLERY':
                return <GalleryBlockRenderer data={block.data as GalleryBlockData} locale={locale} />
              case 'VIDEO':
                return <VideoBlockRenderer data={block.data as VideoBlockData} locale={locale} />
              case 'QUOTE':
                return <QuoteBlockRenderer data={block.data as QuoteBlockData} locale={locale} />
              case 'SERVICES_USED':
                return <ServicesUsedBlockRenderer data={block.data as ServicesUsedBlockData} locale={locale} allServices={allServices} />
              case 'RELATED_CASES':
                return <RelatedCasesBlockRenderer data={block.data as RelatedCasesBlockData} locale={locale} />
              case 'CTA':
                return <CtaBlockRenderer data={block.data as CtaBlockData} locale={locale} />
              case 'LEAD_FORM':
                return <LeadFormBlockRenderer data={block.data as LeadFormBlockData} locale={locale} />
              case 'FAQ':
                return <FaqBlockRenderer data={block.data as FaqBlockData} locale={locale} />
              case 'RICH_TEXT':
                return <RichTextBlockRenderer data={block.data as RichTextBlockData} locale={locale} />
              default:
                return null
            }
          })()

          if (!inner) return null
          return (
            <Section key={block.id} id={sectionId} className={altBg}>
              <div data-nav-section id={sectionId + '-marker'} className="invisible h-0" />
              {inner}
            </Section>
          )
        }) })()}

        {/* If no blocks: render legacy content as numbered 01/02/03 sections */}
        {blocks.length === 0 && (
          <>
            {([
              { id: 'challenge', num: '01', label: locale === 'en' ? 'Challenge' : 'Tantangan', body: cs.challenge, bg: 'bg-white' },
              { id: 'strategy', num: '02', label: locale === 'en' ? 'Strategy' : 'Strategi', body: cs.strategy, bg: '' },
              { id: 'results', num: '03', label: locale === 'en' ? 'Results' : 'Hasil', body: cs.results, bg: 'bg-[var(--bg-tint-peach)]' },
            ] as const).map(s => (
              <Section key={s.id} id={s.id} className={s.bg}>
                <div className="max-w-3xl mx-auto relative">
                  <span className="absolute -top-14 -left-4 sm:-left-12 font-display font-bold text-[7rem] leading-none text-[var(--text-primary)] opacity-[0.08] select-none pointer-events-none" aria-hidden>
                    {s.num}
                  </span>
                  <h2 className="relative font-display font-bold tracking-[-0.03em] text-3xl text-[var(--text-primary)] mb-5">{s.label}</h2>
                  <p className="relative text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap max-w-prose">{s.body}</p>
                </div>
              </Section>
            ))}
            {cs.testimonial && (
              <Section id="testimonial">
                <div className="max-w-3xl mx-auto rounded-3xl bg-[var(--bg-tint-peach)] p-8 sm:p-12 text-center relative overflow-hidden">
                  <div className="font-display text-8xl gradient-text leading-none mb-2 select-none" aria-hidden>&ldquo;</div>
                  <blockquote className="text-xl font-medium text-[var(--text-primary)] leading-relaxed italic mb-6">
                    &ldquo;{cs.testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="font-semibold text-[var(--text-primary)]">{cs.testimonial.clientName}</div>
                  <div className="text-sm text-[var(--text-secondary)]">{cs.testimonial.clientTitle} · {cs.testimonial.companyName}</div>
                </div>
              </Section>
            )}
          </>
        )}

        {/* Related cases */}
        {relatedCases.length > 0 && (
          <Section className="bg-white">
            <div className="max-w-5xl mx-auto">
              <p className="eyebrow mb-2">{locale === 'en' ? 'More work' : 'Karya lainnya'}</p>
              <h2 className="font-display font-bold tracking-[-0.03em] text-2xl text-[var(--text-primary)] mb-6">{locale === 'en' ? 'Related Case Studies' : 'Studi Kasus Terkait'}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedCases.map(rc => {
                  const rcTitle = locale === 'en' ? (rc.titleEn || rc.titleId || rc.title) : (rc.titleId || rc.title)
                  const rcSlug = locale === 'en' ? (rc.slugEn || rc.slug) : rc.slug
                  const href = locale === 'en' ? `/en/portfolio/${rcSlug}` : `/portfolio/${rcSlug}`
                  const topMetric = rc.metrics[0]
                  return (
                    <Link key={rc.id} href={href} className="group rounded-2xl border border-[var(--border-default)] bg-white overflow-hidden hover:shadow-card hover:-translate-y-1 transition-all duration-300 hover:border-[var(--border-hover)]">
                      {(rc.featuredImage || rc.thumbnail) && (
                        <div className="aspect-video relative bg-[var(--bg-tint-peach)] overflow-hidden">
                          <Image src={(rc.featuredImage || rc.thumbnail)!} alt={rcTitle || ''} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                      )}
                      <div className="p-4">
                        <p className="text-xs text-[var(--text-muted)] mb-1">{rc.industry}</p>
                        <p className="font-semibold text-[var(--text-primary)] line-clamp-2 group-hover:text-brand-crimson transition-colors">{rcTitle}</p>
                        {topMetric && (
                          <p className="mt-2 text-xs font-medium text-[var(--text-muted)]">
                            <span className="font-display text-base font-bold gradient-text tabular-nums">{/^[+-]/.test(topMetric.afterValue) ? topMetric.afterValue : `+${topMetric.afterValue}`}</span>{' '}
                            {topMetric.metricLabel}
                          </p>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </Section>
        )}

        {/* Closing CTA — only when the page doesn't already end on a CTA block */}
        {!blocks.some(b => b.blockType === 'CTA') && (
          <Section>
            <div className="max-w-4xl mx-auto rounded-3xl bg-[var(--bg-ink)] text-[var(--text-on-ink)] p-8 sm:p-14 text-center relative overflow-hidden">
              <div className="orb -top-20 -right-20 h-64 w-64 bg-brand-coral/30" aria-hidden />
              <div className="relative">
                <h2 className="font-display font-bold tracking-[-0.03em] text-3xl sm:text-4xl mb-3">
                  {locale === 'en' ? 'Want results like this?' : 'Ingin hasil seperti ini?'}
                </h2>
                <p className="text-[var(--text-on-ink)]/70 mb-8 max-w-xl mx-auto">
                  {locale === 'en'
                    ? "Let's talk about what these numbers could look like for your brand."
                    : 'Mari diskusikan seperti apa angka-angka ini untuk brand Anda.'}
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <Link
                    href={locale === 'en' ? '/en/contact' : '/contact'}
                    className="group inline-flex items-center gap-2 gradient-bg shadow-cta text-white font-semibold rounded-full px-7 py-3.5 hover:scale-[1.02] hover:brightness-105 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {locale === 'en' ? 'Get a Quote' : 'Dapatkan Penawaran'}
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                  </Link>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white hover:scale-[1.02] hover:brightness-105 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    style={{ background: '#25D366' }}
                    aria-label="Chat via WhatsApp"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </Section>
        )}
      </main>

      {/* Mobile sticky action bar */}
      {showMobileBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[var(--bg-surface)]/95 backdrop-blur border-t border-[var(--border-default)] px-4 py-3 flex gap-3">
          <Link href={locale === 'en' ? '/en/contact' : '/contact'} className="flex-1 gradient-bg shadow-cta text-white text-sm font-semibold py-2.5 rounded-full text-center hover:brightness-105 transition-all">
            {locale === 'en' ? 'Get a Quote' : 'Dapatkan Penawaran'}
          </Link>
          <button onClick={() => navigator.share?.({ title: title || '', url: window.location.href })} className="px-4 py-2.5 rounded-full border border-[var(--border-hover)] bg-white text-sm text-[var(--text-primary)]">
            Share
          </button>
        </div>
      )}
    </div>
  )
}

