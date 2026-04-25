export const SOCIAL_MODULES = [
  {
    id: 'organic-social',
    title: 'Organic Social Management',
    platforms: ['Instagram', 'TikTok', 'Facebook'],
    tagline: 'Your daily presence across the platforms that matter most in Indonesia.',
    description:
      'We handle everything — from monthly content planning to daily posting, visual design, caption writing in Bahasa Indonesia, and community management. You review and approve; we do the rest.',
    features: [
      {
        name: 'Monthly Content Plan',
        description:
          'A strategic calendar aligned with your brand goals, seasonal trends, and industry events. Reviewed and approved before anything goes live.',
      },
      {
        name: 'Posts per month (customized)',
        description:
          'Volume tailored to your needs. We recommend 12–20 posts per platform for consistent visibility.',
      },
      {
        name: 'Visual Design & Caption Writing',
        description:
          'Every post custom-designed to your brand guidelines. Captions in natural Bahasa Indonesia with strategic hashtags and CTAs.',
      },
      {
        name: 'Community Management (replies & DMs)',
        description:
          'We monitor and respond to comments and DMs during business hours. Your audience never feels ignored.',
      },
      {
        name: 'Monthly Performance Report',
        description:
          "Reach, engagement, follower growth, top content, and next month's recommendations.",
      },
    ],
    accentColor: '#DB2777',
    accentRgb: '219,39,119',
    icon: 'Smartphone',
    priceNote: 'Custom pricing based on platform count and post volume',
  },
  {
    id: 'tiktok-strategy',
    title: 'TikTok Strategy & Production',
    platforms: ['TikTok'],
    tagline: 'Ride local trends before they peak. TikTok-native content that gets the algorithm on your side.',
    description:
      'TikTok requires a completely different playbook. We research trending sounds, formats, and hashtags in the Indonesian market, then produce scroll-stopping videos optimized for the FYP algorithm.',
    features: [
      {
        name: 'Local Trend & Sound Research',
        description:
          "We monitor trending audio, formats, and challenges in the Indonesian TikTok ecosystem daily — not after they've peaked.",
      },
      {
        name: 'Videos per month (customized)',
        description:
          'Short-form video production. Hook-first structure designed for the first 3 seconds.',
      },
      {
        name: 'Hook & CTA Optimization',
        description:
          'Every video opens with a pattern interrupt and closes with a clear next step. We A/B test hooks to maximize completion rate.',
      },
      {
        name: 'Hashtag Strategy',
        description:
          'Strategic mix of trending, niche, and branded hashtags to maximize discoverability without looking spammy.',
      },
      {
        name: 'TikTok Analytics Report',
        description:
          'Views, completion rate, shares, follower growth, and FYP performance — the metrics that actually matter.',
      },
    ],
    accentColor: '#EC4899',
    accentRgb: '236,72,153',
    icon: 'Film',
    priceNote: 'Custom pricing based on video volume',
  },
  {
    id: 'linkedin-b2b',
    title: 'LinkedIn Management (B2B Focus)',
    platforms: ['LinkedIn'],
    tagline: 'Position your founders and company as industry thought leaders.',
    description:
      'LinkedIn is where B2B decisions are made. We optimize your company page and key profiles, publish thought leadership content, and run engagement strategies that put your brand in front of decision-makers.',
    features: [
      {
        name: 'Profile & Company Page Optimization',
        description:
          'Complete overhaul of your LinkedIn presence — headline, about, featured content, and visual branding that communicates authority.',
      },
      {
        name: 'Posts per month (customized)',
        description:
          "Mix of text posts, carousels, articles, and polls optimized for LinkedIn's algorithm which rewards conversations.",
      },
      {
        name: 'Thought Leadership Articles',
        description:
          "Long-form content under your executives' profiles. Industry insights, opinion pieces, and case studies that build credibility.",
      },
      {
        name: 'Connection & Engagement Strategy',
        description:
          'Targeted connections, strategic commenting on industry posts, and engagement with potential leads. Organic networking at scale.',
      },
    ],
    accentColor: '#0A66C2',
    accentRgb: '10,102,194',
    icon: 'Briefcase',
    priceNote: 'Custom pricing based on profile count and post volume',
  },
] as const

export const SOCIAL_ADDONS = [
  {
    id: 'influencer-marketing',
    name: 'Influencer Marketing / KOL-KOC',
    description:
      'Partner with Indonesian creators and Key Opinion Leaders to amplify your brand reach. We handle talent sourcing, briefing, and performance tracking.',
    badge: 'Optional add-on',
  },
  {
    id: 'social-audit',
    name: 'Social Media Audit',
    description:
      'Comprehensive analysis of your current social presence — content performance, audience demographics, competitor benchmarking, and actionable recommendations.',
    badge: 'One-time service',
  },
] as const

