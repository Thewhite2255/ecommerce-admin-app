const Category = require('../models/categoryModel')

const createCategory = async (req, res) => {
  try {
    const { name, parentCategory, properties } = req.body

    if (!name) {
      throw Error('Category name is required')
    }

    await Category.create({
      name,
      parent: parentCategory || undefined,
      properties,
    })

    res.status(200).json({
      success: true,
      message: 'success',
    })
  } catch (error) {
    console.log('Error :', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params
    const { name, parentCategory, properties } = req.body

    const category = await Category.findById(id)

    if (!category) {
      throw Error('Category not found')
    }

    if (!name) {
      throw Error('Category name is required')
    }

    await Category.findByIdAndUpdate(id, {
      name,
      parent: parentCategory || undefined,
      properties,
    })

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
    })
  } catch (error) {
    console.log('Error :', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params

    const category = await Category.findById(id)

    if (!category) {
      throw Error('Category not found')
    }

    await Category.findByIdAndDelete(id)

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    })
  } catch (error) {
    console.log('Error :', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('parent')

    if (!categories) {
      throw Error('Categories not found')
    }

    res.status(200).json({
      success: true,
      message: 'success',
      categories: categories,
    })
  } catch (error) {
    console.log('Error :', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const getCategory = async (req, res) => {
  try {
    const { id } = req.params
    const category = await Category.findById(id)

    res.status(200).json({
      success: false,
      message: 'success',
      category,
    })
  } catch (error) {
    console.log('Error :', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = {
  getCategory,
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
}
