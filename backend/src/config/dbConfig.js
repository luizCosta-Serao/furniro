const mongoose = require('mongoose')
require('dotenv').config()

const dbConfig = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.eouo0vp.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0`

const connection = mongoose.connect(dbConfig)

module.exports = connection