const ML_FEATURES = [
  {
    icon: '🎯',
    title: 'Interest-Based Matching',
    desc: 'Learns from your swipes, joins, and activity to surface clubs and events that align with your evolving interests.',
  },
  {
    icon: '🤝',
    title: 'Skill-Based Team Building',
    desc: 'Analyzes skill gaps and complements to suggest the optimal hackathon teammates for any project idea.',
  },
  {
    icon: '📈',
    title: 'Engagement Prediction',
    desc: "Predicts which events you'll actually attend and enjoy — and prioritizes those in your feed and calendar.",
  },
  {
    icon: '🔄',
    title: 'Continuous Learning',
    desc: 'Your feed and recommendations evolve with you semester to semester. UniVerse grows as you grow.',
  },
]

export default function MLSection() {
  return (
    <section id="ml">
      <div className="section-label reveal">Intelligence Layer</div>
      <h2 className="section-title reveal reveal-delay-1">
        MACHINE LEARNING THAT ACTUALLY UNDERSTANDS YOU
      </h2>

      <div className="ml-grid">
        {/* Node map visual */}
        <div className="reveal reveal-delay-2">
          <div className="ml-node-map">
            <svg
              className="ml-conn"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <line x1="50" y1="50" x2="15" y2="18" className="active" />
              <line x1="50" y1="50" x2="82" y2="12" className="active" />
              <line x1="50" y1="50" x2="10" y2="55" />
              <line x1="50" y1="50" x2="33" y2="88" className="active" />
              <line x1="50" y1="50" x2="88" y2="22" />
              <line x1="50" y1="50" x2="85" y2="80" />
              <line x1="15" y1="18" x2="82" y2="12" />
              <line x1="10" y1="55" x2="33" y2="88" />
            </svg>
            <div className="ml-node n-center">🧠</div>
            <div className="ml-node n-sm n-a">🎯</div>
            <div className="ml-node n-sm n-b">👤</div>
            <div className="ml-node n-sm n-c">📅</div>
            <div className="ml-node n-sm n-d">⚡</div>
            <div className="ml-node n-sm n-e">🏆</div>
            <div className="ml-node n-sm n-f">🤝</div>
          </div>
        </div>

        {/* Feature list */}
        <div className="ml-features">
          {ML_FEATURES.map((f, i) => (
            <div
              className={`ml-feature-item reveal reveal-delay-${i + 2}`}
              key={f.title}
            >
              <div className="ml-feat-icon">{f.icon}</div>
              <div>
                <div className="ml-feat-title">{f.title}</div>
                <p className="ml-feat-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
