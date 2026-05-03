import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, Code2, ArrowUp } from 'lucide-react'

const socials = [
  { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/anuj-kun/', label: 'LinkedIn' },
  { icon: <Github size={18} />, href: 'https://github.com/Anuj-kumar-53', label: 'GitHub' },
  { icon: <Mail size={18} />, href: 'mailto:anujksah123@gmail.com', label: 'Email' },
]

export default function Footer({ isDark }) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer
      className={`relative pt-12 pb-8 ${
        isDark
          ? 'bg-[#050505] border-t border-[#D4AF37]/20'
          : 'bg-light-bg border-t border-light-border'
      }`}
    >
      {/* Top line */}
      <div className={`absolute top-0 left-0 right-0 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent' : 'bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent'}`} />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${isDark ? 'bg-[#D4AF37]/15 border border-[#D4AF37]/25' : 'bg-light-surface border border-light-border'}`}>
              <Code2 size={16} className={isDark ? "text-[#D4AF37]" : "text-indigo-500"} />
            </div>
            <span className={`font-display font-bold text-lg ${isDark ? 'text-[#F5EFEB]' : 'text-light-textPrimary'}`}>
             Portfolio
            </span>
          </div>

          {/* Tagline */}
          <p className={`text-sm text-center max-w-sm ${isDark ? 'text-[#A39171]' : 'text-light-textSecondary'}`}>
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
                    ? 'bg-white/5 border border-[#D4AF37]/20 text-[#A39171] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/40'
                    : 'bg-light-surface border border-light-border text-light-textSecondary hover:text-light-textPrimary hover:bg-light-border/40'
                }`}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className={`w-full h-px ${isDark ? 'bg-[#D4AF37]/20' : 'bg-light-border/40'}`} />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
            <p className={`text-sm font-body flex items-center gap-1.5 ${isDark ? 'text-[#A39171]/80' : 'text-light-textSecondary'}`}>
              © 2026 Anuj Kumar · Built with
              <Heart size={12} className={isDark ? "text-[#D4AF37] fill-[#D4AF37]" : "text-red-400 fill-red-400"} />
              and{' '}
              <span className="gradient-text font-medium">React</span>
            </p>

            <motion.button
              onClick={scrollTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg transition-all ${
                isDark
                  ? 'text-[#D4AF37] hover:bg-[#D4AF37]/10 border border-[#D4AF37]/25'
                  : 'text-light-accent hover:bg-light-surface border border-light-border'
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
