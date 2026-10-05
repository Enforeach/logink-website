import * as React from 'react'
import type { ReactNode } from 'react'
import { HouseLights } from '@/motion/primitives'
import { page, type Locale, type SvcKey } from '@/lib/services'
import { SiteHeader } from './SiteHeader'
import { MobileMenu } from './MobileMenu'
import { ClosingBand } from './ClosingBand'
import { SiteFooter } from './SiteFooter'
import { WaPill } from './WaPill'
import { BottomBar } from './BottomBar'

// Persistent chrome keeps still across page cuts only inside its own named boundary (10-motion-mounting §10.2).
const VT = (React as Partial<typeof React>).ViewTransition
const Hold = ({ name, children }: { name: string; children: ReactNode }) => (VT ? <VT name={name}>{children}</VT> : children)

/**
 * The only place chrome is composed (BUILD §2.3). DOM order is fixed: header (+ mega popover), menu dialog,
 * main, house lights (closing band + Kertas sheet with the footer), WhatsApp pill, bottom bar.
 * closing="inline": the page renders <ClosingBand inline> itself (before its FAQ), so only the sheet + footer follow.
 * The first child of <main> gets the fixed-header offset here, so pages never add pt-*.
 */
export function PageShell({ locale: l, alt, wa, sky, svc, bar = 'full', sheet, closing = 'end', children }: {
  locale: Locale; alt: { id: string | null; en: string | null }; wa: string; sky: 'light' | 'dark'
  svc?: SvcKey; bar?: 'full' | 'wa'; sheet?: ReactNode; closing?: 'end' | 'inline'; children: ReactNode
}) {
  const link360 = !svc && [page('home').path.id, page('hub').path.id].includes(alt.id ?? '')
  return (
    <>
      <Hold name="site-header">
        <SiteHeader locale={l} alt={alt} svc={svc} />
      </Hold>
      <MobileMenu locale={l} alt={alt} svc={svc} wa={wa} />
      <main id="main" tabIndex={-1} data-sky={sky} className="outline-none [&>:nth-child(1_of_:not(script,style,link))]:pt-[calc(var(--nav-h)+var(--dial-h)+var(--section-y-sm))]">
        {children}
      </main>
      {closing === 'inline' ? (
        <div data-ground="kertas" data-sky="light">
          {sheet}
          <SiteFooter locale={l} text={wa} svc={svc} />
        </div>
      ) : (
        <HouseLights band={<ClosingBand locale={l} text={wa} svc={svc} link360={link360} />}>
          {sheet}
          <SiteFooter locale={l} text={wa} svc={svc} />
        </HouseLights>
      )}
      <Hold name="wa-pill">
        <WaPill text={wa} service={svc} />
      </Hold>
      <Hold name="bottom-bar">
        <BottomBar locale={l} text={wa} svc={svc} variant={bar} />
      </Hold>
    </>
  )
}
