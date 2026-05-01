import { ServiceCard } from '@/components/public/ServiceCard'
import { CTASection } from '@/components/public/CTASection'
import { prisma } from '@/lib/prisma'
import type { Locale } from '@/lib/i18n'

const COPY = {
  id: {
    badge: 'Layanan Kami',
    headline: '360° Layanan Digital',
    headlineGradient: 'Marketing',
    desc: 'Lima layanan terintegrasi yang bekerja sebagai satu sistem, bukan agensi-agensi yang terpisah.',
    integrationHeadline: 'Semua Layanan Bekerja',
    integrationGradient: 'Bersama',
    integrationDesc: 'SEO kamu menginformasikan iklan kamu. Social media kamu mengisi konten. Website kamu mengonversi semuanya. Semua saling menguatkan.',
    funnelSteps: [
      { label: 'Jangkauan', color: '#7C3AED' },
      { label: 'Keterlibatan', color: '#DB2777' },
      { label: 'Konversi', color: '#D97706' },
      { label: 'Retensi', color: '#F59E0B' },
    ],
  },
  en: {
    badge: 'Our Services',
    headline: '360° Digital',
    headlineGradient: 'Marketing Services',
    desc: 'Five integrated services working as one system, not separate siloed agencies.',
    integrationHeadline: 'All Services Work',
    integrationGradient: 'Together',
    integrationDesc: 'Your SEO informs your ads. Your social feeds your content. Your website converts everything. It all compounds.',
    funnelSteps: [
      { label: 'Reach', color: '#7C3AED' },
      { label: 'Engage', color: '#DB2777' },
      { label: 'Convert', color: '#D97706' },
      { label: 'Retain', color: '#F59E0B' },
    ],
  },
}

const FALLBACK_ID = [
  { id: '1', name: 'SEO & Content Marketing', slug: 'seo-content-marketing', color: '#7C3AED', funnelPosition: 'Top Funnel', shortDescId: 'Pertumbuhan organik jangka panjang & inbound leads', descriptionId: 'Strategi SEO komprehensif dengan konten berkualitas tinggi untuk meningkatkan traffic organik jangka panjang.', isActive: true, sortOrder: 0, pricingTiers: [{ id: '1', tierName: 'Entry', priceLabel: 'Rp 6 Juta', priceValue: 6000, features: ['Keyword Research'], isPopular: false, sortOrder: 0 }], addOns: [] },
  { id: '2', name: 'Social Media Management', slug: 'social-media-management', color: '#DB2777', funnelPosition: 'Top Funnel', shortDescId: 'Brand awareness & community building', descriptionId: 'Manajemen media sosial menyeluruh di IG, TikTok, Facebook, dan LinkedIn.', isActive: true, sortOrder: 1, pricingTiers: [], addOns: [] },
  { id: '3', name: 'Paid Advertising', slug: 'paid-advertising', color: '#D97706', funnelPosition: 'Mid Funnel', shortDescId: 'Skalasi cepat & ROI langsung', descriptionId: 'Google Ads, Meta Ads, TikTok Ads, dan Marketplace Ads untuk hasil cepat.', isActive: true, sortOrder: 2, pricingTiers: [{ id: '3', tierName: 'Entry', priceLabel: 'Rp 6 Juta', priceValue: 6000, features: [], isPopular: false, sortOrder: 0 }], addOns: [] },
  { id: '4', name: 'Creative Services', slug: 'creative-services', color: '#F59E0B', funnelPosition: 'All Funnel', shortDescId: 'Konten yang bikin scroll berhenti dan mengonversi', descriptionId: 'Desain grafis, video production, dan copywriting untuk semua platform.', isActive: true, sortOrder: 3, pricingTiers: [], addOns: [] },
  { id: '5', name: 'Website & Landing Page', slug: 'website-landing-page', color: '#A78BFA', funnelPosition: 'Bottom Funnel', shortDescId: 'Mengubah pengunjung menjadi pelanggan', descriptionId: 'Landing page, company profile, dan e-commerce website dengan CRO-focused design.', isActive: true, sortOrder: 4, pricingTiers: [{ id: '5', tierName: 'Entry', priceLabel: 'Rp 10 Juta', priceValue: 10000, features: [], isPopular: false, sortOrder: 0 }], addOns: [] },
]

