import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import Footer from './components/Footer'
import Birds from './components/Birds'
import ThemeSlider from './components/ThemeSlider'
import EmberCaseStudy from './pages/EmberCaseStudy'
import BuyForMeCaseStudy from './pages/BuyForMeCaseStudy'
import PodCaseStudy from './pages/PodCaseStudy'
import AskCRCaseStudy from './pages/AskCRCaseStudy'
import ChatGPTCaseStudy from './pages/ChatGPTCaseStudy'
import { useSpotifyPlayer } from './context/SpotifyPlayerContext'
import { useTheme } from './context/ThemeContext'

function MiniPlayer() {
  const { playing, playerReady, trackInfo, toggle, nextTrack, prevTrack } = useSpotifyPlayer()
  const { night, sunset } = useTheme()
  const location = useLocation()
  const [heroVisible, setHeroVisible] = useState(true)

  // On home page, hide when the first snap section (Hero) is in view
  useEffect(() => {
    if (location.pathname !== '/') {
      setHeroVisible(false)
      return
    }

    const container = document.getElementById('home-slides')
    if (!container) { setHeroVisible(true); return }

    const check = () => setHeroVisible(container.scrollTop < container.clientHeight * 0.5)
    check()
    container.addEventListener('scroll', check, { passive: true })
    return () => container.removeEventListener('scroll', check)
  }, [location.pathname])

  const show = playerReady && !heroVisible

  const bg = night ? 'rgba(6,13,26,0.90)' : sunset ? 'rgba(26,8,48,0.90)' : 'rgba(253,248,242,0.90)'
  const border = night ? 'rgba(0,200,255,0.14)' : sunset ? 'rgba(255,120,50,0.18)' : 'rgba(120,113,108,0.14)'
  const accent = night ? 'rgba(0,200,255,0.72)' : sunset ? 'rgba(255,140,50,0.78)' : 'rgba(180,83,9,0.7)'
  const primary = night ? '#c8ddf0' : sunset ? '#f8d8b8' : '#44403c'
  const controlBg = night ? 'rgba(5,14,24,0.72)' : sunset ? 'rgba(56,21,42,0.65)' : 'rgba(255,255,255,0.74)'
  const controlBorder = night ? 'rgba(0,200,255,0.22)' : sunset ? 'rgba(255,140,50,0.28)' : 'rgba(120,113,108,0.25)'
  const labelBg = night ? 'radial-gradient(circle at 38% 38%, #0099cc, #004d80)'
    : sunset ? 'radial-gradient(circle at 38% 38%, #e05820, #7a1830)'
      : 'radial-gradient(circle at 38% 38%, #f97316, #b91c1c)'

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="mini-player"
          initial={{ opacity: 0, y: 20, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.94 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 hidden md:flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer select-none"
          style={{
            background: bg,
            border: `1px solid ${border}`,
            backdropFilter: 'blur(18px)',
            boxShadow: night ? '0 8px 32px rgba(0,0,0,0.5)' : '0 8px 24px rgba(0,0,0,0.12)',
            maxWidth: 320,
          }}
          onClick={toggle}
        >
          {/* Spinning vinyl record */}
          <div
            className={`w-9 h-9 rounded-full flex-shrink-0 relative overflow-hidden vinyl-spin ${playing ? 'is-playing' : ''}`}
            style={{
              background: 'radial-gradient(circle at 50% 50%, #222, #111)',
              boxShadow: playing ? `0 0 10px ${accent}` : 'none',
            }}
          >
            <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)' }} />
            <div className="absolute rounded-full" style={{ inset: '28%', background: labelBg }} />
            <div className="absolute rounded-full bg-black" style={{ inset: '44%' }} />
          </div>

          {/* Track info */}
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-bold tracking-[0.22em] uppercase mb-0.5" style={{ color: accent }}>
              {playing ? 'Now Playing' : 'Paused'}
            </p>
            <p className="text-[13px] font-semibold tracking-tight leading-tight truncate" style={{ color: primary }}>
              {trackInfo.artist || '—'}
            </p>
            {trackInfo.title && (
              <p className="text-[10px] opacity-55 truncate mt-0.5 leading-tight" style={{ color: primary }}>
                {trackInfo.title}
              </p>
            )}
          </div>

          {/* Transport controls */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              type="button"
              aria-label="Previous track"
              className="w-7 h-7 rounded-full inline-flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ background: controlBg, border: `1px solid ${controlBorder}`, color: accent }}
              onClick={e => { e.stopPropagation(); prevTrack() }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="11,12 20,18 20,6" />
                <polygon points="4,12 13,18 13,6" />
              </svg>
            </button>

            <button
              type="button"
              aria-label={playing ? 'Pause' : 'Play'}
              className="w-8 h-8 rounded-full inline-flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ background: controlBg, border: `1px solid ${controlBorder}`, color: accent }}
              onClick={e => { e.stopPropagation(); toggle() }}
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="5" y="4" width="4" height="16" rx="1.5" />
                  <rect x="15" y="4" width="4" height="16" rx="1.5" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <polygon points="5,3 20,12 5,21" />
                </svg>
              )}
            </button>

            <button
              type="button"
              aria-label="Next track"
              className="w-7 h-7 rounded-full inline-flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ background: controlBg, border: `1px solid ${controlBorder}`, color: accent }}
              onClick={e => { e.stopPropagation(); nextTrack() }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="13,12 4,18 4,6" />
                <polygon points="20,12 11,18 11,6" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Home() {
  const location = useLocation()
  const didScrollOnMount = useRef(false)
  const slidesRef = useRef(null)

  useEffect(() => {
    if (didScrollOnMount.current) return

    if (location.state?.fromCaseStudy) {
      const targetSlug = location.state?.fromCaseStudySlug
      const targetId = targetSlug ? `card-${targetSlug}` : 'work'
      requestAnimationFrame(() => {
        const el = document.getElementById(targetId) || document.getElementById('work')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } else {
      const container = slidesRef.current
      if (container) {
        container.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      } else {
        window.scrollTo(0, 0)
      }
    }

    didScrollOnMount.current = true
  }, [location.state])

  return (
    <div className="min-h-screen">
      <ThemeSlider />
      <Birds />
      <Nav />
      <main
        id="home-slides"
        ref={slidesRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory overscroll-y-contain [&>section]:min-h-screen"
      >
        <Hero />
        <Work />
        <section className="snap-start snap-always">
          <Footer />
        </section>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ember" element={<EmberCaseStudy />} />
        <Route path="/buy-for-me" element={<BuyForMeCaseStudy />} />
        <Route path="/pod" element={<PodCaseStudy />} />
        <Route path="/askcr-bfm" element={<AskCRCaseStudy />} />
        <Route path="/chatgpt" element={<ChatGPTCaseStudy />} />
      </Routes>
      <MiniPlayer />
    </>
  )
}