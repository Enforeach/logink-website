export const ADS_PRICING_TIERS = [
  {
    name: 'Entry',
    price: 'Rp 6 Juta',
    priceValue: 6000000,
    period: '/bulan',
    bestFor: 'Testing the waters with Google Ads',
    platformCoverage: 'Google Ads only',
    isPopular: false,
    features: [
      'Google Ads (Search, Display, Shopping)',
      'Campaign & Ad Group Structure Setup',
      'Keyword Bidding Strategy',
      'Ad Copywriting (Bahasa Indonesia)',
      'Conversion Tracking via GA4',
      'Monthly Performance Report',
    ],
    addOnNote: 'Retargeting Campaign available as add-on',
    recommendedAdSpend: 'Rp 5–15 Juta/mo',
  },
  {
    name: 'Growth',
    price: 'Rp 12 Juta',
    priceValue: 12000000,
    period: '/bulan',
    bestFor: 'Multi-platform scaling',
    platformCoverage: 'Google + Meta + Marketplace',
    isPopular: true,
    features: [
      'Everything in Entry',
      'Meta Ads — Local Audience Targeting',
      'Creative Ad Design for Meta',
      'A/B Testing on Meta',
      'Pixel Setup & Retargeting',
      'Marketplace Ads (Tokopedia, Shopee, Lazada)',
      'Product Keyword Optimization',
      'Flash Sale & Voucher Strategy',
    ],
    addOnNote: null,
    recommendedAdSpend: 'Rp 15–50 Juta/mo',
  },
  {
    name: 'Full',
    price: 'Rp 20 Juta',
    priceValue: 20000000,
    period: '/bulan',
    bestFor: 'Maximum reach across all platforms',
    platformCoverage: 'All 5 platforms',
    isPopular: false,
    features: [
      'Everything in Growth',
      'TikTok Ads Manager Setup',
      'Creative Brief & Video Production',
      'TikTok Audience Targeting',
      'Conversion Optimization',
      'Retargeting Campaign (included)',
    ],
    addOnNote: null,
    recommendedAdSpend: 'Rp 50 Juta+/mo',
  },
] as const

export const ADS_COMPARISON_TABLE = {
  categories: [
    {
      name: 'Google Ads (Search, Display, Shopping)',
      features: [
        { name: 'Campaign & Ad Group Structure Setup', entry: true, growth: true, full: true },
        { name: 'Keyword Bidding Strategy', entry: true, growth: true, full: true },
        { name: 'Ad Copywriting (Bahasa Indonesia)', entry: true, growth: true, full: true },
        { name: 'Conversion Tracking via GA4', entry: true, growth: true, full: true },
        { name: 'Performance Report', entry: true, growth: true, full: true },
      ],
    },
    {
      name: 'Meta Ads (Instagram & Facebook)',
      features: [
        { name: 'Local Audience Targeting', entry: false, growth: true, full: true },
        { name: 'Creative Ad Design', entry: false, growth: true, full: true },
        { name: 'A/B Testing', entry: false, growth: true, full: true },
        { name: 'Pixel Setup & Retargeting', entry: false, growth: true, full: true },
        { name: 'Performance Report', entry: true, growth: true, full: true },
      ],
    },
    {
      name: 'TikTok Ads',
      features: [
        { name: 'TikTok Ads Manager Setup', entry: false, growth: false, full: true },
        { name: 'Creative Brief & Production', entry: false, growth: false, full: true },
        { name: 'Audience Targeting', entry: false, growth: false, full: true },
        { name: 'Conversion Optimization', entry: false, growth: false, full: true },
        { name: 'Performance Report', entry: true, growth: true, full: true },
      ],
    },
    {
      name: 'Marketplace Ads (Tokopedia, Shopee, Lazada)',
      features: [
        { name: 'Tokopedia Ads & Shopee Ads Setup', entry: false, growth: true, full: true },
        { name: 'Product Keyword Optimization', entry: false, growth: true, full: true },
        { name: 'Flash Sale & Voucher Strategy', entry: false, growth: true, full: true },
        { name: 'Performance Report', entry: true, growth: true, full: true },
      ],
    },
  ],
} as const

