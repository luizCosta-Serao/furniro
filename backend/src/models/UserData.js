const mongoose = require('mongoose')

const UserDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
})

module.exports = mongoose.model('User', UserDataSchema)