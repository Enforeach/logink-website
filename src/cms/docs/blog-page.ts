// Pages → Blog page (src/content/blog.ts): the blog home, the category pages and the labels around articles.
// The articles themselves are in Blog → Posts.
import '@/content/blog'
import '@/content/article'
import { page } from '@/lib/services'
import { pageGlobal, pageTab, seoOf } from '../define'

export const BlogPage = pageGlobal({
  slug: 'blog-page',
  label: 'Blog page',
  group: 'Pages',
  description: 'The blog home, the category pages and the labels around articles. The articles themselves are in Blog → Posts. Switch the language at the top right to edit Bahasa Indonesia or English.',
  path: page('blog').path,
  seo: seoOf(page('blog')),
  tabs: [
    pageTab(page('blog')),
    {
      name: 'home',
      label: 'Blog home',
      description: 'Texts on the main blog page.',
      ov: {
        lede: { label: 'Opening line', description: 'The sentence under the heading.' },
        latest: { label: 'Label above the newest article' },
        more: { label: 'Heading of the article list' },
        categories: { label: 'Heading of the category list' },
        allCats: { label: 'Category filter: "All"' },
        empty: { label: 'Message when there are no articles' },
      },
    },
    {
      name: 'categories',
      label: 'Category pages',
      description: 'Texts on the category pages (one page per blog category). Words in {braces} are filled in by the site: keep them.',
      ov: {
        backToBlog: { label: 'Link back to the blog' },
        catNav: { label: 'Category menu: name for screen readers' },
        catService: { label: 'Label before the related service' },
        countOne: { label: 'Article count: one article', description: '{n} = the number of articles. Shown when there is exactly 1.' },
        countMany: { label: 'Article count: several articles', description: '{n} = the number of articles.' },
        h1Tpl: { label: 'Category page heading', description: '{name} = the category name.' },
        titleTpl: { label: 'Category page browser title', description: '{name} = the category name. The title in Google results.' },
        descTpl: { label: 'Category page description', description: '{name} = the category name. Used when the category has no description of its own.' },
      },
    },
    {
      name: 'labels',
      label: 'Article labels',
      description: 'Small labels and fixed lines shown around every article. Words in {braces} are filled in by the site: keep them.',
      ov: {
        by: { label: '"By" (author line)' },
        published: { label: '"Published" (date label)' },
        readTime: { label: '"Reading time" label' },
        minReadTpl: { label: 'Reading time text', description: '{n} = the number of minutes, e.g. "{n} min read".' },
        summary: { label: 'Heading of the key takeaway box' },
        sources: { label: 'Heading of the sources list' },
        sourcesNote: { label: 'Line under the sources heading' },
        author: { label: 'Author box: title' },
        authorLine: { label: 'Author box: default line' },
        authorMore: { label: 'Author box: link to more articles' },
        related: { label: 'Heading of the related articles' },
        share: { label: 'Share bar: title' },
        copy: { label: 'Share bar: copy link button' },
        copied: { label: 'Share bar: after copying' },
        railEyebrow: { label: 'Service card beside the article: small label' },
        railOpen: { label: 'Service card beside the article: link text' },
        rail360: { label: 'Service card beside the article: 360° line' },
        crossHeading: { label: 'Heading of the service card under the article' },
        featureEyebrow: { label: 'Line above the service card' },
        inlineHTpl: { label: 'Mid-article call to action: heading', description: '{service} = the name of the related service.' },
        inlineP: { label: 'Mid-article call to action: text' },
      },
    },
    {
      name: 'article',
      label: 'Article blocks',
      description: 'Labels on the blocks editors can add inside an article (Blog → Posts → body editor).',
      ov: {
        faqHeading: { label: 'Heading above the article FAQ' },
        takeaways: { label: 'Key takeaways block: heading' },
        tipLabel: { label: 'Callout block: "Tip" label' },
        infoLabel: { label: 'Callout block: "Note" label' },
        warningLabel: { label: 'Callout block: "Heads up" label' },
        serviceEyebrow: { label: 'Service block: small label' },
        serviceOpen: { label: 'Service block: link text' },
        waLabel: { label: 'WhatsApp block: default button text', description: 'Used when the block has no button label of its own.' },
        videoConsent: { label: 'YouTube block: privacy note' },
        videoWatch: { label: 'YouTube block: "Watch on YouTube" link' },
      },
    },
  ],
})
