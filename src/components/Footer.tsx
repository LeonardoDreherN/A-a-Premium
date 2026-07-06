export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-acai-950 py-12">
      <div className="mx-auto flex w-[90%] max-w-[1700px] flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-2 font-display text-lg font-semibold text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-acai-400 to-acai-700 text-lime-300">
            🫐
          </span>
          AÇAÍ&nbsp;<span className="text-gradient-lime">FUEL</span>
        </div>

        <p className="max-w-md text-xs leading-relaxed text-acai-300/70">
          Wholesale açaí purée and post-workout bowls for gyms, studios, and sports
          nutrition brands. Cold-chain shipped, formulated for recovery.
        </p>

        <div className="flex gap-6 text-xs text-acai-300">
          <a href="#products" className="hover:text-lime-300">Wholesale</a>
          <a href="#process" className="hover:text-lime-300">Process</a>
          <a href="#contact" className="hover:text-lime-300">Contact</a>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-acai-300/40">
        © {new Date().getFullYear()} Açaí Fuel. All rights reserved.
      </p>
    </footer>
  )
}
