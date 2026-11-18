import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { BRAND } from '../data/siteData'

export function TermsOfServicePage() {
  useEffect(() => {
    document.title = 'Terms of Service | Let It Grow'
  }, [])

  return (
    <main className="pt-28 pb-20 sm:pt-36">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold text-sky-700 dark:border-sky-800/70 dark:bg-sky-950/60 dark:text-[#4facfe]">
            <FileText className="h-3.5 w-3.5" /> Terms &amp; Agreements
          </span>
          <h1 className="mt-5 text-3xl font-extrabold text-slate-900 sm:text-5xl dark:text-white">
            Terms of <span className="brand-gradient-text">Service</span>
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Policies, user responsibilities, and service terms for {BRAND.name}.
          </p>
        </div>

        <article className="mt-12 space-y-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-10 dark:border-slate-800 dark:bg-[#111c33]">
          <div className="rounded-2xl border-l-4 border-sky-500 bg-sky-50/70 p-4 text-xs font-medium text-slate-700 dark:bg-sky-950/40 dark:text-slate-200">
            Last updated: November 2026
          </div>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Welcome to {BRAND.name}. By accessing <strong>www.letitgrow.in</strong> or engaging our
            web development, SaaS platform, or custom software services, you agree to the terms
            below.
          </p>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Services</h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {BRAND.name} provides website development, SaaS platform engineering and subscriptions
              (including PostPulse and Pathology Lab SaaS), custom business software, UI/UX design,
              and related technical services. Specific deliverables, timelines, and support SLAs are
              governed by each client&apos;s written project proposal or SaaS subscription agreement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              2. User Responsibilities
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
              <li>Provide accurate contact and business details when submitting forms.</li>
              <li>Use our website and software lawfully without attempting unauthorized access.</li>
              <li>Ensure you hold rights to any brand assets, logos, or copy provided to us.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              3. Intellectual Property
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Website content, branding, and proprietary SaaS platforms owned by {BRAND.name} remain
              our intellectual property. Ownership of custom client deliverables transfers as
              specified in the client&apos;s signed project agreement upon full payment.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              4. Payments &amp; Refunds
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Project milestones, invoicing schedules, and SaaS subscription fees are agreed upon
              before work or paid access begins. Refund eligibility follows the terms stated in the
              applicable client agreement or individual SaaS product policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              5. Limitation of Liability
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              While we engineer reliable software and maintain best security practices,{' '}
              {BRAND.name} is not liable for indirect, incidental, or consequential damages arising
              from use of this website or third-party service outages.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">6. Governing Law</h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              These Terms are governed by the laws of India, with jurisdiction in Bhopal, Madhya
              Pradesh.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">7. Contact Us</h2>
            <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
              <li>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${BRAND.email}`} className="text-sky-600 hover:underline dark:text-[#4facfe]">
                  {BRAND.email}
                </a>
              </li>
              <li>
                <strong>Phone / WhatsApp:</strong>{' '}
                <a href={BRAND.phoneHref} className="text-sky-600 hover:underline dark:text-[#4facfe]">
                  {BRAND.phoneDisplay}
                </a>
              </li>
            </ul>
          </section>

          <div className="border-t border-slate-100 pt-6 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            Also review our{' '}
            <Link to="/privacy-policy" className="font-semibold text-sky-600 hover:underline dark:text-[#4facfe]">
              Privacy Policy
            </Link>
            .
          </div>
        </article>
      </div>
    </main>
  )
}
