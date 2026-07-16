import { motion } from 'framer-motion'

const BRANDS = ['NORDIC GELATO CO', 'TROPIFRESH IMPORTS', 'PULSE JUICE BAR', 'VERDE NATURAL FOODS', 'IRONCORE GYMS', 'AMAZÔNIA TRADE']

export default function TrustBar() {
  return (
    <section className="border-b border-ink/10 bg-paper-dim py-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto w-[90%] max-w-[1400px]"
      >
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-ink-soft">
          Exporting to 120+ distributors, retailers &amp; food service brands worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {BRANDS.map((b) => (
            <span key={b} className="font-display text-lg font-semibold tracking-wide text-ink/40">
              {b}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
