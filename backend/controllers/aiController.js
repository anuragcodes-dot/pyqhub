const Anthropic = require('@anthropic-ai/sdk')
const Paper     = require('../models/Paper')

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ─────────────────────────────────────────────
//  POST /api/ai/analyse/:paperId
//  Analyse a paper with Claude.
//  Returns cached result if < 7 days old.
// ─────────────────────────────────────────────
exports.analysePaper = async (req, res, next) => {
  try {
    const paper = await Paper.findById(req.params.paperId)
    if (!paper || !paper.active) {
      return res.status(404).json({ success: false, message: 'Paper not found' })
    }

    // ── Return cached analysis if fresh (< 7 days) ──
    const CACHE_DAYS = 7
    const cacheAge   = paper.aiAnalysedAt
      ? (Date.now() - new Date(paper.aiAnalysedAt)) / (1000 * 60 * 60 * 24)
      : Infinity

    if (paper.aiAnalysis && cacheAge < CACHE_DAYS) {
      return res.json({
        success:  true,
        cached:   true,
        analysis: paper.aiAnalysis,
      })
    }

    // ── Build prompt ──────────────────────────────
    const prompt = buildPrompt(paper, req.body)

    // ── Call Claude ───────────────────────────────
    const message = await anthropic.messages.create({
      model:      'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages:   [{ role: 'user', content: prompt }],
    })

    const analysis = message.content.map(b => b.text || '').join('')

    // ── Cache in DB ───────────────────────────────
    paper.aiAnalysis   = analysis
    paper.aiAnalysedAt = new Date()
    await paper.save()

    res.json({ success: true, cached: false, analysis })
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────
//  POST /api/ai/analyse-custom
//  Analyse without a DB paper — used during
//  frontend demo mode (no DB record yet)
// ─────────────────────────────────────────────
exports.analyseCustom = async (req, res, next) => {
  try {
    const { examFull, subName, paperTitle, year, subjects } = req.body

    if (!examFull || !subName || !year) {
      return res.status(400).json({ success: false, message: 'examFull, subName, year are required' })
    }

    const prompt = `You are an expert exam coach in India. Analyse this previous year question paper.

Exam: ${examFull}
Paper: ${subName} — ${paperTitle || ''}
Year: ${year}
Subjects: ${(subjects || []).join(', ')}

Provide a concise structured analysis with these exact headings:
**Top Important Topics**
List 5-6 high-weightage topics for this paper.

**Difficulty Distribution**
Rough % split of Easy / Medium / Hard questions.

**Subject-wise Weightage**
For each subject, approximate % of total marks.

**Must-Practice Question Types**
3-4 specific question types that repeat across years.

**Quick Study Strategy**
3-4 bullet points for effective last-minute prep.

Be specific, direct, and practical. No fluff.`

    const message = await anthropic.messages.create({
      model:      'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages:   [{ role: 'user', content: prompt }],
    })

    const analysis = message.content.map(b => b.text || '').join('')
    res.json({ success: true, analysis })
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────
//  DELETE /api/ai/cache/:paperId  (admin only)
//  Force re-analysis next request
// ─────────────────────────────────────────────
exports.clearCache = async (req, res, next) => {
  try {
    await Paper.findByIdAndUpdate(req.params.paperId, {
      aiAnalysis:   '',
      aiAnalysedAt: null,
    })
    res.json({ success: true, message: 'AI cache cleared' })
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────
//  Helper: build the analysis prompt
// ─────────────────────────────────────────────
function buildPrompt(paper, extra = {}) {
  return `You are an expert exam coach in India. Analyse this previous year question paper for a student preparing for it.

Exam: ${extra.examFull || paper.examId}
Paper: ${extra.subName || paper.subId} — ${paper.title}
Year: ${paper.year}
Subjects: ${paper.subjects.join(', ')}

Provide a concise structured analysis with these exact headings:
**Top Important Topics**
List 5-6 high-weightage topics for this paper.

**Difficulty Distribution**
Rough % split of Easy / Medium / Hard questions.

**Subject-wise Weightage**
For each subject, approximate % of total marks.

**Must-Practice Question Types**
3-4 specific question types that repeat across years.

**Quick Study Strategy**
3-4 bullet points for effective last-minute prep.

Be specific, direct, and practical. No fluff.`
}
