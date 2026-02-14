import { useState, useRef, useEffect, useCallback } from 'react'
import './SwipeDiscover.css'

// ─── CARD DATA ───────────────────────────────────────────
const CARDS = [
    {
        id: 1, emoji: '🚀', match: 97,
        badge: 'Club', badgeColor: 'blue',
        name: 'AI / ML Research Lab',
        desc: 'Weekly paper readings, model builds, and Kaggle battles. We ship real research.',
        members: 42, tags: ['Python', 'NLP', 'Deep Learning'],
        ai: 97, category: 'Research',
        gradient: 'linear-gradient(135deg,#0f1729 0%,#1a2140 100%)',
        accent: '#4F6EF7',
    },
    {
        id: 2, emoji: '⚡', match: 91,
        badge: 'Hackathon', badgeColor: 'orange',
        name: 'HackMIT 2025',
        desc: '36-hour sprint. $50K in prizes. 1,200 hackers from 200 schools. Build something insane.',
        members: 1200, tags: ['Prizes', 'Mentors', 'Networking'],
        ai: 91, category: 'Hackathon',
        gradient: 'linear-gradient(135deg,#1a1000 0%,#2a1a00 100%)',
        accent: '#E8643A',
    },
    {
        id: 3, emoji: '🎨', match: 88,
        badge: 'Club', badgeColor: 'purple',
        name: 'Design Systems Guild',
        desc: 'Figma jams, design crits, and building real UI for student-led startups on campus.',
        members: 28, tags: ['Figma', 'UI/UX', 'Branding'],
        ai: 88, category: 'Design',
        gradient: 'linear-gradient(135deg,#120d1a 0%,#1e1230 100%)',
        accent: '#7C3AED',
    },
    {
        id: 4, emoji: '📈', match: 84,
        badge: 'Club', badgeColor: 'green',
        name: 'Quant Finance Society',
        desc: 'Options, algo-trading, and portfolio theory. Weekly market analysis sessions.',
        members: 65, tags: ['Python', 'Finance', 'Statistics'],
        ai: 84, category: 'Finance',
        gradient: 'linear-gradient(135deg,#001a0d 0%,#002a14 100%)',
        accent: '#22c55e',
    },
    {
        id: 5, emoji: '🤖', match: 79,
        badge: 'Event', badgeColor: 'blue',
        name: 'Robotics Showcase 2025',
        desc: "Annual showcase of student-built bots. Compete or just come see what's possible.",
        members: 300, tags: ['Hardware', 'ROS', 'Computer Vision'],
        ai: 79, category: 'Robotics',
        gradient: 'linear-gradient(135deg,#0d1117 0%,#161b22 100%)',
        accent: '#4F6EF7',
    },
    {
        id: 6, emoji: '🔬', match: 93,
        badge: 'Research', badgeColor: 'teal',
        name: 'Computational Biology Lab',
        desc: 'Protein folding, genomics, and ML for drug discovery. Advisors from top biotech firms.',
        members: 18, tags: ['Python', 'Biology', 'ML'],
        ai: 93, category: 'Research',
        gradient: 'linear-gradient(135deg,#001a18 0%,#002825 100%)',
        accent: '#14b8a6',
    },
    {
        id: 7, emoji: '🌐', match: 82,
        badge: 'Club', badgeColor: 'orange',
        name: 'Open Source Collective',
        desc: 'Ship real PRs to real projects. Maintainers from Mozilla, Linux Foundation, and more.',
        members: 91, tags: ['Git', 'OSS', 'Web Dev'],
        ai: 82, category: 'Dev',
        gradient: 'linear-gradient(135deg,#1a0f00 0%,#2a1800 100%)',
        accent: '#f97316',
    },
    {
        id: 8, emoji: '🎤', match: 76,
        badge: 'Club', badgeColor: 'purple',
        name: 'Founders & Speakers Circle',
        desc: 'Monthly fireside chats with founders, VCs, and operators. Pitch your startup idea.',
        members: 110, tags: ['Startups', 'VC', 'Speaking'],
        ai: 76, category: 'Startup',
        gradient: 'linear-gradient(135deg,#150a1e 0%,#1e1030 100%)',
        accent: '#a855f7',
    },
]

