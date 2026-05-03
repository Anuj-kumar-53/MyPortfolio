import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, BookOpen, Calendar, MapPin, Award } from 'lucide-react'

/* ── Education data — 3 entries ───────────────────────────────── */
const education = [
  {
    id: 0,
    degree: 'Bachelor of Technology',
    field: 'Computer Science & Engineering',
    institution: 'Lovely Professional University',
    location: 'Phagwara, Punjab, India',
    duration: '2023 – 2027',
    status: 'Ongoing',
    score: '8.11 / 10.0',
    scoreLabel: 'CGPA',
    courses: ['Data Structures & Algorithms', 'Operating Systems', 'Computer Networks', 'Database Management', 'OOP', 'Computer Architecture'],
    achievements: ["Dean's List – Semester 1", 'Top performer in DSA course', 'Active member of Coding Club'],
    /* Replace with the real college image URL */
    image: 'https://www.collegebatch.com/static/clg-gallery/lpu-jalandhar-360559.webp',
    imageAlt: 'University Campus',
    accent: '#6366f1',
  },
  {
    id: 1,
    degree: 'Higher Secondary Education',
    field: 'Science Stream',
    institution: 'Ruzhukhrie Government Higher secondary School ',
    location: 'Kohima , Nagaland India',
    duration: '2021 – 2023',
    status: 'Completed',
    score: '74%',
    scoreLabel: 'Score',
    courses: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
    achievements: ['School Topper in Computer Science', 'State-level Science Olympiad participant'],
    image: 'assets/r12.png',
    imageAlt: 'Higher Secondary School',
    accent: '#a855f7',
  },
  {
    id: 2,
    degree: 'Secondary Education',
    field: 'General – All Subjects (Class X)',
    institution: 'Modern School Kohima',
    location: 'Kohima, Nagaland India',
    duration: '2019 – 2021',
    status: 'Completed',
    score: '83%',
    scoreLabel: 'Score',
    courses: ['Mathematics', 'Science', 'English', 'Social Studies', 'Computer'],
    achievements: ['School rank 1 in Mathematics', 'Best Student Award 2021'],
    image: 'assets/m10.png',
    imageAlt: 'School',
    accent: '#3b82f6',
  },
]

