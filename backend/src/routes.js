const express = require('express')
const routes = express.Router()

const ProductsController = require('./controllers/ProductsController')
const ProductController = require('./controllers/ProductController')

// Rotas Products
routes.get('/products', ProductsController.read)
routes.post('/products', ProductsController.create)
routes.get('/products/:id', ProductController.read)

module.exports = routes