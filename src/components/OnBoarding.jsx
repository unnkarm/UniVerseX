import { useState, useEffect, useRef } from 'react'
import './Onboarding.css'

// ─── DATA ───────────────────────────────────────────────
const INTERESTS = [
    'AI / ML', 'Web Dev', 'Robotics', 'Finance', 'Design', 'Research',
    'Startups', 'Public Speaking', 'Competitive Programming', 'Cybersecurity',
    'Data Science', 'Blockchain', 'Game Dev', 'Bioinformatics', 'Marketing',
    'Open Source', 'IoT', 'AR/VR',
]

const SKILLS = [
    { name: 'Python' },
    { name: 'React' },
    { name: 'C++' },
    { name: 'ML/AI' },
    { name: 'UI/UX' },
    { name: 'Leadership' },
    { name: 'Data Science' },
]

const GOALS = [
    { icon: '📄', title: 'Build Resume', desc: 'Add real campus experiences to stand out' },
    { icon: '⚡', title: 'Find Hackathons', desc: 'Compete, build, and win with your team' },
    { icon: '💼', title: 'Get Internships', desc: 'Unlock referrals through campus networks' },
    { icon: '🤝', title: 'Make Friends', desc: 'Meet people who share your interests' },
    { icon: '🔬', title: 'Research Focus', desc: 'Join labs and research projects on campus' },
    { icon: '🏆', title: 'Leadership Growth', desc: 'Lead clubs, teams, and campus initiatives' },
]

const STEP_LABELS = ['Basic Info', 'Interests', 'Skills', 'Goals']

// ─── MAIN COMPONENT ─────────────────────────────────────
export default function OnboardingPage() {
    const [step, setStep] = useState(0)
    const [transitioning, setTransitioning] = useState(false)
    const [finished, setFinished] = useState(false)

    // Form state
    const [form, setForm] = useState({ name: '', uni: '', degree: '', year: '', major: '' })
    const [selectedInterests, setSelectedInterests] = useState(new Set())
    const [skillLevels, setSkillLevels] = useState(SKILLS.map(() => 1))
    const [selectedGoals, setSelectedGoals] = useState(new Set())

    const confidence = calcConfidence(form, selectedInterests, skillLevels, selectedGoals)

    function goTo(next) {
        if (transitioning) return
        setTransitioning(true)
        setTimeout(() => { setStep(next); setTransitioning(false) }, 300)
    }

    function handleNext() {
        if (step < 3) goTo(step + 1)
        else setFinished(true)
    }

    function handleBack() {
        if (step > 0) goTo(step - 1)
    }

    function toggleInterest(tag) {
        setSelectedInterests(prev => {
            const next = new Set(prev)
            if (next.has(tag)) next.delete(tag)
            else if (next.size < 8) next.add(tag)
            return next
        })
    }

    function setSkill(i, val) {
        setSkillLevels(prev => prev.map((v, idx) => idx === i ? val : v))
    }

    function toggleGoal(i) {
        setSelectedGoals(prev => {
            const next = new Set(prev)
            if (next.has(i)) next.delete(i)
            else next.add(i)
            return next
        })
    }

    const progress = ((step + 1) / 4) * 100

    return (
        <div className="ob-root">
            <OrbBackground />

            {/* NAV */}
            <nav className="ob-nav">
                <a href="/" className="nav-logo">UniVerse</a>
                <a href="/" className="nav-back">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back to Home
                </a>
            </nav>

            {/* HERO */}
            <HeroSection step={step} />

            {/* MAIN CONTENT */}
            <div className="ob-main">

                {/* FORM CARD */}
                <div className={`ob-card ${finished ? 'ob-card--done' : ''}`}>
                    {finished ? (
                        <FinishedState name={form.name} />
                    ) : (
                        <>
                            <ProgressHeader step={step} progress={progress} />
                            <div className="ob-steps-wrap">
                                <StepContainer
                                    stepIndex={0}
                                    currentStep={step}
                                    transitioning={transitioning}
                                >
                                    <BasicInfoStep form={form} setForm={setForm} />
                                </StepContainer>

                                <StepContainer stepIndex={1} currentStep={step} transitioning={transitioning}>
                                    <InterestsStep
                                        selected={selectedInterests}
                                        toggle={toggleInterest}
                                    />
                                </StepContainer>

                                <StepContainer stepIndex={2} currentStep={step} transitioning={transitioning}>
                                    <SkillsStep levels={skillLevels} setSkill={setSkill} />
                                </StepContainer>

                                <StepContainer stepIndex={3} currentStep={step} transitioning={transitioning}>
                                    <GoalsStep selected={selectedGoals} toggle={toggleGoal} />
                                </StepContainer>
                            </div>

                            <FormActions
                                step={step}
                                onNext={handleNext}
                                onBack={handleBack}
                            />
                        </>
                    )}
                </div>

                {/* PROFILE PREVIEW */}
                <ProfilePreview
                    form={form}
                    interests={selectedInterests}
                    skills={SKILLS.map((s, i) => ({ name: s.name, level: skillLevels[i] }))}
                    goals={[...selectedGoals].map(i => GOALS[i].title)}
                    confidence={confidence}
                />
            </div>
        </div>
    )
}

