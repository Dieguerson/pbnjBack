const HandlerMongo = require('../handlers/HandlerMongo')
const User = require('../models/User')

class UserMongo extends HandlerMongo {
  constructor() {
    super('users', User)
  }
}

module.exports = UserMongo