import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMail, HiOutlinePhone, HiOutlineClock, HiCheckCircle } from 'react-icons/hi'
import Kicker from './Kicker'

const BUSINESS_TYPES = [
  'Ice Cream Shop',
  'Gym / Fitness Studio',
  'Café / Juice Bar',
  'Distributor',
  'Reseller',
  'Natural Products Company',
  'Specialty Market',
  'Health Food Chain',
  'Importer',
  'Other',
]

const VOLUMES = ['Under 1 pallet/mo', '1–5 pallets/mo', '1 container/mo', '2+ containers/mo']

const PRODUCTS_OF_INTEREST = [
  'Pure Açaí Pulp',
  'Açaí + Guaraná',
  'Açaí + Banana',
  'Not sure yet — need guidance',
]

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
    <section id="contact" className="relative bg-paper py-24">
      <div className="mx-auto w-[90%] max-w-[1400px]">
        <div className="grid gap-16 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Kicker index="07" label="Get In Touch" tone="light" />
            <h2 className="mt-6 font-display text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
              Let's bring açaí to <span className="text-acai-700">your market.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              Tell us about your business, country, and volume — an export
              specialist replies within one business day with pricing and samples.
            </p>

            <div className="mt-10 space-y-5">
              {[
                { icon: HiOutlineMail, label: 'export@nativeforest.com' },
                { icon: HiOutlinePhone, label: 'WhatsApp +55 91 98765-4321' },
                { icon: HiOutlineClock, label: 'Replies within 1 business day' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-sm text-ink-soft">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-paper-dim text-acai-700">
                    <Icon />
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-xl border border-ink/10 bg-paper-dim p-8 shadow-sm lg:col-span-3 md:p-10"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
                    className="text-6xl text-forest-600"
                  >
                    <HiCheckCircle />
                  </motion.div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-ink">Request received</h3>
                  <p className="mt-3 max-w-sm text-sm text-ink-soft">
                    An export specialist will reach out within one business day with pricing and next steps.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-sm font-semibold text-acai-700 underline decoration-acai-700/30 underline-offset-8 transition hover:decoration-acai-700"
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
                  <Field label="WhatsApp" name="whatsapp" type="tel" />
                  <Field label="Country" name="country" required />
                  <Select label="Business type" name="businessType" options={BUSINESS_TYPES} />

                  <Select label="Product of interest" name="product" options={PRODUCTS_OF_INTEREST} />
                  <Select label="Estimated monthly volume" name="volume" options={VOLUMES} />

                  <label className="sm:col-span-2">
                    <span className="mb-1.5 block text-xs font-medium text-ink-soft">Tell us about your needs</span>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Formats you're interested in, target launch date, current supplier, etc."
                      className="w-full rounded-md border border-ink/15 bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-acai-700/60 focus:outline-none"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="sm:col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-acai-700 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-acai-800 disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === 'loading' ? 'Sending…' : 'Request a Quote'}
                  </button>
                  <p className="sm:col-span-2 text-center text-xs text-ink-soft/70">
                    No spam. We only use this to follow up on your export request.
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
      <span className="mb-1.5 block text-xs font-medium text-ink-soft">
        {label}
        {required && <span className="text-acai-700"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-ink/15 bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-acai-700/60 focus:outline-none"
      />
    </label>
  )
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label>
      <span className="mb-1.5 block text-xs font-medium text-ink-soft">{label}</span>
      <select
        name={name}
        defaultValue=""
        className="w-full appearance-none rounded-md border border-ink/15 bg-paper px-4 py-3 text-sm text-ink focus:border-acai-700/60 focus:outline-none"
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
