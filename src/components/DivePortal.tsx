import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

interface Particle {
  left: string
  top: string
  size: number
  depth: number
  blur: boolean
  variant: 'berry' | 'ring'
}

const PARTICLES: Particle[] = Array.from({ length: 22 }).map((_, i) => {
  const angle = (i / 22) * Math.PI * 2
  const radius = 18 + (i % 5) * 13
  return {
    left: `${50 + Math.cos(angle) * radius}%`,
    top: `${50 + Math.sin(angle) * radius}%`,
    size: 10 + (i % 4) * 9,
    depth: 0.5 + (i % 6) * 0.2,
    blur: i % 3 === 0,
    variant: i % 5 === 0 ? 'ring' : 'berry',
  }
})

function ParticleDot({ p, scrollYProgress }: { p: Particle; scrollYProgress: MotionValue<number> }) {
  const y = useTransform(scrollYProgress, [0.15, 1], [140, -650 * p.depth])
  const opacity = useTransform(scrollYProgress, [0.2, 0.35, 0.82, 0.97], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0.2, 0.5], [0.5, 1])

  return (
    <motion.div
      className={`absolute rounded-full ${p.blur ? 'blur-[2px]' : ''}`}
      style={{
        left: p.left,
        top: p.top,
        width: p.size,
        height: p.size,
        y,
        opacity,
        scale,
        background:
          p.variant === 'berry'
            ? 'radial-gradient(circle at 35% 30%, #d9a9ff, #6b2fb3 60%, #2a1250)'
            : 'transparent',
        border: p.variant === 'ring' ? '2px solid rgba(198,255,61,0.5)' : 'none',
      }}
    />
  )
}

export default function DivePortal() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const circleScale = useTransform(scrollYProgress, [0, 0.4], [0.22, 9])
  const portalOpacity = useTransform(scrollYProgress, [0, 0.06, 0.85, 1], [0, 1, 1, 0])
  const hudOpacity = useTransform(scrollYProgress, [0.02, 0.12, 0.35, 0.45], [0, 1, 1, 0])
  const textOpacity = useTransform(scrollYProgress, [0.42, 0.55, 0.74, 0.88], [0, 1, 1, 0])
  const textY = useTransform(scrollYProgress, [0.42, 0.6], [40, 0])

  return (
    <section ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-acai-950">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            scale: circleScale,
            opacity: portalOpacity,
            background:
              'radial-gradient(circle at 38% 32%, #8b5fd6 0%, #4a2a86 45%, #1c0f3c 78%, #0b0518 100%)',
          }}
        />

        <div className="absolute inset-0 overflow-hidden">
          {PARTICLES.map((p, i) => (
            <ParticleDot key={i} p={p} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        <motion.p
          style={{ opacity: hudOpacity }}
          className="absolute left-1/2 top-16 -translate-x-1/2 whitespace-nowrap font-display text-xs uppercase tracking-[0.3em] text-lime-300/70"
        >
          ⌄ Descending into the purée
        </motion.p>

        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Deeper than <span className="text-gradient-lime">flavor.</span>
          </h2>
          <p className="mt-6 max-w-md text-sm uppercase tracking-[0.2em] text-white/50">
            3.2× antioxidants · frozen at −18°C · zero compromise
          </p>
        </motion.div>
      </div>
    </section>
  )
}
