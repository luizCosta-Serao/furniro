require('dotenv').config()
const mongoose = require('mongoose')

const dbConfig = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.eouo0vp.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0`

const connection = mongoose.connect(dbConfig)
  .then((r) => console.log('ok'))
  .catch((err) => console.log('fail')) 

module.exports = connection