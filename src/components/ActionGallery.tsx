import { useInView } from '../lib/useInView'

const IMG1 = 'https://placehold.co/800x500/1e293b/64748b?text=Junk+Removal+Work'
const IMG2 = 'https://placehold.co/800x500/1e293b/64748b?text=Clean+Up+Service'

export function ActionGallery() {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <section className="relative py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div ref={ref} className={['mx-auto max-w-2xl text-center', inView ? 'animate-fade-up' : 'opacity-0 translate-y-3', 'motion-reduce:opacity-100 motion-reduce:translate-y-0'].join(' ')}>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">We show up. We load fast. We clean up.</h2>
          <p className="mt-3 text-pretty text-sm text-slate-300 sm:text-base">Professional crew, careful handling, and a tidy finish.</p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <figure className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_24px_90px_rgba(0,0,0,0.45)] transition hover:-translate-y-1 hover:bg-white/10">
            <img src={IMG1} alt="Crew removing bulky items" className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-[1.03]" loading="lazy" />
            <figcaption className="px-5 py-4 text-sm text-slate-200">Careful removal of bulky items and bagged trash.</figcaption>
          </figure>
          <figure className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_24px_90px_rgba(0,0,0,0.45)] transition hover:-translate-y-1 hover:bg-white/10">
            <img src={IMG2} alt="Crew hauling debris" className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-[1.03]" loading="lazy" />
            <figcaption className="px-5 py-4 text-sm text-slate-200">Fast loading for cleanouts and remodel debris.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
