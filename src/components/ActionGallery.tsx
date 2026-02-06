import actionCrewLoading from '../assets/action-crew-loading.png'
import actionDumpster from '../assets/action-dumpster.png'
import actionWheelbarrow from '../assets/action-wheelbarrow.png'
import logo from '../assets/logo.png'
import { useInView } from '../lib/useInView'

const actionImages = [
  { src: actionDumpster, alt: 'Crew loading furniture and bags into dumpster', caption: 'Careful removal of bulky items and bagged trash.' },
  { src: actionWheelbarrow, alt: 'A1 Junk Haulers crew moving furniture from shed', caption: 'Our crew in action—moving furniture and large items.' },
  { src: actionCrewLoading, alt: 'A1 Junk Haulers crew loading truck', caption: 'Professional crew in action—we show up and clean up.' },
]

export function ActionGallery() {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <section className="relative py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div ref={ref} className={['mx-auto max-w-2xl text-center', inView ? 'animate-fade-up' : 'opacity-0 translate-y-3', 'motion-reduce:opacity-100 motion-reduce:translate-y-0'].join(' ')}>
          <img src={logo} alt="A1 Junk Haulers" className="mx-auto h-14 w-auto max-w-[200px] object-contain sm:h-16 sm:max-w-[240px]" />
          <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">We show up. We load fast. We clean up.</h2>
          <p className="mt-3 text-pretty text-sm text-slate-300 sm:text-base">Professional crew, careful handling, and a tidy finish.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {actionImages.map(({ src, alt, caption }) => (
            <figure key={alt} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_24px_90px_rgba(0,0,0,0.45)] transition hover:-translate-y-1 hover:bg-white/10">
              <img src={src} alt={alt} className="h-[280px] w-full object-cover transition duration-700 group-hover:scale-[1.03] sm:h-[320px]" loading="lazy" />
              <figcaption className="px-5 py-4 text-sm text-slate-200">{caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
