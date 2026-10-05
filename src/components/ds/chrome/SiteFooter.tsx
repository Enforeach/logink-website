import Link from 'next/link'
import { LogoFull } from '@/components/ui/Logo'
import { EMAIL, ENTITY, INSTAGRAM, WA_DISPLAY, liveServices, page, svcHref, waLink, type Locale, type SvcKey } from '@/lib/services'
import { T } from '../strings'
import { hub360 } from './links'

const col = 'text-[.75rem] font-650 uppercase tracking-[.18em] text-ink-2'
const item = 'inline-flex min-h-9 items-center gap-1.5 text-ink-2 transition-colors hover:text-ink'

/**
 * Kertas footer on the house-lights sheet: LogoFull (unchanged component, small) with ENTITY verbatim, NAP, the 7 services by name + the 360° item, pages and
 * legal links (owner 2026-10-04: no Mode teks checkbox, no AI note; AI images keep their own caption badge). Entity facts beyond these (PT, address, founding year) render only once supplied.
 */
export function SiteFooter({ locale: l, text, svc }: { locale: Locale; text: string; svc?: SvcKey }) {
  const pages = [
    [page('home'), T.home], [page('hub'), T.services], [page('portfolio'), T.portfolio],
    [page('blog'), T.blog], [page('about'), T.about], [page('contact'), T.contact],
  ] as const
  return (
    <footer className="site-footer">
      <div className="wrap pb-10 pt-section-sm">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <LogoFull theme="light" size={32} className="h-8 w-auto" />
            <p className="t-small mt-5 max-w-[46ch] text-ink-2">{ENTITY[l]}</p>
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 lg:col-start-5">
            <p className={col}>{T.services[l]}</p>
            <ul className="mt-2">
              {liveServices().map((s) => (
                <li key={s.key}><Link href={svcHref(s.key, l)} className={item}>{s.name[l]}</Link></li>
              ))}
              <li><Link href={hub360(l)} className={item}>{T.c360Item[l]}</Link></li>
            </ul>
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-2 lg:col-start-8">
            <p className={col}>{T.pages[l]}</p>
            <ul className="mt-2">
              {pages.map(([p, name]) => (
                <li key={p.key}><Link href={p.path[l]} className={item}>{name[l]}</Link></li>
              ))}
            </ul>
          </div>
          <address className="col-span-12 not-italic [overflow-wrap:anywhere] sm:col-span-6 lg:col-span-3 lg:col-start-10">
            <p className={col}>{T.reach[l]}</p>
            <ul className="mt-2">
              <li className="flex min-h-9 items-center text-ink-2">{T.city[l]}</li>
              <li>
                <a href={waLink(text)} target="_blank" rel="noopener" className={item} data-cta="whatsapp" data-placement="footer"
                  data-service={svc ?? 'none'} data-cursor="Chat WhatsApp" data-cursor-tone="wa">
                  WhatsApp <span className="whitespace-nowrap">{WA_DISPLAY}</span>
                </a>
              </li>
              <li><a href={`mailto:${EMAIL}`} className={item}>{EMAIL}</a></li>
              <li><a href={INSTAGRAM} target="_blank" rel="noopener" className={item}>Instagram @logink.co</a></li>
            </ul>
          </address>
        </div>
        <div className="mt-12 border-t border-[var(--line)] pt-6">
          <p className="t-small flex flex-wrap items-center gap-x-6 text-ink-2">
            <span>© {new Date().getFullYear()} Logink</span>
            <Link href={page('privacy').path[l]} className={item}>{page('privacy').h1[l]}</Link>
            <Link href={page('terms').path[l]} className={item}>{page('terms').h1[l]}</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
