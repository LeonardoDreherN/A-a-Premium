import { motion } from 'framer-motion'
import Kicker from './Kicker'

const PLANS = [
  {
    name: 'Pure Açaí Pulp',
    icon: '🫐',
    accent: 'from-acai-500 to-acai-800',
    tag: 'Foodservice & smoothie bars',
    moq: 'Bags or aseptic packs · MOQ per container',
    features: [
      '100% pure açaí pulp, no additives',
      'Available in bulk bags or aseptic packs',
      'IQF frozen, shipped at −18°C',
      'Unsweetened — built for your own recipe',
    ],
    highlight: false,
  },
  {
    name: 'Açaí + Guaraná',
    icon: '⚡',
    accent: 'from-forest-500 to-forest-600',
    tag: 'Energy & performance blends',
    moq: 'Bags or aseptic packs · MOQ per container',
    features: [
      'Natural guaraná for a clean energy lift',
      'Most requested by gyms & juice bars',
      'Available in bags or aseptic packs',
      'Custom sweetness levels on request',
    ],
    highlight: true,
  },
  {
    name: 'Açaí + Banana',
    icon: '🍌',
    accent: 'from-amber-400 to-amber-600',
    tag: 'Bowls & retail-ready blends',
    moq: 'Bags or aseptic packs · MOQ per container',
    features: [
      'Naturally sweetened with real banana',
      'Ready for açaí bowls & smoothies',
      'Available in bags or aseptic packs',
      'Consistent viscosity for retail service',
    ],
    highlight: false,
  },
]

export default function Products() {
  return (
    <section id="products" className="relative bg-paper py-24">
      <div className="mx-auto w-[90%] max-w-[1400px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Kicker index="04" label="Product Line" tone="light" />
            <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
              Three blends, two formats, one cold chain.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
            From bulk bags for your production line to aseptic packs ready for
            retail — every SKU ships frozen, straight from Brazil.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
              className={`relative flex flex-col overflow-hidden rounded-xl border bg-paper shadow-sm transition-shadow hover:shadow-md ${
                p.highlight ? 'border-forest-500/60' : 'border-ink/10'
              }`}
            >
              {p.highlight && (
                <span className="absolute right-4 top-4 z-10 rounded-full bg-forest-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  Most Requested
                </span>
              )}

              <div
                className={`flex h-28 items-center justify-center bg-gradient-to-br text-4xl ${p.accent}`}
              >
                {p.icon}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-acai-700">
                  {p.tag}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">{p.name}</h3>
                <p className="mt-1.5 text-sm text-ink-soft">{p.moq}</p>

                <ul className="mt-5 flex-1 space-y-2 text-sm text-ink-soft">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-forest-500" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-6 inline-flex items-center justify-center rounded-md px-5 py-2.5 text-center text-sm font-semibold transition ${
                    p.highlight
                      ? 'bg-forest-600 text-white hover:bg-forest-500'
                      : 'border border-ink/15 text-ink hover:border-acai-700/50 hover:text-acai-700'
                  }`}
                >
                  Request a Quote
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
