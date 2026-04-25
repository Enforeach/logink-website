import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: 'ADMIN' | 'EDITOR' | 'VIEWER'
    }
  }
}

export type PostStatus = 'DRAFT' | 'REVIEW' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED'
export type Role = 'ADMIN' | 'EDITOR' | 'VIEWER'

export interface ServiceData {
  id: string
  name: string
  slug: string
  descriptionId: string
  descriptionEn?: string | null
  shortDescId?: string | null
  shortDescEn?: string | null
  icon?: string | null
  color: string
  funnelPosition?: string | null
  sortOrder: number
  isActive: boolean
  pricingTiers: PricingTierData[]
  addOns: ServiceAddOnData[]
}

export interface PricingTierData {
  id: string
  tierName: string
  priceLabel: string
  priceValue?: number | null
  features: string[]
  isPopular: boolean
  sortOrder: number
}

export interface ServiceAddOnData {
  id: string
  name: string
  description?: string | null
  priceLabel?: string | null
  isActive: boolean
}

export interface PostData {
  id: string
  titleId: string
  titleEn?: string | null
  slug: string
  excerptId?: string | null
  excerptEn?: string | null
  featuredImage?: string | null
  readingTime?: number | null
  status: PostStatus
  publishedAt?: Date | null
  createdAt: Date
  author: { name: string; image?: string | null }
  category?: { nameId: string; nameEn?: string | null; slug: string } | null
}

export interface CaseStudyData {
  id: string
  title: string
  slug: string
  clientName: string
  clientLogo?: string | null
  industry: string
  thumbnail?: string | null
  status: PostStatus
  publishedAt?: Date | null
  service?: { name: string; slug: string; color: string } | null
  metrics: { metricLabel: string; beforeValue: string; afterValue: string }[]
}

export interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  services?: string[]
  budgetRange?: string
  timeline?: string
  message: string
}
