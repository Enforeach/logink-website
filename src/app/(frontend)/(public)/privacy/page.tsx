import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export const metadata: Metadata = buildMetadata({
  title: 'Kebijakan Privasi',
  description: 'Kebijakan Privasi Logink menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi Anda saat menggunakan layanan kami.',
  path: '/privacy',
})

const LAST_UPDATED = '1 Mei 2025'

const sections = [
  {
    id: 'pengumpulan',
    title: '1. Informasi yang Kami Kumpulkan',
    content: [
      {
        subtitle: 'Informasi yang Anda Berikan',
        text: 'Kami mengumpulkan informasi yang Anda berikan secara langsung, seperti nama, alamat email, nomor telepon, nama perusahaan, dan pesan ketika Anda mengisi formulir kontak, mendaftar untuk layanan kami, atau berkomunikasi dengan tim kami.',
      },
      {
        subtitle: 'Informasi yang Dikumpulkan Secara Otomatis',
        text: 'Ketika Anda mengunjungi situs web kami, kami secara otomatis mengumpulkan informasi tertentu termasuk alamat IP, jenis browser, halaman yang dikunjungi, waktu kunjungan, dan data penggunaan lainnya melalui cookies dan teknologi pelacakan serupa.',
      },
      {
        subtitle: 'Informasi dari Pihak Ketiga',
        text: 'Kami dapat menerima informasi tentang Anda dari sumber pihak ketiga seperti platform media sosial, mitra bisnis, atau layanan analitik, yang kami kombinasikan dengan informasi yang sudah kami miliki.',
      },
    ],
  },
  {
    id: 'penggunaan',
    title: '2. Cara Kami Menggunakan Informasi Anda',
    content: [
      {
        subtitle: 'Penyediaan Layanan',
        text: 'Kami menggunakan informasi Anda untuk menyediakan, memelihara, dan meningkatkan layanan digital marketing kami, memproses transaksi, dan mengelola akun Anda.',
      },
      {
        subtitle: 'Komunikasi',
        text: 'Kami menggunakan informasi kontak Anda untuk merespons pertanyaan, mengirimkan pembaruan tentang layanan kami, mengirim materi pemasaran (dengan persetujuan Anda), dan memberikan dukungan pelanggan.',
      },
      {
        subtitle: 'Analitik dan Peningkatan',
        text: 'Kami menganalisis pola penggunaan untuk memahami cara situs web dan layanan kami digunakan, sehingga kami dapat meningkatkan pengalaman pengguna dan mengembangkan fitur baru.',
      },
      {
        subtitle: 'Kepatuhan Hukum',
        text: 'Kami dapat menggunakan informasi Anda untuk mematuhi kewajiban hukum yang berlaku, menyelesaikan sengketa, dan menegakkan perjanjian kami.',
      },
    ],
  },
  {
    id: 'berbagi',
    title: '3. Berbagi Informasi',
    content: [
      {
        subtitle: 'Kami Tidak Menjual Data Anda',
        text: 'Logink tidak menjual, menyewakan, atau memperdagangkan informasi pribadi Anda kepada pihak ketiga untuk tujuan pemasaran mereka.',
      },
      {
        subtitle: 'Penyedia Layanan',
        text: 'Kami dapat berbagi informasi Anda dengan penyedia layanan tepercaya yang membantu kami mengoperasikan bisnis kami (seperti penyedia hosting, layanan email, dan platform analitik) yang terikat oleh perjanjian kerahasiaan.',
      },
      {
        subtitle: 'Persyaratan Hukum',
        text: 'Kami dapat mengungkapkan informasi Anda jika diwajibkan oleh hukum, proses hukum, atau permintaan yang sah dari otoritas pemerintah.',
      },
    ],
  },
  {
    id: 'cookies',
    title: '4. Cookies dan Teknologi Pelacakan',
    content: [
      {
        subtitle: 'Penggunaan Cookies',
        text: 'Situs web kami menggunakan cookies dan teknologi serupa untuk meningkatkan pengalaman browsing Anda, menganalisis lalu lintas situs, dan memahami dari mana pengunjung kami berasal. Cookies adalah file teks kecil yang disimpan di perangkat Anda.',
      },
      {
        subtitle: 'Jenis Cookies',
        text: 'Kami menggunakan cookies esensial (diperlukan untuk fungsionalitas situs), cookies analitik (seperti Google Analytics untuk memahami perilaku pengguna), dan cookies preferensi (untuk mengingat pilihan Anda).',
      },
      {
        subtitle: 'Kontrol Cookies',
        text: 'Anda dapat mengontrol dan menghapus cookies melalui pengaturan browser Anda. Namun, menonaktifkan cookies tertentu dapat mempengaruhi fungsionalitas situs web kami.',
      },
    ],
  },
  {
    id: 'keamanan',
    title: '5. Keamanan Data',
    content: [
      {
        subtitle: 'Langkah Perlindungan',
        text: 'Kami menerapkan langkah keamanan teknis dan organisasi yang sesuai untuk melindungi informasi pribadi Anda dari akses tidak sah, pengubahan, pengungkapan, atau penghancuran. Termasuk enkripsi data, akses terbatas, dan audit keamanan berkala.',
      },
      {
        subtitle: 'Keterbatasan',
        text: 'Meskipun kami berupaya melindungi informasi Anda, tidak ada metode transmisi melalui internet atau penyimpanan elektronik yang 100% aman. Kami tidak dapat menjamin keamanan mutlak.',
      },
    ],
  },
  {
    id: 'hak',
    title: '6. Hak Anda',
    content: [
      {
        subtitle: 'Akses dan Koreksi',
        text: 'Anda berhak mengakses informasi pribadi yang kami miliki tentang Anda dan meminta koreksi jika tidak akurat.',
      },
      {
        subtitle: 'Penghapusan',
        text: 'Anda dapat meminta penghapusan data pribadi Anda, dengan ketentuan kami tidak diwajibkan secara hukum untuk menyimpannya.',
      },
      {
        subtitle: 'Penarikan Persetujuan',
        text: 'Jika kami memproses data Anda berdasarkan persetujuan, Anda dapat menarik persetujuan tersebut kapan saja tanpa mempengaruhi keabsahan pemrosesan sebelumnya.',
      },
      {
        subtitle: 'Opt-out Pemasaran',
        text: 'Anda dapat berhenti berlangganan komunikasi pemasaran kapan saja dengan mengklik tautan "berhenti berlangganan" di email kami atau menghubungi kami langsung.',
      },
    ],
  },
  {
    id: 'retensi',
    title: '7. Retensi Data',
    content: [
      {
        subtitle: 'Periode Penyimpanan',
        text: 'Kami menyimpan informasi pribadi Anda selama diperlukan untuk memenuhi tujuan yang dijelaskan dalam kebijakan ini, kecuali periode penyimpanan yang lebih lama diperlukan atau diizinkan oleh hukum. Data klien aktif disimpan selama masa kontrak ditambah 2 tahun untuk keperluan audit.',
      },
    ],
  },
  {
    id: 'anak',
    title: '8. Privasi Anak-anak',
    content: [
      {
        subtitle: 'Batasan Usia',
        text: 'Layanan kami tidak ditujukan untuk individu di bawah usia 18 tahun. Kami tidak secara sengaja mengumpulkan informasi pribadi dari anak-anak. Jika kami mengetahui bahwa kami telah mengumpulkan data dari anak di bawah umur, kami akan segera menghapusnya.',
      },
    ],
  },
  {
    id: 'perubahan',
    title: '9. Perubahan Kebijakan Ini',
    content: [
      {
        subtitle: 'Pembaruan',
        text: 'Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan material dengan memposting kebijakan baru di halaman ini dan memperbarui tanggal "Terakhir Diperbarui". Kami mendorong Anda untuk meninjau kebijakan ini secara berkala.',
      },
    ],
  },
  {
    id: 'kontak',
    title: '10. Hubungi Kami',
    content: [
      {
        subtitle: 'Pertanyaan tentang Privasi',
        text: 'Jika Anda memiliki pertanyaan, kekhawatiran, atau permintaan terkait Kebijakan Privasi ini atau data pribadi Anda, silakan hubungi kami melalui halaman kontak kami atau kirim email ke hello@logink.co. Kami berkomitmen untuk merespons dalam waktu 5 hari kerja.',
      },
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Title band: first horizontal sweep of the F */}
      <header className="px-6 pb-0 pt-32">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="font-display text-[clamp(2.75rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)]">
            Kebijakan Privasi
          </h1>
          <p className="mt-5 max-w-[60ch] text-lg text-[var(--text-secondary)]">
            Kami berkomitmen untuk melindungi privasi dan data pribadi Anda.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--text-muted)]">
            <span>
              Terakhir diperbarui:{' '}
              <span className="font-medium text-[var(--text-secondary)]">{LAST_UPDATED}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{sections.length} bagian</span>
            <span aria-hidden="true">·</span>
            <Link href="/en/privacy" className="font-medium text-brand-purple hover:underline">
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
              Logink (&ldquo;kami&rdquo;, &ldquo;kita&rdquo;, atau &ldquo;milik kami&rdquo;) mengoperasikan situs web <strong className="font-semibold text-[var(--text-primary)]">logink.co</strong> dan menyediakan layanan digital marketing. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda ketika Anda menggunakan layanan kami.
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
              <p className="text-sm text-[var(--text-secondary)]">Ada pertanyaan tentang kebijakan privasi kami?</p>
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
