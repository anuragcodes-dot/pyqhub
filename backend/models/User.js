const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')
const jwt      = require('jsonwebtoken')

// ─────────────────────────────────────────────
//  User schema
// ─────────────────────────────────────────────
const UserSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role:     { type: String, enum: ['student', 'admin'], default: 'student' },

    // Saved / bookmarked papers
    savedPapers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Paper' }],

    // Download history
    downloadHistory: [
      {
        paper:       { type: mongoose.Schema.Types.ObjectId, ref: 'Paper' },
        downloadedAt: { type: Date, default: Date.now },
      }
    ],
  },
  { timestamps: true }
)

// ── Hash password before save ──────────────────
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// ── Compare entered password with stored hash ──
UserSchema.methods.matchPassword = async function (entered) {
  return bcrypt.compare(entered, this.password)
}

// ── Generate JWT ───────────────────────────────
UserSchema.methods.getSignedToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  )
}

module.exports = mongoose.model('User', UserSchema)
