import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Certifications from './components/Certifications'
import Education from './components/Education'
import Projects from './components/Projects'

import Contact from './components/Contact'
import Footer from './components/Footer'
import AllProjects from './components/AllProjects'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { isDark, toggle } = useTheme()
  const [showAllProjects, setShowAllProjects] = useState(false)

  // Custom cursor
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)

  // Lock body scroll when AllProjects is open
useEffect(() => {
  document.body.style.overflow = showAllProjects ? 'hidden' : ''
  return () => { document.body.style.overflow = '' }
}, [showAllProjects])

  // Scroll to top of AllProjects overlay when opened
  const handleViewAll = () => {
    
    setShowAllProjects(true)
  }

  const handleBack = () => {
    setShowAllProjects(false)
    // After animation ends scroll to the top of the page (home)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 300)
  }

  useEffect(() => {
    let rafId
    let targetFollower = { x: -100, y: -100 }

    const onMouseMove = (e) => {
      const pos = { x: e.clientX, y: e.clientY }
      setCursorPos(pos)

      const lerp = (a, b, t) => a + (b - a) * t
      const animateFollower = () => {
        targetFollower = {
          x: lerp(targetFollower.x, pos.x, 0.12),
          y: lerp(targetFollower.y, pos.y, 0.12),
        }
        setFollowerPos({ ...targetFollower })
        rafId = requestAnimationFrame(animateFollower)
      }
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(animateFollower)
    }

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setIsHovered(true)
    }
    const onMouseOut = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setIsHovered(false)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-dark-bg' : 'bg-gray-100'}`}>
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="cursor hidden md:block"
        style={{ left: cursorPos.x - 6, top: cursorPos.y - 6 }}
      />
      <div
        ref={followerRef}
        className={`cursor-follower hidden md:block ${isHovered ? 'hovered' : ''}`}
        style={{ left: followerPos.x - 18, top: followerPos.y - 18 }}
      />

      {/* Navbar — always visible */}
      <Navbar isDark={isDark} toggleTheme={toggle} onViewAllProjects={handleViewAll} />

      {/* ── Main portfolio (home) ──────────────────────────────── */}
      <main>
        <Hero isDark={isDark} />
        <About isDark={isDark} />
        <Certifications isDark={isDark} />
        <Projects isDark={isDark} onViewAll={handleViewAll} />
        <Education isDark={isDark} />
        <Contact isDark={isDark} />
      </main>

      <Footer isDark={isDark} />

      {/* ── All Projects overlay ──────────────────────────────── */}
      <AnimatePresence>
        {showAllProjects && (
          <motion.div
            key="all-projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[200] overflow-y-auto"
          >
            <AllProjects isDark={isDark} onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