// ─── HERO SECTION ────────────────────────────────────────
function HeroSection({ step }) {
    return (
        <section className="ob-hero">
            <div className="ob-hero-grid" />
            <div className="ob-eyebrow">
                <div className="ob-eyebrow-dot" />
                <span className="ob-eyebrow-text">Onboarding · Beta 2025</span>
                <div className="ob-eyebrow-line" />
            </div>
            <h1 className="ob-hero-title">
                START YOUR<br />
                <span className="ob-grad">UNIVERSE.</span>
            </h1>
            <p className="ob-hero-sub">
                In under 3 minutes, we'll personalize your entire campus experience — powered by real intelligence.
            </p>
            <div className="ob-hero-steps">
                {STEP_LABELS.map((label, i) => (
                    <div key={label} className="ob-hero-step-group">
                        <div className={`ob-hero-dot ${i === step ? 'active' : i < step ? 'done' : ''}`}>
                            {i < step ? '✓' : i + 1}
                        </div>
                        {i < STEP_LABELS.length - 1 && <div className="ob-hero-connector" />}
                    </div>
                ))}
            </div>
            <div className="ob-scroll-hint">
                <span>Continue</span>
                <div className="ob-scroll-arrow" />
            </div>
        </section>
    )
}

// ─── ORB BACKGROUND ──────────────────────────────────────
function OrbBackground() {
    return (
        <>
            <div className="ob-orb ob-orb-1" />
            <div className="ob-orb ob-orb-2" />
            <div className="ob-orb ob-orb-3" />
        </>
    )
}

// ─── PROGRESS HEADER ─────────────────────────────────────
function ProgressHeader({ step, progress }) {
    return (
        <div className="ob-progress-header">
            <div className="ob-step-labels">
                {STEP_LABELS.map((label, i) => (
                    <span
                        key={label}
                        className={`ob-step-label ${i === step ? 'active' : i < step ? 'done' : ''}`}
                    >
                        0{i + 1} — {label}
                    </span>
                ))}
            </div>
            <div className="ob-progress-track">
                <div className="ob-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="ob-step-dots">
                {STEP_LABELS.map((_, i) => (
                    <div
                        key={i}
                        className={`ob-step-dot ${i === step ? 'active' : i < step ? 'done' : ''}`}
                    />
                ))}
            </div>
        </div>
    )
}

// ─── STEP CONTAINER ──────────────────────────────────────
function StepContainer({ stepIndex, currentStep, transitioning, children }) {
    if (stepIndex !== currentStep) return null
    return (
        <div className={`ob-step ${transitioning ? 'ob-step--exit' : 'ob-step--enter'}`}>
            {children}
        </div>
    )
}

// ─── FORM ACTIONS ────────────────────────────────────────
function FormActions({ step, onNext, onBack }) {
    const isLast = step === 3
    return (
        <div className="ob-actions">
            <button
                className="ob-btn-back"
                onClick={onBack}
                style={{ opacity: step > 0 ? 1 : 0, pointerEvents: step > 0 ? 'auto' : 'none' }}
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back
            </button>
            <button
                className={`ob-btn-continue ${isLast ? 'ob-btn-finish' : ''}`}
                onClick={onNext}
            >
                {isLast ? '🚀  Launch My Universe' : 'Continue →'}
            </button>
        </div>
    )
}

