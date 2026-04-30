import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import RecordPlayer from './RecordPlayer'

function SanderlingArt({ mode = 'foraging', forageDelay = 0, scale = 1 }) {
  const bodyColor = '#f5efe4'
  const wingColor = '#b08968'
  const beakColor = '#6b3f1f'
  const frontLegColor = '#c2410c'
  const backLegColor = '#9f3206'
  const shadow = 'rgba(120,63,4,0.18)'

  const startDelay = (forageDelay % 1000) / 1000
  const peckDur = 0.8 + startDelay * 0.3

  const legRunSpeed = 0.32;
  const bodyBounceSpeed = legRunSpeed / 2;

  const shadowVariants = {
    start: { rx: 17, opacity: 0.12 },
    foraging: {
      rx: [17, 20, 20, 17],
      opacity: [0.12, 0.06, 0.06, 0.12],
      transition: { duration: peckDur, repeat: Infinity, times: [0, 0.35, 0.55, 1], ease: "easeInOut" }
    },
    running: { rx: 17, opacity: 0.12 }
  }

  const bodyVariants = {
    start: { rotateZ: 0, y: 0 },
    foraging: {
      rotateZ: [0, 55, 55, 0],
      y: [0, 4, 4, 0],
      transition: { duration: peckDur, repeat: Infinity, times: [0, 0.35, 0.55, 1], ease: "easeInOut" }
    },
    running: {
      rotateZ: [-1, 1, -1],
      y: [0, -1.8, 0],
      transition: { duration: bodyBounceSpeed, repeat: Infinity, ease: "linear" }
    }
  }

  const headVariants = {
    start: { rotateZ: 0 },
    foraging: {
      rotateZ: [0, 25, 25, 0],
      transition: { duration: peckDur, repeat: Infinity, times: [0, 0.35, 0.55, 1], ease: "easeInOut" }
    },
    running: { rotate: 0 }
  }

  const legLeftVariants = {
    start: { rotateZ: 20 },
    foraging: { rotateZ: 20 },
    running: {
      rotateZ: [-45, 45, -45],
      transition: { duration: legRunSpeed, repeat: Infinity, ease: "easeInOut" }
    }
  }

  const legRightVariants = {
    start: { rotateZ: -20 },
    foraging: { rotateZ: -20 },
    running: {
      rotateZ: [45, -45, 45],
      transition: { duration: legRunSpeed, repeat: Infinity, ease: "easeInOut" }
    }
  }

  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'bottom center' }}>
      <svg width="82" height="50" viewBox="0 0 74 42" fill="none" style={{ overflow: 'visible' }}>
        <motion.ellipse cx="34" cy="34.5" rx="17" ry="3.5" fill={shadow} variants={shadowVariants} initial="start" animate={mode} />
        <motion.g style={{ transformOrigin: '30px 27px' }} variants={legLeftVariants} initial="start" animate={mode}>
          <line x1="30" y1="27" x2="30" y2="36" stroke={backLegColor} strokeWidth="1.8" strokeLinecap="round" />
        </motion.g>
        <motion.g style={{ transformOrigin: '32px 27px' }} variants={legRightVariants} initial="start" animate={mode}>
          <line x1="32" y1="27" x2="32" y2="36" stroke={frontLegColor} strokeWidth="1.8" strokeLinecap="round" />
        </motion.g>
        <motion.g style={{ transformOrigin: '30px 28px' }} variants={bodyVariants} initial="start" animate={mode}>
          <ellipse cx="29" cy="20" rx="13" ry="8.5" fill={bodyColor} />
          <path d="M20 20c4-8 15-10 23-4c-4 1-8 4-10 8c-5 0-9-1-13-4Z" fill={wingColor} fillOpacity="0.95" />
          <motion.g style={{ transformOrigin: '40px 18px' }} variants={headVariants} initial="start" animate={mode}>
            <circle cx="42.5" cy="17" r="4.4" fill={bodyColor} />
            <circle cx="43.4" cy="15.9" r="0.78" fill="#1f2937" />
            <path d="M46 17.2L56.5 14.7L46.4 19.6Z" fill={beakColor} />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  )
}

