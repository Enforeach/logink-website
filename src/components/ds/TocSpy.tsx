'use client'
import { useEffect } from 'react'

/** Marks the TOC link of the heading currently under the header with aria-current (≈0.3 KB). */
export function TocSpy() {
  useEffect(() => {
    const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-toc] a[href^="#"]')]
    const heads = links.map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          if (!e.isIntersecting) continue
          for (const a of links) {
            if (a.hash === `#${e.target.id}`) a.setAttribute('aria-current', 'true')
            else a.removeAttribute('aria-current')
          }
        }
      },
      { rootMargin: '0px 0px -75% 0px' },
    )
    heads.forEach((h) => io.observe(h))
    return () => io.disconnect()
  }, [])
  return null
}
