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

const sendMailPurchase = (emailBody, email, name) => {
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