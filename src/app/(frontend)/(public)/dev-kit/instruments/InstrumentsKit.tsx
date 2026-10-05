// Dev-only instrument kit (BUILD §5.6): every instrument on the ground and at the column width it will be used
// at, inside the real PageShell. /dev-kit/instruments (ID) and /en/dev-kit/instruments (EN); 404 in production.
import type { ReactNode } from 'react'
import { page, type Locale } from '@/lib/services'
import type { Ground } from '@/styles/tailwind.tokens'
import { PageShell } from '@/components/ds/chrome/PageShell'
import { Section } from '@/components/ds/Section'
import { Dateline } from '@/components/ds/Dateline'
import { ProofLoupe } from '@/motion/ProofLoupe'
import { ANNOT_TOGGLE } from '@/content/instruments'
import { SerpToMaps } from '@/components/instruments/SerpToMaps'
import { IgGrid } from '@/components/instruments/IgGrid'
import { ReviewCard } from '@/components/instruments/ReviewCard'
import { SiteFrame } from '@/components/instruments/SiteFrame'
import { Funnel } from '@/components/instruments/Funnel'
import { AiAnswer } from '@/components/instruments/AiAnswer'
import { AnnotationLayer } from '@/components/instruments/AnnotationLayer'
import { PromptTable } from '@/components/instruments/PromptTable'
import { SovBars } from '@/components/instruments/SovBars'
import { CrawlerLog } from '@/components/instruments/CrawlerLog'
import { QueryFanout } from '@/components/instruments/QueryFanout'
import { JsonLdFragment } from '@/components/instruments/JsonLdFragment'
import { ReportFrame } from '@/components/instruments/ReportFrame'
import { MeasureBlock } from '@/components/instruments/MeasureBlock'
import { Phone } from '@/components/instruments/Phone'
import { AdToChat } from '@/components/instruments/AdToChat'
import { ContentCalendar } from '@/components/instruments/ContentCalendar'
import { CampaignMap } from '@/components/instruments/CampaignMap'

/** One labelled specimen: name, where it is used, then the instrument at its real column width. */
function Spec({ name, use, span = 'lg:col-span-6', children }: { name: string; use: string; span?: string; children: ReactNode }) {
  return (
    <div className={`col-span-12 grid content-start gap-3 ${span}`}>
      <p className="t-dateline text-key-ink">{name}</p>
      <p className="t-small text-ink-2">{use}</p>
      {children}
    </div>
  )
}

function Band({ l, id, hour, ground, title, children }: { l: Locale; id: string; hour: string; ground: Ground; title: string; children: ReactNode }) {
  return (
    <Section hour={hour} ground={ground} id={id} labelledBy={`${id}-h`}>
      <div className="wrap grid-12 gap-y-10">
        <Dateline locale={l} hour={hour} right={`Ground · ${ground}`} className="col-span-12" />
        <h2 id={`${id}-h`} className="t-h2 col-span-12">{title}</h2>
        {children}
      </div>
    </Section>
  )
}

