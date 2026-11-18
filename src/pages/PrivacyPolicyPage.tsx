import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { BRAND } from '../data/siteData'

export function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy | Let It Grow'
  }, [])

  return (
    <main className="pt-28 pb-20 sm:pt-36">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold text-sky-700 dark:border-sky-800/70 dark:bg-sky-950/60 dark:text-[#4facfe]">
            <Shield className="h-3.5 w-3.5" /> Legal &amp; Privacy
          </span>
          <h1 className="mt-5 text-3xl font-extrabold text-slate-900 sm:text-5xl dark:text-white">
            Privacy <span className="brand-gradient-text">Policy</span>
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Learn how {BRAND.name} collects, uses, and safeguards your information.
          </p>
        </div>

        <article className="mt-12 space-y-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-10 dark:border-slate-800 dark:bg-[#111c33]">
          <div className="rounded-2xl border-l-4 border-sky-500 bg-sky-50/70 p-4 text-xs font-medium text-slate-700 dark:bg-sky-950/40 dark:text-slate-200">
            Last updated: November 2026
          </div>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            At {BRAND.name}, we respect your privacy and are committed to protecting your personal
            information. This Privacy Policy explains how we collect, use, and protect your data
            when you visit <strong>www.letitgrow.in</strong>, book a consultation, or use our
            websites, SaaS platforms, and custom software services.
          </p>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              1. Information We Collect
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
              <li>
                <strong>Contact &amp; Inquiry Details:</strong> Name, email address, phone/WhatsApp
                number, company name, and project details submitted via our contact, consultation,
                or newsletter forms.
              </li>
              <li>
                <strong>Technical &amp; Usage Data:</strong> Standard server logs such as IP
                address, browser type, device category, and requested URLs for security and
                reliability.
              </li>
              <li>
                <strong>Local Preferences:</strong> Theme preference (light or dark mode) stored
                locally in your browser.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
              <li>Respond to inquiries, consultation bookings, and project requests.</li>
              <li>Deliver, maintain, and improve our web, SaaS, and custom software services.</li>
              <li>Send product updates or announcements if you opt into our newsletter.</li>
              <li>Protect our systems against spam, abuse, and unauthorized activity.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              3. Sharing &amp; Service Providers
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              We do not sell or rent your personal information. We only share data with trusted
              infrastructure providers necessary to operate this website (such as Netlify for
              hosting/forms and Resend for transactional email delivery) or when required by law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              4. Data Security &amp; Retention
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              All communication with our site is encrypted over HTTPS. We retain inquiry records
              only as long as needed to communicate with you, fulfill services, or meet legal
              obligations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">5. Your Rights</h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              You may request access, correction, or deletion of your submitted personal details at
              any time by contacting us directly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">6. Contact Us</h2>
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
              <li>
                <strong>Location:</strong> {BRAND.location}
              </li>
            </ul>
          </section>

          <div className="border-t border-slate-100 pt-6 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            Also review our{' '}
            <Link to="/terms-of-service" className="font-semibold text-sky-600 hover:underline dark:text-[#4facfe]">
              Terms of Service
            </Link>
            .
          </div>
        </article>
      </div>
    </main>
  )
}
