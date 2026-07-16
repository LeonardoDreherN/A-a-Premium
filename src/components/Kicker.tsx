export default function Kicker({
  index,
  label,
  tone = 'dark',
}: {
  index: string
  label: string
  tone?: 'dark' | 'light'
}) {
  const dark = tone === 'dark'
  return (
    <div
      className={`flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.22em] ${
        dark ? 'text-white/45' : 'text-ink/45'
      }`}
    >
      <span className={dark ? 'text-lime-300' : 'text-forest-600'}>§ {index}</span>
      <span className="h-px w-8 bg-current opacity-40" />
      {label}
    </div>
  )
}
