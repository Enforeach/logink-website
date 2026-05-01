import { useEffect, useState } from 'react'

export function useCountUp(target: number, active: boolean, duration = 2000, delay = 0) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    let raf: number
    const timeout = setTimeout(() => {
      const start = performance.now()
      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - t, 3) // cubic ease-out
        setValue(Math.round(eased * target))
        if (t < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, delay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(raf)
    }
  }, [active, target, duration, delay])

  return value
}
