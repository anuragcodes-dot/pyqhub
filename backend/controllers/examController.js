const Exam  = require('../models/Exam')
const Paper = require('../models/Paper')

// ─────────────────────────────────────────────
//  GET /api/exams
//  List all active exam categories
// ─────────────────────────────────────────────
exports.getAllExams = async (req, res, next) => {
  try {
    const exams = await Exam.find({ active: true }).select('-__v')
    res.json({ success: true, count: exams.length, data: exams })
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────
//  GET /api/exams/:id
//  Single exam with its sub-categories
// ─────────────────────────────────────────────
exports.getExamById = async (req, res, next) => {
  try {
    const exam = await Exam.findOne({ id: req.params.id, active: true })
    if (!exam) return res.status(404).json({ success: false, message: 'Exam not found' })
    res.json({ success: true, data: exam })
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────
//  GET /api/exams/:examId/years
//  Get all years that have at least 1 paper
// ─────────────────────────────────────────────
exports.getYears = async (req, res, next) => {
  try {
    const { examId, subId } = req.params
    const filter = { examId, active: true }
    if (subId) filter.subId = subId

    const years = await Paper.distinct('year', filter)
    const sorted = years.sort((a, b) => b - a)

    res.json({ success: true, data: sorted })
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────
//  POST /api/exams  (admin only)
// ─────────────────────────────────────────────
exports.createExam = async (req, res, next) => {
  try {
    const exam = await Exam.create(req.body)
    res.status(201).json({ success: true, data: exam })
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────
//  PUT /api/exams/:id  (admin only)
// ─────────────────────────────────────────────
exports.updateExam = async (req, res, next) => {
  try {
    const exam = await Exam.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    )
    if (!exam) return res.status(404).json({ success: false, message: 'Exam not found' })
    res.json({ success: true, data: exam })
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────
//  DELETE /api/exams/:id  (admin only)
//  Soft delete — just sets active: false
// ─────────────────────────────────────────────
exports.deleteExam = async (req, res, next) => {
  try {
    await Exam.findOneAndUpdate({ id: req.params.id }, { active: false })
    res.json({ success: true, message: 'Exam removed' })
  } catch (err) {
    next(err)
  }
}
