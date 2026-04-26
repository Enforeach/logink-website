export const WEBSITE_PROJECT_TYPES = [
  {
    id: 'landing-page',
    title: 'Landing Page Campaign',
    tagline: 'Single-page conversion machines built for campaigns and lead generation.',
    description:
      'When you need a focused page that does one thing — capture leads, sell a product, or drive sign-ups — a landing page is the fastest, most cost-effective weapon. CRO-focused design, A/B testing framework, and full tracking from day one.',
    bestFor: 'Campaigns · Lead gen · Product launches · Promos',
    timeline: '1-2 weeks',
    accentColor: '#06B6D4',
    features: [
      'CRO-Focused Design',
      'A/B Testing Framework',
      'Form & CTA Integration',
      'Meta Pixel & GA4 Tracking',
      'Multi-variant Page Support',
    ],
  },
  {
    id: 'company-profile',
    title: 'Company Profile Website',
    tagline: "Your brand's digital headquarters — credible, professional, and built to grow.",
    description:
      'A multi-page website that establishes your brand presence, communicates your value, and captures leads. Custom UI design, CMS integration for easy content updates, and on-page SEO that makes you findable from launch day.',
    bestFor: 'Brand presence · Credibility · Service businesses',
    timeline: '3-5 weeks',
    accentColor: '#7C3AED',
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
    id: 'e-commerce',
    title: 'E-Commerce Website',
    tagline: 'A full online store with Indonesian payment and shipping built in.',
    description:
      'Product catalog, local payment gateways (Midtrans, Xendit), shipping integrations (JNE, J&T, and more), and an admin dashboard to manage everything. Built on WooCommerce, Shopify, or fully custom — depending on your scale and needs.',
    bestFor: 'Online stores · D2C brands · FMCG · Retail',
    timeline: '4-8 weeks',
    accentColor: '#10B981',
    features: [
      'Product Catalog Setup',
      'Local Payment Gateway (Midtrans, Xendit)',
      'Shipping Integration (JNE, J&T, etc.)',
      'Admin Dashboard',
      'WooCommerce / Shopify / Custom',
    ],
  },
] as const

export const WEBSITE_TECH_FEATURES = [
  {
    id: 'performance',
    title: 'Performance-First Build',
    description:
      "Every site ships with under 2-second load times. Code-split bundles, lazy-loaded images, optimized fonts, and CDN delivery. Your PageSpeed score will be 90+ or we fix it for free.",
    span: 2,
    accentColor: '#06B6D4',
    badge: '90+',
  },
  {
    id: 'mobile',
    title: 'Mobile-First Responsive',
    description:
      'Designed for mobile screens first, then scaled up. Over 70% of Indonesian web traffic is mobile — your site looks perfect on every device, every orientation.',
    span: 1,
    accentColor: '#7C3AED',
    badge: null,
  },
  {
    id: 'seo',
    title: 'SEO-Ready Architecture',
    description:
      'Clean semantic HTML, heading hierarchy, XML sitemap, robots.txt, meta tags, Open Graph, and structured data — all configured before launch.',
    span: 1,
    accentColor: '#10B981',
    badge: null,
  },
  {
    id: 'tracking',
    title: 'CRM & Analytics Setup',
    description:
      'Google Analytics 4, Meta Pixel, WhatsApp chat, and CRM integration so you track every visitor and conversion from day one.',
    span: 1,
    accentColor: '#D97706',
    badge: null,
  },
  {
    id: 'security',
    title: 'SSL & Security',
    description:
      "HTTPS by default, secure hosting, regular backups, and hardened configurations. Your visitors' data is protected.",
    span: 1,
    accentColor: '#DB2777',
    badge: null,
  },
] as const

export const WEBSITE_STATS = [
  {
    value: '<2s',
    label: 'Target Load Time',
    context: 'Core Web Vitals optimized. PageSpeed 90+ on mobile, not just desktop.',
    animate: false,
  },
  {
    value: '100%',
    label: 'Mobile Responsive',
    context: 'Every component tested across all devices, built mobile-first from day one.',
    animate: true,
  },
  {
    value: '1-8wk',
    label: 'Time to Launch',
    context: 'Landing pages in 1-2 weeks. Company profiles in 3-5 weeks. E-commerce in 4-8 weeks.',
    animate: false,
  },
] as const

