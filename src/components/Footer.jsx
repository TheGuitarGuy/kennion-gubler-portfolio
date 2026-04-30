import { useTheme } from '../context/ThemeContext'

export default function Footer() {
  const { night, sunset } = useTheme()
  const resumeUrl = `${import.meta.env.BASE_URL}Kennion_Gubler_Resume_2026.pdf`

  const label = { color: night ? 'rgba(0,200,255,0.5)' : sunset ? 'rgba(255,140,50,0.58)' : 'rgba(180,83,9,0.6)', transition: 'color 0.7s ease' }
  const body = { color: night ? '#8aadcc' : sunset ? 'rgba(255,180,130,0.75)' : '#57534e', transition: 'color 0.7s ease' }
  const link = { color: night ? '#6ab8d8' : sunset ? 'rgba(255,165,105,0.72)' : '#78716c', transition: 'color 0.7s ease' }
  const dim = { color: night ? 'rgba(100,150,180,0.5)' : sunset ? 'rgba(200,145,105,0.52)' : '#a8a29e', transition: 'color 0.7s ease' }
  const tag = { color: night ? 'rgba(0,200,255,0.4)' : sunset ? 'rgba(255,140,50,0.5)' : 'rgba(180,83,9,0.6)', transition: 'color 0.7s ease' }

  return (
    <footer
      id="about"
      className="border-t snap-start"
      style={{
        background: night ? '#060d1a' : sunset ? '#1a0830' : '#fdf8f2',
        borderColor: night ? 'rgba(0,200,255,0.1)' : sunset ? 'rgba(255,120,50,0.12)' : 'rgba(231,229,228,0.8)',
        transition: 'background 0.7s ease, border-color 0.7s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          <div className="lg:col-span-2">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={label}>About</p>
            <p className="text-2xl font-light leading-relaxed max-w-xl" style={body}>
              I'm a design engineer and builder based on the California coast. I care about crafting experiences that feel inevitable in retrospect.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-1" style={label}>Contact</p>
            {[
              { label: 'Resume', href: resumeUrl, external: true },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kennion-gubler/', external: true },
              { label: 'Email', href: 'mailto:kenniongubler@gmail.com', external: true },
            ].map(({ label: l, href, external }) => (
              <a
                key={l}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-sm font-medium flex items-center gap-2 group transition-colors"
                style={link}
              >
                <span
                  className="h-px transition-all duration-300 group-hover:w-8"
                  style={{
                    width: 16,
                    background: night ? 'rgba(0,200,255,0.3)' : sunset ? 'rgba(255,130,50,0.35)' : '#d6d3d1',
                  }}
                />
                {l}
              </a>
            ))}
          </div>
        </div>

        <div
          className="mt-10 md:mt-16 pt-6 md:pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 justify-between"
          style={{ borderColor: night ? 'rgba(0,200,255,0.08)' : sunset ? 'rgba(255,120,50,0.1)' : 'rgba(231,229,228,0.6)' }}
        >
          <p className="text-xs tracking-wide" style={dim}>© 2025 Kennion Gubler. All rights reserved.</p>
          <p className="text-xs font-semibold tracking-widest italic" style={tag}>Crafted on the Coast.</p>
        </div>
      </div>
    </footer>
  )
}
