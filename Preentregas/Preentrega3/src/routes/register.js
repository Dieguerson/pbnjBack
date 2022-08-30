const express = require('express');
const { Router } = express;
let router = new Router();

const User = require('../daos/UserMongo')
const Cart = require('../daos/CartMongo')
const UsersDb = new User()
const CartDb = new Cart()

const passport = require('../utils/passport')

const sendMail = require('../utils/mailing')

const routes = require('../utils/routes')

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

router.get('/registro', (req, res) => {
  res.render("register", {script: '/scripts/register.js', routes: routes(req)})
})

router.post('/registro', [upload.single("avatar"), passport.authenticate('register')], async (req, res) => {
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
  const userCart = await CartDb.save(newCart)
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
  await UsersDb.save(newUser)
  sendMail(newUser)
  res.status(200).send()
})

module.exports = router;