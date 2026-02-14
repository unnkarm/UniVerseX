import { useRef, useState } from 'react'

const CARDS = [
  {
    badge: 'Club · 98% Match',
    emoji: '🚀',
    title: 'AI / ML Research Club',
    meta: '42 members · Meets Thursdays · Engineering',
    tags: ['Python', 'NLP', 'Computer Vision', 'Research'],
  },
  {
    badge: 'Hackathon',
    emoji: '💡',
    title: 'HackMIT 2025',
    meta: '500+ participants · Oct 12-14 · MIT Campus',
    tags: ['Prizes', 'Networking', 'Mentors'],
  },
  {
    badge: 'Club',
    emoji: '🎨',
    title: 'Design Guild',
    meta: '28 members · Meets Wednesdays · Arts Building',
    tags: ['UI/UX', 'Figma', 'Branding'],
  },
]

export default function SwipeDemo() {
  const [cardIndex, setCardIndex] = useState(0)
  const [swipeClass, setSwipeClass] = useState('')
  const startX = useRef(0)
  const isDragging = useRef(false)

  const current = CARDS[cardIndex % CARDS.length]
  const next = CARDS[(cardIndex + 1) % CARDS.length]
  const afterNext = CARDS[(cardIndex + 2) % CARDS.length]

  const triggerSwipe = (dir) => {
    if (swipeClass) return
    setSwipeClass(dir > 0 ? 'swiping-right' : 'swiping-left')
    setTimeout(() => {
      setCardIndex((prev) => prev + 1)
      setSwipeClass('')
    }, 450)
  }

  const onMouseDown = (e) => {
    startX.current = e.clientX
    isDragging.current = true
  }

  const onMouseUp = (e) => {
    if (!isDragging.current) return
    isDragging.current = false
    const diff = e.clientX - startX.current
    if (Math.abs(diff) > 50) triggerSwipe(diff)
  }

  return (
    <section style={{ padding: '140px 60px' }}>
      <div id="demo">
        <div style={{ position: 'relative' }}>
          {/* Card stack */}
          <div className="demo-stack reveal">
            {/* Back card */}
            <div className="swipe-card sc-back">
              <div className="card-inner" style={{ opacity: 0.4 }}>
                <div className="card-badge">Club</div>
                <div className="card-emoji">{afterNext.emoji}</div>
                <div className="card-title">{afterNext.title}</div>
              </div>
            </div>

            {/* Mid card */}
            <div className="swipe-card sc-mid">
              <div className="card-inner" style={{ opacity: 0.6 }}>
                <div className="card-badge">{next.badge}</div>
                <div className="card-emoji">{next.emoji}</div>
                <div className="card-title">{next.title}</div>
              </div>
            </div>

            {/* Front card — draggable */}
            <div
              className={`swipe-card sc-front ${swipeClass}`}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              onMouseLeave={(e) => {
                if (isDragging.current) onMouseUp(e)
              }}
            >
              <div className="card-inner">
                <div className="card-badge">{current.badge}</div>
                <div className="card-emoji">{current.emoji}</div>
                <div className="card-title">{current.title}</div>
                <div className="card-meta">{current.meta}</div>
                <div className="card-tags">
                  {current.tags.map((t) => (
                    <span className="card-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="swipe-actions reveal reveal-delay-2">
            <button
              className="swipe-btn swipe-no"
              onClick={() => triggerSwipe(-1)}
            >
              ✕
            </button>
            <button className="swipe-btn swipe-save">🔖</button>
            <button
              className="swipe-btn swipe-yes"
              style={{ fontSize: '24px' }}
              onClick={() => triggerSwipe(1)}
            >
              ❤
            </button>
          </div>
        </div>

        {/* Copy */}
        <div className="demo-content">
          <div className="section-label reveal">Swipe Interface</div>
          <h2 className="section-title reveal reveal-delay-1">
            DISCOVER THE RIGHT FIT, FAST.
          </h2>
          <p className="reveal reveal-delay-2">
            Stop scrolling through irrelevant club announcements. UniVerse shows
            you what's aligned with your interests, skills, and ambitions.
          </p>
          <p className="reveal reveal-delay-3">
            The more you interact, the sharper the recommendations get. Like a
            feed that actually knows you.
          </p>
          <ul className="demo-bullets">
            {[
              'Swipe cards for clubs, events, hackathons, and teammates',
              'ML tracks your preferences and refines suggestions over time',
              'Save anything to your smart calendar with one tap',
              'Every swipe builds your campus portfolio automatically',
            ].map((text, i) => (
              <li className={`reveal reveal-delay-${i + 3}`} key={text}>
                <div className="bullet-dot" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
