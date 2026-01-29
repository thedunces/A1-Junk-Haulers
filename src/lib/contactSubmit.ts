export type ContactFormValues = {
  name: string
  email: string
  phone?: string
  message: string
  company?: string // honeypot
}

type SubmitResult =
  | { ok: true; mode: 'mailto' | 'endpoint' }
  | { ok: false; mode: 'mailto' | 'endpoint'; error: string }

function buildMailtoUrl({
  to,
  subject,
  body,
}: {
  to: string
  subject: string
  body: string
}) {
  const params = new URLSearchParams({
    subject,
    body,
  })
  return `mailto:${encodeURIComponent(to)}?${params.toString()}`
}

export async function submitContact(values: ContactFormValues): Promise<SubmitResult> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

  // If configured, POST JSON to an endpoint (Formspree/Netlify/etc).
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        return { ok: false, mode: 'endpoint', error: `Request failed (${res.status})` }
      }

      return { ok: true, mode: 'endpoint' }
    } catch (e) {
      return {
        ok: false,
        mode: 'endpoint',
        error: e instanceof Error ? e.message : 'Network error',
      }
    }
  }

  // Offline-friendly default: open the user's email client.
  const to =
    (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) ?? 'Mdchaulaway@gmail.com'
  const subject = 'A1 Junk Haulers — New quote request'
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    values.phone ? `Phone: ${values.phone}` : undefined,
    '',
    values.message,
  ]
    .filter(Boolean)
    .join('\n')

  try {
    window.location.href = buildMailtoUrl({ to, subject, body })
    return { ok: true, mode: 'mailto' }
  } catch (e) {
    return {
      ok: false,
      mode: 'mailto',
      error: e instanceof Error ? e.message : 'Could not open email client',
    }
  }
}

