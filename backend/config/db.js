const mongoose = require('mongoose')

// ─────────────────────────────────────────────
//  Connect to MongoDB Atlas
// ─────────────────────────────────────────────
const connectDB = async () => {
  try {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    family: 4,
   })
    console.log(`✅ MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(`❌ MongoDB connection failed: ${err.message}`)
    process.exit(1) // Exit on failure — no point running without DB
  }
}

module.exports = connectDB
