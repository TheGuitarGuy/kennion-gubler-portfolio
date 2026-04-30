import ProjectCard from './ProjectCard'
import CaseStudyProgress from './CaseStudyProgress'
import { useTheme } from '../context/ThemeContext'
import { useCaseStudyProgress, CASE_STUDY_SLUGS } from '../context/CaseStudyProgressContext'
import emberImg from '../../images/ember.png'
import buyForMeImg from '../../images/Buy_For_Me.png'
import podImg from '../../images/Pod_Case_Study.png'
import crChatGptImg from '../../images/cr_chatgpt.png'
import askcr_bfm from '../../images/askcr_bfm.png'
import waterBg from '../../images/water.jpg'

const projects = [
  {
    slug: 'chatgpt',
    title: 'CR ChatGPT App',
    subtitle: 'Helping consumers find trusted information for purchases in ChatGPT.',
    metrics: [],
    tags: ['AI / LLM', 'Commerce', 'Web', 'Figma', 'Prototyping'],
    caseStudyHref: '/chatgpt',
    liveHref: '#',
    liveLabel: 'VIEW LIVE →',
    image: crChatGptImg,
    macbook: true,
    mockups: [],
  },
  {
    slug: 'buy-for-me',
    title: "CR 'Buy for Me' Feature",
    subtitle: 'Reducing purchase friction from discovery to checkout.',
    metrics: [],
    tags: ['E-Commerce', 'AI Agent', 'Mobile Web', 'A/B Testing'],
    caseStudyHref: '/buy-for-me',
    liveHref: '#',
    liveLabel: 'VIEW LIVE →',
    image: buyForMeImg,
    mockups: [],
  },
  {
    slug: 'askcr-bfm',
    title: "Buy for Me in AskCR",
    subtitle: 'Turning CR recommendations into completed purchases.',
    metrics: [],
    tags: ['AI Agent', 'E-Commerce', 'AskCR', 'Web', 'Agentic UX'],
    caseStudyHref: '/askcr-bfm',
    liveHref: '#',
    liveLabel: 'VIEW LIVE →',
    image: askcr_bfm,
    macbook: true,
    mockups: [],
  },
  {
    slug: 'ember',
    title: 'Ember Fitness',
    subtitle: 'Building an intuitive fitness companion for lasting habits.',
    metrics: [],
    tags: ['iOS', 'Gen AI', 'Swift', 'Figma', '0→1'],
    caseStudyHref: '/ember',
    liveHref: '#',
    liveLabel: 'VIEW LIVE (IN APP) →',
    image: emberImg,
    mockups: [],
  },
  {
    slug: 'pod',
    title: 'Pod Dating',
    subtitle: 'Rethinking how people form real connections.',
    metrics: [],
    tags: ['iOS', 'Social', 'Swift', 'Figma', '0→1'],
    caseStudyHref: '/pod',
    liveHref: '#',
    liveLabel: 'VIEW LIVE (IN APP) →',
    image: podImg,
    mockups: [],
  },
]

const SHELL_BADGE_STYLES = {
  'askcr-bfm': {
    kind: 'fan',
    gradient: 'radial-gradient(circle at 30% 25%, #dff4ff 0%, #97cae6 45%, #3f6f8f 100%)',
    rim: 'rgba(217, 243, 255, 0.95)',
    glow: 'rgba(103, 190, 232, 0.42)',
    shell: '#fffdf8',
    stroke: 'rgba(44, 88, 115, 0.4)',
  },
  'buy-for-me': {
    kind: 'spiral',
    gradient: 'radial-gradient(circle at 32% 22%, #ffe7d2 0%, #f4ba8b 45%, #b86a3c 100%)',
    rim: 'rgba(255, 223, 194, 0.94)',
    glow: 'rgba(238, 151, 93, 0.42)',
    shell: '#fff8f2',
    stroke: 'rgba(120, 67, 33, 0.42)',
  },
  chatgpt: {
    kind: 'conch',
    gradient: 'radial-gradient(circle at 33% 24%, #ddfff7 0%, #9ce6cf 45%, #3e8f79 100%)',
    rim: 'rgba(212, 255, 242, 0.95)',
    glow: 'rgba(101, 211, 176, 0.4)',
    shell: '#f4fffb',
    stroke: 'rgba(34, 104, 86, 0.42)',
  },
  ember: {
    kind: 'scallop',
    gradient: 'radial-gradient(circle at 30% 25%, #ffe6da 0%, #f6b8a1 45%, #c97459 100%)',
    rim: 'rgba(255, 222, 209, 0.95)',
    glow: 'rgba(242, 156, 126, 0.42)',
    shell: '#fffaf6',
    stroke: 'rgba(128, 72, 52, 0.4)',
  },
  pod: {
    kind: 'clam',
    gradient: 'radial-gradient(circle at 32% 24%, #e7ebff 0%, #b3bde9 45%, #5a6ea3 100%)',
    rim: 'rgba(223, 229, 255, 0.94)',
    glow: 'rgba(142, 160, 223, 0.42)',
    shell: '#f7f9ff',
    stroke: 'rgba(64, 80, 132, 0.42)',
  },
}

