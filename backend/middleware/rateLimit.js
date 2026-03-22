const rateLimit = require('express-rate-limit')

// ─────────────────────────────────────────────
//  General API rate limiter — 100 req / 15 min
// ─────────────────────────────────────────────
exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
})

// ─────────────────────────────────────────────
//  Strict AI limiter — 10 requests / 15 min
//  (Claude API calls are expensive)
// ─────────────────────────────────────────────
exports.aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'AI analysis limit reached. Please wait 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
})

// ─────────────────────────────────────────────
//  Auth limiter — 20 req / 15 min
// ─────────────────────────────────────────────
exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many login attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})