export default function Education({ isDark }) {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const section = sectionRef.current
    if (!section) return

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const totalScrollable = section.offsetHeight - window.innerHeight
      if (totalScrollable <= 0) return
      const scrolled = Math.max(0, Math.min(1, -rect.top / totalScrollable))
      const idx = Math.min(education.length - 1, Math.floor(scrolled * education.length))
      setActiveIndex(idx)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobile])

  if (isMobile) {
    return (
      <section id="education" className={`section-padding ${isDark ? 'bg-dark-bg' : 'bg-light-surface'}`}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className={`font-display font-bold text-3xl mb-4 ${isDark ? 'text-[#F5EFEB]' : 'text-light-textPrimary'}`}>
              Education <span className="gradient-text">Timeline</span>
            </h2>
            <div className={`w-16 h-1 mx-auto rounded-full ${isDark ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B]' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`} />
          </div>
          <div className="space-y-6">
            {education.map((e) => {
              const themeAccent = isDark ? '#D4AF37' : e.accent;
              return (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-3xl border ${isDark ? 'bg-white/[0.02] border-[#D4AF37]/20' : 'bg-light-card border-light-border shadow-sm'}`}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full ${e.status === 'Ongoing' ? (isDark ? 'bg-[#B8860B]/10 text-[#B8860B] border border-[#B8860B]/20' : 'bg-green-500/10 text-green-400 border border-green-500/20') : (isDark ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20')}`}>
                        {e.status}
                      </span>
                      <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10" style={{ color: themeAccent, borderColor: `${themeAccent}33` }}>
                        {e.score} {e.scoreLabel}
                      </span>
                    </div>
                    <h3 className={`font-display font-bold text-xl leading-tight ${isDark ? 'text-[#F5EFEB]' : 'text-light-textPrimary'}`}>{e.degree}</h3>
                    <p className="font-semibold text-sm" style={{ color: themeAccent }}>{e.field}</p>

                    <div className="flex flex-col gap-3 my-2">
                      {[
                        { icon: <GraduationCap size={15} />, text: e.institution },
                        { icon: <MapPin size={15} />, text: e.location },
                        { icon: <Calendar size={15} />, text: e.duration },
                      ].map(({ icon, text }, i) => (
                        <div key={i} className={`flex items-start gap-3 text-sm ${isDark ? 'text-[#A39171]' : 'text-light-textSecondary'}`}>
                          <span style={{ color: themeAccent }} className="mt-0.5">{icon}</span>
                          {text}
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-dashed border-white/10">
                      <p className={`text-[10px] font-mono uppercase tracking-widest mb-3 ${isDark ? 'text-[#A39171]/80' : 'text-light-textSecondary'}`}>Key Courses</p>
                      <div className="flex flex-wrap gap-2">
                        {e.courses.slice(0, 6).map(c => (
                          <span key={c} className="px-2.5 py-1 rounded-lg text-[10px] font-medium" style={{ background: `${themeAccent}15`, color: themeAccent, border: `1px solid ${themeAccent}30` }}>
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            }
            )}
          </div>
        </div>
      </section>
    )
  }

  const edu = education[activeIndex]
  const themeAccent = isDark ? '#D4AF37' : edu.accent;

  return (
    <div
      id="education"
      ref={sectionRef}
      style={{ height: `${(education.length + 0.5) * 100}vh` }}
      className="relative"
    >
      <div
        className={`sticky top-0 w-full h-screen overflow-hidden flex flex-col ${isDark ? 'bg-dark-bg' : 'bg-light-surface'
          }`}
      >
        <div className="pt-24 pb-6 px-8 text-center flex-shrink-0">
          <h2
            className={`font-display font-bold ${isDark ? 'text-[#F5EFEB]' : 'text-light-textPrimary'}`}
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}
          >
            Education <span className="gradient-text">Timeline</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            {education.map((e, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === activeIndex ? 28 : 8,
                  background: i === activeIndex ? themeAccent : isDark ? '#2E2718' : '#E8E2D2',
                }}
                transition={{ duration: 0.4 }}
                className="h-2 rounded-full"
              />
            ))}
          </div>
        </div>

        <div className="flex-1 flex items-center px-8 lg:px-16 max-w-7xl mx-auto w-full gap-12 pb-16">
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 48 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-xs font-mono px-3 py-1 rounded-full ${edu.status === 'Ongoing'
                      ? (isDark ? 'bg-[#B8860B]/15 text-[#B8860B] border border-[#B8860B]/25' : 'bg-green-500/15 text-green-400 border border-green-500/25')
                      : isDark
                        ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/25'
                        : 'bg-light-surface text-light-accent border border-light-border'
                      }`}
                  >
                    {edu.status}
                  </span>
                  <span
                    className="text-xs font-mono px-3 py-1 rounded-full"
                    style={{
                      background: `${themeAccent}22`,
                      color: themeAccent,
                      border: `1px solid ${themeAccent}44`,
                    }}
                  >
                    {edu.score} {edu.scoreLabel}
                  </span>
                </div>
                <h3
                  className={`font-display font-bold leading-tight mb-1 ${isDark ? 'text-[#F5EFEB]' : 'text-light-textPrimary'}`}
                  style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
                >
                  {edu.degree}
                </h3>
                <p className="font-semibold text-base mb-5" style={{ color: themeAccent }}>
                  {edu.field}
                </p>
                <div className="flex flex-wrap gap-5 mb-7">
                  {[
                    { icon: <BookOpen size={14} />, text: edu.institution },
                    { icon: <MapPin size={14} />, text: edu.location },
                    { icon: <Calendar size={14} />, text: edu.duration },
                  ].map(({ icon, text }) => (
                    <span
                      key={text}
                      className={`flex items-center gap-1.5 text-sm ${isDark ? 'text-[#A39171]' : 'text-light-textSecondary'}`}
                    >
                      <span style={{ color: themeAccent }}>{icon}</span>
                      {text}
                    </span>
                  ))}
                </div>
                <div className="mb-6">
                  <p className={`text-xs font-mono uppercase tracking-widest mb-2.5 ${isDark ? 'text-[#A39171]/80' : 'text-light-textSecondary'}`}>
                    Key Courses
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((c) => (
                      <span
                        key={c}
                        className="tech-badge"
                        style={{
                          background: `${themeAccent}14`,
                          border: `1px solid ${themeAccent}30`,
                          color: themeAccent,
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className={`text-xs font-mono uppercase tracking-widest mb-2.5 ${isDark ? 'text-[#A39171]/80' : 'text-light-textSecondary'}`}>
                    Achievements
                  </p>
                  <ul className="space-y-1.5">
                    {edu.achievements.map((a) => (
                      <li key={a} className={`flex items-start gap-2 text-sm ${isDark ? 'text-[#F5EFEB]/90' : 'text-light-textPrimary'}`}>
                        <Award size={14} className="mt-0.5 flex-shrink-0" style={{ color: themeAccent }} />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="hidden lg:flex flex-shrink-0 w-[42%] items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, scale: 0.92, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.92, x: -40 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full"
              >
                <div
                  className="absolute inset-0 rounded-3xl blur-2xl opacity-30"
                  style={{ background: `radial-gradient(ellipse, ${themeAccent} 0%, transparent 70%)` }}
                />
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    boxShadow: `0 0 0 1px ${themeAccent}40, 0 24px 60px rgba(0,0,0,0.35)`,
                  }}
                >
                  <img
                    src={edu.image}
                    alt={edu.imageAlt}
                    className="w-full object-cover"
                    style={{ height: 340 }}
                    loading="lazy"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 px-5 py-4"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
                    }}
                  >
                    <p className="text-white font-display font-bold text-lg leading-tight">{edu.institution}</p>
                    <p className="text-white/70 text-sm font-mono">{edu.duration}</p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  className="absolute -top-3 -right-3 w-14 h-14 rounded-full"
                  style={{
                    background: `conic-gradient(from 0deg, ${themeAccent}, transparent, ${themeAccent})`,
                    filter: 'blur(6px)',
                    opacity: 0.6,
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex-shrink-0 pb-6 flex flex-col items-center gap-1">
          <p className={`text-xs font-mono ${isDark ? 'text-[#A39171]' : 'text-light-textSecondary'}`}>
            {activeIndex < education.length - 1 ? 'scroll for next' : 'scroll to continue'}
          </p>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="w-px h-6"
            style={{ background: `linear-gradient(to bottom, ${themeAccent}80, transparent)` }}
          />
        </div>
      </div>
    </div>
  )
}
