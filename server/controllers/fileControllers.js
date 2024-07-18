const File = require('../models/fileModel')
const path = require('path')
const fs = require('fs').promises

const uploadFile = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(404).json({
        success: false,
        message: 'Tout les champs sont requis ! Fichier(s) image(s) ',
      })
    }
    const imageUrls = req.files.map((file) => file.path)

    res.status(200).json({
      success: true,
      message: 'Fichier(s) téléchargé(s) avec succès',
      link: imageUrls,
    })
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteFile = async (req, res) => {
  try {
    const { filename } = req.params

    if (!filename) {
      return res.status(404).json({
        success: false,
        message: 'Nom du fichier requis',
      })
    }

    const deletePath = path.join(__dirname, '..', 'uploads', filename)

    await fs.unlink(deletePath)

    res.status(200).json({
      success: true,
      message: 'Produit image supprimée',
    })
  } catch (error) {
    console.log(`Error : ${error.message}`)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const getFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: false,
      message: 'Files',
      files,
    })
  } catch (error) {
    console.log(`Error : ${error.message}`)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = { getFiles, uploadFile, deleteFile }
