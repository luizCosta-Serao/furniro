const User = require('../models/UserData')

module.exports = {
  async addCart(req, res) {
    const { id } = req.params
    const { newProduct } = req.body;

    const oldCart = await User.findById(id)
    const newCart = await User.updateOne({_id: id}, {$set: {cart: [...oldCart.cart ,newProduct]}})

    return res.json(newCart)
  },

  async addFavorites(req, res) {
    const { id } = req.params
    const { newProduct } = req.body;

    const oldFavorites = await User.findById(id)
    const newFavorites = await User.updateOne({_id: id}, {$set: {favorites: [...oldFavorites.favorites, newProduct]}})

    return res.json(newFavorites)
  }
}