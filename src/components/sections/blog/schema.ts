import { abs, ORG_ID } from '@/lib/meta'
import { SITE_URL, type Locale } from '@/lib/services'
import { slugify } from '@/lib/utils'

const LANG = { id: 'id-ID', en: 'en-US' } as const

/** Author Person node id: one per author name, shared by every post. */
export const personId = (name: string) => `${SITE_URL}/#person-${slugify(name)}`

/** BlogPosting (BUILD §3.9): headline = H1, real CMS dates, author Person, publisher = the org. */
export function blogPostingNode(o: {
  url: string; headline: string; description: string | null; published: string; modified: string
  author: string; image: string | null; locale: Locale; section?: string
}) {
  const url = abs(o.url)
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    url,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    headline: o.headline,
    ...(o.description && { description: o.description }),
    ...(o.published && { datePublished: o.published }),
    ...(o.modified && { dateModified: o.modified }),
    ...(o.author && { author: { '@type': 'Person', '@id': personId(o.author), name: o.author } }),
    publisher: { '@id': ORG_ID },
    ...(o.image && { image: abs(o.image) }),
    ...(o.section && { articleSection: o.section }),
    inLanguage: LANG[o.locale],
  }
}

/** ItemList of post URLs for the hub and category pages. */
export const postListNode = (pageUrl: string, items: { url: string; name: string }[]) => ({
  '@type': 'ItemList', '@id': `${abs(pageUrl)}#posts`,
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(it.url), name: it.name })),
})
