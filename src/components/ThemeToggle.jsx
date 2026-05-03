import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({ isDark, toggle }) {
  return (
    <motion.button
      onClick={toggle}
      className="relative w-14 h-7 rounded-full p-1 transition-colors duration-300 focus:outline-none"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #1e293b, #334155)'
          : 'linear-gradient(135deg, #bfdbfe, #ddd6fe)',
        border: isDark
          ? '1px solid rgba(212,175,55,0.4)'
          : '1px solid rgba(139,92,246,0.3)',
        boxShadow: isDark ? '0 0 12px rgba(212,175,55,0.3)' : 'none',
      }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="w-5 h-5 rounded-full flex items-center justify-center"
        animate={{
          x: isDark ? 28 : 0,
          background: isDark
            ? 'linear-gradient(135deg, #D4AF37, #B8860B)'
            : 'linear-gradient(135deg, #f59e0b, #f97316)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 30, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={12} className="text-black" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -30, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={12} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  )
}
