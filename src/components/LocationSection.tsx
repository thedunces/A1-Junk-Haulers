import { useInView } from '../lib/useInView'

const DENVER_MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d196281.02904358334!2d-105.109927!3d39.739235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876b80aa231f17cf%3A0x9ef05f379d26972!2sDenver%2C%20CO!5e0!3m2!1sen!2sus'

export function LocationSection() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section id="location" className="relative scroll-mt-24 py-16">
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
            Serving the Denver metro area
          </h2>
          <p className="mt-3 text-pretty text-sm text-slate-300 sm:text-base">
            A1 Junk Haulers is located in Denver, Colorado. We serve the greater Denver metro and
            surrounding areas with fast, reliable junk removal.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-400/20 ring-1 ring-white/10">
                <svg
                  className="h-6 w-6 text-sky-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-50">Denver, Colorado</h3>
                <p className="text-sm text-slate-300">Greater Denver metro • Front Range</p>
              </div>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-slate-300">
              <li>• Denver & surrounding suburbs</li>
              <li>• Aurora, Lakewood, Thornton, Westminster</li>
              <li>• Boulder, Fort Collins, Colorado Springs (inquire)</li>
            </ul>
            <a
              href="https://www.google.com/maps/search/Denver+CO"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300"
            >
              View on Google Maps
              <span aria-hidden>→</span>
            </a>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
            <div className="relative aspect-[4/3] w-full">
              <iframe
                title="Denver, Colorado metro area map"
                src={DENVER_MAP_EMBED_URL}
                width="100%"
                height="100%"
                className="absolute inset-0 border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
