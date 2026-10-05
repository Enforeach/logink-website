import { LogoFull } from '@/components/ui/Logo'
import { ANTI_SCAM, WA_PATTERNS, liveServices, page, svcHref, type Locale } from '@/lib/services'
import { Section } from '@/components/ds/Section'
import { Wrap } from '@/components/ds/Wrap'
import { H1Svc } from '@/components/ds/H1Svc'
import { WaButton } from '@/components/ds/WaButton'
import { T } from '@/components/ds/strings'
import { NF } from '@/content/notfound'

const row = 'flex min-h-tap items-center border-t border-[var(--line)] underline-offset-4 hover:underline'

/**
 * Subuh 04.45 404 (BUILD §3.9). Plain <a> links (no next/link), so the standalone version inside
 * global-not-found ships no client JS. `standalone` adds the logo (no header there) and the EN line.
 */
export function NotFoundPage({ locale: l, standalone }: { locale: Locale; standalone?: boolean }) {
  const pages = [
    { name: T.home[l], href: page('home').path[l] },
    { name: NF.hub[l], href: page('hub').path[l] },
    { name: T.blog[l], href: page('blog').path[l] },
    { name: T.contact[l], href: page('contact').path[l] },
  ]
  return (
    <Section hour="0445" labelledBy="nf-h1">
      <Wrap>
        {standalone ? (
          // eslint-disable-next-line @next/next/no-html-link-for-pages -- global-not-found ships no client JS (no next/link)
          <a href="/" aria-label="Logink" className="mb-section-sm inline-flex min-h-tap items-center"><LogoFull theme="light" size={28} /></a>
        ) : null}
        <p className="dateline"><span>404</span></p>
        <div className="grid-12 mt-8 gap-y-12">
          <div className="col-span-12 lg:col-span-7">
            <H1Svc text={NF.h1[l]} id="nf-h1" />
            {standalone && l === 'id' ? <p lang="en" className="t-h3 mt-4 text-ink-2">{NF.h1.en}</p> : null}
            <p className="t-lead mt-6">{NF.text[l]}</p>
            <p className="t-small mt-10">{NF.waLead[l]}</p>
            <div className="mt-3"><WaButton text={WA_PATTERNS.generic[l]} placement="hero" /></div>
            <p className="t-small mt-4 text-ink-2">{ANTI_SCAM[l]}</p>
          </div>
          <nav aria-labelledby="nf-pages" className="col-span-12 lg:col-span-4 lg:col-start-9">
            <h2 id="nf-pages" className="t-dateline text-ink-2">{NF.pagesH[l]}</h2>
            <ul className="mt-3 border-b border-[var(--line)]">
              {pages.map((p) => <li key={p.href}><a href={p.href} className={row}>{p.name}</a></li>)}
            </ul>
            <h3 className="t-dateline mt-8 text-ink-2">{NF.servicesH[l]}</h3>
            <ul className="mt-3 border-b border-hair">
              {liveServices().map((s) => <li key={s.key}><a href={svcHref(s.key, l)} className={row}>{s.name[l]}</a></li>)}
            </ul>
          </nav>
        </div>
      </Wrap>
    </Section>
  )
}
