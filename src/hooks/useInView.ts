import { useEffect, useRef, useState } from 'react'

export function useInView(options?: { once?: boolean; amount?: number }) {
  const { once = true, amount = 0.3 } = options ?? {}
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        }
      },
      { threshold: amount }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once, amount])

  return [ref, inView] as const
}
