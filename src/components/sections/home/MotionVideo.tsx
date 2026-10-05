'use client'
// Owner's brand motion graphics: the 15 s 'Logink 360°' film (media('motion360'), section 03 lead visual) and the
// 15 s 'Digital Activation' film (media('hero'), home hero card). T1-tier leaf (≈1 KB, no motion library): SSR ships
// the frame + poster only. Near the viewport it attaches the source (small file on phones), autoplays muted at ≥25%
// visible on every device, pauses offscreen and on hidden tabs. Reduced motion, Save-Data, Mode teks or a tall
// renderer: no src at all, poster only. Visible 44px pause/play (WCAG 2.2.2).
import { useEffect, useRef, useState } from 'react'
import { TALL_VIEWPORT, onGateChange, teks } from '@/motion/gates'

type Nav = Navigator & { connection?: { saveData?: boolean } }
type Labels = { pause: string; play: string }
// never in a tall, never-scrolling renderer (Google WRS: 12,140 px): G10 allows no .webm there
const allowed = () =>
  matchMedia('(prefers-reduced-motion: no-preference)').matches && !(navigator as Nav).connection?.saveData && !teks() &&
  innerHeight <= TALL_VIEWPORT

/** `pick` runs once, when the video first nears the viewport, and returns the source for this screen. */
function useAutoVideo(pick: () => string, key: string) {
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false) // a source is attached: show the control
  const [playing, setPlaying] = useState(false) // first frame is on screen: fade the video over its poster
  const [paused, setPaused] = useState(false) // the viewer's choice; never auto-resumed
  const userPaused = useRef(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    let visible = false
    const play = () => { if (v.src && visible && !userPaused.current && !document.hidden) v.play().catch(() => {}) }
    const near = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting || v.src || !allowed()) return
      v.src = pick()
      setReady(true)
      play()
    }, { rootMargin: '600px 0px' })
    const seen = new IntersectionObserver((es) => {
      visible = es[0].intersectionRatio >= 0.25
      if (visible) play()
      else v.pause()
    }, { threshold: [0, 0.25] })
    const vis = () => (document.hidden ? v.pause() : play())
    const on = () => setPlaying(true)
    const off = onGateChange(() => {
      if (allowed() || !v.src) return
      v.pause()
      v.removeAttribute('src') // back to the poster
      v.load()
      setReady(false)
      setPlaying(false)
    })
    near.observe(v)
    seen.observe(v)
    v.addEventListener('playing', on)
    document.addEventListener('visibilitychange', vis)
    return () => { near.disconnect(); seen.disconnect(); off(); v.removeEventListener('playing', on); document.removeEventListener('visibilitychange', vis) }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `key` names the sources `pick` reads
  }, [key])

  const toggle = () => {
    const v = ref.current
    if (!v) return
    userPaused.current = !userPaused.current
    setPaused(userPaused.current)
    if (userPaused.current) v.pause()
    else v.play().catch(() => {})
  }
  return { ref, ready, playing, paused, toggle }
}

export function MotionVideo({ src, poster, alt, labels }: {
  src: { sm: string; lg: string }; poster: string; alt: string; labels: Labels
}) {
  const { ref, ready, paused, toggle } = useAutoVideo(() => (innerWidth < 640 ? src.sm : src.lg), src.sm + src.lg)
  return (
    <figure>
      {/* the control overlays the reserved 16:9 box, so attaching the source shifts nothing */}
      <div className="relative aspect-video overflow-clip rounded-[var(--r-card,16px)] bg-surface-alt">
        <video ref={ref} poster={poster} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1}
          disablePictureInPicture disableRemotePlayback className="absolute inset-0 h-full w-full object-cover" />
        {ready ? (
          <button type="button" onClick={toggle} aria-pressed={paused}
            className="btn btn-ink btn-sm absolute bottom-3 right-3 min-h-[44px]">{paused ? labels.play : labels.pause}</button>
        ) : null}
      </div>
      <figcaption className="sr-only">{alt}</figcaption>
    </figure>
  )
}

const SMALL = '(max-width: 639px)' // poster <source> and video pick agree on the file size

/**
 * Hero card video: decorative (aria-hidden; Mode teks hides the card), absolutely filling the positioned card,
 * shown at about its native size so it stays sharp (960 file on phones, 1600 above). The poster <img> (the film's
 * Logink end card, also what reduced motion sees) is the LCP candidate (fetchpriority high); the video fades over
 * it. Owner 2026-10-04: no visible pause pill; the whole card is the pause/play control (WCAG 2.2.2), labelled for
 * screen readers, outlined on keyboard focus.
 */
export function HeroVideo({ src, poster, labels }: {
  src: { sm: string; lg: string }; poster: { sm: string; lg: string }; labels: Labels
}) {
  const { ref, ready, playing, paused, toggle } = useAutoVideo(() => (matchMedia(SMALL).matches ? src.sm : src.lg), src.sm + src.lg)
  return (
    <>
      <div className="hero-film" aria-hidden="true">
        <picture>
          <source media={SMALL} srcSet={poster.sm} />
          {/* Plain <img>: pre-encoded poster that must match the video's first frame */}
          <img src={poster.lg} alt="" fetchPriority="high" decoding="async" />
        </picture>
        <video ref={ref} muted loop playsInline preload="none" tabIndex={-1} disablePictureInPicture disableRemotePlayback
          data-playing={playing ? '' : undefined} />
      </div>
      {ready ? (
        <button type="button" onClick={toggle} aria-pressed={paused} aria-label={paused ? labels.play : labels.pause}
          className="absolute inset-0 z-10 cursor-pointer rounded-[inherit] focus-visible:outline-offset-[-4px]" />
      ) : null}
    </>
  )
}
