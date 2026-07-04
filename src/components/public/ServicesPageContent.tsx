import { ArrowRight } from 'lucide-react'
import { ServiceRow } from '@/components/public/ServiceCard'
import type { ServiceData, PricingTierData } from '@/types'
import { CTASection } from '@/components/public/CTASection'
import { prisma } from '@/lib/prisma'
import type { Locale } from '@/lib/i18n'

const COPY = {
  id: {
    badge: 'Layanan Kami',
    headline: '360° Layanan Digital',
    headlineGradient: 'Marketing',
    desc: 'Lima layanan terintegrasi yang bekerja sebagai satu sistem, bukan agensi-agensi yang terpisah.',
    startingFrom: 'Mulai dari',
    learnMore: 'Pelajari lebih lanjut',
    integrationHeadline: 'Semua Layanan Bekerja',
    integrationGradient: 'Bersama',
    integrationDesc: 'SEO kamu menginformasikan iklan kamu. Social media kamu mengisi konten. Website kamu mengonversi semuanya. Semua saling menguatkan.',
    funnelSteps: [
      { label: 'Jangkauan', color: '#A855F7' },
      { label: 'Keterlibatan', color: '#D81C5C' },
      { label: 'Konversi', color: '#F88438' },
      { label: 'Retensi', color: '#F5A623' },
    ],
    deliverables: {
      'seo-content-marketing': ['Riset keyword & strategi konten', 'Artikel SEO berkualitas tinggi', 'Laporan performa GA4 transparan'],
      'social-media-management': ['Kalender konten bulanan', 'Manajemen IG, TikTok, FB & LinkedIn', 'Community management & laporan'],
      'paid-advertising': ['Setup Google, Meta & TikTok Ads', 'Optimasi ROAS mingguan', 'Dashboard laporan real-time'],
      'creative-services': ['Desain grafis semua platform', 'Produksi video & motion', 'Copywriting yang mengonversi'],
      'website-landing-page': ['Desain CRO-focused', 'Development cepat & SEO-ready', 'Integrasi analytics & tracking'],
    } as Record<string, string[]>,
  },
  en: {
    badge: 'Our Services',
    headline: '360° Digital',
    headlineGradient: 'Marketing Services',
    desc: 'Five integrated services working as one system, not separate siloed agencies.',
    startingFrom: 'Starting from',
    learnMore: 'Learn more',
    integrationHeadline: 'All Services Work',
    integrationGradient: 'Together',
    integrationDesc: 'Your SEO informs your ads. Your social feeds your content. Your website converts everything. It all compounds.',
    funnelSteps: [
      { label: 'Reach', color: '#A855F7' },
      { label: 'Engage', color: '#D81C5C' },
      { label: 'Convert', color: '#F88438' },
      { label: 'Retain', color: '#F5A623' },
    ],
    deliverables: {
      'seo-content-marketing': ['Keyword research & content strategy', 'High-quality SEO articles', 'Transparent GA4 performance reporting'],
      'social-media-management': ['Monthly content calendar', 'IG, TikTok, FB & LinkedIn management', 'Community management & reports'],
      'paid-advertising': ['Google, Meta & TikTok Ads setup', 'Weekly ROAS optimization', 'Real-time reporting dashboard'],
      'creative-services': ['Graphic design for every platform', 'Video & motion production', 'Copywriting that converts'],
      'website-landing-page': ['CRO-focused design', 'Fast, SEO-ready development', 'Analytics & tracking integration'],
    } as Record<string, string[]>,
  },
}

const FALLBACK_ID = [
  { id: '1', name: 'SEO & Content Marketing', slug: 'seo-content-marketing', color: '#A855F7', funnelPosition: 'Top Funnel', shortDescId: 'Pertumbuhan organik jangka panjang & inbound leads', descriptionId: 'Strategi SEO komprehensif dengan konten berkualitas tinggi untuk meningkatkan traffic organik jangka panjang.', isActive: true, sortOrder: 0, pricingTiers: [{ id: '1', tierName: 'Entry', priceLabel: 'Rp 6 Juta', priceValue: 6000, features: ['Keyword Research'], isPopular: false, sortOrder: 0 }], addOns: [] },
  { id: '2', name: 'Social Media Management', slug: 'social-media-management', color: '#D81C5C', funnelPosition: 'Top Funnel', shortDescId: 'Brand awareness & community building', descriptionId: 'Manajemen media sosial menyeluruh di IG, TikTok, Facebook, dan LinkedIn.', isActive: true, sortOrder: 1, pricingTiers: [], addOns: [] },
  { id: '3', name: 'Paid Advertising', slug: 'paid-advertising', color: '#F88438', funnelPosition: 'Mid Funnel', shortDescId: 'Skalasi cepat & ROI langsung', descriptionId: 'Google Ads, Meta Ads, TikTok Ads, dan Marketplace Ads untuk hasil cepat.', isActive: true, sortOrder: 2, pricingTiers: [{ id: '3', tierName: 'Entry', priceLabel: 'Rp 6 Juta', priceValue: 6000, features: [], isPopular: false, sortOrder: 0 }], addOns: [] },
  { id: '4', name: 'Creative Services', slug: 'creative-services', color: '#F5A623', funnelPosition: 'All Funnel', shortDescId: 'Konten yang bikin scroll berhenti dan mengonversi', descriptionId: 'Desain grafis, video production, dan copywriting untuk semua platform.', isActive: true, sortOrder: 3, pricingTiers: [], addOns: [] },
  { id: '5', name: 'Website & Landing Page', slug: 'website-landing-page', color: '#C084FC', funnelPosition: 'Bottom Funnel', shortDescId: 'Mengubah pengunjung menjadi pelanggan', descriptionId: 'Landing page, company profile, dan e-commerce website dengan CRO-focused design.', isActive: true, sortOrder: 4, pricingTiers: [{ id: '5', tierName: 'Entry', priceLabel: 'Rp 10 Juta', priceValue: 10000, features: [], isPopular: false, sortOrder: 0 }], addOns: [] },
]

