import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCaseStudyProgress } from '../context/CaseStudyProgressContext'
import { motion } from 'framer-motion'
import MacbookFrame from '../components/MacbookFrame'
import demoVideo from '../../images/Demo-Video-Final.mp4'
import askcr_bfm from '../../images/askcr_bfm.png'
import askcr_1_prompt from '../../images/askcr_1_prompt.png'
import askcr_2_thinking from '../../images/askcr_2_thinking.png'
import askcr_3_confirm from '../../images/askcr_3_confirm.png'
import askcr_4_buying from '../../images/askcr_4_buying.png'
import askcr_5_placed from '../../images/askcr_5_placed.png'
import askcr_6_complete from '../../images/askcr_6_complete.png'

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
  dark: '#0C1A0F',
  mid: '#132918',
  light: '#F2F9F4',
  bg: '#FFFFFF',
  accent: '#16803A',
  accentBright: '#22C55E',
  accentLight: 'rgba(22,128,58,0.08)',
  text: '#0C1A0F',
  muted: '#3D6B4A',
  labelOnDark: 'rgba(74,222,128,0.75)',
  textOnDark: 'rgba(255,255,255,0.93)',
  mutedOnDark: 'rgba(255,255,255,0.45)',
}

const SLIDE_IDS = ['hero', 'problem', 'ask', 'think', 'confirm', 'buying', 'placed', 'complete', 'visa', 'outcome', 'demo']

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
        background: dark ? 'rgba(74,222,128,0.12)' : C.accentLight,
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

