export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-acai-950 py-12">
      <div className="mx-auto flex w-[90%] max-w-[1400px] flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-2 font-display text-lg font-semibold text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-acai-400 to-acai-700 text-lime-300">
            🫐
          </span>
          NATIVE&nbsp;<span className="text-gradient-lime">FOREST</span>
        </div>

        <p className="max-w-md text-xs leading-relaxed text-acai-300/70">
          Premium açaí pulp exported from Brazil — pure, açaí + guaraná, and açaí +
          banana, in bulk bags and aseptic packs for distributors and retailers worldwide.
        </p>

        <div className="flex gap-6 text-xs text-acai-300">
          <a href="#about" className="hover:text-lime-300">About</a>
          <a href="#products" className="hover:text-lime-300">Products</a>
          <a href="#b2b" className="hover:text-lime-300">B2B</a>
          <a href="#contact" className="hover:text-lime-300">Contact</a>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center gap-2 text-center text-xs text-acai-300/40">
        <p>© {new Date().getFullYear()} NativeForest. All rights reserved.</p>
        <p>Privacy Policy &amp; Cookies (LGPD/GDPR compliant) — coming soon.</p>
      </div>
    </footer>
  )
}
