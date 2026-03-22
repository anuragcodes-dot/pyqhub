const express  = require('express')
const router   = express.Router()
const { protect, adminOnly } = require('../middleware/auth')
const { apiLimiter }         = require('../middleware/rateLimit')
const {
  getPapers,
  getPaperById,
  downloadPaper,
  createPaper,
  updatePaper,
  deletePaper,
  searchPapers,
} = require('../controllers/paperController')

// ── Public ────────────────────────────────────
router.get('/',          apiLimiter, getPapers)
router.get('/search',    apiLimiter, searchPapers)
router.get('/:id',       apiLimiter, getPaperById)
router.get('/:id/download', protect, downloadPaper)   // login required to download

// ── Admin only ────────────────────────────────
router.post('/',      protect, adminOnly, createPaper)
router.put('/:id',    protect, adminOnly, updatePaper)
router.delete('/:id', protect, adminOnly, deletePaper)

module.exports = router
