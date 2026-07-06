import { motion, useScroll, useTransform } from 'framer-motion'

type Variant = 'berry' | 'leaf' | 'ring'

interface Particle {
  top: string
  left: string
  size: number
  variant: Variant
  depth: number
  blur?: boolean
  float: string
}

const PARTICLES: Particle[] = [
  { top: '2%', left: '8%', size: 26, variant: 'berry', depth: 0.9, float: 'animate-float-slow' },
  { top: '6%', left: '88%', size: 18, variant: 'leaf', depth: 0.5, float: 'animate-float-slower' },
  { top: '14%', left: '48%', size: 14, variant: 'ring', depth: 1.3, blur: true, float: 'animate-float-slow' },
  { top: '20%', left: '6%', size: 34, variant: 'berry', depth: 0.6, blur: true, float: 'animate-float-slower' },
  { top: '26%', left: '92%', size: 22, variant: 'berry', depth: 1.1, float: 'animate-float-slow' },
  { top: '33%', left: '15%', size: 16, variant: 'leaf', depth: 1.4, float: 'animate-float-slower' },
  { top: '40%', left: '80%', size: 30, variant: 'ring', depth: 0.7, float: 'animate-float-slow' },
  { top: '47%', left: '4%', size: 20, variant: 'berry', depth: 1.2, float: 'animate-float-slower' },
  { top: '53%', left: '94%', size: 15, variant: 'leaf', depth: 0.9, blur: true, float: 'animate-float-slow' },
  { top: '60%', left: '10%', size: 28, variant: 'berry', depth: 0.5, float: 'animate-float-slower' },
  { top: '66%', left: '85%', size: 18, variant: 'ring', depth: 1.3, float: 'animate-float-slow' },
  { top: '73%', left: '50%', size: 24, variant: 'berry', depth: 1.0, blur: true, float: 'animate-float-slower' },
  { top: '80%', left: '18%', size: 16, variant: 'leaf', depth: 0.7, float: 'animate-float-slow' },
  { top: '86%', left: '90%', size: 32, variant: 'berry', depth: 0.85, float: 'animate-float-slower' },
  { top: '92%', left: '6%', size: 20, variant: 'ring', depth: 1.15, blur: true, float: 'animate-float-slow' },
  { top: '97%', left: '60%', size: 22, variant: 'leaf', depth: 0.95, float: 'animate-float-slower' },
]

function Shape({ variant, size }: { variant: Variant; size: number }) {
  if (variant === 'berry') {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40">
        <defs>
          <radialGradient id="fbBerry" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#c88bff" />
            <stop offset="100%" stopColor="#3d1670" />
          </radialGradient>
        </defs>
        <circle cx="20" cy="20" r="18" fill="url(#fbBerry)" />
        <circle cx="15" cy="14" r="4" fill="#f1e2ff" opacity="0.55" />
      </svg>
    )
  }
  if (variant === 'ring') {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="15" fill="none" stroke="#c6ff3d" strokeWidth="3" opacity="0.6" />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <path d="M20 4C12 10 12 28 20 36C28 28 28 10 20 4Z" fill="#8bd400" opacity="0.75" />
      <path d="M20 8V32" stroke="#4f7a00" strokeWidth="1.5" opacity="0.6" />
    </svg>
  )
}

function FallingParticle({ p }: { p: Particle }) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 900 * p.depth])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180 * p.depth])
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0.4])

  return (
    <motion.div
      className={`absolute ${p.float} ${p.blur ? 'blur-[1px]' : ''}`}
      style={{ top: p.top, left: p.left, y, rotate, opacity }}
    >
      <Shape variant={p.variant} size={p.size} />
    </motion.div>
  )
}

export default function FallingBerries() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {PARTICLES.map((p, i) => (
        <FallingParticle key={i} p={p} />
      ))}
    </div>
  )
}
