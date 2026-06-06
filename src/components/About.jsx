import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import beachPhoto from '../../images/kennion_happy_beach.jpg'

const ITEM = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}
const CONTAINER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

export default function About() {
  const { night, sunset } = useTheme()

  const label  = { color: night ? 'rgba(0,200,255,0.55)'      : sunset ? 'rgba(255,140,50,0.65)'    : 'rgba(180,83,9,0.7)'  }
  const head   = { color: night ? '#d0eeff'                   : sunset ? '#ffe8cc'                  : '#1c1917'             }
  const body   = { color: night ? 'rgba(180,210,240,0.72)'    : sunset ? 'rgba(255,200,155,0.76)'   : '#57534e'             }
  const accent = { color: night ? '#38bdf8'                   : sunset ? '#fb923c'                  : '#92400e'             }
  const divider = night ? 'rgba(0,200,255,0.1)' : sunset ? 'rgba(255,120,50,0.12)' : 'rgba(231,229,228,0.8)'

  return (
    <section
      id="about"
      className="relative snap-start snap-always min-h-screen flex items-center overflow-hidden"
      style={{
        background: night ? '#060d1a' : sunset ? '#1a0830' : '#fdf8f2',
        transition: 'background 0.7s ease',
      }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: night
            ? 'radial-gradient(ellipse at 80% 50%, rgba(0,150,255,0.07) 0%, transparent 60%)'
            : sunset
              ? 'radial-gradient(ellipse at 80% 50%, rgba(251,146,60,0.10) 0%, transparent 60%)'
              : 'radial-gradient(ellipse at 80% 50%, rgba(251,191,36,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text */}
          <motion.div
            variants={CONTAINER}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
          >
            <motion.p
              variants={ITEM}
              className="text-[10px] font-bold tracking-[0.28em] uppercase mb-6"
              style={label}
            >
              About Me
            </motion.p>

            <motion.h2
              variants={ITEM}
              className="text-4xl sm:text-5xl font-black leading-[1.06] tracking-tight mb-8"
              style={head}
            >
              I'm Kennion!<br /><span className="text-3xl sm:text-4xl font-light">Hope your day is amazing!</span>
            </motion.h2>

            <motion.p
              variants={ITEM}
              className="text-base md:text-lg leading-relaxed mb-5"
              style={body}
            >
              When I'm not designing or building, you'll find me at the beach or picking up my guitar. Both get me into the flow and help reset my mind. That mindset helps me on every product I work on.
            </motion.p>

            <motion.p
              variants={ITEM}
              className="text-base md:text-lg leading-relaxed mb-5"
              style={body}
            >
              The beach is where I reset. Something about the salt air and the rhythm of the water clears the mental whiteboard and makes space for better ideas. A lot of my best ideas come from walking on the coast.
            </motion.p>

            <motion.p
              variants={ITEM}
              className="text-base md:text-lg leading-relaxed mb-10"
              style={body}
            >
              I love playing guitar to reset my mind and iterate constantly. Check out those songs!
            </motion.p>

            {/* Tags */}
            <motion.div variants={ITEM} className="flex flex-wrap gap-2">
              {['Surfing', 'Guitar', 'California Coast', 'Design', 'Building'].map(tag => (
                <span
                  key={tag}
                  className="text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full"
                  style={{
                    background: night ? 'rgba(0,200,255,0.08)' : sunset ? 'rgba(251,146,60,0.10)' : 'rgba(180,83,9,0.07)',
                    border: `1px solid ${night ? 'rgba(0,200,255,0.18)' : sunset ? 'rgba(251,146,60,0.22)' : 'rgba(180,83,9,0.18)'}`,
                    ...accent,
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Glow behind photo */}
            <div
              className="absolute -inset-8 rounded-3xl blur-3xl opacity-40 pointer-events-none"
              style={{
                background: night
                  ? 'radial-gradient(ellipse, rgba(0,180,255,0.3), transparent 70%)'
                  : sunset
                    ? 'radial-gradient(ellipse, rgba(251,146,60,0.35), transparent 70%)'
                    : 'radial-gradient(ellipse, rgba(251,191,36,0.3), transparent 70%)',
              }}
            />

            <div
              className="relative w-full max-w-sm lg:max-w-md rounded-2xl overflow-hidden"
              style={{
                boxShadow: night
                  ? '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,200,255,0.12)'
                  : sunset
                    ? '0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(251,146,60,0.14)'
                    : '0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(180,83,9,0.1)',
              }}
            >
              <img
                src={beachPhoto}
                alt="Kennion at the beach"
                className="w-full h-full object-cover"
                style={{ aspectRatio: '3/4', objectPosition: 'center top' }}
              />
            </div>
          </motion.div>

        </div>

        {/* Bottom rule */}
        <div className="mt-20 border-t" style={{ borderColor: divider }} />
      </div>
    </section>
  )
}