const BADGE_COLORS = {
    blue: { bg: 'rgba(79,110,247,.15)', text: '#7B9FFF', border: 'rgba(79,110,247,.3)' },
    orange: { bg: 'rgba(232,100,58,.15)', text: '#F4924A', border: 'rgba(232,100,58,.3)' },
    purple: { bg: 'rgba(124,58,237,.15)', text: '#A67AFF', border: 'rgba(124,58,237,.3)' },
    green: { bg: 'rgba(34,197,94,.15)', text: '#4ade80', border: 'rgba(34,197,94,.3)' },
    teal: { bg: 'rgba(20,184,166,.15)', text: '#2dd4bf', border: 'rgba(20,184,166,.3)' },
}

// ─── CONFETTI BURST ──────────────────────────────────────
function spawnConfetti(container) {
    const colors = ['#4F6EF7', '#7C3AED', '#E8643A', '#22c55e', '#f59e0b', '#ec4899', '#06b6d4']
    for (let i = 0; i < 38; i++) {
        const p = document.createElement('div')
        p.className = 'sd-confetti-piece'
        const angle = (Math.random() * 360) * (Math.PI / 180)
        const dist = 80 + Math.random() * 220
        const size = 5 + Math.random() * 9
        const rot = Math.random() * 720 - 360
        p.style.cssText = `
      width:${size}px; height:${size * (Math.random() > .5 ? 1 : 2.5)}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:${Math.random() > .5 ? '50%' : '3px'};
      --dx:${(Math.cos(angle) * dist).toFixed(1)}px;
      --dy:${(Math.sin(angle) * dist - 60).toFixed(1)}px;
      --rot:${rot}deg;
      animation: sdConfettiBurst ${.6 + Math.random() * .5}s cubic-bezier(.2,1,.4,1) ${Math.random() * .15}s forwards;
    `
        container.appendChild(p)
        setTimeout(() => p.remove(), 1100)
    }
}

