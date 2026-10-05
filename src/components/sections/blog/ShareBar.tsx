import type { Locale } from '@/lib/services'
import { BLOG } from '@/content/blog'
import { CopyLink } from './CopyLink'

/**
 * Share links (server) + copy (client). The WhatsApp share is a neutral chip, not a green control:
 * green is reserved for chatting with Logink (DESIGN §3.6). Old tag links went to a 404 route; dropped.
 */
export function ShareBar({ locale: l, title, url }: { locale: Locale; title: string; url: string }) {
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  const links = [
    { name: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}` },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { name: 'X', href: `https://x.com/intent/post?text=${t}&url=${u}` },
  ]
  return (
    <div className="flex flex-wrap items-center gap-2">
      <p className="t-dateline mr-2 text-ink-2">{BLOG.share[l]}</p>
      {links.map((s) => (
        <a key={s.name} href={s.href} target="_blank" rel="noopener" className="chip chip-choice">{s.name}</a>
      ))}
      <CopyLink url={url} label={BLOG.copy[l]} done={BLOG.copied[l]} />
    </div>
  )
}
