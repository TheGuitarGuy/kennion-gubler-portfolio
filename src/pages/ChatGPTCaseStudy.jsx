import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCaseStudyProgress } from '../context/CaseStudyProgressContext'
import { motion } from 'framer-motion'
import MacbookFrame from '../components/MacbookFrame'

import chatgpt_1 from '../../images/chatgpt_1.png'
import chatgpt_2 from '../../images/chatgpt_2.png'
import chatgpt_3 from '../../images/chatgpt_3.png'
import chatgpt_4 from '../../images/chatgpt_4.png'
import crChatGptImg from '../../images/cr_chatgpt.png'

const up = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}
const fromLeft = {
  hidden: { opacity: 0, x: -48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}
const fromRight = {
  hidden: { opacity: 0, x: 48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.11 } } }

const VP = { once: false, amount: 0.3 }

const C = {
  dark: '#0C1440',
  mid: '#151E4E',
  light: '#F5F7FF',
  bg: '#FFFFFF',
  accent: '#2563EB',
  accentBright: '#3B82F6',
  accentLight: 'rgba(37,99,235,0.08)',
  text: '#0C1440',
  muted: '#4A5A90',
  labelOnDark: 'rgba(96,165,250,0.85)',
  textOnDark: 'rgba(255,255,255,0.95)',
  mutedOnDark: 'rgba(255,255,255,0.6)',
}

const SLIDE_IDS = ['hero', 'preferences', 'waiting', 'results', 'sources', 'outcome']

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
        background: dark ? 'rgba(59,130,246,0.12)' : C.accentLight,
        color: dark ? C.labelOnDark : C.accent,
      }}
    >
      {children}
    </motion.span>
  )
}

function FlowSlide({ id, bg, step, badge, headline, body, img, alt, imgLeft = false, dark = false }) {
  const cols = imgLeft ? 'md:grid-cols-[2fr_1fr]' : 'md:grid-cols-[1fr_2fr]'
  const textContent = (
    <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
      <Badge dark={dark}>{badge}</Badge>
      <motion.p variants={up} className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: dark ? C.mutedOnDark : C.muted }}>{step}</motion.p>
      <motion.h2 variants={up} className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4" style={{ color: dark ? C.textOnDark : C.text }}>{headline}</motion.h2>
      <motion.p variants={up} className="text-base md:text-lg leading-relaxed" style={{ color: dark ? C.mutedOnDark : C.muted }}>{body}</motion.p>
    </motion.div>
  )
  const imgContent = (
    <motion.div
      initial="hidden" whileInView="show" viewport={VP}
      variants={imgLeft ? fromLeft : fromRight}
      className={`flex justify-center items-center ${imgLeft ? 'order-last md:order-first' : ''}`}
    >
      <MacbookFrame src={img} alt={alt} />
    </motion.div>
  )
  return (
    <section
      id={id}
      className="overflow-hidden px-6 md:px-16 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always"
      style={{ background: bg }}
    >
      <div className={`max-w-7xl w-full mx-auto grid ${cols} gap-8 md:gap-10 items-center`}>
        {imgLeft ? <>{imgContent}{textContent}</> : <>{textContent}{imgContent}</>}
      </div>
    </section>
  )
}

