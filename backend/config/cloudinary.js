const cloudinary = require('cloudinary').v2

const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

// ─────────────────────────────────────────────
//  Cloudinary config
// ─────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// ─────────────────────────────────────────────
//  Multer storage — PDFs go to Cloudinary
//  Folder: pyqhub/<examId>/<subId>/<year>/
// ─────────────────────────────────────────────
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder:        `pyqhub/${req.body.examId}/${req.body.subId}/${req.body.year}`,
    resource_type: 'raw',          // needed for PDFs
    format:        'pdf',
    public_id:     `${Date.now()}_${file.originalname.replace(/\s/g, '_')}`,
  }),
})

// Allow only PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true)
  } else {
    cb(new Error('Only PDF files are allowed'), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB max
})

module.exports = { cloudinary, upload }
