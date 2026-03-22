const mongoose = require('mongoose')

// ─────────────────────────────────────────────
//  Paper schema
//  One document = one question paper PDF
// ─────────────────────────────────────────────
const PaperSchema = new mongoose.Schema(
  {
    // Identifiers
    examId:   { type: String, required: true, index: true },  // e.g. 'jee'
    subId:    { type: String, required: true, index: true },  // e.g. 'jee-main'
    year:     { type: Number, required: true, index: true },

    // Paper details
    title:    { type: String, required: true },               // 'January Session — Shift 1'
    pages:    { type: Number, default: 0 },
    subjects: [{ type: String }],                             // ['Physics','Chemistry','Maths']

    // PDF file (stored on Cloudinary)
    pdfUrl:       { type: String, default: '' },              // Cloudinary URL
    pdfPublicId:  { type: String, default: '' },              // Cloudinary public_id

    // Stats
    downloadCount: { type: Number, default: 0 },
    viewCount:     { type: Number, default: 0 },

    // AI analysis cache (so we don't re-call the API every time)
    aiAnalysis:    { type: String, default: '' },
    aiAnalysedAt:  { type: Date },

    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

// Compound index for fast lookups
PaperSchema.index({ examId: 1, subId: 1, year: 1 })

module.exports = mongoose.model('Paper', PaperSchema)
