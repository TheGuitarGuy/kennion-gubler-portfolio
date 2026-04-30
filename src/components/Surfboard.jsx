import { motion } from 'framer-motion'

export default function Surfboard({ className = '' }) {
  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      // Gentle idle sway — like a board resting against a wall in a breeze
      animate={{ rotate: [0, 1.2, 0, -0.8, 0] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
        repeatType: 'mirror',
      }}
      style={{ transformOrigin: '50% 100%' }}
    >
      <svg
        viewBox="-52 -180 104 400"
        width="96"
        height="370"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* ── Main board: California sunset gradient, nose→tail ── */}
          <linearGradient id="boardGrad" x1="0" y1="-180" x2="0" y2="210" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#fde68a" />   {/* warm gold at nose */}
            <stop offset="22%"  stopColor="#fb923c" />   {/* amber */}
            <stop offset="50%"  stopColor="#ef4444" />   {/* coral red */}
            <stop offset="75%"  stopColor="#be185d" />   {/* deep rose */}
            <stop offset="100%" stopColor="#6d28d9" />   {/* deep violet at tail */}
          </linearGradient>

          {/* ── Rail bevel: slightly lighter/cooler tint ── */}
          <linearGradient id="railGrad" x1="-52" y1="0" x2="52" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.18)" />
            <stop offset="30%"  stopColor="rgba(255,255,255,0.0)" />
            <stop offset="70%"  stopColor="rgba(255,255,255,0.0)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.14)" />
          </linearGradient>

          {/* ── Deck gloss sheen ── */}
          <radialGradient id="deckSheen" cx="35%" cy="20%" r="65%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.22)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
          </radialGradient>

          {/* ── Fin gradient ── */}
          <linearGradient id="finGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#be185d" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>

          {/* ── Drop shadow filter ── */}
          <filter id="boardShadow" x="-40%" y="-10%" width="180%" height="120%">
            <feDropShadow dx="6" dy="8" stdDeviation="8" floodColor="#1a0a00" floodOpacity="0.28" />
          </filter>
        </defs>

        {/* ══ BOARD BODY ════════════════════════════════════════ */}
        <g filter="url(#boardShadow)">

          {/* Base board shape — classic shortboard profile */}
          <path
            d="
              M 0,-172
              C 26,-148 44,-88 44,10
              C 44,80  34,140  18,162
              C 10,170  0,172  0,172
              C 0,172 -10,170 -18,162
              C -34,140 -44,80 -44,10
              C -44,-88 -26,-148 0,-172
              Z
            "
            fill="url(#boardGrad)"
          />

          {/* Rail bevel highlight */}
          <path
            d="
              M 0,-172
              C 26,-148 44,-88 44,10
              C 44,80  34,140  18,162
              C 10,170  0,172  0,172
              C 0,172 -10,170 -18,162
              C -34,140 -44,80 -44,10
              C -44,-88 -26,-148 0,-172
              Z
            "
            fill="url(#railGrad)"
          />

          {/* Deck sheen */}
          <path
            d="
              M 0,-172
              C 26,-148 44,-88 44,10
              C 44,80  34,140  18,162
              C 10,170  0,172  0,172
              C 0,172 -10,170 -18,162
              C -34,140 -44,80 -44,10
              C -44,-88 -26,-148 0,-172
              Z
            "
            fill="url(#deckSheen)"
          />
        </g>

        {/* ══ STRINGER — thin center line ═══════════════════════ */}
        <line
          x1="0" y1="-168"
          x2="0" y2="170"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* ══ RAIL PINSTRIPES ════════════════════════════════════ */}
        {/* Left rail */}
        <path
          d="M -2,-165 C -24,-142 -40,-82 -40,10 C -40,78 -31,136 -16,158"
          stroke="rgba(255,255,255,0.30)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        {/* Right rail */}
        <path
          d="M 2,-165 C 24,-142 40,-82 40,10 C 40,78 31,136 16,158"
          stroke="rgba(255,255,255,0.30)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />

        {/* ══ DESIGN ELEMENT — wave stripe band ═════════════════ */}
        {/* Horizontal band ~1/3 down, slightly wavy, warm cream */}
        <path
          d="M -44,-10 C -30,-16 -14,-6 0,-12 C 14,-18 30,-8 44,-14 L 44,6 C 30,12 14,2 0,8 C -14,14 -30,4 -44,-2 Z"
          fill="rgba(255,255,255,0.12)"
        />

        {/* ══ FINS — thruster cluster ════════════════════════════ */}
        {/* Center fin */}
        <path
          d="
            M 0,168
            C -4,172 -10,185 -8,200
            C -5,210  0,208  0,208
            C  0,208  5,210  8,200
            C 10,185  4,172  0,168
            Z
          "
          fill="url(#finGrad)"
          opacity="0.9"
        />
        {/* Left side fin */}
        <path
          d="
            M -20,155
            C -24,158 -28,167 -26,175
            C -24,180 -20,178 -20,178
            C -20,178 -17,179 -16,174
            C -14,167 -16,158 -20,155
            Z
          "
          fill="url(#finGrad)"
          opacity="0.8"
        />
        {/* Right side fin */}
        <path
          d="
            M 20,155
            C 24,158 28,167 26,175
            C 24,180 20,178 20,178
            C 20,178 17,179 16,174
            C 14,167 16,158 20,155
            Z
          "
          fill="url(#finGrad)"
          opacity="0.8"
        />

        {/* ══ NOSE ROCKER DETAIL ════════════════════════════════ */}
        <ellipse
          cx="0" cy="-150"
          rx="12" ry="8"
          fill="rgba(255,255,255,0.10)"
        />
      </svg>
    </motion.div>
  )
}
