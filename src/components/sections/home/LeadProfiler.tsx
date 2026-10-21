// 04 'Mulai dari tujuan Anda' (§3.7, §11 4.4) · Putih. SSR shell: the first bot message + the 360° chip (full width
// on phones) + 'atau satu layanan:' + 7 chips, each a wa.me link with its prefill. ProfilerMount swaps in the island.
import { WA_PATTERNS, svc, waLink, type Locale } from '@/lib/services'
import { Section } from '@/components/ds/Section'
import { PROFILER } from '@/content/home'
import { profilerData } from './profiler-data'
import { ProfilerCard, chipCls } from './ProfilerCard'
import { ProfilerMount } from './ProfilerMount'

export function LeadProfiler({ locale: l }: { locale: Locale }) {
  const labels = { first: PROFILER.first[l], chip360: PROFILER.chip360[l], orOne: PROFILER.orOne[l], bot: PROFILER.bot[l] }
  const data = profilerData(l)
  const a = (text: string, service: string) => ({ href: waLink(text), target: '_blank', rel: 'noopener', 'data-cta': 'profiler', 'data-placement': 'profiler', 'data-service': service })
  return (
    <Section hour="0600" ground="putih" id="mulai" labelledBy="profiler-h">
      <div className="wrap grid-12 gap-y-6">
        <h2 id="profiler-h" className="t-h2 col-span-12 lg:col-span-4">{PROFILER.h2[l]}</h2>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <ProfilerMount locale={l} labels={labels} data={data}>
            <ProfilerCard bot={labels.bot} msgs={[{ id: 0, bot: true, text: labels.first }]}>
              <a className={chipCls(true)} {...a(WA_PATTERNS.campaign360[l], '360')}>{labels.chip360}</a>
              <p className="t-small text-ink-2">{labels.orOne}</p>
              <div className="flex flex-wrap gap-2">
                {data.chips.map((c) => <a key={c.k} className={chipCls()} {...a(svc(c.k).wa[l], c.k)}>{c.label}</a>)}
              </div>
            </ProfilerCard>
          </ProfilerMount>
        </div>
      </div>
    </Section>
  )
}
