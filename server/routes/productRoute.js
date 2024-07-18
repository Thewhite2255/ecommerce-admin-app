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
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  deteleProductImage,
} = require('../controllers/productControllers')

router.post('/', upload.array('images'), createProduct)
router.delete('/id/:id', deleteProduct)
router.put('/update/:id', upload.array('images'), updateProduct)
router.get('/', getProducts)
router.get('/id/:id', getProduct)

module.exports = router
