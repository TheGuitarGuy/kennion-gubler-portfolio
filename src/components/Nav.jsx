import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import sanderlingLogoColor from '../../images/sanderling_studios_color.png'

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="5" />
    {[0,45,90,135,180,225,270,315].map(deg => {
      const rad = (deg * Math.PI) / 180
      return <line key={deg} x1={12 + 8 * Math.cos(rad)} y1={12 + 8 * Math.sin(rad)} x2={12 + 10.5 * Math.cos(rad)} y2={12 + 10.5 * Math.sin(rad)} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    })}
  </svg>
)

const MoonIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const HorizonIcon = () => (
  <svg width="14" height="11" viewBox="0 0 24 20" fill="none">
    <path d="M5 14 A7 7 0 0 0 19 14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="0" y1="14" x2="24" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="3" x2="12" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="4.2" y1="6.2" x2="6" y2="8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="19.8" y1="6.2" x2="18" y2="8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

function TimeClock() {
  const { night, sunset } = useTheme()
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const tick = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(tick)
  }, [])

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: 'numeric', minute: '2-digit',
    hour12: true, timeZoneName: 'short',
  }).formatToParts(time)

  const hm     = `${parts.find(p => p.type === 'hour').value}:${parts.find(p => p.type === 'minute').value}`
  const period = parts.find(p => p.type === 'dayPeriod')?.value  ?? ''
  const tz     = parts.find(p => p.type === 'timeZoneName')?.value ?? 'PT'

  const pillBg     = night ? 'rgba(6,13,26,0.75)'     : sunset ? 'rgba(26,8,48,0.75)'     : 'rgba(253,248,242,0.82)'
  const pillBorder = night ? 'rgba(0,200,255,0.14)'   : sunset ? 'rgba(255,120,50,0.18)'  : 'rgba(120,113,108,0.14)'
  const color      = night ? 'rgba(0,200,255,0.8)'    : sunset ? 'rgba(255,160,70,0.9)'   : 'rgba(140,65,7,0.82)'

  return (
    <div
      className="fixed top-4 right-5 z-[55] hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full select-none pointer-events-none tabular-nums"
      style={{
        background: pillBg,
        border: `1px solid ${pillBorder}`,
        backdropFilter: 'blur(12px)',
        color,
        transition: 'background 0.7s ease, border-color 0.7s ease, color 0.7s ease',
      }}
    >
      <span className="text-[13px] font-semibold tracking-[0.06em]">{hm}</span>
      <span className="text-[9px] font-medium opacity-70 tracking-[0.08em]">{period}</span>
      <span className="text-[9px] font-medium opacity-45 tracking-[0.06em]">{tz}</span>
    </div>
  )
}

export default function Nav() {
  const { night, sunset, mode, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const resumeUrl = `${import.meta.env.BASE_URL}Kennion_Gubler_Resume_2026.pdf`

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Case Studies', href: '#work' },
    { label: 'About', href: '#about' },
  ]

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="night-nav-bg fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
        style={{
          backgroundColor: night ? 'rgba(6,13,26,0.92)' : sunset ? 'rgba(26,8,48,0.92)' : 'rgba(253,248,242,0.92)',
          borderColor: night ? 'rgba(0,200,255,0.12)' : sunset ? 'rgba(255,120,50,0.14)' : 'rgba(231,229,228,0.7)',
          transition: 'background-color 0.7s ease, border-color 0.7s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center transition-colors hover:opacity-80"
            style={{ color: night ? '#60e0ff' : sunset ? '#ffaa55' : '#1c1917' }}
          >
            <img 
              src={sanderlingLogoColor} 
              alt="Sanderling Studios" 
              className="h-10 w-auto object-contain transition-all duration-700" 
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm font-medium tracking-wide transition-colors"
                style={{ color: night ? 'rgba(180,210,240,0.7)' : sunset ? 'rgba(255,200,150,0.75)' : '#78716c' }}
              >
                {label}
              </a>
            ))}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold tracking-wide px-4 py-1.5 transition-all duration-300"
              style={{
                border: night ? '1px solid rgba(0,200,255,0.35)' : sunset ? '1px solid rgba(255,130,50,0.4)' : '1px solid #c2410c',
                color: night ? 'rgba(0,200,255,0.8)' : sunset ? 'rgba(255,155,65,0.9)' : '#c2410c',
              }}
            >
              Resume
            </a>
            <a
              href="https://www.linkedin.com/in/kennion-gubler/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              aria-label="LinkedIn"
              style={{ color: night ? 'rgba(0,200,255,0.5)' : sunset ? 'rgba(255,130,50,0.55)' : '#a8a29e' }}
            >
              <LinkedInIcon />
            </a>
          </nav>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggle}
              aria-label="Cycle theme mode"
              className="transition-colors"
              style={{ color: night ? 'rgba(0,200,255,0.6)' : sunset ? 'rgba(255,140,50,0.75)' : 'rgba(180,100,20,0.7)' }}
            >
              {mode === 'day' ? <HorizonIcon /> : mode === 'sunset' ? <MoonIcon /> : <SunIcon />}
            </button>
            <button
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="flex flex-col gap-1.5 p-1"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-px"
                style={{ background: night ? '#60e0ff' : sunset ? '#ffaa55' : '#1c1917' }}
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.15 }}
                className="block w-5 h-px"
                style={{ background: night ? '#60e0ff' : sunset ? '#ffaa55' : '#1c1917' }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-px"
                style={{ background: night ? '#60e0ff' : sunset ? '#ffaa55' : '#1c1917' }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden border-b"
            style={{
              background: night ? 'rgba(6,13,26,0.98)' : sunset ? 'rgba(26,8,48,0.98)' : 'rgba(253,248,242,0.98)',
              backdropFilter: 'blur(20px)',
              borderColor: night ? 'rgba(0,200,255,0.12)' : sunset ? 'rgba(255,120,50,0.14)' : 'rgba(231,229,228,0.7)',
            }}
          >
            <div className="px-6 py-7 flex flex-col gap-5">
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium tracking-wide transition-colors"
                  style={{ color: night ? 'rgba(180,210,240,0.9)' : sunset ? 'rgba(255,200,150,0.9)' : '#44403c' }}
                >
                  {label}
                </a>
              ))}

              <div
                className="border-t pt-5 flex items-center gap-5"
                style={{ borderColor: night ? 'rgba(0,200,255,0.1)' : sunset ? 'rgba(255,120,50,0.12)' : 'rgba(231,229,228,0.8)' }}
              >
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold tracking-wide px-4 py-1.5"
                  style={{
                    border: night ? '1px solid rgba(0,200,255,0.35)' : sunset ? '1px solid rgba(255,130,50,0.4)' : '1px solid #c2410c',
                    color: night ? 'rgba(0,200,255,0.8)' : sunset ? 'rgba(255,155,65,0.9)' : '#c2410c',
                  }}
                >
                  Resume
                </a>
                <a
                  href="https://www.linkedin.com/in/kennion-gubler/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  style={{ color: night ? 'rgba(0,200,255,0.5)' : sunset ? 'rgba(255,130,50,0.55)' : '#a8a29e' }}
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <TimeClock />
    </>
  )
}
