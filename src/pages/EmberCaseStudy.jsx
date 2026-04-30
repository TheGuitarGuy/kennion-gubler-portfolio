import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCaseStudyProgress } from '../context/CaseStudyProgressContext'
import { motion } from 'framer-motion'
import emberImg from '../../images/ember.png'
import emberHome from '../../images/ember_home.png'
import emberStats from '../../images/ember_stats.png'
import emberSquats from '../../images/ember_squats.png'
import emberPushups from '../../images/ember_pushups.png'
import emberOnboarding from '../../images/ember_onboarding.png'
import emberDemoVideo from '../../images/Ember Fitness.mp4'

const up = {
  hidden: { opacity: 0, y: 56 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}
const fromLeft = {
  hidden: { opacity: 0, x: -64 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}
const fromRight = {
  hidden: { opacity: 0, x: 64 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.13 } } }
const VP = { once: false, amount: 0.25 }

function SlideLabel({ children, dark = false }) {
  return (
    <motion.p
      variants={up}
      className="text-[10px] font-semibold tracking-[0.35em] uppercase mb-5"
      style={{ color: dark ? 'rgba(224,160,96,0.7)' : '#c0622a' }}
    >
      {children}
    </motion.p>
  )
}

const SLIDE_IDS = ['hero', 'problem', 'home', 'stats', 'cv', 'form', 'onboarding', 'demo']

function ProgressDots({ current }) {
  return (
    <div className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-50 flex-col gap-2 items-center">
      {SLIDE_IDS.map((_, i) => (
        <motion.a
          key={i}
          href={`#${SLIDE_IDS[i]}`}
          animate={{ height: i === current ? 28 : 6, opacity: i === current ? 1 : 0.35 }}
          transition={{ duration: 0.3 }}
          className="w-1 rounded-full block"
          style={{ background: '#c0622a' }}
        />
      ))}
    </div>
  )
}

export default function EmberCaseStudy() {
  const [current, setCurrent] = useState(0)
  const demoVideoRef = useRef(null)
  const demoIndex = SLIDE_IDS.indexOf('demo')
  const { markVisited } = useCaseStudyProgress()

  useEffect(() => {
    window.scrollTo(0, 0)
    markVisited('ember')
  }, [])

  useEffect(() => {
    const els = SLIDE_IDS.map(id => document.getElementById(id)).filter(Boolean)
    const obs = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) { const i = els.indexOf(e.target); if (i !== -1) setCurrent(i) } }) },
      { threshold: 0.5 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const video = demoVideoRef.current
    if (!video) return
    if (current === demoIndex) {
      video.play().catch(() => { })
      return
    }
    video.pause()
  }, [current, demoIndex])

  return (
    <div className="relative">
      <ProgressDots current={current} />

      {/* Sticky nav */}
      <div className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-6 md:px-8" style={{ background: 'rgba(253,248,243,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(232,216,200,0.4)' }}>
        <Link to="/" state={{ fromCaseStudy: true, fromCaseStudySlug: 'ember' }} className="text-xs font-bold tracking-[0.15em] uppercase transition-opacity hover:opacity-50" style={{ color: '#c0622a' }}>← Back</Link>
      </div>

      <div className="h-screen overflow-y-auto snap-y snap-mandatory [&>section]:min-h-screen">
        {/* ─── Hero ─── */}
        <section id="hero" className="relative overflow-hidden px-6 md:px-16 pt-20 pb-12 md:h-screen md:flex md:items-center md:justify-center md:pt-14 snap-start snap-always" style={{ background: '#fdf8f3', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 10%, rgba(192,98,42,0.1) 0%, transparent 55%)' }} />
          <div className="max-w-7xl w-full mx-auto grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12 items-center">
            <motion.div variants={stagger} initial="hidden" animate="show">
              <SlideLabel>Case Study · iOS · 0→1</SlideLabel>
              <motion.h1 variants={up} className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-4" style={{ color: '#1c1008' }}>Ember Fitness</motion.h1>
              <motion.p variants={up} className="text-sm font-light leading-relaxed max-w-xs mb-8" style={{ color: '#8a6a52' }}>Ember is an iOS fitness app built to reduce workout interruptions through automatic rep tracking and real-time form feedback.</motion.p>
              <motion.div variants={up} className="flex flex-wrap gap-8">
                {[{ label: 'Role', value: 'Design Engineer & iOS Dev' }, { label: 'Stack', value: 'Swift · SwiftUI · Firebase' }].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[9px] font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: '#c0aa90' }}>{label}</p>
                    <p className="text-sm font-semibold" style={{ color: '#3a2010' }}>{value}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
            <motion.img src={emberImg} alt="Ember Fitness app screens" initial={{ opacity: 0, y: 48, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="w-full object-contain drop-shadow-2xl max-h-[50vh] md:max-h-none" />
          </div>
          <motion.div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }}>
            <p className="text-[9px] font-semibold tracking-[0.25em] uppercase" style={{ color: '#c0aa90' }}>Scroll</p>
            <motion.div className="w-px h-8 origin-top" style={{ background: 'rgba(192,170,144,0.5)' }} animate={{ scaleY: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }} />
          </motion.div>
        </section>

        {/* ─── Problem ─── */}
        <section id="problem" className="overflow-hidden px-6 md:px-16 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always" style={{ background: '#140a04' }}>
          <div className="max-w-5xl w-full mx-auto">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <SlideLabel dark>The Challenge</SlideLabel>
              <motion.h2 variants={up} className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight leading-none text-white mb-10 md:mb-16">Most fitness apps<br />interrupt the workout.</motion.h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { n: '01', title: 'Too Much Manual Logging', body: 'Users had to stop between sets to tap through tracking flows, which broke momentum.' },
                  { n: '02', title: 'Wrong Metrics, Wrong Behavior', body: 'Many apps over-indexed on calorie burn instead of long-term consistency and form quality.' },
                ].map(({ n, title, body }) => (
                  <motion.div key={n} variants={n === '01' ? fromLeft : fromRight} className="p-6 md:p-10 border-l-2" style={{ borderColor: '#c0622a', background: 'rgba(255,255,255,0.03)' }}>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#e8a060' }}>{n}</p>
                    <h3 className="text-xl font-black text-white mb-3">{title}</h3>
                    <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{body}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Home ─── */}
        <section id="home" className="overflow-hidden px-6 md:px-16 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always" style={{ background: '#f5ede2' }}>
          <div className="max-w-5xl w-full mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <SlideLabel>Core Experience · 01</SlideLabel>
              <motion.h2 variants={up} className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-6" style={{ color: '#1c1008' }}>Your plan,<br />front & center.</motion.h2>
              <motion.p variants={up} className="text-base font-light leading-relaxed" style={{ color: '#7a5a3a' }}>The home screen surfaces today's workout clearly, so users can start training immediately.</motion.p>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={fromRight} className="flex justify-center">
              <img src={emberHome} alt="Home Screen" className="w-auto object-contain max-h-[45vh] md:max-h-[75vh] drop-shadow-2xl rounded-[40px]" />
            </motion.div>
          </div>
        </section>

        {/* ─── Stats ─── */}
        <section id="stats" className="overflow-hidden px-6 md:px-16 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always" style={{ background: '#fdf8f3' }}>
          <div className="max-w-5xl w-full mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={fromLeft} className="flex justify-center order-last md:order-first">
              <img src={emberStats} alt="Stats View" className="w-auto object-contain max-h-[45vh] md:max-h-[75vh] drop-shadow-2xl rounded-[40px]" />
            </motion.div>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <SlideLabel>Core Experience · 02</SlideLabel>
              <motion.h2 variants={up} className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-6" style={{ color: '#1c1008' }}>Meaningful<br />progress.</motion.h2>
              <motion.p variants={up} className="text-base font-light leading-relaxed" style={{ color: '#7a5a3a' }}>Progress focuses on consistency and strength over time, not just calorie output.</motion.p>
            </motion.div>
          </div>
        </section>

        {/* ─── CV Rep Counting ─── */}
        <section id="cv" className="overflow-hidden px-6 md:px-16 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always" style={{ background: '#f5ede2' }}>
          <div className="max-w-5xl w-full mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <SlideLabel>Core Tech · 01</SlideLabel>
              <motion.h2 variants={up} className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-6" style={{ color: '#1c1008' }}>Automatic<br />rep counting.</motion.h2>
              <motion.p variants={up} className="text-base font-light leading-relaxed mb-6" style={{ color: '#7a5a3a' }}>On-device vision detects and counts reps so users can stay focused on movement instead of logging.</motion.p>
              <motion.p variants={up} className="text-sm font-bold tracking-widest uppercase" style={{ color: '#c0622a' }}>Highlight: Squats</motion.p>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={fromRight} className="flex justify-center">
              <img src={emberSquats} alt="Squats Rep Counting" className="w-auto object-contain max-h-[45vh] md:max-h-[75vh] drop-shadow-2xl rounded-[40px]" />
            </motion.div>
          </div>
        </section>

        {/* ─── Form Analysis ─── */}
        <section id="form" className="overflow-hidden px-6 md:px-16 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always" style={{ background: '#fdf8f3' }}>
          <div className="max-w-5xl w-full mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={fromLeft} className="flex justify-center order-last md:order-first">
              <img src={emberPushups} alt="Pushups Form Analysis" className="w-auto object-contain max-h-[45vh] md:max-h-[75vh] drop-shadow-2xl rounded-[40px]" />
            </motion.div>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <SlideLabel>Core Tech · 02</SlideLabel>
              <motion.h2 variants={up} className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-6" style={{ color: '#1c1008' }}>Real-time<br />form analysis.</motion.h2>
              <motion.p variants={up} className="text-base font-light leading-relaxed mb-6" style={{ color: '#7a5a3a' }}>Joint-angle and movement-path analysis provides immediate feedback during each rep to improve form quality.</motion.p>
              <motion.p variants={up} className="text-sm font-bold tracking-widest uppercase" style={{ color: '#c0622a' }}>Highlight: Push-ups</motion.p>
            </motion.div>
          </div>
        </section>

        {/* ─── Onboarding ─── */}
        <section id="onboarding" className="overflow-hidden px-6 md:px-16 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always" style={{ background: '#f5ede2' }}>
          <div className="max-w-5xl w-full mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <SlideLabel>Onboarding Flow</SlideLabel>
              <motion.h2 variants={up} className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-6" style={{ color: '#1c1008' }}>Simple<br />onboarding.</motion.h2>
              <motion.p variants={up} className="text-base font-light leading-relaxed" style={{ color: '#7a5a3a' }}>Onboarding sets goals and training cadence quickly so the app can generate a realistic starting plan.</motion.p>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={fromRight} className="flex justify-center">
              <img src={emberOnboarding} alt="Onboarding Flow" className="w-auto object-contain max-h-[45vh] md:max-h-[75vh] drop-shadow-2xl rounded-[40px]" />
            </motion.div>
          </div>
        </section>

        {/* ─── Demo Video ─── */}
        <section id="demo" className="relative overflow-hidden px-6 md:px-16 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always" style={{ background: '#050303' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(192,98,42,0.12) 0%, rgba(0,0,0,0.92) 72%)' }} />
          <div className="relative z-10 max-w-5xl w-full mx-auto">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <motion.div variants={up} className="text-center mb-6">
                <p className="text-[10px] font-semibold tracking-[0.35em] uppercase mb-3" style={{ color: 'rgba(224,160,96,0.7)' }}>Full Product Demo</p>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none" style={{ color: '#fff7ef' }}>See Ember in use.</h2>
              </motion.div>

              <motion.div variants={up} className="flex justify-center">
                {/* Refined Mobile Device Frame */}
                <div className="relative mx-auto" style={{ width: 'min(82vw, 340px)' }}>
                  {/* Outer Device Frame (Titanium/Metal look) */}
                  <div
                    style={{
                      position: 'relative',
                      borderRadius: '48px',
                      padding: '10px',
                      background: 'linear-gradient(145deg, #383c42 0%, #1a1c20 45%, #2a2d34 75%, #101115 100%)',
                      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1), inset 0 2px 6px rgba(255,255,255,0.2), 0 24px 60px rgba(0,0,0,0.8), 0 12px 24px rgba(0,0,0,0.6)',
                    }}
                  >
                    {/* Hardware Buttons */}
                    {/* Mute */}
                    <div className="absolute top-[15%] left-[-2px] w-[3px] h-[6%] bg-gradient-to-b from-[#4a4d54] to-[#2a2c31] rounded-l-md border border-r-0 border-white/10" />
                    {/* Vol Up */}
                    <div className="absolute top-[25%] left-[-2px] w-[3px] h-[10%] bg-gradient-to-b from-[#4a4d54] to-[#2a2c31] rounded-l-md border border-r-0 border-white/10" />
                    {/* Vol Down */}
                    <div className="absolute top-[37%] left-[-2px] w-[3px] h-[10%] bg-gradient-to-b from-[#4a4d54] to-[#2a2c31] rounded-l-md border border-r-0 border-white/10" />
                    {/* Power */}
                    <div className="absolute top-[30%] right-[-2px] w-[3px] h-[15%] bg-gradient-to-b from-[#4a4d54] to-[#2a2c31] rounded-r-md border border-l-0 border-white/10" />

                    {/* Inner Screen Bezel (Black Glass) */}
                    <div
                      className="relative overflow-hidden"
                      style={{
                        borderRadius: '38px',
                        background: '#000',
                        aspectRatio: '9 / 19.5',
                        boxShadow: 'inset 0 0 0 2px #000',
                      }}
                    >
                      {/* Video Element (Dynamic Island CSS Removed) */}
                      <video
                        ref={demoVideoRef}
                        className="block w-full h-full"
                        style={{ objectFit: 'cover' }}
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                      >
                        <source src={emberDemoVideo} type="video/mp4" />
                      </video>

                      {/* Screen Glare (Subtle light reflection across the glass) */}
                      <div
                        className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay"
                        style={{
                          background: 'linear-gradient(105deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 100%)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