// ─── STEP 1: BASIC INFO ──────────────────────────────────
function BasicInfoStep({ form, setForm }) {
    const update = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }))
    return (
        <div className="ob-step-inner">
            <h2 className="ob-step-heading">BASIC INFO</h2>
            <p className="ob-step-sub">Tell us a little about yourself — this helps us connect you with the right people.</p>
            <div className="ob-input-grid">
                <Field label="Full Name">
                    <input className="ob-input" type="text" placeholder="Alex Chen" value={form.name} onChange={update('name')} />
                </Field>
                <Field label="University">
                    <input className="ob-input" type="text" placeholder="MIT, Stanford…" value={form.uni} onChange={update('uni')} />
                </Field>
                <Field label="Degree">
                    <select className="ob-input" value={form.degree} onChange={update('degree')}>
                        <option value="" disabled>Select Degree</option>
                        {['B.Tech / B.E.', 'B.Sc.', 'B.A.', 'M.Tech / M.E.', 'M.Sc.', 'MBA', 'Ph.D.'].map(d => (
                            <option key={d}>{d}</option>
                        ))}
                    </select>
                </Field>
                <Field label="Year">
                    <select className="ob-input" value={form.year} onChange={update('year')}>
                        <option value="" disabled>Year of Study</option>
                        {['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year+'].map(y => (
                            <option key={y}>{y}</option>
                        ))}
                    </select>
                </Field>
                <Field label="Major" full>
                    <input className="ob-input" type="text" placeholder="Computer Science, EE, Finance…" value={form.major} onChange={update('major')} />
                </Field>
            </div>
        </div>
    )
}

function Field({ label, children, full }) {
    return (
        <div className={`ob-field ${full ? 'ob-field--full' : ''}`}>
            <label className="ob-field-label">{label}</label>
            {children}
        </div>
    )
}

