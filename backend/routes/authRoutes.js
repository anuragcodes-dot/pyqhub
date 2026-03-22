const express    = require('express')
const router     = express.Router()
const { protect }    = require('../middleware/auth')
const { authLimiter} = require('../middleware/rateLimit')
const {
  register,
  login,
  getMe,
  toggleSave,
} = require('../controllers/authController')

// Public
router.post('/register', authLimiter, register)
router.post('/login',    authLimiter, login)

// Protected
router.get('/me',               protect, getMe)
router.put('/save/:paperId',    protect, toggleSave)

module.exports = router