export default function AskCRCaseStudy() {
  const [current, setCurrent] = useState(0)
  const videoRef = useRef(null)
  const { markVisited } = useCaseStudyProgress()

  useEffect(() => { markVisited('askcr-bfm') }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (current === SLIDE_IDS.indexOf('demo')) {
      video.play().catch(() => { })
    } else {
      video.pause()
    }
  }, [current])

  useEffect(() => {
    window.scrollTo(0, 0)
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
        style={{ background: 'rgba(12,26,15,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(34,197,94,0.12)' }}
      >
        <Link
          to="/" state={{ fromCaseStudy: true, fromCaseStudySlug: 'askcr-bfm' }}
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
            style={{ background: 'radial-gradient(ellipse at 65% 25%, rgba(22,128,58,0.22) 0%, transparent 60%)' }}
          />
          <div className="max-w-6xl w-full mx-auto grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12 items-center">
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.p
                variants={up}
                className="text-[10px] font-semibold tracking-[0.35em] uppercase mb-5"
                style={{ color: C.labelOnDark }}
              >
                Case Study · AskCR · AI Commerce Prototype
              </motion.p>
              <motion.h1
                variants={up}
                className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-none mb-6"
                style={{ color: C.textOnDark }}
              >
                CR guidance<br />that can complete<br />checkout.
              </motion.h1>
              <motion.div variants={up} className="flex flex-wrap gap-6 md:gap-10 mt-6 md:mt-8">
                {[
                  { label: 'Role', value: 'Design Engineer' },
                  { label: 'Platform', value: 'AskCR · Web' },
                  { label: 'Presented', value: 'Visa HQ · San Francisco' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[9px] font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(74,222,128,0.4)' }}>{label}</p>
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
              <MacbookFrame src={askcr_bfm} alt="Buy for Me in AskCR - full purchase flow" />
            </motion.div>
          </div>

          <motion.div
            className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }}
          >
            <p className="text-[9px] font-semibold tracking-[0.25em] uppercase" style={{ color: 'rgba(74,222,128,0.35)' }}>Scroll</p>
            <motion.div
              className="w-px h-8 origin-top"
              style={{ background: 'rgba(34,197,94,0.4)' }}
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            />
          </motion.div>
        </section>

        {/* ─── 2: The Trust Barrier ─── */}
        <section
          id="problem"
          className="overflow-hidden px-6 md:px-16 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always"
          style={{ background: C.mid }}
        >
          <div className="max-w-5xl w-full mx-auto">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <Badge dark>The Trust Barrier</Badge>
              <motion.h2
                variants={up}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-8 md:mb-10"
                style={{ color: C.textOnDark }}
              >
                Recommendation is easy.<br />Purchase is where<br />trust breaks.
              </motion.h2>
              <motion.p variants={up} className="text-base md:text-xl font-light leading-relaxed max-w-2xl mb-6 md:mb-10" style={{ color: C.mutedOnDark }}>
                People already use AI to research what to buy. Letting a system place the order is a higher bar. This project focused on that trust gap.
              </motion.p>
              <motion.p variants={up} className="text-base md:text-lg font-semibold leading-relaxed max-w-2xl" style={{ color: C.labelOnDark }}>
                Consumer Reports' independent testing history is what makes this viable. The interface works because the source is already credible.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ─── 3–8: Flow Slides ─── */}
        <FlowSlide id="ask" bg={C.light} step="Step 1 of 5" badge="Trusted Starting Point"
          headline={"Start from CR,\nnot a blank prompt."}
          body={"The flow begins with Consumer Reports context, so users are not evaluating an unknown assistant at the same time they are evaluating a product."}
          img={askcr_1_prompt} alt="AskCR initial prompt screen" imgLeft={false} />

        <FlowSlide id="think" bg={C.bg} step="Step 2 of 5" badge="Visible Processing"
          headline={"Show what the\nsystem is doing."}
          body={'The "Thinking..." state is intentional. It signals that recommendation logic is running, not just returning a generic answer.'}
          img={askcr_2_thinking} alt="AskCR thinking state" imgLeft={true} />

        <FlowSlide id="confirm" bg={C.light} step="Step 3 of 5" badge="Explicit Consent"
          headline={"Make authorization\nclear and specific."}
          body={'The consent language names Consumer Reports directly and defines the exact permission scope for a one-time purchase.'}
          img={askcr_3_confirm} alt="AskCR confirm purchase screen" imgLeft={false} />

        <FlowSlide id="buying" bg={C.bg} step="Step 4 of 5" badge="Narrated Actions"
          headline={"Narrate each\npurchase step."}
          body={'System messages like "Opening secure browser..." keep users oriented during automation and reduce uncertainty during checkout.'}
          img={askcr_4_buying} alt="AskCR opening secure browser state" imgLeft={true} />

        <FlowSlide id="placed" bg={C.light} step="Step 5 of 5" badge="In-Thread Completion"
          headline={"Order placed\nin the same thread."}
          body="The transaction is completed without sending users through a traditional multi-page checkout flow."
          img={askcr_5_placed} alt="AskCR order placed screen" imgLeft={false} />

        <FlowSlide id="complete" bg={C.bg} step="Confirmation" badge="Clear Confirmation"
          headline={"Confirmation\nwithout context switching."}
          body={'Order confirmation appears in the same conversation where the request started, with receipt details sent by email.'}
          img={askcr_6_complete} alt="AskCR purchase complete confirmation" imgLeft={true} />

        {/* ─── 9: Visa HQ ─── */}
        <section
          id="visa"
          className="overflow-hidden px-6 md:px-16 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always"
          style={{ background: C.dark }}
        >
          <div className="max-w-5xl w-full mx-auto">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <Badge dark>Presented at Visa HQ · San Francisco</Badge>
              <motion.h2
                variants={up}
                className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-none mb-8 md:mb-10"
                style={{ color: C.textOnDark }}
              >
                Presented at<br />Visa's commerce<br />prototype event.
              </motion.h2>
              <motion.p variants={up} className="text-base md:text-lg font-light max-w-2xl mb-10 md:mb-14" style={{ color: C.mutedOnDark }}>
                Skyfire invited CR to present this prototype at Visa's San Francisco HQ. It was selected as one of two concepts shown at the event.
              </motion.p>
              <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
                {[
                  { label: 'CR', title: 'Product Advisor', body: 'Independent testing and zero commercial relationships behind every recommendation. The whole flow depends on this.' },
                  { label: 'Visa', title: 'Payment Infrastructure', body: "Visa's Intelligent Commerce tokenizes the card and binds it to the user's device, so the agent can settle the transaction without ever touching raw payment data." },
                  { label: 'Skyfire', title: 'Secure Credentialing', body: "Skyfire's verified identity credentials let the headless browser access merchant sites and complete checkout without exposing credentials or raw payment data." },
                ].map(({ label, title, body }) => (
                  <motion.div
                    key={label}
                    variants={up}
                    className="p-6 md:p-8 border-t-2"
                    style={{ borderColor: C.accentBright, background: 'rgba(255,255,255,0.04)' }}
                  >
                    <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-3" style={{ color: C.labelOnDark }}>{label}</p>
                    <h3 className="text-base font-black mb-3" style={{ color: C.textOnDark }}>{title}</h3>
                    <p className="text-sm font-light leading-relaxed" style={{ color: C.mutedOnDark }}>{body}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── 10: Outcome ─── */}
        <section
          id="outcome"
          className="overflow-hidden px-6 md:px-16 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always"
          style={{ background: C.mid }}
        >
          <div className="max-w-5xl w-full mx-auto">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <Badge dark>The Design Principle</Badge>
              <motion.h2
                variants={up}
                className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none mb-10 md:mb-14"
                style={{ color: C.textOnDark }}
              >
                Designing for<br />purchase confidence.
              </motion.h2>
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-14">
                {[
                  { title: 'Brand Carries the Risk', body: "CR's credibility is surfaced at every decision point where users hesitate: recommendation, consent, purchase, and confirmation." },
                  { title: 'Visible System Status', body: 'The flow narrates each step so users always know what is happening during automation.' },
                  { title: 'Single-Surface Checkout', body: 'Recommendations, consent, purchase state, and confirmation all stay in one thread with minimal UI overhead.' },
                  { title: 'Operational Guardrails Needed', body: 'Production rollout still requires robust consent, authorization, and permission infrastructure across partners.' },
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
                  to="/" state={{ fromCaseStudy: true, fromCaseStudySlug: 'askcr-bfm' }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-white text-xs font-bold tracking-[0.15em] uppercase transition-opacity hover:opacity-80 rounded-sm"
                  style={{ background: 'linear-gradient(125deg, #15803d 0%, #22c55e 100%)' }}
                >
                  ← Back to Portfolio
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── 11: Demo ─── */}
        <section
          id="demo"
          className="overflow-hidden px-4 md:px-0 pt-16 pb-12 flex flex-col items-center justify-center md:h-screen snap-start snap-always relative"
          style={{ background: '#050D07' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 52%, rgba(22,128,58,0.25) 0%, transparent 60%)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 38%, rgba(0,0,0,0.88) 100%)' }}
          />

          <motion.div
            className="relative z-10 text-center mb-5"
            initial={{ opacity: 0, y: -14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[9px] font-bold tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(74,222,128,0.45)' }}>
              Full Flow · Buy for Me in AskCR
            </p>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight" style={{ color: C.textOnDark }}>
              Watch it work.
            </h2>
          </motion.div>

          <motion.div
            className="relative z-10 w-full flex justify-center"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative" style={{ maxHeight: '60vh', width: '100%', maxWidth: '900px' }}>
              {[
                { top: -6, left: -6 },
                { top: -6, right: -6 },
                { bottom: -6, left: -6 },
                { bottom: -6, right: -6 },
              ].map((style, i) => (
                <div key={i} className="absolute w-4 h-4 z-20 pointer-events-none" style={style}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1.5px', background: 'rgba(34,197,94,0.5)' }} />
                  <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '1.5px', background: 'rgba(34,197,94,0.5)' }} />
                </div>
              ))}

              <div
                className="relative rounded-xl overflow-hidden"
                style={{ boxShadow: '0 0 0 1px rgba(34,197,94,0.2), 0 24px 80px rgba(0,0,0,0.85)' }}
              >
                <motion.div
                  className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
                  animate={{ height: current === SLIDE_IDS.indexOf('demo') ? 0 : '14%' }}
                  transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: '#050D07' }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
                  animate={{ height: current === SLIDE_IDS.indexOf('demo') ? 0 : '14%' }}
                  transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: '#050D07' }}
                />

                <motion.div
                  className="absolute top-3 left-4 z-20 flex items-center gap-1.5 pointer-events-none"
                  animate={{ opacity: current === SLIDE_IDS.indexOf('demo') ? 1 : 0 }}
                  transition={{ duration: 0.4, delay: current === SLIDE_IDS.indexOf('demo') ? 0.9 : 0 }}
                >
                  <motion.span
                    className="block w-1.5 h-1.5 rounded-full"
                    style={{ background: C.accentBright }}
                    animate={current === SLIDE_IDS.indexOf('demo') ? { opacity: [1, 0.2, 1] } : { opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                  />
                  <span className="text-[8px] font-bold tracking-[0.25em] uppercase" style={{ color: 'rgba(74,222,128,0.7)' }}>
                    Now Playing
                  </span>
                </motion.div>

                <video
                  ref={videoRef}
                  src={demoVideo}
                  muted
                  loop
                  playsInline
                  controls
                  className="block w-full"
                  style={{ maxHeight: '60vh', objectFit: 'contain' }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative z-10 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              to="/" state={{ fromCaseStudy: true, fromCaseStudySlug: 'askcr-bfm' }}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-white text-xs font-bold tracking-[0.15em] uppercase transition-opacity hover:opacity-80 rounded-sm"
              style={{ background: 'linear-gradient(125deg, #15803d 0%, #22c55e 100%)' }}
            >
              ← Back to Portfolio
            </Link>
          </motion.div>
        </section>

      </div>
    </div>
  )
}
