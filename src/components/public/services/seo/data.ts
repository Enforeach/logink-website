export const SEO_PRICING_TIERS = [
  {
    id: 'entry',
    name: 'Entry',
    price: 'Rp 6 Juta',
    priceValue: 6000000,
    period: '/bulan',
    bestFor: 'New websites starting organic',
    isPopular: false,
    color: '#7C3AED',
    features: [
      'Keyword Research (Bahasa Indonesia)',
      'Google Search Console & GA4',
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
    id: 'growth',
    name: 'Growth',
    price: 'Rp 8 Juta',
    priceValue: 8000000,
    period: '/bulan',
    bestFor: 'Scaling traffic & leads',
    isPopular: true,
    color: '#7C3AED',
    features: [
      'Everything in Entry',
      'Schema Markup Lokal',
      '15 SEO Articles/month',
      'Looker Studio Dashboard',
    ],
  },
  {
    id: 'full',
    name: 'Full',
    price: 'Rp 15 Juta',
    priceValue: 15000000,
    period: '/bulan',
    bestFor: 'Maximum growth velocity',
    isPopular: false,
    color: '#D97706',
    features: [
      'Everything in Growth',
      'Custom Event Tracking',
      '30 SEO Articles/month',
      'Looker Studio Dashboard',
    ],
  },
] as const

export const SEO_COMPARISON_TABLE = {
  categories: [
    {
      name: 'Keyword Research',
      features: [
        { name: 'Keyword Research (Bahasa Indonesia)', entry: true, growth: true, full: true },
      ],
    },
    {
      name: 'Data Enablement',
      features: [
        { name: 'Google Search Console', entry: true, growth: true, full: true },
        { name: 'Google Analytics 4', entry: true, growth: true, full: true },
        { name: 'Schema Markup Lokal', entry: false, growth: true, full: true },
        { name: 'Custom Event Tracking', entry: false, growth: false, full: true },
      ],
    },
    {
      name: 'On-Page SEO',
      features: [
        { name: 'Meta, Heading, Content Structure', entry: true, growth: true, full: true },
        { name: 'Core Web Vitals / Page Speed', entry: true, growth: true, full: true },
        { name: 'Sitemap & Robots.txt', entry: true, growth: true, full: true },
      ],
    },
    {
      name: 'Content Marketing',
      features: [
        { name: 'SEO Articles / month', entry: '5', growth: '15', full: '30' },
        { name: 'Keyword Mapping per Article', entry: true, growth: true, full: true },
        { name: 'Internal Linking Strategy', entry: true, growth: true, full: true },
      ],
    },
    {
      name: 'Reporting',
      features: [
        { name: 'Monthly Performance Report', entry: true, growth: true, full: true },
        { name: 'Looker Studio Dashboard', entry: false, growth: true, full: true },
      ],
    },
  ],
} as const

export const SEO_ADDONS = [
  {
    name: 'Local SEO & Google Business Profile',
    description: "Dominate 'near me' searches and Google Business map packs in your city.",
    price: 'Starting from Rp 2 Juta/location/month',
  },
  {
    name: 'Off-Page / Link Building',
    description: 'Build domain authority with editorial placements in Indonesian media outlets.',
    price: 'Starting from Rp 5 Juta/media',
  },
] as const

export const SEO_FEATURES_TABS = [
  {
    id: 'research',
    label: 'Research & Data',
    icon: '🔍',
    features: [
      {
        title: 'Keyword Research (Bahasa Indonesia)',
        desc: "We dig into what Indonesian users actually search for — in Bahasa, not translated English keywords. Long-tail, transactional, and informational queries mapped to your funnel.",
        badge: null,
      },
      {
        title: 'Google Search Console & GA4 Setup',
        desc: 'Full technical setup with proper tracking. You own the accounts, you see every number. No black boxes.',
        badge: null,
      },
      {
        title: 'Schema Markup Lokal',
        desc: 'Structured data that helps Google understand your business in the Indonesian market. LocalBusiness, FAQPage, and product schema.',
        badge: 'Growth+',
      },
      {
        title: 'Custom Event Tracking',
        desc: 'Track micro-conversions: form starts, scroll depth, CTA clicks, WhatsApp taps. Know exactly where users drop off.',
        badge: 'Full only',
      },
    ],
  },
  {
    id: 'onpage',
    label: 'On-Page SEO',
    icon: '🔧',
    features: [
      {
        title: 'Meta, Heading & Content Structure',
        desc: 'Every page optimized with proper H1-H6 hierarchy, meta titles under 60 chars, descriptions that earn clicks, and content structured for featured snippets.',
        badge: null,
      },
      {
        title: 'Core Web Vitals & Page Speed',
        desc: 'We audit and fix LCP, FID, and CLS. Your pages load fast on Indonesian mobile networks — not just on fiber.',
        badge: null,
      },
      {
        title: 'Sitemap & Robots.txt',
        desc: 'Technical foundation: auto-generated XML sitemap, proper robots.txt directives, and crawl budget optimization.',
        badge: null,
      },
      {
        title: 'Internal Linking Architecture',
        desc: 'Strategic links between pages to distribute authority and guide user journeys. Not random — mapped to your conversion funnel.',
        badge: null,
      },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    icon: '✍️',
    features: [
      {
        title: 'SEO Articles',
        desc: 'Written by specialist Bahasa Indonesia writers, not AI-generated slop. Each article targets a specific keyword cluster with proper research, structure, and internal links.',
        badge: null,
        tiers: { entry: '5/mo', growth: '15/mo', full: '30/mo' },
      },
      {
        title: 'Keyword Mapping per Article',
        desc: 'Every article has a primary keyword, 3-5 secondary keywords, and a clear search intent match. No guessing.',
        badge: null,
      },
      {
        title: 'Internal Linking Strategy',
        desc: 'Each new article strengthens existing pages. We build topic clusters that compound over time, not isolated posts.',
        badge: null,
      },
    ],
  },
  {
    id: 'reporting',
    label: 'Reporting',
    icon: '📊',
    features: [
      {
        title: 'Monthly Performance Report',
        desc: 'Clear, jargon-free report covering rankings, traffic, conversions, and actionable next steps. Delivered every month.',
        badge: null,
      },
      {
        title: 'Looker Studio Dashboard',
        desc: 'Live dashboard you can check anytime. Rankings, traffic trends, top pages, conversion tracking — always up to date.',
        badge: 'Growth+',
      },
    ],
  },
] as const

export const SEO_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Keyword Audit',
    duration: 'Week 1',
    color: '#7C3AED',
    align: 'left' as const,
    desc: "We map your current rankings, analyze competitor gaps, and identify the top opportunities. You get a prioritized keyword list sorted by traffic potential and difficulty within 5 business days.",
  },
  {
    step: '02',
    title: 'Content Strategy',
    duration: 'Week 1–2',
    color: '#DB2777',
    align: 'right' as const,
    desc: "We build a topical cluster map and editorial calendar tailored to your funnel. Every article is mapped to a keyword, a search intent, and a conversion goal — not published randomly.",
  },
  {
    step: '03',
    title: 'Technical Fixes',
    duration: 'Week 1–2',
    color: '#D97706',
    align: 'left' as const,
    desc: "Engineers resolve crawl errors, fix page speed bottlenecks, implement schema markup, and set up structured data. The technical foundation that makes your content rank.",
  },
  {
    step: '04',
    title: 'Content Production',
    duration: 'Ongoing',
    color: '#F59E0B',
    align: 'right' as const,
    desc: "Specialist writers produce and publish SEO-optimized articles continuously. Each piece goes through keyword mapping, writing, editing, and on-page optimization before going live.",
  },
  {
    step: '05',
    title: 'Report & Iterate',
    duration: 'Monthly',
    color: '#A78BFA',
    align: 'left' as const,
    desc: "Monthly strategy reviews to analyze rankings, traffic, and conversions. We double down on what's working, cut what's not, and continuously refine the approach.",
  },
] as const

