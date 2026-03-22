const Paper = require('../models/Paper')
const User  = require('../models/User')
const { cloudinary } = require('../config/cloudinary')

// ─────────────────────────────────────────────
//  GET /api/papers?examId=jee&subId=jee-main&year=2024
// ─────────────────────────────────────────────
exports.getPapers = async (req, res, next) => {
  try {
    const { examId, subId, year } = req.query
    const filter = { active: true }

    if (examId) filter.examId = examId
    if (subId)  filter.subId  = subId
    if (year)   filter.year   = Number(year)

    const papers = await Paper.find(filter)
      .select('-aiAnalysis -__v')
      .sort({ year: -1, title: 1 })

    res.json({ success: true, count: papers.length, data: papers })
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────
//  GET /api/papers/:id
// ─────────────────────────────────────────────
exports.getPaperById = async (req, res, next) => {
  try {
    const paper = await Paper.findById(req.params.id)
    if (!paper || !paper.active) {
      return res.status(404).json({ success: false, message: 'Paper not found' })
    }

    // Increment view count
    paper.viewCount += 1
    await paper.save()

    res.json({ success: true, data: paper })
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────
//  GET /api/papers/:id/download
//  Returns the PDF URL + increments download count
// ─────────────────────────────────────────────
exports.downloadPaper = async (req, res, next) => {
  try {
    const paper = await Paper.findById(req.params.id)
    if (!paper || !paper.active) {
      return res.status(404).json({ success: false, message: 'Paper not found' })
    }
    if (!paper.pdfUrl) {
      return res.status(404).json({ success: false, message: 'PDF not available yet' })
    }

    // Track download in user history if logged in
    if (req.user) {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { downloadHistory: { paper: paper._id } }
      })
    }

    // Increment download counter
    paper.downloadCount += 1
    await paper.save()

    res.json({ success: true, pdfUrl: paper.pdfUrl })
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────
//  POST /api/papers  (admin only)
//  Create paper record (without PDF)
// ─────────────────────────────────────────────
exports.createPaper = async (req, res, next) => {
  try {
    const paper = await Paper.create(req.body)
    res.status(201).json({ success: true, data: paper })
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────
//  PUT /api/papers/:id  (admin only)
// ─────────────────────────────────────────────
exports.updatePaper = async (req, res, next) => {
  try {
    const paper = await Paper.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!paper) return res.status(404).json({ success: false, message: 'Paper not found' })
    res.json({ success: true, data: paper })
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────
//  DELETE /api/papers/:id  (admin only)
//  Removes from Cloudinary + soft-deletes record
// ─────────────────────────────────────────────
exports.deletePaper = async (req, res, next) => {
  try {
    const paper = await Paper.findById(req.params.id)
    if (!paper) return res.status(404).json({ success: false, message: 'Paper not found' })

    // Delete PDF from Cloudinary
    if (paper.pdfPublicId) {
      await cloudinary.uploader.destroy(paper.pdfPublicId, { resource_type: 'raw' })
    }

    paper.active = false
    await paper.save()

    res.json({ success: true, message: 'Paper removed' })
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────
//  GET /api/papers/search?q=jee+2024+physics
// ─────────────────────────────────────────────
exports.searchPapers = async (req, res, next) => {
  try {
    const { q } = req.query
    if (!q) return res.status(400).json({ success: false, message: 'Query required' })

    const papers = await Paper.find({
      active: true,
      $or: [
        { title:    { $regex: q, $options: 'i' } },
        { examId:   { $regex: q, $options: 'i' } },
        { subjects: { $elemMatch: { $regex: q, $options: 'i' } } },
      ],
    }).select('-aiAnalysis -__v').limit(20)

    res.json({ success: true, count: papers.length, data: papers })
  } catch (err) {
    next(err)
  }
}
