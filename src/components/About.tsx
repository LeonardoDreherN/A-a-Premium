import { motion } from 'framer-motion'
import Kicker from './Kicker'

const PILLARS = [
  {
    n: '01',
    title: 'Brazilian origin',
    desc: 'Sourced directly from harvester communities along the Amazon basin.',
  },
  {
    n: '02',
    title: 'Frozen at origin',
    desc: 'Pulped and frozen within hours of harvest to lock in nutrients and flavor.',
  },
  {
    n: '03',
    title: 'Responsibly grown',
    desc: 'Managed forest sourcing and fair pay for the communities who harvest it.',
  },
]

export default function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto w-[90%] max-w-[1400px]">
        <Kicker index="02" label="Our Story" tone="light" />

        <div className="mt-8 grid gap-12 lg:grid-cols-5 lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-3"
          >
            <h2 className="font-display text-3xl font-bold leading-[1.15] text-ink sm:text-4xl lg:text-5xl">
              Harvested in the <span className="text-acai-700">Amazon</span>, shipped to the world.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
              NativeForest was born from a simple belief: açaí grown along the
              Amazon basin deserves to reach kitchens, gyms, and shelves far
              beyond Brazil — without losing what makes it different. We work
              directly with local harvesters, freeze the pulp at origin within
              hours of picking, and ship it cold-chain to distributors,
              retailers, and food brands on every continent.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
              Sustainability isn't a marketing line for us — the Amazon is our
              supply chain. We source from managed forest areas, pay harvester
              communities fairly, and keep packaging as light as the product
              demands.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="grid grid-cols-1 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1"
          >
            {PILLARS.map((item) => (
              <div key={item.n} className="bg-paper-dim p-6">
                <span className="font-display text-sm font-semibold text-forest-600">{item.n}</span>
                <h3 className="mt-2 font-display text-base font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
