import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description: 'Logink Terms of Service outlines the rights and obligations of clients and Logink, covering payment terms, service deliverables, and dispute resolution.',
  path: '/en/terms',
})

const LAST_UPDATED = 'May 1, 2025'

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: [
      {
        subtitle: 'Agreement to Terms',
        text: 'By accessing or using the logink.co website and Logink services, you confirm that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.',
      },
      {
        subtitle: 'Legal Capacity',
        text: 'By using our services, you represent that you are at least 18 years of age and have full legal capacity to enter into this agreement, whether on your own behalf or on behalf of a business entity you represent.',
      },
    ],
  },
  {
    id: 'services',
    title: '2. Description of Services',
    content: [
      {
        subtitle: 'Scope of Services',
        text: 'Logink provides 360° digital marketing services including: SEO & Content Marketing, Social Media Management, Paid Advertising (Google Ads, Meta Ads, and other platforms), Creative Services (graphic design, visual content production), and Website & Landing Page Development.',
      },
      {
        subtitle: 'Scope of Work',
        text: 'Service details, deliverables, timelines, and pricing will be set out in a separate Service Agreement or Proposal signed by both parties. These Terms of Service serve as the legal foundation for all such agreements.',
      },
      {
        subtitle: 'Service Changes',
        text: 'Logink reserves the right to modify, suspend, or discontinue any part of its services at any time with reasonable notice to the client. Changes that materially affect active contracts will be communicated at least 30 days in advance.',
      },
    ],
  },
  {
    id: 'client-obligations',
    title: '3. Client Obligations',
    content: [
      {
        subtitle: 'Information and Access',
        text: 'Clients must provide accurate information, materials, account access, and resources required by Logink to perform the services in a timely manner. Delays in providing necessary information may impact project schedules and outcomes.',
      },
      {
        subtitle: 'Content Approval',
        text: 'Clients are responsible for reviewing and approving all content before publication. Approval given by the client for content prepared by Logink constitutes confirmation that the content is accurate and appropriate for their business.',
      },
      {
        subtitle: 'Legal Compliance',
        text: 'Clients must ensure that their business, products, and services comply with all applicable laws and regulations. Clients are responsible for the accuracy and legality of information provided to Logink.',
      },
      {
        subtitle: 'Confidentiality',
        text: 'Clients must maintain the confidentiality of information, methodologies, tools, and strategies shared by Logink in the context of the working relationship, and must not use them for purposes outside the scope of the agreement.',
      },
    ],
  },
  {
    id: 'logink-obligations',
    title: '4. Logink Obligations',
    content: [
      {
        subtitle: 'Professional Standards',
        text: 'Logink is committed to delivering services to the highest professional standards, using competent and experienced personnel, and applying industry best practices in every engagement.',
      },
      {
        subtitle: 'Transparent Reporting',
        text: 'We provide regular, transparent reports on campaign performance and work progress at the frequency agreed upon in the contract.',
      },
      {
        subtitle: 'Client Information Confidentiality',
        text: 'Logink maintains the confidentiality of all client business information, data, and strategies. Such information will not be disclosed to third parties without the client\'s written consent, except as required by law.',
      },
    ],
  },
  {
    id: 'payment',
    title: '5. Payment and Billing',
    content: [
      {
        subtitle: 'Payment Structure',
        text: 'Payment terms, including pricing, payment schedules, and accepted payment methods, will be set out in the Proposal or Service Agreement. As a general rule, new projects require an upfront deposit before work commences.',
      },
      {
        subtitle: 'Late Payment',
        text: 'Payments overdue by more than 14 business days may result in temporary suspension of services. Logink reserves the right to apply a late payment fee of 1.5% per month on any outstanding amounts.',
      },
      {
        subtitle: 'Refunds',
        text: 'Deposits already paid are non-refundable unless Logink is unable to commence work within the agreed timeframe. Partial refunds may be considered for work not yet commenced, at Logink\'s sole discretion.',
      },
      {
        subtitle: 'Third-Party Costs',
        text: 'Costs for advertising platforms (Google Ads, Meta Ads, etc.), content purchases, or other third-party services required for campaigns are additional to Logink\'s management fee and will be communicated in advance.',
      },
    ],
  },
  {
    id: 'intellectual-property',
    title: '6. Intellectual Property',
    content: [
      {
        subtitle: 'Client-Owned Materials',
        text: 'All materials, logos, content, data, and information provided by the client remain the property of the client. The client grants Logink a limited licence to use such materials solely for the purpose of delivering the services.',
      },
      {
        subtitle: 'Ownership of Deliverables',
        text: 'Upon full payment, ownership rights to deliverables created specifically for the client (such as designs, written content, and websites) will transfer to the client. However, Logink retains the right to display such work in our portfolio.',
      },
      {
        subtitle: 'Logink Tools and Methodology',
        text: 'Templates, systems, methodologies, proprietary tools, and other intellectual property developed independently by Logink remain the property of Logink, regardless of their use in a client project.',
      },
    ],
  },
  {
    id: 'confidentiality',
    title: '7. Confidentiality',
    content: [
      {
        subtitle: 'Confidential Information',
        text: 'Both parties agree to maintain the confidentiality of sensitive business information shared in the context of the working relationship, including but not limited to business strategies, financial data, client lists, and internal processes.',
      },
      {
        subtitle: 'Exceptions',
        text: 'Confidentiality obligations do not apply to information that is already publicly available through no breach of this agreement, information lawfully received from a third party, or information required to be disclosed by law.',
      },
    ],
  },
  {
    id: 'termination',
    title: '8. Termination of Services',
    content: [
      {
        subtitle: 'Termination by Client',
        text: 'Clients may terminate a contract by providing at least 30 days written notice. Clients remain obligated to pay all fees for work completed and costs incurred up to the effective termination date.',
      },
      {
        subtitle: 'Termination by Logink',
        text: 'Logink may terminate a contract with 30 days notice, or immediately if the client breaches payment terms, provides false information, or engages in illegal activities. In cases of material breach, Logink is not obligated to refund fees already paid.',
      },
      {
        subtitle: 'After Termination',
        text: 'Upon termination, Logink will cease access to client accounts and assets, deliver completed and paid-for deliverables, and delete client data in accordance with our data retention policy.',
      },
    ],
  },
  {
    id: 'limitation-of-liability',
    title: '9. Limitation of Liability',
    content: [
      {
        subtitle: 'No Guarantee of Results',
        text: 'Logink does not guarantee specific outcomes from digital marketing campaigns, such as particular search engine rankings, lead volumes, or conversion rates. Performance depends on many factors outside our control, including market conditions and platform algorithms.',
      },
      {
        subtitle: 'Liability Cap',
        text: 'Logink\'s total liability to a client for any losses shall not exceed the amount paid by the client to Logink in the 3 months preceding the claim. Logink is not liable for indirect losses, lost profits, or incidental damages.',
      },
      {
        subtitle: 'Force Majeure',
        text: 'Logink is not liable for delays or failures in performing obligations due to circumstances beyond our reasonable control, including natural disasters, third-party network outages, platform algorithm changes, or other extraordinary events.',
      },
    ],
  },
  {
    id: 'governing-law',
    title: '10. Governing Law',
    content: [
      {
        subtitle: 'Jurisdiction',
        text: 'These Terms of Service are governed by and construed in accordance with the laws of the Republic of Indonesia. Any dispute arising from or in connection with these terms will be resolved in the competent courts of Jakarta.',
      },
      {
        subtitle: 'Dispute Resolution',
        text: 'Before pursuing formal legal proceedings, both parties agree to attempt to resolve disputes through direct negotiation for a minimum of 30 days. If negotiation fails, the dispute may be referred to mediation or arbitration by mutual agreement.',
      },
    ],
  },
  {
    id: 'changes',
    title: '11. Changes to Terms',
    content: [
      {
        subtitle: 'Right to Amend',
        text: 'Logink reserves the right to amend these Terms of Service at any time. Material changes will be communicated via email or a notice on the website at least 14 days before taking effect. Continued use of the services after changes take effect constitutes acceptance of the updated terms.',
      },
    ],
  },
  {
    id: 'contact',
    title: '12. Contact Us',
    content: [
      {
        subtitle: 'Legal Enquiries',
        text: 'If you have any questions about these Terms of Service or require further clarification, please contact us via our contact page or email hello@logink.co. Our team is committed to responding within 3 business days.',
      },
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Title band — first horizontal sweep of the F */}
      <header className="px-6 pb-0 pt-32">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="font-display text-[clamp(2.75rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)]">
            Terms of Service
          </h1>
          <p className="mt-5 max-w-[60ch] text-lg text-[var(--text-secondary)]">
            The rules and conditions governing your use of Logink&apos;s services.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--text-muted)]">
            <span>
              Last updated:{' '}
              <span className="font-medium text-[var(--text-secondary)]">{LAST_UPDATED}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{sections.length} sections</span>
            <span aria-hidden="true">·</span>
            <Link href="/terms" className="font-medium text-brand-purple hover:underline">
              Versi Bahasa Indonesia →
            </Link>
          </div>
          <div className="mt-10 border-b border-[var(--border-default)]" />
        </div>
      </header>

      {/* F layout: sticky TOC stem left, reading column right */}
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-12 lg:flex lg:gap-16">
        {/* Desktop TOC rail */}
        <aside className="hidden w-[260px] flex-shrink-0 lg:block">
          <nav aria-label="Table of contents" className="sticky top-24">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Contents
            </p>
            <ol className="space-y-0.5">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="group flex items-baseline gap-3 rounded-md py-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:text-brand-crimson focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson/40"
                  >
                    <span className="text-[11px] font-semibold tabular-nums text-[var(--text-muted)] transition-colors group-hover:text-brand-crimson">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{s.title.replace(/^\d+\.\s/, '')}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          {/* Mobile TOC */}
          <details className="group mb-10 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-semibold text-[var(--text-primary)] [&::-webkit-details-marker]:hidden">
              Contents
              <ChevronDown
                className="h-4 w-4 text-[var(--text-muted)] transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <ol className="border-t border-[var(--border-default)] px-5 py-3">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-baseline gap-3 py-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:text-brand-crimson"
                  >
                    <span className="text-[11px] font-semibold tabular-nums text-[var(--text-muted)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{s.title.replace(/^\d+\.\s/, '')}</span>
                  </a>
                </li>
              ))}
            </ol>
          </details>

          <main className="max-w-[70ch]">
            {/* Intro */}
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              This document constitutes a legally binding agreement between you (the client) and <strong className="font-semibold text-[var(--text-primary)]">Logink</strong>, based in Jakarta, Indonesia. Please read these terms carefully before using our services.
            </p>

            {/* Sections */}
            <div className="mt-4 divide-y divide-[var(--border-default)]">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-24 py-10">
                  <h2 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-[var(--text-primary)]">
                    <span className="mr-2 tabular-nums text-brand-crimson">
                      {String(i + 1).padStart(2, '0')}.
                    </span>
                    {s.title.replace(/^\d+\.\s/, '')}
                  </h2>
                  <div className="mt-6 space-y-6">
                    {s.content.map((c, j) => (
                      <div key={j}>
                        <h3 className="mb-1.5 font-semibold text-[var(--text-primary)]">{c.subtitle}</h3>
                        <p className="text-[15px] leading-[1.7] text-[var(--text-secondary)]">{c.text}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Quiet contact strip */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-6 py-5">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">Have questions about our terms?</p>
                <p className="mt-0.5 text-sm text-[var(--text-muted)]">Our team is ready to help and explain further.</p>
              </div>
              <p className="text-sm">
                <a href="mailto:hello@logink.co" className="font-semibold text-brand-purple hover:underline">
                  hello@logink.co
                </a>
                <span aria-hidden="true" className="mx-2 text-[var(--text-muted)]">·</span>
                <Link
                  href="/en/contact"
                  className="font-medium text-[var(--text-secondary)] transition-colors hover:text-brand-crimson"
                >
                  Contact Us →
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
