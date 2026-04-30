import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

function ShimmerStrip({ offset, delay, duration, heightPct, opacity, color }) {
  return (
    <motion.div
      className="absolute top-0 rounded-full"
      style={{
        left: `calc(50% + ${offset}px - 1px)`,
        width: Math.abs(offset) < 3 ? 3 : 1.5,
        background: `linear-gradient(to bottom, ${color}, transparent)`,
        filter: `blur(${Math.abs(offset) < 3 ? 1 : 0.5}px)`,
      }}
      animate={{
        height: [`${heightPct * 0.7}%`, `${heightPct}%`, `${heightPct * 0.7}%`],
        opacity: [opacity * 0.5, opacity, opacity * 0.5],
        scaleX: [0.9, 1.3, 0.9],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

function RippleCut({ top, night }) {
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2"
      style={{
        top: `${top}%`,
        height: 2,
        background: night ? 'rgba(6,13,26,0.75)' : 'rgba(253,248,242,0.65)',
        borderRadius: 1,
        zIndex: 1,
      }}
      animate={{ width: [16, 30, 16], opacity: [0.4, 0.85, 0.4], x: ['-45%', '-55%', '-45%'] }}
      transition={{ duration: 2.8 + top * 0.04, delay: top * 0.03, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

// ── Proper sun: glowing disc + alternating long/short rays ──────────────
function Sun() {
  const rayAngles = Array.from({ length: 16 }, (_, i) => i * (360 / 16))

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      style={{ width: 100, height: 100 }}
    >
      <svg viewBox="-50 -50 100 100" width="100" height="100">
        <defs>
          <radialGradient id="sunDisc" cx="40%" cy="35%" r="65%">
            <stop offset="0%"   stopColor="#fff9e0" />
            <stop offset="45%"  stopColor="#fde68a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(251,191,36,0.35)" />
            <stop offset="100%" stopColor="rgba(251,191,36,0)" />
          </radialGradient>
        </defs>

        {/* Outer glow halo */}
        <circle r="48" fill="url(#sunGlow)" />

        {/* Rays — alternating long (even index) and short (odd index) */}
        {rayAngles.map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          const inner = 20
          const outer = i % 2 === 0 ? 44 : 32
          return (
            <line
              key={deg}
              x1={inner * Math.cos(rad)}  y1={inner * Math.sin(rad)}
              x2={outer * Math.cos(rad)}  y2={outer * Math.sin(rad)}
              stroke={i % 2 === 0 ? '#fbbf24' : '#fde68a'}
              strokeWidth={i % 2 === 0 ? 2.2 : 1.4}
              strokeLinecap="round"
              opacity={i % 2 === 0 ? 0.85 : 0.6}
            />
          )
        })}

        {/* Main disc */}
        <circle r="18" fill="url(#sunDisc)" />

        {/* Bright centre highlight */}
        <circle cx="-4" cy="-4" r="6" fill="rgba(255,255,255,0.45)" />
      </svg>
    </motion.div>
  )
}

// ── Proper crescent moon using SVG mask ─────────────────────────────────
function Moon() {
  return (
    <svg viewBox="-40 -40 80 80" width="80" height="80">
      <defs>
        <radialGradient id="moonFace" cx="38%" cy="32%" r="70%">
          <stop offset="0%"   stopColor="#f0f8ff" />
          <stop offset="50%"  stopColor="#ddeeff" />
          <stop offset="100%" stopColor="#aac8e8" />
        </radialGradient>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(160,200,255,0.3)" />
          <stop offset="100%" stopColor="rgba(160,200,255,0)" />
        </radialGradient>
        {/* Mask cuts a crescent by subtracting an offset circle */}
        <mask id="crescentCut">
          <rect x="-40" y="-40" width="80" height="80" fill="white" />
          {/* Shadow circle — offset upper-right creates classic crescent */}
          <circle cx="13" cy="-10" r="21" fill="black" />
        </mask>
      </defs>

      {/* Glow halo */}
      <circle r="38" fill="url(#moonGlow)" />

      {/* Moon body with crescent cutout */}
      <circle r="22" fill="url(#moonFace)" mask="url(#crescentCut)" />

      {/* Subtle crater details */}
      <circle cx="-6" cy="6"  r="3"   fill="none" stroke="rgba(160,190,220,0.25)" strokeWidth="0.8" mask="url(#crescentCut)" />
      <circle cx="-12" cy="-4" r="2"  fill="none" stroke="rgba(160,190,220,0.2)"  strokeWidth="0.6" mask="url(#crescentCut)" />
      <circle cx="2" cy="12"  r="1.5" fill="none" stroke="rgba(160,190,220,0.2)"  strokeWidth="0.6" mask="url(#crescentCut)" />

      {/* Edge gleam on lit side */}
      <circle cx="-10" cy="-10" r="5" fill="rgba(255,255,255,0.18)" mask="url(#crescentCut)" />
    </svg>
  )
}

export default function CelestialReflection() {
  const { night } = useTheme()

  const reflMain = night ? 'rgba(0,160,220,0.85)' : 'rgba(251,180,36,0.9)'
  const reflSide = night ? 'rgba(0,200,255,0.5)'  : 'rgba(253,210,60,0.55)'

  return (
    <div
      className="absolute pointer-events-none z-0 flex flex-col items-center"
      style={{ right: '14%', top: 0, bottom: 0, width: 100 }}
    >
      {/* ── Celestial body ── */}
      <div className="relative flex-shrink-0 mt-16 flex items-center justify-center">
        {/* Pulsing outer glow */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width:  night ? 160 : 200,
            height: night ? 160 : 200,
            background: night
              ? 'radial-gradient(circle, rgba(140,190,255,0.18) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(251,191,36,0.22) 0%, transparent 70%)',
            filter: 'blur(24px)',
          }}
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.92, 1.08, 0.92] }}
          transition={{ duration: night ? 4 : 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {night ? <Moon /> : <Sun />}
      </div>

      {/* ── Water reflection ── */}
      <div className="relative flex-1 w-full overflow-hidden">
        <ShimmerStrip offset={0}   delay={0}   duration={2.2} heightPct={90} opacity={0.9}  color={reflMain} />
        <ShimmerStrip offset={-7}  delay={0.4} duration={2.8} heightPct={70} opacity={0.5}  color={reflSide} />
        <ShimmerStrip offset={7}   delay={0.7} duration={3.1} heightPct={65} opacity={0.5}  color={reflSide} />
        <ShimmerStrip offset={-16} delay={1.1} duration={2.5} heightPct={50} opacity={0.3}  color={reflSide} />
        <ShimmerStrip offset={16}  delay={0.9} duration={3.4} heightPct={45} opacity={0.3}  color={reflSide} />
        <ShimmerStrip offset={-26} delay={1.6} duration={2.9} heightPct={30} opacity={0.18} color={reflSide} />
        <ShimmerStrip offset={26}  delay={1.3} duration={3.2} heightPct={28} opacity={0.18} color={reflSide} />
        {[18, 32, 47, 61, 74].map(top => (
          <RippleCut key={top} top={top} night={night} />
        ))}
      </div>
    </div>
  )
}
