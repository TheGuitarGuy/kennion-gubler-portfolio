import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCaseStudyProgress, CASE_STUDY_SLUGS } from '../context/CaseStudyProgressContext'
import { useTheme } from '../context/ThemeContext'
import realOneImg from '../../images/youre_a_real_one.png'

// Horizontal layout — equal-width cells so track math is exact
const N = CASE_STUDY_SLUGS.length
const INSET_PCT = 100 / (2 * N)          // center of first/last cell = 10%
const TRACK_PCT = 100 - 2 * INSET_PCT    // track spans 80% of container

const LABELS = {
  'askcr-bfm': 'AskCR BFM',
  'buy-for-me': 'Buy for Me',
  'chatgpt': 'ChatGPT',
  'ember': 'Ember',
  'pod': 'Pod',
}

function useColors() {
  const { mode } = useTheme()
  const night = mode === 'night'
  const sunset = mode === 'sunset'
  return {
    night, sunset,
    accent: night ? '#38bdf8' : sunset ? '#fb923c' : '#92400e',
    emptyBorder: night ? 'rgba(200,221,240,0.55)' : sunset ? 'rgba(255,180,100,0.60)' : 'rgba(43,26,14,0.50)',
    trackBg: night ? 'rgba(200,221,240,0.15)' : sunset ? 'rgba(255,180,100,0.20)' : 'rgba(43,26,14,0.15)',
    cardBg: night ? 'rgba(10,22,40,0.97)' : sunset ? 'rgba(30,8,55,0.97)' : 'rgba(255,250,244,0.99)',
    cardBorder: night ? 'rgba(56,189,248,0.22)' : sunset ? 'rgba(251,146,60,0.28)' : 'rgba(146,64,14,0.22)',
    modalText: night ? '#c8ddf0' : sunset ? '#ffe8cc' : '#1c1917',
  }
}

