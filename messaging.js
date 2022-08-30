const twilio = require("twilio");

const { TWILIO_ACCOUNT, TWILIO_AUTH, TWILIO_SMS_NUMBER, TWILIO_WA_NUMBER, ADMIN_NUMBER } = process.env

const accountSid = TWILIO_ACCOUNT
const authToken = TWILIO_AUTH

const client = twilio(accountSid, authToken)

const sendMessage = (waMessage, smsMessage, phone) => {

  client.messages.create({
      body: waMessage,
      from: `whatsapp:${TWILIO_WA_NUMBER}`,
      to: `whatsapp:${ADMIN_NUMBER}`
  })
    .then((res) => [
      console.log(res)
    ])
    .catch((err) => console.log(err))

  client.messages.create({
    body: smsMessage,
    from: TWILIO_SMS_NUMBER,
    to: phone
  })
    .then((res) => [
      console.log(res)
    ])
    .catch((err) => console.log(err))
}

module.exports = sendMessage