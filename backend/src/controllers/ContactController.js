const Contact = require('../models/ContactData')

module.exports = {
  async create(req, res) {
    const { name, email, subject, message } = req.body

    if (!name) {
      return res.status(400).json({
        message: 'Insira seu nome'
      })
    } else if (!email) {
      return res.status(400).json({
        message: 'Insira seu email'
      })
    } else if (!message) {
      return res.status(400).json({
        message: 'Insira sua mensagem'
      })
    }

    const sendMessage = Contact.create({
      name,
      email,
      subject,
      message
    })

    return res.json(sendMessage)
  }
}