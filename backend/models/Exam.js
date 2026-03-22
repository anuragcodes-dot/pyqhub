const mongoose = require('mongoose')

// ─────────────────────────────────────────────
//  Sub-category schema (embedded)
//  e.g. JEE Main, JEE Advanced
// ─────────────────────────────────────────────
const SubCategorySchema = new mongoose.Schema({
  id:    { type: String, required: true },   // e.g. 'jee-main'
  name:  { type: String, required: true },   // e.g. 'JEE Main'
  count: { type: Number, default: 0 },       // papers per year (approx)
})

// ─────────────────────────────────────────────
//  Exam schema
// ─────────────────────────────────────────────
const ExamSchema = new mongoose.Schema(
  {
    id:     { type: String, required: true, unique: true }, // e.g. 'jee'
    name:   { type: String, required: true },               // e.g. 'JEE'
    full:   { type: String, required: true },               // Full name
    desc:   { type: String, required: true },               // Short desc
    emoji:  { type: String, default: '📄' },
    accent: { type: String, default: '#E8550A' },           // CSS color
    bg:     { type: String, default: '#FEF3EC' },           // CSS bg color
    subs:   [SubCategorySchema],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Exam', ExamSchema)