function ShoreSanderling({ left, bottom, scale, flockTrigger, flockOffset }) {
  const controls = useAnimationControls()
  const [mode, setMode] = useState('foraging')
  const busy = useRef(false)

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        controls.stop()
        controls.set({ x: 0, scaleX: -1 })
        setMode('foraging')
        busy.current = false
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [controls])

  useEffect(() => {
    controls.set({ x: 0, scaleX: -1 })
  }, [controls])

  useEffect(() => {
    if (flockTrigger === 0 || busy.current || document.hidden) return
    busy.current = true
    let mounted = true
    const sleep = ms => new Promise(r => setTimeout(r, ms))

    async function doRun() {
      await sleep(flockOffset)
      if (!mounted || document.hidden) { busy.current = false; return }

      controls.set({ scaleX: 1 })
      await sleep(40)
      if (!mounted || document.hidden) { busy.current = false; return }

      setMode('running')

      const runX = window.innerWidth * 0.66
      const runRightDurMs = (2.6 + Math.random() * 0.4) * 1000

      await controls.start({ x: runX, transition: { duration: runRightDurMs / 1000, ease: [0.2, 0, 0.6, 1] } })
      if (!mounted || document.hidden) { busy.current = false; return }

      controls.set({ scaleX: -1 })
      await sleep(50)
      if (!mounted || document.hidden) { busy.current = false; return }

      await controls.start({ x: 0, transition: { duration: 3.0 + Math.random() * 0.4, ease: [0.4, 0, 0.8, 1] } })
      if (!mounted || document.hidden) { busy.current = false; return }

      controls.set({ scaleX: -1 })
      setMode('foraging')
      busy.current = false
    }

    doRun()
    return () => { mounted = false }
  }, [flockTrigger, controls, flockOffset])

  return (
    <motion.div
      className="absolute pointer-events-none z-[3]"
      style={{ left, bottom }}
      animate={controls}
      initial={{ x: 0, scaleX: -1 }}
    >
      <SanderlingArt mode={mode} scale={scale} forageDelay={flockOffset} />
    </motion.div>
  )
}

function TideWave({ flockTrigger }) {
  const controls = useAnimationControls()
  const { night, sunset } = useTheme()

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        controls.stop()
        controls.set({ x: '-100%' })
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [controls])

  useEffect(() => {
    if (flockTrigger === 0 || document.hidden) return
    let mounted = true;

    const animateTide = async () => {
      await new Promise(r => setTimeout(r, 200))
      if (!mounted || document.hidden) return;

      await controls.start({
        x: ['-100%', '-35%'],
        transition: { duration: 2.2, ease: "easeOut" }
      })

      await new Promise(r => setTimeout(r, 50))
      if (!mounted || document.hidden) return;

      await controls.start({
        x: '-100%',
        transition: { duration: 3.5, ease: "easeInOut" }
      })
    }

    animateTide()
    return () => { mounted = false; }
  }, [flockTrigger, controls])

  return (
    <motion.div
      className="absolute bottom-0 left-0 h-[9vh] md:h-[18vh] pointer-events-none z-[2]"
      animate={controls}
      initial={{ x: '-100%' }}
      style={{
        width: '110vw',
        background: night
          ? 'linear-gradient(90deg, rgba(4,60,125,0.4) 0%, rgba(7,104,208,0.6) 65%, rgba(150,210,255,0.85) 96%, transparent 100%)'
          : sunset
            ? 'linear-gradient(90deg, rgba(55,8,100,0.5) 0%, rgba(110,25,160,0.7) 60%, rgba(210,80,235,0.88) 92%, transparent 100%)'
            : 'linear-gradient(90deg, #044285 0%, #0768D0 65%, #a6d8ff 96%, transparent 100%)',
        borderTopRightRadius: '90% 100%',
        opacity: night ? 1 : 0.95
      }}
    />
  )
}

const STARS = (() => {
  let s = 1234567
  const r = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 }
  return Array.from({ length: 100 }, (_, i) => {
    const rnd = r()
    const size = rnd > 0.88 ? 4.0 : rnd > 0.72 ? 2.4 : rnd > 0.45 ? 1.4 : 0.9
    const color = i % 11 === 0 ? '#80eeff' : i % 7 === 0 ? '#c8e8ff' : '#ffffff'
    return {
      left: `${(r() * 100).toFixed(1)}%`,
      top: `${(r() * 74).toFixed(1)}%`,
      size,
      color,
      delay: +(r() * 5).toFixed(1),
      dur: +(2 + r() * 3).toFixed(1),
      minOp: +(0.45 + r() * 0.3).toFixed(2),
      glow: size >= 2.4 ? `0 0 ${size * 3}px ${color}, 0 0 ${size * 6}px ${color}88` : 'none',
    }
  })
})()

