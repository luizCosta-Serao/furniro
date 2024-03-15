const Products = require('../models/ProductsData')

module.exports = {
  async read(req, res) {
    const productsList = await Products.find()
    return res.json(productsList)
  },

  async create(req, res) {
    const { name, description, price, image, stock } = req.body
    if (!name || !description || !price || !stock || !image) {
      return res.status(400).json({
        error: 'Preencha todos os campos'
      })
    }

    const productCreated = await Products.create({
      name,
      description,
      price,
      image,
      stock
    })

    return res.json(productCreated)
  }
}