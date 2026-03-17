import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Search, X, Github, ExternalLink, LayoutGrid, Layers } from 'lucide-react'
import { projects } from '../data/projects'
import ProjectDesc from './projectDesc/ProjectDesc'

const FONTS = 'https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Inter:wght@400;500;600&family=Fira+Code:wght@400;500&display=swap'
const ALL_CATS = ['All', ...Array.from(new Set(projects.map(p => (p.category || 'Other').split(' / ')[0])))]

/* ─── Mini Card ─────────────────────────────────────────────────── */
function MiniCard({ project, isDark, onClick }) {
  const [hover, setHover] = useState(false)
  const accent = project.color || '#6366f1'
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onClick(project)}
      style={{
        borderRadius: 10, overflow: 'hidden', flexShrink: 0, marginBottom: 12,
        background: isDark ? '#13131c' : '#ffffff',
        border: `1px solid ${hover ? accent + '60' : isDark ? '#252535' : '#e2e2ec'}`,
        boxShadow: hover ? `0 10px 28px -6px ${accent}28` : isDark ? '0 2px 8px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
        transform: hover ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      <div style={{ height: 2, background: hover ? `linear-gradient(90deg,${accent},transparent)` : 'transparent', transition: 'background 0.25s' }} />
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
        {project.image ? (
          <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hover ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDark ? '#0d0d18' : '#f2f2fa' }}>
            <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 36, color: isDark ? '#252535' : '#dedefa' }}>{(project.title || 'P')[0]}</span>
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'rgba(4,4,14,0.65)', opacity: hover ? 1 : 0, transition: 'opacity 0.18s' }}>
          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px', borderRadius: 6, fontFamily: 'Fira Code', fontSize: 10, color: '#fff', textDecoration: 'none', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}><Github size={11} /> GitHub</a>}
          {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px', borderRadius: 6, fontFamily: 'Fira Code', fontSize: 10, color: '#fff', textDecoration: 'none', background: accent, border: `1px solid ${accent}` }}><ExternalLink size={11} /> Live</a>}
        </div>
        <span style={{ position: 'absolute', top: 7, left: 7, fontFamily: 'Fira Code', fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '2px 7px', borderRadius: 3, background: 'rgba(4,4,14,0.78)', color: accent, border: `1px solid ${accent}35`, backdropFilter: 'blur(4px)' }}>
          {(project.category || 'other').split(' / ')[0]}
        </span>
      </div>
      <div style={{ padding: '10px 12px 13px' }}>
        <h3 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 16, letterSpacing: '-0.02em', color: isDark ? '#ffffff' : '#0a0a18', marginBottom: 4, lineHeight: 1.2 }}>{project.title}</h3>
        <p style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 13, color: isDark ? '#d0d0e8' : '#303050', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.subtitle || project.description || '—'}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 9 }}>
          {project.tech?.slice(0, 3).map(t => <span key={t} style={{ fontFamily: 'Fira Code', fontSize: 8, letterSpacing: '0.05em', padding: '2px 6px', borderRadius: 3, background: isDark ? '#1a1a28' : '#f0f0fa', color: isDark ? '#6060a0' : '#8080a8', border: isDark ? '1px solid #252535' : '1px solid #e0e0f0' }}>{t}</span>)}
        </div>
      </div>
    </div>
  )
}