const FALLBACK_EN = [
  { id: '1', name: 'SEO & Content Marketing', slug: 'seo-content-marketing', color: '#A855F7', funnelPosition: 'Top Funnel', shortDescId: 'Long-term organic growth & inbound leads', descriptionId: 'Comprehensive SEO strategy with high-quality content for long-term organic traffic growth.', isActive: true, sortOrder: 0, pricingTiers: [{ id: '1', tierName: 'Entry', priceLabel: 'IDR 6M', priceValue: 6000, features: ['Keyword Research'], isPopular: false, sortOrder: 0 }], addOns: [] },
  { id: '2', name: 'Social Media Management', slug: 'social-media-management', color: '#D81C5C', funnelPosition: 'Top Funnel', shortDescId: 'Brand awareness & community building', descriptionId: 'Full social media management across IG, TikTok, Facebook, and LinkedIn.', isActive: true, sortOrder: 1, pricingTiers: [], addOns: [] },
  { id: '3', name: 'Paid Advertising', slug: 'paid-advertising', color: '#F88438', funnelPosition: 'Mid Funnel', shortDescId: 'Fast scaling & immediate ROI', descriptionId: 'Google Ads, Meta Ads, TikTok Ads, and Marketplace Ads for fast results.', isActive: true, sortOrder: 2, pricingTiers: [{ id: '3', tierName: 'Entry', priceLabel: 'IDR 6M', priceValue: 6000, features: [], isPopular: false, sortOrder: 0 }], addOns: [] },
  { id: '4', name: 'Creative Services', slug: 'creative-services', color: '#F5A623', funnelPosition: 'All Funnel', shortDescId: 'Scroll-stopping content that converts', descriptionId: 'Graphic design, video production, and copywriting for all platforms.', isActive: true, sortOrder: 3, pricingTiers: [], addOns: [] },
  { id: '5', name: 'Website & Landing Page', slug: 'website-landing-page', color: '#C084FC', funnelPosition: 'Bottom Funnel', shortDescId: 'Converting visitors into customers', descriptionId: 'Landing pages, company profiles, and e-commerce websites with CRO-focused design.', isActive: true, sortOrder: 4, pricingTiers: [{ id: '5', tierName: 'Entry', priceLabel: 'IDR 10M', priceValue: 10000, features: [], isPopular: false, sortOrder: 0 }], addOns: [] },
]

// ServiceData with raw (Json) tier features — covers both Prisma rows and the in-file fallbacks
type RawTier = Omit<PricingTierData, 'features'> & { features: unknown }
type RawService = Omit<ServiceData, 'pricingTiers'> & { pricingTiers: RawTier[] }

export async function ServicesPageContent({ locale = 'id' }: { locale?: Locale }) {
  const c = COPY[locale]
  const fallback = locale === 'id' ? FALLBACK_ID : FALLBACK_EN

  let services: RawService[]
  try {
    services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        pricingTiers: { orderBy: { sortOrder: 'asc' } },
        addOns: { where: { isActive: true } },
      },
    })
    if (!services.length) services = fallback
  } catch {
    services = fallback
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden mesh-gradient px-6 pt-36 pb-20 text-center">
        <div aria-hidden className="orb -top-24 -left-24 h-72 w-72 bg-brand-orange/20" />
        <div aria-hidden className="orb -bottom-32 -right-16 h-80 w-80 bg-brand-crimson/10" style={{ animationDelay: '4s' }} />
        <div className="relative mx-auto max-w-3xl">
          <p className="eyebrow mb-4">{c.badge}</p>
          <h1 className="font-display text-[clamp(2.75rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-[var(--text-primary)] mb-5">
            {c.headline}{' '}
            <span className="gradient-text">{c.headlineGradient}</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-[var(--text-secondary)]">
            {c.desc}
          </p>
        </div>
      </section>

      {/* Services — alternating full-width rows */}
      <section className="bg-[var(--bg-primary)] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl space-y-20 md:space-y-28">
          {services.map((svc, i) => {
            const tierFeatures: string[] = Array.isArray(svc.pricingTiers?.[0]?.features)
              ? (svc.pricingTiers[0].features as string[])
              : []
            return (
              <ServiceRow
                key={svc.id}
                flip={i % 2 === 1}
                href={locale === 'id' ? `/layanan/${svc.slug}` : `/en/services/${svc.slug}`}
                startingFromLabel={c.startingFrom}
                learnMoreLabel={c.learnMore}
                deliverables={c.deliverables[svc.slug] ?? tierFeatures.slice(0, 3)}
                service={{
                  ...svc,
                  pricingTiers: (svc.pricingTiers ?? []).map(t => ({
                    ...t,
                    features: Array.isArray(t.features) ? (t.features as string[]) : [],
                  })),
                }}
              />
            )
          })}
        </div>
      </section>

      {/* Integration section */}
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight text-[var(--text-primary)] mb-4">
            {c.integrationHeadline} <span className="gradient-text">{c.integrationGradient}</span>
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-[var(--text-secondary)]">
            {c.integrationDesc}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {c.funnelSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <span
                  className="inline-flex items-center rounded-full px-5 py-2.5 font-semibold"
                  style={{ backgroundColor: `${step.color}14`, color: step.color }}
                >
                  {step.label}
                </span>
                {i < c.funnelSteps.length - 1 && (
                  <ArrowRight aria-hidden className="hidden h-4 w-4 text-[var(--text-muted)] sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection locale={locale} />
    </>
  )
}
