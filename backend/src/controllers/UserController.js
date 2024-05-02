const User = require('../models/UserData')

module.exports = {
  async getCart(req, res) {
    const { id } = req.params
    const cart = await User.findById(id)
    if (cart) {
      return res.json(cart.cart)
    } else {
      return res.json([])
    }
  },

  async addCart(req, res) {
    const { id } = req.params
    const { idProduct } = req.body;
    
    const response = await fetch(`http://localhost:10000/products/${idProduct}`)
    const json = await response.json()
    const itemCart = {
      ...json,
      quantity: 1
    }

    const oldCart = await User.findById(id)
    const findProduct = oldCart.cart.find((item) => {
      return item._id.toString() === json._id
    })
    
    if (oldCart.cart.length === 0) {
      const newCart = await User.updateOne({_id: id}, {$set: {cart: [itemCart]}})
      return res.json(newCart)
    } else if (oldCart.cart && findProduct && findProduct._id.toString() === json._id) {
      const newCart = await User.updateOne({_id: id}, {$set: {cart: oldCart.cart.map((item) => {
        if (item._id.toString() === json._id) {
          return {
            ...item,
            quantity: item.quantity++
          }
        } else {
          return item
        }
      })}})
      return res.json(newCart)
    } else {
      const newCart = await User.updateOne({_id: id}, {$set: {cart: [...oldCart.cart, itemCart]}})
      return res.json(newCart)
    }
  },

  async removeCart(req, res) {
    const { id } = req.params
    const { removeCart } = req.body

    const user = await User.findById(id)
    const updatedCart = await User.updateOne({_id: id}, {$set: {
      cart: user.cart.filter((item) => {
        if (item._id.toString() === removeCart && item.quantity > 1) {
          return true
        } else if (item._id.toString() === removeCart && item.quantity === 1) {
          return false
        } else {
          return true
        }
      }).map((item) => {
        if (item._id.toString() === removeCart && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity--
          }
        } else if (item._id.toString() !== removeCart) {
          return {
            ...item
          }
        }
      })
    }})
    return res.json(updatedCart)
  },

  async getFavorites(req, res) {
    const { id } = req.params
    const user = await User.findById(id)
    return res.json(user.favorites)
  },

  async addFavorites(req, res) {
    const { id } = req.params
    const { idFavorites } = req.body;

    const response = await fetch(`http://localhost:10000/products/${idFavorites}`)
    const json = await response.json()

    const oldFavorites = await User.findById(id)
    
    if (oldFavorites.favorites.length === 0) {
      const newFavorites = await User.updateOne({_id: id}, {$set: {favorites: [json]}})
      return res.json(newFavorites)
    } else {
      const filterFavorites = oldFavorites.favorites.filter((item) => item._id.toString() === json._id)
      if (filterFavorites.length === 0) {
        const newFavorites = await User.updateOne({_id: id}, {$set: {favorites: [...oldFavorites.favorites, json]}})
        return res.json(newFavorites)
      } else {
        await User.updateOne({_id: id}, {$set: {favorites: [...oldFavorites.favorites]}})
        return res.json(oldFavorites.cart)
      }
    }
  },

  async removeFavorites(req, res) {
    const { id } = req.params
    const { idFavorites } = req.body
    const user = await User.findById(id)
    const filterFav = user.favorites.filter((item) => item._id.toString() !== idFavorites)
    await User.updateOne({_id: id}, {$set: {favorites: [...filterFav]}})
    return res.json(user.favorites)
  }
}