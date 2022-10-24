const express = require('express');
const { Router } = express;
let router = new Router();
const { passport, populateAll } = require('../../utils/passport')

const { upload } = require('../../utils/multer')

const routes = require('../../utils/routes')

const { fetchUserById, saveNewUser, startPurchase } = require('./userController')
const { fetchCartById } = require('../cart/cartController')

router.get('/registro', (req, res) => {
  res.render("handlebars/register.hbs", {script: '/scripts/register.js', routes: routes(req)})
})

router.post('/registro', [upload.single("avatar"), passport.authenticate('register')], async (req, res) => {
  if(req.session.passport){
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

router.post('/login', passport.authenticate('auth'), (_, res) => {
  res.status(200).send()
})

router.get('/salir', (req, res) => {
  req.session.destroy()
  res.status(200).send()
})

router.get('/usuario/:email', async (req, res) => {
  if(req.session.passport){
    const { email } = req.params
    const userById = await fetchUserById(email)
    const cartById = await fetchCartById(userById.cartId)
    res.render("handlebars/user.hbs", {script: '/scripts/user.js', cart: cartById, user: userById, routes: routes(req)})
  } else {
    res.redirect('/')
  }
})

router.get('/usuario/compra/:cartId', async (req, res) => {
  if(req.session.passport){
    const { cartId } = req.params
    const { _id } = req.session.passport.user
    await startPurchase(_id, cartId)
    res.status(200).send() 
  } else {
    res.redirect('/')
  }
})

module.exports = router;