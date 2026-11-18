import type { Config } from '@netlify/functions'

interface LeadPayload {
  formType?: 'contact' | 'consultation' | 'newsletter'
  botField?: string
  name?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  company?: string
  service?: string
  timeline?: string
  budget?: string
  message?: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return Response.json({ ok: false, error: 'Method not allowed' }, { status: 405 })
  }

  let payload: LeadPayload
  try {
    payload = (await req.json()) as LeadPayload
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  // Quietly reject honeypot spam submissions
  if (payload.botField && payload.botField.trim().length > 0) {
    return Response.json({ ok: true, skipped: true })
  }

  const email = (payload.email ?? '').trim()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: 'Valid email is required' }, { status: 400 })
  }

  const resendApiKey = Netlify.env.get('RESEND_API_KEY')
  if (!resendApiKey) {
    return Response.json({
      ok: true,
      emailSent: false,
      reason: 'RESEND_API_KEY not configured; stored via Netlify Forms',
    })
  }

  const toEmail = Netlify.env.get('LEAD_TO_EMAIL') || 'letitgrow.help@gmail.com'
  const fromEmail = Netlify.env.get('RESEND_FROM_EMAIL') || 'Let It Grow <onboarding@resend.dev>'

  const formType = payload.formType ?? 'contact'
  const fullName =
    (payload.name ?? `${payload.firstName ?? ''} ${payload.lastName ?? ''}`).trim() || 'Website Visitor'

  const subjectMap: Record<string, string> = {
    contact: `New Website Inquiry from ${fullName} — ${payload.service || 'General'}`,
    consultation: `New Free Consultation Request from ${fullName} — ${payload.service || 'Project'}`,
    newsletter: `New Newsletter Subscriber: ${email}`,
  }

  const rows: Array<[string, string]> = [
    ['Form', formType.toUpperCase()],
    ['Name', fullName],
    ['Email', email],
    ...(payload.phone ? [['Phone', payload.phone] as [string, string]] : []),
    ...(payload.company ? [['Company', payload.company] as [string, string]] : []),
    ...(payload.service ? [['Service', payload.service] as [string, string]] : []),
    ...(payload.timeline ? [['Timeline', payload.timeline] as [string, string]] : []),
    ...(payload.budget ? [['Budget', payload.budget] as [string, string]] : []),
    ...(payload.message ? [['Message', payload.message] as [string, string]] : []),
  ]

  const rowsHtml = rows
    .map(
      ([label, val]) =>
        `<tr><td style="padding:10px 14px;font-weight:600;color:#334155;border-bottom:1px solid #e2e8f0;width:140px;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:10px 14px;color:#0f172a;border-bottom:1px solid #e2e8f0;white-space:pre-wrap;">${escapeHtml(val)}</td></tr>`
    )
    .join('')

  const html = `
    <div style="font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:24px;">
      <div style="background:linear-gradient(135deg,#4facfe,#00f2fe);padding:20px 24px;border-radius:12px 12px 0 0;color:#ffffff;">
        <h2 style="margin:0;font-size:20px;">Let It Grow — New Lead Received</h2>
        <p style="margin:4px 0 0;opacity:0.9;font-size:13px;">Submitted from www.letitgrow.in</p>
      </div>
      <div style="background:#ffffff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;overflow:hidden;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">${rowsHtml}</table>
      </div>
    </div>
  `

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: subjectMap[formType] || `New Lead from ${fullName}`,
        html,
      }),
    })

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text()
      console.error('Resend API error:', resendResponse.status, errorText)
      return Response.json(
        { ok: false, emailSent: false, error: 'Email delivery failed' },
        { status: 502 }
      )
    }

    // Send branded confirmation email back to the client (only works once domain is verified in Resend)
    if (formType !== 'newsletter' && !fromEmail.includes('onboarding@resend.dev')) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [email],
          reply_to: toEmail,
          subject: 'We received your message — Let It Grow',
          html: `
            <div style="font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0f172a;">
              <h2 style="margin:0 0 12px;color:#0284c7;">Thanks for reaching out, ${escapeHtml(fullName)}!</h2>
              <p style="line-height:1.6;color:#334155;">We've received your inquiry at <strong>Let It Grow</strong> and our team will respond within 24 hours.</p>
              <p style="line-height:1.6;color:#334155;">Need a faster response? Call or WhatsApp us directly at <strong>+91 7987631106</strong>.</p>
              <p style="margin-top:24px;font-size:13px;color:#64748b;">— Team Let It Grow · <a href="https://www.letitgrow.in" style="color:#0284c7;">www.letitgrow.in</a></p>
            </div>
          `,
        }),
      }).catch(() => undefined)
    }

    return Response.json({ ok: true, emailSent: true })
  } catch (err) {
    console.error('Resend network error:', err)
    return Response.json({ ok: false, error: 'Network error sending email' }, { status: 502 })
  }
}

export const config: Config = {
  path: '/api/lead',
  method: ['POST'],
}
