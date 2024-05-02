const express = require('express')
const routes = express.Router()
const app = express()
const cors = require('cors')
app.use(cors())
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_API_SECRET)

const ProductsController = require('./controllers/ProductsController')
const ProductController = require('./controllers/ProductController')
const ContactController = require('./controllers/ContactController')
const UserController = require('./controllers/UserController')

// Rotas Products
routes.get('/products', ProductsController.read)
routes.post('/products', ProductsController.create)
routes.get('/products/:id', ProductController.read)

// Rotas Contact
routes.post('/contact', ContactController.create)

// Rotas Stripe
routes.post('/create-checkout-session', async (req, res) => {
  const { cartItems } = req.body
  const line_items = cartItems.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.description,
          metadata: {
            id: item._id
          }
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }
  })

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}`,
  });

  res.send({
    url: session.url
  });
});

routes.get('/user/cart/:id', UserController.getCart)
routes.post('/user/cart/:id', UserController.addCart)
routes.post('/user/cart/update/:id', UserController.removeCart)
routes.get('/user/favorites/:id', UserController.getFavorites)
routes.post('/user/favorites/:id', UserController.addFavorites)
routes.post('/user/favorites/update/:id', UserController.removeFavorites)

module.exports = routes