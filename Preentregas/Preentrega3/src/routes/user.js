const express = require('express');
const { Router } = express;
const User = require('../daos/UserMongo')
const Carrito = require('../daos/CarritoMongo')
let router = new Router();
const routes = require('../../routes')
const sendMessage = require('../../messaging')
const { sendMailPurchase } = require('../../mailing')

const users = new User()
const carrito = new Carrito()

router.get('/user/:email', async (req, res) => {
  const { email } = req.params
  const user = await users.getById(email)
  const cart = await carrito.getById(user.cartId)
  res.render("user", {script: '/scripts/user.js', cart: cart, user: user, routes: routes(req)})
})

router.post('/user/:email', (req, res) => {
  res.status(200).send()
})

router.get('/user/buy/:cartId', async (req, res) => {
  const { cartId } = req.params
  const { _id } = req.session.passport.user
  const destinatary = await users.getById(_id)
  const cart = await carrito.getById(cartId)
  let productList = ''
  let adminList = ''
  let adminWaList = ''
  cart.products.forEach(poke => {
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
    <h1>El usuario ${destinatary.name + '<' + destinatary._id + '>'} ha iniciado un pedido de:</h1>
    <section>
    ${adminList}
    </section>
  `
  const whatsappBody =`
    El usuario ${destinatary.name} < ${destinatary._id} > ha iniciado un pedido de:
    ${adminWaList}
  `
  const messageBody = `
    Hola, ${destinatary.name}!

    Nos comunicamos de PBnJ para contarte que se inició tu pedido de:

    ${productList}

    En breve nos estaremos comunicando con vos por teléfono para completar la compra!
  `
  sendMessage(whatsappBody, messageBody, destinatary.phone)
  sendMailPurchase(emailBody, _id, destinatary.name)
  res.status(200).send() 
})
module.exports = router;