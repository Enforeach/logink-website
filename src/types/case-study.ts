export type BlockType =
  | 'HERO'
  | 'OVERVIEW'
  | 'CLIENT_SNAPSHOT'
  | 'NARRATIVE'
  | 'METRIC_GRID'
  | 'TIMELINE'
  | 'CHART'
  | 'BEFORE_AFTER'
  | 'GALLERY'
  | 'VIDEO'
  | 'QUOTE'
  | 'SERVICES_USED'
  | 'RELATED_CASES'
  | 'CTA'
  | 'LEAD_FORM'
  | 'FAQ'
  | 'RICH_TEXT'

export interface HeroBlockData {
  variant: 'editorial' | 'split' | 'immersive'
  eyebrowId?: string
  eyebrowEn?: string
  headingId: string
  headingEn?: string
  subheadingId?: string
  subheadingEn?: string
  mediaType?: 'image' | 'video'
  mediaUrl?: string
  mediaAlt?: string
  metrics?: Array<{
    labelId: string
    labelEn?: string
    value: string
    unit?: string
    delta?: string
    deltaDirection?: 'up' | 'down' | 'neutral'
  }>
}

export interface OverviewBlockData {
  titleId?: string
  titleEn?: string
  bulletsId: string[]
  bulletsEn?: string[]
}

export interface ClientSnapshotBlockData {
  aboutId?: string
  aboutEn?: string
  facts: Array<{ label: string; value: string }>
  website?: string
}

export interface NarrativeBlockData {
  eyebrowId?: string
  eyebrowEn?: string
  headingId: string
  headingEn?: string
  bodyId: string
  bodyEn?: string
  pullQuoteId?: string
  pullQuoteEn?: string
  supportingMediaUrl?: string
  supportingMediaAlt?: string
}

export interface MetricGridBlockData {
  titleId?: string
  titleEn?: string
  metrics: Array<{
    labelId: string
    labelEn?: string
    value: string
    unit?: string
    delta?: string
    deltaDirection?: 'up' | 'down' | 'neutral'
    icon?: string
    group?: string
  }>
}

export interface TimelineBlockData {
  titleId?: string
  titleEn?: string
  milestones: Array<{
    date: string
    titleId: string
    titleEn?: string
    descriptionId?: string
    descriptionEn?: string
    icon?: string
    mediaThumb?: string
  }>
}

export interface ChartBlockData {
  chartType: 'line' | 'area' | 'bar' | 'donut' | 'stacked'
  titleId?: string
  titleEn?: string
  dataset: Array<Record<string, string | number>>
  xKey: string
  yKeys: string[]
  yLabelsId?: Record<string, string>
  yLabelsEn?: Record<string, string>
  colorScheme?: string[]
  sourceId?: string
  sourceEn?: string
}

export interface BeforeAfterBlockData {
  beforeMediaUrl: string
  afterMediaUrl: string
  beforeLabelId?: string
  beforeLabelEn?: string
  afterLabelId?: string
  afterLabelEn?: string
  captionId?: string
  captionEn?: string
}

export interface GalleryBlockData {
  layout: 'grid-2' | 'grid-3' | 'masonry'
  titleId?: string
  titleEn?: string
  items: Array<{
    mediaUrl: string
    captionId?: string
    captionEn?: string
    alt?: string
  }>
}

export interface VideoBlockData {
  provider: 'youtube' | 'vimeo' | 'mp4'
  src: string
  posterUrl?: string
  captionId?: string
  captionEn?: string
}

export interface QuoteBlockData {
  quoteId: string
  quoteEn?: string
  authorName: string
  authorRole?: string
  authorCompany?: string
  authorAvatar?: string
}

export interface ServicesUsedBlockData {
  serviceIds: string[]
  customDescriptionId?: string
  customDescriptionEn?: string
}

export interface RelatedCasesBlockData {
  mode: 'auto' | 'manual'
  manualSlugIds?: string[]
  limit?: number
}

export interface CtaBlockData {
  variant: 'dark-band' | 'gradient' | 'minimal'
  headingId: string
  headingEn?: string
  bodyId?: string
  bodyEn?: string
  primaryCtaLabelId: string
  primaryCtaLabelEn?: string
  primaryCtaHref: string
  secondaryCtaLabelId?: string
  secondaryCtaLabelEn?: string
  secondaryCtaHref?: string
}

export interface LeadFormBlockData {
  presetGoalId?: string
  presetGoalEn?: string
  presetServiceId?: string
}

export interface FaqBlockData {
  titleId?: string
  titleEn?: string
  items: Array<{
    questionId: string
    questionEn?: string
    answerId: string
    answerEn?: string
  }>
}

export interface RichTextBlockData {
  contentId: string
  contentEn?: string
}

export type BlockData =
  | HeroBlockData
  | OverviewBlockData
  | ClientSnapshotBlockData
  | NarrativeBlockData
  | MetricGridBlockData
  | TimelineBlockData
  | ChartBlockData
  | BeforeAfterBlockData
  | GalleryBlockData
  | VideoBlockData
  | QuoteBlockData
  | ServicesUsedBlockData
  | RelatedCasesBlockData
  | CtaBlockData
  | LeadFormBlockData
  | FaqBlockData
  | RichTextBlockData

export interface CaseStudyBlock {
  id: string
  blockType: BlockType
  sortOrder: number
  isVisible: boolean
  data: BlockData
}

export interface CaseStudyFull {
  id: string
  // Legacy
  title: string
  industry: string
  challenge: string
  strategy: string
  results: string
  // Multilingual
  titleId?: string | null
  titleEn?: string | null
  subtitleId?: string | null
  subtitleEn?: string | null
  summaryId?: string | null
  summaryEn?: string | null
  slug: string
  slugEn?: string | null
  seoTitleId?: string | null
  seoTitleEn?: string | null
  seoDescId?: string | null
  seoDescEn?: string | null
  ogImage?: string | null
  featuredImage?: string | null
  thumbnail?: string | null
  durationLabel?: string | null
  clientName: string
  clientLogo?: string | null
  clientWebsite?: string | null
  featured: boolean
  status: string
  publishedAt?: Date | string | null
  industryRel?: { nameId: string; nameEn?: string | null; slug: string; accentColor?: string | null } | null
  service?: { id: string; name: string; slug: string; color: string } | null
  serviceId?: string | null
  blocks: CaseStudyBlock[]
  metrics: Array<{ id: string; metricLabel: string; beforeValue: string; afterValue: string; sortOrder: number }>
  testimonial?: {
    id: string
    clientName: string
    clientTitle: string
    clientPhoto?: string | null
    quote: string
    companyName: string
  } | null
  caseStudyServices?: Array<{
    service: { id: string; name: string; slug: string; color: string; icon?: string | null }
  }>
  createdAt: Date | string
  updatedAt: Date | string
}
