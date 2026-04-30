import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const FLOCK = [
  { y: '9vh',  delay: 0.1,  dur: 13, scale: 1.05 },
  { y: '12vh', delay: 1.1,  dur: 15, scale: 0.78 },
  { y: '7vh',  delay: 0.6,  dur: 12, scale: 0.92 },
  { y: '15vh', delay: 2.0,  dur: 16, scale: 0.62 },
  { y: '10vh', delay: 1.7,  dur: 14, scale: 0.85 },
  { y: '17vh', delay: 0.3,  dur: 17, scale: 0.55 },
  { y: '6vh',  delay: 2.8,  dur: 13, scale: 0.70 },
]

const WINGS_UP  = 'M -13,0 Q -6.5,-7 0,0 Q 6.5,-7 13,0'
const WINGS_MID = 'M -13,1 Q -6.5,-2 0,0 Q 6.5,-2 13,1'

function Bird({ y, delay, dur, scale, color }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute left-0 pointer-events-none"
      style={{ top: y, willChange: 'transform' }}
      initial={{ x: '-80px' }}
      animate={{ x: '108vw' }}
      transition={{ delay, duration: dur, ease: 'linear' }}
    >
      <motion.div
        animate={{ y: [0, -5, 0, -3, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.3 }}
      >
        <svg width={26 * scale} height={16 * scale} viewBox="-14 -8 28 16" overflow="visible">
          <motion.path
            d={WINGS_UP}
            animate={{ d: [WINGS_UP, WINGS_MID, WINGS_UP] }}
            transition={{ duration: 0.72, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.2 }}
            fill="none"
            stroke={color}
            strokeWidth={1.6 / scale}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export default function Birds() {
  const { night, sunset } = useTheme()
  const color = night ? 'rgba(180,215,245,0.75)' : sunset ? 'rgba(35,15,5,0.82)' : '#3d2c1e'
  const containerRef = useRef(null)

  useEffect(() => {
    const slideScroller = document.getElementById('home-slides')
    const scrollSource = slideScroller || window

    const update = () => {
      if (!containerRef.current) return
      const scrollTop = slideScroller ? slideScroller.scrollTop : window.scrollY
      const fade = Math.max(0, 1 - scrollTop / (window.innerHeight * 0.38))
      containerRef.current.style.opacity = fade
    }

    update()
    scrollSource.addEventListener('scroll', update, { passive: true })
    return () => scrollSource.removeEventListener('scroll', update)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-[60]">
      {FLOCK.map((b, i) => (
        <Bird key={i} {...b} color={color} />
      ))}
    </div>
  )
}
