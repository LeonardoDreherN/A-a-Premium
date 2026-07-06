import { motion } from 'framer-motion'

const ITEMS = [
  'POST-WORKOUT FUEL',
  'COLD-PRESSED',
  'WHOLESALE READY',
  'ANTIOXIDANT DENSE',
  'ZERO ADDITIVES',
  'FROZEN COLD-CHAIN',
]

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-10 px-5">
      {ITEMS.map((item) => (
        <span
          key={item}
          className="flex items-center gap-10 font-display text-2xl font-bold uppercase tracking-tight text-white/90 sm:text-4xl"
        >
          {item}
          <span className="text-lime-300">✦</span>
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-acai-900/60 py-6">
      <motion.div
        className="flex w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 24 }}
      >
        <Row />
        <Row />
      </motion.div>
    </div>
  )
}
