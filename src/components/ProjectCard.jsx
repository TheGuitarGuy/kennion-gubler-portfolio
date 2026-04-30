import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import MacbookFrame from './MacbookFrame'

import driftwoodTexture from '../../images/wood_grain.jpg'

// "Clean Engraving" style using your custom BookletCordel font
const engravedTextStyle = {
  fontFamily: '"BookletCordel", "Booklet Cordel", serif',
  color: '#150a04', // Deepened text color for maximum contrast
  opacity: 1,
  textShadow: `
    0 1px 1px rgba(255, 255, 255, 0.9),
    0 -1px 1px rgba(0, 0, 0, 0.7),
    0 0 12px rgba(255, 255, 255, 0.65),
    0 0 24px rgba(255, 255, 255, 0.4)
  `,
}

const engravedBoxStyle = {
  ...engravedTextStyle,
  borderColor: 'rgba(21, 10, 4, 0.55)',
  boxShadow: '0 1px 1px rgba(255, 255, 255, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255,255,255,0.4)',
}

const cardButtonStyle = {
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  fontWeight: 900,
  color: '#1a0f08',
  borderColor: 'rgba(32, 16, 8, 0.62)',
  textShadow: '0 1px 0 rgba(255,255,255,0.34)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 10px rgba(43,24,10,0.16)',
}

function MetricBadge({ value }) {
  return (
    <span
      className="inline-block text-[16px] font-bold tracking-wide px-3 py-1.5 mr-2 mb-2"
      style={{
        border: `1.5px solid`,
        borderRadius: '6px',
        ...engravedBoxStyle
      }}
    >
      {value}
    </span>
  )
}

function TagBadge({ label }) {
  return (
    <span
      className="inline-block text-[11px] sm:text-[14px] font-black tracking-[0.10em] sm:tracking-[0.12em] uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 mr-1 mb-1 sm:mr-1.5 sm:mb-1.5"
      style={{
        border: `1px solid`,
        borderRadius: '4px',
        ...engravedBoxStyle
      }}
    >
      {label}
    </span>
  )
}

function MockupPlaceholder({ label, accent }) {
  return (
    <div
      className="relative w-[140px] flex-shrink-0 aspect-[9/19] rounded-[24px] overflow-hidden border border-neutral-200/80 shadow-lg"
      style={{ background: accent }}
    >
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-black/20 rounded-full" />
      <div className="absolute inset-4 top-8 flex flex-col gap-2">
        <div className="h-2 bg-white/30 rounded-full w-3/4" />
        <div className="h-2 bg-white/20 rounded-full w-1/2" />
        <div className="h-12 bg-white/20 rounded-xl mt-2" />
        <div className="h-2 bg-white/20 rounded-full w-2/3" />
        <div className="h-2 bg-white/15 rounded-full w-1/2" />
        <div className="flex gap-1 mt-1">
          <div className="h-8 w-full bg-white/20 rounded-lg" />
          <div className="h-8 w-full bg-white/20 rounded-lg" />
        </div>
        <div className="h-2 bg-white/15 rounded-full w-3/4 mt-1" />
        <div className="h-2 bg-white/10 rounded-full w-1/2" />
        <div className="h-10 bg-white/20 rounded-xl mt-1" />
        <div className="h-2 bg-white/15 rounded-full w-2/3" />
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <span className="text-[11px] font-semibold text-white/50 tracking-widest uppercase" style={{ fontFamily: '"BookletCordel", serif' }}>{label}</span>
      </div>
    </div>
  )
}

