const express = require('express');
const { Router } = express;
const passport = require('../../passport')
const User = require('../daos/UserMongo')
const Carrito = require('../daos/CarritoMongo')
let router = new Router();
const routes = require('../../routes')
const sendMail = require('../../mailing')

const users = new User()
const carrito = new Carrito()

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/avatars")
  },
  filename: (req, file, cb) => {
    const { userName } = req.body
    cb(null, "avatar_" + userName + "_" + file.originalname)
  }
})

const upload = multer({storage: storage})

const pathFormatter = (path) => {
  const deform = path.split('\\')
  deform.shift()
  const reform = deform.join('/')
  
  return `/${reform}`
}

router.get('/register', (req, res) => {
  res.render("register", {script: '/scripts/register.js', routes: routes(req)})
})

router.post('/register', [upload.single("avatar"), passport.authenticate('register')], async (req, res) => {
  const {
    name,
    address,
    age,
    email,
    phone,
    pass,
  } = req.newUser
  const newCart = {
    email,
    products: []
  };
  const userCart = await carrito.save(newCart)
  const file = req.file
  const newUser = {
    name,
    address,
    age,
    _id: email,
    phone,
    pass,
    cartId: userCart,
    avatarURL: pathFormatter(file.path)
  }
  await users.save(newUser)
  sendMail(newUser)
  res.status(200).send()
})

module.exports = router;