const mongoose = require('mongoose')

const ContactDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String
})

module.exports = mongoose.model('Contact', ContactDataSchema)