import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { ServiceCard } from '@/components/public/ServiceCard'
import { CTASection } from '@/components/public/CTASection'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = buildMetadata({
  title: 'Our Services',
  description: 'SEO, Social Media, Paid Advertising, Creative Services, and Website development — all integrated to maximize your digital marketing results.',
  path: '/en/services',
})

export const revalidate = 3600

const FALLBACK_SERVICES = [
  { id: '1', name: 'SEO & Content Marketing', slug: 'seo-content-marketing', color: '#7C3AED', funnelPosition: 'Top Funnel', shortDescId: 'Long-term organic growth & inbound leads', descriptionId: 'Comprehensive SEO strategy with high-quality content for long-term organic traffic growth.', isActive: true, sortOrder: 0, pricingTiers: [{ id: '1', tierName: 'Entry', priceLabel: 'IDR 6M', priceValue: 6000, features: ['Keyword Research'], isPopular: false, sortOrder: 0 }], addOns: [] },
  { id: '2', name: 'Social Media Management', slug: 'social-media-management', color: '#DB2777', funnelPosition: 'Top Funnel', shortDescId: 'Brand awareness & community building', descriptionId: 'Full social media management across IG, TikTok, Facebook, and LinkedIn.', isActive: true, sortOrder: 1, pricingTiers: [], addOns: [] },
  { id: '3', name: 'Paid Advertising', slug: 'paid-advertising', color: '#D97706', funnelPosition: 'Mid Funnel', shortDescId: 'Fast scaling & immediate ROI', descriptionId: 'Google Ads, Meta Ads, TikTok Ads, and Marketplace Ads for fast results.', isActive: true, sortOrder: 2, pricingTiers: [{ id: '3', tierName: 'Entry', priceLabel: 'IDR 6M', priceValue: 6000, features: [], isPopular: false, sortOrder: 0 }], addOns: [] },
  { id: '4', name: 'Creative Services', slug: 'creative-services', color: '#F59E0B', funnelPosition: 'All Funnel', shortDescId: 'Scroll-stopping content that converts', descriptionId: 'Graphic design, video production, and copywriting for all platforms.', isActive: true, sortOrder: 3, pricingTiers: [], addOns: [] },
  { id: '5', name: 'Website & Landing Page', slug: 'website-landing-page', color: '#A78BFA', funnelPosition: 'Bottom Funnel', shortDescId: 'Converting visitors into customers', descriptionId: 'Landing pages, company profiles, and e-commerce websites with CRO-focused design.', isActive: true, sortOrder: 4, pricingTiers: [{ id: '5', tierName: 'Entry', priceLabel: 'IDR 10M', priceValue: 10000, features: [], isPopular: false, sortOrder: 0 }], addOns: [] },
]

export default async function ServicesEnPage() {
  let services
  try {
    services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        pricingTiers: { orderBy: { sortOrder: 'asc' } },
        addOns: { where: { isActive: true } },
      },
    })
    if (!services.length) services = FALLBACK_SERVICES as any
  } catch {
    services = FALLBACK_SERVICES as typeof services
  }

  return (
    <>
      <section className="pt-32 pb-16 px-4 mesh-gradient text-center">
        <span className="inline-block px-4 py-1.5 rounded-full border border-brand-violet/20 bg-brand-violet/5 text-brand-violet text-sm font-medium mb-6">
          Our Services
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] mb-4">
          360° Digital{' '}
          <span className="gradient-text">Marketing Services</span>
        </h1>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-lg">
          Five integrated services working as one system — not separate siloed agencies.
        </p>
      </section>

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

      <section className="py-20 px-4 bg-[var(--bg-surface)]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
            All Services Work <span className="gradient-text">Together</span>
          </h2>
          <p className="text-[var(--text-secondary)] mb-12 max-w-xl mx-auto">
            Your SEO informs your ads. Your social feeds your content. Your website converts everything. It all compounds.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Reach', color: '#7C3AED' },
              { label: 'Engage', color: '#DB2777' },
              { label: 'Convert', color: '#D97706' },
              { label: 'Retain', color: '#F59E0B' },
            ].map((step) => (
              <div key={step.label} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-primary)] p-5 text-center">
                <div className="text-lg font-bold" style={{ color: step.color }}>{step.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection locale="en" />
    </>
  )
}
