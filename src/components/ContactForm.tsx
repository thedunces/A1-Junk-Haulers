import { useMemo, useState, type ChangeEvent, type FormEventHandler } from 'react'
import { submitContact, type ContactFormValues } from '../lib/contactSubmit'

type Errors = Partial<Record<keyof ContactFormValues, string>>

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

function validate(v: ContactFormValues): Errors {
  const e: Errors = {}
  if (!v.name.trim()) e.name = 'Please enter your name.'
  if (!v.email.trim() || !isEmail(v.email.trim())) {
    e.email = 'Please enter a valid email.'
  }
  if (!v.message.trim() || v.message.trim().length < 10) {
    e.message = 'Please include a short message (at least 10 characters).'
  }
  return e
}

export function ContactForm() {
  const contactPhone = '720-461-1218'
  const contactEmail = 'Mike@a1haulaway.com'

  const [values, setValues] = useState<ContactFormValues>({
    name: '',
    email: '',
    phone: '',
    message: '',
    company: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState<string | null>(null)

  const helper = useMemo(() => {
    const email = (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) ?? contactEmail
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined
    if (endpoint) return 'We’ll send this directly and get back to you ASAP.'
    return `This opens your email app to message ${email}. You can change this via VITE_CONTACT_EMAIL.`
  }, [contactEmail])

  const onChange =
    (k: keyof ContactFormValues) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [k]: e.target.value }))
    }

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setSubmitError(null)

    // Honeypot spam trap: if filled, pretend success.
    if (values.company?.trim()) {
      setStatus('success')
      return
    }

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setStatus('submitting')
    const res = await submitContact(values)
    if (res.ok) {
      setStatus('success')
      return
    }

    setStatus('error')
    setSubmitError(res.error)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.35)] sm:p-8">
        <div className="mb-6 flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-xs text-slate-200 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-slate-300">Prefer to reach us directly?</div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              className="font-semibold text-sky-300 hover:text-sky-200"
              href={`tel:${contactPhone.replace(/[^0-9+]/g, '')}`}
            >
              Call/Text {contactPhone}
            </a>
            <a className="font-semibold text-sky-300 hover:text-sky-200" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-100">Name</span>
              <input
                value={values.name}
                onChange={onChange('name')}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/30"
                placeholder="Your name"
                autoComplete="name"
              />
              {errors.name ? <div className="mt-2 text-xs text-rose-300">{errors.name}</div> : null}
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-100">Email</span>
              <input
                value={values.email}
                onChange={onChange('email')}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/30"
                placeholder="you@example.com"
                autoComplete="email"
                inputMode="email"
              />
              {errors.email ? <div className="mt-2 text-xs text-rose-300">{errors.email}</div> : null}
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-slate-100">Phone (optional)</span>
            <input
              value={values.phone ?? ''}
              onChange={onChange('phone')}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/30"
              placeholder="(555) 123-4567"
              autoComplete="tel"
              inputMode="tel"
            />
          </label>

          {/* Honeypot */}
          <label className="hidden">
            <span>Company</span>
            <input value={values.company ?? ''} onChange={onChange('company')} tabIndex={-1} />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-100">Message</span>
            <textarea
              value={values.message}
              onChange={onChange('message')}
              className="mt-2 min-h-[140px] w-full resize-y rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/30"
              placeholder="What needs to be removed? Where are you located? Any time constraints?"
            />
            {errors.message ? (
              <div className="mt-2 text-xs text-rose-300">{errors.message}</div>
            ) : null}
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center justify-center rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {status === 'submitting' ? 'Sending…' : 'Send message'}
            </button>
            <div className="text-xs text-slate-400">{helper}</div>
          </div>

          {status === 'success' ? (
            <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
              Thanks! Your message is ready to send. We’ll respond as soon as possible.
            </div>
          ) : null}

          {status === 'error' ? (
            <div className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
              Something went wrong. {submitError ?? 'Please try again.'}
            </div>
          ) : null}
        </form>
      </div>
    </div>
  )
}

