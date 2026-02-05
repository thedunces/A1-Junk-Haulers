import { useInView } from '../lib/useInView'

const SERVICES = [
  { title: 'Junk removal', body: 'Single items or full loads—loaded quickly and hauled away.' },
  { title: 'Furniture & appliances', body: 'Couches, mattresses, fridges, washers—no heavy lifting for you.' },
  { title: 'Yard waste', body: 'Branches, brush, leaves—clean yard, clean finish.' },
  { title: 'Property cleanouts', body: 'Estate, rental, garage, attic, basement cleanouts—start fresh.' },
  { title: 'Construction debris', body: 'Renovation leftovers and demo debris—site stays tidy.' },
  { title: 'Commercial pickups', body: 'Office and storage cleanouts—fast and discreet.' },
]

export function Services() {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <section className="relative py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div ref={ref} className={['mx-auto max-w-2xl text-center', inView ? 'animate-fade-up' : 'opacity-0 translate-y-3', 'motion-reduce:opacity-100 motion-reduce:translate-y-0'].join(' ')}>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Services</h2>
          <p className="mt-3 text-pretty text-sm text-slate-300 sm:text-base">Quick scheduling, upfront pricing, and a spotless cleanup when we're done.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.title} className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_70px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_26px_90px_rgba(0,0,0,0.45)]">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-10 w-10 rounded-2xl bg-gradient-to-br from-sky-400/25 to-cyan-400/10 ring-1 ring-white/10" />
                <div>
                  <h3 className="text-base font-semibold text-slate-50">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{s.body}</p>
                </div>
              </div>
              <div className="mt-5 h-px w-full bg-gradient-to-r from-white/0 via-white/10 to-white/0" />
              <p className="mt-4 text-xs text-slate-400">Includes pickup, loading, and cleanup—just point and we handle the rest.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
