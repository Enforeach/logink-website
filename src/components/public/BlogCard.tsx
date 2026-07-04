import Link from 'next/link'
import Image from 'next/image'
import { PostData } from '@/types'
import { formatDate } from '@/lib/utils'
import { type Locale, localePath } from '@/lib/i18n'

interface BlogCardProps {
  post: PostData & { titleEn?: string | null; excerptEn?: string | null; slugEn?: string | null; category?: { nameId: string; nameEn?: string | null; slug: string } | null }
  locale?: Locale
}

export function BlogCard({ post, locale = 'id' }: BlogCardProps) {
  const title = (locale === 'en' && post.titleEn) ? post.titleEn : post.titleId
  const excerpt = (locale === 'en' && post.excerptEn) ? post.excerptEn : post.excerptId
  const slug = (locale === 'en' && post.slugEn) ? post.slugEn : post.slug
  const categoryName = (locale === 'en' && post.category?.nameEn) ? post.category.nameEn : post.category?.nameId

  return (
    <Link
      href={localePath(`/blog/${slug}`, locale)}
      className="group flex flex-col rounded-2xl border border-[var(--border-default)] bg-white overflow-hidden hover:border-[var(--border-hover)] hover:-translate-y-1 hover:shadow-card transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="aspect-[16/9] bg-brand-peach relative overflow-hidden">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.titleId}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-brand opacity-20 flex items-center justify-center">
            <svg className="h-12 w-12 text-brand-crimson/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {post.category && (
          <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/90 text-brand-crimson backdrop-blur-sm">
            {categoryName}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display font-bold tracking-[-0.01em] text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-brand-crimson transition-colors">
          {title}
        </h3>
        {excerpt && (
          <p className="text-sm text-[var(--text-secondary)] line-clamp-2 flex-1 mb-4">
            {excerpt}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mt-auto pt-4 border-t border-[var(--border-default)]">
          <div className="flex items-center gap-2">
            {post.author.image ? (
              <Image
                src={post.author.image}
                alt={post.author.name}
                width={20}
                height={20}
                className="rounded-full"
              />
            ) : (
              <div className="h-5 w-5 rounded-full gradient-bg flex items-center justify-center text-[9px] font-bold text-white">
                {post.author.name[0]}
              </div>
            )}
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-3">
            {!!post.readingTime && <span>{post.readingTime} min</span>}
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}
