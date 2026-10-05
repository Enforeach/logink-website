// 01 Hero 'Buka' (§3.7) · Putih. H1 = registry via FrontPageTitle (gradient on 'Dikutip AI.'). Owner 2026-10-04:
// one screen, split: text left (the H1 kicker is the eyebrow pill, one sentence, 2 CTAs), the owner's 'Digital
// Activation' film (media('hero')) right in a rounded 16:9 card, whole frame and full 15 s, never cropped or cut.
// ENTITY stays verbatim in the footer and orgNode. No `hero` media: text only.
import { page, type Locale } from '@/lib/services'
import { mediaFile } from '@/lib/assets'
import { FrontPageTitle } from '@/motion/primitives'
import { Section } from '@/components/ds/Section'
import { WaButton } from '@/components/ds/WaButton'
import { Button } from '@/components/ds/Button'
import { quoteHref } from '@/components/ds/chrome/links'
import { T } from '@/components/ds/strings'
import { HERO } from '@/content/home'
import { HeroVideo } from './MotionVideo'

export function Hero({ locale: l, noMedia }: { locale: Locale; noMedia?: boolean }) {
  const p = page('home')
  const f = (k: string) => (noMedia ? null : mediaFile('hero', k))
  const [lg, sm, plg, psm] = [f('film'), f('film-sm'), f('poster'), f('poster-sm')]
  return (
    <Section hour="0530" ground="putih" pad="sm" labelledBy="home-h1" className="hero-split flex items-center lg:min-h-[var(--hero-min)]">
      <div className="wrap grid-12 w-full items-center gap-y-10">
        <div className="col-span-12 grid content-start gap-6 lg:col-span-5">
          <div id="home-h1">
            <FrontPageTitle kicker={HERO.kicker[l]} lines={HERO.lines.map((x) => ({ text: x.text[l], wide: x.wide }))} />
          </div>
          <p className="t-lead max-w-lead">{HERO.sentence[l]}</p>
          <div className="flex flex-wrap gap-3">
            <WaButton text={p.wa[l]} placement="hero" />
            <Button href={quoteHref(l)} cta="quote" placement="hero">{T.quote[l]}</Button>
          </div>
        </div>
        {lg && sm && plg && psm ? (
          <div className="hero-stage col-span-12 lg:col-span-7" data-decor="">
            <HeroVideo src={{ lg: lg.src, sm: sm.src }} poster={{ lg: plg.src, sm: psm.src }} labels={HERO.filmLabels[l]} />
          </div>
        ) : null}
      </div>
    </Section>
  )
}
