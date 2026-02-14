const STATS = [
  { num: '12', suffix: 'K+', label: 'Students Onboarded' },
  { num: '340', suffix: '+', label: 'Campus Clubs Listed' },
  { num: '98', suffix: '%', label: 'Match Satisfaction' },
  { num: '50', suffix: '+', label: 'Partner Universities' },
]

export default function StatsStrip() {
  return (
    <div className="stats-strip">
      {STATS.map((s) => (
        <div className="stat-item" key={s.label}>
          <div className="stat-num">
            {s.num}
            <span>{s.suffix}</span>
          </div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
