// Renders an instrument by its content key (ServiceContent work[].card: InstrumentKey), so content files stay JSX-free.
import type { Locale } from '@/lib/services'
import type { InstrumentKey } from '@/content/services/types'
import { SerpToMaps } from './SerpToMaps'
import { IgGrid } from './IgGrid'
import { ReviewCard } from './ReviewCard'
import { SiteFrame } from './SiteFrame'
import { Funnel } from './Funnel'
import { AiAnswer } from './AiAnswer'
import { PromptTable } from './PromptTable'
import { SovBars } from './SovBars'
import { CrawlerLog } from './CrawlerLog'
import { QueryFanout } from './QueryFanout'
import { JsonLdFragment } from './JsonLdFragment'
import { ReportFrame } from './ReportFrame'
import { AdToChat } from './AdToChat'
import { ContentCalendar } from './ContentCalendar'

const MAP: Record<InstrumentKey, (p: { locale: Locale; className?: string }) => React.JSX.Element> = {
  SerpToMaps, IgGrid, ReviewCard, SiteFrame, Funnel, AiAnswer, PromptTable, SovBars, CrawlerLog, QueryFanout,
  JsonLdFragment, ReportFrame, AdToChat, ContentCalendar,
}

export function Instrument({ k, locale, className }: { k: InstrumentKey; locale: Locale; className?: string }) {
  const C = MAP[k]
  return <C locale={locale} className={className} />
}
