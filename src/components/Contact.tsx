import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMail, HiOutlinePhone, HiOutlineClock, HiCheckCircle } from 'react-icons/hi'
import Kicker from './Kicker'
import MagneticButton from './MagneticButton'
import BerryBurst from './BerryBurst'

const BUSINESS_TYPES = [
  'Gym / Fitness Studio',
  'Juice or Smoothie Bar',
  'Sports Nutrition Brand',
  'Distributor / Retailer',
  'Other',
]

const VOLUMES = ['Under 200 units/mo', '200–1,000 units/mo', '1,000–5,000 units/mo', '5,000+ units/mo']

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    await new Promise((r) => setTimeout(r, 1100))
    form.reset()
    setStatus('success')
  }

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto w-[90%] max-w-[1700px]">
        <div className="grid gap-16 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Kicker index="06" label="Get In Touch" />
            <h2 className="mt-6 font-serif text-4xl italic leading-[1.1] text-white sm:text-5xl">
              Let's get açaí on <span className="not-italic font-display font-bold text-gradient-lime">your menu.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-acai-300">
              Tell us about your business and volume — a wholesale specialist replies
              within one business day with pricing and sample availability.
            </p>

            <div className="mt-10 space-y-5">
              {[
                { icon: HiOutlineMail, label: 'wholesale@acaifuel.com' },
                { icon: HiOutlinePhone, label: '+1 (305) 555-0182' },
                { icon: HiOutlineClock, label: 'Replies within 1 business day' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-sm text-acai-300">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-acai-900/60 text-lime-300">
                    <Icon />
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-acai-900/60 p-8 backdrop-blur-sm lg:col-span-3 md:p-10"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <BerryBurst />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
                    className="text-6xl text-lime-300"
                  >
                    <HiCheckCircle />
                  </motion.div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-white">Request received</h3>
                  <p className="mt-3 max-w-sm text-sm text-acai-300">
                    A wholesale specialist will reach out within one business day with pricing and next steps.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-sm font-semibold text-white/80 underline decoration-white/20 underline-offset-8 transition hover:text-lime-300 hover:decoration-lime-300"
                  >
                    Send another request
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <Field label="Full name" name="name" required />
                  <Field label="Work email" name="email" type="email" required />
                  <Field label="Company name" name="company" required />
                  <Field label="Phone" name="phone" type="tel" />

                  <Select label="Business type" name="businessType" options={BUSINESS_TYPES} />
                  <Select label="Estimated monthly volume" name="volume" options={VOLUMES} />

                  <label className="sm:col-span-2">
                    <span className="mb-1.5 block text-xs font-medium text-acai-300">Tell us about your needs</span>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Formats you're interested in, target launch date, current supplier, etc."
                      className="w-full rounded-md border border-white/10 bg-acai-950/60 px-4 py-3 text-sm text-white placeholder:text-acai-300/50 focus:border-lime-400/50 focus:outline-none"
                    />
                  </label>

                  <MagneticButton
                    type="submit"
                    disabled={status === 'loading'}
                    className="group sm:col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-lime-400 px-7 py-3.5 text-sm font-semibold text-acai-950 shadow-[0_0_30px_rgba(198,255,61,0.35)] transition hover:bg-lime-300 disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === 'loading' ? 'Sending…' : 'Request Wholesale Pricing'}
                    {status !== 'loading' && (
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    )}
                  </MagneticButton>
                  <p className="sm:col-span-2 text-center text-xs text-acai-300/60">
                    No spam. We only use this to follow up on your wholesale request.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <label>
      <span className="mb-1.5 block text-xs font-medium text-acai-300">
        {label}
        {required && <span className="text-lime-300"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-white/10 bg-acai-950/60 px-4 py-3 text-sm text-white placeholder:text-acai-300/50 focus:border-lime-400/50 focus:outline-none"
      />
    </label>
  )
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label>
      <span className="mb-1.5 block text-xs font-medium text-acai-300">{label}</span>
      <select
        name={name}
        defaultValue=""
        className="w-full appearance-none rounded-md border border-white/10 bg-acai-950/60 px-4 py-3 text-sm text-white focus:border-lime-400/50 focus:outline-none"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}
