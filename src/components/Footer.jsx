import { useTheme } from '../context/ThemeContext'

export default function Footer() {
  const { night, sunset } = useTheme()
  const resumeUrl = `${import.meta.env.BASE_URL}Kennion_Gubler_Resume_2026.pdf`

  const label = { color: night ? 'rgba(0,200,255,0.5)' : sunset ? 'rgba(255,140,50,0.58)' : 'rgba(180,83,9,0.6)', transition: 'color 0.7s ease' }
  const link = { color: night ? '#6ab8d8' : sunset ? 'rgba(255,165,105,0.72)' : '#78716c', transition: 'color 0.7s ease' }
  const dim = { color: night ? 'rgba(100,150,180,0.5)' : sunset ? 'rgba(200,145,105,0.52)' : '#a8a29e', transition: 'color 0.7s ease' }
  const tag = { color: night ? 'rgba(0,200,255,0.4)' : sunset ? 'rgba(255,140,50,0.5)' : 'rgba(180,83,9,0.6)', transition: 'color 0.7s ease' }

  return (
    <footer
      className="border-t"
      style={{
        background: night ? '#060d1a' : sunset ? '#1a0830' : '#fdf8f2',
        borderColor: night ? 'rgba(0,200,255,0.1)' : sunset ? 'rgba(255,120,50,0.12)' : 'rgba(231,229,228,0.8)',
        transition: 'background 0.7s ease, border-color 0.7s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs tracking-wide" style={dim}>© 2025 Kennion Gubler. All rights reserved.</p>

        <div className="flex items-center gap-6">
          {[
            { label: 'Resume', href: resumeUrl },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kennion-gubler/' },
            { label: 'Email', href: 'mailto:kenniongubler@gmail.com' },
          ].map(({ label: l, href }) => (
            <a
              key={l}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold tracking-wide transition-opacity hover:opacity-70"
              style={link}
            >
              {l}
            </a>
          ))}
        </div>

        <p className="text-xs font-semibold tracking-widest italic" style={tag}>Crafted on the Coast.</p>
      </div>
    </footer>
  )
}
