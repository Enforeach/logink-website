import { type Locale } from './index'

interface BilingualPost {
  titleId: string
  titleEn: string | null
  bodyId: string
  bodyEn: string | null
  excerptId: string | null
  excerptEn: string | null
  slug: string
  slugEn: string | null
  metaTitle: string | null
  metaDescription: string | null
  metaTitleEn: string | null
  metaDescriptionEn: string | null
}

export function resolvePostContent(post: BilingualPost, locale: Locale) {
  const isEn = locale === 'en'
  const hasEnContent = !!(post.titleEn && post.bodyEn)

  return {
    title: (isEn && post.titleEn) ? post.titleEn : post.titleId,
    body: (isEn && post.bodyEn) ? post.bodyEn : post.bodyId,
    excerpt: (isEn && post.excerptEn) ? post.excerptEn : post.excerptId,
    slug: (isEn && post.slugEn) ? post.slugEn : post.slug,
    metaTitle: (isEn && post.metaTitleEn) ? post.metaTitleEn : post.metaTitle,
    metaDescription: (isEn && post.metaDescriptionEn) ? post.metaDescriptionEn : post.metaDescription,
    hasTranslation: isEn ? hasEnContent : true,
    isFallback: isEn && !hasEnContent,
    alternateSlug: isEn ? post.slug : post.slugEn,
  }
}
