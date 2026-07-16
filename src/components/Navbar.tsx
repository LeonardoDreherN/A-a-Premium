import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#products', label: 'Products' },
  { href: '#b2b', label: 'B2B' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink/10 bg-paper/90 backdrop-blur-sm">
      <nav className="mx-auto flex w-[90%] max-w-[1400px] items-center justify-between py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-acai-700 text-lime-300">
            🫐
          </span>
          NATIVE&nbsp;<span className="text-acai-700">FOREST</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-soft transition hover:text-acai-700"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="rounded-md bg-acai-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-acai-800"
          >
            Request a Quote
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="text-2xl text-ink md:hidden"
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
          className="flex flex-col gap-1 border-t border-ink/10 bg-paper px-6 pb-6 pt-2 md:hidden"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-medium text-ink-soft"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-md bg-acai-700 px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Request a Quote
          </a>
        </motion.div>
      )}
    </header>
  )
}
