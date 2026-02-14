import { useState } from 'react'

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setEmail('')
    }, 3000)
  }

  return (
    <section id="cta">
      <div className="cta-orb" />
      <div className="cta-eyebrow reveal">
        Join 12,000+ students already on the waitlist
      </div>
      <h2 className="cta-title reveal reveal-delay-1">
        YOUR UNIVERSE
        <br />
        <span className="headline-accent">STARTS NOW.</span>
      </h2>
      <p className="cta-sub reveal reveal-delay-2">
        Be among the first to unlock a smarter, more connected college
        experience. Early access is free.
      </p>

      <div className="reveal reveal-delay-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        {/* Primary CTA — goes straight to onboarding */}
        <a href="#/onboarding" className="btn-primary" style={{ fontSize: '16px', padding: '18px 48px' }}>
          🚀 Start Onboarding — It's Free
        </a>

        {/* Secondary — email waitlist */}
        <form className="email-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Or enter your .edu email for waitlist"
            required
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className={submitted ? 'submitted' : ''}
          >
            {submitted ? "✓ You're on the list!" : 'Join Waitlist'}
          </button>
        </form>
      </div>

      <p className="cta-fine-print reveal reveal-delay-4">
        No spam. Unsubscribe anytime. Free during beta.
      </p>
    </section>
  )
}
