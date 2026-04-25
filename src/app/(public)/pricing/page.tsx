import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { PricingContent } from './PricingContent'
import { CTASection } from '@/components/public/CTASection'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = buildMetadata({
  title: 'Pricing & Service Packages',
  description: 'Transparent pricing for all Logink digital marketing services. Starting from IDR 6M/month. No lock-in contracts.',
  path: '/pricing',
})

export const revalidate = 3600

export default async function PricingPage() {
  let services: any[] = []
  try {
    services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: { pricingTiers: { orderBy: { sortOrder: 'asc' } }, addOns: { where: { isActive: true } } },
    })
  } catch {}

  return (
    <>
      <section className="pt-32 pb-16 px-4 mesh-gradient text-center">
        <span className="inline-block px-4 py-1.5 rounded-full border border-brand-violet/20 bg-brand-violet/5 text-brand-violet text-sm font-medium mb-6">Pricing</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] mb-4">
          <span className="gradient-text">Transparent</span> Pricing
        </h1>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-lg mb-8">No hidden fees. No lock-in contracts. Just real results.</p>
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          {[
            { icon: '✓', text: 'No lock-in contracts' },
            { icon: '✓', text: 'Transparent GA4 reporting' },
            { icon: '✓', text: 'Full account access' },
          ].map((b) => (
            <span key={b.text} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-violet/20 bg-brand-violet/5 text-[var(--text-secondary)]">
              <span className="text-brand-violet font-bold">{b.icon}</span>
              {b.text}
            </span>
          ))}
        </div>
      </section>
      <PricingContent services={services} />
      <CTASection title="Need a Custom Package?" subtitle="Contact us for a tailored proposal that fits your exact needs." />
    </>
  )
}