/* ─── Grid Card (flat view) ─────────────────────────────────────── */
function GridCard({ project, isDark, onClick }) {
  const [hover, setHover] = useState(false)
  const accent = project.color || '#6366f1'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onClick(project)}
      style={{
        borderRadius: 10, overflow: 'hidden',
        background: isDark ? '#13131c' : '#ffffff',
        border: `1px solid ${hover ? accent + '60' : isDark ? '#252535' : '#e2e2ec'}`,
        boxShadow: hover ? `0 10px 28px -6px ${accent}28` : isDark ? '0 2px 8px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.06)',
        cursor: 'pointer', transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <div style={{ height: 2, background: hover ? `linear-gradient(90deg,${accent},transparent)` : 'transparent', transition: 'background 0.25s' }} />
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
        {project.image ? <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hover ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.5s' }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDark ? '#0d0d18' : '#f2f2fa' }}><span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 36, color: isDark ? '#252535' : '#dedefa' }}>{(project.title || 'P')[0]}</span></div>}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'rgba(4,4,14,0.65)', opacity: hover ? 1 : 0, transition: 'opacity 0.18s' }}>
          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px', borderRadius: 6, fontFamily: 'Fira Code', fontSize: 10, color: '#fff', textDecoration: 'none', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}><Github size={11} /> GitHub</a>}
          {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px', borderRadius: 6, fontFamily: 'Fira Code', fontSize: 10, color: '#fff', textDecoration: 'none', background: accent }}><ExternalLink size={11} /> Live</a>}
        </div>
        <span style={{ position: 'absolute', top: 7, left: 7, fontFamily: 'Fira Code', fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '2px 7px', borderRadius: 3, background: 'rgba(4,4,14,0.78)', color: accent, border: `1px solid ${accent}35`, backdropFilter: 'blur(4px)' }}>{(project.category || 'other').split(' / ')[0]}</span>
      </div>
      <div style={{ padding: '10px 12px 13px' }}>
        <h3 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 16, letterSpacing: '-0.02em', color: isDark ? '#ffffff' : '#0a0a18', marginBottom: 4, lineHeight: 1.2 }}>{project.title}</h3>
        <p style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 13, color: isDark ? '#d0d0e8' : '#303050', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.subtitle || project.description || '—'}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 9 }}>
          {project.tech?.slice(0, 3).map(t => <span key={t} style={{ fontFamily: 'Fira Code', fontSize: 8, padding: '2px 6px', borderRadius: 3, background: isDark ? '#1a1a28' : '#f0f0fa', color: isDark ? '#6060a0' : '#8080a8', border: isDark ? '1px solid #252535' : '1px solid #e0e0f0' }}>{t}</span>)}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Drift Column — auto scroll + manual wheel + hover pause ───── */
