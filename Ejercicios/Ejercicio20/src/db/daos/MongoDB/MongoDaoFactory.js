const MessagesMongo = require('./MessagesMongo')
const ProductsMongo = require('./ProductsMongo')
const UsersMongo = require('./UsersMongo')
const logger = require('../../../utils/logger')

class FirebaseDaoFactory {

  getDao(dbName) {
    switch(dbName) {
      case 'messages':
        return MessagesMongo.getInstance()
      case 'products':
        return ProductsMongo.getInstance()
      case 'users':
        return UsersMongo.getInstance()
      default: 
        logger.error({message: "Critical Error: DBName needed"})
    }
  }
}

module.exports = FirebaseDaoFactory