import { useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  AlertCircle,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  Loader2,
  MessageCircle,
  Phone,
} from 'lucide-react'
import { BRAND, CONSULTATION_FAQS, PROCESS_STEPS, SERVICES } from '../data/siteData'
import { submitLead } from '../utils/submitLead'
import { Reveal } from '../components/Reveal'

const TIMELINES = ['Urgent (1–2 weeks)', 'Soon (1 month)', 'Flexible (1–3 months)'] as const

const BUDGETS = [
  'Under ₹25,000',
  '₹25,000 – ₹75,000',
  '₹75,000 – ₹2,00,000',
  '₹2,00,000+',
  'Not Sure / Need Custom Quote',
] as const

export function ConsultationPage() {
  const [searchParams] = useSearchParams()
  const preselectedService = searchParams.get('service') || ''

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [service, setService] = useState(preselectedService)
  const [timeline, setTimeline] = useState<string>(TIMELINES[1])
  const [budget, setBudget] = useState('')
  const [message, setMessage] = useState('')
  const [botField, setBotField] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    document.title = 'Free Consultation | Let It Grow'
  }, [])

  useEffect(() => {
    if (preselectedService) setService(preselectedService)
  }, [preselectedService])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    const res = await submitLead({
      formType: 'consultation',
      botField,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      service: service || 'Consultation',
      timeline,
      budget: budget || 'Not specified',
      message: message.trim(),
    })

    if (res.ok) {
      setStatus('success')
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
      setCompany('')
      setMessage('')
    } else {
      setStatus('error')
      setErrorMsg(res.error || 'Could not submit your request. Please call or WhatsApp us.')
    }
  }

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#4facfe] focus:bg-white focus:ring-4 focus:ring-[#4facfe]/15 focus:outline-none dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:border-[#4facfe] dark:focus:bg-slate-800'

  return (
    <main className="pt-28 pb-20 sm:pt-36">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold text-sky-700 dark:border-sky-800/70 dark:bg-sky-950/60 dark:text-[#4facfe]">
          <CalendarCheck className="h-3.5 w-3.5" /> Free 30-Minute Strategy Session
        </div>
        <h1 className="mt-5 text-3xl font-extrabold text-slate-900 sm:text-5xl dark:text-white">
          Book Your Free <span className="brand-gradient-text">Consultation</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
          Let&apos;s discuss your website, SaaS product, or custom business software and map out a
          clear technical plan, timeline, and quote—zero obligation.
        </p>
      </section>

      {/* Process */}
      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((item, idx) => (
            <Reveal key={item.step} delayMs={idx * 70}>
              <div className="h-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-[#111c33]">
                <span className="brand-gradient-bg inline-flex h-10 w-10 items-center justify-center rounded-xl font-['Montserrat'] text-sm font-extrabold text-white">
                  {item.step}
                </span>
                <h2 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Consultation Form & Benefits */}
      <section
        id="consultation-form"
        className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
              What You&apos;ll Get in <span className="brand-gradient-text">30 Minutes</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Speak directly with the builders behind Let It Grow, PostPulse, and Pathology Lab
              SaaS—not a scripted sales rep.
            </p>
            <ul className="mt-6 space-y-3.5 text-sm text-slate-700 dark:text-slate-200">
              {[
                'Clear recommendation on Website vs. Custom Software vs. SaaS architecture',
                'Honest timeline and transparent INR budget breakdown',
                'Live walkthrough of PostPulse or Pathology Lab SaaS (if relevant)',
                'Actionable next steps you can use immediately—even if we don’t work together',
              ].map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-[#111c33]">
              <p className="text-xs font-bold tracking-wider text-sky-600 uppercase dark:text-[#4facfe]">
                Prefer a Quick Call or Chat?
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href={BRAND.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-800 transition hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:text-slate-200"
                >
                  <Phone className="h-3.5 w-3.5" /> {BRAND.phoneDisplay}
                </a>
                <a
                  href={BRAND.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Now
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delayMs={80}>
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-9 dark:border-slate-800 dark:bg-[#111c33]">
              {status === 'success' ? (
                <div className="py-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
                    Consultation Request Received!
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
                    Thank you! We&apos;ll reach out within 24 hours to lock in your free 30-minute
                    call.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="rounded-full border border-slate-300 px-5 py-2.5 text-xs font-semibold text-slate-700 dark:border-slate-600 dark:text-slate-200"
                    >
                      Submit Another Request
                    </button>
                    <a
                      href={BRAND.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white"
                    >
                      Confirm Immediately on WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
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
                        htmlFor="firstName"
                        className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200"
                      >
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200"
                      >
                        Last Name *
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="consult-email"
                        className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200"
                      >
                        Email Address *
                      </label>
                      <input
                        id="consult-email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="consult-phone"
                        className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200"
                      >
                        Phone / WhatsApp *
                      </label>
                      <input
                        id="consult-phone"
                        name="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98XXXXXXXX"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="company"
                        className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200"
                      >
                        Company / Business Name
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Optional"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="consult-service"
                        className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200"
                      >
                        Service Interested In *
                      </label>
                      <select
                        id="consult-service"
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
                            {s.consultationValue}
                          </option>
                        ))}
                        <option value="PostPulse SaaS Inquiry">PostPulse SaaS Inquiry</option>
                        <option value="Pathology Lab SaaS Inquiry">
                          Pathology Lab SaaS Inquiry
                        </option>
                        <option value="Multiple / Not Sure">Multiple Services / Need Advice</option>
                      </select>
                    </div>
                  </div>

                  <fieldset>
                    <legend className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Project Timeline *
                    </legend>
                    <div className="grid gap-2.5 sm:grid-cols-3">
                      {TIMELINES.map((opt) => (
                        <label
                          key={opt}
                          className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-medium transition ${
                            timeline === opt
                              ? 'border-sky-500 bg-sky-50 text-sky-800 dark:border-[#4facfe] dark:bg-sky-950/60 dark:text-[#4facfe]'
                              : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="timeline"
                            value={opt}
                            checked={timeline === opt}
                            onChange={(e) => setTimeline(e.target.value)}
                            className="accent-sky-500"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label
                      htmlFor="budget"
                      className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200"
                    >
                      Estimated Budget (INR)
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select budget range (optional)</option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="consult-message"
                      className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200"
                    >
                      Project Details *
                    </label>
                    <textarea
                      id="consult-message"
                      name="message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your business, goals, and key features you need..."
                      className={inputClass}
                    />
                  </div>

                  {status === 'error' && (
                    <div
                      role="alert"
                      className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="brand-gradient-bg brand-glow inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white disabled:opacity-70"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      'Schedule My Free Consultation'
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto mt-24 max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
              Frequently Asked <span className="brand-gradient-text">Questions</span>
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Quick answers about how we work, pricing, and custom software projects.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 space-y-3">
          {CONSULTATION_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-[#111c33]"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-semibold text-slate-900 transition hover:bg-sky-50/50 dark:text-white dark:hover:bg-slate-800/60"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-sky-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-slate-100 px-6 py-4 text-sm leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
