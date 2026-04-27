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
  dataAttributes: any
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
