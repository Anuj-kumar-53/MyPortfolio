import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Download, CheckCircle2 } from 'lucide-react'
import { skills } from '../data/projects'

const categoryIcons = {
  Languages: '{ }',
  Frameworks: '⚛',
  Tools: '🔧',
  'Core CS': '🧠',
}

const categoryColors = {
  Languages: '#6366f1',
  Frameworks: '#a855f7',
  Tools: '#3b82f6',
  'Core CS': '#06b6d4',
}

export default function Resume({ isDark }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="resume"
      ref={ref}
      className={`section-padding relative ${isDark ? 'bg-dark-bg' : 'bg-gray-100'}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className={`font-mono text-sm mb-3 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`}>
            // what i know
          </p>
          <h2
            className={`font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            Skills & <span className="gradient-text">Resume</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
        </motion.div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {Object.entries(skills).map(([category, items], ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`p-6 rounded-2xl relative overflow-hidden ${
                isDark
                  ? 'bg-dark-card border border-dark-border/60'
                  : 'bg-white border border-gray-200 shadow-sm'
              }`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-mono font-bold"
                  style={{
                    background: `${categoryColors[category]}20`,
                    color: categoryColors[category],
                    border: `1px solid ${categoryColors[category]}30`,
                  }}
                >
                  {categoryIcons[category]}
                </div>
                <h3
                  className={`font-display font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  {category}
                </h3>
              </div>

              {/* Skills list */}
              <div className="space-y-3">
                {items.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    color={categoryColors[category]}
                    isDark={isDark}
                    inView={inView}
                    delay={ci * 0.1 + si * 0.08}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* All skills as badges - flat view */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`p-6 sm:p-8 rounded-2xl mb-10 ${
            isDark
              ? 'bg-dark-card border border-dark-border/60'
              : 'bg-white border border-gray-200 shadow-sm'
          }`}
        >
          <h3 className={`font-display font-bold text-sm mb-5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            All Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(skills).flatMap(([cat, items]) =>
              items.map((s) => (
                <motion.span
                  key={`${cat}-${s.name}`}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className={`tech-badge cursor-default ${
                    isDark
                      ? 'bg-white/5 border border-white/10 text-gray-300 hover:border-indigo-500/40 hover:text-indigo-300'
                      : 'bg-gray-50 border border-gray-200 text-gray-800 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  {s.name}
                </motion.span>
              ))
            )}
          </div>
        </motion.div>

        {/* Download button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex justify-center"
        >
          <motion.a
            href="/assets/resume.pdf"
            download="Anuj_Kumar_Resume.pdf"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99,102,241,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="btn-shimmer group flex items-center gap-3 px-10 py-4 rounded-2xl font-body font-semibold text-white text-base"
            style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #3b82f6 100%)' }}
          >
            <Download size={20} className="group-hover:animate-bounce" />
            Download Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

function SkillBar({ skill, color, isDark, inView, delay }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className={`text-sm font-body ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
          {skill.name}
        </span>
        <span className="text-xs font-mono" style={{ color }}>{skill.level}%</span>
      </div>
      <div
        className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}bb)` }}
        />
      </div>
    </div>
  )
}
