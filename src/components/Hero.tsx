import { useRef, type MouseEvent as ReactMouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import MagneticButton from './MagneticButton'
import Kicker from './Kicker'
import { HiOutlineChevronDown } from 'react-icons/hi'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.9 + 0.15 * i, duration: 0.7, ease: 'easeOut' as const },
  }),
}

const headlineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.026, delayChildren: 0.1 } },
}

const letterVariants = {
  hidden: { opacity: 0, y: 70, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 22 },
  },
}

const HEADLINE: { text: string; highlight?: boolean }[] = [
  { text: 'The' },
  { text: 'recovery' },
  { text: 'superfood' },
  { text: 'your' },
  { text: 'athletes', highlight: true },
  { text: 'already' },
  { text: 'crave.' },
]

const BLOB_A =
  'M 300,60 C 380,60 420,140 420,220 C 420,300 370,380 290,390 C 210,400 120,360 90,280 C 60,200 100,100 180,70 C 220,55 260,55 300,60 Z'
const BLOB_B =
  'M 300,50 C 400,70 440,160 410,240 C 390,310 330,360 260,380 C 190,400 110,370 80,300 C 50,220 90,120 170,80 C 210,60 260,40 300,50 Z'

const badges = [
  { label: 'Cold-Pressed', pos: 'top-2 -left-4 md:-left-10', delay: 0.9 },
  { label: 'USDA Organic', pos: 'top-1/3 -right-4 md:-right-14', delay: 1.05 },
  { label: '−18°C Frozen Ship', pos: 'bottom-4 -left-6 md:-left-16', delay: 1.2 },
]

export default function Hero({ introDone }: { introDone: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [14, -14]), { stiffness: 120, damping: 18 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-14, 14]), { stiffness: 120, damping: 18 })
  const productX = useSpring(useTransform(px, [0, 1], [-18, 18]), { stiffness: 100, damping: 20 })
  const productY = useSpring(useTransform(py, [0, 1], [-18, 18]), { stiffness: 100, damping: 20 })

  function handleMouseMove(e: ReactMouseEvent<HTMLElement>) {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }
  function handleMouseLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      <motion.div
        className="absolute -top-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-acai-500/30 blur-[120px]"
        animate={introDone ? { scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-[26rem] w-[26rem] rounded-full bg-lime-400/10 blur-[110px]"
        animate={introDone ? { scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] } : {}}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
        animate={introDone ? { x: ['-120%', '420%'] } : {}}
        transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 4.5, ease: 'easeInOut' }}
      />

      <div className="relative z-10 mx-auto grid w-[90%] max-w-[1700px] items-center gap-16 md:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : 20 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <Kicker index="01" label="B2B Wholesale · Sports Nutrition" />
          </motion.div>

          <motion.h1
            initial="hidden"
            animate={introDone ? 'visible' : 'hidden'}
            variants={headlineContainer}
            className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {HEADLINE.map((w, wi) => (
              <span key={wi} className="mr-[0.28em] inline-block whitespace-nowrap">
                {w.text.split('').map((ch, ci) => (
                  <motion.span
                    key={ci}
                    variants={letterVariants}
                    style={{ transformPerspective: 600, display: 'inline-block' }}
                    className={w.highlight ? 'text-gradient-lime' : ''}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p
            custom={0}
            initial="hidden"
            animate={introDone ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="mt-6 max-w-lg text-lg leading-relaxed text-acai-300"
          >
            Wholesale açaí purée, frozen packs, and ready-to-blend bowls formulated
            for post-training recovery — antioxidants, healthy fats, and fast-absorbing
            natural sugars. Stock it in your gym, studio, or juice bar.
          </motion.p>

          <motion.div
            custom={1}
            initial="hidden"
            animate={introDone ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-md bg-lime-400 px-7 py-3.5 text-sm font-semibold text-acai-950 shadow-[0_0_30px_rgba(198,255,61,0.4)] transition hover:bg-lime-300"
            >
              Get Wholesale Pricing
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </MagneticButton>
            <MagneticButton
              href="#products"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white/90 underline decoration-white/25 underline-offset-8 transition hover:text-lime-300 hover:decoration-lime-300"
            >
              View Product Line
              <span className="text-lime-300 transition-transform group-hover:translate-x-1">→</span>
            </MagneticButton>
          </motion.div>

          <motion.div
            custom={2}
            initial="hidden"
            animate={introDone ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {[
              ['3.2×', 'more antioxidants than blueberries'],
              ['500+', 'gyms & studios supplied'],
              ['48h', 'frozen delivery lead time'],
            ].map(([stat, label]) => (
              <div key={stat}>
                <div className="font-display text-2xl font-bold text-white sm:text-3xl">{stat}</div>
                <div className="mt-1 text-xs leading-snug text-acai-300">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          className="relative z-10 mx-auto w-full max-w-lg"
        >
          <svg viewBox="0 0 480 440" className="pointer-events-none absolute -inset-10 -z-10 opacity-40 blur-2xl">
            <defs>
              <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c52c9" />
                <stop offset="100%" stopColor="#c6ff3d" />
              </linearGradient>
            </defs>
            <motion.path
              fill="url(#blobGradient)"
              initial={{ d: BLOB_A }}
              animate={introDone ? { d: [BLOB_A, BLOB_B, BLOB_A] } : { d: BLOB_A }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>

          <motion.div style={{ x: productX, y: productY }}>
            <motion.div
              animate={introDone ? { y: [0, -12, 0], rotate: [0, 1.4, 0, -1.4, 0] } : {}}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src="/images/acai-bottle.png"
                alt="Açaí Fuel wholesale bottle with real açaí berries, banana, mint and ice"
                className="w-full drop-shadow-[0_40px_90px_rgba(93,45,180,0.45)]"
              />
            </motion.div>
          </motion.div>

          {badges.map((b) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={introDone ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 20 }}
              transition={{ delay: b.delay, type: 'spring', stiffness: 160, damping: 14 }}
              className={`animate-float-slow absolute ${b.pos} rounded-2xl border border-white/10 bg-acai-900/80 px-4 py-2 text-xs font-semibold text-lime-300 shadow-lg backdrop-blur-sm`}
            >
              {b.label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#science"
        data-cursor="hover"
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-medium text-acai-300"
      >
        Scroll to see the science
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <HiOutlineChevronDown className="text-lime-300" />
        </motion.span>
      </motion.a>
    </section>
  )
}
