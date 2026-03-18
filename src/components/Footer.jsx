import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, Code2, ArrowUp } from 'lucide-react'

const socials = [
  { icon: <Linkedin size={18} />, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: <Github size={18} />, href: 'https://github.com', label: 'GitHub' },
  { icon: <Mail size={18} />, href: 'mailto:anuj@example.com', label: 'Email' },
]

export default function Footer({ isDark }) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer
      className={`relative pt-12 pb-8 ${
        isDark
          ? 'bg-dark-bg border-t border-dark-border/40'
          : 'bg-white border-t border-gray-100'
      }`}
    >
      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${isDark ? 'bg-indigo-500/20 border border-indigo-500/30' : 'bg-indigo-50 border border-indigo-200'}`}>
              <Code2 size={16} className="text-indigo-500" />
            </div>
            <span className={`font-display font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
             Portfolio
            </span>
          </div>

          {/* Tagline */}
          <p className={`text-sm text-center max-w-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Crafting digital experiences with passion and precision.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2.5 rounded-xl transition-all ${
                  isDark
                    ? 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                    : 'bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className={`w-full h-px ${isDark ? 'bg-dark-border/40' : 'bg-gray-100'}`} />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
            <p className={`text-sm font-body flex items-center gap-1.5 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              © 2026 Anuj Kumar · Built with
              <Heart size={12} className="text-red-400 fill-red-400" />
              and{' '}
              <span className="gradient-text font-medium">React</span>
            </p>

            <motion.button
              onClick={scrollTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg transition-all ${
                isDark
                  ? 'text-indigo-400 hover:bg-indigo-500/10 border border-indigo-500/20'
                  : 'text-indigo-600 hover:bg-indigo-50 border border-indigo-100'
              }`}
            >
              <ArrowUp size={12} />
              back to top
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
