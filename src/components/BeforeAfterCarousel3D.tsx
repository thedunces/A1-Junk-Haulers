import { useEffect, useMemo, useRef, useState, type KeyboardEventHandler, type PointerEventHandler } from 'react'

type Item = { src: string; alt: string }

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}

export function BeforeAfterCarousel3D({ items, title = 'Before & After', subtitle = 'Real cleanups. Real results.' }: { items: Item[]; title?: string; subtitle?: string }) {
  const reduced = usePrefersReducedMotion()
  const step = useMemo(() => (items.length ? 360 / items.length : 0), [items.length])
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isAuto, setIsAuto] = useState(true)
  const drag = useRef<{ startX: number; startRotation: number } | null>(null)
  const depth = 380

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (e) => {
    if (items.length <= 1) return
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    setIsDragging(true)
    drag.current = { startX: e.clientX, startRotation: rotation }
    setIsAuto(false)
  }
  const onPointerMove: PointerEventHandler<HTMLDivElement> = (e) => {
    if (!drag.current) return
    setRotation(drag.current.startRotation + (e.clientX - drag.current.startX) * 0.35)
  }
  const endDrag: PointerEventHandler<HTMLDivElement> = () => { drag.current = null; setIsDragging(false) }
  const rotateBy = (d: number) => setRotation((r) => r + d)
  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!items.length) return
    if (e.key === 'ArrowLeft') { e.preventDefault(); setIsAuto(false); rotateBy(-step) }
    if (e.key === 'ArrowRight') { e.preventDefault(); setIsAuto(false); rotateBy(step) }
  }
  const canAuto = isAuto && !isDragging && !reduced && items.length > 1

  return (
    <section className="relative py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          <p className="text-pretty text-sm text-slate-300 sm:text-base">{subtitle}</p>
        </div>
        <div className="mt-10 md:hidden">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
            {items.map((it) => (
              <div key={it.src} className="w-[86%] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <img src={it.src} alt={it.alt} className="h-auto w-full" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 hidden md:block">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-center gap-3">
              <button type="button" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-sky-400" onClick={() => { setIsAuto(false); rotateBy(-step) }} aria-label="Previous">Prev</button>
              <button type="button" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-sky-400" onClick={() => { setIsAuto(false); rotateBy(step) }} aria-label="Next">Next</button>
              <button type="button" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-sky-400" onClick={() => setIsAuto((v) => !v)} aria-pressed={isAuto}>{isAuto ? 'Pause' : 'Auto'}</button>
            </div>
            <div className="relative mt-8 h-[420px] w-full select-none" style={{ perspective: '1200px' }} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerCancel={endDrag} onKeyDown={onKeyDown} role="region" aria-label="Before and after carousel" tabIndex={0}>
              <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d', transform: `rotateY(${rotation}deg)`, transition: isDragging ? undefined : 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
                  <div className={['absolute inset-0', canAuto ? 'animate-carousel' : '', 'motion-reduce:animate-none'].join(' ')} style={{ transformStyle: 'preserve-3d' }}>
                    {items.map((it, i) => {
                      const angle = i * step
                      return (
                        <div key={it.src} className="absolute left-1/2 top-1/2 h-[280px] w-[520px] -translate-x-1/2 -translate-y-1/2 lg:h-[320px] lg:w-[560px]" style={{ transform: `rotateY(${angle}deg) translateZ(${depth}px)` }}>
                          <div className="group relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_24px_100px_rgba(0,0,0,0.55)] transition hover:-translate-y-1">
                            <img src={it.src} alt={it.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-80" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-slate-400">Drag to rotate. Use ←/→ when focused. {reduced ? 'Reduced motion on.' : ''}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
