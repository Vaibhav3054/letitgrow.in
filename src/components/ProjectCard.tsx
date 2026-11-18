import { Link } from 'react-router-dom'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import type { ProjectItem } from '../data/siteData'

interface ProjectCardProps {
  project: ProjectItem
  detailed?: boolean
}

export function ProjectCard({ project, detailed = false }: ProjectCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10 dark:border-slate-800 dark:bg-[#111c33] dark:hover:border-[#4facfe]/50">
      {/* Browser preview bar */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/90 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
            project.category === 'saas'
              ? 'bg-sky-500/12 text-sky-700 dark:bg-[#4facfe]/15 dark:text-[#4facfe]'
              : 'bg-emerald-500/12 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
          }`}
        >
          {project.badge}
        </span>
      </div>

      {/* Screenshot preview */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={project.image}
          alt={`${project.name} — ${project.tagline}`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-wider text-sky-600 uppercase dark:text-[#4facfe]">
          {project.categoryLabel}
        </p>
        <h3 className="mt-1.5 text-xl font-bold text-slate-900 dark:text-white">{project.name}</h3>
        <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
          {project.tagline}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {project.description}
        </p>

        {detailed && (
          <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-300">
            {project.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-sky-200/70 bg-sky-50 px-2.5 py-1 text-[11px] font-medium text-sky-800 dark:border-sky-900/60 dark:bg-sky-950/50 dark:text-sky-300"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="brand-gradient-bg brand-glow inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-semibold text-white"
          >
            Visit Live Product <ArrowUpRight className="h-4 w-4" />
          </a>
          <Link
            to={`/consultation?service=${encodeURIComponent(project.consultationService)}`}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-[#4facfe] dark:hover:text-[#4facfe]"
          >
            Build Similar
          </Link>
        </div>
      </div>
    </article>
  )
}
