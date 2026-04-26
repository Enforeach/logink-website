export const CREATIVE_DELIVERABLES = {
  design: {
    category: 'Design',
    accentColor: '#F59E0B',
    accentRgb: '245,158,11',
    items: [
      { id: 'social-templates', name: 'Social Media Templates (IG feed, story, cover)', description: 'Feed posts, story frames, cover designs, and highlight icons.' },
      { id: 'banner-ads', name: 'Banner / Display Ads', description: 'HTML5 and static banners for Google Display. All IAB sizes.' },
      { id: 'infographics', name: 'Infographics', description: 'Data and processes turned into shareable, on-brand visuals.' },
      { id: 'campaign-kv', name: 'Campaign Key Visuals', description: 'Hero visuals that set creative direction for launches and promotions.' },
      { id: 'motion-elements', name: 'Motion Graphic Elements', description: 'Animated logos, social animations, and micro-interactions.' },
      { id: 'brand-guidelines', name: 'Brand Guidelines (full brand book)', description: 'Logo, colors, typography, photography style, and tone of voice.' },
    ],
  },
  video: {
    category: 'Video',
    accentColor: '#DB2777',
    accentRgb: '219,39,119',
    items: [
      { id: 'brand-film', name: 'Brand Film / Company Profile', description: '1–5 minute company profile or brand documentary.' },
      { id: 'product-video', name: 'Product / Tutorial Video', description: 'Product showcases and how-to tutorials.' },
      { id: 'testimonial-video', name: 'Testimonial / Case Study Video', description: 'Client testimonials and success story videos.' },
      { id: 'reels-tiktok', name: 'Reels / TikTok (Short-form)', description: 'Vertical short-form video for social platforms.' },
      { id: 'motion-standalone', name: 'Motion Graphics (Standalone)', description: 'Fully animated explainers and promotional videos.' },
    ],
  },
  copy: {
    category: 'Copy',
    accentColor: '#7C3AED',
    accentRgb: '124,58,237',
    items: [
      { id: 'ad-copy', name: 'Ad Copy (Google, Meta, TikTok)', description: 'Headlines, descriptions, and CTAs per platform. A/B variants.' },
      { id: 'landing-page-copy', name: 'Landing Page Copy', description: 'CRO-focused page copy structured for maximum conversion.' },
      { id: 'email-copy', name: 'Email Campaign Copy', description: 'Subject lines, body copy, and CTAs for email campaigns.' },
      { id: 'social-captions', name: 'Social Media Captions (monthly)', description: 'Platform-specific captions with hashtags and CTAs.' },
      { id: 'longform-content', name: 'Blog / Long-form Articles', description: 'Blog posts, thought leadership, and SEO articles.' },
    ],
  },
} as const

export const CREATIVE_ADDONS = [
  {
    id: 'product-photography',
    name: 'Product & Lifestyle Photography',
    description: 'Professional product and lifestyle photography. Studio or on-location in Jakarta.',
  },
  {
    id: 'podcast-production',
    name: 'Podcast Production & Distribution',
    description: 'Recording, editing, show notes, artwork, and distribution to Spotify, Apple, and Google Podcasts.',
  },
] as const

export const CREATIVE_ENGAGEMENT_TYPES = [
  {
    id: 'one-time',
    name: 'One-time project',
    description: 'Defined scope with start and end. Best for: brand guidelines, brand films, campaign launches.',
  },
  {
    id: 'monthly-retainer',
    name: 'Monthly retainer',
    description: 'Ongoing creative support with fixed monthly scope. Best for: social content, ad creative, copywriting.',
  },
  {
    id: 'not-sure',
    name: 'Not sure yet',
    description: "Let's talk through your needs and find the best arrangement.",
  },
] as const

