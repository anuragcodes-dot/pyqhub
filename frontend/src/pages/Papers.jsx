import { getPapers } from '../data/exams.js'
import { triggerDownload } from '../utils/helpers.js'
import { DownloadIcon } from '../components/Icons.jsx'

// ─────────────────────────────────────────────
//  Papers list page — all papers for sub + year
// ─────────────────────────────────────────────
export default function Papers({ exam, sub, year, go }) {
  if (!exam || !sub || !year) return null

  const papers = getPapers(sub.id)

  return (
    <>
      {/* Page header */}
      <div className="page-hdr">
        <div className="page-hdr-inner">
          <div>
            <h2>{sub.name} — {year}</h2>
            <p className="page-hdr-sub">
              {papers.length} question papers · PDF download + AI analysis
            </p>
          </div>
          <button className="btn btn-outline" onClick={() => go('category', { exam })}>
            ← Back
          </button>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: 0 }}>

        {/* Stat strip */}
        <div className="stat-row">
          <div className="stat-box">
            <div className="stat-n" style={{ color: exam.accent }}>{papers.length}</div>
            <div className="stat-l">Papers</div>
          </div>
          <div className="stat-box">
            <div className="stat-n">PDF</div>
            <div className="stat-l">Format</div>
          </div>
          <div className="stat-box">
            <div className="stat-n">Free</div>
            <div className="stat-l">Download</div>
          </div>
          <div className="stat-box">
            <div className="stat-n">AI</div>
            <div className="stat-l">Analysis</div>
          </div>
        </div>

        {/* Papers list */}
        <div className="papers-list">
          {papers.map(paper => (
            <div key={paper.id} className="paper-card">
              <div
                className="paper-thumb"
                style={{ background: exam.bg }}
              >
                📄
              </div>

              <div className="paper-info">
                <h4>{paper.title}</h4>
                <div className="paper-meta">
                  {year} · {paper.pages} pages · {exam.name}
                </div>
                <div className="tag-row">
                  {paper.subjects.map(s => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
              </div>

              <div className="paper-btns">
                <button
                  className="btn btn-outline"
                  onClick={() => triggerDownload(exam, sub, year, paper)}
                >
                  <DownloadIcon /> Download
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => go('view', { exam, sub, year, paper })}
                >
                  View + Analyse
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
