import { useTheme } from '../context/ThemeContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar({ page, exam, sub, year, paper, go }) {
  const { dark, toggle } = useTheme()
  const { user, logout, isLoggedIn } = useAuth()

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <nav className="nav">
      {/* Brand */}
      <span className="nav-brand" onClick={() => go('home')}>
        PYQ<span>Hub</span>
      </span>

      {/* Breadcrumbs */}
      {exam && (
        <>
          <span className="nav-sep">›</span>
          <span className="nav-crumb" onClick={() => go('category', { exam })}>
            {exam.name}
          </span>
        </>
      )}
      {sub && year !== null && (
        <>
          <span className="nav-sep">›</span>
          <span className="nav-crumb" onClick={() => go('papers', { exam, sub, year })}>
            {sub.name} {year}
          </span>
        </>
      )}
      {paper && page === 'view' && (
        <>
          <span className="nav-sep">›</span>
          <span className="nav-active">{paper.title || paper.t}</span>
        </>
      )}

      {/* Right side */}
      <div className="nav-right">

        {/* Pricing link */}
        <span
          className="nav-link-btn"
          onClick={() => go('pricing')}
        >
          Pricing
        </span>

        {/* Dark mode toggle */}
        <button className="theme-toggle" onClick={toggle} title={dark ? 'Light mode' : 'Dark mode'}>
          {dark ? '☀️' : '🌙'}
        </button>

        {/* Auth */}
        {isLoggedIn ? (
          <div className="nav-user">
            <div
              className="nav-avatar"
              onClick={() => go('dashboard')}
              title="My Dashboard"
            >
              {initials}
            </div>
          </div>
        ) : (
          <button className="btn btn-accent" style={{ padding: '7px 16px', fontSize: 13 }} onClick={() => go('auth')}>
            Login
          </button>
        )}
      </div>
    </nav>
  )
}
