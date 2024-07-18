const express = require('express')
const router = express.Router()

const {
  getCategory,
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} = require('../controllers/categoryControllers')

router.get('/id/:id', getCategory)
router.get('/', getCategories)
router.post('/', createCategory)
router.delete('/:id', deleteCategory)
router.put('/:id', updateCategory)

module.exports = router