function RewardModal({ onClose }) {
  const c = useColors()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 pointer-events-auto"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.82, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative w-full rounded-3xl overflow-hidden"
        style={{
          maxWidth: 440,
          background: c.cardBg,
          border: `1.5px solid ${c.cardBorder}`,
          boxShadow: `0 40px 90px rgba(0,0,0,0.55), 0 0 50px ${c.accent}1a`,
        }}
      >
        <div className="p-8 flex flex-col items-center text-center gap-5">
          <motion.div
            initial={{ scale: 0.7, opacity: 0, rotate: -4 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.1, duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-full rounded-2xl overflow-hidden"
            style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.25)' }}
          >
            <img src={realOneImg} alt="You're a real one" className="w-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex flex-col gap-3"
          >
            <p className="text-[10px] font-black tracking-[0.3em] uppercase" style={{ color: c.accent }}>
              Achievement Unlocked
            </p>
            <h3 className="text-2xl font-black tracking-tight" style={{ color: c.modalText, fontFamily: '"BookletCordel", serif' }}>
              You're a legend!
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: c.modalText, opacity: 0.78 }}>
              Seriously... you looked at every single case study. That kind of thoroughness is rare and makes for incredible collaboration. Let's talk.
            </p>
            <div
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl"
              style={{ background: `${c.accent}18`, border: `1px solid ${c.accent}35` }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" />
              </svg>
              <a href="mailto:kenniongubler@gmail.com" className="text-sm font-bold" style={{ color: c.accent }} onClick={e => e.stopPropagation()}>
                kenniongubler@gmail.com
              </a>
            </div>
          </motion.div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            href={realOneImg}
            download="party-sanderling.png"
            onClick={e => e.stopPropagation()}
            className="px-7 py-3 text-xs font-black tracking-[0.2em] uppercase rounded-full mt-1 inline-flex flex-col items-center gap-1.5"
            style={{
              background: `${c.accent}20`,
              color: c.accent,
              border: `1.5px solid ${c.accent}66`,
              boxShadow: `0 4px 16px ${c.accent}2e`,
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="flex items-center gap-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v12" />
                <path d="m7 10 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
              <span>Download Party Sanderling</span>
            </div>
            <span className="text-[9px] font-bold opacity-80 tracking-widest">(The most coveted collectible of 2026)</span>
          </motion.a>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={onClose}
            className="px-7 py-3 text-xs font-black tracking-[0.2em] uppercase rounded-full mt-2"
            style={{ background: c.accent, color: c.night || c.sunset ? '#08080a' : '#fff', boxShadow: `0 4px 18px ${c.accent}55` }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            I'll be in touch!
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function CaseStudyProgress({ activeSlug, showTracker = true }) {
  const { visited, allSeen } = useCaseStudyProgress()
  const c = useColors()

  const [showReward, setShowReward] = useState(false)
  const triggeredRef = useRef(false)

  useEffect(() => {
    if (allSeen && !triggeredRef.current) {
      triggeredRef.current = true
      const t = setTimeout(() => setShowReward(true), 500)
      return () => clearTimeout(t)
    }
  }, [allSeen])

  const activeIndex = CASE_STUDY_SLUGS.indexOf(activeSlug)
  const fillWidth = N > 1 ? `${(activeIndex / (N - 1)) * TRACK_PCT}%` : '0%'

  return (
    <>
      {showTracker && (
        <>
          {/* Horizontal stepper — sits in the sticky header overlay above the cards */}
          <div className="relative w-full select-none mt-3">

            {/* Track background: spans between first and last dot centers */}
            <div
              className="absolute h-[3px] rounded-full"
              style={{
                top: 6,
                left: `${INSET_PCT}%`,
                right: `${INSET_PCT}%`,
                background: c.trackBg,
              }}
            />

            {/* Animated fill — grows right as you advance through cards */}
            <motion.div
              className="absolute h-[3px] rounded-full"
              style={{
                top: 6,
                left: `${INSET_PCT}%`,
                background: c.accent,
                boxShadow: `0 0 8px ${c.accent}99`,
              }}
              animate={{ width: fillWidth }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Dots + labels row — equal-width flex cells keep dots at exact cell centers */}
            <div className="relative z-10 flex">
              {CASE_STUDY_SLUGS.map((slug, i) => {
                const isActive = slug === activeSlug
                const isVisited = visited.has(slug)
                const isFilled = i <= activeIndex
                const emphasized = isActive || isFilled

                return (
                  <div key={slug} className="flex flex-col items-center" style={{ flex: '1 1 0%' }}>
                    {/* Dot with optional visited badge */}
                    <div className="relative">
                      <motion.div
                        className="rounded-full"
                        animate={{
                          width: isActive ? 14 : 10,
                          height: isActive ? 14 : 10,
                          opacity: emphasized ? 1 : 0.38,
                        }}
                        transition={{ duration: 0.35 }}
                        style={{
                          background: emphasized ? c.accent : c.emptyBorder,
                          boxShadow: isActive ? `0 0 10px ${c.accent}` : 'none',
                        }}
                      />
                      {isVisited && !isActive && (
                        <div
                          className="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center"
                          style={{ background: '#22c55e', zIndex: 20 }}
                        >
                          <svg width="5" height="5" viewBox="0 0 10 10" fill="none">
                            <polyline points="1.5,5 4,7.5 8.5,2" strokeWidth="2.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Label */}
                    <motion.span
                      animate={{ opacity: isActive ? 1 : isFilled || isVisited ? 0.55 : 0.28 }}
                      className="mt-1.5 text-[8px] font-black uppercase tracking-wider text-center whitespace-nowrap"
                      style={{ color: isActive ? c.accent : c.emptyBorder }}
                    >
                      {LABELS[slug]}
                    </motion.span>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}

      <AnimatePresence>
        {showReward && <RewardModal onClose={() => setShowReward(false)} />}
      </AnimatePresence>
    </>
  )
}