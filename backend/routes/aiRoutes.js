const express = require('express')
const router  = express.Router()
const { protect, adminOnly } = require('../middleware/auth')
const { aiLimiter }          = require('../middleware/rateLimit')
const {
  analysePaper,
  analyseCustom,
  clearCache,
} = require('../controllers/aiController')

// ── Public (rate limited) ─────────────────────
router.post('/analyse/:paperId', aiLimiter, analysePaper)
router.post('/analyse-custom',   aiLimiter, analyseCustom)

// ── Admin only ────────────────────────────────
router.delete('/cache/:paperId', protect, adminOnly, clearCache)

module.exports = router
