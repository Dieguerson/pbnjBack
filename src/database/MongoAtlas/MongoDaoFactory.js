const CartMongo = require('../../entities/cart/CartMongoDao')
const ProductsMongo = require('../../entities/products/ProductsMongoDao')
const UserMongo = require('../../entities/user/UserMongoDao')
const ChatMongo = require('../../entities/chat/ChatMongoDao')
const PurchaseMongo = require('../../entities/purchase/PurchaseMongoDao')
const logger = require('../../utils/logger')

class MongoDaoFactory {

  getDao(dbName) {
    switch(dbName) {
      case 'cart':
        return CartMongo.getInstance()
      case 'products':
        return ProductsMongo.getInstance()
      case 'users':
        return UserMongo.getInstance()
      case 'messages':
        return ChatMongo.getInstance()
      case 'orders':
        return PurchaseMongo.getInstance()
      default: 
        logger.error({message: "Critical Error: DBName needed"})
    }
  }
}

module.exports = MongoDaoFactory