import { useInView } from '../lib/useInView'
import type { ReactNode } from 'react'

export function ContactSection({ children }: { children: ReactNode }) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section id="contact" className="relative scroll-mt-24 py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div
          ref={ref}
          className={[
            'mx-auto max-w-2xl text-center',
            inView ? 'animate-fade-up' : 'opacity-0 translate-y-3',
            'motion-reduce:opacity-100 motion-reduce:translate-y-0',
          ].join(' ')}
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Get a quick quote
          </h2>
          <p className="mt-3 text-pretty text-sm text-slate-300 sm:text-base">
            Tell us what you need removed and we’ll get back to you ASAP.
          </p>
        </div>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}

