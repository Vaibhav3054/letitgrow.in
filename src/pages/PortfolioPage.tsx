import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Building2, CheckCircle2, Layers } from 'lucide-react'
import { PROJECTS, type ProjectCategory } from '../data/siteData'
import { Reveal } from '../components/Reveal'
import { ProjectCard } from '../components/ProjectCard'
import { ContactForm } from '../components/ContactForm'

const FILTERS: Array<{ id: ProjectCategory; label: string }> = [
  { id: 'all', label: 'All Projects (3)' },
  { id: 'saas', label: 'SaaS Platforms (2)' },
  { id: 'website', label: 'Websites (1)' },
]

export function PortfolioPage() {
  const [filter, setFilter] = useState<ProjectCategory>('all')

  useEffect(() => {
    document.title = 'Portfolio & SaaS Products | Let It Grow'
  }, [])

  const filtered =
    filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)

  return (
    <main className="pt-28 pb-20 sm:pt-36">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold text-sky-700 dark:border-sky-800/70 dark:bg-sky-950/60 dark:text-[#4facfe]">
          <Layers className="h-3.5 w-3.5" /> Real Live Products · Zero Mockups
        </div>
        <h1 className="mx-auto mt-5 max-w-3xl text-3xl font-extrabold text-slate-900 sm:text-5xl dark:text-white">
          Our Flagship <span className="brand-gradient-text">SaaS Platforms</span> &amp; Client
          Websites
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
          Every project below is live in production. Explore our multi-tenant SaaS products—
          <strong>PostPulse</strong> and <strong>Pathology Lab SaaS</strong>—alongside our client
          website <strong>AryaFlow</strong>.
        </p>

        {/* Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="mt-9 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 shadow-xs dark:border-slate-800 dark:bg-[#111c33]"
        >
          {FILTERS.map((f) => {
            const active = filter === f.id
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition sm:text-sm ${
                  active
                    ? 'brand-gradient-bg text-white shadow-sm'
                    : 'text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-[#4facfe]'
                }`}
              >
                {f.label}
              </button>
            )
          })}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {filtered.map((project, idx) => (
            <Reveal key={project.id} delayMs={idx * 80}>
              <ProjectCard project={project} detailed />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Custom Software Capabilities Banner */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid items-center gap-8 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm lg:grid-cols-12 sm:p-10 dark:border-slate-800 dark:bg-[#111c33]">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                <Building2 className="h-3.5 w-3.5" /> Custom Business Software
              </span>
              <h2 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                Need Software Built <span className="brand-gradient-text">Exclusively</span> for
                Your Business?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Beyond our flagship SaaS products, we design and engineer tailor-made internal
                tools, customer portals, billing systems, and automation software customized to your
                industry and workflow.
              </p>
              <ul className="mt-5 grid gap-2.5 text-xs text-slate-700 sm:grid-cols-2 dark:text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Diagnostic Labs &amp; Clinics
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Agencies &amp; Creators
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Retail, Billing &amp; Inventory
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Startups &amp; SaaS MVPs
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-5 lg:items-end">
              <Link
                to="/consultation?service=Custom%20Business%20Software"
                className="brand-gradient-bg brand-glow inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white"
              >
                Request Custom Software Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Free 30-min architecture &amp; cost estimate
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Contact Section on Portfolio Page */}
      <section className="mx-auto mt-20 max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-lg shadow-slate-900/5 sm:p-10 dark:border-slate-800 dark:bg-[#111c33]">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Want to Build Something <span className="brand-gradient-text">Like This?</span>
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Send us a quick note about your website, SaaS product, or custom software idea.
              </p>
            </div>
            <ContactForm />
          </div>
        </Reveal>
      </section>
    </main>
  )
}
