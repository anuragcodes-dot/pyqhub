import { useState } from 'react'
import { EXAMS } from '../data/exams.js'
import Illustration from '../components/Illustration.jsx'
import { ChevronRight, SearchIcon } from '../components/Icons.jsx'

// ─────────────────────────────────────────────
//  Home page — Hero + Exam category grid
// ─────────────────────────────────────────────
export default function Home({ go }) {
  const [query, setQuery] = useState('')

  const filtered = EXAMS.filter(e =>
    !query ||
    e.name.toLowerCase().includes(query.toLowerCase()) ||
    e.full.toLowerCase().includes(query.toLowerCase()) ||
    e.desc.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-text">
          <div className="hero-tag">
            <span>✦</span> Free · Organised · AI-Powered
          </div>

          <h1>
            All Your <em>Question Papers</em><br />One Place.
          </h1>

          <p className="hero-sub">
            Access PYQs for JEE, NEET, UPSC, SSC, Board &amp; Engineering exams.
            Download instantly, analyse with AI, and prepare smarter.
          </p>

          {/* Search */}
          <div className="search-wrap">
            <input
              className="search-input"
              placeholder="Search by exam — JEE, NEET, UPSC, SSC…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <span className="search-icon"><SearchIcon /></span>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num">500+</div>
              <div className="hero-stat-lbl">Papers</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">20+</div>
              <div className="hero-stat-lbl">Exams</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">7 yrs</div>
              <div className="hero-stat-lbl">History</div>
            </div>
          </div>
        </div>

        <div className="hero-illus">
          <Illustration />
        </div>
      </section>

      {/* ── Exam categories ── */}
      <main className="wrap">
        <p className="section-label">Browse by Category</p>

        <div className="exams-grid">
          {filtered.map(exam => (
            <div
              key={exam.id}
              className="exam-card"
              style={{ '--accent': exam.accent, '--bg': exam.bg }}
              onClick={() => go('category', { exam })}
            >
              <div className="exam-icon">{exam.emoji}</div>
              <div className="exam-info">
                <h3>{exam.name}</h3>
                <p>{exam.desc}</p>
                <span className="exam-pill">
                  {exam.subs.length} paper types
                </span>
              </div>
              <span className="exam-arrow"><ChevronRight /></span>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <p>No exams found for "{query}"</p>
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        © 2025 PYQ Hub · Built for Indian Students · All Exams Covered
      </footer>
    </>
  )
}
