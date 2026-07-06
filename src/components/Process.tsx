import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import Kicker from './Kicker'

const STEPS = [
  {
    n: '01',
    title: 'Request samples',
    desc: 'Tell us your format and volume. We ship a sample kit with spec sheets and nutritionals within 3 business days.',
  },
  {
    n: '02',
    title: 'Taste test & formulate',
    desc: 'Lock in sweetness, macros, and packaging with our team — tailored to your athletes, not a generic recipe.',
  },
  {
    n: '03',
    title: 'Place opening order',
    desc: 'Start at MOQ with transparent wholesale pricing. No hidden minimums, no long-term lock-in required.',
  },
  {
    n: '04',
    title: 'Recurring fulfillment',
    desc: 'Automated reorder cadence keeps your freezer stocked — frozen, cold-chain shipping on a schedule you set.',
  },
]

export default function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] })

  return (
    <section id="process" className="relative overflow-hidden py-28">
      <span className="pointer-events-none absolute -bottom-14 left-0 select-none font-display text-[9rem] font-bold leading-none text-white/[0.025] sm:text-[13rem]">
        PROCESS
      </span>

      <div className="relative mx-auto w-[90%] max-w-[1700px]">
        <Kicker index="04" label="How It Works" />
        <h2 className="mt-6 max-w-xl font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
          From sample to shelf in{' '}
          <span className="font-serif italic text-lime-300">under 3 weeks.</span>
        </h2>

        <div ref={ref} className="relative mt-16 border-t border-white/10">
          <motion.span
            style={{ scaleY: scrollYProgress }}
            className="absolute left-0 top-0 h-full w-px origin-top bg-lime-400"
          />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: 'easeOut' }}
              className="grid grid-cols-1 gap-3 border-b border-white/10 py-10 pl-8 md:grid-cols-[100px_1fr_1.3fr] md:items-baseline md:gap-8"
            >
              <span className="font-serif text-4xl italic text-white/15">{s.n}</span>
              <h3 className="font-display text-xl font-semibold text-white">{s.title}</h3>
              <p className="max-w-lg text-sm leading-relaxed text-acai-300">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
