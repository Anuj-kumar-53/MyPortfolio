import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowRight, Sparkles } from 'lucide-react'

const roles = ['Full Stack Developer', 'MERN Stack Developer', 'DSA Enthusiast', 'Hackathon Participant', 'Problem Solver']

/* ── Social data with real brand colors ─────────────── */
const socials = [
  { icon: <Linkedin size={22} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/anuj-kun/', color: '#0A66C2', glow: 'rgba(10,102,194,0.6)' },
  { icon: <Github size={22} />, label: 'GitHub', href: 'https://github.com/Anuj-kumar-53', color: '#c8b8f0', glow: 'rgba(110,84,148,0.6)' },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Left bracket < */}
        <polyline points="10 6 4 12 10 18" stroke="currentColor" />
        {/* Horizontal bar - */}
        <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" />
        {/* Right part / bottom curve, made to look like the provided logo */}
        <path d="M14 6 L20 12 L14 18" stroke="#FFA116" />
      </svg>
    ),
    label: 'LeetCode',
    href: 'https://leetcode.com/u/anuj_kumar20/',
    color: 'currentColor', // Will inherit from parent, set custom glow below
    glow: 'rgba(255,161,22,0.6)',
  },
  { icon: <Mail size={22} />, label: 'Gmail', href: 'mailto:shahanujkumar53@gmail.com', color: '#EA4335', glow: 'rgba(234,67,53,0.6)' },
]

/*
  Each icon gets a totally unique roaming path.
  The chamber bounding box is 280×110 px.
  Icon size ~48px, so usable move range is roughly [-100,100] in X, [-30,30] in Y
  (relative to the absolute positioned icon's initial place).
*/
const roamPaths = [
  // LinkedIn  — drifts left↔right slowly, gentle vertical
  { x: [0, 70, -50, 80, -30, 0], y: [0, -18, 22, 8, -24, 0], dur: 28 },
  // GitHub — wide right then down-left loop
  { x: [0, -60, 40, -80, 50, 0], y: [0, 20, -26, 14, 18, 0], dur: 32 },
  // LeetCode — restless, faster zigzag
  { x: [0, 55, -70, 65, -40, 0], y: [0, -28, 16, -20, 30, 0], dur: 26 },
  // Gmail — slow wide circles
  { x: [0, -40, -75, 30, 60, 0], y: [0, 28, -10, -30, 15, 0], dur: 36 },
]

/* Initial positions spread across the 280×110 area */
const initPos = [
  { x: 10, y: 30 },   // LinkedIn — left
  { x: 80, y: 5 },    // GitHub — center-left top
  { x: 155, y: 50 },  // LeetCode — center-right bottom
  { x: 220, y: 15 },  // Gmail — right top
]

