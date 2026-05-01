import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import Link from 'next/link'

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'Logink Privacy Policy: how we collect, use, and protect your personal data.',
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
    <div className="bg-[var(--bg-primary)] min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-12 px-4 mesh-gradient">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full border border-brand-violet/20 bg-brand-violet/5 text-brand-violet text-sm font-medium mb-6">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] mb-4">
            Privacy Policy
          </h1>
          <p className="text-[var(--text-secondary)] text-lg">
            We are committed to protecting your privacy and personal data.
          </p>
          <p className="text-sm text-[var(--text-muted)] mt-4">
            Last updated: <span className="font-medium text-[var(--text-secondary)]">{LAST_UPDATED}</span>
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 lg:flex lg:gap-12">
        {/* Sticky TOC */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-28">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">Contents</p>
            <nav className="space-y-1">
              {sections.map(s => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-sm text-[var(--text-muted)] hover:text-brand-violet transition-colors py-1 pl-3 border-l-2 border-transparent hover:border-brand-violet"
                >
                  {s.title.replace(/^\d+\.\s/, '')}
                </a>
              ))}
            </nav>
            <div className="mt-8 pt-6 border-t border-[var(--border-default)]">
              <p className="text-xs text-[var(--text-muted)] mb-2">Other language</p>
              <Link href="/privacy" className="text-xs text-brand-violet hover:underline">
                Versi Bahasa Indonesia →
              </Link>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 max-w-3xl">
          {/* Intro */}
          <div className="mb-10 p-6 rounded-2xl bg-brand-violet/5 border border-brand-violet/10">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Logink ("we", "us", or "our") operates the website <strong className="text-[var(--text-primary)]">logink.co</strong> and provides digital marketing services. This Privacy Policy explains how we collect, use, and protect your information when you use our services.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map(s => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6 pb-3 border-b border-[var(--border-default)]">
                  {s.title}
                </h2>
                <div className="space-y-5">
                  {s.content.map((c, i) => (
                    <div key={i}>
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">{c.subtitle}</h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed text-sm">{c.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* CTA footer */}
          <div className="mt-16 p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] text-center">
            <p className="text-[var(--text-secondary)] mb-4">Have questions about our privacy policy?</p>
            <Link
              href="/en/contact"
              className="inline-block gradient-bg text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Contact Us
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
