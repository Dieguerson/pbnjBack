const MessagesFirebase = require('./MessagesFirebase')
const ProductsFirebase = require('./ProductsFirebase')
const UsersFirebase = require('./UsersFirebase')
const logger = require('../../../utils/logger')

class FirebaseDaoFactory {

  getDao(dbName) {
    switch(dbName) {
      case 'messages':
        return MessagesFirebase.getInstance()
      case 'products':
        return ProductsFirebase.getInstance()
      case 'users':
        return UsersFirebase.getInstance()
      default: 
        logger.error({message: "Critical Error: DBName needed"})
    }
  }
}

module.exports = FirebaseDaoFactory