export const SEO_FAQS = [
  {
    question: 'How long does it take to see SEO results?',
    answer: "SEO is a long game — that's what makes it powerful. Typically, you'll see initial ranking movements within 4-6 weeks. Meaningful traffic growth starts at the 3-month mark, and compounding results kick in around month 6. Unlike paid ads, these results don't stop when the budget stops.",
  },
  {
    question: 'What language are articles written in?',
    answer: "All content is written natively in Bahasa Indonesia by specialist writers who understand local search behavior. We don't translate English content — we research and write for how Indonesian users actually search. English content is available as an add-on for brands targeting international audiences.",
  },
  {
    question: 'Can we choose article topics?',
    answer: "Absolutely. We provide a recommended topic list based on keyword research and search volume data, but you always have final approval. If there are specific topics your brand needs to cover, we incorporate them into the editorial calendar. Strategy is collaborative, not dictated.",
  },
  {
    question: 'How is progress reported?',
    answer: 'You get a monthly performance report covering keyword rankings, organic traffic, top-performing pages, and conversion data. Growth and Full plans also include a live Looker Studio dashboard you can check anytime. We review results together in a monthly strategy call.',
  },
  {
    question: 'Is backlink building included?',
    answer: 'Off-page SEO and link building is available as an add-on starting at Rp 5 Juta per media placement. Our approach focuses on editorial placements in Indonesian media outlets — no PBNs, no spammy directories. Quality over quantity.',
  },
  {
    question: 'What happens if we want to stop?',
    answer: "There are no lock-in contracts. We work on a monthly basis because we believe our results should earn your continued partnership, not a contract clause. All content, accounts, and data are yours — we never hold anything hostage.",
  },
  {
    question: 'Do you guarantee rankings?',
    answer: "No honest SEO agency guarantees specific rankings — Google's algorithm isn't something anyone controls. What we guarantee is a systematic, data-driven process that has consistently delivered 2-4x traffic growth for our clients within 6 months. We're transparent about what's working and what needs adjustment.",
  },
] as const
