import logo from '../assets/logo.png'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <img src={logo} alt="A1 Junk Haulers logo" className="h-10 w-10 rounded-xl" />
              <div>
                <div className="text-sm font-semibold text-slate-50">A1 Junk Haulers</div>
                <div className="text-xs text-slate-400">Junk removal • Cleanouts • Hauling</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-300">
              Fast scheduling, upfront pricing, and a spotless cleanup when we’re done.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <div className="text-sm font-semibold text-slate-50">Service area</div>
              <p className="mt-2 text-sm text-slate-300">
                Denver, Colorado metro area. Same-day pickup available.
              </p>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-50">Hours</div>
              <p className="mt-2 text-sm text-slate-300">
                Mon–Sat: 8am–6pm
                <br />
                Sun: By appointment
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} A1 Junk Haulers. All rights reserved.</div>
          <div>
            Built with care •{' '}
            <a href="#contact" className="text-sky-300 hover:text-sky-200">
              Contact us
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

