const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: 'Category' },
  properties: [{ type: Object }],
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
