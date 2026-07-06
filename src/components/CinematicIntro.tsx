import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type Phase = 'frost' | 'crack' | 'shatter' | 'text' | 'wipe' | 'fade'

const LINE_1 = 'FUEL YOUR'
const LINE_2 = 'RECOVERY.'

const lineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } },
}

const letterVariants = {
  hidden: { opacity: 0, y: 40, scale: 1.4 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 260, damping: 24 },
  },
}

const PORTAL_GRADIENT =
  'radial-gradient(circle at 38% 32%, #8b5fd6 0%, #4a2a86 45%, #1c0f3c 78%, #0b0518 100%)'

const CRACK_PATHS = [
  'M500,300 L540,220 L520,140 L570,60',
  'M500,300 L590,280 L680,240 L800,270',
  'M500,300 L560,360 L610,440 L680,540',
  'M500,300 L470,380 L430,460 L390,560',
  'M500,300 L410,320 L320,290 L200,310',
  'M500,300 L440,220 L390,150 L330,50',
  'M500,300 L430,360 L340,400 L220,470',
  'M500,300 L570,240 L650,190 L760,110',
]

function CrackLines() {
  return (
    <svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {CRACK_PATHS.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="#f3f7ff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: i * 0.025, ease: 'easeOut' }}
          style={{ filter: 'drop-shadow(0 0 5px rgba(198,255,61,0.7))' }}
        />
      ))}
    </svg>
  )
}

const GRID_COLS = 3
const GRID_ROWS = 3

interface Shard {
  left: number
  top: number
  w: number
  h: number
  clip: string
  fx: number
  fy: number
  rot: number
  delay: number
}

function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

const SHARDS: Shard[] = (() => {
  const arr: Shard[] = []
  const edges: [string, string][] = [
    ['0% 0%', '100% 0%'],
    ['100% 0%', '100% 100%'],
    ['100% 100%', '0% 100%'],
    ['0% 100%', '0% 0%'],
  ]
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      const left = (c / GRID_COLS) * 100
      const top = (r / GRID_ROWS) * 100
      const w = 100 / GRID_COLS
      const h = 100 / GRID_ROWS
      const cellSeed = r * GRID_COLS + c
      const px = 25 + seededRandom(cellSeed * 3.7) * 50
      const py = 25 + seededRandom(cellSeed * 8.1) * 50
      const cx = c / (GRID_COLS - 1) - 0.5
      const cy = r / (GRID_ROWS - 1) - 0.5
      edges.forEach(([a, b], ti) => {
        const seed = cellSeed * 11 + ti * 3.3
        arr.push({
          left,
          top,
          w,
          h,
          clip: `polygon(${a}, ${b}, ${px}% ${py}%)`,
          fx: cx * (140 + seededRandom(seed) * 160) + (seededRandom(seed + 1) - 0.5) * 60,
          fy: 90 + cy * 60 + seededRandom(seed + 2) * 220,
          rot: (seededRandom(seed + 3) - 0.5) * 160,
          delay: seededRandom(seed + 4) * 0.28,
        })
      })
    }
  }
  return arr
})()

function Shatter() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {SHARDS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute border border-white/60"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.w}%`,
            height: `${s.h}%`,
            clipPath: s.clip,
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(205,232,255,0.4) 45%, rgba(139,95,214,0.2) 100%)',
            boxShadow: 'inset 0 0 10px rgba(255,255,255,0.35), 0 0 16px rgba(220,240,255,0.25)',
            willChange: 'transform, opacity',
          }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          animate={{ x: s.fx, y: s.fy, rotate: s.rot, opacity: 0 }}
          transition={{ duration: 0.95, delay: s.delay, ease: [0.4, 0, 0.6, 1] }}
        />
      ))}
    </div>
  )
}

export default function CinematicIntro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('frost')

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('crack'), 500),
      setTimeout(() => setPhase('shatter'), 1000),
      setTimeout(() => setPhase('text'), 1700),
      setTimeout(() => setPhase('wipe'), 3100),
      setTimeout(() => setPhase('fade'), 3850),
      setTimeout(() => onDone(), 4450),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  const productVisible = phase !== 'wipe' && phase !== 'fade'
  const frostActive = phase === 'frost' || phase === 'crack' || phase === 'shatter'

  return (
    <motion.div
      className="bg-grain fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-acai-950"
      animate={{ opacity: phase === 'fade' ? 0 : 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="absolute h-[60vmax] w-[60vmax] rounded-full bg-acai-500/20 blur-[140px]" />

      {frostActive && (
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: phase === 'shatter' ? 0 : phase === 'crack' ? 0.85 : 1 }}
          transition={{ duration: phase === 'shatter' ? 0.7 : 0.4 }}
          style={{
            background:
              'radial-gradient(ellipse at 50% 42%, rgba(255,255,255,0.2) 0%, rgba(205,232,255,0.1) 38%, rgba(15,10,31,0) 68%)',
          }}
        />
      )}

      {phase === 'crack' && <CrackLines />}
      {phase === 'shatter' && (
        <>
          <Shatter />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="pointer-events-none absolute inset-0 z-10 bg-white"
          />
        </>
      )}

      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: frostActive ? 1 : 0, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-[18%] rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-lime-300"
      >
        Açaí Fuel · Sealed at −18°C
      </motion.span>

      {phase !== 'frost' && phase !== 'crack' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(16px)' }}
          animate={{
            opacity: phase === 'text' ? 0.35 : productVisible ? 1 : 0,
            scale: phase === 'text' ? 0.55 : 1,
            filter: 'blur(0px)',
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-40 sm:w-52"
        >
          <img
            src="/images/acai-bottle.png"
            alt="Açaí Fuel bottle"
            className="w-full drop-shadow-[0_20px_60px_rgba(93,45,180,0.5)]"
          />
        </motion.div>
      )}

      {phase === 'text' && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={lineContainer}
            className="font-display text-[13vw] font-bold leading-[0.95] tracking-tight text-white sm:text-[9vw]"
          >
            {LINE_1.split('').map((ch, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                className="inline-block"
                style={ch === ' ' ? { width: '0.28em' } : undefined}
              >
                {ch === ' ' ? ' ' : ch}
              </motion.span>
            ))}
          </motion.h1>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={lineContainer}
            transition={{ delayChildren: 0.35 }}
            className="text-gradient-lime font-display text-[13vw] font-bold leading-[0.95] tracking-tight sm:text-[9vw]"
          >
            {LINE_2.split('').map((ch, i) => (
              <motion.span key={i} variants={letterVariants} className="inline-block">
                {ch}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      )}

      {(phase === 'wipe' || phase === 'fade') && (
        <motion.div
          initial={{ scale: 0.25, opacity: 0 }}
          animate={{ scale: 12, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="absolute h-[300px] w-[300px] rounded-full"
          style={{ background: PORTAL_GRADIENT }}
        />
      )}

      <motion.div
        className="absolute bottom-10 h-px w-40 overflow-hidden bg-white/10 sm:w-56"
        animate={{ opacity: phase === 'wipe' || phase === 'fade' ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 3.1, ease: 'linear' }}
          className="h-full w-full origin-left bg-lime-400"
        />
      </motion.div>
    </motion.div>
  )
}
