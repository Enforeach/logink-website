import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Upsert Industry
  const industry = await prisma.industry.upsert({
    where: { slug: 'banking-finance' },
    update: { nameId: 'Perbankan & Keuangan', nameEn: 'Banking & Finance', accentColor: '#7C3AED' },
    create: { nameId: 'Perbankan & Keuangan', nameEn: 'Banking & Finance', slug: 'banking-finance', accentColor: '#7C3AED' },
  })

  // Get SEO service
  const seoService = await prisma.service.findFirst({ where: { slug: { contains: 'seo' } } })

  // System user
  const systemUser = await prisma.user.upsert({
    where: { email: 'system@logink.co' },
    update: {},
    create: { name: 'System', email: 'system@logink.co', role: 'ADMIN' },
  })

  // Check if already exists
  const existing = await prisma.caseStudy.findFirst({ where: { slug: 'depositobpr-948-persen-traffic-organik' } })
  if (existing) {
    console.log('Sample case study already exists, skipping.')
    return
  }

  const cs = await prisma.caseStudy.create({
    data: {
      title: 'Bagaimana DepositoBPR Tumbuh 948% Traffic Organik dalam 9 Bulan',
      titleId: 'Bagaimana DepositoBPR Tumbuh 948% Traffic Organik dalam 9 Bulan',
      titleEn: 'How DepositoBPR Grew Organic Traffic 948% in 9 Months',
      subtitleId: 'Strategi SEO full-funnel yang mengubah kehadiran digital bank digital pertama BPR di Indonesia',
      subtitleEn: 'A full-funnel SEO strategy that transformed the digital presence of Indonesia\'s first BPR digital bank',
      slug: 'depositobpr-948-persen-traffic-organik',
      slugEn: 'depositobpr-948-percent-organic-traffic',
      clientName: 'DepositoBPR',
      industry: 'Finance',
      challenge: 'DepositoBPR, bank digital pertama berbasis BPR di Indonesia, menghadapi tantangan visibilitas organik yang sangat rendah. Mereka bersaing dengan bank-bank besar konvensional yang mendominasi halaman pertama Google untuk kata kunci finansial bernilai tinggi.',
      strategy: 'Kami menjalankan audit teknis mendalam, riset kata kunci komprehensif, dan membangun arsitektur konten yang berfokus pada konversi. Pendekatan kami mencakup optimasi on-page, pembangunan backlink berkualitas tinggi, dan peningkatan Core Web Vitals.',
      results: 'Dalam 9 bulan, DepositoBPR mencapai pertumbuhan traffic organik 948%, peningkatan 312% keyword ranking di halaman 1, dan kenaikan market share organik dari 2% menjadi 18% di segmen deposito digital.',
      summaryId: 'DepositoBPR bertransformasi dari ketidakhadiran digital menjadi pemimpin pencarian organik di segmen deposito BPR dalam waktu 9 bulan, menggunakan strategi SEO full-funnel Logink.',
      summaryEn: 'DepositoBPR transformed from digital obscurity to organic search leader in the BPR deposit segment in just 9 months, powered by Logink\'s full-funnel SEO strategy.',
      seoTitleId: 'Case Study: DepositoBPR +948% Traffic Organik | Logink',
      seoTitleEn: 'Case Study: DepositoBPR +948% Organic Traffic in 9 Months | Logink',
      seoDescId: 'Pelajari bagaimana Logink membantu DepositoBPR tumbuh 948% traffic organik, 312% keyword ranking halaman 1, dalam 9 bulan dengan strategi SEO full-funnel.',
      seoDescEn: 'Learn how Logink helped DepositoBPR achieve 948% organic traffic growth, 312% page-1 keyword rankings in 9 months with a full-funnel SEO strategy.',
      durationLabel: '9 bulan / 9 months',
      clientWebsite: 'https://depositobpr.id',
      thumbnail: null,
      featuredImage: null,
      featured: true,
      status: 'PUBLISHED',
      publishedAt: new Date(),
      industryId: industry.id,
      serviceId: seoService?.id || null,
      authorId: systemUser.id,
      metrics: {
        create: [
          { metricLabel: 'Traffic Organik', beforeValue: '1.200/bln', afterValue: '+948%', sortOrder: 0 },
          { metricLabel: 'Keyword Hal. 1', beforeValue: '12 kata kunci', afterValue: '+312%', sortOrder: 1 },
          { metricLabel: 'Market Share Organik', beforeValue: '2%', afterValue: '18%', sortOrder: 2 },
        ],
      },
      blocks: {
        create: [
          {
            blockType: 'HERO',
            sortOrder: 0,
            isVisible: true,
            data: {
              variant: 'editorial',
              eyebrowId: 'Perbankan & Keuangan',
              eyebrowEn: 'Banking & Finance',
              headingId: 'Bagaimana DepositoBPR Tumbuh 948% Traffic Organik dalam 9 Bulan',
              headingEn: 'How DepositoBPR Grew Organic Traffic 948% in 9 Months',
              subheadingId: 'Strategi SEO full-funnel yang mengubah kehadiran digital bank digital pertama BPR di Indonesia',
              subheadingEn: "A full-funnel SEO strategy that transformed Indonesia's first BPR digital bank",
              metrics: [
                { labelId: 'Traffic Organik', labelEn: 'Organic Traffic', value: '948', unit: '%', deltaDirection: 'up', delta: 'vs baseline' },
                { labelId: 'Keyword Hal. 1', labelEn: 'Page-1 Keywords', value: '312', unit: '%', deltaDirection: 'up', delta: 'new rankings' },
                { labelId: 'Market Share', labelEn: 'Market Share', value: '18', unit: '%', deltaDirection: 'up', delta: 'dari 2%' },
              ],
            },
          },
          {
            blockType: 'OVERVIEW',
            sortOrder: 1,
            isVisible: true,
            data: {
              titleId: 'Ringkasan Proyek',
              titleEn: 'Project Summary',
              bulletsId: [
                'Audit teknis SEO menyeluruh menemukan 47 isu kritis yang menghambat perayapan',
                'Riset keyword mengidentifikasi 1.200+ kata kunci dengan potensi konversi tinggi',
                'Arsitektur konten baru berbasis topik cluster meningkatkan otoritas topik',
                'Pembangunan 85 backlink DA 40+ dari media keuangan terpercaya',
                'Core Web Vitals dioptimalkan dari "Poor" menjadi "Good" di semua halaman utama',
              ],
              bulletsEn: [
                'Comprehensive SEO technical audit uncovered 47 critical crawlability issues',
                'Keyword research identified 1,200+ high-conversion-intent terms',
                'New topic-cluster content architecture boosted topical authority',
                'Built 85 high-DA backlinks from trusted financial media',
                'Core Web Vitals improved from "Poor" to "Good" across all key pages',
              ],
            },
          },
          {
            blockType: 'CLIENT_SNAPSHOT',
            sortOrder: 2,
            isVisible: true,
            data: {
              aboutId: 'DepositoBPR adalah platform deposito digital pertama yang berbasis BPR (Bank Perkreditan Rakyat) di Indonesia. Didirikan pada 2021, mereka menawarkan produk deposito dengan bunga kompetitif dan dijamin LPS hingga Rp2 miliar.',
              aboutEn: 'DepositoBPR is Indonesia\'s first digital deposit platform built on BPR (Rural Credit Bank) infrastructure. Founded in 2021, they offer competitive deposit products guaranteed by Indonesia\'s deposit insurance agency up to IDR 2 billion.',
              website: 'https://depositobpr.id',
              facts: [
                { label: 'Industri', value: 'Fintech / Perbankan Digital' },
                { label: 'Didirikan', value: '2021' },
                { label: 'Wilayah', value: 'Indonesia (Nasional)' },
                { label: 'Ukuran', value: '50–200 karyawan' },
                { label: 'Layanan Logink', value: 'SEO & Content Marketing' },
                { label: 'Durasi', value: '9 bulan (Apr 2023 – Jan 2024)' },
              ],
            },
          },
          {
            blockType: 'NARRATIVE',
            sortOrder: 3,
            isVisible: true,
            data: {
              eyebrowId: 'Tantangan',
              eyebrowEn: 'Challenge',
              headingId: 'Bersaing melawan bank konvensional yang mendominasi pencarian',
              headingEn: 'Competing against conventional banks dominating search',
              bodyId: 'Ketika DepositoBPR datang ke Logink pada April 2023, website mereka hanya menghasilkan 1.200 kunjungan organik per bulan — sementara kompetitor bank besar seperti BCA, Mandiri, dan BRI mendominasi hampir semua kata kunci deposito bernilai tinggi.\n\nAudit awal kami mengungkap tiga hambatan utama:\n\n1. Masalah teknis parah: duplikasi konten, halaman orphan, struktur URL yang tidak terorganisir, dan skor Core Web Vitals "Poor" membuat Google kesulitan merayapi dan mengindeks situs.\n\n2. Konten yang tidak sesuai dengan intent: mayoritas halaman menargetkan kata kunci yang terlalu kompetitif tanpa membangun otoritas topik terlebih dahulu.\n\n3. Profil backlink yang sangat lemah: hanya 23 referring domain dibandingkan kompetitor yang memiliki ribuan.',
              bodyEn: 'When DepositoBPR came to Logink in April 2023, their website generated just 1,200 organic visits per month — while major bank competitors like BCA, Mandiri, and BRI dominated nearly every high-value deposit keyword.\n\nOur initial audit revealed three core blockers:\n\n1. Severe technical issues: duplicate content, orphaned pages, disorganised URL structure, and "Poor" Core Web Vitals scores made it difficult for Google to crawl and index the site.\n\n2. Content misaligned with intent: most pages targeted overly competitive keywords without first building topical authority.\n\n3. Very weak backlink profile: only 23 referring domains versus thousands for competitors.',
              pullQuoteId: 'Website kami seperti toko yang bagus tapi ada di gang belakang. Tidak ada yang bisa menemukannya.',
              pullQuoteEn: 'Our website was like a great store hidden in an alley. Nobody could find it.',
            },
          },
          {
            blockType: 'NARRATIVE',
            sortOrder: 4,
            isVisible: true,
            data: {
              eyebrowId: 'Strategi',
              eyebrowEn: 'Strategy',
              headingId: 'Pendekatan tiga lapisan: Teknis → Konten → Otoritas',
              headingEn: 'Three-layer approach: Technical → Content → Authority',
              bodyId: 'Kami merancang kampanye 9 bulan dengan tiga fase yang saling memperkuat:\n\n**Fase 1 (Bulan 1-2): Fondasi Teknis**\nPerbaikan 47 isu teknis prioritas tinggi, implementasi struktur URL yang bersih, canonical tags, dan schema markup untuk produk keuangan.\n\n**Fase 2 (Bulan 2-6): Ekspansi Konten**\nMembangun 12 topik cluster di sekitar keyword utama seperti "deposito BPR", "bunga deposito tertinggi", dan "deposito aman di Indonesia". Total 156 halaman konten baru dipublikasikan.\n\n**Fase 3 (Bulan 5-9): Pembangunan Otoritas**\nKampanye digital PR menghasilkan 85 backlink dari Kompas.com, Bisnis.com, IDX Channel, dan media keuangan lainnya.',
              bodyEn: 'We designed a 9-month campaign with three reinforcing phases:\n\n**Phase 1 (Months 1–2): Technical Foundation**\nFixed 47 high-priority technical issues, implemented clean URL structure, canonical tags, and financial product schema markup.\n\n**Phase 2 (Months 2–6): Content Expansion**\nBuilt 12 topic clusters around target keywords like "deposito BPR", "highest deposit rates", and "safe deposits in Indonesia". Total: 156 new content pages published.\n\n**Phase 3 (Months 5–9): Authority Building**\nDigital PR campaign earned 85 backlinks from Kompas.com, Bisnis.com, IDX Channel, and other trusted financial media.',
            },
          },
          {
            blockType: 'METRIC_GRID',
            sortOrder: 5,
            isVisible: true,
            data: {
              titleId: 'Hasil Akhir: 9 Bulan',
              titleEn: 'Final Results: 9 Months',
              metrics: [
                { labelId: 'Pertumbuhan Traffic Organik', labelEn: 'Organic Traffic Growth', value: '948', unit: '%', deltaDirection: 'up', delta: 'vs Month 1' },
                { labelId: 'Keyword di Halaman 1', labelEn: 'Page-1 Keywords', value: '312', unit: '%', deltaDirection: 'up', delta: '+247 keywords' },
                { labelId: 'Market Share Organik', labelEn: 'Organic Market Share', value: '18', unit: '%', deltaDirection: 'up', delta: 'dari 2%' },
                { labelId: 'Referring Domains', labelEn: 'Referring Domains', value: '108', unit: 'domain', deltaDirection: 'up', delta: 'dari 23' },
                { labelId: 'Halaman Terindeks', labelEn: 'Indexed Pages', value: '89', unit: '%', deltaDirection: 'up', delta: 'dari 61%' },
                { labelId: 'Core Web Vitals', labelEn: 'Core Web Vitals', value: 'Good', deltaDirection: 'up', delta: 'dari Poor' },
              ],
            },
          },
          {
            blockType: 'CHART',
            sortOrder: 6,
            isVisible: true,
            data: {
              chartType: 'area',
              titleId: 'Pertumbuhan Traffic Organik Bulanan',
              titleEn: 'Monthly Organic Traffic Growth',
              xKey: 'month',
              yKeys: ['visitors'],
              yLabelsId: { visitors: 'Kunjungan Organik' },
              yLabelsEn: { visitors: 'Organic Visitors' },
              colorScheme: ['#7C3AED'],
              sourceId: 'Google Analytics & Google Search Console',
              sourceEn: 'Google Analytics & Google Search Console',
              dataset: [
                { month: 'Apr', visitors: 1200 },
                { month: 'Mei', visitors: 1850 },
                { month: 'Jun', visitors: 2900 },
                { month: 'Jul', visitors: 4200 },
                { month: 'Agu', visitors: 5800 },
                { month: 'Sep', visitors: 7100 },
                { month: 'Okt', visitors: 8900 },
                { month: 'Nov', visitors: 10200 },
                { month: 'Des', visitors: 11400 },
                { month: 'Jan', visitors: 12576 },
              ],
            },
          },
          {
            blockType: 'TIMELINE',
            sortOrder: 7,
            isVisible: true,
            data: {
              titleId: 'Perjalanan Proyek',
              titleEn: 'Project Journey',
              milestones: [
                { date: 'Apr 2023', titleId: 'Audit Teknis Menyeluruh', titleEn: 'Comprehensive Technical Audit', descriptionId: 'Identifikasi 47 isu kritis yang menghambat perayapan dan pengindeksan', descriptionEn: 'Identified 47 critical issues blocking crawling and indexing' },
                { date: 'Mei 2023', titleId: 'Perbaikan Teknis & Arsitektur', titleEn: 'Technical Fixes & Architecture', descriptionId: 'Implementasi struktur URL baru, perbaikan duplikasi konten, schema markup', descriptionEn: 'Implemented clean URL structure, fixed duplicate content, added schema markup' },
                { date: 'Jun 2023', titleId: 'Ekspansi Konten Fase 1', titleEn: 'Content Expansion Phase 1', descriptionId: 'Publikasi 60 halaman konten cluster pertama di sekitar "deposito BPR"', descriptionEn: 'Published first 60 cluster content pages around "BPR deposits"' },
                { date: 'Agu 2023', titleId: 'Kampanye Digital PR Dimulai', titleEn: 'Digital PR Campaign Launched', descriptionId: 'Pertama kali muncul di Kompas.com dan Bisnis.com — 12 backlink DA 60+', descriptionEn: 'First appearances on Kompas.com and Bisnis.com — 12 DA 60+ backlinks' },
                { date: 'Okt 2023', titleId: 'Puncak Ekspansi Keyword', titleEn: 'Keyword Expansion Peak', descriptionId: '150+ kata kunci baru masuk halaman 1, traffic melebihi 8.000/bulan', descriptionEn: '150+ new keywords hit page 1, traffic exceeds 8,000/month' },
                { date: 'Jan 2024', titleId: 'Target Tercapai', titleEn: 'Target Achieved', descriptionId: '948% pertumbuhan traffic, 18% market share organik — melebihi semua target awal', descriptionEn: '948% traffic growth, 18% organic market share — exceeded all initial targets' },
              ],
            },
          },
          {
            blockType: 'QUOTE',
            sortOrder: 8,
            isVisible: true,
            data: {
              quoteId: 'Logink tidak hanya menjalankan SEO — mereka membantu kami memahami mengapa strategi kami sebelumnya tidak berhasil dan membangun ulang dari fondasi. Hasilnya jauh melampaui ekspektasi kami.',
              quoteEn: "Logink didn't just execute SEO — they helped us understand why our previous strategy wasn't working and rebuild from the foundation. The results far exceeded our expectations.",
              authorName: 'Budi Santoso',
              authorRole: 'Chief Marketing Officer',
              authorCompany: 'DepositoBPR',
            },
          },
          {
            blockType: 'FAQ',
            sortOrder: 9,
            isVisible: true,
            data: {
              titleId: 'Pertanyaan Seputar Proyek Ini',
              titleEn: 'Questions About This Project',
              items: [
                {
                  questionId: 'Berapa lama waktu yang dibutuhkan untuk melihat hasil SEO yang signifikan?',
                  questionEn: 'How long does it take to see significant SEO results?',
                  answerId: 'Untuk proyek DepositoBPR, hasil yang terukur mulai terlihat pada bulan ke-2 dan ke-3. Namun, pertumbuhan yang signifikan baru tercapai pada bulan ke-5 setelah perbaikan teknis selesai dan konten baru mulai terindeks penuh. Umumnya, kampanye SEO membutuhkan 4–6 bulan untuk traction dan 9–12 bulan untuk hasil optimal.',
                  answerEn: 'For the DepositoBPR project, measurable results began appearing in months 2–3. Significant growth arrived in month 5 once technical fixes were complete and new content was fully indexed. Generally, SEO campaigns need 4–6 months for traction and 9–12 months for optimal results.',
                },
                {
                  questionId: 'Apakah strategi yang sama bisa diterapkan untuk industri lain?',
                  questionEn: 'Can the same strategy be applied to other industries?',
                  answerId: 'Ya, pendekatan tiga lapisan (Teknis → Konten → Otoritas) adalah metodologi inti Logink yang kami adaptasi untuk setiap industri. Kami telah menerapkannya di e-commerce, F&B, properti, dan sektor lainnya dengan hasil yang konsisten.',
                  answerEn: 'Yes, the three-layer approach (Technical → Content → Authority) is Logink\'s core methodology, adapted for each industry. We\'ve applied it across e-commerce, F&B, property, and other sectors with consistent results.',
                },
              ],
            },
          },
          {
            blockType: 'CTA',
            sortOrder: 10,
            isVisible: true,
            data: {
              variant: 'dark-band',
              headingId: 'Siap membangun kisah sukses Anda?',
              headingEn: "Ready to build your own success story?",
              bodyId: 'Tim Logink siap merancang strategi SEO yang tepat untuk bisnis Anda.',
              bodyEn: 'The Logink team is ready to design the right SEO strategy for your business.',
              primaryCtaLabelId: 'Konsultasi Gratis',
              primaryCtaLabelEn: 'Free Consultation',
              primaryCtaHref: '/contact',
            },
          },
        ],
      },
    },
  })

  // Add testimonial
  await prisma.testimonial.upsert({
    where: { caseStudyId: cs.id },
    update: {},
    create: {
      caseStudyId: cs.id,
      clientName: 'Budi Santoso',
      clientTitle: 'Chief Marketing Officer',
      companyName: 'DepositoBPR',
      quote: 'Logink tidak hanya menjalankan SEO — mereka membantu kami memahami mengapa strategi kami sebelumnya tidak berhasil dan membangun ulang dari fondasi. Hasilnya jauh melampaui ekspektasi kami.',
      isHighlighted: true,
    },
  })

  console.log(`✅ Seeded DepositoBPR case study: ${cs.id}`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
