import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { CTASection } from '@/components/public/CTASection'

export const metadata: Metadata = buildMetadata({
  title: 'Tentang Kami',
  description: 'Logink adalah agensi digital marketing 360° di Jakarta yang menggabungkan strategi, kreativitas, dan data menjadi satu sistem terintegrasi.',
  path: '/about',
})

const VALUES = [
  { title: 'Berbasis Data', desc: 'Setiap keputusan didukung oleh data. Kami ukur yang benar-benar penting: revenue, leads, dan ROAS.', color: '#7C3AED' },
  { title: 'Cakupan 360°', desc: 'Lima layanan terintegrasi yang bekerja sebagai satu sistem — bukan agensi-agensi yang terpisah.', color: '#DB2777' },
  { title: 'Kreativitas di Depan', desc: 'Konten yang bikin scroll berhenti, dirancang khusus untuk brand dan audiens kamu.', color: '#D97706' },
  { title: 'Fokus pada Hasil', desc: 'Kami tidak berhenti sampai target tercapai. Laporan transparan, akses penuh ke setiap akun.', color: '#F59E0B' },
]

const DIFFERENTIATORS = [
  {
    title: 'Tidak Ada Tim yang Bekerja Sendiri-Sendiri',
    desc: '"Kami mengelola semua channel sebagai satu sistem. SEO kamu menginformasikan iklan kamu. Social media kamu mengisi konten. Semua saling menguatkan."',
  },
  {
    title: 'Tidak Ada Metrik yang Menyesatkan',
    desc: '"Kami mengoptimalkan untuk revenue, leads, dan ROAS — bukan impresi dan jumlah followers."',
  },
  {
    title: 'Tidak Ada Konten Generik',
    desc: '"Setiap kreasi dibuat untuk brand kamu, audiens kamu, dan pasar Indonesia."',
  },
  {
    title: 'Tidak Ada Kotak Hitam',
    desc: '"Dashboard GA4 yang transparan, laporan Looker Studio, dan akses penuh ke setiap akun."',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 mesh-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full border border-brand-violet/20 bg-brand-violet/5 text-brand-violet text-sm font-medium mb-6">
            Tentang Logink
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] mb-6">
            Kreativitas yang{' '}
            <span className="gradient-text">Terhubung</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            Kami menghubungkan strategi, kreativitas, dan data menjadi satu mesin yang mulus untuk pertumbuhan digital brand kamu.
          </p>
        </div>
      </section>

      {/* Misi */}
      <section className="py-20 px-4 bg-[var(--bg-surface)]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Misi Kami</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                Logink lahir dari satu keyakinan: brand tidak harus memilih antara strategi yang kuat, konten kreatif, dan hasil yang terukur. Kamu bisa dapat ketiganya.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                Kami membangun Logink sebagai agensi digital marketing 360° yang mengelola semua channel sebagai satu sistem terintegrasi — bukan kumpulan tim yang bekerja sendiri-sendiri.
              </p>
              <blockquote className="border-l-4 border-brand-violet pl-6 italic text-[var(--text-primary)] font-medium">
                &ldquo;Kami menghubungkan strategi, kreativitas, dan data menjadi satu mesin yang mulus.&rdquo;
              </blockquote>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-primary)] p-5"
                  style={{ borderTopColor: v.color, borderTopWidth: '3px' }}
                >
                  <h3 className="font-bold text-[var(--text-primary)] mb-2" style={{ color: v.color }}>{v.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kenapa Bukan Agensi Lain */}
      <section className="py-20 px-4 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Kenapa Bukan Agensi <span className="gradient-text">Lain?</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
              Kami tahu kamu punya banyak pilihan. Inilah kenapa klien memilih Logink.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {DIFFERENTIATORS.map((d, i) => (
              <div key={i} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)]">{d.title}</h3>
                </div>
                <p className="text-sm text-[var(--text-secondary)] italic leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Siap Kerja Sama?" subtitle="Mari diskusikan bagaimana kami bisa bantu brand kamu berkembang." locale="id" />
    </>
  )
}
