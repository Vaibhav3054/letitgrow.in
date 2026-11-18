import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, Moon, Sprout, Sun, X } from 'lucide-react'
import { BRAND } from '../data/siteData'
import { useTheme } from '../context/ThemeContext'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const handleSectionLink = (sectionId: string) => {
    setMenuOpen(false)
    if (pathname === '/') {
      const target = document.getElementById(sectionId)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    navigate(`/#${sectionId}`)
  }

  const navLinkClass = (active: boolean) =>
    `relative text-sm font-medium transition-colors ${
      active
        ? 'text-sky-600 dark:text-[#4facfe]'
        : 'text-slate-700 hover:text-sky-600 dark:text-slate-200 dark:hover:text-[#4facfe]'
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-[#0b1120]/90'
          : 'bg-white/75 backdrop-blur-sm dark:bg-[#0b1120]/75'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex items-center gap-2.5 text-xl font-extrabold tracking-tight"
          aria-label={`${BRAND.name} home`}
        >
          <span className="brand-gradient-bg flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-md shadow-sky-400/25 transition-transform duration-300 group-hover:scale-105">
            <Sprout className="h-5 w-5" />
          </span>
          <span className="brand-gradient-text font-['Montserrat'] text-xl font-extrabold">
            {BRAND.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          <Link to="/" className={navLinkClass(pathname === '/')}>
            Home
          </Link>
          <button
            type="button"
            onClick={() => handleSectionLink('services')}
            className={navLinkClass(false)}
          >
            Services
          </button>
          <Link to="/portfolio" className={navLinkClass(pathname === '/portfolio')}>
            Portfolio &amp; SaaS
          </Link>
          <button
            type="button"
            onClick={() => handleSectionLink('about')}
            className={navLinkClass(false)}
          >
            About
          </button>
          <Link to="/consultation" className={navLinkClass(pathname === '/consultation')}>
            Consultation
          </Link>
          <button
            type="button"
            onClick={() => handleSectionLink('contact')}
            className={navLinkClass(false)}
          >
            Contact
          </button>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:border-[#4facfe] dark:hover:text-[#4facfe]"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/consultation"
            className="brand-gradient-bg brand-glow inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white"
          >
            Free Consultation
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white/95 px-4 pt-3 pb-6 shadow-xl backdrop-blur-md lg:hidden dark:border-slate-800 dark:bg-[#0b1120]/95">
          <div className="flex flex-col gap-1">
            <Link
              to="/"
              className="rounded-xl px-4 py-3 text-base font-medium text-slate-800 hover:bg-sky-50 hover:text-sky-600 dark:text-slate-100 dark:hover:bg-slate-800/80 dark:hover:text-[#4facfe]"
            >
              Home
            </Link>
            <button
              type="button"
              onClick={() => handleSectionLink('services')}
              className="rounded-xl px-4 py-3 text-left text-base font-medium text-slate-800 hover:bg-sky-50 hover:text-sky-600 dark:text-slate-100 dark:hover:bg-slate-800/80 dark:hover:text-[#4facfe]"
            >
              Services
            </button>
            <Link
              to="/portfolio"
              className="rounded-xl px-4 py-3 text-base font-medium text-slate-800 hover:bg-sky-50 hover:text-sky-600 dark:text-slate-100 dark:hover:bg-slate-800/80 dark:hover:text-[#4facfe]"
            >
              Portfolio &amp; SaaS
            </Link>
            <button
              type="button"
              onClick={() => handleSectionLink('about')}
              className="rounded-xl px-4 py-3 text-left text-base font-medium text-slate-800 hover:bg-sky-50 hover:text-sky-600 dark:text-slate-100 dark:hover:bg-slate-800/80 dark:hover:text-[#4facfe]"
            >
              About
            </button>
            <Link
              to="/consultation"
              className="rounded-xl px-4 py-3 text-base font-medium text-slate-800 hover:bg-sky-50 hover:text-sky-600 dark:text-slate-100 dark:hover:bg-slate-800/80 dark:hover:text-[#4facfe]"
            >
              Consultation
            </Link>
            <button
              type="button"
              onClick={() => handleSectionLink('contact')}
              className="rounded-xl px-4 py-3 text-left text-base font-medium text-slate-800 hover:bg-sky-50 hover:text-sky-600 dark:text-slate-100 dark:hover:bg-slate-800/80 dark:hover:text-[#4facfe]"
            >
              Contact
            </button>
            <Link
              to="/consultation"
              className="brand-gradient-bg mt-3 inline-flex items-center justify-center rounded-full px-5 py-3 text-center text-sm font-semibold text-white shadow-md"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
