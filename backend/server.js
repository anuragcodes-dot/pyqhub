require('dotenv').config()
const express    = require('express')
const cors       = require('cors')
const morgan     = require('morgan')
const connectDB  = require('./config/db')

// ── Route imports ──────────────────────────────────────────
const examRoutes   = require('./routes/examRoutes')
const paperRoutes  = require('./routes/paperRoutes')
const aiRoutes     = require('./routes/aiRoutes')
const authRoutes   = require('./routes/authRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

// ── Connect to MongoDB ─────────────────────────────────────
connectDB()

const app = express()

// ── Global Middleware ──────────────────────────────────────
app.use(cors({
  origin:      process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// ── Health check ───────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

// ── API Routes ─────────────────────────────────────────────
app.use('/api/auth',    authRoutes)
app.use('/api/exams',   examRoutes)
app.use('/api/papers',  paperRoutes)
app.use('/api/ai',      aiRoutes)
app.use('/api/upload',  uploadRoutes)

// ── 404 handler ────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// ── Global error handler ───────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message)
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server error',
  })
})

// ── Start server ───────────────────────────────────────────
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`\n🚀 PYQ Hub API running on http://localhost:${PORT}`)
  console.log(`📦 Environment: ${process.env.NODE_ENV}`)
  console.log(`📚 Docs: http://localhost:${PORT}/api/health\n`)
})
