import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'Logink Privacy Policy explains how we collect, use, store, and protect your personal data when you use our digital marketing services and website.',
  path: '/en/privacy',
})

const LAST_UPDATED = 'May 1, 2025'

const sections = [
  {
    id: 'collection',
    title: '1. Information We Collect',
    content: [
      {
        subtitle: 'Information You Provide',
        text: 'We collect information you provide directly to us, such as your name, email address, phone number, company name, and message when you fill out a contact form, register for our services, or communicate with our team.',
      },
      {
        subtitle: 'Automatically Collected Information',
        text: 'When you visit our website, we automatically collect certain information including your IP address, browser type, pages visited, time of visit, and other usage data through cookies and similar tracking technologies.',
      },
      {
        subtitle: 'Information from Third Parties',
        text: 'We may receive information about you from third-party sources such as social media platforms, business partners, or analytics services, which we combine with information we already hold.',
      },
    ],
  },
  {
    id: 'use',
    title: '2. How We Use Your Information',
    content: [
      {
        subtitle: 'Service Delivery',
        text: 'We use your information to provide, maintain, and improve our digital marketing services, process transactions, and manage your account.',
      },
      {
        subtitle: 'Communication',
        text: 'We use your contact information to respond to enquiries, send updates about our services, send marketing materials (with your consent), and provide customer support.',
      },
      {
        subtitle: 'Analytics and Improvement',
        text: 'We analyse usage patterns to understand how our website and services are used, so we can improve the user experience and develop new features.',
      },
      {
        subtitle: 'Legal Compliance',
        text: 'We may use your information to comply with applicable legal obligations, resolve disputes, and enforce our agreements.',
      },
    ],
  },
  {
    id: 'sharing',
    title: '3. Sharing of Information',
    content: [
      {
        subtitle: 'We Do Not Sell Your Data',
        text: 'Logink does not sell, rent, or trade your personal information to third parties for their marketing purposes.',
      },
      {
        subtitle: 'Service Providers',
        text: 'We may share your information with trusted service providers who help us operate our business (such as hosting providers, email services, and analytics platforms) who are bound by confidentiality agreements.',
      },
      {
        subtitle: 'Legal Requirements',
        text: 'We may disclose your information if required by law, legal process, or a valid request from government authorities.',
      },
    ],
  },
  {
    id: 'cookies',
    title: '4. Cookies and Tracking Technologies',
    content: [
      {
        subtitle: 'Use of Cookies',
        text: 'Our website uses cookies and similar technologies to enhance your browsing experience, analyse site traffic, and understand where our visitors come from. Cookies are small text files stored on your device.',
      },
      {
        subtitle: 'Types of Cookies',
        text: 'We use essential cookies (required for site functionality), analytics cookies (such as Google Analytics to understand user behaviour), and preference cookies (to remember your choices).',
      },
      {
        subtitle: 'Cookie Controls',
        text: 'You can control and delete cookies through your browser settings. However, disabling certain cookies may affect the functionality of our website.',
      },
    ],
  },
  {
    id: 'security',
    title: '5. Data Security',
    content: [
      {
        subtitle: 'Protection Measures',
        text: 'We implement appropriate technical and organisational security measures to protect your personal information from unauthorised access, alteration, disclosure, or destruction, including data encryption, restricted access, and regular security audits.',
      },
      {
        subtitle: 'Limitations',
        text: 'While we strive to protect your information, no method of internet transmission or electronic storage is 100% secure. We cannot guarantee absolute security.',
      },
    ],
  },
  {
    id: 'rights',
    title: '6. Your Rights',
    content: [
      {
        subtitle: 'Access and Correction',
        text: 'You have the right to access the personal information we hold about you and to request a correction if it is inaccurate.',
      },
      {
        subtitle: 'Deletion',
        text: 'You may request deletion of your personal data, subject to us not being legally required to retain it.',
      },
      {
        subtitle: 'Withdrawal of Consent',
        text: 'Where we process your data based on consent, you may withdraw that consent at any time without affecting the lawfulness of prior processing.',
      },
      {
        subtitle: 'Marketing Opt-out',
        text: 'You can unsubscribe from marketing communications at any time by clicking the "unsubscribe" link in our emails or by contacting us directly.',
      },
    ],
  },
  {
    id: 'retention',
    title: '7. Data Retention',
    content: [
      {
        subtitle: 'Retention Period',
        text: 'We retain your personal information for as long as necessary to fulfil the purposes described in this policy, unless a longer retention period is required or permitted by law. Active client data is retained for the duration of the contract plus 2 years for audit purposes.',
      },
    ],
  },
  {
    id: 'children',
    title: '8. Children\'s Privacy',
    content: [
      {
        subtitle: 'Age Restriction',
        text: 'Our services are not directed at individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected data from a minor, we will promptly delete it.',
      },
    ],
  },
  {
    id: 'changes',
    title: '9. Changes to This Policy',
    content: [
      {
        subtitle: 'Updates',
        text: 'We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.',
      },
    ],
  },
  {
    id: 'contact',
    title: '10. Contact Us',
    content: [
      {
        subtitle: 'Privacy Enquiries',
        text: 'If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us via our contact page or email us at hello@logink.co. We are committed to responding within 5 business days.',
      },
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Title band — first horizontal sweep of the F */}
      <header className="px-6 pb-0 pt-32">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="font-display text-[clamp(2.75rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)]">
            Privacy Policy
          </h1>
          <p className="mt-5 max-w-[60ch] text-lg text-[var(--text-secondary)]">
            We are committed to protecting your privacy and personal data.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--text-muted)]">
            <span>
              Last updated:{' '}
              <span className="font-medium text-[var(--text-secondary)]">{LAST_UPDATED}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{sections.length} sections</span>
            <span aria-hidden="true">·</span>
            <Link href="/privacy" className="font-medium text-brand-purple hover:underline">
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
              Logink (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the website <strong className="font-semibold text-[var(--text-primary)]">logink.co</strong> and provides digital marketing services. This Privacy Policy explains how we collect, use, and protect your information when you use our services.
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
              <p className="text-sm text-[var(--text-secondary)]">Have questions about our privacy policy?</p>
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
