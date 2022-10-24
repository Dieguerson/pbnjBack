const twilio = require("twilio");

const logger = require('../utils/logger')

const { TWILIO_ACCOUNT, TWILIO_AUTH, TWILIO_SMS_NUMBER, TWILIO_WA_NUMBER, ADMIN_NUMBER } = process.env

const accountSid = TWILIO_ACCOUNT
const authToken = TWILIO_AUTH

const client = twilio(accountSid, authToken)

const messagesContructor = (cart, email, name) => {
  let productList = ''
  let adminWaList = ''
  cart.products.forEach(poke => {
    productList += `
      Nombre: ${poke.name}
      Descripción: ${poke.description}
      Precio: ${poke.price}
    `
    adminWaList += `
      Nombre: ${poke.name}
      Precio: ${poke.price}
      Stock: ${poke.stock}
      ID del Producto: ${poke._id}
    `
  })
  const whatsappBody =`
    El usuario ${name} < ${email} > ha iniciado un pedido de:
    ${adminWaList}
  `
  const messageBody = `
    Hola, ${name}!

    Nos comunicamos de PBnJ para contarte que se inició tu pedido de:

    ${productList}

    En breve nos estaremos comunicando con vos por teléfono para completar la compra!
  `
  return { whatsappBody, messageBody }
}

const sendMessage = (cart, phone, email, name) => {
  const { whatsappBody, messageBody } = messagesContructor(cart, email, name)

  client.messages.create({
      body: whatsappBody,
      from: `whatsapp:${TWILIO_WA_NUMBER}`,
      to: `whatsapp:${ADMIN_NUMBER}`
  })
    .then((response) =>{
      const { numSegments, direction, from, to, errorMessage, status } = response
      logger.info(`Admin Messaging - Segments: ${numSegments} - Direction: ${direction} - From: ${from} - To: ${to} - Error: ${errorMessage} - Media: ${numMedia} - Status: ${status}`)
    })
    .catch((error) => logger.error(error))

  client.messages.create({
    body: messageBody,
    from: TWILIO_SMS_NUMBER,
    to: phone
  })
    .then((response) => {
      const { numSegments, direction, from, to, errorMessage, status } = response
      logger.info(`Client Messaging - Segments: ${numSegments} - Direction: ${direction} - From: ${from} - To: ${to} - Error: ${errorMessage} - Media: ${numMedia} - Status: ${status}`)
    })
    .catch((error) => logger.error(error))
}

module.exports = sendMessage