const express = require('express')
const router  = express.Router()
const { protect, adminOnly } = require('../middleware/auth')
const { upload }             = require('../config/cloudinary')
const { uploadPDF, uploadBulk } = require('../controllers/uploadController')

// All upload routes are admin only
router.post('/pdf',  protect, adminOnly, upload.single('pdf'),       uploadPDF)
router.post('/bulk', protect, adminOnly, upload.array('pdfs', 20),   uploadBulk)

module.exports = router
