import { Fragment } from 'react'
import Link from 'next/link'
import { STAGES, WA_PATTERNS, page, svcHref, waLink, type Locale } from '@/lib/services'
import { T } from '../strings'
import { groups, hub360 } from './links'

/**
 * Desktop services menu: popover="auto", 0 KB JS, always in the SSR DOM. Surface = the header's ground
 * (Putih by day, Malam by night). Browsers without popover get the sibling /layanan link (motion.css).
 */
export function MegaMenu({ locale: l }: { locale: Locale }) {
  return (
    <div id="mega" popover="auto" className="lk-mega fixed inset-x-0 bottom-auto top-[calc(var(--dial-h)+var(--nav-h))] m-0 max-h-[calc(100dvh-var(--nav-h)-var(--dial-h))] w-full max-w-none overflow-y-auto border-0 border-b border-hair bg-surface p-0 text-ink">
      <div className="wrap grid grid-cols-3 gap-x-8 gap-y-6 py-8 xl:grid-cols-4">
        <p className="t-dateline col-span-3 text-ink-2 xl:col-span-4">{T.oneService[l]}</p>
        {groups().map((g) => (
          <div key={g.key}>
            <p className="t-small font-650 text-ink-2">{g.name[l]}</p>
            <ul className="mt-3 space-y-4">
              {g.items.map((s) => (
                <li key={s.key}>
                  <Link href={svcHref(s.key, l)} className="t-h3 underline-offset-4 hover:underline">{s.name[l]}</Link>
                  <p className="t-small mt-1 text-ink-2">{s.line[l]}</p>
                  <span className="chip mt-2" data-stage={s.stage}>{STAGES[s.stage].name[l]}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="tint-rose col-span-3 grid gap-2 rounded-[var(--r-card)] p-6 xl:col-span-1 xl:self-start">
          <p className="t-dateline text-ink-2">{T.every[l]}</p>
          <p className="t-h3">{T.c360[l].split('360°').map((part, i) => (i ? <Fragment key={i}><span className="grad-text">360°</span>{part}</Fragment> : part))}</p>
          <p className="t-small">{T.c360Line[l]}</p>
          <p className="flex flex-wrap gap-x-5">
            <Link href={hub360(l)} className="link inline-flex min-h-tap items-center">{T.c360How[l]}</Link>
            <a href={waLink(WA_PATTERNS.campaign360[l])} target="_blank" rel="noopener" className="link inline-flex min-h-tap items-center"
              data-cta="whatsapp" data-placement="menu" data-service="360" data-cursor="Chat WhatsApp" data-cursor-tone="wa">
              {T.c360Chat[l]}
            </a>
          </p>
        </div>
        <p className="col-span-3 xl:col-span-4">
          <Link href={page('hub').path[l]} className="link">{T.allServices[l]}</Link>
        </p>
      </div>
    </div>
  )
}
