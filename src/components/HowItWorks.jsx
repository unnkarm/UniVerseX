const STEPS = [
  {
    num: '01',
    icon: '✍️',
    title: 'Sign Up & Onboard',
    desc: 'Select interests, skills, and build your starter profile in under 3 minutes.',
  },
  {
    num: '02',
    icon: '🃏',
    title: 'Swipe & Discover',
    desc: 'Browse curated clubs, events, and hackathons. Swipe to join or save.',
  },
  {
    num: '03',
    icon: '📅',
    title: 'Smart Calendar',
    desc: 'Activities auto-populate. Track everything from one intelligent calendar.',
  },
  {
    num: '04',
    icon: '⚡',
    title: 'Build Your Team',
    desc: 'Generate hackathon ideas and get matched with the perfect collaborators.',
  },
  {
    num: '05',
    icon: '🏆',
    title: 'Grow Your Portfolio',
    desc: 'Every activity adds to your verified campus profile automatically.',
  },
  {
    num: '06',
    icon: '🔁',
    title: 'AI Gets Smarter',
    desc: 'The more you engage, the more personalized your entire experience becomes.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how">
      <div className="section-label reveal">Workflow</div>
      <h2 className="section-title reveal reveal-delay-1">
        SIX STEPS TO YOUR BEST COLLEGE EXPERIENCE
      </h2>

      <div className="how-steps">
        {STEPS.map((s, i) => (
          <div
            className={`step-item reveal reveal-delay-${i + 1}`}
            key={s.num}
          >
            <div className="step-num">{s.num}</div>
            <div className="step-icon">{s.icon}</div>
            <div className="step-title">{s.title}</div>
            <p className="step-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
