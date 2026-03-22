// ─────────────────────────────────────────────
//  Navbar with breadcrumb navigation
// ─────────────────────────────────────────────

export default function Navbar({ page, exam, sub, year, paper, go }) {
  return (
    <nav className="nav">
      {/* Brand */}
      <span className="nav-brand" onClick={() => go('home')}>
        PYQ Hub
      </span>

      {/* Breadcrumb: exam category */}
      {exam && (
        <>
          <span className="nav-sep">›</span>
          <span
            className="nav-crumb"
            onClick={() => go('category', { exam })}
          >
            {exam.name}
          </span>
        </>
      )}

      {/* Breadcrumb: sub + year (papers list) */}
      {sub && year !== null && (
        <>
          <span className="nav-sep">›</span>
          <span
            className="nav-crumb"
            onClick={() => go('papers', { exam, sub, year })}
          >
            {sub.name} {year}
          </span>
        </>
      )}

      {/* Breadcrumb: paper title (view page) */}
      {paper && page === 'view' && (
        <>
          <span className="nav-sep">›</span>
          <span className="nav-active">{paper.title}</span>
        </>
      )}
    </nav>
  )
}