// ─── STEP 2: INTERESTS ───────────────────────────────────
function InterestsStep({ selected, toggle }) {
    return (
        <div className="ob-step-inner">
            <h2 className="ob-step-heading">INTERESTS</h2>
            <p className="ob-step-sub">What lights you up? Pick up to 8 areas that define your campus identity.</p>
            <div className="ob-tag-counter">
                <span className="ob-tag-counter-label">Select your interests</span>
                <span className="ob-tag-counter-num">{selected.size} / 8</span>
            </div>
            <div className="ob-tags-grid">
                {INTERESTS.map(tag => (
                    <button
                        key={tag}
                        className={`ob-tag ${selected.has(tag) ? 'ob-tag--selected' : ''}`}
                        onClick={() => toggle(tag)}
                    >
                        {selected.has(tag) && <span className="ob-tag-check">✓ </span>}
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    )
}

// ─── STEP 3: SKILLS ──────────────────────────────────────
function SkillsStep({ levels, setSkill }) {
    return (
        <div className="ob-step-inner">
            <h2 className="ob-step-heading">SKILL LEVELS</h2>
            <p className="ob-step-sub">Rate yourself honestly — this powers your team-matching algorithm.</p>
            <div className="ob-skills-list">
                {SKILLS.map((sk, i) => (
                    <div key={sk.name} className="ob-skill-row">
                        <div className="ob-skill-name">{sk.name}</div>
                        <div className="ob-skill-track">
                            <div className="ob-skill-fill" style={{ width: `${(levels[i] / 5) * 100}%` }} />
                            <input
                                type="range" min="1" max="5" value={levels[i]}
                                onChange={e => setSkill(i, +e.target.value)}
                                className="ob-range"
                            />
                        </div>
                        <div className="ob-skill-level">{levels[i]}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ─── STEP 4: GOALS ───────────────────────────────────────
function GoalsStep({ selected, toggle }) {
    return (
        <div className="ob-step-inner">
            <h2 className="ob-step-heading">YOUR GOALS</h2>
            <p className="ob-step-sub">What do you want to achieve this semester? Select all that apply.</p>
            <div className="ob-goals-grid">
                {GOALS.map((g, i) => (
                    <div
                        key={g.title}
                        className={`ob-goal-card ${selected.has(i) ? 'ob-goal-card--selected' : ''}`}
                        onClick={() => toggle(i)}
                    >
                        <div className="ob-goal-check">✓</div>
                        <div className="ob-goal-icon">{g.icon}</div>
                        <div className="ob-goal-title">{g.title}</div>
                        <div className="ob-goal-desc">{g.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ─── PROFILE PREVIEW ─────────────────────────────────────
function ProfilePreview({ form, interests, skills, confidence }) {
    const circumference = 2 * Math.PI * 16
    const offset = circumference - (circumference * confidence) / 100
    const topSkills = [...skills].sort((a, b) => b.level - a.level).slice(0, 4)

    return (
        <aside className="ob-preview">
            <div className="ob-preview-label" style={{ marginBottom: 20 }}>Live Preview</div>

            <div className="ob-preview-header">
                <div className="ob-preview-avatar">
                    {form.name ? form.name[0].toUpperCase() : '👤'}
                </div>
                <div>
                    <div className="ob-preview-name">{form.name || 'Your Name'}</div>
                    <div className="ob-preview-uni">{form.uni || 'University'}</div>
                </div>
            </div>

            <div className="ob-preview-label">Interests</div>
            <div className="ob-preview-tags">
                {interests.size === 0 ? (
                    <span className="ob-preview-empty">None selected yet</span>
                ) : (
                    [...interests].slice(0, 5).map(t => (
                        <span key={t} className="ob-preview-tag">{t}</span>
                    ))
                )}
            </div>

            <div className="ob-preview-label">Top Skills</div>
            <div className="ob-preview-skills">
                {topSkills.map(sk => (
                    <div key={sk.name} className="ob-preview-skill-row">
                        <div className="ob-preview-skill-name">{sk.name}</div>
                        <div className="ob-preview-skill-bar">
                            <div className="ob-preview-skill-fill" style={{ width: `${(sk.level / 5) * 100}%` }} />
                        </div>
                        <div className="ob-preview-skill-val">{sk.level}</div>
                    </div>
                ))}
            </div>

            <div className="ob-confidence">
                <div className="ob-conf-icon">🤖</div>
                <div className="ob-conf-text">
                    <div className="ob-conf-title">Profile Confidence</div>
                    <div className="ob-conf-val">{confidence}%</div>
                </div>
                <div className="ob-conf-ring">
                    <svg width="40" height="40" viewBox="0 0 40 40" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(79,110,247,.15)" strokeWidth="3" />
                        <circle
                            cx="20" cy="20" r="16" fill="none"
                            stroke="#4F6EF7" strokeWidth="3" strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            style={{ transition: 'stroke-dashoffset .8s cubic-bezier(.16,1,.3,1)' }}
                        />
                    </svg>
                </div>
            </div>
        </aside>
    )
}

// ─── FINISHED STATE ──────────────────────────────────────
function FinishedState({ name }) {
    return (
        <div className="ob-finished">
            <div className="ob-finished-emoji">🚀</div>
            <h2 className="ob-finished-title">
                UNIVERSE<br />
                <span className="ob-grad">LAUNCHED.</span>
            </h2>
            <p className="ob-finished-sub">
                Your personalized campus experience is being calibrated. Welcome to UniVerse{name ? `, ${name}` : ''}.
            </p>
            <a href="/" className="ob-btn-continue" style={{ textDecoration: 'none', display: 'inline-block', marginTop: 8 }}>
                Enter Dashboard →
            </a>
        </div>
    )
}

// ─── UTILITY ─────────────────────────────────────────────
function calcConfidence(form, interests, levels, goals) {
    let pts = 0
    if (form.name) pts += 15
    if (form.uni) pts += 10
    pts += Math.min(interests.size * 5, 30)
    const avg = levels.reduce((a, b) => a + b, 0) / levels.length
    pts += Math.round((avg / 5) * 25)
    if (goals.size >= 1) pts += 15
    return Math.min(pts, 100)
}
