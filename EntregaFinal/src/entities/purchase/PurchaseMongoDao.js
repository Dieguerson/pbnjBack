const HandlerMongo = require('../../database/MongoAtlas/daos/BaseMongoDao')
const Purchase = require('./PurchaseModel')

class PurchaseMongoDao extends HandlerMongo {
  static instance

  constructor() {
    super('orders', Purchase)
  }

  static getInstance() {
    if (!PurchaseMongoDao.instance) {
      PurchaseMongoDao.instance = new PurchaseMongoDao()
    }

    return PurchaseMongoDao.instance
  }
}

module.exports = PurchaseMongoDao