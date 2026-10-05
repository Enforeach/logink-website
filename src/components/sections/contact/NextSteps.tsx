import type { Locale } from '@/lib/services'
import { CONTACT, STEPS } from '@/content/contact'

/** The four steps after a message (copy from the old contact page; claims unchanged). */
export function NextSteps({ locale: l }: { locale: Locale }) {
  return (
    <div>
      <h2 className="t-h3">{CONTACT.stepsH[l]}</h2>
      <p className="t-body mt-2 text-ink-2">{CONTACT.stepsLede[l]}</p>
      <ol className="mt-5 border-b border-hair">
        {STEPS[l].map((s, i) => (
          <li key={s} className="grid grid-cols-[2.5rem_1fr] items-baseline border-t border-hair py-4">
            <span className="t-dateline text-key-ink" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <span className="t-body">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
