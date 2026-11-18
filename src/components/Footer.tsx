import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Mail, MapPin, Send, Sprout } from 'lucide-react'
import { BRAND, SERVICES } from '../data/siteData'
import { submitLead } from '../utils/submitLead'

export function Footer() {
  const [email, setEmail] = useState('')
  const [botField, setBotField] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('submitting')
    setErrorMsg('')

    const res = await submitLead({
      formType: 'newsletter',
      botField,
      email: email.trim(),
    })

    if (res.ok) {
      setStatus('success')
      setEmail('')
    } else {
      setStatus('error')
      setErrorMsg(res.error || 'Could not subscribe right now.')
    }
  }

  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-200 dark:bg-[#070b14]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + Newsletter */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="brand-gradient-bg flex h-9 w-9 items-center justify-center rounded-xl text-white">
                <Sprout className="h-5 w-5" />
              </span>
              <span className="brand-gradient-text font-['Montserrat'] text-xl font-extrabold">
                {BRAND.name}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Engineering modern business websites, scalable SaaS platforms, and custom software
              tailored to help your business grow.
            </p>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white">Product &amp; Launch Updates</h4>
              <form onSubmit={handleNewsletterSubmit} className="mt-3">
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
                <div className="flex overflow-hidden rounded-full border border-slate-700 bg-slate-800/80 focus-within:border-[#4facfe]">
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    aria-label="Subscribe to newsletter"
                    className="brand-gradient-bg flex items-center justify-center px-4 text-white transition hover:opacity-90 disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                {status === 'success' && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Subscribed! Thanks for joining.
                  </p>
                )}
                {status === 'error' && <p className="mt-2 text-xs text-rose-400">{errorMsg}</p>}
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Montserrat'] text-base font-bold text-white">Quick Links</h4>
            <div className="brand-gradient-bg mt-2 h-0.5 w-10 rounded-full" />
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/" className="text-slate-400 transition hover:text-[#4facfe]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-slate-400 transition hover:text-[#4facfe]">
                  Portfolio &amp; SaaS Products
                </Link>
              </li>
              <li>
                <Link to="/consultation" className="text-slate-400 transition hover:text-[#4facfe]">
                  Free Consultation
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-slate-400 transition hover:text-[#4facfe]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-slate-400 transition hover:text-[#4facfe]"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-['Montserrat'] text-base font-bold text-white">Services</h4>
            <div className="brand-gradient-bg mt-2 h-0.5 w-10 rounded-full" />
            <ul className="mt-5 space-y-3 text-sm">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/consultation?service=${encodeURIComponent(service.consultationValue)}`}
                    className="text-slate-400 transition hover:text-[#4facfe]"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className="font-['Montserrat'] text-base font-bold text-white">Contact Us</h4>
            <div className="brand-gradient-bg mt-2 h-0.5 w-10 rounded-full" />
            <ul className="mt-5 space-y-3.5 text-sm text-slate-400">
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-2.5 transition hover:text-[#4facfe]"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#4facfe]" />
                  <span>{BRAND.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#4facfe]" />
                <span>{BRAND.location}</span>
              </li>
            </ul>
            <Link
              to="/consultation"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-xs font-semibold text-sky-300 transition hover:bg-sky-500/20"
            >
              Book Free Consultation →
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-xs text-slate-400 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="transition hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
