import { SAMPLE_QUESTIONS } from '../data/exams.js'
import { triggerDownload } from '../utils/helpers.js'
import AIPanel from '../components/AIPanel.jsx'
import { DownloadIcon } from '../components/Icons.jsx'

// ─────────────────────────────────────────────
//  Paper view page — mock PDF + AI side panel
// ─────────────────────────────────────────────
export default function PaperView({ exam, sub, year, paper, go }) {
  if (!exam || !sub || !year || !paper) return null

  return (
    <div className="view-layout">

      {/* ── PDF Viewer ── */}
      <div className="pdf-viewer">
        {/* Toolbar */}
        <div className="pdf-toolbar">
          <span className="pdf-title">
            {sub.name} — {paper.title} · {year}
          </span>
          <button
            className="btn btn-outline"
            style={{ padding: '7px 14px' }}
            onClick={() => triggerDownload(exam, sub, year, paper)}
          >
            <DownloadIcon /> Download PDF
          </button>
        </div>

        {/* Body */}
        <div className="pdf-body">
          <div className="pdf-mock">

            {/* Paper heading */}
            <div className="pdf-mock-hdr">
              <h3>{exam.full}</h3>
              <p style={{ fontWeight: 600, marginTop: 4 }}>
                {sub.name} · {paper.title}
              </p>
              <p style={{ marginTop: 3 }}>
                Year: {year} &nbsp;·&nbsp; Total Marks: 300 &nbsp;·&nbsp; Time: 3 Hours
              </p>
              <p style={{ marginTop: 3 }}>
                Instructions: Read all questions carefully before attempting. Use blue/black pen only.
              </p>
            </div>

            {/* Sections (show first 3 subjects) */}
            {paper.subjects.slice(0, 3).map((subject, si) => (
              <div key={si}>
                <div className="pdf-section">
                  Section {['A', 'B', 'C'][si]} — {subject}
                </div>
                {(SAMPLE_QUESTIONS[si] || SAMPLE_QUESTIONS[0]).map((q, qi) => (
                  <div key={qi} className="pdf-q">
                    <strong>Q{si * 3 + qi + 1}. </strong>{q}
                  </div>
                ))}
              </div>
            ))}

            {/* Footer note */}
            <div className="pdf-watermark">
              ─── Preview · {paper.pages} pages in full paper · Download for complete content ───
            </div>
          </div>
        </div>
      </div>

      {/* ── AI Analysis Panel ── */}
      <AIPanel exam={exam} sub={sub} year={year} paper={paper} />
    </div>
  )
}
