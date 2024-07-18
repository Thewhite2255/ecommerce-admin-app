const Product = require('../models/productModel')

const createProduct = async (req, res) => {
  try {
    const { name, description, price, images, category, properties } = req.body

    const product = await Product.create({
      name,
      category,
      properties,
      description,
      price,
      images,
    })

    res.status(200).json({
      success: true,
      message: 'Produit crée avec succès',
      product,
    })
  } catch (error) {
    console.log(`Error : ${error.message}`)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category')

    res.status(200).json({
      success: true,
      message: 'Produits',
      products,
    })
  } catch (error) {
    console.log(`Error : ${error.message}`)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const getProduct = async (req, res) => {
  try {
    const { id } = req.params

    const product = await Product.findOne({ _id: id })

    res.status(200).json({
      success: true,
      message: 'Produit',
      product,
    })
  } catch (error) {
    console.log(`Error : ${error.message}`)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params

    const product = await Product.findByIdAndDelete(id)

    res.status(200).json({
      success: true,
      message: 'Produit deleted',
      product,
    })
  } catch (error) {
    console.log(`Error : ${error.message}`)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, price, images, category, properties } = req.body

    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé',
      })
    }

    await Product.findByIdAndUpdate(id, {
      name,
      category,
      description,
      properties,
      images,
    })

    res.status(200).json({
      success: true,
      message: 'Produit mis à jour avec succès',
    })
  } catch (error) {
    console.log(`Error : ${error.message}`)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
}
