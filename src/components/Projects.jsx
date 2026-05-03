import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, ExternalLink, ArrowRight, Star } from 'lucide-react'
import { projects } from '../data/projects'

const featured = projects.filter((p) => p.featured).slice(0, 3)

/* ── Shared tech badge color map ───────────────────────────────── */
export const techColors = {
  React: '#61DAFB',
  'Node.js': '#68a063',
  MongoDB: '#47A248',
  'D3.js': '#F9A03C',
  JWT: '#FB015B',
  OAuth: '#4285F4',
  Tailwind: '#38BDF8',
  Express: '#9ca3af',
  'Gemini AI': '#A78BFA',
  'Weather API': '#0EA5E9',
  'Socket.io': '#d1d5db',
  Docker: '#2496ED',
  FFmpeg: '#007808',
  'Monaco Editor': '#0065A9',
  'Google Maps API': '#34A853',
  MySQL: '#4479A1',
}
export const getTechColor = (t) => techColors[t] || '#a5b4fc'

export default function Projects({ isDark, onViewAll }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="projects"
      ref={ref}
      className={`section-padding relative ${isDark ? 'bg-dark-surface' : 'bg-light-surface'}`}
    >
      <div className={`absolute top-0 left-0 right-0 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent' : 'bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent'}`} />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className={`font-mono text-sm mb-3 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`}>

          </p>
          <h2
            className={`font-display font-bold mb-4 ${isDark ? 'text-[#F5EFEB]' : 'text-light-textPrimary'}`}
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className={`w-16 h-1 mx-auto rounded-full ${isDark ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B]' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`} />
        </motion.div>

        <div className="flex flex-col gap-12 sm:gap-16 relative w-full mb-14">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} isDark={isDark} inView={inView} />
          ))}
        </div>

        {/* View All button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={onViewAll}
            whileHover={{ scale: 1.05, boxShadow: isDark ? '0 0 36px rgba(212,175,55,0.4)' : '0 0 36px rgba(99,102,241,0.4)' }}
            whileTap={{ scale: 0.97 }}
            className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-body font-semibold text-base overflow-hidden"
            style={{ background: isDark ? 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)' : 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}
          >
            {/* Shimmer */}
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2.4s infinite',
              }}
            />
            <span className={`relative z-10 flex items-center gap-3 ${isDark ? 'text-black' : 'text-white'}`}>
              View All Projects
              <span
                className={`flex items-center justify-center w-7 h-7 rounded-xl ${isDark ? 'bg-black/20' : 'bg-white/20'} transition-transform duration-300 group-hover:translate-x-1`}
              >
                <ArrowRight size={14} />
              </span>
            </span>
          </motion.button>
        </motion.div>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent' : 'bg-gradient-to-r from-transparent via-purple-500/30 to-transparent'}`} />
    </section>
  )
}

/* ── Premium Project Card ──────────────────────────────────────── */
export function ProjectCard({ project, index, isDark, inView }) {
  const themeColor = isDark ? '#D4AF37' : project.color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.13, ease: [0.16, 1, 0.3, 1] }}
      className="group lg:sticky flex flex-col lg:flex-row rounded-[2rem] overflow-hidden w-full lg:top-[8rem]"
      style={{
        marginTop: index > 0 ? 'inline-block' : '0', // Spacer
        background: isDark
          ? 'linear-gradient(145deg, #0A0A0A 0%, #141414 100%)'
          : 'linear-gradient(145deg, #FFFFFF 0%, #F4F0E6 100%)',
        border: `1px solid ${isDark ? 'rgba(212,175,55,0.15)' : 'rgba(99,102,241,0.12)'}`,
        boxShadow: isDark
          ? '0 10px 40px rgba(0,0,0,0.5)'
          : '0 10px 40px rgba(99,102,241,0.08)',
      }}
    >
      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-[2rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
        style={{ boxShadow: `inset 0 0 0 1.5px ${themeColor}60, 0 0 50px ${themeColor}18` }}
      />

      {/* Left side: Body */}
      <div className="flex flex-col flex-1 p-6 sm:p-8 lg:p-12 gap-5 relative z-10 order-2 lg:order-1">
        {/* Title row */}
        <div>
          <h3
            className={`font-display font-bold text-3xl mb-2 leading-tight ${isDark ? 'text-[#F5EFEB]' : 'text-light-textPrimary'}`}
          >
            {project.title}
          </h3>
          <p className="text-sm font-mono font-medium" style={{ color: themeColor }}>
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className={`text-base leading-relaxed flex-1 ${isDark ? 'text-[#A39171]' : 'text-light-textSecondary'}`}>
          {project.description}
        </p>

        {/* Stats */}
        {project.stats && (
          <div className="flex gap-6 py-2 border-y border-dashed border-gray-500/20">
            {project.stats.map((s) => (
              <div key={s.label}>
                <p className="text-xl font-display font-bold" style={{ color: themeColor }}>
                  {s.value}
                </p>
                <p className={`text-xs font-mono mt-1 ${isDark ? 'text-[#A39171]/80' : 'text-light-textSecondary'}`}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => {
            const c = getTechColor(tech)
            return (
              <span
                key={tech}
                className="tech-badge"
                style={{
                  background: `${c}12`,
                  color: c,
                  border: `1px solid ${c}25`,
                }}
              >
                {tech}
              </span>
            )
          })}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-4 mt-auto">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-body font-semibold transition-all ${isDark
              ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/15 hover:text-[#F5EFEB]'
              : 'bg-light-surface border border-light-border text-light-textPrimary hover:bg-light-border/40'
              }`}
          >
            <Github size={16} />
            Source Code
          </motion.a>
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: `0 0 24px ${themeColor}50` }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-body font-semibold transition-all shadow-lg ${isDark ? 'text-black' : 'text-white'}`}
            style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}bb)` }}
          >
            <ExternalLink size={16} />
            Live Preview
          </motion.a>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="relative w-full lg:w-[50%] h-64 lg:h-auto overflow-hidden flex-shrink-0 order-1 lg:order-2">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.55 }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${isDark ? '#0A0A0A' : '#f5f3ff'} 0%, rgba(0,0,0,0.0) 30%)`,
          }}
        />
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background: `linear-gradient(to top, ${isDark ? '#0A0A0A' : '#f5f3ff'} 0%, rgba(0,0,0,0.0) 40%)`,
          }}
        />
        {/* Color wash on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-400"
          style={{ background: themeColor }}
        />

        {/* Top right: number + category */}
        <div className="absolute top-5 right-5 flex items-center gap-3">
          <span
            className={`text-xs font-mono px-3 py-1.5 rounded-full ${isDark ? 'text-black' : 'text-white/95'}`}
            style={{ background: `${themeColor}bb`, backdropFilter: 'blur(8px)' }}
          >
            {project.category}
          </span>
          <span
            className={`text-sm font-mono font-bold w-10 h-10 rounded-2xl flex items-center justify-center ${isDark ? 'text-black' : 'text-white'}`}
            style={{ background: `${themeColor}dd` }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Star badge for featured */}
        {project.featured && (
          <div className="absolute bottom-5 right-5 flex items-center gap-1.5 text-xs font-mono text-amber-300 bg-amber-400/20 border border-amber-400/30 px-3 py-1.5 rounded-full backdrop-blur-[2px]">
            <Star size={12} fill="currentColor" />
            Featured
          </div>
        )}
      </div>
    </motion.div>
  )
}