export function InstrumentsKit({ locale: l }: { locale: Locale }) {
  const alt = { id: '/dev-kit/instruments', en: '/en/dev-kit/instruments' }
  const id = l === 'id'
  return (
    <PageShell locale={l} alt={alt} wa={page('home').wa[l]} sky="light">
      <Section hour="0530" ground="putih" pad="sm">
        <div className="wrap grid gap-4">
          <Dateline locale={l} hour="0530" word="Kit" right="dev only · noindex" />
          <h1 className="t-h1svc">{id ? 'Instrumen: semua mock live-HTML' : 'Instruments: every live-HTML mock'}</h1>
          <nav className="t-small flex flex-wrap gap-x-4">
            {['pagi', 'siang', 'senja', 'malam', 'kampanye', 'overture'].map((k) => <a key={k} className="link" href={`#${k}`}>{k}</a>)}
          </nav>
        </div>
      </Section>

      <Band l={l} id="pagi" hour="0700" ground="kertas" title={id ? 'Ditemukan: search dan Maps' : 'Found: search and Maps'}>
        <Spec name="SerpToMaps · both" use="Home Bab I" span="lg:col-span-5"><SerpToMaps locale={l} /></Spec>
        <Spec name="SerpToMaps · serp" use="SEO hero card" span="lg:col-span-4"><SerpToMaps locale={l} mode="serp" /></Spec>
        <Spec name="SerpToMaps · maps" use="Local SEO hero card" span="lg:col-span-3"><SerpToMaps locale={l} mode="maps" /></Spec>
        <Spec name="MeasureBlock + ReportFrame" use="Bab I empty state · service Bukti · portfolio · about" span="lg:col-span-7"><MeasureBlock locale={l} /></Spec>
        <Spec name="ReviewCard" use="Local SEO" span="lg:col-span-4 lg:col-start-9"><ReviewCard locale={l} /></Spec>
      </Band>

      <Band l={l} id="siang" hour="1240" ground="putih" title={id ? 'Dipercaya: Instagram, ulasan, website' : 'Trusted: Instagram, reviews, website'}>
        <Spec name="IgGrid + ReviewCard" use="Home Bab II collage · Social hero" span="lg:col-span-5">
          <div className="grid gap-4"><IgGrid locale={l} /><ReviewCard locale={l} /></div>
        </Spec>
        <Spec name="SiteFrame" use="Website hero / steps" span="lg:col-span-7"><SiteFrame locale={l} /></Spec>
        <Spec name="ContentCalendar" use="Social + Creative steps · Creative hero" span="lg:col-span-7"><ContentCalendar locale={l} /></Spec>
        <Spec name="ReportFrame · kertas" use="AI page (paper body)" span="lg:col-span-5"><ReportFrame locale={l} ground="kertas" /></Spec>
      </Band>

      <Band l={l} id="senja" hour="1805" ground="senja" title={id ? 'Dikutip AI: di balik layar' : 'Cited by AI: behind the scenes'}>
        <Spec name="ProofLoupe(AiAnswer + AnnotationLayer)" use="Home Bab III · AI page" span="lg:col-span-6">
          <ProofLoupe id={`loupe-${l}`} toggleLabel={ANNOT_TOGGLE[l]} annotations={<AnnotationLayer locale={l} />}>
            <AiAnswer locale={l} />
          </ProofLoupe>
        </Spec>
        <Spec name="PromptTable" use="Home Bab III · AI page" span="lg:col-span-6"><PromptTable locale={l} /></Spec>
        <Spec name="SovBars" use="Home Bab III · AI page" span="lg:col-span-4"><SovBars locale={l} /></Spec>
        <Spec name="CrawlerLog" use="Home Bab III · AI page (pause control on desktop)" span="lg:col-span-4"><CrawlerLog locale={l} /></Spec>
        <Spec name="QueryFanout" use="Home Bab III · AI page" span="lg:col-span-4"><QueryFanout locale={l} /></Spec>
        <Spec name="JsonLdFragment" use="AI page · SEO steps" span="lg:col-span-5"><JsonLdFragment locale={l} /></Spec>
        <Spec name="AiAnswer · phone" use="Phone 'ai'" span="lg:col-span-4"><AiAnswer locale={l} size="phone" /></Spec>
      </Band>

      <Band l={l} id="malam" hour="2130" ground="malam" title={id ? 'Dihubungi: iklan ke WhatsApp' : 'Contacted: ads to WhatsApp'}>
        <Spec name="AdToChat · 2 bubbles" use="Home Bab IV" span="lg:col-span-7"><AdToChat locale={l} bubbles={2} /></Spec>
        <Spec name="Funnel" use="Paid Ads hero card (2030 Malam)" span="lg:col-span-5"><Funnel locale={l} /></Spec>
        <Spec name="AdToChat · 3 bubbles" use="Paid Ads steps" span="lg:col-span-7"><AdToChat locale={l} /></Spec>
      </Band>

      <Band l={l} id="kampanye" hour="0630" ground="kertas" title={id ? 'Peta kampanye 360°' : '360° campaign map'}>
        <Spec name="CampaignMap · table=details" use="Home 05 (cols 7–12)" span="lg:col-span-6 lg:col-start-7"><CampaignMap locale={l} table="details" id="cm-home" /></Spec>
        <Spec name="CampaignMap · focus=seo" use="SEO page 'Posisi dalam kampanye 360°'" span="lg:col-span-4"><CampaignMap locale={l} focus="seo" id="cm-seo" /></Spec>
        <Spec name="CampaignMap · focus=ads" use="Paid Ads page" span="lg:col-span-4"><CampaignMap locale={l} focus="ads" id="cm-ads" /></Spec>
        <Spec name="CampaignMap · focus=ai" use="AI page" span="lg:col-span-4"><CampaignMap locale={l} focus="ai" id="cm-ai" /></Spec>
      </Band>
      <Section hour="0600" ground="putih" id="hub-map" labelledBy="hub-map-h">
        <div className="wrap grid gap-6">
          <Dateline locale={l} hour="0600" right="Hub #kampanye-360 · putih" />
          <h2 id="hub-map-h" className="t-h2">CampaignMap · table=open · example</h2>
          <CampaignMap locale={l} table="open" example id="cm-hub" />
        </div>
      </Section>

      <Band l={l} id="overture" hour="0700" ground="kertas" title={id ? 'Overture: layar ponsel' : 'Overture: phone screens'}>
        <Spec name="Phone · panels (k=0 shown without data-step)" use="Home Overture stage" span="lg:col-span-3 sm:col-span-6">
          <div className="w-[260px] max-w-full"><Phone locale={l} panels /></div>
        </Spec>
        {(['search', 'maps', 'instagram', 'ai', 'whatsapp'] as const).map((s) => (
          <Spec key={s} name={`Phone · ${s}`} use="Overture inline step (phones)" span="lg:col-span-3 sm:col-span-6">
            <div className="w-[240px] max-w-full"><Phone locale={l} screen={s} /></div>
          </Spec>
        ))}
      </Band>
    </PageShell>
  )
}
