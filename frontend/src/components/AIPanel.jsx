import { useState } from 'react'
import { parseAIText } from '../utils/helpers.js'
import { ai } from '../utils/api.js'
import { SparkleIcon, RefreshIcon } from './Icons.jsx'

export default function AIPanel({ exam, sub, year, paper }) {
  const [status, setStatus] = useState('idle')
  const [aiText, setAiText] = useState('')
  const [cached, setCached] = useState(false)

  const runAnalysis = async () => {
    setStatus('loading')
    setAiText('')
    setCached(false)
    try {
      const data = await ai.analyseCustom({
        examFull: exam?.full, subName: sub?.name,
        paperTitle: paper?.title, year, subjects: paper?.subjects || [],
      })
      setAiText(data.analysis || 'No analysis returned.')
      setCached(data.cached || false)
      setStatus('done')
    } catch {
      await runDirectFallback()
    }
  }

  const runDirectFallback = async () => {
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 900,
          messages: [{ role: 'user', content: `You are an expert exam coach in India. Analyse this previous year question paper.\n\nExam: ${exam?.full}\nPaper: ${sub?.name} — ${paper?.title}\nYear: ${year}\nSubjects: ${paper?.subjects?.join(', ')}\n\nProvide a concise structured analysis with these exact headings:\n**Top Important Topics**\nList 5-6 high-weightage topics for this paper.\n\n**Difficulty Distribution**\nRough % split of Easy / Medium / Hard questions.\n\n**Subject-wise Weightage**\nFor each subject, approximate % of total marks.\n\n**Must-Practice Question Types**\n3-4 specific question types that repeat across years.\n\n**Quick Study Strategy**\n3-4 bullet points for effective last-minute prep.\n\nBe specific, direct, and practical. No fluff.` }]
        })
      })
      const data = await res.json()
      setAiText((data.content || []).map(c => c.text || '').join('') || 'No analysis returned.')
      setStatus('done')
    } catch {
      setAiText('Could not connect. Make sure the backend is running on port 5000, or check your internet connection.')
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
            <div className="dots"><div className="dot" /><div className="dot" /><div className="dot" /></div>
            <p>Claude is analysing the paper…</p>
          </div>
        )}
        {(status === 'done' || status === 'error') && (
          <div>
            {cached && <div style={{ fontSize: 11, color: '#888880', marginBottom: 12 }}>⚡ Cached result</div>}
            <div className="ai-result">
              {parseAIText(aiText).map((part, i) => {
                if (part.type === 'h') return <div key={i} className="ai-h">{part.text}</div>
                if (part.type === 'ul') return <ul key={i} className="ai-ul">{part.items.map((item, j) => <li key={j} className="ai-li">{item}</li>)}</ul>
                return <p key={i} className="ai-p">{part.text}</p>
              })}
            </div>
            <button className="btn btn-outline btn-full" style={{ marginTop: 18 }} onClick={() => { setStatus('idle'); setAiText('') }}>
              <RefreshIcon /> New Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