export const SOCIAL_CONTENT_PILLARS = [
  {
    name: 'Educate',
    percentage: 40,
    subtitle: 'Build authority & trust',
    description:
      'Tips, how-tos, industry insights, and thought leadership that position your brand as the expert. Your audience learns something — and remembers who taught them.',
    examples: 'Carousel infographics, tips reels, industry stats, explainer videos',
    accentColor: '#7C3AED',
    accentRgb: '124,58,237',
    icon: 'BookOpen',
  },
  {
    name: 'Entertain',
    percentage: 40,
    subtitle: 'Stop the scroll',
    description:
      'Trend-jacking, humor, behind-the-scenes, and relatable content that earns shares and saves. This is what makes your brand feel human and gets the algorithm working for you.',
    examples: 'Trending audio reels, memes, BTS content, challenges, POV videos',
    accentColor: '#DB2777',
    accentRgb: '219,39,119',
    icon: 'Sparkles',
  },
  {
    name: 'Convert',
    percentage: 20,
    subtitle: 'Turn followers into customers',
    description:
      'Direct offers, testimonials, product showcases, and CTAs that drive action. Strategic — never spammy. Timed to land when your audience is already warmed up.',
    examples: 'Product launches, promo announcements, client testimonials, limited offers',
    accentColor: '#D97706',
    accentRgb: '217,119,6',
    icon: 'ShoppingCart',
  },
] as const

export const SOCIAL_PROCESS = [
  {
    step: 1,
    title: 'Brand Onboarding',
    timeline: 'Week 1',
    description:
      'We learn your brand inside out — tone of voice, visual identity, audience personas, competitors, and content dos and don\'ts. We audit your current social presence and identify quick wins.',
    deliverable: 'Brand brief document + competitor analysis',
    accentColor: '#7C3AED',
    icon: 'ClipboardList',
  },
  {
    step: 2,
    title: 'Strategy & Pillars',
    timeline: 'Week 1–2',
    description:
      'We define your content pillars (Educate, Entertain, Convert), platform focus, posting cadence, and the first month\'s content calendar. Everything is mapped to your business goals.',
    deliverable: 'Content strategy deck + Month 1 calendar',
    accentColor: '#DB2777',
    icon: 'Compass',
  },
  {
    step: 3,
    title: 'Content Production',
    timeline: 'Week 2–3',
    description:
      'Designers create visuals, copywriters craft captions in Bahasa Indonesia, and video editors produce reels and TikToks. Everything built to your brand guidelines — no templates.',
    deliverable: 'Full month of content ready for review',
    accentColor: '#D97706',
    icon: 'PenLine',
  },
  {
    step: 4,
    title: 'Approval & Scheduling',
    timeline: 'Week 3–4',
    description:
      'You review the content calendar and approve each piece. We handle scheduling, hashtag research, and optimal posting times. Once approved, everything is queued and goes live automatically.',
    deliverable: 'Approved calendar live + community management active',
    accentColor: '#F59E0B',
    icon: 'CalendarCheck',
  },
] as const

export const SOCIAL_FAQS = [
  {
    question: 'Which platforms do you manage?',
    answer:
      "We manage Instagram, TikTok, Facebook, and LinkedIn. Each platform gets a tailored strategy — what works on TikTok doesn't work on LinkedIn. We recommend starting with 2–3 platforms where your audience is most active, then expanding. We don't spread thin across platforms that don't matter for your brand.",
  },
  {
    question: 'Is community management included?',
    answer:
      'Yes — we monitor and respond to comments and DMs during business hours (Mon–Fri, 9am–6pm WIB). For brands that need 24/7 or weekend coverage, we offer extended community management as an add-on. Every interaction follows your brand\'s tone of voice guidelines.',
  },
  {
    question: 'Who creates the visual content?',
    answer:
      "Our in-house design team creates all visual content — feed posts, stories, reels covers, carousel graphics, and TikTok thumbnails. Everything is custom-designed to your brand guidelines. We don't use Canva templates or stock graphics. If your brand needs video production (shooting), that's handled by our Creative Services team.",
  },
  {
    question: 'How many posts per month?',
    answer:
      'Post volume is customized to your needs and budget. For most brands, we recommend 12–20 posts per platform per month for consistent visibility. This typically breaks down into 3–5 posts per week. We can scale up for product launches, campaigns, or seasonal pushes.',
  },
  {
    question: 'Do you create TikTok videos?',
    answer:
      'Yes — our TikTok Strategy & Production module includes full video creation. We handle concept development, scripting, shooting (Jakarta area), editing, and caption writing. Each video is optimized for the FYP algorithm with hook-first structure and trending audio. For brands outside Jakarta, we can work with local creators or provide detailed briefs for your team to execute.',
  },
  {
    question: 'Can we approve content before it goes live?',
    answer:
      'Absolutely — nothing goes live without your approval. We prepare the full month\'s content calendar in advance, including visuals and captions. You review everything in a shared document or content approval tool. Once approved, we handle scheduling and posting. Revision rounds are included.',
  },
  {
    question: 'How do you measure success?',
    answer:
      "We track reach, engagement rate, follower growth, saves, shares, profile visits, and link clicks — the metrics that indicate real brand growth, not just vanity numbers. Our monthly report includes top-performing content analysis, audience demographic insights, and strategic recommendations for the next month. We tie social performance back to your business goals wherever possible.",
  },
] as const

export const SOCIAL_STATS = [
  {
    value: 4,
    suffix: '',
    label: 'Platforms Covered',
    context: 'Instagram, TikTok, Facebook, LinkedIn — managed as one integrated strategy.',
    isCounter: true,
    decimals: 0,
  },
  {
    value: 30,
    suffix: '+',
    label: 'Posts / Month',
    context: 'Consistent presence, zero missed days. Content produced and approved before it goes live.',
    isCounter: true,
    decimals: 0,
  },
  {
    value: 100,
    suffix: '%',
    label: 'Original Content',
    context: 'Custom-designed for your brand. No stock templates, no recycled graphics.',
    isCounter: true,
    decimals: 0,
  },
] as const
