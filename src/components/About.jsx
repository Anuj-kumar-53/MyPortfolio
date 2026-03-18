import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Code2, Server, Globe, Cpu, Users, Star, Terminal, Layers, BookOpen, Trophy } from 'lucide-react'

/* ══════════════════════════════════════════════════════════════════
   Inline SVG icons for each technology
═══════════════════════════════════════════════════════════════════ */
const TechIcon = ({ name, size = 18 }) => {
  const icons = {
    // ── Languages
    'C++': (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="6" fill="#00599C" />
        <text x="5" y="22" fontSize="12" fontWeight="bold" fill="white" fontFamily="monospace">C++</text>
      </svg>
    ),
    'JavaScript': (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#F7DF1E" />
        <path d="M9 24.5l2.3-1.4c.4.8.8 1.4 1.7 1.4.9 0 1.4-.3 1.4-1.7V15h2.8v7.8c0 2.8-1.6 4-4 4-2.1 0-3.3-1.1-3.9-2.3h-.3zM19 24.2l2.3-1.4c.6 1 1.3 1.7 2.6 1.7 1.1 0 1.8-.5 1.8-1.3 0-.9-.7-1.2-1.9-1.7l-.7-.3c-1.9-.8-3.1-1.8-3.1-3.9 0-1.9 1.5-3.4 3.8-3.4 1.6 0 2.8.6 3.6 2l-2.1 1.4c-.5-.8-1-.8-1.5-.8-.7 0-1.2.4-1.2 1 0 .7.4 1 1.6 1.5l.7.3c2.2.9 3.5 2 3.5 4 0 2.3-1.8 3.6-4.2 3.6-2.3 0-3.8-1.1-4.5-2.7z" fill="#000" />
      </svg>
    ),
    'Java': (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#ED8B00" />
        <path d="M13 22s-1.5.9 1.1 1.2c3.2.4 4.9.3 8.4-.3 0 0 .9.6 2.2 1.1-7.8 3.3-17.7-.2-11.7-2zm-.9-4s-1.7 1.3 1 1.5c3.4.4 6.2.4 11-1 0 0 .7.7 1.7 1.1-9.4 2.8-20.5.2-13.7-1.6z" fill="white" />
        <path d="M18.2 8c2.9 3-2.6 5.7-2.6 5.7s6.5-3.3 4.6-7.6c-1.8-4.1-3.2-5.8 4.3-12.6C24.5-6.5 15.4-4 18.2 8z" fill="white" />
        <path d="M25 26s1.1 1-1.2 1.7c-4.4 1.3-18.3 1.7-22.2 0 0 0 1.4-1.2 4.7-1 0 0-5.4-3.6-3.7-8 .3-1 .6-1.7.9-2.4C5.7 21 16 23.5 25 26z" fill="white" />
      </svg>
    ),
    'Python': (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#3776AB" />
        <path d="M16 4c-6.3 0-5.9 2.7-5.9 2.7v2.8h6v.8H7.3S4 10 4 16.3c0 6.3 3.5 6 3.5 6h2.1v-3.2s-.1-3.5 3.4-3.5h5.9s3.3.1 3.3-3.2V7.2S22.7 4 16 4zm-3.3 1.9c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1z" fill="white" />
        <path d="M16 28c6.3 0 5.9-2.7 5.9-2.7v-2.8h-6v-.8h8.8s3.3.3 3.3-6c0-6.3-3.5-6-3.5-6h-2.1v3.2s.1 3.5-3.4 3.5h-5.9s-3.3-.1-3.3 3.2v5.4S9.3 28 16 28zm3.3-1.9c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z" fill="#FFD43B" />
      </svg>
    ),
    'PHP': (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#777BB3" />
        <text x="4" y="21" fontSize="11" fontWeight="bold" fill="white" fontFamily="monospace">PHP</text>
      </svg>
    ),
    // ── Frameworks
    'ReactJS': (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#20232a" />
        <ellipse cx="16" cy="16" rx="3" ry="3" fill="#61DAFB" />
        <ellipse cx="16" cy="16" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.3" />
        <ellipse cx="16" cy="16" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(120 16 16)" />
      </svg>
    ),
    'NodeJS': (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#215732" />
        <path d="M16 5l10 5.8v11.5L16 28 6 22.3V10.8L16 5z" fill="#6DB33F" />
        <path d="M16 8.5v15M10 11.7l12 8.6M22 11.7l-12 8.6" stroke="white" strokeWidth="1.2" />
      </svg>
    ),
    'Express': (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#1a1a1a" />
        <text x="3" y="20" fontSize="9" fontWeight="bold" fill="white" fontFamily="monospace">Exp</text>
        <text x="3" y="27" fontSize="9" fontWeight="bold" fill="#888" fontFamily="monospace">ress</text>
      </svg>
    ),
    'TailwindCSS': (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#0f172a" />
        <path d="M8 14c1.3-5.3 4.7-8 10-8-5.3 5.3-4 10.7 2 12-2.7 5.3-6 8-9.4 8C5.3 26 6.7 19.3 8 14zm10-2c1.3-5.3 4.7-8 10-8-5.3 5.3-4 10.7 2 12-2.7 5.3-6 8-9.4 8-5.3 0-3.9-6.7-2.6-12z" fill="#38BDF8" />
      </svg>
    ),
    'HTML': (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#e34c26" />
        <path d="M7 4l2 22 7 2 7-2 2-22H7zm14 6H11l.3 3.5h9.1l-1 11-3.5 1-3.5-1-.2-3h-2.9l.4 5.6 5.7 1.6 5.7-1.6 1.1-12.8H10.7L10.2 10H21l-.1.1z" fill="white" />
      </svg>
    ),
    'CSS': (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#264de4" />
        <path d="M7 4l2 22 7 2 7-2 2-22H7zm14 6h-9.7l.3 3.5h9.1l-.9 10-4 1.1-4-1.1-.3-3.5h2.9l.2 1.8 1.2.3 1.2-.3.2-2.7H10.4l-.7-7.5H21v-.6z" fill="white" />
      </svg>
    ),
    // ── Tools
    'MySQL': (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#4479A1" />
        <path d="M8 10c0-1.5 3.6-2.8 8-2.8s8 1.3 8 2.8c0 1.5-3.6 2.8-8 2.8S8 11.5 8 10zm0 0v4c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8v-4m0 4v4c0 1.5-3.6 2.8-8 2.8S8 19.5 8 18v-4" stroke="white" strokeWidth="1.3" fill="none" />
        <path d="M8 18v4c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8v-4" stroke="white" strokeWidth="1.3" fill="none" />
      </svg>
    ),
    'MongoDB': (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#13aa52" />
        <path d="M16 4c0 0-6.5 8.5-6.5 14.5 0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5C22.5 12.5 16 4 16 4z" fill="white" />
        <rect x="15" y="22" width="2" height="6" fill="white" />
      </svg>
    ),
    'Git': (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#F05032" />
        <path d="M28.3 14.7l-11-11a1.9 1.9 0 00-2.6 0L12 6.4l3.3 3.3a2.2 2.2 0 012.7 2.8l3.2 3.2a2.2 2.2 0 112.8 2.8 2.2 2.2 0 01-2.2-2.2c0-.3.1-.5.1-.8L18.7 13v7.1a2.2 2.2 0 11-2.4.5 2.2 2.2 0 01.6-1.5V13a2.2 2.2 0 01-1.2-2.9L12.5 6.8l-9 9a1.9 1.9 0 000 2.7l11 11a1.9 1.9 0 002.7 0l11-11a1.9 1.9 0 000-2.8z" fill="white" />
      </svg>
    ),
    'GitHub': (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#161B22" />
        <path d="M16 5C10 5 5 10 5 16c0 4.9 3.2 9 7.6 10.5.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.5-.3-5.2-1.3-5.2-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 015.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.2 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5C23.8 25 27 20.9 27 16c0-6-4.9-11-11-11z" fill="white" />
      </svg>
    ),
    'Figma': (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#1e1e1e" />
        <rect x="10" y="5" width="6" height="6" rx="3" fill="#FF7262" />
        <rect x="16" y="5" width="6" height="6" rx="3" fill="#F24E1E" />
        <rect x="10" y="11" width="6" height="6" rx="1" fill="#A259FF" />
        <circle cx="19" cy="14" r="3" fill="#1ABCFE" />
        <rect x="10" y="17" width="6" height="6" rx="3" fill="#0ACF83" />
      </svg>
    ),
    'Postman': (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#FF6C37" />
        <circle cx="16" cy="16" r="8" fill="white" opacity="0.9" />
        <path d="M11 13l7 3-7 3V13z" fill="#FF6C37" />
      </svg>
    ),
    // ── Core CS (Creative themed icons)
    'DBMS': (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#7C3AED" />
        <ellipse cx="16" cy="10" rx="8" ry="3" fill="none" stroke="white" strokeWidth="1.5" />
        <path d="M8 10v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M8 16v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" stroke="white" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    'OS': (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#0369a1" />
        <rect x="5" y="7" width="22" height="14" rx="2" fill="none" stroke="white" strokeWidth="1.5" />
        <path d="M12 21v4M20 21v4M10 25h12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="9" y="11" width="5" height="3" rx="1" fill="white" opacity="0.6" />
        <rect x="18" y="11" width="5" height="3" rx="1" fill="white" opacity="0.6" />
        <rect x="9" y="15" width="14" height="2" rx="1" fill="white" opacity="0.3" />
      </svg>
    ),
    'CN': (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#0f766e" />
        <circle cx="16" cy="16" r="6" fill="none" stroke="white" strokeWidth="1.5" />
        <path d="M16 10c-2 2-3 4-3 6s1 4 3 6M16 10c2 2 3 4 3 6s-1 4-3 6" stroke="white" strokeWidth="1.2" />
        <path d="M10 16h12M5 16h5M22 16h5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    'OOPs': (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#b45309" />
        <rect x="6" y="6" width="9" height="8" rx="2" fill="white" opacity="0.85" />
        <rect x="17" y="6" width="9" height="8" rx="2" fill="white" opacity="0.5" />
        <rect x="6" y="18" width="9" height="8" rx="2" fill="white" opacity="0.5" />
        <rect x="17" y="18" width="9" height="8" rx="2" fill="white" opacity="0.3" />
        <path d="M10.5 14v4M21.5 14v4M14 10h4" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
    'DSA': (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#be123c" />
        <path d="M8 24L14 12L18 20L22 14L26 24" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fill="none" />
        <circle cx="8" cy="24" r="1.5" fill="white" />
        <circle cx="14" cy="12" r="1.5" fill="white" />
        <circle cx="18" cy="20" r="1.5" fill="white" />
        <circle cx="22" cy="14" r="1.5" fill="white" />
        <circle cx="26" cy="24" r="1.5" fill="white" />
      </svg>
    ),
  }

  return icons[name] || (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <rect width="32" height="32" rx="6" fill="#4F46E5" />
      <text x="5" y="21" fontSize="10" fontWeight="bold" fill="white" fontFamily="monospace">{name.slice(0, 3)}</text>
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════════
  Skills data
═══════════════════════════════════════════════════════════════════ */
const skills = [
  {
    category: 'Languages',
    icon: <Terminal size={16} />,
    color: '#6366f1',
    items: ['C++', 'JavaScript', 'Java', 'Python', 'PHP'],
  },
  {
    category: 'Frameworks',
    icon: <Layers size={16} />,
    color: '#a855f7',
    items: ['ReactJS', 'NodeJS', 'Express', 'TailwindCSS', 'HTML', 'CSS'],
  },
  {
    category: 'Tools',
    icon: <Globe size={16} />,
    color: '#3b82f6',
    items: ['MySQL', 'MongoDB', 'Git', 'GitHub', 'Figma', 'Postman'],
  },
  {
    category: 'Core CS',
    icon: <Cpu size={16} />,
    color: '#06b6d4',
    items: ['DBMS', 'OS', 'CN', 'OOPs', 'DSA'],
  },
]

const stats = [
  { value: '500+', label: 'DSA Problems', icon: Code2, color: '#6366f1' },
  { value: '8.11', label: 'CGPA at LPU', icon: BookOpen, color: '#a855f7' },
  { value: '10+', label: 'Projects Built', icon: Server, color: '#3b82f6' },
  { value: 'Top 10', label: 'Hackathons', icon: Trophy, color: '#06b6d4' },
]

const achievements = [
  { icon: '🏆', text: 'Ranked 461 / 10,000+ in CodeClash — The August Arena' },
  { icon: '🥇', text: 'Top 10 in Trinetra Web Hackathon — AI mental health solution' },
  { icon: '💡', text: '500+ DSA problems on LeetCode, Coding Ninjas & GFG' },
]

const softSkills = ['Time Management', 'Leadership', 'Problem Solving', 'Adaptability']

/* ── Tilt card ────────────────────────────────────────────────────── */
function TiltCard({ children, className }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className={className}>
      {children}
    </motion.div>
  )
}

/* ── Framer variants ──────────────────────────────────────────────── */
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const fadeUp = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }
const fadeRight = { hidden: { opacity: 0, x: -28 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }


/* ══════════════════════════════════════════════════════════════════
   Main Component
═══════════════════════════════════════════════════════════════════ */
export default function About({ isDark }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeSkill, setActiveSkill] = useState(0)

  const glass = isDark
    ? 'bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm hover:border-white/[0.14] transition-colors duration-300'
    : 'bg-white/80 border border-gray-200/80 shadow-sm hover:shadow-md backdrop-blur-sm transition-all duration-300'

  return (
    <section id="about" ref={ref}
      className={`section-padding relative overflow-hidden ${isDark ? 'bg-dark-bg' : 'bg-gradient-to-br from-gray-100 to-gray-200/50'}`}>

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`blob absolute w-96 h-96 rounded-full blur-3xl opacity-20 -top-20 -left-20 ${isDark ? 'bg-indigo-600' : 'bg-indigo-300'}`} />
        <div className={`blob blob-delay-1 absolute w-80 h-80 rounded-full blur-3xl opacity-15 top-1/3 right-0 ${isDark ? 'bg-purple-600' : 'bg-purple-300'}`} />
        <div className={`blob blob-delay-2 absolute w-72 h-72 rounded-full blur-3xl opacity-10 bottom-10 left-1/3 ${isDark ? 'bg-blue-600' : 'bg-blue-300'}`} />
        {isDark && <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />}
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          {/* Header */}
          <motion.div variants={fadeUp} className="mb-16 text-center">
            <motion.p className={`font-mono text-sm mb-3 tracking-widest uppercase ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`}
              initial={{ opacity: 0, letterSpacing: '0.4em' }}
              animate={inView ? { opacity: 1, letterSpacing: '0.15em' } : {}}
              transition={{ duration: 0.8 }}>

            </motion.p>
            <h2 className={`font-display font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', letterSpacing: '-0.02em' }}>
              About <span className="gradient-text">Me</span>
            </h2>
            <motion.div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
              initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }} />
          </motion.div>

          {/* Row 1: Bio + Stats */}
          <div className="grid lg:grid-cols-5 gap-5 mb-5">

            {/* Bio card */}
            <motion.div variants={fadeRight} className="lg:col-span-3">
              <TiltCard className={`relative p-8 rounded-3xl overflow-hidden h-full ${glass}`}>
                {isDark && <>
                  <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
                </>}

                <div className="flex items-center gap-3 mb-6">
                  <motion.div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center"
                    animate={{ rotate: [0, 6, -6, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>
                    <Users size={18} className="text-indigo-400" />
                  </motion.div>
                  <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/40 to-transparent" />
                  <span className={`font-mono text-xs tracking-widest uppercase ${isDark ? 'text-indigo-400/70' : 'text-indigo-500/80'}`}>who i am</span>
                </div>

                <p className={`text-base leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: '"Inter", sans-serif' }}>
                  I'm <span className="font-bold text-indigo-400">Anuj Kumar</span> — a full-stack developer and{' '}
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Computer Science student at LPU</span>{' '}
                  with a strong CGPA of <span className="gradient-text font-bold">8.11</span>. I don't just write code —
                  I architect solutions. From building scalable backends with Node.js to crafting pixel-perfect
                  React UIs, I love owning the entire product, end to end.
                </p>

                <p className={`text-base leading-relaxed mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: '"Inter", sans-serif' }}>
                  My real obsession? <span className="font-semibold text-purple-400">Data Structures & Algorithms</span>.
                  I've solved <span className="font-semibold text-white">500+</span> problems across LeetCode, GFG and Coding Ninjas,
                  sharpening my analytical thinking every single day — because strong fundamentals are what separate good engineers from great ones.
                </p>

                <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: '"Inter", sans-serif' }}>
                  I'm deeply <span className="font-semibold text-cyan-400">ambitious</span>: I've competed in national hackathons
                  (Top 10 at Trinetra, ranked 461/10K+ at CodeClash), shipped{' '}
                  <span className="font-semibold">production-ready apps</span>, and I'm actively exploring
                  cloud & AI to build the next generation of smart, scalable systems.
                </p>

                <div className="flex flex-wrap gap-2">
                  {softSkills.map((s, i) => (
                    <motion.span key={s}
                      initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 260 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-default ${isDark
                        ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:border-indigo-400/50'
                        : 'bg-indigo-50 border border-indigo-200 text-indigo-600 hover:bg-indigo-100'
                        }`}
                      style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px' }}>
                      {s}
                    </motion.span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="lg:col-span-2 grid grid-cols-2 gap-4">
              {stats.map(({ value, label, icon: Icon, color }, i) => (
                <TiltCard key={label}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2 + i * 0.1, type: 'spring' }}
                    className={`relative p-5 rounded-2xl overflow-hidden flex flex-col justify-between cursor-default h-full ${glass}`}>
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                      style={{ background: `radial-gradient(circle at 50% 50%, ${color}18, transparent 70%)` }} />
                    <motion.div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 relative z-10"
                      style={{ background: `${color}20`, color }}
                      whileHover={{ rotate: [0, -12, 12, 0], transition: { duration: 0.4 } }}>
                      <Icon size={16} />
                    </motion.div>
                    <div className="relative z-10">
                      <motion.span key={inView} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                        className="block font-display font-black text-2xl gradient-text">{value}</motion.span>
                      <p className={`text-xs font-mono mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{label}</p>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </motion.div>
          </div>

          {/* Skills */}
          <motion.div variants={fadeUp} className={`relative rounded-3xl overflow-hidden mb-5 ${glass}`}>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <motion.div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center"
                  animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>
                  <Code2 size={18} className="text-purple-400" />
                </motion.div>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-500/40 to-transparent" />
                <span className={`font-mono text-xs tracking-widest uppercase ${isDark ? 'text-purple-400/70' : 'text-purple-500/80'}`}>tech stack</span>
              </div>

              {/* Category tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {skills.map((s, i) => (
                  <motion.button key={s.category} onClick={() => setActiveSkill(i)}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                    className="px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all border"
                    style={activeSkill === i
                      ? { background: `linear-gradient(135deg, ${s.color}, ${skills[(i + 1) % skills.length].color})`, color: '#fff', border: 'none' }
                      : { background: 'transparent', color: isDark ? '#9ca3af' : '#6b7280', border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e5e7eb' }}>
                    <span className="flex items-center gap-1.5">{s.icon} {s.category}</span>
                  </motion.button>
                ))}
              </div>

              {/* Tech icon pills */}
              <motion.div key={activeSkill}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
                className="flex flex-wrap gap-3">
                {skills[activeSkill].items.map((tech, i) => (
                  <motion.span key={tech}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: i * 0.07, type: 'spring', stiffness: 260, damping: 20 }}
                    whileHover={{ scale: 1.1, y: -4 }}
                    className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-mono font-medium border cursor-default transition-all ${isDark
                      ? 'bg-white/[0.05] border-white/[0.10] text-gray-200 hover:border-indigo-500/40 hover:bg-white/[0.10]'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300 hover:shadow-sm'
                      }`}>
                    {/* Tech icon instead of dot */}
                    <span className="flex-shrink-0 rounded-md overflow-hidden" style={{ lineHeight: 0 }}>
                      <TechIcon name={tech} size={20} />
                    </span>
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div variants={fadeUp} className={`relative rounded-3xl overflow-hidden ${glass}`}>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <motion.div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center"
                  animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}>
                  <Star size={18} className="text-cyan-400" />
                </motion.div>
                <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 to-transparent" />
                <span className={`font-mono text-xs tracking-widest uppercase ${isDark ? 'text-cyan-400/70' : 'text-cyan-500/80'}`}>highlights</span>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {achievements.map(({ icon, text }, i) => (
                  <motion.div key={text}
                    initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    className={`flex items-start gap-3 p-4 rounded-2xl border transition-all cursor-default ${isDark
                      ? 'bg-white/[0.03] border-white/[0.06] hover:border-cyan-500/30 hover:bg-white/[0.07]'
                      : 'bg-gray-50/80 border-gray-200 hover:border-cyan-300 hover:bg-white'
                      }`}>
                    <motion.span className="text-2xl flex-shrink-0 mt-0.5"
                      whileHover={{ rotate: [0, -15, 15, 0] }} transition={{ duration: 0.4 }}>
                      {icon}
                    </motion.span>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: '"Inter", sans-serif' }}>
                      {text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
    </section>
  )
}
