import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const SunIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="5" />
    {[0,45,90,135,180,225,270,315].map(deg => {
      const rad = (deg * Math.PI) / 180
      const x1 = 12 + 8 * Math.cos(rad)
      const y1 = 12 + 8 * Math.sin(rad)
      const x2 = 12 + 10.5 * Math.cos(rad)
      const y2 = 12 + 10.5 * Math.sin(rad)
      return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    })}
  </svg>
)

const HorizonIcon = () => (
  <svg width="12" height="10" viewBox="0 0 24 20" fill="none">
    <path d="M5 14 A7 7 0 0 0 19 14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="0" y1="14" x2="24" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="3" x2="12" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="4.2" y1="6.2" x2="6" y2="8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="19.8" y1="6.2" x2="18" y2="8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

const MoonIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

export default function ThemeSlider() {
  const { mode, toggle } = useTheme()

  const pillBg = {
    day:    'linear-gradient(180deg, #fde68a 0%, #fb923c 100%)',
    sunset: 'linear-gradient(180deg, #3d0d5e 0%, #8a2038 55%, #e05020 100%)',
    night:  'linear-gradient(180deg, #060d1a 0%, #0a1828 100%)',
  }[mode]

  const pillBorder = {
    day:    '1px solid rgba(251,146,60,0.35)',
    sunset: '1px solid rgba(255,110,50,0.35)',
    night:  '1px solid rgba(0,200,255,0.25)',
  }[mode]

  const pillShadow = {
    day:    '0 0 12px rgba(251,146,60,0.18), 0 4px 12px rgba(0,0,0,0.1)',
    sunset: '0 0 14px rgba(220,80,20,0.28), 0 4px 14px rgba(0,0,0,0.35)',
    night:  '0 0 18px rgba(0,200,255,0.12), 0 4px 16px rgba(0,0,0,0.5)',
  }[mode]

  const knobBg = {
    day:    'radial-gradient(circle at 38% 38%, #fff8e0, #fbbf24)',
    sunset: 'radial-gradient(circle at 38% 38%, #ffcc80, #e05820)',
    night:  'radial-gradient(circle at 38% 38%, #80eeff, #0099cc)',
  }[mode]

  const knobShadow = {
    day:    '0 0 8px rgba(251,191,36,0.6), 0 2px 4px rgba(0,0,0,0.15)',
    sunset: '0 0 10px rgba(255,100,30,0.65), 0 2px 6px rgba(0,0,0,0.4)',
    night:  '0 0 10px rgba(0,200,255,0.7), 0 2px 6px rgba(0,0,0,0.5)',
  }[mode]

  // Knob y-offset from bottom=5 position (sun ~88px, horizon ~50px, moon ~12px from top of 100px pill)
  const knobY = { day: 0, sunset: -38, night: -76 }[mode]

  const moonColor  = mode === 'night'  ? '#60e0ff'              : mode === 'sunset' ? 'rgba(150,80,200,0.5)' : 'rgba(180,100,20,0.35)'
  const horizColor = mode === 'sunset' ? '#ffaa55'              : mode === 'day'    ? 'rgba(180,100,20,0.35)' : 'rgba(80,140,200,0.35)'
  const sunColor   = mode === 'day'    ? '#b45309'              : mode === 'sunset' ? 'rgba(255,150,60,0.45)' : 'rgba(245,158,11,0.3)'

  const labelText  = { day: 'Day', sunset: 'Dusk', night: 'Night' }[mode]
  const labelColor = { day: 'rgba(180,100,20,0.35)', sunset: 'rgba(255,120,50,0.4)', night: 'rgba(0,200,255,0.35)' }[mode]

  return (
    <div className="hidden md:flex fixed left-5 top-1/2 -translate-y-1/2 z-50 flex-col items-center">
      <button
        onClick={toggle}
        aria-label="Cycle theme mode"
        className="relative flex flex-col items-center justify-between rounded-full"
        style={{
          width: 32,
          height: 100,
          padding: '6px 0',
          background: pillBg,
          border: pillBorder,
          boxShadow: pillShadow,
          transition: 'background 0.7s ease, border-color 0.7s ease, box-shadow 0.7s ease',
        }}
      >
        {/* Moon — top */}
        <span className="relative z-10 transition-opacity duration-500" style={{ color: moonColor }}>
          <MoonIcon />
        </span>

        {/* Horizon — middle */}
        <span className="relative z-10 transition-opacity duration-500" style={{ color: horizColor }}>
          <HorizonIcon />
        </span>

        {/* Sliding knob */}
        <motion.div
          animate={{ y: knobY }}
          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          className="absolute rounded-full"
          style={{
            width: 22,
            height: 22,
            bottom: 5,
            left: '50%',
            x: '-50%',
            background: knobBg,
            boxShadow: knobShadow,
          }}
        />

        {/* Sun — bottom */}
        <span className="relative z-10 transition-opacity duration-500" style={{ color: sunColor }}>
          <SunIcon />
        </span>
      </button>

      <motion.p
        animate={{ opacity: 1 }}
        className="mt-3 text-[8px] font-semibold tracking-[0.18em] uppercase"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          color: labelColor,
          transition: 'color 0.7s ease',
          letterSpacing: '0.15em',
        }}
      >
        {labelText}
      </motion.p>
    </div>
  )
}
