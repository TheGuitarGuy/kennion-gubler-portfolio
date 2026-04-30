import { motion } from 'framer-motion'
import { useState } from 'react'

const SURGE_DURATION = 1.15
const HOLD_MS = 180
const RECEDE_DURATION = 1.35

export default function WaveIntro({ onReveal, onDone }) {
  const [phase, setPhase] = useState('surge')

  const handleSurgeComplete = () => {
    setTimeout(() => {
      setPhase('recede')
      onReveal?.()
    }, HOLD_MS)
  }

  const handleRecedeComplete = () => {
    setPhase('done')
    onDone?.()
  }

  if (phase === 'done') return null

  return (
    <motion.div
      className="fixed inset-0 z-50 pointer-events-none"
      style={{
        background: `
          radial-gradient(ellipse at 24% 16%, rgba(186,230,253,0.55) 0%, rgba(186,230,253,0.22) 45%, transparent 74%),
          radial-gradient(ellipse at 70% 86%, rgba(125,211,252,0.45) 0%, rgba(56,189,248,0.20) 52%, transparent 82%),
          linear-gradient(180deg, rgba(240,249,255,0.18) 0%, rgba(14,116,144,0.12) 48%, rgba(6,78,110,0.20) 100%)
        `,
      }}
      initial={{ y: '100%' }}
      animate={{ y: phase === 'surge' ? '0%' : '100%' }}
      transition={
        phase === 'surge'
          ? { duration: SURGE_DURATION, ease: [0.22, 0.82, 0.34, 1] }
          : { duration: RECEDE_DURATION, ease: [0.68, 0, 0.24, 1] }
      }
      onAnimationComplete={phase === 'surge' ? handleSurgeComplete : handleRecedeComplete}
    />
  )
}