function DriftColumn({ items, direction, isDark, onClick, chamberBg }) {
  const CARD_H   = 235   // approx px per card incl margin
  const STEP     = 130   // px per auto burst
  const MOVE_MS  = 6500  // ms for one step
  const PAUSE_MS = 2500  // ms pause between steps

  const looped   = [...items, ...items, ...items]
  const totalH   = items.length * CARD_H

  const offsetRef  = useRef(0)        // current y offset (px, always negative = up)
  const rafRef     = useRef(null)
  const pauseRef   = useRef(false)    // true while hovering
  const manualRef  = useRef(false)    // true briefly after wheel
  const phaseRef   = useRef('pause')  // 'move' | 'pause'
  const phaseTimer = useRef(null)
  const startYRef  = useRef(null)
  const startOffRef= useRef(null)
  const elRef      = useRef(null)

  // apply transform directly — no react re-render on every frame
  const applyY = useCallback((y) => {
    if (!elRef.current) return
    // wrap: keep within [-totalH*2, 0]
    let wrapped = y % totalH
    if (wrapped > 0) wrapped -= totalH
    offsetRef.current = wrapped
    elRef.current.style.transform = `translateY(${wrapped}px)`
  }, [totalH])

  // ── auto drift loop ──────────────────────────────────────────────
  useEffect(() => {
    let targetOffset = offsetRef.current
    let animStart = null
    let animFrom  = null

    const tick = (ts) => {
      rafRef.current = requestAnimationFrame(tick)
      if (pauseRef.current || manualRef.current) return

      if (phaseRef.current === 'pause') return

      // moving phase: ease toward target
      if (animStart === null) { animStart = ts; animFrom = offsetRef.current }
      const elapsed = ts - animStart
      const progress = Math.min(elapsed / MOVE_MS, 1)
      // ease in-out cubic
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2

      const newY = animFrom + (targetOffset - animFrom) * eased
      applyY(newY)

      if (progress >= 1) {
        // move done → start pause
        phaseRef.current = 'pause'
        animStart = null
        phaseTimer.current = setTimeout(() => {
          // pause done → queue next move
          targetOffset = offsetRef.current - (direction > 0 ? STEP : -STEP)
          phaseRef.current = 'move'
        }, PAUSE_MS)
      }
    }

    // kick off first move after initial pause
    phaseTimer.current = setTimeout(() => {
      targetOffset = offsetRef.current - (direction > 0 ? STEP : -STEP)
      phaseRef.current = 'move'
    }, PAUSE_MS)

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(phaseTimer.current)
    }
  }, [direction, applyY])

  // ── wheel handler ────────────────────────────────────────────────
  const onWheel = useCallback((e) => {
    e.preventDefault()
    manualRef.current = true
    clearTimeout(manualRef._timer)
    applyY(offsetRef.current - e.deltaY * 0.6)
    // resume auto after 1.5s of no scrolling
    manualRef._timer = setTimeout(() => { manualRef.current = false }, 1500)
  }, [applyY])

  // ── touch handlers ───────────────────────────────────────────────
  const onTouchStart = useCallback((e) => {
    startYRef.current = e.touches[0].clientY
    startOffRef.current = offsetRef.current
    manualRef.current = true
    clearTimeout(manualRef._timer)
  }, [])

  const onTouchMove = useCallback((e) => {
    const dy = e.touches[0].clientY - startYRef.current
    applyY(startOffRef.current + dy)
  }, [applyY])

  const onTouchEnd = useCallback(() => {
    manualRef._timer = setTimeout(() => { manualRef.current = false }, 1500)
  }, [])

  return (
    <div
      style={{ flex: 1, overflow: 'hidden', position: 'relative', minWidth: 0 }}
      onMouseEnter={() => { pauseRef.current = true }}
      onMouseLeave={() => { pauseRef.current = false }}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div ref={elRef} style={{ willChange: 'transform' }}>
        {looped.map((project, i) => (
          <MiniCard key={`${project.id || project.title}-${i}`} project={project} isDark={isDark} onClick={onClick} />
        ))}
      </div>
      {/* fade masks */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 64, background: `linear-gradient(to bottom, ${chamberBg}, transparent)`, pointerEvents: 'none', zIndex: 3 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 64, background: `linear-gradient(to top, ${chamberBg}, transparent)`, pointerEvents: 'none', zIndex: 3 }} />
    </div>
  )
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function AllProjects({ isDark: _isDark, onBack }) {
  const [search, setSearch]   = useState('')
  const [cat, setCat]         = useState('All')
  const [selected, setSelected] = useState(null)
  const [mode, setMode]       = useState('chamber') // 'chamber' | 'grid'
  const [isDark, setIsDark]   = useState(_isDark)

  useEffect(() => {
    if (!document.getElementById('ap-fonts')) {
      const l = document.createElement('link')
      l.id = 'ap-fonts'; l.rel = 'stylesheet'; l.href = FONTS
      document.head.appendChild(l)
    }
  }, [])

  const filtered = projects.filter(p => {
    const mc = cat === 'All' || (p.category || '').includes(cat)
    const ms = !search ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      (p.subtitle || '').toLowerCase().includes(search.toLowerCase()) ||
      p.tech?.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return mc && ms
  })

  const col1 = filtered.filter((_, i) => i % 3 === 0)
  const col2 = filtered.filter((_, i) => i % 3 === 1)
  const col3 = filtered.filter((_, i) => i % 3 === 2)
  const safe = col => col.length < 3 ? [...col, ...col, ...col, ...col].slice(0, 9) : col

  const bg         = isDark ? '#030712' : '#f1f5fb'
  const surface    = isDark ? '#0f172a' : '#ffffff'
  const chamberBg  = isDark ? '#08090f' : '#e6f0fa'
  const chamberBdr = isDark ? '#141726' : '#cce0f5'
  const fg         = isDark ? '#ffffff' : '#0f172a'
  const fgSub      = isDark ? '#cce0f5' : '#334155'
  const fgMuted    = isDark ? '#94a3b8' : '#64748b'
  const border     = isDark ? '#161a2b' : '#d6e6f5'

  return (
    <>
      <style>{`@import url('${FONTS}'); .ap-s::placeholder{color:${fgMuted}}`}</style>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
        style={{ position: 'fixed', inset: 0, zIndex: 50, background: bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
        {/* Background blobs – same as Hero */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div className={`blob absolute w-96 h-96 rounded-full blur-3xl opacity-20 -top-20 -left-20 ${isDark ? 'bg-indigo-600' : 'bg-indigo-300'}`} />
          <div className={`blob blob-delay-1 absolute w-80 h-80 rounded-full blur-3xl opacity-15 top-1/3 right-0 ${isDark ? 'bg-purple-600' : 'bg-purple-300'}`} />
          <div className={`blob blob-delay-2 absolute w-72 h-72 rounded-full blur-3xl opacity-10 bottom-10 left-1/3 ${isDark ? 'bg-blue-600' : 'bg-blue-300'}`} />
          {isDark && (
            <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          )}
        </div>
        {/* ── Top bar ─────────────────────────────────────── */}
        <div style={{ flexShrink: 0, padding: '40px 60px', borderBottom: `1px solid ${border}`, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 32, background: bg, zIndex: 10, minHeight: '120px' }}>

          {/* back */}
          <button onClick={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Fira Code', fontSize: 14, letterSpacing: '0.1em', color: fgSub, background: 'none', border: 'none', padding: 0, cursor: 'pointer', transition: 'color 0.15s', flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.color = fg}
            onMouseLeave={e => e.currentTarget.style.color = fgSub}>
            <ArrowLeft size={18} /> Back
          </button>

          <div style={{ width: 1, height: 32, background: border }} />

          {/* search */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: fgMuted }} />
            <input className="ap-s" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
              style={{ paddingLeft: 34, paddingRight: search ? 30 : 14, paddingTop: 10, paddingBottom: 10, width: 220, fontFamily: 'Fira Code', fontSize: 12, borderRadius: 10, outline: 'none', background: surface, border: `1px solid ${border}`, color: fg, transition: 'all 0.2s' }} />
            {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: fgMuted, display: 'flex' }}><X size={14} /></button>}
          </div>

          {/* category pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ALL_CATS.map(c => {
              const active = cat === c
              return (
                <button key={c} onClick={() => setCat(c)}
                  style={{ fontFamily: 'Fira Code', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', transition: 'all 0.15s', background: active ? (isDark ? '#e8e8ff' : '#0a0a18') : surface, color: active ? (isDark ? '#0a0a18' : '#e8e8ff') : fgSub, border: active ? `1px solid ${isDark ? '#e8e8ff' : '#0a0a18'}` : `1px solid ${border}` }}>
                  {c}
                </button>
              )
            })}
          </div>

          {/* right side controls */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
            <span style={{ fontFamily: 'Fira Code', fontSize: 12, letterSpacing: '0.1em', color: fgMuted }}>{filtered.length} projects</span>

            <div style={{ width: 1, height: 24, background: border }} />

            {/* view toggle */}
            <button 
              onClick={() => setMode(mode === 'chamber' ? 'grid' : 'chamber')}
              style={{ 
                display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', 
                borderRadius: 12, fontFamily: 'Inter', fontWeight: 600, fontSize: 14, 
                letterSpacing: '0.02em', cursor: 'pointer', transition: 'all 0.2s', 
                background: isDark ? '#3b82f6' : '#2563eb', color: '#fff', 
                border: 'none', boxShadow: '0 4px 14px rgba(59,130,246,0.25)' 
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(59,130,246,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(59,130,246,0.25)' }}
            >
              {mode === 'chamber' ? <><LayoutGrid size={16} /> View as Cards</> : <><Layers size={16} /> Moving Cards</>}
            </button>
          </div>
        </div>

        {/* ── Chamber mode ──────────────────────────────────── */}
        {mode === 'chamber' && (
          <div style={{ flex: 1, padding: '1% 4%', minHeight: 0, display: 'flex' }}>
            <div style={{ flex: 1, borderRadius: 20, border: `1px solid ${chamberBdr}`, background: chamberBg, overflow: 'hidden', display: 'flex', boxShadow: isDark ? 'inset 0 0 80px rgba(0,0,0,0.4)' : 'inset 0 0 50px rgba(0,0,0,0.03), 0 4px 40px rgba(0,0,0,0.07)' }}>
              {filtered.length === 0 ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                  <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 22, color: isDark ? '#252535' : '#d0d0e8', letterSpacing: '-0.02em' }}>Nothing found.</p>
                  <button onClick={() => { setSearch(''); setCat('All') }} style={{ fontFamily: 'Fira Code', fontSize: 11, color: fgSub, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>clear filters</button>
                </div>
              ) : (
                <div style={{ flex: 1, display: 'flex', gap: 24, padding: '0 14px', minHeight: 0, maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
                  <DriftColumn key={`c1-${cat}-${search}`} items={safe(col1)} isDark={isDark} onClick={setSelected} direction={1}  chamberBg={chamberBg} />
                  <DriftColumn key={`c2-${cat}-${search}`} items={safe(col2)} isDark={isDark} onClick={setSelected} direction={-1} chamberBg={chamberBg} />
                  <DriftColumn key={`c3-${cat}-${search}`} items={safe(col3)} isDark={isDark} onClick={setSelected} direction={1}  chamberBg={chamberBg} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Grid mode ─────────────────────────────────────── */}
        {mode === 'grid' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px 40px' }}>
            {filtered.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 14 }}>
                <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 22, color: isDark ? '#252535' : '#d0d0e8' }}>Nothing found.</p>
                <button onClick={() => { setSearch(''); setCat('All') }} style={{ fontFamily: 'Fira Code', fontSize: 11, color: fgSub, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>clear filters</button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                {filtered.map((p, i) => <GridCard key={p.id || i} project={p} isDark={isDark} onClick={setSelected} />)}
              </div>
            )}
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {selected && <ProjectDesc project={selected} isDark={isDark} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}