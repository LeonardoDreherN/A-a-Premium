import { motion } from 'framer-motion'

const BRANDS = ['IRONCORE GYMS', 'PULSE STUDIOS', 'FUELHOUSE', 'PEAKFORM', 'RECOVR', 'STRIDE LABS']

export default function TrustBar() {
  return (
    <section className="relative border-y border-white/5 bg-acai-900/40 py-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto w-[90%] max-w-[1700px]"
      >
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-acai-300">
          Trusted by 500+ gyms, studios & sports nutrition brands
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-70">
          {BRANDS.map((b) => (
            <span key={b} className="font-display text-lg font-semibold tracking-wide text-white/70">
              {b}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
