import { useEffect, useState } from 'react'
import SmoothScroll from './components/SmoothScroll'
import CustomCursor from './components/CustomCursor'
import CinematicIntro from './components/CinematicIntro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FallingBerries from './components/FallingBerries'
import Marquee from './components/Marquee'
import TrustBar from './components/TrustBar'
import DivePortal from './components/DivePortal'
import Science from './components/Science'
import Counters from './components/Counters'
import Products from './components/Products'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [introDone, setIntroDone] = useState(false)

  useEffect(() => {
    document.documentElement.style.overflow = introDone ? '' : 'hidden'
  }, [introDone])

  return (
    <SmoothScroll>
      <CustomCursor />
      {!introDone && <CinematicIntro onDone={() => setIntroDone(true)} />}
      <div className="relative bg-grain">
        <FallingBerries />
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero introDone={introDone} />
            <Marquee />
            <TrustBar />
            <DivePortal />
            <Science />
            <Counters />
            <Products />
            <Process />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  )
}

export default App
