import { motion } from 'framer-motion'

const COUNT = 18

export default function BerryBurst() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {[...Array(COUNT)].map((_, i) => {
        const angle = (i / COUNT) * Math.PI * 2
        const distance = 90 + Math.random() * 120
        const size = 8 + Math.random() * 10
        const isLime = i % 3 === 0
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: 0,
              scale: 1,
              rotate: (Math.random() - 0.5) * 360,
            }}
            transition={{ duration: 1.1 + Math.random() * 0.4, ease: 'easeOut' }}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              background: isLime ? '#c6ff3d' : 'radial-gradient(circle at 35% 30%, #c88bff, #3d1670)',
            }}
          />
        )
      })}
    </div>
  )
}
