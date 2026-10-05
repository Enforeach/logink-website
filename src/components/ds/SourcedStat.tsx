import { Chip } from './Chip'

/** Final value in the HTML (no count-up), sentence, source chip + year + outbound link. */
export function SourcedStat({ value, text, src, year, url }: { value?: string; text: string; src: string; year: number; url: string }) {
  return (
    <div className="border-t border-hair pt-4">
      {value ? <p className="t-stat text-key-num">{value}</p> : null}
      <p className="t-body mt-2">{text}</p>
      <p className="mt-3">
        <Chip variant="source" href={url} year={year}>{src}</Chip>
      </p>
    </div>
  )
}
