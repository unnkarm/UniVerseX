import { useState, useEffect } from 'react'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsStrip from './components/StatsStrip'
import Features from './components/Features'
import SwipeDemo from './components/SwipeDemo'
import MLSection from './components/MLSection'
import HowItWorks from './components/HowItWorks'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import OnboardingPage from './components/Onboarding'
import useReveal from './components/useReveal'
import SwipeDiscover from './components/SwipeDiscover'

// Reactive hash router — responds to link clicks AND browser back/forward
function usePage() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  return hash === '#/onboarding' ? 'onboarding' : 'home'
}

export default function App() {
  const page = usePage()
  useReveal()

  if (page === 'onboarding') {
    return (
      <>
        <Cursor />
        <ScrollProgress />
        <OnboardingPage />
        <SwipeDiscover />

      </>
    )
  }

  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <StatsStrip />
      <Features />
      <SwipeDemo />
      <MLSection />
      <HowItWorks />
      <CTASection />
      <Footer />

    </>
  )
}
