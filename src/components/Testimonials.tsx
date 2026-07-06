import { motion } from 'framer-motion'
import Kicker from './Kicker'

const FEATURED = {
  quote:
    'We swapped our post-class recovery shake for their bowl kits. Members noticed the difference in a week — and prep time dropped to under two minutes.',
  name: 'Marisol Vega',
  role: 'Owner, Pulse Studios — 14 locations',
}

const SUPPORTING = [
  {
    quote:
      'The private label program let us launch a branded recovery line in six weeks without building a supply chain from scratch.',
    name: 'Daniel Osei',
    role: 'Founder, Recovr Nutrition',
  },
  {
    quote:
      'Frozen packs arrive on schedule, every time. Our smoothie bar hasn’t run out of açaí once since we switched suppliers.',
    name: 'Jordan Pace',
    role: 'Ops Manager, Ironcore Gyms',
  },
]

export default function Testimonials() {
  return (
    <section id="reviews" className="relative bg-paper py-28 text-ink">
      <div className="mx-auto w-[90%] max-w-[1700px]">
        <Kicker index="05" label="Reviews" tone="light" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative mt-10"
        >
          <span className="pointer-events-none absolute -left-4 -top-16 select-none font-serif text-[10rem] italic leading-none text-ink/[0.06] sm:text-[14rem]">
            “
          </span>
          <blockquote className="relative max-w-3xl font-serif text-3xl italic leading-[1.2] text-ink sm:text-4xl lg:text-5xl">
            {FEATURED.quote}
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-3">
            <span className="h-px w-10 bg-ink/30" />
            <span className="font-display text-sm font-semibold text-ink">{FEATURED.name}</span>
            <span className="text-sm text-ink/50">{FEATURED.role}</span>
          </figcaption>
        </motion.div>

        <div className="mt-20 grid gap-10 border-t border-ink/10 pt-12 sm:grid-cols-2">
          {SUPPORTING.map((q, i) => (
            <motion.div
              key={q.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
              className="border-l-2 border-ink/15 pl-6"
            >
              <p className="max-w-md font-serif text-lg italic leading-snug text-ink/80">“{q.quote}”</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-ink/40">
                {q.name} · {q.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