function ShellGlyph({ kind, fill, stroke }) {
  switch (kind) {
    case 'fan':
      return (
        <>
          <path d="M12 4.6C8.2 4.6 5 7.6 5 11.5c0 3.5 2.5 6 6.1 6.4h1.8c3.6-.4 6.1-2.9 6.1-6.4 0-3.9-3.2-6.9-7-6.9Z" fill={fill} />
          <path d="M12 6.5v10.5M9.2 7.7v9.5M14.8 7.7v9.5M6.9 10.5h10.2M7.6 14.1h8.8" stroke={stroke} strokeWidth="0.9" strokeLinecap="round" />
        </>
      )
    case 'spiral':
      return (
        <>
          <path d="M6.5 14.4c0-4.3 3-7.5 7.1-7.5 3 0 5.4 2.4 5.4 5.4 0 2.4-1.9 4.3-4.3 4.3-1.9 0-3.4-1.5-3.4-3.4 0-1.4 1.1-2.5 2.5-2.5 1 0 1.8.8 1.8 1.8" fill="none" stroke={fill} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="14.1" cy="12.5" r="0.8" fill={stroke} />
        </>
      )
    case 'conch':
      return (
        <>
          <path d="M7.2 14.9c0-4.5 3.3-8 7.3-8 .8 0 1.7.2 2.3.8.7.6 1.1 1.4 1.1 2.4 0 2-1.5 3.6-3.5 3.8-1.8.2-3.1 1.7-3.1 3.5 0 1.2.6 2.2 1.6 2.8-3.4.5-5.7-1.4-5.7-5.3Z" fill={fill} />
          <path d="M10.5 10.4c1-.8 2.1-1.2 3.1-1.3M10.1 13c1-.6 2-.9 3-.9M10.5 15.5c.9-.4 1.8-.7 2.8-.7" stroke={stroke} strokeWidth="0.9" strokeLinecap="round" />
        </>
      )
    case 'scallop':
      return (
        <>
          <path d="M5.1 13.5c0-4.2 3.1-7.5 6.9-7.5 3.8 0 6.9 3.3 6.9 7.5 0 .9-.2 1.7-.4 2.5H5.5c-.2-.8-.4-1.6-.4-2.5Z" fill={fill} />
          <path d="M7.1 16c0-2.8 1.1-5.3 2.4-7M9.8 16c0-3 .8-5.8 2.2-7.7M12.5 16c0-3 .5-5.9 1.9-7.8M15.1 16c0-2.8-.2-5.5 1.2-7.2" stroke={stroke} strokeWidth="0.85" strokeLinecap="round" />
        </>
      )
    case 'clam':
      return (
        <>
          <path d="M5.2 13.8c0-3.7 3-6.8 6.8-6.8s6.8 3 6.8 6.8v1.7H5.2v-1.7Z" fill={fill} />
          <path d="M7.1 11.6h9.8M6.8 13.8h10.4M8.5 9.7h7M10.8 15.5v-2.1M13.2 15.5v-2.1" stroke={stroke} strokeWidth="0.9" strokeLinecap="round" />
        </>
      )
    default:
      return null
  }
}

function ShellBadge({ slug, collected }) {
  const badge = SHELL_BADGE_STYLES[slug]
  if (!badge) return null

  return (
    <div
      className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
      style={{
        background: collected
          ? badge.gradient
          : 'radial-gradient(circle at 30% 25%, rgba(209,213,219,0.55) 0%, rgba(113,113,122,0.4) 100%)',
        border: `1px solid ${collected ? badge.rim : 'rgba(120,113,108,0.35)'}`,
        boxShadow: collected
          ? `0 10px 22px ${badge.glow}, inset 0 1px 1px rgba(255,255,255,0.45)`
          : 'inset 0 1px 1px rgba(255,255,255,0.2)',
        opacity: collected ? 1 : 0.52,
      }}
      aria-label={`${slug} shell badge`}
    >
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle at 28% 22%, rgba(255,255,255,0.3) 0%, transparent 52%)' }}
      />
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" fill="none" aria-hidden="true">
        <ShellGlyph
          kind={badge.kind}
          fill={collected ? badge.shell : 'rgba(255,255,255,0.42)'}
          stroke={collected ? badge.stroke : 'rgba(24,24,27,0.3)'}
        />
      </svg>
    </div>
  )
}