export default function ChatGPTCaseStudy() {
  const [current, setCurrent] = useState(0)
  const { markVisited } = useCaseStudyProgress()

  useEffect(() => {
    window.scrollTo(0, 0)
    markVisited('chatgpt')
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
        style={{ background: 'rgba(12,20,64,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(59,130,246,0.12)' }}
      >
        <Link
          to="/" state={{ fromCaseStudy: true, fromCaseStudySlug: 'chatgpt' }}
          className="text-xs font-bold tracking-[0.15em] uppercase transition-opacity hover:opacity-50"
          style={{ color: C.accentBright }}
        >
          ← Back
        </Link>
      </div>

      <div className="h-screen overflow-y-auto snap-y snap-mandatory [&>section]:min-h-screen">
        {/* Hero */}
        <section
          id="hero"
          className="relative overflow-hidden px-6 md:px-16 pt-20 pb-12 md:h-screen md:flex md:items-center md:justify-center md:pt-14 snap-start snap-always"
          style={{ background: C.dark }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 65% 25%, rgba(37,99,235,0.22) 0%, transparent 60%)' }}
          />
          <div className="max-w-6xl w-full mx-auto grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12 items-center">
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.p
                variants={up}
                className="text-[10px] font-semibold tracking-[0.35em] uppercase mb-5"
                style={{ color: C.labelOnDark }}
              >
                Case Study · CR ChatGPT Integration
              </motion.p>
              <motion.h1
                variants={up}
                className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-none mb-6"
                style={{ color: C.textOnDark }}
              >
                Consumer Reports<br />guidance,<br />inside ChatGPT.
              </motion.h1>
              <motion.div variants={up} className="flex flex-wrap gap-6 md:gap-10 mt-6 md:mt-8">
                {[
                  { label: 'Role', value: 'Design Engineer' },
                  { label: 'Platform', value: 'ChatGPT App' },
                  { label: 'Focus', value: 'UX / Conversational Design' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[9px] font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(96,165,250,0.4)' }}>{label}</p>
                    <p className="text-sm font-semibold" style={{ color: C.textOnDark }}>{value}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 48, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <MacbookFrame src={crChatGptImg} alt="CR ChatGPT Plugin full view" />
            </motion.div>
          </div>

          <motion.div
            className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }}
          >
            <p className="text-[9px] font-semibold tracking-[0.25em] uppercase" style={{ color: 'rgba(96,165,250,0.35)' }}>Scroll</p>
            <motion.div
              className="w-px h-8 origin-top"
              style={{ background: 'rgba(59,130,246,0.4)' }}
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            />
          </motion.div>
        </section>

        <FlowSlide id="preferences" bg={C.bg} step="Step 1 of 4" badge="Preference Capture"
          headline={"Any must-haves?"}
          body={"Fridge shopping is contextual. Users can quickly set priorities through structured prompts so recommendations reflect their actual needs, not just top scores."}
          img={chatgpt_1} alt="ChatGPT asking for must-have features" imgLeft={true} />

        <FlowSlide id="waiting" bg={C.light} step="Step 2 of 4" badge="Show Your Work"
          headline={"What CR is checking."}
          body={"Instead of a generic loading spinner, the waiting state shows CR's testing process so users understand where the recommendation is coming from."}
          img={chatgpt_2} alt="ChatGPT waiting state with CR testing video" imgLeft={false} />

        <FlowSlide id="results" bg={C.bg} step="Step 3 of 4" badge="Clear Conclusions"
          headline={"Results you can\ncompare quickly."}
          body={"The result view surfaces Overall Score first, then the specific attributes the user asked for, so tradeoffs are easy to evaluate in-chat."}
          img={chatgpt_3} alt="ChatGPT showing recommended fridges" imgLeft={true} />

        <FlowSlide id="sources" bg={C.light} step="Step 4 of 4" badge="Traceability"
          headline={"Recommendations\nwith sources."}
          body={"Every claim includes source links so users can validate the recommendation and read deeper when they want more context."}
          img={chatgpt_4} alt="ChatGPT citing Consumer Reports sources" imgLeft={false} />

        {/* Outcome */}
        <section
          id="outcome"
          className="overflow-hidden px-6 md:px-16 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always"
          style={{ background: C.mid }}
        >
          <div className="max-w-5xl w-full mx-auto">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <Badge dark>The Impact</Badge>
              <motion.h2
                variants={up}
                className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none mb-10 md:mb-14"
                style={{ color: C.textOnDark }}
              >
                Making CR expertise<br />faster to use.
              </motion.h2>
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-14">
                {[
                  { title: 'Guided Input', body: 'Users do not need to write perfect prompts. The flow structures inputs so recommendations are relevant from the first response.' },
                  { title: 'Evidence in Context', body: "Testing context, scores, and source citations appear in one flow, which makes the recommendation easier to trust and act on." },
                ].map(({ title, body }) => (
                  <motion.div
                    key={title}
                    variants={up}
                    className="p-6 md:p-8 border-t-2"
                    style={{ borderColor: C.accentBright, background: 'rgba(255,255,255,0.03)' }}
                  >
                    <h3 className="text-base font-black mb-3" style={{ color: C.textOnDark }}>{title}</h3>
                    <p className="text-sm font-light leading-relaxed" style={{ color: C.mutedOnDark }}>{body}</p>
                  </motion.div>
                ))}
              </div>
              <motion.div variants={up}>
                <Link
                  to="/" state={{ fromCaseStudy: true, fromCaseStudySlug: 'chatgpt' }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-white text-xs font-bold tracking-[0.15em] uppercase transition-opacity hover:opacity-80 rounded-sm"
                  style={{ background: 'linear-gradient(125deg, #1d4ed8 0%, #3b82f6 100%)' }}
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
