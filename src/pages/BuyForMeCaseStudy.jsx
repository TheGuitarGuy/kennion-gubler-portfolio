import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCaseStudyProgress } from '../context/CaseStudyProgressContext'
import { motion } from 'framer-motion'
import buyForMeImg from '../../images/Buy_For_Me.png'
import specificProductImg from '../../images/bfm_specific_product.png'
import priceTargetImg from '../../images/bfm_price_target.png'
import confirmationImg from '../../images/bfm_confirmation.png'
import adjustmentsImg from '../../images/bfm_adjustments.png'
import purchasePlacedImg from '../../images/bfm_purchase_placed.png'
import ownedProductsImg from '../../images/bfm_owned_products.png'

const up = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }
const fromLeft = { hidden: { opacity: 0, x: -56 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }
const fromRight = { hidden: { opacity: 0, x: 56 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const VP = { once: false, amount: 0.25 }

const C = { bg: '#FFFFFF', bgGray: '#F3F4F6', text: '#111827', muted: '#4A5568', accent: '#00875A', accentLight: 'rgba(0,135,90,0.1)' }
const SLIDE_IDS = ['hero', 'demo', 'research', 'survey', 'wizard', 'discovery', 'target', 'control', 'adjustments', 'seamless', 'post-purchase', 'how']
const BFM_DEMO_VIDEO = `${import.meta.env.BASE_URL}bfm_demo.mp4`

function ProgressDots({ current }) {
  return (
    <div className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-50 flex-col gap-2 items-center">
      {SLIDE_IDS.map((_, i) => (<motion.a key={i} href={`#${SLIDE_IDS[i]}`} animate={{ height: i === current ? 28 : 6, opacity: i === current ? 1 : 0.25 }} transition={{ duration: 0.3 }} className="w-1 rounded-full block" style={{ background: C.accent }} />))}
    </div>
  )
}

function Badge({ children }) {
  return <motion.span variants={up} className="inline-block font-semibold text-sm px-3 py-1 rounded-full mb-4" style={{ background: C.accentLight, color: C.text }}>{children}</motion.span>
}

// Reusable two-column slide
function TwoColSlide({ id, bg, leftContent, rightContent, imgLeft = false }) {
  return (
    <section id={id} className="overflow-hidden px-6 md:px-20 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always" style={{ background: bg }}>
      <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        {imgLeft ? <>{rightContent}{leftContent}</> : <>{leftContent}{rightContent}</>}
      </div>
    </section>
  )
}

export default function BuyForMeCaseStudy() {
  const [current, setCurrent] = useState(0)
  const { markVisited } = useCaseStudyProgress()

  useEffect(() => {
    window.scrollTo(0, 0)
    markVisited('buy-for-me')
  }, [])

  useEffect(() => {
    const els = SLIDE_IDS.map(id => document.getElementById(id)).filter(Boolean)
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { const i = els.indexOf(e.target); if (i !== -1) setCurrent(i) } }), { threshold: 0.5 })
    els.forEach(el => obs.observe(el)); return () => obs.disconnect()
  }, [])

  const phoneImg = (src, alt) => (
    <motion.div initial="hidden" whileInView="show" viewport={VP} variants={fromRight} className="flex justify-center">
      <img src={src} alt={alt} className="w-auto object-contain drop-shadow-xl" style={{ maxHeight: '60vh', maxWidth: '100%', borderRadius: '1.5rem' }} />
    </motion.div>
  )
  const phoneImgLeft = (src, alt) => (
    <motion.div initial="hidden" whileInView="show" viewport={VP} variants={fromLeft} className="flex justify-center order-last md:order-first">
      <img src={src} alt={alt} className="w-auto object-contain drop-shadow-xl" style={{ maxHeight: '60vh', maxWidth: '100%', borderRadius: '1.5rem' }} />
    </motion.div>
  )

  return (
    <div className="relative">
      <ProgressDots current={current} />

      <div className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-6 md:px-8" style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <Link to="/" state={{ fromCaseStudy: true, fromCaseStudySlug: 'buy-for-me' }} className="text-xs font-bold tracking-[0.15em] uppercase transition-opacity hover:opacity-50" style={{ color: C.accent }}>← Back</Link>
      </div>

      <div className="h-screen overflow-y-auto snap-y snap-mandatory [&>section]:min-h-screen">
        {/* Hero */}
        <section id="hero" className="relative overflow-hidden px-6 md:px-16 pt-20 pb-12 md:h-screen md:flex md:items-center md:justify-center md:pt-14 snap-start snap-always" style={{ background: C.bgGray }}>
          <div className="max-w-[1600px] w-full mx-auto grid lg:grid-cols-12 gap-8 lg:gap-4 items-center">

            <motion.div variants={stagger} initial="hidden" animate="show" className="lg:col-span-4 z-10">
              <motion.p variants={up} className="text-[10px] font-semibold tracking-[0.35em] uppercase mb-5" style={{ color: C.accent }}>Case Study · E-Commerce · AI Agent</motion.p>
              <motion.h1 variants={up} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none mb-6" style={{ color: C.text }}>Buy at the<br />right time,<br />without babysitting.</motion.h1>
              <motion.div variants={up} className="flex flex-wrap gap-8 mt-6">
                {[{ label: 'Role', value: 'Design Engineer' }, { label: 'Platform', value: 'Mobile Web · AI Agent' }].map(({ label, value }) => (
                  <div key={label}><p className="text-[9px] font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: C.accent }}>{label}</p><p className="text-sm font-semibold" style={{ color: C.text }}>{value}</p></div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-8 w-full flex justify-end"
            >
              <img
                src={buyForMeImg}
                alt="Buy for Me app screens"
                className="w-full lg:w-[115%] h-auto max-h-[85vh] object-contain object-right drop-shadow-[0_45px_65px_rgba(0,0,0,0.25)]"
              />
            </motion.div>

          </div>
          <motion.div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }}>
            <p className="text-[9px] font-semibold tracking-[0.25em] uppercase" style={{ color: 'rgba(0,135,90,0.4)' }}>Scroll</p>
            <motion.div className="w-px h-8 origin-top" style={{ background: 'rgba(0,135,90,0.35)' }} animate={{ scaleY: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }} />
          </motion.div>
        </section>

        {/* Demo Video */}
        <section id="demo" className="overflow-hidden px-6 md:px-16 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always" style={{ background: C.bg }}>
          <div className="max-w-5xl w-full mx-auto">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP} className="text-center">
              <motion.h2 variants={up} className="text-2xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: C.text }}>How the flow works</motion.h2>
              <motion.p variants={up} className="text-base mb-8" style={{ color: C.muted }}>From product discovery to completed purchase, this is the end-to-end experience.</motion.p>
              <motion.div variants={up} className="w-full overflow-hidden rounded-xl shadow-2xl border border-gray-200" style={{ aspectRatio: '16/9' }}>
                <video className="w-full h-full object-cover" autoPlay loop muted playsInline controls><source src={BFM_DEMO_VIDEO} type="video/mp4" /></video>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Research */}
        <section id="research" className="overflow-hidden px-6 md:px-16 pt-20 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always" style={{ background: C.bg }}>
          <div className="max-w-5xl w-full mx-auto">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <motion.p variants={up} className="text-[10px] font-semibold tracking-[0.35em] uppercase mb-3" style={{ color: C.accent }}>Our Process</motion.p>
              <motion.h2 variants={up} className="text-2xl md:text-4xl font-bold tracking-tight mb-2" style={{ color: C.text }}>Start with the real shopping problem</motion.h2>
              <motion.p variants={up} className="text-sm mb-8" style={{ color: C.muted }}>12 in-store intercept interviews at Best Buy & Home Depot · 15 consumer network interviews</motion.p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { n: '01', title: 'The Burden of Ownership', quote: '"There\'s just so much paperwork... I\'ll probably just throw it in the garbage."' },
                  { n: '02', title: 'Decision-Making is Undersupported', quote: '"I don\'t want to recommend specific products because I don\'t want to be liable."' },
                  { n: '03', title: 'Information Everywhere, Trust Scarce', quote: '"I went to YouTube, Reddit, Best Buy, and Amazon to find out more."' },
                  { n: '04', title: 'Convenience Needs a Human Layer', quote: '"We prefer to go to the local appliance store because there is a credibility factor."' },
                  { n: '05', title: 'Digital Tools Fail Emotionally', quote: '"When frustrated looking online they just end up saying \'let\'s just go to the store.\'"' },
                  { n: '06', title: 'AI is Underutilized in Personal Life', quote: '"I don\'t see any reason to use AI beyond work."' },
                ].map(({ n, title, quote }) => (
                  <motion.div key={n} variants={up} className="p-5 border-t-2 bg-gray-50 rounded-sm" style={{ borderColor: C.accent }}>
                    <p className="text-[9px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: C.accent }}>Finding {n}</p>
                    <h3 className="text-sm font-black mb-2" style={{ color: C.text }}>{title}</h3>
                    <p className="text-xs leading-relaxed italic" style={{ color: C.muted }}>{quote}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Survey Validation */}
        <section id="survey" className="overflow-hidden px-6 md:px-16 pt-20 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always" style={{ background: C.bgGray }}>
          <div className="max-w-5xl w-full mx-auto">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <motion.p variants={up} className="text-[10px] font-semibold tracking-[0.35em] uppercase mb-3" style={{ color: C.accent }}>Quantitative Validation</motion.p>
              <motion.h2 variants={up} className="text-2xl md:text-4xl font-bold tracking-tight mb-8" style={{ color: C.text }}>People are already waiting to buy</motion.h2>
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <motion.div variants={up}>
                  <p className="text-8xl md:text-9xl font-black leading-none mb-2" style={{ color: C.accent }}>93%</p>
                  <p className="text-base font-semibold mb-1" style={{ color: C.text }}>are waiting to buy something specific</p>
                  <p className="text-sm" style={{ color: C.muted }}>Surveyed ahead of Amazon Prime Day · 40 responses</p>
                </motion.div>
                <motion.div variants={stagger} className="flex flex-col gap-4">
                  <motion.div variants={up} className="p-5 bg-white rounded-sm border-l-4" style={{ borderColor: C.accent }}>
                    <p className="text-xs font-bold tracking-[0.15em] uppercase mb-2" style={{ color: C.accent }}>To Find a Good Deal</p>
                    <p className="text-sm italic leading-relaxed" style={{ color: C.muted }}>"I'm waiting because I don't really need the items and would like to save money... I'll probably wait until I find a good deal."</p>
                  </motion.div>
                  <motion.div variants={up} className="p-5 bg-white rounded-sm border-l-4" style={{ borderColor: C.accent }}>
                    <p className="text-xs font-bold tracking-[0.15em] uppercase mb-2" style={{ color: C.accent }}>To Upgrade an Existing Item</p>
                    <p className="text-sm italic leading-relaxed" style={{ color: C.muted }}>"We have these things today, but they are starting to deteriorate... They work, just not as well as they used to."</p>
                  </motion.div>
                  <motion.div variants={up} className="p-4 rounded-sm text-sm" style={{ background: C.accentLight, color: C.text }}>
                      <span className="font-black">The insight: </span>people already delay non-urgent purchases. The opportunity is helping them track, decide, and buy at the right moment.
                    </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Wizard of Oz Testing */}
        <section id="wizard" className="overflow-hidden px-6 md:px-16 pt-20 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always" style={{ background: C.bg }}>
          <div className="max-w-5xl w-full mx-auto">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <motion.p variants={up} className="text-[10px] font-semibold tracking-[0.35em] uppercase mb-3" style={{ color: C.accent }}>Usability Testing</motion.p>
              <motion.h2 variants={up} className="text-2xl md:text-4xl font-bold tracking-tight mb-2" style={{ color: C.text }}>Test the workflow with real shoppers</motion.h2>
              <motion.p variants={up} className="text-sm mb-8" style={{ color: C.muted }}>11 participants · 45-min Wizard of Oz sessions · one of us played the agent over text</motion.p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    n: '01',
                    title: 'Offload the Mental Load',
                    quote: '"I continue looking and looking and looking, and I usually forget to keep looking. And then one day I remember, and it\'s expensive again."',
                    implication: 'Position as something that "remembers to do what you\'re already meaning to do." Proactively surface value ("Still watching that air fryer for you!").',
                  },
                  {
                    n: '02',
                    title: 'Reassure Me With Data',
                    quote: '"I fear I know that big sales are kind of a scam because they up prices sneakily."',
                    implication: 'Show historical price charts. Provide data-backed target recommendations. Alert users when a price goal becomes unrealistic.',
                  },
                  {
                    n: '03',
                    title: 'Keep Me In Control',
                    quote: '"I\'d expect to be given the option of buying it now, changing my target price, or cancelling the order."',
                    implication: 'Default to confirmation before any purchase. Make cancellation frictionless. Always show the all-in price including tax and shipping.',
                  },
                ].map(({ n, title, quote, implication }) => (
                  <motion.div key={n} variants={up} className="p-6 border-t-2 bg-gray-50 rounded-sm flex flex-col gap-3" style={{ borderColor: C.accent }}>
                    <p className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: C.accent }}>Finding {n}</p>
                    <h3 className="text-sm font-black" style={{ color: C.text }}>{title}</h3>
                    <p className="text-xs italic leading-relaxed flex-1" style={{ color: C.muted }}>{quote}</p>
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-[9px] font-bold tracking-[0.15em] uppercase mb-1" style={{ color: C.accent }}>Design Implication</p>
                      <p className="text-xs leading-relaxed" style={{ color: C.text }}>{implication}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Discovery */}
        <TwoColSlide id="discovery" bg={C.bgGray}
          leftContent={
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <Badge>Shopping Flow</Badge>
              <motion.h2 variants={up} className="text-2xl md:text-5xl font-bold tracking-tight" style={{ color: C.text }}>From discovery<br />to purchase</motion.h2>
              <motion.p variants={up} className="mt-4 text-base md:text-lg" style={{ color: C.muted }}>Pick a product, set your conditions, and let the system monitor price and availability.</motion.p>
            </motion.div>
          }
          rightContent={phoneImg(specificProductImg, 'Product detail screen with price history')}
        />

        {/* Target */}
        <TwoColSlide id="target" bg={C.bg} imgLeft
          leftContent={
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <Badge>Price Targets</Badge>
              <motion.h2 variants={up} className="text-2xl md:text-5xl font-bold tracking-tight" style={{ color: C.text }}>Set your target<br />with context</motion.h2>
              <motion.p variants={up} className="mt-4 text-base md:text-lg" style={{ color: C.muted }}>Suggested targets are grounded in historical pricing, so users can set realistic goals.</motion.p>
            </motion.div>
          }
          rightContent={phoneImgLeft(priceTargetImg, 'Price target setting screen')}
        />

        {/* Control */}
        <TwoColSlide id="control" bg={C.bgGray}
          leftContent={
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <Badge>User Control</Badge>
              <motion.h2 variants={up} className="text-2xl md:text-5xl font-bold tracking-tight" style={{ color: C.text }}>Control the final step</motion.h2>
              <motion.p variants={up} className="mt-4 text-base md:text-lg" style={{ color: C.muted }}>Users choose whether to auto-buy or approve first. Nothing is hidden.</motion.p>
            </motion.div>
          }
          rightContent={phoneImg(confirmationImg, 'Confirmation choice screen')}
        />

        {/* Adjustments */}
        <TwoColSlide id="adjustments" bg={C.bg} imgLeft
          leftContent={
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <Badge>Smart Adjustments</Badge>
              <motion.h2 variants={up} className="text-2xl md:text-5xl font-bold tracking-tight" style={{ color: C.text }}>Adjust when the market shifts</motion.h2>
              <motion.p variants={up} className="mt-4 text-base md:text-lg" style={{ color: C.muted }}>When pricing trends change, the system recommends updated targets instead of leaving users stale alerts.</motion.p>
            </motion.div>
          }
          rightContent={phoneImgLeft(adjustmentsImg, 'Recommended adjustments screen')}
        />

        {/* Seamless */}
        <TwoColSlide id="seamless" bg={C.bgGray}
          leftContent={
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <Badge>Automated Checkout</Badge>
              <motion.h2 variants={up} className="text-2xl md:text-5xl font-bold tracking-tight" style={{ color: C.text }}>Checkout happens<br />for you</motion.h2>
              <motion.p variants={up} className="mt-4 text-base md:text-lg" style={{ color: C.muted }}>Once conditions are met, purchase is completed and users get a clear confirmation.</motion.p>
            </motion.div>
          }
          rightContent={phoneImg(purchasePlacedImg, 'Purchase confirmation screen')}
        />

        {/* Post-Purchase */}
        <TwoColSlide id="post-purchase" bg={C.bg} imgLeft
          leftContent={
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <Badge>After Purchase</Badge>
              <motion.h2 variants={up} className="text-2xl md:text-5xl font-bold tracking-tight" style={{ color: C.text }}>Ownership support<br />in one place</motion.h2>
              <motion.p variants={up} className="mt-4 text-base md:text-lg" style={{ color: C.muted }}>Warranties, recall alerts, and repair resources stay attached to the product after checkout.</motion.p>
            </motion.div>
          }
          rightContent={phoneImgLeft(ownedProductsImg, 'Owned products and warranty screen')}
        />

        {/* How It Works */}
        <section id="how" className="overflow-hidden px-6 md:px-16 pt-16 pb-12 md:h-screen md:flex md:items-center md:justify-center md:py-0 snap-start snap-always" style={{ background: C.bgGray }}>
          <div className="max-w-5xl w-full mx-auto">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP}>
              <motion.h2 variants={up} className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight leading-none mb-10 md:mb-16" style={{ color: C.text }}>How Buy for Me<br />works</motion.h2>
              <div className="grid sm:grid-cols-3 gap-4 mb-10 md:mb-16">
                {[
                  { n: '01', title: 'Real Price History', body: "CR's pricing history powers predictions more reliable than any retailer's 'sale' claim." },
                  { n: '02', title: 'Web Automation', body: 'Checkout steps are executed automatically, including options selection and payment completion.' },
                  { n: '03', title: 'Price Probability Model', body: 'A live model scores price-drop likelihood and updates recommendations as market conditions change.' },
                ].map(({ n, title, body }) => (
                  <motion.div key={n} variants={up} className="p-6 md:p-8 border-t-2 bg-white rounded-sm shadow-sm" style={{ borderColor: C.accent }}>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: C.accent }}>{n}</p>
                    <h3 className="text-base font-black mb-3" style={{ color: C.text }}>{title}</h3>
                    <p className="text-sm font-light leading-relaxed" style={{ color: C.muted }}>{body}</p>
                  </motion.div>
                ))}
              </div>
              <motion.div variants={up}>
                <Link to="/" state={{ fromCaseStudy: true, fromCaseStudySlug: 'buy-for-me' }} className="inline-flex items-center gap-2 px-7 py-3.5 text-white text-xs font-bold tracking-[0.15em] uppercase transition-opacity hover:opacity-80 rounded-sm" style={{ background: C.accent }}>← Back to Portfolio</Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
