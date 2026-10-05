// Case section nav: Ringkasan · Tantangan · Strategi · Hasil (only the sections that render) + "Mulai proyek"
// on WhatsApp. Server, 0 KB JS: plain in-page anchors; sticky under the header from lg.
import type { Locale } from '@/lib/services'
import { WaButton } from '@/components/ds/WaButton'
import { CASE } from '@/content/portfolio'

export function CaseSubnav({ locale: l, items, wa }: { locale: Locale; items: { id: string; label: string }[]; wa: string }) {
  return (
    <nav aria-label={CASE.subnav[l]} data-ground="kertas" data-sky="light"
      className="border-y border-hair lg:sticky lg:top-[var(--dial-h)] lg:z-sticky">
      <div className="wrap flex flex-wrap items-center gap-x-6 gap-y-2 py-2">
        <ol className="flex flex-wrap gap-x-5">
          {items.map((it) => (
            <li key={it.id}>
              <a href={`#${it.id}`} className="t-small inline-flex min-h-tap items-center font-650 underline-offset-4 hover:underline">{it.label}</a>
            </li>
          ))}
        </ol>
        <WaButton text={wa} placement="case" size="sm" label={CASE.start[l]} className="ml-auto" />
      </div>
    </nav>
  )
}
