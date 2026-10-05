// Article node for a case page (BUILD §3.9 case): headline = the visible H1, CMS dates, publisher ORG_ID.
// No `about` (the CMS client names are anonymised descriptors, not named clients), no Review or rating.
import { ORG_ID, abs } from '@/lib/meta'
import type { Locale } from '@/lib/services'

export function articleNode(o: { url: string; headline: string; description?: string; l: Locale; published: string | null; modified: string | null; image: string }) {
  const url = abs(o.url)
  return {
    '@type': 'Article', '@id': `${url}#article`, headline: o.headline, url,
    ...(o.description && { description: o.description }),
    inLanguage: o.l === 'id' ? 'id-ID' : 'en-US',
    ...(o.published && { datePublished: o.published }),
    ...(o.modified && { dateModified: o.modified }),
    author: { '@id': ORG_ID }, publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@id': `${url}#webpage` },
    image: abs(o.image),
  }
}
