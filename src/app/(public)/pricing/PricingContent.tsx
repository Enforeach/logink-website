'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PricingTierCard } from '@/components/public/PricingTier'

interface Service {
  id: string
  name: string
  slug: string
  color: string
  pricingTiers: {
    id: string
    tierName: string
    priceLabel: string
    priceValue: number | null
    features: unknown
    isPopular: boolean
    sortOrder: number
  }[]
  addOns: { id: string; name: string; priceLabel?: string | null }[]
}

const FALLBACK_SERVICES: Service[] = [
  {
    id: '1', name: 'SEO & Content Marketing', slug: 'seo-content-marketing', color: '#7C3AED',
    pricingTiers: [
      { id: '1a', tierName: 'Entry', priceLabel: 'IDR 6M', priceValue: 6000, isPopular: false, sortOrder: 0, features: ['Keyword Research', 'Google Search Console & GA4', 'On-Page SEO', 'Core Web Vitals', '5 SEO Articles/month', 'Monthly Report'] },
      { id: '1b', tierName: 'Growth', priceLabel: 'IDR 8M', priceValue: 8000, isPopular: true, sortOrder: 1, features: ['Everything in Entry', 'Local Schema Markup', '15 SEO Articles/month', 'Looker Studio Dashboard'] },
      { id: '1c', tierName: 'Full', priceLabel: 'IDR 15M', priceValue: 15000, isPopular: false, sortOrder: 2, features: ['Everything in Growth', 'Custom Event Tracking', '30 SEO Articles/month', 'Full Looker Studio'] },
    ],
    addOns: [{ id: '1x', name: 'Local SEO & Google Business Profile', priceLabel: 'from 2M/location' }, { id: '1y', name: 'Off-Page / Link Building', priceLabel: 'from 5M/media' }],
  },
  {
    id: '3', name: 'Paid Advertising', slug: 'paid-advertising', color: '#D97706',
    pricingTiers: [
      { id: '3a', tierName: 'Entry', priceLabel: 'IDR 6M', priceValue: 6000, isPopular: false, sortOrder: 0, features: ['Google Ads (Search, Display, Shopping)', 'Campaign Setup', 'Keyword Bidding', 'Ad Copywriting', 'Conversion Tracking', 'Monthly Report'] },
      { id: '3b', tierName: 'Growth', priceLabel: 'IDR 12M', priceValue: 12000, isPopular: true, sortOrder: 1, features: ['Everything in Entry', 'Meta Ads', 'Creative Ad Design', 'A/B Testing', 'Pixel & Retargeting', 'Marketplace Ads'] },
      { id: '3c', tierName: 'Full', priceLabel: 'IDR 20M', priceValue: 20000, isPopular: false, sortOrder: 2, features: ['Everything in Growth', 'TikTok Ads', 'Video Production Brief', 'TikTok Targeting', 'CRO', 'Retargeting'] },
    ],
    addOns: [],
  },
]

export function PricingContent({ services }: { services: Service[] }) {
  const displayServices = services.length > 0 ? services : FALLBACK_SERVICES
  const [activeTab, setActiveTab] = useState(displayServices[0]?.id || '')
  const [selections, setSelections] = useState<Record<string, string>>({})

  const activeService = displayServices.find((s) => s.id === activeTab)

  const toggleSelection = (serviceId: string, tierId: string) => {
    setSelections((prev) => {
      if (prev[serviceId] === tierId) {
        const next = { ...prev }
        delete next[serviceId]
        return next
      }
      return { ...prev, [serviceId]: tierId }
    })
  }

  const totalPrice = Object.entries(selections).reduce((sum, [svcId, tierId]) => {
    const svc = displayServices.find((s) => s.id === svcId)
    const tier = svc?.pricingTiers.find((t) => t.id === tierId)
    return sum + (tier?.priceValue || 0)
  }, 0)

  const hasSelections = Object.keys(selections).length > 0
  const discountedTotal = hasSelections && Object.keys(selections).length >= 2 ? Math.floor(totalPrice * 0.9) : totalPrice

  return (
    <section className="py-20 px-4 bg-[var(--bg-primary)]">
      <div className="max-w-5xl mx-auto">
        {/* Tabs */}
        <div className="flex overflow-x-auto gap-1 p-1 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-default)] mb-10">
          {displayServices.map((svc) => (
            <button
              key={svc.id}
              onClick={() => setActiveTab(svc.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${activeTab === svc.id ? 'text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              style={activeTab === svc.id ? { background: `linear-gradient(135deg, ${svc.color}, #DB2777)` } : {}}
            >
              {svc.name}
            </button>
          ))}
        </div>

        {/* Pricing tiers */}
        {activeService && (
          <>
            {activeService.pricingTiers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {activeService.pricingTiers.map((tier) => (
                  <PricingTierCard
                    key={tier.id}
                    tier={{ ...tier, features: Array.isArray(tier.features) ? tier.features as string[] : [] }}
                    serviceSlug={activeService.slug}
                    color={activeService.color}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-[var(--text-secondary)]">
                {activeService.name} pricing is project-based. <Link href="/contact" className="text-brand-violet underline">Contact us</Link> for a quote.
              </div>
            )}
            {activeService.addOns.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Add-ons</h3>
                <div className="flex flex-wrap gap-2">
                  {activeService.addOns.map((a) => (
                    <span key={a.id} className="px-4 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] text-sm text-[var(--text-secondary)]">
                      {a.name}{a.priceLabel && ` — ${a.priceLabel}`}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Bundle calculator */}
        <div className="mt-16 rounded-2xl border border-brand-violet/20 bg-brand-violet/5 p-8">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Bundle Calculator</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-8">Select services and plans — get 10% off when bundling 2 or more services.</p>
          <div className="space-y-4">
            {displayServices.filter((s) => s.pricingTiers.length > 0).map((svc) => (
              <div key={svc.id} className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: svc.color }} />
                  <span className="font-medium text-[var(--text-primary)] text-sm">{svc.name}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {svc.pricingTiers.map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => toggleSelection(svc.id, tier.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${selections[svc.id] === tier.id ? 'text-white border-transparent' : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:border-brand-violet/40'}`}
                      style={selections[svc.id] === tier.id ? { background: svc.color } : {}}
                    >
                      {tier.tierName} — {tier.priceLabel}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {hasSelections && (
            <div className="mt-6 pt-6 border-t border-[var(--border-default)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                {Object.keys(selections).length >= 2 ? (
                  <div>
                    <span className="text-sm text-[var(--text-muted)] line-through mr-2">IDR {totalPrice.toLocaleString('id-ID')}K</span>
                    <span className="text-2xl font-extrabold gradient-text">IDR {discountedTotal.toLocaleString('id-ID')}K/mo</span>
                    <span className="ml-2 text-xs bg-brand-violet/10 text-brand-violet px-2 py-0.5 rounded-full">Save 10%</span>
                  </div>
                ) : (
                  <span className="text-2xl font-extrabold text-[var(--text-primary)]">IDR {totalPrice.toLocaleString('id-ID')}K/mo</span>
                )}
              </div>
              <Link
                href={`/contact?services=${Object.keys(selections).join(',')}`}
                className="px-6 py-3 rounded-xl gradient-bg text-white font-semibold text-sm hover:scale-[1.02] transition-all"
              >
                Get Custom Quote
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
