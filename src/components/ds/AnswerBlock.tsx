import type { Locale, Reviewer } from '@/lib/services'
import { Stabilo } from './Stabilo'
import { T, fmtDate } from './strings'

/** "Jawaban singkat": H2 + the answer in Stabilo (paper only) + Diperbarui; "Ditinjau oleh" only with a real reviewer. */
export function AnswerBlock({ locale: l, heading, text, updated, reviewer, id }: {
  locale: Locale; heading: string; text: string; updated: string; reviewer: Reviewer | null; id?: string
}) {
  return (
    <div>
      <h2 id={id} className="t-h2">{heading}</h2>
      <p className="t-lead mt-6">
        <Stabilo>{text}</Stabilo>
      </p>
      <p className="t-small mt-4 text-ink-2">
        {T.updated[l]} <time dateTime={updated}>{fmtDate(updated, l)}</time>
        {reviewer ? ` · ${T.reviewedBy[l]} ${reviewer.name}, ${reviewer.jobTitle[l]}` : null}
      </p>
    </div>
  )
}
