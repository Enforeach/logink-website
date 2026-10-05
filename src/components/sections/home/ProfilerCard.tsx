// The Lead Profiler chat card, shared by the SSR shell (server) and the island (client) so the swap is 1:1.
// Presentational only: no hooks, no 'use client'.
import type { ReactNode, Ref } from 'react'
import { cn } from '@/lib/utils'

export const chipCls = (wide?: boolean, on?: boolean) =>
  cn('chip chip-choice t-ui', wide && 'w-full justify-center font-650 sm:w-auto', on && 'border-ink bg-btn text-btn-ink')

export function ProfilerCard({ bot, status, logRef, msgs, typing, children }: {
  bot: string; status?: string; logRef?: Ref<HTMLOListElement>
  msgs: { id: number; bot: boolean; text: string }[]; typing?: string; children: ReactNode
}) {
  return (
    <div className="overflow-clip rounded-[var(--r-card,16px)] bg-surface-alt">
      <div className="flex min-h-11 items-center justify-between gap-3 border-b border-hair px-4 py-2">
        <p className="t-dateline text-ink-2">{bot}</p>
        {status ? <p className="t-small tabular-nums text-ink-2">{status}</p> : null}
      </div>
      {/* bubbles rise on insertion (motion.css .lk-chat--live); the first, server-rendered bubble never replays */}
      <ol ref={logRef} aria-live="polite"
        className="lk-chat lk-chat--live grid max-h-[min(56svh,440px)] gap-3 overflow-y-auto p-4 [&>li:first-child>*]:![animation:none]">
        {msgs.map((m) => (
          <li key={m.id} className={m.bot ? 'justify-self-start' : 'justify-self-end'}>
            <span className={cn('t-body inline-block max-w-[38ch] whitespace-pre-line rounded-[var(--r-card,16px)] px-4 py-2',
              m.bot ? 'bg-surface' : 'bg-btn text-btn-ink')}>{m.text}</span>
          </li>
        ))}
        {typing ? <li className="justify-self-start"><span className="t-small inline-block text-ink-2">{typing}…</span></li> : null}
      </ol>
      <div className="grid gap-3 border-t border-hair p-4">{children}</div>
    </div>
  )
}