export default function Work() {
  const { mode } = useTheme()
  const { visited } = useCaseStudyProgress()

  const getOverlayColor = () => {
    switch (mode) {
      case 'night': return 'rgba(6, 13, 26, 0.88)'
      case 'sunset': return 'rgba(40, 12, 50, 0.82)'
      default: return 'rgba(253, 248, 242, 0.85)'
    }
  }

  const getRewardBannerStyles = () => {
    switch (mode) {
      case 'night':
        return {
          panel: 'rgba(6, 13, 26, 0.95)',
          border: '#38bdf8',
          text: '#ffffff',
          accent: '#7dd3fc',
          glow: 'rgba(56, 189, 248, 0.4)',
        }
      case 'sunset':
        return {
          panel: 'rgba(26, 8, 48, 0.95)',
          border: '#fb923c',
          text: '#ffffff',
          accent: '#fdba74',
          glow: 'rgba(251, 146, 60, 0.4)',
        }
      default:
        return {
          panel: 'rgba(24, 24, 27, 0.95)', // Dark contrast for light mode
          border: '#f59e0b',
          text: '#ffffff',
          accent: '#fcd34d',
          glow: 'rgba(245, 158, 11, 0.4)',
        }
    }
  }

  const rewardBanner = getRewardBannerStyles()
  const collectedShells = CASE_STUDY_SLUGS.filter(slug => visited.has(slug)).length

  return (
    <>
      <div id="work" className="relative">
        <CaseStudyProgress activeSlug={CASE_STUDY_SLUGS[0]} showTracker={false} />

        {/* Shared water background — fills all cards */}
        <div className="absolute inset-0 z-0">
          <img
            src={waterBg}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(0.3) contrast(1.1)' }}
          />
          <div
            className="absolute inset-0 transition-colors duration-1000 ease-in-out"
            style={{ backgroundColor: getOverlayColor() }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-color)] via-transparent to-[var(--bg-color)] opacity-95 transition-colors duration-1000" />
        </div>

        <div className="sticky top-[4.25rem] md:top-24 z-[45] flex justify-center px-1 sm:px-2 pointer-events-none mt-1 md:mt-4">
          <div className="flex flex-col items-center pointer-events-auto scale-[0.82] sm:scale-90 md:scale-100 origin-top">
            <div
              className="flex items-center gap-2.5 sm:gap-3 md:gap-4 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full"
              style={{
                background: rewardBanner.panel,
                border: `2px solid ${rewardBanner.border}`,
                boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${rewardBanner.glow}, inset 0 0 10px ${rewardBanner.glow}`,
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex flex-col items-end text-right">
                <span className="text-[9px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-[0.16em] sm:tracking-widest" style={{ color: rewardBanner.accent }}>
                  {collectedShells}/{CASE_STUDY_SLUGS.length} Explored
                </span>
                <span className="hidden sm:block text-[10px] md:text-sm font-bold tracking-wide" style={{ color: rewardBanner.text, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  Explore all to unlock award
                </span>
              </div>

              <div className="w-[2px] h-7 sm:h-8 md:h-10 opacity-60 rounded-full" style={{ background: rewardBanner.border }} />

              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5" aria-label={`${collectedShells} of ${CASE_STUDY_SLUGS.length} shells collected`}>
                {CASE_STUDY_SLUGS.map((slug, shellIndex) => (
                  <ShellBadge
                    key={slug}
                    slug={slug}
                    collected={shellIndex < collectedShells}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Each card is a full-viewport snap stop in the main page scroll */}
        {projects.map((project, i) => (
          <div
            key={project.slug}
            id={`card-${project.slug}`}
            className="relative z-10 min-h-[100svh] snap-start snap-always flex items-center justify-center pt-28 pb-16 md:pt-36 md:pb-20 px-4 md:px-8"
          >
            <div className="w-full max-w-7xl mx-auto h-full">
              <ProjectCard {...project} index={i} />
            </div>
          </div>
        ))}

      </div>
    </>
  )
}