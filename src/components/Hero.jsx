export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-grid-bg" />
      <div className="hero-orb orb-1" />
      <div className="hero-orb orb-2" />
      <div className="hero-orb orb-3" />

      <div className="hero-eyebrow">
        <div className="eyebrow-dot" />
        <span className="eyebrow-text">Campus Life OS · Beta 2025</span>
        <div className="eyebrow-line" />
      </div>

      <h1 className="hero-headline">
        <span className="line-1">YOUR COLLEGE</span>
        <span className="line-2">
          <span className="headline-accent">UNIVERSE,</span>
        </span>
        <span className="line-3">UNLOCKED.</span>
      </h1>

      <p className="hero-sub">
        Discover clubs, events, and hackathons built for you. Connect with
        collaborators. Build your campus portfolio — all in one intelligent
        platform.
      </p>

      <div className="hero-ctas">
        <a href="#/onboarding" className="btn-primary">Start for Free →</a>
        <a href="#demo" className="btn-ghost">
          See how it works
          <span className="arrow">→</span>
        </a>
      </div>
    </section>
  )
}