export default function Hero({ isDark }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    const speed = isDeleting ? 50 : 100
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, displayText.length + 1))
        if (displayText.length === current.length) setTimeout(() => setIsDeleting(true), 1800)
      } else {
        setDisplayText(current.slice(0, displayText.length - 1))
        if (displayText.length === 0) {
          setIsDeleting(false)
          setRoleIndex((p) => (p + 1) % roles.length)
        }
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center relative overflow-hidden ${isDark ? 'bg-dark-bg' : 'bg-gradient-to-br from-gray-100 to-gray-200/50'
        }`}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`blob absolute w-96 h-96 rounded-full blur-3xl opacity-20 -top-20 -left-20 ${isDark ? 'bg-indigo-600' : 'bg-indigo-300'}`} />
        <div className={`blob blob-delay-1 absolute w-80 h-80 rounded-full blur-3xl opacity-15 top-1/3 right-0 ${isDark ? 'bg-purple-600' : 'bg-purple-300'}`} />
        <div className={`blob blob-delay-2 absolute w-72 h-72 rounded-full blur-3xl opacity-10 bottom-10 left-1/3 ${isDark ? 'bg-blue-600' : 'bg-blue-300'}`} />
        {isDark && (
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        )}
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Text ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left"
          >

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono mb-6 ${isDark ? 'bg-indigo-500/10 border border-indigo-500/30 text-indigo-300' : 'bg-indigo-50 border border-indigo-200 text-indigo-600'
                }`}
            >
              <Sparkles size={14} />
              Available for work
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
              className={`font-display font-bold leading-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{ fontSize: 'clamp(2.1rem, 7vw, 4rem)' }}
            >
              Hello, I'm{' '}
              <span className="gradient-text block">Anuj Kumar</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className={`text-xl font-body font-medium mb-4 h-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            >
              <span className="gradient-text-alt">{displayText}</span>
              <span className="typing-cursor gradient-text-alt">|</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className={`text-base leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}
            >
              Full Stack Developer passionate about building scalable web applications and interactive user experiences.
              I love transforming complex problems into elegant, performant solutions.
            </motion.p>

            {/* Highlights */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
              {['MERN Stack', 'DSA', 'Hackathons', 'Open Source'].map((tag) => (
                <span key={tag} className={`px-3 py-1.5 rounded-lg text-sm font-mono font-medium ${isDark ? 'bg-white/5 border border-white/10 text-gray-300' : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                  }`}>
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-wrap justify-center lg:justify-start gap-4">
              <motion.a
                href="/assets/Anuj_Kumar_Resume.pdf"
                download="Anuj_Kumar_Resume.pdf"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99,102,241,0.5)' }} whileTap={{ scale: 0.97 }}
                className="btn-shimmer flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-body font-semibold text-white text-sm w-full sm:w-auto"
                style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('#contact')}
                className={`flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-body font-semibold text-sm border transition-all w-full sm:w-auto ${isDark ? 'border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/10' : 'border-indigo-300 text-indigo-600 hover:bg-indigo-50'
                  }`}
              >
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ── Right: Profile image + free-roaming icons ─────────── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-10"
          >
            {/* Profile image */}
            <div className="relative w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80">

              {/* Rotating gradient border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full overflow-hidden"
                style={{
                  background:
                    "conic-gradient(from 0deg, #6366f1, #a855f7, #3b82f6, #6366f1)",
                  padding: "3px",
                  borderRadius: "50%",
                }}
              >
                <div
                  className={`w-full h-full rounded-full ${isDark ? "bg-dark-bg" : "bg-gray-100"
                    }`}
                />
              </motion.div>

              {/* Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full blur-2xl"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                }}
              />

              {/* Image */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 11,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 flex items-center justify-center w-full h-full"
              >
                <img
                  src="/assets/anu.jpeg"
                  alt="Anuj Kumar"
                  className="w-36 h-36 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-64 lg:h-64 rounded-full object-cover"
                  style={{ border: "4px solid transparent" }}
                  loading="lazy"
                />
              </motion.div>

            </div>

            {/*
              Invisible bounding chamber — no background, no border, no shadow.
              Icons roam freely inside this 280×110 region.
            */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }}
              className="relative scale-75 sm:scale-100"
              style={{ width: 280, height: 110 }}
            >
              {socials.map((social, i) => (
                <motion.div
                  key={social.label}
                  className="absolute"
                  style={{ left: initPos[i].x, top: initPos[i].y }}
                  animate={{ x: roamPaths[i].x, y: roamPaths[i].y }}
                  transition={{ duration: roamPaths[i].dur, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }}
                >
                  <RoamIcon social={social} isDark={isDark} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className={`text-xs font-mono ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className={`w-px h-10 ${isDark ? 'bg-gradient-to-b from-indigo-500/60 to-transparent' : 'bg-gradient-to-b from-indigo-400/60 to-transparent'}`}
          />
        </motion.div>
      </div>
    </section>
  )
}

/* ── Roaming icon — colored, glows on hover, tooltip ─────────── */
function RoamIcon({ social, isDark }) {
  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      whileHover={{ scale: 1.35 }}
      whileTap={{ scale: 0.88 }}
      className="relative group flex items-center justify-center w-12 h-12 rounded-2xl cursor-pointer"
      style={{ color: social.color === 'currentColor' ? (isDark ? '#e2e8f0' : '#475569') : social.color }}
    >
      {/* Soft halo that's always slightly visible */}
      <div
        className="absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-0 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle, ${social.glow} 0%, transparent 75%)` }}
      />
      {/* Bright halo on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-250"
        style={{
          boxShadow: `0 0 18px ${social.glow}, 0 0 36px ${social.glow.replace('0.6', '0.25')}`,
          background: `radial-gradient(circle, ${social.glow.replace('0.6', '0.22')} 0%, transparent 70%)`,
        }}
      />
      <span className="relative z-10">{social.icon}</span>

      {/* Tooltip */}
      <span className={`absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-mono px-2 py-0.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${isDark ? 'bg-white/10 text-gray-300' : 'bg-black/10 text-gray-700'
        }`}>
        {social.label}
      </span>
    </motion.a>
  )
}
