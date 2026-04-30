import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useMemo } from 'react'

// ── Math helpers ─────────────────────────────────────────────────────────────

/** Point + tangent on a quadratic bezier at parameter t */
function qBez(sx, sy, cx, cy, ex, ey, t) {
  const mt = 1 - t
  return {
    x:  mt*mt*sx + 2*mt*t*cx + t*t*ex,
    y:  mt*mt*sy + 2*mt*t*cy + t*t*ey,
    tx: 2*(mt*(cx-sx) + t*(ex-cx)),
    ty: 2*(mt*(cy-sy) + t*(ey-cy)),
  }
}

/**
 * Build the filled silhouette path for one palm frond.
 * Alternates wide/narrow perpendicular offsets to create the leaflet-spike look.
 */
function makeFrond(sx, sy, cx, cy, ex, ey, steps = 16, maxW = 22) {
  const upper = []
  const lower = []

  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const { x, y, tx, ty } = qBez(sx, sy, cx, cy, ex, ey, t)
    const mag = Math.hypot(tx, ty) || 1
    const nx = -ty / mag   // left perpendicular
    const ny =  tx / mag
    const fx =  tx / mag   // forward along spine
    const fy =  ty / mag

    // Taper from full width at base to ~12% at tip
    const taper = 1 - t * 0.88

    // Leaflet peaks on odd indices, valleys on even
    const isLeaflet = i % 2 === 1
    const w   = maxW * taper * (isLeaflet ? 1.55 : 0.45)
    const fwd = isLeaflet ? w * 0.28 : 0   // leaflets lean slightly forward

    upper.push({ x: x + nx*w + fx*fwd, y: y + ny*w + fy*fwd })
    lower.push({ x: x - nx*w + fx*fwd, y: y - ny*w + fy*fwd })
  }

  const up   = upper.map((p, i) =>
    `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`
  ).join(' ')
  const down = [...lower].reverse().map(p =>
    `L${p.x.toFixed(1)},${p.y.toFixed(1)}`
  ).join(' ')

  return `${up} ${down} Z`
}

// ── Frond definitions ─────────────────────────────────────────────────────────
// Crown sits at (120, 62).  Each entry: [cx,cy,  ex,ey,  steps, maxW]
const CROWN = [120, 62]
const FROND_DEFS = [
  // left droop
  [  84,  98,   40, 138,  17, 22 ],
  // left near-horizontal
  [  76,  64,   22,  72,  16, 20 ],
  // upper left
  [  82,  34,   46,  10,  16, 20 ],
  // center-up (slight left lean)
  [ 106,  26,   96,  -6,  15, 18 ],
  // center-up (slight right lean)
  [ 132,  22,  158,   4,  15, 18 ],
  // upper right
  [ 148,  38,  188,  20,  16, 20 ],
  // right near-horizontal
  [ 156,  58,  210,  60,  16, 20 ],
  // right droop
  [ 152,  92,  194, 130,  17, 22 ],
  // lower-right fill frond
  [ 138,  78,  162, 106,  13, 16 ],
  // lower-left fill frond
  [  95,  80,   68,  98,  12, 16 ],
]

// Warm dark-brown silhouette — reads like California driftwood/beach palm
const C = '#3a2010'

// ── Component ─────────────────────────────────────────────────────────────────
export default function PalmTree({ className = '' }) {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const scrollLean = useTransform(scrollY, [0, 600], [0, 2.5])

  const frondPaths = useMemo(() =>
    FROND_DEFS.map(([cx,cy, ex,ey, steps, maxW]) =>
      makeFrond(CROWN[0], CROWN[1], cx, cy, ex, ey, steps, maxW)
    ), []
  )

  return (
    <motion.div
      ref={ref}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      animate={{ rotate: [-1.6, 2.1, -1.6] }}
      transition={{
        duration: 4.4,
        repeat: Infinity,
        ease: [0.45, 0, 0.55, 1],
        repeatType: 'mirror',
      }}
      style={{
        transformOrigin: '50% 100%',
        rotate: scrollLean,
      }}
    >
      <svg
        viewBox="0 0 260 368"
        width="248"
        height="350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >

        {/* ── Trunk — filled tapered shape ─────────────────────── */}
        {/*
            Left edge rises from bottom-left → curves through an S → crown-left.
            Right edge mirrors it.  Together they form a filled trunk silhouette.
        */}
        <path
          d="
            M 112,360
            C 108,298 100,238 108,188
            C 116,138 124,106 118,62
            C 122,62 126,64 128,64
            C 122,108 120,140 126,188
            C 132,238 126,298 122,360
            Z
          "
          fill={C}
        />

        {/* ── Fronds ───────────────────────────────────────────── */}
        {frondPaths.map((d, i) => (
          <path key={i} d={d} fill={C} opacity={0.95} />
        ))}

        {/* ── Dense crown shadow (where fronds emerge) ─────────── */}
        <ellipse cx="120" cy="66" rx="18" ry="14" fill={C} />

        {/* ── Ground mound ─────────────────────────────────────── */}
        <ellipse cx="118" cy="358" rx="52" ry="10" fill={C} opacity="0.55" />

        {/* Small grass tufts */}
        <path d="M82,354 Q78,340 76,334 Q80,342 84,348 Q83,340 85,334 Q87,344 88,352 Z" fill={C} opacity="0.7" />
        <path d="M148,354 Q154,340 156,334 Q152,342 150,348 Q151,340 148,334 Q146,344 146,352 Z" fill={C} opacity="0.7" />
        <path d="M98,356 Q96,346 95,340 Q98,348 101,354 Z" fill={C} opacity="0.6" />
        <path d="M138,356 Q140,346 141,340 Q138,348 136,354 Z" fill={C} opacity="0.6" />
      </svg>
    </motion.div>
  )
}
