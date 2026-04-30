'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { CaseStudyFull } from '@/types/case-study'
import type {
  HeroBlockData, OverviewBlockData, ClientSnapshotBlockData, NarrativeBlockData,
  MetricGridBlockData, TimelineBlockData, ChartBlockData, BeforeAfterBlockData,
  GalleryBlockData, VideoBlockData, QuoteBlockData, ServicesUsedBlockData,
  RelatedCasesBlockData, CtaBlockData, LeadFormBlockData, FaqBlockData, RichTextBlockData,
} from '@/types/case-study'
import {
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
  const heroRef = useRef<HTMLDivElement>(null)

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
              />
            </Section>
          ))
        ) : (
          // Legacy header fallback
          <section className="px-4 py-12 mesh-gradient">
            <div className="max-w-4xl mx-auto">
              {industryName && (
                <div className="inline-block px-4 py-1.5 rounded-full border border-brand-violet/30 bg-brand-violet/10 text-brand-violet text-sm font-medium mb-5">
                  {industryName}
                </div>
              )}
              <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] mb-4 leading-tight">{title}</h1>
              {subtitle && <p className="text-xl text-[var(--text-secondary)] mb-6">{subtitle}</p>}
              <div className="flex flex-wrap items-center gap-3">
                {cs.clientLogo && (
                  <div className="h-10 w-24 relative">
                    <Image src={cs.clientLogo} alt={cs.clientName} fill className="object-contain" />
                  </div>
                )}
                <span className="text-[var(--text-secondary)]">{cs.clientName}</span>
                {cs.durationLabel && <span className="text-sm px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-secondary)]">{cs.durationLabel}</span>}
                {allServicesUsed.map(s => (
                  <span key={s.id} className="text-xs px-3 py-1 rounded-full font-medium text-white" style={{ backgroundColor: s.color }}>{s.name}</span>
                ))}
              </div>
              {/* Legacy metrics as counters */}
              {cs.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-[var(--border-default)]">
                  {cs.metrics.slice(0, 3).map((m, i) => (
                    <div key={i} className="text-center">
                      <div className="text-3xl font-extrabold gradient-text">{m.afterValue}</div>
                      <div className="text-sm text-[var(--text-secondary)] mt-1">{m.metricLabel}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {/* Sticky sub-nav */}
      <div className="sticky top-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur border-b border-[var(--border-default)]">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-12">
          <nav className="flex gap-5 overflow-x-auto scrollbar-hide" aria-label="In-page navigation">
            {navSections.map(s => (
              <a key={s.id} href={`#${s.id}`} className={`whitespace-nowrap text-sm font-medium transition-colors ${activeSection === s.id ? 'text-brand-violet' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}>
                {locale === 'en' ? s.labelEn : s.labelId}
              </a>
            ))}
          </nav>
          <Link href={locale === 'en' ? '/en/contact' : '/contact'} className="hidden sm:block gradient-bg text-white text-xs font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap ml-4">
            {locale === 'en' ? 'Start a project' : 'Mulai proyek'}
          </Link>
        </div>
      </div>

      {/* All blocks */}
      <main id="main-content">
        {blocks.filter(b => b.blockType !== 'HERO').map((block, i) => {
          const sectionId = SECTION_NAV_ID[block.blockType] || `block-${i}`
          const altBg = i % 2 === 0 ? '' : 'bg-[var(--bg-surface)]'

          const inner = (() => {
            switch (block.blockType) {
              case 'OVERVIEW':
                return <OverviewBlockRenderer data={block.data as OverviewBlockData} locale={locale} />
              case 'CLIENT_SNAPSHOT':
                return <ClientSnapshotBlockRenderer data={block.data as ClientSnapshotBlockData} locale={locale} clientName={cs.clientName} clientLogo={cs.clientLogo} />
              case 'NARRATIVE':
                return <NarrativeBlockRenderer data={block.data as NarrativeBlockData} locale={locale} />
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
        })}

        {/* If no blocks at all — render legacy content */}
        {blocks.length === 0 && (
          <>
            <Section id="challenge" className="bg-[var(--bg-surface)]">
              <div className="max-w-3xl mx-auto">
                <p className="text-sm font-semibold text-brand-violet uppercase tracking-wider mb-2">{locale === 'en' ? 'Challenge' : 'Tantangan'}</p>
                <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">{cs.challenge}</p>
              </div>
            </Section>
            <Section id="strategy">
              <div className="max-w-3xl mx-auto">
                <p className="text-sm font-semibold text-[#F97316] uppercase tracking-wider mb-2">{locale === 'en' ? 'Strategy' : 'Strategi'}</p>
                <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">{cs.strategy}</p>
              </div>
            </Section>
            <Section id="results" className="bg-[var(--bg-surface)]">
              <div className="max-w-3xl mx-auto">
                <p className="text-sm font-semibold text-emerald-500 uppercase tracking-wider mb-2">{locale === 'en' ? 'Results' : 'Hasil'}</p>
                <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">{cs.results}</p>
              </div>
            </Section>
            {cs.testimonial && (
              <Section id="testimonial">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="text-6xl gradient-text font-serif leading-none mb-4" aria-hidden>&ldquo;</div>
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
          <Section className="bg-[var(--bg-surface)]">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">{locale === 'en' ? 'Related Case Studies' : 'Studi Kasus Terkait'}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedCases.map(rc => {
                  const rcTitle = locale === 'en' ? (rc.titleEn || rc.titleId || rc.title) : (rc.titleId || rc.title)
                  const rcSlug = locale === 'en' ? (rc.slugEn || rc.slug) : rc.slug
                  const href = locale === 'en' ? `/en/portfolio/${rcSlug}` : `/portfolio/${rcSlug}`
                  const topMetric = rc.metrics[0]
                  return (
                    <Link key={rc.id} href={href} className="group rounded-2xl border border-[var(--border-default)] bg-[var(--bg-primary)] overflow-hidden hover:shadow-xl transition-all hover:border-[var(--border-hover)]">
                      {(rc.featuredImage || rc.thumbnail) && (
                        <div className="aspect-video relative bg-[var(--bg-elevated)] overflow-hidden">
                          <Image src={(rc.featuredImage || rc.thumbnail)!} alt={rcTitle || ''} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                      )}
                      <div className="p-4">
                        <p className="text-xs text-[var(--text-muted)] mb-1">{rc.industry}</p>
                        <p className="font-semibold text-[var(--text-primary)] line-clamp-2 group-hover:text-brand-violet transition-colors">{rcTitle}</p>
                        {topMetric && <p className="text-xs text-brand-violet font-medium mt-2">+{topMetric.afterValue} {topMetric.metricLabel}</p>}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </Section>
        )}
      </main>

      {/* Mobile sticky action bar */}
      {showMobileBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[var(--bg-surface)]/95 backdrop-blur border-t border-[var(--border-default)] px-4 py-3 flex gap-3">
          <Link href={locale === 'en' ? '/en/contact' : '/contact'} className="flex-1 gradient-bg text-white text-sm font-semibold py-2.5 rounded-xl text-center hover:opacity-90 transition-opacity">
            {locale === 'en' ? 'Get a Quote' : 'Dapatkan Penawaran'}
          </Link>
          <button onClick={() => navigator.share?.({ title: title || '', url: window.location.href })} className="px-4 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] text-sm">
            Share
          </button>
        </div>
      )}
    </div>
  )
}

