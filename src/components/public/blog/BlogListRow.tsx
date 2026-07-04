import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { type Locale, localePath } from '@/lib/i18n'

export interface RowPost {
  id: string
  titleId: string
  titleEn?: string | null
  slug: string
  slugEn?: string | null
  excerptId?: string | null
  excerptEn?: string | null
  featuredImage?: string | null
  publishedAt?: Date | string | null
  readingTime?: number | null
  author?: { name: string; image?: string | null } | null
  category?: { nameId: string; nameEn?: string | null; slug: string } | null
}

/** F-pattern list row: fixed thumbnail left, left-aligned content, meta row. */
export function BlogListRow({ post, locale = 'id' }: { post: RowPost; locale?: Locale }) {
  const title = (locale === 'en' && post.titleEn) ? post.titleEn : post.titleId
  const excerpt = (locale === 'en' && post.excerptEn) ? post.excerptEn : post.excerptId
  const slug = (locale === 'en' && post.slugEn) ? post.slugEn : post.slug
  const categoryName = (locale === 'en' && post.category?.nameEn) ? post.category.nameEn : post.category?.nameId

  return (
    <Link
      href={localePath(`/blog/${slug}`, locale)}
      className="group flex flex-col sm:flex-row items-start gap-5 py-7 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson/40"
    >
      {/* Thumbnail — fixed left column */}
      <div className="relative w-full sm:w-[200px] shrink-0 aspect-[16/10] rounded-xl overflow-hidden bg-brand-peach">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 200px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-brand opacity-20" aria-hidden />
        )}
      </div>

      {/* Content — left-aligned stem */}
      <div className="min-w-0 flex-1">
        {post.category && (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-brand-crimson/10 text-brand-crimson mb-2">
            {categoryName}
          </span>
        )}
        <h3 className="font-display text-lg md:text-xl font-bold tracking-[-0.02em] leading-snug text-[var(--text-primary)] line-clamp-2 transition-colors group-hover:text-brand-crimson">
          {title}
        </h3>
        {excerpt && (
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2 mt-2">{excerpt}</p>
        )}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--text-muted)] mt-3">
          {post.author && (
            <span className="inline-flex items-center gap-1.5 font-medium text-[var(--text-secondary)]">
              {post.author.image ? (
                <Image src={post.author.image} alt={post.author.name} width={18} height={18} className="rounded-full object-cover" />
              ) : (
                <span className="h-[18px] w-[18px] rounded-full gradient-bg inline-flex items-center justify-center text-[8px] font-bold text-white">
                  {post.author.name[0]}
                </span>
              )}
              {post.author.name}
            </span>
          )}
          {post.publishedAt && <span>{formatDate(post.publishedAt as Date)}</span>}
          {!!post.readingTime && <span>{post.readingTime} min</span>}
        </div>
      </div>
    </Link>
  )
}
