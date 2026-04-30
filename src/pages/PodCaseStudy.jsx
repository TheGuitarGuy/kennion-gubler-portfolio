import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCaseStudyProgress } from '../context/CaseStudyProgressContext'
import { motion } from 'framer-motion'
import podHeroImg from '../../images/Pod_Case_Study.png'
import podPersonasImg from '../../images/pod_personas.png'
import podMidfiImg from '../../images/pod_midfi.png'
import podDesignSystemImg from '../../images/pod_design_system.png'
import podMonetizationImg from '../../images/pod_monetization.png'
import podScreensImg from '../../images/pod_screens.png'

const up = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}
const fromLeft = {
  hidden: { opacity: 0, x: -56 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}
const fromRight = {
  hidden: { opacity: 0, x: 56 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }

const VP = { once: false, amount: 0.35 }

const C = {
  dark: '#0A0D1F',
  mid: '#12173A',
  light: '#F0F2FF',
  bg: '#FFFFFF',
  accent: '#1E2B8F',
  accentBright: '#3D52CC',
  accentLight: 'rgba(30,43,143,0.08)',
  text: '#0A0D1F',
  muted: '#4A5275',
  labelOnDark: 'rgba(130,150,255,0.75)',
  textOnDark: 'rgba(255,255,255,0.9)',
  mutedOnDark: 'rgba(255,255,255,0.45)',
}

const SLIDE_IDS = ['hero', 'problem', 'research', 'ideation', 'design-system', 'value-prop', 'screens', 'demo', 'takeaway']
const POD_DEMO_VIDEO = `${import.meta.env.BASE_URL}pod_demo.mp4`

function ProgressDots({ current }) {
  return (
    <div className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-50 flex-col gap-2 items-center">
      {SLIDE_IDS.map((_, i) => (
        <motion.a
          key={i}
          href={`#${SLIDE_IDS[i]}`}
          animate={{ height: i === current ? 28 : 6, opacity: i === current ? 1 : 0.25 }}
          transition={{ duration: 0.3 }}
          className="w-1 rounded-full block"
          style={{ background: C.accentBright }}
        />
      ))}
    </div>
  )
}

function Badge({ children, dark = false }) {
  return (
    <motion.span
      variants={up}
      className="inline-block font-semibold text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full mb-5"
      style={{
        background: dark ? 'rgba(130,150,255,0.12)' : C.accentLight,
        color: dark ? C.labelOnDark : C.accent,
      }}
    >
      {children}
    </motion.span>
  )
}

export default function PodCaseStudy() {
  const [current, setCurrent] = useState(0)
  const { markVisited } = useCaseStudyProgress()

  useEffect(() => {
    window.scrollTo(0, 0)
    markVisited('pod')
  }, [])

  useEffect(() => {
    const els = SLIDE_IDS.map(id => document.getElementById(id)).filter(Boolean)
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          const i = els.indexOf(e.target)
          if (i !== -1) setCurrent(i)
        }
      }),
      { threshold: 0.5 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="relative">
      <ProgressDots current={current} />

      {/* Nav */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-6 md:px-8"
        style={{ background: 'rgba(10,13,31,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(61,82,204,0.2)' }}
      >
        <Link
          to="/"
          state={{ fromCaseStudy: true, fromCaseStudySlug: 'pod' }}
          className="text-xs font-bold tracking-[0.15em] uppercase transition-opacity hover:opacity-50"
          style={{ color: C.accentBright }}
        >
          ← Back
        </Link>
      </div>

      <div className="h-screen overflow-y-auto snap-y snap-mandatory [&>section]:min-h-screen">
        {/* ─── 1: Hero ─── */}
        <section
          id="hero"
          className="relative overflow-hidden px-6 md:px-16 pt-20 pb-12 md:h-screen md:flex md:items-center md:justify-center md:pt-14 snap-start snap-always"
          style={{ background: C.dark }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 70% 20%, rgba(61,82,204,0.18) 0%, transparent 60%)' }}
          />
          <div className="max-w-7xl w-full mx-auto grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12 items-center">
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.p
                variants={up}
                className="text-[10px] font-semibold tracking-[0.35em] uppercase mb-4"
                style={{ color: C.labelOnDark }}
              >
                Case Study · iOS · 0→1
              </motion.p>
              <motion.h1
                variants={up}
                className="text-2xl md:text-3xl font-black tracking-tight leading-tight mb-3"
                style={{ color: C.textOnDark }}
              >
                People Over Profiles.
              </motion.h1>
              <motion.p
                variants={up}
                className="text-xs font-light leading-relaxed max-w-xs mb-7"
                style={{ color: C.mutedOnDark }}
              >
                Pod Dating is an event-based dating app designed to prioritize people over profiles. The goal was to move beyond endless swiping and help people make meaningful real-world connections, while directly addressing safety, intentionality, and trust.
              </motion.p>
              <motion.div variants={up} className="flex flex-wrap gap-5 md:gap-6">
                {[
                  { label: 'Role', value: 'Design Engineer · iOS Dev' },
                  { label: 'Stack', value: 'Swift · SwiftUI · Firebase' },
                  { label: 'Timeline', value: '6 Months' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[9px] font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(130,150,255,0.45)' }}>{label}</p>
                    <p className="text-xs font-semibold" style={{ color: C.textOnDark }}>{value}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.img
              src={podHeroImg}
              alt="Pod Dating iOS app screens"
              initial={{ opacity: 0, y: 48, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="w-full object-contain drop-shadow-2xl"
              style={{ maxHeight: '75vh' }}
            />
          </div>

          <motion.div
            className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }}
          >
            <p className="text-[9px] font-semibold tracking-[0.25em] uppercase" style={{ color: 'rgba(130,150,255,0.35)' }}>Scroll</p>
            <motion.div
              className="w-px h-8 origin-top"
              style={{ background: 'rgba(61,82,204,0.4)' }}
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            />
          </motion.div>
        </section>

        {/* ─── 2: The Problem ─── */}
        <section
          id="problem"
          className="overflow-hidden px-6 md:px-16 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always"
          style={{ background: C.mid }}
        >
          <div className="max-w-5xl w-full mx-auto">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <Badge dark>The Problem</Badge>
              <motion.h2
                variants={up}
                className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight leading-none mb-10 md:mb-16"
                style={{ color: C.textOnDark }}
              >
                Why Most Dating Apps<br />Aren't the Best.
              </motion.h2>
              <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
                {[
                  { n: '01', title: 'Pay-to-Play Incentives', body: 'Most dating apps monetize through subscriptions, which rewards time spent in-app more than successful matches.' },
                  { n: '02', title: 'Low-Quality Matches', body: 'The experience often favors volume over fit, leaving people with too many poor matches and too much noise.' },
                  { n: '03', title: 'Safety Concerns', body: 'Safety is still a major issue, especially for women, when meeting people through traditional dating app flows.' },
                ].map(({ n, title, body }) => (
                  <motion.div
                    key={n}
                    variants={up}
                    className="p-6 md:p-8 border-t-2"
                    style={{ borderColor: C.accentBright, background: 'rgba(255,255,255,0.03)' }}
                  >
                    <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: C.labelOnDark }}>{n}</p>
                    <h3 className="text-base font-black mb-3" style={{ color: C.textOnDark }}>{title}</h3>
                    <p className="text-sm font-light leading-relaxed" style={{ color: C.mutedOnDark }}>{body}</p>
                  </motion.div>
                ))}
              </div>
              <motion.p variants={up} className="mt-8 text-base md:text-lg font-semibold leading-relaxed max-w-3xl" style={{ color: C.labelOnDark }}>
                How might we design a dating platform that emphasizes quality, safety, and real-world connection, without relying on pay-to-play mechanics?
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ─── 3: Research ─── */}
        <section
          id="research"
          className="overflow-hidden px-6 md:px-20 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always"
          style={{ background: C.light }}
        >
          <div className="max-w-6xl w-full mx-auto grid md:grid-cols-[1fr_3fr] gap-8 md:gap-12 items-center">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <Badge>Who It's For</Badge>
              <motion.h2 variants={up} className="text-3xl md:text-5xl font-bold tracking-tight leading-tight" style={{ color: C.text }}>
                Two types<br />of singles.
              </motion.h2>
              <motion.div variants={stagger} className="mt-8 flex flex-col gap-4">
                {[
                  { quote: '"I\'m scared of meeting strangers from the internet."', attr: '24-year-old woman' },
                  { quote: '"Dating apps feel like a meat market."', attr: '21-year-old man' },
                  { quote: '"It takes forever to find someone I actually click with."', attr: '22-year-old woman' },
                ].map(({ quote, attr }) => (
                  <motion.div
                    key={attr}
                    variants={up}
                    className="px-5 py-4 border-l-2"
                    style={{ borderColor: C.accent, background: C.accentLight }}
                  >
                    <p className="text-sm font-medium italic mb-1" style={{ color: C.text }}>{quote}</p>
                    <p className="text-[10px] tracking-[0.15em] uppercase" style={{ color: C.muted }}>— {attr}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={fromRight} className="flex justify-center">
              <img src={podPersonasImg} alt="Pod user personas" className="w-full object-contain drop-shadow-xl rounded-xl" style={{ maxHeight: '75vh' }} />
            </motion.div>
          </div>
        </section>

        {/* ─── 4: Ideation ─── */}
        <section
          id="ideation"
          className="overflow-hidden px-6 md:px-20 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always"
          style={{ background: C.bg }}
        >
          <div className="max-w-6xl w-full mx-auto grid md:grid-cols-[3fr_1fr] gap-8 md:gap-12 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={fromLeft} className="flex justify-center order-last md:order-first">
              <img src={podMidfiImg} alt="Pod app wireframes" className="w-full object-contain drop-shadow-xl rounded-xl" style={{ maxHeight: '75vh' }} />
            </motion.div>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <Badge>How It Works</Badge>
              <motion.h2 variants={up} className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: C.text }}>
                Event-first,<br />profile second.
              </motion.h2>
              <motion.p variants={up} className="mt-4 text-base md:text-lg" style={{ color: C.muted }}>
                Browse local events, see who else is going, match before you arrive. The first date is already planned.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ─── 5: Design System ─── */}
        <section
          id="design-system"
          className="overflow-hidden px-6 md:px-20 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always"
          style={{ background: C.light }}
        >
          <div className="max-w-6xl w-full mx-auto grid md:grid-cols-[1fr_3fr] gap-8 md:gap-12 items-center">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <Badge>Look & Feel</Badge>
              <motion.h2 variants={up} className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: C.text }}>
                Calm.<br />Trustworthy.<br />Intentional.
              </motion.h2>
              <motion.p variants={up} className="mt-4 text-base md:text-lg" style={{ color: C.muted }}>
                Deep navy and soft whites replace the hot pinks of hookup culture. Pod looks as serious as it is.
              </motion.p>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={fromRight} className="flex justify-center">
              <img src={podDesignSystemImg} alt="Pod Dating visual identity" className="w-full object-contain drop-shadow-xl rounded-xl" style={{ maxHeight: '75vh' }} />
            </motion.div>
          </div>
        </section>

        {/* ─── 6: Value Proposition / Monetization ─── */}
        <section
          id="value-prop"
          className="overflow-hidden px-6 md:px-20 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always"
          style={{ background: C.bg }}
        >
          <div className="max-w-6xl w-full mx-auto grid md:grid-cols-[3fr_1fr] gap-8 md:gap-12 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={fromLeft} className="flex justify-center order-last md:order-first">
              <img src={podMonetizationImg} alt="Pod venue partnership model" className="w-full object-contain drop-shadow-xl rounded-xl" style={{ maxHeight: '75vh' }} />
            </motion.div>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <Badge>Business Model</Badge>
              <motion.h2 variants={up} className="text-3xl md:text-5xl font-bold tracking-tight leading-tight" style={{ color: C.text }}>
                Venue-funded,<br />not subscription-funded.
              </motion.h2>
              <motion.p variants={up} className="mt-4 text-base md:text-lg" style={{ color: C.muted }}>
                Venues pay Pod to drive foot traffic. Users never pay a dime, so Pod profits only when real dates happen.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ─── 7: High-Fidelity Screens ─── */}
        <section
          id="screens"
          className="overflow-hidden px-4 md:px-8 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always"
          style={{ background: C.bg }}
        >
          <div className="max-w-7xl w-full mx-auto">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP} className="text-center mb-6">
              <Badge>The Product</Badge>
              <motion.h2 variants={up} className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: C.text }}>
                Pod, in full detail.
              </motion.h2>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={up} className="flex justify-center">
              <img src={podScreensImg} alt="Pod Dating high-fidelity screens" className="w-full object-contain drop-shadow-2xl rounded-xl" style={{ maxHeight: '70vh' }} />
            </motion.div>
          </div>
        </section>

        {/* ─── 8: Demo ─── */}
        <section
          id="demo"
          className="overflow-hidden px-6 md:px-16 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always"
          style={{ background: C.light }}
        >
          <div className="max-w-6xl w-full mx-auto grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12 items-center">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <Badge>Live App</Badge>
              <motion.h2 variants={up} className="text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: C.text }}>
                Product demo.
              </motion.h2>
              <motion.p variants={up} className="text-base md:text-lg" style={{ color: C.muted }}>
                Fully functional iOS. Browse events, match with attendees, and message before the date even happens.
              </motion.p>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={fromRight} className="flex justify-center">
              <div
                className="overflow-hidden rounded-3xl shadow-2xl"
                style={{ aspectRatio: '9/16', width: 'min(300px, 55vw)', border: `1px solid rgba(30,43,143,0.15)` }}
              >
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                >
                  <source src={POD_DEMO_VIDEO} type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── 9: Takeaway ─── */}
        <section
          id="takeaway"
          className="overflow-hidden px-6 md:px-16 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always"
          style={{ background: C.mid }}
        >
          <div className="max-w-5xl w-full mx-auto">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <Badge dark>What Makes Pod Different</Badge>
              <motion.h2
                variants={up}
                className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight leading-none mb-10 md:mb-16"
                style={{ color: C.textOnDark }}
              >
                Dating that<br />works for you.
              </motion.h2>
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-16">
                {[
                  { n: '01', title: 'No Swiping', body: 'Events replace the swipe feed. You\'re already doing something fun, and your match is standing right next to you.' },
                  { n: '02', title: 'Free, Always', body: 'Pod is funded by the venues hosting the events, not by users. Your incentives and Pod\'s are perfectly aligned.' },
                ].map(({ n, title, body }) => (
                  <motion.div
                    key={n}
                    variants={up}
                    className="p-6 md:p-8 border-t-2"
                    style={{ borderColor: C.accentBright, background: 'rgba(255,255,255,0.03)' }}
                  >
                    <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: C.labelOnDark }}>{n}</p>
                    <h3 className="text-base font-black mb-3" style={{ color: C.textOnDark }}>{title}</h3>
                    <p className="text-sm font-light leading-relaxed" style={{ color: C.mutedOnDark }}>{body}</p>
                  </motion.div>
                ))}
              </div>
              <motion.div variants={up}>
                <Link
                  to="/"
                  state={{ fromCaseStudy: true, fromCaseStudySlug: 'pod' }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-white text-xs font-bold tracking-[0.15em] uppercase transition-opacity hover:opacity-80 rounded-sm"
                  style={{ background: 'linear-gradient(125deg, #1E2B8F 0%, #3D52CC 100%)' }}
                >
                  ← Back to Portfolio
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
