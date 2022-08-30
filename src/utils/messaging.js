const twilio = require("twilio");

const logger = require('../utils/logger')

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
    .then((response) =>{
      const { numSegments, direction, from, to, errorMessage, status } = response
      logger.info(`Admin Messaging - Segments: ${numSegments} - Direction: ${direction} - From: ${from} - To: ${to} - Error: ${errorMessage} - Media: ${numMedia} - Status: ${status}`)
    })
    .catch((error) => logger.error(error))

  client.messages.create({
    body: smsMessage,
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