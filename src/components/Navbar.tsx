import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import MagneticButton from './MagneticButton'

const LINKS = [
  { href: '#science', label: 'Why Açaí' },
  { href: '#products', label: 'Wholesale' },
  { href: '#process', label: 'Process' },
  { href: '#reviews', label: 'Reviews' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="fixed top-0 z-50 w-full border-b border-white/5 bg-acai-950/70 backdrop-blur-lg"
    >
      <nav className="mx-auto flex w-[90%] max-w-[1700px] items-center justify-between py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-acai-400 to-acai-700 text-lime-300 shadow-[0_0_18px_rgba(198,255,61,0.35)]">
            🫐
          </span>
          AÇAÍ&nbsp;<span className="text-gradient-lime">FUEL</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-acai-300/90 transition hover:text-lime-300"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <MagneticButton
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-md bg-lime-400 px-5 py-2.5 text-sm font-semibold text-acai-950 shadow-[0_0_20px_rgba(198,255,61,0.4)] transition hover:bg-lime-300"
          >
            Get Wholesale Pricing
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </MagneticButton>
        </div>

        <button
          aria-label="Toggle menu"
          className="text-2xl text-white md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="flex flex-col gap-1 border-t border-white/5 bg-acai-950/95 px-6 pb-6 pt-2 md:hidden"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-medium text-acai-300"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-md bg-lime-400 px-5 py-3 text-center text-sm font-semibold text-acai-950"
          >
            Get Wholesale Pricing
          </a>
        </motion.div>
      )}
    </motion.header>
  )
}
