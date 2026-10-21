export type CtaWidgetRow = {
  id: string
  templateType: string
  heading: string | null
  subheading: string | null
  buttonText: string | null
  buttonUrl: string
  secondaryButtonText: string | null
  secondaryButtonUrl: string | null
  backgroundImage: string | null
  backgroundColor: string | null
  textColor: string | null
  cssClass: string | null
  gaEventCategory: string | null
  gaEventLabel: string | null
  dataAttributes: unknown
  placement: string
  paragraphIndex: number | null
  targetingType: string
  targetPostIds: string[]
  targetTagIds: string[]
  targetCategoryIds: string[]
  isActive: boolean
  startDate: Date | null
  endDate: Date | null
  showOnMobile: boolean
  showOnDesktop: boolean
  dismissible: boolean
  dismissDuration: number
  displayTrigger: string | null
  displayDelay: number | null
  scrollDepthThreshold: number | null
  countdownLabel: string | null
  imagePosition: string | null
  emoji: string | null
  sponsoredLabel: boolean
  impressionCount: number
  clickCount: number
}

export function filterCtasForPost(
  allCtas: CtaWidgetRow[],
  postId: string,
  postTagIds: string[],
  postCategoryId: string | null
): CtaWidgetRow[] {
  const now = new Date()
  return allCtas.filter(cta => {
    if (!cta.isActive) return false
    if (cta.startDate && cta.startDate > now) return false
    if (cta.endDate && cta.endDate < now) return false

    switch (cta.targetingType) {
      case 'ALL_POSTS': return true
      case 'SPECIFIC_POSTS': return cta.targetPostIds.includes(postId)
      case 'BY_TAG': return cta.targetTagIds.some(id => postTagIds.includes(id))
      case 'BY_CATEGORY': return postCategoryId ? cta.targetCategoryIds.includes(postCategoryId) : false
      case 'EXCLUDE_POSTS': return !cta.targetPostIds.includes(postId)
      default: return false
    }
  })
}

export function extractHeadings(html: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = []
  const regex = /<h([23])[^>]*>(.*?)<\/h[23]>/gi
  let match
  const idCounts: Record<string, number> = {}

  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1], 10)
    const rawText = match[2].replace(/<[^>]+>/g, '')
    const baseId = rawText.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    idCounts[baseId] = (idCounts[baseId] || 0) + 1
    const id = idCounts[baseId] > 1 ? `${baseId}-${idCounts[baseId]}` : baseId
    headings.push({ id, text: rawText, level })
  }
  return headings
}

export function injectHeadingIds(html: string): string {
  const idCounts: Record<string, number> = {}
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h[23]>/gi, (_, level, attrs, content) => {
    const rawText = content.replace(/<[^>]+>/g, '')
    const baseId = rawText.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    idCounts[baseId] = (idCounts[baseId] || 0) + 1
    const id = idCounts[baseId] > 1 ? `${baseId}-${idCounts[baseId]}` : baseId
    const hasId = /id=/.test(attrs)
    return `<h${level}${hasId ? attrs : ` id="${id}"${attrs}`}>${content}</h${level}>`
  })
}

/** CMS bodies never carry a second H1: <h1> becomes <h2> (BUILD §3.9 post). */
export const demoteH1 = (html: string) => html.replace(/<(\/?)h1(\s|>)/gi, '<$1h2$2')

function paragraphEnds(html: string): number[] {
  const cuts: number[] = []
  let depth = 0
  for (const m of html.matchAll(/<(\/?)(blockquote|ul|ol|table|div|figure|details|pre)\b[^>]*>|<\/p>/gi)) {
    if (m[2]) depth += m[1] ? -1 : 1
    else if (depth === 0) cuts.push(m.index! + m[0].length)
  }
  return cuts
}

/**
 * A body wrapped in ONE outer <div> (Payload's Lexical HTML: <div class="payload-richtext">, unstyled) is unwrapped, so
 * its paragraphs count as top level. Without this, rich-text posts had zero top-level paragraphs and every
 * BETWEEN_PARAGRAPHS / INLINE widget fell to the end of the article.
 */
export function unwrapBody(html: string): string {
  const open = /^\s*<div\b[^>]*>/i.exec(html)
  if (!open) return html
  let depth = 0
  for (const t of html.matchAll(/<(\/?)div\b[^>]*>/gi)) {
    depth += t[1] ? -1 : 1
    if (depth === 0) return t.index! + t[0].length >= html.trimEnd().length ? html.slice(open[0].length, t.index) : html
  }
  return html
}

/** Number of top-level paragraphs (the default INLINE position is the middle one). */
export const paragraphCount = (html: string) => paragraphEnds(unwrapBody(html)).length

/**
 * Splits a body after top-level paragraph N (1-based) for each insert, so a CTA never lands inside a list,
 * quote or table. Returns HTML strings interleaved with the inserted items, in order.
 * ponytail: regex depth tracking over block containers; a real HTML parser if bodies ever nest divs deeply.
 */
export function splitAfterParagraphs<T>(html: string, inserts: { after: number; item: T }[]): (string | T)[] {
  if (!inserts.length) return [html]
  html = unwrapBody(html)
  const cuts = paragraphEnds(html)
  const out: (string | T)[] = []
  let from = 0
  for (const ins of [...inserts].sort((a, b) => a.after - b.after)) {
    const at = cuts[Math.min(Math.max(ins.after, 1), cuts.length) - 1] ?? html.length
    if (at > from) out.push(html.slice(from, at))
    from = Math.max(from, at)
    out.push(ins.item)
  }
  if (from < html.length) out.push(html.slice(from))
  return out
}

/** Outbound sources cited in a body: external links, deduped by URL, own domain excluded. */
export function extractSources(html: string, ownHost = 'logink.co'): { url: string; label: string; host: string; where: string }[] {
  const seen = new Map<string, { url: string; label: string; host: string; where: string }>()
  for (const m of html.matchAll(/<a\s(?![^>]*data-cta=)[^>]*href="(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)) {
    const url = m[1].replace(/&amp;/g, '&')
    let host = '', where = ''
    try { const u = new URL(url); host = u.hostname.replace(/^www\./, ''); where = (host + u.pathname).replace(/\/$/, '') } catch { continue }
    if (host === ownHost || host.endsWith(`.${ownHost}`) || seen.has(url)) continue
    const label = m[2].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim()
    seen.set(url, { url, label: label && !/^https?:/.test(label) ? label : host, host, where })
  }
  return [...seen.values()]
}

/** True when the body already ends in its own sources section (then no second 'Sumber' list renders). */
export const hasSourcesHeading = (html: string) => /<h[2-4][^>]*>\s*(sumber|referensi|sources|references)\b/i.test(html)
