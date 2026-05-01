import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { ContactForm } from '@/components/public/ContactForm'
import { SITE, WHATSAPP_URL } from '@/lib/constants'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = buildMetadata({
  title: 'Hubungi Kami',
  description: 'Konsultasi digital marketing gratis bersama tim Logink. Ceritakan kebutuhan brand kamu dan kami akan susun strategi yang tepat, terukur, dan sesuai anggaran.',
  path: '/contact',
})

export default async function ContactPage() {
  let services: { id: string; name: string; slug: string }[] = []
  try {
    services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      select: { id: true, name: true, slug: true },
    })
  } catch {}

  return (
    <>
      <section className="pt-32 pb-16 px-4 mesh-gradient text-center">
        <span className="inline-block px-4 py-1.5 rounded-full border border-brand-violet/20 bg-brand-violet/5 text-brand-violet text-sm font-medium mb-6">Kontak</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] mb-4">
          Ayo Kerja <span className="gradient-text">Bersama</span>
        </h1>
        <p className="text-[var(--text-secondary)] max-w-md mx-auto">Ceritakan bisnis kamu. Kami akan merespons dalam 24 jam.</p>
      </section>

      <section className="py-20 px-4 bg-[var(--bg-primary)]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <ContactForm services={services} />

          {/* Info kontak */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Atau Hubungi Kami Langsung</h2>
              <div className="space-y-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-emerald-500/40 group transition-all"
                >
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--text-primary)]">WhatsApp</div>
                    <div className="text-sm text-[var(--text-secondary)]">Respons dalam hitungan menit</div>
                  </div>
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-brand-violet/40 group transition-all"
                >
                  <div className="h-12 w-12 rounded-xl bg-brand-violet/10 text-brand-violet flex items-center justify-center group-hover:bg-brand-violet/20 transition-colors">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--text-primary)]">{SITE.email}</div>
                    <div className="text-sm text-[var(--text-secondary)]">Respons dalam 24 jam</div>
                  </div>
                </a>
                <address className="not-italic flex items-center gap-4 p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)]">
                  <div className="h-12 w-12 rounded-xl bg-brand-amber/10 text-brand-amber flex items-center justify-center" aria-hidden="true">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--text-primary)]">Jakarta, Indonesia</div>
                    <div className="text-sm text-[var(--text-secondary)]">{SITE.address}</div>
                  </div>
                </address>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
              <h3 className="font-bold text-[var(--text-primary)] mb-4">Selanjutnya Apa?</h3>
              <ol className="space-y-3">
                {[
                  'Kami review brief kamu dalam 24 jam',
                  'Jadwalkan sesi discovery gratis selama 30 menit',
                  'Kami siapkan proposal yang disesuaikan',
                  'Onboarding & kickoff dalam 1 minggu',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                    <span className="h-6 w-6 rounded-full gradient-bg text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