export const WEBSITE_PROCESS = [
  {
    phase: 1,
    title: 'Discovery & Scope',
    timeline: 'Day 1-3',
    barStart: 0,
    barEnd: 15,
    description:
      'Stakeholder interviews, competitor analysis, sitemap planning, technology decisions, and detailed scope document. We define every page, feature, and integration before design begins.',
    accentColor: '#06B6D4',
  },
  {
    phase: 2,
    title: 'Wireframe & Design',
    timeline: 'Week 1-2',
    barStart: 10,
    barEnd: 40,
    description:
      'Low-fidelity wireframes for structure and user flow, then high-fidelity UI design mockups in Figma. Desktop and mobile versions. You approve the design before a single line of code is written.',
    accentColor: '#7C3AED',
  },
  {
    phase: 3,
    title: 'Development',
    timeline: 'Week 2-4+',
    barStart: 30,
    barEnd: 75,
    description:
      'Front-end build, back-end integration, CMS setup, payment gateway configuration, analytics tracking, and responsive implementation. Deployed to a staging URL for your review.',
    accentColor: '#DB2777',
  },
  {
    phase: 4,
    title: 'QA & Testing',
    timeline: 'Week 3-5',
    barStart: 55,
    barEnd: 85,
    description:
      'Cross-browser testing (Chrome, Safari, Firefox, Edge), mobile testing (iOS + Android), load testing, form submission testing, payment flow testing, and accessibility audit.',
    accentColor: '#D97706',
  },
  {
    phase: 5,
    title: 'Launch & Handover',
    timeline: 'Week 4-8',
    barStart: 75,
    barEnd: 100,
    description:
      'DNS configuration, SSL setup, final deployment, 301 redirects, post-launch monitoring for 2 weeks, CMS training for your team, and complete documentation handover.',
    accentColor: '#10B981',
  },
] as const

export const WEBSITE_COMPARISON_TABLE = [
  {
    category: 'Design',
    features: [
      { name: 'CRO-Focused Design', landing: true, profile: false, ecommerce: false },
      { name: 'Custom UI Design', landing: false, profile: true, ecommerce: true },
      { name: 'Mobile Responsive', landing: true, profile: true, ecommerce: true },
    ],
  },
  {
    category: 'Functionality',
    features: [
      { name: 'A/B Testing Framework', landing: true, profile: false, ecommerce: false },
      { name: 'Form & CTA Integration', landing: true, profile: true, ecommerce: true },
      { name: 'Multi-variant Page Support', landing: true, profile: false, ecommerce: false },
      { name: 'CMS Integration', landing: false, profile: true, ecommerce: true },
      { name: 'Product Catalog', landing: false, profile: false, ecommerce: true },
      { name: 'Admin Dashboard', landing: false, profile: false, ecommerce: true },
    ],
  },
  {
    category: 'E-Commerce',
    features: [
      { name: 'Payment Gateway (Midtrans, Xendit)', landing: false, profile: false, ecommerce: true },
      { name: 'Shipping Integration (JNE, J&T)', landing: false, profile: false, ecommerce: true },
      { name: 'WooCommerce / Shopify / Custom', landing: false, profile: false, ecommerce: true },
    ],
  },
  {
    category: 'Tracking & SEO',
    features: [
      { name: 'Meta Pixel & GA4 Tracking', landing: true, profile: true, ecommerce: true },
      { name: 'Basic SEO Setup', landing: false, profile: true, ecommerce: true },
      { name: 'Advanced On-page SEO', landing: false, profile: true, ecommerce: true },
      { name: 'Google Analytics 4', landing: true, profile: true, ecommerce: true },
    ],
  },
] as const

