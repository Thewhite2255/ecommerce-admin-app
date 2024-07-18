const express = require('express')
const router = express.Router()

const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage: storage })

const {
  getFiles,
  uploadFile,
  deleteFile,
} = require('../controllers/fileControllers')

router.get('/', getFiles)
router.post('/upload/', upload.array('images'), uploadFile)
router.delete('/delete/:filename', deleteFile)

module.exports = router
