const mongoose = require('mongoose')

const UserDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cart: [{
    name: String,
    price: Number,
    image: String,
    quantity: Number,
  }],
  favorites: [{
    name: String,
    description: String,
    price: Number,
    image: String,
    stock: Number,
    category: String,
  }],
})

module.exports = mongoose.model('User', UserDataSchema)