export const WEBSITE_ADDONS = [
  {
    name: 'Website Maintenance & Hosting',
    description:
      'Ongoing hosting, security updates, performance monitoring, content updates, and technical support. Keep your site fast, secure, and up-to-date after launch.',
    badge: 'Monthly retainer',
    accentColor: '#06B6D4',
  },
  {
    name: 'CRO (Conversion Rate Optimization)',
    description:
      'Post-launch optimization: heatmap analysis, user session recording, A/B testing, form optimization, and funnel analysis. We improve your conversion rate with data, not guesswork.',
    badge: 'Monthly retainer',
    accentColor: '#D97706',
  },
] as const

export const WEBSITE_TECH_STACK = [
  {
    category: 'Frameworks & CMS',
    accentColor: '#06B6D4',
    items: ['Next.js', 'WordPress', 'Webflow', 'Shopify', 'WooCommerce', 'Laravel'],
  },
  {
    category: 'Frontend',
    accentColor: '#7C3AED',
    items: ['React', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
  },
  {
    category: 'Hosting & Infrastructure',
    accentColor: '#DB2777',
    items: ['Vercel', 'Cloudflare', 'AWS', 'Nginx'],
  },
  {
    category: 'Payment & Shipping (Indonesia)',
    accentColor: '#10B981',
    items: ['Midtrans', 'Xendit', 'JNE', 'J&T Express', 'SiCepat'],
  },
  {
    category: 'Analytics & Tracking',
    accentColor: '#D97706',
    items: ['Google Analytics 4', 'Google Tag Manager', 'Meta Pixel', 'Looker Studio', 'Hotjar'],
  },
  {
    category: 'Design & Collaboration',
    accentColor: '#F59E0B',
    items: ['Figma', 'Adobe Creative Suite', 'Notion'],
  },
] as const

export const WEBSITE_FAQS = [
  {
    question: 'How long does a website take to build?',
    answer:
      'Landing pages typically take 1-2 weeks. Company profile websites take 3-5 weeks. E-commerce sites take 4-8 weeks depending on product catalog size and integrations. We provide a detailed timeline during the Discovery & Scope phase, and you\'ll always know where we are in the process.',
  },
  {
    question: 'Which platforms do you use?',
    answer:
      'We choose the best technology for your project: WordPress for content-heavy sites that need easy editing, Shopify for e-commerce with a proven ecosystem, WooCommerce for WordPress-based stores, Webflow for design-forward company profiles, or fully custom builds with Next.js for maximum performance. We recommend based on your needs, not our preferences.',
  },
  {
    question: 'Is hosting and domain included?',
    answer:
      "We handle hosting setup and DNS configuration as part of the project. First-year hosting can be included in the project scope or set up on your own accounts (Vercel, Cloudflare, or your preferred provider). Domain registration is your responsibility — we'll guide you through the process if needed.",
  },
  {
    question: 'Are websites mobile-responsive?',
    answer:
      'Every site we build is mobile-first — designed for mobile screens first, then scaled up. Over 70% of Indonesian web traffic comes from mobile devices, so a desktop-only approach is outdated. We test on iOS and Android devices, multiple screen sizes, and all major browsers.',
  },
  {
    question: 'Is training included?',
    answer:
      'Yes. After launch, we provide CMS training for your team — how to update content, add blog posts, manage products (for e-commerce), and make basic changes without needing a developer. We also provide documentation and a recorded walkthrough video.',
  },
  {
    question: 'What about SEO — will my site rank on Google?',
    answer:
      'Every site includes baseline SEO setup: clean HTML structure, meta tags, sitemap, robots.txt, Open Graph tags, and page speed optimization. Company Profile and E-Commerce tiers include Advanced On-page SEO. For ongoing SEO and content marketing to actively grow your rankings, we recommend pairing with our SEO & Content Marketing service.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'We monitor your site for 2 weeks post-launch to catch any issues. After that, we offer an optional Website Maintenance & Hosting retainer for ongoing updates, security patches, and performance monitoring. You also have the option to add CRO (Conversion Rate Optimization) to continuously improve your site\'s conversion performance.',
  },
] as const
