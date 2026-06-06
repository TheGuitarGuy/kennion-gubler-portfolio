import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

const KEYFRAMES = `
  .bus-wrapper {
    transform: translateX(-30vw);
    transition: transform 2.5s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }
  .bus-wrapper.drive { transform: translateX(150vw); }
  .bus-rumble { transform-origin: center bottom; }
  .bus-wrapper.drive .bus-rumble { animation: busRumble 0.15s linear infinite; }
  @keyframes busRumble {
    0%   { transform: translateY(0) rotate(0deg); }
    25%  { transform: translateY(-2px) rotate(-0.5deg); }
    50%  { transform: translateY(0) rotate(0deg); }
    75%  { transform: translateY(1px) rotate(0.5deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }
  .spin-wheel { transform-box: fill-box; transform-origin: center; }
  .bus-wrapper.drive .spin-wheel { animation: busWheelSpin 0.8s linear infinite; }
  @keyframes busWheelSpin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .svg-shape {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: stroke-dashoffset 1.5s cubic-bezier(0.25, 1, 0.5, 1);
  }
`

const THEMES = {
  day: {
    bg:     'radial-gradient(ellipse at 82% 14%, rgba(251,146,60,0.13) 0%, rgba(220,38,38,0.07) 38%, transparent 60%), radial-gradient(ellipse at 18% 80%, rgba(245,158,11,0.08) 0%, transparent 48%), radial-gradient(ellipse at 50% 95%, rgba(14,116,144,0.10) 0%, rgba(8,145,178,0.05) 40%, transparent 65%), #fdf8f2',
    bus:    '#CE4923',
    board:  '#1B75BB',
    stroke: '#1A1A1A',
    muted:  '#8E8A86',
  },
  sunset: {
    bg:     'radial-gradient(ellipse at 60% 95%, rgba(255,115,25,0.62) 0%, rgba(195,50,18,0.4) 32%, transparent 62%), radial-gradient(ellipse at 22% 82%, rgba(155,20,68,0.44) 0%, transparent 48%), radial-gradient(ellipse at 14% 22%, rgba(62,8,110,0.38) 0%, transparent 54%), radial-gradient(ellipse at 90% 18%, rgba(38,5,78,0.5) 0%, transparent 52%), #1a0830',
    bus:    '#e86030',
    board:  '#be185d',
    stroke: '#ffe8cc',
    muted:  'rgba(255,200,155,0.6)',
  },
  night: {
    bg:     'radial-gradient(ellipse at 70% 90%, rgba(0,200,255,0.18) 0%, rgba(0,100,200,0.10) 40%, transparent 65%), radial-gradient(ellipse at 15% 60%, rgba(245,158,11,0.08) 0%, transparent 40%), radial-gradient(ellipse at 50% 0%, rgba(0,50,100,0.4) 0%, transparent 60%), linear-gradient(180deg, #060d1a 0%, #071424 60%, #05101e 100%)',
    bus:    '#00c8ff',
    board:  '#f59e0b',
    stroke: '#c8ddf0',
    muted:  'rgba(180,210,240,0.5)',
  },
}

