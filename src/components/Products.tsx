import { motion } from 'framer-motion'
import Kicker from './Kicker'
import MagneticButton from './MagneticButton'

const PLANS = [
  {
    name: 'Frozen Purée Packs',
    tag: 'Smoothie & juice bars',
    moq: 'MOQ 200 units · 100g packs',
    features: [
      'Cold-pressed, IQF frozen açaí purée',
      'Unsweetened & lightly sweetened',
      'Ships in insulated bulk cartons',
      'Best used blended in-house',
    ],
    highlight: false,
  },
  {
    name: 'Ready-to-Blend Bowl Kits',
    tag: 'Gyms & recovery studios',
    moq: 'MOQ 150 kits · case of 24',
    features: [
      'Pre-portioned base + topping sachets',
      '90-second prep, no blender skill',
      'Custom macro blends available',
      'Branded cup + lid inserts',
    ],
    highlight: true,
  },
  {
    name: 'Private Label Program',
    tag: 'Sports nutrition brands',
    moq: 'MOQ negotiated per SKU',
    features: [
      'Your branding, our formulation',
      'Custom flavor & macro profiles',
      'Co-packing & direct-to-DC',
      'Dedicated compliance support',
    ],
    highlight: false,
  },
]

export default function Products() {
  return (
    <section id="products" className="relative overflow-hidden py-28">
      <span className="pointer-events-none absolute -top-6 right-0 select-none font-display text-[10rem] font-bold leading-none text-white/[0.025] sm:text-[14rem]">
        SUPPLY
      </span>

      <div className="relative mx-auto w-[90%] max-w-[1700px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Kicker index="03" label="Wholesale Line" />
            <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              Pick the format that fits your business.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-acai-300">
            From bulk purée for your blender line to a fully white-labeled SKU — we
            supply the format your operation actually needs.
          </p>
        </div>

        <div className="mt-16 border-t border-white/10">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
              className={`group relative grid gap-6 border-b border-white/10 py-10 transition-colors md:grid-cols-12 md:items-center md:gap-4 ${
                p.highlight ? 'bg-lime-400/[0.04]' : ''
              }`}
            >
              {p.highlight && (
                <span className="absolute inset-y-0 left-0 w-[3px] bg-lime-400" />
              )}

              <div className="flex items-baseline gap-3 md:col-span-1">
                <span className="font-serif text-lg italic text-white/25">0{i + 1}</span>
              </div>

              <div className="md:col-span-4">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-lime-300/80">
                  {p.tag}
                  {p.highlight && (
                    <span className="ml-2 rounded-full bg-lime-400 px-2 py-0.5 text-[10px] font-bold text-acai-950">
                      Most Popular
                    </span>
                  )}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                  {p.name}
                </h3>
                <p className="mt-1.5 text-sm text-acai-300">{p.moq}</p>
              </div>

              <ul className="grid grid-cols-1 gap-x-6 gap-y-1.5 text-sm text-acai-300 sm:grid-cols-2 md:col-span-5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lime-300/70" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="md:col-span-2 md:text-right">
                <MagneticButton
                  href="#contact"
                  className={
                    p.highlight
                      ? 'group inline-flex items-center gap-2 rounded-md bg-lime-400 px-5 py-2.5 text-sm font-semibold text-acai-950 transition hover:bg-lime-300'
                      : 'group inline-flex items-center gap-2 text-sm font-semibold text-white/80 underline decoration-white/20 underline-offset-8 transition hover:text-lime-300 hover:decoration-lime-300'
                  }
                >
                  Request Sample
                  <span
                    className={`transition-transform group-hover:translate-x-1 ${p.highlight ? '' : 'text-lime-300'}`}
                  >
                    →
                  </span>
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
