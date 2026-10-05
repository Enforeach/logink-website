// Page-code 308 targets for CMS slugs on the wrong locale route (BUILD §1.10), derived from the CMS
// slug/slugEn at request time, never hard-coded. Callers run permanentRedirect(target) before rendering;
// there is no loading.tsx/Suspense above them, so the response stays a real 308.
import { getSitemapEntries } from '@/payload/queries'

export async function slugRedirect(kind: 'post' | 'case', slug: string, locale: 'id' | 'en'): Promise<string | null> {
  const { posts, caseStudies } = await getSitemapEntries()
  const docs = kind === 'post' ? posts : caseStudies
  const base = kind === 'post' ? 'blog' : 'portfolio'
  if (locale === 'id') {
    // an EN slug on the ID route -> the ID slug
    const d = docs.find((x) => x.slugEn === slug && x.slug !== slug)
    return d ? `/${base}/${d.slug}` : null
  }
  if (docs.some((x) => x.slugEn === slug)) return null // already the EN slug
  const d = docs.find((x) => x.slug === slug)
  if (!d) return null
  if (d.slugEn) return d.slugEn !== slug ? `/en/${base}/${d.slugEn}` : null
  // no EN version: posts go to the ID article; cases keep rendering under the ID slug on /en
  return kind === 'post' ? `/blog/${d.slug}` : null
}
