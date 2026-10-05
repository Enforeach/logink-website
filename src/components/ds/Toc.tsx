import type { Locale } from '@/lib/services'
import { TocSpy } from './TocSpy'
import { T } from './strings'
import { cn } from '@/lib/utils'

/** One list: a closed <details> on phones, always open and sticky from 1024px (::details-content). */
export function Toc({ items, locale: l, numbered }: { items: { id: string; text: string; level: number }[]; locale: Locale; numbered?: boolean }) {
  const List = numbered ? 'ol' : 'ul'
  return (
    <nav aria-label={T.toc[l]} className="lg:sticky lg:top-[calc(var(--nav-h)+var(--dial-h)+24px)]" data-toc="">
      <details className="border-y border-hair lg:[&::details-content]:[content-visibility:visible] lg:[&::details-content]:block">
        <summary className="t-dateline flex min-h-tap cursor-pointer list-none items-center text-ink-2 lg:pointer-events-none">{T.toc[l]}</summary>
        <List className={cn('t-small space-y-2 pb-4', numbered && 'list-decimal pl-5')}>
          {items.map((it) => (
            <li key={it.id} className={cn(it.level > 2 && 'pl-4')}>
              <a href={`#${it.id}`} className="text-ink-2 underline-offset-2 hover:underline aria-[current=true]:font-650 aria-[current=true]:text-ink">{it.text}</a>
            </li>
          ))}
        </List>
      </details>
      <TocSpy />
    </nav>
  )
}
