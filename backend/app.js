const express = require('express')
const routes = require('./src/routes')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
app.use(cors())
require('./src/config/dbConfig.js')
app.use(express.json())
app.use(routes)
app.use('/public', express.static(path.join(__dirname, 'public')))

// Models
const User = require('./src/models/UserData')

// Private Route
app.get('/user/:id', checkToken ,async (req, res) => {
  const { id } = req.params
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", true )
  
 
  // Check if user exists
  const user = await User.findById(id, '-password')

  if (!user) {
    return res.status(404).json({
      error: 'Usuário não encontrado'
    })
  }

  return res.json(user)
})

function checkToken(req, res, next) {
  const authHeader = req.headers['authorization']
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", true )
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      error: 'Acesso negado'
    })
  }

  try {
    jwt.verify(token, process.env.SECRET_JWT)
    next()
  } catch (error) {
    res.status(400).json({
      error: 'Token inválido'
    })
  }
}

// Register User
app.post('/auth/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  // Validations
  if (!name) {
    return res.status(422).json({
      error: 'O nome é obrigatório'
    })
  }

  if (!email) {
    return res.status(422).json({
      error: 'O email é obrigatório'
    })
  }

  if (!password) {
    return res.status(422).json({
      error: 'A senha é obrigatório'
    })
  }

  if (password !== confirmPassword) {
    return res.status(422).json({
      error: 'As senhas devem ser iguais'
    })
  }

  // Check if user exists
  const userExists = await User.findOne(({
    email: email
  }))

  if (userExists) {
    res.status(422).json({
      error: 'Por favor, utilize outro email'
    })
  }

  // Create password
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  // Create User
  const user = new User({
    name,
    email,
    password: passwordHash
  })

  try {
    await user.save()
    res.status(201).json({
      success: 'Usuário criado com sucesso'
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      error: 'Ocorreu um erro no servidor, tente novamente mais tarde'
    })
  }
})

// Login User
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", true )

  if (!email) {
    return res.status(422).json({
      error: 'O email é obrigatório'
    })
  }

  if (!password) {
    return res.status(422).json({
      error: 'A senha é obrigatório'
    })
  }

  // Check if user exists
  const user = await User.findOne({
    email: email
  })

  if (!user) {
    return res.status(422).json({
      error: 'Email não encontrado'
    })
  }

  // Check if passwrd match
  const checkPassword = await bcrypt.compare(password, user.password)

  if (!checkPassword) {
    return res.status(422).json({
      error: 'Senha incorreta'
    })
  }

  try {
    const secret = process.env.SECRET_JWT
    const token = jwt.sign({
      id: user._id
    }, secret)

    res.status(200).json({
      success: 'Autenticação realizada com sucesso',
      token,
      _id: user._id
    })
  } catch (error) {
    res.status(500).json({
      error: 'Ocorreu um erro no servidor, tente novamente mais tarde',
    })
  }
})


app.listen(process.env.PORT || 3333, () => {
  console.log('Servidor conectado')
})