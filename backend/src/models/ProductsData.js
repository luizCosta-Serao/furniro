const mongoose = require('mongoose')

const ProductsDataSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  stock: Number,
})

module.exports = mongoose.model('Products', ProductsDataSchema)