import { motion } from 'framer-motion'
import Kicker from './Kicker'
import { HiOutlineChevronDown } from 'react-icons/hi'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
}

const badges = ['Cold-Pressed', 'Made in Brazil', '−18°C Frozen Export']

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-acai-950 pb-20 pt-24 text-white"
    >
      <div className="mx-auto grid w-[90%] max-w-[1400px] items-center gap-16 md:grid-cols-2 md:py-16">
        <div>
          <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
            <Kicker index="01" label="International B2B · Açaí Export" tone="dark" />
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Premium açaí, straight from the <span className="text-gradient-lime">Amazon</span> to your shelf.
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 max-w-lg text-lg leading-relaxed text-white/70"
          >
            Wholesale açaí pulp — pure, with guaraná, or with banana — in bulk bags
            and aseptic packs. Frozen at origin in Brazil and exported to
            distributors, gyms, juice bars, and natural food retailers worldwide.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="rounded-md bg-lime-400 px-7 py-3.5 text-sm font-semibold text-acai-950 transition hover:bg-lime-300"
            >
              Request a Quote
            </a>
            <a
              href="#products"
              className="rounded-md border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/40"
            >
              View Product Line
            </a>
          </motion.div>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {[
              ['3.2×', 'more antioxidants than blueberries'],
              ['120+', 'B2B partners worldwide'],
              ['48h', 'frozen export lead time'],
            ].map(([stat, label]) => (
              <div key={stat}>
                <div className="font-display text-2xl font-bold sm:text-3xl">{stat}</div>
                <div className="mt-1 text-xs leading-snug text-white/60">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-acai-500/30 blur-[100px]" />

          <img
            src="/images/acai-bottle.png"
            alt="NativeForest wholesale açaí bottle with real açaí berries, banana, mint and ice"
            className="w-full"
          />

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {badges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-lime-300"
              >
                {b}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-medium text-white/50 md:flex"
      >
        Scroll to see where it comes from
        <HiOutlineChevronDown />
      </a>
    </section>
  )
}
