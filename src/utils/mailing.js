const nodemailer = require("nodemailer");

const logger = require('../utils/logger')

const { G_MAIL, G_MAIL_PASS } = process.env

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: G_MAIL,
    pass: G_MAIL_PASS
  }
})

const mailOptionsUser = (newUser) => {
  return {
    from: 'PBnJ <pbnj@pbnj.com>',
    to: G_MAIL,
    subject: 'Nuevo Usuario',
    html: `
      <h1 style="font-weight:bold">Nuevo Registro</h1>
      <p>${newUser._id}</p>
      <ul>
        <li><b>Nombre:</b> ${newUser.name}</li>
        <li><b>Dirección:</b> ${newUser.address}</li>
        <li><b>Edad:</b> ${newUser.age}</li>
        <li><b>Email:</b> ${newUser._id}</li>
        <li><b>Teléfono:</b> ${newUser.phone}</li>
      </ul>
    `,
    secure: false,
    tls: {
      rejectUnauthorized: false
    }
  }
}

const emailContructor = (cart, email, name) => {
  let adminList = ''
  cart.products.forEach(poke => {
    adminList += `
      <h2>${poke.name}</h2>
      <img src="${poke.thumbnail}" alt="${poke.name}">
      <p><b>Price:</b> $${poke.price}</p>
      <p><b>Stock:</b> ${poke.stock}</p>
      <p><b>ID del Producto:</b> ${poke._id}</p>
    `
  })
  const emailBody = `
    <h1>El usuario ${name + '<' + email + '>'} ha iniciado un pedido de:</h1>
    <section>
    ${adminList}
    </section>
  `
  return emailBody
}

const mailOptionsPurchase = (emailBody, email, name) => {
  return {
    from: 'PBnJ <pbnj@pbnj.com>',
    to: email,
    subject: `Nuevo pedido de ${name + '<' + email + '>'}`,
    html: emailBody,
    secure: false,
    tls: {
      rejectUnauthorized: false
    }
  }
}

const sendMail = (newUser) => {
  transporter.sendMail(mailOptionsUser(newUser))
    .then(data => {
      const { accepted, rejected, response, envelope, messageId } = data
      logger.info(`Register Mailing - accepted: ${accepted} - rejected: ${rejected} - response: ${response} - from: ${envelope.from} - to: ${envelope.to} - ID: ${messageId}`)
    })
    .catch(error => logger.error(error))
}

const sendMailPurchase = (cart, email, name) => {
  const emailBody = emailContructor(cart, email, name)
  transporter.sendMail(mailOptionsPurchase(emailBody, email, name))
    .then(data => {
      const { accepted, rejected, response, envelope, messageId } = data
      logger.info(`Purchase Mailing - accepted: ${accepted} - rejected: ${rejected} - response: ${response} - from: ${envelope.from} - to: ${envelope.to} - ID: ${messageId}`)
    })
    .catch(error => logger.error(error))
}

module.exports = {
  sendMail: sendMail, 
  sendMailPurchase: sendMailPurchase
}