import actionCrewDebris from '../assets/action-crew-debris.png'
import actionCrewPanel from '../assets/action-crew-panel.png'
import logo from '../assets/logo.png'
import { useInView } from '../lib/useInView'

export function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <header className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-sky-400/15 blur-3xl" />
        <div className="absolute -bottom-40 left-12 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />
      </div>
      <div className="mx-auto w-full max-w-6xl px-6 pt-8">
        <nav className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img src={logo} alt="A1 Junk Haulers" className="h-10 w-auto max-w-[160px] object-contain" />
          </a>
          <a href="#contact" className="rounded-full bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
            Get a quote
          </a>
        </nav>
        <div className="grid grid-cols-1 items-center gap-10 pb-16 pt-12 md:grid-cols-2 md:pb-24">
          <div ref={ref} className={['max-w-xl', inView ? 'animate-fade-up' : 'opacity-0 translate-y-3', 'motion-reduce:opacity-100 motion-reduce:translate-y-0'].join(' ')}>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              Denver, Colorado • Same-day pickup • Upfront pricing
            </p>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
              Junk removal that leaves your space spotless.
            </h1>
            <p className="mt-4 text-pretty text-base text-slate-300 sm:text-lg">
              Based in Denver, Colorado. From single-item pickups to full property cleanouts, we show up on time, load quickly, and clean up the area before we go.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#contact" className="inline-flex justify-center rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">Contact us</a>
              <a href="#before-after" className="inline-flex justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">See results</a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4"><div className="text-lg font-semibold text-slate-50">Fast</div><div className="mt-1 text-xs text-slate-300">Same-day options</div></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4"><div className="text-lg font-semibold text-slate-50">Upfront</div><div className="mt-1 text-xs text-slate-300">No surprises</div></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4"><div className="text-lg font-semibold text-slate-50">Clean</div><div className="mt-1 text-xs text-slate-300">We sweep up</div></div>
            </div>
          </div>
          <div className="relative">
            <div className="relative grid gap-4">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_26px_120px_rgba(0,0,0,0.6)]">
                <img src={actionCrewDebris} alt="A1 Junk Haulers crew clearing debris" className="h-[320px] w-full object-cover md:h-[360px]" loading="eager" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  <img src={actionCrewPanel} alt="Crew moving large panels with A1 Junk Haulers truck" className="h-36 w-full object-cover sm:h-40" loading="lazy" />
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold text-slate-50">What we take</div>
                  <ul className="mt-2 space-y-1 text-xs text-slate-300">
                    <li>Furniture & appliances</li><li>Yard waste</li><li>Construction debris</li><li>Full cleanouts</li>
                  </ul>
                  <div className="mt-3 text-xs text-slate-400">Ask about donation & responsible disposal.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