export const ADS_ADDONS = [
  {
    name: 'Retargeting Campaign',
    description:
      'Re-engage users who visited your site but didn\'t convert. Works across Google Display and Meta — bringing warm leads back to complete their purchase.',
    availability: 'Add-on for Entry & Growth. Included in Full.',
    accentColor: '#D97706',
  },
  {
    name: 'Programmatic Display Advertising',
    description:
      'Automated display ad buying across premium Indonesian publisher networks. Reach your audience at scale beyond Google and Meta\'s ecosystems.',
    availability: 'Available as add-on for Growth & Full tiers.',
    accentColor: '#7C3AED',
  },
] as const

export const ADS_PLATFORMS = [
  {
    id: 'google',
    name: 'Google Ads',
    subtitle: 'Search · Display · Shopping',
    tagline: 'Capture high-intent buyers the moment they\'re searching.',
    description:
      'Google Ads puts your brand at the top of search results when Indonesian users are actively looking for what you sell. Search for intent, Display for retargeting and brand awareness, Shopping for e-commerce product listings.',
    features: [
      'Campaign & Ad Group Structure Setup',
      'Keyword Bidding Strategy',
      'Ad Copywriting (Bahasa Indonesia)',
      'Conversion Tracking via GA4',
      'Performance Report (monthly)',
    ],
    tiers: { entry: true, growth: true, full: true },
    accentColor: '#D97706',
    accentRgb: '217,119,6',
  },
  {
    id: 'meta',
    name: 'Meta Ads',
    subtitle: 'Instagram & Facebook',
    tagline: 'Reach your ideal audience with precision targeting and scroll-stopping creative.',
    description:
      'Meta\'s advertising platform gives you access to Indonesia\'s largest social audience. Local demographic targeting, interest-based audiences, behavioral retargeting — and creative that actually stops the scroll.',
    features: [
      'Local Audience Targeting',
      'Creative Ad Design for Meta',
      'A/B Testing',
      'Pixel Setup & Retargeting',
      'Performance Report',
    ],
    tiers: { entry: false, growth: true, full: true },
    accentColor: '#1877F2',
    accentRgb: '24,119,242',
    tierNote: 'Not included in Entry tier',
  },
  {
    id: 'tiktok',
    name: 'TikTok Ads',
    subtitle: 'In-feed · Spark · TopView',
    tagline: 'Native-format video ads designed for the FYP algorithm.',
    description:
      'TikTok Ads reach Indonesia\'s youngest, most engaged audience. We set up your Ads Manager, produce creative briefs, handle audience targeting, and optimize for conversions — not just views.',
    features: [
      'TikTok Ads Manager Setup',
      'Creative Brief & Production',
      'Audience Targeting',
      'Conversion Optimization',
      'Performance Report',
    ],
    tiers: { entry: false, growth: false, full: true },
    accentColor: '#FE2C55',
    accentRgb: '254,44,85',
    tierNote: 'Exclusive to Full tier',
  },
  {
    id: 'marketplace',
    name: 'Marketplace Ads',
    subtitle: 'Tokopedia · Shopee · Lazada',
    tagline: 'Win the buy box on Indonesia\'s biggest e-commerce platforms.',
    description:
      'Platform-native ads that put your products in front of ready-to-buy shoppers. Keyword optimization, flash sale strategy, and voucher campaigns — built for the Indonesian marketplace ecosystem.',
    features: [
      'Tokopedia Ads & Shopee Ads Setup',
      'Product Keyword Optimization',
      'Flash Sale & Voucher Strategy',
      'Performance Report',
    ],
    tiers: { entry: false, growth: true, full: true },
    accentColor: '#10B981',
    accentRgb: '16,185,129',
    tierNote: 'Not included in Entry tier',
  },
] as const

