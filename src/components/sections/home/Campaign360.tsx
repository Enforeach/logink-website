// 05 'Satu kampanye, semua kanal' (§11 4.5) · Putih. Owner decision (Oct 2026): the Overture is cut and the
// owner's 360° motion video carries the story here. Dateline (no new prop) → H2 → lead (Stabilo on the definition;
// K1 fallback) → pillar cards (owner 2026-10-04: no 'Selengkapnya') → two pills (one service | 360° chat)
// → motion video (CampaignMap only as its no-media fallback: the map lives on the hub, owner 2026-10-04 dedupe).
import { WA_PATTERNS, type Locale } from '@/lib/services'
import { SplitHeading } from '@/motion/primitives'
import { Section } from '@/components/ds/Section'
import { Dateline } from '@/components/ds/Dateline'
import { Stabilo } from '@/components/ds/Stabilo'
import { WaButton } from '@/components/ds/WaButton'
import { Button } from '@/components/ds/Button'
import { T } from '@/components/ds/strings'
import { PILLARS } from '@/content/campaign'
import { C360 } from '@/content/home'
import { CampaignMap } from '@/components/instruments/CampaignMap'
import { media } from '@/lib/assets'
import { MotionVideo } from './MotionVideo'
import { Dot } from './Dot'

export function Campaign360({ locale: l, noMedia }: { locale: Locale; noMedia?: boolean }) {
  const mv = noMedia ? null : media('motion360')
  const f = mv?.files
  return (
    <Section hour="0630" ground="putih" id="kampanye-360" labelledBy="k360-h">
      <div className="wrap grid-12 gap-y-8 lg:items-center">
        <div className="col-span-12 grid content-start gap-5 lg:col-span-6">
          <Dateline locale={l} label={T.c360[l]} />
          <SplitHeading text={C360.h2[l]} id="k360-h" accent={2} />
          <p className="t-lead max-w-lead"><Stabilo>{C360.lead1[l]}</Stabilo> {C360.lead4[l]}</p>
          <ul className="grid gap-3 sm:grid-cols-2" aria-label={C360.pillarsLabel[l]}>
            {PILLARS.map((p, i) => (
              <li key={p.dt.id} className="card flex gap-2 p-4">
                <Dot />
                <span className="grid gap-1"><b className="t-ui font-650">{p.dt[l]}</b><span className="t-small">{C360.pillarLine[i].line[l]}</span></span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            {/* the two ways to buy, as two pills (ModeChoice is folded in here: owner 2026-10-04) */}
            <Button href="#layanan" variant="ghost">{C360.one[l]}</Button>
            <WaButton text={WA_PATTERNS.campaign360[l]} placement="campaign" service="360" label={T.c360Chat[l]} />
          </div>
        </div>
        <div className="col-span-12 grid content-start gap-6 lg:col-span-6">
          {/* owner's brand motion (lead visual); its baked-in CTA is not clickable, the real WhatsApp CTA sits beside it */}
          {mv && f?.film && f['film-480'] && f.poster ? (
            <MotionVideo src={{ sm: f['film-480'].src, lg: f.film.src }} poster={f.poster.src} alt={mv.alt[l]} labels={C360.video[l]} />
          ) : (
            <CampaignMap locale={l} table="details" id="home" />
          )}
        </div>
      </div>
    </Section>
  )
}
