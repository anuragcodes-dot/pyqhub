const express  = require('express')
const router   = express.Router()
const { protect, adminOnly } = require('../middleware/auth')
const {
  getAllExams,
  getExamById,
  getYears,
  createExam,
  updateExam,
  deleteExam,
} = require('../controllers/examController')

// ── Public ────────────────────────────────────
router.get('/',                 getAllExams)
router.get('/:id',              getExamById)
router.get('/:examId/years',    getYears)
router.get('/:examId/:subId/years', getYears)

// ── Admin only ────────────────────────────────
router.post('/',     protect, adminOnly, createExam)
router.put('/:id',   protect, adminOnly, updateExam)
router.delete('/:id',protect, adminOnly, deleteExam)

module.exports = router
