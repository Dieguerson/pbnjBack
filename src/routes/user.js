const express = require('express');
const { Router } = express;
let router = new Router();

const User = require('../daos/UserMongo')
const Cart = require('../daos/CartMongo')
const UsersDb = new User()
const CartDb = new Cart()

const routes = require('../utils/routes')

const sendMessage = require('../utils/messaging')

const { sendMailPurchase } = require('../utils/mailing')

router.get('/usuario/:email', async (req, res) => {
  if(req.session.passport){
    const { email } = req.params
    const userById = await UsersDb.getById(email)
    const cartById = await CartDb.getById(userById.cartId)
    res.render("user", {script: '/scripts/user.js', cart: cartById, user: userById, routes: routes(req)})
  } else {
    res.redirect(307, '/login')
  }
})

router.get('/usuario/compra/:cartId', async (req, res) => {
  const { cartId } = req.params
  const { _id } = req.session.passport.user
  const userById = await UsersDb.getById(_id)
  const cartById = await CartDb.getById(cartId)
  let productList = ''
  let adminList = ''
  let adminWaList = ''
  cartById.products.forEach(poke => {
    productList += `
      Nombre: ${poke.name}
      Descripción: ${poke.description}
      Precio: ${poke.price}
    `
    adminList += `
        <h2>${poke.name}</h2>
        <img src="${poke.thumbnail}" alt="${poke.name}">
        <p><b>Price:</b> $${poke.price}</p>
        <p><b>Stock:</b> ${poke.stock}</p>
        <p><b>ID del Producto:</b> ${poke._id}</p>
    `
    adminWaList += `
      Nombre: ${poke.name}
      Precio: ${poke.price}
      Stock: ${poke.stock}
      ID del Producto: ${poke._id}
    `
  })
  const emailBody = `
    <h1>El usuario ${userById.name + '<' + userById._id + '>'} ha iniciado un pedido de:</h1>
    <section>
    ${adminList}
    </section>
  `
  const whatsappBody =`
    El usuario ${userById.name} < ${userById._id} > ha iniciado un pedido de:
    ${adminWaList}
  `
  const messageBody = `
    Hola, ${userById.name}!

    Nos comunicamos de PBnJ para contarte que se inició tu pedido de:

    ${productList}

    En breve nos estaremos comunicando con vos por teléfono para completar la compra!
  `
  sendMessage(whatsappBody, messageBody, userById.phone)
  sendMailPurchase(emailBody, _id, userById.name)
  res.status(200).send() 
})

module.exports = router;