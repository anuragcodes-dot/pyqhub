const Paper = require('../models/Paper')

// ─────────────────────────────────────────────
//  POST /api/upload/pdf  (admin only)
//  Multer + Cloudinary handle the actual upload.
//  This controller saves the URL to the Paper doc.
// ─────────────────────────────────────────────
exports.uploadPDF = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' })
    }

    const { paperId } = req.body

    // req.file.path     = Cloudinary URL
    // req.file.filename = Cloudinary public_id
    const pdfUrl      = req.file.path
    const pdfPublicId = req.file.filename

    // If a paperId was provided, attach to existing paper
    if (paperId) {
      const paper = await Paper.findByIdAndUpdate(
        paperId,
        { pdfUrl, pdfPublicId },
        { new: true }
      )
      if (!paper) return res.status(404).json({ success: false, message: 'Paper not found' })
      return res.json({ success: true, pdfUrl, paper })
    }

    // Otherwise return URL — admin can link it later
    res.json({ success: true, pdfUrl, pdfPublicId })
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────
//  POST /api/upload/bulk  (admin only)
//  Upload multiple PDFs at once
// ─────────────────────────────────────────────
exports.uploadBulk = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' })
    }

    const results = req.files.map(f => ({
      originalName: f.originalname,
      pdfUrl:       f.path,
      pdfPublicId:  f.filename,
    }))

    res.json({ success: true, count: results.length, data: results })
  } catch (err) {
    next(err)
  }
}
