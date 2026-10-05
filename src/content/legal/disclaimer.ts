// Disclaimer (owner 2026-10-05, page benchmarked on duomark.id). NEW copy written for Logink, not verbatim legacy
// text: it states only what is true on this site (labelled illustrations and AI images, cited public data, platform
// marks on the service pages, starting prices, no guaranteed results). Have it reviewed by counsel before launch.
import type { LegalDoc } from './types'
import type { Locale } from '@/lib/services'

const doc: Record<Locale, LegalDoc> = {
  id: {
    updated: '2026-10-05',
    lede: 'Cara membaca informasi di situs ini, sebelum Anda mengambil keputusan berdasarkan isinya.',
    intro: [
      'Disclaimer ini berlaku untuk seluruh konten di ',
      'logink.co',
      ', termasuk halaman layanan, artikel blog, studi kasus, ilustrasi, dan video. Mohon dibaca bersama Kebijakan Privasi dan Syarat & Ketentuan kami.',
    ],
    sections: [
      {
        id: 'umum',
        title: 'Informasi Bersifat Umum',
        content: [
          { subtitle: 'Untuk informasi dan edukasi', text: 'Konten di situs ini disediakan untuk informasi dan edukasi yang bersifat umum. Kami berusaha menjaganya tetap akurat dan terbaru, tetapi tidak dapat menjamin semua isinya selalu lengkap, bebas dari kesalahan, atau sesuai dengan kondisi bisnis Anda.' },
          { subtitle: 'Bukan perjanjian', text: 'Tidak ada bagian dari situs ini yang membentuk perjanjian antara Anda dan Logink. Kerja sama baru dimulai setelah scope pekerjaan dan biaya disepakati secara tertulis.' },
        ],
      },
      {
        id: 'hasil',
        title: 'Tidak Ada Jaminan Hasil',
        content: [
          { subtitle: 'Banyak faktor di luar kendali kami', text: 'Hasil digital marketing dipengaruhi banyak hal, seperti perubahan algoritma Google dan platform iklan, kondisi pasar, kompetitor, anggaran, kondisi website, serta waktu yang diberikan untuk sebuah strategi.' },
          { subtitle: 'Yang tidak kami janjikan', text: 'Kami tidak menjamin posisi tertentu di Google atau Google Maps, angka traffic, ROAS, jumlah leads, konten yang viral, maupun kutipan di Google AI Overview, ChatGPT, atau mesin AI lainnya.' },
          { subtitle: 'Perkiraan waktu dan target', text: 'Jadwal dan target yang kami sebutkan, misalnya waktu sampai ranking mulai bergerak atau target waktu muat halaman, adalah perkiraan umum berdasarkan pengalaman, bukan janji hasil.' },
        ],
      },
      {
        id: 'nasihat',
        title: 'Bukan Nasihat Profesional',
        content: [
          { subtitle: 'Bukan nasihat hukum, keuangan, atau pajak', text: 'Artikel dan panduan kami membahas digital marketing. Isinya bukan nasihat hukum, keuangan, pajak, atau profesional lainnya. Untuk keputusan seperti itu, konsultasikan dengan ahli yang berwenang.' },
        ],
      },
      {
        id: 'ilustrasi',
        title: 'Ilustrasi, Data Contoh, dan Gambar AI',
        content: [
          { subtitle: 'Ilustrasi diberi label', text: 'Mockup seperti hasil pencarian, jawaban AI, laporan, dan dashboard di halaman layanan adalah ilustrasi dengan data contoh, dan diberi label "Ilustrasi · data contoh". Angkanya tidak menggambarkan hasil klien tertentu.' },
          { subtitle: 'Gambar buatan AI', text: 'Sebagian foto dan animasi di situs ini dibuat dengan bantuan AI dan diberi label. Orang, tempat, dan bisnis di dalamnya bukan klien Logink.' },
          { subtitle: 'Studi kasus', text: 'Studi kasus menggambarkan hasil klien tertentu pada periode tertentu. Hasil tersebut tidak menjamin hasil yang sama untuk bisnis lain.' },
        ],
      },
      {
        id: 'sumber',
        title: 'Data dan Statistik Pihak Ketiga',
        content: [
          { subtitle: 'Data publik dengan sumber', text: 'Statistik pihak ketiga yang kami kutip, misalnya dari Google, Ahrefs, APJII, atau lembaga riset lain, kami tulis bersama sumber dan tahunnya. Data tersebut milik penerbitnya, dapat berubah, dan tidak selalu berlaku sama untuk pasar Indonesia.' },
        ],
      },
      {
        id: 'merek',
        title: 'Merek Dagang Pihak Ketiga',
        content: [
          { subtitle: 'Nama dan logo platform', text: 'Nama dan logo seperti Google, Google Ads, Google Maps, Meta, Instagram, Facebook, TikTok, Shopee, Tokopedia, Lazada, WhatsApp, dan ChatGPT adalah merek milik pemiliknya masing-masing. Kami memakainya hanya untuk menyebut platform yang kami gunakan atau kelola. Penggunaan ini tidak berarti ada kemitraan, sponsor, atau dukungan dari pemilik merek tersebut.' },
        ],
      },
      {
        id: 'tautan',
        title: 'Tautan ke Situs Lain',
        content: [
          { subtitle: 'Situs pihak ketiga', text: 'Situs ini berisi tautan ke situs pihak ketiga, misalnya sumber data dan platform. Kami tidak mengendalikan isi, kebijakan privasi, atau ketersediaan situs tersebut, dan tautan tidak berarti kami mendukung isinya.' },
        ],
      },
      {
        id: 'harga',
        title: 'Harga dan Penawaran',
        content: [
          { subtitle: 'Harga mulai dan penawaran tertulis', text: 'Harga di situs ini adalah harga mulai atau harga paket yang berlaku saat halaman diperbarui. Scope dan harga final tercantum dalam penawaran tertulis. Untuk layanan iklan, budget iklan dibayar langsung ke platform dan terpisah dari biaya jasa Logink.' },
        ],
      },
      {
        id: 'tanggung-jawab',
        title: 'Batasan Tanggung Jawab',
        content: [
          { subtitle: 'Penggunaan informasi', text: 'Sejauh diizinkan hukum yang berlaku, Logink tidak bertanggung jawab atas kerugian yang timbul dari penggunaan atau ketergantungan pada informasi di situs ini. Tanggung jawab kami terhadap klien diatur dalam perjanjian kerja sama masing-masing.' },
        ],
      },
      {
        id: 'perubahan',
        title: 'Perubahan Disclaimer',
        content: [
          { subtitle: 'Pembaruan', text: 'Kami dapat memperbarui disclaimer ini sewaktu-waktu. Versi terbaru selalu tersedia di halaman ini, dengan tanggal pembaruan di bagian atas.' },
        ],
      },
    ],
    ask: ['Ada pertanyaan tentang disclaimer ini?'],
  },
  en: {
    updated: '2026-10-05',
    lede: 'How to read the information on this site, before you make a decision based on it.',
    intro: [
      'This disclaimer applies to all content on ',
      'logink.co',
      ', including service pages, blog articles, case studies, illustrations and videos. Please read it together with our Privacy Policy and Terms of Service.',
    ],
    sections: [
      {
        id: 'umum',
        title: 'General Information',
        content: [
          { subtitle: 'For information and education', text: 'The content on this site is provided for general information and education. We try to keep it accurate and up to date, but we cannot guarantee that everything is always complete, free of errors or right for your business.' },
          { subtitle: 'Not an agreement', text: 'Nothing on this site forms an agreement between you and Logink. Work starts only once the scope and fees are agreed in writing.' },
        ],
      },
      {
        id: 'hasil',
        title: 'No Guaranteed Results',
        content: [
          { subtitle: 'Many factors outside our control', text: 'Digital marketing results depend on many things, such as changes to Google and ad platform algorithms, market conditions, competitors, budget, the state of your website and the time given to a strategy.' },
          { subtitle: 'What we do not promise', text: 'We do not guarantee a specific position on Google or Google Maps, traffic numbers, ROAS, lead counts, viral content, or citations in Google AI Overviews, ChatGPT or other AI engines.' },
          { subtitle: 'Estimated timings and targets', text: 'The timings and targets we mention, such as how long until rankings start to move or a page load-time target, are general estimates based on experience, not promised results.' },
        ],
      },
      {
        id: 'nasihat',
        title: 'Not Professional Advice',
        content: [
          { subtitle: 'Not legal, financial or tax advice', text: 'Our articles and guides cover digital marketing. They are not legal, financial, tax or other professional advice. For decisions like these, consult a qualified professional.' },
        ],
      },
      {
        id: 'ilustrasi',
        title: 'Illustrations, Sample Data and AI Images',
        content: [
          { subtitle: 'Illustrations are labelled', text: 'Mockups such as search results, AI answers, reports and dashboards on the service pages are illustrations with sample data, labelled "Illustration · sample data". Their numbers do not describe any specific client result.' },
          { subtitle: 'AI-generated images', text: 'Some photos and animations on this site are made with the help of AI and are labelled. The people, places and businesses in them are not Logink clients.' },
          { subtitle: 'Case studies', text: 'Case studies describe a specific client’s results over a specific period. Those results do not guarantee the same outcome for another business.' },
        ],
      },
      {
        id: 'sumber',
        title: 'Third-Party Data and Statistics',
        content: [
          { subtitle: 'Public data with sources', text: 'Third-party statistics we cite, for example from Google, Ahrefs, APJII or other research bodies, are written with their source and year. That data belongs to its publishers, can change, and does not always apply equally to the Indonesian market.' },
        ],
      },
      {
        id: 'merek',
        title: 'Third-Party Trademarks',
        content: [
          { subtitle: 'Platform names and logos', text: 'Names and logos such as Google, Google Ads, Google Maps, Meta, Instagram, Facebook, TikTok, Shopee, Tokopedia, Lazada, WhatsApp and ChatGPT are trademarks of their respective owners. We use them only to name the platforms we use or manage. This use does not imply any partnership, sponsorship or endorsement by those owners.' },
        ],
      },
      {
        id: 'tautan',
        title: 'Links to Other Sites',
        content: [
          { subtitle: 'Third-party sites', text: 'This site links to third-party sites, such as data sources and platforms. We do not control their content, privacy policies or availability, and a link does not mean we endorse what is there.' },
        ],
      },
      {
        id: 'harga',
        title: 'Prices and Proposals',
        content: [
          { subtitle: 'Starting prices and written proposals', text: 'Prices on this site are starting or package prices that apply when the page was last updated. The final scope and price are set out in a written proposal. For advertising services, ad spend is paid directly to the platforms and is separate from Logink’s fee.' },
        ],
      },
      {
        id: 'tanggung-jawab',
        title: 'Limitation of Liability',
        content: [
          { subtitle: 'Use of information', text: 'To the extent permitted by applicable law, Logink is not liable for losses arising from the use of, or reliance on, information on this site. Our liability to clients is governed by each client’s service agreement.' },
        ],
      },
      {
        id: 'perubahan',
        title: 'Changes to This Disclaimer',
        content: [
          { subtitle: 'Updates', text: 'We may update this disclaimer from time to time. The latest version is always on this page, with the update date at the top.' },
        ],
      },
    ],
    ask: ['Have questions about this disclaimer?'],
  },
}

export default doc
