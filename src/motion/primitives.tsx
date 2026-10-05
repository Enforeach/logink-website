// Server Components only (no 'use client', no hooks, no motion import). They emit the markup that the
// design-system CSS, motion.css (T0), SiteObserver (T1) and the rich layer (T2) bind to. Every word is in
// the server HTML at its final state; nothing here is hidden at rest.
import { Fragment, type CSSProperties, type ReactNode } from 'react'

const v = (vars: Record<string, string | number>) => vars as CSSProperties

/**
 * Home H1 'front page': one nowrap .ln per display line, transform-only rise from first paint
 * (T0 CSS, 800 ms expo-out, 90 ms per line, opacity held at 1, no masks) so LCP = FCP.
 * textContent === kicker + ' ' + lines.join(' ') === the approved H1 string (CI asserts it).
 */
export function FrontPageTitle({ kicker, lines }: { kicker: string; lines: { text: string; wide?: boolean }[] }) {
  return (
    <h1 className="t-title lk-rise">
      <span className="t-kicker" style={{ display: 'block' }}>
        {kicker}
      </span>{' '}
      {lines.map((l, i) => (
        <Fragment key={l.text}>
          <span className={l.wide ? 'ln t-wide' : 'ln'} style={v({ '--i': i })}>
            {l.text}
          </span>
          {i < lines.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </h1>
  )
}

/**
 * Split-line H2 (T1): words in per-word masks, lines rise 90 ms apart when SiteObserver marks the
 * heading data-in. Masks only on H2s, never on the H1/LCP. The heading keeps its name via aria-label;
 * the word spans are aria-hidden so screen readers do not read word by word.
 */
/** `accent` = how many trailing words carry the brand gradient (Warm Canvas: one gradient word per headline). */
export function SplitHeading({ as: Tag = 'h2', text, id, className = 't-h2', accent = 0 }: { as?: 'h2' | 'h3'; text: string; id?: string; className?: string; accent?: number }) {
  const words = text.split(/\s+/)
  return (
    <Tag id={id} className={className} data-reveal="split" aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="lk-w" aria-hidden="true">
            <span className={i >= words.length - accent ? 'grad-text' : undefined}>{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}

/** Server-split words for the AI answer instrument (45 ms per word, capped at 600 ms). Wrap the
 *  instrument in data-reveal="inst"; this <p> carries its own data-reveal="words". */
export function RevealWords({ text }: { text: string }) {
  const words = text.split(/\s+/)
  return (
    <p data-reveal="words">
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="lk-w" style={v({ '--i': i })}>
            <span>{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </p>
  )
}

/** Day dial progress strip (design system .day-dial--progress: hard ribbon segments + Malam tail,
 *  sun notch on scroll(root), static in Firefox / reduced motion). One per root layout. */
export function DayDial() {
  return <div className="day-dial day-dial--progress" aria-hidden="true" data-decor="" />
}

/**
 * House lights (design system .house-lights): the Malam closing band sticks (CSS sticky, 0 JS) while
 * the Kertas sheet with the Semburat spill slides over it. motion.css un-sticks it below 640 px of
 * viewport height and in Mode teks. The band must fit 100svh - 56px at 360x640 (states.cjs asserts).
 * PageShell may write the same markup itself (BUILD §2.3); the band's heading id is 'closing-h'.
 */
export function HouseLights({ band, children }: { band: ReactNode; children: ReactNode }) {
  return (
    <div className="house-lights">
      <section className="hl-night" data-hour="2130" data-sky="dark" aria-labelledby="closing-h">
        {band}
      </section>
      <div className="hl-sheet" data-ground="kertas" data-sky="light">
        {children}
      </div>
    </div>
  )
}

export type Img = { src: string; w: number; h: number }

/**
 * Hero film 'Buka' (21:9 desktop poster + film, 4:3 poster on phones). Render it only when media('buka')
 * has both posters; pass `film` only when media('buka').files.film exists (BUILD §4.4).
 * The poster <img> is the LCP candidate (fetchpriority high), pre-encoded WebP served as-is so the
 * poster -> video swap is pixel-identical. The <video> ships WITHOUT src: rich/index.ts films() attaches
 * data-src after window load, in view, desktop only, never under Save-Data / reduced motion / Mode teks;
 * it fades in on 'playing'. The pause button (WCAG 2.2.2) ships hidden and is revealed only by that
 * desktop film code, so phones never see a control for a film they never get.
 * The lamp (<i class="lk-lamp">) is a direct child of the [data-lamp] frame, which holds no text.
 */
export function FilmHero(p: {
  poster: { desktop: Img; mobile: Img } // poster-21x9 (1280x548) / poster-4x3 (800x600)
  film?: string // media('buka').files.film.src; omit to ship the poster only (no <video>, no button)
  alt: string
  caption: string // from media.json (never hand-written)
  labels: { pause: string; play: string } // 'Jeda film' / 'Lanjutkan film' · 'Pause film' / 'Play film'
}) {
  const { desktop: d, mobile: m } = p.poster
  return (
    <figure className="lk-film">
      <div className="lk-film__frame" data-lamp="" style={v({ '--ar': `${d.w} / ${d.h}` })}>
        <picture>
          <source media="(max-width: 1023px)" srcSet={m.src} width={m.w} height={m.h} />
          {/* Plain <img> inside <picture>: pre-encoded poster, must match the film frame. */}
          <img src={d.src} alt={p.alt} width={d.w} height={d.h} fetchPriority="high" decoding="async" />
        </picture>
        {p.film ? (
          <video data-film="" data-src={p.film} muted playsInline loop preload="none" aria-hidden="true" tabIndex={-1} disablePictureInPicture disableRemotePlayback />
        ) : null}
        <i className="lk-lamp" aria-hidden="true" />
      </div>
      <figcaption className="t-caption lk-film__cap">
        <span>{p.caption}</span>
        {p.film ? (
          <button type="button" className="lk-film__pause" aria-pressed="false" hidden data-l-pause={p.labels.pause} data-l-play={p.labels.play}>
            {p.labels.pause}
          </button>
        ) : null}
      </figcaption>
    </figure>
  )
}

/** Chapter-opener photo: clip-path horizon wipe on the decorative layer only (text is outside). */
export function HorizonWipe({ children }: { children: ReactNode }) {
  return (
    <div className="lk-wipe" data-reveal="wipe">
      {children}
    </div>
  )
}

export function CoralGlow() {
  return <i className="lk-glow" aria-hidden="true" />
}

/**
 * Menu opener/closer for the phone <dialog id="menu"> with no client JS: Invoker Commands open it natively
 * (Chrome 135+, Firefox 144+, Safari 26.2+); SiteObserver's click fallback covers older browsers after
 * hydration. @types/react 19.2 has no typings for these attributes, hence the spread.
 */
export function MenuButton({ target, close, className, children }: { target: string; close?: boolean; className?: string; children: ReactNode }) {
  const cmd: Record<string, string> = { commandfor: target, command: close ? 'close' : 'show-modal' }
  return (
    <button type="button" className={className} {...cmd}>
      {children}
    </button>
  )
}
