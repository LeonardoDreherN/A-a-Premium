import SmoothScroll from './components/SmoothScroll'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import About from './components/About'
import Science from './components/Science'
import Counters from './components/Counters'
import Products from './components/Products'
import B2B from './components/B2B'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Science />
        <Counters />
        <Products />
        <B2B />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  )
}

export default App
