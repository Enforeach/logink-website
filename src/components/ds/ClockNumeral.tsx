/** Home chapter openers only; aria-hidden, always outside headings. */
export function ClockNumeral({ hour }: { hour: string }) {
  const h = hour.replace('.', '')
  return <span className="t-clock block" aria-hidden="true">{`${h.slice(0, 2)}.${h.slice(2)}`}</span>
}