export const CREATIVE_MODULES = [
  {
    id: 'graphic-design',
    title: 'Graphic Design & Visual Branding',
    tagline: 'Visual identity that makes your brand instantly recognizable.',
    description:
      'From social media templates to full brand guidelines, our designers create cohesive visual systems that work across every touchpoint. Every asset built in your design language — not pulled from a template marketplace.',
    accentColor: '#F59E0B',
    accentRgb: '245,158,11',
    deliverables: [
      { name: 'Social Media Templates (IG feed, story, cover)', description: 'Feed posts, story frames, cover designs, and highlight icons. Designed as systems, not one-offs — so your brand stays consistent even when we\'re not around.' },
      { name: 'Banner Display Ads', description: 'HTML5 and static banners for Google Display Network and programmatic campaigns. All standard IAB sizes included.' },
      { name: 'Infographics', description: 'Complex data and processes turned into shareable, on-brand visuals. Perfect for thought leadership and social engagement.' },
      { name: 'Campaign Key Visuals', description: 'Campaign hero visuals that set the creative direction for launches, promotions, and seasonal pushes. Adapted across all formats.' },
      { name: 'Motion Graphic Elements', description: 'Animated logos, loading screens, social media animations, and micro-interactions that bring your brand to life.' },
      { name: 'Brand Guidelines', description: 'Comprehensive brand book: logo usage, color palette, typography, photography style, tone of voice, and application examples.' },
    ],
  },
  {
    id: 'video-production',
    title: 'Video Production & Editing',
    tagline: 'From concept to final cut — video that moves people and moves metrics.',
    description:
      'Full-service video production based in Jakarta. Concept development, scripting, shooting, editing, and motion graphics. Delivered in multi-platform formats so you get maximum mileage from a single shoot.',
    accentColor: '#DB2777',
    accentRgb: '219,39,119',
    deliverables: [
      { name: 'Concept & Script Development', description: 'Creative concepts and scripts that balance brand storytelling with performance goals.' },
      { name: 'Shooting (Jakarta & surroundings)', description: 'Professional crew, equipment, and talent coordination. On-location or studio. Jabodetabek area covered.' },
      { name: 'Professional Editing', description: 'Color grading, sound design, pacing, and storytelling structure. We edit for attention spans.' },
      { name: 'Motion Graphics', description: 'Animated text, data visualizations, logo animations, and explainer sequences.' },
      { name: 'Multi-Platform Formats (1:1, 9:16, 16:9)', description: 'One shoot, multiple outputs for feed, stories, reels, TikTok, and YouTube.' },
      { name: 'Brand Film / Testimonial / Tutorial', description: 'Company profiles, customer testimonials, and product tutorials. 1–5 minutes.' },
    ],
  },
  {
    id: 'copywriting',
    title: 'Copywriting & Content Writing',
    tagline: 'Words that sell, in the language your audience speaks.',
    description:
      'Headlines that stop the scroll, landing pages that convert, and ad copy that earns clicks. Written natively in Bahasa Indonesia by writers who understand Indonesian consumer psychology.',
    accentColor: '#7C3AED',
    accentRgb: '124,58,237',
    deliverables: [
      { name: 'Ad Copy (Google, Meta, TikTok)', description: 'Headlines, descriptions, and CTAs optimized per platform. A/B variants included.' },
      { name: 'Landing Page Copy', description: 'CRO-focused page copy: hero headlines, benefit sections, social proof, FAQs, and CTAs.' },
      { name: 'Email Blast Copy', description: 'Subject lines, preview text, body copy, and CTAs for promotional and nurture emails.' },
      { name: 'Social Media Captions / month', description: 'Platform-specific captions with strategic hashtags, CTAs, and brand voice.' },
      { name: 'Long-form Content / Articles', description: 'Blog posts, thought leadership, and SEO articles. Can integrate with our SEO team.' },
    ],
  },
] as const

