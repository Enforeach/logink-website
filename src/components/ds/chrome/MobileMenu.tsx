import Link from 'next/link'
import { MenuButton } from '@/motion/primitives'
import { page, svcHref, type Locale, type SvcKey } from '@/lib/services'
import { Icon } from '../Icon'
import { WaButton } from '../WaButton'
import { T } from '../strings'
import { LanguageLink } from './LanguageLink'
import { groups, hub360, quoteHref } from './links'

/**
 * Phone menu: a modal <dialog> after the header (no Logo inside: fixed gradient ids). showModal() makes the
 * page inert, so focus stays inside; Esc and the close button close it (Invoker Commands + SiteObserver fallback).
 */
export function MobileMenu({ locale: l, alt, svc, wa }: { locale: Locale; alt: { id: string | null; en: string | null }; svc?: SvcKey; wa: string }) {
  const pages = [page('portfolio'), page('blog'), page('about'), page('contact')]
  const pageName = { portfolio: T.portfolio, blog: T.blog, about: T.about, contact: T.contact } as Record<string, typeof T.blog>
  return (
    <dialog id="menu" className="lk-menu m-0 h-[100dvh] max-h-none w-full max-w-none border-0 bg-surface p-0 text-ink" aria-label={T.menu[l]} data-ground="putih">
      <div className="wrap flex min-h-full flex-col pb-8">
        <div className="flex h-[calc(var(--nav-h)+var(--dial-h))] items-center justify-between border-b border-hair">
          <p className="t-dateline text-ink-2">{T.menu[l]}</p>
          <div className="flex items-center gap-2">
            <LanguageLink locale={l} alt={alt} />
            <MenuButton target="menu" close className="-mr-2 inline-flex h-12 w-12 items-center justify-center">
              <Icon name="close" size={24} />
              <span className="sr-only">{T.close[l]}</span>
            </MenuButton>
          </div>
        </div>
        <nav aria-label={T.mainNav[l]} className="mt-6 grid gap-8">
          <div>
            <Link href={page('hub').path[l]} className="t-dateline inline-flex min-h-tap items-center text-ink-2 underline underline-offset-4">{T.services[l]}</Link>
            {groups().map((g) => (
              <div key={g.key} className="mt-4">
                <p className="t-small font-650 text-ink-2">{g.name[l]}</p>
                <ul className="mt-1">
                  {g.items.map((s) => (
                    <li key={s.key}>
                      <Link href={svcHref(s.key, l)} className="t-h3 flex min-h-tap items-center" aria-current={s.key === svc ? 'page' : undefined}>{s.name[l]}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link href={hub360(l)} className="t-h3 mt-4 flex min-h-tap items-center border-t border-hair pt-2">{T.c360Item[l]}</Link>
          </div>
          <ul className="border-t border-hair pt-4">
            {pages.map((p) => (
              <li key={p.key}>
                <Link href={p.path[l]} className="t-h3 flex min-h-tap items-center">{pageName[p.key][l]}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto grid grid-cols-1 gap-3 pt-8 sm:grid-cols-2">
          <WaButton text={wa} placement="menu" service={svc ?? 'none'} full />
          <Link href={quoteHref(l, svc)} className="btn btn-ink w-full" data-cta="quote" data-placement="menu" data-service={svc ?? 'none'}>{T.quote[l]}</Link>
        </div>
      </div>
    </dialog>
  )
}