// ─── SWIPE CARD ──────────────────────────────────────────
function SwipeCard({ card, isTop, onSwipe, dragState }) {
    const cardRef = useRef(null)
    const startRef = useRef({ x: 0, y: 0, time: 0 })
    const currentRef = useRef({ x: 0, y: 0 })
    const isDragging = useRef(false)
    const rafRef = useRef(null)
    const confettiRef = useRef(null)

    const [localDrag, setLocalDrag] = useState({ x: 0, y: 0, active: false })
    const [swipeDir, setSwipeDir] = useState(null) // 'left' | 'right' | null

    const THRESHOLD = 110

    const updateTransform = useCallback(() => {
        if (!cardRef.current) return
        const { x, y } = currentRef.current
        const rot = x * 0.04
        const tilt = Math.min(Math.abs(x) / 200, 1)
        cardRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`
        setLocalDrag({ x, y, active: isDragging.current })

        // Overlay tint feedback
        const overlay = cardRef.current.querySelector('.sd-card-overlay')
        if (overlay) {
            if (x > 20) {
                overlay.style.background = `rgba(79,110,247,${Math.min(x / 300, .45)})`
                overlay.querySelector('.sd-ol-icon').textContent = '❤️'
                overlay.style.opacity = '1'
            } else if (x < -20) {
                overlay.style.background = `rgba(239,68,68,${Math.min(Math.abs(x) / 300, .45)})`
                overlay.querySelector('.sd-ol-icon').textContent = '✕'
                overlay.style.opacity = '1'
            } else {
                overlay.style.opacity = '0'
            }
        }
    }, [])

    const onPointerDown = useCallback((e) => {
        if (!isTop) return
        isDragging.current = true
        startRef.current = { x: e.clientX, y: e.clientY, time: Date.now() }
        cardRef.current?.setPointerCapture(e.pointerId)
        e.preventDefault()
    }, [isTop])

    const onPointerMove = useCallback((e) => {
        if (!isDragging.current) return
        currentRef.current = {
            x: e.clientX - startRef.current.x,
            y: e.clientY - startRef.current.y,
        }
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(updateTransform)
    }, [updateTransform])

    const onPointerUp = useCallback((e) => {
        if (!isDragging.current) return
        isDragging.current = false
        const { x, y } = currentRef.current
        const velocity = Math.abs(x) / Math.max(1, Date.now() - startRef.current.time) * 1000

        if (Math.abs(x) > THRESHOLD || velocity > 600) {
            const dir = x > 0 ? 'right' : 'left'
            setSwipeDir(dir)
            if (dir === 'right' && confettiRef.current) {
                spawnConfetti(confettiRef.current)
            }
            setTimeout(() => onSwipe(card.id, dir), 420)
        } else {
            // Snap back
            if (cardRef.current) {
                cardRef.current.style.transition = 'transform .45s cubic-bezier(.34,1.56,.64,1)'
                cardRef.current.style.transform = 'translate(0,0) rotate(0deg)'
                const overlay = cardRef.current.querySelector('.sd-card-overlay')
                if (overlay) overlay.style.opacity = '0'
                setTimeout(() => {
                    if (cardRef.current) cardRef.current.style.transition = ''
                }, 450)
            }
            currentRef.current = { x: 0, y: 0 }
            setLocalDrag({ x: 0, y: 0, active: false })
        }
    }, [card.id, onSwipe])

    const triggerSwipe = useCallback((dir) => {
        setSwipeDir(dir)
        if (dir === 'right' && confettiRef.current) {
            spawnConfetti(confettiRef.current)
        }
        setTimeout(() => onSwipe(card.id, dir), 420)
    }, [card.id, onSwipe])

    const bc = BADGE_COLORS[card.badgeColor] || BADGE_COLORS.blue
    const dragPct = isTop ? Math.min(Math.abs(localDrag.x) / THRESHOLD, 1) : 0
    const isRight = localDrag.x > 0
    const isLeft = localDrag.x < 0

    const flyClass = swipeDir === 'right' ? 'sd-fly-right'
        : swipeDir === 'left' ? 'sd-fly-left' : ''

    return (
        <div
            ref={cardRef}
            className={`sd-card ${isTop ? 'sd-card--top' : ''} ${flyClass}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            style={{ background: card.gradient }}
        >
            {/* Confetti anchor */}
            <div ref={confettiRef} className="sd-confetti-anchor" />

            {/* Drag overlay tint */}
            <div className="sd-card-overlay">
                <div className="sd-ol-icon"></div>
            </div>

            {/* Glow accent border */}
            <div className="sd-card-glow" style={{ '--accent': card.accent }} />

            {/* Card content */}
            <div className="sd-card-inner">
                {/* Top row */}
                <div className="sd-card-top">
                    <span className="sd-badge" style={{
                        background: bc.bg, color: bc.text, borderColor: bc.border
                    }}>
                        {card.badge}
                    </span>
                    <span className="sd-ai-badge">
                        <span className="sd-ai-dot" />
                        AI Confidence: {card.ai}%
                    </span>
                </div>

                {/* Emoji */}
                <div className="sd-emoji" style={{ '--accent': card.accent }}>{card.emoji}</div>

                {/* Name */}
                <div className="sd-card-name">{card.name}</div>

                {/* Desc */}
                <p className="sd-card-desc">{card.desc}</p>

                {/* Tags */}
                <div className="sd-card-tags">
                    {card.tags.map(t => (
                        <span key={t} className="sd-tag" style={{ '--accent': card.accent }}>{t}</span>
                    ))}
                </div>

                {/* Match bar */}
                <div className="sd-match-wrap">
                    <div className="sd-match-label">
                        <span>Match Score</span>
                        <span className="sd-match-pct" style={{ color: card.accent }}>{card.match}%</span>
                    </div>
                    <div className="sd-match-track">
                        <div
                            className="sd-match-fill"
                            style={{
                                width: `${card.match}%`,
                                background: `linear-gradient(90deg, ${card.accent}, ${card.accent}cc)`,
                                boxShadow: `0 0 12px ${card.accent}55`,
                            }}
                        />
                    </div>
                </div>

                {/* Members */}
                <div className="sd-meta">
                    <span className="sd-meta-dot" style={{ background: card.accent }} />
                    {card.members.toLocaleString()} members · {card.category}
                </div>
            </div>

            {/* DRAG HINT labels — show when dragging top card */}
            {isTop && localDrag.active && (
                <>
                    <div className="sd-hint-right" style={{ opacity: isRight ? dragPct : 0 }}>LIKE</div>
                    <div className="sd-hint-left" style={{ opacity: isLeft ? dragPct : 0 }}>NOPE</div>
                </>
            )}
        </div>
    )
}

// ─── ACTION BUTTONS ──────────────────────────────────────
function ActionButtons({ onSwipe, onSave, card }) {
    return (
        <div className="sd-actions">
            <button className="sd-action-btn sd-action-nope" onClick={() => onSwipe('left')}
                title="Skip">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M16 6L6 16M6 6l10 10" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
            </button>

            <button className="sd-action-btn sd-action-save" onClick={onSave} title="Save">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 3h10a2 2 0 0 1 2 2v13l-7-3.5L3 18V5a2 2 0 0 1 2-2z"
                        stroke="#eab308" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <button className="sd-action-btn sd-action-like" onClick={() => onSwipe('right')}
                title="Like" style={{ '--accent': card?.accent || '#4F6EF7' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21.5C12 21.5 2 15 2 8.5A5.5 5.5 0 0 1 12 5.5 5.5 5.5 0 0 1 22 8.5C22 15 12 21.5 12 21.5Z"
                        fill="currentColor" />
                </svg>
            </button>

            <button className="sd-action-btn sd-action-boost" onClick={() => onSwipe('right')}
                title="Super Like">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2l2.09 4.26 4.91.71-3.5 3.41.83 4.83L10 12.77l-4.33 2.27.83-4.83L3 6.97l4.91-.71L10 2Z"
                        stroke="#4F6EF7" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    )
}

// ─── SAVED SIDEBAR ───────────────────────────────────────
function SavedPanel({ saved, liked }) {
    return (
        <aside className="sd-sidebar">
            <div className="sd-sidebar-title">
                <span className="sd-sidebar-dot sd-sidebar-dot--like" />
                Liked <span className="sd-sidebar-count">{liked.length}</span>
            </div>
            <div className="sd-sidebar-list">
                {liked.slice(-5).reverse().map(c => (
                    <div key={c.id} className="sd-sidebar-item">
                        <span className="sd-sidebar-emoji">{c.emoji}</span>
                        <div>
                            <div className="sd-sidebar-name">{c.name}</div>
                            <div className="sd-sidebar-match" style={{ color: c.accent }}>{c.match}% match</div>
                        </div>
                    </div>
                ))}
                {liked.length === 0 && <div className="sd-sidebar-empty">Swipe right to like clubs</div>}
            </div>

            <div className="sd-sidebar-title" style={{ marginTop: 24 }}>
                <span className="sd-sidebar-dot sd-sidebar-dot--save" />
                Saved <span className="sd-sidebar-count">{saved.length}</span>
            </div>
            <div className="sd-sidebar-list">
                {saved.slice(-5).reverse().map(c => (
                    <div key={c.id} className="sd-sidebar-item">
                        <span className="sd-sidebar-emoji">{c.emoji}</span>
                        <div>
                            <div className="sd-sidebar-name">{c.name}</div>
                            <div className="sd-sidebar-match">{c.category}</div>
                        </div>
                    </div>
                ))}
                {saved.length === 0 && <div className="sd-sidebar-empty">Tap 🔖 to save for later</div>}
            </div>
        </aside>
    )
}

// ─── EMPTY STATE ─────────────────────────────────────────
function EmptyState({ onReset }) {
    return (
        <div className="sd-empty">
            <div className="sd-empty-icon">✨</div>
            <h3 className="sd-empty-title">You've seen them all!</h3>
            <p className="sd-empty-sub">Our AI is curating more matches for you.</p>
            <button className="sd-empty-btn" onClick={onReset}>Refresh Cards</button>
        </div>
    )
}

// ─── MAIN PAGE ───────────────────────────────────────────
export default function SwipeDiscoverPage() {
    const [deck, setDeck] = useState([...CARDS].reverse())
    const [liked, setLiked] = useState([])
    const [saved, setSaved] = useState([])
    const [skipped, setSkipped] = useState([])
    const [lastAction, setLastAction] = useState(null) // { type, card }
    const [toastMsg, setToastMsg] = useState(null)

    const topCard = deck[deck.length - 1]
    const secondCard = deck[deck.length - 2]
    const thirdCard = deck[deck.length - 3]

    const showToast = (msg) => {
        setToastMsg(msg)
        setTimeout(() => setToastMsg(null), 2200)
    }

    const handleSwipe = useCallback((id, dir) => {
        const card = deck.find(c => c.id === id)
        if (!card) return
        setDeck(prev => prev.filter(c => c.id !== id))
        if (dir === 'right') {
            setLiked(prev => [...prev, card])
            setLastAction({ type: 'like', card })
            showToast(`❤️ Liked "${card.name}"`)
        } else {
            setSkipped(prev => [...prev, card])
            setLastAction({ type: 'skip', card })
        }
    }, [deck])

    const handleSave = useCallback(() => {
        if (!topCard) return
        setSaved(prev => prev.find(c => c.id === topCard.id) ? prev : [...prev, topCard])
        showToast(`🔖 Saved "${topCard.name}"`)
    }, [topCard])

    const handleSwipeButton = useCallback((dir) => {
        if (!topCard) return
        handleSwipe(topCard.id, dir)
    }, [topCard, handleSwipe])

    const handleReset = () => {
        setDeck([...CARDS].reverse())
        setLiked([])
        setSaved([])
        setSkipped([])
    }

    // Keyboard shortcuts
    useEffect(() => {
        const onKey = (e) => {
            if (!topCard) return
            if (e.key === 'ArrowRight') handleSwipeButton('right')
            if (e.key === 'ArrowLeft') handleSwipeButton('left')
            if (e.key === 's' || e.key === 'S') handleSave()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [topCard, handleSwipeButton, handleSave])

    // Stats
    const totalSeen = liked.length + skipped.length + saved.length
    const likeRate = totalSeen > 0 ? Math.round((liked.length / totalSeen) * 100) : 0

    return (
        <div className="sd-root">
            {/* Orbs */}
            <div className="sd-orb sd-orb-1" />
            <div className="sd-orb sd-orb-2" />
            <div className="sd-orb sd-orb-3" />

            {/* Grid overlay */}
            <div className="sd-grid-bg" />

            {/* NAV */}
            <nav className="sd-nav">
                <a href="#" className="nav-logo">UniVerse</a>
                <div className="sd-nav-center">
                    <div className="sd-nav-stat">
                        <span className="sd-nav-stat-num">{liked.length}</span>
                        <span className="sd-nav-stat-label">Liked</span>
                    </div>
                    <div className="sd-nav-divider" />
                    <div className="sd-nav-stat">
                        <span className="sd-nav-stat-num">{deck.length}</span>
                        <span className="sd-nav-stat-label">Remaining</span>
                    </div>
                    <div className="sd-nav-divider" />
                    <div className="sd-nav-stat">
                        <span className="sd-nav-stat-num">{likeRate}%</span>
                        <span className="sd-nav-stat-label">Like Rate</span>
                    </div>
                </div>
                <a href="#" className="nav-back">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Home
                </a>
            </nav>

            {/* HERO HEADLINE */}
            <div className="sd-hero">
                <div className="sd-hero-eyebrow">
                    <div className="sd-eyebrow-dot" />
                    <span className="sd-eyebrow-text">Smart Discovery · {deck.length} matches waiting</span>
                    <div className="sd-eyebrow-line" />
                </div>
                <h1 className="sd-hero-title">
                    DISCOVER WHAT<br /><span className="sd-grad">MOVES YOU.</span>
                </h1>
            </div>

            {/* MAIN LAYOUT */}
            <div className="sd-layout">

                {/* LEFT PANEL — stats */}
                <div className="sd-left-panel">
                    <div className="sd-left-card">
                        <div className="sd-left-label">Session Stats</div>
                        <div className="sd-stat-rows">
                            <div className="sd-stat-row">
                                <span>Seen</span>
                                <span className="sd-stat-val">{totalSeen}</span>
                            </div>
                            <div className="sd-stat-row">
                                <span>Liked</span>
                                <span className="sd-stat-val" style={{ color: '#4F6EF7' }}>{liked.length}</span>
                            </div>
                            <div className="sd-stat-row">
                                <span>Saved</span>
                                <span className="sd-stat-val" style={{ color: '#eab308' }}>{saved.length}</span>
                            </div>
                            <div className="sd-stat-row">
                                <span>Skipped</span>
                                <span className="sd-stat-val" style={{ color: '#ef4444' }}>{skipped.length}</span>
                            </div>
                        </div>

                        <div className="sd-left-label" style={{ marginTop: 24 }}>Avg Match Score</div>
                        <div className="sd-big-pct">
                            {liked.length > 0
                                ? Math.round(liked.reduce((a, c) => a + c.match, 0) / liked.length)
                                : '--'}
                            <span>%</span>
                        </div>

                        <div className="sd-left-label" style={{ marginTop: 24 }}>Current Card</div>
                        {topCard ? (
                            <div className="sd-curr-card">
                                <span className="sd-curr-emoji">{topCard.emoji}</span>
                                <div>
                                    <div className="sd-curr-name">{topCard.name}</div>
                                    <div className="sd-curr-match" style={{ color: topCard.accent }}>{topCard.match}% match</div>
                                </div>
                            </div>
                        ) : (
                            <div className="sd-sidebar-empty">No more cards</div>
                        )}
                    </div>

                    <div className="sd-tip-card">
                        <div className="sd-tip-icon">💡</div>
                        <div className="sd-tip-text">Drag the card or use the buttons below to swipe</div>
                    </div>
                </div>

                {/* CENTER — card stack */}
                <div className="sd-center">
                    <div className="sd-stack-wrap">
                        {deck.length === 0 ? (
                            <EmptyState onReset={handleReset} />
                        ) : (
                            <div className="sd-stack">
                                {/* 3rd from top — barely visible */}
                                {thirdCard && (
                                    <div key={thirdCard.id} className="sd-card sd-card--third"
                                        style={{ background: thirdCard.gradient }}>
                                        <div className="sd-card-inner sd-card-inner--ghost" />
                                    </div>
                                )}
                                {/* 2nd from top */}
                                {secondCard && (
                                    <div key={secondCard.id} className="sd-card sd-card--second"
                                        style={{ background: secondCard.gradient }}>
                                        <div className="sd-card-inner sd-card-inner--ghost">
                                            <div className="sd-card-top">
                                                <span className="sd-badge" style={{
                                                    background: BADGE_COLORS[secondCard.badgeColor]?.bg,
                                                    color: BADGE_COLORS[secondCard.badgeColor]?.text,
                                                    borderColor: BADGE_COLORS[secondCard.badgeColor]?.border,
                                                    opacity: .7,
                                                }}>{secondCard.badge}</span>
                                            </div>
                                            <div className="sd-emoji" style={{ '--accent': secondCard.accent, opacity: .7 }}>
                                                {secondCard.emoji}
                                            </div>
                                            <div className="sd-card-name" style={{ opacity: .6 }}>{secondCard.name}</div>
                                        </div>
                                    </div>
                                )}
                                {/* TOP card — interactive */}
                                {topCard && (
                                    <SwipeCard
                                        key={topCard.id}
                                        card={topCard}
                                        isTop={true}
                                        onSwipe={handleSwipe}
                                    />
                                )}
                            </div>
                        )}
                    </div>

                    {/* ACTION BUTTONS */}
                    {deck.length > 0 && (
                        <ActionButtons
                            onSwipe={handleSwipeButton}
                            onSave={handleSave}
                            card={topCard}
                        />
                    )}

                    {/* Keyboard hint */}
                    <div className="sd-keyboard-hint">
                        <span><kbd>←</kbd> Skip</span>
                        <span><kbd>S</kbd> Save</span>
                        <span><kbd>→</kbd> Like</span>
                    </div>
                </div>

                {/* RIGHT PANEL — saved / liked */}
                <SavedPanel saved={saved} liked={liked} />
            </div>

            {/* TOAST */}
            {toastMsg && (
                <div className="sd-toast">
                    {toastMsg}
                </div>
            )}
        </div>
    )
}