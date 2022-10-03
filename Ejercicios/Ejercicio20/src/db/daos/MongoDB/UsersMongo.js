const ContenedorMongo = require('./ContenedorMongo')
const userSchema = require('../../../models/User')

class UsersMongo extends ContenedorMongo {
  static instance
  constructor() {
    super('usersProductronica', userSchema)
  }

  static getInstance() {
    if (!UsersMongo.instance) {
      UsersMongo.instance = new UsersMongo()
    }

    return UsersMongo.instance
  }
}

module.exports = UsersMongo