export const CREATIVE_PROCESS = [
  {
    step: 1,
    title: 'Creative Brief',
    timeline: 'Day 1',
    description: 'We align on objectives, audience, tone, deliverables, and timelines. You share brand assets and references. We ask the questions that save revision rounds later.',
    deliverable: 'Signed brief document',
    accentColor: '#7C3AED',
    side: 'center' as const,
  },
  {
    step: 2,
    title: 'Concept & Moodboard',
    timeline: 'Day 2–3',
    description: 'We present 2–3 creative directions — moodboards for design, storyboards for video, draft angles for copy. You pick the direction that resonates.',
    deliverable: 'Approved creative direction',
    accentColor: '#DB2777',
    side: 'left' as const,
  },
  {
    step: 3,
    title: 'Production',
    timeline: 'Day 3–7',
    description: 'Full execution of the approved concept. Designers design, videographers shoot, copywriters write. Everything built from scratch to your brand specifications.',
    deliverable: 'First draft deliverables',
    accentColor: '#D97706',
    side: 'right' as const,
  },
  {
    step: 4,
    title: 'Review & Revisions',
    timeline: 'Day 7–9',
    description: 'You review the work. Two revision rounds are included. Feedback collected in one round per cycle to keep things efficient.',
    deliverable: 'Final approved assets',
    accentColor: '#F59E0B',
    side: 'left' as const,
  },
  {
    step: 5,
    title: 'Delivery & Formats',
    timeline: 'Day 9–10',
    description: 'Final assets delivered in all formats and sizes. Source files included. Organized in shared folders with clear naming conventions.',
    deliverable: 'Complete asset package + source files',
    accentColor: '#A78BFA',
    side: 'right' as const,
  },
] as const

export const CREATIVE_FAQS = [
  {
    question: 'What formats can you produce?',
    answer: 'We cover static graphics (all social formats, banners, print), video (reels/TikTok, brand films, tutorials, testimonials), motion graphics (animated logos, explainers), and written content (ad copy, landing pages, blog articles, email). Everything in multi-platform formats.',
  },
  {
    question: 'How long does production take?',
    answer: 'Graphic deliverables: 3–5 business days. Simple video edits: 5–7 days. Brand films with shooting: 2–3 weeks. Copywriting: 2–3 days for ad copy, 5–7 days for long-form. Rush timelines available at an additional fee.',
  },
  {
    question: 'Are revisions included?',
    answer: 'Yes — 2 revision rounds per deliverable. Consolidate feedback into one round, we implement, you confirm. Most projects finalize in 1–2 rounds. Additional revisions available if needed.',
  },
  {
    question: 'Do you shoot outside Jakarta?',
    answer: 'Jabodetabek is covered at no extra cost. Outside Jakarta, travel and accommodation quoted separately. For other islands, we work with local production partners under our creative direction.',
  },
  {
    question: 'Can we get just copywriting without design?',
    answer: 'Absolutely — each sub-service (Design, Video, Copywriting) works independently. Many clients start with one area and expand as they see results.',
  },
  {
    question: 'Do you provide source files?',
    answer: 'Yes. All finals include source files — PSD, AI, AE (for motion), DOCX, and editables. You own everything we create for you. Assets organized in shared folders with clear naming.',
  },
  {
    question: 'How does a monthly retainer work?',
    answer: 'Fixed monthly scope at predictable cost. Typically includes a set number of social media graphics, short-form videos, and copy deliverables per month. Dedicated designer time with priority turnaround.',
  },
] as const

export const CREATIVE_STATS = [
  {
    value: '500+',
    label: 'Assets / Month',
    context: 'Total production capacity across all clients. Your project gets dedicated designer attention, not a queue.',
  },
  {
    value: '2',
    label: 'Revision Rounds',
    context: 'Included in every deliverable. Additional rounds available. We get it right — fast.',
  },
  {
    value: '3–5d',
    label: 'Avg. Turnaround',
    context: 'For standard graphic deliverables. Video timelines depend on scope and are agreed upfront.',
  },
] as const
