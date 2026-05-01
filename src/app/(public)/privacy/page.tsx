import { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import Link from 'next/link'

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
    <div className="bg-[var(--bg-primary)] min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-12 px-4 mesh-gradient">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full border border-brand-violet/20 bg-brand-violet/5 text-brand-violet text-sm font-medium mb-6">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] mb-4">
            Kebijakan Privasi
          </h1>
          <p className="text-[var(--text-secondary)] text-lg">
            Kami berkomitmen untuk melindungi privasi dan data pribadi Anda.
          </p>
          <p className="text-sm text-[var(--text-muted)] mt-4">
            Terakhir diperbarui: <span className="font-medium text-[var(--text-secondary)]">{LAST_UPDATED}</span>
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 lg:flex lg:gap-12">
        {/* Sticky TOC */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-28">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">Daftar Isi</p>
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
              <p className="text-xs text-[var(--text-muted)] mb-2">Versi bahasa lain</p>
              <Link href="/en/privacy" className="text-xs text-brand-violet hover:underline">
                English version →
              </Link>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 max-w-3xl">
          {/* Intro */}
          <div className="mb-10 p-6 rounded-2xl bg-brand-violet/5 border border-brand-violet/10">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Logink ("kami", "kita", atau "milik kami") mengoperasikan situs web <strong className="text-[var(--text-primary)]">logink.co</strong> dan menyediakan layanan digital marketing. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda ketika Anda menggunakan layanan kami.
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
            <p className="text-[var(--text-secondary)] mb-4">Ada pertanyaan tentang kebijakan privasi kami?</p>
            <Link
              href="/contact"
              className="inline-block gradient-bg text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Hubungi Kami
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
