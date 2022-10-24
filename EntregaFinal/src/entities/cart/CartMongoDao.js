const HandlerMongo = require('../../database/MongoAtlas/daos/BaseMongoDao')
const Cart = require('./CartModel')

class CartMongoDao extends HandlerMongo {
  static instance

  constructor() {
    super('cart', Cart)
  }

  static getInstance() {
    if (!CartMongoDao.instance) {
      CartMongoDao.instance = new CartMongoDao()
    }

    return CartMongoDao.instance
  }
}

module.exports = CartMongoDao