const ContenedorFirebase = require('./ContenedorDBFirebase')

class UsersFirebase extends ContenedorFirebase {
  constructor() {
    super('usersProductronica')
  }

  static getInstance() {
    if (!UsersFirebase.instance) {
      UsersFirebase.instance = new UsersFirebase()
    }

    return UsersFirebase.instance
  }
}

module.exports = UsersFirebase