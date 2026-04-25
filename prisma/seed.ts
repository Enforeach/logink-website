import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const SERVICES = [
  {
    name: 'SEO & Content Marketing',
    slug: 'seo-content-marketing',
    color: '#7C3AED',
    funnelPosition: 'Top Funnel',
    sortOrder: 0,
    shortDescId: 'Long-term organic growth & inbound leads',
    descriptionId: 'Strategi SEO komprehensif dengan konten berkualitas tinggi untuk meningkatkan traffic organik jangka panjang. Dari keyword research hingga 30 artikel/bulan, kami mengelola semua aspek SEO Anda.',
    pricingTiers: [
      {
        tierName: 'Entry',
        priceLabel: 'Rp 6 Juta',
        priceValue: 6000,
        isPopular: false,
        sortOrder: 0,
        features: [
          'Keyword Research (Bahasa Indonesia)',
          'Google Search Console & GA4 Setup',
          'On-Page SEO (Meta, Heading, Structure)',
          'Core Web Vitals & Page Speed',
          'Sitemap & Robots.txt',
          '5 SEO Articles/month',
          'Keyword Mapping per Article',
          'Internal Linking Strategy',
          'Monthly Performance Report',
        ],
      },
      {
        tierName: 'Growth',
        priceLabel: 'Rp 8 Juta',
        priceValue: 8000,
        isPopular: true,
        sortOrder: 1,
        features: [
          'Everything in Entry',
          'Schema Markup Lokal',
          '15 SEO Articles/month',
          'Looker Studio Dashboard',
        ],
      },
      {
        tierName: 'Full',
        priceLabel: 'Rp 15 Juta',
        priceValue: 15000,
        isPopular: false,
        sortOrder: 2,
        features: [
          'Everything in Growth',
          'Custom Event Tracking',
          '30 SEO Articles/month',
          'Full Looker Studio Dashboard',
        ],
      },
    ],
    addOns: [
      { name: 'Local SEO & Google Business Profile', priceLabel: 'from 2M/location' },
      { name: 'Off-Page / Link Building', priceLabel: 'from 5M/media' },
    ],
  },
  {
    name: 'Social Media Management',
    slug: 'social-media-management',
    color: '#DB2777',
    funnelPosition: 'Top Funnel',
    sortOrder: 1,
    shortDescId: 'Brand awareness, engagement & community building',
    descriptionId: 'Manajemen media sosial menyeluruh di Instagram, TikTok, Facebook, dan LinkedIn. Dari konten plan hingga community management, semua dikelola tim specialist kami.',
    pricingTiers: [],
    addOns: [
      { name: 'Influencer Marketing / KOL-KOC', priceLabel: null },
      { name: 'Social Media Audit', priceLabel: null },
    ],
  },
  {
    name: 'Paid Advertising',
    slug: 'paid-advertising',
    color: '#D97706',
    funnelPosition: 'Mid Funnel',
    sortOrder: 2,
    shortDescId: 'Fast scaling & immediate ROI — 2-4x ROAS',
    descriptionId: 'Iklan Google, Meta, TikTok, dan Marketplace yang dioptimasi untuk ROI maksimal. Dengan track record 2-4x ROAS dalam 3 bulan pertama.',
    pricingTiers: [
      {
        tierName: 'Entry',
        priceLabel: 'Rp 6 Juta',
        priceValue: 6000,
        isPopular: false,
        sortOrder: 0,
        features: [
          'Google Ads (Search, Display, Shopping)',
          'Campaign & Ad Group Structure Setup',
          'Keyword Bidding Strategy',
          'Ad Copywriting (Bahasa Indonesia)',
          'Conversion Tracking via GA4',
          'Monthly Performance Report',
          'Retargeting Campaign (as add-on)',
        ],
      },
      {
        tierName: 'Growth',
        priceLabel: 'Rp 12 Juta',
        priceValue: 12000,
        isPopular: true,
        sortOrder: 1,
        features: [
          'Everything in Entry',
          'Meta Ads (Local Audience Targeting)',
          'Creative Ad Design for Meta',
          'A/B Testing on Meta',
          'Pixel Setup & Retargeting',
          'Marketplace Ads (Tokopedia, Shopee & Lazada)',
          'Keyword Product Optimization',
          'Flash Sale & Voucher Strategy',
        ],
      },
      {
        tierName: 'Full',
        priceLabel: 'Rp 20 Juta',
        priceValue: 20000,
        isPopular: false,
        sortOrder: 2,
        features: [
          'Everything in Growth',
          'TikTok Ads Manager Setup',
          'Creative Brief & Video Production',
          'TikTok Audience Targeting',
          'Conversion Optimization',
          'Retargeting Campaign (included)',
        ],
      },
    ],
    addOns: [],
  },
  {
    name: 'Creative Services',
    slug: 'creative-services',
    color: '#F59E0B',
    funnelPosition: 'All Funnel',
    sortOrder: 3,
    shortDescId: 'Scroll-stopping content that converts attention into action',
    descriptionId: 'Desain grafis, video production, dan copywriting yang scroll-stopping. Setiap konten didesain khusus untuk brand Anda dan audiens Indonesia.',
    pricingTiers: [],
    addOns: [
      { name: 'Product & Lifestyle Photography', priceLabel: null },
      { name: 'Podcast Production & Distribution', priceLabel: null },
    ],
  },
  {
    name: 'Website & Landing Page',
    slug: 'website-landing-page',
    color: '#A78BFA',
    funnelPosition: 'Bottom Funnel',
    sortOrder: 4,
    shortDescId: 'Converting visitors into customers & capturing leads',
    descriptionId: 'Landing page, company profile website, dan e-commerce dengan CRO-focused design. Dari konversi pengunjung menjadi lead hingga integrasi payment gateway lokal.',
    pricingTiers: [
      {
        tierName: 'Landing Page',
        priceLabel: 'Mulai Rp 10 Juta',
        priceValue: 10000,
        isPopular: false,
        sortOrder: 0,
        features: [
          'CRO-Focused Design',
          'A/B Testing Framework',
          'Form & CTA Integration',
          'Meta Pixel & GA4 Tracking',
          'Multi-variant Page Support',
        ],
      },
      {
        tierName: 'Company Profile',
        priceLabel: 'Mulai Rp 15 Juta',
        priceValue: 15000,
        isPopular: true,
        sortOrder: 1,
        features: [
          'Custom UI Design',
          'CMS Integration',
          'Mobile Responsive',
          'Basic SEO Setup',
          'Google Analytics 4',
          'Advanced On-page SEO',
        ],
      },
      {
        tierName: 'E-Commerce',
        priceLabel: 'Mulai Rp 25 Juta',
        priceValue: 25000,
        isPopular: false,
        sortOrder: 2,
        features: [
          'Product Catalog Setup',
          'Local Payment Gateway (Midtrans, Xendit)',
          'Shipping Integration (JNE, JT, etc.)',
          'Admin Dashboard',
          'WooCommerce / Shopify / Custom',
        ],
      },
    ],
    addOns: [
      { name: 'Website Maintenance & Hosting', priceLabel: null },
      { name: 'CRO (Conversion Rate Optimization)', priceLabel: null },
    ],
  },
]