function NightStars() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {STARS.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: star.left, top: star.top,
            width: star.size, height: star.size,
            background: star.color,
            boxShadow: star.glow,
          }}
          animate={{ opacity: [star.minOp, 1, star.minOp] }}
          transition={{ duration: star.dur, repeat: Infinity, ease: 'easeInOut', delay: star.delay }}
        />
      ))}
    </div>
  )
}

function ShoreSanderlings() {
  const [flockTrigger, setFlockTrigger] = useState(0)

  useEffect(() => {
    let timer;
    const schedule = () => {
      timer = setTimeout(() => {
        if (!document.hidden) setFlockTrigger(t => t + 1)
        schedule()
      }, 14000 + Math.random() * 8000)
    }
    timer = setTimeout(() => {
      if (!document.hidden) setFlockTrigger(1)
      schedule()
    }, 8000)
    return () => clearTimeout(timer)
  }, [])

  const birds = [
    { left: '3%', bottom: 'clamp(18px, 5.8vw, 90px)', scale: 1.00, flockOffset: 0 },
    { left: '8%', bottom: 'clamp(19px, 6.1vw, 94px)', scale: 0.92, flockOffset: 80 },
    { left: '13%', bottom: 'clamp(17px, 5.4vw, 84px)', scale: 0.88, flockOffset: 150 },
    { left: '5%', bottom: 'clamp(16px, 5.1vw, 80px)', scale: 0.95, flockOffset: 40 },
    { left: '17%', bottom: 'clamp(18px, 5.9vw, 92px)', scale: 0.84, flockOffset: 220 },
    { left: '10%', bottom: 'clamp(20px, 6.2vw, 96px)', scale: 0.90, flockOffset: 110 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <TideWave flockTrigger={flockTrigger} />
      {birds.map((bird, i) => <ShoreSanderling key={i} {...bird} flockTrigger={flockTrigger} />)}
    </div>
  )
}

function Jellyfish({ left, bottom, scale, delay, driftRange }) {
  const driftDur = 13 + delay * 1.1

  return (
    <motion.div
      aria-hidden="true"
      className="absolute pointer-events-none z-[3]"
      style={{ left, bottom }}
      animate={{ x: [-driftRange, driftRange], y: [0, -13, 0], rotate: [-9, 9] }}
      transition={{
        x: { duration: driftDur, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror', delay },
        rotate: { duration: driftDur, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror', delay },
        y: { duration: 5.2 + delay * 0.6, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror', delay: delay + 0.8 }
      }}
    >
      <motion.svg
        width={80 * scale}
        height={124 * scale}
        viewBox="-20 -20 120 164"
        style={{ overflow: 'visible' }}
        animate={{ scaleY: [1, 1.08, 0.95, 1], scaleX: [1, 0.96, 1.04, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        <defs>
          <radialGradient id={`jellyKnob-${delay}`} cx="38%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#80eeff" />
            <stop offset="100%" stopColor="#0099cc" />
          </radialGradient>
        </defs>

        <motion.g
          style={{ filter: 'drop-shadow(0px 0px 12px rgba(0, 200, 255, 0.65))' }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <path d="M14 40C14 17 25 5 40 5C55 5 66 17 66 40C63 38 59 40 55 43C51 46 47 46 43 43C40 41 37 41 33 43C29 46 25 46 21 43C17 40 15 38 14 40Z" fill={`url(#jellyKnob-${delay})`} fillOpacity="0.9" />
          <g stroke="#60e0ff" strokeLinecap="round" fill="none" opacity="0.7">
            <path d="M26 43C27 60 26 78 23 98" strokeWidth="4.5" />
            <path d="M40 44C41 63 40 82 39 106" strokeWidth="5" />
            <path d="M54 43C55 60 55 78 57 98" strokeWidth="4.5" />
            <path d="M17 41C16 56 15 70 13 86" strokeWidth="2" />
            <path d="M32 43C32 62 31 80 29 102" strokeWidth="1.8" />
            <path d="M49 43C50 62 51 80 53 102" strokeWidth="1.8" />
            <path d="M63 41C65 56 67 70 69 86" strokeWidth="2" />
          </g>
        </motion.g>
      </motion.svg>
    </motion.div>
  )
}

function NightJellies() {
  const jellies = [
    { left: '8%', bottom: '3rem', scale: 0.55, delay: 0, driftRange: 70 },
    { left: '28%', bottom: '7rem', scale: 0.40, delay: 3, driftRange: 45 },
    { left: '52%', bottom: '2rem', scale: 0.46, delay: 6, driftRange: 55 },
    { left: '72%', bottom: '6rem', scale: 0.38, delay: 9, driftRange: 50 },
    { left: '90%', bottom: '4rem', scale: 0.50, delay: 12, driftRange: 75 }
  ]
  return <div className="absolute inset-0 pointer-events-none z-[3] overflow-hidden">{jellies.map((j, i) => <Jellyfish key={i} {...j} />)}</div>
}

export default function Hero() {
  const { night, sunset } = useTheme()
  const CONTAINER = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }
  const ITEM = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }

  return (
    <>
      <section id="home-hero" className="relative min-h-screen snap-start snap-always flex items-center pt-16 overflow-hidden" style={{ background: night ? '#060d1a' : sunset ? '#1a0830' : '#fdf8f2', transition: 'background 0.7s ease' }}>
        <motion.div className="absolute inset-0 pointer-events-none z-0" animate={{ opacity: night ? 0 : sunset ? 0.45 : 1 }} transition={{ duration: 0.8 }} style={{ background: `radial-gradient(ellipse at 82% 14%, rgba(251,146,60,0.13) 0%, rgba(220,38,38,0.07) 38%, transparent 60%), radial-gradient(ellipse at 18% 80%, rgba(245,158,11,0.08) 0%, transparent 48%), radial-gradient(ellipse at 50% 95%, rgba(14,116,144,0.10) 0%, rgba(8,145,178,0.05) 40%, transparent 65%)` }} />
        <motion.div className="absolute inset-0 pointer-events-none z-0" animate={{ opacity: night ? 1 : 0 }} transition={{ duration: 1 }} style={{ background: `radial-gradient(ellipse at 70% 90%, rgba(0,200,255,0.18) 0%, rgba(0,100,200,0.10) 40%, transparent 65%), radial-gradient(ellipse at 15% 60%, rgba(245,158,11,0.08) 0%, transparent 40%), radial-gradient(ellipse at 50% 0%, rgba(0,50,100,0.4) 0%, transparent 60%), linear-gradient(180deg, #060d1a 0%, #071424 60%, #05101e 100%)` }} />
        <motion.div className="absolute inset-0 pointer-events-none z-0" animate={{ opacity: sunset ? 1 : 0 }} transition={{ duration: 1 }} style={{ background: `radial-gradient(ellipse at 60% 95%, rgba(255,115,25,0.62) 0%, rgba(195,50,18,0.4) 32%, transparent 62%), radial-gradient(ellipse at 22% 82%, rgba(155,20,68,0.44) 0%, transparent 48%), radial-gradient(ellipse at 14% 22%, rgba(62,8,110,0.38) 0%, transparent 54%), radial-gradient(ellipse at 90% 18%, rgba(38,5,78,0.5) 0%, transparent 52%)` }} />

        {night && <NightStars />}

        <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
          <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', display: 'block' }} viewBox="0 0 1440 220" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,220 L0,108 C100,78 220,122 400,88 C580,54 740,105 920,76 C1080,50 1220,96 1360,72 C1410,62 1430,76 1440,70 L1440,220 Z" fill={night ? 'rgba(0,80,160,0.28)' : sunset ? 'rgba(100,25,145,0.28)' : 'rgba(217,119,6,0.17)'} style={{ transition: 'fill 0.7s ease' }} />
            <path d="M0,220 L0,148 C90,126 210,162 380,138 C550,114 720,158 900,132 C1060,110 1200,148 1360,126 C1410,116 1430,132 1440,124 L1440,220 Z" fill={night ? 'rgba(0,40,100,0.45)' : sunset ? 'rgba(55,10,100,0.42)' : 'rgba(146,64,14,0.26)'} style={{ transition: 'fill 0.7s ease' }} />
          </svg>
        </div>

        {night ? <NightJellies /> : <ShoreSanderlings />}

        <div className="relative z-[2] max-w-7xl mx-auto px-6 md:px-8 w-full py-12 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            <motion.div variants={CONTAINER} initial="hidden" animate="show">
              <motion.p variants={ITEM} className="text-[10px] font-bold tracking-[0.28em] uppercase mb-1 transition-colors duration-700" style={{ color: night ? 'rgba(0,200,255,0.65)' : sunset ? 'rgba(255,140,50,0.82)' : 'rgba(180,83,9,0.7)' }}>Design Engineer & Builder</motion.p>
              <motion.p variants={ITEM} className="text-[10px] font-medium tracking-[0.22em] uppercase mb-6 transition-colors duration-700" style={{ color: night ? 'rgba(0,200,255,0.38)' : sunset ? 'rgba(255,140,50,0.46)' : 'rgba(180,83,9,0.42)' }}>San Jose, California</motion.p>
              <motion.h1 variants={ITEM} className="text-[2.4rem] sm:text-[3.2rem] lg:text-[4.2rem] xl:text-[4.8rem] font-black leading-[1.04] tracking-tight mb-6 md:mb-8 transition-colors duration-700" style={{ color: night ? '#d0eeff' : sunset ? '#ffe8cc' : '#1c1917' }}>
                <span className={night ? 'gradient-night-text' : 'gradient-sunset-text'}>Designer.</span><br />Prototyper.<br />Builder.
              </motion.h1>
              <motion.p variants={ITEM} className="text-[1.05rem] leading-relaxed max-w-md font-light mb-10 transition-colors duration-700" style={{ color: night ? 'rgba(180,210,240,0.7)' : sunset ? 'rgba(255,200,155,0.74)' : '#78716c' }}>I design and build products at the intersection of deep user empathy and measurable business outcomes, from 0-to-1 mobile apps to AI-powered commerce features.</motion.p>
              <motion.div variants={ITEM} className="flex flex-wrap items-center gap-4">
                <a href="#work" className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold tracking-wide transition-colors duration-700" style={{ background: night ? 'linear-gradient(125deg, #005a9e 0%, #0077cc 50%, #00aaff 100%)' : sunset ? 'linear-gradient(125deg, #b33508 0%, #d04818 50%, #e86030 100%)' : '#c2410c', color: '#fff' }}>View Work</a>
                <a href="#about" className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold tracking-wide transition-colors duration-700" style={{ border: night ? '1px solid rgba(0,200,255,0.3)' : sunset ? '1px solid rgba(255,140,50,0.4)' : '1px solid #d6d3d1', color: night ? 'rgba(0,200,255,0.8)' : sunset ? 'rgba(255,175,110,0.88)' : '#57534e' }}>About Me</a>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="flex justify-center lg:justify-end items-center">
              <div className="relative">
                <div className="absolute -inset-16 -z-10 opacity-60 blur-3xl pointer-events-none transition-all duration-700" style={{ background: night ? 'radial-gradient(ellipse at center, rgba(0,200,255,0.15) 0%, rgba(0,100,200,0.08) 45%, transparent 70%)' : sunset ? 'radial-gradient(ellipse at center, rgba(255,100,30,0.26) 0%, rgba(180,30,80,0.13) 45%, transparent 70%)' : 'radial-gradient(ellipse at center, rgba(249,115,22,0.22) 0%, rgba(220,38,38,0.12) 45%, transparent 70%)' }} />
                <div className="origin-top scale-[0.72] sm:scale-[0.86] lg:scale-100" style={{ marginBottom: 'calc((var(--tw-scale-y, 1) - 1) * 500px)' }}>

                  <RecordPlayer />

                </div>
              </div>
            </motion.div>

          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }} className="mt-20 flex justify-center">
            <div className="w-px h-10 animate-pulse transition-all duration-700" style={{ background: night ? 'linear-gradient(to bottom, rgba(0,200,255,0.5), transparent)' : sunset ? 'linear-gradient(to bottom, rgba(255,130,50,0.58), transparent)' : 'linear-gradient(to bottom, rgba(251,191,36,0.6), transparent)' }} />
          </motion.div>
        </div>
      </section>
    </>
  )
}