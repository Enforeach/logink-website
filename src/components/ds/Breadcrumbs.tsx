import Link from 'next/link'
import type { Locale } from '@/lib/services'
import { T } from './strings'

/** Visible trail; the page adds breadcrumbNode(url, items) to its graph. The last item is the current page. */
export function Breadcrumbs({ locale: l, items }: { locale: Locale; items: { name: string; href: string }[] }) {
  return (
    <nav aria-label={T.crumbs[l]} className="t-small">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-2">
        {items.map((it, i) => (
          <li key={it.href} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-ink">{it.name}</span>
            ) : (
              <Link href={it.href} className="underline-offset-4 hover:text-ink hover:underline">{it.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
