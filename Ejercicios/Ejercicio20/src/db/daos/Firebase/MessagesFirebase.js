const ContenedorFirebase = require('./ContenedorDBFirebase')

class MessagesFirebase extends ContenedorFirebase {
  constructor() {
    super('messagesProductronica')
  }

  static getInstance() {
    if (!MessagesFirebase.instance) {
      MessagesFirebase.instance = new MessagesFirebase()
    }

    return MessagesFirebase.instance
  }
}

module.exports = MessagesFirebase