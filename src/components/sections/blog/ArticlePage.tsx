import '@/styles/prose.css'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import og from '@/content/og.json'
import { getActiveCtas, getPostBySlug, getRelatedPosts } from '@/payload/queries'
import {
  demoteH1, extractHeadings, extractSources, filterCtasForPost, hasSourcesHeading, injectHeadingIds,
  paragraphCount, splitAfterParagraphs, type CtaWidgetRow,
} from '@/lib/cta'
import { breadcrumbNode, orgNode, pageMeta, webPageNode } from '@/lib/meta'
import { WA_PATTERNS, page, svc, type Locale } from '@/lib/services'
import { PageShell } from '@/components/ds/chrome/PageShell'
import { Section } from '@/components/ds/Section'
import { Wrap } from '@/components/ds/Wrap'
import { Breadcrumbs } from '@/components/ds/Breadcrumbs'
import { Dateline } from '@/components/ds/Dateline'
import { H1Svc } from '@/components/ds/H1Svc'
import { Stabilo } from '@/components/ds/Stabilo'
import { CrossSell } from '@/components/ds/CrossSell'
import { JsonLd } from '@/components/ds/JsonLd'
import { T, fmtDate } from '@/components/ds/strings'
import { BLOG, minRead } from '@/content/blog'
import { NF } from '@/content/notfound'
import { CtaRenderer } from './cta/CtaRenderer'
import { PostRow } from './PostRow'
import { ArticleBody } from './ArticleBody'
import { blogPostingNode } from './schema'
import { BLOG_PATH, catHref, catName, catSvc, iso, minutesOf, postExcerpt, postFacts, postHref, postTitle, type FullPost } from './data'

const ogKey = (k: string, l: Locale) => ((og as string[]).includes(k) ? k : `${l}-blog`)
const brand = (t: string) => (/logink/i.test(t) ? t : `${t} | Logink`)
const decode = (s: string) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
const altOf = (p: FullPost) => ({ id: `/blog/${p.slug}`, en: p.slugEn ? `/en/blog/${p.slugEn}` : null })

export async function postMeta(slug: string, l: Locale): Promise<Metadata> {
  const p = await getPostBySlug(slug, l)
  if (!p) return { title: { absolute: NF.title[l] }, robots: { index: false, follow: true } }
  const title = (l === 'en' ? p.metaTitleEn : p.metaTitle) || postTitle(p, l)
  const desc = (l === 'en' ? p.metaDescriptionEn || p.excerptEn : p.metaDescription || p.excerptId) || ''
  const m = pageMeta({
    locale: l, title: brand(title), desc, path: altOf(p),
    og: ogKey(`${l}-blog-${l === 'en' ? p.slugEn ?? p.slug : p.slug}`, l), ogImage: p.ogImage ?? p.featuredImage ?? undefined,
  })
  return { ...m, openGraph: { ...m.openGraph, type: 'article', publishedTime: iso(p.publishedAt), modifiedTime: iso(p.updatedAt) } }
}

