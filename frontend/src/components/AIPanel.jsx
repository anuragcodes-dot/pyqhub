import { useState } from 'react'
import { parseAIText } from '../utils/helpers.js'
import { SparkleIcon, RefreshIcon } from './Icons.jsx'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function AIPanel({ exam, sub, year, paper }) {
  const [status, setStatus] = useState('idle')
  const [aiText, setAiText] = useState('')

  const buildPrompt = () =>
    `You are an expert exam coach in India. Analyse this previous year question paper for a student.

Exam: ${exam?.full}
Paper: ${sub?.name} — ${paper?.title || paper?.t}
Year: ${year}
Subjects: ${(paper?.subjects || paper?.subs || []).join(', ')}

Give a concise structured analysis with EXACTLY these headings:
**Top Important Topics**
List 5-6 high-weightage topics.

**Difficulty Distribution**
Rough % split: Easy / Medium / Hard.

**Subject-wise Weightage**
Approximate % of total marks per subject.

**Must-Practice Question Types**
3-4 question types that repeat across years.

**Quick Study Strategy**
3-4 bullet points for last-minute prep.

Be specific, direct, practical. No fluff.`

  const runAnalysis = async () => {
    setStatus('loading')
    setAiText('')

    // Try 1: Backend API (secure, recommended for production)
    try {
      const res = await fetch(`${API}/ai/analyse-custom`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examFull:   exam?.full,
          subName:    sub?.name,
          paperTitle: paper?.title || paper?.t,
          year,
          subjects:   paper?.subjects || paper?.subs || [],
        }),
      })
      const data = await res.json()
      if (data.success && data.analysis) {
        setAiText(data.analysis)
        setStatus('done')
        return
      }
    } catch {
      // Backend not available — fall through to direct call
    }

    // Try 2: Direct Anthropic API call
    try {
      const headers = {
        'Content-Type':      'application/json',
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      }

      // Only attach x-api-key if a key is explicitly provided in .env
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
      if (apiKey) headers['x-api-key'] = apiKey

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method:  'POST',
        headers,
        body: JSON.stringify({
          model:      'claude-sonnet-4-20250514',
          max_tokens: 1024,
          messages:   [{ role: 'user', content: buildPrompt() }],
        }),
      })

      const data = await res.json()
      if (data.error) throw new Error(data.error.message)

      const txt = (data.content || []).map(c => c.text || '').join('')
      setAiText(txt || 'No analysis returned.')
      setStatus('done')
    } catch (err) {
      setAiText(
        `⚠️ AI analysis requires either:\n\n` +
        `1. Backend running on port 5000 (run npm run dev from root)\n\n` +
        `2. Or add VITE_ANTHROPIC_API_KEY=your-key to frontend/.env\n\n` +
        `Error: ${err.message}`
      )
      setStatus('error')
    }
  }

  return (
    <div className="ai-panel">
      <div className="ai-hdr">
        <span style={{ fontSize: 20 }}>🧠</span>
        <h4>AI Analysis</h4>
        <span className="ai-badge">Claude AI</span>
      </div>
      <div className="ai-body">

        {status === 'idle' && (
          <div className="ai-idle">
            <div className="ai-idle-icon">🔍</div>
            <h5>Analyse This Paper</h5>
            <p>Get instant AI insights — important topics, subject weightage, difficulty distribution &amp; a personalised study strategy.</p>
            <button className="btn btn-accent btn-lg btn-full" onClick={runAnalysis}>
              <SparkleIcon /> Analyse with Claude
            </button>
            <p className="ai-note">Takes 5–10 seconds</p>
          </div>
        )}

        {status === 'loading' && (
          <div className="ai-loading">
            <div className="dots">
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>
            <p>Claude is analysing the paper…</p>
          </div>
        )}

        {(status === 'done' || status === 'error') && (
          <div>
            <div className={`ai-result ${status === 'error' ? 'ai-error' : ''}`}>
              {parseAIText(aiText).map((part, i) => {
                if (part.type === 'h')
                  return <div key={i} className="ai-h">{part.text}</div>
                if (part.type === 'ul')
                  return (
                    <ul key={i} className="ai-ul">
                      {part.items.map((item, j) => (
                        <li key={j} className="ai-li">{item}</li>
                      ))}
                    </ul>
                  )
                return <p key={i} className="ai-p">{part.text}</p>
              })}
            </div>
            <button
              className="btn btn-outline btn-full"
              style={{ marginTop: 18 }}
              onClick={() => { setStatus('idle'); setAiText('') }}
            >
              <RefreshIcon /> Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
