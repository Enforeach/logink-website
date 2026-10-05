// E9 · Monthly report frame (sample): GSC generative-AI impressions, Bing AI Performance and the GA4 AI Assistant
// channel, joined to WhatsApp clicks. Every value is a range tagged 'contoh'. Used on: AI page, MeasureBlock.
import type { Locale } from '@/lib/services'
import { REPORT, SAMPLE } from '@/content/instruments'
import { MockFrame, type MockGround } from './MockFrame'

function Value({ v, l }: { v: string; l: Locale }) {
  return (
    <span className="flex flex-wrap items-baseline gap-2">
      <b className="m-l font-650 tabular-nums">{v}</b>
      <span className="m-chip">{SAMPLE[l]}</span>
    </span>
  )
}

export function ReportFrameBody({ locale: l }: { locale: Locale }) {
  return (
    <>
      <span className="m-cap">{REPORT.title[l]}</span>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(11rem,1fr))] gap-2">
        {REPORT.panels.map((p) => (
          <li key={p.src} className="m-box grid content-start gap-1">
            <span className="m-xs font-650">{p.src}</span>
            <span className="m-s text-ink-2">{p.k[l]}</span>
            <Value v={p.v[l]} l={l} />
          </li>
        ))}
      </ul>
      <div className="m-box m-strong grid gap-1">
        <span className="m-xs font-650">{REPORT.goal.k[l]}</span>
        <Value v={REPORT.goal.v} l={l} />
      </div>
      <span className="m-xs text-ink-2">{REPORT.foot[l]}</span>
    </>
  )
}

export function ReportFrame({ locale: l, ground = 'putih', className }: { locale: Locale; ground?: MockGround; className?: string }) {
  return (
    <MockFrame locale={l} ground={ground} className={className}>
      <ReportFrameBody locale={l} />
    </MockFrame>
  )
}
