const ContenedorMongo = require('./ContenedorMongo')
const messageSchema = require('../../../models/Message')

class MessagesMongo extends ContenedorMongo {
  static instance
  constructor() {
    super('messagesProductronica', messageSchema)
  }

  static getInstance() {
    if (!MessagesMongo.instance) {
      MessagesMongo.instance = new MessagesMongo()
    }

    return MessagesMongo.instance
  }
}

module.exports = MessagesMongo