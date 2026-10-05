import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import og from '@/content/og.json'
import { getBlogList, getCategoryBySlug } from '@/payload/queries'
import { breadcrumbNode, orgNode, pageMeta, webPageNode } from '@/lib/meta'
import { CATEGORIES, CATEGORY_MIN_POSTS, WA_PATTERNS, page, svc, svcHref, type Locale } from '@/lib/services'
import { PageShell } from '@/components/ds/chrome/PageShell'
import { Section } from '@/components/ds/Section'
import { Wrap } from '@/components/ds/Wrap'
import { Breadcrumbs } from '@/components/ds/Breadcrumbs'
import { Dateline } from '@/components/ds/Dateline'
import { H1Svc } from '@/components/ds/H1Svc'
import { TextLink } from '@/components/ds/TextLink'
import { JsonLd } from '@/components/ds/JsonLd'
import { T } from '@/components/ds/strings'
import { BLOG, catDescFallback, catH1, catTitle, countLabel } from '@/content/blog'
import { NF } from '@/content/notfound'
import { PostRow } from './PostRow'
import { ServiceRail } from './ServiceRail'
import { postListNode } from './schema'
import { BLOG_PATH, catHref, catName, catSvc, indexable, iso, postFacts, postHref, postTitle } from './data'

const lede = (slug: string, name: string, l: Locale) => CATEGORIES[slug]?.lede[l] ?? catDescFallback(name, l)

export async function categoryMeta(slug: string, l: Locale): Promise<Metadata> {
  const cat = await getCategoryBySlug(slug)
  if (!cat) return { title: { absolute: NF.title[l] }, robots: { index: false, follow: true } }
  const name = catName(cat, l)
  const [idOk, enOk] = await Promise.all([indexable(slug, 'id'), indexable(slug, 'en')])
  const own = l === 'id' ? idOk : enOk
  const both = idOk && enOk // hreflang only when both locales are indexable
  const ogK = `${l}-blog-category-${slug}`
  return pageMeta({
    locale: l, title: catTitle(name, l), desc: lede(slug, name, l),
    path: { id: both || l === 'id' ? catHref(slug, 'id') : null, en: both || l === 'en' ? catHref(slug, 'en') : null },
    og: (og as string[]).includes(ogK) ? ogK : `${l}-blog`,
    robots: own ? undefined : 'noindex,follow',
  })
}

/** Category (BUILD §3.9): unknown slug → 404; fewer than CATEGORY_MIN_POSTS posts → noindex,follow (meta). */
export async function CategoryPage({ slug, locale: l }: { slug: string; locale: Locale }) {
  const cat = await getCategoryBySlug(slug) // a DB error throws (ISR keeps the last good page), never a cached 404
  if (!cat) notFound()
  const { posts } = await getBlogList(l, slug)
  const facts = await postFacts(posts.map((x) => x.id), l)
  const name = catName(cat, l)
  const k = catSvc(slug) ?? 'seo'
  const h1 = catH1(name, l)
  const url = catHref(slug, l)
  const latest = iso(posts[0]?.publishedAt ?? null)
  const crumbs = [
    { name: T.home[l], href: page('home').path[l] },
    { name: T.blog[l], href: BLOG_PATH[l] },
    { name: h1, href: url },
  ]
  const graph = [
    orgNode(l),
    webPageNode({ url, name: h1, type: 'CollectionPage', locale: l, dateModified: latest || undefined }),
    ...(posts.length ? [postListNode(url, posts.map((x) => ({ url: postHref(x, l), name: postTitle(x, l) })))] : []),
    breadcrumbNode(url, crumbs),
  ]

  return (
    <PageShell locale={l} alt={{ id: catHref(slug, 'id'), en: catHref(slug, 'en') }} wa={WA_PATTERNS.category(name)[l]} sky="light">
      <JsonLd graph={graph} />
      <Section hour="0600" labelledBy="cat-h1" pad="sm">
        <Wrap>
          <Breadcrumbs locale={l} items={crumbs} />
          <Dateline locale={l} date={latest || undefined} hour={latest ? undefined : '0600'} word={name} right={countLabel(posts.length, l)} className="mt-6" />
          <div className="mt-8 max-w-[52rem]">
            <H1Svc text={h1} id="cat-h1" />
            <p className="t-lead mt-6">{lede(slug, name, l)}</p>
            <p className="t-body mt-4">{BLOG.catService[l]} <TextLink href={svcHref(k, l)}>{svc(k).name[l]}</TextLink></p>
          </div>
        </Wrap>
      </Section>
      <Section hour="0600" pad="sm" className="pt-0">
        <Wrap grid className="gap-y-10">
          <div className="col-span-12 min-w-0 lg:col-span-8">
            {posts.length >= CATEGORY_MIN_POSTS ? (
              posts.map((x) => <PostRow key={x.id} locale={l} post={x} minutes={facts[x.id]?.minutes} showCat={false} as="h2" />)
            ) : (
              <p className="t-body border-t border-hair pt-6">{BLOG.empty[l]}</p>
            )}
            <p className="t-small mt-8"><TextLink href={BLOG_PATH[l]} arrow>{BLOG.backToBlog[l]}</TextLink></p>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <ServiceRail locale={l} k={k} wa={WA_PATTERNS.category(name)[l]} />
          </div>
        </Wrap>
      </Section>
    </PageShell>
  )
}
