import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <a href="#" className="nav-logo">UniVerse</a>
      <ul className="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#demo">How It Works</a></li>
        <li><a href="#ml">Intelligence</a></li>
        <li><a href="#cta">Join Beta</a></li>
        <li><a href="#/swipe-discover">Swipe Discover</a></li>
      </ul>
      <a href="#/onboarding" className="nav-cta">Get Early Access</a>
    </nav>
  )
}
