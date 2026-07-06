import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

const STATS: { to: number; suffix: string; decimals?: number; label: string }[] = [
  { to: 500, suffix: '+', label: 'gyms & studios supplied' },
  { to: 2.4, suffix: 'M', decimals: 1, label: 'açaí bowls served / year' },
  { to: 48, suffix: 'h', label: 'frozen delivery lead time' },
  { to: 99, suffix: '%', label: 'on-time cold-chain delivery' },
]

function Counter({ to, suffix, decimals = 0 }: { to: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => setValue(v),
    })
    return () => controls.stop()
  }, [inView, to])

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export default function Counters() {
  return (
    <section className="relative border-y border-white/10 py-20">
      <div className="mx-auto grid w-[90%] max-w-[1700px] grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 md:divide-x md:divide-white/10">
        {STATS.map((s, i) => (
          <div key={s.label} className={i === 0 ? '' : 'md:pl-8'}>
            <div
              className={`font-display font-bold text-gradient-lime ${
                i === 0 ? 'text-6xl sm:text-7xl' : 'text-4xl sm:text-5xl'
              }`}
            >
              <Counter to={s.to} suffix={s.suffix} decimals={s.decimals} />
            </div>
            <p className="mt-3 text-xs uppercase tracking-widest text-acai-300">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
