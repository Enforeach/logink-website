// E6 · AI crawler log. Ticker contract (motion.css §15): <input.lk-ticker-toggle> + <label> "Jeda log" are
// siblings of <div.lk-ticker tabindex=0> holding 6 lines + the same 6 aria-hidden. The track moves only on
// desktop without reduced motion or Mode teks, and only there does the pause control show (WCAG 2.2.2);
// hover and focus also pause it. Phones show the 6 lines statically.
// The controls must stay operable, so they sit beside the inert data-nosnippet body inside the same figure
// (same mock contract as MockFrame: label, nosnippet, no <a>/<button>). Used on: home Bab III, AI page.
import type { Locale } from '@/lib/services'
import { CRAWLER, MOCK_LABEL } from '@/content/instruments'
import type { MockGround } from './MockFrame'
import './instruments.css'

function Line({ text, hidden }: { text: string; hidden?: boolean }) {
  const [bot, method, path, status] = text.split(' ')
  return (
    <li aria-hidden={hidden || undefined}>
      <span className="m-hl">{bot}</span> {method} {path} <span className="text-ink-2">{status}</span>
    </li>
  )
}

export function CrawlerLog({ locale: l, id = 'jeda-log', ground = 'senja-dalam', className }: { locale: Locale; id?: string; ground?: MockGround; className?: string }) {
  return (
    <figure className={className ? `mock m-log ${className}` : 'mock m-log'} data-ground={ground} data-reveal="inst">
      <figcaption className="mock-label">{MOCK_LABEL[l]}</figcaption>
      <div data-nosnippet="" className="m-cap">{CRAWLER.title[l]}</div>
      <input type="checkbox" id={id} className="lk-ticker-toggle" />
      <label htmlFor={id} className="t-small">{CRAWLER.pause[l]}</label>
      <div className="lk-ticker" tabIndex={0} role="region" aria-label={CRAWLER.region[l]}>
        <div data-nosnippet="" inert>
          <ol className="lk-ticker__track">
            {CRAWLER.lines.map((t) => <Line key={t} text={t} />)}
            {CRAWLER.lines.map((t) => <Line key={`${t}-2`} text={t} hidden />)}
          </ol>
        </div>
      </div>
    </figure>
  )
}
