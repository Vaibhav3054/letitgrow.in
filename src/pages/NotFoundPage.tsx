import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'

export function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found | Let It Grow'
  }, [])

  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 pt-28 pb-20">
      <div className="max-w-lg text-center">
        <p className="brand-gradient-text font-['Montserrat'] text-7xl font-extrabold">404</p>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          The link may have moved during our website redesign. Head back home or explore our live
          SaaS platforms and services.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="brand-gradient-bg brand-glow inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
          >
            <Home className="h-4 w-4" /> Go to Home
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:text-slate-200"
          >
            <ArrowLeft className="h-4 w-4" /> View Portfolio
          </Link>
        </div>
      </div>
    </main>
  )
}
