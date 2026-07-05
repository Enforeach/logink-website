import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export const metadata: Metadata = buildMetadata({
  title: 'Syarat & Ketentuan',
  description: 'Syarat dan Ketentuan layanan Logink mengatur hak dan kewajiban antara klien dan Logink, termasuk ketentuan pembayaran, pengiriman, dan penyelesaian sengketa.',
  path: '/terms',
})

const LAST_UPDATED = '1 Mei 2025'

const sections = [
  {
    id: 'penerimaan',
    title: '1. Penerimaan Syarat',
    content: [
      {
        subtitle: 'Persetujuan Penggunaan',
        text: 'Dengan mengakses atau menggunakan situs web logink.co dan layanan Logink, Anda menyatakan telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat & Ketentuan ini. Jika Anda tidak menyetujui syarat ini, mohon untuk tidak menggunakan layanan kami.',
      },
      {
        subtitle: 'Kapasitas Hukum',
        text: 'Dengan menggunakan layanan kami, Anda menyatakan bahwa Anda berusia minimal 18 tahun dan memiliki kapasitas hukum penuh untuk mengikatkan diri dalam perjanjian ini, baik atas nama diri sendiri maupun atas nama entitas bisnis yang Anda wakili.',
      },
    ],
  },
  {
    id: 'layanan',
    title: '2. Deskripsi Layanan',
    content: [
      {
        subtitle: 'Cakupan Layanan',
        text: 'Logink menyediakan layanan digital marketing 360° yang meliputi: SEO & Content Marketing, Social Media Management, Paid Advertising (Google Ads, Meta Ads, dan platform lainnya), Creative Services (desain grafis, produksi konten visual), serta Website & Landing Page Development.',
      },
      {
        subtitle: 'Ruang Lingkup Pekerjaan',
        text: 'Detail layanan, deliverable, timeline, dan harga akan ditetapkan dalam Perjanjian Layanan atau Proposal terpisah yang ditandatangani oleh kedua belah pihak. Syarat & Ketentuan ini berlaku sebagai dasar hukum untuk seluruh perjanjian tersebut.',
      },
      {
        subtitle: 'Perubahan Layanan',
        text: 'Logink berhak mengubah, menangguhkan, atau menghentikan bagian dari layanan kapan saja dengan pemberitahuan wajar kepada klien. Perubahan yang berdampak signifikan terhadap kontrak aktif akan dikomunikasikan minimal 30 hari sebelumnya.',
      },
    ],
  },
  {
    id: 'kewajiban-klien',
    title: '3. Kewajiban Klien',
    content: [
      {
        subtitle: 'Informasi dan Akses',
        text: 'Klien wajib menyediakan informasi akurat, materi, akses akun, dan sumber daya yang diperlukan Logink untuk melaksanakan layanan secara tepat waktu. Keterlambatan dalam penyediaan informasi yang diperlukan dapat mempengaruhi jadwal dan hasil pekerjaan.',
      },
      {
        subtitle: 'Persetujuan Konten',
        text: 'Klien bertanggung jawab untuk meninjau dan menyetujui seluruh konten sebelum dipublikasikan. Persetujuan yang diberikan klien atas konten yang disiapkan Logink merupakan konfirmasi bahwa konten tersebut akurat dan sesuai dengan bisnis klien.',
      },
      {
        subtitle: 'Kepatuhan Hukum',
        text: 'Klien wajib memastikan bahwa bisnis, produk, dan layanan mereka mematuhi seluruh hukum dan regulasi yang berlaku. Klien bertanggung jawab atas kebenaran dan legalitas informasi yang diberikan kepada Logink.',
      },
      {
        subtitle: 'Kerahasiaan',
        text: 'Klien wajib menjaga kerahasiaan informasi, metodologi, tools, dan strategi yang dibagikan Logink dalam konteks hubungan kerja, dan tidak menggunakannya untuk kepentingan di luar lingkup perjanjian.',
      },
    ],
  },
  {
    id: 'kewajiban-logink',
    title: '4. Kewajiban Logink',
    content: [
      {
        subtitle: 'Standar Profesional',
        text: 'Logink berkomitmen untuk memberikan layanan dengan standar profesional tertinggi, menggunakan personel yang kompeten dan berpengalaman, serta menerapkan praktik terbaik industri dalam setiap pekerjaan.',
      },
      {
        subtitle: 'Transparansi Pelaporan',
        text: 'Kami memberikan laporan berkala yang transparan mengenai kinerja kampanye dan kemajuan pekerjaan sesuai frekuensi yang disepakati dalam kontrak.',
      },
      {
        subtitle: 'Kerahasiaan Informasi Klien',
        text: 'Logink menjaga kerahasiaan seluruh informasi bisnis, data, dan strategi klien. Informasi tersebut tidak akan diungkapkan kepada pihak ketiga tanpa persetujuan tertulis dari klien, kecuali diwajibkan oleh hukum.',
      },
    ],
  },
  {
    id: 'pembayaran',
    title: '5. Pembayaran dan Penagihan',
    content: [
      {
        subtitle: 'Struktur Pembayaran',
        text: 'Ketentuan pembayaran, termasuk harga, jadwal pembayaran, dan metode pembayaran yang diterima, akan ditetapkan dalam Proposal atau Perjanjian Layanan. Secara umum, proyek baru memerlukan pembayaran uang muka sebelum pekerjaan dimulai.',
      },
      {
        subtitle: 'Keterlambatan Pembayaran',
        text: 'Pembayaran yang melewati jatuh tempo lebih dari 14 hari kerja dapat mengakibatkan penghentian sementara layanan. Logink berhak menerapkan biaya keterlambatan sebesar 1,5% per bulan dari jumlah yang belum dibayar.',
      },
      {
        subtitle: 'Pengembalian Dana',
        text: 'Uang muka yang telah dibayarkan tidak dapat dikembalikan kecuali Logink tidak dapat memulai pekerjaan dalam waktu yang disepakati. Pengembalian dana parsial dapat dipertimbangkan untuk bagian pekerjaan yang belum dimulai sesuai kebijaksanaan Logink.',
      },
      {
        subtitle: 'Biaya Pihak Ketiga',
        text: 'Biaya untuk platform iklan (Google Ads, Meta Ads, dll.), pembelian konten, atau layanan pihak ketiga lainnya yang diperlukan dalam kampanye merupakan biaya tambahan di luar biaya manajemen Logink dan akan dikomunikasikan terlebih dahulu.',
      },
    ],
  },
  {
    id: 'kekayaan-intelektual',
    title: '6. Kekayaan Intelektual',
    content: [
      {
        subtitle: 'Kepemilikan Konten Klien',
        text: 'Semua materi, logo, konten, data, dan informasi yang disediakan klien tetap menjadi milik klien. Klien memberikan Logink lisensi terbatas untuk menggunakan materi tersebut semata-mata untuk pelaksanaan layanan.',
      },
      {
        subtitle: 'Kepemilikan Deliverable',
        text: 'Setelah pembayaran penuh dilakukan, hak kepemilikan atas deliverable yang dibuat khusus untuk klien (seperti desain, konten tertulis, website) akan dialihkan kepada klien. Namun, Logink mempertahankan hak untuk menampilkan karya tersebut dalam portofolio kami.',
      },
      {
        subtitle: 'Alat dan Metodologi Logink',
        text: 'Template, sistem, metodologi, tools proprietary, dan kekayaan intelektual lain yang dikembangkan Logink secara independen tetap menjadi milik Logink, terlepas dari keterlibatan dalam proyek klien.',
      },
    ],
  },
  {
    id: 'kerahasiaan',
    title: '7. Kerahasiaan',
    content: [
      {
        subtitle: 'Informasi Rahasia',
        text: 'Kedua belah pihak setuju untuk menjaga kerahasiaan informasi bisnis sensitif yang dibagikan dalam konteks hubungan kerja, termasuk namun tidak terbatas pada strategi bisnis, data keuangan, daftar pelanggan, dan proses internal.',
      },
      {
        subtitle: 'Pengecualian',
        text: 'Kewajiban kerahasiaan tidak berlaku untuk informasi yang sudah tersedia untuk umum bukan karena pelanggaran perjanjian ini, informasi yang diterima secara sah dari pihak ketiga, atau informasi yang wajib diungkapkan berdasarkan hukum.',
      },
    ],
  },
  {
    id: 'penghentian',
    title: '8. Penghentian Layanan',
    content: [
      {
        subtitle: 'Penghentian oleh Klien',
        text: 'Klien dapat mengakhiri kontrak dengan memberikan pemberitahuan tertulis minimal 30 hari sebelumnya. Klien tetap berkewajiban membayar semua biaya atas pekerjaan yang telah diselesaikan dan biaya yang telah timbul hingga tanggal efektif penghentian.',
      },
      {
        subtitle: 'Penghentian oleh Logink',
        text: 'Logink berhak mengakhiri kontrak dengan pemberitahuan 30 hari, atau segera jika klien melanggar syarat pembayaran, memberikan informasi palsu, atau terlibat dalam aktivitas ilegal. Dalam kasus pelanggaran berat, Logink tidak berkewajiban mengembalikan biaya yang telah dibayarkan.',
      },
      {
        subtitle: 'Setelah Penghentian',
        text: 'Setelah penghentian, Logink akan menghentikan akses ke akun dan aset klien, menyerahkan deliverable yang telah selesai dan dibayar, serta menghapus data klien sesuai kebijakan retensi data kami.',
      },
    ],
  },
  {
    id: 'batasan-tanggung-jawab',
    title: '9. Batasan Tanggung Jawab',
    content: [
      {
        subtitle: 'Tidak Ada Jaminan Hasil',
        text: 'Logink tidak menjamin hasil spesifik dari kampanye digital marketing, seperti peringkat tertentu di mesin pencari, jumlah leads, atau tingkat konversi tertentu. Performa bergantung pada banyak faktor di luar kendali kami termasuk kondisi pasar dan algoritma platform.',
      },
      {
        subtitle: 'Batasan Ganti Rugi',
        text: 'Kewajiban total Logink kepada klien atas kerugian apapun tidak akan melebihi jumlah yang dibayarkan klien kepada Logink selama 3 bulan terakhir sebelum klaim. Logink tidak bertanggung jawab atas kerugian tidak langsung, kehilangan keuntungan, atau kerusakan insidental.',
      },
      {
        subtitle: 'Force Majeure',
        text: 'Logink tidak bertanggung jawab atas keterlambatan atau kegagalan dalam memenuhi kewajiban akibat keadaan di luar kendali yang wajar, termasuk bencana alam, gangguan jaringan pihak ketiga, perubahan algoritma platform, atau kejadian luar biasa lainnya.',
      },
    ],
  },
  {
    id: 'hukum',
    title: '10. Hukum yang Berlaku',
    content: [
      {
        subtitle: 'Yurisdiksi',
        text: 'Syarat & Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. Setiap sengketa yang timbul dari atau berkaitan dengan syarat ini akan diselesaikan di pengadilan yang berwenang di Jakarta.',
      },
      {
        subtitle: 'Penyelesaian Sengketa',
        text: 'Sebelum menempuh jalur hukum formal, kedua belah pihak setuju untuk berupaya menyelesaikan sengketa melalui negosiasi langsung selama minimal 30 hari. Jika negosiasi gagal, sengketa dapat dibawa ke mediasi atau arbitrase sesuai kesepakatan bersama.',
      },
    ],
  },
  {
    id: 'perubahan',
    title: '11. Perubahan Syarat',
    content: [
      {
        subtitle: 'Hak Perubahan',
        text: 'Logink berhak mengubah Syarat & Ketentuan ini kapan saja. Perubahan material akan dikomunikasikan melalui email atau pemberitahuan di situs web minimal 14 hari sebelum berlaku. Penggunaan layanan yang berkelanjutan setelah perubahan berlaku merupakan penerimaan terhadap syarat yang diperbarui.',
      },
    ],
  },
  {
    id: 'kontak',
    title: '12. Hubungi Kami',
    content: [
      {
        subtitle: 'Pertanyaan Legal',
        text: 'Jika Anda memiliki pertanyaan tentang Syarat & Ketentuan ini atau memerlukan klarifikasi lebih lanjut, silakan hubungi kami melalui halaman kontak atau email ke hello@logink.co. Tim kami berkomitmen untuk merespons dalam 3 hari kerja.',
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
            Syarat &amp; Ketentuan
          </h1>
          <p className="mt-5 max-w-[60ch] text-lg text-[var(--text-secondary)]">
            Aturan dan ketentuan yang mengatur penggunaan layanan Logink.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--text-muted)]">
            <span>
              Terakhir diperbarui:{' '}
              <span className="font-medium text-[var(--text-secondary)]">{LAST_UPDATED}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{sections.length} bagian</span>
            <span aria-hidden="true">·</span>
            <Link href="/en/terms" className="font-medium text-brand-purple hover:underline">
              English version →
            </Link>
          </div>
          <div className="mt-10 border-b border-[var(--border-default)]" />
        </div>
      </header>

      {/* F layout: sticky TOC stem left, reading column right */}
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-12 lg:flex lg:gap-16">
        {/* Desktop TOC rail */}
        <aside className="hidden w-[260px] flex-shrink-0 lg:block">
          <nav aria-label="Daftar isi" className="sticky top-24">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Daftar Isi
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
              Daftar Isi
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
              Dokumen ini merupakan perjanjian yang mengikat secara hukum antara Anda (klien) dan <strong className="font-semibold text-[var(--text-primary)]">Logink</strong>, yang beralamat di Jakarta, Indonesia. Harap baca syarat ini dengan seksama sebelum menggunakan layanan kami.
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
                <p className="text-sm font-medium text-[var(--text-primary)]">Ada pertanyaan tentang syarat layanan kami?</p>
                <p className="mt-0.5 text-sm text-[var(--text-muted)]">Tim kami siap membantu dan menjelaskan lebih lanjut.</p>
              </div>
              <p className="text-sm">
                <a href="mailto:hello@logink.co" className="font-semibold text-brand-purple hover:underline">
                  hello@logink.co
                </a>
                <span aria-hidden="true" className="mx-2 text-[var(--text-muted)]">·</span>
                <Link
                  href="/contact"
                  className="font-medium text-[var(--text-secondary)] transition-colors hover:text-brand-crimson"
                >
                  Hubungi Kami →
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
