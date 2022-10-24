const dateFormatter = require('../../utils/dateFormatter');

class ChatDTO {
  constructor (message) {
    this._id = message._id || undefined
    this.email = message.email
    this.type = message.type
    this.body = message.body
    this.date = dateFormatter(message.createdAt) ||undefined
  }
}

module.exports = ChatDTO