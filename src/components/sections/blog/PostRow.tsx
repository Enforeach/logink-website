import Link from 'next/link'
import type { Locale } from '@/lib/services'
import { Chip } from '@/components/ds/Chip'
import { fmtDate } from '@/components/ds/strings'
import { minRead } from '@/content/blog'
import { catHref, catName, iso, postExcerpt, postHref, postTitle, type ListPost } from './data'
import { cn } from '@/lib/utils'

/** One list row: date, title link, excerpt, category chip, reading time. `big` = the hub's featured post. */
export function PostRow({ locale: l, post: p, minutes, big, as: H = 'h3', showCat = true }: {
  locale: Locale; post: ListPost; minutes?: number | null; big?: boolean; as?: 'h2' | 'h3'; showCat?: boolean
}) {
  const date = iso(p.publishedAt)
  const excerpt = postExcerpt(p, l)
  return (
    <article className={cn('grid gap-x-8 gap-y-2 border-t border-hair py-6', !big && 'sm:grid-cols-[8.5rem_minmax(0,1fr)]')}>
      <p className="t-dateline pt-1 text-ink-2">{date ? <time dateTime={date}>{fmtDate(date, l)}</time> : null}</p>
      <div className="min-w-0">
        <H className={big ? 't-h2 max-w-[22ch]' : 't-h3'}>
          <Link href={postHref(p, l)} className="underline-offset-4 hover:underline">
            {postTitle(p, l)}
          </Link>
        </H>
        {excerpt ? <p className={cn('mt-3 text-ink-2', big ? 't-lead' : 't-body')}>{excerpt}</p> : null}
        <div className="t-small mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-ink-2">
          {showCat && p.category ? <Chip variant="filter" href={catHref(p.category.slug, l)}>{catName(p.category, l)}</Chip> : null}
          {minutes ? <span>{minRead(minutes, l)}</span> : null}
        </div>
      </div>
    </article>
  )
}