function DriftwoodFrame({ index, children }) {
  const irregularOvals = [
    '35% 45% 30% 50% / 45% 35% 50% 35%',
    '45% 35% 40% 40% / 35% 45% 35% 50%',
    '30% 45% 40% 35% / 40% 35% 45% 40%'
  ];

  const currentRadius = irregularOvals[index % irregularOvals.length];

  return (
    <div className="relative w-full h-full transition-transform duration-500">

      {/* Keep full-safe bounds on small screens, then gradually widen on large screens
          so the surfboard silhouette can breathe when space is available. */}
      <div
        className="absolute z-0 left-0 right-0 xl:-left-[2.5%] xl:-right-[2.5%] 2xl:-left-[7%] 2xl:-right-[7%]"
        style={{
          top: '-2%',
          bottom: '-2%',
          borderRadius: currentRadius,
          boxShadow: '0 16px 32px rgba(0,0,0,0.3)',
          backgroundColor: '#e6ccb3',
        }}
      >
        <div
          className="relative overflow-hidden w-full h-full"
          style={{
            borderRadius: currentRadius,
            boxShadow: 'inset 0 6px 12px rgba(255,255,255,0.5), inset 0 -6px 16px rgba(0,0,0,0.3)'
          }}
        >
          <img
            src={driftwoodTexture}
            alt="Wood texture"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-[0.52] mix-blend-multiply"
            style={{
              objectPosition: `${(index * 35) % 100}% ${(index * 60) % 100}%`,
              filter: 'contrast(1.15) brightness(1.1) saturate(1.1)',
              transform: 'scale(1.05)'
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none opacity-15 mix-blend-multiply"
            style={{ backgroundColor: '#D2AD85' }}
          />
        </div>
      </div>

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  metrics = [],
  tags = [],
  caseStudyHref = '#',
  liveHref,
  liveLabel = 'VIEW LIVE →',
  mockups = [],
  image,
  macbook = false,
  index: cardIndex = 0,
}) {
  const ref = useRef(null)

  // Playing the animation only once prevents the Intersection Observer from 
  // repeatedly triggering and glitching if the user scrolls back and forth at the boundary.
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })

  const isEven = cardIndex % 2 === 0
  const tideInitial = {
    opacity: 0,
    y: 60,
  }

  const tideAnimate = isInView ? {
    opacity: 1,
    y: 0,
  } : tideInitial

  return (
    <motion.article
      ref={ref}
      animate={tideAnimate}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full max-w-[1120px] xl:max-w-[1180px] 2xl:max-w-[1240px] mx-auto px-2 sm:px-4 lg:px-6 sm:min-h-[780px] lg:min-h-[840px]"
      style={{ willChange: 'transform, opacity' }}
    >
      <DriftwoodFrame index={cardIndex}>
        {/* Inner safe-area container keeps all content away from wood edges */}
        <div className="relative z-10 h-full w-full px-3 sm:px-10 lg:px-16 py-3 sm:py-10 lg:py-16 flex items-center justify-center">
          <div className="w-full sm:origin-center sm:w-[110%] sm:h-[110%] sm:scale-[0.9] lg:w-full lg:h-full lg:scale-100">
            <div
              className="relative z-10 grid grid-cols-2 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-2 sm:gap-6 lg:gap-10 group h-full mx-auto max-w-[98%] lg:max-w-[92%] px-1 sm:px-4 lg:px-6 py-2 sm:py-8 lg:py-10"
            >
              {/* Left — Content */}
              <div className="relative z-10 flex flex-col justify-center h-full px-1 py-1 sm:px-6 sm:py-6 lg:px-8 lg:py-8 min-w-0 max-w-[44rem] max-h-full">
                <p className="text-[10px] sm:text-[16px] font-black tracking-[0.20em] sm:tracking-[0.24em] uppercase mb-1 sm:mb-5" style={engravedTextStyle}>
                  {String(cardIndex + 1).padStart(2, '0')}
                </p>

                <h2 className="text-lg sm:text-3xl lg:text-5xl font-black tracking-tight mb-1 sm:mb-3 leading-tight" style={engravedTextStyle}>
                  {title}
                </h2>

                <p className="hidden sm:block sm:text-base xl:text-xl font-bold tracking-wide mb-2 sm:mb-5 leading-snug" style={engravedTextStyle}>
                  {subtitle}
                </p>

                {description && (
                  <p className="hidden sm:block text-[18px] leading-relaxed mb-6 max-w-md font-semibold" style={engravedTextStyle}>
                    {description}
                  </p>
                )}

                <div className="mb-2 sm:mb-5">
                  {metrics.map((m, i) => (
                    <MetricBadge key={i} value={m} />
                  ))}
                </div>

                <div className="hidden sm:block mb-3 sm:mb-8">
                  {tags.map((t, i) => (
                    <TagBadge key={i} label={t} />
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-2 sm:gap-3 mt-1 sm:mt-2 pt-1 sm:pt-2 w-full min-w-0 sm:max-w-[26rem]">
                  <Link
                    to={caseStudyHref}
                    className="block w-full min-w-0 px-2 sm:px-5 py-2 sm:py-3 min-h-[2.5rem] sm:min-h-[3.25rem] text-[10px] sm:text-[14px] font-black tracking-[0.04em] sm:tracking-[0.08em] uppercase transition-all max-w-full whitespace-nowrap text-center leading-snug"
                    style={{
                      ...cardButtonStyle,
                      borderWidth: '2px',
                      backgroundColor: 'rgba(255, 238, 214, 0.68)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255, 244, 226, 0.84)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255, 238, 214, 0.68)'}
                  >
                    View Case Study
                  </Link>
                  {liveHref && (
                    <a
                      href={liveHref}
                      className="hidden sm:block w-full min-w-0 px-4 sm:px-5 py-2 sm:py-3 min-h-[2.5rem] sm:min-h-[3.25rem] text-[12px] sm:text-[14px] font-black tracking-[0.06em] sm:tracking-[0.08em] uppercase transition-all max-w-full break-words whitespace-normal text-center leading-snug"
                      style={{
                        ...cardButtonStyle,
                        borderWidth: '2px',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(42, 18, 6, 0.2)'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    >
                      {liveLabel}
                    </a>
                  )}
                </div>
              </div>

              {/* Right — Image / Mockups */}
              <div
                className={`relative z-10 flex items-center justify-center min-h-0 sm:min-h-[300px] h-full min-w-0 ${!image ? 'gap-6' : ''}`}
              >
                {image ? (
                  <motion.div
                    className="w-full"
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                    transition={{ delay: 0.2, duration: 1.2, ease: 'easeOut' }}
                  >
                    {macbook ? (
                      <MacbookFrame src={image} alt={title} compact isInView={isInView} />
                    ) : (
                      <img src={image} alt={title} className="w-full object-contain max-h-[180px] sm:max-h-[380px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]" />
                    )}
                  </motion.div>
                ) : (
                  mockups.map((m, i) => (
                    <motion.div
                      key={i}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ delay: 0.2 + i * 0.15, duration: 1.0, ease: 'easeOut' }}
                      style={{ marginTop: i % 2 === 1 ? '2rem' : '0' }}
                    >
                      <MockupPlaceholder label={m.label} accent={m.accent} />
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </DriftwoodFrame>
    </motion.article>
  )
}