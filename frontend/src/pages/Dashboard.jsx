import { useAuth } from '../context/AuthContext.jsx'
import { DownloadIcon } from '../components/Icons.jsx'
import { triggerDownload } from '../utils/helpers.js'
import { EXAMS } from '../data/exams.js'

export default function Dashboard({ go }) {
  const { user, logout, toggleSave } = useAuth()

  if (!user) {
    return (
      <div className="dash-empty-wrap">
        <div className="dash-empty">
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔒</div>
          <h3>Please login to view your dashboard</h3>
          <button className="btn btn-accent" style={{ marginTop: 16 }} onClick={() => go('auth')}>
            Login / Register
          </button>
        </div>
      </div>
    )
  }

  const initials = user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  const getExam = (examId) => EXAMS.find(e => e.id === examId)

  return (
    <div className="wrap" style={{ paddingTop: 32 }}>

      {/* Profile header */}
      <div className="dash-profile">
        <div className="dash-avatar">{initials}</div>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 600 }}>{user.name}</h2>
          <p style={{ color: 'var(--ink-light)', fontSize: 14, marginTop: 2 }}>{user.email}</p>
          <span className={`plan-badge ${user.role === 'admin' ? 'admin' : 'free'}`}>
            {user.role === 'admin' ? '👑 Admin' : '⚡ Free Plan'}
          </span>
        </div>
        <button
          className="btn btn-outline"
          style={{ marginLeft: 'auto' }}
          onClick={() => { logout(); go('home') }}
        >
          Logout
        </button>
      </div>

      {/* Stats strip */}
      <div className="stat-row" style={{ marginTop: 24 }}>
        <div className="stat-box">
          <div className="stat-n" style={{ color: 'var(--acc)' }}>
            {user.savedPapers?.length || 0}
          </div>
          <div className="stat-l">Saved Papers</div>
        </div>
        <div className="stat-box">
          <div className="stat-n">{user.downloadHistory?.length || 0}</div>
          <div className="stat-l">Downloads</div>
        </div>
        <div className="stat-box">
          <div className="stat-n">{user.role === 'admin' ? 'Admin' : 'Free'}</div>
          <div className="stat-l">Plan</div>
        </div>
      </div>

      {/* Upgrade banner for free users */}
      {user.role !== 'admin' && (
        <div className="upgrade-banner" onClick={() => go('pricing')}>
          <div>
            <strong>Get Personal Guidance</strong>
            <p>Book a 1-on-1 session with an expert for just ₹49</p>
          </div>
          <button className="btn btn-accent">View Plans →</button>
        </div>
      )}

      {/* Saved papers */}
      <div style={{ marginTop: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>📌 Saved Papers</h3>

        {(!user.savedPapers || user.savedPapers.length === 0) ? (
          <div className="dash-empty">
            <p>No saved papers yet. Click the bookmark icon on any paper to save it here.</p>
            <button className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => go('home')}>
              Browse Papers
            </button>
          </div>
        ) : (
          <div className="papers-list">
            {user.savedPapers.map((paper, i) => {
              const exam = getExam(paper.examId)
              return (
                <div key={i} className="paper-card">
                  <div className="paper-thumb" style={{ background: exam?.bg || '#FEF3EC' }}>📄</div>
                  <div className="paper-info">
                    <h4>{paper.title}</h4>
                    <div className="paper-meta">{paper.year} · {exam?.name || paper.examId}</div>
                    <div className="tag-row">
                      {(paper.subjects || []).map(s => (
                        <span key={s} className="tag">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="paper-btns">
                    <button
                      className="btn btn-outline"
                      title="Remove from saved"
                      onClick={() => toggleSave(paper._id)}
                    >
                      🔖 Unsave
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => go('view', {
                        exam, sub: { id: paper.subId, name: paper.subId },
                        year: paper.year, paper
                      })}
                    >
                      View
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Download history */}
      <div style={{ marginTop: 40, marginBottom: 40 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>📥 Download History</h3>

        {(!user.downloadHistory || user.downloadHistory.length === 0) ? (
          <div className="dash-empty">
            <p>No downloads yet. Start downloading papers and they will appear here.</p>
          </div>
        ) : (
          <div className="papers-list">
            {user.downloadHistory.slice(0, 10).map((item, i) => (
              <div key={i} className="paper-card">
                <div className="paper-thumb" style={{ background: '#F3F2EE' }}>📄</div>
                <div className="paper-info">
                  <h4>{item.paper?.title || 'Question Paper'}</h4>
                  <div className="paper-meta">
                    Downloaded on {new Date(item.downloadedAt).toLocaleDateString('en-IN')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
