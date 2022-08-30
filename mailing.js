const nodemailer = require("nodemailer");

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
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
}

const sendMailPurchase = (emailBody, email, name) => {
  transporter.sendMail(mailOptionsPurchase(emailBody, email, name))
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
}

module.exports = {
  sendMail: sendMail, 
  sendMailPurchase: sendMailPurchase
}