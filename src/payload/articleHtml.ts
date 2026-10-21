/* eslint-disable @typescript-eslint/no-explicit-any -- Lexical node JSON is untyped here */
// Lexical -> HTML for article bodies: the default converters plus the article blocks, captioned uploads and tables.
// Output is plain HTML styled by .prose .blk-* in src/styles/prose.css (the body is spliced as an HTML string).
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import { WA_PATH } from '@/components/ds/Icon'
import { priceText } from '@/components/ds/Price'
import { SERVICES, svc, svcHref, waLink, type Locale, type SvcKey } from '@/lib/services'
import { ARTICLE } from '@/content/article'

/** Escapes text for HTML text and attribute positions. */
export const esc = (s: unknown) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
const para = (s: unknown) => esc(s).replace(/\r?\n/g, '<br />')

/** http(s) or site-relative only; anything else (javascript:, data:) becomes ''. */
export const safeUrl = (u: unknown) => {
  const s = typeof u === 'string' ? u.trim() : ''
  return /^(https?:\/\/|\/(?!\/))/i.test(s) ? s : ''
}

const YT_ID = /^[A-Za-z0-9_-]{11}$/
/** A YouTube id from a bare id or a watch / youtu.be / embed / shorts / live URL; '' when not recognisably YouTube. */
export function youtubeId(input: unknown): string {
  const s = typeof input === 'string' ? input.trim() : ''
  if (YT_ID.test(s)) return s
  let u: URL
  try { u = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`) } catch { return '' }
  const host = u.hostname.replace(/^(www|m)\./, '')
  let id = ''
  if (host === 'youtu.be') id = u.pathname.split('/')[1] ?? ''
  else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    const [, kind, rest] = u.pathname.split('/')
    id = kind === 'watch' ? u.searchParams.get('v') ?? '' : ['embed', 'shorts', 'live', 'v'].includes(kind) ? rest ?? '' : ''
  }
  return YT_ID.test(id) ? id : ''
}

const WA_ICON = `<span class="wa-ico" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="${WA_PATH}"/></svg></span>`

type Fields = Record<string, any>
const isKey = (k: unknown): k is SvcKey => SERVICES.some((s) => s.key === k)

const blocks = (l: Locale) => ({
  callout: ({ node }: { node: { fields: Fields } }) => {
    const f = node.fields
    const tone = ['info', 'tip', 'warning'].includes(f.tone) ? (f.tone as 'info' | 'tip' | 'warning') : 'info'
    const label = ARTICLE[`${tone}Label` as 'infoLabel'][l]
    return `<div class="blk blk-callout blk-callout--${tone}" data-cms-block="callout" role="note"><p class="blk__title">${esc(f.title || label)}</p><p>${para(f.text)}</p></div>`
  },
  takeaways: ({ node }: { node: { fields: Fields } }) => {
    const f = node.fields
    const pts = (Array.isArray(f.points) ? f.points : []).filter((p: Fields) => p?.text)
    if (!pts.length) return ''
    return `<div class="blk blk-takeaways" data-cms-block="takeaways"><p class="blk__title">${esc(f.title || ARTICLE.takeaways[l])}</p><ul>${pts.map((p: Fields) => `<li>${esc(p.text)}</li>`).join('')}</ul></div>`
  },
  serviceCta: ({ node }: { node: { fields: Fields } }) => {
    const k = node.fields.service
    if (!isKey(k)) return ''
    const s = svc(k)
    return `<div class="blk blk-svc" data-cms-block="serviceCta" data-ground="putih" data-stage="${esc(s.stage)}"><p class="blk__title">${esc(ARTICLE.serviceEyebrow[l])}</p><p class="blk-svc__name"><a href="${esc(svcHref(k, l))}">${esc(s.name[l])}</a></p><p>${esc(s.line[l])}</p><p class="blk-svc__price">${esc(priceText(k, l, true))}</p><p><a href="${esc(svcHref(k, l))}">${esc(ARTICLE.serviceOpen[l])}</a></p></div>`
  },
  waCta: ({ node }: { node: { fields: Fields } }) => {
    const f = node.fields
    if (!f.message) return ''
    return `<div class="blk blk-wa" data-cms-block="waCta"><a class="btn btn-wa btn-sm" href="${esc(waLink(String(f.message)))}" target="_blank" rel="noopener" data-cta="whatsapp" data-placement="post" data-service="none">${WA_ICON}${esc(f.label || ARTICLE.waLabel[l])}</a></div>`
  },
  youtube: ({ node }: { node: { fields: Fields } }) => {
    const f = node.fields
    const id = youtubeId(f.url)
    if (!id) return ''
    return `<figure class="blk blk-video" data-cms-block="youtube"><div class="blk-video__frame"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${esc(f.title)}" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><figcaption>${esc(f.title)}<br /><span class="blk-video__note">${esc(ARTICLE.videoConsent[l])} <a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener" data-cta="youtube">${esc(ARTICLE.videoWatch[l])}</a></span></figcaption></figure>`
  },
})

const converters = (l: Locale) => ({ defaultConverters }: { defaultConverters: Record<string, any> }): any => {
  const upload = defaultConverters.upload as (a: any) => string
  return {
    ...defaultConverters,
    blocks: blocks(l) as any,
    // no caption = the stock output, so older posts render as before
    upload: (a: any) => {
      const html = upload(a)
      const cap = a.node.fields?.caption
      return html && cap ? `<figure class="blk-fig">${html}<figcaption>${esc(cap)}</figcaption></figure>` : html
    },
    // tables only exist in new posts: plain cells, styled by .prose table
    table: ({ node, nodesToHTML }: any) => `<div class="blk-table"><table><tbody>${nodesToHTML({ nodes: node.children }).join('')}</tbody></table></div>`,
    tablerow: ({ node, nodesToHTML }: any) => `<tr>${nodesToHTML({ nodes: node.children }).join('')}</tr>`,
    tablecell: ({ node, nodesToHTML }: any) => {
      const tag = node.headerState > 0 ? 'th' : 'td'
      const span = (a: string, n: unknown) => (Number(n) > 1 ? ` ${a}="${Number(n)}"` : '')
      return `<${tag}${span('colspan', node.colSpan)}${span('rowspan', node.rowSpan)}>${nodesToHTML({ nodes: node.children }).join('')}</${tag}>`
    },
  }
}

export const articleToHtml = (data: unknown, l: Locale) =>
  convertLexicalToHTML({ data: data as any, converters: converters(l) })
