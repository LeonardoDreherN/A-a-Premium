import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import Kicker from './Kicker'

const STEPS = [
  {
    n: '01',
    title: 'Request samples & docs',
    desc: 'Tell us your product mix and destination country. We ship a sample kit with spec sheets, nutritionals, and export documentation within 3 business days.',
  },
  {
    n: '02',
    title: 'Confirm formulation & MOQ',
    desc: 'Lock in blend, packaging format — bags or aseptic — and order volume with our export team. MOQ starts per container, not per pallet.',
  },
  {
    n: '03',
    title: 'Place your export order',
    desc: 'Transparent FOB/CIF pricing. We coordinate Incoterms and documentation directly with your freight forwarder.',
  },
  {
    n: '04',
    title: 'Recurring shipments',
    desc: 'Containerized, cold-chain shipping on a schedule you set — from our facility in Brazil to your port of entry.',
  },
]

const BENEFITS = ['Volume-based pricing', 'Private label available', 'Dedicated export support']

export default function B2B() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] })

  return (
    <section id="b2b" className="relative bg-paper-dim py-24">
      <div className="relative mx-auto w-[90%] max-w-[1400px]">
        <Kicker index="05" label="How Import Works" tone="light" />
        <h2 className="mt-6 max-w-xl font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
          From first sample to your <span className="text-forest-600">first container.</span>
        </h2>

        <div ref={ref} className="relative mt-14 border-t border-ink/10">
          <motion.span
            style={{ scaleY: scrollYProgress }}
            className="absolute left-0 top-0 h-full w-px origin-top bg-acai-700"
          />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
              className="grid grid-cols-1 gap-3 border-b border-ink/10 py-10 pl-8 md:grid-cols-[100px_1fr_1.3fr] md:items-baseline md:gap-8"
            >
              <span className="font-display text-3xl font-bold text-ink/15">{s.n}</span>
              <h3 className="font-display text-xl font-semibold text-ink">{s.title}</h3>
              <p className="max-w-lg text-sm leading-relaxed text-ink-soft">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3"
        >
          {BENEFITS.map((b) => (
            <span key={b} className="flex items-center gap-2 text-sm text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-forest-600" />
              {b}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