/** Post (BUILD §3.9): Kertas reading page in the F-pattern. Body left (8 cols), sticky TOC + CMS rail right. */
export async function ArticlePage({ slug, locale: l }: { slug: string; locale: Locale }) {
  const [post, ctas] = await Promise.all([getPostBySlug(slug, l), getActiveCtas().catch(() => [] as CtaWidgetRow[])])
  if (!post) notFound()

  const title = postTitle(post, l)
  const raw = demoteH1((l === 'en' ? post.bodyEn : post.bodyId) || '')
  const html = injectHeadingIds(raw)
  const toc = extractHeadings(raw).filter((h) => h.level === 2 && h.id).map((h) => ({ ...h, text: decode(h.text) }))
  const own = (await postFacts([post.id], l))[post.id]
  const categoryId = own?.categoryId ?? null
  const minutes = post.readingTime || own?.minutes || minutesOf(raw) // same source as the list rows
  const widgets = filterCtasForPost(ctas, post.id, post.tags.map((t) => t.tag.id), categoryId)
  const at = (p: string) => widgets.filter((w) => w.placement === p)
  const cta = (w: CtaWidgetRow) => <CtaRenderer key={w.id} widget={w} locale={l} />
  const related = await getRelatedPosts(post.id, categoryId, l).catch(() => [])
  const relFacts = await postFacts(related.map((r) => r.id), l)

  const k = catSvc(post.category?.slug) ?? 'seo'
  const wa = WA_PATTERNS.post(title, svc(k).name[l])[l]
  const url = postHref(post, l)
  const cat = post.category
  const catLabel = cat ? catName(cat, l) : null
  const crumbs = [
    { name: T.home[l], href: page('home').path[l] },
    { name: T.blog[l], href: BLOG_PATH[l] },
    ...(cat && catLabel ? [{ name: catLabel, href: catHref(cat.slug, l) }] : []),
    { name: title, href: url },
  ]
  const published = iso(post.publishedAt)
  const modified = iso(post.updatedAt)
  const excerpt = postExcerpt(post, l)
  // A CMS service account ("System") is not a person: no byline, no Person node (owner sets a real author).
  const author = /^(system|admin|administrator)$/i.test(post.author.name.trim()) ? { name: '', image: null } : post.author
  const sources = hasSourcesHeading(html) ? [] : extractSources(html)
  const half = Math.max(1, Math.ceil(paragraphCount(html) / 2))
  const parts = splitAfterParagraphs(html, [
    ...at('BETWEEN_PARAGRAPHS').map((w) => ({ after: w.paragraphIndex ?? 3, item: w })),
    ...at('INLINE').map((w) => ({ after: w.paragraphIndex ?? half, item: w })),
  ])
  const graph = [
    orgNode(l),
    webPageNode({ url, name: title, locale: l, dateModified: modified || undefined }),
    blogPostingNode({ url, headline: title, description: excerpt, published, modified, author: author.name, image: post.featuredImage, locale: l, section: catLabel ?? undefined }),
    breadcrumbNode(url, crumbs),
  ]

  return (
    <PageShell locale={l} alt={altOf(post)} wa={wa} sky="light">
      <JsonLd graph={graph} />
      <Section hour="0600" labelledBy="post-h1">
        <Wrap>
          <Breadcrumbs locale={l} items={crumbs} />
          <Dateline locale={l} date={published || undefined} word={catLabel ?? T.blog[l]} className="mt-6" />
          <header className="mt-8 max-w-[52rem]">
            <H1Svc text={title} variant="reading" id="post-h1" />
            <p className="t-small mt-5 flex flex-wrap gap-x-3 gap-y-1 text-ink-2">
              {author.name ? <span>{BLOG.by[l]} <span className="font-650 text-ink">{author.name}</span></span> : null}
              {author.name && modified ? <span aria-hidden="true">·</span> : null}
              {modified ? <span>{T.updated[l]} <time dateTime={modified}>{fmtDate(modified, l)}</time></span> : null}
              <span aria-hidden="true">·</span>
              <span>{minRead(minutes, l)}</span>
            </p>
          </header>
          {excerpt ? (
            <div data-ground="putih" className="mt-8 max-w-[70ch] border-l-4 border-key p-5 sm:p-6">
              <p className="t-dateline text-ink-2">{BLOG.summary[l]}</p>
              <p className="t-lead mt-3"><Stabilo>{excerpt}</Stabilo></p>
            </div>
          ) : null}
          {at('ABOVE_FOLD').length ? <div className="max-w-[70ch]">{at('ABOVE_FOLD').map(cta)}</div> : null}
          <ArticleBody locale={l} toc={toc} parts={parts} rail={[...at('AFTER_TOC'), ...at('SIDEBAR')].map(cta)}
            below={at('BELOW_ARTICLE').map(cta)} sticky={at('STICKY_BOTTOM').map(cta)} cta={cta}
            sources={sources} author={author} title={title} url={url} />
        </Wrap>
      </Section>
      <Section hour="0600" pad="sm" className="border-t border-hair">
        <Wrap>
          <CrossSell locale={l} keys={[k]} heading={BLOG.crossHeading[l]} id="layanan-terkait" />
          {related.length ? (
            <div className="mt-section-sm">
              <h2 className="t-h2" id="artikel-terkait">{BLOG.related[l]}</h2>
              <div className="mt-6 max-w-[56rem]">
                {related.map((r) => <PostRow key={r.id} locale={l} post={r} minutes={relFacts[r.id]?.minutes} />)}
              </div>
            </div>
          ) : null}
        </Wrap>
      </Section>
    </PageShell>
  )
}
