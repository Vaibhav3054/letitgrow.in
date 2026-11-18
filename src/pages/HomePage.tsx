import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Cpu,
  Globe,
  Layers,
  Mail,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react'
import {
  BRAND,
  PROCESS_STEPS,
  PROJECTS,
  SERVICES,
  STATS,
  TECH_STACK,
  TESTIMONIALS,
  type ServiceItem,
} from '../data/siteData'
import { Reveal } from '../components/Reveal'
import { ProjectCard } from '../components/ProjectCard'
import { ContactForm } from '../components/ContactForm'

const HERO_PHRASES = [
  'Growing Businesses',
  'SaaS Platforms',
  'Custom Software',
  'Ambitious Startups',
]

function ServiceIcon({ name }: { name: ServiceItem['icon'] }) {
  switch (name) {
    case 'globe':
      return <Globe className="h-6 w-6" />
    case 'layers':
      return <Layers className="h-6 w-6" />
    case 'cpu':
      return <Cpu className="h-6 w-6" />
    case 'sparkles':
      return <Sparkles className="h-6 w-6" />
  }
}

export function HomePage() {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [typed, setTyped] = useState(HERO_PHRASES[0])
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    document.title = 'Let It Grow | Websites, SaaS Platforms & Custom Software Agency'
  }, [])

  // Lightweight typing effect (zero external library bloat, starts with full SEO-friendly phrase)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const currentFull = HERO_PHRASES[phraseIdx]
    const delay = deleting
      ? 45
      : typed === currentFull
        ? 2200
        : 75

    const timer = window.setTimeout(() => {
      if (!deleting && typed === currentFull) {
        setDeleting(true)
      } else if (deleting && typed.length === 0) {
        setDeleting(false)
        setPhraseIdx((prev) => (prev + 1) % HERO_PHRASES.length)
      } else if (deleting) {
        setTyped(currentFull.slice(0, typed.length - 1))
      } else {
        setTyped(currentFull.slice(0, typed.length + 1))
      }
    }, delay)

    return () => window.clearTimeout(timer)
  }, [typed, deleting, phraseIdx])

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-sky-50/90 px-4 py-1.5 text-xs font-semibold text-sky-700 shadow-xs dark:border-sky-800/70 dark:bg-sky-950/60 dark:text-[#4facfe]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Accepting New Projects · Websites, SaaS &amp; Custom Software
            </div>

            <h1 className="mt-6 text-4xl leading-[1.15] font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem] dark:text-white">
              Digital Solutions For{' '}
              <span className="brand-gradient-text inline-block min-h-[1.2em]">
                {typed}
                <span className="typing-caret ml-0.5 inline-block text-sky-500" aria-hidden="true">
                  |
                </span>
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
              We engineer high-converting websites, scalable SaaS platforms like{' '}
              <strong className="font-semibold text-slate-800 dark:text-white">
                Pathology Lab SaaS
              </strong>
              , and tailor-made business software built around your exact operations.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/consultation"
                className="brand-gradient-bg brand-glow inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white"
              >
                Get Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border-2 border-sky-400/70 bg-white/80 px-7 py-3.5 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-sky-500 hover:bg-sky-50 dark:border-[#4facfe]/60 dark:bg-slate-900/60 dark:text-white dark:hover:bg-slate-800"
              >
                Explore Our Products
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Websites &amp; Landing Pages
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Production SaaS Products
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Custom Software per Business
              </span>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-lg">
              <div
                aria-hidden="true"
                className="brand-gradient-bg absolute -inset-4 rounded-3xl opacity-15 blur-2xl"
              />
              <div className="relative rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-2xl shadow-sky-500/10 backdrop-blur-sm dark:border-slate-800 dark:bg-[#111c33]/90">
                <img
                  src="/images/hero-illustration.svg"
                  alt="Let It Grow digital engineering illustration"
                  className="animate-float-slow mx-auto w-full max-w-md"
                />
                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                  <div className="rounded-xl bg-sky-50/80 p-3 dark:bg-sky-950/40">
                    <p className="text-[11px] font-semibold text-sky-700 uppercase dark:text-[#4facfe]">
                      Flagship SaaS
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">
                      Pathology Lab SaaS
                    </p>
                  </div>
                  <div className="rounded-xl bg-emerald-50/80 p-3 dark:bg-emerald-950/30">
                    <p className="text-[11px] font-semibold text-emerald-700 uppercase dark:text-emerald-400">
                      Custom Built
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">
                      Tailored to Every Biz
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-y border-slate-200/70 bg-gradient-to-r from-sky-50/70 via-white to-cyan-50/70 py-12 dark:border-slate-800/80 dark:from-[#0f172a] dark:via-[#111c33] dark:to-[#0f172a]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map((stat, idx) => (
            <Reveal key={stat.label} delayMs={idx * 75}>
              <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-6 text-center shadow-xs transition hover:-translate-y-0.5 hover:border-sky-300 dark:border-slate-800 dark:bg-[#111c33]/90 dark:hover:border-[#4facfe]/40">
                <div className="brand-gradient-text font-['Montserrat'] text-3xl font-extrabold sm:text-4xl">
                  {stat.value}
                  {stat.suffix}
                </div>
                <p className="mt-1.5 text-sm font-bold text-slate-900 dark:text-white">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{stat.sublabel}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold tracking-widest text-sky-600 uppercase dark:text-[#4facfe]">
                What We Build
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
                Tech Services Engineered for <span className="brand-gradient-text">Growth</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                From conversion-ready websites to multi-tenant SaaS products and custom software
                designed exclusively for your business workflow.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {SERVICES.map((service, idx) => (
              <Reveal key={service.id} delayMs={idx * 80}>
                <div className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10 dark:border-slate-800 dark:bg-[#111c33] dark:hover:border-[#4facfe]/50">
                  <div className="brand-gradient-bg flex h-13 w-13 items-center justify-center rounded-2xl text-white shadow-md shadow-sky-400/25">
                    <ServiceIcon name={service.icon} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    {service.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-sky-50 px-3 py-1 text-[11px] font-semibold text-sky-700 dark:bg-sky-950/60 dark:text-[#4facfe]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-6">
                    <Link
                      to={`/consultation?service=${encodeURIComponent(service.consultationValue)}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 transition group-hover:gap-2.5 dark:text-[#4facfe]"
                    >
                      Discuss {service.shortTitle} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship SaaS & Portfolio Section */}
      <section
        id="portfolio"
        className="scroll-mt-24 border-y border-slate-200/70 bg-gradient-to-b from-sky-50/50 via-white to-slate-50 py-20 sm:py-24 dark:border-slate-800/80 dark:from-[#0e1729] dark:via-[#0b1120] dark:to-[#0e1729]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-bold tracking-widest text-sky-600 uppercase dark:text-[#4facfe]">
                  Live Products &amp; Client Work
                </p>
                <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
                  Our Flagship <span className="brand-gradient-text">SaaS &amp; Websites</span>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Real, live software and websites built and shipped by Let It Grow—explore them
                  directly in your browser.
                </p>
              </div>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-white px-5 py-2.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-50 dark:border-sky-800 dark:bg-slate-900 dark:text-[#4facfe] dark:hover:bg-slate-800"
              >
                View Full Showcase <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
            {PROJECTS.map((project, idx) => (
              <Reveal key={project.id} delayMs={idx * 90}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-4 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-[#111c33]">
              <img
                src="/images/team.jpg"
                alt="Let It Grow engineering and design team illustration"
                loading="lazy"
                className="w-full rounded-2xl object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delayMs={100}>
            <p className="text-xs font-bold tracking-widest text-sky-600 uppercase dark:text-[#4facfe]">
              About {BRAND.name}
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
              Helping Businesses <span className="brand-gradient-text">Blossom</span> With Real
              Software
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              Founded in {BRAND.foundedYear} in Bhopal, {BRAND.name} is an agile software &amp; web
              engineering studio dedicated to helping startups and established businesses modernize
              their operations online.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              We don&apos;t just hand over static templates—we build real production SaaS platforms
              and custom business applications tailored to your exact workflow, backed by
              transparent communication and direct technical support.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-[#111c33]">
                <Zap className="h-5 w-5 text-sky-500" />
                <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                  Fast Execution
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Agile sprints with live staging links every week so you see real progress fast.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-[#111c33]">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                  SaaS-Grade Code
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Clean architecture built for speed, security, and long-term maintainability.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-[#111c33]">
                <Rocket className="h-5 w-5 text-sky-500" />
                <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                  Long-Term Partner
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  From launch day to new features, we scale your software alongside your business.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process & Tech Stack Section */}
      <section className="border-y border-slate-200/70 bg-gradient-to-b from-slate-50 to-sky-50/40 py-20 sm:py-24 dark:border-slate-800/80 dark:from-[#0e1729] dark:to-[#0b1120]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold tracking-widest text-sky-600 uppercase dark:text-[#4facfe]">
                How We Deliver
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
                From Idea to <span className="brand-gradient-text">Live Launch</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((item, idx) => (
              <Reveal key={item.step} delayMs={idx * 75}>
                <div className="h-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-[#111c33]">
                  <span className="brand-gradient-bg inline-flex h-10 w-10 items-center justify-center rounded-xl font-['Montserrat'] text-sm font-extrabold text-white">
                    {item.step}
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Tech Stack */}
          <Reveal className="mt-16">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xs dark:border-slate-800 dark:bg-[#111c33]">
              <div className="text-center">
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Modern <span className="brand-gradient-text">Technology Stack</span>
                </h3>
                <p className="mt-2 text-xs text-slate-600 sm:text-sm dark:text-slate-400">
                  Battle-tested tools we use to build fast websites, SaaS platforms, and reliable
                  business software.
                </p>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {TECH_STACK.map((col) => (
                  <div
                    key={col.group}
                    className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900/50"
                  >
                    <h4 className="text-xs font-bold tracking-wider text-sky-700 uppercase dark:text-[#4facfe]">
                      {col.group}
                    </h4>
                    <div className="mt-3.5 flex flex-wrap gap-2">
                      {col.items.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-800 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold tracking-widest text-sky-600 uppercase dark:text-[#4facfe]">
                Client Feedback
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
                Trusted by <span className="brand-gradient-text">Growing Teams</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((item, idx) => (
              <Reveal key={item.name} delayMs={idx * 80}>
                <figure className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg dark:border-slate-800 dark:bg-[#111c33] dark:hover:border-[#4facfe]/40">
                  <div className="flex items-center gap-1 text-amber-400" aria-label="5 out of 5 stars">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                    <div className="brand-gradient-bg flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                      {item.initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{item.role}</div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="brand-gradient-bg relative mx-auto max-w-7xl overflow-hidden rounded-3xl px-6 py-14 text-center text-white shadow-xl shadow-sky-500/20 sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -left-16 h-52 w-52 rounded-full bg-white/15 blur-2xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-white/15 blur-2xl"
            />
            <h2 className="relative text-2xl font-extrabold sm:text-4xl">
              Ready to Build Your Website, SaaS, or Custom Software?
            </h2>
            <p className="relative mx-auto mt-4 max-w-2xl text-sm text-white/90 sm:text-base">
              Book a free 30-minute consultation to map out your scope, timeline, and budget—with
              zero obligation.
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/consultation"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-sky-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                Book Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`mailto:${BRAND.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/15 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-xs transition hover:bg-white/25"
              >
                <Mail className="h-4 w-4" /> Email {BRAND.email}
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold tracking-widest text-sky-600 uppercase dark:text-[#4facfe]">
                Get In Touch
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
                Let&apos;s Talk About <span className="brand-gradient-text">Your Project</span>
              </h2>
              <p className="mt-3 text-sm text-slate-600 sm:text-base dark:text-slate-300">
                Have a website, SaaS idea, or custom business software requirement? Reach out and
                we&apos;ll reply within 24 hours.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-12">
            <Reveal className="space-y-5 lg:col-span-5">
              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:border-sky-300 dark:border-slate-800 dark:bg-[#111c33] dark:hover:border-[#4facfe]/50"
              >
                <span className="brand-gradient-bg flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase dark:text-slate-400">
                    Email Us
                  </p>
                  <p className="text-base font-bold text-slate-900 dark:text-white">{BRAND.email}</p>
                </div>
              </a>

              <Link
                to="/consultation"
                className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:border-emerald-300 dark:border-slate-800 dark:bg-[#111c33] dark:hover:border-emerald-500/50"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white">
                  <CalendarCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase dark:text-slate-400">
                    Free Strategy Call
                  </p>
                  <p className="text-base font-bold text-slate-900 dark:text-white">
                    Book a 30-Min Consultation →
                  </p>
                </div>
              </Link>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-[#111c33]">
                <span className="brand-gradient-bg flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase dark:text-slate-400">
                    Response Time
                  </p>
                  <p className="text-base font-bold text-slate-900 dark:text-white">
                    Within 24 Hours (Mon–Sat)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-[#111c33]">
                <span className="brand-gradient-bg flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase dark:text-slate-400">
                    Based In
                  </p>
                  <p className="text-base font-bold text-slate-900 dark:text-white">
                    {BRAND.location}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-7" delayMs={100}>
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-900/5 sm:p-8 dark:border-slate-800 dark:bg-[#111c33]">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  )
}
