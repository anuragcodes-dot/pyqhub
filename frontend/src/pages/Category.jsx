import { YEARS } from '../data/exams.js'

// ─────────────────────────────────────────────
//  Category page — sub-categories + year grid
// ─────────────────────────────────────────────
export default function Category({ exam, go }) {
  if (!exam) return null

  return (
    <>
      {/* Page header */}
      <div className="page-hdr">
        <div className="page-hdr-inner">
          <div>
            <div className="page-hdr-title-row">
              <span className="page-hdr-emoji">{exam.emoji}</span>
              <h2>{exam.full}</h2>
            </div>
            <p className="page-hdr-sub">
              {exam.desc} · Select paper type and year
            </p>
          </div>

          <span
            className="page-badge"
            style={{ background: exam.bg, color: exam.accent }}
          >
            {exam.subs.length} paper types
          </span>
        </div>
      </div>

      {/* Sub-categories + year grids */}
      <div className="wrap" style={{ paddingTop: 0 }}>
        {exam.subs.map(sub => (
          <div key={sub.id} className="sub-section">
            <div className="sub-section-hdr">
              <h3>{sub.name}</h3>
              <span className="sub-count">{sub.count} papers/year</span>
            </div>

            <div className="years-grid">
              {YEARS.map(yr => (
                <div
                  key={yr}
                  className="year-card"
                  onClick={() => go('papers', { exam, sub, year: yr })}
                >
                  <div className="year-num" style={{ color: exam.accent }}>
                    {yr}
                  </div>
                  <div className="year-sub">
                    {sub.count} paper{sub.count > 1 ? 's' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
