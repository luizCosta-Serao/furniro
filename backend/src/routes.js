const express = require('express')
const routes = express.Router()

const ProductsController = require('./controllers/ProductsController')

// Rotas Products
routes.get('/products', ProductsController.read)
routes.post('/products', ProductsController.create)

module.exports = routes