import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2 } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ isDark, toggleTheme, onViewAllProjects }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const handleScroll = () => {
      // becomes "pill sticky" after 80px
      setScrolled(window.scrollY > 80)

      for (const item of navItems.slice().reverse()) {
        const el = document.querySelector(item.href)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100) {
            setActive(item.label)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [mobileOpen])

  const scrollTo = (href) => {
    if (href === '#projects' && onViewAllProjects) {
      setMobileOpen(false)
      onViewAllProjects()
      return
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* ── When NOT scrolled: full-width transparent bar ─────────── */}
      <AnimatePresence initial={false}>
        {!scrolled && (
          <motion.nav
            key="flat-nav"
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
          >
            <div
              className={`max-w-7xl mx-auto flex items-center justify-between h-14 px-6 rounded-2xl backdrop-blur-md ${isDark
                  ? 'bg-white/[0.04] border border-white/[0.08]'
                  : 'bg-black/[0.03] border border-black/[0.06]'
                }`}
            >
              {/* Logo */}
              <Logo isDark={isDark} onClick={() => scrollTo('#home')} />

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <NavItem
                    key={item.label}
                    item={item}
                    active={active === item.label}
                    isDark={isDark}
                    onClick={() => scrollTo(item.href)}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <ResumeDownloadBtn isDark={isDark} />
                <ThemeToggle isDark={isDark} toggle={toggleTheme} />
                <MobileMenuBtn isDark={isDark} open={mobileOpen} toggle={() => setMobileOpen(!mobileOpen)} />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── When scrolled: compact floating pill ──────────────────── */}
      <AnimatePresence initial={false}>
        {scrolled && (
          <motion.nav
            key="pill-nav"
            initial={{ opacity: 0, y: -60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -60, scale: 0.92 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-2 sm:top-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 z-50 w-auto sm:w-max"
          >
            <div
              className={`flex items-center gap-2 h-12 px-4 rounded-full backdrop-blur-2xl border transition-all ${isDark
                  ? 'bg-[#130f2a]/90 border-indigo-500/30 shadow-[0_4px_30px_rgba(99,102,241,0.25)]'
                  : 'bg-white/90 border-indigo-200 shadow-[0_4px_30px_rgba(99,102,241,0.12)]'
                }`}
            >
              {/* Logo compact */}
              <Logo isDark={isDark} onClick={() => scrollTo('#home')} compact />

              {/* Divider */}
              <div className={`w-px h-5 mx-1 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-0.5">
                {navItems.map((item) => (
                  <NavItem
                    key={item.label}
                    item={item}
                    active={active === item.label}
                    isDark={isDark}
                    onClick={() => scrollTo(item.href)}
                    compact
                  />
                ))}
              </div>

              {/* Divider */}
              <div className={`w-px h-5 mx-1 hidden md:block ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />

              <div className="flex items-center gap-2">
                <ResumeDownloadBtn isDark={isDark} />
                <ThemeToggle isDark={isDark} toggle={toggleTheme} />
                <MobileMenuBtn isDark={isDark} open={mobileOpen} toggle={() => setMobileOpen(!mobileOpen)} />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-[4.5rem] left-4 right-4 z-40 rounded-2xl overflow-hidden backdrop-blur-2xl ${isDark
                ? 'bg-[#130f2a]/96 border border-indigo-500/20'
                : 'bg-white/96 border border-indigo-100'
              } shadow-2xl`}
          >
            <div className="p-3 flex flex-col gap-2 max-h-[calc(100vh-8rem)] overflow-y-auto">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => scrollTo(item.href)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-body font-medium transition-all ${active === item.label
                      ? isDark
                        ? 'text-indigo-300 bg-indigo-500/15 border border-indigo-500/25'
                        : 'text-indigo-600 bg-indigo-50 border border-indigo-200'
                      : isDark
                        ? 'text-gray-200 hover:bg-white/5 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  {item.label}
                </motion.button>
              ))}

              {/* Mobile Resume button */}
              <motion.a
                href="/assets/Anuj_Kumar_Resume.pdf"
                download="Anuj_Kumar_Resume.pdf"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`mt-2 flex items-center justify-center gap-2 w-full py-4 rounded-xl font-body font-bold text-sm ${
                  isDark
                    ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                    : 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Logo ──────────────────────────────────────────────────────── */
function Logo({ isDark, onClick, compact }) {
  return (
    <motion.div
      className="flex items-center gap-2 cursor-pointer flex-shrink-0"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      <div
        className={`p-1.5 rounded-lg ${isDark
            ? 'bg-indigo-500/20 border border-indigo-400/40 shadow-[0_0_10px_rgba(99,102,241,0.35)]'
            : 'bg-indigo-100 border border-indigo-300'
          }`}
      >
        <Code2 size={compact ? 15 : 17} className="text-indigo-400" />
      </div>
      {!compact && (
        <span
          className={`font-display font-bold text-lg tracking-tight  ${isDark ? 'text-white' : 'text-gray-900'
            }`}
        >
          Portfolio
        </span>
      )}
    </motion.div>
  )
}

/* ── NavItem ───────────────────────────────────────────────────── */
function NavItem({ item, active, isDark, onClick, compact }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className={`relative px-3 py-1.5 rounded-full text-sm font-body font-semibold transition-colors ${active
          ? isDark
            ? 'text-indigo-300'
            : 'text-indigo-600'
          : isDark
            ? 'text-gray-200 hover:text-white'   /* ← visible in dark */
            : 'text-gray-700 hover:text-indigo-700' /* ← visible in light */
        }`}
    >
      {active && (
        <motion.div
          layoutId="nav-active-pill"
          className={`absolute inset-0 rounded-full ${isDark
              ? 'bg-indigo-500/20 border border-indigo-400/30'
              : 'bg-indigo-100 border border-indigo-200'
            }`}
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        />
      )}
      <span className="relative z-10">{item.label}</span>
    </motion.button>
  )
}

/* ── Mobile menu button ────────────────────────────────────────── */
function MobileMenuBtn({ isDark, open, toggle }) {
  return (
    <button
      className={`md:hidden p-1.5 rounded-full transition-colors ${isDark ? 'text-gray-200 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
        }`}
      onClick={toggle}
    >
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
            <X size={18} />
          </motion.span>
        ) : (
          <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
            <Menu size={18} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

/* ── Scroll progress bar ───────────────────────────────────────── */
function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const upd = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', upd, { passive: true })
    return () => window.removeEventListener('scroll', upd)
  }, [])
  return (
    <div
      className="fixed top-0 left-0 z-[9999] h-[2.5px] pointer-events-none"
      style={{
        width: `${pct}%`,
        background: 'linear-gradient(90deg,#6366f1,#a855f7,#3b82f6)',
        transition: 'width 0.1s linear',
      }}
    />
  )
}

/* ── Resume Download Button ────────────────────────────────────── */
function ResumeDownloadBtn({ isDark }) {
  return (
    <motion.a
      href="/assets/Anuj_Kumar_Resume.pdf"
      download="Anuj_Kumar_Resume.pdf"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className={`hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-body font-semibold border transition-all ${
        isDark
          ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/25 hover:border-indigo-400/60'
          : 'bg-indigo-50 border-indigo-300 text-indigo-600 hover:bg-indigo-100'
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Resume
    </motion.a>
  )
}
