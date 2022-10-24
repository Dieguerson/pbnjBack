const HandlerMongo = require('../../database/MongoAtlas/daos/BaseMongoDao')
const Chat = require('./ChatModel')

class ChatMongoDao extends HandlerMongo {
  static instance

  constructor() {
    super('messages', Chat)
  }

  static getInstance() {
    if (!ChatMongoDao.instance) {
      ChatMongoDao.instance = new ChatMongoDao()
    }

    return ChatMongoDao.instance
  }
}

module.exports = ChatMongoDao