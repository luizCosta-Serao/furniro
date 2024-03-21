const mongoose = require('mongoose')

const ProductsDataSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  stock: Number,
  category: String,
})

module.exports = mongoose.model('Products', ProductsDataSchema)