export const ADS_PROCESS = [
  {
    step: 1,
    title: 'Account Audit',
    timeline: 'Week 1',
    description:
      'Full review of existing ad accounts, wasted spend analysis, audience data evaluation, and conversion tracking setup. If you\'re starting fresh, we set up every account from scratch.',
    accentColor: '#7C3AED',
  },
  {
    step: 2,
    title: 'Funnel Mapping',
    timeline: 'Week 1',
    description:
      'Campaign objectives defined at each funnel stage — awareness to conversion. We map which platforms handle which stage: Google Search for intent, Meta for awareness, TikTok for discovery. Every rupiah has a purpose.',
    accentColor: '#DB2777',
  },
  {
    step: 3,
    title: 'Creative Production',
    timeline: 'Week 1–2',
    description:
      'Ad copy and visuals built for each platform and audience segment. Search ads get keyword-optimized copy. Meta gets scroll-stopping visuals. TikTok gets native-format video. Nothing recycled across platforms.',
    accentColor: '#D97706',
  },
  {
    step: 4,
    title: 'Campaign Launch',
    timeline: 'Week 2',
    description:
      'Live with controlled budgets for initial data gathering. We start conservative, letting the algorithms learn your ideal audience — then scale spend into what\'s working. Daily monitoring from day one.',
    accentColor: '#F59E0B',
  },
  {
    step: 5,
    title: 'Optimization Loops',
    timeline: 'Weekly',
    description:
      'Weekly bid adjustments, audience refinement, ad creative rotation, and budget reallocation. We kill underperforming ads fast, double down on winners, and continuously test new angles. Monthly strategy review with your team.',
    accentColor: '#A78BFA',
    isOngoing: true,
  },
] as const

export const ADS_FAQS = [
  {
    question: 'Which ad platforms do you manage?',
    answer:
      'We manage Google Ads (Search, Display, Shopping), Meta Ads (Instagram & Facebook), TikTok Ads, and Indonesian marketplace platforms (Tokopedia, Shopee, Lazada). Platform availability depends on your tier — Entry covers Google only, Growth adds Meta and Marketplace, Full adds TikTok. We recommend starting with Google + Meta for most brands, then expanding.',
  },
  {
    question: 'What is the minimum ad budget?',
    answer:
      'There\'s no hard minimum, but we recommend at least Rp 5 Juta/month in ad spend for Entry, Rp 15 Juta for Growth, and Rp 50 Juta+ for Full. Smaller budgets can work for hyper-local or niche campaigns, but spreading too thin across platforms reduces effectiveness. We\'ll advise on optimal allocation during onboarding.',
  },
  {
    question: 'What is ROAS and how do you measure it?',
    answer:
      'ROAS (Return on Ad Spend) measures revenue generated per rupiah spent on ads. If you spend Rp 10 Juta and generate Rp 30 Juta in revenue, your ROAS is 3×. We track this through GA4 conversion tracking, platform-native attribution, and where possible, direct CRM integration. Our clients typically achieve 2-4× ROAS within 3 months.',
  },
  {
    question: 'Will I have access to my own ad accounts?',
    answer:
      'Absolutely — full transparency is non-negotiable. You own all ad accounts (Google, Meta, TikTok). We work inside your accounts as managers, never in our own. If we part ways, you keep everything — campaigns, audiences, data, and historical performance. Nothing is held hostage.',
  },
  {
    question: 'How long until ads go live?',
    answer:
      'Typically 2 weeks from kickoff. Week 1 is account audit, funnel mapping, and creative production. Week 2 is campaign launch with initial budgets. We start seeing data within days of launch, and meaningful optimization patterns emerge within 2–4 weeks.',
  },
  {
    question: 'Do you handle the creative (images/videos) for ads?',
    answer:
      'For Meta Ads, yes — creative ad design is included in Growth and Full tiers. For TikTok video production, creative briefs and production are included in the Full tier. For more complex creative needs, we can bundle in our Creative Services team at a discounted rate.',
  },
  {
    question: "What's the difference between management fee and ad spend?",
    answer:
      'Management fee (what you pay Logink) covers strategy, setup, copywriting, creative, daily optimization, and reporting. Ad spend (what you pay Google/Meta/TikTok directly) is your media budget that funds actual impressions and clicks. Think of management fee as hiring the pilot — ad spend is the fuel. Both are transparent and you control both.',
  },
] as const

export const ADS_STATS = [
  {
    value: '2–4×',
    label: 'Average ROAS',
    context: 'Return on ad spend across client campaigns at the 3-month mark. We optimize until we hit it.',
  },
  {
    value: '~35%',
    label: 'Avg. CPA Drop',
    context: 'Cost per acquisition reduction after 90 days of optimization vs. client\'s previous agency or in-house.',
  },
  {
    value: '5',
    label: 'Ad Platforms',
    context: 'Google, Meta, TikTok, Tokopedia, Shopee — managed as one cross-platform ecosystem.',
  },
] as const
