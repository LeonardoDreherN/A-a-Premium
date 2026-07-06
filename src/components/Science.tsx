import { motion } from 'framer-motion'
import Kicker from './Kicker'

const BENEFITS = [
  {
    n: '01',
    title: 'Fast-absorbing carbs',
    desc: 'Natural fruit sugars replenish glycogen quickly, right in the window when muscles are primed to restock.',
  },
  {
    n: '02',
    title: 'Healthy fats',
    desc: 'Monounsaturated fats support inflammation control without the crash of processed recovery snacks.',
  },
  {
    n: '03',
    title: 'Fiber & micronutrients',
    desc: 'Supports gut and immune health so athletes recover between sessions, not just after one workout.',
  },
]

const COMPARISON = [
  { label: 'Açaí Purée', value: 100 },
  { label: 'Blueberries', value: 42 },
  { label: 'Sports Drink', value: 6 },
]

export default function Science() {
  return (
    <section id="science" className="relative bg-paper py-28 text-ink">
      <div className="mx-auto w-[90%] max-w-[1700px]">
        <Kicker index="02" label="The Science" tone="light" />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mt-6 max-w-3xl font-serif text-4xl italic leading-[1.05] text-ink sm:text-5xl lg:text-6xl"
        >
          Built for <span className="not-italic font-display font-bold">recovery</span> —
          not flavor.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-ink/60"
        >
          Every batch is formulated around what happens to the body in the 30 minutes
          after training — not what looks good on a dessert menu.
        </motion.p>

        <div className="mt-16 grid grid-cols-1 gap-px border border-ink/10 bg-ink/10 md:grid-cols-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bg-ink p-8 text-paper md:col-span-3 md:row-span-2"
          >
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-paper/50">
              Antioxidant capacity — ORAC index
            </p>
            <div className="mt-8 space-y-7">
              {COMPARISON.map((c, i) => (
                <div key={c.label}>
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="text-sm text-paper/70">{c.label}</span>
                    <span className="font-serif text-2xl italic text-paper">{c.value}</span>
                  </div>
                  <div className="h-1.5 w-full bg-paper/10">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: c.value / 100 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ delay: i * 0.15, duration: 1, ease: 'easeOut' }}
                      className={`h-full w-full origin-left ${i === 0 ? 'bg-lime-400' : 'bg-paper/40'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-xs leading-relaxed text-paper/40">
              Indexed values for illustrative comparison. Full source data available in
              our wholesale spec sheet.
            </p>
          </motion.div>

          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: 'easeOut' }}
              className={`group bg-paper p-8 transition-colors hover:bg-ink hover:text-paper md:col-span-3 ${
                i === 2 ? 'md:col-span-6' : ''
              }`}
            >
              <span className="font-serif text-sm italic text-ink/35 group-hover:text-paper/50">
                {b.n}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink group-hover:text-paper">
                {b.title}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/60 group-hover:text-paper/70">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
