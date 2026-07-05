import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { CTASection } from '@/components/public/CTASection'
import { Reveal } from './Reveal'
import { BarChart3, Orbit, Sparkles, Target, X, Check } from 'lucide-react'

export const metadata: Metadata = buildMetadata({
  title: 'Tentang Kami',
  description: 'Logink adalah agensi digital marketing 360° di Jakarta yang menggabungkan strategi, kreativitas, dan data menjadi satu sistem terintegrasi untuk brand Anda.',
  path: '/about',
})

const VALUES = [
  { title: 'Berbasis Data', desc: 'Setiap keputusan didukung oleh data. Kami mengukur yang benar-benar penting: revenue, leads, dan ROAS.', color: '#A855F7', tint: 'bg-brand-lilac', icon: BarChart3 },
  { title: 'Cakupan 360°', desc: 'Lima layanan terintegrasi yang bekerja sebagai satu sistem, bukan beberapa agensi yang berjalan terpisah.', color: '#D81C5C', tint: 'bg-brand-rose', icon: Orbit },
  { title: 'Kreativitas Terdepan', desc: 'Konten yang mencuri perhatian di feed, dirancang khusus untuk brand dan audiens Anda.', color: '#F5A623', tint: 'bg-brand-peach', icon: Sparkles },
  { title: 'Fokus pada Hasil', desc: 'Kami tidak berhenti sebelum target tercapai. Laporan transparan dan akses penuh ke setiap akun.', color: '#F88438', tint: 'bg-white', icon: Target },
]

const DIFFERENTIATORS = [
  {
    title: 'Tidak Ada Tim yang Bekerja Sendiri-Sendiri',
    desc: '"Kami mengelola semua channel sebagai satu sistem. Data SEO Anda menajamkan iklan Anda. Social media Anda memasok konten. Semuanya saling menguatkan."',
  },
  {
    title: 'Tidak Ada Metrik yang Menyesatkan',
    desc: '"Kami mengoptimalkan revenue, leads, dan ROAS, bukan sekadar impresi dan jumlah followers."',
  },
  {
    title: 'Tidak Ada Konten Generik',
    desc: '"Setiap karya dibuat khusus untuk brand Anda, audiens Anda, dan pasar Indonesia."',
  },
  {
    title: 'Tidak Ada Sistem Tertutup',
    desc: '"Dashboard GA4 yang transparan, laporan Looker Studio, dan akses penuh ke setiap akun."',
  },
]

/* Turunkan frasa "pain" dari judul klaim — data tetap utuh */
const pain = (title: string) => title.replace(/^Tidak Ada\s+/, '')

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 px-6 mesh-gradient">
        <div aria-hidden className="orb" style={{ width: 320, height: 320, top: -110, right: -70, background: 'rgba(248,132,56,0.20)' }} />
        <div aria-hidden className="orb" style={{ width: 260, height: 260, bottom: -120, left: -60, background: 'rgba(168,85,247,0.14)', animationDelay: '-7s' }} />
        <Reveal className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="eyebrow block mb-4">Tentang Logink</span>
          <h1 className="font-display text-[clamp(2.75rem,6vw,4.5rem)] font-bold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-6">
            Kreativitas yang{' '}
            <span className="gradient-text">Terhubung</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            Kami menyatukan strategi, kreativitas, dan data menjadi satu sistem yang mulus untuk pertumbuhan digital brand Anda.
          </p>
        </Reveal>
      </section>

      {/* Misi + Nilai */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--text-primary)] mb-6">Misi Kami</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              Logink lahir dari satu keyakinan: brand tidak harus memilih antara strategi yang kuat, konten kreatif, dan hasil yang terukur. Anda bisa mendapatkan ketiganya.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              Kami membangun Logink sebagai agensi digital marketing 360° yang mengelola semua channel sebagai satu sistem terintegrasi, bukan kumpulan tim yang bekerja sendiri-sendiri.
            </p>
            <blockquote className="relative pl-6 italic text-[var(--text-primary)] font-medium">
              <span aria-hidden className="absolute left-0 top-0 h-full w-1 rounded-full gradient-brand-bg" />
              &ldquo;Kami menyatukan strategi, kreativitas, dan data menjadi satu sistem yang mulus.&rdquo;
            </blockquote>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1} className="h-full">
                <div className={`h-full rounded-2xl border border-[var(--border-default)] p-5 ${v.tint} transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(35,26,38,0.16)]`}>
                  <div
                    className="h-10 w-10 rounded-xl bg-white border border-[var(--border-default)] shadow-sm flex items-center justify-center mb-3"
                    style={{ color: v.color }}
                    aria-hidden="true"
                  >
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-semibold text-[var(--text-primary)] mb-2">{v.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Kenapa Bukan Agensi Lain */}
      <section className="py-20 md:py-28 px-6 bg-brand-peach">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="eyebrow block mb-3">Kenapa Logink</span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--text-primary)] mb-4">
              Kenapa Bukan Agensi <span className="gradient-text">Lain?</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
              Kami tahu Anda punya banyak pilihan. Inilah alasan klien memilih Logink.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {DIFFERENTIATORS.map((d, i) => (
              <Reveal key={i} delay={i * 0.08} className="h-full">
                <div className="relative h-full overflow-hidden rounded-2xl border border-[var(--border-default)] bg-white p-6 pl-8 transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(35,26,38,0.16)]">
                  <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 gradient-brand-bg" />
                  <h3 className="sr-only">{d.title}</h3>
                  <p className="flex items-center gap-2 text-sm text-[var(--text-secondary)] line-through decoration-[var(--text-muted)] mb-3">
                    <X className="h-4 w-4 flex-shrink-0 text-brand-crimson" aria-hidden="true" />
                    {pain(d.title)}
                  </p>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full gradient-bg text-white" aria-hidden="true">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <p className="font-semibold text-[var(--text-primary)] leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Siap Kerja Sama?" subtitle="Mari diskusikan bagaimana kami bisa membantu brand Anda berkembang." locale="id" />
    </>
  )
}