const CATEGORIES = [
  { nameId: 'SEO', nameEn: 'SEO', slug: 'seo', sortOrder: 0 },
  { nameId: 'Social Media', nameEn: 'Social Media', slug: 'social-media', sortOrder: 1 },
  { nameId: 'Paid Advertising', nameEn: 'Paid Advertising', slug: 'paid-ads', sortOrder: 2 },
  { nameId: 'Branding', nameEn: 'Branding', slug: 'branding', sortOrder: 3 },
  { nameId: 'Web Development', nameEn: 'Web Development', slug: 'web-dev', sortOrder: 4 },
]

const DEFAULT_SETTINGS = [
  { key: 'site_title', value: 'Logink - 360° Digital Marketing Agency' },
  { key: 'site_description', value: '360° digital marketing agency built to help Indonesian brands dominate online.' },
  { key: 'contact_email', value: 'hello@logink.id' },
  { key: 'whatsapp_number', value: '6281234567890' },
  { key: 'instagram_url', value: 'https://instagram.com/logink.id' },
  { key: 'address', value: 'Jakarta, Indonesia' },
]

async function main() {
  console.log('🌱 Seeding database...')

  // Seed categories
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    })
  }
  console.log('✅ Categories seeded')

  // Seed services
  for (const svc of SERVICES) {
    const { pricingTiers, addOns, ...serviceData } = svc
    const service = await prisma.service.upsert({
      where: { slug: svc.slug },
      update: serviceData,
      create: serviceData,
    })

    // Clear existing tiers & addons
    await prisma.pricingTier.deleteMany({ where: { serviceId: service.id } })
    await prisma.serviceAddOn.deleteMany({ where: { serviceId: service.id } })

    // Create pricing tiers
    for (const tier of pricingTiers) {
      await prisma.pricingTier.create({
        data: { ...tier, serviceId: service.id },
      })
    }

    // Create add-ons
    for (const addon of addOns) {
      await prisma.serviceAddOn.create({
        data: { ...addon, serviceId: service.id },
      })
    }
  }
  console.log('✅ Services seeded')

  // Seed site settings
  for (const setting of DEFAULT_SETTINGS) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: { key: setting.key, value: setting.value },
    })
  }
  console.log('✅ Site settings seeded')

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
