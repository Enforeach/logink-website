// E2 · Review card: five star shapes, "R.", the review (a customer quote, Indonesian in both locales) and the
// 'Contoh' badge. No rating schema anywhere. Used on: home Bab II, Local SEO, Phone 'instagram'.
import type { Locale } from '@/lib/services'
import { REVIEW } from '@/content/instruments'
import { Badge } from '@/components/ds/Badge'
import { MockFrame, type MockGround } from './MockFrame'

const STAR = 'M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z'

export function ReviewCardBody({ locale: l }: { locale: Locale }) {
  return (
    <div className="m-box grid gap-2 bg-surface">
      <div className="flex items-center gap-2">
        <span className="m-av m-s" aria-hidden="true">{REVIEW.who}</span>
        <span className="grid flex-1">
          <b className="font-650">{REVIEW.who}</b>
          <span className="m-xs text-ink-2">{REVIEW.kind[l]}</span>
        </span>
        <Badge kind="contoh" locale={l} />
      </div>
      <svg width="88" height="16" viewBox="0 0 110 20" aria-hidden="true" className="fill-key">
        {[0, 1, 2, 3, 4].map((i) => <path key={i} d={STAR} transform={`translate(${i * 22} -2) scale(.9)`} />)}
      </svg>
      <p>{REVIEW.text}</p>
    </div>
  )
}

export function ReviewCard({ locale: l, ground = 'putih', className }: { locale: Locale; ground?: MockGround; className?: string }) {
  return (
    <MockFrame locale={l} ground={ground} className={className}>
      <ReviewCardBody locale={l} />
    </MockFrame>
  )
}
