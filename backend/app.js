const express = require('express')
const routes = require('./src/routes')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const app = express()
require('./src/config/dbConfig')

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/public', express.static(path.join(__dirname, 'public')))




app.listen(3333)