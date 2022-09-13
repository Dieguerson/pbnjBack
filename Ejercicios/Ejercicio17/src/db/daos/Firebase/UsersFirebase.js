const ContenedorFirebase = require('./ContenedorDBFirebase')

class usersFirebase extends ContenedorFirebase {
  constructor() {
    super('usersProductronica')
  }
}

module.exports = usersFirebase