/** Non-home H1: display line = text up to and including the first ': ', .tail = the rest. textContent === text. */
export function H1Svc({ text, variant = 'display', id }: { text: string; variant?: 'display' | 'reading'; id?: string }) {
  if (variant === 'reading') return <h1 id={id} className="t-h2 max-w-[24ch]">{text}</h1>
  const i = text.indexOf(': ')
  if (i < 0) return <h1 id={id} className="t-h1svc">{text}</h1>
  return (
    <h1 id={id} className="t-h1svc">
      {text.slice(0, i + 2)}
      <span className="tail">{text.slice(i + 2)}</span>
    </h1>
  )
}
