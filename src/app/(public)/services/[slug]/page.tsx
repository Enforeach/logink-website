import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { buildMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo'
import { PricingTierCard } from '@/components/public/PricingTier'
import { CTASection } from '@/components/public/CTASection'
import { Badge } from '@/components/ui/Badge'
import { Accordion } from '@/components/ui/Accordion'

interface Props {
  params: Promise<{ slug: string }>
}

const SERVICE_FAQS: Record<string, { question: string; answer: string }[]> = {
  'seo-content-marketing': [
    { question: 'How long does it take to see SEO results?', answer: 'SEO typically takes 3–6 months to show significant results. However, we usually see traffic improvements within the first 4–8 weeks.' },
    { question: 'What language are articles written in?', answer: 'We write articles in the language your target audience uses — Indonesian, English, or both — fully optimised for your target keywords.' },
    { question: 'Can we choose article topics?', answer: 'Absolutely. We conduct keyword research and discuss relevant topics aligned with your business every month.' },
    { question: 'How is progress reported?', answer: 'We deliver monthly reports via Looker Studio, accessible anytime, covering keyword rankings, traffic, and conversions.' },
    { question: 'Is backlink building included?', answer: 'Off-page SEO and link building are available as an add-on starting from IDR 5M/month.' },
  ],
  'social-media-management': [
    { question: 'Which platforms do you manage?', answer: 'Instagram, TikTok, Facebook, and LinkedIn. We can focus on one or multiple platforms based on your target audience.' },
    { question: 'Is community management included (comments/DMs)?', answer: 'Yes, our packages include community management — comment and DM responses during business hours.' },
    { question: 'Who creates the visual content?', answer: 'Our creative team designs everything according to your brand guidelines. You simply approve before publishing.' },
    { question: 'How many posts per month?', answer: 'Post frequency is tailored to your needs and budget. We discuss the optimal cadence during onboarding.' },
  ],
  'paid-advertising': [
    { question: 'Which ad platforms do you manage?', answer: 'Google Ads (Search, Display, Shopping), Meta Ads (Facebook & Instagram), TikTok Ads, and Marketplace Ads (Tokopedia, Shopee, Lazada).' },
    { question: 'What is the minimum ad budget?', answer: 'Ad spend is separate from our management fee. We recommend a minimum of IDR 3–5M/month for optimal results.' },
    { question: 'What is ROAS and how do you measure it?', answer: 'ROAS (Return on Ad Spend) is the revenue generated per IDR spent on ads. We track it via Google Analytics 4 and each platform\'s native reporting.' },
    { question: 'Will I have access to my own ad accounts?', answer: 'Yes, 100%. We manage within your own accounts — not ours. You retain full access at all times.' },
    { question: 'How long until ads go live?', answer: 'Typically 1–2 weeks for initial setup and launch, including audit, strategy, and creative production.' },
  ],
  'creative-services': [
    { question: 'What formats can you produce?', answer: 'Social media posts (feed, story, reels), banner ads, video (1:1, 9:16, 16:9), infographics, landing page copy, and more.' },
    { question: 'How long does production take?', answer: 'Graphic design is typically 3–5 business days. Video production with shooting takes 1–2 weeks depending on complexity.' },
    { question: 'Are revisions included?', answer: 'Yes, each deliverable includes 2 rounds of revisions. Additional revisions are available at a separate fee.' },
    { question: 'Do you shoot outside Jakarta?', answer: 'Our team serves Jakarta and surroundings. Out-of-city shoots are available with additional travel costs.' },
  ],
  'website-landing-page': [
    { question: 'How long does a website take to build?', answer: 'Landing pages: 1–2 weeks. Company profiles: 3–4 weeks. E-commerce: 4–8 weeks depending on complexity.' },
    { question: 'Which platforms do you use?', answer: 'Depends on your needs — WordPress, custom Next.js, Shopify, or WooCommerce for e-commerce.' },
    { question: 'Is hosting and domain included?', answer: 'Not included, but we assist with setup and recommend the right providers. Maintenance & hosting are available as an add-on.' },
    { question: 'Are websites mobile-responsive?', answer: 'Yes, everything we build is 100% mobile-first and fully responsive across all devices.' },
    { question: 'Is training included for managing the site?', answer: 'Yes, we provide a training session and documentation for your team after the site launches.' },
  ],
}

async function getService(slug: string) {
  try {
    return await prisma.service.findUnique({
      where: { slug },
      include: {
        pricingTiers: { orderBy: { sortOrder: 'asc' } },
        addOns: { where: { isActive: true } },
        caseStudies: {
          where: { status: 'PUBLISHED' },
          take: 1,
          include: { metrics: { orderBy: { sortOrder: 'asc' }, take: 3 } },
        },
      },
    })
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) return {}
  return buildMetadata({
    title: service.metaTitle || service.name,
    description: service.metaDescription || `${service.name} — ${service.shortDescId || service.descriptionId.slice(0, 120)}`,
    path: `/services/${slug}`,
  })
}

const HOW_WE_WORK = [
  { step: '01', title: 'Discovery', desc: 'Deep audit of your current digital presence and goals.' },
  { step: '02', title: 'Strategy', desc: 'We design a roadmap tailored to your objectives and budget.' },
  { step: '03', title: 'Execution', desc: 'Consistent implementation by our specialist team.' },
  { step: '04', title: 'Reporting', desc: 'Transparent monthly reports via Looker Studio.' },
]

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    // Return placeholder for seeded services
    const KNOWN_SLUGS = ['seo-content-marketing', 'social-media-management', 'paid-advertising', 'creative-services', 'website-landing-page']
    if (!KNOWN_SLUGS.includes(slug)) notFound()
  }

  const faqs = SERVICE_FAQS[slug] || []
  const breadcrumbs = [
    { name: 'Home', url: 'https://logink.id' },
    { name: 'Services', url: 'https://logink.id/services' },
    { name: service?.name || slug, url: `https://logink.id/services/${slug}` },
  ]

  const serviceColor = service?.color || '#7C3AED'
  const serviceName = service?.name || slug.replace(/-/g, ' ')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema(breadcrumbs), ...(faqs.length ? [faqSchema(faqs)] : [])]),
        }}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 mesh-gradient">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
            <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[var(--text-primary)] transition-colors">Services</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">{serviceName}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            {service?.funnelPosition && (
              <Badge variant="violet" size="md">{service.funnelPosition}</Badge>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] mb-4">
            {serviceName}
          </h1>
          {service?.shortDescId && (
            <p className="text-lg text-[var(--text-secondary)] mb-8">{service.shortDescId}</p>
          )}
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-semibold text-sm hover:scale-[1.02] transition-all">
              Start Free Consultation
            </Link>
            <Link href="#pricing" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border-hover)] text-[var(--text-primary)] font-semibold text-sm hover:bg-[var(--bg-elevated)] transition-all">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Description */}
      {service?.descriptionId && (
        <section className="py-16 px-4 bg-[var(--bg-surface)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">About This Service</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed text-lg">{service.descriptionId}</p>
          </div>
        </section>
      )}

      {/* Pricing */}
      {service?.pricingTiers && service.pricingTiers.length > 0 && (
        <section id="pricing" className="py-20 px-4 bg-[var(--bg-primary)]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Pricing</h2>
              <p className="text-[var(--text-secondary)]">Choose the plan that fits your business needs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.pricingTiers.map((tier) => (
                <PricingTierCard
                  key={tier.id}
                  tier={{
                    ...tier,
                    features: Array.isArray(tier.features) ? tier.features as string[] : [],
                  }}
                  serviceSlug={slug}
                  color={serviceColor}
                />
              ))}
            </div>
            {service.addOns.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">Available Add-ons</h3>
                <div className="flex flex-wrap gap-2">
                  {service.addOns.map((addon) => (
                    <span
                      key={addon.id}
                      className="px-4 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] text-sm text-[var(--text-secondary)]"
                    >
                      {addon.name}
                      {addon.priceLabel && <span className="ml-2 text-xs text-[var(--text-muted)]">({addon.priceLabel})</span>}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* How We Work */}
      <section className="py-20 px-4 bg-[var(--bg-surface)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">How We Work</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_WE_WORK.map((step, i) => (
              <div key={i} className="relative text-center">
                <div
                  className="h-14 w-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-extrabold text-white"
                  style={{ background: `linear-gradient(135deg, ${serviceColor}, #DB2777)` }}
                >
                  {step.step}
                </div>
                <h3 className="font-bold text-[var(--text-primary)] mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-20 px-4 bg-[var(--bg-primary)]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">FAQ</h2>
              <p className="text-[var(--text-secondary)]">Frequently asked questions about {serviceName}.</p>
            </div>
            <Accordion items={faqs} />
          </div>
        </section>
      )}

      {/* Cross-sell */}
      <section className="py-16 px-4 bg-[var(--bg-surface)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Works Best With</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { slug: 'seo-content-marketing', name: 'SEO & Content Marketing', color: '#7C3AED' },
              { slug: 'social-media-management', name: 'Social Media Management', color: '#DB2777' },
              { slug: 'paid-advertising', name: 'Paid Advertising', color: '#D97706' },
              { slug: 'creative-services', name: 'Creative Services', color: '#F59E0B' },
              { slug: 'website-landing-page', name: 'Website & Landing Page', color: '#A78BFA' },
            ].filter((s) => s.slug !== slug).slice(0, 2).map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] hover:border-[var(--border-hover)] transition-all text-sm font-medium text-[var(--text-primary)]"
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: svc.color }} />
                {svc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
