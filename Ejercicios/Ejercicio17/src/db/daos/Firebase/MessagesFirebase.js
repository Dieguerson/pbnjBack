const ContenedorFirebase = require('./ContenedorDBFirebase')

class messagesFirebase extends ContenedorFirebase {
  constructor() {
    super('messagesProductronica')
  }
}

module.exports = messagesFirebase