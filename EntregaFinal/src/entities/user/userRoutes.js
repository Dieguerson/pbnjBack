const express = require('express');
const { Router } = express;
let router = new Router();
const { passport, populateAll } = require('../../utils/passport')

const { upload } = require('../../utils/multer')

const routes = require('../../utils/routes')

const { fetchUserById, saveNewUser, startPurchase } = require('./userController')
const { fetchCartById } = require('../cart/cartController');
const test = require('../../utils/jwt');

router.post('/registro', [upload.single("avatar"), passport.authenticate('register', {session: false})], async (req, res) => {
  if(req.user){
    const { newUser } = req
    const filePath = req.file.path
    await saveNewUser(newUser, filePath)
    await populateAll()
    res.status(200).send()
  } else {
    res.redirect('/')
  }
})

router.get('/login', (req, res) => {
  res.render("handlebars/login.hbs", {script: '/scripts/login.js', routes: routes(req)})
})

router.post('/login', [passport.authenticate('login', {session: false}), test], (req, res) => {
  const { token } = req
  res.cookie('jwt', token, { maxAge: 100000000 }).status(200).send()
})

router.get('/salir', (req, res) => {
  delete req.user
  res.clearCookie('jwt').status(200).send()
})

router.get('/usuario/:email', passport.authenticate('auth', {session: false}), async (req, res) => {
  if(req.isAuthenticated()){
    const { email } = req.params
    const userById = await fetchUserById(email)
    const cartById = await fetchCartById(userById.cartId)
    res.render("handlebars/user.hbs", {script: '/scripts/user.js', cart: cartById, user: userById, routes: routes(req)})
  } else {
    res.redirect('/')
  }
})

router.get('/usuario/compra/:cartId', passport.authenticate('auth', {session: false}), async (req, res) => {
  if(req.isAuthenticated()){
    const { cartId } = req.params
    const { _id } = req.user
    await startPurchase(_id, cartId)
    res.status(200).send() 
  } else {
    res.redirect('/')
  }
})

module.exports = router;