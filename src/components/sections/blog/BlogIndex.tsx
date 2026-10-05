import { getBlogList } from '@/payload/queries'
import { breadcrumbNode, orgNode, staticMeta, webPageNode } from '@/lib/meta'
import { CATEGORIES, CATEGORY_MIN_POSTS, page, type Locale } from '@/lib/services'
import { PageShell } from '@/components/ds/chrome/PageShell'
import { Section } from '@/components/ds/Section'
import { Wrap } from '@/components/ds/Wrap'
import { Breadcrumbs } from '@/components/ds/Breadcrumbs'
import { Dateline } from '@/components/ds/Dateline'
import { H1Svc } from '@/components/ds/H1Svc'
import { Chip } from '@/components/ds/Chip'
import { JsonLd } from '@/components/ds/JsonLd'
import { T } from '@/components/ds/strings'
import { BLOG, countLabel } from '@/content/blog'
import { PostRow } from './PostRow'
import { ServiceRail } from './ServiceRail'
import { postListNode } from './schema'
import { catCounts, catHref, catName, dominantSvc, iso, postFacts, postHref, postTitle } from './data'

export const blogMeta = (l: Locale) => staticMeta('blog', l)

/** Blog hub (BUILD §3.9): 0600 Kertas, latest real date in the dateline, featured post, list, service rail. */
export async function BlogIndex({ locale: l }: { locale: Locale }) {
  const p = page('blog')
  const { posts } = await getBlogList(l) // a DB error throws: ISR keeps the last good page instead of caching an empty hub
  const facts = await postFacts(posts.map((x) => x.id), l)
  const counts = catCounts(posts)
  // Chips only for categories indexable in this locale, in registry order.
  const cats = Object.keys(CATEGORIES)
    .filter((slug) => (counts[slug] ?? 0) >= CATEGORY_MIN_POSTS)
    .map((slug) => posts.find((x) => x.category?.slug === slug)!.category!)
  const [featured, ...rest] = posts
  const latest = iso(featured?.publishedAt ?? null)
  const crumbs = [{ name: T.home[l], href: page('home').path[l] }, { name: T.blog[l], href: p.path[l] }]
  const graph = [
    orgNode(l),
    webPageNode({ url: p.path[l], name: p.h1[l], type: 'CollectionPage', locale: l, dateModified: latest || undefined }),
    postListNode(p.path[l], posts.map((x) => ({ url: postHref(x, l), name: postTitle(x, l) }))),
    breadcrumbNode(p.path[l], crumbs),
  ]

  return (
    <PageShell locale={l} alt={p.path} wa={p.wa[l]} sky="light">
      <JsonLd graph={graph} />
      <Section hour="0600" labelledBy="blog-h1" pad="sm">
        <Wrap>
          <Breadcrumbs locale={l} items={crumbs} />
          <Dateline locale={l} date={latest || undefined} hour={latest ? undefined : '0600'} word={T.blog[l]} right={countLabel(posts.length, l)} className="mt-6" />
          <div className="mt-8 max-w-[52rem]">
            <H1Svc text={p.h1[l]} id="blog-h1" />
            <p className="t-lead mt-6">{BLOG.lede[l]}</p>
          </div>
          {cats.length ? (
            <nav aria-label={BLOG.catNav[l]} className="mt-8">
              <ul className="flex flex-wrap gap-2">
                <li><Chip variant="choice" current>{BLOG.allCats[l]}</Chip></li>
                {cats.map((c) => <li key={c.slug}><Chip variant="choice" href={catHref(c.slug, l)}>{catName(c, l)}</Chip></li>)}
              </ul>
            </nav>
          ) : null}
        </Wrap>
      </Section>
      <Section hour="0600" pad="sm" className="pt-0">
        <Wrap grid className="gap-y-10">
          <div className="col-span-12 min-w-0 lg:col-span-8">
            {featured ? (
              <>
                <h2 className="t-dateline text-ink-2">{BLOG.latest[l]}</h2>
                <PostRow locale={l} post={featured} minutes={facts[featured.id]?.minutes} big />
                {rest.length ? (
                  <>
                    <h2 className="t-dateline mt-12 text-ink-2">{BLOG.more[l]}</h2>
                    {rest.map((x) => <PostRow key={x.id} locale={l} post={x} minutes={facts[x.id]?.minutes} />)}
                  </>
                ) : null}
              </>
            ) : (
              <p className="t-body">{BLOG.empty[l]}</p>
            )}
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <ServiceRail locale={l} k={dominantSvc(posts)} wa={p.wa[l]} />
          </div>
        </Wrap>
      </Section>
    </PageShell>
  )
}
