// Logink · "Sehari Semalam" → src/styles/tailwind.tokens.ts
// Tailwind 3.4 theme mapped onto tokens.css custom properties, plus the JS
// mirrors (motion, hours) that client leaves and <Section>/<Dateline> read.
// Pure data, no runtime deps: tailwind.v2.config.ts and app code both import it.
//
// Design rule enforced by the theme itself: text colours exist ONLY as
// ground-resolved roles, so `text-coral` / `text-jingga` cannot be written.
// Default palette, radii and shadows are REPLACED (not extended), so
// `rounded-lg`, `shadow-md`, `text-gray-500`, `bg-white` do not exist.
import type { Config } from 'tailwindcss'

const v = (name: string) => `var(--${name})`

export const theme = {
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    fine: { raw: '(hover: hover) and (pointer: fine)' }, // cursor, magnetic, hover-reveal
    desk: { raw: '(hover: hover) and (pointer: fine) and (min-width: 1024px)' }, // T2: canvas, parallax, stack scale
  },
  colors: { transparent: 'transparent', current: 'currentColor', inherit: 'inherit' },
  fontFamily: {
    text: v('ff-text'),
    title: v('ff-title'),
    mid: v('ff-mid'),
    h3: v('ff-h3'),
    exp: v('ff-exp'),
    wide: v('ff-wide'),
    mono: v('ff-mono'), // also styles <code>/<pre> via preflight
    // no `sans` key on purpose: --font-sans must never exist (Logo.tsx)
  },
  fontSize: {
    caption: [v('fs-caption'), { lineHeight: '1.45' }],
    dateline: [v('fs-dateline'), { lineHeight: '1.3', letterSpacing: '.12em' }],
    mono: [v('fs-mono'), { lineHeight: '1.5' }],
    small: [v('fs-small'), { lineHeight: '1.45' }],
    ui: [v('fs-ui'), { lineHeight: '1' }],
    body: [v('fs-body'), { lineHeight: '1.6' }],
    lead: [v('fs-lead'), { lineHeight: '1.45' }],
    h3: [v('fs-h3'), { lineHeight: '1.2' }],
    kicker: [v('fs-kicker'), { lineHeight: '1.2', letterSpacing: '.06em' }],
    h2: [v('fs-h2'), { lineHeight: '1' }],
    'h1-svc': [v('fs-h1-svc'), { lineHeight: '.95' }],
    stat: [v('fs-stat'), { lineHeight: '.9' }],
    wide: [v('fs-wide'), { lineHeight: '1.02' }],
    title: [v('fs-title'), { lineHeight: '.86' }],
    clock: [v('fs-clock'), { lineHeight: '.8' }],
  },
  borderRadius: { none: '0', DEFAULT: v('r-ui'), ui: v('r-ui'), full: v('r-chip') },
  boxShadow: { none: 'none', 'wa-edge': v('wa-edge') }, // depth comes from surface change, never shadows
  zIndex: {
    under: v('z-under'), 0: '0', lamp: v('z-lamp'), content: v('z-content'), loupe: v('z-loupe'), sticky: v('z-sticky'),
    bar: v('z-bar'), header: v('z-header'), 'wa-pill': v('z-wa-pill'), dial: v('z-dial'), cursor: v('z-cursor'),
    toast: v('z-toast'), skip: v('z-skip'),
  },
  transitionTimingFunction: {
    linear: 'linear', out: v('ease-out'), ui: v('ease-ui'), drawer: v('ease-drawer'), 'in-out': v('ease-in-out'), in: v('ease-in'),
  },
  extend: {
    textColor: {
      ink: v('ink'), 'ink-2': v('ink-2'), 'key-ink': v('key-ink'), 'key-num': v('key-num'), link: v('link'), error: v('error'),
      'btn-ink': v('btn-ink'), 'on-key': v('key-on'), 'wa-label': v('c-wa-label'),
    },
    backgroundColor: {
      surface: v('surface'), 'surface-alt': v('surface-alt'), btn: v('btn'), wa: v('c-wa'), key: v('key'),
      hair: v('hair'), line: v('line'),
    },
    borderColor: { DEFAULT: v('hair'), hair: v('hair'), line: v('line'), key: v('key'), focus: v('focus'), 'wa-label': v('c-wa-label') },
    outlineColor: { focus: v('focus') },
    ringColor: { DEFAULT: v('focus'), focus: v('focus') },
    ringOffsetColor: { surface: v('surface') },
    placeholderColor: { DEFAULT: v('ink-2') },
    fill: { key: v('key'), ink: v('ink'), 'ink-2': v('ink-2'), line: v('line'), wa: v('c-wa'), 'wa-label': v('c-wa-label') },
    stroke: { key: v('key'), ink: v('ink'), 'ink-2': v('ink-2'), line: v('line'), hair: v('hair') },
    fontWeight: { 620: '620', 650: '650', 760: '760', 780: '780', 850: '850' },
    letterSpacing: { title: '-.005em', display: '-.01em', kicker: '.06em', dateline: '.12em' },
    lineHeight: { title: '.86', clock: '.8', svc: '.95', wide: '1.02', lead: '1.45', body: '1.6' },
    spacing: {
      gutter: v('gutter'), 'col-gap': v('col-gap'), section: v('section-y'), 'section-sm': v('section-y-sm'),
      nav: v('nav-h'), bar: v('bar-h'), tap: v('tap'), dial: v('dial-h'), horizon: v('horizon-h'), stage: v('stage-h'),
    },
    minHeight: { hero: v('hero-min'), stage: v('stage-h'), tap: v('tap') },
    height: { stage: v('stage-h'), horizon: v('horizon-h'), runway: 'calc(4 * var(--stage-h))' },
    maxWidth: { grid: v('grid-max'), measure: v('measure'), lead: v('measure-lead'), svc: '18ch' },
    transitionDuration: {
      press: v('dur-press'), hover: v('dur-hover'), ui: v('dur-ui'), 'page-out': v('dur-page-out'), reveal: v('dur-reveal'),
      rise: v('dur-rise'), image: v('dur-image'),
    },
    aspectRatio: { film: '21 / 9', poster: '4 / 3', still: '4 / 5', canvas: '16 / 9', og: '1200 / 630', phone: '9 / 19.5', thumb: '4 / 3' },
  },
} satisfies Config['theme']

