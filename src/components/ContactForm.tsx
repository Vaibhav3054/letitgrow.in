import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { BRAND, SERVICES } from '../data/siteData'
import { submitLead } from '../utils/submitLead'

interface ContactFormProps {
  defaultService?: string
}

export function ContactForm({ defaultService = '' }: ContactFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState(defaultService)
  const [message, setMessage] = useState('')
  const [botField, setBotField] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    const result = await submitLead({
      formType: 'contact',
      botField,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      service: service || 'General Inquiry',
      message: message.trim(),
    })

    if (result.ok) {
      setStatus('success')
      setName('')
      setEmail('')
      setPhone('')
      setService(defaultService)
      setMessage('')
    } else {
      setStatus('error')
      setErrorMsg(result.error || 'Something went wrong. Please try again.')
    }
  }

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#4facfe] focus:bg-white focus:ring-4 focus:ring-[#4facfe]/15 focus:outline-none dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:border-[#4facfe] dark:focus:bg-slate-800'

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-8 text-center dark:border-emerald-800/60 dark:bg-emerald-950/30">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
          Message Received!
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Thank you for reaching out to {BRAND.name}. We&apos;ll get back to you within 24 hours.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="rounded-full border border-slate-300 px-5 py-2 text-xs font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-600 dark:border-slate-600 dark:text-slate-200"
          >
            Send Another Message
          </button>
          <Link
            to="/consultation"
            className="brand-gradient-bg rounded-full px-5 py-2 text-xs font-semibold text-white transition hover:opacity-90"
          >
            Book a Free Consultation
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="bot-field"
        value={botField}
        onChange={(e) => setBotField(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200"
          >
            Your Name *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Aarav Sharma"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200"
          >
            Email Address *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-phone"
            className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200"
          >
            Phone / WhatsApp
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98XXXXXXXX"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="contact-service"
            className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200"
          >
            What do you need? *
          </label>
          <select
            id="contact-service"
            name="service"
            required
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={inputClass}
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.consultationValue}>
                {s.shortTitle}
              </option>
            ))}
            <option value="PostPulse / Pathology SaaS Demo">
              Demo: PostPulse / Pathology Lab SaaS
            </option>
            <option value="Something Else">Something Else</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200"
        >
          Tell us about your project *
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share your goals, business type, or features you're looking to build..."
          className={inputClass}
        />
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="brand-gradient-bg brand-glow inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            Send Message <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  )
}
