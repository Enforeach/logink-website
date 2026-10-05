// E10 · CSS phone (390×844 proportions, no brand bezel). The figure is the handset: its mock label sits where a
// status bar would (no clock). Screens reuse the instrument bodies; their em sizes scale with the phone width
// (container units). `panels` renders the Overture's 4 step screens as [data-step-panel][data-k=0..3]
// (SiteObserver swaps them by data-step; panel 0 shows without JS). Used on: home Overture, inline phone steps.
import type { Locale } from '@/lib/services'
import { MOCK_LABEL, MOCK_LABEL_PHOTO } from '@/content/instruments'
import { MockFrame } from './MockFrame'
import { SerpToMapsBody } from './SerpToMaps'
import { IgGridBody, igTiles } from './IgGrid'
import { ReviewCardBody } from './ReviewCard'
import { AiAnswerBody } from './AiAnswer'
import { ChatBody } from './AdToChat'

export type PhoneScreen = 'search' | 'maps' | 'instagram' | 'ai' | 'whatsapp'
// One panel per Overture step (§11 4.6): 07.10 search + Maps · 12.40 Instagram · 18.05 AI · 21.30 WhatsApp.
const PANELS: (PhoneScreen | 'search-maps')[] = ['search-maps', 'instagram', 'ai', 'whatsapp']

function Screen({ l, s }: { l: Locale; s: PhoneScreen | 'search-maps' }) {
  if (s === 'search') return <SerpToMapsBody locale={l} mode="serp" />
  if (s === 'maps') return <SerpToMapsBody locale={l} mode="maps" />
  if (s === 'search-maps') return <SerpToMapsBody locale={l} mode="both" />
  if (s === 'instagram') return <><IgGridBody locale={l} /><ReviewCardBody locale={l} /></>
  if (s === 'ai') return <AiAnswerBody locale={l} size="phone" />
  return <ChatBody bubbles={2} />
}

export function Phone({ locale: l, screen = 'search', panels, className }: { locale: Locale; screen?: PhoneScreen; panels?: boolean; className?: string }) {
  return (
    <MockFrame locale={l} label={((panels || screen === 'instagram') && igTiles().some(Boolean) ? MOCK_LABEL_PHOTO : MOCK_LABEL)[l]} className={className ? `m-phone ${className}` : 'm-phone'}>
      {panels ? (
        PANELS.map((s, k) => (
          <div key={s} data-step-panel="" data-k={k}><Screen l={l} s={s} /></div>
        ))
      ) : (
        <div className="m-scr"><Screen l={l} s={screen} /></div>
      )}
    </MockFrame>
  )
}
