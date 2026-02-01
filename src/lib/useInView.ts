



















































































































































import { useEffect, useRef, useState } from 'react'

export function useInView<T extends Element>({
  rootMargin = '0px 0px -10% 0px',
  threshold = 0.15,
  once = true,
}: {
  rootMargin?: string
  threshold?: number
  once?: boolean
} = {}) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (inView && once) return

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          setInView(true)
          if (once) obs.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin, threshold },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [inView, once, rootMargin, threshold])

  return { ref, inView }
}

