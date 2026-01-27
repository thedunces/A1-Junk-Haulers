import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEventHandler,
  type PointerEventHandler,
} from 'react'

type CarouselItem = {
  src: string
  alt: string
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()

    if (mq.addEventListener) mq.addEventListener('change', update)
    // Safari < 14
    // eslint-disable-next-line deprecation/deprecation
    else mq.addListener(update)

    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', update)
      // eslint-disable-next-line deprecation/deprecation
      else mq.removeListener(update)
    }
  }, [])

  return reduced
}

export function BeforeAfterCarousel3D({
  items,
  title = 'Before & After',
  subtitle = 'Real cleanups. Real results.',
}: {
  items: CarouselItem[]
  title?: string
  subtitle?: string
}) {
  const reducedMotion = usePrefersReducedMotion()
  const step = useMemo(() => (items.length ? 360 / items.length : 0), [items.length])

  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isAuto, setIsAuto] = useState(true)
  const drag = useRef<{ startX: number; startRotation: number } | null>(null)

  const depth = 380

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (e) => {
    if (items.length <= 1) return
    ;(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId)
    setIsDragging(true)
    drag.current = { startX: e.clientX, startRotation: rotation }
    setIsAuto(false)
  }

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (e) => {
    if (!drag.current) return
    const dx = e.clientX - drag.current.startX
    setRotation(drag.current.startRotation + dx * 0.35)
  }

  const endDrag: PointerEventHandler<HTMLDivElement> = () => {
    drag.current = null
    setIsDragging(false)
  }

  const rotateBy = (delta: number) => setRotation((r) => r + delta)

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!items.length) return
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setIsAuto(false)
      rotateBy(-step)
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      setIsAuto(false)
      rotateBy(step)
    }
  }

  const canAuto = isAuto && !isDragging && !reducedMotion && items.length > 1

  return (
    <section className="relative py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="text-pretty text-sm text-slate-300 sm:text-base">{subtitle}</p>
        </div>

        {/* Mobile: simple snap carousel */}
        <div className="mt-10 md:hidden">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch]">
            {items.map((it) => (
              <div
                key={it.src}
                className="w-[86%] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_70px_rgba(0,0,0,0.45)]"
              >
                <img src={it.src} alt={it.alt} className="h-auto w-full" loading="lazy" />
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-slate-400">
            Swipe to browse. Use reduced motion settings to disable animation.
          </p>
        </div>

        {/* Desktop: 3D carousel */}
        <div className="mt-12 hidden md:block">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 shadow-sm transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                onClick={() => {
                  setIsAuto(false)
                  rotateBy(-step)
                }}
                aria-label="Previous slide"
              >
                Prev
              </button>
              <button
                type="button"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 shadow-sm transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                onClick={() => {
                  setIsAuto(false)
                  rotateBy(step)
                }}
                aria-label="Next slide"
              >
                Next
              </button>
              <button
                type="button"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 shadow-sm transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                onClick={() => setIsAuto((v) => !v)}
                aria-pressed={isAuto}
              >
                {isAuto ? 'Pause' : 'Auto'}
              </button>
            </div>

            <div
              className="relative mt-8 h-[420px] w-full select-none"
              style={{ perspective: '1200px' }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onKeyDown={onKeyDown}
              role="region"
              aria-label="Before and after photo carousel"
              tabIndex={0}
            >
              <div
                className="absolute inset-0"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${rotation}deg)`,
                  transition: isDragging ? undefined : 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className={[
                      'absolute inset-0',
                      canAuto ? 'animate-carousel' : '',
                      'motion-reduce:animate-none',
                    ].join(' ')}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {items.map((it, idx) => {
                      const angle = idx * step
                      return (
                        <div
                          key={it.src}
                          className="absolute left-1/2 top-1/2 h-[280px] w-[520px] -translate-x-1/2 -translate-y-1/2 lg:h-[320px] lg:w-[560px]"
                          style={{
                            transform: `rotateY(${angle}deg) translateZ(${depth}px)`,
                          }}
                        >
                          <div className="group relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_24px_100px_rgba(0,0,0,0.55)] transition [transform:translateZ(0)] hover:-translate-y-1 hover:shadow-[0_30px_110px_rgba(0,0,0,0.65)]">
                            <img
                              src={it.src}
                              alt={it.alt}
                              className="h-full w-full object-cover"
                              loading="lazy"
                              draggable={false}
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 opacity-80" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-white/10" />
              <div className="pointer-events-none absolute -bottom-10 left-1/2 h-24 w-[65%] -translate-x-1/2 rounded-full bg-sky-400/20 blur-3xl" />
            </div>

            <p className="mt-4 text-center text-xs text-slate-400">
              Drag to rotate. Use ←/→ keys when focused. {reducedMotion ? 'Reduced motion is on.' : ''}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

