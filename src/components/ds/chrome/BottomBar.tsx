import Link from 'next/link'
import type { Locale, SvcKey } from '@/lib/services'
import { WaButton } from '../WaButton'
import { T } from '../strings'
import { quoteHref } from './links'
import { cn } from '@/lib/utils'

/** Phone action bar (<1024px, 56px): WhatsApp 60% + Penawaran 40%, or WhatsApp only on /contact. 0 KB JS. */
export function BottomBar({ locale: l, text, svc, variant = 'full' }: { locale: Locale; text: string; svc?: SvcKey; variant?: 'full' | 'wa' }) {
  return (
    <nav className="bottom-bar border-t border-hair" aria-label={T.quick[l]}>
      <div className={cn('grid h-bar items-center gap-2 px-2', variant === 'full' && 'grid-cols-[3fr_2fr]')}>
        <WaButton text={text} placement="bar" service={svc ?? 'none'} full className="px-2" />
        {variant === 'full' ? (
          <Link href={quoteHref(l, svc)} className="btn btn-ink w-full px-2" data-cta="quote" data-placement="bar" data-service={svc ?? 'none'}>
            {T.quoteShort[l]}
          </Link>
        ) : null}
      </div>
    </nav>
  )
}
