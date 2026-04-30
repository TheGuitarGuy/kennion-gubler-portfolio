import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useSpotifyPlayer, SC_PLAYLIST_URL } from '../context/SpotifyPlayerContext'

export default function RecordPlayer() {
  const { night, sunset } = useTheme()
  const { playing, playerReady, toggle } = useSpotifyPlayer()

  // Theme-aware colors
  const noteColor = night
    ? 'rgba(160,220,255,0.95)'
    : sunset
      ? 'rgba(255,200,140,0.95)'
      : 'rgba(50,45,40,0.95)'

  const arrowColor = night
    ? 'rgba(160,220,255,0.95)'
    : sunset
      ? 'rgba(255,175,100,0.88)'
      : 'rgba(140,135,130,0.95)'

  const noteShadow = night
    ? 'rgba(0,0,0,0.4)'
    : sunset
      ? 'rgba(0,0,0,0.32)'
      : 'rgba(255,255,255,0.7)'

  const spotifyMetaColor = night
    ? 'rgba(200,221,240,0.56)'
    : sunset
      ? 'rgba(255,195,155,0.62)'
      : 'rgba(87,83,78,0.68)'

  const embedShellBg = night
    ? 'rgba(10,21,37,0.68)'
    : sunset
      ? 'rgba(30,10,20,0.74)'
      : 'rgba(255,255,255,0.64)'

  const embedShellBorder = night
    ? '1px solid rgba(0,200,255,0.14)'
    : sunset
      ? '1px solid rgba(255,120,50,0.18)'
      : '1px solid rgba(120,113,108,0.12)'

  return (
    <div className="flex flex-col items-center select-none w-[90vw] xs:w-[340px] max-w-[340px]">
      <div className="relative w-[220px] h-[220px] xs:w-[260px] xs:h-[260px] sm:w-[300px] sm:h-[300px] mx-auto">

        {/* Handwriting Note & Arrow Layer */}
        <svg
          className="absolute inset-0 z-30 pointer-events-none overflow-visible"
          viewBox="0 0 300 300"
          width="100%"
          height="100%"
          aria-hidden="true"
        >
          <defs>
            <filter id="handNoteShadow" x="-70%" y="-70%" width="240%" height="240%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor={noteShadow} />
            </filter>

            <clipPath id="wipeLine1">
              <motion.rect
                x="-60"
                y="-20"
                height="30"
                initial={{ width: 0 }}
                animate={{ width: 160 }}
                transition={{ duration: 0.6, ease: 'linear', delay: 0.2 }}
              />
            </clipPath>

            <clipPath id="wipeLine2">
              <motion.rect
                x="-50"
                y="5"
                height="30"
                initial={{ width: 0 }}
                animate={{ width: 100 }}
                transition={{ duration: 0.4, ease: 'linear', delay: 0.8 }}
              />
            </clipPath>
          </defs>

          <g filter="url(#handNoteShadow)">
            <text
              x="-54"
              y="-2"
              fill={noteColor}
              fontSize="18"
              fontFamily="'Bradley Hand', 'Segoe Print', 'Comic Sans MS', cursive"
              fontStyle="italic"
              letterSpacing="0.3"
              transform="rotate(-6 -54 -2)"
              clipPath="url(#wipeLine1)"
            >
              Tunes while
            </text>

            <text
              x="-42"
              y="20"
              fill={noteColor}
              fontSize="18"
              fontFamily="'Bradley Hand', 'Segoe Print', 'Comic Sans MS', cursive"
              fontStyle="italic"
              letterSpacing="0.25"
              transform="rotate(-6 -42 20)"
              clipPath="url(#wipeLine2)"
            >
              you scroll
            </text>
          </g>

          <motion.g
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0, 1, 0, 1] }}
            transition={{
              duration: 1.5,
              delay: 3.5,
              repeat: Infinity,
              repeatDelay: 5,
            }}
          >
            <motion.path
              d="M 0 45 C 45 55, 90 80, 138 138"
              fill="none"
              stroke={arrowColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 1.2 }}
            />

            <motion.path
              d="M 126 135 L 138 138 L 135 126"
              fill="none"
              stroke={arrowColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut', delay: 1.7 }}
            />
          </motion.g>
        </svg>

        {/* Record */}
        <div className="absolute inset-0 z-10 record-shadow">
          <div
            className={`absolute inset-0 cursor-pointer vinyl-spin ${playing ? 'is-playing' : ''}`}
            onClick={toggle}
            title={playerReady ? (playing ? 'Pause' : 'Play') : 'Loading'}
          >
            <svg viewBox="0 0 300 300" width="100%" height="100%" aria-hidden="true">
              <defs>
                <radialGradient id="vinylSheen" cx="35%" cy="28%" r="70%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.09)" />
                  <stop offset="40%" stopColor="rgba(255,255,255,0.025)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>

                <radialGradient id="labelGrad" cx="42%" cy="30%" r="75%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="28%" stopColor="#f97316" />
                  <stop offset="55%" stopColor="#dc2626" />
                  <stop offset="80%" stopColor="#9d174d" />
                  <stop offset="100%" stopColor="#4c1d95" />
                </radialGradient>
              </defs>

              <circle cx="150" cy="150" r="148" fill="#111111" />

              {[134, 122, 110, 99, 89, 79, 70, 62, 55].map((r, i) => (
                <circle
                  key={r}
                  cx="150"
                  cy="150"
                  r={r}
                  fill="none"
                  stroke="rgba(255,255,255,0.038)"
                  strokeWidth={i % 3 === 0 ? 1.2 : 0.8}
                />
              ))}

              <circle cx="150" cy="150" r="148" fill="url(#vinylSheen)" />
              <circle cx="150" cy="150" r="42" fill="url(#labelGrad)" />
              <circle
                cx="150"
                cy="150"
                r="42"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.8"
              />

              <text
                x="150"
                y="145"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fontFamily="Inter, sans-serif"
                fontWeight="700"
                letterSpacing="3"
                fill="rgba(255,255,255,0.55)"
              >
                KG
              </text>

              <text
                x="150"
                y="157"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="5.5"
                fontFamily="Inter, sans-serif"
                fontWeight="400"
                letterSpacing="1.5"
                fill="rgba(255,255,255,0.35)"
              >
                CALIFORNIA
              </text>

              <circle cx="150" cy="150" r="4.5" fill="#0a0a0a" />

              <AnimatePresence>
                {!playing && (
                  <motion.g
                    key="play-btn"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.18 }}
                    style={{ transformOrigin: '150px 150px' }}
                  >
                    <polygon
                      points="145,142 145,158 160,150"
                      fill="rgba(255,255,255,0.9)"
                    />
                  </motion.g>
                )}
              </AnimatePresence>
            </svg>
          </div>
        </div>

        {/* Tonearm - Solid rotating object */}
        <svg
          viewBox="0 0 300 300"
          width="100%"
          height="100%"
          className="absolute inset-0 pointer-events-none z-20 overflow-visible"
          style={{ overflow: 'visible' }}
          aria-hidden="true"
        >

          {/* Solid group that rotates together. 
              The rect forces the bounding box to be exactly 300x300, 
              so percentage origins map perfectly to SVG coordinates. */}
          <motion.g
            initial={false}
            animate={{ rotate: playing ? 0 : -62 }}
            transition={{ type: "spring", stiffness: 45, damping: 12 }}
            style={{
              originX: "88.666%", // exactly 266px / 300px
              originY: "11.333%"  // exactly 34px / 300px
            }}
          >
            {/* Invisible bounding box enforcer */}
            <rect x="0" y="0" width="300" height="300" fill="transparent" pointerEvents="none" />

            {/* Main arm shadow */}
            <line x1="266" y1="34" x2="200" y2="108" stroke="#2e2e2e" strokeWidth="5" strokeLinecap="round" />

            {/* Main arm highlight */}
            <line x1="266" y1="34" x2="200" y2="108" stroke="#484848" strokeWidth="3" strokeLinecap="round" />

            {/* Cartridge stem */}
            <line x1="200" y1="108" x2="192" y2="122" stroke="#383838" strokeWidth="4" strokeLinecap="round" />

            {/* Cartridge */}
            <circle cx="192" cy="124" r="4" fill="#111" />

            {/* Needle */}
            <motion.circle
              cx="192"
              cy="124"
              r="2.5"
              fill="#f97316"
              animate={{ opacity: playing ? [0.55, 1, 0.55] : 0.72 }}
              transition={playing ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
            />
          </motion.g>

          {/* Fixed pivot cap (Drawn last so it sits solidly ON TOP of the moving arm) */}
          <circle cx="266" cy="34" r="12" fill="#242424" stroke="#3a3a3a" strokeWidth="1" />
          <circle cx="266" cy="34" r="5" fill="#444444" />
          <circle cx="266" cy="34" r="2" fill="#222" />
        </svg>
      </div>

      <div className="mt-8 flex justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>
          <a
            href={SC_PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-semibold uppercase tracking-[0.18em] transition-opacity duration-200 hover:opacity-70"
            style={{
              background: embedShellBg,
              border: embedShellBorder,
              color: spotifyMetaColor,
              backdropFilter: 'blur(14px)',
            }}
          >
            <svg viewBox="0 0 32 32" width="14" height="14" aria-hidden="true">
              <path
                fill="#ff5500"
                d="M0 20.8c0 2.4 1.6 4.4 3.8 4.8V16c-2.2.4-3.8 2.4-3.8 4.8zm5.8 5c.4 0 .8-.4.8-.8V15.8c0-.4-.4-.8-.8-.8s-.8.4-.8.8v9.2c0 .4.4.8.8.8zm3-.6c.4 0 .8-.4.8-.8V14c0-.4-.4-.8-.8-.8s-.8.4-.8.8v10.4c0 .4.4.8.8.8zm3 .6c.4 0 .8-.4.8-.8V12.4c0-.4-.4-.8-.8-.8s-.8.4-.8.8v12c0 .4.4.8.8.8zm3-.4c.4 0 .8-.4.8-.8V11.2c0-.4-.4-.8-.8-.8s-.8.4-.8.8v13.4c0 .4.4.8.8.8zm11.4-14.2c-.6 0-1.2.1-1.8.3C23.6 8.2 20.8 6 17.6 6c-.8 0-1.6.2-2.4.4-.4.2-.4.4-.4.6v17c0 .4.4.8.8.8h10.4c2.4 0 4.4-2 4.4-4.4 0-2.4-2-4.4-4.4-4.2z"
              />
            </svg>
            Open on SoundCloud
          </a>
        </motion.div>
      </div>
    </div>
  )
}