const FALLBACK_EN = [
  { id: '1', name: 'SEO & Content Marketing', slug: 'seo-content-marketing', color: '#7C3AED', funnelPosition: 'Top Funnel', shortDescId: 'Long-term organic growth & inbound leads', descriptionId: 'Comprehensive SEO strategy with high-quality content for long-term organic traffic growth.', isActive: true, sortOrder: 0, pricingTiers: [{ id: '1', tierName: 'Entry', priceLabel: 'IDR 6M', priceValue: 6000, features: ['Keyword Research'], isPopular: false, sortOrder: 0 }], addOns: [] },
  { id: '2', name: 'Social Media Management', slug: 'social-media-management', color: '#DB2777', funnelPosition: 'Top Funnel', shortDescId: 'Brand awareness & community building', descriptionId: 'Full social media management across IG, TikTok, Facebook, and LinkedIn.', isActive: true, sortOrder: 1, pricingTiers: [], addOns: [] },
  { id: '3', name: 'Paid Advertising', slug: 'paid-advertising', color: '#D97706', funnelPosition: 'Mid Funnel', shortDescId: 'Fast scaling & immediate ROI', descriptionId: 'Google Ads, Meta Ads, TikTok Ads, and Marketplace Ads for fast results.', isActive: true, sortOrder: 2, pricingTiers: [{ id: '3', tierName: 'Entry', priceLabel: 'IDR 6M', priceValue: 6000, features: [], isPopular: false, sortOrder: 0 }], addOns: [] },
  { id: '4', name: 'Creative Services', slug: 'creative-services', color: '#F59E0B', funnelPosition: 'All Funnel', shortDescId: 'Scroll-stopping content that converts', descriptionId: 'Graphic design, video production, and copywriting for all platforms.', isActive: true, sortOrder: 3, pricingTiers: [], addOns: [] },
  { id: '5', name: 'Website & Landing Page', slug: 'website-landing-page', color: '#A78BFA', funnelPosition: 'Bottom Funnel', shortDescId: 'Converting visitors into customers', descriptionId: 'Landing pages, company profiles, and e-commerce websites with CRO-focused design.', isActive: true, sortOrder: 4, pricingTiers: [{ id: '5', tierName: 'Entry', priceLabel: 'IDR 10M', priceValue: 10000, features: [], isPopular: false, sortOrder: 0 }], addOns: [] },
]

export async function ServicesPageContent({ locale = 'id' }: { locale?: Locale }) {
  const c = COPY[locale]
  const fallback = locale === 'id' ? FALLBACK_ID : FALLBACK_EN

  let services: any[]
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
      <section className="pt-32 pb-16 px-4 mesh-gradient text-center">
        <span className="inline-block px-4 py-1.5 rounded-full border border-brand-violet/20 bg-brand-violet/5 text-brand-violet text-sm font-medium mb-6">
          {c.badge}
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] mb-4">
          {c.headline}{' '}
          <span className="gradient-text">{c.headlineGradient}</span>
        </h1>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-lg">
          {c.desc}
        </p>
      </section>

      {/* Services grid */}
      <section className="py-20 px-4 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc: any) => (
              <ServiceCard
                key={svc.id}
                size="lg"
                service={{
                  ...svc,
                  pricingTiers: svc.pricingTiers.map((t: any) => ({
                    ...t,
                    features: Array.isArray(t.features) ? t.features as string[] : [],
                  })),
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Integration section */}
      <section className="py-20 px-4 bg-[var(--bg-surface)]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
            {c.integrationHeadline} <span className="gradient-text">{c.integrationGradient}</span>
          </h2>
          <p className="text-[var(--text-secondary)] mb-12 max-w-xl mx-auto">
            {c.integrationDesc}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {c.funnelSteps.map((step) => (
              <div key={step.label} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-primary)] p-5 text-center">
                <div className="text-lg font-bold" style={{ color: step.color }}>{step.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection locale={locale} />
    </>
  )
}
