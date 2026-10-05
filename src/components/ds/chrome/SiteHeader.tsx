import Link from 'next/link'
import { LogoFull } from '@/components/ui/Logo'
import { MenuButton } from '@/motion/primitives'
import { page, type Locale, type SvcKey } from '@/lib/services'
import { Icon } from '../Icon'
import { T } from '../strings'
import { LanguageLink } from './LanguageLink'
import { MegaMenu } from './MegaMenu'
import { quoteHref } from './links'

const navLink = 'inline-flex min-h-tap items-center px-3 font-650 hover:underline underline-offset-4'

/** Fixed header, always visible and always light (motion.css condenses it to the pill via html[data-nav]). */
export function SiteHeader({ locale: l, alt, svc }: { locale: Locale; alt: { id: string | null; en: string | null }; svc?: SvcKey }) {
  return (
    <header className="site-header">
      <div className="wrap flex h-full items-center gap-2">
        <Link href={page('home').path[l]} className="mr-auto inline-flex min-h-tap items-center">
          <LogoFull theme="light" size={28} className="logo-auto h-6 w-auto lg:h-7" />
        </Link>
        <nav aria-label={T.mainNav[l]} className="hidden items-center lg:flex">
          <button type="button" popoverTarget="mega" className={`nav-mega-btn gap-1 ${navLink}`}>
            {T.services[l]}
            <Icon name="plus" size={14} />
          </button>
          <Link href={page('hub').path[l]} className={`nav-mega-link ${navLink}`}>{T.services[l]}</Link>
          <Link href={page('portfolio').path[l]} className={navLink}>{T.portfolio[l]}</Link>
          <Link href={page('blog').path[l]} className={navLink}>{T.blog[l]}</Link>
          <Link href={page('about').path[l]} className={navLink}>{T.about[l]}</Link>
        </nav>
        <LanguageLink locale={l} alt={alt} />
        <Link href={quoteHref(l, svc)} className="btn btn-ink btn-sm hidden lg:inline-flex" data-cta="quote" data-placement="header" data-service={svc ?? 'none'}>
          {T.quote[l]}
        </Link>
        <MenuButton target="menu" className="-mr-2 inline-flex h-11 w-11 items-center justify-center lg:hidden">
          <Icon name="menu" size={24} />
          <span className="sr-only">{T.menu[l]}</span>
        </MenuButton>
      </div>
      <MegaMenu locale={l} />
    </header>
  )
}
