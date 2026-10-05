import { Icon } from './Icon'

/** <details> per question: 48px summary, the answer is always in the DOM (SSR contract). */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq border-b border-hair">
      {items.map((it) => (
        <details key={it.q} className="group">
          <summary>
            <span className="t-h3">{it.q}</span>
            <Icon name="plus" size={22} className="shrink-0 transition-transform duration-ui ease-drawer group-open:rotate-45" />
          </summary>
          <p className="t-body pb-6">{it.a}</p>
        </details>
      ))}
    </div>
  )
}
