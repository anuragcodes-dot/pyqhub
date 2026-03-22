const User = require('../models/User')

// ─────────────────────────────────────────────
//  Helper — send token response
// ─────────────────────────────────────────────
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken()
  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id:    user._id,
      name:  user.name,
      email: user.email,
      role:  user.role,
    },
  })
}

// ─────────────────────────────────────────────
//  POST /api/auth/register
// ─────────────────────────────────────────────
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email and password' })
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already registered' })
    }

    const user = await User.create({ name, email, password })
    sendToken(user, 201, res)
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────
//  POST /api/auth/login
// ─────────────────────────────────────────────
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' })
    }

    // Include password field (it's select: false in schema)
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    sendToken(user, 200, res)
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────
//  GET /api/auth/me  (protected)
// ─────────────────────────────────────────────
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('savedPapers', 'title examId subId year')
    res.json({ success: true, user })
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────
//  PUT /api/auth/save/:paperId  (protected)
//  Toggle save/unsave a paper
// ─────────────────────────────────────────────
exports.toggleSave = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    const { paperId } = req.params

    const idx = user.savedPapers.indexOf(paperId)
    if (idx > -1) {
      user.savedPapers.splice(idx, 1) // unsave
    } else {
      user.savedPapers.push(paperId)  // save
    }
    await user.save()

    res.json({
      success: true,
      saved: idx === -1,
      savedPapers: user.savedPapers,
    })
  } catch (err) {
    next(err)
  }
}
