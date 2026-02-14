const FEATURES = [
  {
    icon: '🃏',
    iconClass: 'fi-1',
    num: '01 / 06',
    title: 'Swipe-Based Discovery',
    desc: 'Tinder-style matching for clubs, events, and hackathons. Swipe right to join or save. The more you swipe, the smarter it gets.',
    tag: 'ML-Powered',
  },
  {
    icon: '🎯',
    iconClass: 'fi-2',
    num: '02 / 06',
    title: 'Club & Event Feed',
    desc: 'Personalized campus feed ranked by your interests, skills, and past activity. Never miss what matters to you again.',
    tag: 'Personalized',
  },
  {
    icon: '⚡',
    iconClass: 'fi-3',
    num: '03 / 06',
    title: 'Hackathon Builder',
    desc: 'Generate ideas, find optimal teammates, and collaborate in a built-in team room with chat, tasks, and file sharing.',
    tag: 'Team Match',
  },
  {
    icon: '📆',
    iconClass: 'fi-4',
    num: '04 / 06',
    title: 'Smart Calendar',
    desc: 'Integrated scheduling that auto-populates events, deadlines, and club meetings. Keep everything in sync, effortlessly.',
    tag: 'Integrated',
  },
  {
    icon: '🏆',
    iconClass: 'fi-5',
    num: '05 / 06',
    title: 'Campus Portfolio',
    desc: 'Showcase your clubs, hackathons, events, and roles. Build a verified extracurricular profile that stands out.',
    tag: 'Verified',
  },
  {
    icon: '🧠',
    iconClass: 'fi-6',
    num: '06 / 06',
    title: 'AI Recommendations',
    desc: 'Engagement prediction, skill-based matching, and a feed that evolves the more you interact with it. Built to get better.',
    tag: 'Evolving',
  },
]

export default function Features() {
  return (
    <section id="features">
      <div className="features-header reveal">
        <div>
          <div className="section-label">Core Features</div>
          <h2 className="section-title">EVERYTHING YOU NEED TO THRIVE</h2>
        </div>
        <p className="features-intro">
          UniVerse brings together the fragmented pieces of campus life —
          discovery, collaboration, and achievement — into one seamlessly
          personalized experience.
        </p>
      </div>

      <div className="features-grid">
        {FEATURES.map((f, i) => (
          <div
            className={`feature-card reveal reveal-delay-${i + 1}`}
            key={f.title}
          >
            <div className={`feature-icon ${f.iconClass}`}>{f.icon}</div>
            <div className="feature-num">{f.num}</div>
            <div className="feature-title">{f.title}</div>
            <p className="feature-desc">{f.desc}</p>
            <span className="feature-tag">{f.tag}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
