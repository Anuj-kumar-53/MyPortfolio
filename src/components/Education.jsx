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
    image: 'https://scontent.fdel1-7.fna.fbcdn.net/v/t1.6435-9/149264769_4349777805051686_4634485602205707995_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=13d280&_nc_ohc=KTbCyQXcZUwQ7kNvwH1xByA&_nc_oc=Adkb_IoOYfiCjLRFGj7z_v7o1VQC9YUTrnu3Xu4j_2MowzcqBDn3ZeQiqAsukVnuLYk&_nc_zt=23&_nc_ht=scontent.fdel1-7.fna&_nc_gid=-z-d9Z_dokgL2xym4wgWKA&_nc_ss=8&oh=00_AfwyN6C_6Wh3q7D8aVWsvF5c45Y6uH1QUpx0Dp0egLye1Q&oe=69DFA5C5',
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
    image: 'https://mhss.edu.in/wp-content/uploads/2022/09/school-photo.jpg',
    imageAlt: 'School',
    accent: '#3b82f6',
  },
]

export default function Education({ isDark }) {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      // rect.top goes from 0 → -(totalScrollHeight - vh) as we scroll through
      const totalScrollable = section.offsetHeight - window.innerHeight
      if (totalScrollable <= 0) return

      // How far have we scrolled within the pinned section (0 → 1)
      const scrolled = Math.max(0, Math.min(1, -rect.top / totalScrollable))

      // Divide scrolled range evenly among entries
      const idx = Math.min(education.length - 1, Math.floor(scrolled * education.length))
      setActiveIndex(idx)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const edu = education[activeIndex]

  return (
    /*
      Outer wrapper height = 100vh * (entries + 1) so we get
      1 screen-worth of scroll per entry.
    */
    <div
      id="education"
      ref={sectionRef}
      style={{ height: `${(education.length + 0.5) * 100}vh` }}
      className="relative"
    >
      {/* Sticky panel */}
      <div
        className={`sticky top-0 w-full h-screen overflow-hidden flex flex-col ${isDark ? 'bg-dark-bg' : 'bg-gray-100'
          }`}
      >
        {/* ── Section header (stays fixed) ─────────────────────── */}
        <div className="pt-24 pb-6 px-8 text-center flex-shrink-0">

          <h2
            className={`font-display font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}
          >
            Education <span className="gradient-text">Timeline</span>
          </h2>

          {/* Step dots */}
          <div className="flex items-center justify-center gap-3 mt-4">
            {education.map((e, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === activeIndex ? 28 : 8,
                  background: i === activeIndex ? e.accent : isDark ? '#334155' : '#cbd5e1',
                }}
                transition={{ duration: 0.4 }}
                className="h-2 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* ── Main content (changes on scroll) ─────────────────── */}
        <div className="flex-1 flex items-center px-8 lg:px-16 max-w-7xl mx-auto w-full gap-12 pb-16">

          {/* Left: Info */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 48 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Status + score row */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-xs font-mono px-3 py-1 rounded-full ${edu.status === 'Ongoing'
                      ? 'bg-green-500/15 text-green-400 border border-green-500/25'
                      : isDark
                        ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/25'
                        : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                      }`}
                  >
                    {edu.status}
                  </span>
                  <span
                    className="text-xs font-mono px-3 py-1 rounded-full"
                    style={{
                      background: `${edu.accent}22`,
                      color: edu.accent,
                      border: `1px solid ${edu.accent}44`,
                    }}
                  >
                    {edu.score} {edu.scoreLabel}
                  </span>
                </div>

                {/* Degree */}
                <h3
                  className={`font-display font-bold leading-tight mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
                >
                  {edu.degree}
                </h3>
                <p className="font-semibold text-base mb-5" style={{ color: edu.accent }}>
                  {edu.field}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-5 mb-7">
                  {[
                    { icon: <BookOpen size={14} />, text: edu.institution },
                    { icon: <MapPin size={14} />, text: edu.location },
                    { icon: <Calendar size={14} />, text: edu.duration },
                  ].map(({ icon, text }) => (
                    <span
                      key={text}
                      className={`flex items-center gap-1.5 text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}
                    >
                      <span style={{ color: edu.accent }}>{icon}</span>
                      {text}
                    </span>
                  ))}
                </div>

                {/* Courses */}
                <div className="mb-6">
                  <p className={`text-xs font-mono uppercase tracking-widest mb-2.5 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                    Key Courses
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((c) => (
                      <span
                        key={c}
                        className="tech-badge"
                        style={{
                          background: `${edu.accent}14`,
                          border: `1px solid ${edu.accent}30`,
                          color: edu.accent,
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <p className={`text-xs font-mono uppercase tracking-widest mb-2.5 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                    Achievements
                  </p>
                  <ul className="space-y-1.5">
                    {edu.achievements.map((a) => (
                      <li key={a} className={`flex items-start gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                        <Award size={14} className="mt-0.5 flex-shrink-0" style={{ color: edu.accent }} />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Institution image */}
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
                {/* Glow behind image */}
                <div
                  className="absolute inset-0 rounded-3xl blur-2xl opacity-30"
                  style={{ background: `radial-gradient(ellipse, ${edu.accent} 0%, transparent 70%)` }}
                />
                {/* Image frame */}
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    boxShadow: `0 0 0 1px ${edu.accent}40, 0 24px 60px rgba(0,0,0,0.35)`,
                  }}
                >
                  <img
                    src={edu.image}
                    alt={edu.imageAlt}
                    className="w-full object-cover"
                    style={{ height: 340 }}
                    loading="lazy"
                  />
                  {/* Overlay label */}
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

                {/* Corner accent */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  className="absolute -top-3 -right-3 w-14 h-14 rounded-full"
                  style={{
                    background: `conic-gradient(from 0deg, ${edu.accent}, transparent, ${edu.accent})`,
                    filter: 'blur(6px)',
                    opacity: 0.6,
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scroll hint at bottom */}
        <div className="flex-shrink-0 pb-6 flex flex-col items-center gap-1">
          <p className={`text-xs font-mono ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
            {activeIndex < education.length - 1 ? 'scroll for next' : 'scroll to continue'}
          </p>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="w-px h-6"
            style={{ background: `linear-gradient(to bottom, ${edu.accent}80, transparent)` }}
          />
        </div>
      </div>
    </div>
  )
}