// ─── JS mirrors (seconds for framer-motion; CSS carries ms) ───────────────
export const EASE = {
  out: [0.16, 1, 0.3, 1],
  ui: [0.25, 1, 0.5, 1],
  drawer: [0.32, 0.72, 0, 1],
  inOut: [0.83, 0, 0.17, 1],
  in: [0.5, 0, 0.75, 0],
} as const
export const DUR = { press: 0.09, hover: 0.15, ui: 0.24, pageOut: 0.15, reveal: 0.7, rise: 0.8, image: 0.9 } as const
export const STAGGER = { word: 0.045, line: 0.09, maxTotal: 0.6, maxItems: 6 } as const
export const SPRING = {
  cursorDot: { stiffness: 900, damping: 55, mass: 0.25 },
  cursorDisc: { stiffness: 320, damping: 32, mass: 0.6 },
  trail: { stiffness: 170, damping: 22, mass: 0.6 }, // hover-reveal still, lamp
  magnetic: { stiffness: 220, damping: 16, mass: 0.4 }, // max 14px, strength .35
} as const
export const MAGNETIC = { max: 14, strength: 0.35 } as const
export const LENIS = { lerp: 0.1, autoRaf: false, anchors: true, stopInertiaOnNavigate: true } as const
export const MEDIA = {
  rich: '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  canvas: '(pointer: fine) and (min-width: 1024px)',
} as const

// ─── Hours: TS mirror of the data-hour prefix rules in tokens.css ─────────
export type Stage = 'ditemukan' | 'dipercaya' | 'dikutip' | 'dihubungi'
export type Ground = 'putih' | 'kertas' | 'senja' | 'senja-dalam' | 'malam' | 'malam-dalam'
export type Locale = 'id' | 'en'

const STAGE_LABEL: Record<Stage, Record<Locale, string>> = {
  ditemukan: { id: 'Ditemukan', en: 'Found' },
  dipercaya: { id: 'Dipercaya', en: 'Trusted' },
  dikutip: { id: 'Dikutip AI', en: 'Cited by AI' },
  dihubungi: { id: 'Dihubungi', en: 'Contacted' },
}

/** hhmm like "0700". Stage + default ground follow the CSS prefix lists exactly. */
export function hourInfo(hhmm: string) {
  if (!/^([01]\d|2[0-3])[0-5]\d$/.test(hhmm)) throw new Error(`bad data-hour "${hhmm}"`)
  const h = Number(hhmm.slice(0, 2))
  const stage: Stage = h >= 4 && h <= 9 ? 'ditemukan' : h >= 10 && h <= 16 ? 'dipercaya' : h >= 17 && h <= 19 ? 'dikutip' : 'dihubungi'
  const ground: Ground = { ditemukan: 'kertas', dipercaya: 'putih', dikutip: 'senja', dihubungi: 'malam' }[stage] as Ground
  const part: Record<Locale, string> =
    h === 4 ? { id: 'Subuh', en: 'Dawn' }
    : h === 5 ? { id: 'Fajar', en: 'First light' }
    : h <= 10 && h > 5 ? { id: 'Pagi', en: 'Morning' }
    : h >= 11 && h <= 14 ? { id: 'Siang', en: 'Midday' }
    : h >= 15 && h <= 16 ? { id: 'Sore', en: 'Afternoon' }
    : h >= 17 && h <= 19 ? { id: 'Senja', en: 'Dusk' }
    : { id: 'Malam', en: 'Night' }
  return {
    stage,
    ground,
    sky: skyOf(ground),
    part,
    stageLabel: STAGE_LABEL[stage],
    /** "07.00" (ID and the dateline style in EN too) */
    clock: `${hhmm.slice(0, 2)}.${hhmm.slice(2)}`,
  }
}
export const skyOf = (g: Ground) => (g === 'putih' || g === 'kertas' ? 'light' : 'dark') as 'light' | 'dark'
export const STAGE_ORDER: Stage[] = ['ditemukan', 'dipercaya', 'dikutip', 'dihubungi']
export const stageLabel = (s: Stage, l: Locale) => STAGE_LABEL[s][l]
