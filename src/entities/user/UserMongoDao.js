const HandlerMongo = require('../../database/MongoAtlas/daos/BaseMongoDao')
const User = require('./UserModel')

class UserMongoDao extends HandlerMongo {
  static instance
  
  constructor() {
    super('users', User)
  }

  static getInstance() {
    if (!UserMongoDao.instance) {
      UserMongoDao.instance = new UserMongoDao()
    }

    return UserMongoDao.instance
  }
}

module.exports = UserMongoDao