export default function IntroAnimation({ onComplete }) {
  const { mode } = useTheme()
  const palette = THEMES[mode] ?? THEMES.day
  const [exiting, setExiting] = useState(false)
  const svgRef = useRef(null)
  const busWrapRef = useRef(null)

  // Hide all strokes before the first paint so they're never visible undrawn
  useLayoutEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    svg.querySelectorAll('.svg-shape').forEach(el => {
      el.style.transition = 'none'
      try {
        const len = el.getTotalLength()
        el.style.strokeDasharray = len
        el.style.strokeDashoffset = len
      } catch {
        el.style.strokeDasharray = 1000
        el.style.strokeDashoffset = 1000
      }
    })
  }, [])

  // Re-enable transitions then run the draw sequence
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    // One rAF ensures the hidden state is committed before we re-enable transitions
    const raf = requestAnimationFrame(() => {
      svg.querySelectorAll('.svg-shape').forEach(el => { el.style.transition = '' })
    })

    const draw = (sel, delay) =>
      setTimeout(() => svg.querySelectorAll(sel).forEach(el => { el.style.strokeDashoffset = '0' }), delay)

    const timers = [
      draw('.anim-board',   100),
      draw('.anim-bus',     600),
      draw('.anim-window', 1100),
      draw('.anim-details', 1400),
      draw('.anim-wheel',  1700),
      setTimeout(() => busWrapRef.current?.classList.add('drive'), 2700),
      setTimeout(() => setExiting(true), 3800),
    ]
    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout) }
  }, [])

  const skip = () => {
    const svg = svgRef.current
    if (svg) svg.querySelectorAll('.svg-shape').forEach(el => { el.style.transition = 'none'; el.style.strokeDashoffset = '0' })
    if (busWrapRef.current) { busWrapRef.current.style.transition = 'none'; busWrapRef.current.style.transform = 'translateX(150vw)' }
    setExiting(true)
  }

  return (
    <>
      <style>{KEYFRAMES}</style>
      <AnimatePresence onExitComplete={onComplete}>
        {!exiting && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
            style={{ background: palette.bg }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <svg
              ref={svgRef}
              viewBox="0 0 1000 600"
              style={{ width: '100%', maxWidth: 900, height: 'auto', transform: 'scale(0.95) translateY(-5%)', overflow: 'visible' }}
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ground line — drawn first, stays when bus drives off */}
              <line className="svg-shape anim-board" stroke={palette.stroke} strokeWidth="3" strokeOpacity="0.45" x1="-500" y1="415" x2="2000" y2="415" />

              <g className="bus-wrapper" ref={busWrapRef}>
                <g className="bus-rumble">
                  {/* Surfboard */}
                  <path className="svg-shape anim-board" stroke={palette.board} strokeWidth="14" d="M 210 160 C 290 135, 660 135, 740 160 C 660 175, 290 175, 210 160 Z" />
                  <path className="svg-shape anim-board" stroke={palette.board} strokeWidth="10" d="M 270 148 L 300 120 C 310 120, 300 140, 300 143" />

                  {/* Bus body */}
                  <path className="svg-shape anim-bus"     stroke={palette.bus} strokeWidth="14" d="M 260 380 L 260 250 C 260 200, 290 180, 330 180 L 580 180 C 660 180, 680 230, 690 280 C 695 320, 700 370, 700 380 Z" />
                  <path className="svg-shape anim-details" stroke={palette.bus} strokeWidth="10" d="M 260 280 L 630 280 C 660 280, 680 290, 695 310" />
                  <path className="svg-shape anim-details" stroke={palette.bus} strokeWidth="14" d="M 690 350 C 715 350, 725 360, 720 380 L 700 380" />
                  <path className="svg-shape anim-details" stroke={palette.bus} strokeWidth="14" d="M 260 350 L 235 350 C 220 350, 230 380, 260 380" />

                  {/* Windows */}
                  <rect className="svg-shape anim-window" stroke={palette.stroke} strokeWidth="10" x="280" y="210" width="80"  height="50" rx="12" />
                  <rect className="svg-shape anim-window" stroke={palette.stroke} strokeWidth="10" x="380" y="210" width="90"  height="50" rx="12" />
                  <rect className="svg-shape anim-window" stroke={palette.stroke} strokeWidth="10" x="490" y="210" width="70"  height="50" rx="12" />
                  <path className="svg-shape anim-window" stroke={palette.stroke} strokeWidth="10" d="M 580 210 L 630 210 C 645 210, 665 230, 670 260 L 580 260 Z" />

                  {/* Details */}
                  <circle className="svg-shape anim-details" stroke={palette.stroke} strokeWidth="10" cx="690" cy="310" r="10" />
                  <line   className="svg-shape anim-details" stroke={palette.stroke} strokeWidth="6"  x1="480" y1="280" x2="480" y2="380" />
                  <line   className="svg-shape anim-details" stroke={palette.stroke} strokeWidth="6"  x1="580" y1="260" x2="580" y2="380" />

                  {/* Back wheel */}
                  <g className="spin-wheel">
                    <circle className="svg-shape anim-wheel" stroke={palette.stroke} strokeWidth="14" cx="330" cy="380" r="35" />
                    <circle className="svg-shape anim-wheel" stroke={palette.stroke} strokeWidth="6"  cx="330" cy="380" r="12" />
                    <line   className="svg-shape anim-wheel" stroke={palette.stroke} strokeWidth="6"  x1="295" y1="380" x2="365" y2="380" />
                    <line   className="svg-shape anim-wheel" stroke={palette.stroke} strokeWidth="6"  x1="330" y1="345" x2="330" y2="415" />
                  </g>

                  {/* Front wheel */}
                  <g className="spin-wheel">
                    <circle className="svg-shape anim-wheel" stroke={palette.stroke} strokeWidth="14" cx="620" cy="380" r="35" />
                    <circle className="svg-shape anim-wheel" stroke={palette.stroke} strokeWidth="6"  cx="620" cy="380" r="12" />
                    <line   className="svg-shape anim-wheel" stroke={palette.stroke} strokeWidth="6"  x1="585" y1="380" x2="655" y2="380" />
                    <line   className="svg-shape anim-wheel" stroke={palette.stroke} strokeWidth="6"  x1="620" y1="345" x2="620" y2="415" />
                  </g>

                  {/* Roof rack */}
                  <line className="svg-shape anim-board" stroke={palette.stroke} strokeWidth="10" x1="320" y1="180" x2="320" y2="168" />
                  <line className="svg-shape anim-board" stroke={palette.stroke} strokeWidth="10" x1="560" y1="180" x2="560" y2="168" />
                </g>
              </g>

            </svg>

            <button
              onClick={skip}
              style={{
                position: 'absolute', bottom: 40, right: 40,
                background: 'rgba(255,255,255,0.08)',
                border: `1px solid ${palette.muted}`,
                color: palette.muted,
                padding: '12px 24px', borderRadius: 4,
                fontSize: 13, fontWeight: 500, letterSpacing: '0.5px',
                cursor: 'pointer', backdropFilter: 'blur(4px)',
              }}
            >
              Skip Animation
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
