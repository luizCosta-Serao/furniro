const Products = require('../models/ProductsData')

module.exports = {
  async read(req, res) {
    const { id } = req.params
    const singleProduct = await Products.findById(id)
    return res.json(singleProduct)
  }
}