export type LeadFormType = 'contact' | 'consultation' | 'newsletter'

export interface LeadSubmission {
  formType: LeadFormType
  botField?: string
  name?: string
  firstName?: string
  lastName?: string
  email: string
  phone?: string
  company?: string
  service?: string
  timeline?: string
  budget?: string
  message?: string
}

export interface LeadSubmitResult {
  ok: boolean
  via: 'netlify+resend' | 'netlify' | 'resend' | 'local-preview'
  error?: string
}

export async function submitLead(data: LeadSubmission): Promise<LeadSubmitResult> {
  const formBody = new URLSearchParams()
  formBody.append('form-name', data.formType)
  formBody.append('bot-field', data.botField ?? '')

  Object.entries(data).forEach(([key, val]) => {
    if (key === 'formType' || key === 'botField' || val === undefined) return
    formBody.append(key, String(val))
  })

  // 1. Submit to Netlify Forms static skeleton (persists leads in Netlify dashboard)
  let netlifyOk = false
  try {
    const nfRes = await fetch('/__forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formBody.toString(),
    })
    netlifyOk = nfRes.ok
  } catch {
    netlifyOk = false
  }

  // 2. Submit to Netlify Function (/api/lead -> Resend email notifications if configured)
  let resendOk = false
  try {
    const apiRes = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (apiRes.ok) {
      const json = (await apiRes.json()) as { ok?: boolean; emailSent?: boolean }
      resendOk = Boolean(json.ok && json.emailSent)
    }
  } catch {
    resendOk = false
  }

  if (netlifyOk && resendOk) return { ok: true, via: 'netlify+resend' }
  if (netlifyOk) return { ok: true, via: 'netlify' }
  if (resendOk) return { ok: true, via: 'resend' }

  // Graceful handling during local `npm run dev` (outside Netlify runtime)
  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

  if (isLocalhost) {
    return { ok: true, via: 'local-preview' }
  }

  return {
    ok: false,
    via: 'netlify',
    error: 'We could not send your request right now. Please email us directly at letitgrow.help@gmail.com.',
  }
}
