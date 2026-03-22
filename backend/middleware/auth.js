const jwt  = require('jsonwebtoken')
const User = require('../models/User')

// ─────────────────────────────────────────────
//  Protect — require valid JWT
// ─────────────────────────────────────────────
exports.protect = async (req, res, next) => {
  let token

  // Check Authorization header
  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorised — no token' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not found' })
    }
    next()
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid token' })
  }
}

// ─────────────────────────────────────────────
//  Admin only — must come AFTER protect
// ─────────────────────────────────────────────
exports.adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' })
  }
  next()
}
