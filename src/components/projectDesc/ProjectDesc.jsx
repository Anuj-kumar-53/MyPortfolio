import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ProjectDesc({ project, isDark, onClose }) {
  const [imgIdx, setImgIdx] = useState(0)
  const [imgLoaded, setImgLoaded] = useState(false)
  const allImages = [project.image, ...(project.screenshots || [])].filter(Boolean)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  const accent = project.color || '#8b5cf6'
  const accentEnd = project.colorEnd || '#ec4899'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 80, opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative w-full sm:max-w-2xl overflow-hidden"
        style={{
          maxHeight: '92vh',
          borderRadius: '24px 24px 24px 24px',
          background: isDark ? '#0c0b1a' : '#f8f8ff',
          border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.07)',
          boxShadow: `0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px ${accent}22`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── Hero image with slideshow ──────────────────────── */}
        <div className="relative flex-shrink-0 overflow-hidden" style={{ aspectRatio: '16/7' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={imgIdx}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              {allImages[imgIdx] ? (
                <img
                  src={allImages[imgIdx]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onLoad={() => setImgLoaded(true)}
                />
              ) : (
                <div className="w-full h-full relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent}44, ${accentEnd}33)` }}>
                  <svg className="absolute inset-0 w-full h-full opacity-20">
                    <defs>
                      <pattern id="pd-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke={accent} strokeWidth="0.6" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#pd-grid)" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span style={{ fontFamily: 'Bebas Neue', fontSize: 96, color: `${accent}44`, letterSpacing: '0.05em' }}>
                      {(project.title || 'P').charAt(0)}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Gradient scrim */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.75) 100%)' }} />

          {/* Slideshow controls */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={() => setImgIdx(i => (i - 1 + allImages.length) % allImages.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={() => setImgIdx(i => (i + 1) % allImages.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
              >
                <ChevronRight size={15} />
              </button>
              {/* Dot indicators */}
              <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    style={{ width: i === imgIdx ? 16 : 5, height: 5, borderRadius: 99, background: i === imgIdx ? accent : 'rgba(255,255,255,0.35)', transition: 'all 0.25s ease' }}
                  />
                ))}
              </div>
            </>
          )}

          {/* Category + title on image */}
          <div className="absolute bottom-5 left-5 right-14">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-block mb-2 rounded-full"
              style={{ fontFamily: 'JetBrains Mono', fontSize: 8.5, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#c4b5fd', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(139,92,246,0.3)', backdropFilter: 'blur(6px)', padding: '4px 10px' }}
            >
              {(project.category || 'Project').split(' / ')[0]}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.16,1,0.3,1] }}
              style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', letterSpacing: '0.03em', color: '#fff', lineHeight: 1 }}
            >
              {project.title}
            </motion.h2>
          </div>

          {/* Close */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', backdropFilter: 'blur(6px)' }}
          >
            <X size={15} />
          </motion.button>

          {/* Accent glow bar at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${accent}, ${accentEnd}, transparent)` }} />
        </div>

        {/* ── Scrollable content ─────────────────────────────── */}
        <div className="overflow-y-auto flex-1" style={{ scrollbarWidth: 'thin' }}>
          <div className="px-6 sm:px-8 py-6 flex flex-col gap-6">

            {/* Subtitle */}
            {project.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                style={{ fontFamily: 'DM Sans', fontWeight: 300, fontSize: 14, color: isDark ? '#9ca3af' : '#6b7280', lineHeight: 1.7 }}
              >
                {project.subtitle}
              </motion.p>
            )}

            {/* About */}
            {project.description && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Label isDark={isDark}>About</Label>
                <p style={{ fontFamily: 'DM Sans', fontWeight: 300, fontSize: 13, color: isDark ? '#9ca3af' : '#6b7280', lineHeight: 1.75, marginTop: 8 }}>
                  {project.description}
                </p>
              </motion.div>
            )}

            {/* Features */}
            {project.features?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Label isDark={isDark}>Key Features</Label>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {project.features.map((feat, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.38 + i * 0.05 }}
                      className="flex items-start gap-3"
                      style={{ fontFamily: 'DM Sans', fontWeight: 400, fontSize: 13, color: isDark ? '#d1d5db' : '#374151', lineHeight: 1.6 }}
                    >
                      <span
                        className="mt-1.5 flex-shrink-0 rounded-full"
                        style={{ width: 5, height: 5, background: `linear-gradient(135deg, ${accent}, ${accentEnd})` }}
                      />
                      {feat}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Tech stack */}
            {project.tech?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Label isDark={isDark}>Tech Stack</Label>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tech.map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.42 + i * 0.04 }}
                      style={{
                        fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.08em',
                        padding: '5px 12px', borderRadius: 99,
                        background: isDark ? `${accent}15` : `${accent}0d`,
                        color: isDark ? '#a78bfa' : '#7c3aed',
                        border: `1px solid ${accent}28`,
                      }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap gap-3 pt-4"
              style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)' }}
            >
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <motion.span
                    whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-xl"
                    style={{
                      fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.07em',
                      padding: '10px 20px',
                      background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                      border: isDark ? '1px solid rgba(255,255,255,0.09)' : '1px solid rgba(0,0,0,0.1)',
                      color: isDark ? '#e2e0ff' : '#374151',
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Github size={14} />
                    GitHub
                    <ArrowUpRight size={12} style={{ opacity: 0.5 }} />
                  </motion.span>
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <motion.span
                    whileHover={{ y: -3, boxShadow: `0 12px 32px ${accent}44` }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-xl text-white"
                    style={{
                      fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.07em',
                      padding: '10px 20px',
                      background: `linear-gradient(135deg, ${accent}, ${accentEnd})`,
                      boxShadow: `0 6px 20px ${accent}38`,
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <ExternalLink size={14} />
                    Live Demo
                    <ArrowUpRight size={12} style={{ opacity: 0.7 }} />
                  </motion.span>
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Label({ isDark, children }) {
  return (
    <p style={{ fontFamily: 'JetBrains Mono', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: isDark ? '#374151' : '#c4c4d4' }}>
      {children}
    </p>
  )
}